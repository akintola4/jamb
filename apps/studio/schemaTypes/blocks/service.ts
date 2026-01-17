import { Briefcase } from "lucide-react";
import { defineField, defineType } from "sanity";

import { customRichText } from "@/schemaTypes/definitions/rich-text";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "object",
  icon: Briefcase,
  fields: [
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    customRichText(["block"], {
      name: "subTitle",
      title: "Description",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [{ type: "button" }],
      validation: (Rule) => Rule.max(2),
    }),
    defineField({
      name: "background",
      title: "Background Color",
      type: "string",
      options: {
        list: [
          { title: "White", value: "white" },
          { title: "Stone 300", value: "stone-300" },
        ],
        layout: "radio",
      },
      initialValue: "white",
    }),
  ],
  preview: {
    select: {
      title: "title",
      badge: "badge",
    },
    prepare: ({ title, badge }) => ({
      title: title ?? "Untitled Service",
      subtitle: badge ? `Service • ${badge}` : "Service Block",
    }),
  },
});
