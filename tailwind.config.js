/** @type {import('tailwindcss').Config} */
export default {
    // Batasi pemindaian hanya ke file package ini
    content: ['./src/**/*.{vue,ts}', './playground/**/*.{vue,ts,html}'],

    // KUNCI KOEKSISTENSI #1: matikan preflight.
    // Preflight adalah reset CSS global Tailwind. Jika aktif, ia akan menimpa
    // base style Bulma di aplikasi konsumen (margin heading, reset tombol, dll).
    // Dengan corePlugins.preflight=false, Tailwind TIDAK menyentuh elemen global.
    corePlugins: {
        preflight: false,
    },

    // KUNCI KOEKSISTENSI #2: prefix semua utility class.
    // Class jadi `tw-px-4` bukan `px-4`. Ini mencegah bentrok nama class
    // dengan Bulma atau CSS lain di aplikasi konsumen.
    prefix: 'tw-',

    theme: {
        extend: {
            // === DESIGN TOKEN ===
            // Isi nilai di bawah dari config Bulma / SCSS Vuero Anda supaya
            // tampilan komponen baru konsisten dengan yang lama selama transisi.
            colors: {
                brand: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6', // ganti dengan primary Bulma Anda
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
                danger: {
                    500: '#ef4444',
                    600: '#dc2626',
                },
            },
            borderRadius: {
                // samakan dengan radius Bulma Anda
                base: '0.5rem',
            },
        },
    },
    plugins: [],
}
