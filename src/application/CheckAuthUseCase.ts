import type { AuthRepository } from '../domain/AuthRepository';

export class CheckAuthUseCase {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  execute(): boolean {
    return this.authRepository.isAuthenticated();
  }
}
