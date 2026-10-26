"use client";

import { Check, Share2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { COPY_FEEDBACK_DURATION_MS } from "@/config/app.constants";
import { SHARE_PATHS } from "@/config/share";
import { useLocale } from "@/i18n/locale-provider";
import { copyText } from "@/lib/copy-text";
import { SCENARIO_URL_FLUSH_EVENT } from "@/lib/scenario-url";

type ShareFeedback = "copied" | "failed" | null;

export function ShareButton() {
  const { locale, messages } = useLocale();
  const [feedback, setFeedback] = useState<ShareFeedback>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  async function handleShare() {
    window.dispatchEvent(new Event(SCENARIO_URL_FLUSH_EVENT));

    const shareUrl = new URL(
      `${SHARE_PATHS[locale]}${window.location.search}`,
      window.location.origin,
    ).toString();
    const didCopy = await copyText(shareUrl);

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    setFeedback(didCopy ? "copied" : "failed");
    timeoutRef.current = window.setTimeout(() => {
      setFeedback(null);
    }, COPY_FEEDBACK_DURATION_MS);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => void handleShare()}
        aria-label={messages.share.label}
        title={messages.share.label}
        className={`flex size-9 items-center justify-center rounded-xl border bg-white/75 shadow-sm backdrop-blur-sm transition-colors lg:size-11 ${
          feedback === "copied"
            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
            : "border-white/90 text-sky-900 hover:border-sky-200 hover:bg-white"
        }`}
      >
        {feedback === "copied" ? (
          <Check aria-hidden="true" strokeWidth={2.6} className="size-4 lg:size-[18px]" />
        ) : (
          <Share2 aria-hidden="true" strokeWidth={2.4} className="size-4 lg:size-[18px]" />
        )}
      </button>

      {feedback !== null ? (
        <span
          role="status"
          aria-live="polite"
          className={`absolute right-0 top-full z-40 mt-1.5 inline-flex items-center gap-1 whitespace-nowrap rounded-lg border px-2 py-1 text-[0.625rem] font-extrabold shadow-lg ${
            feedback === "copied"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {feedback === "copied" ? (
            <Check aria-hidden="true" size={11} strokeWidth={2.8} />
          ) : (
            <X aria-hidden="true" size={11} strokeWidth={2.8} />
          )}
          {feedback === "copied" ? messages.share.copied : messages.share.failed}
        </span>
      ) : null}
    </div>
  );
}
