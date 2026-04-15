import * as Location from "expo-location";
import { useEffect, useState } from "react";

export interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  region: string;
}

export interface LocationState {
  location: LocationData | null;
  loading: boolean;
  error: string | null;
}

async function reverseGeocode(lat: number, lon: number): Promise<{ city: string; region: string }> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      { headers: { "User-Agent": "WeatherApp/1.0" } }
    );
    const data = await res.json();
    const city =
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.county ||
      "Unknown City";
    const region = data.address?.state || data.address?.country || "";
    return { city, region };
  } catch {
    return { city: "Your Location", region: "" };
  }
}

export function useLocation(): LocationState {
  const [state, setState] = useState<LocationState>({
    location: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        if (!cancelled) {
          setState({ location: null, loading: false, error: "Location permission denied." });
        }
        return;
      }

      try {
        const coords = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        const { city, region } = await reverseGeocode(coords.coords.latitude, coords.coords.longitude);
        if (!cancelled) {
          setState({
            location: {
              latitude: coords.coords.latitude,
              longitude: coords.coords.longitude,
              city,
              region,
            },
            loading: false,
            error: null,
          });
        }
      } catch (e) {
        if (!cancelled) {
          setState({ location: null, loading: false, error: "Could not get location." });
        }
      }
    })();

    return () => { cancelled = true; };
  }, []);

  return state;
}
