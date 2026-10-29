import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./styles/globals.css"

// GitHub Pages serves public/404.html for unknown paths; that page stores the requested path under
// this key and redirects to "/", and the path is restored here before the router mounts.
const REDIRECT_STORAGE_KEY = "redirect"

const redirect = sessionStorage.getItem(REDIRECT_STORAGE_KEY)
if (redirect) {
  sessionStorage.removeItem(REDIRECT_STORAGE_KEY)
  window.history.replaceState(null, "", redirect)
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
