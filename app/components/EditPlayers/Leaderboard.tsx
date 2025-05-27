"use client";

import React from "react";

type LeaderboardProps = {
  onClose: () => void;
  data: { rank: number; name: string; score: number }[];
};

export default function Leaderboard({ onClose, data }: LeaderboardProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose} // closes if background clicked
    >
      <div
        className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside the modal
      >
        <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Rank</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Score</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ rank, name, score }) => (
              <tr key={rank} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">{rank}</td>
                <td className="py-2 px-4">{name}</td>
                <td className="py-2 px-4">{score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
