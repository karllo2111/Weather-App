// utils/api.ts
import { City, Weather } from "@/types";

export const searchCity = async (query: string): Promise<City[]> => {
  if (!query.trim()) return [];
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      query
    )}&count=5&language=id&format=json`
  );
  const data = await res.json();
  return data.results || []; // ← open-meteo pakai "results", bukan "result"
};

export const fetchWeather = async (lat: number, lon: number): Promise<Weather> => {
  const url = `https://api.open-meteo.com/v1/forecast?` +
    `latitude=${lat}` +
    `&longitude=${lon}` +
    `&timezone=Asia/Jakarta` +
    `&current_weather=true` +
    `&hourly=temperature_2m,weathercode` +
    `&daily=weathercode,temperature_2m_max,temperature_2m_min`; // HAPUS ,time DI SINI!!

  const res = await fetch(url);

  if (!res.ok) {
    // Tambahkan log biar tahu kenapa gagal (sangat membantu debug)
    const text = await res.text();
    console.error("Weather API error:", res.status, text);
    throw new Error(`Failed to fetch weather: ${res.status}`);
  }

  return res.json();
};