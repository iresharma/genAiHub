import { ImagePlus, Send } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

type ChatInputProps = {
  input: string;
  imagePreview: string | null;
  onInputChange: (value: string) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

export function ChatInput({
  input,
  imagePreview,
  onInputChange,
  onImageChange,
  onSubmit,
}: ChatInputProps) {
  return (
    <div className="flex-none p-4 border-t bg-background">
      <div className="flex gap-4">
        <div className="flex-grow">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSubmit()}
          />
        </div>
        <div className="flex gap-2">
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            id="image-upload"
            onChange={onImageChange}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => document.getElementById("image-upload")?.click()}
            className={imagePreview ? "bg-primary text-primary-foreground rounded-xl" : "rounded-xl"}
          >
            <ImagePlus className="h-4 w-4" />
          </Button>
          <Button onClick={onSubmit} className="rounded-xl">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {imagePreview && (
        <div className="mt-2 relative">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-h-20 rounded-xl"
          />
        </div>
      )}
    </div>
  );
}