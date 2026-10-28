import type { Metadata } from "next";
import "./globals.css";
import "@/styles/fonts.css";
import "@/styles/components.css";
import { WorkspaceProvider } from "@/components/workspace/workspace-provider";
import WorkspaceShell from "@/components/workspace/workspace-shell";
import WorkspaceDialogs from "@/components/workspace/workspace-dialogs";
export const metadata: Metadata = {
  icons: { icon: "/icon.svg" },
  title: "Carte — Next.js starter",
  description: "A source-first, interactive Carte design system starter.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <WorkspaceProvider>
          <WorkspaceShell>{children}</WorkspaceShell>
          <WorkspaceDialogs />
        </WorkspaceProvider>
      </body>
    </html>
  );
}
