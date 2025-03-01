import { useState } from "react"
import { Bot, Clock, CreditCard, Package, Send, Sparkles, Zap } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Textarea } from "~/components/ui/textarea"
import { Button } from "~/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"

export function Dashboard() {
  const [prompt, setPrompt] = useState("")

  return (
    <main>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Generate AI content for your products.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Generations</CardTitle>
              <Sparkles className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,284</div>
              <p className="text-xs text-muted-foreground">+24% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tokens Remaining</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">845,173</div>
              <p className="text-xs text-muted-foreground">Pro plan: 1M tokens/month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">3 created this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscription</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Pro Plan</div>
              <p className="text-xs text-muted-foreground">Renews on Apr 1, 2025</p>
            </CardContent>
          </Card>
        </div>

        {/* Prompt Input Area */}
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Generate Content</CardTitle>
            <CardDescription>Select a product and enter your prompt to generate AI content.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-3">
                  <Textarea
                    placeholder="Enter your prompt here..."
                    className="min-h-[120px]"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Product</label>
                    <Select defaultValue="product1">
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product1">E-commerce Description</SelectItem>
                        <SelectItem value="product2">Blog Post</SelectItem>
                        <SelectItem value="product3">Social Media</SelectItem>
                        <SelectItem value="product4">Email Campaign</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full mt-4 rounded-xl">
                    <Send className="h-4 w-4 mr-2" />
                    Generate
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Generations */}
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">Recent</h2>
          
        </div>
      </div>
    </main>
  )
}

