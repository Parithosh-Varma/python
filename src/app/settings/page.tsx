"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Settings,
  User,
  Sun,
  Moon,
  Bell,
  BellOff,
  Shield,
  Globe,
  Palette,
  Key,
  LogOut,
  Save,
  ChevronRight,
  Monitor,
  Smartphone,
  Eye,
  EyeOff,
  Mail,
  Volume2,
} from "lucide-react"
import toast from "react-hot-toast"

export default function SettingsPage() {
  const { theme, toggleTheme, user, setUser } = useStore()
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weekly_report: false,
    achievement_alerts: true,
    streak_reminders: true,
    new_content: true,
  })

  const handleSave = () => {
    if (user) {
      setUser({ ...user, name })
    }
    toast.success("Settings saved!")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your account preferences</p>
          </div>
          <Button variant="gradient" onClick={handleSave}>
            <Save className="h-4 w-4 mr-1.5" /> Save Changes
          </Button>
        </div>

        <Tabs defaultValue="profile">
          <TabsList className="mb-8">
            <TabsTrigger value="profile" className="gap-1.5"><User className="h-4 w-4" /> Profile</TabsTrigger>
            <TabsTrigger value="appearance" className="gap-1.5"><Palette className="h-4 w-4" /> Appearance</TabsTrigger>
            <TabsTrigger value="notifications" className="gap-1.5"><Bell className="h-4 w-4" /> Notifications</TabsTrigger>
            <TabsTrigger value="account" className="gap-1.5"><Shield className="h-4 w-4" /> Account</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6 mb-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user?.avatar_url} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-700 to-blue-400 text-white text-2xl">
                      {user?.name?.split(" ").map(n => n[0]).join("") || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                </div>
                <div>
                  <Label>Display Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" disabled />
                  <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Learning Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Daily Goal</p>
                    <p className="text-sm text-muted-foreground">Lessons per day</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 5].map((n) => (
                      <Button key={n} variant={n === 2 ? "default" : "outline"} size="sm" className="w-10">{n}</Button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Difficulty</p>
                    <p className="text-sm text-muted-foreground">Preferred challenge level</p>
                  </div>
                  <Badge variant="intermediate">Intermediate</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Theme</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => { if (theme !== "dark") toggleTheme() }}
                    className={`p-6 rounded-2xl border-2 text-center transition-all ${
                      theme === "dark" ? "border-blue-600 bg-blue-600/10" : "border-border hover:border-blue-600/30"
                    }`}
                  >
                    <Moon className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-xs text-muted-foreground mt-1">Easy on the eyes</p>
                  </button>
                  <button
                    onClick={() => { if (theme !== "light") toggleTheme() }}
                    className={`p-6 rounded-2xl border-2 text-center transition-all ${
                      theme === "light" ? "border-blue-600 bg-blue-600/10" : "border-border hover:border-blue-600/30"
                    }`}
                  >
                    <Sun className="h-8 w-8 mx-auto mb-2 text-amber-400" />
                    <p className="font-medium">Light Mode</p>
                    <p className="text-xs text-muted-foreground mt-1">Bright and clean</p>
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Editor Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Font Size</p>
                    <p className="text-sm text-muted-foreground">Code editor font size</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {[12, 14, 16, 18].map((n) => (
                      <Button key={n} variant={n === 14 ? "default" : "outline"} size="sm" className="w-10">{n}</Button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Tab Size</p>
                    <p className="text-sm text-muted-foreground">Spaces per tab</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {[2, 4, 8].map((n) => (
                      <Button key={n} variant={n === 4 ? "default" : "outline"} size="sm" className="w-10">{n}</Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {[
                  { key: "email", label: "Email Notifications", desc: "Receive email updates about your progress", icon: Mail },
                  { key: "push", label: "Push Notifications", desc: "Get push notifications in your browser", icon: Volume2 },
                  { key: "weekly_report", label: "Weekly Report", desc: "Weekly summary of your learning activity", icon: Monitor },
                  { key: "achievement_alerts", label: "Achievement Alerts", desc: "Get notified when you earn achievements", icon: Bell },
                  { key: "streak_reminders", label: "Streak Reminders", desc: "Reminders to maintain your study streak", icon: BellOff },
                  { key: "new_content", label: "New Content", desc: "Get notified about new lessons and features", icon: Globe },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <div className="h-9 w-9 rounded-lg bg-accent/50 flex items-center justify-center mt-0.5">
                        <item.icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, [item.key]: checked }))
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border">
                  <div>
                    <p className="font-medium">Connected Accounts</p>
                    <p className="text-sm text-muted-foreground">Google account connected</p>
                  </div>
                  <Badge variant="success">Connected</Badge>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl border">
                  <div>
                    <p className="font-medium">Export Data</p>
                    <p className="text-sm text-muted-foreground">Download all your learning data</p>
                  </div>
                  <Button variant="outline" size="sm">Export</Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl border border-red-500/20">
                  <div>
                    <p className="font-medium text-red-400">Delete Account</p>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and data</p>
                  </div>
                  <Button variant="destructive" size="sm">Delete</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
