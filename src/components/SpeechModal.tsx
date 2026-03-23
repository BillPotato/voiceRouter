"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useClassifier } from "@/hooks/useClassifier";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

interface SpeechModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const departmentContacts: Record<string, { phone: string; email: string }> = {
  Sales: {
    phone: "+1 (555) 010-1001",
    email: "sales@voicerouter.example",
  },
  "Technical Support": {
    phone: "+1 (555) 010-2002",
    email: "support@voicerouter.example",
  },
  "Billing & Payments": {
    phone: "+1 (555) 010-3003",
    email: "billing@voicerouter.example",
  },
  "General Inquiry": {
    phone: "+1 (555) 010-4004",
    email: "hello@voicerouter.example",
  },
};

export function SpeechModal({ open, onOpenChange }: SpeechModalProps) {
  const [typedInput, setTypedInput] = useState("");
  const { toast } = useToast();
  const { isLoading, error, errorSource, classification, classifyText, resetClassification } =
    useClassifier();

  const handleFinalTranscript = useCallback(
    (finalTranscript: string) => {
      void classifyText(finalTranscript);
    },
    [classifyText],
  );

  const {
    isSupported,
    transcript,
    isListening,
    error: speechError,
    startRecording,
    stopRecording,
    resetTranscript,
  } = useSpeechRecognition(handleFinalTranscript);

  const handleTypedSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await classifyText(typedInput);
  };

  useEffect(() => {
    if (!open) {
      stopRecording();
      resetTranscript();
      resetClassification();
      setTypedInput("");
    }
  }, [open, resetClassification, resetTranscript, stopRecording]);

  useEffect(() => {
    if (!open || isSupported) {
      return;
    }

    toast({
      variant: "destructive",
      title: "Microphone unsupported",
      description: "This browser does not support speech recognition. Use text input instead.",
    });
  }, [isSupported, open, toast]);

  useEffect(() => {
    if (!open || !speechError) {
      return;
    }

    const title = speechError.includes("permission")
      ? "Microphone permission denied"
      : "Microphone unavailable";

    toast({
      variant: "destructive",
      title,
      description: speechError,
    });
  }, [open, speechError, toast]);

  useEffect(() => {
    if (!open || !error || errorSource !== "api") {
      return;
    }

    toast({
      variant: "destructive",
      title: "Routing request failed",
      description: error,
    });
  }, [error, errorSource, open, toast]);

  const department = classification?.department;
  const contactInfo = department ? departmentContacts[department] : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-md">
        <DialogHeader>
          <DialogTitle>Speak your question</DialogTitle>
          <DialogDescription>
            Start recording and VoiceRouter will classify your request to the right department.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex flex-col items-center">
          {isSupported ? (
            !isListening ? (
              <button
                type="button"
                className="mb-4 rounded-lg bg-indigo-500 px-6 py-2 font-semibold text-white transition-colors hover:bg-indigo-600"
                onClick={startRecording}
              >
                Start Listening
              </button>
            ) : (
              <button
                type="button"
                className="mb-4 rounded-lg bg-red-500 px-6 py-2 font-semibold text-white transition-colors hover:bg-red-600"
                onClick={stopRecording}
              >
                Stop Listening
              </button>
            )
          ) : (
            <div className="mb-4 w-full rounded bg-yellow-100 p-3 text-sm text-yellow-900">
              Microphone capture is unavailable in this browser. Use the text field below.
            </div>
          )}

          {transcript ? (
            <div className="w-full rounded bg-gray-100 p-4 text-center">
              <strong>Transcript:</strong>
              <div className="mt-2">{transcript}</div>
            </div>
          ) : null}

          <form className="mt-4 w-full" onSubmit={handleTypedSubmit}>
            <label className="mb-2 block text-sm font-semibold text-gray-700" htmlFor="fallback-input">
              Type your question
            </label>
            <textarea
              id="fallback-input"
              value={typedInput}
              onChange={(event) => setTypedInput(event.target.value)}
              className="min-h-24 w-full rounded-lg border border-gray-300 p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Example: I was charged twice and need help with my invoice."
            />
            <button
              type="submit"
              className="mt-3 w-full rounded-lg bg-indigo-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-indigo-600 disabled:pointer-events-none disabled:opacity-60"
              disabled={isLoading}
            >
              {isLoading ? "Classifying..." : "Submit"}
            </button>
          </form>

          {error ? (
            <div className="mt-3 w-full rounded-lg bg-red-100 p-3 text-sm text-red-800">{error}</div>
          ) : null}

          {classification ? (
            <div className="mt-4 w-full">
              {classification.error ? (
                <div className="rounded-lg bg-red-100 p-6 text-center font-semibold text-red-800">
                  {classification.error}
                </div>
              ) : (
                <div className="rounded-lg bg-indigo-50 p-6 text-center text-indigo-900">
                  <div className="text-sm text-gray-600">Directed to</div>
                  <div className="mt-2 text-2xl font-bold">{classification.department}</div>
                  <div className="mt-1 text-sm">Confidence: {classification.confidence ?? "n/a"}</div>
                  {classification.matches && classification.matches.length > 0 ? (
                    <div className="mt-2 text-xs text-gray-600">
                      Matches: {classification.matches.join(", ")}
                    </div>
                  ) : null}

                  {contactInfo ? (
                    <div className="mt-4 rounded-lg border border-indigo-200 bg-white/70 p-4 text-left text-indigo-900">
                      <div className="text-sm font-semibold">Mock Contact Information</div>
                      <div className="mt-1 text-sm">Phone: {contactInfo.phone}</div>
                      <div className="text-sm">Email: {contactInfo.email}</div>
                      <div className="mt-3 rounded-md bg-gray-100 p-3 text-xs italic text-gray-700">
                        Proof of Concept: In a production environment, this would trigger a custom
                        routing action, such as an automatic redirect to a live agent or a
                        department-specific form.
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
