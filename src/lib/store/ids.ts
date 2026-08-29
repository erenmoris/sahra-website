import crypto from "crypto";

export function newId(): string {
  return crypto.randomUUID();
}

export function makeRef(): string {
  return `SAH-${crypto.randomInt(1000, 10000)}`;
}
