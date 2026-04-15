import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import ForecastDay from "@/components/ForecastDay";
import HourlyForecastItem from "@/components/HourlyForecastItem";
import SuggestionCard from "@/components/SuggestionCard";
import { getSuggestions } from "@/constants/suggestions";
import { DEFAULT_THEME, getWeatherTheme } from "@/constants/weatherCodes";
import { LocationData, useLocation } from "@/hooks/useLocation";
import { useLocationSearch } from "@/hooks/useLocationSearch";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedLocation, setSearchedLocation] = useState<LocationData | null>(null);

  const { location, loading: locLoading, error: locError } = useLocation();
  const { loading: searchLoading, error: searchError, search } = useLocationSearch();

  const activeLocation = searchedLocation ?? location;

  const {
    weather,
    loading: wxLoading,
    error: wxError,
  } = useWeather(activeLocation?.latitude ?? null, activeLocation?.longitude ?? null);

  async function handleSearch() {
    const result = await search(searchQuery);
    if (result) setSearchedLocation(result);
  }

  const isLoading = (!searchedLocation && locLoading) || wxLoading;
  const gpsError = !searchedLocation ? locError : null;
  const error = gpsError || wxError;

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

  if (!weather || !activeLocation) return null;

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
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search city…"
            placeholderTextColor="rgba(255,255,255,0.5)"
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch} disabled={searchLoading}>
            {searchLoading
              ? <ActivityIndicator color="#fff" size="small" />
              : <Text style={styles.searchButtonText}>Search</Text>
            }
          </TouchableOpacity>
        </View>
        {searchError ? <Text style={styles.searchError}>{searchError}</Text> : null}

        <View style={styles.locationRow}>
          <Text style={styles.locationPin}>📍</Text>
          <View>
            <Text style={styles.city}>{activeLocation.city}</Text>
            {activeLocation.region ? <Text style={styles.region}>{activeLocation.region}</Text> : null}
          </View>
        </View>

        <View style={styles.mainWeather}>
          <Text style={styles.weatherEmoji}>{theme.emoji}</Text>
          <Text style={styles.temperature}>{current.temperature}°F</Text>
          <Text style={styles.condition}>{theme.label}</Text>
          <Text style={styles.feelsLike}>Feels like {current.apparentTemperature}°F</Text>
        </View>

        <View style={styles.pillRow}>
          <StatPill label="Humidity" value={`${current.humidity}%`} />
          <StatPill label="Wind" value={`${current.windSpeed} mph`} />
          <StatPill label="UV Index" value={String(current.uvIndex)} />
          <StatPill label="Rain" value={`${current.precipitationProbability}%`} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hourly Forecast</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.forecastRow}
          >
            {weather.hourly.map((hour, i) => (
              <HourlyForecastItem key={hour.time} forecast={hour} isNow={i === 0} />
            ))}
          </ScrollView>
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
