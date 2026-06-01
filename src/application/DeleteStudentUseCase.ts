import type { StudentRepository } from '../domain/StudentRepository';

export class DeleteStudentUseCase {
  constructor(private repository: StudentRepository) {}

  async execute(id: string): Promise<void> {
    return this.repository.deleteStudent(id);
  }
}
