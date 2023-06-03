import router from "./router";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider, Flex, Img, extendTheme } from "@chakra-ui/react";
import WagmiProvider from "./providers/wagmi-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "./assets/images/logo.png";
import ReactQueryProvider from "./providers/query-provider";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      cacheTime: 1000 * 60 * 10,
    },
  },
});

const theme = extendTheme({
  fonts: {
    body: "Geologica",
  },
  styles: {
    global: () => ({
      body: {
        bg: "#262830",
      },
    }),
  },
});

function Header() {
  return (
    <Flex px="208px" py="32px" w="100%" alignItems={"flex-start"}>
      <Img src={Logo} />
    </Flex>
  );
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <WagmiProvider>
        <Header />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />

          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            toastStyle={{
              background: "#5DDC4",
              color: "#1B1C1F",
            }}
          />
        </QueryClientProvider>
      </WagmiProvider>
    </ChakraProvider>
  );
}

export default App;
