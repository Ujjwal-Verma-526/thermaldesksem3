import { memo } from 'react'
import ReactMarkdown, { defaultUrlTransform, type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { DiagramFigure } from '../diagrams/DiagramFigure'

/* eslint-disable @typescript-eslint/no-explicit-any */

export const CALLOUT_LABELS: Record<string, string> = {
  DEF: 'Definition',
  EXAM: 'Exam focus',
  WARN: 'Common mistake',
  NOTE: 'Note',
  SUPP: 'Supplementary · not in Rathore',
  ERRATA: 'Book erratum',
  WHY: 'Physical meaning',
}

/**
 * remark plugin: turns `> [!TYPE] Optional title` blockquotes into styled callouts.
 * Unknown TYPE values are left as ordinary blockquotes.
 */
function remarkCallouts() {
  return (tree: any) => {
    const walk = (node: any) => {
      if (node.type === 'blockquote') {
        const first = node.children?.[0]
        const text = first?.type === 'paragraph' ? first.children?.[0] : null
        if (text?.type === 'text') {
          const m = /^\[!(\w+)\][ \t]*([^\n]*)\n?/.exec(text.value)
          if (m && CALLOUT_LABELS[m[1]]) {
            const kind = m[1]
            const title = m[2].trim()
            text.value = text.value.slice(m[0].length)
            if (text.value === '' && first.children.length === 1) node.children.shift()
            node.data = { hName: 'div', hProperties: { className: ['callout', `callout-${kind.toLowerCase()}`] } }
            node.children.unshift({
              type: 'paragraph',
              data: { hName: 'span', hProperties: { className: ['callout-label'] } },
              children: [{ type: 'text', value: title ? `${CALLOUT_LABELS[kind]} · ${title}` : CALLOUT_LABELS[kind] }],
            })
          }
        }
      }
      node.children?.forEach(walk)
    }
    walk(tree)
  }
}

/**
 * remark-math only treats `$$…$$` as display maths when the delimiters sit on their own
 * lines; written on one line (common inside callouts) it renders inline. Split such
 * lines so the maths always displays, keeping any blockquote prefix.
 */
function normaliseDisplayMath(src: string): string {
  return src.replace(/^((?:>[ \t]?)*)[ \t]*\$\$(.+?)\$\$[ \t]*$/gm, (_m, prefix: string, body: string) => `${prefix}$$\n${prefix}${body}\n${prefix}$$`)
}

const urlTransform =(url: string) => (url.startsWith('diagram:') ? url : defaultUrlTransform(url))

const components: Components = {
  p({ node, children }) {
    // a paragraph holding only a diagram must not wrap a <figure> in a <p>
    const kids = (node as any)?.children ?? []
    const only = kids.filter((k: any) => !(k.type === 'text' && k.value.trim() === ''))
    if (only.length === 1 && only[0].tagName === 'img' && String(only[0].properties?.src).startsWith('diagram:')) {
      return <>{children}</>
    }
    return <p>{children}</p>
  },
  img({ src, alt }) {
    if (typeof src === 'string' && src.startsWith('diagram:')) {
      return <DiagramFigure id={src.slice('diagram:'.length)} caption={alt} />
    }
    return <img src={src as string} alt={alt ?? ''} className="rounded-md" />
  },
  a({ href, children }) {
    return (
      <a href={href} target={href?.startsWith('#') ? undefined : '_blank'} rel="noreferrer">
        {children}
      </a>
    )
  },
}

interface Props {
  children: string
  tight?: boolean
  className?: string
}

export const Markdown = memo(function Markdown({ children, tight, className = '' }: Props) {
  return (
    <div className={`prose-te ${tight ? 'prose-tight' : ''} ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath, remarkCallouts]}
        rehypePlugins={[[rehypeKatex, { throwOnError: false, strict: 'ignore' }]]}
        components={components}
        urlTransform={urlTransform}
      >
        {normaliseDisplayMath(children)}
      </ReactMarkdown>
    </div>
  )
})

/** Inline KaTeX for strings that are pure math (formula sheet, derivation steps). */
export { Tex } from './Tex'
