"use client";

import { useEffect, useState } from "react";

type Viewport = {
  width: number;
  height: number;
};

type ConfettiComponent = typeof import("react-confetti").default;

export function ConfettiOnLoad() {
  const [viewport, setViewport] = useState<Viewport | null>(null);
  const [Confetti, setConfetti] = useState<ConfettiComponent | null>(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    setViewport({ width: window.innerWidth, height: window.innerHeight });

    let cancelled = false;

    const load = () => {
      void import("react-confetti").then((module) => {
        if (!cancelled) {
          setConfetti(() => module.default);
        }
      });
    };

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(load, { timeout: 1500 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const id = window.setTimeout(load, 200);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, []);

  if (finished || !viewport || !Confetti) {
    return null;
  }

  return (
    <Confetti
      width={viewport.width}
      height={viewport.height}
      recycle={false}
      aria-hidden="true"
      style={{ position: "fixed", pointerEvents: "none" }}
      onConfettiComplete={() => {
        setFinished(true);
      }}
    />
  );
}
