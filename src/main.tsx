import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { NavigationProvider } from "@/contexts/NavigationContext"
import App from "./App"
import "./styles/globals.css"

const redirect = sessionStorage.getItem("redirect")
if (redirect) {
  sessionStorage.removeItem("redirect")
  window.history.replaceState(null, "", redirect)
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <NavigationProvider>
        <App />
      </NavigationProvider>
    </BrowserRouter>
  </StrictMode>
)
