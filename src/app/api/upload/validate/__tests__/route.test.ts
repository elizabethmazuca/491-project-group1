import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST, GET } from '../route'
import { NextRequest } from 'next/server'

// Mock the validation function
const mockValidateImageFile = vi.fn()
vi.mock('@/lib/image-upload-validation', () => ({
  validateImageFile: (...args: any[]) => mockValidateImageFile(...args),
  MAX_IMAGE_SIZE: 5 * 1024 * 1024,
  ACCEPTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
}))

// Mock File for Node.js
class MockFile {
  name: string
  type: string
  size: number

  constructor(parts: string[], filename: string, options?: { type?: string }) {
    this.name = filename
    this.type = options?.type || 'image/jpeg'
    this.size = parts.reduce((acc, part) => acc + part.length, 0)
  }
}

// Make File available globally
if (typeof globalThis.File === 'undefined') {
  ;(globalThis as any).File = MockFile
}

// Helper to create a mock NextRequest with FormData
function createMockRequest(file: File | null): NextRequest {
  const formData = new FormData()
  if (file) {
    formData.append('file', file)
  }

  // Create a mock request with FormData
  const request = new NextRequest('http://localhost:3000/api/upload/validate', {
    method: 'POST',
    body: formData,
  })

  return request
}

describe('POST /api/upload/validate', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Happy Path', () => {
    it('should return 200 with valid:true for valid image file', async () => {
      mockValidateImageFile.mockReturnValue({ valid: true })

      const file = new File(['test image data'], 'test.jpg', { type: 'image/jpeg' })
      const request = createMockRequest(file)

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual({
        valid: true,
        filename: 'test.jpg',
        size: file.size,
        type: 'image/jpeg',
      })
      expect(mockValidateImageFile).toHaveBeenCalledWith(file)
    })

    it('should accept valid PNG file', async () => {
      mockValidateImageFile.mockReturnValue({ valid: true })

      const file = new File(['png data'], 'image.png', { type: 'image/png' })
      const request = createMockRequest(file)

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.valid).toBe(true)
      expect(data.type).toBe('image/png')
    })

    it('should accept valid file at max size (5MB)', async () => {
      const { MAX_IMAGE_SIZE } = await import('@/lib/image-upload-validation')
      mockValidateImageFile.mockReturnValue({ valid: true })

      const file = new File(['x'.repeat(MAX_IMAGE_SIZE)], 'large.jpg', { type: 'image/jpeg' })
      Object.defineProperty(file, 'size', { value: MAX_IMAGE_SIZE, writable: false })
      const request = createMockRequest(file)

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.valid).toBe(true)
    })
  })

  describe('Failure Path', () => {
    it('should return 400 with error when no file is provided', async () => {
      const request = createMockRequest(null)

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data).toEqual({
        valid: false,
        error: 'No file provided',
      })
    })

    it('should return 400 when file exceeds max size', async () => {
      mockValidateImageFile.mockReturnValue({
        valid: false,
        error: 'Image size (6.00MB) exceeds maximum allowed size of 5MB',
      })

      const file = new File(['x'.repeat(6 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' })
      Object.defineProperty(file, 'size', { value: 6 * 1024 * 1024, writable: false })
      const request = createMockRequest(file)

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data).toEqual({
        valid: false,
        error: 'Image size (6.00MB) exceeds maximum allowed size of 5MB',
      })
      expect(mockValidateImageFile).toHaveBeenCalledWith(file)
    })

    it('should return 400 when file type is not supported', async () => {
      mockValidateImageFile.mockReturnValue({
        valid: false,
        error: 'File type "image/svg+xml" is not supported. Please upload a JPEG, PNG, GIF, or WebP image.',
      })

      const file = new File(['svg data'], 'image.svg', { type: 'image/svg+xml' })
      const request = createMockRequest(file)

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data).toEqual({
        valid: false,
        error: 'File type "image/svg+xml" is not supported. Please upload a JPEG, PNG, GIF, or WebP image.',
      })
    })

    it('should return 500 when validation throws an error', async () => {
      mockValidateImageFile.mockImplementation(() => {
        throw new Error('Unexpected error')
      })

      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
      const request = createMockRequest(file)

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data).toEqual({
        valid: false,
        error: 'Failed to validate image upload',
      })
    })
  })
})

describe('GET /api/upload/validate', () => {
  it('should return validation constraints', async () => {
    const request = new NextRequest('http://localhost:3000/api/upload/validate', {
      method: 'GET',
    })

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual({
      maxSize: 5 * 1024 * 1024,
      maxSizeMB: 5,
      acceptedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    })
  })
})

