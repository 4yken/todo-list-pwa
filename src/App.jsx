import { useReducer, useRef } from "react";
import './App.css'

function App() {
  const inputRef = useRef();

    const [tasks, dispatch] = useReducer((state = [], action) => {
        switch (action.type) {
            case 'add_task': {
                return [
                    ...state,
                    { id: state.length, title: action.title }
                ]
            }
            case 'remove_task': {
                return state.filter((task, index) => index != action.index);
            }
            default: {
                return state;
            }
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'add_task',
            title: inputRef.current.value
        });
        inputRef.current.value = '';
    }

  return (
    <>
    <h1 className="text-4xl font-bold text-zinc-800 mb-6 text-center">Lista de tareas</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
            <div className="mb-4">
              <label className=" text-zinc-700 text-lg font-semibold mb-3">Tarea</label>
              <input type="text" name="title" ref={inputRef} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
                    placeholder="Escribe una tarea..." />
            </div>
            <button type="submit" className="w-full bg-lime-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-400">
            Enviar
            </button>
        </form>
        <div className="tasks max-w-md mx-auto mt-6">
            {tasks && tasks.map((task, index) => (
                <div className="task flex items-center justify-between bg-gray-100 p-4 mb-2 rounded-md shadow-sm" key={index}>
                    <p className="text-gray-700">{task.title}</p>
                    <button onClick={() => dispatch({ type: 'remove_task', index })} className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
                        Borrar
                    </button>
                </div>
            ))}
        </div>
    </>
  )
}

export default App
