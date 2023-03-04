// import { useNavigate } from 'react-router-dom';
import { Input, Slider, Checkbox } from 'antd';
import { useState } from 'react';
import ReflectHeader from "../../components/reflect/ReflectHeader";
import { CheckCircleFilled, CloseCircleOutlined } from "@ant-design/icons"


const { TextArea } = Input;

function HWReflect() {
    const [isReflectFormComplete, setIsReflectFormComplete] = useState(false)
    const [isHWCheckComplete, setIsHWCheckComplete] = useState(false)
    const [showHWCheck, setShowHWCheck] = useState(true)
    // const navigate = useNavigate();

    const handleClickCheck = () => {
        if(!isHWCheckComplete){
            setIsHWCheckComplete(true)
            setShowHWCheck(false)
        }
        else if (isHWCheckComplete && !isReflectFormComplete){
            setIsReflectFormComplete(true)
            setShowHWCheck(true)
        }
        else if(isHWCheckComplete && isReflectFormComplete){
            setShowHWCheck(!showHWCheck)
        }
    }

    return (
        <div>
            <ReflectHeader title={"作業查核與成果回饋工具"} />
            {
                showHWCheck ?
                <HWCheck isComplete={isHWCheckComplete}/> :
                <ReflectForm isComplete={isReflectFormComplete}/>
            }
            {
                !isHWCheckComplete || !isReflectFormComplete ?
                    <a 
                    href="/#" 
                    className="mx-4 block bg-purple-400 py-2 text-white font-bold text-center rounded-md shadow-btn mt-2" 
                    onClick={(e) => { handleClickCheck(); e.preventDefault(); }}>
                        {isReflectFormComplete ? "確認":"填寫成果回饋"}
                    </a> :
                    <></>
            }
            {
                isHWCheckComplete && isReflectFormComplete ?
                    <a 
                    href="/#" 
                    className="mx-4 block bg-purple-400 py-2 text-white font-bold text-center rounded-md shadow-btn mt-2" 
                    onClick={(e) => { handleClickCheck(); e.preventDefault(); }}>
                        {showHWCheck ? "查看我的成果回饋":"查看我的作業查核結果"}
                    </a> :
                    <></>
            }
        </div>
    );
}

export default HWReflect;


function ReflectForm({isComplete}) {
    // const navigate = useNavigate();
    const [sliderValue, setSliderValue] = useState(0)

    const handleSliderChangeGroup = (value) => {
        setSliderValue(value)
    };

    const handleSliderChangeHW = (value) => {
        setSliderValue(value)
    };

    return (
        <section className="p-4 grid gap-4">
            <div className='grid gap-5'>
                <span className='font-bold text-purple-400 text-lg'>作業1：繳交企劃書(word)</span>
                <div className='flex'>
                    <span className='w-28 font-bold mr-2'>預計繳交日期</span>
                    <span className='font-bold'>04/02</span>
                </div>
                <div className='flex'>
                    <span className='w-28 font-bold mr-2'>完成日期</span>
                    <span className='font-bold'>04/02</span>
                </div>
                <div className='grid gap-2'>
                    <span className='font-bold mr-4'>作業還有沒有可以改進的地方？</span>
                    {!isComplete ?
                        <>
                            <span className='font-bold text-gray-400 mr-4'>怎麼檢討？</span>
                            <TextArea className='flex-1' rows={3} />
                        </> :
                        <span>作業還有沒有可以改進的地方</span>
                    }
                </div>
                <div className='grid gap-2'>
                    <span className='font-bold mr-4'>團隊進行的主要挑戰？</span>
                    {!isComplete ?
                        <>
                            <span className='font-bold text-gray-400 mr-4'>怎麼檢討</span>
                            <TextArea className='flex-1' rows={3} />
                        </> :
                        <span>團隊進行的主要挑戰</span>
                    }
                </div>
                <div className='grid gap-2'>
                    <span className='font-bold mr-4'>下次規劃需要注意的是？</span>
                    {!isComplete ?
                        <>
                            <span className='font-bold text-gray-400 mr-4'>怎麼檢討</span>
                            <TextArea className='flex-1' rows={3} />
                        </> :
                        <span>下次規劃需要注意的是</span>
                    }
                </div>
                <div className='grid gap-2'>
                    <span className='font-bold mr-4'>你有什麼其他建議呢？</span>
                    {!isComplete ?
                        <>
                            <span className='font-bold text-gray-400 mr-4'>怎麼檢討</span>
                            <TextArea className='flex-1' rows={3} />
                        </> :
                        <span>團隊進行的主要挑戰</span>
                    }
                </div>
                <div className='grid gap-2'>
                    <div className='flex justify-between'>
                        <span className='font-bold'>你對團隊的滿意程度？</span>
                        <span className='font-bold text-purple-400'>{sliderValue}分</span>
                    </div>
                    {!isComplete ?
                        <Slider disabled={false} onChange={handleSliderChangeGroup} /> :
                        <></>
                    }
                </div>
                <div className='grid gap-2'>
                    <div className='flex justify-between'>
                        <span className='font-bold'>你覺得專題的完成度？</span>
                        <span className='font-bold text-purple-400'>{sliderValue}分</span>
                    </div>
                    {!isComplete ?
                        <Slider disabled={false} onChange={handleSliderChangeHW} /> :
                        <></>
                    }
                </div>
            </div>
        </section>
    );
}

function HWCheck({isComplete}) {
    // const navigate = useNavigate();

    const handleClickCheck = (e) => {
        // console.log(`checked = ${e.target.checked}`);
      };

    return (
        <section className="p-4 grid gap-4">
            <div className='grid gap-5'>
                <span className='font-bold text-purple-400 text-lg'>作業1：繳交企劃書(word)</span>
                <span>企劃書內容需包含專案介紹、專案說明、設計概念</span>
                <div className="h-1 bg-gray-300"></div>
                <div className='grid gap-2'>
                    <span className='font-bold'>一、專案介紹</span>
                    {
                        !isComplete ? 
                        <Checkbox className='ml-2' onChange={handleClickCheck}>專案背景</Checkbox> :
                        <div>
                            <CheckCircleFilled className='text-purple-400 text-lg'/>
                            <span className='ml-4'>專案背景</span>
                        </div>
                    }
                    {
                        !isComplete ? 
                        <Checkbox onChange={handleClickCheck}>專案背景</Checkbox> :
                        <div>
                            <CloseCircleOutlined className='text-purple-400 text-lg' />
                            <span className='ml-4'>專案背景</span>
                        </div>
                    }
                </div>
                <div className='grid gap-2'>
                    <span className='font-bold'>二、專案介紹</span>
                    {
                        !isComplete ? 
                        <Checkbox className='ml-2' onChange={handleClickCheck}>專案背景</Checkbox> :
                        <div>
                            <CheckCircleFilled className='text-purple-400 text-lg'/>
                            <span className='ml-4'>專案背景</span>
                        </div>
                    }
                    {
                        !isComplete ? 
                        <Checkbox onChange={handleClickCheck}>專案背景</Checkbox> :
                        <div>
                            <CheckCircleFilled className='text-purple-400 text-lg'/>
                            <span className='ml-4'>專案背景</span>
                        </div>
                    }
                </div>
            </div>
        </section>
    );
}