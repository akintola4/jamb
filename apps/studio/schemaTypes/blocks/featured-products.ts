import { ShoppingBag } from "lucide-react";
import { defineField, defineType } from "sanity";

export const featuredProducts = defineType({
  name: "featuredProducts",
  title: "Featured Products",
  type: "object",
  icon: ShoppingBag,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "Our latest products",
    }),
    defineField({
      name: "aspectRatio",
      title: "Aspect Ratio",
      type: "string",
      options: {
        list: [
          { title: "Square (1:1)", value: "square" },
          { title: "Portrait (4:5)", value: "portrait" },
          { title: "Widescreen (16:9)", value: "video" },
          { title: "Auto", value: "auto" },
        ],
        layout: "radio",
      },
      initialValue: "square",
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      products: "products",
    },
    prepare: ({ title, products }) => ({
      title: title || "Featured Products",
      subtitle: `${products?.length || 0} products`,
    }),
  },
});
