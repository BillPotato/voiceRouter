"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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

type SpeechWindow = Window & {
  SpeechRecognition?: BrowserSpeechRecognitionConstructor;
  webkitSpeechRecognition?: BrowserSpeechRecognitionConstructor;
};

interface UseSpeechRecognitionResult {
  isSupported: boolean;
  transcript: string;
  isListening: boolean;
  error: string | null;
  startRecording: () => void;
  stopRecording: () => void;
  resetTranscript: () => void;
}

export function useSpeechRecognition(
  onFinalTranscript?: (finalTranscript: string) => void,
): UseSpeechRecognitionResult {
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const speechWindow = window as SpeechWindow;
    const SpeechRecognitionImpl =
      speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;

    setIsSupported(Boolean(SpeechRecognitionImpl));
  }, []);

  const ensureRecognition = useCallback((): BrowserSpeechRecognition | null => {
    if (typeof window === "undefined") {
      return null;
    }

    if (recognitionRef.current) {
      return recognitionRef.current;
    }

    const speechWindow = window as SpeechWindow;
    const SpeechRecognitionImpl =
      speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;

    if (!SpeechRecognitionImpl) {
      return null;
    }

    const recognition = new SpeechRecognitionImpl();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: SpeechRecognitionResultEventLite) => {
      const transcriptText = Array.from({ length: event.results.length }, (_, index) => {
        return event.results[index][0].transcript;
      }).join("");

      setTranscript(transcriptText);

      const lastResult = event.results[event.results.length - 1];
      if (lastResult?.isFinal && onFinalTranscript) {
        onFinalTranscript(transcriptText);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEventLite) => {
      setIsListening(false);

      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        setError("Microphone permission was denied.");
        return;
      }

      setError(`Microphone error: ${event.error}`);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    return recognition;
  }, [onFinalTranscript]);

  const startRecording = useCallback(() => {
    const recognition = ensureRecognition();
    if (!recognition) {
      setError("Speech recognition is unsupported in this browser.");
      return;
    }

    setError(null);
    setTranscript("");
    recognition.start();
  }, [ensureRecognition]);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    setError(null);
  }, []);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  return {
    isSupported,
    transcript,
    isListening,
    error,
    startRecording,
    stopRecording,
    resetTranscript,
  };
}
