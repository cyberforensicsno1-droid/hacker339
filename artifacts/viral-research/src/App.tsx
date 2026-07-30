import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import Home from './pages/Home';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={() => (
        <div className="min-h-screen bg-black flex items-center justify-center p-8">
          <div className="text-center">
            <h1 className="text-primary font-mono text-xl tracking-widest mb-2 border-b border-primary/20 pb-2">ERROR 404</h1>
            <p className="text-muted-foreground font-mono text-sm">DIRECTORY_NOT_FOUND</p>
          </div>
        </div>
      )} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
