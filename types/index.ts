export interface City {
    name: string;
    latitude: number;
    longitude: number;
    country?: string;
}

export interface Weather{
    current_weather:{
        temperature: number;
        weathercode: number;
    };
    hourly:{
        time: string[];
        temperature_2m: number[];
        weathercode: number[];
    };
    daily:{
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        weathercode: number[];
    };
}