<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '../../utils/cn'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(
    defineProps<{
        variant?: Variant
        size?: Size
        loading?: boolean
        disabled?: boolean
        block?: boolean
        /** ganti elemen render, mis. 'a' untuk link. Diteruskan ke Reka UI Primitive. */
        as?: string
        /** class tambahan dari konsumen untuk menimpa style default */
        class?: string
    }>(),
    {
        variant: 'primary',
        size: 'md',
        loading: false,
        disabled: false,
        block: false,
        as: 'button',
    },
)

const base =
    'tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-font-medium ' +
    'tw-rounded-base tw-transition-colors tw-outline-none ' +
    'focus-visible:tw-ring-2 focus-visible:tw-ring-brand-400 focus-visible:tw-ring-offset-2 ' +
    'disabled:tw-opacity-50 disabled:tw-cursor-not-allowed'

const variants: Record<Variant, string> = {
    primary: 'tw-bg-brand-500 tw-text-white hover:tw-bg-brand-600',
    secondary: 'tw-bg-white tw-text-brand-700 tw-border tw-border-brand-300 hover:tw-bg-brand-50',
    danger: 'tw-bg-danger-500 tw-text-white hover:tw-bg-danger-600',
    ghost: 'tw-bg-transparent tw-text-brand-700 hover:tw-bg-brand-50',
}

const sizes: Record<Size, string> = {
    sm: 'tw-h-8 tw-px-3 tw-text-sm',
    md: 'tw-h-10 tw-px-4 tw-text-sm',
    lg: 'tw-h-12 tw-px-6 tw-text-base',
}

const classes = computed(() =>
    cn(
        base,
        variants[props.variant],
        sizes[props.size],
        props.block && 'tw-w-full',
        props.class,
    ),
)

const isDisabled = computed(() => props.disabled || props.loading)
</script>

<template>
    <Primitive
        :as="as"
        :class="classes"
        :disabled="as === 'button' ? isDisabled : undefined"
        :aria-busy="loading || undefined"
        :data-loading="loading || undefined"
    >
        <svg
            v-if="loading"
            class="tw-animate-spin tw-h-4 tw-w-4"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <circle
                class="tw-opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
            />
            <path
                class="tw-opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
        </svg>
        <slot />
    </Primitive>
</template>
