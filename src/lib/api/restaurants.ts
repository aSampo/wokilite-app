import { apiClient } from "./client";

export interface Shift {
  start: string;
  end: string;
}

export interface Restaurant {
  id: string;
  name: string;
  timezone: string;
  shifts?: Shift[];
}

export interface Sector {
  id: string;
  name: string;
}

export interface RestaurantInfoResponse {
  restaurant: Restaurant;
  sectors: Sector[];
}

export async function getRestaurantInfo(
  restaurantId: string
): Promise<RestaurantInfoResponse> {
  return apiClient<RestaurantInfoResponse>(
    `/restaurants/info?restaurantId=${restaurantId}`
  );
}
