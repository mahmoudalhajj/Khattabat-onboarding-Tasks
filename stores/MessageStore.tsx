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
        sender: MessageSender.client,
        createdAt: new Date(),
      };

      this.messages.set(message.id, message);
      this.storeMessages();
    });
  };

  getAllMessages = () => {
    return Array.from(this.messages.values());
  };

  getMessageCount = () => {
    return this.messages.size;
  };

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
   runInAction(() => {
    stored.forEach((message: message) => {
      this.messages.set(message.id, message);
    });
  });
}

    }   
export const messageStore = new MessageStore();
