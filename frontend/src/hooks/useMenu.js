import { useQuery } from "@tanstack/react-query";

import { fetchMenu } from "@/api/menu";
import menuData from "@/data/menuData";
import { normalizeApiMenu, normalizeMockMenu } from "@/lib/normalizeMenu";

// An explicit switch, not a silent fallback. If a failing API quietly fell back
// to mock data, an outage would show stale prices and the customer would order
// at a price the kitchen never agreed to.
const USE_MOCK = import.meta.env.VITE_USE_MOCK_MENU === "true";

export function useMenu() {
  return useQuery({
    queryKey: ["menu"],

    queryFn: async ({ signal }) => {
      if (USE_MOCK) return normalizeMockMenu(menuData);

      return normalizeApiMenu(await fetchMenu({ signal }));
    },
  });
}
