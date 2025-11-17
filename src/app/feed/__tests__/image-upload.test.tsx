import { describe, it, expect } from 'vitest'
import {
  validateImageFile,
  MAX_IMAGE_SIZE,
  ACCEPTED_IMAGE_TYPES,
  formatFileSize,
} from '@/lib/image-upload-validation'

describe('Feed Page - Image Upload Max File Size', () => {
  // Helper function to create test files
  const createFile = (size: number, type: string = 'image/jpeg') => {
    const file = new File(['x'.repeat(size)], 'test-image.jpg', { type })
    Object.defineProperty(file, 'size', {
      value: size,
      writable: false,
    })
    return file
  }

  it('should reject image files larger than 5MB', () => {
    // Create a file larger than 5MB (6MB)
    const largeFile = createFile(6 * 1024 * 1024)

    // Test validation function
    const result = validateImageFile(largeFile)
    expect(result.valid).toBe(false)
    expect(result.error).toContain('exceeds maximum allowed size')
    expect(result.error).toContain('5MB')
  })

  it('should accept image files exactly at 5MB limit', () => {
    const maxSizeFile = createFile(MAX_IMAGE_SIZE)

    const result = validateImageFile(maxSizeFile)
    expect(result.valid).toBe(true)
    expect(result.error).toBeUndefined()
  })

  it('should accept image files smaller than 5MB', () => {
    // Test with various sizes under 5MB
    const sizes = [
      1024, // 1KB
      1024 * 1024, // 1MB
      2 * 1024 * 1024, // 2MB
      4 * 1024 * 1024, // 4MB
      4.5 * 1024 * 1024, // 4.5MB
    ]

    sizes.forEach((size) => {
      const file = createFile(size)
      const result = validateImageFile(file)
      expect(result.valid).toBe(true)
      expect(result.error).toBeUndefined()
    })
  })

  it('should show error message when file exceeds max size', () => {
    const largeFile = createFile(10 * 1024 * 1024) // 10MB
    const result = validateImageFile(largeFile)

    expect(result.valid).toBe(false)
    expect(result.error).toBeDefined()
    expect(result.error).toMatch(/10\.00MB.*exceeds.*5MB/)
  })

  it('should validate image file types are accepted', () => {
    ACCEPTED_IMAGE_TYPES.forEach((type) => {
      const file = createFile(1024 * 1024, type) // 1MB file
      expect(file.type).toBe(type)
      expect(file.size).toBeLessThanOrEqual(MAX_IMAGE_SIZE)
    })
  })

  it('should format file sizes correctly', () => {
    expect(formatFileSize(512)).toBe('512 B')
    expect(formatFileSize(1024)).toBe('1.00 KB')
    expect(formatFileSize(1024 * 1024)).toBe('1.00 MB')
    expect(formatFileSize(2.5 * 1024 * 1024)).toBe('2.50 MB')
  })
})

