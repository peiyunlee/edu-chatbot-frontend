import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function Task({ isSomeone, title }) {
    const navigate = useNavigate();
    const [showInfo, setShowInfo] = useState(false)
    const { HWNo: HWNo } = useParams()
    const taskId = 'task_id_test'

    const handleClickShowInfo = () => {
        setShowInfo(!showInfo)
    }

    const handleClickComplete = () => {
    }

    return (
        <div className="bg-gray-200 rounded-md p-3">
            <a href="/#" className="grid gap-4 my-1" onClick={(e) => { handleClickShowInfo(); e.preventDefault(); }}>
                <div className="flex items-center">
                    <span className="flex-1 mr-4 font-bold">專案背景</span>
                    <div className="w-14 bg-gray-300 h-2 rounded-lg mr-4 overflow-hidden">
                        <div className="w-5 bg-green-400 h-2 rounded-lg"></div>
                    </div>
                    <span className="w-14 text-center">04/02</span>
                </div>
                {
                    showInfo ?
                        <div className="grid gap-2">
                            <div className="flex">
                                <span className="mr-4 text-gray-400 font-bold">怎麼進行</span>
                                <span className="flex-1 text-gray-400">先討論要做什麼之後，再把想法打到word上</span>
                            </div>
                            <div className="flex">
                                <span className="mr-4 text-gray-400 font-bold">繳交方式</span>
                                <span className="flex-1 text-gray-400">雲端 word</span>
                            </div>
                        </div> :
                        <></>
                }

            </a>
            {
                showInfo ?
                    <div className="grid grid-flow-col gap-3 mt-3">
                        <a href="/#" className="block bg-gray-300 py-2 text-white font-bold text-center rounded-md shadow-btn mt-2" onClick={(e) => { navigate(`/task/hw/${HWNo}/edit/${taskId}`); e.preventDefault(); }}>編輯</a>
                        <a href="/#" className="block bg-green-400 py-2 text-white font-bold text-center rounded-md shadow-btn mt-2" onClick={(e) => { handleClickComplete(); e.preventDefault(); }}>完成</a>
                    </div> :
                    <></>
            }
        </div>
    );
}

export default Task;
