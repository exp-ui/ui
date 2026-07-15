import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { computed } from 'vue'
import AppButton from './AppButton.vue'

/*
  Story + interaction test untuk AppButton.

  `play` function dijalankan otomatis sebagai test oleh @storybook/addon-vitest.
  Jadi story ini punya dua peran sekaligus: dokumentasi DAN test.
*/

const meta = {
    title: 'Components/AppButton',
    component: AppButton,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'danger', 'ghost'],
            description: 'Gaya visual tombol',
            table: { category: 'Tampilan', defaultValue: { summary: 'primary' } },
        },
        size: {
            control: 'inline-radio',
            options: ['sm', 'md', 'lg'],
            description: 'Ukuran tombol',
            table: { category: 'Tampilan', defaultValue: { summary: 'md' } },
        },
        block: {
            control: 'boolean',
            description: 'Lebar penuh',
            table: { category: 'Tampilan', defaultValue: { summary: 'false' } },
        },
        loading: {
            control: 'boolean',
            table: { category: 'State', defaultValue: { summary: 'false' } },
        },
        disabled: {
            control: 'boolean',
            table: { category: 'State', defaultValue: { summary: 'false' } },
        },
        as: {
            control: 'text',
            table: { category: 'Lanjutan', defaultValue: { summary: 'button' } },
        },
        label: {
            control: 'text',
            table: { category: 'Konten' },
        },
    },
    args: {
        variant: 'primary',
        size: 'md',
        loading: false,
        disabled: false,
        block: false,
        as: 'button',
        label: 'Button',
        onClick: fn(),
    },
} satisfies Meta<typeof AppButton>

export default meta
type Story = StoryObj<typeof meta>

// Render reaktif — `computed` agar perubahan Controls ikut ter-update
const render = (args: Record<string, unknown>) => ({
    components: { AppButton },
    setup() {
        const label = computed(() => args.label)
        const rest = computed(() => {
            const { label: _l, ...r } = args
            return r
        })
        return { label, rest }
    },
    template: `<AppButton v-bind="rest">{{ label }}</AppButton>`,
})

export const Playground: Story = { render }

export const Variant: Story = {
    render: (args: any) => ({
        components: { AppButton },
        setup: () => ({ args }),
        template: `
      <div style="display:flex; gap:12px; align-items:center;">
        <AppButton v-bind="args" variant="primary" label="Primary">Primary</AppButton>
        <AppButton v-bind="args" variant="secondary" label="Secondary">Secondary</AppButton>
        <AppButton v-bind="args" variant="danger" label="Danger">Danger</AppButton>
        <AppButton v-bind="args" variant="ghost" label="Ghost">Ghost</AppButton>
      </div>
    `,
    }),
}

export const Sizes: Story = {
    render: (args: any) => ({
        components: { AppButton },
        setup: () => ({ args }),
        template: `
      <div style="display:flex; gap:12px; align-items:center;">
        <AppButton v-bind="args" size="sm">Small</AppButton>
        <AppButton v-bind="args" size="md">Medium</AppButton>
        <AppButton v-bind="args" size="lg">Large</AppButton>
      </div>
    `,
    }),
}

export const Clickable: Story = {
    render,
    args: { label: 'Klik saya' },
    play: async ({ canvasElement, args }: any) => {
        const canvas = within(canvasElement)
        const button = canvas.getByRole('button', { name: /klik saya/i })

        await userEvent.click(button)
        await expect(args.onClick).toHaveBeenCalled()
    },
}

export const Loading: Story = {
    render,
    args: { loading: true, label: 'Menyimpan...' },
    play: async ({ canvasElement }: any) => {
        const canvas = within(canvasElement)
        const button = canvas.getByRole('button')

        // saat loading, tombol harus disabled dan menandai aria-busy
        await expect(button).toBeDisabled()
        await expect(button).toHaveAttribute('aria-busy', 'true')
    },
}

export const Disabled: Story = {
    render,
    args: { disabled: true, label: 'Disabled' },
    play: async ({ canvasElement, args }: any) => {
        const canvas = within(canvasElement)
        const button = canvas.getByRole('button')

        await expect(button).toBeDisabled()

        // klik pada tombol disabled tidak boleh memancarkan event
        await userEvent.click(button, { pointerEventsCheck: 0 })
        await expect(args.onClick).not.toHaveBeenCalled()
    },
}

export const AsLink: Story = {
    render,
    args: { as: 'a', variant: 'secondary', label: 'Link Button' },
    play: async ({ canvasElement }: any) => {
        const canvas = within(canvasElement)
        // harus ter-render sebagai <a>, bukan <button>
        const link = canvas.getByRole('link', { name: /link button/i })
        await expect(link).toBeInTheDocument()
    },
}