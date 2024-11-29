"use client";

import { Image } from "@/types";
import { CldImage, getCldImageUrl } from "next-cloudinary";

interface PhotoThumbnailProps {
  image: Image;
  width?: number;
  height?: number;
}

export const PhotoThumbnail = ({
  image,
  width = 400,
  height = 200,
}: PhotoThumbnailProps) => {
  if (!image || !image.public_id) return null;

  const url = getCldImageUrl({ width, height, src: image.public_id });

  return (
    <CldImage
      width={width}
      height={height}
      src={url}
      alt={image.display_name ?? ""}
      unoptimized
    />
  );
};
