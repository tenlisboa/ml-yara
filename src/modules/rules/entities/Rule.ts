import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("rules")
class Rule {
  @PrimaryColumn({
    generated: "increment",
  })
  id!: number;

  @Column()
  name!: string;

  @Column()
  rule_string!: string;

  @CreateDateColumn()
  created_at!: Date;
}

export { Rule };
