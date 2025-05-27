export interface Todo {
  updatedAt?: Date;
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: Date;
}