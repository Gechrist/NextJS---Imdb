import { trackPromise } from 'react-promise-tracker';
const API = process.env.NEXT_PUBLIC_TMDB_API_BASE;
const IMDB_API = process.env.NEXT_PUBLIC_IMDB_API_BASE;
const IMDB_API_ΚΕΥ = process.env.NEXT_PUBLIC_IMDB_API_KEY;
var API_CALL = '';

const getData = async (category, query, options) => {
  const controller = new AbortController();
  const timeout = 8000;
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    switch (true) {
      case category === 'find':
        API_CALL = `${API}/${category}/${query}${options}&external_source=imdb_id`;
        break;
      case category === 'movie' || category === 'tv':
        API_CALL = `${API}/${category}/${query}${options}&append_to_response=videos,images,release_dates,credits`;
        break;
      case category === 'person':
        API_CALL = `${API}/${category}/${query}${options}&append_to_response=images,combined_credits`;
        break;
      case category === 'search/multi':
        API_CALL = `${API}/${category}${options}&page=1&include_adult=false&query=${query}`;
        break;
      case category === 'movie/popular' ||
        category === 'tv/popular' ||
        category === 'person/popular':
        API_CALL = `${API}/${category}${options}&page=1`;
        break;
      case category === 'Name':
        API_CALL = `${IMDB_API}/${category}/${IMDB_API_ΚΕΥ}/${query}`;
        break;
      case category === 'boxOffice':
        API_CALL = `${IMDB_API}/${category}/${IMDB_API_ΚΕΥ}`;
        break;
      default:
        return;
    }
    const response = await trackPromise(fetch(API_CALL), {
      timeout,
      signal: controller.signal,
    });
    clearTimeout(id);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export default getData;
