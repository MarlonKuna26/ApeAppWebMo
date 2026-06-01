import type { Student } from '../../domain/Student';

interface StudentCardProps {
  student: Student;
}

export const StudentCard = ({ student }: StudentCardProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 flex flex-col items-center shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      
      <div className="relative w-32 h-32 mb-4">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full animate-pulse blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <img
          src={student.imageUrl}
          alt={student.name}
          className="relative w-32 h-32 rounded-full object-cover border-4 border-gray-900 shadow-lg"
        />
      </div>

      <h3 className="text-2xl font-bold text-white mb-1 tracking-wide">{student.name}</h3>
      <p className="text-blue-300 font-medium text-sm mb-4 uppercase tracking-wider">{student.major}</p>
      
      <div className="w-full bg-gray-800/50 rounded-xl p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Materia</span>
          <span className="text-white font-semibold text-right">{student.course}</span>
        </div>
        <div className="h-px w-full bg-gray-700 my-1"></div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Nivel</span>
          <span className="text-white font-semibold">{student.semester}</span>
        </div>
      </div>
    </div>
  );
};
