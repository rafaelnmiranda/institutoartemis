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
  dark: "bg-twilight-indigo/55",
  hero: "bg-gradient-to-br from-twilight-indigo/88 via-twilight-indigo/75 to-[#252739]/92",
} as const;

export default function ContentImage({
  style,
  className = "",
  overlay = "none",
  ariaLabel,
}: ContentImageProps) {
  const hasPhoto = Boolean(style.backgroundImage);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={style}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
    >
      {hasPhoto && overlay !== "none" && (
        <div className={`absolute inset-0 ${overlayClass[overlay]}`} aria-hidden />
      )}
    </div>
  );
}
