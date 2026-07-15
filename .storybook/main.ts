import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|js)'],
    addons: [
        '@storybook/addon-docs',
        '@storybook/addon-vitest', // menjalankan play function sebagai test
    ],
    framework: {
        name: '@storybook/vue3-vite',
        options: {},
    },
}

export default config