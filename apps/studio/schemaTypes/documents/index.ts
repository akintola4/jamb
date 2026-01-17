import { author } from "@/schemaTypes/documents/author";
import { blog } from "@/schemaTypes/documents/blog";
import { blogIndex } from "@/schemaTypes/documents/blog-index";
import { category } from "@/schemaTypes/documents/category";
import { faq } from "@/schemaTypes/documents/faq";
import { footer } from "@/schemaTypes/documents/footer";
import { homePage } from "@/schemaTypes/documents/home-page";
import { navbar } from "@/schemaTypes/documents/navbar";
import { page } from "@/schemaTypes/documents/page";
import { redirect } from "@/schemaTypes/documents/redirect";
import { product } from "@/schemaTypes/documents/product";
import { settings } from "@/schemaTypes/documents/settings";

export const singletons = [homePage, blogIndex, settings, footer, navbar];

export const documents = [blog, product, category, page, faq, author, ...singletons, redirect];
