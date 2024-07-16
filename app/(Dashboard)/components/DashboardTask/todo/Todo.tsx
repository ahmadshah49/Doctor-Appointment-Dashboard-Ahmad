"use client";
import React from "react";

type Todo = {
  id: number;
  title: string;
  description: string;
  date: string;
  completed: boolean;
};

type todoDataProps = {
  todoData: Todo[];
};

const Todo: React.FC<todoDataProps> = ({ todoData }) => {
  // const todoData = [
  //   {
  //     id: 1,
  //     title: "Buy groceries",
  //     description: "Milk, Bread, Cheese, Fruits",
  //     date: "2024-07-05",
  //     completed: false,
  //   },
  //   {
  //     id: 2,
  //     title: "Finish React project",
  //     description: "Complete the UI for the new feature",
  //     date: "2024-07-06",
  //     completed: false,
  //   },
  //   {
  //     id: 3,
  //     title: "Call mom",
  //     description: "Check in with mom and update her",
  //     date: "2024-07-07",
  //     completed: true,
  //   },
  //   {
  //     id: 4,
  //     title: "Workout",
  //     description: "Go for a 30-minute run",
  //     date: "2024-07-08",
  //     completed: false,
  //   },
  //   {
  //     id: 5,
  //     title: "Read a book",
  //     description: "Read at least 20 pages of a novel",
  //     date: "2024-07-09",
  //     completed: true,
  //   },
  // ];

  return (
    <div>
      
    </div>
  );
};

export default Todo;
