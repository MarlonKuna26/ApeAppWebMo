import type { Student } from '../../domain/Student';

interface StudentCardProps {
  student: Student;
  onEdit?: (student: Student) => void;
  onDelete?: (id: string) => void;
}

export const StudentCard = ({ student, onEdit, onDelete }: StudentCardProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 flex flex-col items-center shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      
      {/* Botones de acción */}
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <button 
          onClick={() => onEdit && onEdit(student)}
          className="p-2 bg-blue-500/80 hover:bg-blue-600 rounded-full text-white backdrop-blur-sm transition-colors"
          title="Editar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <button 
          onClick={() => onDelete && onDelete(student.id)}
          className="p-2 bg-red-500/80 hover:bg-red-600 rounded-full text-white backdrop-blur-sm transition-colors"
          title="Eliminar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <div className="relative w-32 h-32 mb-4 mt-2">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full animate-pulse blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <img
          src={student.imageUrl}
          alt={student.name}
          className="relative w-32 h-32 rounded-full object-cover border-4 border-gray-900 shadow-lg"
        />
      </div>

      <h3 className="text-2xl font-bold text-white mb-1 tracking-wide text-center">{student.name}</h3>
      <p className="text-blue-300 font-medium text-sm mb-4 uppercase tracking-wider text-center">{student.major}</p>
      
      <div className="w-full bg-gray-800/50 rounded-xl p-4 flex flex-col gap-2 mt-auto">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Materia</span>
          <span className="text-white font-semibold text-right max-w-[60%] truncate" title={student.course}>{student.course}</span>
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
