# FinShield

[finshield.com.br](https://finshield.com.br/)

Backend serverless orientado a APIs para orquestração, execução e exposição de experimentos e inferências de modelos aplicados a dados financeiros.

Foco arquitetural: baixo custo operacional, escalabilidade horizontal e governança técnica (versionamento de banco, CI/CD, testes e observabilidade).

**Stack base**

- Arquitetura serverless orientada a APIs
- Modelagem de domínio explícita
- Design REST versionado
- Migrations versionadas
- Testes de integração (TDD-oriented)
- CI/CD automatizado
- Docker + linting + hooks
- Configuração via variáveis de ambiente

---

# Arquitetura e princípios

Este projeto segue premissas de engenharia orientadas a produção:

- **API-First**: contratos REST explícitos e versionados
- **Domínio isolado**: lógica de negócio encapsulada por módulo
- **Infra desacoplada**: deploy e runtime independentes da aplicação
- **Serverless-cost mindset**: execução sob demanda e baixo custo
- **Reprodutibilidade**: migrations + config por env
- **Qualidade automatizada**: lint + testes + hooks + CI

Objetivo: permitir evolução rápida sem gerar dívida técnica estrutural.

---

# Estrutura de diretórios

```
src
├── components     # Componentes globais reutilizáveis
├── layout         # Wrappers estruturais de páginas/componentes
├── hooks          # Hooks globais
├── contexts       # Contextos de estado global
├── modules        # Domínio por módulo (feature-based)
│   └── example-module
│       ├── index.ts/js      # Entry point do módulo
│       ├── hooks            # Hooks exclusivos do módulo
│       ├── components       # Componentes do módulo
│       ├── service          # Lógica de negócio e integrações internas
│       └── utils            # Utilidades internas do módulo
├── pages          # Rotas/páginas → orquestram módulos
├── services       # Integração externa / backend
├── shared         # Configurações e assets compartilhados
└── utils          # Utilidades globais
```

### Racional estrutural

- **modules** = bounded contexts funcionais
- **services** = boundary externo
- **shared** = cross-cutting concerns
- **pages** = camada de orquestração

Evita spaghetti e acoplamento entre features.

---

# Setup local de desenvolvimento

Pré-requisitos:

- Node via NVM
- Editor com suporte a EditorConfig
- Prettier configurado

## Instalação

```bash
nvm install
npm install
```

## Execução local

```bash
npm run dev
```

---

# Padronização de código

Obrigatório:

- suporte a [`.editorconfig`](https://editorconfig.org/)
- Prettier como formatter default
- ESLint ativo
- Husky + hooks de commit

Isso garante:

- consistência de estilo
- commits auditáveis
- menor ruído em PR

---

# Configuração de ambiente

Variáveis sensíveis devem ser configuradas via `.env`.

Nunca commitar:

```
.env.production
.env.local
```

Utilize:

```
.env.example
```

---

# CI/CD e qualidade

Pipeline automatiza:

- lint
- testes
- validação de build
- hooks de segurança
- deploy

Commits fora do padrão são bloqueados por hooks locais.

---

# Testes

Testes de integração orientados a TDD.

Executar:

```bash
npm test
```

Objetivo:

- garantir contratos de API
- evitar regressões
- validar integrações

---

# Filosofia do projeto

FinShield não é apenas um backend.

É um **laboratório de arquitetura serverless para aplicações financeiras orientadas a dados e ML**, com foco em:

- automação de experimentos
- inferência de modelos
- exposição via APIs versionadas
- baixo custo de execução
- escalabilidade real

---

## Estrutura de pastas

```md
src
├── components # Componentes globais de uso geral do projeto.
├── layout # Wrappers padrões para componentes ou páginas.
├── hooks # Hooks globais de uso geral do projeto.
├── contexts # Contexts para gerenciamento de estado global do projeto.
├── modules # Módulos. Um para cada página, com a lógica de negócio.
│ └── example-module
│ ├── index.js/ts # Ponto de partida desse módulo. Esse arquivo será importado na página pertinente.
│ ├── hooks # Hooks globais de uso exclusivo desse módulo.
│ ├── components # Componentes de uso exclusivo desse módulo.
│ ├── service # Funções e lógicas de utilização geral e genérica de uso exclusivo desse módulo.
│ └── utils # Componentes de uso exclusivo desse módulo.
├── pages # Cada página associada com uma rota e um módulo.
├── services # Lógica de comunicação com o backend.
├── shared # Tudo que for compartilhável entre módulos. Sendo configuração de temas, etc.
└── utils # Funções e lógicas de utilização geral e genérica.
```

# Roadmap técnico (sugerido)

- Observabilidade estruturada
- Secret scanning e security gates
- Contract testing de APIs
- Versionamento semântico de endpoints
- Feature flags
- Telemetria e métricas de custo
