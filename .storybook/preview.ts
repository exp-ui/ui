import type { Preview } from '@storybook/vue3-vite'

import '../src/styles/index.css'

const preview: Preview = {
    parameters: {
        layout: 'centered',
        docs: {
            toc: true,
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
}

export default preview