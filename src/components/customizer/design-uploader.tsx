"use client";

import { Upload, X } from "lucide-react";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";
import { useCustomizerStore } from "@/store/customizer-store";

export function DesignUploader() {
  const { customization, setCustomization } = useCustomizerStore();
  const { designUrl, designFileName } = customization;

  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">
        Upload Design
      </p>

      {designUrl ? (
        <div className="relative border border-border bg-surface-elevated p-4">
          <button
            type="button"
            onClick={() =>
              setCustomization({ designUrl: null, designFileName: null })
            }
            className="absolute right-2 top-2 rounded-full bg-black/80 p-1.5 text-white hover:bg-black"
            aria-label="Remove design"
          >
            <X size={14} />
          </button>
          <div className="relative mx-auto h-32 w-32">
            <Image
              src={designUrl}
              alt="Uploaded design"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          {designFileName && (
            <p className="mt-2 truncate text-center text-xs text-muted">
              {designFileName}
            </p>
          )}
        </div>
      ) : (
        <div className="border border-dashed border-border bg-surface p-8 text-center">
          <Upload className="mx-auto mb-3 text-muted" size={28} />
          <p className="mb-1 text-sm text-foreground">Drop your artwork here</p>
          <p className="mb-4 text-xs text-muted">PNG, JPG · Max 8MB</p>
          <UploadButton
            endpoint="designUploader"
            onClientUploadComplete={(res) => {
              if (res?.[0]) {
                setCustomization({
                  designUrl: res[0].ufsUrl ?? res[0].url,
                  designFileName: res[0].name,
                });
              }
            }}
            onUploadError={(error) => {
              console.error("Upload error:", error);
              alert("Upload failed. Check your Uploadthing configuration.");
            }}
            appearance={{
              button:
                "bg-white text-black text-xs uppercase tracking-widest px-6 py-2.5 ut-ready:bg-white ut-uploading:bg-neutral-300",
              allowedContent: "hidden",
            }}
          />
        </div>
      )}
    </div>
  );
}
