"use client";

import { ImageItem } from "@/app/admin/add-products/AddProductForm";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type SelectImageProps = {
  item?: ImageItem;
  handleFileChange: (value: File) => void;
};

const SelectImage = ({ item, handleFileChange }: SelectImageProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleFileChange(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpeg"] },
  });
  return (
    <div
      {...getRootProps()}
      className="border-2 border-slate-200 p-2 border-dashed cursor-pointer text-sm font-normal text-slate-400 flex items-center justify-center w-full"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>+{item?.color} Image</p>
      )}
    </div>
  );
};

export default SelectImage;
