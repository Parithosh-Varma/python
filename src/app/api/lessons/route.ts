import { NextResponse } from "next/server"
import { lessons } from "@/lib/data/lessons"

export async function GET() {
  return NextResponse.json(Object.values(lessons))
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { lessonId, completed } = body
    // Save lesson completion to database
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
