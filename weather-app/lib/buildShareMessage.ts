import { LocationData } from "@/hooks/useLocation";
import { Suggestion } from "@/constants/suggestions";

export function formatLocationTitle(location: LocationData): string {
  const city = location.city?.trim();
  const region = location.region?.trim();
  if (!city || city === "") {
    return "Current location";
  }
  return region ? `${city}, ${region}` : city;
}

export interface BuildSharePayload {
  location: LocationData;
  conditionLabel: string;
  /** Weather-theme emoji shown in UI (e.g. sun, cloud). */
  conditionEmoji: string;
  temperature: number;
  apparentTemperature: number;
  suggestion: Suggestion;
}

/** Plain-text snippet for Messages, Notes, Mail, etc. */
export function buildShareMessage(payload: BuildSharePayload): string {
  const loc = formatLocationTitle(payload.location);
  const emoji = payload.conditionEmoji.trim();
  const line1 = `Weather snapshot — ${loc}`;
  const line2 = `${emoji} ${payload.temperature}°F • ${payload.conditionLabel}`.trim();
  const line3 = `Feels like ${payload.apparentTemperature}°F`;
  const tipTitle = `${payload.suggestion.emoji} ${payload.suggestion.title}`.trim();
  const tip = `Tip: ${tipTitle}\n${payload.suggestion.message}`;

  return [line1, "", line2, line3, "", tip, "", footer].join("\n");
}
