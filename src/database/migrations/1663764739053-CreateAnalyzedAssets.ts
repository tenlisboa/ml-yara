import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateAnalyzedAssets1663764739053 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "analyzed_assets",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "source",
            type: "varchar",
          },
          {
            name: "ruleId",
            type: "integer",
          },
          {
            name: "matched",
            type: "boolean",
          },
          {
            name: "sourceIsFile",
            type: "boolean",
          },
          {
            name: "donwloadLink",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "analyzed_assets",
      new TableForeignKey({
        columnNames: ["ruleId"],
        referencedColumnNames: ["id"],
        referencedTableName: "rules",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("analyzed_assets");
  }
}
