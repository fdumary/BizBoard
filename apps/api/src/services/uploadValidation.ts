import { fileTypeFromBuffer } from "file-type";

export const allowedDocumentMimeTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword"
] as const;

export const maxUploadBytes = 10 * 1024 * 1024;

export type ValidationResult = {
  valid: boolean;
  reason?: string;
  detectedMime?: string;
};

const magicStartsWith = (buffer: Buffer, signature: number[]): boolean => {
  if (buffer.length < signature.length) {
    return false;
  }
  return signature.every((byte, index) => buffer[index] === byte);
};

export async function validateDocumentUpload(
  fileName: string,
  claimedMimeType: string,
  buffer: Buffer
): Promise<ValidationResult> {
  if (buffer.length === 0) {
    return { valid: false, reason: "File is empty." };
  }

  if (buffer.length > maxUploadBytes) {
    return { valid: false, reason: "File exceeds 10 MB limit." };
  }

  const extension = fileName.split(".").pop()?.toLowerCase();
  if (!extension || !["pdf", "doc", "docx"].includes(extension)) {
    return { valid: false, reason: "Unsupported file extension." };
  }

  const detected = await fileTypeFromBuffer(buffer);
  const detectedMime = detected?.mime;

  // Reject executable headers even if the extension is spoofed.
  if (magicStartsWith(buffer, [0x4d, 0x5a])) {
    return { valid: false, reason: "Executable signatures are not allowed." };
  }

  if (!detectedMime || !allowedDocumentMimeTypes.includes(detectedMime as (typeof allowedDocumentMimeTypes)[number])) {
    return { valid: false, reason: "Detected MIME type is not permitted.", detectedMime };
  }

  if (claimedMimeType && !allowedDocumentMimeTypes.includes(claimedMimeType as (typeof allowedDocumentMimeTypes)[number])) {
    return { valid: false, reason: "Claimed MIME type is not permitted.", detectedMime };
  }

  return { valid: true, detectedMime };
}
