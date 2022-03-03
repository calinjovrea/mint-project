import React, { useState, useEffect } from "react";
import "./Slider.css";

const dataSlider = [
  {
    id: "NFT1",
    title: "item-one",
  },
  {
    id: "NFT2",
    title: "item-two",
  },
  {
    id: "NFT3",
    title: "item-three",
  },
  {
    id: "NFT4",
    title: "item-four",
  },
  {
    id: "NFT5",
    title: "item-five",
  },
  {
    id: "NFT6",
    title: "item-six",
  },
  {
    id: "NFT7",
    title: "item-seven",
  },
  {
    id: "NFT8",
    title: "item-eight",
  },
  {
    id: "NFT9",
    title: "item-nine",
  },
  {
    id: "NFT10",
    title: "item-ten",
  },
];
export default function Slider() {
  const [slideIndex, setSlideIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex(Math.floor(Math.random() * 9));
    }, 3500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="container-slider">
      {dataSlider.map((obj, index) => {
        return (
          <div
            key={obj.id}
            className={slideIndex === index ? "slide" : "slide"}
          >
            <img src={process.env.PUBLIC_URL + `/imgs/${slideIndex}.png`} />
          </div>
        );
      })}
    </div>
  );
}
