"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Flashcard } from "@/types"
import { RotateCcw, ChevronLeft, ChevronRight, Lightbulb } from "lucide-react"

interface FlashcardsProps {
  cards: Flashcard[]
}

export function Flashcards({ cards }: FlashcardsProps) {
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const card = cards[current]

  const next = () => {
    if (current < cards.length - 1) {
      setCurrent((c) => c + 1)
      setFlipped(false)
    }
  }

  const prev = () => {
    if (current > 0) {
      setCurrent((c) => c - 1)
      setFlipped(false)
    }
  }

  const restart = () => {
    setCurrent(0)
    setFlipped(false)
  }

  if (cards.length === 0) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-400" />
            Flashcards
          </CardTitle>
          <Badge variant="secondary">
            {current + 1}/{cards.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${current}-${flipped}`}
            initial={{ opacity: 0, rotateY: flipped ? 90 : -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            className="perspective-1000"
          >
            <div
              onClick={() => setFlipped(!flipped)}
              className="relative cursor-pointer min-h-[160px] rounded-xl bg-primary/10 border border-primary/20 p-6 flex items-center justify-center text-center hover:bg-primary/20 transition-all"
            >
              <div>
                <p className="text-xs text-muted-foreground mb-2">
                  {flipped ? "Definition" : "Concept"}
                </p>
                <p className="text-lg font-medium">
                  {flipped ? card.back : card.front}
                </p>
                <p className="text-xs text-muted-foreground mt-4">
                  Click to {flipped ? "see concept" : "reveal answer"}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-4">
          <Button variant="outline" size="sm" onClick={prev} disabled={current === 0}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <Button variant="ghost" size="sm" onClick={restart}>
            <RotateCcw className="h-4 w-4 mr-1" /> Restart
          </Button>
          <Button variant="outline" size="sm" onClick={next} disabled={current === cards.length - 1}>
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
