"use client";
import React, { useEffect, useState, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function useOutsideClick(ref, onOutsideClick) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onOutsideClick]);
}

const ToDoList = () => {
  const [showInput, setShowInput] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => setShowInput(false));

  const [toDos, setToDos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [selectedColor, setSelectedColor] = useState("bg-blue-500"); // Default to Blue
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

  const [editingId, setEditingId] = useState(null);
  const handleEditClick = (id) => {
    setEditingId(id);
  };  

  const handleTodoChange = (event, id) => {
    const updatedTodos = toDos.map((todo) =>
      todo.id === id ? { ...todo, todo: event.target.value } : todo
    );
    setToDos(updatedTodos);
  };
  const handleKeyPress = (event, id) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); 
      handleUpdateTodo(id);
    }
  };

  const handleUpdateTodo = async (id) => {
    setEditingId(null);
    const todoToUpdate = toDos.find((todo) => todo.id === id);
    if (todoToUpdate) {
      try {
        const response = await fetch(`http:localhost:8000/api/todo/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            todo: todoToUpdate.todo,
            color: todoToUpdate.color,
          }),
        });
        const updatedTodo = await response.json();
        setToDos((prevToDos) =>
          prevToDos.map((todo) => (todo.id === id ? updatedTodo : todo))
        );
      } catch (error) {
        console.error("Failed to update todo:", error);
      }
    }
  };

  const colors = [
    { value: "bg-blue-500", label: "Blue", color: "#4299E1" },
    { value: "bg-red-500", label: "Red", color: "#F56565" },
    { value: "bg-gray-500", label: "Gray", color: "#A0AEC0" },
    { value: "bg-purple-500", label: "Purple", color: "#9F7AEA" },
    { value: "bg-green-500", label: "Green", color: "#48BB78" },
    { value: "bg-yellow-500", label: "Yellow", color: "#ECC94B" },
    { value: "bg-pink-500", label: "Pink", color: "#ED64A6" },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectColor = (value) => {
    setSelectedColor(value);
    setIsOpen(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // const fetchTodos = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8000/api/todos");
  //     const jsonData = await response.json();
  //     setToDos(jsonData.todos);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  //testing only
  const fetchTodos = async () => {
    try {
      const response = await fetch("https://dummyjson.com/todos"); // Change this to your actual API endpoint
      const jsonData = await response.json();

      const colorClasses = [
        "bg-blue-500",
        "bg-red-500",
        "bg-gray-500",
        "bg-purple-500",
        "bg-green-500",
        "bg-yellow-500",
        "bg-pink-500",
      ];

      // Assign a random color class to each todo
      const todosWithColors = jsonData.todos.map((todo) => {
        const randomColorClass =
          colorClasses[Math.floor(Math.random() * colorClasses.length)];
        return { ...todo, color: randomColorClass };
      });

      setToDos(todosWithColors);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addToDo = async () => {
    const trimmedTodo = newTodo.trim();
    if (!trimmedTodo) return;

    const todoData = { todo: newTodo, color: selectedColor };
    try {
      const response = await fetch("http://localhost:8000/api/todos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoData),
      });
      if (!response.ok) throw new Error("Network response was not ok.");

      const jsonData = await response.json();
      setToDos((prevToDos) => [...prevToDos, jsonData]);
      setNewTodo("");
      setShowInput(false);
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
      }, 500);
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

    // Update local state
    setToDos(items);

    // Prepare the data for the backend (id and new order)
    const updatedOrder = items.map((todo, index) => ({
      id: todo.id,
      order: index,
    }));

    saveNewOrder(updatedOrder);
  };

  const saveNewOrder = async (updatedOrder) => {
    try {
      await fetch("http://localhost:8000/todos/reorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrder),
      });
      console.log("Order updated successfully");
    } catch (error) {
      console.error("Failed to update order", error);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="mt-8 mx-6 flex flex-col">
        <div className="flex justify-between mx-2 ">
          <div className="font-bold pb-2">
            To-Do's ({toDos.length ? toDos.length : "0"})
          </div>
          <button
            className="font-bold cursor-pointer"
            onClick={() => setShowInput(true)}
          >
            +
          </button>
        </div>

        {showInput && (
          <div className="flex items-center mx-2 pt-3 py-2 " ref={wrapperRef}>
            <div className="border border-[#8A8A8A] p-[6px] rounded-full mr-2 cursor-pointer relative " />
            <input
              type="text"
              className="bg-white border dark:bg-black rounded-[5px] w-full text-white text-sm p-1"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  addToDo();
                  setShowInput(true); // Hide the input after adding the todo
                }
              }}
              autoFocus
            />
            <div className="inline-block relative rounded-full mr-2 cursor-pointer">
              <div
                onClick={toggleDropdown}
                className="flex items-center justify-between"
              >
                <span
                  className={`p-2 ml-3 rounded-full`}
                  style={{
                    backgroundColor: colors.find(
                      (color) => color.value === selectedColor
                    )?.color,
                  }}
                ></span>
                <button className="ml-2">▼</button>
              </div>
              {isOpen && (
                <div className="absolute  bg-white dark:bg-black left-0 mr-3 rounded-md z-10">
                  <div className="p-2">
                    {colors.map((color) => (
                      <div
                        key={color.value}
                        className={`p-2 m-1 rounded-full cursor-pointer`}
                        style={{ backgroundColor: color.color }}
                        onClick={() => handleSelectColor(color.value)}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Droppable droppableId="todos">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="max-h-[89vh] overflow-y-auto ml-5 mr-2 pr-3"
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
                    className={`flex relative mb-2 border rounded-md ${
                      todo.deleting ? "todo-exiting" : ""
                    }`}
                  >
                    <div className="flex items-center mx-3 py-2 w-full">
                      <button
                        className="border border-[#8A8A8A] p-[6px] rounded-full mr-2 cursor-pointer relative hover-fill"
                        onClick={(event) => {
                          event.stopPropagation();
                          deleteToDo(todo.id);
                        }}
                      />
                      {editingId === todo.id ? (
                        <textarea
                        className="bg-white dark:bg-black rounded-[5px] text-black dark:text-white text-sm p-1 w-full"
                        style={{ minHeight: '38px', resize: 'none' }} 
                        value={todo.todo}
                        onChange={(e) => handleTodoChange(e, todo.id)}
                        onBlur={() => handleUpdateTodo(todo.id)}
                        onKeyPress={(e) => handleKeyPress(e, todo.id)}
                        autoFocus
                      />
                      
                      ) : (
                        <div
                          className="text-black dark:text-white text-sm font-normal cursor-text"
                          onDoubleClick={() => handleEditClick(todo.id)}
                        >
                          {todo.todo}
                        </div>
                      )}
                    </div>
                    <div
                      className={`absolute inset-y-0 right-0 w-[5px] rounded-r-xl ${todo.color}`}
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
