import React from "react";
import { Text, View } from "react-native";
import { DailyForecast } from "@/hooks/useWeather";
import { getWeatherTheme } from "@/constants/weatherCodes";
import { styles } from "./ForecastDay.styles";

interface Props {
  forecast: DailyForecast;
  isToday: boolean;
}

function formatDay(dateStr: string, isToday: boolean): string {
  if (isToday) return "Today";
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

export default function ForecastDay({ forecast, isToday }: Props) {
  const theme = getWeatherTheme(forecast.weatherCode);

  return (
    <View style={[styles.container, isToday && styles.todayContainer]}>
      <Text style={[styles.day, isToday && styles.todayText]}>{formatDay(forecast.date, isToday)}</Text>
      <Text style={styles.emoji}>{theme.emoji}</Text>
      {forecast.precipitationProbability > 0 && (
        <Text style={styles.rain}>💧 {forecast.precipitationProbability}%</Text>
      )}
      <Text style={[styles.temp, isToday && styles.todayText]}>
        {forecast.maxTemp}°
      </Text>
      <Text style={styles.minTemp}>{forecast.minTemp}°</Text>
    </View>
  );
}
