# Smart Catalog

Smart Catalog e uma aplicacao web para criacao e uso de catalogos digitais. O projeto entrega uma experiencia de vitrine para clientes finais, com listagem de produtos, carrinho, pedidos e informacoes do catalogo, alem de uma area administrativa para gerenciamento dos produtos.

## O que o projeto faz

A aplicacao e dividida em duas areas principais:

- Catalogo de produtos: pagina publica por catalogo, listagem de produtos, detalhes do produto, carrinho, checkout, pedidos do usuario, pagina sobre e contato.
- Administracao: painel administrativo com paginas para produtos, lista de produtos e configuracoes.

O fluxo do cliente permite navegar pelos produtos de um catalogo, adicionar itens ao carrinho, escolher dados de entrega/pagamento e acompanhar pedidos. A aplicacao tambem possui autenticacao, contexto de carrinho, integracao com API HTTP e componentes reutilizaveis de interface.

## Tecnologias usadas

- React 19
- React Router 7
- TypeScript
- Vite
- Tailwind CSS
- TanStack React Query
- Axios
- React Hook Form
- Yup
- Lucide React
- React Toastify
- Docker

## Estrutura geral

- `app/`: configuracao de rotas e arquivos raiz do React Router.
- `src/pages/`: paginas de produto, carrinho, pedidos, contato, home e administracao.
- `src/components/`: componentes reutilizaveis de layout, UI, modais, cards e detalhes de produto.
- `src/context/`: contextos de autenticacao, carrinho e catalogo.
- `src/services/`: servicos de comunicacao com a API.
- `src/http/`: cliente HTTP baseado em Axios.
- `src/utils/`: utilitarios de formatacao, datas, mascaras e helpers.

## Requisitos

- Node.js 20 ou superior
- npm

## Configuracao

Crie um arquivo `.env` na raiz do projeto com a URL da API:

```bash
VITE_API_URL=http://localhost:3000
```

A URL deve apontar para o backend usado pelos servicos de produtos, usuarios, autenticacao, pagamentos, catalogos e pedidos.

## Instalacao

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Por padrao, a aplicacao fica disponivel em:

```bash
http://localhost:5173
```

## Verificacao de tipos

```bash
npm run typecheck
```

Esse comando gera os tipos do React Router e executa o TypeScript.

## Build de producao

```bash
npm run build
```

## Execucao em producao

Depois do build:

```bash
npm run start
```

## Docker

Para construir a imagem:

```bash
docker build -t smart-catalog .
```

Para executar o container:

```bash
docker run -p 3000:3000 smart-catalog
```

## Scripts disponiveis

- `npm run dev`: inicia o servidor de desenvolvimento.
- `npm run build`: gera a build de producao.
- `npm run start`: executa a aplicacao buildada.
- `npm run typecheck`: valida os tipos do projeto.
