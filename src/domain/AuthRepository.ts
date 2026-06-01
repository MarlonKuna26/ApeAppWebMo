export interface AuthRepository {
  login(username: string, password: string): Promise<string>;
  logout(): void;
  getToken(): string | null;
  isAuthenticated(): boolean;
}
