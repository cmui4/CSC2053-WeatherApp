export interface WeatherTheme {
  label: string;
  emoji: string;
  gradientColors: [string, string];
  textColor: string;
}

export const WEATHER_THEMES: Record<number, WeatherTheme> = {
  0:  { label: "Clear Sky",          emoji: "☀️",  gradientColors: ["#56CCF2", "#2F80ED"], textColor: "#fff" },
  1:  { label: "Mainly Clear",       emoji: "🌤️", gradientColors: ["#74B9FF", "#0984E3"], textColor: "#fff" },
  2:  { label: "Partly Cloudy",      emoji: "⛅",  gradientColors: ["#A0BECF", "#5580A0"], textColor: "#fff" },
  3:  { label: "Overcast",           emoji: "☁️",  gradientColors: ["#8EA8BF", "#4A6A80"], textColor: "#fff" },
  45: { label: "Foggy",              emoji: "🌫️", gradientColors: ["#B2BEC3", "#636E72"], textColor: "#fff" },
  48: { label: "Icy Fog",            emoji: "🌫️", gradientColors: ["#B2BEC3", "#636E72"], textColor: "#fff" },
  51: { label: "Light Drizzle",      emoji: "🌦️", gradientColors: ["#74B9FF", "#0984E3"], textColor: "#fff" },
  53: { label: "Drizzle",            emoji: "🌧️", gradientColors: ["#5F8FA8", "#2D5E78"], textColor: "#fff" },
  55: { label: "Heavy Drizzle",      emoji: "🌧️", gradientColors: ["#4A7A94", "#1D4D64"], textColor: "#fff" },
  61: { label: "Light Rain",         emoji: "🌧️", gradientColors: ["#5F8FA8", "#2D5E78"], textColor: "#fff" },
  63: { label: "Rain",               emoji: "🌧️", gradientColors: ["#4A7A94", "#1D4D64"], textColor: "#fff" },
  65: { label: "Heavy Rain",         emoji: "⛈️",  gradientColors: ["#2D5E78", "#0A2E40"], textColor: "#fff" },
  71: { label: "Light Snow",         emoji: "🌨️", gradientColors: ["#DFE6E9", "#B2BEC3"], textColor: "#2d3436" },
  73: { label: "Snow",               emoji: "❄️",  gradientColors: ["#DFE6E9", "#B2BEC3"], textColor: "#2d3436" },
  75: { label: "Heavy Snow",         emoji: "❄️",  gradientColors: ["#C8D6E5", "#8395A7"], textColor: "#2d3436" },
  77: { label: "Snow Grains",        emoji: "🌨️", gradientColors: ["#DFE6E9", "#B2BEC3"], textColor: "#2d3436" },
  80: { label: "Light Showers",      emoji: "🌦️", gradientColors: ["#5F8FA8", "#2D5E78"], textColor: "#fff" },
  81: { label: "Showers",            emoji: "🌧️", gradientColors: ["#4A7A94", "#1D4D64"], textColor: "#fff" },
  82: { label: "Heavy Showers",      emoji: "⛈️",  gradientColors: ["#2D5E78", "#0A2E40"], textColor: "#fff" },
  85: { label: "Snow Showers",       emoji: "🌨️", gradientColors: ["#DFE6E9", "#B2BEC3"], textColor: "#2d3436" },
  86: { label: "Heavy Snow Showers", emoji: "❄️",  gradientColors: ["#C8D6E5", "#8395A7"], textColor: "#2d3436" },
  95: { label: "Thunderstorm",       emoji: "⛈️",  gradientColors: ["#2C3E50", "#1a252f"], textColor: "#fff" },
  96: { label: "Thunderstorm + Hail",emoji: "⛈️",  gradientColors: ["#2C3E50", "#1a252f"], textColor: "#fff" },
  99: { label: "Thunderstorm + Hail",emoji: "⛈️",  gradientColors: ["#2C3E50", "#1a252f"], textColor: "#fff" },
};

export const DEFAULT_THEME: WeatherTheme = {
  label: "Unknown",
  emoji: "🌡️",
  gradientColors: ["#74B9FF", "#0984E3"],
  textColor: "#fff",
};

export function getWeatherTheme(code: number): WeatherTheme {
  return WEATHER_THEMES[code] ?? DEFAULT_THEME;
}

export function isRainy(code: number): boolean {
  return [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code);
}

export function isSnowy(code: number): boolean {
  return [71, 73, 75, 77, 85, 86].includes(code);
}

export function isStormy(code: number): boolean {
  return [95, 96, 99].includes(code);
}

export function isFoggy(code: number): boolean {
  return [45, 48].includes(code);
}

export function isClear(code: number): boolean {
  return [0, 1].includes(code);
}
