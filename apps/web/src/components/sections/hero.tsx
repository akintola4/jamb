

import { Badge } from "@workspace/ui/components/badge";
import { motion } from "motion/react";

import {
  FADE_IN_VARIANTS,
  STAGGER_CONTAINER,
} from "@/lib/motion";
import type { PagebuilderType } from "@/types";
import { SanityButtons } from "../elements/sanity-buttons";
import { SanityImage } from "../elements/sanity-image";

type HeroBlockProps = PagebuilderType<"hero">;

export function HeroBlock({
  title,
  buttons,
  badge,
  image,
  subtitle,
  richText,
}: HeroBlockProps) {
  return (
    <section className="my-4 md:my-1" id="hero">
      <div className="mx-auto  px-4 md:px-6 relative">
        {/* redesign the hero to have a centered section abovve the image for better ux note its optional currently i didn't put the data due to figma design but i think its better we put a hero text for the customers  */}
        <motion.div
          className="flex flex-col gap-2 items-center text-white justify-center absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial="hidden"
          animate="visible"
          variants={STAGGER_CONTAINER}
        >
          {badge && (
            <motion.div variants={FADE_IN_VARIANTS}>
              <Badge
                variant="outline"
                className="text-white border-white/30 backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full uppercase tracking-widest text-[10px] font-medium mb-2"
              >
                {badge}
              </Badge>
            </motion.div>
          )}

          {title && (
            <motion.h1
              className="text-4xl font-bold"
              variants={FADE_IN_VARIANTS}
            >
              {title}
            </motion.h1>
          )}
          {subtitle && (
            <motion.p className="text-lg mb-4" variants={FADE_IN_VARIANTS}>
              {subtitle}
            </motion.p>
          )}

          <motion.div variants={FADE_IN_VARIANTS}>
            <SanityButtons
              buttons={buttons}
              buttonClassName="border-white cursor-pointer text-sm text-white px-4 md:px-8 py-4 rounded-none bg-transparent uppercase tracking-widest hover:bg-neutral-200 dark:border-zinc-700 dark:text-neutral-300 dark:hover:bg-zinc-800"
            />
          </motion.div>
        </motion.div>

        {image && (
          <div className="h-full w-full overflow-hidden">
            <SanityImage
              className="h-full w-full object-fill aspect-square lg:aspect-auto"
              fetchPriority="high"
              height={1080}
              sizes="100vw"
              image={image}
              loading="eager"
              width={1920}
            />
          </div>
        )}
      </div>
    </section>
  );
}
