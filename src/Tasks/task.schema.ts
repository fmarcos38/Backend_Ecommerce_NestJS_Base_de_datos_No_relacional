import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Task>;

@Schema()
export class Task {
    @Prop()
    name: string;

    @Prop()
    completed: string;

}

export const TaskSchema = SchemaFactory.createForClass(Task);