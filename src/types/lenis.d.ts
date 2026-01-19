declare module "@studio-freight/lenis" {
  interface LenisOptions {
    duration?: number
    easing?: (t: number) => number
    smoothWheel?: boolean
    wheelMultiplier?: number
  }

  export default class Lenis {
    constructor(options?: LenisOptions)
    raf(time: number): void
    destroy(): void
  }
}
