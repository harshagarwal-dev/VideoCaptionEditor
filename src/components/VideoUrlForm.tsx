import React, { useState, ChangeEvent, FormEvent } from "react";

interface VideoUrlFormProps {
  onLoadVideo: (url: string) => void;
}

const VideoUrlForm: React.FC<VideoUrlFormProps> = ({ onLoadVideo }) => {
  const [url, setUrl] = useState<string>(
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLoadVideo(url);
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="video-url-form">
      <input
        type="text"
        placeholder="Enter video URL"
        value={url}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
        className="input-field"
      />
      <button type="submit" className="btn">
        Load Video
      </button>
    </form>
  );
};

export default VideoUrlForm;
