import Navbar from "../components/Navbar";
import { Providers } from "./providers";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`dark:bg-[#0E0E0E]`}>
        <Providers>
          <div className="flex"> 
            <Navbar />
            <div className="flex-1">{children}</div> 
          </div>
        </Providers>
      </body>
    </html>
  );
}
