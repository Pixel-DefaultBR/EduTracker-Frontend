export default function SkeletonCard({ fields = 3 }) {
  return (
    <div className="card">
      {/* título */}
      <div className="sk sk-title" />

      {/* campos */}
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="field" style={{ marginBottom: 20 }}>
          <div className="sk sk-label" />
          <div className="sk sk-input" />
        </div>
      ))}

      {/* botão */}
      <div className="sk sk-btn" />
    </div>
  );
}
