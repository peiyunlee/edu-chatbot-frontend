import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createTask } from '../../api/taskAPI';
import TaskHeader from "../../components/task/TaskHeader";
import { Input, DatePicker } from 'antd';
import dayjs from 'dayjs';
const { TextArea } = Input;
const dateFormat = 'MM/DD';

function AddTask( {userProfile}) {
  const navigate = useNavigate();
  const { HWNo: HWNo } = useParams();
  const [taskInfo, setTaskInfo] = useState({
    taskName:'',
    handOverDate: '',
    handOver: '',
    plan: ''
  })
  const [clickComplete, setClickComplete] = useState(0)

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };

  const handleInputChange = (e, type) => {
    const { value } = e.target;
    let temp = taskInfo
    temp[type] = value
    setTaskInfo(temp)
  };

  const handleDateChange = (date, dateString) => {
    let temp = taskInfo
    temp['handOverDate'] = dateString
    setTaskInfo(temp)
  };

  const handleClickAdd = async () => {
    setClickComplete(clickComplete + 1)
    if(taskInfo['taskName'] == '' || taskInfo['plan'] == '' || taskInfo['handOverDate'] == '' || taskInfo['handOver'] == '')
      return
    const response = await createTask(userProfile.userId, HWNo, taskInfo.taskName, taskInfo.plan, taskInfo.handOverDate, taskInfo.handOver)
    navigate(`/task/hw/${HWNo}`)
  }

  return (
    <div>
      <TaskHeader />
      <section className="px-4 py-5 grid gap-4">
      <div className='grid gap-5'>
        <div className='flex'>
          <span className='font-bold mr-4'>工作名稱</span>
          {clickComplete && taskInfo['taskName'] == '' ? <span className='font-bold text-red-400 mr-4'>請輸入工作名稱</span> :<></>}
          <Input className='flex-1' placeholder="專案介紹" onChange={(e)=>handleInputChange(e,'taskName')} />
        </div>
        <div className='grid gap-2'>
          <span className='font-bold mr-4'>怎麼進行</span>
          {clickComplete && taskInfo['plan'] == '' ? <span className='font-bold text-red-400 mr-4'>請與團隊討論工作該怎麼進行</span> :<></>}
          <TextArea className='flex-1' placeholder="先跟團隊討論要做什麼之後，負責人再把詳細的想法整理到word上" rows={3} onChange={(e)=>handleInputChange(e,'plan')}/>
        </div>
        <div className='grid gap-2'>
          <span className='font-bold mr-4'>繳交日期</span>
          {clickComplete && taskInfo['handOverDate'] == '' ? <span className='font-bold text-red-400 mr-4'>請輸入繳交日期</span> :<></>}
          <DatePicker format={dateFormat} onChange={handleDateChange} disabledDate={disabledDate}/>
        </div>
        <div className='grid gap-2'>
          <span className='font-bold mr-4'>繳交方式</span>
          {clickComplete && taskInfo['handOver'] == '' ? <span className='font-bold text-red-400 mr-4'>請討論繳交方式</span> :<></>}
          <Input className='flex-1' placeholder="寫在雲端word" onChange={(e)=>handleInputChange(e,'handOver')} />
        </div>
      </div>
      <div className="h-1 bg-gray-300 my-2"></div>
      <div className="grid grid-flow-col gap-3">
        <a href="/#" className="block bg-red-400 py-2 text-white font-bold text-center rounded-md shadow-btn mt-2" onClick={(e) => { e.preventDefault(); navigate(`/task/hw/${HWNo}`); }}>取消</a>
        <a href="/#" className="block bg-green-400 py-2 text-white font-bold text-center rounded-md shadow-btn mt-2" onClick={(e) => { e.preventDefault(); handleClickAdd(); }}>完成</a>
      </div>
      </section>
    </div>
  );
}

export default AddTask;
