import { FolderTree } from "lucide-react";
import { defineField, defineType } from "sanity";

export const categoriesSection = defineType({
  name: "categoriesSection",
  title: "Categories Section",
  type: "object",
  icon: FolderTree,
  fields: [
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      description: "Select categories to display. If empty, all categories will be shown.",
    }),
    defineField({
      name: "includeJournal",
      title: "Include Journal",
      type: "boolean",
      description: "Include a link to the Journal/Blog",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      categories: "categories",
    },
    prepare: ({ categories }) => ({
      title: "Categories Section",
      subtitle: `${categories?.length || "All"} categories`,
    }),
  },
});
