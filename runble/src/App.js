import React from "react";
import Router from "./Router/Router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue
} from "recoil";
import GlobalStyle from "./GlobalStyle";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <GlobalStyle />
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Router />
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
