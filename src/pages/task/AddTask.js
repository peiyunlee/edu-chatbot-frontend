import { useParams, useNavigate } from 'react-router-dom';

import TaskHeader from "../../components/task/TaskHeader";
import { Input } from 'antd';
const { TextArea } = Input;

function AddTask() {
  const navigate = useNavigate();
  const { HWNo: HWNo } = useParams();

  const handleClickAdd = () => {
    navigate(`/task/hw/${HWNo}`)
  }

  return (
    <div>
      <TaskHeader />
      <section className="px-4 py-5 grid gap-4">
      <div className='grid gap-5'>
        <div className='flex'>
          <span className='font-bold mr-4'>任務名稱</span>
          <Input className='flex-1' placeholder="專案介紹" />
        </div>
        <div className='grid gap-2'>
          <span className='font-bold mr-4'>怎麼進行</span>
          <span className='font-bold text-gray-400 mr-4'>怎麼討論怎麼進行</span>
          <TextArea className='flex-1' rows={3}/>
        </div>
        <div className='grid gap-2'>
          <span className='font-bold mr-4'>繳交日期</span>
          <span className='font-bold text-gray-400 mr-4'>怎麼討論繳交日期</span>
          <Input className='flex-1' placeholder="04/02" />
        </div>
        <div className='grid gap-2'>
          <span className='font-bold mr-4'>繳交方式</span>
          <span className='font-bold text-gray-400 mr-4'>怎麼討論繳交方式</span>
          <Input className='flex-1' placeholder="雲端word" />
        </div>
      </div>
      <div className="h-1 bg-gray-300 my-2"></div>
      <div className="grid grid-flow-col gap-3">
        <a href="/#" className="block bg-red-400 py-2 text-white font-bold text-center rounded-md shadow-btn mt-2" onClick={(e) => { navigate(`/task/hw/${HWNo}`); e.preventDefault(); }}>取消</a>
        <a href="/#" className="block bg-green-400 py-2 text-white font-bold text-center rounded-md shadow-btn mt-2" onClick={(e) => { handleClickAdd(); e.preventDefault(); }}>完成</a>
      </div>
      </section>
    </div>
  );
}

export default AddTask;