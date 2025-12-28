import type { Customer } from "@/lib/api/create-reservation";

const FIRST_NAMES = [
  "Juan",
  "María",
  "Carlos",
  "Ana",
  "Pedro",
  "Laura",
  "Diego",
  "Sofía",
  "Miguel",
  "Valentina",
  "Lucas",
  "Camila",
  "Martín",
  "Isabella",
  "Santiago",
];

const LAST_NAMES = [
  "González",
  "Rodríguez",
  "Fernández",
  "López",
  "Martínez",
  "García",
  "Pérez",
  "Sánchez",
  "Romero",
  "Torres",
  "Díaz",
  "Morales",
  "Castro",
  "Silva",
  "Vargas",
];

function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function normalizeForEmail(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function generateRandomCustomer(): Customer {
  const firstName = randomItem(FIRST_NAMES);
  const lastName = randomItem(LAST_NAMES);
  const name = `${firstName} ${lastName}`;

  const phone = `+54 9 11 ${randomNumber(1000, 9999)}-${randomNumber(
    1000,
    9999
  )}`;

  const emailFirstName = normalizeForEmail(firstName);
  const emailLastName = normalizeForEmail(lastName);
  const email = `${emailFirstName}.${emailLastName}@example.com`;

  return {
    name,
    phone,
    email,
  };
}

export function generateRandomPartySize(): number {
  const sizes = [2, 2, 2, 4, 4, 4, 6, 6];
  return randomItem(sizes);
}
