export default function StatusTicker() {
  const items = [
    { dot: "dot-green", text: "available for opportunities" },
    { dot: "dot-blue", text: "building: traverse — civic AI map" },
    { dot: "dot-yellow", text: "learning: system design & architecture" },
    { dot: "dot-green", text: "lavitur — in development" },
    { dot: "dot-blue", text: "based in: kingston, jamaica" },
  ];

  return (
    <div className="status-bar">
      <div className="status-ticker">
        {[...items, ...items].map((item, i) => (
          <span key={i}>
            <span className={`dot ${item.dot}`}></span>
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
