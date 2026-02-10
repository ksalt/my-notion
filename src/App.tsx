import { Route, Routes } from "react-router";
import { createPage } from "./utils/createPage";
import { Page } from "./components/Page/Page";
import { AppStateProvider } from "./state/AppStateContext";
import "./App.css";
import { Auth } from "./components/Auth/Auth";
import { Private } from "./components/Auth/Private";

const initialState = createPage();

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/:id"
        element={
          <Private
            component={
              <AppStateProvider initialState={initialState}>
                <Page />
              </AppStateProvider>
            }
          />
        }
      />
      <Route
        path="/"
        element={
          <Private
            component={
              <AppStateProvider initialState={initialState}>
                <Page />
              </AppStateProvider>
            }
          />
        }
      />
    </Routes>
  );
}

export default App;
