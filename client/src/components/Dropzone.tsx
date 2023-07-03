import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box } from "@mui/material";

interface DropzoneProps {
  onDrop: (file: File) => void;
  children: React.ReactNode;
}

export default function DropzoneComponent({ onDrop, children }: DropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    onDrop: useCallback(
      (files: File[]) => {
        onDrop(files[0]);
      },
      [onDrop]
    ),
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "2px dashed",
        padding: "1rem",
        "&: hover": { cursor: "pointer" },
      }}
    >
      <input {...getInputProps()} />
      {children}
    </Box>
  );
}
