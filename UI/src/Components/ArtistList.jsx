export default function ArtistList({ artists, current, setCurrent, handleHover }) {
  return (
    <div className="space-y-4 text-white text-2xl font-bold">
      {artists.map((name, i) => (
        <div
          key={i}
          onClick={() => setCurrent(i)}
          onMouseEnter={handleHover}
          className={`cursor-pointer transition-all ${
            current === i ? "text-pink-400 scale-110" : "opacity-60"
          }`}
        >
          {name}
        </div>
      ))}
    </div>
  );
}
