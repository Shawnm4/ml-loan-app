// import Desktop from "./Desktop/Desktop";
// import { EColors } from "./EColors";

import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routes } from "./routes";
function App() {
  // const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       staleTime: 300 * 1000,
  //     },
  //   },
  //   queryCache: new QueryCache({}),
  // });
  // return (
  //   <div
  //     className="w-full h-screen"
  //     style={{ backgroundColor: EColors.primaryBg }}
  //   >
  //     <Desktop />
  //   </div>
  // );
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 300 * 1000,
      },
    },
    queryCache: new QueryCache({}),
  });
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={createBrowserRouter(routes)} />
    </QueryClientProvider>
  );
}

export default App;
