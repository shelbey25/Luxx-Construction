type LogoProps = {
  className?: string;
  imageClassName?: string;
  showWordmark?: boolean;
  compact?: boolean;
};

export function Logo({
  className = "",
  imageClassName = "",
  showWordmark = true,
  compact = false,
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`.trim()}>
      <span className="inline-flex items-center justify-center rounded-2xl px-3 py-2 shadow-[0_12px_32px_-20px_rgba(246,242,234,0.65)]">
        <img
          src="/color-replaced.png"
          alt="LUXX Construction"
          className={`block h-auto w-[104px] sm:w-[116px] ${imageClassName}`.trim()}
        />
      </span>
  
    </span>
  );
}