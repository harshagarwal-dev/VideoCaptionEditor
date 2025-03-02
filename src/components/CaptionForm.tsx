import React, { useState, ChangeEvent, FormEvent } from "react";
import { Caption } from "../App";

interface CaptionFormProps {
  onSubmit: (caption: Caption) => void;
}

const CaptionForm: React.FC<CaptionFormProps> = ({ onSubmit }) => {
  const [captionText, setCaptionText] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const start = parseFloat(startTime);
    const end = parseFloat(endTime);
    if (
      isNaN(start) ||
      isNaN(end) ||
      captionText.trim() === "" ||
      start >= end
    ) {
      alert(
        "Please provide valid times (start less than end) and non-empty caption text."
      );
      return;
    }

    onSubmit({ start, end, text: captionText });
    setCaptionText("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <form onSubmit={handleSubmit} className="caption-form">
      <div className="form-group">
        <label htmlFor="captionText">Caption Text:</label>
        <input
          id="captionText"
          type="text"
          value={captionText}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCaptionText(e.target.value)
          }
          className="input-field"
          placeholder="Enter caption text"
        />
      </div>
      <div className="timestamp-group" style={{ display: "flex", gap: "20px" }}>
        <div className="form-group">
          <label htmlFor="startTime">Start Time (sec):</label>
          <input
            id="startTime"
            type="number"
            value={startTime}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStartTime(e.target.value)
            }
            className="input-field"
            placeholder="e.g., 10"
          />
        </div>
        <div className="form-group">
          <label htmlFor="endTime">End Time (sec):</label>
          <input
            id="endTime"
            type="number"
            value={endTime}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEndTime(e.target.value)
            }
            className="input-field"
            placeholder="e.g., 20"
          />
        </div>
      </div>
      <button type="submit" className="btn">
        Add Caption
      </button>
    </form>
  );
};

export default CaptionForm;
