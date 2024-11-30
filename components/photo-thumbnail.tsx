"use client";

import { Image } from "@/types";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import { PhotoDialog } from "./photo-dialog";
import { useState } from "react";

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
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!image || !image.public_id) return null;

  const url = getCldImageUrl({ width, height, src: image.public_id });

  const handlePhotoClick = () => setDialogOpen((prev) => !prev);

  return (
    <li>
      <div onClick={handlePhotoClick}>
        <CldImage
          width={width}
          height={height}
          src={url}
          alt={image.display_name ?? ""}
          unoptimized
        />
      </div>
      <PhotoDialog open={dialogOpen} image={image} setOpen={setDialogOpen} />
    </li>
  );
};
