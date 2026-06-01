import { useEffect, useState } from 'react';
import type { Student } from '../../domain/Student';
import { GetTeamMembersUseCase } from '../../application/GetTeamMembersUseCase';
import { CreateStudentUseCase } from '../../application/CreateStudentUseCase';
import { UpdateStudentUseCase } from '../../application/UpdateStudentUseCase';
import { DeleteStudentUseCase } from '../../application/DeleteStudentUseCase';
import { StudentCard } from '../components/StudentCard';
import { StudentForm } from '../components/StudentForm';

interface TeamPageProps {
  getUseCase: GetTeamMembersUseCase;
  createUseCase: CreateStudentUseCase;
  updateUseCase: UpdateStudentUseCase;
  deleteUseCase: DeleteStudentUseCase;
}

export const TeamPage = ({ getUseCase, createUseCase, updateUseCase, deleteUseCase }: TeamPageProps) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const data = await getUseCase.execute();
      setStudents(data);
    } catch (error) {
      console.error('Failed to fetch team members:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, [getUseCase]);

  const handleCreateOrUpdate = async (studentData: Omit<Student, 'id'> | Student) => {
    try {
      if ('id' in studentData) {
        await updateUseCase.execute(studentData as Student);
      } else {
        await createUseCase.execute(studentData);
      }
      setIsModalOpen(false);
      setStudentToEdit(null);
      await fetchTeam();
    } catch (error) {
      console.error('Failed to save student:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar a este estudiante?')) {
      try {
        await deleteUseCase.execute(id);
        await fetchTeam();
      } catch (error) {
        console.error('Failed to delete student:', error);
      }
    }
  };

  const openCreateModal = () => {
    setStudentToEdit(null);
    setIsModalOpen(true);
  };

  const openEditModal = (student: Student) => {
    setStudentToEdit(student);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
      
      <div className="max-w-7xl w-full z-10 relative">
        <div className="text-center mb-16 relative">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4 tracking-tight drop-shadow-sm">
            Nuestro Equipo
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light mb-8">
            Conoce a los estudiantes de 6to de software encargados de este proyecto de Aplicaciones Web y Móviles.
          </p>
          <button 
            onClick={openCreateModal}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full font-bold shadow-lg shadow-purple-500/30 transition-all hover:scale-105 active:scale-95"
          >
            + Agregar Estudiante
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {students.map((student) => (
              <StudentCard 
                key={student.id} 
                student={student} 
                onEdit={openEditModal}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <StudentForm 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateOrUpdate}
        initialData={studentToEdit}
      />
    </div>
  );
};
