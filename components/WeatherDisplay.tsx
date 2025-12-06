// components/WeatherDisplay.tsx
"use client";

import { Weather } from "../types";
import { getIcon } from "../utils/weatherIcons";

interface Props {
    weather: Weather;
    cityName: string;
}

export default function WeatherDisplay({ weather, cityName }: Props) {
    const hourlyItems = weather.hourly.time.slice(0, 24); 

    // Reusable style for a modern Glassmorphism card
    const cardStyle = "bg-white/10 border border-white/20 rounded-3xl shadow-2xl transition duration-300 hover:bg-white/15 backdrop-blur-md";

    return (
        // Kontainer utama (mx-auto max-w-6xl) sudah aman, sekarang fokus pada grid di dalamnya.
        <div className="mx-auto max-w-6xl space-y-8">
            
            {/* Bagian Atas: Grid 3 Kolom. min-w-0 pada grid container untuk memastikan elemen tidak memaksakan lebar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-0">

                {/* Kolom 1: Cuaca Saat Ini (Current Weather) */}
                <div 
                    className={`${cardStyle} md:col-span-1 flex flex-col items-center justify-center p-8 min-h-[400px]`}
                >
                    <p className="text-xl font-light mb-2 opacity-80">Cuaca Saat Ini di</p>
                    <div className="text-4xl font-semibold mb-6">{cityName}</div>
                    
                    <div className="text-9xl">{getIcon(weather.current_weather.weathercode)}</div>
                    <div className="text-8xl font-thin mt-4">{weather.current_weather.temperature}°C</div>
                    
                    <div className="mt-4 text-sm opacity-70">
                        {/* Detail cuaca telah disederhanakan */}
                        Data cuaca utama
                    </div>
                </div>

                {/* Kolom 2 & 3: Cuaca Per Jam (Hourly Forecast) */}
                <div className={`${cardStyle} md:col-span-2 flex flex-col p-8`}>
                    <h3 className="text-2xl font-light mb-4 border-l-4 border-white pl-3">Cuaca Per Jam (24 Jam)</h3>
                    
                    {/* MOBILE: Scroll Horizontal (Disembunyikan di desktop) */}
                    {/* min-w-[90px] disetel agar lebih teratur dan gap-3 dikurangi. */}
                    <div className="flex overflow-x-auto gap-3 pb-4 snap-x md:hidden hide-scrollbar">
                        {hourlyItems.map((t, i) => (
                            <div
                                key={i}
                                className="min-w-[90px] bg-white/10 px-3 py-2 rounded-xl text-center snap-start"
                            >
                                <div className="text-sm opacity-80">{new Date(t).getHours()}:00</div>
                                <div className="text-4xl my-1">{getIcon(weather.hourly.weathercode[i])}</div>
                                <div className="font-bold text-xl">{weather.hourly.temperature_2m[i]}°</div>
                            </div>
                        ))}
                    </div>

                    {/* DESKTOP: Wrapping Grid (Mencegah Overflow-X) */}
                    <div className="hidden md:grid grid-cols-6 gap-3 grow overflow-y-auto"> 
                        {hourlyItems.map((t, i) => (
                            <div
                                key={i}
                                className="bg-white/5 hover:bg-white/10 px-2 py-3 rounded-xl text-center transition-all duration-200"
                            >
                                <div className="text-sm opacity-80">{new Date(t).getHours()}:00</div>
                                <div className="text-3xl my-1">{getIcon(weather.hourly.weathercode[i])}</div>
                                <div className="font-bold text-lg">{weather.hourly.temperature_2m[i]}°</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bagian Bawah: Prakiraan Harian (Full Width) */}
            <div className={`${cardStyle} p-8`}>
                <h3 className="text-2xl font-light mb-4 border-l-4 border-white pl-3">Prakiraan 7 Hari</h3>
                <div className="grid grid-cols-1 gap-3">
                    {weather.daily.time.map((d, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between bg-white/0 hover:bg-white/10 p-4 rounded-xl transition-all duration-300"
                        >
                            {/* Hari */}
                            <div className="text-lg font-medium w-1/3">
                                {new Date(d).toLocaleDateString("id-ID", { weekday: "long" })}
                            </div>
                            
                            {/* Ikon */}
                            <div className="text-4xl w-1/3 text-center">{getIcon(weather.daily.weathercode[i])}</div>
                            
                            {/* Suhu Min/Max */}
                            <div className="font-bold text-xl w-1/3 text-right">
                                <span className="text-gray-300 font-normal">{weather.daily.temperature_2m_min[i]}°</span> / <span className="text-white">{weather.daily.temperature_2m_max[i]}°</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}