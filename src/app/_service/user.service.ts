import { computed, effect, Service, signal } from '@angular/core';

@Service()
export class UserService {
  private readonly storageKey = 'sessionToken';

  private readonly _token = signal<string | null>(this.readTokenFromStorage());

  readonly isLoggedIn = computed(() => !!this._token());
  readonly token = this._token.asReadonly();

  constructor() {
    effect(() => {
      console.log(this.isLoggedIn() ? 'User logged in' : 'User logged out');
    });
  }

  private readTokenFromStorage(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.storageKey);
    this._token.set(null);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.storageKey, token);
    this._token.set(token);
  }

}
