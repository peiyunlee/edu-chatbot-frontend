import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons"
import { useState } from "react";

import Task from "./Task";


function TaskList({ isSomeone, title }) {
    const [showList, setShowList] = useState(true)

    const handleClickShowList = () => {
        setShowList(!showList)
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                {
                    isSomeone ?
                        <div className="w-8 h-8 bg-red-400 rounded-full mr-2"></div> :
                        <></>
                }
                <span className="flex-1 font-bold">{title}</span>
                <a className="flex p-2" href="/#" onClick={(e) => { e.preventDefault(); handleClickShowList(); }}>
                    {
                        !showList ?
                            <CaretDownOutlined style={{ fontSize: "16px" }} /> :
                            <CaretUpOutlined style={{ fontSize: "16px" }} />
                    }
                </a>
            </div>
            <div className="h-1 bg-gray-300 my-2"></div>
            {
                showList ?
                    <div>
                        <div className="text-gray-400 font-bold flex px-2 mb-2">
                            <span className="flex-1 mr-4">任務</span>
                            <span className="w-12 text-center mr-4">進度</span>
                            <span className="w-12 text-center">完成日</span>
                        </div>
                        <div className="grid gap-2">
                            <Task />
                            <Task />
                        </div>
                    </div> :
                    <></>
            }
        </div>
    );
}

export default TaskList;
