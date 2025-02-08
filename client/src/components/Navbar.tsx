import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { SiMoleculer } from "react-icons/si";

export default function Navbar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Editor" },
    { href: "/about", label: "About" },
    { href: "/examples", label: "Examples" },
    { href: "/shared", label: "Shared" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between max-w-screen-xl mx-auto px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <img src="/attached_assets/molerat_logo-removebg-preview.png" alt="Autistic Molerat Logo" className="h-8 w-8" />
            <span className="font-bold text-lg">Autistic Molerat</span>
            <Badge variant="secondary" className="ml-2">BETA</Badge>
          </Link>
        </div>
        <div className="flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location === item.href
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}