import { TeamPage } from './presentation/pages/TeamPage';
import { GetTeamMembersUseCase } from './application/GetTeamMembersUseCase';
import { InMemoryStudentRepository } from './infrastructure/InMemoryStudentRepository';

function App() {
  // Dependency Injection setup (Clean Architecture)
  const repository = new InMemoryStudentRepository();
  const getTeamMembersUseCase = new GetTeamMembersUseCase(repository);

  return (
    <div className="App">
      <TeamPage useCase={getTeamMembersUseCase} />
    </div>
  );
}

export default App;
