# Elephens — Landing Page

![Elephens logo](/Elephens.png)

Site institucional da **Elephens**, empresa especializada em modernização de sistemas legados e desenvolvimento web para pequenas e médias empresas brasileiras.

## Stack

- **[Next.js 16](https://nextjs.org)** — framework React com App Router
- **[React 19](https://react.dev)** — biblioteca de UI
- **[Tailwind CSS v4.2](https://tailwindcss.com)** — estilização utilitária
- **[Framer Motion](https://www.framer.com/motion/)** — animações
- **[React Icons](https://react-icons.github.io/react-icons/)** — ícones
- **TypeScript** — tipagem estática

## Seções da página

| Componente | Descrição |
|---|---|
| `Header` | Navegação fixa com menu mobile e link para WhatsApp |
| `HeroSection` | Chamada principal com badges e CTA |
| `ShowcaseSection` | Vitrine de projetos/casos de uso |
| `ComparisonSection` | Comparativo antes/depois |
| `ContrastSection` | Diferenciais da Elephens |
| `ServicesSection` | Serviços: Modernização, Dashboards, Automação, Suporte |
| `LocalSection` | Atendimento regional |
| `ProofSection` | Depoimentos e provas sociais |
| `CTASection` | Chamada de ação final |
| `Footer` | Rodapé com links |

---

Sobre a marca: **Elephens** é a nova identidade da empresa — um símbolo que representa força, memória e confiança. O site demonstra como transformamos sistemas legados em experiências modernas e rápidas.

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev       # Servidor de desenvolvimento
npm run build     # Build de produção
npm run start     # Servidor de produção
npm run lint      # Lint com ESLint
```

## Deploy

O projeto está configurado para deploy na [Vercel](https://vercel.com). Basta conectar o repositório e o deploy é automático a cada push na branch `main`.

Consulte a [documentação de deploy do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.
