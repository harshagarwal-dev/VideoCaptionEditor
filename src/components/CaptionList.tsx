import React from "react";
import { Caption } from "../App";

interface CaptionListProps {
  captions: Caption[];
  onDelete: (index: number) => void;
}

const CaptionList: React.FC<CaptionListProps> = ({ captions, onDelete }) => {
  return (
    <div className="caption-list">
      <h2>Captions</h2>
      <div className="caption-cards">
        {captions.map((caption, index) => (
          <div key={index} className="caption-card">
            <div className="caption-header">
              <div className="timestamp">
                <span className="time-label">Start:</span> {caption.start} sec |{" "}
                <span className="time-label">End:</span> {caption.end} sec
              </div>
              <button className="delete-btn" onClick={() => onDelete(index)}>
                Delete
              </button>
            </div>
            <div className="caption-text">{caption.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaptionList;
