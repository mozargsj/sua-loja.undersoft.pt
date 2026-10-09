import { renderToString } from 'react-dom/server'
import App from './App'

// Usado só no build (scripts/prerender.mjs): devolve o HTML da página.
export const render = () => ({ app: renderToString(<App />) })
