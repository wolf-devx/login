'use client';

import { useRouter } from 'next/navigation';
import { Activity, ArrowUpRight, CheckCircle2, LogOut, ShieldCheck, Users, Settings, Bell, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProtectedRoute } from '@/hooks/use-protected-route';
import { useAuth } from '@/hooks/use-auth';
import { formatDateTime, getInitials } from '@/lib/utils';

function DashboardContent() {
  const { user, logout } = useAuth();
  const router = useRouter();

  async function signOut() {
    await logout();
    router.replace('/login');
  }

  const stats = [
    { label: 'Sessão', value: 'Ativa', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
    { label: 'Segurança', value: '100%', icon: ShieldCheck, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { label: 'Alertas', value: '0', icon: Bell, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
  ];

  const recentActivity = [
    { action: 'Login realizado', time: 'Agora mesmo', icon: Activity, color: 'text-primary' },
    { action: 'Perfil atualizado', time: '2 dias atrás', icon: UserIcon, color: 'text-blue-500' },
    { action: 'Configurações alteradas', time: '1 semana atrás', icon: Settings, color: 'text-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-semibold text-xl">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Activity className="h-5 w-5" />
            </span>
            <span>Evereste</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-muted-foreground">Visão geral</p>
          <h1 className="text-3xl font-bold tracking-tight">
            Bem-vindo, {user?.name?.split(' ')[0]}.
          </h1>
          <p className="mt-2 text-muted-foreground">Acompanhe sua conta e atividade em um só lugar.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="card-hover">
                <CardHeader className="pb-3">
                  <CardDescription>{stat.label}</CardDescription>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.bg}`}>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </span>
                    {stat.value}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  {stat.label === 'Sessão' && 'Validada agora mesmo'}
                  {stat.label === 'Segurança' && 'Identidade verificada'}
                  {stat.label === 'Alertas' && 'Nenhum alerta por enquanto'}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Atividade recente
              </CardTitle>
              <CardDescription>Suas últimas ações na plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-center gap-4 rounded-lg border p-4 hover:bg-accent/50 transition-colors">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${activity.color} bg-opacity-10`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Conta segura
              </CardTitle>
              <CardDescription>Tudo funcionando como esperado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Autenticação ativa</p>
                  <p className="text-xs text-muted-foreground">Sessão validada com sucesso</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Perfil completo</p>
                  <p className="text-xs text-muted-foreground">Informações atualizadas</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <ShieldCheck className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">2FA opcional</p>
                  <p className="text-xs text-muted-foreground">Segurança adicional disponível</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return <ProtectedRoute><DashboardContent /></ProtectedRoute>;
}