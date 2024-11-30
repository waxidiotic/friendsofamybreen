"use client";

import { Image } from "@/types";
import { Button } from "./ui/button";
import { deleteImageAction } from "@/app/actions";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";

interface DeletePhotoButtonProps {
  image: Image;
}

export const DeletePhotoButton = ({ image }: DeletePhotoButtonProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button type="button" variant="destructive">
          Delete
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-4">
          <p className="text-sm font-medium">
            Are you sure you want to delete this photo?
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="destructive"
              onClick={() => deleteImageAction(image.public_id!)}
            >
              Yes
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setPopoverOpen(false)}
            >
              No
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
