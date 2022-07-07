import { prop, getModelForClass } from '@typegoose/typegoose';

export default class Status {
  readonly _id: Id;

  @prop({ type: String, required: true })
  public name: string;

  @prop({ type: Boolean, default: true })
  public active: boolean;
}

export const statusModel = getModelForClass(Status);
