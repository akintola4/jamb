import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";

import type { PagebuilderType } from "@/types";
import { RichText } from "../elements/rich-text";
import { SanityButtons } from "../elements/sanity-buttons";
import { SanityImage } from "../elements/sanity-image";

type HeroBlockProps = PagebuilderType<"hero">;

export function HeroBlock({
  title,
  buttons,
  subtitle,
  badge,
  image,
  richText,
}: HeroBlockProps) {
  return (
    <section className="my-4 md:my-10" id="hero">
      <div className=" mx-auto px-4 md:px-6">
        {/* redesign the hero to have a centered section abovve the image for better ux note its optional currently i didn't put the data due to figma design but i think its better we put a hero text for the customers  */}
        <div className="flex flex-col  gap-2 items-center text-white justify-center absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {badge && (
            <Badge
              variant="outline"
              className="text-white border-white/30 backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full uppercase tracking-widest text-[10px] font-medium mb-2"
            >
              {badge}
            </Badge>
          )}
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-lg mb-4">{subtitle}</p>

          <SanityButtons
            buttons={buttons}
            buttonClassName="border-white cursor-pointer text-sm text-white px-4 md:px-8 py-4  rounded-none bg-transparent uppercase tracking-widest  hover:bg-neutral-200 dark:border-zinc-700 dark:text-neutral-300 dark:hover:bg-zinc-800"
          />
        </div>

        {image && (
          <div className="h-full w-full">
            <SanityImage
              className="h-full w-full object-fill aspect-square lg:aspect-auto"
              fetchPriority="high"
              height={1600}
              image={image}
              loading="eager"
              width={1200}
            />
          </div>
        )}
      </div>
    </section>
  );
}
