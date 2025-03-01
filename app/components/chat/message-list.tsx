import { MessageItem } from "./message-item";
import { Message } from "./types";

type MessageListProps = {
  messages: Message[];
};

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-grow overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          role={message.role}
          content={message.content}
          image={message.image}
          type={message.type}
        />
      ))}
    </div>
  );
}