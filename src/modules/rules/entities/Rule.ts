import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AnalyzedAsset } from "./AnalyzedAsset";

@Entity("rules")
class Rule {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  ruleString!: string;

  @OneToMany(() => AnalyzedAsset, (analyzedAsset) => analyzedAsset.rule)
  analyzedAssets!: AnalyzedAsset[];

  @CreateDateColumn()
  createdAt!: Date;
}

export { Rule };
