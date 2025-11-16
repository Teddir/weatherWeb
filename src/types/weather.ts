export interface WeatherHourly {
  time: string[];
  temperature_2m: number[];
}

export interface WeatherApiResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  hourly: WeatherHourly;
}

export interface HourlyWeatherPoint {
  time: string; // ISO timestamp
  temperatureC: number; // Celsius
}


