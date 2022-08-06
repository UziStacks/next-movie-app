import { createContext, useState, useEffect, useContext } from 'react';
import { viewUserDocs } from '../firebase';
import { UserContext } from './user.context';
import axios from 'axios';

export const SavedContext = createContext({
  savedMovies: [],
  savedSeries: [],
  movieGenres: [],
  seriesGenres: [],
});

export const SavedProvider = ({ children }) => {
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedSeries, setSavedSeries] = useState([]);
  const [movieGenres, setMoviesGenres] = useState([]);
  const [seriesGenres, setSeriesGenres] = useState([]);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    viewUserDocs(currentUser?.uid, doc => {
      setSavedMovies(prev => (prev = doc.data()?.savedMovies));
      setSavedSeries(prev => (prev = doc.data()?.savedSeries));
    });
  }, [currentUser?.uid]);

  useEffect(() => {
    const getSeriesGenres = () => {
      axios.get('http://localhost:3000/api/movie-genres').then(res => {
        setMoviesGenres(prev => (prev = res.data));
      });
    };

    getSeriesGenres();
  }, []);

  useEffect(() => {
    const getSeriesGenres = () => {
      axios.get('http://localhost:3000/api/series-genres').then(res => {
        setSeriesGenres(prev => (prev = res.data));
      });
    };

    getSeriesGenres();
  }, []);

  useEffect(() => {}, []);

  const value = { savedMovies, savedSeries, movieGenres, seriesGenres };
  return (
    <SavedContext.Provider value={value}>{children}</SavedContext.Provider>
  );
};
