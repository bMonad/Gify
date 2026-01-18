import axios from 'axios'
import SessionStorage from '../SessionStorage'

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY
const TENOR_KEY = import.meta.env.VITE_TENOR_KEY


export async function fetchPhotos(query, page = 1, per_page = 20) {
  const res = await axios.get('https://api.unsplash.com/search/photos', {
    params: { query, page, per_page },
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` }
  })
  const data = {
    results: res.data.results.map(photo => ({
      id: photo.id,
      type: 'photo',
      thumbnail: photo.urls.small,
      src: photo.urls.full,
      title: photo.alt_description,
      url: photo.links.html
    }))
  }

  SessionStorage.setItem('photo', { query, data, timestamp: Date.now() });
  return data;
}


export async function fetchVideos(query, per_page = 20) {
  const res = await axios.get('https://api.pexels.com/videos/search', {
    params: { query, per_page },
    headers: { Authorization: PEXELS_KEY }
  })
  const data = {
    results: res.data.videos.map(video => ({
      id: video.id,
      type: 'video',
      thumbnail: video.image,
      src: video.video_files[0].link,
      title: video.user.name || 'Video',
      url: video.url
    }))
  }

  SessionStorage.setItem('video', { query, data, timestamp: Date.now() });
  return data
}

export async function fetchGif(query, limit = 20) {
  const res = await axios.get('https://tenor.googleapis.com/v2/search', {
    params: { q: query, key: TENOR_KEY, limit },
  })
  const data = {
    results: res.data.results.map(gif => ({
      id: gif.id,
      type: 'gif',
      thumbnail: gif.media_formats.tinymp4.url,
      src: gif.media_formats.gif.url,
      title: gif.content_description,
      url: gif.itemurl
    }))
  }

  SessionStorage.setItem('gif', { query, data, timestamp: Date.now() });
  return data
} 