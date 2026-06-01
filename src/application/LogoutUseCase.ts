import type { AuthRepository } from '../domain/AuthRepository';

export class LogoutUseCase {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  execute(): void {
    this.authRepository.logout();
  }
}
