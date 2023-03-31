declare global {
  type Optional = T | undefined;

  type Id = ObjectId | string;

  interface Response {
    statusCode: number;
    body: string;
    headers?: {
      [key: string]: string;
    };
  }

  type Policy = {
    Version: string;
    Statement: any[];
    [key: string]: any;
  };

  interface Read<T> {
    findAll(): Promise<T[]>
    findById(id: Id): Promise<T>;
    findOne(query: Partial<T>, selection?: Partial<T>): Promise<T>;
  }

  interface Write<T> {
    create(entity: Partial<T>): Promise<T>;
    update(id: Id, entity: T): Promise<T>;
    delete(id: Id): Promise<boolean>;
  }
}

// disable automatic export
export {};
