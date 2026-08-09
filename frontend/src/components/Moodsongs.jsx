import React, { useState } from "react";
import "./Moodsongs.css";
const Moodsongs = ({ songs }) => {
  const [isplaying, setisplaying] = useState(null);
  const handlePlayPause = (index) => {
    if (isplaying === index) {
      setisplaying(null);
    } else {
      setisplaying(index);
    }
  };
  return (
    <div className="mood-songs">
      <h2>Recommended Songs</h2>

      {songs.map((songs, index) => (
        <div className="song" key={index}>
          <div className="title">
            <h3>{songs.title}</h3>
            <p>{songs.artist}</p>
          </div>
          <div className="play-pause-button">
            {isplaying === index && (
              <audio src={songs.audio} autoPlay ></audio>
            )}

            <button onClick={() => handlePlayPause(index)}>
              {isplaying === index ? (
                <i className="ri-pause-line"></i>
              ) : (
                <i className="ri-play-circle-fill"></i>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Moodsongs;
