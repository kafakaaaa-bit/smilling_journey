interface LogoProps {
  variant?: "default" | "light" | "compact";
  className?: string;
}

/**
 * Official Smiling Journey Logo Component
 * Renders the official brand logo emblem featuring the smiling car illustration
 * and "Smiling Journey" typography lockup.
 */
export function Logo({ variant = "default", className = "" }: LogoProps) {
  const isLight = variant === "light";

  if (variant === "compact") {
    return (
      <div className={`inline-flex items-center select-none ${className}`} aria-label="Smiling Journey Logo">
        <img
          src="/logo.png"
          alt="Smiling Journey Logo"
          style={{ maxHeight: "32px", width: "auto" }}
          className="h-8 w-auto object-contain transition-transform hover:scale-105"
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`} aria-label="Smiling Journey Logo">
      {isLight ? (
        /* Light Variant for Dark Navy Sections (Header drawer & Footer) */
        <div className="flex items-center gap-2 bg-white/95 px-2.5 py-1 rounded-lg shadow-sm backdrop-blur-sm border border-white/20">
          <img
            src="/logo.png"
            alt="Smiling Journey Logo"
            style={{ maxHeight: "36px", width: "auto" }}
            className="h-8 sm:h-9 w-auto object-contain"
            loading="eager"
          />
        </div>
      ) : (
        /* Default Variant for Light Headers & General Pages */
        <img
          src="/logo.png"
          alt="Smiling Journey Logo"
          style={{ maxHeight: "44px", width: "auto" }}
          className="h-9 sm:h-11 w-auto object-contain transition-transform hover:scale-105"
          loading="eager"
        />
      )}
    </div>
  );
}
