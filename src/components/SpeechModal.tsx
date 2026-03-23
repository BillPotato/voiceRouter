"use client";

import { useEffect, useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SpeechRecognitionAlternativeLite {
  transcript: string;
}

interface SpeechRecognitionResultLite {
  0: SpeechRecognitionAlternativeLite;
  isFinal: boolean;
}

interface SpeechRecognitionResultListLite {
  length: number;
  [index: number]: SpeechRecognitionResultLite;
}

interface SpeechRecognitionResultEventLite extends Event {
  results: SpeechRecognitionResultListLite;
}

interface SpeechRecognitionErrorEventLite extends Event {
  error: string;
}

interface BrowserSpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionResultEventLite) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLite) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

type BrowserSpeechRecognitionConstructor = new () => BrowserSpeechRecognition;

interface ClassificationResponse {
  department?: string;
  confidence?: number;
  matches?: string[];
  error?: string;
}

interface SpeechModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SpeechModal({ open, onOpenChange }: SpeechModalProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [classification, setClassification] = useState<ClassificationResponse | null>(null);
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);

  const initSpeechRecognition = (): BrowserSpeechRecognition | null => {
    const speechWindow = window as Window & {
      SpeechRecognition?: BrowserSpeechRecognitionConstructor;
      webkitSpeechRecognition?: BrowserSpeechRecognitionConstructor;
    };

    const SpeechRecognitionImpl = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;

    if (!SpeechRecognitionImpl) {
      setTranscript("Speech recognition is not supported in this browser.");
      return null;
    }

    const recognition = new SpeechRecognitionImpl();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("Listening...");
    };

    recognition.onresult = async (event: SpeechRecognitionResultEventLite) => {
      const transcriptText = Array.from({ length: event.results.length }, (_, index) => {
        return event.results[index][0].transcript;
      }).join("");

      setTranscript(transcriptText);

      const firstResult = event.results[0];
      if (!firstResult?.isFinal) {
        return;
      }

      try {
        const classifyUrl = process.env.NEXT_PUBLIC_CLASSIFY_URL ?? "http://localhost:8080/classify";
        const clsRes = await fetch(classifyUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: transcriptText }),
        });

        const clsJson = (await clsRes.json()) as ClassificationResponse;
        setClassification(clsJson);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        setClassification({ error: `Failed to reach classifier: ${message}` });
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEventLite) => {
      setIsListening(false);
      setTranscript(`Error: ${event.error}`);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return recognition;
  };

  const startRecording = () => {
    setTranscript("");
    setClassification(null);

    if (!recognitionRef.current) {
      recognitionRef.current = initSpeechRecognition();
    }

    recognitionRef.current?.start();
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
  };

  useEffect(() => {
    if (!open) {
      setIsListening(false);
      recognitionRef.current?.stop();
    }
  }, [open]);

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
          {!isListening ? (
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
          )}

          {transcript ? (
            <div className="w-full rounded bg-gray-100 p-4 text-center">
              <strong>Transcript:</strong>
              <div className="mt-2">{transcript}</div>
            </div>
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
                </div>
              )}
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
