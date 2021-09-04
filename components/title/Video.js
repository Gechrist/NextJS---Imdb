import React,{useEffect,useState} from "react"
import ReactPlayer from 'react-player/youtube'

const Video = ({videos}) => {
    const [videoID, setVideoID] = useState('');
 
    useEffect(() => {
        let trailer = videos.filter(item => item.official === true && item.site === "YouTube" && item.type === "Trailer")
        setVideoID(trailer[0]?.key);
        !trailer.length? trailer = videos.filter(item => item.site === "YouTube" && item.type === "Trailer"):null
        setVideoID(trailer[0]?.key)
    },[videos,videoID])
 
    return (
        <div className='relative -mt-88 lg:-mt-102 2xl:-mt-104 w-full h-80 lg:h-88 2xl:h-96 pt-video'>
          {videoID ? <ReactPlayer className='absolute top-0 left-0'
              config={{
                youtube: {
                playerVars: { rel: 0, modestbranding:1,  origin: window.location  }
                }}}  url={`https://www.youtube.com/watch?v=${videoID}`} wrapper="div" controls={true} volume={0} playing={true} width='100%'
            height='100%'/>: <p className="absolute bottom-4 text-xl"> No Trailer Available</p>}
        </div>
    )
}

export default Video
