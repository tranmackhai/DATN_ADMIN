import slugify from "slugify";

export const configSlugify = (text) => {
  return slugify(text, {
    replacement: "-",
    remove: /[{?/!@#()}]/g,
    lower: true,
    strict: false,
    locale: "vi",
    trim: true,
  });
};
