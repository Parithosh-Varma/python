"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart, CartesianGrid } from "recharts"

const data = [
  { day: "Mon", xp: 120, lessons: 3 },
  { day: "Tue", xp: 80, lessons: 2 },
  { day: "Wed", xp: 200, lessons: 5 },
  { day: "Thu", xp: 150, lessons: 4 },
  { day: "Fri", xp: 90, lessons: 2 },
  { day: "Sat", xp: 250, lessons: 6 },
  { day: "Sun", xp: 180, lessons: 4 },
]

export function ProgressChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-lg">Weekly Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 3.7% 15.9%)" />
              <XAxis dataKey="day" stroke="hsl(240 5% 64.9%)" fontSize={12} />
              <YAxis stroke="hsl(240 5% 64.9%)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "hsl(240 10% 5.9%)",
                  border: "1px solid hsl(240 3.7% 15.9%)",
                  borderRadius: "12px",
                }}
              />
              <Area type="monotone" dataKey="xp" stroke="#a855f7" fill="url(#xpGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function XPBarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">XP by Day</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 3.7% 15.9%)" />
              <XAxis dataKey="day" stroke="hsl(240 5% 64.9%)" fontSize={12} />
              <YAxis stroke="hsl(240 5% 64.9%)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "hsl(240 10% 5.9%)",
                  border: "1px solid hsl(240 3.7% 15.9%)",
                  borderRadius: "12px",
                }}
              />
              <Bar dataKey="xp" fill="#a855f7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
