import { prop, getModelForClass } from '@typegoose/typegoose';

export class Status {
  readonly _id: Id;

  @prop({ type: String, required: true })
  public name: string;

  @prop({ type: Boolean, default: true })
  public active: boolean;
}

export const StatusModel = getModelForClass(Status);
