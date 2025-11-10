import { useState, useEffect } from "react";

class SoundManager {
  constructor() {
    this.audioUnlocked = false;
    this.sounds = {
      hover: new Audio("/hover.mp3"), // put hover.mp3 in public folder
    };
  }

  unlockAudio() {
    if (!this.audioUnlocked) {
      const silent = new Audio();
      silent.src = "";
      silent.play().catch(() => {});
      this.audioUnlocked = true;
      console.log("Audio unlocked!");
    }
  }

  play(name) {
    if (!this.audioUnlocked) return; // must be unlocked first
    const sound = this.sounds[name];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch((e) => console.log("Audio play failed:", e));
    }
  }
}

const soundManager = new SoundManager();

export default function App() {
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const handleClick = () => {
      soundManager.unlockAudio(); // unlock audio on first click
    };
    window.addEventListener("click", handleClick, { once: true });
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const handleHover = (index) => {
    setHovered(index);
    soundManager.play("hover"); // now this will work after first click
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex items-center justify-center">
      <ul className="space-y-2">
        {["ONE", "TWO", "THREE"].map((item, i) => (
          <li
            key={i}
            onMouseEnter={() => handleHover(i)}
            className={`cursor-pointer ${
              hovered === i ? "text-red-500 font-bold" : ""
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
      <p className="absolute bottom-5 text-sm text-gray-400">
        Click anywhere first to enable sound
      </p>
    </div>
  );
}
