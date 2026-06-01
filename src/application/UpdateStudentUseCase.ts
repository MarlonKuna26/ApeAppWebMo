import type { Student } from '../domain/Student';
import type { StudentRepository } from '../domain/StudentRepository';

export class UpdateStudentUseCase {
  constructor(private repository: StudentRepository) {}

  async execute(student: Student): Promise<Student> {
    return this.repository.updateStudent(student);
  }
}
