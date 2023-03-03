import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const CircleRating = ({ rating }) => {
  return (
    <div className="absolute bottom-0 left-0 w-7">
      <CircularProgressbar
        value={rating}
        maxValue={10}
        styles={buildStyles({
          pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
        })}
      />
    </div>
  );
};

export default CircleRating;
