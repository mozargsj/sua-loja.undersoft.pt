import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/bodoni-moda/opsz.css'
import '@fontsource-variable/bodoni-moda/opsz-italic.css'
import '@fontsource-variable/instrument-sans'
import './theme.css'
import './styles.css'
import './sistema.css'
import App from './App'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Em produção o HTML já vem pré-renderizado (scripts/prerender.mjs): hidratar em vez de recriar.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
