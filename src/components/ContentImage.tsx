interface ContentImageProps {
  style: Record<string, string>;
  className?: string;
  /** Escurece a foto para texto legível por cima */
  overlay?: "none" | "light" | "dark" | "hero";
  ariaLabel?: string;
}

const overlayClass = {
  none: "",
  light: "bg-white/20",
  dark: "bg-twilight-indigo/60",
  hero: "bg-gradient-to-br from-twilight-indigo/90 via-[#2d3048]/82 to-[#1a1c28]/95",
} as const;

export default function ContentImage({
  style,
  className = "",
  overlay = "none",
  ariaLabel,
}: ContentImageProps) {
  const hasPhoto = Boolean(style.backgroundImage);
  const showOverlay = hasPhoto && overlay !== "none";

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={style}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
    >
      {showOverlay && (
        <div className={`absolute inset-0 ${overlayClass[overlay]}`} aria-hidden />
      )}
    </div>
  );
}
