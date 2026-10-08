'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Save, User, Mail, AlertCircle, CheckCircle2, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ProtectedRoute } from '@/hooks/use-protected-route';
import { useAuth } from '@/hooks/use-auth';
import { authApi } from '@/lib/api';
import { cn, getInitials, ChangePasswordData } from '@/lib';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const profileSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres.'),
  email: z.string().email('E-mail inválido.'),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, 'Senha atual incorreta.'),
  newPassword: z.string().min(6, 'Nova senha deve ter pelo menos 6 caracteres.'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'As senhas não coincidem.',
});

function ProfileContent() {
  const { user, updateProfile, refreshUser } = useAuth();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [profileSaving, setProfileSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name || '', email: user?.email || '' },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
  });

  async function onProfileSubmit(data: z.infer<typeof profileSchema>) {
    setProfileSaving(true);
    setMessage(null);
    try {
      await updateProfile(data);
      setMessage({ type: 'success', text: 'Perfil atualizado com sucesso.' });
      await refreshUser();
    } catch (e) {
      setMessage({ type: 'error', text: e instanceof Error ? e.message : 'Erro ao atualizar.' });
    } finally {
      setProfileSaving(false);
    }
  }

  async function onPasswordSubmit(data: z.infer<typeof passwordSchema>) {
    setPasswordSaving(true);
    setMessage(null);
    try {
      const payload: ChangePasswordData = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      };
      await authApi.changePassword(payload);
      setMessage({ type: 'success', text: 'Senha alterada com sucesso.' });
      passwordForm.reset();
    } catch (e) {
      setMessage({ type: 'error', text: e instanceof Error ? e.message : 'Erro ao alterar senha.' });
    } finally {
      setPasswordSaving(false);
    }
  }

  const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Input> & { label: string; error?: string }
>(({ id, label, placeholder, error, ...props }, ref) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <Label htmlFor={id}>{label}</Label>
      <Input
        ref={ref}
        id={id}
        type={visible ? 'text' : 'password'}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={cn('mt-1', error && 'border-destructive focus-visible:ring-destructive')}
        {...props}
      />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
          aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
        >
          {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
        {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </div>
    );
  });
  PasswordInput.displayName = 'PasswordInput';

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-semibold text-xl">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <User className="h-5 w-5" />
            </span>
            <span>Evereste</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <Avatar className="h-10 w-10">
              <AvatarFallback>{user?.initials || getInitials(user?.name || '')}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-muted-foreground">Configurações</p>
          <h1 className="text-3xl font-bold tracking-tight">Perfil</h1>
          <p className="mt-2 text-muted-foreground">Gerencie suas informações pessoais e segurança.</p>
        </div>

        {message && (
          <Alert variant={message.type === 'success' ? 'default' : 'destructive'} className="mb-6">
            {message.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertTitle>{message.type === 'success' ? 'Sucesso' : 'Erro'}</AlertTitle>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informações pessoais
            </CardTitle>
            <CardDescription>Atualize seu nome e e-mail de acesso.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Nome completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    className="pl-10"
                    {...profileForm.register('name')}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    {...profileForm.register('email')}
                  />
                </div>
              </div>
              <Button type="submit" disabled={profileSaving} className="w-full sm:w-auto">
                {profileSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar alterações
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Alterar senha
            </CardTitle>
            <CardDescription>Atualize sua senha para manter a conta segura.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <PasswordInput
                  id="currentPassword"
                  label="Senha atual"
                  placeholder="••••••••"
                  error={passwordForm.formState.errors.currentPassword?.message}
                  {...passwordForm.register('currentPassword')}
                />
              </div>
              <div className="space-y-1.5">
                <PasswordInput
                  id="newPassword"
                  label="Nova senha"
                  placeholder="••••••••"
                  error={passwordForm.formState.errors.newPassword?.message}
                  {...passwordForm.register('newPassword')}
                />
              </div>
              <div className="space-y-1.5">
                <PasswordInput
                  id="confirmPassword"
                  label="Confirmar nova senha"
                  placeholder="••••••••"
                  error={passwordForm.formState.errors.confirmPassword?.message}
                  {...passwordForm.register('confirmPassword')}
                />
              </div>
              <Button type="submit" variant="outline" disabled={passwordSaving} className="w-full sm:w-auto">
                {passwordSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Alterando...
                  </>
                ) : (
                  'Alterar senha'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return <ProtectedRoute><ProfileContent /></ProtectedRoute>;
}