"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, RotateCcw, Lightbulb, CheckCircle2, XCircle, Terminal } from "lucide-react"
import toast from "react-hot-toast"

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

interface CodePlaygroundProps {
  starterCode?: string
  solution?: string
  hint?: string
}

export function CodePlayground({ starterCode = "# Write your code here\n", solution, hint }: CodePlaygroundProps) {
  const [code, setCode] = useState(starterCode)
  const [output, setOutput] = useState("")
  const [showHint, setShowHint] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const runCode = () => {
    setError(null)
    setOutput("")
    try {
      const mockOutput = [
        ">>> Code executed successfully (simulated)",
        ">>> In production, this uses Pyodide WASM",
      ]
      setOutput(mockOutput.join("\n"))
    } catch (err: any) {
      setError(err.message)
    }
  }

  const resetCode = () => {
    setCode(starterCode)
    setOutput("")
    setError(null)
    setShowHint(false)
    setShowSolution(false)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Terminal className="h-4 w-4 text-purple-400" />
            Code Playground
          </CardTitle>
          <div className="flex items-center gap-2">
            {hint && (
              <Button variant="ghost" size="sm" onClick={() => setShowHint(!showHint)}>
                <Lightbulb className="h-4 w-4 mr-1" /> Hint
              </Button>
            )}
            {solution && (
              <Button variant="ghost" size="sm" onClick={() => setShowSolution(!showSolution)}>
                {showSolution ? "Hide" : "Show"} Solution
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={resetCode}>
              <RotateCcw className="h-4 w-4 mr-1" /> Reset
            </Button>
            <Button size="sm" variant="gradient" onClick={runCode}>
              <Play className="h-4 w-4 mr-1" /> Run
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-[300px] rounded-xl overflow-hidden border">
            <MonacoEditor
              height="100%"
              defaultLanguage="python"
              theme="vs-dark"
              value={code}
              onChange={(val) => setCode(val || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
          <div className="h-[300px] bg-muted/30 rounded-xl p-4 font-mono text-sm overflow-auto">
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
                <p className="text-sm">Run your code to see output</p>
              </div>
            )}
          </div>
        </div>
        {showHint && hint && (
          <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <p className="text-sm text-amber-400">
              <Lightbulb className="h-4 w-4 inline mr-1" />
              {hint}
            </p>
          </div>
        )}
        {showSolution && solution && (
          <div className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
            <p className="text-sm font-medium text-green-400 mb-2">Solution:</p>
            <pre className="text-sm text-green-300 font-mono whitespace-pre-wrap">{solution}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
