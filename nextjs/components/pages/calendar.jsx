"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button, Panel } from "@/components/kit/primitives";

import { useWorkspace } from "@/components/workspace/workspace-provider";
export default function PageContent() {
  const { events, filter, setModal, month, setMonth, year, setYear } =
    useWorkspace();

  const first = (new Date(year, month, 1).getDay() + 6) % 7,
    days = new Date(year, month + 1, 0).getDate();
  const change = (n) => {
    const d = new Date(year, month + n, 1);
    setYear(d.getFullYear());
    setMonth(d.getMonth());
  };
  return (
    <Panel
      title={new Date(year, month).toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
      })}
      subtitle="Click a day to create an event; click an event to edit it."
      action={
        <div className="kit-actions">
          <Button icon aria-label="Previous month" onClick={() => change(-1)}>
            <ArrowLeft />
          </Button>
          <Button
            onClick={() => {
              const d = new Date();
              setYear(d.getFullYear());
              setMonth(d.getMonth());
            }}
          >
            Today
          </Button>
          <Button icon aria-label="Next month" onClick={() => change(1)}>
            <ArrowRight />
          </Button>
        </div>
      }
    >
      <div className="kit-table-wrap">
        <div className="kit-calendar">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div className="kit-weekday" key={d}>
              {d}
            </div>
          ))}
          {Array.from({ length: Math.ceil((first + days) / 7) * 7 }, (_, i) => {
            const day = i - first + 1;
            const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            return (
              <div key={i}>
                {day > 0 && day <= days && (
                  <>
                    <button
                      aria-label={"Add event on " + date}
                      onClick={() => setModal({ type: "event", date })}
                    >
                      {day}
                    </button>
                    {events
                      .filter((e) => e.date === date)
                      .map((e) => (
                        <button
                          className="kit-event"
                          key={e.id}
                          onClick={() =>
                            setModal({ type: "event", date, event: e })
                          }
                        >
                          {e.title}
                        </button>
                      ))}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}
