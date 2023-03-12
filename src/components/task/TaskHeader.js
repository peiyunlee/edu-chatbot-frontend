import { useNavigate, useParams } from 'react-router-dom';
import { InfoCircleOutlined, DoubleRightOutlined } from "@ant-design/icons"
import { useEffect, useState } from 'react';
import { getHW } from '../../api/taskAPI';


function TaskHeader({ canClickNext=false }) {
  const navigate = useNavigate();
  const { HWNo: HWNo } = useParams();
  const [ homework , setHomework ] = useState(null)

  const handleClickNext = () => {
    if (HWNo >= 3) {
      navigate(`/hw/1`)
    }
    else {
      navigate(`/hw/${parseInt(HWNo) + 1}`)
    }
  }

  const setUpHomework = async () => {
    const response = await getHW(HWNo)
    setHomework(response)
  }

  useEffect(() => {
    setUpHomework()
  }, [HWNo])
  

  return (
    <header className="h-header px-4 bg-green-400 text-white flex justify-between items-center">
      <div className="grid grid-flow-col gap-2 items-center">
        <h1 className="font-bold text-lg">第{HWNo == 1 ? '一' : HWNo == 2 ? '二' : '三'}階段作業</h1>
        <span className="ml-2">繳交日期 {homework ? homework['hand_over_date']: ''}</span>
      </div>
      {/* {
        canClickNext ?
          <a className="flex p-1 pr-0" href="/#" onClick={(e) => {handleClickNext(); e.preventDefault(); }}><DoubleRightOutlined style={{ fontSize: "16px" }} /></a> :
          <></>
      } */}
    </header>
  );
}

export default TaskHeader;