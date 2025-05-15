
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model DiagnosisRecord
 * 
 */
export type DiagnosisRecord = $Result.DefaultSelection<Prisma.$DiagnosisRecordPayload>
/**
 * Model SupplementRecommendation
 * 
 */
export type SupplementRecommendation = $Result.DefaultSelection<Prisma.$SupplementRecommendationPayload>
/**
 * Model HospitalRecommendation
 * 
 */
export type HospitalRecommendation = $Result.DefaultSelection<Prisma.$HospitalRecommendationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Gender: {
  M: 'M',
  F: 'F'
};

export type Gender = (typeof Gender)[keyof typeof Gender]

}

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.diagnosisRecord`: Exposes CRUD operations for the **DiagnosisRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DiagnosisRecords
    * const diagnosisRecords = await prisma.diagnosisRecord.findMany()
    * ```
    */
  get diagnosisRecord(): Prisma.DiagnosisRecordDelegate<ExtArgs>;

  /**
   * `prisma.supplementRecommendation`: Exposes CRUD operations for the **SupplementRecommendation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SupplementRecommendations
    * const supplementRecommendations = await prisma.supplementRecommendation.findMany()
    * ```
    */
  get supplementRecommendation(): Prisma.SupplementRecommendationDelegate<ExtArgs>;

  /**
   * `prisma.hospitalRecommendation`: Exposes CRUD operations for the **HospitalRecommendation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HospitalRecommendations
    * const hospitalRecommendations = await prisma.hospitalRecommendation.findMany()
    * ```
    */
  get hospitalRecommendation(): Prisma.HospitalRecommendationDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.15.0
   * Query Engine version: 12e25d8d06f6ea5a0252864dd9a03b1bb51f3022
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    DiagnosisRecord: 'DiagnosisRecord',
    SupplementRecommendation: 'SupplementRecommendation',
    HospitalRecommendation: 'HospitalRecommendation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'user' | 'diagnosisRecord' | 'supplementRecommendation' | 'hospitalRecommendation'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>,
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      DiagnosisRecord: {
        payload: Prisma.$DiagnosisRecordPayload<ExtArgs>
        fields: Prisma.DiagnosisRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DiagnosisRecordFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DiagnosisRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DiagnosisRecordFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DiagnosisRecordPayload>
          }
          findFirst: {
            args: Prisma.DiagnosisRecordFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DiagnosisRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DiagnosisRecordFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DiagnosisRecordPayload>
          }
          findMany: {
            args: Prisma.DiagnosisRecordFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DiagnosisRecordPayload>[]
          }
          create: {
            args: Prisma.DiagnosisRecordCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DiagnosisRecordPayload>
          }
          createMany: {
            args: Prisma.DiagnosisRecordCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DiagnosisRecordCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DiagnosisRecordPayload>[]
          }
          delete: {
            args: Prisma.DiagnosisRecordDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DiagnosisRecordPayload>
          }
          update: {
            args: Prisma.DiagnosisRecordUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DiagnosisRecordPayload>
          }
          deleteMany: {
            args: Prisma.DiagnosisRecordDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.DiagnosisRecordUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.DiagnosisRecordUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DiagnosisRecordPayload>
          }
          aggregate: {
            args: Prisma.DiagnosisRecordAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateDiagnosisRecord>
          }
          groupBy: {
            args: Prisma.DiagnosisRecordGroupByArgs<ExtArgs>,
            result: $Utils.Optional<DiagnosisRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.DiagnosisRecordCountArgs<ExtArgs>,
            result: $Utils.Optional<DiagnosisRecordCountAggregateOutputType> | number
          }
        }
      }
      SupplementRecommendation: {
        payload: Prisma.$SupplementRecommendationPayload<ExtArgs>
        fields: Prisma.SupplementRecommendationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupplementRecommendationFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SupplementRecommendationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupplementRecommendationFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SupplementRecommendationPayload>
          }
          findFirst: {
            args: Prisma.SupplementRecommendationFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SupplementRecommendationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupplementRecommendationFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SupplementRecommendationPayload>
          }
          findMany: {
            args: Prisma.SupplementRecommendationFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SupplementRecommendationPayload>[]
          }
          create: {
            args: Prisma.SupplementRecommendationCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SupplementRecommendationPayload>
          }
          createMany: {
            args: Prisma.SupplementRecommendationCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SupplementRecommendationCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SupplementRecommendationPayload>[]
          }
          delete: {
            args: Prisma.SupplementRecommendationDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SupplementRecommendationPayload>
          }
          update: {
            args: Prisma.SupplementRecommendationUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SupplementRecommendationPayload>
          }
          deleteMany: {
            args: Prisma.SupplementRecommendationDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.SupplementRecommendationUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.SupplementRecommendationUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SupplementRecommendationPayload>
          }
          aggregate: {
            args: Prisma.SupplementRecommendationAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateSupplementRecommendation>
          }
          groupBy: {
            args: Prisma.SupplementRecommendationGroupByArgs<ExtArgs>,
            result: $Utils.Optional<SupplementRecommendationGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupplementRecommendationCountArgs<ExtArgs>,
            result: $Utils.Optional<SupplementRecommendationCountAggregateOutputType> | number
          }
        }
      }
      HospitalRecommendation: {
        payload: Prisma.$HospitalRecommendationPayload<ExtArgs>
        fields: Prisma.HospitalRecommendationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HospitalRecommendationFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$HospitalRecommendationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HospitalRecommendationFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$HospitalRecommendationPayload>
          }
          findFirst: {
            args: Prisma.HospitalRecommendationFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$HospitalRecommendationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HospitalRecommendationFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$HospitalRecommendationPayload>
          }
          findMany: {
            args: Prisma.HospitalRecommendationFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$HospitalRecommendationPayload>[]
          }
          create: {
            args: Prisma.HospitalRecommendationCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$HospitalRecommendationPayload>
          }
          createMany: {
            args: Prisma.HospitalRecommendationCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HospitalRecommendationCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$HospitalRecommendationPayload>[]
          }
          delete: {
            args: Prisma.HospitalRecommendationDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$HospitalRecommendationPayload>
          }
          update: {
            args: Prisma.HospitalRecommendationUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$HospitalRecommendationPayload>
          }
          deleteMany: {
            args: Prisma.HospitalRecommendationDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.HospitalRecommendationUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.HospitalRecommendationUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$HospitalRecommendationPayload>
          }
          aggregate: {
            args: Prisma.HospitalRecommendationAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateHospitalRecommendation>
          }
          groupBy: {
            args: Prisma.HospitalRecommendationGroupByArgs<ExtArgs>,
            result: $Utils.Optional<HospitalRecommendationGroupByOutputType>[]
          }
          count: {
            args: Prisma.HospitalRecommendationCountArgs<ExtArgs>,
            result: $Utils.Optional<HospitalRecommendationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    diagnosisRecords: number
    supplementRecommendations: number
    hospitalRecommendations: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    diagnosisRecords?: boolean | UserCountOutputTypeCountDiagnosisRecordsArgs
    supplementRecommendations?: boolean | UserCountOutputTypeCountSupplementRecommendationsArgs
    hospitalRecommendations?: boolean | UserCountOutputTypeCountHospitalRecommendationsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDiagnosisRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiagnosisRecordWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSupplementRecommendationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupplementRecommendationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountHospitalRecommendationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HospitalRecommendationWhereInput
  }


  /**
   * Count Type DiagnosisRecordCountOutputType
   */

  export type DiagnosisRecordCountOutputType = {
    supplementRecommendations: number
    hospitalRecommendations: number
  }

  export type DiagnosisRecordCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    supplementRecommendations?: boolean | DiagnosisRecordCountOutputTypeCountSupplementRecommendationsArgs
    hospitalRecommendations?: boolean | DiagnosisRecordCountOutputTypeCountHospitalRecommendationsArgs
  }

  // Custom InputTypes
  /**
   * DiagnosisRecordCountOutputType without action
   */
  export type DiagnosisRecordCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiagnosisRecordCountOutputType
     */
    select?: DiagnosisRecordCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DiagnosisRecordCountOutputType without action
   */
  export type DiagnosisRecordCountOutputTypeCountSupplementRecommendationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupplementRecommendationWhereInput
  }

  /**
   * DiagnosisRecordCountOutputType without action
   */
  export type DiagnosisRecordCountOutputTypeCountHospitalRecommendationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HospitalRecommendationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    height: number | null
    weight: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    height: number | null
    weight: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    gender: $Enums.Gender | null
    birthDate: Date | null
    height: number | null
    weight: number | null
    smoking: boolean | null
    drinkingFrequency: string | null
    chronicDisease: string | null
    medications: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    gender: $Enums.Gender | null
    birthDate: Date | null
    height: number | null
    weight: number | null
    smoking: boolean | null
    drinkingFrequency: string | null
    chronicDisease: string | null
    medications: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    gender: number
    birthDate: number
    height: number
    weight: number
    smoking: number
    drinkingFrequency: number
    chronicDisease: number
    medications: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    height?: true
    weight?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    height?: true
    weight?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    gender?: true
    birthDate?: true
    height?: true
    weight?: true
    smoking?: true
    drinkingFrequency?: true
    chronicDisease?: true
    medications?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    gender?: true
    birthDate?: true
    height?: true
    weight?: true
    smoking?: true
    drinkingFrequency?: true
    chronicDisease?: true
    medications?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    gender?: true
    birthDate?: true
    height?: true
    weight?: true
    smoking?: true
    drinkingFrequency?: true
    chronicDisease?: true
    medications?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    password: string
    name: string
    gender: $Enums.Gender
    birthDate: Date
    height: number | null
    weight: number | null
    smoking: boolean
    drinkingFrequency: string | null
    chronicDisease: string | null
    medications: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    gender?: boolean
    birthDate?: boolean
    height?: boolean
    weight?: boolean
    smoking?: boolean
    drinkingFrequency?: boolean
    chronicDisease?: boolean
    medications?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    diagnosisRecords?: boolean | User$diagnosisRecordsArgs<ExtArgs>
    supplementRecommendations?: boolean | User$supplementRecommendationsArgs<ExtArgs>
    hospitalRecommendations?: boolean | User$hospitalRecommendationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    gender?: boolean
    birthDate?: boolean
    height?: boolean
    weight?: boolean
    smoking?: boolean
    drinkingFrequency?: boolean
    chronicDisease?: boolean
    medications?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    gender?: boolean
    birthDate?: boolean
    height?: boolean
    weight?: boolean
    smoking?: boolean
    drinkingFrequency?: boolean
    chronicDisease?: boolean
    medications?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    diagnosisRecords?: boolean | User$diagnosisRecordsArgs<ExtArgs>
    supplementRecommendations?: boolean | User$supplementRecommendationsArgs<ExtArgs>
    hospitalRecommendations?: boolean | User$hospitalRecommendationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      diagnosisRecords: Prisma.$DiagnosisRecordPayload<ExtArgs>[]
      supplementRecommendations: Prisma.$SupplementRecommendationPayload<ExtArgs>[]
      hospitalRecommendations: Prisma.$HospitalRecommendationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password: string
      name: string
      gender: $Enums.Gender
      birthDate: Date
      height: number | null
      weight: number | null
      smoking: boolean
      drinkingFrequency: string | null
      chronicDisease: string | null
      medications: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends UserCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends UserCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    diagnosisRecords<T extends User$diagnosisRecordsArgs<ExtArgs> = {}>(args?: Subset<T, User$diagnosisRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiagnosisRecordPayload<ExtArgs>, T, 'findMany'> | Null>;

    supplementRecommendations<T extends User$supplementRecommendationsArgs<ExtArgs> = {}>(args?: Subset<T, User$supplementRecommendationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplementRecommendationPayload<ExtArgs>, T, 'findMany'> | Null>;

    hospitalRecommendations<T extends User$hospitalRecommendationsArgs<ExtArgs> = {}>(args?: Subset<T, User$hospitalRecommendationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HospitalRecommendationPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly gender: FieldRef<"User", 'Gender'>
    readonly birthDate: FieldRef<"User", 'DateTime'>
    readonly height: FieldRef<"User", 'Float'>
    readonly weight: FieldRef<"User", 'Float'>
    readonly smoking: FieldRef<"User", 'Boolean'>
    readonly drinkingFrequency: FieldRef<"User", 'String'>
    readonly chronicDisease: FieldRef<"User", 'String'>
    readonly medications: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.diagnosisRecords
   */
  export type User$diagnosisRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiagnosisRecord
     */
    select?: DiagnosisRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiagnosisRecordInclude<ExtArgs> | null
    where?: DiagnosisRecordWhereInput
    orderBy?: DiagnosisRecordOrderByWithRelationInput | DiagnosisRecordOrderByWithRelationInput[]
    cursor?: DiagnosisRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DiagnosisRecordScalarFieldEnum | DiagnosisRecordScalarFieldEnum[]
  }

  /**
   * User.supplementRecommendations
   */
  export type User$supplementRecommendationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplementRecommendation
     */
    select?: SupplementRecommendationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplementRecommendationInclude<ExtArgs> | null
    where?: SupplementRecommendationWhereInput
    orderBy?: SupplementRecommendationOrderByWithRelationInput | SupplementRecommendationOrderByWithRelationInput[]
    cursor?: SupplementRecommendationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SupplementRecommendationScalarFieldEnum | SupplementRecommendationScalarFieldEnum[]
  }

  /**
   * User.hospitalRecommendations
   */
  export type User$hospitalRecommendationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalRecommendation
     */
    select?: HospitalRecommendationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalRecommendationInclude<ExtArgs> | null
    where?: HospitalRecommendationWhereInput
    orderBy?: HospitalRecommendationOrderByWithRelationInput | HospitalRecommendationOrderByWithRelationInput[]
    cursor?: HospitalRecommendationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HospitalRecommendationScalarFieldEnum | HospitalRecommendationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model DiagnosisRecord
   */

  export type AggregateDiagnosisRecord = {
    _count: DiagnosisRecordCountAggregateOutputType | null
    _avg: DiagnosisRecordAvgAggregateOutputType | null
    _sum: DiagnosisRecordSumAggregateOutputType | null
    _min: DiagnosisRecordMinAggregateOutputType | null
    _max: DiagnosisRecordMaxAggregateOutputType | null
  }

  export type DiagnosisRecordAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    heightAtDiagnosis: number | null
    weightAtDiagnosis: number | null
  }

  export type DiagnosisRecordSumAggregateOutputType = {
    id: number | null
    userId: number | null
    heightAtDiagnosis: number | null
    weightAtDiagnosis: number | null
  }

  export type DiagnosisRecordMinAggregateOutputType = {
    id: number | null
    userId: number | null
    symptoms: string | null
    diagnosisResult: string | null
    departments: string | null
    heightAtDiagnosis: number | null
    weightAtDiagnosis: number | null
    smokingAtDiagnosis: boolean | null
    drinkingFrequencyAtDiagnosis: string | null
    chronicDiseaseAtDiagnosis: string | null
    medicationsAtDiagnosis: string | null
    createdAt: Date | null
  }

  export type DiagnosisRecordMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    symptoms: string | null
    diagnosisResult: string | null
    departments: string | null
    heightAtDiagnosis: number | null
    weightAtDiagnosis: number | null
    smokingAtDiagnosis: boolean | null
    drinkingFrequencyAtDiagnosis: string | null
    chronicDiseaseAtDiagnosis: string | null
    medicationsAtDiagnosis: string | null
    createdAt: Date | null
  }

  export type DiagnosisRecordCountAggregateOutputType = {
    id: number
    userId: number
    symptoms: number
    diagnosisResult: number
    departments: number
    heightAtDiagnosis: number
    weightAtDiagnosis: number
    smokingAtDiagnosis: number
    drinkingFrequencyAtDiagnosis: number
    chronicDiseaseAtDiagnosis: number
    medicationsAtDiagnosis: number
    createdAt: number
    _all: number
  }


  export type DiagnosisRecordAvgAggregateInputType = {
    id?: true
    userId?: true
    heightAtDiagnosis?: true
    weightAtDiagnosis?: true
  }

  export type DiagnosisRecordSumAggregateInputType = {
    id?: true
    userId?: true
    heightAtDiagnosis?: true
    weightAtDiagnosis?: true
  }

  export type DiagnosisRecordMinAggregateInputType = {
    id?: true
    userId?: true
    symptoms?: true
    diagnosisResult?: true
    departments?: true
    heightAtDiagnosis?: true
    weightAtDiagnosis?: true
    smokingAtDiagnosis?: true
    drinkingFrequencyAtDiagnosis?: true
    chronicDiseaseAtDiagnosis?: true
    medicationsAtDiagnosis?: true
    createdAt?: true
  }

  export type DiagnosisRecordMaxAggregateInputType = {
    id?: true
    userId?: true
    symptoms?: true
    diagnosisResult?: true
    departments?: true
    heightAtDiagnosis?: true
    weightAtDiagnosis?: true
    smokingAtDiagnosis?: true
    drinkingFrequencyAtDiagnosis?: true
    chronicDiseaseAtDiagnosis?: true
    medicationsAtDiagnosis?: true
    createdAt?: true
  }

  export type DiagnosisRecordCountAggregateInputType = {
    id?: true
    userId?: true
    symptoms?: true
    diagnosisResult?: true
    departments?: true
    heightAtDiagnosis?: true
    weightAtDiagnosis?: true
    smokingAtDiagnosis?: true
    drinkingFrequencyAtDiagnosis?: true
    chronicDiseaseAtDiagnosis?: true
    medicationsAtDiagnosis?: true
    createdAt?: true
    _all?: true
  }

  export type DiagnosisRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DiagnosisRecord to aggregate.
     */
    where?: DiagnosisRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiagnosisRecords to fetch.
     */
    orderBy?: DiagnosisRecordOrderByWithRelationInput | DiagnosisRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DiagnosisRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiagnosisRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiagnosisRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DiagnosisRecords
    **/
    _count?: true | DiagnosisRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DiagnosisRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DiagnosisRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DiagnosisRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DiagnosisRecordMaxAggregateInputType
  }

  export type GetDiagnosisRecordAggregateType<T extends DiagnosisRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateDiagnosisRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDiagnosisRecord[P]>
      : GetScalarType<T[P], AggregateDiagnosisRecord[P]>
  }




  export type DiagnosisRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiagnosisRecordWhereInput
    orderBy?: DiagnosisRecordOrderByWithAggregationInput | DiagnosisRecordOrderByWithAggregationInput[]
    by: DiagnosisRecordScalarFieldEnum[] | DiagnosisRecordScalarFieldEnum
    having?: DiagnosisRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DiagnosisRecordCountAggregateInputType | true
    _avg?: DiagnosisRecordAvgAggregateInputType
    _sum?: DiagnosisRecordSumAggregateInputType
    _min?: DiagnosisRecordMinAggregateInputType
    _max?: DiagnosisRecordMaxAggregateInputType
  }

  export type DiagnosisRecordGroupByOutputType = {
    id: number
    userId: number
    symptoms: string
    diagnosisResult: string
    departments: string | null
    heightAtDiagnosis: number | null
    weightAtDiagnosis: number | null
    smokingAtDiagnosis: boolean
    drinkingFrequencyAtDiagnosis: string | null
    chronicDiseaseAtDiagnosis: string | null
    medicationsAtDiagnosis: string | null
    createdAt: Date
    _count: DiagnosisRecordCountAggregateOutputType | null
    _avg: DiagnosisRecordAvgAggregateOutputType | null
    _sum: DiagnosisRecordSumAggregateOutputType | null
    _min: DiagnosisRecordMinAggregateOutputType | null
    _max: DiagnosisRecordMaxAggregateOutputType | null
  }

  type GetDiagnosisRecordGroupByPayload<T extends DiagnosisRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DiagnosisRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DiagnosisRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DiagnosisRecordGroupByOutputType[P]>
            : GetScalarType<T[P], DiagnosisRecordGroupByOutputType[P]>
        }
      >
    >


  export type DiagnosisRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    symptoms?: boolean
    diagnosisResult?: boolean
    departments?: boolean
    heightAtDiagnosis?: boolean
    weightAtDiagnosis?: boolean
    smokingAtDiagnosis?: boolean
    drinkingFrequencyAtDiagnosis?: boolean
    chronicDiseaseAtDiagnosis?: boolean
    medicationsAtDiagnosis?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    supplementRecommendations?: boolean | DiagnosisRecord$supplementRecommendationsArgs<ExtArgs>
    hospitalRecommendations?: boolean | DiagnosisRecord$hospitalRecommendationsArgs<ExtArgs>
    _count?: boolean | DiagnosisRecordCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["diagnosisRecord"]>

  export type DiagnosisRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    symptoms?: boolean
    diagnosisResult?: boolean
    departments?: boolean
    heightAtDiagnosis?: boolean
    weightAtDiagnosis?: boolean
    smokingAtDiagnosis?: boolean
    drinkingFrequencyAtDiagnosis?: boolean
    chronicDiseaseAtDiagnosis?: boolean
    medicationsAtDiagnosis?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["diagnosisRecord"]>

  export type DiagnosisRecordSelectScalar = {
    id?: boolean
    userId?: boolean
    symptoms?: boolean
    diagnosisResult?: boolean
    departments?: boolean
    heightAtDiagnosis?: boolean
    weightAtDiagnosis?: boolean
    smokingAtDiagnosis?: boolean
    drinkingFrequencyAtDiagnosis?: boolean
    chronicDiseaseAtDiagnosis?: boolean
    medicationsAtDiagnosis?: boolean
    createdAt?: boolean
  }

  export type DiagnosisRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    supplementRecommendations?: boolean | DiagnosisRecord$supplementRecommendationsArgs<ExtArgs>
    hospitalRecommendations?: boolean | DiagnosisRecord$hospitalRecommendationsArgs<ExtArgs>
    _count?: boolean | DiagnosisRecordCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DiagnosisRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DiagnosisRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DiagnosisRecord"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      supplementRecommendations: Prisma.$SupplementRecommendationPayload<ExtArgs>[]
      hospitalRecommendations: Prisma.$HospitalRecommendationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      symptoms: string
      diagnosisResult: string
      departments: string | null
      heightAtDiagnosis: number | null
      weightAtDiagnosis: number | null
      smokingAtDiagnosis: boolean
      drinkingFrequencyAtDiagnosis: string | null
      chronicDiseaseAtDiagnosis: string | null
      medicationsAtDiagnosis: string | null
      createdAt: Date
    }, ExtArgs["result"]["diagnosisRecord"]>
    composites: {}
  }

  type DiagnosisRecordGetPayload<S extends boolean | null | undefined | DiagnosisRecordDefaultArgs> = $Result.GetResult<Prisma.$DiagnosisRecordPayload, S>

  type DiagnosisRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DiagnosisRecordFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DiagnosisRecordCountAggregateInputType | true
    }

  export interface DiagnosisRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DiagnosisRecord'], meta: { name: 'DiagnosisRecord' } }
    /**
     * Find zero or one DiagnosisRecord that matches the filter.
     * @param {DiagnosisRecordFindUniqueArgs} args - Arguments to find a DiagnosisRecord
     * @example
     * // Get one DiagnosisRecord
     * const diagnosisRecord = await prisma.diagnosisRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DiagnosisRecordFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, DiagnosisRecordFindUniqueArgs<ExtArgs>>
    ): Prisma__DiagnosisRecordClient<$Result.GetResult<Prisma.$DiagnosisRecordPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one DiagnosisRecord that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DiagnosisRecordFindUniqueOrThrowArgs} args - Arguments to find a DiagnosisRecord
     * @example
     * // Get one DiagnosisRecord
     * const diagnosisRecord = await prisma.diagnosisRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DiagnosisRecordFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, DiagnosisRecordFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__DiagnosisRecordClient<$Result.GetResult<Prisma.$DiagnosisRecordPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first DiagnosisRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiagnosisRecordFindFirstArgs} args - Arguments to find a DiagnosisRecord
     * @example
     * // Get one DiagnosisRecord
     * const diagnosisRecord = await prisma.diagnosisRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DiagnosisRecordFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, DiagnosisRecordFindFirstArgs<ExtArgs>>
    ): Prisma__DiagnosisRecordClient<$Result.GetResult<Prisma.$DiagnosisRecordPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first DiagnosisRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiagnosisRecordFindFirstOrThrowArgs} args - Arguments to find a DiagnosisRecord
     * @example
     * // Get one DiagnosisRecord
     * const diagnosisRecord = await prisma.diagnosisRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DiagnosisRecordFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, DiagnosisRecordFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__DiagnosisRecordClient<$Result.GetResult<Prisma.$DiagnosisRecordPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more DiagnosisRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiagnosisRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DiagnosisRecords
     * const diagnosisRecords = await prisma.diagnosisRecord.findMany()
     * 
     * // Get first 10 DiagnosisRecords
     * const diagnosisRecords = await prisma.diagnosisRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const diagnosisRecordWithIdOnly = await prisma.diagnosisRecord.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DiagnosisRecordFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, DiagnosisRecordFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiagnosisRecordPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a DiagnosisRecord.
     * @param {DiagnosisRecordCreateArgs} args - Arguments to create a DiagnosisRecord.
     * @example
     * // Create one DiagnosisRecord
     * const DiagnosisRecord = await prisma.diagnosisRecord.create({
     *   data: {
     *     // ... data to create a DiagnosisRecord
     *   }
     * })
     * 
    **/
    create<T extends DiagnosisRecordCreateArgs<ExtArgs>>(
      args: SelectSubset<T, DiagnosisRecordCreateArgs<ExtArgs>>
    ): Prisma__DiagnosisRecordClient<$Result.GetResult<Prisma.$DiagnosisRecordPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many DiagnosisRecords.
     * @param {DiagnosisRecordCreateManyArgs} args - Arguments to create many DiagnosisRecords.
     * @example
     * // Create many DiagnosisRecords
     * const diagnosisRecord = await prisma.diagnosisRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends DiagnosisRecordCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, DiagnosisRecordCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DiagnosisRecords and returns the data saved in the database.
     * @param {DiagnosisRecordCreateManyAndReturnArgs} args - Arguments to create many DiagnosisRecords.
     * @example
     * // Create many DiagnosisRecords
     * const diagnosisRecord = await prisma.diagnosisRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DiagnosisRecords and only return the `id`
     * const diagnosisRecordWithIdOnly = await prisma.diagnosisRecord.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends DiagnosisRecordCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, DiagnosisRecordCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiagnosisRecordPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a DiagnosisRecord.
     * @param {DiagnosisRecordDeleteArgs} args - Arguments to delete one DiagnosisRecord.
     * @example
     * // Delete one DiagnosisRecord
     * const DiagnosisRecord = await prisma.diagnosisRecord.delete({
     *   where: {
     *     // ... filter to delete one DiagnosisRecord
     *   }
     * })
     * 
    **/
    delete<T extends DiagnosisRecordDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, DiagnosisRecordDeleteArgs<ExtArgs>>
    ): Prisma__DiagnosisRecordClient<$Result.GetResult<Prisma.$DiagnosisRecordPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one DiagnosisRecord.
     * @param {DiagnosisRecordUpdateArgs} args - Arguments to update one DiagnosisRecord.
     * @example
     * // Update one DiagnosisRecord
     * const diagnosisRecord = await prisma.diagnosisRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DiagnosisRecordUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, DiagnosisRecordUpdateArgs<ExtArgs>>
    ): Prisma__DiagnosisRecordClient<$Result.GetResult<Prisma.$DiagnosisRecordPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more DiagnosisRecords.
     * @param {DiagnosisRecordDeleteManyArgs} args - Arguments to filter DiagnosisRecords to delete.
     * @example
     * // Delete a few DiagnosisRecords
     * const { count } = await prisma.diagnosisRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DiagnosisRecordDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, DiagnosisRecordDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DiagnosisRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiagnosisRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DiagnosisRecords
     * const diagnosisRecord = await prisma.diagnosisRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DiagnosisRecordUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, DiagnosisRecordUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DiagnosisRecord.
     * @param {DiagnosisRecordUpsertArgs} args - Arguments to update or create a DiagnosisRecord.
     * @example
     * // Update or create a DiagnosisRecord
     * const diagnosisRecord = await prisma.diagnosisRecord.upsert({
     *   create: {
     *     // ... data to create a DiagnosisRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DiagnosisRecord we want to update
     *   }
     * })
    **/
    upsert<T extends DiagnosisRecordUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, DiagnosisRecordUpsertArgs<ExtArgs>>
    ): Prisma__DiagnosisRecordClient<$Result.GetResult<Prisma.$DiagnosisRecordPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of DiagnosisRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiagnosisRecordCountArgs} args - Arguments to filter DiagnosisRecords to count.
     * @example
     * // Count the number of DiagnosisRecords
     * const count = await prisma.diagnosisRecord.count({
     *   where: {
     *     // ... the filter for the DiagnosisRecords we want to count
     *   }
     * })
    **/
    count<T extends DiagnosisRecordCountArgs>(
      args?: Subset<T, DiagnosisRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DiagnosisRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DiagnosisRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiagnosisRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DiagnosisRecordAggregateArgs>(args: Subset<T, DiagnosisRecordAggregateArgs>): Prisma.PrismaPromise<GetDiagnosisRecordAggregateType<T>>

    /**
     * Group by DiagnosisRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiagnosisRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DiagnosisRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DiagnosisRecordGroupByArgs['orderBy'] }
        : { orderBy?: DiagnosisRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DiagnosisRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiagnosisRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DiagnosisRecord model
   */
  readonly fields: DiagnosisRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DiagnosisRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DiagnosisRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    supplementRecommendations<T extends DiagnosisRecord$supplementRecommendationsArgs<ExtArgs> = {}>(args?: Subset<T, DiagnosisRecord$supplementRecommendationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplementRecommendationPayload<ExtArgs>, T, 'findMany'> | Null>;

    hospitalRecommendations<T extends DiagnosisRecord$hospitalRecommendationsArgs<ExtArgs> = {}>(args?: Subset<T, DiagnosisRecord$hospitalRecommendationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HospitalRecommendationPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the DiagnosisRecord model
   */ 
  interface DiagnosisRecordFieldRefs {
    readonly id: FieldRef<"DiagnosisRecord", 'Int'>
    readonly userId: FieldRef<"DiagnosisRecord", 'Int'>
    readonly symptoms: FieldRef<"DiagnosisRecord", 'String'>
    readonly diagnosisResult: FieldRef<"DiagnosisRecord", 'String'>
    readonly departments: FieldRef<"DiagnosisRecord", 'String'>
    readonly heightAtDiagnosis: FieldRef<"DiagnosisRecord", 'Float'>
    readonly weightAtDiagnosis: FieldRef<"DiagnosisRecord", 'Float'>
    readonly smokingAtDiagnosis: FieldRef<"DiagnosisRecord", 'Boolean'>
    readonly drinkingFrequencyAtDiagnosis: FieldRef<"DiagnosisRecord", 'String'>
    readonly chronicDiseaseAtDiagnosis: FieldRef<"DiagnosisRecord", 'String'>
    readonly medicationsAtDiagnosis: FieldRef<"DiagnosisRecord", 'String'>
    readonly createdAt: FieldRef<"DiagnosisRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DiagnosisRecord findUnique
   */
  export type DiagnosisRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiagnosisRecord
     */
    select?: DiagnosisRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiagnosisRecordInclude<ExtArgs> | null
    /**
     * Filter, which DiagnosisRecord to fetch.
     */
    where: DiagnosisRecordWhereUniqueInput
  }

  /**
   * DiagnosisRecord findUniqueOrThrow
   */
  export type DiagnosisRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiagnosisRecord
     */
    select?: DiagnosisRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiagnosisRecordInclude<ExtArgs> | null
    /**
     * Filter, which DiagnosisRecord to fetch.
     */
    where: DiagnosisRecordWhereUniqueInput
  }

  /**
   * DiagnosisRecord findFirst
   */
  export type DiagnosisRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiagnosisRecord
     */
    select?: DiagnosisRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiagnosisRecordInclude<ExtArgs> | null
    /**
     * Filter, which DiagnosisRecord to fetch.
     */
    where?: DiagnosisRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiagnosisRecords to fetch.
     */
    orderBy?: DiagnosisRecordOrderByWithRelationInput | DiagnosisRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DiagnosisRecords.
     */
    cursor?: DiagnosisRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiagnosisRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiagnosisRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DiagnosisRecords.
     */
    distinct?: DiagnosisRecordScalarFieldEnum | DiagnosisRecordScalarFieldEnum[]
  }

  /**
   * DiagnosisRecord findFirstOrThrow
   */
  export type DiagnosisRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiagnosisRecord
     */
    select?: DiagnosisRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiagnosisRecordInclude<ExtArgs> | null
    /**
     * Filter, which DiagnosisRecord to fetch.
     */
    where?: DiagnosisRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiagnosisRecords to fetch.
     */
    orderBy?: DiagnosisRecordOrderByWithRelationInput | DiagnosisRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DiagnosisRecords.
     */
    cursor?: DiagnosisRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiagnosisRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiagnosisRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DiagnosisRecords.
     */
    distinct?: DiagnosisRecordScalarFieldEnum | DiagnosisRecordScalarFieldEnum[]
  }

  /**
   * DiagnosisRecord findMany
   */
  export type DiagnosisRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiagnosisRecord
     */
    select?: DiagnosisRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiagnosisRecordInclude<ExtArgs> | null
    /**
     * Filter, which DiagnosisRecords to fetch.
     */
    where?: DiagnosisRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiagnosisRecords to fetch.
     */
    orderBy?: DiagnosisRecordOrderByWithRelationInput | DiagnosisRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DiagnosisRecords.
     */
    cursor?: DiagnosisRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiagnosisRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiagnosisRecords.
     */
    skip?: number
    distinct?: DiagnosisRecordScalarFieldEnum | DiagnosisRecordScalarFieldEnum[]
  }

  /**
   * DiagnosisRecord create
   */
  export type DiagnosisRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiagnosisRecord
     */
    select?: DiagnosisRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiagnosisRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a DiagnosisRecord.
     */
    data: XOR<DiagnosisRecordCreateInput, DiagnosisRecordUncheckedCreateInput>
  }

  /**
   * DiagnosisRecord createMany
   */
  export type DiagnosisRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DiagnosisRecords.
     */
    data: DiagnosisRecordCreateManyInput | DiagnosisRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DiagnosisRecord createManyAndReturn
   */
  export type DiagnosisRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiagnosisRecord
     */
    select?: DiagnosisRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DiagnosisRecords.
     */
    data: DiagnosisRecordCreateManyInput | DiagnosisRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiagnosisRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DiagnosisRecord update
   */
  export type DiagnosisRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiagnosisRecord
     */
    select?: DiagnosisRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiagnosisRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a DiagnosisRecord.
     */
    data: XOR<DiagnosisRecordUpdateInput, DiagnosisRecordUncheckedUpdateInput>
    /**
     * Choose, which DiagnosisRecord to update.
     */
    where: DiagnosisRecordWhereUniqueInput
  }

  /**
   * DiagnosisRecord updateMany
   */
  export type DiagnosisRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DiagnosisRecords.
     */
    data: XOR<DiagnosisRecordUpdateManyMutationInput, DiagnosisRecordUncheckedUpdateManyInput>
    /**
     * Filter which DiagnosisRecords to update
     */
    where?: DiagnosisRecordWhereInput
  }

  /**
   * DiagnosisRecord upsert
   */
  export type DiagnosisRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiagnosisRecord
     */
    select?: DiagnosisRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiagnosisRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the DiagnosisRecord to update in case it exists.
     */
    where: DiagnosisRecordWhereUniqueInput
    /**
     * In case the DiagnosisRecord found by the `where` argument doesn't exist, create a new DiagnosisRecord with this data.
     */
    create: XOR<DiagnosisRecordCreateInput, DiagnosisRecordUncheckedCreateInput>
    /**
     * In case the DiagnosisRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DiagnosisRecordUpdateInput, DiagnosisRecordUncheckedUpdateInput>
  }

  /**
   * DiagnosisRecord delete
   */
  export type DiagnosisRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiagnosisRecord
     */
    select?: DiagnosisRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiagnosisRecordInclude<ExtArgs> | null
    /**
     * Filter which DiagnosisRecord to delete.
     */
    where: DiagnosisRecordWhereUniqueInput
  }

  /**
   * DiagnosisRecord deleteMany
   */
  export type DiagnosisRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DiagnosisRecords to delete
     */
    where?: DiagnosisRecordWhereInput
  }

  /**
   * DiagnosisRecord.supplementRecommendations
   */
  export type DiagnosisRecord$supplementRecommendationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplementRecommendation
     */
    select?: SupplementRecommendationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplementRecommendationInclude<ExtArgs> | null
    where?: SupplementRecommendationWhereInput
    orderBy?: SupplementRecommendationOrderByWithRelationInput | SupplementRecommendationOrderByWithRelationInput[]
    cursor?: SupplementRecommendationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SupplementRecommendationScalarFieldEnum | SupplementRecommendationScalarFieldEnum[]
  }

  /**
   * DiagnosisRecord.hospitalRecommendations
   */
  export type DiagnosisRecord$hospitalRecommendationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalRecommendation
     */
    select?: HospitalRecommendationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalRecommendationInclude<ExtArgs> | null
    where?: HospitalRecommendationWhereInput
    orderBy?: HospitalRecommendationOrderByWithRelationInput | HospitalRecommendationOrderByWithRelationInput[]
    cursor?: HospitalRecommendationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HospitalRecommendationScalarFieldEnum | HospitalRecommendationScalarFieldEnum[]
  }

  /**
   * DiagnosisRecord without action
   */
  export type DiagnosisRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiagnosisRecord
     */
    select?: DiagnosisRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiagnosisRecordInclude<ExtArgs> | null
  }


  /**
   * Model SupplementRecommendation
   */

  export type AggregateSupplementRecommendation = {
    _count: SupplementRecommendationCountAggregateOutputType | null
    _avg: SupplementRecommendationAvgAggregateOutputType | null
    _sum: SupplementRecommendationSumAggregateOutputType | null
    _min: SupplementRecommendationMinAggregateOutputType | null
    _max: SupplementRecommendationMaxAggregateOutputType | null
  }

  export type SupplementRecommendationAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    basedOnDiagnosisId: number | null
  }

  export type SupplementRecommendationSumAggregateOutputType = {
    id: number | null
    userId: number | null
    basedOnDiagnosisId: number | null
  }

  export type SupplementRecommendationMinAggregateOutputType = {
    id: number | null
    userId: number | null
    basedOnDiagnosisId: number | null
    recommendations: string | null
    createdAt: Date | null
  }

  export type SupplementRecommendationMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    basedOnDiagnosisId: number | null
    recommendations: string | null
    createdAt: Date | null
  }

  export type SupplementRecommendationCountAggregateOutputType = {
    id: number
    userId: number
    basedOnDiagnosisId: number
    recommendations: number
    createdAt: number
    _all: number
  }


  export type SupplementRecommendationAvgAggregateInputType = {
    id?: true
    userId?: true
    basedOnDiagnosisId?: true
  }

  export type SupplementRecommendationSumAggregateInputType = {
    id?: true
    userId?: true
    basedOnDiagnosisId?: true
  }

  export type SupplementRecommendationMinAggregateInputType = {
    id?: true
    userId?: true
    basedOnDiagnosisId?: true
    recommendations?: true
    createdAt?: true
  }

  export type SupplementRecommendationMaxAggregateInputType = {
    id?: true
    userId?: true
    basedOnDiagnosisId?: true
    recommendations?: true
    createdAt?: true
  }

  export type SupplementRecommendationCountAggregateInputType = {
    id?: true
    userId?: true
    basedOnDiagnosisId?: true
    recommendations?: true
    createdAt?: true
    _all?: true
  }

  export type SupplementRecommendationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupplementRecommendation to aggregate.
     */
    where?: SupplementRecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupplementRecommendations to fetch.
     */
    orderBy?: SupplementRecommendationOrderByWithRelationInput | SupplementRecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupplementRecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupplementRecommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupplementRecommendations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SupplementRecommendations
    **/
    _count?: true | SupplementRecommendationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SupplementRecommendationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SupplementRecommendationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupplementRecommendationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupplementRecommendationMaxAggregateInputType
  }

  export type GetSupplementRecommendationAggregateType<T extends SupplementRecommendationAggregateArgs> = {
        [P in keyof T & keyof AggregateSupplementRecommendation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupplementRecommendation[P]>
      : GetScalarType<T[P], AggregateSupplementRecommendation[P]>
  }




  export type SupplementRecommendationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupplementRecommendationWhereInput
    orderBy?: SupplementRecommendationOrderByWithAggregationInput | SupplementRecommendationOrderByWithAggregationInput[]
    by: SupplementRecommendationScalarFieldEnum[] | SupplementRecommendationScalarFieldEnum
    having?: SupplementRecommendationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupplementRecommendationCountAggregateInputType | true
    _avg?: SupplementRecommendationAvgAggregateInputType
    _sum?: SupplementRecommendationSumAggregateInputType
    _min?: SupplementRecommendationMinAggregateInputType
    _max?: SupplementRecommendationMaxAggregateInputType
  }

  export type SupplementRecommendationGroupByOutputType = {
    id: number
    userId: number
    basedOnDiagnosisId: number | null
    recommendations: string
    createdAt: Date
    _count: SupplementRecommendationCountAggregateOutputType | null
    _avg: SupplementRecommendationAvgAggregateOutputType | null
    _sum: SupplementRecommendationSumAggregateOutputType | null
    _min: SupplementRecommendationMinAggregateOutputType | null
    _max: SupplementRecommendationMaxAggregateOutputType | null
  }

  type GetSupplementRecommendationGroupByPayload<T extends SupplementRecommendationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupplementRecommendationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupplementRecommendationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupplementRecommendationGroupByOutputType[P]>
            : GetScalarType<T[P], SupplementRecommendationGroupByOutputType[P]>
        }
      >
    >


  export type SupplementRecommendationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    basedOnDiagnosisId?: boolean
    recommendations?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    diagnosisRecord?: boolean | SupplementRecommendation$diagnosisRecordArgs<ExtArgs>
  }, ExtArgs["result"]["supplementRecommendation"]>

  export type SupplementRecommendationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    basedOnDiagnosisId?: boolean
    recommendations?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    diagnosisRecord?: boolean | SupplementRecommendation$diagnosisRecordArgs<ExtArgs>
  }, ExtArgs["result"]["supplementRecommendation"]>

  export type SupplementRecommendationSelectScalar = {
    id?: boolean
    userId?: boolean
    basedOnDiagnosisId?: boolean
    recommendations?: boolean
    createdAt?: boolean
  }

  export type SupplementRecommendationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    diagnosisRecord?: boolean | SupplementRecommendation$diagnosisRecordArgs<ExtArgs>
  }
  export type SupplementRecommendationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    diagnosisRecord?: boolean | SupplementRecommendation$diagnosisRecordArgs<ExtArgs>
  }

  export type $SupplementRecommendationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SupplementRecommendation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      diagnosisRecord: Prisma.$DiagnosisRecordPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      basedOnDiagnosisId: number | null
      recommendations: string
      createdAt: Date
    }, ExtArgs["result"]["supplementRecommendation"]>
    composites: {}
  }

  type SupplementRecommendationGetPayload<S extends boolean | null | undefined | SupplementRecommendationDefaultArgs> = $Result.GetResult<Prisma.$SupplementRecommendationPayload, S>

  type SupplementRecommendationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SupplementRecommendationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SupplementRecommendationCountAggregateInputType | true
    }

  export interface SupplementRecommendationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SupplementRecommendation'], meta: { name: 'SupplementRecommendation' } }
    /**
     * Find zero or one SupplementRecommendation that matches the filter.
     * @param {SupplementRecommendationFindUniqueArgs} args - Arguments to find a SupplementRecommendation
     * @example
     * // Get one SupplementRecommendation
     * const supplementRecommendation = await prisma.supplementRecommendation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SupplementRecommendationFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, SupplementRecommendationFindUniqueArgs<ExtArgs>>
    ): Prisma__SupplementRecommendationClient<$Result.GetResult<Prisma.$SupplementRecommendationPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one SupplementRecommendation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SupplementRecommendationFindUniqueOrThrowArgs} args - Arguments to find a SupplementRecommendation
     * @example
     * // Get one SupplementRecommendation
     * const supplementRecommendation = await prisma.supplementRecommendation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SupplementRecommendationFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SupplementRecommendationFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__SupplementRecommendationClient<$Result.GetResult<Prisma.$SupplementRecommendationPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first SupplementRecommendation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplementRecommendationFindFirstArgs} args - Arguments to find a SupplementRecommendation
     * @example
     * // Get one SupplementRecommendation
     * const supplementRecommendation = await prisma.supplementRecommendation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SupplementRecommendationFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, SupplementRecommendationFindFirstArgs<ExtArgs>>
    ): Prisma__SupplementRecommendationClient<$Result.GetResult<Prisma.$SupplementRecommendationPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first SupplementRecommendation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplementRecommendationFindFirstOrThrowArgs} args - Arguments to find a SupplementRecommendation
     * @example
     * // Get one SupplementRecommendation
     * const supplementRecommendation = await prisma.supplementRecommendation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SupplementRecommendationFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SupplementRecommendationFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__SupplementRecommendationClient<$Result.GetResult<Prisma.$SupplementRecommendationPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more SupplementRecommendations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplementRecommendationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SupplementRecommendations
     * const supplementRecommendations = await prisma.supplementRecommendation.findMany()
     * 
     * // Get first 10 SupplementRecommendations
     * const supplementRecommendations = await prisma.supplementRecommendation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supplementRecommendationWithIdOnly = await prisma.supplementRecommendation.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends SupplementRecommendationFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SupplementRecommendationFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplementRecommendationPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a SupplementRecommendation.
     * @param {SupplementRecommendationCreateArgs} args - Arguments to create a SupplementRecommendation.
     * @example
     * // Create one SupplementRecommendation
     * const SupplementRecommendation = await prisma.supplementRecommendation.create({
     *   data: {
     *     // ... data to create a SupplementRecommendation
     *   }
     * })
     * 
    **/
    create<T extends SupplementRecommendationCreateArgs<ExtArgs>>(
      args: SelectSubset<T, SupplementRecommendationCreateArgs<ExtArgs>>
    ): Prisma__SupplementRecommendationClient<$Result.GetResult<Prisma.$SupplementRecommendationPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many SupplementRecommendations.
     * @param {SupplementRecommendationCreateManyArgs} args - Arguments to create many SupplementRecommendations.
     * @example
     * // Create many SupplementRecommendations
     * const supplementRecommendation = await prisma.supplementRecommendation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends SupplementRecommendationCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SupplementRecommendationCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SupplementRecommendations and returns the data saved in the database.
     * @param {SupplementRecommendationCreateManyAndReturnArgs} args - Arguments to create many SupplementRecommendations.
     * @example
     * // Create many SupplementRecommendations
     * const supplementRecommendation = await prisma.supplementRecommendation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SupplementRecommendations and only return the `id`
     * const supplementRecommendationWithIdOnly = await prisma.supplementRecommendation.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends SupplementRecommendationCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, SupplementRecommendationCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplementRecommendationPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a SupplementRecommendation.
     * @param {SupplementRecommendationDeleteArgs} args - Arguments to delete one SupplementRecommendation.
     * @example
     * // Delete one SupplementRecommendation
     * const SupplementRecommendation = await prisma.supplementRecommendation.delete({
     *   where: {
     *     // ... filter to delete one SupplementRecommendation
     *   }
     * })
     * 
    **/
    delete<T extends SupplementRecommendationDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, SupplementRecommendationDeleteArgs<ExtArgs>>
    ): Prisma__SupplementRecommendationClient<$Result.GetResult<Prisma.$SupplementRecommendationPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one SupplementRecommendation.
     * @param {SupplementRecommendationUpdateArgs} args - Arguments to update one SupplementRecommendation.
     * @example
     * // Update one SupplementRecommendation
     * const supplementRecommendation = await prisma.supplementRecommendation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SupplementRecommendationUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, SupplementRecommendationUpdateArgs<ExtArgs>>
    ): Prisma__SupplementRecommendationClient<$Result.GetResult<Prisma.$SupplementRecommendationPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more SupplementRecommendations.
     * @param {SupplementRecommendationDeleteManyArgs} args - Arguments to filter SupplementRecommendations to delete.
     * @example
     * // Delete a few SupplementRecommendations
     * const { count } = await prisma.supplementRecommendation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SupplementRecommendationDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SupplementRecommendationDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupplementRecommendations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplementRecommendationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SupplementRecommendations
     * const supplementRecommendation = await prisma.supplementRecommendation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SupplementRecommendationUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, SupplementRecommendationUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SupplementRecommendation.
     * @param {SupplementRecommendationUpsertArgs} args - Arguments to update or create a SupplementRecommendation.
     * @example
     * // Update or create a SupplementRecommendation
     * const supplementRecommendation = await prisma.supplementRecommendation.upsert({
     *   create: {
     *     // ... data to create a SupplementRecommendation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SupplementRecommendation we want to update
     *   }
     * })
    **/
    upsert<T extends SupplementRecommendationUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, SupplementRecommendationUpsertArgs<ExtArgs>>
    ): Prisma__SupplementRecommendationClient<$Result.GetResult<Prisma.$SupplementRecommendationPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of SupplementRecommendations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplementRecommendationCountArgs} args - Arguments to filter SupplementRecommendations to count.
     * @example
     * // Count the number of SupplementRecommendations
     * const count = await prisma.supplementRecommendation.count({
     *   where: {
     *     // ... the filter for the SupplementRecommendations we want to count
     *   }
     * })
    **/
    count<T extends SupplementRecommendationCountArgs>(
      args?: Subset<T, SupplementRecommendationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupplementRecommendationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SupplementRecommendation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplementRecommendationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SupplementRecommendationAggregateArgs>(args: Subset<T, SupplementRecommendationAggregateArgs>): Prisma.PrismaPromise<GetSupplementRecommendationAggregateType<T>>

    /**
     * Group by SupplementRecommendation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplementRecommendationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SupplementRecommendationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupplementRecommendationGroupByArgs['orderBy'] }
        : { orderBy?: SupplementRecommendationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SupplementRecommendationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupplementRecommendationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SupplementRecommendation model
   */
  readonly fields: SupplementRecommendationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SupplementRecommendation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupplementRecommendationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    diagnosisRecord<T extends SupplementRecommendation$diagnosisRecordArgs<ExtArgs> = {}>(args?: Subset<T, SupplementRecommendation$diagnosisRecordArgs<ExtArgs>>): Prisma__DiagnosisRecordClient<$Result.GetResult<Prisma.$DiagnosisRecordPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the SupplementRecommendation model
   */ 
  interface SupplementRecommendationFieldRefs {
    readonly id: FieldRef<"SupplementRecommendation", 'Int'>
    readonly userId: FieldRef<"SupplementRecommendation", 'Int'>
    readonly basedOnDiagnosisId: FieldRef<"SupplementRecommendation", 'Int'>
    readonly recommendations: FieldRef<"SupplementRecommendation", 'String'>
    readonly createdAt: FieldRef<"SupplementRecommendation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SupplementRecommendation findUnique
   */
  export type SupplementRecommendationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplementRecommendation
     */
    select?: SupplementRecommendationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplementRecommendationInclude<ExtArgs> | null
    /**
     * Filter, which SupplementRecommendation to fetch.
     */
    where: SupplementRecommendationWhereUniqueInput
  }

  /**
   * SupplementRecommendation findUniqueOrThrow
   */
  export type SupplementRecommendationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplementRecommendation
     */
    select?: SupplementRecommendationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplementRecommendationInclude<ExtArgs> | null
    /**
     * Filter, which SupplementRecommendation to fetch.
     */
    where: SupplementRecommendationWhereUniqueInput
  }

  /**
   * SupplementRecommendation findFirst
   */
  export type SupplementRecommendationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplementRecommendation
     */
    select?: SupplementRecommendationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplementRecommendationInclude<ExtArgs> | null
    /**
     * Filter, which SupplementRecommendation to fetch.
     */
    where?: SupplementRecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupplementRecommendations to fetch.
     */
    orderBy?: SupplementRecommendationOrderByWithRelationInput | SupplementRecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupplementRecommendations.
     */
    cursor?: SupplementRecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupplementRecommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupplementRecommendations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupplementRecommendations.
     */
    distinct?: SupplementRecommendationScalarFieldEnum | SupplementRecommendationScalarFieldEnum[]
  }

  /**
   * SupplementRecommendation findFirstOrThrow
   */
  export type SupplementRecommendationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplementRecommendation
     */
    select?: SupplementRecommendationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplementRecommendationInclude<ExtArgs> | null
    /**
     * Filter, which SupplementRecommendation to fetch.
     */
    where?: SupplementRecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupplementRecommendations to fetch.
     */
    orderBy?: SupplementRecommendationOrderByWithRelationInput | SupplementRecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupplementRecommendations.
     */
    cursor?: SupplementRecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupplementRecommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupplementRecommendations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupplementRecommendations.
     */
    distinct?: SupplementRecommendationScalarFieldEnum | SupplementRecommendationScalarFieldEnum[]
  }

  /**
   * SupplementRecommendation findMany
   */
  export type SupplementRecommendationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplementRecommendation
     */
    select?: SupplementRecommendationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplementRecommendationInclude<ExtArgs> | null
    /**
     * Filter, which SupplementRecommendations to fetch.
     */
    where?: SupplementRecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupplementRecommendations to fetch.
     */
    orderBy?: SupplementRecommendationOrderByWithRelationInput | SupplementRecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SupplementRecommendations.
     */
    cursor?: SupplementRecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupplementRecommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupplementRecommendations.
     */
    skip?: number
    distinct?: SupplementRecommendationScalarFieldEnum | SupplementRecommendationScalarFieldEnum[]
  }

  /**
   * SupplementRecommendation create
   */
  export type SupplementRecommendationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplementRecommendation
     */
    select?: SupplementRecommendationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplementRecommendationInclude<ExtArgs> | null
    /**
     * The data needed to create a SupplementRecommendation.
     */
    data: XOR<SupplementRecommendationCreateInput, SupplementRecommendationUncheckedCreateInput>
  }

  /**
   * SupplementRecommendation createMany
   */
  export type SupplementRecommendationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SupplementRecommendations.
     */
    data: SupplementRecommendationCreateManyInput | SupplementRecommendationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SupplementRecommendation createManyAndReturn
   */
  export type SupplementRecommendationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplementRecommendation
     */
    select?: SupplementRecommendationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SupplementRecommendations.
     */
    data: SupplementRecommendationCreateManyInput | SupplementRecommendationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplementRecommendationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SupplementRecommendation update
   */
  export type SupplementRecommendationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplementRecommendation
     */
    select?: SupplementRecommendationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplementRecommendationInclude<ExtArgs> | null
    /**
     * The data needed to update a SupplementRecommendation.
     */
    data: XOR<SupplementRecommendationUpdateInput, SupplementRecommendationUncheckedUpdateInput>
    /**
     * Choose, which SupplementRecommendation to update.
     */
    where: SupplementRecommendationWhereUniqueInput
  }

  /**
   * SupplementRecommendation updateMany
   */
  export type SupplementRecommendationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SupplementRecommendations.
     */
    data: XOR<SupplementRecommendationUpdateManyMutationInput, SupplementRecommendationUncheckedUpdateManyInput>
    /**
     * Filter which SupplementRecommendations to update
     */
    where?: SupplementRecommendationWhereInput
  }

  /**
   * SupplementRecommendation upsert
   */
  export type SupplementRecommendationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplementRecommendation
     */
    select?: SupplementRecommendationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplementRecommendationInclude<ExtArgs> | null
    /**
     * The filter to search for the SupplementRecommendation to update in case it exists.
     */
    where: SupplementRecommendationWhereUniqueInput
    /**
     * In case the SupplementRecommendation found by the `where` argument doesn't exist, create a new SupplementRecommendation with this data.
     */
    create: XOR<SupplementRecommendationCreateInput, SupplementRecommendationUncheckedCreateInput>
    /**
     * In case the SupplementRecommendation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupplementRecommendationUpdateInput, SupplementRecommendationUncheckedUpdateInput>
  }

  /**
   * SupplementRecommendation delete
   */
  export type SupplementRecommendationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplementRecommendation
     */
    select?: SupplementRecommendationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplementRecommendationInclude<ExtArgs> | null
    /**
     * Filter which SupplementRecommendation to delete.
     */
    where: SupplementRecommendationWhereUniqueInput
  }

  /**
   * SupplementRecommendation deleteMany
   */
  export type SupplementRecommendationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupplementRecommendations to delete
     */
    where?: SupplementRecommendationWhereInput
  }

  /**
   * SupplementRecommendation.diagnosisRecord
   */
  export type SupplementRecommendation$diagnosisRecordArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiagnosisRecord
     */
    select?: DiagnosisRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiagnosisRecordInclude<ExtArgs> | null
    where?: DiagnosisRecordWhereInput
  }

  /**
   * SupplementRecommendation without action
   */
  export type SupplementRecommendationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplementRecommendation
     */
    select?: SupplementRecommendationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplementRecommendationInclude<ExtArgs> | null
  }


  /**
   * Model HospitalRecommendation
   */

  export type AggregateHospitalRecommendation = {
    _count: HospitalRecommendationCountAggregateOutputType | null
    _avg: HospitalRecommendationAvgAggregateOutputType | null
    _sum: HospitalRecommendationSumAggregateOutputType | null
    _min: HospitalRecommendationMinAggregateOutputType | null
    _max: HospitalRecommendationMaxAggregateOutputType | null
  }

  export type HospitalRecommendationAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    basedOnDiagnosisId: number | null
  }

  export type HospitalRecommendationSumAggregateOutputType = {
    id: number | null
    userId: number | null
    basedOnDiagnosisId: number | null
  }

  export type HospitalRecommendationMinAggregateOutputType = {
    id: number | null
    userId: number | null
    basedOnDiagnosisId: number | null
    location: string | null
    recommendedHospitals: string | null
    createdAt: Date | null
  }

  export type HospitalRecommendationMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    basedOnDiagnosisId: number | null
    location: string | null
    recommendedHospitals: string | null
    createdAt: Date | null
  }

  export type HospitalRecommendationCountAggregateOutputType = {
    id: number
    userId: number
    basedOnDiagnosisId: number
    location: number
    recommendedHospitals: number
    createdAt: number
    _all: number
  }


  export type HospitalRecommendationAvgAggregateInputType = {
    id?: true
    userId?: true
    basedOnDiagnosisId?: true
  }

  export type HospitalRecommendationSumAggregateInputType = {
    id?: true
    userId?: true
    basedOnDiagnosisId?: true
  }

  export type HospitalRecommendationMinAggregateInputType = {
    id?: true
    userId?: true
    basedOnDiagnosisId?: true
    location?: true
    recommendedHospitals?: true
    createdAt?: true
  }

  export type HospitalRecommendationMaxAggregateInputType = {
    id?: true
    userId?: true
    basedOnDiagnosisId?: true
    location?: true
    recommendedHospitals?: true
    createdAt?: true
  }

  export type HospitalRecommendationCountAggregateInputType = {
    id?: true
    userId?: true
    basedOnDiagnosisId?: true
    location?: true
    recommendedHospitals?: true
    createdAt?: true
    _all?: true
  }

  export type HospitalRecommendationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HospitalRecommendation to aggregate.
     */
    where?: HospitalRecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HospitalRecommendations to fetch.
     */
    orderBy?: HospitalRecommendationOrderByWithRelationInput | HospitalRecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HospitalRecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HospitalRecommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HospitalRecommendations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HospitalRecommendations
    **/
    _count?: true | HospitalRecommendationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HospitalRecommendationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HospitalRecommendationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HospitalRecommendationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HospitalRecommendationMaxAggregateInputType
  }

  export type GetHospitalRecommendationAggregateType<T extends HospitalRecommendationAggregateArgs> = {
        [P in keyof T & keyof AggregateHospitalRecommendation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHospitalRecommendation[P]>
      : GetScalarType<T[P], AggregateHospitalRecommendation[P]>
  }




  export type HospitalRecommendationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HospitalRecommendationWhereInput
    orderBy?: HospitalRecommendationOrderByWithAggregationInput | HospitalRecommendationOrderByWithAggregationInput[]
    by: HospitalRecommendationScalarFieldEnum[] | HospitalRecommendationScalarFieldEnum
    having?: HospitalRecommendationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HospitalRecommendationCountAggregateInputType | true
    _avg?: HospitalRecommendationAvgAggregateInputType
    _sum?: HospitalRecommendationSumAggregateInputType
    _min?: HospitalRecommendationMinAggregateInputType
    _max?: HospitalRecommendationMaxAggregateInputType
  }

  export type HospitalRecommendationGroupByOutputType = {
    id: number
    userId: number
    basedOnDiagnosisId: number | null
    location: string | null
    recommendedHospitals: string
    createdAt: Date
    _count: HospitalRecommendationCountAggregateOutputType | null
    _avg: HospitalRecommendationAvgAggregateOutputType | null
    _sum: HospitalRecommendationSumAggregateOutputType | null
    _min: HospitalRecommendationMinAggregateOutputType | null
    _max: HospitalRecommendationMaxAggregateOutputType | null
  }

  type GetHospitalRecommendationGroupByPayload<T extends HospitalRecommendationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HospitalRecommendationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HospitalRecommendationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HospitalRecommendationGroupByOutputType[P]>
            : GetScalarType<T[P], HospitalRecommendationGroupByOutputType[P]>
        }
      >
    >


  export type HospitalRecommendationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    basedOnDiagnosisId?: boolean
    location?: boolean
    recommendedHospitals?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    diagnosisRecord?: boolean | HospitalRecommendation$diagnosisRecordArgs<ExtArgs>
  }, ExtArgs["result"]["hospitalRecommendation"]>

  export type HospitalRecommendationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    basedOnDiagnosisId?: boolean
    location?: boolean
    recommendedHospitals?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    diagnosisRecord?: boolean | HospitalRecommendation$diagnosisRecordArgs<ExtArgs>
  }, ExtArgs["result"]["hospitalRecommendation"]>

  export type HospitalRecommendationSelectScalar = {
    id?: boolean
    userId?: boolean
    basedOnDiagnosisId?: boolean
    location?: boolean
    recommendedHospitals?: boolean
    createdAt?: boolean
  }

  export type HospitalRecommendationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    diagnosisRecord?: boolean | HospitalRecommendation$diagnosisRecordArgs<ExtArgs>
  }
  export type HospitalRecommendationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    diagnosisRecord?: boolean | HospitalRecommendation$diagnosisRecordArgs<ExtArgs>
  }

  export type $HospitalRecommendationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HospitalRecommendation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      diagnosisRecord: Prisma.$DiagnosisRecordPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      basedOnDiagnosisId: number | null
      location: string | null
      recommendedHospitals: string
      createdAt: Date
    }, ExtArgs["result"]["hospitalRecommendation"]>
    composites: {}
  }

  type HospitalRecommendationGetPayload<S extends boolean | null | undefined | HospitalRecommendationDefaultArgs> = $Result.GetResult<Prisma.$HospitalRecommendationPayload, S>

  type HospitalRecommendationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<HospitalRecommendationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: HospitalRecommendationCountAggregateInputType | true
    }

  export interface HospitalRecommendationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HospitalRecommendation'], meta: { name: 'HospitalRecommendation' } }
    /**
     * Find zero or one HospitalRecommendation that matches the filter.
     * @param {HospitalRecommendationFindUniqueArgs} args - Arguments to find a HospitalRecommendation
     * @example
     * // Get one HospitalRecommendation
     * const hospitalRecommendation = await prisma.hospitalRecommendation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends HospitalRecommendationFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, HospitalRecommendationFindUniqueArgs<ExtArgs>>
    ): Prisma__HospitalRecommendationClient<$Result.GetResult<Prisma.$HospitalRecommendationPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one HospitalRecommendation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {HospitalRecommendationFindUniqueOrThrowArgs} args - Arguments to find a HospitalRecommendation
     * @example
     * // Get one HospitalRecommendation
     * const hospitalRecommendation = await prisma.hospitalRecommendation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends HospitalRecommendationFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, HospitalRecommendationFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__HospitalRecommendationClient<$Result.GetResult<Prisma.$HospitalRecommendationPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first HospitalRecommendation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalRecommendationFindFirstArgs} args - Arguments to find a HospitalRecommendation
     * @example
     * // Get one HospitalRecommendation
     * const hospitalRecommendation = await prisma.hospitalRecommendation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends HospitalRecommendationFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, HospitalRecommendationFindFirstArgs<ExtArgs>>
    ): Prisma__HospitalRecommendationClient<$Result.GetResult<Prisma.$HospitalRecommendationPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first HospitalRecommendation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalRecommendationFindFirstOrThrowArgs} args - Arguments to find a HospitalRecommendation
     * @example
     * // Get one HospitalRecommendation
     * const hospitalRecommendation = await prisma.hospitalRecommendation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends HospitalRecommendationFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, HospitalRecommendationFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__HospitalRecommendationClient<$Result.GetResult<Prisma.$HospitalRecommendationPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more HospitalRecommendations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalRecommendationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HospitalRecommendations
     * const hospitalRecommendations = await prisma.hospitalRecommendation.findMany()
     * 
     * // Get first 10 HospitalRecommendations
     * const hospitalRecommendations = await prisma.hospitalRecommendation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hospitalRecommendationWithIdOnly = await prisma.hospitalRecommendation.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends HospitalRecommendationFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, HospitalRecommendationFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HospitalRecommendationPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a HospitalRecommendation.
     * @param {HospitalRecommendationCreateArgs} args - Arguments to create a HospitalRecommendation.
     * @example
     * // Create one HospitalRecommendation
     * const HospitalRecommendation = await prisma.hospitalRecommendation.create({
     *   data: {
     *     // ... data to create a HospitalRecommendation
     *   }
     * })
     * 
    **/
    create<T extends HospitalRecommendationCreateArgs<ExtArgs>>(
      args: SelectSubset<T, HospitalRecommendationCreateArgs<ExtArgs>>
    ): Prisma__HospitalRecommendationClient<$Result.GetResult<Prisma.$HospitalRecommendationPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many HospitalRecommendations.
     * @param {HospitalRecommendationCreateManyArgs} args - Arguments to create many HospitalRecommendations.
     * @example
     * // Create many HospitalRecommendations
     * const hospitalRecommendation = await prisma.hospitalRecommendation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends HospitalRecommendationCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, HospitalRecommendationCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HospitalRecommendations and returns the data saved in the database.
     * @param {HospitalRecommendationCreateManyAndReturnArgs} args - Arguments to create many HospitalRecommendations.
     * @example
     * // Create many HospitalRecommendations
     * const hospitalRecommendation = await prisma.hospitalRecommendation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HospitalRecommendations and only return the `id`
     * const hospitalRecommendationWithIdOnly = await prisma.hospitalRecommendation.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends HospitalRecommendationCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, HospitalRecommendationCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HospitalRecommendationPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a HospitalRecommendation.
     * @param {HospitalRecommendationDeleteArgs} args - Arguments to delete one HospitalRecommendation.
     * @example
     * // Delete one HospitalRecommendation
     * const HospitalRecommendation = await prisma.hospitalRecommendation.delete({
     *   where: {
     *     // ... filter to delete one HospitalRecommendation
     *   }
     * })
     * 
    **/
    delete<T extends HospitalRecommendationDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, HospitalRecommendationDeleteArgs<ExtArgs>>
    ): Prisma__HospitalRecommendationClient<$Result.GetResult<Prisma.$HospitalRecommendationPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one HospitalRecommendation.
     * @param {HospitalRecommendationUpdateArgs} args - Arguments to update one HospitalRecommendation.
     * @example
     * // Update one HospitalRecommendation
     * const hospitalRecommendation = await prisma.hospitalRecommendation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends HospitalRecommendationUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, HospitalRecommendationUpdateArgs<ExtArgs>>
    ): Prisma__HospitalRecommendationClient<$Result.GetResult<Prisma.$HospitalRecommendationPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more HospitalRecommendations.
     * @param {HospitalRecommendationDeleteManyArgs} args - Arguments to filter HospitalRecommendations to delete.
     * @example
     * // Delete a few HospitalRecommendations
     * const { count } = await prisma.hospitalRecommendation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends HospitalRecommendationDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, HospitalRecommendationDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HospitalRecommendations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalRecommendationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HospitalRecommendations
     * const hospitalRecommendation = await prisma.hospitalRecommendation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends HospitalRecommendationUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, HospitalRecommendationUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one HospitalRecommendation.
     * @param {HospitalRecommendationUpsertArgs} args - Arguments to update or create a HospitalRecommendation.
     * @example
     * // Update or create a HospitalRecommendation
     * const hospitalRecommendation = await prisma.hospitalRecommendation.upsert({
     *   create: {
     *     // ... data to create a HospitalRecommendation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HospitalRecommendation we want to update
     *   }
     * })
    **/
    upsert<T extends HospitalRecommendationUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, HospitalRecommendationUpsertArgs<ExtArgs>>
    ): Prisma__HospitalRecommendationClient<$Result.GetResult<Prisma.$HospitalRecommendationPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of HospitalRecommendations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalRecommendationCountArgs} args - Arguments to filter HospitalRecommendations to count.
     * @example
     * // Count the number of HospitalRecommendations
     * const count = await prisma.hospitalRecommendation.count({
     *   where: {
     *     // ... the filter for the HospitalRecommendations we want to count
     *   }
     * })
    **/
    count<T extends HospitalRecommendationCountArgs>(
      args?: Subset<T, HospitalRecommendationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HospitalRecommendationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HospitalRecommendation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalRecommendationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HospitalRecommendationAggregateArgs>(args: Subset<T, HospitalRecommendationAggregateArgs>): Prisma.PrismaPromise<GetHospitalRecommendationAggregateType<T>>

    /**
     * Group by HospitalRecommendation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalRecommendationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HospitalRecommendationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HospitalRecommendationGroupByArgs['orderBy'] }
        : { orderBy?: HospitalRecommendationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HospitalRecommendationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHospitalRecommendationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HospitalRecommendation model
   */
  readonly fields: HospitalRecommendationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HospitalRecommendation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HospitalRecommendationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    diagnosisRecord<T extends HospitalRecommendation$diagnosisRecordArgs<ExtArgs> = {}>(args?: Subset<T, HospitalRecommendation$diagnosisRecordArgs<ExtArgs>>): Prisma__DiagnosisRecordClient<$Result.GetResult<Prisma.$DiagnosisRecordPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the HospitalRecommendation model
   */ 
  interface HospitalRecommendationFieldRefs {
    readonly id: FieldRef<"HospitalRecommendation", 'Int'>
    readonly userId: FieldRef<"HospitalRecommendation", 'Int'>
    readonly basedOnDiagnosisId: FieldRef<"HospitalRecommendation", 'Int'>
    readonly location: FieldRef<"HospitalRecommendation", 'String'>
    readonly recommendedHospitals: FieldRef<"HospitalRecommendation", 'String'>
    readonly createdAt: FieldRef<"HospitalRecommendation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HospitalRecommendation findUnique
   */
  export type HospitalRecommendationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalRecommendation
     */
    select?: HospitalRecommendationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalRecommendationInclude<ExtArgs> | null
    /**
     * Filter, which HospitalRecommendation to fetch.
     */
    where: HospitalRecommendationWhereUniqueInput
  }

  /**
   * HospitalRecommendation findUniqueOrThrow
   */
  export type HospitalRecommendationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalRecommendation
     */
    select?: HospitalRecommendationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalRecommendationInclude<ExtArgs> | null
    /**
     * Filter, which HospitalRecommendation to fetch.
     */
    where: HospitalRecommendationWhereUniqueInput
  }

  /**
   * HospitalRecommendation findFirst
   */
  export type HospitalRecommendationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalRecommendation
     */
    select?: HospitalRecommendationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalRecommendationInclude<ExtArgs> | null
    /**
     * Filter, which HospitalRecommendation to fetch.
     */
    where?: HospitalRecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HospitalRecommendations to fetch.
     */
    orderBy?: HospitalRecommendationOrderByWithRelationInput | HospitalRecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HospitalRecommendations.
     */
    cursor?: HospitalRecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HospitalRecommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HospitalRecommendations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HospitalRecommendations.
     */
    distinct?: HospitalRecommendationScalarFieldEnum | HospitalRecommendationScalarFieldEnum[]
  }

  /**
   * HospitalRecommendation findFirstOrThrow
   */
  export type HospitalRecommendationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalRecommendation
     */
    select?: HospitalRecommendationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalRecommendationInclude<ExtArgs> | null
    /**
     * Filter, which HospitalRecommendation to fetch.
     */
    where?: HospitalRecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HospitalRecommendations to fetch.
     */
    orderBy?: HospitalRecommendationOrderByWithRelationInput | HospitalRecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HospitalRecommendations.
     */
    cursor?: HospitalRecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HospitalRecommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HospitalRecommendations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HospitalRecommendations.
     */
    distinct?: HospitalRecommendationScalarFieldEnum | HospitalRecommendationScalarFieldEnum[]
  }

  /**
   * HospitalRecommendation findMany
   */
  export type HospitalRecommendationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalRecommendation
     */
    select?: HospitalRecommendationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalRecommendationInclude<ExtArgs> | null
    /**
     * Filter, which HospitalRecommendations to fetch.
     */
    where?: HospitalRecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HospitalRecommendations to fetch.
     */
    orderBy?: HospitalRecommendationOrderByWithRelationInput | HospitalRecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HospitalRecommendations.
     */
    cursor?: HospitalRecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HospitalRecommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HospitalRecommendations.
     */
    skip?: number
    distinct?: HospitalRecommendationScalarFieldEnum | HospitalRecommendationScalarFieldEnum[]
  }

  /**
   * HospitalRecommendation create
   */
  export type HospitalRecommendationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalRecommendation
     */
    select?: HospitalRecommendationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalRecommendationInclude<ExtArgs> | null
    /**
     * The data needed to create a HospitalRecommendation.
     */
    data: XOR<HospitalRecommendationCreateInput, HospitalRecommendationUncheckedCreateInput>
  }

  /**
   * HospitalRecommendation createMany
   */
  export type HospitalRecommendationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HospitalRecommendations.
     */
    data: HospitalRecommendationCreateManyInput | HospitalRecommendationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HospitalRecommendation createManyAndReturn
   */
  export type HospitalRecommendationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalRecommendation
     */
    select?: HospitalRecommendationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many HospitalRecommendations.
     */
    data: HospitalRecommendationCreateManyInput | HospitalRecommendationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalRecommendationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HospitalRecommendation update
   */
  export type HospitalRecommendationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalRecommendation
     */
    select?: HospitalRecommendationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalRecommendationInclude<ExtArgs> | null
    /**
     * The data needed to update a HospitalRecommendation.
     */
    data: XOR<HospitalRecommendationUpdateInput, HospitalRecommendationUncheckedUpdateInput>
    /**
     * Choose, which HospitalRecommendation to update.
     */
    where: HospitalRecommendationWhereUniqueInput
  }

  /**
   * HospitalRecommendation updateMany
   */
  export type HospitalRecommendationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HospitalRecommendations.
     */
    data: XOR<HospitalRecommendationUpdateManyMutationInput, HospitalRecommendationUncheckedUpdateManyInput>
    /**
     * Filter which HospitalRecommendations to update
     */
    where?: HospitalRecommendationWhereInput
  }

  /**
   * HospitalRecommendation upsert
   */
  export type HospitalRecommendationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalRecommendation
     */
    select?: HospitalRecommendationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalRecommendationInclude<ExtArgs> | null
    /**
     * The filter to search for the HospitalRecommendation to update in case it exists.
     */
    where: HospitalRecommendationWhereUniqueInput
    /**
     * In case the HospitalRecommendation found by the `where` argument doesn't exist, create a new HospitalRecommendation with this data.
     */
    create: XOR<HospitalRecommendationCreateInput, HospitalRecommendationUncheckedCreateInput>
    /**
     * In case the HospitalRecommendation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HospitalRecommendationUpdateInput, HospitalRecommendationUncheckedUpdateInput>
  }

  /**
   * HospitalRecommendation delete
   */
  export type HospitalRecommendationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalRecommendation
     */
    select?: HospitalRecommendationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalRecommendationInclude<ExtArgs> | null
    /**
     * Filter which HospitalRecommendation to delete.
     */
    where: HospitalRecommendationWhereUniqueInput
  }

  /**
   * HospitalRecommendation deleteMany
   */
  export type HospitalRecommendationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HospitalRecommendations to delete
     */
    where?: HospitalRecommendationWhereInput
  }

  /**
   * HospitalRecommendation.diagnosisRecord
   */
  export type HospitalRecommendation$diagnosisRecordArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiagnosisRecord
     */
    select?: DiagnosisRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiagnosisRecordInclude<ExtArgs> | null
    where?: DiagnosisRecordWhereInput
  }

  /**
   * HospitalRecommendation without action
   */
  export type HospitalRecommendationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalRecommendation
     */
    select?: HospitalRecommendationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalRecommendationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    gender: 'gender',
    birthDate: 'birthDate',
    height: 'height',
    weight: 'weight',
    smoking: 'smoking',
    drinkingFrequency: 'drinkingFrequency',
    chronicDisease: 'chronicDisease',
    medications: 'medications',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const DiagnosisRecordScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    symptoms: 'symptoms',
    diagnosisResult: 'diagnosisResult',
    departments: 'departments',
    heightAtDiagnosis: 'heightAtDiagnosis',
    weightAtDiagnosis: 'weightAtDiagnosis',
    smokingAtDiagnosis: 'smokingAtDiagnosis',
    drinkingFrequencyAtDiagnosis: 'drinkingFrequencyAtDiagnosis',
    chronicDiseaseAtDiagnosis: 'chronicDiseaseAtDiagnosis',
    medicationsAtDiagnosis: 'medicationsAtDiagnosis',
    createdAt: 'createdAt'
  };

  export type DiagnosisRecordScalarFieldEnum = (typeof DiagnosisRecordScalarFieldEnum)[keyof typeof DiagnosisRecordScalarFieldEnum]


  export const SupplementRecommendationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    basedOnDiagnosisId: 'basedOnDiagnosisId',
    recommendations: 'recommendations',
    createdAt: 'createdAt'
  };

  export type SupplementRecommendationScalarFieldEnum = (typeof SupplementRecommendationScalarFieldEnum)[keyof typeof SupplementRecommendationScalarFieldEnum]


  export const HospitalRecommendationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    basedOnDiagnosisId: 'basedOnDiagnosisId',
    location: 'location',
    recommendedHospitals: 'recommendedHospitals',
    createdAt: 'createdAt'
  };

  export type HospitalRecommendationScalarFieldEnum = (typeof HospitalRecommendationScalarFieldEnum)[keyof typeof HospitalRecommendationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    gender?: EnumGenderFilter<"User"> | $Enums.Gender
    birthDate?: DateTimeFilter<"User"> | Date | string
    height?: FloatNullableFilter<"User"> | number | null
    weight?: FloatNullableFilter<"User"> | number | null
    smoking?: BoolFilter<"User"> | boolean
    drinkingFrequency?: StringNullableFilter<"User"> | string | null
    chronicDisease?: StringNullableFilter<"User"> | string | null
    medications?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    diagnosisRecords?: DiagnosisRecordListRelationFilter
    supplementRecommendations?: SupplementRecommendationListRelationFilter
    hospitalRecommendations?: HospitalRecommendationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    height?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    smoking?: SortOrder
    drinkingFrequency?: SortOrderInput | SortOrder
    chronicDisease?: SortOrderInput | SortOrder
    medications?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    diagnosisRecords?: DiagnosisRecordOrderByRelationAggregateInput
    supplementRecommendations?: SupplementRecommendationOrderByRelationAggregateInput
    hospitalRecommendations?: HospitalRecommendationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    gender?: EnumGenderFilter<"User"> | $Enums.Gender
    birthDate?: DateTimeFilter<"User"> | Date | string
    height?: FloatNullableFilter<"User"> | number | null
    weight?: FloatNullableFilter<"User"> | number | null
    smoking?: BoolFilter<"User"> | boolean
    drinkingFrequency?: StringNullableFilter<"User"> | string | null
    chronicDisease?: StringNullableFilter<"User"> | string | null
    medications?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    diagnosisRecords?: DiagnosisRecordListRelationFilter
    supplementRecommendations?: SupplementRecommendationListRelationFilter
    hospitalRecommendations?: HospitalRecommendationListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    height?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    smoking?: SortOrder
    drinkingFrequency?: SortOrderInput | SortOrder
    chronicDisease?: SortOrderInput | SortOrder
    medications?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    gender?: EnumGenderWithAggregatesFilter<"User"> | $Enums.Gender
    birthDate?: DateTimeWithAggregatesFilter<"User"> | Date | string
    height?: FloatNullableWithAggregatesFilter<"User"> | number | null
    weight?: FloatNullableWithAggregatesFilter<"User"> | number | null
    smoking?: BoolWithAggregatesFilter<"User"> | boolean
    drinkingFrequency?: StringNullableWithAggregatesFilter<"User"> | string | null
    chronicDisease?: StringNullableWithAggregatesFilter<"User"> | string | null
    medications?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type DiagnosisRecordWhereInput = {
    AND?: DiagnosisRecordWhereInput | DiagnosisRecordWhereInput[]
    OR?: DiagnosisRecordWhereInput[]
    NOT?: DiagnosisRecordWhereInput | DiagnosisRecordWhereInput[]
    id?: IntFilter<"DiagnosisRecord"> | number
    userId?: IntFilter<"DiagnosisRecord"> | number
    symptoms?: StringFilter<"DiagnosisRecord"> | string
    diagnosisResult?: StringFilter<"DiagnosisRecord"> | string
    departments?: StringNullableFilter<"DiagnosisRecord"> | string | null
    heightAtDiagnosis?: FloatNullableFilter<"DiagnosisRecord"> | number | null
    weightAtDiagnosis?: FloatNullableFilter<"DiagnosisRecord"> | number | null
    smokingAtDiagnosis?: BoolFilter<"DiagnosisRecord"> | boolean
    drinkingFrequencyAtDiagnosis?: StringNullableFilter<"DiagnosisRecord"> | string | null
    chronicDiseaseAtDiagnosis?: StringNullableFilter<"DiagnosisRecord"> | string | null
    medicationsAtDiagnosis?: StringNullableFilter<"DiagnosisRecord"> | string | null
    createdAt?: DateTimeFilter<"DiagnosisRecord"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    supplementRecommendations?: SupplementRecommendationListRelationFilter
    hospitalRecommendations?: HospitalRecommendationListRelationFilter
  }

  export type DiagnosisRecordOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    symptoms?: SortOrder
    diagnosisResult?: SortOrder
    departments?: SortOrderInput | SortOrder
    heightAtDiagnosis?: SortOrderInput | SortOrder
    weightAtDiagnosis?: SortOrderInput | SortOrder
    smokingAtDiagnosis?: SortOrder
    drinkingFrequencyAtDiagnosis?: SortOrderInput | SortOrder
    chronicDiseaseAtDiagnosis?: SortOrderInput | SortOrder
    medicationsAtDiagnosis?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    supplementRecommendations?: SupplementRecommendationOrderByRelationAggregateInput
    hospitalRecommendations?: HospitalRecommendationOrderByRelationAggregateInput
  }

  export type DiagnosisRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DiagnosisRecordWhereInput | DiagnosisRecordWhereInput[]
    OR?: DiagnosisRecordWhereInput[]
    NOT?: DiagnosisRecordWhereInput | DiagnosisRecordWhereInput[]
    userId?: IntFilter<"DiagnosisRecord"> | number
    symptoms?: StringFilter<"DiagnosisRecord"> | string
    diagnosisResult?: StringFilter<"DiagnosisRecord"> | string
    departments?: StringNullableFilter<"DiagnosisRecord"> | string | null
    heightAtDiagnosis?: FloatNullableFilter<"DiagnosisRecord"> | number | null
    weightAtDiagnosis?: FloatNullableFilter<"DiagnosisRecord"> | number | null
    smokingAtDiagnosis?: BoolFilter<"DiagnosisRecord"> | boolean
    drinkingFrequencyAtDiagnosis?: StringNullableFilter<"DiagnosisRecord"> | string | null
    chronicDiseaseAtDiagnosis?: StringNullableFilter<"DiagnosisRecord"> | string | null
    medicationsAtDiagnosis?: StringNullableFilter<"DiagnosisRecord"> | string | null
    createdAt?: DateTimeFilter<"DiagnosisRecord"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    supplementRecommendations?: SupplementRecommendationListRelationFilter
    hospitalRecommendations?: HospitalRecommendationListRelationFilter
  }, "id">

  export type DiagnosisRecordOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    symptoms?: SortOrder
    diagnosisResult?: SortOrder
    departments?: SortOrderInput | SortOrder
    heightAtDiagnosis?: SortOrderInput | SortOrder
    weightAtDiagnosis?: SortOrderInput | SortOrder
    smokingAtDiagnosis?: SortOrder
    drinkingFrequencyAtDiagnosis?: SortOrderInput | SortOrder
    chronicDiseaseAtDiagnosis?: SortOrderInput | SortOrder
    medicationsAtDiagnosis?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: DiagnosisRecordCountOrderByAggregateInput
    _avg?: DiagnosisRecordAvgOrderByAggregateInput
    _max?: DiagnosisRecordMaxOrderByAggregateInput
    _min?: DiagnosisRecordMinOrderByAggregateInput
    _sum?: DiagnosisRecordSumOrderByAggregateInput
  }

  export type DiagnosisRecordScalarWhereWithAggregatesInput = {
    AND?: DiagnosisRecordScalarWhereWithAggregatesInput | DiagnosisRecordScalarWhereWithAggregatesInput[]
    OR?: DiagnosisRecordScalarWhereWithAggregatesInput[]
    NOT?: DiagnosisRecordScalarWhereWithAggregatesInput | DiagnosisRecordScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DiagnosisRecord"> | number
    userId?: IntWithAggregatesFilter<"DiagnosisRecord"> | number
    symptoms?: StringWithAggregatesFilter<"DiagnosisRecord"> | string
    diagnosisResult?: StringWithAggregatesFilter<"DiagnosisRecord"> | string
    departments?: StringNullableWithAggregatesFilter<"DiagnosisRecord"> | string | null
    heightAtDiagnosis?: FloatNullableWithAggregatesFilter<"DiagnosisRecord"> | number | null
    weightAtDiagnosis?: FloatNullableWithAggregatesFilter<"DiagnosisRecord"> | number | null
    smokingAtDiagnosis?: BoolWithAggregatesFilter<"DiagnosisRecord"> | boolean
    drinkingFrequencyAtDiagnosis?: StringNullableWithAggregatesFilter<"DiagnosisRecord"> | string | null
    chronicDiseaseAtDiagnosis?: StringNullableWithAggregatesFilter<"DiagnosisRecord"> | string | null
    medicationsAtDiagnosis?: StringNullableWithAggregatesFilter<"DiagnosisRecord"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DiagnosisRecord"> | Date | string
  }

  export type SupplementRecommendationWhereInput = {
    AND?: SupplementRecommendationWhereInput | SupplementRecommendationWhereInput[]
    OR?: SupplementRecommendationWhereInput[]
    NOT?: SupplementRecommendationWhereInput | SupplementRecommendationWhereInput[]
    id?: IntFilter<"SupplementRecommendation"> | number
    userId?: IntFilter<"SupplementRecommendation"> | number
    basedOnDiagnosisId?: IntNullableFilter<"SupplementRecommendation"> | number | null
    recommendations?: StringFilter<"SupplementRecommendation"> | string
    createdAt?: DateTimeFilter<"SupplementRecommendation"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    diagnosisRecord?: XOR<DiagnosisRecordNullableRelationFilter, DiagnosisRecordWhereInput> | null
  }

  export type SupplementRecommendationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    basedOnDiagnosisId?: SortOrderInput | SortOrder
    recommendations?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    diagnosisRecord?: DiagnosisRecordOrderByWithRelationInput
  }

  export type SupplementRecommendationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SupplementRecommendationWhereInput | SupplementRecommendationWhereInput[]
    OR?: SupplementRecommendationWhereInput[]
    NOT?: SupplementRecommendationWhereInput | SupplementRecommendationWhereInput[]
    userId?: IntFilter<"SupplementRecommendation"> | number
    basedOnDiagnosisId?: IntNullableFilter<"SupplementRecommendation"> | number | null
    recommendations?: StringFilter<"SupplementRecommendation"> | string
    createdAt?: DateTimeFilter<"SupplementRecommendation"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    diagnosisRecord?: XOR<DiagnosisRecordNullableRelationFilter, DiagnosisRecordWhereInput> | null
  }, "id">

  export type SupplementRecommendationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    basedOnDiagnosisId?: SortOrderInput | SortOrder
    recommendations?: SortOrder
    createdAt?: SortOrder
    _count?: SupplementRecommendationCountOrderByAggregateInput
    _avg?: SupplementRecommendationAvgOrderByAggregateInput
    _max?: SupplementRecommendationMaxOrderByAggregateInput
    _min?: SupplementRecommendationMinOrderByAggregateInput
    _sum?: SupplementRecommendationSumOrderByAggregateInput
  }

  export type SupplementRecommendationScalarWhereWithAggregatesInput = {
    AND?: SupplementRecommendationScalarWhereWithAggregatesInput | SupplementRecommendationScalarWhereWithAggregatesInput[]
    OR?: SupplementRecommendationScalarWhereWithAggregatesInput[]
    NOT?: SupplementRecommendationScalarWhereWithAggregatesInput | SupplementRecommendationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SupplementRecommendation"> | number
    userId?: IntWithAggregatesFilter<"SupplementRecommendation"> | number
    basedOnDiagnosisId?: IntNullableWithAggregatesFilter<"SupplementRecommendation"> | number | null
    recommendations?: StringWithAggregatesFilter<"SupplementRecommendation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SupplementRecommendation"> | Date | string
  }

  export type HospitalRecommendationWhereInput = {
    AND?: HospitalRecommendationWhereInput | HospitalRecommendationWhereInput[]
    OR?: HospitalRecommendationWhereInput[]
    NOT?: HospitalRecommendationWhereInput | HospitalRecommendationWhereInput[]
    id?: IntFilter<"HospitalRecommendation"> | number
    userId?: IntFilter<"HospitalRecommendation"> | number
    basedOnDiagnosisId?: IntNullableFilter<"HospitalRecommendation"> | number | null
    location?: StringNullableFilter<"HospitalRecommendation"> | string | null
    recommendedHospitals?: StringFilter<"HospitalRecommendation"> | string
    createdAt?: DateTimeFilter<"HospitalRecommendation"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    diagnosisRecord?: XOR<DiagnosisRecordNullableRelationFilter, DiagnosisRecordWhereInput> | null
  }

  export type HospitalRecommendationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    basedOnDiagnosisId?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    recommendedHospitals?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    diagnosisRecord?: DiagnosisRecordOrderByWithRelationInput
  }

  export type HospitalRecommendationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: HospitalRecommendationWhereInput | HospitalRecommendationWhereInput[]
    OR?: HospitalRecommendationWhereInput[]
    NOT?: HospitalRecommendationWhereInput | HospitalRecommendationWhereInput[]
    userId?: IntFilter<"HospitalRecommendation"> | number
    basedOnDiagnosisId?: IntNullableFilter<"HospitalRecommendation"> | number | null
    location?: StringNullableFilter<"HospitalRecommendation"> | string | null
    recommendedHospitals?: StringFilter<"HospitalRecommendation"> | string
    createdAt?: DateTimeFilter<"HospitalRecommendation"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    diagnosisRecord?: XOR<DiagnosisRecordNullableRelationFilter, DiagnosisRecordWhereInput> | null
  }, "id">

  export type HospitalRecommendationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    basedOnDiagnosisId?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    recommendedHospitals?: SortOrder
    createdAt?: SortOrder
    _count?: HospitalRecommendationCountOrderByAggregateInput
    _avg?: HospitalRecommendationAvgOrderByAggregateInput
    _max?: HospitalRecommendationMaxOrderByAggregateInput
    _min?: HospitalRecommendationMinOrderByAggregateInput
    _sum?: HospitalRecommendationSumOrderByAggregateInput
  }

  export type HospitalRecommendationScalarWhereWithAggregatesInput = {
    AND?: HospitalRecommendationScalarWhereWithAggregatesInput | HospitalRecommendationScalarWhereWithAggregatesInput[]
    OR?: HospitalRecommendationScalarWhereWithAggregatesInput[]
    NOT?: HospitalRecommendationScalarWhereWithAggregatesInput | HospitalRecommendationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"HospitalRecommendation"> | number
    userId?: IntWithAggregatesFilter<"HospitalRecommendation"> | number
    basedOnDiagnosisId?: IntNullableWithAggregatesFilter<"HospitalRecommendation"> | number | null
    location?: StringNullableWithAggregatesFilter<"HospitalRecommendation"> | string | null
    recommendedHospitals?: StringWithAggregatesFilter<"HospitalRecommendation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"HospitalRecommendation"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    password: string
    name: string
    gender: $Enums.Gender
    birthDate: Date | string
    height?: number | null
    weight?: number | null
    smoking?: boolean
    drinkingFrequency?: string | null
    chronicDisease?: string | null
    medications?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    diagnosisRecords?: DiagnosisRecordCreateNestedManyWithoutUserInput
    supplementRecommendations?: SupplementRecommendationCreateNestedManyWithoutUserInput
    hospitalRecommendations?: HospitalRecommendationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    password: string
    name: string
    gender: $Enums.Gender
    birthDate: Date | string
    height?: number | null
    weight?: number | null
    smoking?: boolean
    drinkingFrequency?: string | null
    chronicDisease?: string | null
    medications?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    diagnosisRecords?: DiagnosisRecordUncheckedCreateNestedManyWithoutUserInput
    supplementRecommendations?: SupplementRecommendationUncheckedCreateNestedManyWithoutUserInput
    hospitalRecommendations?: HospitalRecommendationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    smoking?: BoolFieldUpdateOperationsInput | boolean
    drinkingFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDisease?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    diagnosisRecords?: DiagnosisRecordUpdateManyWithoutUserNestedInput
    supplementRecommendations?: SupplementRecommendationUpdateManyWithoutUserNestedInput
    hospitalRecommendations?: HospitalRecommendationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    smoking?: BoolFieldUpdateOperationsInput | boolean
    drinkingFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDisease?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    diagnosisRecords?: DiagnosisRecordUncheckedUpdateManyWithoutUserNestedInput
    supplementRecommendations?: SupplementRecommendationUncheckedUpdateManyWithoutUserNestedInput
    hospitalRecommendations?: HospitalRecommendationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    password: string
    name: string
    gender: $Enums.Gender
    birthDate: Date | string
    height?: number | null
    weight?: number | null
    smoking?: boolean
    drinkingFrequency?: string | null
    chronicDisease?: string | null
    medications?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    smoking?: BoolFieldUpdateOperationsInput | boolean
    drinkingFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDisease?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    smoking?: BoolFieldUpdateOperationsInput | boolean
    drinkingFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDisease?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiagnosisRecordCreateInput = {
    symptoms: string
    diagnosisResult: string
    departments?: string | null
    heightAtDiagnosis?: number | null
    weightAtDiagnosis?: number | null
    smokingAtDiagnosis?: boolean
    drinkingFrequencyAtDiagnosis?: string | null
    chronicDiseaseAtDiagnosis?: string | null
    medicationsAtDiagnosis?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutDiagnosisRecordsInput
    supplementRecommendations?: SupplementRecommendationCreateNestedManyWithoutDiagnosisRecordInput
    hospitalRecommendations?: HospitalRecommendationCreateNestedManyWithoutDiagnosisRecordInput
  }

  export type DiagnosisRecordUncheckedCreateInput = {
    id?: number
    userId: number
    symptoms: string
    diagnosisResult: string
    departments?: string | null
    heightAtDiagnosis?: number | null
    weightAtDiagnosis?: number | null
    smokingAtDiagnosis?: boolean
    drinkingFrequencyAtDiagnosis?: string | null
    chronicDiseaseAtDiagnosis?: string | null
    medicationsAtDiagnosis?: string | null
    createdAt?: Date | string
    supplementRecommendations?: SupplementRecommendationUncheckedCreateNestedManyWithoutDiagnosisRecordInput
    hospitalRecommendations?: HospitalRecommendationUncheckedCreateNestedManyWithoutDiagnosisRecordInput
  }

  export type DiagnosisRecordUpdateInput = {
    symptoms?: StringFieldUpdateOperationsInput | string
    diagnosisResult?: StringFieldUpdateOperationsInput | string
    departments?: NullableStringFieldUpdateOperationsInput | string | null
    heightAtDiagnosis?: NullableFloatFieldUpdateOperationsInput | number | null
    weightAtDiagnosis?: NullableFloatFieldUpdateOperationsInput | number | null
    smokingAtDiagnosis?: BoolFieldUpdateOperationsInput | boolean
    drinkingFrequencyAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDiseaseAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    medicationsAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDiagnosisRecordsNestedInput
    supplementRecommendations?: SupplementRecommendationUpdateManyWithoutDiagnosisRecordNestedInput
    hospitalRecommendations?: HospitalRecommendationUpdateManyWithoutDiagnosisRecordNestedInput
  }

  export type DiagnosisRecordUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    symptoms?: StringFieldUpdateOperationsInput | string
    diagnosisResult?: StringFieldUpdateOperationsInput | string
    departments?: NullableStringFieldUpdateOperationsInput | string | null
    heightAtDiagnosis?: NullableFloatFieldUpdateOperationsInput | number | null
    weightAtDiagnosis?: NullableFloatFieldUpdateOperationsInput | number | null
    smokingAtDiagnosis?: BoolFieldUpdateOperationsInput | boolean
    drinkingFrequencyAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDiseaseAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    medicationsAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplementRecommendations?: SupplementRecommendationUncheckedUpdateManyWithoutDiagnosisRecordNestedInput
    hospitalRecommendations?: HospitalRecommendationUncheckedUpdateManyWithoutDiagnosisRecordNestedInput
  }

  export type DiagnosisRecordCreateManyInput = {
    id?: number
    userId: number
    symptoms: string
    diagnosisResult: string
    departments?: string | null
    heightAtDiagnosis?: number | null
    weightAtDiagnosis?: number | null
    smokingAtDiagnosis?: boolean
    drinkingFrequencyAtDiagnosis?: string | null
    chronicDiseaseAtDiagnosis?: string | null
    medicationsAtDiagnosis?: string | null
    createdAt?: Date | string
  }

  export type DiagnosisRecordUpdateManyMutationInput = {
    symptoms?: StringFieldUpdateOperationsInput | string
    diagnosisResult?: StringFieldUpdateOperationsInput | string
    departments?: NullableStringFieldUpdateOperationsInput | string | null
    heightAtDiagnosis?: NullableFloatFieldUpdateOperationsInput | number | null
    weightAtDiagnosis?: NullableFloatFieldUpdateOperationsInput | number | null
    smokingAtDiagnosis?: BoolFieldUpdateOperationsInput | boolean
    drinkingFrequencyAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDiseaseAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    medicationsAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiagnosisRecordUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    symptoms?: StringFieldUpdateOperationsInput | string
    diagnosisResult?: StringFieldUpdateOperationsInput | string
    departments?: NullableStringFieldUpdateOperationsInput | string | null
    heightAtDiagnosis?: NullableFloatFieldUpdateOperationsInput | number | null
    weightAtDiagnosis?: NullableFloatFieldUpdateOperationsInput | number | null
    smokingAtDiagnosis?: BoolFieldUpdateOperationsInput | boolean
    drinkingFrequencyAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDiseaseAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    medicationsAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplementRecommendationCreateInput = {
    recommendations: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSupplementRecommendationsInput
    diagnosisRecord?: DiagnosisRecordCreateNestedOneWithoutSupplementRecommendationsInput
  }

  export type SupplementRecommendationUncheckedCreateInput = {
    id?: number
    userId: number
    basedOnDiagnosisId?: number | null
    recommendations: string
    createdAt?: Date | string
  }

  export type SupplementRecommendationUpdateInput = {
    recommendations?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSupplementRecommendationsNestedInput
    diagnosisRecord?: DiagnosisRecordUpdateOneWithoutSupplementRecommendationsNestedInput
  }

  export type SupplementRecommendationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    basedOnDiagnosisId?: NullableIntFieldUpdateOperationsInput | number | null
    recommendations?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplementRecommendationCreateManyInput = {
    id?: number
    userId: number
    basedOnDiagnosisId?: number | null
    recommendations: string
    createdAt?: Date | string
  }

  export type SupplementRecommendationUpdateManyMutationInput = {
    recommendations?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplementRecommendationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    basedOnDiagnosisId?: NullableIntFieldUpdateOperationsInput | number | null
    recommendations?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HospitalRecommendationCreateInput = {
    location?: string | null
    recommendedHospitals: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutHospitalRecommendationsInput
    diagnosisRecord?: DiagnosisRecordCreateNestedOneWithoutHospitalRecommendationsInput
  }

  export type HospitalRecommendationUncheckedCreateInput = {
    id?: number
    userId: number
    basedOnDiagnosisId?: number | null
    location?: string | null
    recommendedHospitals: string
    createdAt?: Date | string
  }

  export type HospitalRecommendationUpdateInput = {
    location?: NullableStringFieldUpdateOperationsInput | string | null
    recommendedHospitals?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutHospitalRecommendationsNestedInput
    diagnosisRecord?: DiagnosisRecordUpdateOneWithoutHospitalRecommendationsNestedInput
  }

  export type HospitalRecommendationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    basedOnDiagnosisId?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    recommendedHospitals?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HospitalRecommendationCreateManyInput = {
    id?: number
    userId: number
    basedOnDiagnosisId?: number | null
    location?: string | null
    recommendedHospitals: string
    createdAt?: Date | string
  }

  export type HospitalRecommendationUpdateManyMutationInput = {
    location?: NullableStringFieldUpdateOperationsInput | string | null
    recommendedHospitals?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HospitalRecommendationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    basedOnDiagnosisId?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    recommendedHospitals?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DiagnosisRecordListRelationFilter = {
    every?: DiagnosisRecordWhereInput
    some?: DiagnosisRecordWhereInput
    none?: DiagnosisRecordWhereInput
  }

  export type SupplementRecommendationListRelationFilter = {
    every?: SupplementRecommendationWhereInput
    some?: SupplementRecommendationWhereInput
    none?: SupplementRecommendationWhereInput
  }

  export type HospitalRecommendationListRelationFilter = {
    every?: HospitalRecommendationWhereInput
    some?: HospitalRecommendationWhereInput
    none?: HospitalRecommendationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DiagnosisRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SupplementRecommendationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HospitalRecommendationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    smoking?: SortOrder
    drinkingFrequency?: SortOrder
    chronicDisease?: SortOrder
    medications?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    height?: SortOrder
    weight?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    smoking?: SortOrder
    drinkingFrequency?: SortOrder
    chronicDisease?: SortOrder
    medications?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    smoking?: SortOrder
    drinkingFrequency?: SortOrder
    chronicDisease?: SortOrder
    medications?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    height?: SortOrder
    weight?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type DiagnosisRecordCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    symptoms?: SortOrder
    diagnosisResult?: SortOrder
    departments?: SortOrder
    heightAtDiagnosis?: SortOrder
    weightAtDiagnosis?: SortOrder
    smokingAtDiagnosis?: SortOrder
    drinkingFrequencyAtDiagnosis?: SortOrder
    chronicDiseaseAtDiagnosis?: SortOrder
    medicationsAtDiagnosis?: SortOrder
    createdAt?: SortOrder
  }

  export type DiagnosisRecordAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    heightAtDiagnosis?: SortOrder
    weightAtDiagnosis?: SortOrder
  }

  export type DiagnosisRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    symptoms?: SortOrder
    diagnosisResult?: SortOrder
    departments?: SortOrder
    heightAtDiagnosis?: SortOrder
    weightAtDiagnosis?: SortOrder
    smokingAtDiagnosis?: SortOrder
    drinkingFrequencyAtDiagnosis?: SortOrder
    chronicDiseaseAtDiagnosis?: SortOrder
    medicationsAtDiagnosis?: SortOrder
    createdAt?: SortOrder
  }

  export type DiagnosisRecordMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    symptoms?: SortOrder
    diagnosisResult?: SortOrder
    departments?: SortOrder
    heightAtDiagnosis?: SortOrder
    weightAtDiagnosis?: SortOrder
    smokingAtDiagnosis?: SortOrder
    drinkingFrequencyAtDiagnosis?: SortOrder
    chronicDiseaseAtDiagnosis?: SortOrder
    medicationsAtDiagnosis?: SortOrder
    createdAt?: SortOrder
  }

  export type DiagnosisRecordSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    heightAtDiagnosis?: SortOrder
    weightAtDiagnosis?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DiagnosisRecordNullableRelationFilter = {
    is?: DiagnosisRecordWhereInput | null
    isNot?: DiagnosisRecordWhereInput | null
  }

  export type SupplementRecommendationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    basedOnDiagnosisId?: SortOrder
    recommendations?: SortOrder
    createdAt?: SortOrder
  }

  export type SupplementRecommendationAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    basedOnDiagnosisId?: SortOrder
  }

  export type SupplementRecommendationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    basedOnDiagnosisId?: SortOrder
    recommendations?: SortOrder
    createdAt?: SortOrder
  }

  export type SupplementRecommendationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    basedOnDiagnosisId?: SortOrder
    recommendations?: SortOrder
    createdAt?: SortOrder
  }

  export type SupplementRecommendationSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    basedOnDiagnosisId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type HospitalRecommendationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    basedOnDiagnosisId?: SortOrder
    location?: SortOrder
    recommendedHospitals?: SortOrder
    createdAt?: SortOrder
  }

  export type HospitalRecommendationAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    basedOnDiagnosisId?: SortOrder
  }

  export type HospitalRecommendationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    basedOnDiagnosisId?: SortOrder
    location?: SortOrder
    recommendedHospitals?: SortOrder
    createdAt?: SortOrder
  }

  export type HospitalRecommendationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    basedOnDiagnosisId?: SortOrder
    location?: SortOrder
    recommendedHospitals?: SortOrder
    createdAt?: SortOrder
  }

  export type HospitalRecommendationSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    basedOnDiagnosisId?: SortOrder
  }

  export type DiagnosisRecordCreateNestedManyWithoutUserInput = {
    create?: XOR<DiagnosisRecordCreateWithoutUserInput, DiagnosisRecordUncheckedCreateWithoutUserInput> | DiagnosisRecordCreateWithoutUserInput[] | DiagnosisRecordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DiagnosisRecordCreateOrConnectWithoutUserInput | DiagnosisRecordCreateOrConnectWithoutUserInput[]
    createMany?: DiagnosisRecordCreateManyUserInputEnvelope
    connect?: DiagnosisRecordWhereUniqueInput | DiagnosisRecordWhereUniqueInput[]
  }

  export type SupplementRecommendationCreateNestedManyWithoutUserInput = {
    create?: XOR<SupplementRecommendationCreateWithoutUserInput, SupplementRecommendationUncheckedCreateWithoutUserInput> | SupplementRecommendationCreateWithoutUserInput[] | SupplementRecommendationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SupplementRecommendationCreateOrConnectWithoutUserInput | SupplementRecommendationCreateOrConnectWithoutUserInput[]
    createMany?: SupplementRecommendationCreateManyUserInputEnvelope
    connect?: SupplementRecommendationWhereUniqueInput | SupplementRecommendationWhereUniqueInput[]
  }

  export type HospitalRecommendationCreateNestedManyWithoutUserInput = {
    create?: XOR<HospitalRecommendationCreateWithoutUserInput, HospitalRecommendationUncheckedCreateWithoutUserInput> | HospitalRecommendationCreateWithoutUserInput[] | HospitalRecommendationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HospitalRecommendationCreateOrConnectWithoutUserInput | HospitalRecommendationCreateOrConnectWithoutUserInput[]
    createMany?: HospitalRecommendationCreateManyUserInputEnvelope
    connect?: HospitalRecommendationWhereUniqueInput | HospitalRecommendationWhereUniqueInput[]
  }

  export type DiagnosisRecordUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DiagnosisRecordCreateWithoutUserInput, DiagnosisRecordUncheckedCreateWithoutUserInput> | DiagnosisRecordCreateWithoutUserInput[] | DiagnosisRecordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DiagnosisRecordCreateOrConnectWithoutUserInput | DiagnosisRecordCreateOrConnectWithoutUserInput[]
    createMany?: DiagnosisRecordCreateManyUserInputEnvelope
    connect?: DiagnosisRecordWhereUniqueInput | DiagnosisRecordWhereUniqueInput[]
  }

  export type SupplementRecommendationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SupplementRecommendationCreateWithoutUserInput, SupplementRecommendationUncheckedCreateWithoutUserInput> | SupplementRecommendationCreateWithoutUserInput[] | SupplementRecommendationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SupplementRecommendationCreateOrConnectWithoutUserInput | SupplementRecommendationCreateOrConnectWithoutUserInput[]
    createMany?: SupplementRecommendationCreateManyUserInputEnvelope
    connect?: SupplementRecommendationWhereUniqueInput | SupplementRecommendationWhereUniqueInput[]
  }

  export type HospitalRecommendationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<HospitalRecommendationCreateWithoutUserInput, HospitalRecommendationUncheckedCreateWithoutUserInput> | HospitalRecommendationCreateWithoutUserInput[] | HospitalRecommendationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HospitalRecommendationCreateOrConnectWithoutUserInput | HospitalRecommendationCreateOrConnectWithoutUserInput[]
    createMany?: HospitalRecommendationCreateManyUserInputEnvelope
    connect?: HospitalRecommendationWhereUniqueInput | HospitalRecommendationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DiagnosisRecordUpdateManyWithoutUserNestedInput = {
    create?: XOR<DiagnosisRecordCreateWithoutUserInput, DiagnosisRecordUncheckedCreateWithoutUserInput> | DiagnosisRecordCreateWithoutUserInput[] | DiagnosisRecordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DiagnosisRecordCreateOrConnectWithoutUserInput | DiagnosisRecordCreateOrConnectWithoutUserInput[]
    upsert?: DiagnosisRecordUpsertWithWhereUniqueWithoutUserInput | DiagnosisRecordUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DiagnosisRecordCreateManyUserInputEnvelope
    set?: DiagnosisRecordWhereUniqueInput | DiagnosisRecordWhereUniqueInput[]
    disconnect?: DiagnosisRecordWhereUniqueInput | DiagnosisRecordWhereUniqueInput[]
    delete?: DiagnosisRecordWhereUniqueInput | DiagnosisRecordWhereUniqueInput[]
    connect?: DiagnosisRecordWhereUniqueInput | DiagnosisRecordWhereUniqueInput[]
    update?: DiagnosisRecordUpdateWithWhereUniqueWithoutUserInput | DiagnosisRecordUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DiagnosisRecordUpdateManyWithWhereWithoutUserInput | DiagnosisRecordUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DiagnosisRecordScalarWhereInput | DiagnosisRecordScalarWhereInput[]
  }

  export type SupplementRecommendationUpdateManyWithoutUserNestedInput = {
    create?: XOR<SupplementRecommendationCreateWithoutUserInput, SupplementRecommendationUncheckedCreateWithoutUserInput> | SupplementRecommendationCreateWithoutUserInput[] | SupplementRecommendationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SupplementRecommendationCreateOrConnectWithoutUserInput | SupplementRecommendationCreateOrConnectWithoutUserInput[]
    upsert?: SupplementRecommendationUpsertWithWhereUniqueWithoutUserInput | SupplementRecommendationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SupplementRecommendationCreateManyUserInputEnvelope
    set?: SupplementRecommendationWhereUniqueInput | SupplementRecommendationWhereUniqueInput[]
    disconnect?: SupplementRecommendationWhereUniqueInput | SupplementRecommendationWhereUniqueInput[]
    delete?: SupplementRecommendationWhereUniqueInput | SupplementRecommendationWhereUniqueInput[]
    connect?: SupplementRecommendationWhereUniqueInput | SupplementRecommendationWhereUniqueInput[]
    update?: SupplementRecommendationUpdateWithWhereUniqueWithoutUserInput | SupplementRecommendationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SupplementRecommendationUpdateManyWithWhereWithoutUserInput | SupplementRecommendationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SupplementRecommendationScalarWhereInput | SupplementRecommendationScalarWhereInput[]
  }

  export type HospitalRecommendationUpdateManyWithoutUserNestedInput = {
    create?: XOR<HospitalRecommendationCreateWithoutUserInput, HospitalRecommendationUncheckedCreateWithoutUserInput> | HospitalRecommendationCreateWithoutUserInput[] | HospitalRecommendationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HospitalRecommendationCreateOrConnectWithoutUserInput | HospitalRecommendationCreateOrConnectWithoutUserInput[]
    upsert?: HospitalRecommendationUpsertWithWhereUniqueWithoutUserInput | HospitalRecommendationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: HospitalRecommendationCreateManyUserInputEnvelope
    set?: HospitalRecommendationWhereUniqueInput | HospitalRecommendationWhereUniqueInput[]
    disconnect?: HospitalRecommendationWhereUniqueInput | HospitalRecommendationWhereUniqueInput[]
    delete?: HospitalRecommendationWhereUniqueInput | HospitalRecommendationWhereUniqueInput[]
    connect?: HospitalRecommendationWhereUniqueInput | HospitalRecommendationWhereUniqueInput[]
    update?: HospitalRecommendationUpdateWithWhereUniqueWithoutUserInput | HospitalRecommendationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: HospitalRecommendationUpdateManyWithWhereWithoutUserInput | HospitalRecommendationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: HospitalRecommendationScalarWhereInput | HospitalRecommendationScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DiagnosisRecordUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DiagnosisRecordCreateWithoutUserInput, DiagnosisRecordUncheckedCreateWithoutUserInput> | DiagnosisRecordCreateWithoutUserInput[] | DiagnosisRecordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DiagnosisRecordCreateOrConnectWithoutUserInput | DiagnosisRecordCreateOrConnectWithoutUserInput[]
    upsert?: DiagnosisRecordUpsertWithWhereUniqueWithoutUserInput | DiagnosisRecordUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DiagnosisRecordCreateManyUserInputEnvelope
    set?: DiagnosisRecordWhereUniqueInput | DiagnosisRecordWhereUniqueInput[]
    disconnect?: DiagnosisRecordWhereUniqueInput | DiagnosisRecordWhereUniqueInput[]
    delete?: DiagnosisRecordWhereUniqueInput | DiagnosisRecordWhereUniqueInput[]
    connect?: DiagnosisRecordWhereUniqueInput | DiagnosisRecordWhereUniqueInput[]
    update?: DiagnosisRecordUpdateWithWhereUniqueWithoutUserInput | DiagnosisRecordUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DiagnosisRecordUpdateManyWithWhereWithoutUserInput | DiagnosisRecordUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DiagnosisRecordScalarWhereInput | DiagnosisRecordScalarWhereInput[]
  }

  export type SupplementRecommendationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SupplementRecommendationCreateWithoutUserInput, SupplementRecommendationUncheckedCreateWithoutUserInput> | SupplementRecommendationCreateWithoutUserInput[] | SupplementRecommendationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SupplementRecommendationCreateOrConnectWithoutUserInput | SupplementRecommendationCreateOrConnectWithoutUserInput[]
    upsert?: SupplementRecommendationUpsertWithWhereUniqueWithoutUserInput | SupplementRecommendationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SupplementRecommendationCreateManyUserInputEnvelope
    set?: SupplementRecommendationWhereUniqueInput | SupplementRecommendationWhereUniqueInput[]
    disconnect?: SupplementRecommendationWhereUniqueInput | SupplementRecommendationWhereUniqueInput[]
    delete?: SupplementRecommendationWhereUniqueInput | SupplementRecommendationWhereUniqueInput[]
    connect?: SupplementRecommendationWhereUniqueInput | SupplementRecommendationWhereUniqueInput[]
    update?: SupplementRecommendationUpdateWithWhereUniqueWithoutUserInput | SupplementRecommendationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SupplementRecommendationUpdateManyWithWhereWithoutUserInput | SupplementRecommendationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SupplementRecommendationScalarWhereInput | SupplementRecommendationScalarWhereInput[]
  }

  export type HospitalRecommendationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<HospitalRecommendationCreateWithoutUserInput, HospitalRecommendationUncheckedCreateWithoutUserInput> | HospitalRecommendationCreateWithoutUserInput[] | HospitalRecommendationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HospitalRecommendationCreateOrConnectWithoutUserInput | HospitalRecommendationCreateOrConnectWithoutUserInput[]
    upsert?: HospitalRecommendationUpsertWithWhereUniqueWithoutUserInput | HospitalRecommendationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: HospitalRecommendationCreateManyUserInputEnvelope
    set?: HospitalRecommendationWhereUniqueInput | HospitalRecommendationWhereUniqueInput[]
    disconnect?: HospitalRecommendationWhereUniqueInput | HospitalRecommendationWhereUniqueInput[]
    delete?: HospitalRecommendationWhereUniqueInput | HospitalRecommendationWhereUniqueInput[]
    connect?: HospitalRecommendationWhereUniqueInput | HospitalRecommendationWhereUniqueInput[]
    update?: HospitalRecommendationUpdateWithWhereUniqueWithoutUserInput | HospitalRecommendationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: HospitalRecommendationUpdateManyWithWhereWithoutUserInput | HospitalRecommendationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: HospitalRecommendationScalarWhereInput | HospitalRecommendationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutDiagnosisRecordsInput = {
    create?: XOR<UserCreateWithoutDiagnosisRecordsInput, UserUncheckedCreateWithoutDiagnosisRecordsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDiagnosisRecordsInput
    connect?: UserWhereUniqueInput
  }

  export type SupplementRecommendationCreateNestedManyWithoutDiagnosisRecordInput = {
    create?: XOR<SupplementRecommendationCreateWithoutDiagnosisRecordInput, SupplementRecommendationUncheckedCreateWithoutDiagnosisRecordInput> | SupplementRecommendationCreateWithoutDiagnosisRecordInput[] | SupplementRecommendationUncheckedCreateWithoutDiagnosisRecordInput[]
    connectOrCreate?: SupplementRecommendationCreateOrConnectWithoutDiagnosisRecordInput | SupplementRecommendationCreateOrConnectWithoutDiagnosisRecordInput[]
    createMany?: SupplementRecommendationCreateManyDiagnosisRecordInputEnvelope
    connect?: SupplementRecommendationWhereUniqueInput | SupplementRecommendationWhereUniqueInput[]
  }

  export type HospitalRecommendationCreateNestedManyWithoutDiagnosisRecordInput = {
    create?: XOR<HospitalRecommendationCreateWithoutDiagnosisRecordInput, HospitalRecommendationUncheckedCreateWithoutDiagnosisRecordInput> | HospitalRecommendationCreateWithoutDiagnosisRecordInput[] | HospitalRecommendationUncheckedCreateWithoutDiagnosisRecordInput[]
    connectOrCreate?: HospitalRecommendationCreateOrConnectWithoutDiagnosisRecordInput | HospitalRecommendationCreateOrConnectWithoutDiagnosisRecordInput[]
    createMany?: HospitalRecommendationCreateManyDiagnosisRecordInputEnvelope
    connect?: HospitalRecommendationWhereUniqueInput | HospitalRecommendationWhereUniqueInput[]
  }

  export type SupplementRecommendationUncheckedCreateNestedManyWithoutDiagnosisRecordInput = {
    create?: XOR<SupplementRecommendationCreateWithoutDiagnosisRecordInput, SupplementRecommendationUncheckedCreateWithoutDiagnosisRecordInput> | SupplementRecommendationCreateWithoutDiagnosisRecordInput[] | SupplementRecommendationUncheckedCreateWithoutDiagnosisRecordInput[]
    connectOrCreate?: SupplementRecommendationCreateOrConnectWithoutDiagnosisRecordInput | SupplementRecommendationCreateOrConnectWithoutDiagnosisRecordInput[]
    createMany?: SupplementRecommendationCreateManyDiagnosisRecordInputEnvelope
    connect?: SupplementRecommendationWhereUniqueInput | SupplementRecommendationWhereUniqueInput[]
  }

  export type HospitalRecommendationUncheckedCreateNestedManyWithoutDiagnosisRecordInput = {
    create?: XOR<HospitalRecommendationCreateWithoutDiagnosisRecordInput, HospitalRecommendationUncheckedCreateWithoutDiagnosisRecordInput> | HospitalRecommendationCreateWithoutDiagnosisRecordInput[] | HospitalRecommendationUncheckedCreateWithoutDiagnosisRecordInput[]
    connectOrCreate?: HospitalRecommendationCreateOrConnectWithoutDiagnosisRecordInput | HospitalRecommendationCreateOrConnectWithoutDiagnosisRecordInput[]
    createMany?: HospitalRecommendationCreateManyDiagnosisRecordInputEnvelope
    connect?: HospitalRecommendationWhereUniqueInput | HospitalRecommendationWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutDiagnosisRecordsNestedInput = {
    create?: XOR<UserCreateWithoutDiagnosisRecordsInput, UserUncheckedCreateWithoutDiagnosisRecordsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDiagnosisRecordsInput
    upsert?: UserUpsertWithoutDiagnosisRecordsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDiagnosisRecordsInput, UserUpdateWithoutDiagnosisRecordsInput>, UserUncheckedUpdateWithoutDiagnosisRecordsInput>
  }

  export type SupplementRecommendationUpdateManyWithoutDiagnosisRecordNestedInput = {
    create?: XOR<SupplementRecommendationCreateWithoutDiagnosisRecordInput, SupplementRecommendationUncheckedCreateWithoutDiagnosisRecordInput> | SupplementRecommendationCreateWithoutDiagnosisRecordInput[] | SupplementRecommendationUncheckedCreateWithoutDiagnosisRecordInput[]
    connectOrCreate?: SupplementRecommendationCreateOrConnectWithoutDiagnosisRecordInput | SupplementRecommendationCreateOrConnectWithoutDiagnosisRecordInput[]
    upsert?: SupplementRecommendationUpsertWithWhereUniqueWithoutDiagnosisRecordInput | SupplementRecommendationUpsertWithWhereUniqueWithoutDiagnosisRecordInput[]
    createMany?: SupplementRecommendationCreateManyDiagnosisRecordInputEnvelope
    set?: SupplementRecommendationWhereUniqueInput | SupplementRecommendationWhereUniqueInput[]
    disconnect?: SupplementRecommendationWhereUniqueInput | SupplementRecommendationWhereUniqueInput[]
    delete?: SupplementRecommendationWhereUniqueInput | SupplementRecommendationWhereUniqueInput[]
    connect?: SupplementRecommendationWhereUniqueInput | SupplementRecommendationWhereUniqueInput[]
    update?: SupplementRecommendationUpdateWithWhereUniqueWithoutDiagnosisRecordInput | SupplementRecommendationUpdateWithWhereUniqueWithoutDiagnosisRecordInput[]
    updateMany?: SupplementRecommendationUpdateManyWithWhereWithoutDiagnosisRecordInput | SupplementRecommendationUpdateManyWithWhereWithoutDiagnosisRecordInput[]
    deleteMany?: SupplementRecommendationScalarWhereInput | SupplementRecommendationScalarWhereInput[]
  }

  export type HospitalRecommendationUpdateManyWithoutDiagnosisRecordNestedInput = {
    create?: XOR<HospitalRecommendationCreateWithoutDiagnosisRecordInput, HospitalRecommendationUncheckedCreateWithoutDiagnosisRecordInput> | HospitalRecommendationCreateWithoutDiagnosisRecordInput[] | HospitalRecommendationUncheckedCreateWithoutDiagnosisRecordInput[]
    connectOrCreate?: HospitalRecommendationCreateOrConnectWithoutDiagnosisRecordInput | HospitalRecommendationCreateOrConnectWithoutDiagnosisRecordInput[]
    upsert?: HospitalRecommendationUpsertWithWhereUniqueWithoutDiagnosisRecordInput | HospitalRecommendationUpsertWithWhereUniqueWithoutDiagnosisRecordInput[]
    createMany?: HospitalRecommendationCreateManyDiagnosisRecordInputEnvelope
    set?: HospitalRecommendationWhereUniqueInput | HospitalRecommendationWhereUniqueInput[]
    disconnect?: HospitalRecommendationWhereUniqueInput | HospitalRecommendationWhereUniqueInput[]
    delete?: HospitalRecommendationWhereUniqueInput | HospitalRecommendationWhereUniqueInput[]
    connect?: HospitalRecommendationWhereUniqueInput | HospitalRecommendationWhereUniqueInput[]
    update?: HospitalRecommendationUpdateWithWhereUniqueWithoutDiagnosisRecordInput | HospitalRecommendationUpdateWithWhereUniqueWithoutDiagnosisRecordInput[]
    updateMany?: HospitalRecommendationUpdateManyWithWhereWithoutDiagnosisRecordInput | HospitalRecommendationUpdateManyWithWhereWithoutDiagnosisRecordInput[]
    deleteMany?: HospitalRecommendationScalarWhereInput | HospitalRecommendationScalarWhereInput[]
  }

  export type SupplementRecommendationUncheckedUpdateManyWithoutDiagnosisRecordNestedInput = {
    create?: XOR<SupplementRecommendationCreateWithoutDiagnosisRecordInput, SupplementRecommendationUncheckedCreateWithoutDiagnosisRecordInput> | SupplementRecommendationCreateWithoutDiagnosisRecordInput[] | SupplementRecommendationUncheckedCreateWithoutDiagnosisRecordInput[]
    connectOrCreate?: SupplementRecommendationCreateOrConnectWithoutDiagnosisRecordInput | SupplementRecommendationCreateOrConnectWithoutDiagnosisRecordInput[]
    upsert?: SupplementRecommendationUpsertWithWhereUniqueWithoutDiagnosisRecordInput | SupplementRecommendationUpsertWithWhereUniqueWithoutDiagnosisRecordInput[]
    createMany?: SupplementRecommendationCreateManyDiagnosisRecordInputEnvelope
    set?: SupplementRecommendationWhereUniqueInput | SupplementRecommendationWhereUniqueInput[]
    disconnect?: SupplementRecommendationWhereUniqueInput | SupplementRecommendationWhereUniqueInput[]
    delete?: SupplementRecommendationWhereUniqueInput | SupplementRecommendationWhereUniqueInput[]
    connect?: SupplementRecommendationWhereUniqueInput | SupplementRecommendationWhereUniqueInput[]
    update?: SupplementRecommendationUpdateWithWhereUniqueWithoutDiagnosisRecordInput | SupplementRecommendationUpdateWithWhereUniqueWithoutDiagnosisRecordInput[]
    updateMany?: SupplementRecommendationUpdateManyWithWhereWithoutDiagnosisRecordInput | SupplementRecommendationUpdateManyWithWhereWithoutDiagnosisRecordInput[]
    deleteMany?: SupplementRecommendationScalarWhereInput | SupplementRecommendationScalarWhereInput[]
  }

  export type HospitalRecommendationUncheckedUpdateManyWithoutDiagnosisRecordNestedInput = {
    create?: XOR<HospitalRecommendationCreateWithoutDiagnosisRecordInput, HospitalRecommendationUncheckedCreateWithoutDiagnosisRecordInput> | HospitalRecommendationCreateWithoutDiagnosisRecordInput[] | HospitalRecommendationUncheckedCreateWithoutDiagnosisRecordInput[]
    connectOrCreate?: HospitalRecommendationCreateOrConnectWithoutDiagnosisRecordInput | HospitalRecommendationCreateOrConnectWithoutDiagnosisRecordInput[]
    upsert?: HospitalRecommendationUpsertWithWhereUniqueWithoutDiagnosisRecordInput | HospitalRecommendationUpsertWithWhereUniqueWithoutDiagnosisRecordInput[]
    createMany?: HospitalRecommendationCreateManyDiagnosisRecordInputEnvelope
    set?: HospitalRecommendationWhereUniqueInput | HospitalRecommendationWhereUniqueInput[]
    disconnect?: HospitalRecommendationWhereUniqueInput | HospitalRecommendationWhereUniqueInput[]
    delete?: HospitalRecommendationWhereUniqueInput | HospitalRecommendationWhereUniqueInput[]
    connect?: HospitalRecommendationWhereUniqueInput | HospitalRecommendationWhereUniqueInput[]
    update?: HospitalRecommendationUpdateWithWhereUniqueWithoutDiagnosisRecordInput | HospitalRecommendationUpdateWithWhereUniqueWithoutDiagnosisRecordInput[]
    updateMany?: HospitalRecommendationUpdateManyWithWhereWithoutDiagnosisRecordInput | HospitalRecommendationUpdateManyWithWhereWithoutDiagnosisRecordInput[]
    deleteMany?: HospitalRecommendationScalarWhereInput | HospitalRecommendationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSupplementRecommendationsInput = {
    create?: XOR<UserCreateWithoutSupplementRecommendationsInput, UserUncheckedCreateWithoutSupplementRecommendationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSupplementRecommendationsInput
    connect?: UserWhereUniqueInput
  }

  export type DiagnosisRecordCreateNestedOneWithoutSupplementRecommendationsInput = {
    create?: XOR<DiagnosisRecordCreateWithoutSupplementRecommendationsInput, DiagnosisRecordUncheckedCreateWithoutSupplementRecommendationsInput>
    connectOrCreate?: DiagnosisRecordCreateOrConnectWithoutSupplementRecommendationsInput
    connect?: DiagnosisRecordWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSupplementRecommendationsNestedInput = {
    create?: XOR<UserCreateWithoutSupplementRecommendationsInput, UserUncheckedCreateWithoutSupplementRecommendationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSupplementRecommendationsInput
    upsert?: UserUpsertWithoutSupplementRecommendationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSupplementRecommendationsInput, UserUpdateWithoutSupplementRecommendationsInput>, UserUncheckedUpdateWithoutSupplementRecommendationsInput>
  }

  export type DiagnosisRecordUpdateOneWithoutSupplementRecommendationsNestedInput = {
    create?: XOR<DiagnosisRecordCreateWithoutSupplementRecommendationsInput, DiagnosisRecordUncheckedCreateWithoutSupplementRecommendationsInput>
    connectOrCreate?: DiagnosisRecordCreateOrConnectWithoutSupplementRecommendationsInput
    upsert?: DiagnosisRecordUpsertWithoutSupplementRecommendationsInput
    disconnect?: DiagnosisRecordWhereInput | boolean
    delete?: DiagnosisRecordWhereInput | boolean
    connect?: DiagnosisRecordWhereUniqueInput
    update?: XOR<XOR<DiagnosisRecordUpdateToOneWithWhereWithoutSupplementRecommendationsInput, DiagnosisRecordUpdateWithoutSupplementRecommendationsInput>, DiagnosisRecordUncheckedUpdateWithoutSupplementRecommendationsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserCreateNestedOneWithoutHospitalRecommendationsInput = {
    create?: XOR<UserCreateWithoutHospitalRecommendationsInput, UserUncheckedCreateWithoutHospitalRecommendationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutHospitalRecommendationsInput
    connect?: UserWhereUniqueInput
  }

  export type DiagnosisRecordCreateNestedOneWithoutHospitalRecommendationsInput = {
    create?: XOR<DiagnosisRecordCreateWithoutHospitalRecommendationsInput, DiagnosisRecordUncheckedCreateWithoutHospitalRecommendationsInput>
    connectOrCreate?: DiagnosisRecordCreateOrConnectWithoutHospitalRecommendationsInput
    connect?: DiagnosisRecordWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutHospitalRecommendationsNestedInput = {
    create?: XOR<UserCreateWithoutHospitalRecommendationsInput, UserUncheckedCreateWithoutHospitalRecommendationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutHospitalRecommendationsInput
    upsert?: UserUpsertWithoutHospitalRecommendationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutHospitalRecommendationsInput, UserUpdateWithoutHospitalRecommendationsInput>, UserUncheckedUpdateWithoutHospitalRecommendationsInput>
  }

  export type DiagnosisRecordUpdateOneWithoutHospitalRecommendationsNestedInput = {
    create?: XOR<DiagnosisRecordCreateWithoutHospitalRecommendationsInput, DiagnosisRecordUncheckedCreateWithoutHospitalRecommendationsInput>
    connectOrCreate?: DiagnosisRecordCreateOrConnectWithoutHospitalRecommendationsInput
    upsert?: DiagnosisRecordUpsertWithoutHospitalRecommendationsInput
    disconnect?: DiagnosisRecordWhereInput | boolean
    delete?: DiagnosisRecordWhereInput | boolean
    connect?: DiagnosisRecordWhereUniqueInput
    update?: XOR<XOR<DiagnosisRecordUpdateToOneWithWhereWithoutHospitalRecommendationsInput, DiagnosisRecordUpdateWithoutHospitalRecommendationsInput>, DiagnosisRecordUncheckedUpdateWithoutHospitalRecommendationsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DiagnosisRecordCreateWithoutUserInput = {
    symptoms: string
    diagnosisResult: string
    departments?: string | null
    heightAtDiagnosis?: number | null
    weightAtDiagnosis?: number | null
    smokingAtDiagnosis?: boolean
    drinkingFrequencyAtDiagnosis?: string | null
    chronicDiseaseAtDiagnosis?: string | null
    medicationsAtDiagnosis?: string | null
    createdAt?: Date | string
    supplementRecommendations?: SupplementRecommendationCreateNestedManyWithoutDiagnosisRecordInput
    hospitalRecommendations?: HospitalRecommendationCreateNestedManyWithoutDiagnosisRecordInput
  }

  export type DiagnosisRecordUncheckedCreateWithoutUserInput = {
    id?: number
    symptoms: string
    diagnosisResult: string
    departments?: string | null
    heightAtDiagnosis?: number | null
    weightAtDiagnosis?: number | null
    smokingAtDiagnosis?: boolean
    drinkingFrequencyAtDiagnosis?: string | null
    chronicDiseaseAtDiagnosis?: string | null
    medicationsAtDiagnosis?: string | null
    createdAt?: Date | string
    supplementRecommendations?: SupplementRecommendationUncheckedCreateNestedManyWithoutDiagnosisRecordInput
    hospitalRecommendations?: HospitalRecommendationUncheckedCreateNestedManyWithoutDiagnosisRecordInput
  }

  export type DiagnosisRecordCreateOrConnectWithoutUserInput = {
    where: DiagnosisRecordWhereUniqueInput
    create: XOR<DiagnosisRecordCreateWithoutUserInput, DiagnosisRecordUncheckedCreateWithoutUserInput>
  }

  export type DiagnosisRecordCreateManyUserInputEnvelope = {
    data: DiagnosisRecordCreateManyUserInput | DiagnosisRecordCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SupplementRecommendationCreateWithoutUserInput = {
    recommendations: string
    createdAt?: Date | string
    diagnosisRecord?: DiagnosisRecordCreateNestedOneWithoutSupplementRecommendationsInput
  }

  export type SupplementRecommendationUncheckedCreateWithoutUserInput = {
    id?: number
    basedOnDiagnosisId?: number | null
    recommendations: string
    createdAt?: Date | string
  }

  export type SupplementRecommendationCreateOrConnectWithoutUserInput = {
    where: SupplementRecommendationWhereUniqueInput
    create: XOR<SupplementRecommendationCreateWithoutUserInput, SupplementRecommendationUncheckedCreateWithoutUserInput>
  }

  export type SupplementRecommendationCreateManyUserInputEnvelope = {
    data: SupplementRecommendationCreateManyUserInput | SupplementRecommendationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type HospitalRecommendationCreateWithoutUserInput = {
    location?: string | null
    recommendedHospitals: string
    createdAt?: Date | string
    diagnosisRecord?: DiagnosisRecordCreateNestedOneWithoutHospitalRecommendationsInput
  }

  export type HospitalRecommendationUncheckedCreateWithoutUserInput = {
    id?: number
    basedOnDiagnosisId?: number | null
    location?: string | null
    recommendedHospitals: string
    createdAt?: Date | string
  }

  export type HospitalRecommendationCreateOrConnectWithoutUserInput = {
    where: HospitalRecommendationWhereUniqueInput
    create: XOR<HospitalRecommendationCreateWithoutUserInput, HospitalRecommendationUncheckedCreateWithoutUserInput>
  }

  export type HospitalRecommendationCreateManyUserInputEnvelope = {
    data: HospitalRecommendationCreateManyUserInput | HospitalRecommendationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DiagnosisRecordUpsertWithWhereUniqueWithoutUserInput = {
    where: DiagnosisRecordWhereUniqueInput
    update: XOR<DiagnosisRecordUpdateWithoutUserInput, DiagnosisRecordUncheckedUpdateWithoutUserInput>
    create: XOR<DiagnosisRecordCreateWithoutUserInput, DiagnosisRecordUncheckedCreateWithoutUserInput>
  }

  export type DiagnosisRecordUpdateWithWhereUniqueWithoutUserInput = {
    where: DiagnosisRecordWhereUniqueInput
    data: XOR<DiagnosisRecordUpdateWithoutUserInput, DiagnosisRecordUncheckedUpdateWithoutUserInput>
  }

  export type DiagnosisRecordUpdateManyWithWhereWithoutUserInput = {
    where: DiagnosisRecordScalarWhereInput
    data: XOR<DiagnosisRecordUpdateManyMutationInput, DiagnosisRecordUncheckedUpdateManyWithoutUserInput>
  }

  export type DiagnosisRecordScalarWhereInput = {
    AND?: DiagnosisRecordScalarWhereInput | DiagnosisRecordScalarWhereInput[]
    OR?: DiagnosisRecordScalarWhereInput[]
    NOT?: DiagnosisRecordScalarWhereInput | DiagnosisRecordScalarWhereInput[]
    id?: IntFilter<"DiagnosisRecord"> | number
    userId?: IntFilter<"DiagnosisRecord"> | number
    symptoms?: StringFilter<"DiagnosisRecord"> | string
    diagnosisResult?: StringFilter<"DiagnosisRecord"> | string
    departments?: StringNullableFilter<"DiagnosisRecord"> | string | null
    heightAtDiagnosis?: FloatNullableFilter<"DiagnosisRecord"> | number | null
    weightAtDiagnosis?: FloatNullableFilter<"DiagnosisRecord"> | number | null
    smokingAtDiagnosis?: BoolFilter<"DiagnosisRecord"> | boolean
    drinkingFrequencyAtDiagnosis?: StringNullableFilter<"DiagnosisRecord"> | string | null
    chronicDiseaseAtDiagnosis?: StringNullableFilter<"DiagnosisRecord"> | string | null
    medicationsAtDiagnosis?: StringNullableFilter<"DiagnosisRecord"> | string | null
    createdAt?: DateTimeFilter<"DiagnosisRecord"> | Date | string
  }

  export type SupplementRecommendationUpsertWithWhereUniqueWithoutUserInput = {
    where: SupplementRecommendationWhereUniqueInput
    update: XOR<SupplementRecommendationUpdateWithoutUserInput, SupplementRecommendationUncheckedUpdateWithoutUserInput>
    create: XOR<SupplementRecommendationCreateWithoutUserInput, SupplementRecommendationUncheckedCreateWithoutUserInput>
  }

  export type SupplementRecommendationUpdateWithWhereUniqueWithoutUserInput = {
    where: SupplementRecommendationWhereUniqueInput
    data: XOR<SupplementRecommendationUpdateWithoutUserInput, SupplementRecommendationUncheckedUpdateWithoutUserInput>
  }

  export type SupplementRecommendationUpdateManyWithWhereWithoutUserInput = {
    where: SupplementRecommendationScalarWhereInput
    data: XOR<SupplementRecommendationUpdateManyMutationInput, SupplementRecommendationUncheckedUpdateManyWithoutUserInput>
  }

  export type SupplementRecommendationScalarWhereInput = {
    AND?: SupplementRecommendationScalarWhereInput | SupplementRecommendationScalarWhereInput[]
    OR?: SupplementRecommendationScalarWhereInput[]
    NOT?: SupplementRecommendationScalarWhereInput | SupplementRecommendationScalarWhereInput[]
    id?: IntFilter<"SupplementRecommendation"> | number
    userId?: IntFilter<"SupplementRecommendation"> | number
    basedOnDiagnosisId?: IntNullableFilter<"SupplementRecommendation"> | number | null
    recommendations?: StringFilter<"SupplementRecommendation"> | string
    createdAt?: DateTimeFilter<"SupplementRecommendation"> | Date | string
  }

  export type HospitalRecommendationUpsertWithWhereUniqueWithoutUserInput = {
    where: HospitalRecommendationWhereUniqueInput
    update: XOR<HospitalRecommendationUpdateWithoutUserInput, HospitalRecommendationUncheckedUpdateWithoutUserInput>
    create: XOR<HospitalRecommendationCreateWithoutUserInput, HospitalRecommendationUncheckedCreateWithoutUserInput>
  }

  export type HospitalRecommendationUpdateWithWhereUniqueWithoutUserInput = {
    where: HospitalRecommendationWhereUniqueInput
    data: XOR<HospitalRecommendationUpdateWithoutUserInput, HospitalRecommendationUncheckedUpdateWithoutUserInput>
  }

  export type HospitalRecommendationUpdateManyWithWhereWithoutUserInput = {
    where: HospitalRecommendationScalarWhereInput
    data: XOR<HospitalRecommendationUpdateManyMutationInput, HospitalRecommendationUncheckedUpdateManyWithoutUserInput>
  }

  export type HospitalRecommendationScalarWhereInput = {
    AND?: HospitalRecommendationScalarWhereInput | HospitalRecommendationScalarWhereInput[]
    OR?: HospitalRecommendationScalarWhereInput[]
    NOT?: HospitalRecommendationScalarWhereInput | HospitalRecommendationScalarWhereInput[]
    id?: IntFilter<"HospitalRecommendation"> | number
    userId?: IntFilter<"HospitalRecommendation"> | number
    basedOnDiagnosisId?: IntNullableFilter<"HospitalRecommendation"> | number | null
    location?: StringNullableFilter<"HospitalRecommendation"> | string | null
    recommendedHospitals?: StringFilter<"HospitalRecommendation"> | string
    createdAt?: DateTimeFilter<"HospitalRecommendation"> | Date | string
  }

  export type UserCreateWithoutDiagnosisRecordsInput = {
    email: string
    password: string
    name: string
    gender: $Enums.Gender
    birthDate: Date | string
    height?: number | null
    weight?: number | null
    smoking?: boolean
    drinkingFrequency?: string | null
    chronicDisease?: string | null
    medications?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    supplementRecommendations?: SupplementRecommendationCreateNestedManyWithoutUserInput
    hospitalRecommendations?: HospitalRecommendationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDiagnosisRecordsInput = {
    id?: number
    email: string
    password: string
    name: string
    gender: $Enums.Gender
    birthDate: Date | string
    height?: number | null
    weight?: number | null
    smoking?: boolean
    drinkingFrequency?: string | null
    chronicDisease?: string | null
    medications?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    supplementRecommendations?: SupplementRecommendationUncheckedCreateNestedManyWithoutUserInput
    hospitalRecommendations?: HospitalRecommendationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDiagnosisRecordsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDiagnosisRecordsInput, UserUncheckedCreateWithoutDiagnosisRecordsInput>
  }

  export type SupplementRecommendationCreateWithoutDiagnosisRecordInput = {
    recommendations: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSupplementRecommendationsInput
  }

  export type SupplementRecommendationUncheckedCreateWithoutDiagnosisRecordInput = {
    id?: number
    userId: number
    recommendations: string
    createdAt?: Date | string
  }

  export type SupplementRecommendationCreateOrConnectWithoutDiagnosisRecordInput = {
    where: SupplementRecommendationWhereUniqueInput
    create: XOR<SupplementRecommendationCreateWithoutDiagnosisRecordInput, SupplementRecommendationUncheckedCreateWithoutDiagnosisRecordInput>
  }

  export type SupplementRecommendationCreateManyDiagnosisRecordInputEnvelope = {
    data: SupplementRecommendationCreateManyDiagnosisRecordInput | SupplementRecommendationCreateManyDiagnosisRecordInput[]
    skipDuplicates?: boolean
  }

  export type HospitalRecommendationCreateWithoutDiagnosisRecordInput = {
    location?: string | null
    recommendedHospitals: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutHospitalRecommendationsInput
  }

  export type HospitalRecommendationUncheckedCreateWithoutDiagnosisRecordInput = {
    id?: number
    userId: number
    location?: string | null
    recommendedHospitals: string
    createdAt?: Date | string
  }

  export type HospitalRecommendationCreateOrConnectWithoutDiagnosisRecordInput = {
    where: HospitalRecommendationWhereUniqueInput
    create: XOR<HospitalRecommendationCreateWithoutDiagnosisRecordInput, HospitalRecommendationUncheckedCreateWithoutDiagnosisRecordInput>
  }

  export type HospitalRecommendationCreateManyDiagnosisRecordInputEnvelope = {
    data: HospitalRecommendationCreateManyDiagnosisRecordInput | HospitalRecommendationCreateManyDiagnosisRecordInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutDiagnosisRecordsInput = {
    update: XOR<UserUpdateWithoutDiagnosisRecordsInput, UserUncheckedUpdateWithoutDiagnosisRecordsInput>
    create: XOR<UserCreateWithoutDiagnosisRecordsInput, UserUncheckedCreateWithoutDiagnosisRecordsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDiagnosisRecordsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDiagnosisRecordsInput, UserUncheckedUpdateWithoutDiagnosisRecordsInput>
  }

  export type UserUpdateWithoutDiagnosisRecordsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    smoking?: BoolFieldUpdateOperationsInput | boolean
    drinkingFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDisease?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplementRecommendations?: SupplementRecommendationUpdateManyWithoutUserNestedInput
    hospitalRecommendations?: HospitalRecommendationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDiagnosisRecordsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    smoking?: BoolFieldUpdateOperationsInput | boolean
    drinkingFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDisease?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplementRecommendations?: SupplementRecommendationUncheckedUpdateManyWithoutUserNestedInput
    hospitalRecommendations?: HospitalRecommendationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SupplementRecommendationUpsertWithWhereUniqueWithoutDiagnosisRecordInput = {
    where: SupplementRecommendationWhereUniqueInput
    update: XOR<SupplementRecommendationUpdateWithoutDiagnosisRecordInput, SupplementRecommendationUncheckedUpdateWithoutDiagnosisRecordInput>
    create: XOR<SupplementRecommendationCreateWithoutDiagnosisRecordInput, SupplementRecommendationUncheckedCreateWithoutDiagnosisRecordInput>
  }

  export type SupplementRecommendationUpdateWithWhereUniqueWithoutDiagnosisRecordInput = {
    where: SupplementRecommendationWhereUniqueInput
    data: XOR<SupplementRecommendationUpdateWithoutDiagnosisRecordInput, SupplementRecommendationUncheckedUpdateWithoutDiagnosisRecordInput>
  }

  export type SupplementRecommendationUpdateManyWithWhereWithoutDiagnosisRecordInput = {
    where: SupplementRecommendationScalarWhereInput
    data: XOR<SupplementRecommendationUpdateManyMutationInput, SupplementRecommendationUncheckedUpdateManyWithoutDiagnosisRecordInput>
  }

  export type HospitalRecommendationUpsertWithWhereUniqueWithoutDiagnosisRecordInput = {
    where: HospitalRecommendationWhereUniqueInput
    update: XOR<HospitalRecommendationUpdateWithoutDiagnosisRecordInput, HospitalRecommendationUncheckedUpdateWithoutDiagnosisRecordInput>
    create: XOR<HospitalRecommendationCreateWithoutDiagnosisRecordInput, HospitalRecommendationUncheckedCreateWithoutDiagnosisRecordInput>
  }

  export type HospitalRecommendationUpdateWithWhereUniqueWithoutDiagnosisRecordInput = {
    where: HospitalRecommendationWhereUniqueInput
    data: XOR<HospitalRecommendationUpdateWithoutDiagnosisRecordInput, HospitalRecommendationUncheckedUpdateWithoutDiagnosisRecordInput>
  }

  export type HospitalRecommendationUpdateManyWithWhereWithoutDiagnosisRecordInput = {
    where: HospitalRecommendationScalarWhereInput
    data: XOR<HospitalRecommendationUpdateManyMutationInput, HospitalRecommendationUncheckedUpdateManyWithoutDiagnosisRecordInput>
  }

  export type UserCreateWithoutSupplementRecommendationsInput = {
    email: string
    password: string
    name: string
    gender: $Enums.Gender
    birthDate: Date | string
    height?: number | null
    weight?: number | null
    smoking?: boolean
    drinkingFrequency?: string | null
    chronicDisease?: string | null
    medications?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    diagnosisRecords?: DiagnosisRecordCreateNestedManyWithoutUserInput
    hospitalRecommendations?: HospitalRecommendationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSupplementRecommendationsInput = {
    id?: number
    email: string
    password: string
    name: string
    gender: $Enums.Gender
    birthDate: Date | string
    height?: number | null
    weight?: number | null
    smoking?: boolean
    drinkingFrequency?: string | null
    chronicDisease?: string | null
    medications?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    diagnosisRecords?: DiagnosisRecordUncheckedCreateNestedManyWithoutUserInput
    hospitalRecommendations?: HospitalRecommendationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSupplementRecommendationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSupplementRecommendationsInput, UserUncheckedCreateWithoutSupplementRecommendationsInput>
  }

  export type DiagnosisRecordCreateWithoutSupplementRecommendationsInput = {
    symptoms: string
    diagnosisResult: string
    departments?: string | null
    heightAtDiagnosis?: number | null
    weightAtDiagnosis?: number | null
    smokingAtDiagnosis?: boolean
    drinkingFrequencyAtDiagnosis?: string | null
    chronicDiseaseAtDiagnosis?: string | null
    medicationsAtDiagnosis?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutDiagnosisRecordsInput
    hospitalRecommendations?: HospitalRecommendationCreateNestedManyWithoutDiagnosisRecordInput
  }

  export type DiagnosisRecordUncheckedCreateWithoutSupplementRecommendationsInput = {
    id?: number
    userId: number
    symptoms: string
    diagnosisResult: string
    departments?: string | null
    heightAtDiagnosis?: number | null
    weightAtDiagnosis?: number | null
    smokingAtDiagnosis?: boolean
    drinkingFrequencyAtDiagnosis?: string | null
    chronicDiseaseAtDiagnosis?: string | null
    medicationsAtDiagnosis?: string | null
    createdAt?: Date | string
    hospitalRecommendations?: HospitalRecommendationUncheckedCreateNestedManyWithoutDiagnosisRecordInput
  }

  export type DiagnosisRecordCreateOrConnectWithoutSupplementRecommendationsInput = {
    where: DiagnosisRecordWhereUniqueInput
    create: XOR<DiagnosisRecordCreateWithoutSupplementRecommendationsInput, DiagnosisRecordUncheckedCreateWithoutSupplementRecommendationsInput>
  }

  export type UserUpsertWithoutSupplementRecommendationsInput = {
    update: XOR<UserUpdateWithoutSupplementRecommendationsInput, UserUncheckedUpdateWithoutSupplementRecommendationsInput>
    create: XOR<UserCreateWithoutSupplementRecommendationsInput, UserUncheckedCreateWithoutSupplementRecommendationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSupplementRecommendationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSupplementRecommendationsInput, UserUncheckedUpdateWithoutSupplementRecommendationsInput>
  }

  export type UserUpdateWithoutSupplementRecommendationsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    smoking?: BoolFieldUpdateOperationsInput | boolean
    drinkingFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDisease?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    diagnosisRecords?: DiagnosisRecordUpdateManyWithoutUserNestedInput
    hospitalRecommendations?: HospitalRecommendationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSupplementRecommendationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    smoking?: BoolFieldUpdateOperationsInput | boolean
    drinkingFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDisease?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    diagnosisRecords?: DiagnosisRecordUncheckedUpdateManyWithoutUserNestedInput
    hospitalRecommendations?: HospitalRecommendationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DiagnosisRecordUpsertWithoutSupplementRecommendationsInput = {
    update: XOR<DiagnosisRecordUpdateWithoutSupplementRecommendationsInput, DiagnosisRecordUncheckedUpdateWithoutSupplementRecommendationsInput>
    create: XOR<DiagnosisRecordCreateWithoutSupplementRecommendationsInput, DiagnosisRecordUncheckedCreateWithoutSupplementRecommendationsInput>
    where?: DiagnosisRecordWhereInput
  }

  export type DiagnosisRecordUpdateToOneWithWhereWithoutSupplementRecommendationsInput = {
    where?: DiagnosisRecordWhereInput
    data: XOR<DiagnosisRecordUpdateWithoutSupplementRecommendationsInput, DiagnosisRecordUncheckedUpdateWithoutSupplementRecommendationsInput>
  }

  export type DiagnosisRecordUpdateWithoutSupplementRecommendationsInput = {
    symptoms?: StringFieldUpdateOperationsInput | string
    diagnosisResult?: StringFieldUpdateOperationsInput | string
    departments?: NullableStringFieldUpdateOperationsInput | string | null
    heightAtDiagnosis?: NullableFloatFieldUpdateOperationsInput | number | null
    weightAtDiagnosis?: NullableFloatFieldUpdateOperationsInput | number | null
    smokingAtDiagnosis?: BoolFieldUpdateOperationsInput | boolean
    drinkingFrequencyAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDiseaseAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    medicationsAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDiagnosisRecordsNestedInput
    hospitalRecommendations?: HospitalRecommendationUpdateManyWithoutDiagnosisRecordNestedInput
  }

  export type DiagnosisRecordUncheckedUpdateWithoutSupplementRecommendationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    symptoms?: StringFieldUpdateOperationsInput | string
    diagnosisResult?: StringFieldUpdateOperationsInput | string
    departments?: NullableStringFieldUpdateOperationsInput | string | null
    heightAtDiagnosis?: NullableFloatFieldUpdateOperationsInput | number | null
    weightAtDiagnosis?: NullableFloatFieldUpdateOperationsInput | number | null
    smokingAtDiagnosis?: BoolFieldUpdateOperationsInput | boolean
    drinkingFrequencyAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDiseaseAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    medicationsAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hospitalRecommendations?: HospitalRecommendationUncheckedUpdateManyWithoutDiagnosisRecordNestedInput
  }

  export type UserCreateWithoutHospitalRecommendationsInput = {
    email: string
    password: string
    name: string
    gender: $Enums.Gender
    birthDate: Date | string
    height?: number | null
    weight?: number | null
    smoking?: boolean
    drinkingFrequency?: string | null
    chronicDisease?: string | null
    medications?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    diagnosisRecords?: DiagnosisRecordCreateNestedManyWithoutUserInput
    supplementRecommendations?: SupplementRecommendationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutHospitalRecommendationsInput = {
    id?: number
    email: string
    password: string
    name: string
    gender: $Enums.Gender
    birthDate: Date | string
    height?: number | null
    weight?: number | null
    smoking?: boolean
    drinkingFrequency?: string | null
    chronicDisease?: string | null
    medications?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    diagnosisRecords?: DiagnosisRecordUncheckedCreateNestedManyWithoutUserInput
    supplementRecommendations?: SupplementRecommendationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutHospitalRecommendationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutHospitalRecommendationsInput, UserUncheckedCreateWithoutHospitalRecommendationsInput>
  }

  export type DiagnosisRecordCreateWithoutHospitalRecommendationsInput = {
    symptoms: string
    diagnosisResult: string
    departments?: string | null
    heightAtDiagnosis?: number | null
    weightAtDiagnosis?: number | null
    smokingAtDiagnosis?: boolean
    drinkingFrequencyAtDiagnosis?: string | null
    chronicDiseaseAtDiagnosis?: string | null
    medicationsAtDiagnosis?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutDiagnosisRecordsInput
    supplementRecommendations?: SupplementRecommendationCreateNestedManyWithoutDiagnosisRecordInput
  }

  export type DiagnosisRecordUncheckedCreateWithoutHospitalRecommendationsInput = {
    id?: number
    userId: number
    symptoms: string
    diagnosisResult: string
    departments?: string | null
    heightAtDiagnosis?: number | null
    weightAtDiagnosis?: number | null
    smokingAtDiagnosis?: boolean
    drinkingFrequencyAtDiagnosis?: string | null
    chronicDiseaseAtDiagnosis?: string | null
    medicationsAtDiagnosis?: string | null
    createdAt?: Date | string
    supplementRecommendations?: SupplementRecommendationUncheckedCreateNestedManyWithoutDiagnosisRecordInput
  }

  export type DiagnosisRecordCreateOrConnectWithoutHospitalRecommendationsInput = {
    where: DiagnosisRecordWhereUniqueInput
    create: XOR<DiagnosisRecordCreateWithoutHospitalRecommendationsInput, DiagnosisRecordUncheckedCreateWithoutHospitalRecommendationsInput>
  }

  export type UserUpsertWithoutHospitalRecommendationsInput = {
    update: XOR<UserUpdateWithoutHospitalRecommendationsInput, UserUncheckedUpdateWithoutHospitalRecommendationsInput>
    create: XOR<UserCreateWithoutHospitalRecommendationsInput, UserUncheckedCreateWithoutHospitalRecommendationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutHospitalRecommendationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutHospitalRecommendationsInput, UserUncheckedUpdateWithoutHospitalRecommendationsInput>
  }

  export type UserUpdateWithoutHospitalRecommendationsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    smoking?: BoolFieldUpdateOperationsInput | boolean
    drinkingFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDisease?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    diagnosisRecords?: DiagnosisRecordUpdateManyWithoutUserNestedInput
    supplementRecommendations?: SupplementRecommendationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutHospitalRecommendationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    smoking?: BoolFieldUpdateOperationsInput | boolean
    drinkingFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDisease?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    diagnosisRecords?: DiagnosisRecordUncheckedUpdateManyWithoutUserNestedInput
    supplementRecommendations?: SupplementRecommendationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DiagnosisRecordUpsertWithoutHospitalRecommendationsInput = {
    update: XOR<DiagnosisRecordUpdateWithoutHospitalRecommendationsInput, DiagnosisRecordUncheckedUpdateWithoutHospitalRecommendationsInput>
    create: XOR<DiagnosisRecordCreateWithoutHospitalRecommendationsInput, DiagnosisRecordUncheckedCreateWithoutHospitalRecommendationsInput>
    where?: DiagnosisRecordWhereInput
  }

  export type DiagnosisRecordUpdateToOneWithWhereWithoutHospitalRecommendationsInput = {
    where?: DiagnosisRecordWhereInput
    data: XOR<DiagnosisRecordUpdateWithoutHospitalRecommendationsInput, DiagnosisRecordUncheckedUpdateWithoutHospitalRecommendationsInput>
  }

  export type DiagnosisRecordUpdateWithoutHospitalRecommendationsInput = {
    symptoms?: StringFieldUpdateOperationsInput | string
    diagnosisResult?: StringFieldUpdateOperationsInput | string
    departments?: NullableStringFieldUpdateOperationsInput | string | null
    heightAtDiagnosis?: NullableFloatFieldUpdateOperationsInput | number | null
    weightAtDiagnosis?: NullableFloatFieldUpdateOperationsInput | number | null
    smokingAtDiagnosis?: BoolFieldUpdateOperationsInput | boolean
    drinkingFrequencyAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDiseaseAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    medicationsAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDiagnosisRecordsNestedInput
    supplementRecommendations?: SupplementRecommendationUpdateManyWithoutDiagnosisRecordNestedInput
  }

  export type DiagnosisRecordUncheckedUpdateWithoutHospitalRecommendationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    symptoms?: StringFieldUpdateOperationsInput | string
    diagnosisResult?: StringFieldUpdateOperationsInput | string
    departments?: NullableStringFieldUpdateOperationsInput | string | null
    heightAtDiagnosis?: NullableFloatFieldUpdateOperationsInput | number | null
    weightAtDiagnosis?: NullableFloatFieldUpdateOperationsInput | number | null
    smokingAtDiagnosis?: BoolFieldUpdateOperationsInput | boolean
    drinkingFrequencyAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDiseaseAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    medicationsAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplementRecommendations?: SupplementRecommendationUncheckedUpdateManyWithoutDiagnosisRecordNestedInput
  }

  export type DiagnosisRecordCreateManyUserInput = {
    id?: number
    symptoms: string
    diagnosisResult: string
    departments?: string | null
    heightAtDiagnosis?: number | null
    weightAtDiagnosis?: number | null
    smokingAtDiagnosis?: boolean
    drinkingFrequencyAtDiagnosis?: string | null
    chronicDiseaseAtDiagnosis?: string | null
    medicationsAtDiagnosis?: string | null
    createdAt?: Date | string
  }

  export type SupplementRecommendationCreateManyUserInput = {
    id?: number
    basedOnDiagnosisId?: number | null
    recommendations: string
    createdAt?: Date | string
  }

  export type HospitalRecommendationCreateManyUserInput = {
    id?: number
    basedOnDiagnosisId?: number | null
    location?: string | null
    recommendedHospitals: string
    createdAt?: Date | string
  }

  export type DiagnosisRecordUpdateWithoutUserInput = {
    symptoms?: StringFieldUpdateOperationsInput | string
    diagnosisResult?: StringFieldUpdateOperationsInput | string
    departments?: NullableStringFieldUpdateOperationsInput | string | null
    heightAtDiagnosis?: NullableFloatFieldUpdateOperationsInput | number | null
    weightAtDiagnosis?: NullableFloatFieldUpdateOperationsInput | number | null
    smokingAtDiagnosis?: BoolFieldUpdateOperationsInput | boolean
    drinkingFrequencyAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDiseaseAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    medicationsAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplementRecommendations?: SupplementRecommendationUpdateManyWithoutDiagnosisRecordNestedInput
    hospitalRecommendations?: HospitalRecommendationUpdateManyWithoutDiagnosisRecordNestedInput
  }

  export type DiagnosisRecordUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    symptoms?: StringFieldUpdateOperationsInput | string
    diagnosisResult?: StringFieldUpdateOperationsInput | string
    departments?: NullableStringFieldUpdateOperationsInput | string | null
    heightAtDiagnosis?: NullableFloatFieldUpdateOperationsInput | number | null
    weightAtDiagnosis?: NullableFloatFieldUpdateOperationsInput | number | null
    smokingAtDiagnosis?: BoolFieldUpdateOperationsInput | boolean
    drinkingFrequencyAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDiseaseAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    medicationsAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplementRecommendations?: SupplementRecommendationUncheckedUpdateManyWithoutDiagnosisRecordNestedInput
    hospitalRecommendations?: HospitalRecommendationUncheckedUpdateManyWithoutDiagnosisRecordNestedInput
  }

  export type DiagnosisRecordUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    symptoms?: StringFieldUpdateOperationsInput | string
    diagnosisResult?: StringFieldUpdateOperationsInput | string
    departments?: NullableStringFieldUpdateOperationsInput | string | null
    heightAtDiagnosis?: NullableFloatFieldUpdateOperationsInput | number | null
    weightAtDiagnosis?: NullableFloatFieldUpdateOperationsInput | number | null
    smokingAtDiagnosis?: BoolFieldUpdateOperationsInput | boolean
    drinkingFrequencyAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDiseaseAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    medicationsAtDiagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplementRecommendationUpdateWithoutUserInput = {
    recommendations?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    diagnosisRecord?: DiagnosisRecordUpdateOneWithoutSupplementRecommendationsNestedInput
  }

  export type SupplementRecommendationUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    basedOnDiagnosisId?: NullableIntFieldUpdateOperationsInput | number | null
    recommendations?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplementRecommendationUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    basedOnDiagnosisId?: NullableIntFieldUpdateOperationsInput | number | null
    recommendations?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HospitalRecommendationUpdateWithoutUserInput = {
    location?: NullableStringFieldUpdateOperationsInput | string | null
    recommendedHospitals?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    diagnosisRecord?: DiagnosisRecordUpdateOneWithoutHospitalRecommendationsNestedInput
  }

  export type HospitalRecommendationUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    basedOnDiagnosisId?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    recommendedHospitals?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HospitalRecommendationUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    basedOnDiagnosisId?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    recommendedHospitals?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplementRecommendationCreateManyDiagnosisRecordInput = {
    id?: number
    userId: number
    recommendations: string
    createdAt?: Date | string
  }

  export type HospitalRecommendationCreateManyDiagnosisRecordInput = {
    id?: number
    userId: number
    location?: string | null
    recommendedHospitals: string
    createdAt?: Date | string
  }

  export type SupplementRecommendationUpdateWithoutDiagnosisRecordInput = {
    recommendations?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSupplementRecommendationsNestedInput
  }

  export type SupplementRecommendationUncheckedUpdateWithoutDiagnosisRecordInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    recommendations?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplementRecommendationUncheckedUpdateManyWithoutDiagnosisRecordInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    recommendations?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HospitalRecommendationUpdateWithoutDiagnosisRecordInput = {
    location?: NullableStringFieldUpdateOperationsInput | string | null
    recommendedHospitals?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutHospitalRecommendationsNestedInput
  }

  export type HospitalRecommendationUncheckedUpdateWithoutDiagnosisRecordInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    recommendedHospitals?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HospitalRecommendationUncheckedUpdateManyWithoutDiagnosisRecordInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    recommendedHospitals?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DiagnosisRecordCountOutputTypeDefaultArgs instead
     */
    export type DiagnosisRecordCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DiagnosisRecordCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DiagnosisRecordDefaultArgs instead
     */
    export type DiagnosisRecordArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DiagnosisRecordDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SupplementRecommendationDefaultArgs instead
     */
    export type SupplementRecommendationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SupplementRecommendationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use HospitalRecommendationDefaultArgs instead
     */
    export type HospitalRecommendationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = HospitalRecommendationDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}