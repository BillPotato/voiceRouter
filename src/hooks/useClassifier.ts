"use client";

import { useCallback, useState } from "react";

export interface ClassificationResponse {
  department?: string;
  confidence?: number;
  matches?: string[];
  error?: string;
}

interface UseClassifierResult {
  isLoading: boolean;
  error: string | null;
  classification: ClassificationResponse | null;
  classifyText: (text: string) => Promise<ClassificationResponse | null>;
  resetClassification: () => void;
}

export function useClassifier(): UseClassifierResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [classification, setClassification] = useState<ClassificationResponse | null>(null);

  const classifyText = useCallback(async (text: string): Promise<ClassificationResponse | null> => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      setError("Please enter or record a question before submitting.");
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmedText }),
      });

      const payload = (await response.json()) as ClassificationResponse;

      if (!response.ok || payload.error) {
        const message = payload.error ?? "Classification request failed.";
        setClassification({ error: message });
        setError(message);
        return null;
      }

      setClassification(payload);
      return payload;
    } catch (requestError) {
      const message =
        requestError instanceof Error ? requestError.message : "Unexpected classification error.";
      setClassification({ error: message });
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetClassification = useCallback(() => {
    setClassification(null);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    classification,
    classifyText,
    resetClassification,
  };
}
