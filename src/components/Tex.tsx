import katex from 'katex'
import { memo, useMemo } from 'react'

interface Props {
  math: string
  display?: boolean
  className?: string
}

/** Renders a KaTeX expression. Errors render in place (red) instead of crashing the page. */
export const Tex = memo(function Tex({ math, display = false, className = '' }: Props) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, { displayMode: display, throwOnError: true, strict: 'ignore', output: 'html' })
    } catch (err) {
      console.error('[KaTeX]', (err as Error).message, 'in:', math)
      return katex.renderToString(math, { displayMode: display, throwOnError: false, output: 'html' })
    }
  }, [math, display])
  return (
    <span
      className={`${display ? 'block overflow-x-auto overflow-y-hidden py-1' : ''} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
})
