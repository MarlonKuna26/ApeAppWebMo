import type { AuthRepository } from '../domain/AuthRepository';

export class LoginUseCase {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(username: string, password: string): Promise<string> {
    return this.authRepository.login(username, password);
  }
}
