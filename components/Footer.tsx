import { profile } from '@/content/portfolio'
import ContactLinks from './ContactLinks'

export default function Footer() {
  return (
    <footer className="border-border text-muted border-t text-sm">
      <div className="mx-auto flex w-full max-w-3xl flex-col-reverse items-center gap-4 px-6 py-6 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()}, Design &amp; Developed by 김수임</p>
        {profile.contacts.length > 0 && (
          <ContactLinks contacts={profile.contacts} size="sm" />
        )}
      </div>
    </footer>
  )
}
