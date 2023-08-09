import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
  ],
  theme: {
    minWidth: {
      'screens-sm': '576px',
      // => @media (min-width: 576px) { ... }

      'screens-md': '960px',
      // => @media (min-width: 960px) { ... }

      'screens-lg': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
  }
})
