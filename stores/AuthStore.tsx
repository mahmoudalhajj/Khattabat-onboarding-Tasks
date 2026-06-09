import { observable, runInAction } from "mobx";
import { User } from "@/types/user";
import { AuthStatus } from "@/enums/authStatus";
import { localStorageStore, StorageKey } from "./LocalStorageStore";

export class AuthStore {
    user = observable.box<User | null>(null);
    status = observable.box<AuthStatus>(AuthStatus.LoggedOut);
    error = observable.box<string>("");
    email = observable.box("");
    password = observable.box("");
    name = observable.box("");
    isRegistering = observable.box<boolean>(false);


login = () => {
  const email = this.getUserEmail();
    const password = this.password.get();

  if (!email || !password) {
    runInAction(() => {
      this.error.set("Email and password are required.");
    });

    return;
  }
  runInAction(() => {
    const user: User = {
      id: Date.now(),
      name: this.getUserName(),
      email: email,
    };

    this.user.set(user);
    this.status.set(AuthStatus.LoggedIn);
    this.error.set("");

    this.storeUser();
  });
};

  register = (name: string, email: string, password: string) => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      runInAction(() => this.error.set("All fields are required."));
      return;
    }

    runInAction(() => {
      const user: User = {
        id: Date.now(),
        name: trimmedName,
        email: trimmedEmail,
      };
      this.user.set(user);
      this.status.set(AuthStatus.LoggedIn);
      this.error.set("");
      this.storeUser();
    });
  };

  logout = () => {
    runInAction(() => {
      this.user.set(null);
      this.status.set(AuthStatus.LoggedOut);
      this.error.set("");
    });
    localStorageStore.storageClear();
  };

  getIsRegistering = () => {
    return this.isRegistering.get();
  }


  getUser = () => {
    return this.user.get();
  };

  getStatus = () => {
    return this.status.get();
  };

  getError = () => {
    return this.error.get();
  };

    getUserEmail = () => {
    return this.user.get()?.email ?? "";
    };

    getUserName = () => {
    return this.user.get()?.name ?? "";

     };

  isLoggedIn = () => {
    return this.status.get() === AuthStatus.LoggedIn;
  };

  storeUser() {
    localStorageStore.storageSet(StorageKey.User, this.getUser());
  }

  loadStoredUser() {
  if (this.isLoggedIn()) return;

  const stored = localStorageStore.storageGet(StorageKey.User);

  if (!stored) return;

  runInAction(() => {
    this.user.set(stored);
    this.status.set(AuthStatus.LoggedIn);
  });
}
    setEmail = (email: string) => {
    this.email.set(email);
    };

    setPassword = (password: string) => {
    this.password.set(password);
    };

    setName = (name: string) => {
    this.name.set(name);
};

    setIsRegistering = (value: boolean) =>{
        runInAction(()=>{
            this.isRegistering.set(value);
        })

    }

}

export const authStore = new AuthStore();