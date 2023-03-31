/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { NotFound } from 'http-errors';
import { getModelForClass } from '@typegoose/typegoose';
import { AnyParamConstructor, ReturnModelType } from '@typegoose/typegoose/lib/types';

export default abstract class GenericRepository<T
extends AnyParamConstructor<any>> implements Read<T>, Write<T> {
  public readonly model: ReturnModelType<T>;

  private readonly populates: string[];

  constructor(cls: T, populates: string[] = []) {
    this.model = getModelForClass(cls);
    this.populates = populates;
  }

  async findAll(): Promise<T[]> {
    return this.model.find().populate(this.populates).lean();
  }

  async findById(id: Id): Promise<T> {
    const entity = await this.model
      .findOne({ _id: id })
      .populate(this.populates)
      .exec();

    if (!entity) {
      throw new NotFound();
    }

    return entity.toObject();
  }

  async findOne(query: Partial<T>, selection?: Partial<T>): Promise<T> {
    const entity = await this.model
      .findOne(query as never)
      .select(selection)
      .populate(this.populates)
      .exec();

    if (!entity) {
      throw new NotFound();
    }

    return entity as T;
  }

  async create(entity: Partial<T>): Promise<T> {
    const newEntity = await this.model.create(entity);

    return newEntity.toObject();
  }

  async update(id: Id, entity: Partial<T>): Promise<T> {
    const entityFound = await this.findById(id);

    if (!entityFound) {
      throw new Error('Entity not found');
    }

    await this.model.updateOne({ _id: id }, entity).exec();

    return entityFound;
  }

  async delete(id: Id): Promise<boolean> {
    const result = await this.model.deleteOne({ _id: id }).exec();

    return !!result.acknowledged;
  }
}
