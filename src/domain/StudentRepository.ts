import type { Student } from './Student';

export interface StudentRepository {
  getTeamMembers(): Promise<Student[]>;
}
