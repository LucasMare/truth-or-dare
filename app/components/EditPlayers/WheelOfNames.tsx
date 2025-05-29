"use client";

import { useState, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Chart, Plugin } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { usePlayers } from "../EditPlayers/PlayerListProvider"; // adjust path

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SpinCircle() {
    const { players, currentTurnIndex } = usePlayers();

    const [randomRotation, setRandomRotation] = useState<number>(0);
    const chartRef = useRef<ChartJS<"doughnut", number[], unknown> | null>(null);

    // Filter out the current turn player
    const filteredPlayers = players.filter((_, idx) => idx !== currentTurnIndex);

    if (filteredPlayers.length === 0) {
        return <div>No players to display (only current player exists).</div>;
    }

    // Default colors
    const defaultColors = [
        "#8f7f8f",
        "#f97066",
        "#2e90fa",
        "#fdb022",
        "#ee46bc",
        "#854CFF",
        "#22c55e",
        "#f97316",
        "#0ea5e9",
        "#a855f7",
    ];

    // Data for equal slices
    const data = {
        datasets: [
            {
                data: filteredPlayers.map(() => 1),
                backgroundColor: filteredPlayers.map(
                    (_player, idx) => defaultColors[idx % defaultColors.length]
                ),
                borderColor: filteredPlayers.map(
                    (_player, idx) => defaultColors[idx % defaultColors.length]
                ),
                cutout: 0,
                rotation: randomRotation,
            },
        ],
        labels: filteredPlayers,
        hoverOffset: 3,
    };

    const rotationRadians = (randomRotation * Math.PI) / 180;

    // Custom plugin to draw labels on slices
    const labelPlugin: Plugin<"doughnut"> = {
        id: "labelPlugin",
        afterDraw: (chart) => {
            const { ctx, chartArea: { width, height }, data } = chart;
            ctx.save();
            const centerX = width / 2;
            const centerY = height / 2;

            const dataset = data.datasets[0];
            const total = dataset.data.reduce(
                (a, b) => (typeof b === "number" ? a + b : a),
                0
            );

            // Access current rotation from internal controller state (unsafe but works)
            const meta: any = chart.getDatasetMeta(0);
            const currentRotation: number =
                meta?.controller?.cachedMeta?.rotation ?? chart.options.rotation ?? 0;

            let startAngle = currentRotation; // rotation is in radians

            for (let i = 0; i < dataset.data.length; i++) {
                const value = typeof dataset.data[i] === "number" ? dataset.data[i] : 0;
                const sliceAngle = (value / total) * 2 * Math.PI;

                const midAngle = startAngle + sliceAngle / 2;

                // Calculate label position
                const radius = (Math.min(width, height) / 2) * 0.75;
                const x = centerX + radius * Math.cos(midAngle);
                const y = centerY + radius * Math.sin(midAngle);

                const label = data.labels?.[i] ?? "";

                ctx.fillStyle = "white";
                ctx.font = "bold 14px sans-serif";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.shadowColor = "black";
                ctx.shadowBlur = 4;

                // Rotate text so it follows the slice arc
                ctx.translate(x, y);
                ctx.rotate(midAngle + Math.PI / 2);
                ctx.fillText(label.toString(), 0, 0);
                ctx.rotate(-(midAngle + Math.PI / 2));
                ctx.translate(-x, -y);

                startAngle += sliceAngle;
            }
            ctx.restore();
        },
    };



    function Rotation() {
        const chart = chartRef.current;
        if (chart) {
            const randomRotation = Math.random() * 3333;
            setRandomRotation(randomRotation);
            chart.update();
        }
    }

    return (
        <div className="fixed bottom-0 right-0 p-4 z-50">
            <div
                onClick={Rotation} // <-- Make entire wheel clickable here
                className="relative w-[340px] h-[340px] md:w-[410px] md:h-[410px] flex items-center justify-center cursor-pointer"
            >
                {/* Remove the previous onClick on inner div */}

                <div className="relative w-[300px] h-[300px] md:w-[368px] md:h-[368px] p-4">
                    <Doughnut
                        data={data}
                        options={{
                            plugins: { legend: { display: false }, tooltip: { enabled: false } },
                            rotation: rotationRadians, // <-- dynamic rotation in radians here
                            animation: { duration: 4000, easing: 'easeOutQuart' }, // optional smoothing
                            events: [], // disables hover
                        }}
                        ref={chartRef}
                        plugins={[labelPlugin]}
                    />
                    <div
                        id="arrow-icon"
                        className="absolute top-1.5 md:top-[7px] left-1/2 transform -translate-x-1/2 text-white rotate-180 pointer-events-none"
                    >
                        <svg
                            className="h-7 w-7 text-white z-20"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            fill="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polygon points="12 2 22 22 2 22"></polygon>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );

}
