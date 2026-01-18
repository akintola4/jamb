"use client";

import { env } from "@workspace/env/client";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { ChevronDown, Mail, Menu, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

import { LUXURY_EASE } from "@/lib/motion";
import type {
  QueryGlobalSeoSettingsResult,
  QueryNavbarDataResult,
} from "@/lib/sanity/sanity.types";
import { SanityButtons } from "./elements/sanity-buttons";
import { SanityIcon } from "./elements/sanity-icon";
import { Logo } from "./logo";
import { ModeToggle } from "./mode-toggle";

// Type helpers using utility types
type NavigationData = {
  navbarData: QueryNavbarDataResult;
  settingsData: QueryGlobalSeoSettingsResult;
};

type NavColumn = NonNullable<
  NonNullable<QueryNavbarDataResult>["columns"]
>[number];

type ColumnLink =
  Extract<NavColumn, { type: "column" }>["links"] extends Array<infer T>
    ? T
    : never;

type MenuLinkProps = {
  name: string;
  href: string;
  description?: string;
  icon?: string | null;
  onClick?: () => void;
};

// Fetcher function
const fetcher = async (url: string): Promise<NavigationData> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch navigation data");
  }
  return response.json();
};

function MenuLink({ name, href, description, icon, onClick }: MenuLinkProps) {
  return (
    <Link
      className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-accent"
      href={href || "#"}
      onClick={onClick}
    >
      {icon && (
        <SanityIcon
          className="mt-0.5 size-4 shrink-0 text-muted-foreground"
          icon={icon}
        />
      )}
      <div className="grid gap-1">
        <div className="font-medium leading-none group-hover:text-accent-foreground">
          {name}
        </div>
        {description && (
          <div className="line-clamp-2 text-muted-foreground text-sm">
            {description}
          </div>
        )}
      </div>
    </Link>
  );
}

function DesktopColumnDropdown({
  column,
}: {
  column: Extract<NavColumn, { type: "column" }>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="group relative">
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex items-center gap-1 px-3 py-2 font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        type="button"
      >
        {column.title}
        <ChevronDown className="size-3 transition-transform group-hover:rotate-180" />
      </button>
      {isOpen ? (
        <div
          className="fade-in-0 zoom-in-95 absolute top-full left-0 z-50 min-w-[280px] animate-in rounded-lg border bg-popover p-2 shadow-lg"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          role="menu"
        >
          <div className="grid gap-1">
            {column.links?.map((link: ColumnLink) => (
              <MenuLink
                description={link.description || ""}
                href={link.href || ""}
                icon={link.icon}
                key={link._key}
                name={link.name || ""}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DesktopColumnLink({
  column,
}: {
  column: Extract<NavColumn, { type: "link" }>;
}) {
  return (
    <Link
      className="px-3 py-2 font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
      href={column.href || "#"}
    >
      {column.name}
    </Link>
  );
}

function MobileMenu({ navbarData, settingsData }: NavigationData) {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  function toggleDropdown(key: string) {
    setOpenDropdown(openDropdown === key ? null : key);
  }

  function closeMenu() {
    setIsOpen(false);
    setOpenDropdown(null);
  }

  const { columns, buttons } = navbarData || {};
  const { logo, siteTitle } = settingsData || {};

  return (
    <>
      {/* Mobile menu button */}
      <Button
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        variant="ghost"
      >
        {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 top-16 z-50 bg-background/80 backdrop-blur-sm md:hidden"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: LUXURY_EASE }}
          >
            <motion.div
              animate={{ x: 0 }}
              className="fixed left-0 h-[calc(100vh-4rem)] w-full border-r bg-background p-6 shadow-lg"
              exit={{ x: "-100%" }}
              initial={{ x: "-100%" }}
              transition={{ duration: 0.6, ease: LUXURY_EASE }}
            >
              <div className="grid gap-6">
                <div className="border-b pb-4">
                  <h1 className="text-2xl font-bold">Menu</h1>
                </div>
                {/* Logo for mobile */}
                {/* {logo && (
                <div className="flex justify-center border-b pb-4">
                  <Logo
                    alt={siteTitle || ""}
                    height={40}
                    image={logo}
                    width={120}
                  />
                </div>
              )} */}

                {/* Navigation items */}
                <div className="grid gap-4">
                  {columns?.map((column) => {
                    if (column.type === "link") {
                      return (
                        <Link
                          className="flex items-center py-2 font-medium text-sm transition-colors hover:text-primary"
                          href={column.href || "#"}
                          key={column._key}
                          onClick={closeMenu}
                        >
                          {column.name}
                        </Link>
                      );
                    }

                    if (column.type === "column") {
                      const isDropdownOpen = openDropdown === column._key;
                      return (
                        <div className="grid gap-2" key={column._key}>
                          <button
                            className="flex items-center justify-between py-2 font-medium text-sm transition-colors hover:text-primary"
                            onClick={() => toggleDropdown(column._key)}
                            type="button"
                          >
                            {column.title}
                            <ChevronDown
                              className={cn(
                                "size-3 transition-transform",
                                isDropdownOpen && "rotate-180"
                              )}
                            />
                          </button>
                          {isDropdownOpen && (
                            <div className="grid gap-1 border-border border-l-2 pl-4">
                              {column.links?.map((link: ColumnLink) => (
                                <MenuLink
                                  description={link.description || ""}
                                  href={link.href || ""}
                                  icon={link.icon}
                                  key={link._key}
                                  name={link.name || ""}
                                  onClick={closeMenu}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }

                    return null;
                  })}
                </div>

                {/* Action buttons */}
                <div className="grid gap-3 border-t pt-4">
                  <div className="flex items-center justify-center gap-4">
                    <Button size="icon" variant="ghost">
                      <Search className="size-4" />
                      <span className="sr-only">Search</span>
                    </Button>
                    {settingsData?.contactEmail && (
                      <Button asChild size="icon" variant="ghost">
                        <a href={`mailto:${settingsData.contactEmail}`}>
                          <Mail className="size-4" />
                          <span className="sr-only">Email</span>
                        </a>
                      </Button>
                    )}
                    <ModeToggle />
                  </div>
                  <SanityButtons
                    buttonClassName="w-full justify-center"
                    buttons={buttons || []}
                    className="grid gap-3"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function DesktopMenu({ navbarData, settingsData }: NavigationData) {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  function toggleDropdown(key: string) {
    setOpenDropdown(openDropdown === key ? null : key);
  }

  function closeMenu() {
    setIsOpen(false);
    setOpenDropdown(null);
  }

  const { columns, buttons } = navbarData || {};
  const { logo, siteTitle } = settingsData || {};

  return (
    <>
      {/* Desktop menu button */}
      <Button
        className="hidden md:flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        variant="ghost"
      >
        {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Desktop menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 top-16 z-50 bg-background/80 backdrop-blur-sm md:block"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: LUXURY_EASE }}
          >
            <motion.div
              animate={{ x: 0 }}
              className="fixed w-4/12 right-0 h-[calc(100vh-4rem)] border-l bg-background p-6 shadow-lg overflow-hidden"
              exit={{ x: "100%" }}
              initial={{ x: "100%" }}
              transition={{ duration: 0.6, ease: LUXURY_EASE }}
            >
              <div className="grid gap-6">
                <div className="border-b pb-4">
                  <h1 className="text-2xl font-bold">Menu</h1>
                </div>
                {/* Logo for Desktop */}
                {/* {logo && (
                <div className="flex justify-center border-b pb-4">
                  <Logo
                    alt={siteTitle || ""}
                    height={40}
                    image={logo}
                    width={120}
                  />
                </div>
              )} */}

                {/* Navigation items */}
                <div className="grid gap-4">
                  {columns?.map((column) => {
                    if (column.type === "link") {
                      return (
                        <Link
                          className="flex w-full items-center gap-2 rounded-md px-4 py-4 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-muted dark:hover:text-primary"
                          href={column.href || "#"}
                          key={column._key}
                          onClick={closeMenu}
                        >
                          {column.name?.toLocaleUpperCase()}
                        </Link>
                      );
                    }

                    if (column.type === "column") {
                      const isDropdownOpen = openDropdown === column._key;
                      return (
                        <div className="grid gap-2" key={column._key}>
                          <button
                            className="flex items-center justify-between py-2 font-medium text-sm transition-colors hover:text-primary"
                            onClick={() => toggleDropdown(column._key)}
                            type="button"
                          >
                            {column.title}
                            <ChevronDown
                              className={cn(
                                "size-3 transition-transform",
                                isDropdownOpen && "rotate-180"
                              )}
                            />
                          </button>
                          {isDropdownOpen && (
                            <div className="grid gap-1 border-border border-l-2 pl-4">
                              {column.links?.map((link: ColumnLink) => (
                                <MenuLink
                                  description={link.description || ""}
                                  href={link.href || ""}
                                  icon={link.icon}
                                  key={link._key}
                                  name={link.name || ""}
                                  onClick={closeMenu}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }

                    return null;
                  })}
                </div>

                {/* Action buttons */}
                <div className="grid gap-3 border-t pt-4">
                  <div className="flex items-center justify-center gap-4">
                    {/* <Button size="icon" variant="ghost">
                    <Search className="size-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                  {settingsData?.contactEmail && (
                    <Button asChild size="icon" variant="ghost">
                      <a href={`mailto:${settingsData.contactEmail}`}>
                        <Mail className="size-4" />
                        <span className="sr-only">Email</span>
                      </a>
                    </Button>
                  )} */}
                    <ModeToggle />
                  </div>
                  <SanityButtons
                    buttonClassName="w-full justify-center"
                    buttons={buttons || []}
                    className="grid gap-3"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavbarSkeleton() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo skeleton - matches Logo component dimensions: width={120} height={40} */}
          {/* <div className="flex items-center">
            <div className="h-10 w-[120px] rounded bg-muted/50 animate-pulse" />
          </div> */}
          <div className="flex h-[40px] w-40 items-center">
            <div className="h-10 w-40 animate-pulse rounded bg-muted/50" />
          </div>

          {/* Desktop nav skeleton - matches nav gap-1 and px-3 py-2 buttons */}
          {/* <nav className="hidden md:flex items-center gap-1">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={`nav-${i}`}
                className="h-9 px-3 py-2 rounded bg-muted/50 animate-pulse min-w-[60px]"
              />
            ))}
          </nav> */}

          {/* Desktop actions skeleton */}
          <div className="hidden items-center gap-2 md:flex">
            {/* Search, Mail, ModeToggle skeletons */}
            <div className="h-9 w-9 animate-pulse rounded bg-muted/50" />
            <div className="h-9 w-9 animate-pulse rounded bg-muted/50" />
            <div className="h-9 w-9 animate-pulse rounded bg-muted/50" />
            <div className="ml-2 h-6 w-px bg-border/50" />
            {/* SanityButtons skeleton */}
            <div className="h-9 w-24 animate-pulse rounded bg-muted/50" />
          </div>

          {/* Mobile menu button skeleton */}
          <div className="h-10 w-10 animate-pulse rounded bg-muted/50 md:hidden" />
        </div>
      </div>
    </header>
  );
}

export function Navbar({
  navbarData: initialNavbarData,
  settingsData: initialSettingsData,
}: NavigationData) {
  const { data, error, isLoading } = useSWR<NavigationData>(
    "/api/navigation",
    fetcher,
    {
      fallbackData: {
        navbarData: initialNavbarData,
        settingsData: initialSettingsData,
      },
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateOnReconnect: true,
      refreshInterval: 30_000,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  const navigationData = data || {
    navbarData: initialNavbarData,
    settingsData: initialSettingsData,
  };
  const { navbarData, settingsData } = navigationData;
  const { buttons } = navbarData || {};
  const { logo, siteTitle } = settingsData || {};

  // Show skeleton only on initial mount when no fallback data is available
  if (isLoading && !data && !(initialNavbarData && initialSettingsData)) {
    return <NavbarSkeleton />;
  }

  return (
    <motion.header

      className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm"

      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 1.2, ease: LUXURY_EASE },
        },
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex h-[40px] w-40 items-center">
            {logo && (
              <Logo
                alt={siteTitle || ""}
                height={40}
                image={logo}
                priority
                width={120}
              />
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 md:flex">
            <Button size="icon" variant="ghost">
              <Search className="size-4" />
              <span className="sr-only">Search</span>
            </Button>
            {settingsData?.contactEmail && (
              <Button asChild size="icon" variant="ghost">
                <a href={`mailto:${settingsData.contactEmail}`}>
                  <Mail className="size-4" />
                  <span className="sr-only">Email</span>
                </a>
              </Button>
            )}
            <SanityButtons
              buttonClassName="rounded-lg"
              buttons={buttons || []}
              className="flex items-center gap-2"
            />
            <DesktopMenu navbarData={navbarData} settingsData={settingsData} />
          </div>

          {/* Mobile Menu */}
          <MobileMenu navbarData={navbarData} settingsData={settingsData} />
        </div>
      </div>

      {/* Error boundary for SWR */}
      {error && env.NODE_ENV === "development" && (
        <div className="border-destructive/20 border-b bg-destructive/10 px-4 py-2 text-destructive text-xs">
          Navigation data fetch error: {error.message}
        </div>
      )}
    </motion.header>
  );
}
