// A tiny static file server, no dependencies. Serves this project's
// root folder so frontend/index.html can fetch data/prices.json —
// opening index.html directly (file://) blocks that fetch in most
// browsers. Run with: npm start

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8000;
const ROOT = path.join(__dirname, "..");

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".css": "text/css",
};

const server = http.createServer((req, res) => {
  const requestPath = decodeURIComponent(req.url.split("?")[0]);
  const filePath = path.join(ROOT, requestPath === "/" ? "/frontend/index.html" : requestPath);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Serving ${ROOT}`);
  console.log(`Open http://localhost:${PORT}/frontend/index.html`);
});
