import { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <div className="flex flex-col min-h-screen bg-mono-0 dark:bg-mono-900">
    <Header />
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  </div>
);
