import type { HourlyWeatherPoint, WeatherApiResponse } from '../types/weather';

const OPEN_METEO_BASE = 'https://api.open-meteo.com/v1/forecast';

export async function fetchHourlyWeather(latitude: number, longitude: number): Promise<HourlyWeatherPoint[]> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    hourly: 'temperature_2m',
  });

  const url = `${OPEN_METEO_BASE}?${params.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch weather: ${response.status} ${response.statusText}`);
  }
  const data = (await response.json()) as WeatherApiResponse;
  const times = data.hourly?.time ?? [];
  const temps = data.hourly?.temperature_2m ?? [];

  const points: HourlyWeatherPoint[] = [];
  const len = Math.min(times.length, temps.length);
  for (let i = 0; i < len; i += 1) {
    points.push({
      time: times[i],
      temperatureC: temps[i],
    });
  }
  return points;
}


