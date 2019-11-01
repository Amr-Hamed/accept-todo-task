const initialState = {
  todos: [],
  status: "All",
  filteredTodos: [],
  newTodo: {
    id: "",
    name: "",
    description: "",
    completed: false,
    createdAt: ""
  },
  selectedTodo: null,
  language : 'EN'
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_LANGUAGE': 
    console.log(action.payload)
      return{
        ...state,
        language : action.payload
      }
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case "REMOVE_TODO":
      let modifiedTodos = [...state.todos];
      modifiedTodos.splice(action.payload, 1);
      return {
        ...state,
        todos: modifiedTodos
      };
    case "SELECT_TODO":
      return {
        ...state,
        selectedTodo: state.todos[action.payload]
      };
    case "CHANGE_COMPLETED_STATUS":
      let newTodos = [...state.todos];
      newTodos[action.payload].completed = !newTodos[action.payload].completed;
      return {
        ...state,
        todos: newTodos
      };
    case "FILTER_TODOS":
      let todos = [...state.todos],
        nameFilteredTodos,
        timeFilteredTodos;
      if (action.payload) {
        nameFilteredTodos = todos.filter(todo =>
          todo.name.includes(action.payload)
        );
        timeFilteredTodos = todos.filter(todo =>
          todo.createdAt.includes(action.payload)
        );

        return {
          ...state,
          filteredTodos: [...nameFilteredTodos, ...timeFilteredTodos]
        };
      } else {
        return {
          ...state,
          filteredTodos: []
        };
      }
    case "SELECT_FILTER":
      switch (action.payload) {
        case "All":
          return {
            ...state,
            filteredTodos: state.todos
          };
        case "Completed":
          return {
            ...state,
            filteredTodos: state.todos.filter(todo => todo.completed)
          };
        case "Not Completed":
          return {
            ...state,
            filteredTodos: state.todos.filter(todo => !todo.completed)
          };
      }
  }
  return state;
};

export default rootReducer;
