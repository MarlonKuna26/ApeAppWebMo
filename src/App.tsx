import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TeamPage } from './presentation/pages/TeamPage';
import { LoginPage } from './presentation/pages/LoginPage';
import { ProtectedRoute } from './presentation/components/ProtectedRoute';
import { AuthProvider } from './presentation/context/AuthContext';
import { GetTeamMembersUseCase } from './application/GetTeamMembersUseCase';
import { CreateStudentUseCase } from './application/CreateStudentUseCase';
import { UpdateStudentUseCase } from './application/UpdateStudentUseCase';
import { DeleteStudentUseCase } from './application/DeleteStudentUseCase';
import { InMemoryStudentRepository } from './infrastructure/InMemoryStudentRepository';

function App() {
  // Dependency Injection setup for Team Members
  const repository = new InMemoryStudentRepository();
  const getTeamMembersUseCase = new GetTeamMembersUseCase(repository);
  const createStudentUseCase = new CreateStudentUseCase(repository);
  const updateStudentUseCase = new UpdateStudentUseCase(repository);
  const deleteStudentUseCase = new DeleteStudentUseCase(repository);

  return (

    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            {/* Ruta pública de Login */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Rutas protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<TeamPage useCase={getTeamMembersUseCase} />} />
            </Route>

            {/* Redirigir cualquier otra ruta a la raíz */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
