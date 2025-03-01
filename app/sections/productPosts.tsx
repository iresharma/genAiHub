import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { MessageList } from "~/components/chat/message-list";
import { ChatInput } from "~/components/chat/chat-input";
import { Message } from "~/components/chat/types";
import { Badge } from "~/components/ui/badge";
import { allProducts } from "./products";
import { Input } from "~/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "~/components/ui/button";

export function ProductPosts() {
  const [selectedProduct, setSelectedProduct] = useState<typeof allProducts[0] | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
        id: (Date.now() + 1).toString(),
        content: "Welcome! Let's start working on your next viral content idea for " + (selectedProduct?.name || "your product"),
        role: "assistant",
        timestamp: new Date(),
        type: "text",
    },]);
  const [input, setInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.badges.some(badge => badge.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!input.trim() && !imageFile) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
      image: imagePreview || undefined,
      type: "text",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setImageFile(null);
    setImagePreview(null);

    // TODO: Implement AI response logic here
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "This is a mock AI response about " + selectedProduct.name,
        role: "assistant",
        timestamp: new Date(),
        type: "prompt",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <main className="h-[94vh] overflow-hidden w-full flex flex-col">
      <div className="flex-none">
        {!selectedProduct ? (
          <>
            <h1 className="text-3xl font-bold tracking-tight">Product Posts</h1>
            <p className="text-muted-foreground">Generate AI posts for your products.</p>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="rounded-xl"
              onClick={() => setSelectedProduct(null)}
            >
              ← Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Product Posts</h1>
              <p className="text-muted-foreground">Generate AI posts for your products.</p>
            </div>
          </div>
        )}
      </div>

      {!selectedProduct ? (
        <>
          {/* Search Bar */}
          <div className="mt-4 mb-3 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pb-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedProduct(product)}
              >
                <CardContent className="p-4 flex gap-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-grow min-w-0">
                    <h3 className="font-semibold text-sm mb-2 truncate">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {product.badges.map((badge) => (
                        <Badge key={badge} variant="secondary" className="rounded-xl text-xs px-2 py-0.5">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Product Information Card */}
          <Card className="mb-4 mt-4">
            <CardContent className="flex items-start gap-4 p-4">
              <img
                src={selectedProduct.image || "/placeholder.svg"}
                alt={selectedProduct.name}
                className="w-24 h-24 rounded-xl object-cover shadow-xl"
              />
              <div className="flex-grow">
                <h2 className="text-xl font-bold mb-2">{selectedProduct.name}</h2>
                <p className="text-muted-foreground mb-2">{selectedProduct.description}</p>
                <div className="flex flex-wrap gap-1">
                  {selectedProduct.badges.map((badge) => (
                    <Badge key={badge} variant="secondary" className="rounded-xl">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat Interface */}
          <Card className="flex-grow overflow-hidden flex flex-col">
            <CardContent className="flex-grow overflow-hidden flex flex-col">
              <MessageList messages={messages} />
              <ChatInput
                input={input}
                imagePreview={imagePreview}
                onInputChange={setInput}
                onImageChange={handleImageChange}
                onSubmit={handleSubmit}
              />
            </CardContent>
          </Card>
        </>
      )}
    </main>
  );
}