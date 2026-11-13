import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/"><Home modelOverride={1} /></Route>
      <Route path="/propostas"><Home /></Route>
      <Route path="/modelo-1"><Home modelOverride={1} /></Route>
      <Route path="/modelo-2"><Home modelOverride={2} /></Route>
      <Route path="/modelo-3"><Home modelOverride={3} /></Route>
      <Route><NotFound /></Route>
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
