import type { Student } from '../domain/Student';
import type { StudentRepository } from '../domain/StudentRepository';

export class CreateStudentUseCase {
  constructor(private repository: StudentRepository) {}

  async execute(studentData: Omit<Student, 'id'>): Promise<Student> {
    return this.repository.createStudent(studentData);
  }
}
