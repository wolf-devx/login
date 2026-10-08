import { Mountain } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground mx-auto mb-6">
          <Mountain className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Evereste</h1>
        <p className="mt-2 text-muted-foreground">Redirecionando...</p>
      </div>
    </div>
  );
}