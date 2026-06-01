import { TeamPage } from './presentation/pages/TeamPage';
import { GetTeamMembersUseCase } from './application/GetTeamMembersUseCase';
import { CreateStudentUseCase } from './application/CreateStudentUseCase';
import { UpdateStudentUseCase } from './application/UpdateStudentUseCase';
import { DeleteStudentUseCase } from './application/DeleteStudentUseCase';
import { InMemoryStudentRepository } from './infrastructure/InMemoryStudentRepository';

function App() {
  // Dependency Injection setup (Clean Architecture)
  const repository = new InMemoryStudentRepository();
  const getTeamMembersUseCase = new GetTeamMembersUseCase(repository);
  const createStudentUseCase = new CreateStudentUseCase(repository);
  const updateStudentUseCase = new UpdateStudentUseCase(repository);
  const deleteStudentUseCase = new DeleteStudentUseCase(repository);

  return (
    <div className="App">
      <TeamPage 
        getUseCase={getTeamMembersUseCase} 
        createUseCase={createStudentUseCase}
        updateUseCase={updateStudentUseCase}
        deleteUseCase={deleteStudentUseCase}
      />
    </div>
  );
}

export default App;
