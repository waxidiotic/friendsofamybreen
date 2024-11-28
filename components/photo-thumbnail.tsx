"use client";

import { Image } from "@/types";
import { CldImage, getCldImageUrl } from "next-cloudinary";

export const PhotoThumbnail = ({ image }: { image: Image }) => {
  if (!image || !image.public_id) return null;

  const url = getCldImageUrl({ width: 400, height: 200, src: image.public_id });

  return (
    <CldImage
      width={400}
      height={200}
      src={url}
      alt={image.display_name ?? ""}
      unoptimized
    />
  );
};
