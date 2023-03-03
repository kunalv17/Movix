import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ReactPlayer from "react-player/youtube";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
  };
    return (
        <div className={` flex justify-center items-center duration-75 ${show ? "visible" : "hidden"}`}>
            <div className="opacityLayer absolute w-[100vw] h-[150vh] backdrop-blur-[4px] z-auto" onClick={hidePopup}></div>
            <div className="videoPlayer flex flex-col absolute items-center m-10 z-auto w-[60vw] h-[33.75vw] top-[15vh]">
                <span className="closeBtn absolute -top-10 " onClick={hidePopup}>
                    <AiOutlineCloseCircle className="text-white font-thin hover:text-[#dd395f] w-8 h-8 mb-4"/>
                </span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                    // playing={true}
                />
            </div>
        </div>
    );
};

export default VideoPopup;
