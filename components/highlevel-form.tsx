"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type HighLevelFormProps = {
  className?: string;
  /** If the iframe doesn't load quickly, we remount it once to recover from flaky loads. */
  retryAfterMs?: number;
};

const EMBED_SCRIPT_SRC = "https://link.msgsndr.com/js/form_embed.js";

export function HighLevelForm({
  className,
  retryAfterMs = 4000,
}: HighLevelFormProps) {
  const [loaded, setLoaded] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const attemptedOnce = useRef(false);

  // If the iframe hasn't loaded after a short wait, remount it once.
  useEffect(() => {
    const t = window.setTimeout(() => {
      if (loaded) return;
      if (attemptedOnce.current) return;
      attemptedOnce.current = true;
      setAttempt((a) => a + 1);
    }, retryAfterMs);

    return () => window.clearTimeout(t);
  }, [loaded, retryAfterMs]);

  // Ensure the HighLevel embed helper script exists (doesn't hurt if it loads more than once,
  // but we keep it single-instance to avoid any weirdness).
  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${EMBED_SCRIPT_SRC}"]`
    );
    if (existing) return;

    const s = document.createElement("script");
    s.src = EMBED_SCRIPT_SRC;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  const iframeKey = useMemo(() => `hl-${attempt}`, [attempt]);

  return (
    <iframe
      key={iframeKey}
      src="https://api.leadconnectorhq.com/widget/form/VpRmBNG8OgjMXfuTIwcQ"
      className={className}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        border: "none",
        borderRadius: 12,
      }}
      id="inline-VpRmBNG8OgjMXfuTIwcQ"
      data-layout="{'id':'INLINE'}"
      data-trigger-type="alwaysShow"
      data-trigger-value=""
      data-activation-type="alwaysActivated"
      data-activation-value=""
      data-deactivation-type="leadCollected"
      data-deactivation-value=""
      data-form-name="Website Lead Form"
      data-height="480"
      data-layout-iframe-id="inline-VpRmBNG8OgjMXfuTIwcQ"
      data-form-id="VpRmBNG8OgjMXfuTIwcQ"
      title="Website Lead Form"
      loading="eager"
      onLoad={() => setLoaded(true)}
    />
  );
}
