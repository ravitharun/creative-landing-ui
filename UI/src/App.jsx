import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Keyword data
const leftKeywords = [
  "SILENCE","MEDITATION","INTUITION","AUTHENTICITY",
  "PRESENCE","LISTENING","CURIOSITY","PATIENCE",
  "SURRENDER","SIMPLICITY"
];

const rightKeywords = [
  "REDUCTION","ESSENCE","SPACE","RESONANCE","TRUTH",
  "FEELING","CLARITY","EMPTINESS","AWARENESS","MINIMALISM"
];

const mainText = ["THE CREATIVE","PROCESS","BEYOND","THINKING"];

// SoundManager class
class SoundManager {
  constructor() {
    this.sounds = {};
    this.isEnabled = false;
    this.loadSound("hover", "/hover.mp3"); // Put hover.mp3 in public folder
  }

  loadSound(name, url) {
    const audio = new Audio(url);
    audio.preload = "auto";
    audio.volume = 0.15;
    this.sounds[name] = audio;
  }

  enableAudio() {
    if (!this.isEnabled) {
      this.isEnabled = true;
      console.log("Audio enabled");
    }
  }

  play(name) {
    if (!this.isEnabled) return;
    const sound = this.sounds[name];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch((e) => console.log("Audio play failed:", e));
    }
  }
}

// Initialize SoundManager
const soundManager = new SoundManager();

export default function App() {
  const [hovered, setHovered] = useState(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    // Enable audio on first click (required for most browsers)
    const unlockAudio = () => soundManager.enableAudio();
    window.addEventListener("click", unlockAudio, { once: true });

    // Initialize Lenis smooth scroll
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: t => 1 - Math.pow(1 - t, 3),
      smooth: true
    });

    const scrollFn = (time) => {
      lenisRef.current.raf(time * 1000);
      requestAnimationFrame(scrollFn);
    };
    requestAnimationFrame(scrollFn);

    return () => {
      window.removeEventListener("click", unlockAudio);
      if (lenisRef.current) lenisRef.current.destroy();
    };
  }, []);

  const handleHover = (index) => {
    setHovered(index);
    soundManager.play("hover");
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white font-sans">
      {/* Background Image */}
      <img
        src="/bg-1.jpeg"
        alt="background"
        className="absolute w-full h-full object-cover"
      />

      {/* Left Keywords */}
      <ul className="absolute left-5 top-1/2 -translate-y-1/2 space-y-2 text-sm text-gray-400">
        {leftKeywords.map((word, i) => (
          <li
            key={i}
            className={`cursor-pointer transition-all ${hovered === i ? "text-white font-bold scale-110" : ""}`}
            onMouseEnter={() => handleHover(i)}
          >
            {word}
          </li>
        ))}
      </ul>

      {/* Right Keywords */}
      <ul className="absolute right-5 top-1/2 -translate-y-1/2 space-y-2 text-sm text-gray-400">
        {rightKeywords.map((word, i) => (
          <li
            key={i}
            className={`cursor-pointer transition-all ${hovered === i ? "text-white font-bold scale-110" : ""}`}
            onMouseEnter={() => handleHover(i)}
          >
            {word}
          </li>
        ))}
      </ul>

      {/* Main Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center space-y-4 px-4">
        {mainText.map((line, i) => (
          <h1 key={i} className="text-6xl md:text-8xl font-bold leading-tight">{line}</h1>
        ))}
      </div>
    </div>
  );
}
