import { prop, index, getModelForClass } from '@typegoose/typegoose';

@index({ name: 1 }, { unique: true })
export class Status {
  readonly _id?: string | null;

  @prop({ required: true })
  public name?: string;
}

export default getModelForClass(Status);
