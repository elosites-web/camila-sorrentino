import type { ImgHTMLAttributes } from 'react';
import { getResponsiveImageSources, type ImageVariantMode } from '../utils/responsiveImage';

interface OptimizedPictureProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  src: string;
  sizes?: string;
  mode?: ImageVariantMode;
  pictureClassName?: string;
}

export function OptimizedPicture({
  src,
  alt = '',
  sizes,
  mode = 'default',
  pictureClassName,
  width,
  height,
  decoding = 'async',
  ...imgProps
}: OptimizedPictureProps) {
  const sources = getResponsiveImageSources(src, mode);

  if (!sources) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        decoding={decoding}
        {...imgProps}
      />
    );
  }

  return (
    <picture className={pictureClassName}>
      {sources.avifSrcSet && (
        <source type="image/avif" srcSet={sources.avifSrcSet} sizes={sizes} />
      )}
      <source type="image/webp" srcSet={sources.webpSrcSet} sizes={sizes} />
      <img
        src={sources.fallbackSrc}
        alt={alt}
        width={width ?? sources.width}
        height={height ?? sources.height}
        decoding={decoding}
        {...imgProps}
      />
    </picture>
  );
}
