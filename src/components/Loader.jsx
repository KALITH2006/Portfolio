import { useEffect, useState } from "react";

const SEGMENTS = 24;
const pad = (n) => String(n).padStart(2, "0");

// Boot screen styled like a VCR on-screen display: blue picture, PLAY indicator, tape counter, segmented bar.
export default function Loader({ onDone, leaving }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setN((v) => {
        if (v >= 100) {
          clearInterval(t);
          return 100;
        }
        // uneven steps, like a tape catching and releasing
        return Math.min(100, v + 2 + Math.floor(Math.random() * 5));
      });
    }, 55);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (n < 100) return;
    const t = setTimeout(onDone, 350); // hold on 100% for a beat
    return () => clearTimeout(t);
  }, [n, onDone]);

  const filled = Math.round((n / 100) * SEGMENTS);
  const secs = Math.round(n * 0.37);

  return (
    <div className={`vcr boot absolute inset-0 z-[80] overflow-hidden ${leaving ? "vcr-out" : ""}`}>
      <div className="vcr-noise absolute inset-0" />
      <div className="vcr-track absolute inset-x-0" />

      <div className="vcr-osd absolute inset-0 px-[6%] py-[5%] flex flex-col justify-between px">
        <div className="flex justify-between items-start">
          <span className="vcr-play">
            PLAY <span className="vcr-blink">▶</span>
          </span>
          <span className="text-right leading-tight">
            CH 03
            <br />
            <span className="opacity-80">VHS · SP</span>
          </span>
        </div>

        <div className="text-center">
          <p className="vcr-big">LOADING</p>
          <div className="vcr-bar mx-auto mt-5" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={n}>
            {Array.from({ length: SEGMENTS }, (_, k) => (
              <span key={k} className={k < filled ? "on" : ""} />
            ))}
          </div>
          <p className="mt-3 text-lg tracking-widest">{String(n).padStart(3, "0")}%</p>
        </div>

        <div className="flex justify-between items-end">
          <span>
            SP&nbsp;&nbsp;0:{pad(Math.floor(secs / 60))}:{pad(secs % 60)}
          </span>
          <span className="opacity-80">KALITH VIDEO ©&apos;26</span>
        </div>
      </div>
    </div>
  );
}
