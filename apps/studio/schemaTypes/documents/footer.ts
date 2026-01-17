import { LayoutPanelLeft, Link, PanelBottom } from "lucide-react";
import { defineField, defineType } from "sanity";

const footerColumnLink = defineField({
  name: "footerColumnLink",
  type: "object",
  icon: Link,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      description: "Name for the link",
    }),
    defineField({
      name: "url",
      type: "customUrl",
    }),
  ],
  preview: {
    select: {
      title: "name",
      externalUrl: "url.external",
      urlType: "url.type",
      internalUrl: "url.internal.slug.current",
      openInNewTab: "url.openInNewTab",
    },
    prepare({ title, externalUrl, urlType, internalUrl, openInNewTab }) {
      const url = urlType === "external" ? externalUrl : internalUrl;
      const newTabIndicator = openInNewTab ? " ↗" : "";
      const truncatedUrl =
        url?.length > 30 ? `${url.substring(0, 30)}...` : url;

      return {
        title: title || "Untitled Link",
        subtitle: `${urlType === "external" ? "External" : "Internal"} • ${truncatedUrl}${newTabIndicator}`,
        media: Link,
      };
    },
  },
});

const footerGroup = defineField({
  name: "footerGroup",
  type: "object",
  title: "Group",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "Optional title for the group",
    }),
    defineField({
      name: "links",
      type: "array",
      title: "Links",
      of: [footerColumnLink],
    }),
  ],
  preview: {
    select: {
      title: "title",
      links: "links",
    },
    prepare({ title, links = [] }) {
      return {
        title: title || "Untitled Group",
        subtitle: `${links.length} link${links.length === 1 ? "" : "s"}`,
      };
    },
  },
});

const footerColumn = defineField({
  name: "footerColumn",
  type: "object",
  icon: LayoutPanelLeft,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "Title for the column",
    }),
    defineField({
      name: "groups",
      type: "array",
      title: "Groups",
      description: "Groups of links within this column",
      of: [footerGroup],
    }),
  ],
  preview: {
    select: {
      title: "title",
      groups: "groups",
    },
    prepare({ title, groups = [] }) {
      return {
        title: title || "Untitled Column",
        subtitle: `${groups.length} group${groups.length === 1 ? "" : "s"}`,
      };
    },
  },
});

export const footer = defineType({
  name: "footer",
  type: "document",
  title: "Footer",
  description: "Footer content for your website",
  fields: [
    defineField({
      name: "label",
      type: "string",
      initialValue: "Footer",
      title: "Label",
      description: "Label used to identify footer in the CMS",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contact",
      type: "object",
      title: "Contact Information",
      fields: [
        defineField({
          name: "phone",
          type: "string",
          title: "Phone",
        }),
        defineField({
          name: "address",
          type: "text",
          rows: 3,
          title: "Address",
        }),
        defineField({
          name: "email",
          type: "string",
          title: "Email",
        }),
      ],
    }),
    defineField({
      name: "newsletter",
      type: "object",
      title: "Newsletter",
      fields: [
        defineField({
          name: "title",
          type: "string",
          title: "Title",
        }),
        defineField({
          name: "placeholderText",
          type: "string",
          title: "Placeholder Text",
        }),
        defineField({
          name: "buttonText",
          type: "string",
          title: "Button Text",
        }),
        defineField({
          name: "privacyText",
          type: "string",
          title: "Privacy Text",
        }),
        defineField({
          name: "privacyLink",
          type: "url",
          title: "Privacy Link",
        }),
      ],
    }),
    defineField({
      name: "columns",
      type: "array",
      title: "Columns",
      description: "Columns for the footer",
      of: [footerColumn],
    }),
  ],
  preview: {
    select: {
      title: "label",
    },
    prepare: ({ title }) => ({
      title: title || "Untitled Footer",
      media: PanelBottom,
    }),
  },
});
