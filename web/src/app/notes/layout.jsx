import SideBar from "@/components/SideBar";

export default function RootLayout({ children }) {
  return (
    <div className="flex min-h-">
      <SideBar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
