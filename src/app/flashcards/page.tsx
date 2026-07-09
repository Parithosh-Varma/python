"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Lightbulb,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Volume2,
  Bookmark,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Brain,
} from "lucide-react"

const flashcardData = [
  { id: "f1", front: "What is a decorator in Python?", back: "A function that takes another function and extends its behavior without modifying it." },
  { id: "f2", front: "What is the GIL?", back: "Global Interpreter Lock - a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecode simultaneously." },
  { id: "f3", front: "What is a generator?", back: "A function that yields values lazily using the yield keyword, allowing iteration over a sequence without storing the entire sequence in memory." },
  { id: "f4", front: "What is PEP 8?", back: "Python Enhancement Proposal 8 - the style guide for Python code, covering naming conventions, indentation, and code layout." },
  { id: "f5", front: "What is __init__?", back: "The constructor method in Python classes, called automatically when a new instance is created." },
  { id: "f6", front: "What is a lambda function?", back: "An anonymous inline function defined with the lambda keyword, typically used for short, simple operations." },
  { id: "f7", front: "What is the difference between list and tuple?", back: "Lists are mutable (can be changed), tuples are immutable (cannot be changed after creation)." },
  { id: "f8", front: "What is a context manager?", back: "An object that defines __enter__ and __exit__ methods, used with the 'with' statement for resource management." },
  { id: "f9", front: "What is self in Python?", back: "A reference to the current instance of a class, used to access instance variables and methods." },
  { id: "f10", front: "What is duck typing?", back: "A concept where the type of an object is determined by its behavior (methods/properties) rather than its explicit type." },
]

export default function FlashcardsPage() {
  const [cards] = useState(flashcardData)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set())
  const [unknownCards, setUnknownCards] = useState<Set<string>>(new Set())

  const currentCard = cards[currentIndex]
  const progress = ((currentIndex + 1) / cards.length) * 100

  const next = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((i) => i + 1)
      setFlipped(false)
    }
  }

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1)
      setFlipped(false)
    }
  }

  const markKnown = () => {
    setKnownCards((s) => new Set(s).add(currentCard.id))
    next()
  }

  const markUnknown = () => {
    setUnknownCards((s) => new Set(s).add(currentCard.id))
    next()
  }

  const reset = () => {
    setCurrentIndex(0)
    setFlipped(false)
    setKnownCards(new Set())
    setUnknownCards(new Set())
  }

  if (currentIndex >= cards.length) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <Brain className="h-16 w-16 mx-auto mb-4 text-blue-400" />
          <h2 className="text-2xl font-bold mb-2">Session Complete!</h2>
          <p className="text-muted-foreground mb-6">
            Known: {knownCards.size} · Need Review: {unknownCards.size}
          </p>
          <Progress value={(knownCards.size / cards.length) * 100} className="h-2 mb-6 max-w-xs mx-auto" />
          <Button variant="gradient" onClick={reset}>
            <RefreshCw className="h-4 w-4 mr-1.5" /> Start Over
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Flashcards</h1>
            <p className="text-muted-foreground mt-1">Review Python concepts with spaced repetition</p>
          </div>
          <Badge variant="secondary">
            {currentIndex + 1} / {cards.length}
          </Badge>
        </div>

        <Progress value={progress} className="h-1.5 mb-8" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, rotateY: flipped ? 90 : -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: flipped ? -90 : 90 }}
            transition={{ duration: 0.3 }}
          >
            <div
              onClick={() => setFlipped(!flipped)}
              className="cursor-pointer min-h-[300px] rounded-2xl bg-gradient-to-br from-blue-700/10 via-blue-400/5 to-blue-700/10 border border-blue-600/20 p-8 md:p-12 flex items-center justify-center text-center hover:from-blue-700/20 hover:to-blue-400/20 transition-all duration-300"
            >
              <div>
                <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">
                  {flipped ? "Definition" : "Concept"}
                </p>
                <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-xl">
                  {flipped ? currentCard.back : currentCard.front}
                </p>
                <p className="text-xs text-muted-foreground mt-6">
                  {flipped ? "Click to see the concept" : "Click to reveal the answer"}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-6">
          <Button variant="outline" size="sm" onClick={prev} disabled={currentIndex === 0}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={markUnknown}
              className="text-red-400 hover:text-red-300"
            >
              <XCircle className="h-4 w-4 mr-1" /> Still Learning
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={markKnown}
              className="text-green-400 hover:text-green-300"
            >
              <CheckCircle2 className="h-4 w-4 mr-1" /> Got It
            </Button>
          </div>

          <Button variant="outline" size="sm" onClick={next} disabled={currentIndex === cards.length - 1}>
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-green-400" /> Known: {knownCards.size}
          </span>
          <span className="flex items-center gap-1">
            <XCircle className="h-3 w-3 text-red-400" /> Review: {unknownCards.size}
          </span>
          <span className="flex items-center gap-1">
            <Brain className="h-3 w-3 text-blue-400" /> Remaining: {cards.length - currentIndex}
          </span>
        </div>
      </motion.div>
    </div>
  )
}
