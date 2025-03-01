export type Message = {
    id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: Date;
    image?: string;
    type: "text" | "prompt";
  };
  