"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "./ui/button";

const CLD_UPLOAD_PRESET = "friendsofamybreen";

export const UploadImage = () => {
  return (
    <CldUploadWidget uploadPreset={CLD_UPLOAD_PRESET}>
      {({ open }) => {
        return <Button onClick={() => open()}>Upload an Image</Button>;
      }}
    </CldUploadWidget>
  );
};
