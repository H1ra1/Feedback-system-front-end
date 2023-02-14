"use client";

import React from "react";
import colors from "@/styles/colors.module.scss";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  Bar,
  Tooltip,
} from "recharts";

function BetweenUsersAnalysis() {
    const SELECTED_QUESTIONS_CHART_DATA = [
        {
        question: "Math",
        points: Math.floor(Math.random() * 5) + 1,
        },
        {
        question: "Chinese",
        points: Math.floor(Math.random() * 5) + 1,
        },
        {
        question: "English",
        points: Math.floor(Math.random() * 5) + 1,
        },
        {
        question: "Geography",
        points: Math.floor(Math.random() * 5) + 1,
        },
        {
        question: "Physics",
        points: Math.floor(Math.random() * 5) + 1,
        },
        {
        question: "History",
        points: Math.floor(Math.random() * 5) + 1,
        },
    ];

    return (
        <div className={`col-xl col-xl-12 custom-purple-scrollbar`}>
            <div>
                <h3 className={`f-22 f-c-highlight`}>Nota média por usuário</h3>
            </div>

            <div>
                <ResponsiveContainer width="100%" height={450}>
                    <BarChart data={SELECTED_QUESTIONS_CHART_DATA}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="points" fill={colors.highlightColor}></Bar>
                    <Tooltip />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default BetweenUsersAnalysis;
