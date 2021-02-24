import { expectType } from 'tsd'
import * as select from '../src/validator/select'
import { Parse } from '../src/Parser'
import * as fixtures from './fixture'

type isValidSelectStatement<Query> = Parse<Query> extends select.ValidSelectStatement<fixtures.DB> ? true : false
type V1 = select.ValidSelectStatement<fixtures.DB>
type V2 = V1['joins']
type V3<S extends V2> = S
type ValidQuery<Query extends select.ValidSelectStatement<fixtures.DB>> = any

/**
 * ValidSelectStatement
 */
expectType<isValidSelectStatement<fixtures.Q27>>(true)
expectType<isValidSelectStatement<fixtures.Q28>>(true)
expectType<isValidSelectStatement<fixtures.NQ2>>(false)
expectType<isValidSelectStatement<fixtures.NQ3>>(false)

type TValidSelectStatementQ27 = ValidQuery<Parse<fixtures.Q27>>
type TValidSelectStatementQ28 = ValidQuery<Parse<fixtures.Q28>>
// @ts-expect-error
type TValidSelectStatementNQ1 = ValidQuery<Parse<fixtures.NQ1>>
// @ts-expect-error
type TValidSelectStatementNQ2 = ValidQuery<Parse<fixtures.NQ2>>
// @ts-expect-error
type TValidSelectStatementNQ3 = ValidQuery<Parse<fixtures.NQ3>>
type TValidSelectStatementQ11 = ValidQuery<Parse<fixtures.Q11>>
type TValidSelectStatementNQ4 = ValidQuery<Parse<fixtures.NQ4>> // should throw an error in future
type TValidSelectStatementQ15 = ValidQuery<Parse<fixtures.Q15>>
type TValidSelectStatementQ16 = ValidQuery<Parse<fixtures.Q16>>

type T1 = Parse<fixtures.Q11>['where']

/**
 * ValidateFromClause
 */
expectType<select.ValidateFromClause<fixtures.DB, Parse<fixtures.NQ1>>>(false)
expectType<select.ValidateFromClause<fixtures.DB, Parse<fixtures.Q3>>>(true)

/**
 * ValidateJoinClauses
 */
expectType<select.ValidateJoinClauses<fixtures.DB, Parse<fixtures.Q27>>>(true)
expectType<select.ValidateJoinClauses<fixtures.DB, Parse<fixtures.Q28>>>(true)
expectType<select.ValidateJoinClauses<fixtures.DB, Parse<fixtures.NQ2>>>(false)
expectType<select.ValidateJoinClauses<fixtures.DB, Parse<fixtures.NQ3>>>(false)