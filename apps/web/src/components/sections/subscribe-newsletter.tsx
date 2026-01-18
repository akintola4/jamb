import type {
  PagebuilderType,
  SanityImageProps,
} from "@/types";
import { RichText } from "../elements/rich-text";
import { SanityButtons } from "../elements/sanity-buttons";
import { SanityImage } from "../elements/sanity-image";

type SubscribeNewsletterProps = PagebuilderType<"subscribeNewsletter"> & {
  image?: SanityImageProps;
};

export function SubscribeNewsletter({
  title,
  subTitle,
  image,
  button,
}: SubscribeNewsletterProps) {
  return (
    <section
      className="px-4 py-16 md:py-24 bg-stone-100 dark:bg-muted"
      id="subscribe"
    >
      <div className="container mx-auto ">
        <div className="flex flex-col md:flex-row items-center justify-around gap-6 ">
          {/* Content Column */}
          <div className="flex flex-col items-center px-3 md:px-6 py-12 text-center  ">
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
            {button && (
              <SanityButtons
                buttonClassName="border-neutral-500 text-neutral-500 px-8 py-2 text-xs rounded-none bg-transparent uppercase tracking-widest text-neutral-600 hover:bg-neutral-100 dark:border-zinc-700 dark:text-neutral-300 dark:hover:bg-zinc-800"
                buttons={[
                  {
                    ...button,
                    variant: "outline",
                    _key: button._key ?? "subscribe",
                  },
                ]}
              />
            )}
          </div>

          {/* Image Column */}

          <div className="w-full md:w-3/12 flex-end">
            {image ? (
              <SanityImage
                loading="eager"
                fetchPriority="high"
                width={500}
                height={600}
                sizes="(max-width: 768px) 100vw, 25vw"
                className="w-full h-auto"
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
