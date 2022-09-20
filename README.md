# How to get the project UP and Running?

```sh
git clone ...
cd ml-yara
yarn install
docker-compose up
yarn typeorm migration:run -d ./src/database/index.ts
```
