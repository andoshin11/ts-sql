import {
  InnerJoinSpecifier,
  TableSpecifier,
  Identifier,
  JoinSpecifier,
} from "../AST";
import { Database } from "../Schema";
import {
  UnionizeValue,
  AssembleEntries,
  Joint,
  UnionToIntersection,
} from "./ObjectUtils";

export type ExtractAllFieldNames<DB extends Database> = UnionizeValue<
  { [K in keyof DB["schema"]]: keyof DB["schema"][K] }
>;

export type ExtractJoinAlias<Join> = Join extends InnerJoinSpecifier<
  TableSpecifier<Identifier<any>, Identifier<infer Alias>>
>
  ? Alias
  : never;

export type ExtractJoinSource<Join> = Join extends InnerJoinSpecifier<
  TableSpecifier<Identifier<infer Source>, Identifier<any>>
>
  ? Source
  : never;

export type JoinsMap<
  DB extends Database,
  Joins extends JoinSpecifier[]
> = AssembleEntries<
  {
    [K in keyof Joins]: Joins[K] extends InnerJoinSpecifier<
      TableSpecifier<Identifier<infer JoinSource>, Identifier<infer JoinAlias>>
    >
      ? JoinSource extends keyof DB["schema"]
        ? [ExtractJoinAlias<Joins[K]>, DB["schema"][JoinSource]]
        : never
      : never;
  }
>;

export type JoinAliasesMap<Joins extends JoinSpecifier[]> = AssembleEntries<
  {
    [K in keyof Joins]: Joins[K] extends InnerJoinSpecifier<
      TableSpecifier<Identifier<infer JoinSource>, Identifier<infer JoinAlias>>
    >
      ? [JoinAlias, JoinSource]
      : never;
  }
>;

export type ToJoinedSchema<
  DB extends Database,
  From extends TableSpecifier,
  Joins extends JoinSpecifier[]
> = From extends TableSpecifier<
  Identifier<infer Source>,
  Identifier<infer Alias>
>
  ? Source extends keyof DB["schema"]
    ? {
        public: Joint<
          DB["schema"][Source],
          UnionToIntersection<UnionizeValue<JoinsMap<DB, Joins>>>
        >;
        joins: JoinsMap<DB, Joins>;
        joinAliases: JoinAliasesMap<Joins>;
        from: {
          source: Source;
          alias: Alias;
          schema: DB["schema"][Source];
        };
      }
    : never
  : never;
