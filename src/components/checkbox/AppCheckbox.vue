<script setup lang="ts">
import { computed } from 'vue'
import { CheckboxRoot, CheckboxIndicator } from 'reka-ui'
import { cn } from '../../utils/cn'

/*
  AppCheckbox — ditulis dari NOL (tanpa Bulma/Vuero).
  - Aksesibilitas (keyboard, ARIA, focus, indeterminate) ditangani Reka UI
    CheckboxRoot — inilah alasan utama pakai Reka UI untuk komponen form.
  - v-model didukung lewat `modelValue` + emit 'update:modelValue',
    setara pola Vuero lama tapi tanpa watch manual.
  - Tampilan sepenuhnya Tailwind (prefix tw-), mandiri dari Bulma.
*/

type Color = 'primary' | 'info' | 'success' | 'warning' | 'danger'

const props = withDefaults(
    defineProps<{
        modelValue?: boolean | 'indeterminate'
        label?: string
        color?: Color
        /** gaya terisi penuh saat checked (vs hanya border) */
        solid?: boolean
        /** sudut membulat penuh */
        circle?: boolean
        disabled?: boolean
        /** class tambahan dari konsumen */
        class?: string
    }>(),
    {
        modelValue: false,
        color: 'primary',
        solid: false,
        circle: false,
        disabled: false,
    },
)

const emit = defineEmits<{
    'update:modelValue': [value: boolean | 'indeterminate']
}>()

// Warna per varian — dipakai saat checked
const colorChecked: Record<Color, string> = {
    primary: 'data-[state=checked]:tw-bg-brand-500 data-[state=checked]:tw-border-brand-500',
    info: 'data-[state=checked]:tw-bg-sky-500 data-[state=checked]:tw-border-sky-500',
    success: 'data-[state=checked]:tw-bg-green-500 data-[state=checked]:tw-border-green-500',
    warning: 'data-[state=checked]:tw-bg-amber-500 data-[state=checked]:tw-border-amber-500',
    danger: 'data-[state=checked]:tw-bg-danger-500 data-[state=checked]:tw-border-danger-500',
}

// Untuk mode outline: border & centang berwarna, background tetap putih
const colorOutline: Record<Color, string> = {
    primary: 'data-[state=checked]:tw-border-brand-500 tw-text-brand-500',
    info: 'data-[state=checked]:tw-border-sky-500 tw-text-sky-500',
    success: 'data-[state=checked]:tw-border-green-500 tw-text-green-500',
    warning: 'data-[state=checked]:tw-border-amber-500 tw-text-amber-500',
    danger: 'data-[state=checked]:tw-border-danger-500 tw-text-danger-500',
}

const boxClasses = computed(() =>
    cn(
        // dasar kotak checkbox
        'tw-inline-flex tw-items-center tw-justify-center tw-shrink-0',
        'tw-w-5 tw-h-5 tw-border tw-border-gray-300 tw-bg-white',
        'tw-transition-colors tw-outline-none',
        'focus-visible:tw-ring-2 focus-visible:tw-ring-offset-2 focus-visible:tw-ring-brand-400',
        'disabled:tw-opacity-50 disabled:tw-cursor-not-allowed',
        props.circle ? 'tw-rounded-full' : 'tw-rounded',
        props.solid
        ? cn(colorChecked[props.color], 'data-[state=checked]:tw-text-white')
        : colorOutline[props.color],
        props.class,
    ),
)

// Proxy v-model
const checked = computed({
    get: () => props.modelValue,
    set: (v) => emit('update:modelValue', v),
})
</script>

<template>
    <label
        class="tw-inline-flex tw-items-center tw-gap-2 tw-cursor-pointer tw-select-none"
        :class="{ 'tw-cursor-not-allowed tw-opacity-60': disabled }"
    >
        <CheckboxRoot
            v-model="checked"
            :disabled="disabled"
            :class="boxClasses"
        >
            <CheckboxIndicator class="tw-flex tw-items-center tw-justify-center">
                <!-- centang untuk state checked -->
                <svg
                    v-if="checked !== 'indeterminate'"
                    class="tw-w-3.5 tw-h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                >
                    <polyline points="20 6 9 17 4 12" />
                </svg>
                <!-- garis untuk state indeterminate -->
                <svg
                    v-else
                    class="tw-w-3.5 tw-h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="round"
                    aria-hidden="true"
                >
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </CheckboxIndicator>
        </CheckboxRoot>

        <span v-if="label || $slots.default" class="tw-text-sm tw-text-gray-700">
            <slot>{{ label }}</slot>
        </span>
    </label>
</template>