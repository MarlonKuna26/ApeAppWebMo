import type { Student } from '../domain/Student';
import type { StudentRepository } from '../domain/StudentRepository';

export class InMemoryStudentRepository implements StudentRepository {
  private students: Student[] = [
    {
      id: '1',
      name: 'Marlon Guevara',
      semester: '6to Semestre',
      major: 'Ingeniería en Software',
      course: 'Aplicaciones Web y Móviles',
      imageUrl: 'https://ui-avatars.com/api/?name=Marlon+Guevara&background=2563eb&color=fff&size=256',
    },
    {
      id: '2',
      name: 'Johan Rodriguez',
      semester: '6to Semestre',
      major: 'Ingeniería en Software',
      course: 'Aplicaciones Web y Móviles',
      imageUrl: 'https://ui-avatars.com/api/?name=Johan+Rodriguez&background=059669&color=fff&size=256',
    },
    {
      id: '3',
      name: 'Jose Manzano',
      semester: '6to Semestre',
      major: 'Ingeniería en Software',
      course: 'Aplicaciones Web y Móviles',
      imageUrl: 'https://ui-avatars.com/api/?name=Jose+Manzano&background=d97706&color=fff&size=256',
    },
    {
      id: '4',
      name: 'Alan Puruncajas',
      semester: '6to Semestre',
      major: 'Ingeniería en Software',
      course: 'Aplicaciones Web y Móviles',
      imageUrl: 'https://ui-avatars.com/api/?name=Alan+Puruncajas&background=7c3aed&color=fff&size=256',
    },
  ];

  async getTeamMembers(): Promise<Student[]> {
    // Simulamos un retraso de red
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.students]);
      }, 500);
    });
  }

  async createStudent(studentData: Omit<Student, 'id'>): Promise<Student> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newStudent: Student = {
          ...studentData,
          id: Date.now().toString(),
        };
        this.students.push(newStudent);
        resolve(newStudent);
      }, 300);
    });
  }

  async updateStudent(student: Student): Promise<Student> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.students.findIndex(s => s.id === student.id);
        if (index === -1) {
          reject(new Error('Estudiante no encontrado'));
          return;
        }
        this.students[index] = student;
        resolve(student);
      }, 300);
    });
  }

  async deleteStudent(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.students = this.students.filter(s => s.id !== id);
        resolve();
      }, 300);
    });
  }
}
