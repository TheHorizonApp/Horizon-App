import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ToDoLoadingSkeleton = ({ numToDos }) => {
  // Generate dummy to-dos for the loading skeleton
  const skeletonToDos = Array.from({ length: numToDos }, (_, index) => ({
    id: index.toString(),
    color: "bg-gray-400",
  }));

  return (
    <>
      <div>
        <TransitionGroup>
          {skeletonToDos.map((todo, index) => (
            <CSSTransition
              key={todo.id}
              timeout={500}
              classNames="todo"
              delay={index * 200}
            >
              <div
                className="relative mb-2 animate-pulse"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="bg-[#323232] rounded-[5px] w-full flex">
                  <div className="flex items-center mx-3 py-2">
                    <div className="border p-[6px] rounded-full mr-2 bg-gray-300" />
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 w-[4px] bg-gray-400" />
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </>
  );
};

export default ToDoLoadingSkeleton;
