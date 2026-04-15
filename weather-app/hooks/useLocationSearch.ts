import { useState } from "react";
import { LocationData } from "./useLocation";

interface LocationSearchState {
  loading: boolean;
  error: string | null;
}

export function useLocationSearch() {
  const [state, setState] = useState<LocationSearchState>({
    loading: false,
    error: null,
  });

  async function search(query: string): Promise<LocationData | null> {
    const trimmed = query.trim();
    if (!trimmed) return null;

    setState({ loading: true, error: null });

    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}&count=1`
      );
      const data = await res.json();

      if (!data.results?.length) {
        setState({ loading: false, error: "City not found." });
        return null;
      }

      const r = data.results[0];
      setState({ loading: false, error: null });

      return {
        latitude: r.latitude,
        longitude: r.longitude,
        city: r.name,
        region: r.admin1 || r.country || "",
      };
    } catch {
      setState({ loading: false, error: "Search failed. Try again." });
      return null;
    }
  }

  return { ...state, search };
}
