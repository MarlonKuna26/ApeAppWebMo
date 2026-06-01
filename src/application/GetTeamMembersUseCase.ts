import type { Student } from '../domain/Student';
import type { StudentRepository } from '../domain/StudentRepository';

export class GetTeamMembersUseCase {
  private studentRepository: StudentRepository;

  constructor(studentRepository: StudentRepository) {
    this.studentRepository = studentRepository;
  }

  async execute(): Promise<Student[]> {
    return await this.studentRepository.getTeamMembers();
  }
}
