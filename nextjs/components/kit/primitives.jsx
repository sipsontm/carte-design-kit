"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
export function Button({
  children,
  primary = false,
  icon = false,
  className = "",
  ...props
}) {
  return (
    <button
      type="button"
      className={`kit-btn ${primary ? "primary" : ""} ${icon ? "icon" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Panel({ title, subtitle, action, children, className = "" }) {
  return (
    <section className={`kit-panel ${className}`}>
      <div className="kit-panel-head">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Badge({ children, tone = "" }) {
  return <span className={"kit-badge " + tone}>{children}</span>;
}

export function Progress({ value }) {
  return (
    <div
      className="kit-progress"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Project progress"
    >
      <span style={{ width: value + "%" }} />
    </div>
  );
}

export function Modal({ title, children, close, drawer = false }) {
  const ref = useRef(null),
    closeRef = useRef(close);
  closeRef.current = close;
  useEffect(() => {
    const old = document.activeElement;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current.querySelector("input,button,select,textarea")?.focus();
    const key = (e) => {
      if (e.key === "Escape") closeRef.current();
      if (e.key === "Tab") {
        const els = [
          ...ref.current.querySelectorAll(
            "button:not(:disabled),input,select,textarea,a[href]",
          ),
        ].filter((x) => x.offsetParent !== null);
        const first = els[0],
          last = els.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      document.body.style.overflow = before;
      old?.focus();
    };
  }, []);
  return (
    <div
      className={"kit-overlay " + (drawer ? "drawer" : "")}
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <section
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className="kit-dialog"
      >
        <div className="kit-dialog-head">
          <h2 id="dialog-title">{title}</h2>
          <Button icon aria-label="Close dialog" onClick={close}>
            <X />
          </Button>
        </div>
        {children}
      </section>
    </div>
  );
}
