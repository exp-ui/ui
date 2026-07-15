# @nama-org/ui

UI component library internal kantor. Ditulis dari nol dengan **Vue 3 + Reka UI + Tailwind**, dirancang untuk **berjalan berdampingan** dengan template Bulma/Vuero yang ada.

## Kenapa aman berdampingan dengan Bulma

1. **Preflight Tailwind dimatikan** (`corePlugins.preflight: false`) — CSS package tidak menyentuh style global aplikasi.
2. **Semua class berprefix `tw-`** — tidak ada bentrok nama class dengan Bulma.
3. **CSS ter-compile mandiri** (`dist/ui.css`) — komponen tampil benar tanpa peduli setup CSS konsumen.

## Instalasi (konsumen)

Buat `.npmrc` di project:
```
@nama-org:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```
Lalu:
```bash
npm install @nama-org/ui
```

## Pemakaian

```ts
// main.ts — import CSS sekali
import '@nama-org/ui/style.css'
```
```vue
<script setup>
import { AppButton } from '@nama-org/ui'
</script>

<template>
  <AppButton variant="primary" @click="save">Simpan</AppButton>
  <AppButton variant="danger" :loading="isDeleting">Hapus</AppButton>
</template>
```

## Development

```bash
npm install
npm run dev      # playground di localhost
npm run build    # hasilkan dist/
```

## Design token

Edit `tailwind.config.js` bagian `theme.extend.colors.brand` dan `borderRadius.base`.
Ambil nilainya dari config Bulma/SCSS Vuero Anda agar konsisten selama transisi.

## Dokumentasi komponen (Storybook)

Storybook membaca komponen langsung dari `src/` (bukan versi ter-install),
jadi perubahan komponen langsung terlihat via hot reload.

```bash
npm run storybook        # jalankan Storybook di localhost:6006
npm run build-storybook  # build docs statis (bisa di-host untuk tim)
```

Story ditulis di file `*.stories.ts` di samping komponennya
(lihat `src/components/AppButton.stories.ts` sebagai pola acuan).

## Playground vs Storybook

- **Playground** (`npm run dev`) — untuk ngoprek cepat saat mengembangkan.
- **Storybook** (`npm run storybook`) — dokumentasi rapi untuk tim konsumen.

Keduanya membaca komponen dari `src/` yang sama.

## Menambah komponen baru

1. Buat `src/components/AppX.vue` (tulis dari nol, tanpa Bulma/Vuero).
2. Export di `src/index.ts`.
3. Buat `src/components/AppX.stories.ts` (salin pola dari AppButton).
4. `npm version patch && npm run build && npm publish`.
