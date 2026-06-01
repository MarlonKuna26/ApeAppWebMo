import { useState, useEffect } from 'react';
import type { Student } from '../../domain/Student';

interface StudentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (student: Omit<Student, 'id'> | Student) => void;
  initialData?: Student | null;
}

export const StudentForm = ({ isOpen, onClose, onSubmit, initialData }: StudentFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    semester: '',
    major: '',
    course: '',
    imageUrl: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        semester: initialData.semester,
        major: initialData.major,
        course: initialData.course,
        imageUrl: initialData.imageUrl
      });
    } else {
      setFormData({
        name: '',
        semester: '',
        major: '',
        course: '',
        imageUrl: ''
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.semester.trim()) newErrors.semester = 'El semestre es obligatorio';
    if (!formData.major.trim()) newErrors.major = 'La carrera es obligatoria';
    if (!formData.course.trim()) newErrors.course = 'El curso es obligatorio';
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'La URL de la imagen es obligatoria';
    } else if (!/^https?:\/\/.+/.test(formData.imageUrl)) {
      newErrors.imageUrl = 'Debe ser una URL válida';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(initialData ? { ...formData, id: initialData.id } : formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 border border-white/20 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in duration-300">
        <h2 className="text-2xl font-bold text-white mb-6">
          {initialData ? 'Editar Estudiante' : 'Agregar Estudiante'}
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="Ej. Juan Pérez"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">Semestre</label>
            <input
              type="text"
              value={formData.semester}
              onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="Ej. 6to Semestre"
            />
            {errors.semester && <p className="text-red-400 text-xs mt-1">{errors.semester}</p>}
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">Carrera</label>
            <input
              type="text"
              value={formData.major}
              onChange={(e) => setFormData({ ...formData, major: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="Ej. Ingeniería en Software"
            />
            {errors.major && <p className="text-red-400 text-xs mt-1">{errors.major}</p>}
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">Materia</label>
            <input
              type="text"
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="Ej. Aplicaciones Web y Móviles"
            />
            {errors.course && <p className="text-red-400 text-xs mt-1">{errors.course}</p>}
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">URL de Imagen</label>
            <input
              type="text"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="https://..."
            />
            {errors.imageUrl && <p className="text-red-400 text-xs mt-1">{errors.imageUrl}</p>}
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
