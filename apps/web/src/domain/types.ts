export type Branded<T, Brand> = T & { readonly _brand: Brand };

export type IdBrand<Entity> = { readonly _id: Entity };

export type TaskId = Branded<number, IdBrand<"Task">>;

export interface Entity<Id> {
  readonly id: Id;
}
