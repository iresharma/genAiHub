import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { MessageList } from "~/components/chat/message-list";
import { ChatInput } from "~/components/chat/chat-input";
import { Message } from "~/components/chat/types";

export function GenericPosts() {
  const [messages, setMessages] = useState<Message[]>([
    {
        id: (Date.now() + 1).toString(),
        content: "Welcome! Let's start working on your next viral content idea.",
        role: "assistant",
        timestamp: new Date(),
        type: "text",
    },
  ]);
  const [input, setInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
    };;

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setImageFile(null);
    setImagePreview(null);

    // TODO: Implement AI response logic here
    // For now, we'll add a mock response
    setTimeout(() => {
        const aiResponse1: Message = {
            id: (Date.now() + 1).toString(),
            content: "xyz blah",
            role: "assistant",
            timestamp: new Date(),
            image: imagePreview || undefined,
            type: "prompt",
          }
      const aiResponse2: Message = {
        id: (Date.now() + 1).toString(),
        content: "This is a mock AI response. The actual AI integration will be implemented later.",
        role: "assistant",
        timestamp: new Date(),
        type: "text",
      };
      setMessages((prev) => [...prev, aiResponse1]);
    }, 1000);
  };

  return (
    <main className="h-[94vh] overflow-hidden w-full flex flex-col">
      <div className="flex-none">
        <h1 className="text-3xl font-bold tracking-tight">Generic Posts</h1>
        <p className="text-muted-foreground">Have a conversation with AI about anything.</p>
      </div>

      <Card className="flex-grow mt-6 overflow-hidden flex flex-col">
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
    </main>
  );
}