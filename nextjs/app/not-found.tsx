import Link from "next/link";
export default function NotFound() {
  return (
    <section className="kit-empty">
      <h2>Page not found</h2>
      <p>This page does not exist in the starter.</p>
      <Link className="kit-btn" href="/">
        Back to overview
      </Link>
    </section>
  );
}
