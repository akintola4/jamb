import { cn } from "@workspace/ui/lib/utils";

import type {
  PagebuilderType,
  SanityButtonProps,
  SanityImageProps,
} from "@/types";
import { RichText } from "../elements/rich-text";
import { SanityButtons } from "../elements/sanity-buttons";
import { SanityImage } from "../elements/sanity-image";

type ServiceProps = {
  _type: "service";
  _key: string;
  title?: string;
  subTitle?: any; // Rich text
  image?: SanityImageProps;
  buttons?: SanityButtonProps[];
  badge?: string;
  background?: "white" | "stone-300";
};

export function Service({
  title,
  subTitle,
  image,
  buttons,
  badge,
  background,
}: ServiceProps) {
  const bgColor = background === "stone-300" ? "bg-stone-300" : "bg-stone-100";

  return (
    <section
      className={cn(
        "px-4 py-16 md:py-24 transition-colors duration-300",
        bgColor,
        "dark:bg-background"
      )}
      id="service"
    >
      <div className="container mx-auto ">
        <div className="flex flex-col items-center justify-around gap-6 md:flex-row ">
          {/* Content Column */}
          <div className="flex flex-col items-center px-3 md:px-6 py-12 text-center  ">
            {badge && (
              <span className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                {badge}
              </span>
            )}
            {title && (
              <h2 className="mb-6 font-serif text-3xl font-medium leading-tight text-neutral-900 md:text-4xl lg:text-4xl dark:text-neutral-100">
                {title}
              </h2>
            )}
            {/* i will put the rich text here as center it looks better that way  for now left like the figma  */}
            {subTitle && (
              <RichText
                className="mb-10 max-w-md text-left text-sm leading-relaxed text-neutral-600 md:text-base dark:text-neutral-400"
                richText={subTitle}
              />
            )}

            {buttons && buttons.length > 0 && (
              <div className="flex flex-col items-center justify-center gap-6">
                <SanityButtons
                  buttonClassName="border-neutral-500 text-sm px-4 md:px-8 py-2 text-xs rounded-none bg-transparent uppercase tracking-widest text-neutral-600 hover:bg-neutral-200 dark:border-zinc-700 dark:text-neutral-300 dark:hover:bg-zinc-800"
                  buttons={buttons}
                />
              </div>
            )}
          </div>

          {/* Image Column */}
          <div className="w-full md:w-4/12 flex-end">
            {image ? (
              <SanityImage
                loading="eager"
                fetchPriority="high"
                width={550}
                height={550}
                image={image}
              />
            ) : (
              <div className="h-full w-full bg-neutral-200 dark:bg-zinc-800" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
