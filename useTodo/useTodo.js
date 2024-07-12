import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-use-reducer/todoReducer";

let todosCount;
let pendingTodosCount;

const init = () => {
    return JSON.parse( localStorage.getItem( 'todos')) || [];
}

export const useTodo = () => {

    const [ todos, dispatch ] = useReducer( todoReducer, [], init );

    useEffect(() => {
      localStorage.setItem( 'todos', JSON.stringify( todos ));
   }, [ todos ]);

//    useEffect(() => {
//       todosCount = todos.length;
//    }, [ todos ])

//    useEffect(() => {
//     pendingTodosCount = todos.map( todo => !todo.done ).length;
//     console.log(pendingTodosCount)
//  }, [ todos ])
   

    const handleDeleteTodo = ( id ) => {
        const action = {
          type: '[TODO] Delete Todo',
          payload: id
        };
        dispatch( action );
      }
    
      const handleToogleTodo = ( id ) => {
        const action = {
          type: '[TODO] change',
          payload: id
        };
        dispatch( action );
      }

      const handleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        dispatch( action );
    }

  return {
    todos,
    handleDeleteTodo,
    handleToogleTodo,
    handleNewTodo,
    todosCount: todos.length,
    pendingTodosCount: todos.filter( todo => !todo.done ).length
  }
}
