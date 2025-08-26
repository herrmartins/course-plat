"use client";

import { useState, useEffect } from 'react';

export function ClientDateComponent({ date, className = "" }) {
    const [formattedDate, setFormattedDate] = useState("—");

    useEffect(() => {
        if (!date) {
            setFormattedDate("—");
            return;
        }

        try {
            const dateObj = typeof date === 'string' || typeof date === 'number'
                ? new Date(date)
                : date;

            setFormattedDate(dateObj.toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "2-digit",
            }));
        } catch {
            setFormattedDate("—");
        }
    }, [date]);

    return (
        <span className={className}>
      {formattedDate}
    </span>
    );
}