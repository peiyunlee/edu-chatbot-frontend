import { CheckCircleFilled } from "@ant-design/icons"
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { claimTask } from "../../api/taskAPI"
import { useSelector } from "react-redux";


function Task({ isSomeone, title, data }) {
    const userProfile = useSelector((state) => state.userProfile);
    const navigate = useNavigate();
    const [showInfo, setShowInfo] = useState(false)
    const { HWNo: HWNo } = useParams()

    const handleClickShowInfo = () => {
        setShowInfo(!showInfo)
    }

    const handleClickComplete = () => {
        navigate(`/reflect-task/${data['_id']}`)
    }

    const handleClickClaim = () => {
        const response = claimTask(userProfile.userId, data._id)
        navigate(0)
    }

    return (
        <div className="bg-gray-200 rounded-md p-3">
            <a href="/#" className="grid gap-4 my-1" onClick={(e) => { handleClickShowInfo(); e.preventDefault(); }}>
                <div className="flex items-center">
                    <span className="flex-1 mr-4 font-bold">{data.task_name}</span>
                    <span className="w-14 text-center mr-4">{data.hand_over_date}</span>
                    <div className="w-14 text-center">
                        {data.is_finish ? <CheckCircleFilled style={{ fontSize: "16px" }} /> : <></>}
                    </div>
                </div>
                {
                    showInfo ?
                        <div className="grid gap-2">
                            <div className="flex">
                                <span className="mr-4 text-gray-400 font-bold">怎麼進行</span>
                                <span className="flex-1 text-gray-400">{data.plan}</span>
                            </div>
                            <div className="flex">
                                <span className="mr-4 text-gray-400 font-bold">繳交方式</span>
                                <span className="flex-1 text-gray-400">{data.hand_over}</span>
                            </div>
                        </div> :
                        <></>
                }

            </a>
            {
                showInfo && !data.is_finish ?
                    <div className="grid grid-flow-col gap-3 mt-3">
                        <a href="/#" className="block bg-gray-300 py-2 text-white font-bold text-center rounded-md shadow-btn mt-2" onClick={(e) => { navigate(`/task/hw/${HWNo}/edit/${data._id}`); e.preventDefault(); }}>編輯</a>
                        {data.student_id == '' ?
                            <a href="/#" className="block bg-green-400 py-2 text-white font-bold text-center rounded-md shadow-btn mt-2" onClick={(e) => { handleClickClaim(); e.preventDefault(); }}>認領</a> : 
                            data.student_id == userProfile['student']['_id'] ? <a href="/#" className="block bg-green-400 py-2 text-white font-bold text-center rounded-md shadow-btn mt-2" onClick={(e) => { handleClickComplete(); e.preventDefault(); }}>完成</a>:<></>
                        }
                    </div> :
                    <></>
            }
        </div>
    );
}

export default Task;
