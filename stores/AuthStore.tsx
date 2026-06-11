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
    isLoading = observable.box<boolean>(true);


  login = () => {
    const emailValue = this.email.get();
    const passwordValue = this.password.get();

    if (!emailValue || !passwordValue) {
      runInAction(() => {
        this.error.set("Email and password are required.");
      });
      return;
    }

    runInAction(() => {
      this.isLoading.set(true);
      
      // Simulate API delay
      setTimeout(() => {
        runInAction(() => {
          const user: User = {
            id: Date.now(),
            name: this.name.get() || "User",
            email: emailValue,
          };

          this.user.set(user);
          this.status.set(AuthStatus.LoggedIn);
          this.error.set("");
          this.storeUser();
          this.isLoading.set(false);
          this.email.set("");
          this.password.set("");
        });
      }, 800);
    });
  };

  register = () => {
    const nameValue = this.name.get().trim();
    const emailValue = this.email.get().trim();
    const passwordValue = this.password.get().trim();

    if (!nameValue || !emailValue || !passwordValue) {
      runInAction(() => this.error.set("All fields are required."));
      return;
    }

    runInAction(() => {
      this.isLoading.set(true);
      
      setTimeout(() => {
        runInAction(() => {
          const user: User = {
            id: Date.now(),
            name: nameValue,
            email: emailValue,
          };
          this.user.set(user);
          this.status.set(AuthStatus.LoggedIn);
          this.error.set("");
          this.storeUser();
          this.isLoading.set(false);
          this.email.set("");
          this.password.set("");
          this.name.set("");
        });
      }, 800);
    });
  };

  handleLogin = () => {
    runInAction(() => {
      this.isRegistering.set(false);
      this.error.set("");
    });
    this.login();
  };

  handleRegister = () => {
    if (!this.isRegistering.get()) {
        runInAction(() => {
            this.isRegistering.set(true);
            this.error.set("");
        });
        return;
    }
    this.register();
  };

  logout = () => {
    runInAction(() => {
      this.user.set(null);
      this.status.set(AuthStatus.LoggedOut);
      this.error.set("");
      this.email.set("");
      this.password.set("");
      this.name.set("");
      this.isLoading.set(false);
    });
    localStorageStore.storageClear();
  };

  getIsLoading = () => {
    return this.isLoading.get();
  };

  getIsRegistering = () => {
    return this.isRegistering.get();
  };

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

  storeUser = () => {
    localStorageStore.storageSet(StorageKey.User, this.getUser());
  };

  loadStoredUser = () => {
    runInAction(() => {
        this.isLoading.set(true);
    });

    const stored = localStorageStore.storageGet(StorageKey.User);

    if (stored) {
      runInAction(() => {
        this.user.set(stored);
        this.status.set(AuthStatus.LoggedIn);
      });
    }

    runInAction(() => {
        this.isLoading.set(false);
    });
  };

  setEmail = (email: string) => {
    this.email.set(email);
  };

  setPassword = (password: string) => {
    this.password.set(password);
  };

  setName = (name: string) => {
    this.name.set(name);
  };

  setIsRegistering = (value: boolean) => {
    runInAction(() => {
      this.isRegistering.set(value);
    });
  };

}

export const authStore = new AuthStore();