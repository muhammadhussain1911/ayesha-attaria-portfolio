"use client";

import React, { useState, useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Upload, X, AlertCircle } from "lucide-react";
import Image from "next/image";

interface CloudinaryUploaderProps {
  value: string; // Current image URL
  onChange: (url: string) => void;
  folder?: string; // Cloudinary folder (e.g., 'portfolio/blogs')
  label?: string;
  preview?: boolean;
  maxSize?: number; // MB
}

export function CloudinaryUploader({
  value,
  onChange,
  folder = "portfolio",
  label = "Upload Image",
  preview = true,
  maxSize = 5,
}: CloudinaryUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleUploadSuccess = useCallback(
    (result: any) => {
      const imageUrl = result.info.secure_url;
      onChange(imageUrl);
      setUploading(false);
      setError("");
    },
    [onChange],
  );

  const handleUploadError = useCallback((error: any) => {
    setError(error.message || "Upload failed");
    setUploading(false);
  }, []);

  return (
    <div className="space-y-3">
      {/* Label */}
      <label className="block text-sm font-medium text-black">{label}</label>

      {/* Upload Widget */}
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={handleUploadSuccess}
        onError={handleUploadError}
        onQueuesStart={() => setUploading(true)}
        options={{
          folder,
          maxFileSize: maxSize * 1024 * 1024,
          maxFiles: 1,
          resourceType: "image",
          sources: ["local", "url"],
          styles: {
            palette: {
              window: "#ffffff",
              windowBorder: "#e5e5e5",
              tabIcon: "#4ddcd3",
              menuIcons: "#666",
              textDark: "#333",
              textLight: "#999",
              link: "#4ddcd3",
              action: "#4ddcd3",
              inactiveTabIcon: "#999",
              error: "#ef4444",
              inProgress: "#4ddcd3",
              complete: "#4ddcd3",
              sourceBg: "#f5f5f5",
            },
          },
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            disabled={uploading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl hover:border-[#4ddcd3] hover:bg-[#4ddcd3]/5 transition-colors disabled:opacity-50"
          >
            <Upload className={`w-5 h-5 ${uploading ? "animate-spin" : ""}`} />
            <span className="text-sm font-medium">
              {uploading ? "Uploading..." : "Click to upload or drag"}
            </span>
          </button>
        )}
      </CldUploadWidget>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Image Preview */}
      {preview && value && (
        <div className="relative w-full bg-off-white rounded-xl overflow-hidden border border-gray-200">
          <div className="relative w-full h-48">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>

          {/* Remove Button */}
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* URL Display */}
          <div className="p-3 bg-off-white border-t border-gray-200">
            <p className="text-xs text-gray-600 break-all">{value}</p>
          </div>
        </div>
      )}
    </div>
  );
}
