import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("analyzed_assets")
class AnalyzedAsset {
  @PrimaryColumn({
    generated: "increment",
  })
  id!: number;

  @Column()
  source!: string;

  @Column()
  source_is_file!: boolean;

  @Column()
  rule_id!: number;

  @Column()
  matched!: boolean;

  @CreateDateColumn()
  created_at!: Date;
}

export { AnalyzedAsset };
