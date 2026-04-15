# Compliance Dashboard Demo

A simplified React demo of an enterprise compliance and vulnerability tracking dashboard. Shows security stats, vulnerability tables, and approved package lists.

## Tech Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Recharts
- Lucide React

## Run Locally
```bash
cd demos/compliance-dashboard
npm install
npm run dev
```

## Deploy

### Vercel
1. Push this folder to a GitHub repo.
2. Import the repo into [vercel.com](https://vercel.com).
3. Framework preset: **Vite**.
4. Root directory: `demos/compliance-dashboard` (or the repo root if this is the only project).
5. Click **Deploy**.

### Render (Static Site)
1. Create a new **Static Site** on [render.com](https://render.com).
2. Connect your GitHub repo.
3. Set **Build Command** to: `npm install && npm run build`
4. Set **Publish Directory** to: `dist`
5. Click **Create Static Site**.
