import { describe, it, expect } from 'vitest'
import {
  validateImageFile,
  MAX_IMAGE_SIZE,
  ACCEPTED_IMAGE_TYPES,
  formatFileSize,
} from '../image-upload-validation'

// Simple File-like object for Node.js testing
// Only implements the properties our validation function uses: size and type
interface MockFile {
  size: number
  type: string
  name?: string
}

describe('Image Upload Validation - Max File Size', () => {
  // Helper function to create test files
  // Returns a plain object that matches the File interface for our use case
  const createFile = (size: number, type: string = 'image/jpeg'): MockFile => {
    return {
      size,
      type,
      name: 'test-image.jpg',
    }
  }

  describe('validateImageFile', () => {
    it('should reject image files larger than 5MB', () => {
      // Create a file larger than 5MB (6MB)
      const largeFile = createFile(6 * 1024 * 1024)

      // Test validation function
      const result = validateImageFile(largeFile as File)
      
      expect(result.valid).toBe(false)
      expect(result.error).toBeDefined()
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
      const result = validateImageFile(largeFile as File)

      expect(result.valid).toBe(false)
      expect(result.error).toBeDefined()
      expect(result.error).toMatch(/10\.00MB.*exceeds.*5MB/)
    })

    it('should reject files with unsupported MIME types', () => {
      const unsupportedTypes = [
        'image/svg+xml',
        'application/pdf',
        'text/plain',
        'video/mp4',
      ]

      unsupportedTypes.forEach((type) => {
        const file = createFile(1024 * 1024, type) // 1MB file
        const result = validateImageFile(file)
        
        expect(result.valid).toBe(false)
        expect(result.error).toBeDefined()
        expect(result.error).toContain('not supported')
      })
    })

    it('should accept all supported image types', () => {
      ACCEPTED_IMAGE_TYPES.forEach((type) => {
        const file = createFile(1024 * 1024, type) // 1MB file
        const result = validateImageFile(file)
        
        expect(result.valid).toBe(true)
        expect(result.error).toBeUndefined()
      })
    })

    it('should handle edge case: 0-byte file', () => {
      const emptyFile = createFile(0, 'image/jpeg')
      const result = validateImageFile(emptyFile)
      
      // 0-byte file should pass size check but might fail other validations
      expect(result.valid).toBe(true)
    })

    it('should handle edge case: file just under max size', () => {
      const justUnderMax = createFile(MAX_IMAGE_SIZE - 1)
      const result = validateImageFile(justUnderMax)
      
      expect(result.valid).toBe(true)
      expect(result.error).toBeUndefined()
    })

    it('should handle edge case: file just over max size', () => {
      const justOverMax = createFile(MAX_IMAGE_SIZE + 1)
      const result = validateImageFile(justOverMax)
      
      expect(result.valid).toBe(false)
      expect(result.error).toBeDefined()
      expect(result.error).toContain('exceeds maximum allowed size')
    })
  })

  describe('formatFileSize', () => {
    it('should format bytes correctly', () => {
      expect(formatFileSize(512)).toBe('512 B')
    })

    it('should format kilobytes correctly', () => {
      expect(formatFileSize(1024)).toBe('1.00 KB')
      expect(formatFileSize(2048)).toBe('2.00 KB')
      expect(formatFileSize(1536)).toBe('1.50 KB')
    })

    it('should format megabytes correctly', () => {
      expect(formatFileSize(1024 * 1024)).toBe('1.00 MB')
      expect(formatFileSize(2.5 * 1024 * 1024)).toBe('2.50 MB')
      expect(formatFileSize(MAX_IMAGE_SIZE)).toBe('5.00 MB')
    })

    it('should handle zero bytes', () => {
      expect(formatFileSize(0)).toBe('0 B')
    })
  })

  describe('Constants', () => {
    it('should have MAX_IMAGE_SIZE set to 5MB', () => {
      expect(MAX_IMAGE_SIZE).toBe(5 * 1024 * 1024)
    })

    it('should have ACCEPTED_IMAGE_TYPES array with valid types', () => {
      expect(ACCEPTED_IMAGE_TYPES).toBeInstanceOf(Array)
      expect(ACCEPTED_IMAGE_TYPES.length).toBeGreaterThan(0)
      expect(ACCEPTED_IMAGE_TYPES).toContain('image/jpeg')
      expect(ACCEPTED_IMAGE_TYPES).toContain('image/png')
      expect(ACCEPTED_IMAGE_TYPES).toContain('image/gif')
      expect(ACCEPTED_IMAGE_TYPES).toContain('image/webp')
    })
  })
})

