export async function copyText(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return copyWithFallback(text);
    }
  }

  return copyWithFallback(text);
}

function copyWithFallback(text: string): boolean {
  if (typeof document === "undefined") {
    return false;
  }

  const activeElement =
    document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  textArea.style.pointerEvents = "none";
  document.body.appendChild(textArea);
  textArea.select();

  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    textArea.remove();
    activeElement?.focus();
  }
}
