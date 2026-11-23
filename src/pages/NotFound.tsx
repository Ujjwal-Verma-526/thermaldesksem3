import { Link } from 'react-router-dom'
import { LoopGlyph } from '../components/ui'

export function NotFound({ what = 'page' }: { what?: string }) {
  return (
    <div className="mx-auto max-w-md py-20 text-center">
      <div className="mx-auto mb-5 w-fit">
        <LoopGlyph progress={0.35} tone="heat" size={56} />
      </div>
      <h1 className="text-2xl font-semibold text-ink">This {what} doesn’t exist</h1>
      <p className="mt-2 text-ink-2">The cycle never closed. The link may be old, or the address mistyped.</p>
      <Link to="/" className="mt-6 inline-flex rounded-lg bg-ink px-4 py-2 text-sm font-medium text-paper hover:opacity-90">
        Back to the dashboard
      </Link>
    </div>
  )
}
