import { Input, Slider } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createReflectTask, getReflectTask } from '../../api/reflectTaskAPI';
import { completeTask, getTask } from '../../api/taskAPI';
import { getStudentByStudentId } from '../../api/studentAPI';
import ReflectHeader from "../../components/reflect/ReflectHeader";
import dayjs from 'dayjs';

const { TextArea } = Input;

function TaskReflect({userProfile}) {
  const navigate = useNavigate();
  const [isSelf, setIsSelf] = useState(false)
  const { taskId: taskId } = useParams()
  const [task, setTask] = useState()

  useEffect(() => {
    if (userProfile)
      setUpTask()
  }, [taskId, userProfile])

  const setUpTask = async () => {
    const response = await getTask(taskId)
    if(response){
      setTask(response)
      setIsSelf(userProfile['student']['_id'] == response['student_id'])
    }
    else{
      navigate('/notfound')
    }
  }
  

  return (
    <div>
      <ReflectHeader title={"工作完成：反思工具"} />
      {
        isSelf ?
          <SelfReflect task={task} userProfile={userProfile}/> :
          <MemberReflect task={task} userProfile={userProfile}/>
      }
    </div>
  );
}

export default TaskReflect;


function SelfReflect({task, userProfile}) {
  const navigate = useNavigate();
  const [isComplete, setIsComplete] = useState(false)
  const [sliderValue, setSliderValue] = useState(0)
  const [clickComplete, setClickComplete] = useState(0)
  const [reflectInfo, setReflectInfo] = useState({
    reflect1:'',
    reflect2: ''
  })
  
  const [finishDate, setFinishDate] = useState(dayjs().format('MM/DD'))

  useEffect(() => {
    if(task && task['is_finish'] && userProfile){
      setUpReflectInfo()
    }
  }, [task, userProfile])

  const setUpReflectInfo = async () => {
    const response = await getReflectTask(task['_id'],userProfile['student']['_id'])
    setReflectInfo(response)
    setSliderValue(response['score'])
    setFinishDate(task['finish_date'])
    setIsComplete(true)
  }

  const handleClickCheck = async () => {
    setClickComplete(clickComplete + 1)
    if(reflectInfo['reflect1'] == '' || reflectInfo['reflect2'] == '' || sliderValue == 0)
      return    
    const res_task = await completeTask(task['_id'], finishDate)
    const res_reflect = await createReflectTask(userProfile.userId, task['_id'], reflectInfo['reflect1'], reflectInfo['reflect2'], sliderValue, true)
    navigate(0)
  }

  const handleSliderChange = (value) => {
    setSliderValue(value)
  };

  const handleInputChange = (e, type) => {
    const { value } = e.target;
    let temp = reflectInfo
    temp[type] = value
    setReflectInfo(temp)
  };

  return (
    <section className="p-4 grid gap-4">
      <div className='grid gap-5'>
        <div className='flex'>
          <span className='w-28 font-bold mr-2'>工作名稱</span>
          <span className='font-bold'>{task?task['task_name']:''}</span>
        </div>
        <div className='flex'>
          <span className='w-28 font-bold mr-2'>預計繳交日期</span>
          <span className='font-bold'>{task?task['hand_over_date']:''}</span>
        </div>
        <div className='flex'>
          <span className='w-28 font-bold mr-2'>完成日期</span>
          <span className='font-bold'>{task?finishDate:''}</span>
        </div>
        <div className='grid gap-2'>
          <span className='font-bold mr-4'>有遇到什麼困難？</span>
          {!isComplete ?
            <>
              {clickComplete && reflectInfo['reflect1'] == '' ? <span className='font-bold text-red-400 mr-4'>請輸入你遇到了哪些困難？</span> :<></>}
              <TextArea className='flex-1' rows={3} placeholder="我在進行...事情的時候，遇到了...的困難，我覺得下次可以用...的方式來改進" onChange={(e)=>handleInputChange(e,'reflect1')}/>
            </> :
            <span>{reflectInfo['reflect1']}</span>
          }
        </div>
        <div className='grid gap-2'>
          <span className='font-bold mr-4'>有哪些可以改進的地方？</span>
          {!isComplete ?
            <>
              {clickComplete && reflectInfo['reflect2'] == '' ? <span className='font-bold text-red-400 mr-4'>請輸入有哪些可以改進的地方</span> :<></>}
              <TextArea className='flex-1' rows={3} placeholder="評估了工作成果，我覺得在...的部分，下次可以用...方法做得更好" onChange={(e)=>handleInputChange(e,'reflect2')}/>
            </> :
            <span>{reflectInfo['reflect2']}</span>
          }
        </div>
        <div className='grid gap-2'>
          <div className='flex justify-between'>
            <span className='font-bold'>你對自己執行成果的滿意分數？</span>
            <span className='font-bold text-purple-400'>{sliderValue}分</span>
          </div>
          {clickComplete && sliderValue == 0 ? <span className='font-bold text-red-400 mr-4'>請輸入分數</span> :<></>}
          {!isComplete ?
            <Slider disabled={false} onChange={handleSliderChange} /> :
            <></>
          }
        </div>
      </div>
      {
        !isComplete ?
          <a href="/#" className="block bg-purple-400 py-2 text-white font-bold text-center rounded-md shadow-btn mt-2" onClick={(e) => { e.preventDefault(); handleClickCheck(); }}>確認</a> :
          <></>
      }
    </section>
  );
}


function MemberReflect({task, userProfile}) {
  const navigate = useNavigate();
  const [isComplete, setIsComplete] = useState(false)
  const [sliderValue, setSliderValue] = useState(0)
  const [clickComplete, setClickComplete] = useState(0)
  const [studentName, setStudentName] = useState('')
  const [reflectInfo, setReflectInfo] = useState({
    reflect1:'',
    reflect2: ''
  })

  useEffect(() => {
    if(task && userProfile){
      //取得已經填寫的
      setUpReflectInfo()
      //取得學生名字
      setTaskStudentInfo()
    }
  }, [task, userProfile])

  const setUpReflectInfo = async () => {
    const response = await getReflectTask(task['_id'],userProfile['student']['_id'])
    if (response){
      setReflectInfo(response)
      setSliderValue(response['score'])
      setIsComplete(true)
    }
  }

  const setTaskStudentInfo = async () => {
    const response = await getStudentByStudentId(task['student_id'])
    setStudentName(response['name'])
  }

  const handleClickCheck = async () => {
    setClickComplete(clickComplete + 1)
    if(reflectInfo['reflect1'] == '' || reflectInfo['reflect2'] == '' || sliderValue == 0)
      return    
    const res_reflect = await createReflectTask(userProfile.userId, task['_id'], reflectInfo['reflect1'], reflectInfo['reflect2'], sliderValue, false)
    navigate(0)
    // navigate(`/reflect-task/${task['_id']}`)
  }

  const handleSliderChange = (value) => {
    setSliderValue(value)
  };

  const handleInputChange = (e, type) => {
    const { value } = e.target;
    let temp = reflectInfo
    temp[type] = value
    setReflectInfo(temp)
  };

  return (
    <section className="p-4 grid gap-4">
      <div className='grid gap-5'>
        <div className='flex'>
          <span className='w-28 font-bold mr-2'>工作名稱</span>
          <span className='font-bold'>{task?task['task_name']:''}</span>
        </div>
        <div className='flex'>
          <span className='w-28 font-bold mr-2'>負責人</span>
          <span className='font-bold'>{studentName}</span>
        </div>
        <div className='flex'>
          <span className='w-28 font-bold mr-2'>預計繳交日期</span>
          <span className='font-bold'>{task?task['hand_over_date']:''}</span>
        </div>
        <div className='flex'>
          <span className='w-28 font-bold mr-2'>完成日期</span>
          <span className='font-bold'>{task?task['finish_date']:''}</span>
        </div>
        <div className='grid gap-2'>
          <span className='font-bold mr-4'>你覺得成果有哪些地方可以修改？</span>
          {!isComplete ?
            <>
              {clickComplete && reflectInfo['reflect1'] == '' ? <span className='font-bold text-red-400 mr-4'>請輸入你覺得成果有哪些地方可以修改</span> :<></>}
              <TextArea className='flex-1' rows={3} placeholder="我覺得在...的部分，可以用...的方式做得可好" onChange={(e)=>handleInputChange(e,'reflect1')}/>
            </> :
            <span>{reflectInfo['reflect1']}</span>
          }
        </div>
        <div className='grid gap-2'>
          <span className='font-bold mr-4'>你有什麼其他建議呢？</span>
          {!isComplete ?
            <>
              {clickComplete && reflectInfo['reflect2'] == '' ? <span className='font-bold text-red-400 mr-4'>請輸入你的建議</span> :<></>}
              <TextArea className='flex-1' rows={3}  placeholder="我覺得..." onChange={(e)=>handleInputChange(e,'reflect2')} />
            </> :
            <span>{reflectInfo['reflect2']}</span>
          }
        </div>
        <div className='grid gap-2'>
          <div className='flex justify-between'>
            <span className='font-bold'>你對該成果的滿意程度？</span>
            <span className='font-bold text-purple-400'>{sliderValue}分</span>
          </div>
          {clickComplete && sliderValue == 0 ? <span className='font-bold text-red-400 mr-4'>請輸入分數</span> :<></>}
          {!isComplete ?
            <Slider disabled={false} onChange={handleSliderChange} /> :
            <></>
          }
        </div>
      </div>
      {
        !isComplete ?
          <a href="/#" className="block bg-purple-400 py-2 text-white font-bold text-center rounded-md shadow-btn mt-2" onClick={(e) => { e.preventDefault(); handleClickCheck(); }}>確認</a> :
          <></>
      }
    </section>
  );
}