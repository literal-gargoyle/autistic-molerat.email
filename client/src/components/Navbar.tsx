import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { SiMoleculer } from "react-icons/si";

export default function Navbar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Editor" },
    { href: "/about", label: "About" },
    { href: "/showcase", label: "Showcase" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold"></span>
          </Link>
        </div>
        <div className="flex gap-6">
          <Link href="/" className="flex items-center gap-2">
            <img src="/static/images/logo.png" alt="Autistic Molerat Logo" className="h-8 w-8" />
            <span className="font-bold text-lg">Autistic Molerat</span>
            <Badge variant="secondary" className="ml-2">BETA</Badge>
          </Link>
            <div className="flex items-center space-x-4">
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
      </div>
    </nav>
  );
}
