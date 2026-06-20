import React from "react";

export default function GameHUD({ score, highScore }) {
    return (
        <div className="flex justify-between items-center w-full px-2 mix-blend-difference">
            {/* mix-blend-difference ensures text is readable over any background */}
            <div className="flex items-center gap-2">
                <span className="text-xs opacity-60">SCORE:</span>
                <span className="text-lg font-bold tracking-wide text-cyan-400">{score}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-xs opacity-60">HI-SCORE:</span>
                <span className="text-lg font-bold tracking-wide text-cyan-400">{highScore}</span>
            </div>
        </div>
    );
}