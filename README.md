# Live Maps

Aplicação web em tempo real onde vários utilizadores partilham a sua localização num mapa interativo.

## Como executar

### Servidor

```bash
cd server
npm install
npm run dev
```

### Cliente

```bash
cd client
npm install
npm run dev
```

Abra `http://localhost:5173` no browser e permita o acesso à localização.

## Variáveis de ambiente

### Servidor (`server/.env`)

| Variável     | Padrão                  | Descrição           |
| ------------ | ----------------------- | ------------------- |
| `PORT`       | `3001`                  | Porta do servidor   |
| `CLIENT_URL` | `http://localhost:5173` | Origem CORS         |

### Cliente (`client/.env`)

| Variável          | Padrão                  | Descrição              |
| ----------------- | ----------------------- | ---------------------- |
| `VITE_SERVER_URL` | `http://localhost:3001` | URL do servidor        |

## Deploy

**Servidor** (Render / Railway) → comando: `node index.js`

**Cliente** (Vercel / Netlify) → build: `npm run build`, pasta: `dist`

## Tecnologias

React, Vite, Leaflet, Node.js, Express, Socket.IO, OpenStreetMap
