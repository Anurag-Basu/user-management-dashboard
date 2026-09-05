import type { UserInput } from "../types/user.ts";

const FIRST_NAMES = [
  "Aarav",
  "Ananya",
  "Diya",
  "Ishaan",
  "Kavya",
  "Rohan",
  "Meera",
  "Vihaan",
];
const LAST_NAMES = [
  "Sharma",
  "Patel",
  "Iyer",
  "Kumar",
  "Reddy",
  "Nair",
  "Gupta",
  "Das",
];
const COMPANIES = [
  "Nimbus Labs",
  "Cedar & Co",
  "Northwind",
  "PixelForge",
  "Harborworks",
  "Lumen Studio",
];
const STREETS = [
  "12 MG Road",
  "88 Park Street",
  "5 Residency Road",
  "21 Lake View",
  "9 Brigade Lane",
];
const CITIES = [
  { city: "Bengaluru", zipcode: "560001", lat: 12.9716, lng: 77.5946 },
  { city: "Mumbai", zipcode: "400001", lat: 19.076, lng: 72.8777 },
  { city: "Delhi", zipcode: "110001", lat: 28.6139, lng: 77.209 },
  { city: "Pune", zipcode: "411001", lat: 18.5204, lng: 73.8567 },
  { city: "Hyderabad", zipcode: "500001", lat: 17.385, lng: 78.4867 },
];

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function randomDigits(length: number): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
}

function jitter(value: number): string {
  return (value + (Math.random() - 0.5) * 0.08).toFixed(4);
}

export function createRandomUser(): UserInput {
  const firstName = pick(FIRST_NAMES);
  const lastName = pick(LAST_NAMES);
  const location = pick(CITIES);
  const suffix = randomDigits(3);

  return {
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${suffix}@example.com`,
    phone: `9${randomDigits(9)}`,
    company: pick(COMPANIES),
    address: {
      street: pick(STREETS),
      city: location.city,
      zipcode: location.zipcode,
      geo: {
        lat: jitter(location.lat),
        lng: jitter(location.lng),
      },
    },
  };
}
