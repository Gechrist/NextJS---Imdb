import Head from 'next/head'
import Image from 'next/image'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Logo from '../assets/logo/imdb-logo.svg'
import React,{useState,useEffect} from 'react'
import {useTransition, animated} from "@react-spring/web"
import getData from "../helpers/ApiQueries"
import LoadingIndicator from '../helpers/LoadingIndicator'

const API_OPTIONS = process.env.NEXT_PUBLIC_TMDB_API_OPTIONS_FIND

const Header = () => {
  const [isSearchInputOn, setIsSearchInputOn] = useState(false);
  const [isSearchResultsMenuOn, setIsSearchResultsMenuOn] = useState(false)
  const [isMobileMenu, setIsMobileMenu] = useState('hidden');
  const [searchTerms, setSearchTerms] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [notFoundMessage, setNotFoundMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const mobileMenu = () => {isMobileMenu === 'hidden'?setIsMobileMenu('xs:top-0 xs:right-0 xs:w-72 xs:h-mobile'):setIsMobileMenu('hidden')}
  const animationSearch = useTransition(isSearchInputOn, { enter:  {transform:`translateX(${0}%)`}, from: {transform:`translateX(${100}%)`}})
  const dynamicRoute = useRouter().asPath

  useEffect(() => {
    
    setNotFoundMessage(false);
    setSearchResults([]);

    const searchData = async () =>{
          let response = await getData("search/multi",searchTerms,API_OPTIONS);
          response.results?.length === 0?setNotFoundMessage(true):setSearchResults(searchResults => response.results);
          setIsSearchResultsMenuOn(true);
          response?.success===false || response?.errors && setErrorMessage(errorMessage => true);
        }
    const delaySearch = setTimeout(() => {
      searchTerms && searchData()
    }, [1000]);
    
    return () => clearTimeout(delaySearch);

  },[searchTerms, errorMessage]);

  // Detect with useRouter if dynamic route has changed and reset the state of search inputs
  useEffect(()=>{
        
    setIsSearchInputOn(false);
    setSearchTerms('');

  },[dynamicRoute])

  return (
            <div>
              <header>
                <aside className="group lg:fixed flex flex-row relative bg-black lg:hover:bg-yellow-300 lg:w-menu lg:h-full items-center 
                justify-center lg:items-start space-x-0 lg:space-x-6 pt-6 2xl:pt-10">
                  <Link href="/" passHref>
                    <div className="w-24 lg:w-1/3 h-14 block relative">
                      <Image aria-label="Imdb logo" layout="fill" objectFit='contain' className="h-8  hover:cursor-pointer" src={Logo} alt="Imdb Logo" 
                      title="Imdb Logo"/>
                    </div>
                  </Link>
                <nav className={`${isMobileMenu} absolute top-32 lg:hidden lg:group-hover:flex flex lg:divide-none
                flex-col bg-yellow-300 p-2 xs:z-50 xs:focus:outline-none text-xl place-content-start text-left focus:shadow-outline lg:bg-transparent
                space-y-4`}>
                  <button className="lg:hidden text-black mt-32 mb-6 text-center hover:bg-black hover:text-yellow-300 border-b-2 border-black"
                   onClick={()=> mobileMenu()}>CLOSE X</button>
                  <Link href='/#boxOffice'><a className="text-black xs:border-b xs:border-black xs:border-opacity-20 hover:font-bold">Box Office</a></Link>
                  <Link href='/#popMovies'><a className="text-black xs:border-b xs:border-black xs:border-opacity-20 hover:font-bold
                   whitespace-nowrap">Popular Movies</a></Link>
                  <Link href='/#popTVSeries'><a className="text-black xs:border-b xs:border-black xs:border-opacity-20 hover:font-bold 
                  whitespace-nowrap">Popular TV Series</a></Link>
                  <Link href='/#popActors'><a className="text-black xs:border-b xs:border-black xs:border-opacity-20 hover:font-bold 
                  whitespace-nowrap">Popular Actors</a></Link>
                  <Link href='/about' passHref><a className="text-black  xs:border-b xs:border-black xs:border-opacity-20 hover:font-bold">About</a></Link>
                </nav>
                  <button type="button" onClick={()=> mobileMenu()} className=" lg:hidden w-8 h-8 bg-black text-yellow-300 p-1">
                    <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" 
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 
                    011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                  </button>
                  <button type="button" onClick={() => {setIsMobileMenu('hidden');setIsSearchInputOn(previsSearchInputOn => !previsSearchInputOn);
                  setIsSearchResultsMenuOn(false);setSearchTerms('');setNotFoundMessage(false);setErrorMessage(false);}}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-current text-yellow-300 lg:group-hover:text-black mt-1 lg:mt-4 
                   pr-2 hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="yellow">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </aside>
              </header>
                <div className="flex flex-col place-items-center lg:ml-menu pt-4 z-45">
                  {animationSearch((styles, item) => item && <animated.div style={styles}><input autoFocus={true} onChange={(e) => 
                  {setSearchTerms(e.target.value)}} value={searchTerms} className="shadow appearance-none border  border-yellow-300 rounded 
                  py-2 px-3 text-gray-700 w-72 leading-tight focus:outline-none focus:shadow-outline z-45" type="text" placeholder="Search..."/>
                  </animated.div>)}
                  <div className="flex absolute top-40 lg:top-20 w-12 sm:w-16 md:w-20 lg:w-auto h-auto rounded justify-center z-40 
                  bg-transparent"><LoadingIndicator/></div>
                  <div className="mt-8 md:mt-2 text-center bg-grey-background">{notFoundMessage||errorMessage?notFoundMessage && 
                  <h4>No Results Found</h4>:errorMessage&&<h4>Something went wrong. Please try again later.</h4>}
                  </div>
                  {searchTerms && isSearchResultsMenuOn && searchResults?.length>0 && <div className='text-black absolute top-32 mt-1.5 lg:top-14 
                  lg:-mt-0.5 z-40 flex flex-col p-2 xs:focus:outline-none divide-y divide-yellow-300 focus:shadow-outline w-72 h-64 overflow-y-auto
                  rounded bg-white'>
                  {searchResults.map((item, index) => (item.media_type ==="movie"? <Link key={index}
                  href={`/title/${item.media_type}/${item.id}`} passHref><a className="py-2 hover:font-bold">{item.title} 
                  {item?.release_date && `\xa0(${item?.release_date?.substring(0, 4)})`}</a></Link>:
                  item.media_type ==="tv"? <Link key={index} href={`/title/${item.media_type}/${item.id}`} passHref> 
                  <a className="py-2 hover:font-bold">{item.name}{item?.first_air_date && `\xa0(${item?.first_air_date?.substring(0, 4)})`}
                  </a></Link>: item.media_type ==="person" && item?.gender !==0 ?
                  <Link key={index} href={`/name/${item.id}`} passHref><a className="py-2 hover:font-bold">{item.name}</a></Link>:null))}</div>}
                </div>
            </div>
    )
}

export default Header
