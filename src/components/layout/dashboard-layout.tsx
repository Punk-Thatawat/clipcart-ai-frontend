import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fffdfb]">
      <AppSidebar />
      <div className="min-h-screen lg:pl-[248px]">
        <AppHeader />
        <main className="mx-auto w-full max-w-[1600px] p-5 md:p-7 lg:px-8 lg:py-6">{children}</main>
      </div>
    </div>
  );
}
