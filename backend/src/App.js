import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminPanel } from "./Pages/Admin Panel/AdminPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;