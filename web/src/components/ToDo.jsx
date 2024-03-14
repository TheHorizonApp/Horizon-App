"use client";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import React, { useEffect, useState } from "react";

const toDo = () => {
  const [toDos, setToDos] = useState([
    {
      id: "1",
      title: "Hello world this is nice wow this is a long title",
      color: "bg-blue-500",
    },
    {
      id: "2",
      title: "Complete the project",
      color: "bg-violet-500",
    },
    { id: "3", title: "Leetcode", color: "bg-red-500" },
  ]);  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:8080/api/todos");
        const jsonData = await response.json();
        setToDos(jsonData);
        setSize(jsonData.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //TODO: Add a new toDo base code
  const addToDo = async () => {
    try {
      const response = await fetch("https://localhost:8080/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: "New Task" }),
      });
      const jsonData = await response.json();
      setToDos([...toDos, jsonData]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  //TODO: Delete a toDo base code
  const deleteToDO = async (id) => {
    try {
      await fetch(`https://localhost:8080/api/todos/${id}`, {
        method: "DELETE",
      });
      setToDos((currentToDos) => currentToDos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <>
      <div className="flex justify-between pb-2">
        <div className="font-bold">
          To-Do's ({toDos.length ? toDos.length : 0})
        </div>
        <div className="font-bold cursor-pointer" onClick={addToDo}>
          +
        </div>
      </div>
      {/* This is what gonna get mapped for a fetch */}
      <div>
        <TransitionGroup>
          {toDos.length > 0 ? (
            toDos.map((todo) => (
              <CSSTransition
              key={todo.id}
              timeout={500}
              classNames="todo"
            >
              <div className="bg-[#323232] rounded-[5px] w-full flex relative mb-2">
                <div className="flex items-center mx-3 py-2">
                  <div
                    className="border p-[6px] rounded-full mr-2 cursor-pointer relative hover-fill"
                    onClick={() => deleteToDO(todo.id)}
                  />
                  <div className="text-white text-sm font-normal">
                    {todo.title}
                  </div>
                </div>
                <div className={`absolute inset-y-0 right-0 w-[4px] ${todo.color}`}></div>
              </div>
            </CSSTransition>
            ))
          ) : (
            <p className="text-center">No more tasks</p>
          )}
        </TransitionGroup>
      </div>
    </>
  );
};

export default toDo;
