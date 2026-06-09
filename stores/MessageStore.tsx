import { observable, runInAction } from "mobx";
import { message } from "@/types/message";
import { MessageSender } from "@/enums/MessageSender";
import { localStorageStore, StorageKey } from "./LocalStorageStore";

export class MessageStore {
  messages = observable.map<number, message>();
  draft = observable.box<string>("");

  sendMessages = (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    runInAction(() => {
      const message: message = {
        id: Date.now() * Math.random(),
        text: trimmedText,
        sender: MessageSender.CLIENT,
        createdAt: new Date(),
      };

      this.messages.set(message.id, message);
      this.storeMessages();
      this.draft.set("");
    });
  };

  getAllMessages = () => {
    return Array.from(this.messages.values());
  };

  formatCreatedAt(createdAt: Date | string) {
    const date = new Date(createdAt);
    return date.toLocaleString("en-US", {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  setDraft = (draft: string) => {
    runInAction(()=> {
        this.draft.set(draft);
    })
  }

  getDraft = () => {
    return this.draft.get();
  }

  clearMessages = () => {
    runInAction(() => {
      this.messages.clear();
    });
    this.storeMessages();
  };

  storeMessages() {
    localStorageStore.storageSet(StorageKey.Messages, this.getAllMessages());
  }

  loadStoredMessages() {
   const stored = localStorageStore.storageGet(StorageKey.Messages);
   if(!stored) return;
   runInAction(() => {
    stored.forEach((message: message) => {
      this.messages.set(message.id, message);
    });
  });
}

    }   
export const messageStore = new MessageStore();
