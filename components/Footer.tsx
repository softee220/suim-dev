import { siteConfig } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="border-border text-muted border-t text-sm">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-1 px-6 py-8 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.author}. All rights reserved.
        </p>
        <p>Built with Next.js &amp; MDX</p>
      </div>
    </footer>
  )
}
