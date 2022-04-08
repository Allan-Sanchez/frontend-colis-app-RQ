import React, { useEffect, useReducer } from "react";
import AppRouter from "./routers/AppRouter";
import { AuthContext } from "./auth/AuthContext";
import { authReducer } from "./auth/authReducer";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ImageState from "./context/ImageState";

const queryClient = new QueryClient();

const init = () => {
  return JSON.parse(localStorage.getItem("user")) || { logged: false };
};

function App() {
  const [user, dispatch] = useReducer(authReducer, {}, init);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthContext.Provider value={{ user, dispatch }}>
        <ImageState>
          <AppRouter />
        </ImageState>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
