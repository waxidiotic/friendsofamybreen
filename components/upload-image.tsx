"use client";

import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { Button } from "./ui/button";
import { createImagesAction } from "@/app/actions";
import { Image } from "@/types";

const CLD_UPLOAD_PRESET = "friendsofamybreen";

export const UploadImage = () => {
  const handleUploadSuccess = async (result: CloudinaryUploadWidgetResults) => {
    if (
      result.event === "success" &&
      result.info &&
      typeof result.info === "object"
    ) {
      try {
        await createImagesAction(result.info as unknown as Image);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <CldUploadWidget
      uploadPreset={CLD_UPLOAD_PRESET}
      onSuccess={handleUploadSuccess}
    >
      {({ open }) => {
        return <Button onClick={() => open()}>Upload an Image</Button>;
      }}
    </CldUploadWidget>
  );
};
