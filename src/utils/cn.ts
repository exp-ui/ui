
/**
 * Gabungkan class Tailwind dengan aman.
 * tailwind-merge menyelesaikan konflik (mis. tw-px-2 vs tw-px-4 -> yang terakhir menang),
 * sehingga konsumen bisa menimpa style default lewat prop `class`.
 *
 * Catatan: karena kita pakai prefix `tw-`, konfigurasikan twMerge agar paham prefix.
 */
import { extendTailwindMerge } from 'tailwind-merge'

export const cn = extendTailwindMerge({
    prefix: 'tw-',
})

// fallback sederhana bila hanya perlu join string
export function cx(...classes: (string | false | null | undefined)[]) {
    return classes.filter(Boolean).join(' ')
}
