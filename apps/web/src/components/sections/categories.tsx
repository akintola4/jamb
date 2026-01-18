import Link from "next/link";

interface Category {
  title: string;
  slug: string;
}

interface CategoriesSectionProps {
  categories?: Category[];
}

export const CategoriesSection = ({
  categories = [],
}: CategoriesSectionProps) => {
  const items = [...categories];

  return (
    <section className="py-2 md:py-6 bg-stone-100 dark:bg-background ">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 text-md md:text-lg text-neutral-500 dark:text-neutral-400">
          {items.map((item, index) => (
            <div key={item.slug} className="flex items-center">
              <Link
                href={`/${item.slug}`}
                className="hover:text-black transition-all duration-300 tracking-wide"
              >
                {item.title}
              </Link>
              {index < items.length - 1 && (
                <span
                  className="ml-6 text-gray-200 font-extralight select-none"
                  aria-hidden="true"
                >
                  |
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
