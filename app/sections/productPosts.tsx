import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { MessageList } from "~/components/chat/message-list";
import { ChatInput } from "~/components/chat/chat-input";
import { Message } from "~/components/chat/types";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useLoaderData } from "@remix-run/react";

export function ProductPosts() {
  const loaderData = useLoaderData<{ products: any[] }>();
  const products = loaderData?.products || [];
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.badges && product.badges.toLowerCase().includes(searchQuery.toLowerCase()))
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
        content: "This is a mock AI response about " + selectedProduct?.name,
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
        <div className="mt-8 grid gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="cursor-pointer transition-all hover:bg-accent"
                onClick={() => setSelectedProduct(product)}
              >
                <CardContent className="p-6 flex gap-4">
                  {product.productImage && (
                    <div className="flex-shrink-0">
                      <img
                        src={product.productImage}
                        alt={product.name}
                        className="w-32 h-32 object-contain rounded-lg"
                      />
                    </div>
                  )}
                  <div className="flex flex-col justify-between flex-grow">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {product.description}
                      </p>
                    </div>
                    {product.badges && (
                      <div className="mt-2">
                        <Badge variant="secondary">{product.badges}</Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <div className="flex-1 space-y-4 overflow-auto p-4">
            <MessageList messages={messages} />
          </div>
          <ChatInput
            input={input}
            imagePreview={imagePreview}
            onInputChange={setInput}
            onImageChange={handleImageChange}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </main>
  );
}