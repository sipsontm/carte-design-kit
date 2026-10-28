"use client";

import { Download, Check } from "lucide-react";

import { Button, Panel, Badge } from "@/components/kit/primitives";
import { download } from "@/lib/download";

import { useWorkspace } from "@/components/workspace/workspace-provider";
export default function PageContent() {
  const { plan, setModal } = useWorkspace();
  return (
    <>
      <div className="kit-grid kit-three">
        {[
          ["Starter", 19, "For a focused individual"],
          ["Team", 49, "For teams working together"],
          ["Business", 99, "For a growing organization"],
        ].map(([name, price, desc]) => (
          <Panel
            key={name}
            title={name}
            subtitle={desc}
            action={
              plan === name ? <Badge tone="good">Current plan</Badge> : null
            }
          >
            <p className="kit-price">
              €{price}
              <small> / month</small>
            </p>
            <ul className="kit-list">
              {[
                "Unlimited projects",
                name === "Starter"
                  ? "1 team member"
                  : name === "Team"
                    ? "10 team members"
                    : "Unlimited members",
                "CSV exports",
              ].map((item) => (
                <li key={item}>
                  <Check size={15} />
                  {item}
                </li>
              ))}
            </ul>
            <Button
              className="kit-mt"
              primary={name === "Team"}
              disabled={plan === name}
              onClick={() => setModal({ type: "plan", name })}
            >
              {plan === name ? "Your current plan" : "Choose " + name}
            </Button>
          </Panel>
        ))}
      </div>
      <Panel
        className="kit-mt"
        title="Invoice history"
        subtitle="Sample invoices. Downloads are watermarked demo receipts."
      >
        <div className="kit-table-wrap">
          <table className="kit-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {["October", "September", "August"].map((m, i) => (
                <tr key={m}>
                  <td>DEMO-2026-{10 - i}</td>
                  <td>{m} 1, 2026</td>
                  <td>€49.00</td>
                  <td>
                    <Badge tone="good">Paid · sample</Badge>
                  </td>
                  <td>
                    <Button
                      onClick={() =>
                        download(
                          `demo-receipt-${m}.txt`,
                          `DEMO RECEIPT — NOT A TAX INVOICE\n${m} 2026\nTeam plan: EUR 49.00\nNo payment has been made.`,
                        )
                      }
                    >
                      <Download />
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
