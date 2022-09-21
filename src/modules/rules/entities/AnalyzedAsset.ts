import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Rule } from "./Rule";

@Entity("analyzed_assets")
class AnalyzedAsset {
  @PrimaryColumn({
    generated: "increment",
  })
  id!: number;

  @Column()
  source!: string;

  @Column()
  donwloadLink?: string;

  @Column()
  sourceIsFile!: boolean;

  @Column()
  ruleId!: number;

  @ManyToOne(() => Rule, (rule) => rule.analyzedAssets)
  rule!: Rule;

  @Column()
  matched!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}

export { AnalyzedAsset };
