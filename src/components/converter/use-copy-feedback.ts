"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { COPY_FEEDBACK_DURATION_MS } from "@/config/app.constants";
import type { ConversionUnit } from "@/domain/conversion/conversion.types";
import { useLocale } from "@/i18n/locale-provider";
import { copyText } from "@/lib/copy-text";

export type CopyTarget = ConversionUnit | "all";

export type CopyFeedbackState = Readonly<{
  copiedTarget: CopyTarget | null;
  statusMessage: string;
  copy: (target: CopyTarget, value: string) => Promise<void>;
}>;

export function useCopyFeedback(): CopyFeedbackState {
  const { messages } = useLocale();
  const [copiedTarget, setCopiedTarget] = useState<CopyTarget | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const copy = useCallback(
    async (target: CopyTarget, value: string) => {
      const didCopy = await copyText(value);

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }

      if (didCopy) {
        setCopiedTarget(target);
        setStatusMessage(messages.copy.success);
      } else {
        setCopiedTarget(null);
        setStatusMessage(messages.copy.failure);
      }

      timeoutRef.current = window.setTimeout(() => {
        setCopiedTarget(null);
        setStatusMessage("");
      }, COPY_FEEDBACK_DURATION_MS);
    },
    [messages.copy.failure, messages.copy.success],
  );

  return { copiedTarget, statusMessage, copy };
}
