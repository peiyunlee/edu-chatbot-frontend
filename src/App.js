import "./styles/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider } from 'antd';

import TaskHome from "./pages/task/TaskHome";
import AddTask from "./pages/task/AddTask";
import EditTask from "./pages/task/EditTask";
import TaskReflect from "./pages/reflect/TaskReflect"
import HWReflect from "./pages/reflect/HWReflect"

function App() {
  return (
    <BrowserRouter>

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00b96b',
          },
        }}
      >
        <Routes>
          <Route exact path="/" element={<Navigate replace to="/task" />} />
          <Route exact path="/task" element={<Navigate replace to="/task/hw/1" />} />
          <Route path="/task/hw/:HWNo" element={<TaskHome />} />
          <Route path="/task/hw/:HWNo/create" element={<AddTask />} />
          <Route path="/task/hw/:HWNo/edit/:taskId" element={<EditTask />} />
        </Routes>
      </ConfigProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#6477D3',
          },
        }}
      >
        <Routes>
          <Route exact path="/reflect" element={<Navigate replace to="/reflect/task" />} />
          <Route exact path="/reflect/task" element={<Navigate replace to="/reflect/task/1" />} />
          <Route path="/reflect/task/:taskId" element={<TaskReflect />} />
          <Route exact path="/reflect/hw" element={<Navigate replace to="/reflect/hw/1" />} />
          <Route path="/reflect/hw/:HWNo" element={<HWReflect />} />
        </Routes>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
