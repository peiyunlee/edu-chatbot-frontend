import { useNavigate } from 'react-router-dom';

import TaskHeader from "../../components/task/TaskHeader";
import TaskList from "../../components/task/TaskList";

function TaskHome() {
  const navigate = useNavigate();

  return (
    <div>
      <TaskHeader canClickNext={true} />
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