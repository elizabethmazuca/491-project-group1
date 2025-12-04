/**
 * Image upload validation utilities
 * Validates file size and type for image uploads in the Feed
 */

// Maximum file size: 5MB (5 * 1024 * 1024 bytes)
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024

// Accepted image types
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
] as const

export type ImageValidationResult =
  | { valid: true }
  | { valid: false; error: string }

/**
 * Validates an image file for upload
 * @param file - The file to validate
 * @returns Validation result with valid flag and optional error message
 */
export const validateImageFile = (file: File): ImageValidationResult => {
  // Check file type
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type as (typeof ACCEPTED_IMAGE_TYPES)[number])) {
    return {
      valid: false,
      error: `File type "${file.type}" is not supported. Please upload a JPEG, PNG, GIF, or WebP image.`,
    }
  }

  // Check file size
  if (file.size > MAX_IMAGE_SIZE) {
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2)
    const maxSizeMB = MAX_IMAGE_SIZE / (1024 * 1024)
    return {
      valid: false,
      error: `Image size (${fileSizeMB}MB) exceeds maximum allowed size of ${maxSizeMB}MB`,
    }
  }

  return { valid: true }
}

/**
 * Formats file size in bytes to human-readable string
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "1.5 MB")
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

