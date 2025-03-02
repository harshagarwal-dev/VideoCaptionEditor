import React, { useState, useRef } from "react";
import "./App.css";
import Modal from "./components/modal";
import VideoPlayer from "./components/VideoPlayer";
import VideoUrlForm from "./components/VideoUrlForm";
import CaptionForm from "./components/CaptionForm";
import CaptionList from "./components/CaptionList";

export interface Caption {
  start: number;
  end: number;
  text: string;
}

const App: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [currentCaption, setCurrentCaption] = useState<string>("");

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleLoadVideo = (url: string) => {
    if (url.trim() === "") {
      alert("Please enter a valid video URL.");
      return;
    }
    setVideoUrl(url);
    setIsModalOpen(true);
  };

  const handleAddCaption = (newCaption: Caption) => {
    setCaptions((prev) => [...prev, newCaption]);
  };

  const handleDeleteCaption = (indexToDelete: number) => {
    setCaptions((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const currentTime = videoRef.current.currentTime;
    const activeCaption = captions.find(
      (caption) => currentTime >= caption.start && currentTime <= caption.end
    );
    setCurrentCaption(activeCaption ? activeCaption.text : "");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <h1>Video Caption Editor</h1>
      <div className="form-section">
        <VideoUrlForm onLoadVideo={handleLoadVideo} />
      </div>
      <div className="form-section">
        <h2>Add Caption</h2>
        <CaptionForm onSubmit={handleAddCaption} />
      </div>
      {captions.length > 0 && (
        <CaptionList captions={captions} onDelete={handleDeleteCaption} />
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <VideoPlayer
          videoUrl={videoUrl}
          videoRef={videoRef}
          onTimeUpdate={handleTimeUpdate}
          currentCaption={currentCaption}
        />
      </Modal>
    </div>
  );
};

export default App;
