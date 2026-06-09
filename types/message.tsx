import { MessageSender } from "@/enums/MessageSender";

export interface message {
  id: number;
  text: string;
  sender: MessageSender;
  createdAt: Date;
}