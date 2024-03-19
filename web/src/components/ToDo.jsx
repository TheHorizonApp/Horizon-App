"use client";
import React, { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const ToDoList = () => {
  const [toDos, setToDos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  // const fetchTodos = async () => {
  //   try {
  //     const response = await fetch("https://dummyjson.com/todos"); //change to our API endpoint
  //     const jsonData = await response.json();
  //     setToDos(jsonData.todos);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  const fetchTodos = async () => {
    try {
      const response = await fetch("https://dummyjson.com/todos"); // Change this to your actual API endpoint
      const jsonData = await response.json();
      
      // Define an array of Tailwind CSS classes for background colors
      const colorClasses = ['bg-blue-500', 'bg-red-500', 'bg-gray-500', 'bg-purple-500', 'bg-green-500', 'bg-yellow-500', 'bg-pink-500'];
  
      // Assign a random color class to each todo
      const todosWithColors = jsonData.todos.map(todo => {
        const randomColorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];
        return { ...todo, color: randomColorClass };
      });
  
      setToDos(todosWithColors);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addToDo = async () => {
    try {
      const response = await fetch("https://dummyjson.com/todos/add", {
        //change to our API endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: "New Task", userId: 45 }),
      });
      const jsonData = await response.json();
      setToDos([...toDos, jsonData]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteToDo = async (id) => {
    try {
      // Assuming deletion is successful...
      const updatedToDos = toDos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, deleting: true }; // Mark as deleting
        }
        return todo;
      });
      setToDos(updatedToDos);

      // Wait for animation to complete before removing from state
      setTimeout(() => {
        const filteredToDos = toDos.filter((todo) => todo.id !== id);
        setToDos(filteredToDos);
      }, 500); // Match the duration of your CSS animation
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(toDos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setToDos(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="mt-8 mx-5 flex justify-between pb-2">
        <div className="font-bold">
          To-Do's ({toDos.length ? toDos.length : "0"})
        </div>
        <button className="font-bold cursor-pointer" onClick={addToDo}>
          +
        </button>
      </div>
      <Droppable droppableId="todos">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="max-h-[89.5vh] overflow-y-auto ml-5 mr-2 pr-3"
          >
            {toDos.map((todo, index) => (
              <Draggable
                key={todo.id}
                draggableId={String(todo.id)}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`flex relative mb-2 ${
                      todo.deleting ? "todo-exiting" : ""
                    }`}
                  >
                    <div className="flex items-center mx-3 py-2">
                      <button
                        className="border p-[6px] rounded-full mr-2 cursor-pointer relative hover-fill"
                        onClick={(event) => {
                          event.stopPropagation();
                          deleteToDo(todo.id);
                        }}
                      />
                      <div className="text-white text-sm font-normal">
                        {todo.todo}
                      </div>
                    </div>
                    <div
                      className={`absolute inset-y-0 right-0 w-[4px] rounded-r-xl ${todo.color}`}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ToDoList;
