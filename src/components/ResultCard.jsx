import React, { useState, useRef } from 'react'
import { HiOutlineHeart, HiMiniHeart } from "react-icons/hi2";
import { HiOutlineExternalLink } from "react-icons/hi";
const ResultCard = React.memo(({ results }) => {
  const [hoverId, setHoverId] = useState(null);
  const videoRefs = useRef({});

  const handleMouseEnter = (id) => {
    setHoverId(id);
    if (videoRefs.current[id]) {
      videoRefs.current[id].play();
    }
  };

  const handleMouseLeave = (id) => {
    setHoverId(null);
    if (videoRefs.current[id]) {
      videoRefs.current[id].pause();
      videoRefs.current[id].currentTime = 0;
    }
  };

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 mt-6 cursor-pointer">
      {results.map(({ id, type, thumbnail, src, title }) => (
        <div key={id}
          className="mb-4 break-inside-avoid h-max rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.01] relative"
          onMouseEnter={() => handleMouseEnter(id)}
          onMouseLeave={() => handleMouseLeave(id)}
        >
          {type === 'photo' && (
            <img src={thumbnail} alt={title || 'Photo'} className="w-full max-h-150 object-center object-cover" loading="lazy" />
          )}
          {(type === 'video' || type === 'gif') && (
            <video
              ref={el => (videoRefs.current[id] = el)}
              autoPlay={hoverId === id}
              preload='metadata'
              muted loop playsInlinep
              className="w-full max-h-150 object-center object-cover">
              <source src={type === 'video' ? src : thumbnail} type="video/mp4" />
            </video>
          )}
          {hoverId === id && (
            <div className="flex justify-between absolute bottom-0 w-full bg-opacity-0 px-4 py-2">
              <HiOutlineExternalLink className='hover:scale-110 text-blue-600 size-6.5' />
              <HiOutlineHeart className='hover:scale-110 text-pink-600 size-6.5' />
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

export default ResultCard