import React from 'react'

const ResultCard = React.memo(({ results }) => {
  return (
    <div className="grid grid-cols-1 col-start-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 cursor-pointer mt-6">
      {results.map(({ id, type, thumbnail, src, title }) => (
        <div key={id} className="bg-gray-800 h-max rounded-lg overflow-hidden shadow-lg">
          {type === 'photo' && (
            <img src={thumbnail} alt={title || 'Photo'} className="w-full h-auto" loading="lazy" />
          )}
          {(type === 'video' || type === 'gif') && (
            <video autoPlay muted loop className="w-full h-auto">
              <source src={type === 'video' ? src : thumbnail} type="video/mp4" />
            </video>
          )}
          <div className="p-2">
            <h3 className="text-sm font-medium text-white capitalize truncate">{title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
});

export default ResultCard