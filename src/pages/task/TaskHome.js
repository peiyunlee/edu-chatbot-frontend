
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TaskHeader from "../../components/task/TaskHeader";
import TaskList from "../../components/task/TaskList";
import { getTaskList } from '../../api/taskAPI';
import { getGroupMembersByLUID } from '../../api/studentAPI';

function TaskHome({lineUserProfile}) {
  const navigate = useNavigate();  
  const {HWNo} = useParams();
  const [taskLists, setTaskLists] = useState([{
    student_id: null,
    tasks:[],
    title:'尚未分配！'
  }])

  useEffect(() => {
    if (lineUserProfile) {
      setUpTaskLists()
    }
  }, [HWNo,lineUserProfile])

  const setUpTaskLists = async () => {
    const res_tasks = await getTaskList(lineUserProfile.userId, HWNo)
    const res_members = await getGroupMembersByLUID(lineUserProfile.userId)

    let temp_taskLists = [{
      student_id: null,
      tasks:[],
      title:'尚未分配！'
    }]
    
    if (!res_members) return

    res_members.forEach(student => {
      temp_taskLists.push({
        student_id: student._id,
        tasks:[],
        title:`${student.name} 的任務`
      })
    })

    if (!res_tasks) return
    res_tasks.forEach(task => {
      if (task.student_id === '') {
        temp_taskLists[0].tasks.push(task)
      }
      else{
        const idx = temp_taskLists.findIndex(data => data.student_id == task.student_id);
        if (idx !== -1){
          temp_taskLists[idx].tasks.push(task)
        }
      }
    });
    
    console.log(temp_taskLists)
    setTaskLists(temp_taskLists)
  }

  return (
    <div>
      <TaskHeader canClickNext={true} />
      <h1>line:{lineUserProfile ? lineUserProfile.userId : "none"}</h1>
      <section className="px-4 py-3 grid gap-4">
        <a href="/#" className="block bg-green-400 py-2 text-white font-bold text-center rounded-md shadow-btn mt-2" onClick={(e) => { navigate('/task/hw/1/create'); e.preventDefault(); }}>新增任務</a>
        {taskLists.map((taskList)=> <TaskList key={taskList.title} isSomeone={false} title={taskList.title} taskList={taskList.tasks}/>)}
      </section>
    </div>
  );
}

export default TaskHome;