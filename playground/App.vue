<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '../src/components/button/AppButton.vue'

const loading = ref(false)
function simulate() {
  loading.value = true
  setTimeout(() => (loading.value = false), 1500)
}
</script>

<template>
    <div style="font-family: system-ui; padding: 2rem; max-width: 720px; margin: 0 auto;">
        <h1>AppButton — Playground</h1>

        <h3>Variant</h3>
        <div style="display: flex; gap: .75rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
            <AppButton variant="primary">Primary</AppButton>
            <AppButton variant="secondary">Secondary</AppButton>
            <AppButton variant="danger">Danger</AppButton>
            <AppButton variant="ghost">Ghost</AppButton>
        </div>

        <h3>Size</h3>
        <div style="display: flex; gap: .75rem; align-items: center; margin-bottom: 1.5rem;">
            <AppButton size="sm">Small</AppButton>
            <AppButton size="md">Medium</AppButton>
            <AppButton size="lg">Large</AppButton>
        </div>

        <h3>State</h3>
        <div style="display: flex; gap: .75rem; margin-bottom: 1.5rem;">
            <AppButton disabled>Disabled</AppButton>
            <AppButton :loading="loading" @click="simulate">
                {{ loading ? 'Menyimpan...' : 'Klik untuk loading' }}
            </AppButton>
        </div>

        <h3>Sebagai link (as="a")</h3>
        <AppButton as="a" href="#" variant="secondary">Link Button</AppButton>

        <h3>Override style</h3>
        <AppButton class="tw-bg-purple-600 hover:tw-bg-purple-700">
            Custom warna
        </AppButton>
    </div>
</template>
