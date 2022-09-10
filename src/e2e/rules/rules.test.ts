import newman from "newman";

export const runTest = (collectionPath: string): Promise<void> =>
  new Promise((resolve, reject) => {
    newman.run(
      {
        collection: require(collectionPath),
        reporters: "cli",
        envVar: [{ key: "port", value: "3030" }],
      },
      (err) => {
        if (err) reject(err);

        resolve();
      }
    );
  });
