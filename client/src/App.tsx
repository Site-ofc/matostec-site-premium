import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Router, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { BASE } from "./site/paths";

const titles: Record<string, string> = {
  "/": "Matos Tec — Segurança, energia solar e automação",
  "/propostas": "Matos Tec — Propostas de site",
  "/modelo-1": "Matos Tec — Nightline",
  "/modelo-2": "Matos Tec — Solar Aura",
  "/modelo-3": "Matos Tec — Grid Control",
};

function TitleSync() {
  const [location] = useLocation();
  useEffect(() => {
    document.title = titles[location] ?? "Matos Tec — Segurança, energia solar e automação";
  }, [location]);
  return null;
}

function Routes() {
  return (
    <Switch>
      <Route path="/">
        <Home modelOverride={1} />
      </Route>
      <Route path="/propostas">
        <Home />
      </Route>
      <Route path="/modelo-1">
        <Home modelOverride={1} />
      </Route>
      <Route path="/modelo-2">
        <Home modelOverride={2} />
      </Route>
      <Route path="/modelo-3">
        <Home modelOverride={3} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router base={BASE}>
            <TitleSync />
            <Routes />
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
