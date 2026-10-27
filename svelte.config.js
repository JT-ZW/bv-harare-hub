import adapter from "@sveltejs/adapter-static";
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({ fallback: "404.html" }),
    prerender: {
      // An empty noticeboard intentionally has no article URLs to generate.
      handleUnseenRoutes: ({ routes }) => {
        const unexpected = routes.filter(
          (route) => route !== "/noticeboard/[slug]",
        );
        if (unexpected.length)
          throw new Error("Unrendered routes: " + unexpected.join(", "));
      },
    },
  },
};
export default config;
