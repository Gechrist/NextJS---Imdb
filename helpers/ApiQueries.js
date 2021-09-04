import { trackPromise } from 'react-promise-tracker';
const API = process.env.NEXT_PUBLIC_TMDB_API_BASE;
const IMDB_API = process.env.NEXT_PUBLIC_IMDB_API_BASE; 
const IMDB_API_ΚΕΥ = process.env.NEXT_PUBLIC_IMDB_API_KEY; 
var API_CALL = '';


const getData = async (category, query, options) => {
	try { 	switch (category) {
			case 'movie' : API_CALL= `${API}/${category}/${query}${options}`;break;
			case 'tv' : API_CALL= `${API}/${category}/${query}${options}`;break;
			case 'person' : API_CALL= `${API}/${category}/${query}${options}`;break;
			case 'find' : API_CALL= `${API}/${category}/${query}${options}`;break;
			case 'movie/popular' : API_CALL= `${API}/${category}${options}`;break;
			case 'tv/popular' : API_CALL= `${API}/${category}${options}`;break;
			case 'person/popular' : API_CALL= `${API}/${category}${options}`;break;
			case 'search/multi' : API_CALL= `${API}/${category}/${options}${query}`;break;
			case 'Name' : API_CALL= `${IMDB_API}/${category}/${IMDB_API_ΚΕΥ}/${query}`;break;
			case 'boxOffice' : API_CALL= `${IMDB_API}/${category}/${IMDB_API_ΚΕΥ}`;break;
			default : return}
			const response = await trackPromise(fetch(API_CALL));
			const data = await response.json();
			return data;
		}
	catch(error) {
		return({error:error})}
	}

export default getData