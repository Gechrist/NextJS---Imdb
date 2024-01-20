import React,{useState} from 'react';
import Link from 'next/link'

const Credits = ({credits,type}) => {
    const [isActing,setIsActing] = useState(true);
    const [isCrew,setIsCrew] = useState(false);

    return (
        <div className="absolute bg-black flex flex-col w-full h-96 rounded shadow appearance-none py-2 leading-tight 
        overflow-y-auto focus:outline-none whitespace-normal focus:shadow-outline z-45 divide-y 
        divide-yellow-300 bottom-12 md:bottom-14 xl:bottom-18 text-xl 2xl:bottom-26">
            {/* {title credits} */}
            <div className="flex flex-row">
            {type ==='title' && credits?.cast.length>0 && <button onClick={()=>{setIsActing(true);setIsCrew(false)}}  
            className={isActing ? `p-2 rounded-t-lg active:bg-yellow-300 active:text-black active:text-2xl text-black bg-yellow-300 text-2xl`:
            `p-2 rounded-t-lg active:bg-yellow-300 active:text-black active:text-2xl text-yellow-300 text-2xl`}>Acting Credits</button>}
            {type ==='title' && credits?.crew.length>0 && <button onClick={()=>{setIsActing(false);setIsCrew(true)}} 
            className={isCrew ? `p-2 rounded-t-lg active:bg-yellow-300 active:text-black active:text-2xl text-black bg-yellow-300 text-2xl`:
            `p-2 rounded-t-lg active:bg-yellow-300 active:text-black active:text-2xl text-yellow-300 text-2xl`}>
            Crew Credits</button>}
            </div>
            {isActing && type === 'title' && credits?.cast.map((item,index)=>(<div key={index} className='flex flex-row items-center py-1
             pl-1 flex-wrap'><Link href={`/name/${item.id}`} passHref className='p-2 hover:font-bold'>{item?.name}</Link>
             {item?.character && `as\xa0${item.character}`}</div>))}
            {isCrew && type === 'title' && credits?.crew.map((item,index)=>(<div key={index} className='flex flex-row items-center py-1 
            pl-1 flex-wrap'><Link href={`/name/${item.id}`} passHref className='hover:font-bold'>{item?.name}
            </Link> {item?.job && `\xa0- ${item.job}`}</div>))}
            {/* {name credits} */}
            <div className="flex flex-row">
            {type ==='name' && credits?.cast.length>0 && <button onClick={()=>{setIsActing(true);setIsCrew(false)}}  
            className={isActing ? `p-2 rounded-t-lg active:bg-yellow-300 active:text-black active:text-2xl text-black bg-yellow-300 text-2xl`:
            `p-2 rounded-t-lg active:bg-yellow-300 active:text-black active:text-2xl text-yellow-300 text-2xl`}>Acting Credits</button>}
            {type ==='name' && credits?.crew.length>0 && <button onClick={()=>{setIsActing(false);setIsCrew(true)}} 
            className={isCrew ? `p-2 rounded-t-lg active:bg-yellow-300 active:text-black active:text-2xl text-black bg-yellow-300 text-2xl`:
            `p-2 rounded-t-lg active:bg-yellow-300 active:text-black active:text-2xl text-yellow-300 text-2xl`}>
            Crew Credits</button>}
            </div>
            {isActing && type === 'name' && credits?.cast.map((item,index)=>(<div key={index} className='flex flex-row items-center py-1
             pl-1 flex-wrap'><Link
                href={`/title/${item.media_type}/${item.id}`}
                passHref
                className='hover:font-bold '>
                {item?.title? item.title:item.name}</Link> {item?.character && `\xa0as ${item.character}`}</div>))}
            {isCrew && type === 'name' && credits?.crew.map((item,index)=>(<div key={index} className='flex flex-row items-center py-1 
            pl-1 flex-wrap'><Link
                href={`/title/${item.media_type}/${item.id}`}
                passHref
                className='hover:font-bold'>
                {item?.title? item.title:item.name}</Link> {item?.job && `\xa0- ${item.job}`}</div>))}
        </div>
    );
}

export default Credits

