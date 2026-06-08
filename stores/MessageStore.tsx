import { makeAutoObservable, observable, runInAction } from "mobx";
import {message} from "@/types/message"
import { MessageSender } from "@/enums/MessageSender";
import { localStorageStore, StorageKey } from "./LocalStorageStore";

export class MessageStore{
    messages = observable.map<number, message>();

    sendMessages = (text: string)=> {
        const TrimmedText = text.trim();

        if(!TrimmedText) return;
        
    runInAction(() => {
      const message: message = {
        id: Date.now() * Math.random(),
        text: TrimmedText,
        sender: MessageSender.client,
        createdAt: new Date(),
      };

      this.messages.set(message.id, message);
      this.storeMessages();
    });
  }

  getAllMessages = () => {
    return Array.from(this.messages.values());
  }
    getMessageCount = () => {
    return this.messages.size;
    }
    clearMessages = () => {
        runInAction(() => {
        this.messages.clear();
        });
        this.storeMessages();
    }

    storeMessages(){
        localStorageStore.storageSet(StorageKey.Messages,this.getAllMessages)
    }
    loadStoredMessages(){
        localStorageStore.storageGet(StorageKey.Messages)
    }
}
