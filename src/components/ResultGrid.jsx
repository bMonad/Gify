import { useDispatch, useSelector } from "react-redux"
import { fetchGif, fetchPhotos, fetchVideos } from "../api/mediaApi"
import { setError, setLoading, setResults } from "../redux/features/searchSlice"
import { useCallback, useEffect } from "react";
import ResultCard from "./ResultCard";
import SessionStorage from "../SessionStorage";

const tabKeyMap = {
  photos: 'photo',
  videos: 'video',
  gifs: 'gif'
};
const fetchMap = {
  photos: fetchPhotos,
  videos: fetchVideos,
  gifs: fetchGif
};

const ResultGrid = () => {
  const { query, activeTab, results, loading, error } = useSelector((store) => store.search);
  const dispatch = useDispatch();

  const getData = useCallback(async () => {
    if (!query) return;
    try {
      dispatch(setLoading());
      const storageKey = tabKeyMap[activeTab];
      const fetchFn = fetchMap[activeTab];
      const cached = SessionStorage.getItem(storageKey);
      let data;
      if (cached?.query === query) {
        data = cached.data.results;
      } else {
        const response = await fetchFn(query);
        data = response.results;
      }
      dispatch(setResults(data));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }, [query, activeTab, dispatch]);

  useEffect(function () {
    getData();
  }, [getData]);


  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error}</div>
  }
  return (
    <div>
      {results.length === 0 ? (
        <div className="text-center mt-10 text-gray-400">No results found. Try searching for something else.</div>
      ) : (
        <ResultCard results={results} />
      )}
    </div>
  )
}

export default ResultGrid