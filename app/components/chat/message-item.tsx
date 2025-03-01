import { useUser } from "@clerk/remix";
import { PartyPopper, UndoDot, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

type MessageItemProps = {
  role: "user" | "assistant";
  content: string;
  image?: string;
  type?: "text" | "prompt";
};

export function MessageItem({ role, content, image, type }: MessageItemProps) {
  const { user } = useUser();
  return (
    <div
      className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex gap-2 max-w-[80%] ${
          role === "user" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <Avatar className="flex-shrink-0">
          {role === "assistant" ? (
            <Zap className="h-6 w-6 text-primary" />
          ) : (
            <>
              <AvatarFallback>U</AvatarFallback>
              <AvatarImage src={user?.imageUrl} />
            </>
          )}
        </Avatar>
        <div
          className={`rounded-xl p-4 ${
            role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
          }`}
        >
          {image && (
            <img
              src={image}
              alt="User uploaded"
              className="max-w-sm rounded-xl mb-2"
            />
          )}
          <p>{content}</p>
          {type === "prompt" && (
            <>
                <p className="text-xs text-foreground-muted mt-2">Above will be used as prompt to the model</p>
                <div className="mt-4 flex gap-2 justify-end">
                    <Button variant="secondary" size="sm" className="rounded-xl">
                        <UndoDot />
                        Re-generate
                    </Button>
                    <Button size="sm" className="rounded-xl">
                        <PartyPopper />
                        Go Ahead!
                    </Button>
                </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
