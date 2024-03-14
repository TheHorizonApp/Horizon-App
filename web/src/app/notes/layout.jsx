import SideBar from "@/app/notes/components/SideBar";

export default function RootLayout({ children }) {
  return (
    <div className="flex min-h-">
      <SideBar className="fixed" />
      <div className="flex-1">{children}</div>
    </div>
  );
}
