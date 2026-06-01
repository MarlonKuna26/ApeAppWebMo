import type { AuthRepository } from '../domain/AuthRepository';

export class LocalStorageAuthRepository implements AuthRepository {
  private readonly TOKEN_KEY = 'jwt_token';

  async login(username: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      // Simular retraso de red
      setTimeout(() => {
        // Credenciales quemadas para simulación
        if (username === 'admin' && password === 'admin') {
          // Generamos un token JWT falso muy básico
          const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
          const payload = btoa(JSON.stringify({ sub: '1', username: 'admin', exp: Date.now() + 3600000 }));
          const signature = btoa('dummy-signature');
          
          const fakeJwt = `${header}.${payload}.${signature}`;
          
          localStorage.setItem(this.TOKEN_KEY, fakeJwt);
          resolve(fakeJwt);
        } else {
          reject(new Error('Credenciales incorrectas'));
        }
      }, 800);
    });
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
