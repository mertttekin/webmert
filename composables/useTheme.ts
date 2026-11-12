export type Theme = 'dark' | 'light'

/** Current theme. The inline head script writes `<html data-theme>` before first paint. */
export const useTheme = () =>
    useState<Theme>('theme', () => {
        if (import.meta.client) {
            return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
        }
        return 'dark'
    })
