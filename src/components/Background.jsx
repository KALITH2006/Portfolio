import { useMemo } from "react";

export default function Background() {
  const particles = useMemo(
    () =>
      Array.from({ length: 55 }, () => {
        const s = Math.random() * 3 + 1;
        return {
          width: s,
          height: s,
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 100}vh`,
          animation: `drift ${Math.random() * 18 + 10}s ease-in-out ${Math.random() * 6}s infinite alternate`,
        };
      }),
    []
  );
  return (
    <>
      <div className="fixed inset-0 cyber-grid pointer-events-none z-0" />
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{ background: "radial-gradient(circle at 80% 20%,#ff3131 0%,transparent 40%)" }}
      />
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((p, i) => (
          <div key={i} className="particle" style={p} />
        ))}
      </div>
    </>
  );
}
