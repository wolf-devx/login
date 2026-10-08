'use client';

import Link from 'next/link';
import { Mountain, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    produto: [
      { label: 'Funcionalidades', href: '/features' },
      { label: 'Preços', href: '/pricing' },
      { label: 'Documentação', href: '/docs' },
      { label: 'Changelog', href: '/changelog' },
    ],
    empresa: [
      { label: 'Sobre nós', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Carreiras', href: '/careers' },
      { label: 'Contato', href: '/contact' },
    ],
    legal: [
      { label: 'Privacidade', href: '/privacy' },
      { label: 'Termos', href: '/terms' },
      { label: 'Cookies', href: '/cookies' },
      { label: 'Segurança', href: '/security' },
    ],
    recursos: [
      { label: 'Comunidade', href: '/community' },
      { label: 'Suporte', href: '/support' },
      { label: 'Status', href: '/status' },
      { label: 'API', href: '/api-docs' },
    ],
  };

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com', icon: Github },
    { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
    { label: 'Email', href: 'mailto:contato@evereste.com', icon: Mail },
  ];

  return (
    <footer className="border-t bg-muted/30" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2 font-semibold text-xl" aria-label="Evereste - Página inicial">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Mountain className="h-5 w-5" />
              </span>
              <span>Evereste</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Uma base modular para autenticação que cresce com o seu produto.
              Simples, seguro e pronto para produção.
            </p>
            <div className="flex gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold">Produto</h3>
                <ul className="mt-4 space-y-3" role="list">
                  {footerLinks.produto.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold">Empresa</h3>
                <ul className="mt-4 space-y-3" role="list">
                  {footerLinks.empresa.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold">Legal</h3>
                <ul className="mt-4 space-y-3" role="list">
                  {footerLinks.legal.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold">Recursos</h3>
                <ul className="mt-4 space-y-3" role="list">
                  {footerLinks.recursos.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <p className="text-xs text-muted-foreground text-center">
            © {currentYear} Evereste. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}