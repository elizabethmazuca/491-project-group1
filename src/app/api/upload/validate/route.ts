import { NextRequest, NextResponse } from 'next/server'
import { validateImageFile } from '@/lib/image-upload-validation'

/**
 * POST /api/upload/validate
 * Validates an image file before upload
 * 
 * Request body: FormData with 'file' field
 * 
 * Success (200): { valid: true }
 * Error (400): { valid: false, error: string }
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    // Check if file is provided
    if (!file) {
      return NextResponse.json(
        { valid: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate the file
    const validation = validateImageFile(file)

    if (!validation.valid) {
      return NextResponse.json(
        { valid: false, error: validation.error },
        { status: 400 }
      )
    }

    // Success response
    return NextResponse.json(
      { valid: true, filename: file.name, size: file.size, type: file.type },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error validating image upload:', error)
    return NextResponse.json(
      { valid: false, error: 'Failed to validate image upload' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/upload/validate
 * Returns validation constraints (max size, accepted types)
 */
export async function GET() {
  return NextResponse.json(
    {
      maxSize: 5 * 1024 * 1024, // 5MB in bytes
      maxSizeMB: 5,
      acceptedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    },
    { status: 200 }
  )
}

