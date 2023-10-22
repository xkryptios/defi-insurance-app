import Table from '../components/Table';
import Nav from '../components/Nav';
export default function Records() {
  return (
    <div className="bg-blue-200 h-screen">
      <Nav></Nav>
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl p-8 text-center">Records</h1>
        <Table></Table>
      </div>
    </div>
  );
}
