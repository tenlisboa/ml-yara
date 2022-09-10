import path from "node:path";
import fs from "node:fs";

import { initializeServer } from "../server";
import { runTest } from "./rules/rules.test";

initializeServer().then((app) => {
  app.listen(3030, async () => {
    await runTest(path.resolve(__dirname, "rules", "test-collection.json"));

    await fs.promises.unlink(
      path.resolve(__dirname, "database", "database.sqlite")
    );

    process.exit(0);
  });
});
