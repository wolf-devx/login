# Estrutura Completa de Diretórios do Projeto Everest

> Documentação didática da arquitetura de pastas e arquivos do projeto de autenticação frontend modular.

---

## 📁 Visão Geral da Raiz do Projeto

```
everest/
├── app/                    # Next.js 14 App Router (rotas e páginas)
├── components/             # Componentes UI reutilizáveis (Radix UI + shadcn/ui style)
├── docs/                   # Documentação do projeto
├── hooks/                  # Hooks customizados globais
│   └── use-toast.ts        # Toast system (toast, useToast hook)
│   └── use-is-hydrated.ts  # Hydration utility (Radix UI)
├── lib/                    # Utilitários, tipos, API client
│   ├── secure-storage.ts   # Token storage via cookies seguros (simulando httpOnly)
│   ├── csrf.ts             # CSRF token generation e validação (double-submit cookie)
│   ├── api-validation.ts   # Middleware de validação CSRF para API routes
│   ├── validation.ts       # Validação de senha (8+ chars, upper, lower, number, special)
│   ├── rate-limit.ts       # Rate limiting (5 requests/min por chave)
│   └── utils.ts            # Funções utilitárias (cn, formatDate, getInitials, debounce, etc.)
├── hooks/                  # Hooks customizados globais
├── public/                 # Assets estáticos (imagens, ícones, favicons)
├── .env.example            # Template de variáveis de ambiente
├── .env.local              # Configuração local (ignorado pelo Git)
├── .gitignore              # Arquivos ignorados pelo Git
├── components.json         # Configuração de componentes (shadcn/ui)
├── next.config.js          # Configuração do Next.js
├── package.json            # Dependências e scripts do projeto
├── package-lock.json       # Lockfile do npm
├── postcss.config.js       # Configuração do PostCSS (Tailwind CSS)
├── tailwind.config.js      # Configuração do Tailwind CSS
└── tsconfig.json           # Configuração do TypeScript
```

---

## 📂 Detalhamento por Diretório

### `/app` — App Router do Next.js 14+

```
app/
├── globals.css             # Estilos globais + Tailwind CSS + CSS variables
├── layout.tsx              # Layout raiz (providers, metadata, viewport, Navigation, Footer)
├── page.tsx                # Página inicial (redireciona para /login)
├── login/                  # Rota pública - Login
│   └── page.tsx            # Página de login com formulário completo
├── register/               # Rota pública - Cadastro
│   └── page.tsx            # Página de cadastro com validação
├── forgot-password/        # Rota pública - Recuperação de senha
│   └── page.tsx            # Página de forgot password
├── dashboard/              # Rota protegida - Dashboard do usuário
│   └── page.tsx            # Página do dashboard com ProtectedRoute
├── profile/                # Rota protegida - Perfil do usuário
│   └── page.tsx            # Página de perfil (dados + alterar senha)
└── api/                    # API Routes (mock backend)
    └── auth/
        ├── login/route.ts
        ├── register/route.ts
        ├── forgot-password/route.ts
        ├── reset-password/route.ts
        ├── refresh/route.ts
        ├── logout/route.ts
        ├── me/route.ts
        ├── profile/route.ts
        └── change-password/route.ts
```

**Conceitos-chave:**
- **App Router**: Roteamento baseado em pastas (file-system routing)
- **Server Components por padrão**: Páginas são Server Components a menos que usem `'use client'`
- **Layouts aninhados**: `layout.tsx` envolve todas as páginas filhas
- **Route Handlers**: `route.ts` para API endpoints (mock backend)

---

### `/components` — Componentes UI e Layout

```
components/
├── ui/                     # Componentes base (Radix UI primitives)
│   ├── alert.tsx           # Alert com variantes (default, destructive, success, warning)
│   ├── avatar.tsx          # Avatar com Image e Fallback
│   ├── button.tsx          # Botão com variantes (default, destructive, outline, secondary, ghost, link, success)
│   ├── card.tsx            # Card com Header, Content, Description, Title, Footer
│   ├── dropdown-menu.tsx   # Dropdown Menu completo com submenus, checkbox, radio
│   ├── input.tsx           # Input estilizado com estados de erro/foco
│   ├── label.tsx           # Label acessível para formulários
│   ├── separator.tsx       # Separador horizontal/vertical
│   ├── toast.tsx           # Toast notifications (Radix UI Toast)
│   ├── toaster.tsx         # Toaster provider + viewport
│   ├── password-input.tsx  # Input de senha com toggle mostrar/ocultar (compartilhado)
│   └── index.ts            # Barrel export de todos os componentes UI
├── layout/                 # Componentes de layout da aplicação
│   ├── navigation.tsx      # Header/Navbar com logo, nav links, user dropdown com CSRF
│   └── footer.tsx          # Footer com links, social, copyright
├── middleware.ts           # Next.js middleware para proteção de rotas server-side
└── index.ts                # (opcional) barrel export
```

**Tecnologias:**
- **Radix UI Primitives**: Componentes acessíveis, não estilizados
- **Tailwind CSS**: Estilização via utility classes
- **class-variance-authority**: Variantes de componentes tipadas
- **clsx + tailwind-merge**: Merge inteligente de classes

---

### `/hooks` — Hooks Customizados Globais

```
hooks/
├── use-auth.tsx            # AuthProvider + useAuth hook (estado global de autenticação)
├── use-protected-route.tsx # ProtectedRoute component (guard para rotas autenticadas)
├── use-toast.ts            # Toast system (toast, useToast hook)
└── index.ts                # Barrel export de todos os hooks
```

**Responsabilidades:**
- `useAuth`: Login, register, logout, updateProfile, refreshUser, estado de loading
- `ProtectedRoute`: Redirect para /login se não autenticado, loading state
- `useToast`: Sistema de notificações (success, error, default)

---

### `/lib` — Utilitários, Tipos e API Client

```
lib/
├── utils.ts                # Funções utilitárias (cn, formatDate, getInitials, debounce, etc.)
├── auth.ts                 # Tipos TypeScript do domínio de autenticação (interfaces)
├── api.ts                  # API client (authApi, token management, request helper)
├── index.ts                # Barrel export (utils + auth types + api exports)
```

**Conteúdo principal:**

| Arquivo | Responsabilidade |
|---------|------------------|
| `utils.ts` | `cn()` (clsx + tailwind-merge), formatação de datas, inicials, debounce, truncate |
| `auth.ts` | Interfaces: User, LoginCredentials, RegisterData, ForgotPasswordData, ResetPasswordData, AuthResponse, ApiError, ChangePasswordData, UpdateProfileData |
| `api.ts` | `authApi` (login, register, forgotPassword, resetPassword, refreshToken, getMe, logout, updateProfile, changePassword), token storage (localStorage), `ApiError` class, request helper |

---

### `/public` — Assets Estáticos

```
public/
├── favicon.ico             # Favicon (copiado de icon.svg)
├── icon.svg                # Favicon principal (SVG)
├── icon-light-32x32.png    # Favicon light mode 32x32
├── icon-dark-32x32.png     # Favicon dark mode 32x32
├── apple-icon.png          # Apple touch icon
├── placeholder-logo.png    # Logo placeholder (PNG)
├── placeholder-logo.svg    # Logo placeholder (SVG)
├── placeholder-user.jpg    # Avatar placeholder usuário
└── placeholder.jpg         # Imagem placeholder genérica
```

**Acesso:** Referenciados como `/icon.svg`, `/placeholder-logo.png`, etc.

---

## 🔗 Mapeamento de Aliases (tsconfig.json)

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**Exemplos de import:**
```tsx
import { Button } from '@/components/ui/button'      // components/ui/button.tsx
import { useAuth } from '@/hooks/use-auth'           // hooks/use-auth.tsx
import { authApi } from '@/lib/api'                  // lib/api.ts
import { cn, formatDate } from '@/lib/utils'         // lib/utils.ts
import { User, LoginCredentials } from '@/lib/auth'  // lib/auth.ts (via lib/index.ts)
```

---

## 📋 Resumo de Responsabilidades

| Caminho | Tipo | Contém |
|---------|------|--------|
| `app/` | Roteamento | Pages, Layouts, API Routes, Globals CSS |
| `components/ui/` | UI Kit | Radix UI primitives estilizados |
| `components/layout/` | Layout | Navigation, Footer |
| `hooks/` | State/Logic | useAuth, ProtectedRoute, useToast |
| `lib/utils` | Utils | Helpers puros (cn, formatDate, etc.) |
| `lib/auth` | Types | Interfaces TypeScript do domínio auth |
| `lib/api` | API | Client HTTP, token management, error handling |
| `public/` | Static Assets | Images, Icons, Favicons |

---

## 🎯 Padrões de Nomenclatura

| Tipo | Convenção | Exemplo |
|------|-----------|---------|
| Pastas | kebab-case | `forgot-password`, `dropdown-menu` |
| Arquivos TSX (componentes) | kebab-case | `navigation.tsx`, `use-auth.tsx` |
| Arquivos TS (utilitários/tipos) | kebab-case | `auth.ts`, `utils.ts`, `api.ts` |
| Componentes React | PascalCase | `Button`, `AuthProvider`, `Navigation` |
| Hooks | camelCase com `use` | `useAuth`, `useToast`, `useProtectedRoute` |
| Tipos/Interfaces | PascalCase | `User`, `LoginCredentials`, `AuthResponse` |
| Funções utilitárias | camelCase | `cn`, `formatDate`, `getInitials` |
| Constantes | camelCase | `authApi`, `API_BASE` |

---

## 🔐 Fluxo de Autenticação (Como funciona)

### 1. Páginas Públicas (Sem Proteção)
```
/login           → LoginForm com validação Zod + React Hook Form
/register        → RegisterForm com validação (confirmPassword)
/forgot-password → ForgotPasswordForm (envia e-mail de recuperação)
```

### 2. Páginas Protegidas (Com ProtectedRoute)
```
/dashboard       → ProtectedRoute → DashboardContent (stats, atividade, segurança)
/profile         → ProtectedRoute → ProfileContent (dados pessoais, alterar senha)
```

### 3. AuthProvider (Contexto Global - hooks/use-auth.tsx)
```tsx
// app/layout.tsx
<AuthProvider>{children}</AuthProvider>

// hooks/use-auth.tsx
- loadUser() no mount (via authApi.getMe())
- login() → authApi.login() → setUser() + tokens no localStorage
- register() → authApi.register() → setUser() + tokens no localStorage
- logout() → authApi.logout() → clearTokens() + setUser(null)
- updateProfile() → authApi.updateProfile() → setUser()
- refreshUser() → recarrega usuário via authApi.getMe()
```

### 4. ProtectedRoute (Guard - hooks/use-protected-route.tsx)
```tsx
useEffect(() => {
  if (!isLoading && !isAuthenticated) router.replace('/login')
}, [isAuthenticated, isLoading, router])

if (isLoading || !isAuthenticated) return <Loading />
return children
```

### 5. API Client (lib/api.ts)
```typescript
// Base URL configurável via NEXT_PUBLIC_API_URL
const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api'

// Token management via localStorage
- access_token / refresh_token
- Auto-attach Authorization header
- Credentials: include (para cookies HttpOnly se necessário)

// Endpoints esperados no backend:
POST   /api/auth/login           → { user, accessToken, refreshToken, expiresIn }
POST   /api/auth/register        → { user, accessToken, refreshToken, expiresIn }
POST   /api/auth/forgot-password → { message }
POST   /api/auth/reset-password  → { message }
POST   /api/auth/refresh         → { accessToken, refreshToken, expiresIn }
GET    /api/auth/me              → User | 401
POST   /api/auth/logout          → 204
PATCH  /api/auth/profile         → User
POST   /api/auth/change-password → { message }
```

---

## 🎨 Sistema de Design (Tokens)

### Cores (CSS Variables - HSL)
| Token | Light | Dark | Uso |
|-------|-------|------|-----|
| `--background` | `0 0% 100%` | `222.2 84% 4.9%` | Fundo principal |
| `--foreground` | `222.2 84% 4.9%` | `210 40% 98%` | Texto principal |
| `--primary` | `221.2 83.2% 53.3%` | `217.2 91.2% 59.8%` | Botões, links, foco |
| `--secondary` | `210 40% 96.1%` | `217.2 32.6% 17.5%` | Elementos secundários |
| `--muted` | `210 40% 96.1%` | `217.2 32.6% 17.5%` | Texto desabilitado/sutil |
| `--accent` | `210 40% 96.1%` | `217.2 32.6% 17.5%` | Hover, destaque |
| `--destructive` | `0 84.2% 60.2%` | `0 62.8% 30.6%` | Erros, ações perigosas |
| `--border` | `214.3 31.8% 91.4%` | `217.2 32.6% 17.5%` | Bordas |
| `--ring` | `221.2 83.2% 53.3%` | `224.3 76.3% 48%` | Focus ring |

### Border Radius
| Token | Valor | Uso |
|-------|-------|-----|
| `--radius` | `0.5rem` (8px) | Base |
| `lg` | `var(--radius)` | 8px |
| `md` | `calc(var(--radius) - 2px)` | 6px |
| `sm` | `calc(var(--radius) - 4px)` | 4px |

---

## 🛠️ Comandos Úteis no Dia a Dia

### Desenvolvimento
```bash
npm run dev              # Servidor dev (hot reload)
npm run dev -- -p 3001   # Porta customizada
```

### Qualidade de Código
```bash
npm run lint             # ESLint (Next.js config)
npx tsc --noEmit         # Type check apenas
```

### Build & Deploy
```bash
npm run build            # Build produção
npm run start            # Servidor produção local
npm run build && npm run start  # Testa build completo
```

### Dependências
```bash
npm install              # Instala dependências
npm add <package>        # Adiciona dependência produção
npm add -D <package>     # Adiciona dependência desenvolvimento
npm update               # Atualiza todas
npm outdated             # Ver dependências desatualizadas
```

### Limpeza
```bash
rm -rf node_modules package-lock.json .next
npm install              # Reinstala tudo limpo
```

---

## 🐛 Troubleshooting Comum

### Erro: "Module not found: @/components/..."
- Verifique `tsconfig.json` → `paths`: `"@/*": ["./*"]`
- Reinicie o servidor TS: `Ctrl+Shift+P` → "TypeScript: Restart TS Server" (VS Code)

### Erro: Tailwind classes não funcionam
- Verifique `app/globals.css` tem `@tailwind base; @tailwind components; @tailwind utilities;`
- Verifique `tailwind.config.js` tem `content` apontando para `./app/**/*`, `./components/**/*`, `./hooks/**/*`, `./lib/**/*`
- Reinicie `npm run dev`

### Erro: "useAuth deve ser usado dentro de AuthProvider"
- Componente deve ser descendente de `<AuthProvider>` (em `app/layout.tsx`)
- Verifique se a página usa `'use client'` (Client Component)

### Build falha com erros TypeScript
- Execute `npx tsc --noEmit` para ver erros detalhados
- Corrija os tipos antes de fazer build

---

## 📦 Deploy (Vercel - Recomendado)

```bash
# 1. Instale Vercel CLI
npm add -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod
```

**Configurações automáticas na Vercel:**
- Detecta Next.js
- Build command: `npm run build`
- Output: `.next`
- Install: `npm install`

---

## 🔄 Migração para Backend Real (Próximos Passos)

### 1. Configurar variável de ambiente
```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.seudominio.com
```

### 2. Backend deve implementar os endpoints listados em `/lib/api.ts`

### 3. Para cookies HttpOnly (mais seguro):
```typescript
// Em lib/api.ts, alterar credentials para 'include'
// Remover localStorage tokens
// Usar cookies seguros no backend (SameSite=Lax, Secure, HttpOnly)
```

### 4. Adicionar Refresh Token Interceptor (opcional)
```typescript
// Em lib/api.ts, no request helper:
// Se 401 e não é endpoint de auth → tentar refreshToken → retry request
```

---

## ✅ Checklist de Verificação Pós-Instalação

- [ ] `npm install` roda sem erros
- [ ] `npm run dev` inicia em http://localhost:3000
- [ ] Página redireciona para `/login`
- [ ] Login com credenciais válidas funciona (integração com backend)
- [ ] Dashboard carrega com dados do usuário
- [ ] Profile page permite editar nome/e-mail
- [ ] Profile page permite alterar senha
- [ ] Logout redireciona para `/login`
- [ ] Dark mode funciona (toggle no sistema ou `.dark` class)
- [ ] `npm run build` completa sem erros
- [ ] `npm run start` serve build de produção
- [ ] `npm run lint` passa sem erros

---

*Documentação gerada em: 2026-10-06*
*Projeto: Everest Auth Module*
*Versão: 1.0.0*
*Arquitetura: Next.js 14 App Router + Radix UI + Tailwind CSS v3 + TypeScript*