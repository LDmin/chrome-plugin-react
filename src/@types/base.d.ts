declare module '*.svg'
declare module '*.png'
declare module '*.jpg'

interface Window {
  ldm: {
    debugger: (timeout?: number) => void
  }
}

