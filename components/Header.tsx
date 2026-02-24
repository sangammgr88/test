"use client";

import Link from "next/link";
import { ShoppingCart, Search, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/lib/store/cart";
import { useAuth } from "@/lib/store/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  const cartItems = useCart((state) => state.items);
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            StorePro
          </Link>

          <div className="flex-1 max-w-md">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
            </form>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="gap-2"
              >
                <LogOut size={18} />
                Logout
              </Button>
            )}

            {!isAuthenticated && (
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
            )}

            <Link href="/cart" className="relative">
              <Button variant="outline" size="icon">
                <ShoppingCart size={20} />
              </Button>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
