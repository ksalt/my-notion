import { nanoid } from "nanoid";
import type { Page } from "./types";

export const createPage = () => {
  const slug = nanoid();
  const id = nanoid();
  const Page: Page = {
    title: "Untitled",
    id,
    slug,
    nodes: [],
    cover: "",
  };
  return Page;
};
