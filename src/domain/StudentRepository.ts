import type { Student } from './Student';

export interface StudentRepository {
  getTeamMembers(): Promise<Student[]>;
  createStudent(student: Omit<Student, 'id'>): Promise<Student>;
  updateStudent(student: Student): Promise<Student>;
  deleteStudent(id: string): Promise<void>;
}
