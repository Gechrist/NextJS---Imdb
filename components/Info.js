
const Info = ({info}) => {
    return (info?
        <article className=" border-2 border-yellow-300 h-72 overflow-y-auto absolute p-10 whitespace-normal 
        bg-black text-xl bottom-12 md:bottom-14 xl:bottom-18 text-xl 2xl:bottom-26">
            <p>{info}</p>
        </article>:<p className="absolute bottom-16 text-xl"> No Info Available</p>
    )
}

export default Info
