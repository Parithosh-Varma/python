"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  StickyNote,
  Plus,
  Search,
  Tag,
  Clock,
  Trash2,
  Edit3,
  Save,
  X,
  FileText,
} from "lucide-react"
import { generateId, formatDate } from "@/lib/utils"
import toast from "react-hot-toast"

export default function NotesPage() {
  const { notes, addNote, updateNote, deleteNote } = useStore()
  const [search, setSearch] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newTitle, setNewTitle] = useState("")
  const [newContent, setNewContent] = useState("")
  const [newTags, setNewTags] = useState("")
  const [showEditor, setShowEditor] = useState(false)

  const filtered = notes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase()) ||
    n.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  )

  const handleCreate = () => {
    if (!newTitle.trim()) return
    addNote({
      id: generateId(),
      title: newTitle,
      content: newContent,
      tags: newTags.split(",").map((t) => t.trim()).filter(Boolean),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    setNewTitle("")
    setNewContent("")
    setNewTags("")
    setShowEditor(false)
    toast.success("Note created!")
  }

  const handleSave = (id: string) => {
    setEditingId(null)
    toast.success("Note saved!")
  }

  const handleDelete = (id: string) => {
    deleteNote(id)
    toast.success("Note deleted")
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Notes</h1>
            <p className="text-muted-foreground mt-1">{notes.length} notes saved</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="gradient" onClick={() => setShowEditor(!showEditor)}>
              <Plus className="h-4 w-4 mr-1.5" /> New Note
            </Button>
          </div>
        </div>

        {showEditor && (
          <Card className="mb-8 border-blue-600/30">
            <CardContent className="p-6">
              <Input
                placeholder="Note title..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="mb-4 text-lg font-semibold border-0 px-0 focus-visible:ring-0"
              />
              <textarea
                placeholder="Write your notes here... (Markdown supported)"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full min-h-[200px] bg-transparent border-0 resize-none focus:outline-none text-sm text-muted-foreground mb-4"
              />
              <Input
                placeholder="Tags (comma separated)"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
                className="mb-4"
              />
              <div className="flex items-center gap-2">
                <Button variant="gradient" size="sm" onClick={handleCreate}>
                  <Save className="h-4 w-4 mr-1" /> Save
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowEditor(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <StickyNote className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No notes yet. Create your first note!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((note, i) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
              >
                <Card className="group h-full hover:border-blue-600/30 transition-all">
                  <CardContent className="p-5">
                    {editingId === note.id ? (
                      <div>
                        <input
                          defaultValue={note.title}
                          className="w-full bg-transparent font-semibold mb-2 focus:outline-none"
                        />
                        <textarea
                          defaultValue={note.content}
                          className="w-full min-h-[120px] bg-transparent text-sm text-muted-foreground resize-none focus:outline-none"
                        />
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" onClick={() => handleSave(note.id)}>
                            <Save className="h-3 w-3 mr-1" /> Save
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <div onClick={() => setEditingId(note.id)} className="cursor-pointer">
                        <h3 className="font-semibold mb-2 group-hover:text-blue-400 transition-colors">{note.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-4 mb-3">{note.content}</p>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {note.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              <Tag className="h-3 w-3 mr-1" /> {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {formatDate(new Date(note.updated_at))}
                          </span>
                          <Trash2
                            className="h-3.5 w-3.5 text-muted-foreground hover:text-red-400 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(note.id)
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
