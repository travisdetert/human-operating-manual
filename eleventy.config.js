export default function(eleventyConfig) {
  // Pass through static assets (remap src/ prefix so /css/, /js/, /fonts/ work)
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/fonts": "fonts" });

  // Watch targets for dev server
  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.addWatchTarget("src/js/");

  // Collection: methodology modules sorted by order
  eleventyConfig.addCollection("methodology", function(collectionApi) {
    return collectionApi.getFilteredByTag("methodology").sort((a, b) => {
      return (a.data.order || 0) - (b.data.order || 0);
    });
  });

  // Collection: deep dives sorted by order
  eleventyConfig.addCollection("deepDives", function(collectionApi) {
    return collectionApi.getFilteredByTag("deep-dive").sort((a, b) => {
      return (a.data.order || 0) - (b.data.order || 0);
    });
  });

  // Collection: tools sorted by order
  eleventyConfig.addCollection("tools", function(collectionApi) {
    return collectionApi.getFilteredByTag("tool").sort((a, b) => {
      return (a.data.order || 0) - (b.data.order || 0);
    });
  });

  // Filter: pad start (for module numbers like "00", "01")
  eleventyConfig.addFilter("padStart", function(value, length, char) {
    return String(value).padStart(length, char || "0");
  });

  // Filter: date formatting
  eleventyConfig.addFilter("date", function(value, format) {
    const d = value ? new Date(value) : new Date();
    if (format === "Y") return d.getFullYear().toString();
    return d.toLocaleDateString();
  });

  // Filter: format number with commas
  eleventyConfig.addFilter("commaNumber", function(value) {
    if (!value && value !== 0) return "";
    return Number(value).toLocaleString();
  });

  // Filter: get next item in collection
  eleventyConfig.addFilter("getNextItem", function(collection, currentUrl) {
    const index = collection.findIndex(item => item.url === currentUrl);
    return index >= 0 && index < collection.length - 1 ? collection[index + 1] : null;
  });

  // Filter: get previous item in collection
  eleventyConfig.addFilter("getPrevItem", function(collection, currentUrl) {
    const index = collection.findIndex(item => item.url === currentUrl);
    return index > 0 ? collection[index - 1] : null;
  });

  return {
    dir: {
      input: "content",
      includes: "../src/_includes",
      data: "../_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"]
  };
}
