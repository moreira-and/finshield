# finshield

Implementação do https://www.tabnews.com.br voltado a financeças para o https://curso.dev

[Domínio .com.br](https://finshield.com.br/)

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

## DEV - Notes

file .%rc -> % run command

```bash
nvm install
npm install
npm run dev
```

garanta que seu editor está suportando o ['editorconfig'](https://editorconfig.org/).

Configure o formatador padrão com prettier
