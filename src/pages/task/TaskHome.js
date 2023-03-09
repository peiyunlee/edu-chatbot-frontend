
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import TaskHeader from "../../components/task/TaskHeader";
import TaskList from "../../components/task/TaskList";
import { useEffect } from 'react';


function TaskHome() {
  const navigate = useNavigate();  
  const lineUserProfile = useSelector((state) => state.lineUserProfile);

  useEffect(() => {
    console.log(lineUserProfile)
  }, [lineUserProfile])
  

  return (
    <div>
      <TaskHeader canClickNext={true} />
      <h1>line:{lineUserProfile}</h1>
      <section className="px-4 py-3 grid gap-4">
        <a href="/#" className="block bg-green-400 py-2 text-white font-bold text-center rounded-md shadow-btn mt-2" onClick={(e) => { navigate('/task/hw/1/create'); e.preventDefault(); }}>新增任務</a>
        <TaskList isSomeone={false} title={"尚未分配！"} />
        <TaskList isSomeone={true} title={"我的任務"} />
        <TaskList isSomeone={true} title={"XX的任務"} />
      </section>
    </div>
  );
}

export default TaskHome;