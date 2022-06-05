import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import UserDetail from "./components/UserDetail";
import UserTable from './components/UserTable';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users/:id" element={<UserDetail/>}>
        </Route>
        <Route path="*" element={<UserTable/>}>      
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
