import React from "react";

export default function GameHUD({ score, highScore }) {
  return (
    <div className="flex justify-between items-center w-full max-w-[600px] px-2 mb-3 font-mono select-none">
      {/* Current Score */}
      <div className="flex items-center gap-2">
        <span className="text-xs uppercase tracking-wider text-slate-500">SCORE:</span>
        <span className="text-xl font-bold tracking-wide text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">{score}</span>
      </div>

      {/* High Score */}
      <div className="flex items-center gap-2">
        <span className="text-xs uppercase tracking-wider text-slate-500">HI-SCORE:</span>
        <span className="text-xl font-bold tracking-wide text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">{highScore}</span>
      </div>
    </div>
  );
}
