import { Image } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import { Dispatch, SetStateAction } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface PhotoDialogProps {
  image: Image;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const PhotoDialog = ({ image, open, setOpen }: PhotoDialogProps) => {
  const url = getCldImageUrl({
    width: 400,
    height: 800,
    src: image.public_id!,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{image.display_name ?? "Photo"}</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>
              {image.display_name ?? "Photo"}
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <CldImage
          className="width-auto"
          src={url}
          alt={image.display_name ?? ""}
          width={400}
          height={800}
          unoptimized
        />
      </DialogContent>
    </Dialog>
  );
};
