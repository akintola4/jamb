import Link from "next/link";

import { sanityFetch } from "@/lib/sanity/live";
import { queryFooterData, queryGlobalSeoSettings } from "@/lib/sanity/query";
import type {
  QueryFooterDataResult,
  QueryGlobalSeoSettingsResult,
} from "@/lib/sanity/sanity.types";
import { Logo } from "./logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "./social-icons";

type SocialLinksProps = {
  data: NonNullable<QueryGlobalSeoSettingsResult>["socialLinks"];
};

interface FooterLink {
  _key: string;
  name?: string;
  openInNewTab?: boolean;
  href?: string | null;
}

interface FooterGroup {
  _key: string;
  title?: string;
  links?: FooterLink[];
}

interface FooterColumn {
  _key: string;
  title?: string;
  groups?: FooterGroup[];
}

interface FooterData {
  _id: string;
  contact?: {
    phone?: string;
    address?: string;
    email?: string;
  };
  newsletter?: {
    title?: string;
    placeholderText?: string;
    buttonText?: string;
    privacyText?: string;
    privacyLink?: string;
  };
  columns?: FooterColumn[];
}

type FooterProps = {
  data: FooterData;
  settingsData: NonNullable<QueryGlobalSeoSettingsResult>;
};

export async function FooterServer() {
  const [response, settingsResponse] = await Promise.all([
    sanityFetch({
      query: queryFooterData,
    }) as Promise<{ data: FooterData | null }>,
    sanityFetch({
      query: queryGlobalSeoSettings,
    }),
  ]);

  if (!(response?.data && settingsResponse?.data)) {
    return <FooterSkeleton />;
  }
  return <Footer data={response.data} settingsData={settingsResponse.data} />;
}

function SocialLinks({ data }: SocialLinksProps) {
  if (!data) {
    return null;
  }

  const { facebook, twitter, instagram, youtube, linkedin } = data;

  const socialLinks = [
    {
      url: instagram,
      Icon: InstagramIcon,
      label: "Follow us on Instagram",
    },
    {
      url: facebook,
      Icon: FacebookIcon,
      label: "Follow us on Facebook",
    },
    { url: twitter, Icon: XIcon, label: "Follow us on Twitter" },
    {
      url: linkedin,
      Icon: LinkedinIcon,
      label: "Follow us on LinkedIn",
    },
    {
      url: youtube,
      Icon: YoutubeIcon,
      label: "Subscribe to our YouTube channel",
    },
  ].filter((link) => link.url);

  return (
    <ul className="flex items-center space-x-6 text-muted-foreground">
      {socialLinks.map(({ url, Icon, label }, index) => (
        <li
          className="font-medium hover:text-primary"
          key={`social-link-${url}-${index.toString()}`}
        >
          <Link
            aria-label={label}
            href={url ?? "#"}
            prefetch={false}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon className="fill-muted-foreground hover:fill-primary/80 dark:fill-zinc-400 dark:hover:fill-primary" />
            <span className="sr-only">{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function FooterSkeleton() {
  return (
    <footer className=" border-t border-zinc-200 bg-neutral-200 pt-12 pb-20 dark:bg-zinc-900 dark:border-zinc-800">
      <div className="container mx-auto px-4 md:px-6">
        {/* Top Row Skeleton */}
        <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-1 space-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-zinc-300 dark:bg-zinc-800" />
            <div className="h-4 w-32 animate-pulse rounded bg-zinc-300 dark:bg-zinc-800" />
            <div className="h-4 w-28 animate-pulse rounded bg-zinc-300 dark:bg-zinc-800" />
          </div>
          <div className="lg:col-span-2">
            <div className="h-4 w-32 animate-pulse rounded bg-zinc-300 dark:bg-zinc-800" />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <div className="h-4 w-20 animate-pulse rounded bg-zinc-300 dark:bg-zinc-800" />
            <div className="h-12 w-full animate-pulse rounded bg-zinc-300 dark:bg-zinc-800" />
            <div className="h-4 w-40 animate-pulse rounded bg-zinc-300 dark:bg-zinc-800" />
          </div>
        </div>

        <div className="mb-12 h-px w-full bg-[#D1D1D1] opacity-50 dark:bg-zinc-800" />

        {/* Bottom Row Skeleton */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-8">
              {[1, 2].map((j) => (
                <div key={j} className="space-y-3">
                  <div className="h-4 w-24 animate-pulse rounded bg-zinc-300 dark:bg-zinc-800" />
                  <div className="space-y-2">
                    {[1, 2, 3].map((k) => (
                      <div key={k} className="h-3 w-20 animate-pulse rounded bg-zinc-300 dark:bg-zinc-800" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

function Footer({ data, settingsData }: FooterProps) {
  const { contact, newsletter, columns } = data;
  const { siteTitle } = settingsData;

  return (
    <footer className="mt-none border-t bg-neutral-200 pt-12 pb-20 text-neutral-900 font-light dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800">
      <div className="container mx-auto px-4 md:px-6">
        {/* Top Row: Contact, Email, Newsletter */}
        <div className="mb-16 grid grid-cols-1 items-start gap-12 lg:grid-cols-5 lg:gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-1 text-sm leading-relaxed text-neutral-400">
            {contact?.phone && <p>Tel: {contact.phone}</p>}
            {contact?.address && (
              <div className="whitespace-pre-line">
                {contact.address}
              </div>
            )}
          </div>

          {/* Email */}
          <div className="lg:col-span-2 text-sm text-neutral-400">
            {contact?.email && (
              <a href={`mailto:${contact.email}`} className="hover:underline">
                {contact.email}
              </a>
            )}
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-light tracking-wide opacity-70">{newsletter?.title || "Newsletter"}</h4>
              <form className="flex w-full overflow-hidden border border-[#D1D1D1] bg-white dark:bg-zinc-800 dark:border-zinc-700">
                <input
                  type="text"
                  placeholder={newsletter?.placeholderText || "Search"}
                  className="w-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-zinc-400"
                />
                <button
                  type="submit"
                  className="border-l border-[#D1D1D1] px-6 py-3 text-sm font-light hover:bg-zinc-50 transition-colors dark:border-zinc-700 dark:hover:bg-zinc-700"
                >
                  {newsletter?.buttonText || "Subscribe"}
                </button>
              </form>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  className="size-3 border-zinc-400 rounded-none bg-transparent"
                />
                <label htmlFor="privacy" className="text-xs opacity-70 cursor-pointer">
                  {newsletter?.privacyText || "I agree to our Privacy Policy"}
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        {/* <div className="mb-12 h-px w-full bg-[#D1D1D1] opacity-50 dark:bg-zinc-800" /> */}

        {/* Bottom Row: Grouped Navigation Columns */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-8">
          {Array.isArray(columns) && columns.map((column, colIdx) => (
            <div key={column?._key || colIdx} className="space-y-10">
              {column?.groups?.map((group, groupIdx) => (
                <div key={group?._key || groupIdx} className="space-y-4 border-t border-zinc-400 pt-10 dark:border-zinc-800">
                  <h3 className="text-sm font-medium tracking-wide text-zinc-800 dark:text-zinc-200">
                    {group.title ?? ""}
                  </h3>
                  <ul className="space-y-2.5 text-sm text-neutral-400">
                    {group.links?.map((link, linkIdx) => (
                      <li key={link?._key || linkIdx}>
                        <Link
                          href={link.href ?? "#"}
                          className="hover:underline transition-all"
                          target={link.openInNewTab ? "_blank" : undefined}
                          rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
