// import { useNavigate } from 'react-router-dom';
import { Input, Slider, Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import ReflectHeader from "../../components/reflect/ReflectHeader";
import { CheckCircleFilled, CloseCircleOutlined, CloseCircleFilled } from "@ant-design/icons"
import { getHomework, getCheckHomework, getHomeworkReflect, createHomeworkReflect } from '../../api/reflectHWAPI';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';


const { TextArea } = Input;

function HWReflect({ userProfile }) {
    const navigate = useNavigate();
    const [isReflectFormComplete, setIsReflectFormComplete] = useState(false)
    const [isHWCheckComplete, setIsHWCheckComplete] = useState(false)
    const [showHWCheck, setShowHWCheck] = useState(true)
    const { HWNo: HWNo } = useParams()
    const [homework, setHomework] = useState(null)
    const [checkLists, setCheckLists] = useState([])
    const [clickComplete, setClickComplete] = useState(0)
    const [reflectInfo, setReflectInfo] = useState({
        reflect1: '',
        reflect2: '',
        reflect3: '',
        reflect4: ''
    })
    const [groupScore, setGroupScore] = useState(0)
    const [score, setScore] = useState(0)


    const handleClickCheck = async () => {
        if (!isHWCheckComplete) {
            setIsHWCheckComplete(true)
            setShowHWCheck(false)
        }
        else if (isHWCheckComplete && !isReflectFormComplete) {
            setClickComplete(clickComplete + 1)
            if (reflectInfo['reflect1'] == '' || reflectInfo['reflect2'] == '' || reflectInfo['reflect3'] == '' || reflectInfo['reflect4'] == '' || groupScore == 0 || score == 0)
                return
            console.log("aa")            
            setIsReflectFormComplete(true)
            setShowHWCheck(true)
            const res_reflect = await createHomeworkReflect(HWNo, userProfile['userId'], reflectInfo, checkLists, groupScore, score)
            navigate('0')
        }
        else if (isHWCheckComplete && isReflectFormComplete) {
            setShowHWCheck(!showHWCheck)
        }
    }

    useEffect(() => {

        //setup reflect 如果已經填過
        if (userProfile) {
            setUpHomework()
            setUpReflectInfo()
        }
    }, [HWNo, userProfile])

    const setUpReflectInfo = async () => {
        const res_reflect = await getHomeworkReflect(HWNo, userProfile['student']['_id'])
        console.log(res_reflect)
        if (!res_reflect) return
        setReflectInfo(res_reflect)
        setGroupScore(res_reflect['group_score'])
        setScore(res_reflect['score'])
        setIsReflectFormComplete(true)
        setIsHWCheckComplete(true)
        const res_check = await getCheckHomework(HWNo, userProfile['student']['_id'])
        console.log(res_check)
        setCheckLists([res_check['rule1_checked'], res_check['rule2_checked'], res_check['rule3_checked']])
        setShowHWCheck(true)
    }

    const setUpHomework = async () => {
        const response = await getHomework(HWNo)
        if (!response) return
        setHomework(response)

        let temp = []
        let lists = []
        response['rule1_contents'].forEach(item => {
            temp.push(false)
        });
        lists.push(temp)

        if (!response['rule2_title'] == '') {
            temp = []
            response['rule2_contents'].forEach(item => {
                temp.push(false)
            });
        }
        lists.push(temp)

        if (!response['rule3_title'] == '') {
            temp = []
            response['rule3_contents'].forEach(item => {
                temp.push(false)
            });
        }
        lists.push(temp)

        setCheckLists(lists)
    }


    return (
        <div>
            <ReflectHeader title={"作業查核與成果回饋工具"} />
            {
                showHWCheck && userProfile ?
                    <HWCheck isComplete={isHWCheckComplete} HWNo={HWNo} homework={homework} checkLists={checkLists} setCheckLists={setCheckLists} /> :
                    <ReflectForm isComplete={isReflectFormComplete} HWNo={HWNo} homework={homework} reflectInfo={reflectInfo} setReflectInfo={setReflectInfo} groupScore={groupScore} setGroupScore={setGroupScore} score={score} setScore={setScore} clickComplete={clickComplete} />
            }
            {
                !isHWCheckComplete || !isReflectFormComplete ?
                    <a
                        href="/#"
                        className="mx-4 block bg-purple-400 py-2 text-white font-bold text-center rounded-md shadow-btn mt-2"
                        onClick={(e) => { e.preventDefault(); handleClickCheck(); }}>
                        {isHWCheckComplete ? "確認" : "填寫成果回饋"}
                    </a> :
                    <></>
            }
            {
                isHWCheckComplete && isReflectFormComplete ?
                    <a
                        href="/#"
                        className="mx-4 block bg-purple-400 py-2 text-white font-bold text-center rounded-md shadow-btn mt-2"
                        onClick={(e) => { e.preventDefault(); handleClickCheck(); }}>
                        {showHWCheck ? "查看我的成果回饋" : "查看我的作業查核結果"}
                    </a> :
                    <></>
            }
        </div>
    );
}

export default HWReflect;


function ReflectForm({ isComplete, homework, HWNo, reflectInfo, setReflectInfo, clickComplete, groupScore, score, setGroupScore, setScore }) {

    const handleInputChange = (e, type) => {
        const { value } = e.target;
        let temp = reflectInfo
        temp[type] = value
        setReflectInfo(temp)
    };

    return (
        <section className="p-4 grid gap-4">
            <div className='grid gap-5'>
                <span className='font-bold text-purple-400 text-lg'>作業{HWNo}：{homework ? homework['title'] : ''}</span>
                <div className='grid gap-2'>
                    <span className='font-bold mr-4'>作業還有沒有可以改進的地方？</span>
                    {!isComplete ?
                        <>
                            {clickComplete && reflectInfo['reflect1'] == '' ? <span className='font-bold text-red-400 mr-4'>請輸入你覺得作業還有哪些可以改進的地方</span> : <></>}
                            <TextArea className='flex-1' rows={3} placeholder="我覺得...的部分...，下次可以用...的方式來改進" onChange={(e) => handleInputChange(e, 'reflect1')} />
                        </> :
                        <span>{reflectInfo['reflect1']}</span>
                    }
                </div>
                <div className='grid gap-2'>
                    <span className='font-bold mr-4'>團隊進行遇到的挑戰？應該如何克服？</span>
                    {!isComplete ?
                        <>
                            {clickComplete && reflectInfo['reflect1'] == '' ? <span className='font-bold text-red-400 mr-4'>請輸入團隊進行中遇到的挑戰？</span> : <></>}
                            <TextArea className='flex-1' rows={3} placeholder="我們在進行...事情的時候，遇到了...的困難" onChange={(e) => handleInputChange(e, 'reflect2')} />
                        </> :
                        <span>{reflectInfo['reflect2']}</span>
                    }
                </div>
                <div className='grid gap-2'>
                    <span className='font-bold mr-4'>下次規劃需要注意的事情？</span>
                    {!isComplete ?
                        <>
                            {clickComplete && reflectInfo['reflect3'] == '' ? <span className='font-bold text-red-400 mr-4'>請輸入下次規劃需要注意的事情</span> : <></>}
                            <TextArea className='flex-1' rows={3} placeholder="因爲這次碰到了...困難，我覺得下次的作業可以用...方法做得更好" onChange={(e) => handleInputChange(e, 'reflect3')} />
                        </> :
                        <span>{reflectInfo['reflect3']}</span>
                    }
                </div>
                <div className='grid gap-2'>
                    <span className='font-bold mr-4'>你有什麼其他建議呢？</span>
                    {!isComplete ?
                        <>
                            {clickComplete && reflectInfo['reflect4'] == '' ? <span className='font-bold text-red-400 mr-4'>請輸入你的建議</span> : <></>}
                            <TextArea className='flex-1' rows={3} placeholder="我覺得..." onChange={(e) => handleInputChange(e, 'reflect4')} />
                        </> :
                        <span>{reflectInfo['reflect4']}</span>
                    }
                </div>
                <div className='grid gap-2'>
                    <div className='flex justify-between'>
                        <span className='font-bold'>你對團隊的滿意程度？</span>
                        <span className='font-bold text-purple-400'>{groupScore}分</span>
                    </div>
                    {clickComplete && groupScore == 0 ? <span className='font-bold text-red-400 mr-4'>請輸入分數</span> : <></>}
                    {!isComplete ?
                        <Slider disabled={false} onChange={(value) => setGroupScore(value)} /> :
                        <></>
                    }
                </div>
                <div className='grid gap-2'>
                    <div className='flex justify-between'>
                        <span className='font-bold'>你覺得作業的完成度？</span>
                        <span className='font-bold text-purple-400'>{score}分</span>
                    </div>
                    {clickComplete && score == 0 ? <span className='font-bold text-red-400 mr-4'>請輸入分數</span> : <></>}
                    {!isComplete ?
                        <Slider disabled={false} onChange={(value) => setScore(value)} /> :
                        <></>
                    }
                </div>
            </div>
        </section>
    );
}

function HWCheck({ isComplete, homework, HWNo, checkLists, setCheckLists }) {

    const handleClickCheck = (e, no, idx) => {
        let temp = checkLists
        temp[no - 1][idx] = !temp[no - 1][idx]
        setCheckLists(temp)
        console.log(temp)
    };

    return (
        <section className="p-4 grid gap-4">
            <div className='grid gap-5'>
                <span className='font-bold text-purple-400 text-lg'>作業{HWNo}：{homework ? homework['title'] : ''}</span>
                <span>{homework ? homework['description'] : ''}</span>
                <span className='font-bold text-md'>請勾選完成的項目!</span>
                <div className="h-1 bg-gray-300"></div>
                {homework ?
                    <div className='grid gap-2'>
                        <span className='font-bold'>{homework['rule1_title']}</span>
                        {
                            homework['rule1_contents'].map((item, idx) =>
                                !isComplete ?
                                    <Checkbox key={`checkbox-${item}`} className='ml-2' onChange={(e) => handleClickCheck(e, 1, idx)}>{item}</Checkbox> :
                                    <div key={`done-${item}`}>
                                        {checkLists[0][idx] ?
                                            <CheckCircleFilled className='text-purple-400 text-lg' /> :
                                            <CloseCircleFilled className='text-lg' />
                                        }
                                        <span className='ml-4'>{item}</span>
                                    </div>
                            )
                        }
                    </div> : <></>
                }
                {homework && !homework['rule2_title'] == '' ?
                    < div className='grid gap-2'>
                        <span className='font-bold'>{homework['rule2_title']}</span>
                        {
                            homework['rule2_contents'].map((item, idx) =>
                                !isComplete ?
                                    <Checkbox key={`checkbox-${item}`} className='ml-2' onChange={(e) => handleClickCheck(e, 2, idx)}>{item}</Checkbox> :
                                    <div key={`done-${item}`}>
                                        {checkLists[1][idx] ?
                                            <CheckCircleFilled className='text-purple-400 text-lg' /> :
                                            <CloseCircleFilled className='text-lg' />}
                                        <span className='ml-4'>{item}</span>
                                    </div>
                            )
                        }
                    </div> : <></>}
                {homework && !homework['rule3_title'] == '' ?
                    <div className='grid gap-2'>
                        <span className='font-bold'>{homework['rule3_title']}</span>
                        {
                            homework['rule3_contents'].map((item, idx) =>
                                !isComplete ?
                                    <Checkbox key={`checkbox-${item}`} className='ml-2' onChange={(e) => handleClickCheck(e, 3, idx)}>{item}</Checkbox> :
                                    <div key={`done-${item}`}>
                                        {checkLists[2][idx] ?
                                            <CheckCircleFilled className='text-purple-400 text-lg' /> :
                                            <CloseCircleFilled className='text-lg' />}
                                        <span className='ml-4'>{item}</span>
                                    </div>
                            )
                        }
                    </div> : <></>
                }
            </div>
        </section >
    );
}