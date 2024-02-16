import Image from "next/image";
import ThemeSwitch from "../components/ThemeSwitch";

export default function Home() {
  return (
    <div className="dark:text-white">
      www
      <ThemeSwitch />
      hello world
    </div>
  );
}
