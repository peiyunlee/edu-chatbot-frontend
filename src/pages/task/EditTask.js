import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { deleteTask, getTask, updateTask } from '../../api/taskAPI';
import TaskHeader from "../../components/task/TaskHeader";
import { Input, DatePicker } from 'antd';
import dayjs from 'dayjs';

const { TextArea } = Input;
const dateFormat = 'MM/DD';

function EditTask({userProfile}) {
  const navigate = useNavigate();
  const { HWNo: HWNo, taskId: taskId } = useParams();
  const [taskInfo, setTaskInfo] = useState({
    taskName:'',
    handOverDate: '',
    handOver: '',
    plan: ''
  })
  const [taskInfoInput, setTaskInfoInput] = useState({
    taskName:'',
    handOverDate: '',
    handOver: '',
    plan: ''
  })

  useEffect(() => {
    setUpTaskInfo()
  }, [taskId])

  const setUpTaskInfo = async () => {
    const response = await getTask(taskId)
    console.log(response)
    setTaskInfo({
      taskName: response['task_name'],
      handOverDate: String(response['hand_over_date']),
      handOver: response['hand_over'],
      plan: response['plan'],
    })
    setTaskInfoInput({
      taskName: response['task_name'],
      handOverDate: String(response['hand_over_date']),
      handOver: response['hand_over'],
      plan: response['plan'],
    })
  }

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };

  const handleInputChange = (e, type) => {
    const { value } = e.target;
    let temp = taskInfo
    temp[type] = value
    if (value == ''){
      temp[type] = taskInfo[type]
    }
    setTaskInfoInput(temp)
  };

  const handleDateChange = (date, dateString) => {
    let temp = taskInfo
    temp['handOverDate'] = dateString
    setTaskInfo(temp)
  };

  const handleClickEdit = async () => {
    const resposne = await updateTask(taskId, taskInfoInput['taskName'],taskInfoInput['plan'], taskInfoInput['handOverDate'], taskInfoInput['handOver'], userProfile['userId'])
    navigate(`/task/hw/${HWNo}`)
  }

  const handleClickDelete = async () => {
    const resposne = await deleteTask(taskId , userProfile['userId'])
    navigate(`/task/hw/${HWNo}`);
  }

  return (
    <div>
      <TaskHeader />
      <section className="px-4 py-5 grid gap-4">
      <div className='grid gap-5'>
        <div className='flex'>
          <span className='font-bold mr-4'>工作名稱</span>
          <Input className='flex-1' placeholder={taskInfo.taskName} onChange={(e)=>handleInputChange(e,"taskName")}/>
        </div>
        <div className='grid gap-2'>
          <span className='font-bold mr-4'>怎麼進行</span>
          <TextArea className='flex-1' placeholder={taskInfo.plan} rows={3} onChange={(e)=>handleInputChange(e,"plan")}/>
        </div>
        <div className='grid gap-2'>
          <span className='font-bold mr-4'>繳交日期</span>
          <DatePicker format={dateFormat} onChange={handleDateChange} disabledDate={disabledDate}/>
        </div>
        <div className='grid gap-2'>
          <span className='font-bold mr-4'>繳交方式</span>
          <Input className='flex-1' placeholder={taskInfo.handOver} onChange={(e)=>handleInputChange(e,"handOver")}/>
        </div>
      </div>
      <div className="h-1 bg-gray-300 my-2"></div>
      <div className="grid grid-flow-col gap-3">
        <a href="/#" className="block bg-red-400 py-2 text-white font-bold text-center rounded-md shadow-btn mt-2" onClick={(e) => { e.preventDefault(); handleClickDelete(); }}>刪除</a>
        <a href="/#" className="block bg-green-400 py-2 text-white font-bold text-center rounded-md shadow-btn mt-2" onClick={(e) => { e.preventDefault(); handleClickEdit(); }}>編輯</a>
      </div>
      </section>
    </div>
  );
}

export default EditTask;
