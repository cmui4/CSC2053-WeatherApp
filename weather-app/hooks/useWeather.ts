import { useEffect, useState } from "react";

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitationProbability: number;
  windSpeed: number;
  weatherCode: number;
  uvIndex: number;
  cloudCover: number;
  isDay: number;
}

export interface DailyForecast {
  date: string;
  weatherCode: number;
  maxTemp: number;
  minTemp: number;
  precipitationProbability: number;
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast[];
}

export interface WeatherState {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}

export function useWeather(latitude: number | null, longitude: number | null): WeatherState {
  const [state, setState] = useState<WeatherState>({
    weather: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (latitude === null || longitude === null) return;

    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));

    const params = new URLSearchParams({
      latitude: String(latitude),
      longitude: String(longitude),
      current: [
        "temperature_2m",
        "apparent_temperature",
        "relative_humidity_2m",
        "precipitation_probability",
        "wind_speed_10m",
        "weather_code",
        "uv_index",
        "cloud_cover",
        "is_day",
      ].join(","),
      daily: [
        "weather_code",
        "temperature_2m_max",
        "temperature_2m_min",
        "precipitation_probability_max",
      ].join(","),
      timezone: "auto",
      forecast_days: "7",
    });

    fetch(`https://api.open-meteo.com/v1/forecast?${params}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;

        const c = data.current;
        const d = data.daily;

        const daily: DailyForecast[] = (d.time as string[]).map((date, i) => ({
          date,
          weatherCode: d.weather_code[i],
          maxTemp: Math.round(d.temperature_2m_max[i]),
          minTemp: Math.round(d.temperature_2m_min[i]),
          precipitationProbability: d.precipitation_probability_max[i] ?? 0,
        }));

        setState({
          weather: {
            current: {
              temperature: Math.round(c.temperature_2m),
              apparentTemperature: Math.round(c.apparent_temperature),
              humidity: c.relative_humidity_2m,
              precipitationProbability: c.precipitation_probability ?? 0,
              windSpeed: Math.round(c.wind_speed_10m),
              weatherCode: c.weather_code,
              uvIndex: Math.round(c.uv_index ?? 0),
              cloudCover: c.cloud_cover,
              isDay: c.is_day,
            },
            daily,
          },
          loading: false,
          error: null,
        });
      })
      .catch(() => {
        if (!cancelled) {
          setState({ weather: null, loading: false, error: "Failed to fetch weather data." });
        }
      });

    return () => { cancelled = true; };
  }, [latitude, longitude]);

  return state;
}
