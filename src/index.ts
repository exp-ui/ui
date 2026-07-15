// Import CSS agar ikut ter-bundle saat build.
// Konsumen tetap perlu `import '@nama-org/ui/style.css'` secara eksplisit
// (lebih andal lintas bundler), tapi baris ini memastikan CSS ter-generate.
import './styles/index.css'

export { default as AppButton } from './components/button/AppButton.vue'

// tambahkan export komponen berikutnya di sini:
// export { default as AppInput } from './components/AppInput.vue'
// export { default as AppBadge } from './components/AppBadge.vue'
