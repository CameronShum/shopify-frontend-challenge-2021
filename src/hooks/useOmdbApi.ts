import { useState, useEffect } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

interface useOmdbApiProps {
  searchTerm: string,
  type: 'Id' | 'Search',
}

interface useOmdbApiReturn {
  res: {Title: string, Year: string, imdbID: string, Poster: string}[],
  err: string,
}

/**
 * Searches Omdb's Api for a search term
 * @param searchTerm the term to search for
 * @param type the search type, either "Id" or "Search"
 */
const useOmdbApi = ({
  searchTerm, type,
}: useOmdbApiProps): useOmdbApiReturn => {
  const [res, setRes] = useState<any>([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    if (searchTerm !== '') {
      let params = {};

      if (type === 'Search') {
        params = {
          s: searchTerm,
          type: 'movie',
          apiKey: process.env.REACT_APP_OMBD_APIKEY,
        };
      } else {
        params = {
          i: searchTerm,
          type: 'movie',
          apiKey: process.env.REACT_APP_OMBD_APIKEY,
        };
      }
      (async function getApiResults() {
        const getRequest = await axios.get('https://www.omdbapi.com', {
          params,
        });

        if (getRequest.data.Response === 'True') {
          if (type === 'Search') {
            setRes(getRequest.data.Search);
          } else if (getRequest.data.Type === 'movie') {
            setRes([getRequest.data]);
          }
        } else {
          setRes([]);
          setErr(getRequest.data.Error);
        }
      }());
    } else {
      setRes([]);
    }
  }, [searchTerm, type]);

  return { res, err };
};

export default useOmdbApi;
