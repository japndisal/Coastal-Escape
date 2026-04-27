import { v4 as uuidv4 } from 'uuid';

export function generateTicketToken(): string {
  return uuidv4();
}

export function generateBookingRef(): string {
  const year = new Date().getFullYear();
  const num = Math.floor(10000 + Math.random() * 90000);
  return `CE-${year}-${num}`;
}
