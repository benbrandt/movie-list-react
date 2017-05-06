const express = require("express");
const next = require("next");
const LRUCache = require("lru-cache");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dir: ".", dev });
const handle = app.getRequestHandler();

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 * 24 // 1 Day
});

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g. a locale stored in req.session)
 */
const getCacheKey = req => `${req.url}`;

function renderAndCache(req, res, pagePath, queryParams) {
  const key = getCacheKey(req);

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    console.log(`CACHE HIT: ${key}`);
    res.send(ssrCache.get(key));
    return;
  }

  // If not let's render the page into HTML
  app
    .renderToHTML(req, res, pagePath, queryParams)
    .then(html => {
      // Let's cache this page
      console.log(`CACHE MISS: ${key}`);
      ssrCache.set(key, html);

      res.send(html);
    })
    .catch(err => {
      app.renderError(err, req, res, pagePath, queryParams);
    });
}

app.prepare().then(() => {
  const server = express();

  // Use the `renderAndCache` utility defined above to serve pages
  server.get("/", (req, res) => {
    renderAndCache(req, res, "/");
  });

  server.get("/movie/:id", (req, res) => {
    const queryParams = { id: req.params.id };
    renderAndCache(req, res, "/movie", queryParams);
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
