# Guia Didático de Instalação e Configuração — Everest Auth

> Passo a passo completo para configurar, instalar dependências e rodar o projeto de autenticação modular.

---

## 📋 Pré-requisitos

| Ferramenta | Versão Mínima | Verificação |
|------------|---------------|-------------|
| **Node.js** | 18.17+ | `node --version` |
| **npm** | 9.0+ | `npm --version` |
| **Git** | 2.0+ | `git --version` |

> **Dica:** Use [fnm](https://github.com/Schniz/fnm) ou [nvm](https://github.com/nvm-sh/nvm) para gerenciar versões do Node.js.

### Verificar ambiente atual
```bash
node --version   # Deve ser >= 18.17
npm --version    # Deve ser >= 9.0
```

---

## 🚀 Instalação Rápida (TL;DR)

```bash
# 1. Clone o repositório (se aplicável)
git clone <url-do-repo>
cd everest

# 2. Instale dependências
npm install

# 3. Rode em desenvolvimento
npm run dev

# 4. Abra http://localhost:3000
```

---

## 🔧 Instalação Detalhada (Passo a Passo)

### 1. Preparar o Ambiente

#### Windows (PowerShell)
```powershell
# Verificar se Node.js está instalado
node --version

# Se não tiver, instale via winget ou baixe do site oficial
winget install OpenJS.NodeJS
```

#### Linux/macOS (bash/zsh)
```bash
# Via nvm (recomendado)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20

# Ou via gerenciador de pacotes
# Ubuntu/Debian: sudo apt install nodejs npm
# macOS: brew install node
```

---

### 2. Clonar e Entrar no Projeto

```bash
# Se for repositório Git
git clone https://github.com/seu-usuario/everest.git
cd everest

# Ou se já tem a pasta baixada
cd C:\Users\josee\Downloads\everest  # Windows
cd ~/Downloads/everest               # Linux/macOS
```

---

### 3. Instalar Dependências

```bash
npm install
```

**O que acontece:**
- Lê `package.json` e `package-lock.json`
- Baixa todas as dependências para `node_modules/`
- Gera `.next/` apenas no build

**Saída esperada:**
```text
added 450 packages in 30s
156 packages are looking for funding
  run `npm fund` for details
```

> **Nota:** O `package-lock.json` garante builds reproduzíveis. **Comite este arquivo!**

---

### 4. Variáveis de Ambiente

O projeto já inclui dois arquivos de configuração:

```bash
# .env.local (configuração local - IGNORADO pelo Git)
# Já criado com configuração padrão para mock API

# .env.example (template para documentação)
# Copie para .env.local se precisar customizar
```

**Conteúdo do `.env.local` (padrão):**
```bash
# Everest Auth - Local Development Environment
# Este arquivo é ignorado pelo Git (.gitignore)

# ==========================================
# API Configuration
# ==========================================
# Deixe vazio para usar mock API interno (lib/api.ts)
# Quando tiver backend real, descomente e configure:
# NEXT_PUBLIC_API_URL=http://localhost:4000/api

# ==========================================
# Authentication (apenas para backend real)
# ==========================================
# JWT_SECRET=dev-secret-change-in-production
# JWT_EXPIRES_IN=3600
# REFRESH_TOKEN_EXPIRES_IN=30

# ==========================================
# Development
# ==========================================
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
```

> **Atualmente:** O projeto roda **100% frontend** (mock API via `lib/api.ts`). Variáveis não são obrigatórias para desenvolvimento. Configure `NEXT_PUBLIC_API_URL` quando tiver backend real.

---

### 5. Rodar em Desenvolvimento

```bash
npm run dev
```

**Saída esperada:**
```text
▲ Next.js 14.2.5
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Starting...
✓ Ready in 2.3s
```

**Acesse:** http://localhost:3000 → Redireciona automaticamente para `/login`

---

### 6. Build de Produção

```bash
# Gera build otimizado em .next/
npm run build

# Testa build localmente
npm run start
```

**Saída do build:**
```text
▲ Next.js 14.2.5
   Creating an optimized production build ...
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (9/9)
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    137 B          87.3 kB
├ ○ /_not-found                          871 B            88 kB
├ ○ /dashboard                           5.06 kB         102 kB
├ ○ /forgot-password                     4.06 kB         133 kB
├ ○ /login                               5.46 kB         134 kB
├ ○ /profile                             7.45 kB         129 kB
└ ○ /register                            4.96 kB         134 kB
+ First Load JS shared by all            87.1 kB
```

---

## ⚙️ Configurações do Projeto (Arquivos-chave)

### `package.json` — Dependências e Scripts

```json
{
  "name": "everest-auth",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",           // Desenvolvimento (hot reload)
    "build": "next build",       // Build produção
    "start": "next start",       // Servidor produção
    "lint": "next lint"          // ESLint
  },
  "dependencies": {
    // Framework
    "next": "14.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    // Forms & Validation
    "react-hook-form": "^7.52.1",
    "@hookform/resolvers": "^3.9.0",
    "zod": "^3.23.8",
    // UI & Styling (Radix UI + Tailwind)
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-dropdown-menu": "^2.1.1",
    "@radix-ui/react-avatar": "^1.1.0",
    "@radix-ui/react-toast": "^1.2.1",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.0",
    "@radix-ui/react-tooltip": "^1.1.2",
    "@radix-ui/react-popover": "^1.1.1",
    "@radix-ui/react-checkbox": "^1.1.1",
    "@radix-ui/react-switch": "^1.1.0",
    "@radix-ui/react-select": "^2.1.1",
    "@radix-ui/react-dialog": "^1.1.1",
    "@radix-ui/react-alert-dialog": "^1.1.1",
    "@radix-ui/react-navigation-menu": "^1.2.0",
    "lucide-react": "^0.408.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.4.0",
    "class-variance-authority": "^0.7.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "typescript": "^5.5.4",
    "@types/node": "^20.14.12",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "tailwindcss": "^3.4.7",
    "postcss": "^8.4.40",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-config-next": "14.2.5"
  }
}
```

**Pontos de atenção:**
- ✅ `next: "14.2.5"` — Next.js 14 (LTS estável)
- ✅ `react: "^18.3.1"` — React 18 (compatível com Next.js 14)
- ✅ `typescript: "^5.5.4"` — TypeScript 5
- ✅ Radix UI primitives para acessibilidade
- ✅ Tailwind CSS v3 (estável, bem documentado)

---

### `tsconfig.json` — TypeScript Strict Mode

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Por que `strict: true`?**
- Previne bugs comuns (null checks, tipo implícito `any`, etc.)
- Melhora autocomplete no IDE
- Obrigatório para código robusto

---

### `next.config.js` — Next.js Config

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

module.exports = nextConfig;
```

---

### `tailwind.config.js` — Tailwind CSS v3 Config

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
```

---

### `postcss.config.js` — PostCSS Config

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

### `globals.css` — Design System (CSS Variables + Tailwind)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
    --font-sans: 'Inter', system-ui, sans-serif;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground antialiased;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
  html {
    scroll-behavior: smooth;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

@layer components {
  .container-main {
    @apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
  }
  .page-section {
    @apply py-12 sm:py-16 lg:py-20;
  }
  .card-hover {
    @apply transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5;
  }
  .input-error {
    @apply border-destructive focus-visible:ring-destructive;
  }
}
```

**Conceitos-chave:**
| Conceito | Explicação |
|----------|------------|
| **CSS Variables (HSL)** | Temas dinâmicos sem rebuild (troca `.dark` class) |
| **@layer base/components/utilities** | Organização CSS (Tailwind v3) |
| **Dark mode** | Via `.dark` class no `<html>` ou `prefers-color-scheme` |
| **OKLCH não usado** | HSL é mais compatível e bem suportado |

---

## 🎨 Sistema de Design (Tokens)

### Cores (HSL via CSS Variables)
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

## 📚 Recursos de Aprendizado

| Tópico | Link |
|--------|------|
| Next.js 14 App Router | https://nextjs.org/docs/app |
| React 18 | https://react.dev |
| Tailwind CSS v3 | https://tailwindcss.com/docs |
| Radix UI Primitives | https://www.radix-ui.com |
| TypeScript Strict | https://www.typescriptlang.org/tsconfig#strict |
| Zod Validation | https://zod.dev |
| React Hook Form | https://react-hook-form.com |
| Lucide Icons | https://lucide.dev |

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
*Gerador: Documentação didática para onboarding de desenvolvedores*