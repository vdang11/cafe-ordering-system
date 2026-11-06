import { api } from "@/api/client";

export function fetchMenu({ signal } = {}) {
  return api.get("/menu", { signal });
}
