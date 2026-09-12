import { useState } from "react";

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  wrapperClassName?: string;
};

export function SmartImage({ src, alt, className = "", loading = "lazy", wrapperClassName = "" }: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`image-frame ${wrapperClassName}`}>
      {failed ? (
        <div className="image-fallback" role="img" aria-label={alt}>
          <span>{alt}</span>
        </div>
      ) : (
        <img src={src} alt={alt} loading={loading} decoding="async" onError={() => setFailed(true)} className={className} />
      )}
    </div>
  );
}
