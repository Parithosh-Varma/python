import { NextResponse } from "next/server"
import OpenAI from "openai"

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null

const systemPrompt = `You are PyMaster AI Tutor, an expert Python teacher. You help students learn Python programming.

Guidelines:
- Explain concepts clearly with examples
- Use Python code blocks with \`\`\`python
- Be encouraging and patient
- Adapt explanations to the student's level
- If the student asks about non-Python topics, politely redirect
- Keep responses concise but thorough
- When debugging, ask clarifying questions first`

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!client) {
      return NextResponse.json(
        {
          role: "assistant",
          content: `I'm currently in offline mode. To enable the AI tutor with real responses, add your \`OPENAI_API_KEY\` to the environment variables.

In the meantime, I can help with general Python concepts. What would you like to know?

\`\`\`python
# Example: Python is great for learning!
print("Hello, Python learner!")
\`\`\``,
        }
      )
    }

    const chatMessages = [
      { role: "system" as const, content: systemPrompt },
      ...messages.slice(-10).map((m: any) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ]

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chatMessages,
      max_tokens: 2048,
      temperature: 0.7,
    })

    return NextResponse.json(completion.choices[0].message)
  } catch (err: any) {
    return NextResponse.json(
      { role: "assistant", content: `Sorry, I encountered an error: ${err.message}. Please try again.` },
      { status: err.status || 500 }
    )
  }
}
