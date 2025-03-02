import React from "react";

interface VideoPlayerProps {
  videoUrl: string;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onTimeUpdate: () => void;
  currentCaption: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  videoRef,
  onTimeUpdate,
  currentCaption,
}) => {
  return (
    <div className="video-modal">
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        onTimeUpdate={onTimeUpdate}
        className="video-player"
        autoPlay
      />
      {currentCaption && (
        <div className="caption-overlay">{currentCaption}</div>
      )}
    </div>
  );
};

export default VideoPlayer;
