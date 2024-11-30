"use client";

import { Image } from "@/types";
import { Button } from "./ui/button";
import { deleteImageAction } from "@/app/actions";

interface DeletePhotoButtonProps {
  image: Image;
}

export const DeletePhotoButton = ({ image }: DeletePhotoButtonProps) => {
  return (
    <Button
      type="button"
      variant="destructive"
      onClick={() => deleteImageAction(image.public_id!)}
    >
      Delete
    </Button>
  );
};
