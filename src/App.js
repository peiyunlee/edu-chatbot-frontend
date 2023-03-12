import "./styles/App.css";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import liff from '@line/liff';
import { getLineUserProfile } from './api/lineAPI';
import TaskHome from "./pages/task/TaskHome";
import AddTask from "./pages/task/AddTask";
import EditTask from "./pages/task/EditTask";
import TaskReflect from "./pages/reflect/TaskReflect"
import HWReflect from "./pages/reflect/HWReflect"
import { updateLineUserProfile } from "./store/action";

function App() {
  const lineUserProfile = useSelector((state) => state.lineUserProfile);
  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00b96b',
          },
        }}
      >
        {!lineUserProfile ? <InitializeLiff />:<></>}
        <Routes>
          <Route exact path="/" element={<Navigate replace to="/task" />} />
          <Route path="/task/hw/:HWNo" element={<TaskHome lineUserProfile={lineUserProfile} />} />
          <Route path="/task/hw/:HWNo/create" element={<AddTask lineUserProfile={lineUserProfile}/>} />
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
          <Route path="/reflect" element={<Navigate replace to="/reflect/task" />} />
          <Route path="/reflect/task" element={<Navigate replace to="/reflect/task/1" />} />
          <Route path="/reflect/task/:taskId" element={<TaskReflect />} />
          <Route exact path="/reflect/hw" element={<Navigate replace to="/reflect/hw/1" />} />
          <Route path="/reflect/hw/:HWNo" element={<HWReflect />} />
        </Routes>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;


function InitializeLiff(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [lineAccessToken, setLineAccessToken] = useState(null)

  useEffect(() => {
    console.log("liff")
    initializeLiff()
  }, [lineAccessToken])

  const initializeLiff = () => {
    console.log("liff init")
    liff.init({
      liffId: '1660700459-XZKAApq7'
    })
      .then(async () => {
        console.log("初始化成功")
        if(liff.isLoggedIn()){
          console.log("取得accessToken");
          const accessToken = liff.getAccessToken();
          setLineAccessToken(accessToken)
          if (accessToken) {
            const response = await getLineUserProfile(accessToken)
            dispatch(updateLineUserProfile(response))
            console.log(location)
          }
        }
        else{
          console.log("沒登入")
          liff.login()
        }
      })
      .catch((err) => {
        console.log("初始化失敗", err);
      });
  }
}
