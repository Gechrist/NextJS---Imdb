import Image from 'next/image'
const Poster = ({path}) => {
    return (
        <div className='block justify-end relative w-80 h-poster'><Image src={`https://image.tmdb.org/t/p/w1280${path}`} 
        layout="fill" aria-label="poster" objectFit='contain' alt="No poster image"/>
        </div>
    )
}

export default Poster
