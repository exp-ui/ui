import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import AppCheckbox from './AppCheckbox.vue'

const meta = {
    title: 'Components/AppCheckbox',
    component: AppCheckbox,
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: 'select',
            options: ['primary', 'info', 'success', 'warning', 'danger'],
            description: 'Warna saat tercentang',
            table: { category: 'Tampilan', defaultValue: { summary: 'primary' } },
        },
        solid: {
            control: 'boolean',
            description: 'Terisi penuh saat checked (vs hanya border)',
            table: { category: 'Tampilan', defaultValue: { summary: 'false' } },
        },
        circle: {
            control: 'boolean',
            description: 'Sudut membulat penuh',
            table: { category: 'Tampilan', defaultValue: { summary: 'false' } },
        },
        disabled: {
            control: 'boolean',
            table: { category: 'State', defaultValue: { summary: 'false' } },
        },
        label: {
            control: 'text',
            table: { category: 'Konten' },
        },
        'onUpdate:modelValue': { action: 'update:modelValue', table: { category: 'Events' } },
    },
    args: {
        color: 'primary',
        solid: true,
        circle: false,
        disabled: false,
        label: 'Setuju dengan syarat & ketentuan',
    },
} satisfies Meta<typeof AppCheckbox>

export default meta
type Story = StoryObj<typeof meta>

// Render reaktif: state internal supaya bisa dicentang di Storybook,
// tetap sinkron dengan Controls lewat watch.
const render = (args: Record<string, unknown>) => ({
    components: { AppCheckbox },
    setup() {
        const checked = ref(true)
        return { args, checked }
    },
    template: `<AppCheckbox v-bind="args" v-model="checked" />`,
})

export const Playground: Story = { render }

export const Solid: Story = { render, args: { solid: true, label: 'Solid' } }
export const Outline: Story = { render, args: { solid: false, label: 'Outline' } }
export const Circle: Story = { render, args: { circle: true, solid: true, label: 'Circle' } }
export const Disabled: Story = { render, args: { disabled: true, label: 'Disabled' } }

// Semua warna sekaligus
export const Colors: Story = {
    render: (args) => ({
        components: { AppCheckbox },
        setup() {
            const vals = ref([true, true, true, true, true])
            return { args, vals }
        },
        template: `
      <div style="display:flex; flex-direction:column; gap:10px;">
        <AppCheckbox v-bind="args" v-model="vals[0]" solid color="primary" label="Primary" />
        <AppCheckbox v-bind="args" v-model="vals[1]" solid color="info" label="Info" />
        <AppCheckbox v-bind="args" v-model="vals[2]" solid color="success" label="Success" />
        <AppCheckbox v-bind="args" v-model="vals[3]" solid color="warning" label="Warning" />
        <AppCheckbox v-bind="args" v-model="vals[4]" solid color="danger" label="Danger" />
      </div>
    `,
    }),
}