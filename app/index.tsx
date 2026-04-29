import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Share,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ForecastDay from "@/components/ForecastDay";
import HourlyForecastItem from "@/components/HourlyForecastItem";
import SuggestionCard from "@/components/SuggestionCard";
import { getSuggestions } from "@/constants/suggestions";
import { DEFAULT_THEME, getWeatherTheme } from "@/constants/weatherCodes";
import { LocationData, useLocation } from "@/hooks/useLocation";
import { useLocationSearch } from "@/hooks/useLocationSearch";
import { useWeather } from "@/hooks/useWeather";
import { buildShareMessage } from "@/lib/buildShareMessage";
import { styles, tokens } from "./index.styles";

// ── Stat card ──────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string;
  unit?: string;
  subtitle?: string;
  barFraction?: number;
  accent?: boolean; // navy blue filled card
}

function StatCard({ label, value, unit, subtitle, barFraction, accent }: StatCardProps) {
  return (
    <View style={[styles.statCard, accent && styles.statCardAccent]}>
      <Text style={[styles.statLabel, accent && styles.statLabelOnBlue]}>{label}</Text>
      <Text style={[styles.statValue, accent && styles.statValueOnBlue]}>
        {value}
        {unit ? (
          <Text style={[styles.statUnit, accent && styles.statUnitOnBlue]}> {unit}</Text>
        ) : null}
      </Text>
      {barFraction !== undefined && (
        <View style={[styles.statBarTrack, accent && styles.statBarTrackOnBlue]}>
          <View
            style={[
              styles.statBarFill,
              accent && styles.statBarFillOnBlue,
              { width: `${Math.round(Math.min(barFraction, 1) * 100)}%` as any },
            ]}
          />
        </View>
      )}
      {subtitle ? (
        <Text style={[styles.statSubtitle, accent && styles.statSubtitleOnBlue]}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

// ── Weather description helper ─────────────────────────────────────────────
function getWeatherDescription(label: string, windSpeed: number, humidity: number): string {
  if (label.toLowerCase().includes("storm"))
    return "Powerful storms rolling through. Stay sheltered and monitor updates.";
  if (label.toLowerCase().includes("snow"))
    return "Snow is on the way. Expect slippery roads and a quiet white landscape.";
  if (
    label.toLowerCase().includes("rain") ||
    label.toLowerCase().includes("drizzle") ||
    label.toLowerCase().includes("shower")
  )
    return "Rain expected through the day. Keep your umbrella close at hand.";
  if (label.toLowerCase().includes("fog"))
    return "Low visibility due to fog. Allow extra time for your commute.";
  if (label.toLowerCase().includes("cloudy") || label.toLowerCase().includes("overcast"))
    return windSpeed > 20
      ? "A breezy, overcast day with shifting clouds across the sky."
      : "A quiet, overcast day — perfect for staying in with a warm drink.";
  if (label.toLowerCase().includes("clear") || label.toLowerCase().includes("sunny"))
    return humidity > 70
      ? "Bright skies but humid air. Breathable fabrics are your friend."
      : "Crisp, clear skies ahead. Great conditions for time outdoors.";
  return "Conditions are comfortable. A pleasant day ahead.";
}

// ── Main screen ────────────────────────────────────────────────────────────
export default function WeatherScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedLocation, setSearchedLocation] = useState<LocationData | null>(null);

  const { location, loading: locLoading, error: locError } = useLocation();
  const { loading: searchLoading, error: searchError, search } = useLocationSearch();

  const activeLocation = searchedLocation ?? location;

  const { weather, loading: wxLoading, error: wxError } = useWeather(
    activeLocation?.latitude ?? null,
    activeLocation?.longitude ?? null
  );

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

  async function handleShare() {
    if (!weather || !activeLocation || suggestions.length === 0) return;
    const message = buildShareMessage({
      location: activeLocation,
      conditionLabel: theme.label,
      conditionEmoji: theme.emoji,
      temperature: weather.current.temperature,
      apparentTemperature: weather.current.apparentTemperature,
      suggestion: suggestions[0],
    });
    try {
      await Share.share({ message });
    } catch { /* dismissed */ }
  }

  if (isLoading) {
    return (
      <View style={styles.center}>
        <StatusBar style="dark" />
        <ActivityIndicator size="large" color={tokens.primaryContainer} />
        <Text style={styles.loadingText}>
          {locLoading ? "Getting your location…" : "Fetching weather…"}
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <StatusBar style="dark" />
        <Text style={styles.errorEmoji}>😕</Text>
        <Text style={styles.errorTitle}>Something went wrong</Text>
        <Text style={styles.errorMessage}>{error}</Text>
      </View>
    );
  }

  if (!weather || !activeLocation) return null;

  const { current, daily } = weather;

  const todayLabel = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const description = getWeatherDescription(theme.label, current.windSpeed, current.humidity);

  return (
    <View style={styles.background}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={
          <RefreshControl
            refreshing={wxLoading}
            onRefresh={() => {}}
            tintColor={tokens.primaryContainer}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Search */}
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search city…"
            placeholderTextColor={tokens.onSurfaceFaint}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch} disabled={searchLoading}>
            {searchLoading
              ? <ActivityIndicator color={tokens.onPrimary} size="small" />
              : <Text style={styles.searchButtonText}>Search</Text>}
          </TouchableOpacity>
        </View>
        {searchError ? <Text style={styles.searchError}>{searchError}</Text> : null}

        {/* Location + Share — navy chip / sky-blue share */}
        <View style={styles.locationHeaderRow}>
          <View style={styles.locationChip}>
            <Text style={styles.locationPin}>📍</Text>
            <Text style={styles.city}>{activeLocation.city}</Text>
          </View>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => { void handleShare(); }}
            accessibilityRole="button"
            accessibilityLabel="Share weather summary"
          >
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Hero — condition in navy, °F unit in navy */}
        <View style={styles.heroBlock}>
          <Text style={styles.temperature}>
            {current.temperature}
            <Text style={styles.temperatureUnit}>°F</Text>
          </Text>
          <Text style={styles.condition}>{theme.label}</Text>
          <Text style={styles.weatherDescription}>{description}</Text>
        </View>

        {/* 2×2 Stat grid — alternating white / navy cards */}
        <View style={styles.statGrid}>
          {/* White card */}
          <StatCard
            label="Wind"
            value={String(current.windSpeed)}
            unit="mph"
            subtitle="Current speed"
          />
          {/* Navy accent card */}
          <StatCard
            label="Humidity"
            value={`${current.humidity}%`}
            barFraction={current.humidity / 100}
            accent
          />
          {/* Navy accent card */}
          <StatCard
            label="UV Index"
            value={String(current.uvIndex)}
            unit={current.uvIndex >= 8 ? "HIGH" : current.uvIndex >= 5 ? "MOD" : "LOW"}
            subtitle={
              current.uvIndex >= 8
                ? "Sun protection a must"
                : current.uvIndex >= 5
                ? "Sun protection advised"
                : "Minimal risk"
            }
            accent
          />
          {/* White card */}
          <StatCard
            label="Rain"
            value={`${current.precipitationProbability}%`}
            subtitle="Precipitation"
            barFraction={current.precipitationProbability / 100}
          />
        </View>

        {/* Hourly */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Hourly Forecast</Text>
            <Text style={styles.sectionMeta}>Today, {todayLabel}</Text>
          </View>
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

        {/* Tips */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{"Today's Tips"}</Text>
          </View>
          {suggestions.map((s) => (
            <SuggestionCard key={s.id} suggestion={s} />
          ))}
        </View>

        {/* 7-Day */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>7-Day Outlook</Text>
          </View>
          <View style={styles.forecastListCard}>
            {daily.map((day, i) => (
              <ForecastDay
                key={day.date}
                forecast={day}
                isToday={i === 0}
                isLast={i === daily.length - 1}
              />
            ))}
          </View>
        </View>

        <Text style={styles.credit}>Weather data by Open-Meteo</Text>
      </ScrollView>
    </View>
  );
}
