import Header from "./components/Header";
import UrlForm from "./components/UrlForm";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Header />
        <UrlForm />
      </div>
    </div>
  );
}

export default App;
