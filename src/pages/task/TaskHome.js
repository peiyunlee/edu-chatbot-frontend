
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TaskHeader from "../../components/task/TaskHeader";
import TaskList from "../../components/task/TaskList";
import { getTaskList } from '../../api/taskAPI';
import { getGroupMembersByLUID } from '../../api/studentAPI';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskList } from '../../store/action';

function TaskHome({ userProfile }) {
  const navigate = useNavigate();
  const { HWNo } = useParams();
  const taskList = useSelector((state) => state.taskList);
  const dispatch = useDispatch()

  useEffect(() => {
    if (userProfile) {
      updateTaskLists()
    }
  }, [])

  const updateTaskLists = async () => {
    const res_taskList = await getTaskList(userProfile.userId, HWNo)
    const res_members = await getGroupMembersByLUID(userProfile.userId)

    let temp_taskLists = [{
      student_id: null,
      tasks: [],
      title: '尚未分配！'
    }]

    if (!res_members) return

    res_members.forEach(student => {
      temp_taskLists.push({
        student_id: student._id,
        tasks: [],
        title: `${student.name} 的工作`
      })
    })

    if (!res_taskList) return
    res_taskList.forEach((task) => {
      if (task.student_id === '') {
        temp_taskLists[0].tasks.push(task)
      }
      else {
        const idx = temp_taskLists.findIndex(data => data.student_id == task.student_id);
        if (idx !== -1) {
          temp_taskLists[idx].tasks.push(task)
        }
      }
    });
    
    dispatch(updateTaskList(temp_taskLists))
  }

  return (
    <div>
      <TaskHeader canClickNext={true} />
      {/* <h1>line:{userProfile ? userProfile.userId : "none"}</h1> */}
      <section className="px-4 py-3 grid gap-4">
        <a href="/#" className="block bg-green-400 py-2 text-white font-bold text-center rounded-md shadow-btn mt-2" onClick={(e) => { navigate(`/task/hw/${HWNo}/create`); e.preventDefault(); }}>新增工作</a>
        {taskList.map((taskList) => <TaskList key={taskList.title} isSomeone={false} title={taskList.title} taskList={taskList.tasks} />)}
      </section>
    </div>
  );
}

export default TaskHome;