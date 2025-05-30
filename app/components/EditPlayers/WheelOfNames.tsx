"use client";

import { useState, useRef, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Plugin, ArcElement as ArcElementType } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { usePlayers } from "../EditPlayers/PlayerListProvider"; // adjust path

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SpinCircle() {
    const { players, currentTurnIndex } = usePlayers();

    const [randomRotation, setRandomRotation] = useState<number>(0);
    const chartRef = useRef<ChartJS<"doughnut", number[], unknown> | null>(null);

    const isFirstRender = useRef(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            isFirstRender.current = false;
        }, 0); // Ensure it's still true during the first render
        return () => clearTimeout(timer);
    }, []);

    const filteredPlayers = players.filter((_, idx) => idx !== currentTurnIndex);

    if (players.length === 0 || currentTurnIndex < 0 || currentTurnIndex >= players.length) {
        return <div>Loading or invalid player state...</div>;
    }


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

    const data = {
        datasets: [
            {
                data: filteredPlayers.map(() => 1),
                backgroundColor: filteredPlayers.map(
                    (_player, idx) => defaultColors[idx % defaultColors.length]
                ),
                borderColor: "black", // <-- Add black border
                borderWidth: 2,        // <-- Adjust border thickness
                cutout: 0,
                rotation: randomRotation,
            },
        ],
        labels: filteredPlayers,
        hoverOffset: 3,
    };
    const rotationRadians = (randomRotation % 360) * (Math.PI / 180);

    // Custom plugin to draw labels on slices
    const labelPlugin = (rotation: number): Plugin<"doughnut"> => ({
        id: "labelPlugin",
        afterDraw(chart) {
            const { ctx } = chart;
            const meta = chart.getDatasetMeta(0);

            if (!meta || meta.data.length === 0) return;

            const arcs = meta.data;
            const labels = chart.data.labels ?? [];

            ctx.save();
            const centerX = chart.width / 2;
            const centerY = chart.height / 2;

            ctx.translate(centerX, centerY);
            ctx.rotate(rotation); // Apply the rotation of the chart

            arcs.forEach((arc, i) => {
                const model = arc as ArcElementType;

                // Midpoint angle of the arc
                const angle = (model.startAngle + model.endAngle) / 2;
                const radius = model.outerRadius * 0.75;

                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);

                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle); // Rotate label with the slice
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillStyle = "#fff";
                ctx.font = "bold 30px sans-serif";
                ctx.fillText(labels[i] as string, 0, 0);
                ctx.restore();
            });

            ctx.restore();
        },
    });



    function Rotation() {
        const chart = chartRef.current;
        if (chart) {
            const randomRotation = Math.random() * 3333;
            setRandomRotation(randomRotation);
            chart.update();
        }
    }

    return (
        <div className="fixed inset-0 p-4 z-50 flex items-center justify-center">
            <div
                onClick={Rotation}
                className="relative h-[90vh] w-[90vh] flex items-center justify-center cursor-pointer"
                style={{ clipPath: "circle(50% at 50% 50%)" }} // restrict clickable area to circle
            >
                <div className="relative w-full h-full p-4">
                    <Doughnut
                        data={data}
                        options={{
                            rotation: rotationRadians,
                            plugins: {
                                legend: { display: false },
                                tooltip: { enabled: false },
                            },
                            animation: isFirstRender.current
                                ? false // Disable animation on first render
                                : {
                                    duration: 4000,
                                    easing: "easeOutQuart",
                                },
                            events: [],
                        }}
                        plugins={[labelPlugin(rotationRadians)]}
                        ref={chartRef}
                    />

                    <div
                        id="arrow-icon"
                        className="absolute top-2 md:top-4 left-1/2 transform -translate-x-1/2 -translate-y-1/3  text-white rotate-180 pointer-events-none"
                    >
                        <svg
                            className="h-10 w-10 text-gray-200 z-20"
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
