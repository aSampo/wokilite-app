export function formatTime24h(isoDateTime: string): string {
  const date = new Date(isoDateTime);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function extractTimeFromISO(isoDateTime: string): string {
  return formatTime24h(isoDateTime);
}

