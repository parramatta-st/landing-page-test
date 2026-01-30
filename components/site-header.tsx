import Link from "next/link";

export function SiteHeader({ siteName }: { siteName: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="relative z-10 flex shrink-0 items-center gap-2 font-semibold tracking-tight">
          {/*
            Logo placeholder:
            - Replace /public/logo.svg with your real logo (same filename), OR
            - Point this src to a different file in /public.
          */}
          <img
            src="/logo.svg"
            alt="Success Tutoring"
            className="h-7 w-7 rounded-full"
            draggable={false}
          />
          <span className="whitespace-nowrap text-sm sm:text-base text-neutral-900">{siteName}</span>
        </Link>
        <nav className="hidden gap-6 text-sm md:flex">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/tutors" className="hover:underline">Tutors</Link>
          <Link href="/book" className="hover:underline">Book Diagnostic</Link>
        </nav>
        <Link href="/book" className="rounded-full bg-brand-orange px-4 py-2 text-sm font-medium text-white shadow-soft hover:brightness-95">
          Book
        </Link>
      </div>
    </header>
  );
}