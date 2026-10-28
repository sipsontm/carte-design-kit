"use client";
export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section className="kit-empty" role="alert">
      <h2>We couldn't load this page</h2>
      <p>Please try again. Your saved demo data is kept in this browser.</p>
      <button className="kit-btn" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
