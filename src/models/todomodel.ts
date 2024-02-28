import { Schema, model } from 'mongoose';

const todoModelSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique:true,
  },
  description: {
    type: String,
    required: true,
    maxLength: 50,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const TodoModel = model('TodoModel', todoModelSchema);

export default TodoModel;
