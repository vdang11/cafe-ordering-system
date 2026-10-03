import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // The menu changes a few times a day at most. The default of 0 refetches
      // on every mount, which is wasted traffic on a phone at a table.
      staleTime: 5 * 60 * 1000,

      // Default is true. A customer who switches to another app mid-order and
      // comes back should not have the menu refetch and flicker under them.
      refetchOnWindowFocus: false,

      // Default is 3. If the server is down, three attempts just make the
      // customer wait longer before being told.
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // QueryClientProvider wraps the router so anything reached through a route,
  // including future route-level data loading, can see the client.
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>,
);
