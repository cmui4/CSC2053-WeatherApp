import React from "react";
import { Text, View } from "react-native";
import { HourlyForecast } from "@/hooks/useWeather";
import { styles } from "./HourlyForecastItem.styles";

interface Props {
  forecast: HourlyForecast;
  isNow: boolean;
}

function formatHour(timeStr: string): string {
  const hour = parseInt(timeStr.split("T")[1].split(":")[0], 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h = hour % 12 || 12;
  return `${h} ${ampm}`;
}

export default function HourlyForecastItem({ forecast, isNow }: Props) {
  const emoji = isNow ? "☀️" : "⛅";

  return (
    <View style={[styles.container, isNow && styles.nowContainer]}>
      <Text style={[styles.hour, isNow && styles.nowText]}>
        {isNow ? "Now" : formatHour(forecast.time)}
      </Text>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={[styles.temp, isNow && styles.nowTempText]}>
        {forecast.temperature}°
      </Text>
      {forecast.precipitationProbability > 0 && (
        <Text style={[styles.rain, isNow && styles.nowRainText]}>
          💧 {forecast.precipitationProbability}%
        </Text>
      )}
    </View>
  );
}
