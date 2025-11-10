export default function Sections({ current, total }) {
  return (
    <div className="w-2/3 h-2 bg-gray-700 rounded-full overflow-hidden">
      <div
        className="h-full bg-white transition-all"
        style={{ width: `${((current + 1) / total) * 100}%` }}
      ></div>
    </div>
  );
}
