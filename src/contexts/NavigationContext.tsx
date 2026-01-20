import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type NavigationSource = "click" | "scroll-down" | "scroll-up"

interface NavigationContextValue {
  source: NavigationSource
  setSource: (source: NavigationSource) => void
  resetSource: () => void
}

const NavigationContext = createContext<NavigationContextValue | null>(null)

interface NavigationProviderProps {
  children: ReactNode
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [source, setSourceState] = useState<NavigationSource>("click")

  const setSource = useCallback((newSource: NavigationSource) => {
    setSourceState(newSource)
  }, [])

  const resetSource = useCallback(() => {
    setSourceState("click")
  }, [])

  return (
    <NavigationContext.Provider value={{ source, setSource, resetSource }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigationSource() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error("useNavigationSource must be used within a NavigationProvider")
  }
  return context
}
