// import { useNavigate } from 'react-router-dom';
import { Input, Slider } from 'antd';
import { useState } from 'react';
import ReflectHeader from "../../components/reflect/ReflectHeader";

const { TextArea } = Input;

function TaskReflect() {
  const [isSelf, setIsSelf] = useState(false)

  return (
    <div>
      <ReflectHeader title={"完成任務反思工具"} />
      {
        isSelf ?
          <SelfReflect /> :
          <MemberReflect />
      }
    </div>
  );
}

export default TaskReflect;


function SelfReflect() {
  // const navigate = useNavigate();
  const [isComplete, setIsComplete] = useState(false)
  const [sliderValue, setSliderValue] = useState(0)

  const handleClickCheck = () => {
    setIsComplete(true)
  }

  const handleSliderChange = (value) => {
    setSliderValue(value)
  };

  return (
    <section className="p-4 grid gap-4">
      <div className='grid gap-5'>
        <div className='flex'>
          <span className='w-28 font-bold mr-2'>任務名稱</span>
          <span className='font-bold'>專案介紹</span>
        </div>
        <div className='flex'>
          <span className='w-28 font-bold mr-2'>預計繳交日期</span>
          <span className='font-bold'>04/02</span>
        </div>
        <div className='flex'>
          <span className='w-28 font-bold mr-2'>完成日期</span>
          <span className='font-bold'>04/02</span>
        </div>
        <div className='grid gap-2'>
          <span className='font-bold mr-4'>遇到什麼困難？</span>
          {!isComplete ?
            <>
              <span className='font-bold text-gray-400 mr-4'>怎麼檢討遇到什麼困難？</span>
              <TextArea className='flex-1' rows={3} />
            </> :
            <span>怎麼檢討遇到什麼困難</span>
          }
        </div>
        <div className='grid gap-2'>
          <span className='font-bold mr-4'>有哪些可以改進的地方？</span>
          {!isComplete ?
            <>
              <span className='font-bold text-gray-400 mr-4'>怎麼檢討有哪些可以改進的地方</span>
              <TextArea className='flex-1' rows={3} />
            </> :
            <span>有哪些可以改進的地方</span>
          }
        </div>
        <div className='grid gap-2'>
          <div className='flex justify-between'>
            <span className='font-bold'>你對自己執行成果的滿意分數？</span>
            <span className='font-bold text-purple-400'>{sliderValue}分</span>
          </div>
          {!isComplete ?
            <Slider disabled={false} onChange={handleSliderChange} /> :
            <></>
          }
        </div>
      </div>
      {
        !isComplete ?
          <a href="/#" className="block bg-purple-400 py-2 text-white font-bold text-center rounded-md shadow-btn mt-2" onClick={(e) => { handleClickCheck(); e.preventDefault(); }}>確認</a> :
          <></>
      }
    </section>
  );
}


function MemberReflect() {
  // const navigate = useNavigate();
  const [isComplete, setIsComplete] = useState(false)
  const [sliderValue, setSliderValue] = useState(0)

  const handleClickCheck = () => {
    setIsComplete(true)
  }

  const handleSliderChange = (value) => {
    setSliderValue(value)
  };

  return (
    <section className="p-4 grid gap-4">
      <div className='grid gap-5'>
        <div className='flex'>
          <span className='w-28 font-bold mr-2'>任務名稱</span>
          <span className='font-bold'>專案介紹</span>
        </div>
        <div className='flex'>
          <span className='w-28 font-bold mr-2'>負責人</span>
          <span className='font-bold'>ＸＸＸ</span>
        </div>
        <div className='flex'>
          <span className='w-28 font-bold mr-2'>預計繳交日期</span>
          <span className='font-bold'>04/02</span>
        </div>
        <div className='flex'>
          <span className='w-28 font-bold mr-2'>完成日期</span>
          <span className='font-bold'>04/02</span>
        </div>
        <div className='grid gap-2'>
          <span className='font-bold mr-4'>有哪些地方你覺得可以修改？</span>
          {!isComplete ?
            <>
              <span className='font-bold text-gray-400 mr-4'>怎麼檢討有哪些地方你覺得可以修改？</span>
              <TextArea className='flex-1' rows={3} />
            </> :
            <span>有哪些地方你覺得可以修改</span>
          }
        </div>
        <div className='grid gap-2'>
          <span className='font-bold mr-4'>你有什麼建議呢？</span>
          {!isComplete ?
            <>
              <span className='font-bold text-gray-400 mr-4'>怎麼檢討你有什麼建議呢？</span>
              <TextArea className='flex-1' rows={3} />
            </> :
            <span>你有什麼建議</span>
          }
        </div>
        <div className='grid gap-2'>
          <div className='flex justify-between'>
            <span className='font-bold'>你對該成果的滿意程度？</span>
            <span className='font-bold text-purple-400'>{sliderValue}分</span>
          </div>
          {!isComplete ?
            <Slider disabled={false} onChange={handleSliderChange} /> :
            <></>
          }
        </div>
      </div>
      {
        !isComplete ?
          <a href="/#" className="block bg-purple-400 py-2 text-white font-bold text-center rounded-md shadow-btn mt-2" onClick={(e) => { handleClickCheck(); e.preventDefault(); }}>確認</a> :
          <></>
      }
    </section>
  );
}