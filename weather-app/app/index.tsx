import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from "react-native";
import ForecastDay from "@/components/ForecastDay";
import SuggestionCard from "@/components/SuggestionCard";
import { getSuggestions } from "@/constants/suggestions";
import { DEFAULT_THEME, getWeatherTheme } from "@/constants/weatherCodes";
import { useLocation } from "@/hooks/useLocation";
import { useWeather } from "@/hooks/useWeather";
import { styles } from "./index.styles";

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.pill}>
      <Text style={styles.pillValue}>{value}</Text>
      <Text style={styles.pillLabel}>{label}</Text>
    </View>
  );
}

export default function WeatherScreen() {
  const { location, loading: locLoading, error: locError } = useLocation();
  const {
    weather,
    loading: wxLoading,
    error: wxError,
  } = useWeather(location?.latitude ?? null, location?.longitude ?? null);

  const isLoading = locLoading || wxLoading;
  const error = locError || wxError;

  const theme = weather ? getWeatherTheme(weather.current.weatherCode) : DEFAULT_THEME;
  const suggestions = weather
    ? getSuggestions({
        weatherCode: weather.current.weatherCode,
        precipitationProbability: weather.current.precipitationProbability,
        uvIndex: weather.current.uvIndex,
        windSpeed: weather.current.windSpeed,
        humidity: weather.current.humidity,
        temperature: weather.current.temperature,
        apparentTemperature: weather.current.apparentTemperature,
      })
    : [];

  if (isLoading) {
    return (
      <LinearGradient colors={["#56CCF2", "#2F80ED"]} style={styles.center}>
        <StatusBar style="light" />
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>
          {locLoading ? "Getting your location…" : "Fetching weather…"}
        </Text>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient colors={["#636e72", "#2d3436"]} style={styles.center}>
        <StatusBar style="light" />
        <Text style={styles.errorEmoji}>😕</Text>
        <Text style={styles.errorTitle}>Something went wrong</Text>
        <Text style={styles.errorMessage}>{error}</Text>
      </LinearGradient>
    );
  }

  if (!weather || !location) return null;

  const { current, daily } = weather;

  return (
    <LinearGradient colors={theme.gradientColors} style={styles.flex}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={wxLoading} onRefresh={() => {}} tintColor="#fff" />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.locationRow}>
          <Text style={styles.locationPin}>📍</Text>
          <View>
            <Text style={styles.city}>{location.city}</Text>
            {location.region ? <Text style={styles.region}>{location.region}</Text> : null}
          </View>
        </View>

        <View style={styles.mainWeather}>
          <Text style={styles.weatherEmoji}>{theme.emoji}</Text>
          <Text style={styles.temperature}>{current.temperature}°C</Text>
          <Text style={styles.condition}>{theme.label}</Text>
          <Text style={styles.feelsLike}>Feels like {current.apparentTemperature}°C</Text>
        </View>

        <View style={styles.pillRow}>
          <StatPill label="Humidity" value={`${current.humidity}%`} />
          <StatPill label="Wind" value={`${current.windSpeed} km/h`} />
          <StatPill label="UV Index" value={String(current.uvIndex)} />
          <StatPill label="Rain" value={`${current.precipitationProbability}%`} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Tips</Text>
          {suggestions.map((s) => (
            <SuggestionCard key={s.id} suggestion={s} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7-Day Forecast</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.forecastRow}
          >
            {daily.map((day, i) => (
              <ForecastDay key={day.date} forecast={day} isToday={i === 0} />
            ))}
          </ScrollView>
        </View>

        <Text style={styles.credit}>Weather data by Open-Meteo</Text>
      </ScrollView>
    </LinearGradient>
  );
}
