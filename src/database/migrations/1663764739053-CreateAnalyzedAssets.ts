import { MigrationInterface, QueryRunner, Table } from "typeorm";

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
            name: "rule_id",
            type: "integer",
          },
          {
            name: "matched",
            type: "boolean",
          },
          {
            name: "source_is_file",
            type: "boolean",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("analyzed_assets");
  }
}
