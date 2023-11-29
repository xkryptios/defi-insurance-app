import Nav from './components/Nav';
import ListPolicy from './components/ListPolicy';

export default function App() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-blue-200 pb-10">
      <Nav></Nav>
      <ListPolicy></ListPolicy>
    </div>
  );
}
