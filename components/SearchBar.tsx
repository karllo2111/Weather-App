// components/SearchBar.tsx
"use client";

import { useState, useEffect } from "react";
import { City } from "@/types";
import { searchCity } from "@/utils/api";

interface Props {
    onSelectCity: (city: City) => void;
}

export default function SearchBar({ onSelectCity }: Props) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<City[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handler = setTimeout(async () => {
            if (!query.trim()) {
                setResults([]);
                return;
            }
            setLoading(true);
            const cities = await searchCity(query);
            setResults(cities);
            setLoading(false);
        }, 300);

        return () => clearTimeout(handler);
    }, [query]);

    const chooseCity = (city: City) => {
        setQuery("");
        setResults([]);
        onSelectCity(city);
    };

    return (
        <div className="relative mb-8">
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari kota..."
            
                className="w-full px-5 py-3 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white transition duration-300"
            />

            {(results.length > 0 || loading) && (
                <div className="absolute mt-2 w-full bg-white text-gray-800 rounded-xl shadow-2xl overflow-hidden z-20 max-h-60 overflow-y-auto">
                    {loading && <div className="px-4 py-3 text-center font-medium text-blue-600">Mencari...</div>}
                    {results.map(city => (
                        <div
                            key={`${city.latitude}-${city.longitude}`}
                            onClick={() => chooseCity(city)}
                            className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition duration-150"
                        >
                            <span className="font-semibold">{city.name}</span>, {city.country || ""}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}