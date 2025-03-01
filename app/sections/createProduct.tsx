import { Info } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip"

export function ProductCreate() {
  return (
    <main>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Product</h1>
          <p className="text-muted-foreground">Create a new product.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>Fill in the details for your new product.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" placeholder="Enter product name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Product Image</Label>
                    <Input id="image" type="file" accept="image/*" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center">
                    Description
                    {/* <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 ml-2 text-primary" />
                        </TooltipTrigger>
                        <TooltipContent className="rounded-xl bg-secondary text-white text-center">
                          <p>
                            This will used as prompt to the model <br />make sure this description is well versed
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider> */}
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Enter product description"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="badges">Badges (comma-separated)</Label>
                  <Input
                    id="badges"
                    placeholder="e.g., new, featured, sale"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="w-full sm:w-auto rounded-xl">
                  Create Product
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}