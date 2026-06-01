import { useEffect, useState } from 'react';
import type { Student } from '../../domain/Student';
import { GetTeamMembersUseCase } from '../../application/GetTeamMembersUseCase';
import { StudentCard } from '../components/StudentCard';
import { useAuth } from '../context/AuthContext';

interface TeamPageProps {
  useCase: GetTeamMembersUseCase;
}

export const TeamPage = ({ useCase }: TeamPageProps) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await useCase.execute();
        setStudents(data);
      } catch (error) {
        console.error('Failed to fetch team members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [useCase]);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
      
      <div className="max-w-7xl w-full z-10 relative">
        <div className="flex justify-end mb-4">
          <button 
            onClick={logout}
            className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors text-sm font-medium border border-red-500/30"
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4 tracking-tight drop-shadow-sm">
            Nuestro Equipo
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Conoce a los estudiantes de 6to de software encargados de este proyecto de Aplicaciones Web y Móviles.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
