import http from "http";
import path from "path";

import express from "express";

const main = async () => {
  const app = express();
  const server = http.createServer(app);
  const port = 8080;
  app.use(express.static("./public"));

  app.listen(port, () =>
    console.log(`server running on http://localhost:${port}`),
  );
};

main().catch((error) => console.log(`SERVER ERROR "${error.message}"`, error));
