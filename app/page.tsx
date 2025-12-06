// app/page.tsx
import WeatherApp from "./WeatherApp";
import { fetchWeather } from "@/utils/api";

export default async function Page() {
  // SSR: tampilkan Jakarta dulu
  const initialWeather = await fetchWeather(-6.2, 106.8);

  return <WeatherApp initialWeather={initialWeather} />;
}