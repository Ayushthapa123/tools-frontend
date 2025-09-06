'use client';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

export default function ViewYoutubeVideo({ videoUrl }: { videoUrl: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const createEmbedableVideoUrl = (videoUrl: string): string => {
    let videoId = '';
  
    // Check if it's a full YouTube URL
    const fullUrlMatch = videoUrl.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
  
    if (fullUrlMatch && fullUrlMatch[1]) {
      videoId = fullUrlMatch[1];
    } else if (videoUrl.length === 11) {
      // If user passes only the video ID
      videoId = videoUrl;
    } else {
      throw new Error('Invalid YouTube URL or video ID');
    }
  
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };
  const embedableVideoUrl = createEmbedableVideoUrl(videoUrl);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 group/play ring-red-200 hover:ring-red-300 rounded-full bg-gradient-to-r p-2.5 shadow-lg ring-2 transition-all duration-300 hover:scale-110 hover:shadow-xl"
        title="Watch Demo Video"
      >
        <svg
          className="h-5 w-5 drop-shadow-sm transition-transform duration-300 group-hover/play:scale-110"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>

      {/* Portal for global modal */}
      {isOpen &&
        createPortal(
          <dialog className="modal modal-open">
            <div className="modal-box max-w-5xl w-full p-0">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={embedableVideoUrl}
                  title="Demo Video"
                  className="absolute inset-0 h-full w-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </button>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button onClick={() => setIsOpen(false)}>close</button>
            </form>
          </dialog>,
          document.body
        )}
    </>
  );
}
