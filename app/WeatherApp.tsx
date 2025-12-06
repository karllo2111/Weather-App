// app/WeatherApp.tsx
"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import WeatherDisplay from "@/components/WeatherDisplay";
import { fetchWeather } from "@/utils/api";
import { Weather, City } from "@/types";

export default function WeatherApp({ initialWeather }: { initialWeather: Weather }) {
    const [selectedCity, setSelectedCity] = useState<City>({
        name: "Jakarta",
        latitude: -6.2,
        longitude: 106.8,
    });

    const [weather, setWeather] = useState<Weather>(initialWeather);

    useEffect(() => {
        if (selectedCity.latitude !== -6.2 || selectedCity.longitude !== 106.8) {
            fetchWeather(selectedCity.latitude, selectedCity.longitude).then(setWeather);
        }
    }, [selectedCity]);

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-linear-to-br from-blue-700 to-indigo-900 text-white p-4 md:p-8">
            
            {/* Header / Search Bar */}
            <header className="max-w-6xl mx-auto mb-10 px-2"> 
                <h1 className="text-4xl font-extralight text-center mb-6 hidden md:block opacity-80">☀️ Dashboard Cuaca Global</h1> 
                <SearchBar onSelectCity={setSelectedCity} />
            </header>

            {/* WeatherDisplay mengambil alih tampilan utama */}
            <WeatherDisplay weather={weather} cityName={selectedCity.name} />

        </div>
    );
}