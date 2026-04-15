import { isClear, isFoggy, isRainy, isSnowy, isStormy } from "./weatherCodes";

export interface Suggestion {
  id: string;
  emoji: string;
  title: string;
  message: string;
  accentColor: string;
}

interface WeatherInput {
  weatherCode: number;
  precipitationProbability: number;
  uvIndex: number;
  windSpeed: number;
  humidity: number;
  temperature: number;
  apparentTemperature: number;
}

export function getSuggestions(w: WeatherInput): Suggestion[] {
  const tips: Suggestion[] = [];

  if (isStormy(w.weatherCode)) {
    tips.push({
      id: "storm",
      emoji: "⛈️",
      title: "Storm Warning",
      message: "Thunderstorms expected — stay indoors when possible and avoid open areas.",
      accentColor: "#37474F",
    });
  }

  if (isSnowy(w.weatherCode)) {
    tips.push({
      id: "snow",
      emoji: "🧣",
      title: "Bundle Up!",
      message: "Snow is on the way. Layer up and watch your step on icy surfaces.",
      accentColor: "#78909C",
    });
  }

  if (isRainy(w.weatherCode) || w.precipitationProbability >= 60) {
    tips.push({
      id: "umbrella",
      emoji: "☂️",
      title: "Bring an Umbrella",
      message:
        w.precipitationProbability >= 60
          ? `${w.precipitationProbability}% chance of rain — don't leave home without one!`
          : "Rain is expected today. Stay dry out there.",
      accentColor: "#1E88E5",
    });
  }

  if (isFoggy(w.weatherCode)) {
    tips.push({
      id: "fog",
      emoji: "🌫️",
      title: "Foggy Conditions",
      message: "Low visibility ahead. Drive slowly and use your fog lights.",
      accentColor: "#90A4AE",
    });
  }

  if (w.uvIndex >= 8) {
    tips.push({
      id: "sunscreen",
      emoji: "🧴",
      title: "Sunscreen is a Must",
      message: `UV index is ${w.uvIndex} (very high). Apply SPF 30+ before going outside.`,
      accentColor: "#F57F17",
    });
  } else if (w.uvIndex >= 5) {
    tips.push({
      id: "sunscreen-moderate",
      emoji: "🧴",
      title: "Don't Skip the Sunscreen",
      message: `UV index is ${w.uvIndex} — reapply every 2 hours if you're outside for long.`,
      accentColor: "#FB8C00",
    });
  } else if (isClear(w.weatherCode) && w.uvIndex >= 3) {
    tips.push({
      id: "sunglasses",
      emoji: "🕶️",
      title: "Grab Your Sunglasses",
      message: "It's bright and sunny. A little eye protection goes a long way.",
      accentColor: "#F9A825",
    });
  }

  if (w.windSpeed >= 50) {
    tips.push({
      id: "wind-strong",
      emoji: "💨",
      title: "Very Windy",
      message: `Gusts around ${Math.round(w.windSpeed)} mph. Avoid cycling or walking in exposed areas.`,
      accentColor: "#5C6BC0",
    });
  } else if (w.windSpeed >= 30) {
    tips.push({
      id: "wind",
      emoji: "💨",
      title: "It's Quite Windy",
      message: `Wind speeds of ${Math.round(w.windSpeed)} mph. Hold onto your hat!`,
      accentColor: "#7986CB",
    });
  }

  if (w.temperature >= 32) {
    tips.push({
      id: "heat",
      emoji: "🥤",
      title: "Stay Hydrated",
      message: "It's very hot today. Drink water often and avoid peak sun hours.",
      accentColor: "#E53935",
    });
  } else if (w.apparentTemperature <= -5) {
    tips.push({
      id: "cold",
      emoji: "🧤",
      title: "Dress Warm",
      message: `Feels like ${Math.round(w.apparentTemperature)}°F outside. Gloves and a heavy coat are a must.`,
      accentColor: "#1565C0",
    });
  }

  if (w.humidity >= 85) {
    tips.push({
      id: "humidity",
      emoji: "💧",
      title: "High Humidity",
      message: "It's muggy out there. Wear breathable fabrics to stay comfortable.",
      accentColor: "#00838F",
    });
  }

  if (tips.length === 0) {
    tips.push({
      id: "perfect",
      emoji: "✨",
      title: "Looks Like a Great Day!",
      message: "Weather conditions are comfortable. Get outside and enjoy it.",
      accentColor: "#43A047",
    });
  }

  return tips;
}
