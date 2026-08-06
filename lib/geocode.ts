import { addressBook } from "@/lib/data/fleet";
import type { LatLng } from "@/types/domain";

export interface Geocoder {
  geocode(address: string): Promise<LatLng | null>;
}

/**
 * Sandbox geocoder. Resolves the address book exactly and places unknown addresses at a
 * stable point near Fresno derived from the address text, so repeated calls agree.
 */
export class SandboxGeocoder implements Geocoder {
  async geocode(address: string): Promise<LatLng | null> {
    const normalized = address.trim().replace(/\s+/g, " ");
    if (!normalized) return null;

    const known = addressBook[normalized];
    if (known) return known;

    let hash = 0;
    for (const char of normalized) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
    const latOffset = ((hash % 1000) / 1000 - 0.5) * 0.6;
    const lngOffset = (((hash >>> 10) % 1000) / 1000 - 0.5) * 0.6;
    return { lat: 36.7378 + latOffset, lng: -119.7871 + lngOffset };
  }
}

export const geocoder: Geocoder = new SandboxGeocoder();
