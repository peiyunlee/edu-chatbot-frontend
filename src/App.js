import "./styles/App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import TaskHome from "./pages/task/TaskHome";
import AddTask from "./pages/task/AddTask";
import EditTask from "./pages/task/EditTask";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Navigate replace to="/task/hw" />}/>
        <Route exact path="/task/hw" element={<Navigate replace to="/task/hw/1" />}/>
        <Route path="/task/hw/:HWNo" element={<TaskHome/>}/>
        <Route path="/task/hw/:HWNo/create" element={<AddTask/>}/>
        <Route path="/task/hw/:HWNo/edit/:taskId" element={<EditTask/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
