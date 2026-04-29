import React from "react";
import { Text, View } from "react-native";
import { DailyForecast } from "@/hooks/useWeather";
import { getWeatherTheme } from "@/constants/weatherCodes";
import { styles } from "./ForecastDay.styles";

interface Props {
  forecast: DailyForecast;
  isToday: boolean;
  isLast?: boolean;
}

function formatDay(dateStr: string, isToday: boolean): string {
  if (isToday) return "Today";
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

function getConditionLabel(code: number): string {
  const labels: Record<number, string> = {
    0: "Sunny", 1: "Clear", 2: "Partly Cloudy", 3: "Cloudy",
    45: "Foggy", 48: "Icy Fog",
    51: "Drizzle", 53: "Drizzle", 55: "Drizzle",
    61: "Light Rain", 63: "Rain", 65: "Heavy Rain",
    71: "Light Snow", 73: "Snow", 75: "Heavy Snow", 77: "Snow Grains",
    80: "Showers", 81: "Showers", 82: "Heavy Showers",
    85: "Snow Showers", 86: "Snow Showers",
    95: "Thunderstorm", 96: "Thunderstorm", 99: "Thunderstorm",
  };
  return labels[code] ?? "Mixed";
}

export default function ForecastDay({ forecast, isToday, isLast = false }: Props) {
  const theme = getWeatherTheme(forecast.weatherCode);

  return (
    <View style={[styles.row, !isLast && styles.rowDivider, isToday && styles.todayRow]}>
      <Text style={[styles.day, isToday && styles.todayDayText]}>
        {formatDay(forecast.date, isToday)}
      </Text>
      <View style={styles.conditionBlock}>
        <Text style={styles.emoji}>{theme.emoji}</Text>
        <Text style={styles.conditionLabel}>{getConditionLabel(forecast.weatherCode)}</Text>
      </View>
      {forecast.precipitationProbability > 0 ? (
        <Text style={styles.rain}>{forecast.precipitationProbability}%</Text>
      ) : null}
      <View style={styles.tempBlock}>
        <Text style={styles.maxTemp}>{forecast.maxTemp}°</Text>
        <Text style={styles.minTemp}>{forecast.minTemp}°</Text>
      </View>
    </View>
  );
}
