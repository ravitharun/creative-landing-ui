// App.jsx
import { useState, useRef } from "react";
import hoverSound from "./assets/hover.mp3";

const leftKeywords = [
  "SILENCE", "MEDITATION", "INTUITION", "AUTHENTICITY",
  "PRESENCE", "LISTENING", "CURIOSITY", "PATIENCE",
  "SURRENDER", "SIMPLICITY"
];

const rightKeywords = [
  "REDUCTION", "ESSENCE", "SPACE", "RESONANCE", "TRUTH",
  "FEELING", "CLARITY", "EMPTINESS", "AWARENESS", "MINIMALISM"
];

const mainText = ["THE CREATIVE", "PROCESS", "BEYOND", "THINKING"];

export default function App() {
  const [hovered, setHovered] = useState(null);
  const audioRef = useRef(new Audio(hoverSound));

  const handleHover = (index) => {
    setHovered(index);
    audioRef.current.volume = 0.4;
    audioRef.current.play().catch(() => {});
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white font-sans">
      {/* Background */}
      <img
        src="/bg-1.jpeg"
        alt="background"
        className="absolute w-full h-full object-cover"
      />

      {/* Left keywords */}
      <ul className="absolute left-5 top-1/2 -translate-y-1/2 space-y-2 text-sm text-gray-400">
        {leftKeywords.map((word, i) => (
          <li
            key={i}
            className={`cursor-pointer ${hovered === i ? "text-white font-bold" : ""}`}
            onMouseEnter={() => handleHover(i)}
          >
            {word}
          </li>
        ))}
      </ul>

      {/* Right keywords */}
      <ul className="absolute right-5 top-1/2 -translate-y-1/2 space-y-2 text-sm text-gray-400">
        {rightKeywords.map((word, i) => (
          <li
            key={i}
            className={`cursor-pointer ${hovered === i ? "text-white font-bold" : ""}`}
            onMouseEnter={() => handleHover(i)}
          >
            {word}
          </li>
        ))}
      </ul>

      {/* Main Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center space-y-4 px-4">
        {mainText.map((line, i) => (
          <h1 key={i} className="text-6xl md:text-8xl font-bold leading-tight">
            {line}
          </h1>
        ))}
      </div>
    </div>
  );
}
