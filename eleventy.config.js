import dayjs from "dayjs";

export default function (config) {
  // Pass-through images
  config.addPassthroughCopy("./src/images");
  config.addPassthroughCopy("./src/public");

  // Add Date filters
  config.addFilter("date", (dateObj) => {
    return dayjs(dateObj).format("MMMM D, YYYY");
  });

  config.addFilter("sitemapDate", (dateObj) => {
    return dayjs(dateObj).toISOString();
  });

  config.addFilter("year", () => {
    return dayjs().format("YYYY");
  });

  // Add pages collection
  config.addCollection("pages", function (collections) {
    return collections.getFilteredByTag("page").sort(function (a, b) {
      return (a.data.order || 0) - (b.data.order || 0);
    });
  });

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
    },
  };
}
