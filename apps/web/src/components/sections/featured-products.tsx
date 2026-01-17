import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";

import type { PagebuilderType, SanityImageProps } from "@/types";
import { SanityImage } from "../elements/sanity-image";

type ProductLink = {
  _id: string;
  title: string;
  subtitle?: string;
  image: SanityImageProps;
  slug: string;
};

type FeaturedProductsProps = {
  _type: "featuredProducts";
  _key: string;
  heading?: string;
  aspectRatio?: "square" | "portrait" | "video" | "auto";
  products?: ProductLink[];
};

export function FeaturedProducts({
  heading,
  products,
  aspectRatio = "square",
}: FeaturedProductsProps) {
  const aspectClass = {
    square: "aspect-square",
    portrait: "aspect-[4/5]",
    video: "aspect-video",
    auto: "aspect-auto",
  }[aspectRatio];

  return (
    <section
      className="bg-neutral-200 py-8 md:py-12 dark:bg-zinc-900"
      id="featured-products"
    >
      <div className="container mx-auto px-4 md:px-6">
        {heading && (
          <h2 className="mb-12 text-center  text-3xl leading-tight text-neutral-900 md:text-4xl lg:text-4xl dark:text-neutral-100 ">
            {heading}
          </h2>
        )}

        <div
          className={cn(
            "grid grid-cols-1 gap-8 sm:grid-cols-2 items-center lg:gap-6",
            products?.length === 1 && "lg:grid-cols-1 max-w-md mx-auto",
            products?.length === 2 && "lg:grid-cols-2 max-w-4xl mx-auto",
            products?.length === 3 && "lg:grid-cols-3",
            products?.length === 4 && "lg:grid-cols-4",
            (products?.length ?? 0) >= 5 && "lg:grid-cols-5"
          )}
        >
          {products?.map((product, index) => {
            const nativeAspect = product?.image?.dimensions?.aspectRatio;
            const dynamicStyle =
              aspectRatio === "auto" && nativeAspect
                ? { aspectRatio: nativeAspect }
                : {};

            return (
              <Link
                href={`/product/${product?.slug}`}
                key={`${product?._id}-${index}`}
                className="group flex flex-col items-center w-full"
              >
                <div
                  className={cn(
                    "relative mb-6 w-full overflow-hidden rounded-sm bg-stone-900",
                    aspectRatio !== "auto" && aspectClass
                  )}
                  style={dynamicStyle}
                >
                  {product?.image && (
                    <SanityImage
                      fetchPriority="high"
                      loading="eager"
                      width={550}
                      height={550}
                      className="h-full w-full object-cover  transition-transform duration-500 group-hover:scale-110"
                      image={product.image}
                    />
                  )}
                </div>
                <div className="text-center">
                  <h3 className="mb-1 text-lg font-medium text-neutral-900 dark:text-neutral-100">
                    {product?.title}
                  </h3>
                  {product?.subtitle && (
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {product?.subtitle}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
