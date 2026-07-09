"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  RotateCcw,
  Save,
  Copy,
  CheckCircle2,
  XCircle,
  Clock,
  Code2,
  FileCode,
  Terminal,
  Share2,
} from "lucide-react"
import toast from "react-hot-toast"

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

const starterCode = `# Python Playground
# Write and run Python code here

def greet(name):
    return f"Hello, {name}!"

# Test your code
print(greet("Python Master"))

# Try some operations
numbers = [1, 2, 3, 4, 5]
squared = [x**2 for x in numbers]
print(f"Squared: {squared}")

# Challenge: Write a fibonacci function
def fibonacci(n):
    # Your code here
    pass
`

const sampleCodes = [
  {
    name: "Hello World",
    code: 'print("Hello, PyMaster!")\nprint("Welcome to the interactive playground.")',
  },
  {
    name: "Data Structures",
    code: `# Lists, Dicts, and Sets
fruits = ["apple", "banana", "cherry"]
print(f"List: {fruits}")

person = {"name": "Alice", "age": 30, "city": "NYC"}
print(f"Dict: {person}")

unique = {1, 2, 3, 3, 2, 1}
print(f"Set (unique): {unique}")

# List comprehension
squares = [x**2 for x in range(10)]
print(f"Squares: {squares}")`,
  },
  {
    name: "Functions",
    code: `# Functions deep dive
def factorial(n):
    """Calculate factorial recursively."""
    if n <= 1:
        return 1
    return n * factorial(n - 1)

def fibonacci(n):
    """Generate fibonacci sequence."""
    a, b = 0, 1
    result = []
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result

print(f"Factorial of 5: {factorial(5)}")
print(f"Fibonacci: {fibonacci(10)}")

# Lambda
square = lambda x: x ** 2
print(f"Lambda square: {square(12)}")`,
  },
  {
    name: "OOP",
    code: `# Object-Oriented Programming
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        raise NotImplementedError

class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

# Polymorphism
animals = [Dog("Rex"), Cat("Whiskers")]
for animal in animals:
    print(animal.speak())

# Dataclass
from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float

p = Point(3.0, 4.0)
print(f"Point: {p}")
print(f"Distance from origin: {(p.x**2 + p.y**2)**0.5:.2f}")`,
  },
]

export default function PlaygroundPage() {
  const [code, setCode] = useState(starterCode)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const runCode = useCallback(async () => {
    setIsRunning(true)
    setError(null)
    setOutput("")

    try {
      // Use Pyodide or similar in production
      // For now, simulate execution
      const lines = code.split("\n")
      const output_lines: string[] = []

      // Simple Python simulation for demo
      const mockOutput = [
        "Hello, Python Master!",
        "Squared: [1, 4, 9, 16, 25]",
        "",
        ">>> Code executed successfully (simulated)",
        ">>> In production, this runs actual Python via Pyodide/WASM",
      ]

      for (const line of mockOutput) {
        output_lines.push(line)
      }

      setOutput(output_lines.join("\n"))
      toast.success("Code executed successfully!")
    } catch (err: any) {
      setError(err.message || "Execution failed")
      toast.error("Execution failed")
    } finally {
      setIsRunning(false)
    }
  }, [code])

  const resetCode = () => {
    setCode(starterCode)
    setOutput("")
    setError(null)
    toast.success("Code reset")
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    toast.success("Copied to clipboard!")
  }

  const loadSample = (sampleCode: string) => {
    setCode(sampleCode)
    setOutput("")
    setError(null)
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Python Playground</h1>
            <p className="text-muted-foreground mt-1">Write, run, and experiment with Python code</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={copyCode}>
              <Copy className="h-4 w-4 mr-1.5" /> Copy
            </Button>
            <Button variant="outline" size="sm" onClick={resetCode}>
              <RotateCcw className="h-4 w-4 mr-1.5" /> Reset
            </Button>
            <Button size="sm" variant="gradient" onClick={runCode} disabled={isRunning}>
              <Play className="h-4 w-4 mr-1.5" />
              {isRunning ? "Running..." : "Run"}
            </Button>
          </div>
        </div>

        {/* Sample Codes */}
        <div className="flex flex-wrap gap-2 mb-6">
          {sampleCodes.map((sample) => (
            <Badge
              key={sample.name}
              variant="outline"
              className="cursor-pointer hover:bg-accent transition-colors px-3 py-1.5"
              onClick={() => loadSample(sample.code)}
            >
              <FileCode className="h-3 w-3 mr-1" />
              {sample.name}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-blue-400" />
                  main.py
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[500px]">
                <MonacoEditor
                  height="100%"
                  defaultLanguage="python"
                  theme="vs-dark"
                  value={code}
                  onChange={(val) => setCode(val || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 16 },
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Output */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-green-400" />
                  Output
                </CardTitle>
                {output && (
                  <Badge variant="success" className="text-xs">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> Completed
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] bg-muted/30 rounded-xl p-4 font-mono text-sm overflow-auto">
                {error ? (
                  <div className="text-red-400">
                    <XCircle className="h-4 w-4 inline mr-1" />
                    {error}
                  </div>
                ) : output ? (
                  <pre className="text-green-400 whitespace-pre-wrap">{output}</pre>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <Play className="h-8 w-8 mb-2" />
                    <p>Click "Run" to execute your code</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
