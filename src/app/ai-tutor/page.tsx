"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sparkles,
  Send,
  Bot,
  User,
  Code2,
  BookOpen,
  Bug,
  Lightbulb,
  GraduationCap,
  Zap,
  RefreshCw,
  MessageSquare,
  StopCircle,
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

const quickActions = [
  { icon: BookOpen, label: "Explain a concept", prompt: "Explain Python decorators to me like I'm 5" },
  { icon: Code2, label: "Write code", prompt: "Write a Python function that finds all prime numbers up to n" },
  { icon: Bug, label: "Debug code", prompt: "Help me debug my Python code. I'll share it with you." },
  { icon: Lightbulb, label: "Practice questions", prompt: "Give me a practice question about Python lists" },
  { icon: GraduationCap, label: "Study plan", prompt: "Create a 4-week study plan to learn Python from scratch" },
  { icon: MessageSquare, label: "Interview prep", prompt: "Give me a Python interview question with solution" },
]

export default function AiTutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your AI Python tutor. I can help you learn Python, explain concepts, write code, debug errors, create practice problems, and more. What would you like help with today?",
      timestamp: new Date().toISOString(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (content: string) => {
    if (!content.trim() || isTyping) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        decorator: `## Understanding Python Decorators

A **decorator** is a function that takes another function and extends its behavior without modifying it directly.

### Simple Example:
\`\`\`python
def my_decorator(func):
    def wrapper():
        print("Something before the function")
        func()
        print("Something after the function")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()
\`\`\`

### Output:
\`\`\`
Something before the function
Hello!
Something after the function
\`\`\`

Think of decorators like wrapping a gift - the gift (function) stays the same, but you add a nice wrapper (decorator) around it!`,
        default: `Great question! Let me help you with that.

Here's a Python example to illustrate:

\`\`\`python
# Example code
def example_function():
    return "This is a helpful response from your AI tutor!"

print(example_function())
\`\`\`

**Key points to remember:**
1. Practice regularly
2. Build projects
3. Review concepts you find difficult

Would you like me to elaborate on any specific part?`,
      }

      let response = responses.default
      for (const [key, val] of Object.entries(responses)) {
        if (content.toLowerCase().includes(key)) {
          response = val
          break
        }
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, aiMsg])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (prompt: string) => {
    handleSend(prompt)
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">AI Tutor</h1>
            <p className="text-muted-foreground mt-1">Your personal Python learning assistant</p>
          </div>
          <Badge variant="info" className="px-3 py-1.5">
            <Sparkles className="h-4 w-4 mr-1" /> Powered by AI
          </Badge>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mb-6">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction(action.prompt)}
              className="text-xs"
            >
              <action.icon className="h-3.5 w-3.5 mr-1.5" />
              {action.label}
            </Button>
          ))}
        </div>

        {/* Chat */}
        <Card>
          <CardHeader className="pb-3 border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm">Python Tutor AI</CardTitle>
                <p className="text-xs text-muted-foreground">Online · Ready to help</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div ref={scrollRef} className="h-[500px] overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <Avatar className={`h-8 w-8 flex-shrink-0 ${msg.role === "assistant" ? "" : ""}`}>
                    {msg.role === "assistant" ? (
                      <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    ) : (
                      <AvatarFallback className="bg-accent">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      msg.role === "assistant"
                        ? "bg-accent/50 border"
                        : "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap leading-relaxed">
                      {msg.content.split("```").map((part, i) => {
                        if (i % 2 === 1) {
                          const [lang, ...code] = part.split("\n")
                          return (
                            <pre key={i} className="my-2 p-3 rounded-xl bg-black/40 font-mono text-xs overflow-x-auto">
                              <code>{code.join("\n")}</code>
                            </pre>
                          )
                        }
                        return <span key={i}>{part}</span>
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-2xl p-4 bg-accent/50 border">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Ask me anything about Python..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSend(input)
                    }
                  }}
                  className="flex-1"
                />
                <Button
                  variant="gradient"
                  size="icon"
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || isTyping}
                >
                  {isTyping ? <StopCircle className="h-5 w-5" /> : <Send className="h-5 w-5" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                AI responses are generated and may not be accurate. Verify important code.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
