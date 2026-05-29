import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="relative flex min-h-[70vh] items-center bg-ink-900 px-5 pt-32 sm:px-6 md:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="display mt-4 text-5xl sm:text-6xl">
          Page not <span className="italic text-gold-300">found.</span>
        </h1>
        <p className="mt-5 text-bone-200/80">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link to="/" className="btn-gold mt-8 inline-flex">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
