import { useReducer, useRef, useEffect, useState } from "react";
import './App.css';

function App() {
    const inputRef = useRef();
    const [tasks, dispatch] = useReducer((state = [], action) => {
        switch (action.type) {
            case 'add_task':
                return [
                    ...state,
                    { id: state.length, title: action.title }
                ];
            case 'remove_task':
                return state.filter((task, index) => index !== action.index);
            default:
                return state;
        }
    });

    const [showInstallPrompt, setShowInstallPrompt] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        // Capturar el evento 'beforeinstallprompt'
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault(); // Prevenir la alerta automática del navegador
            setDeferredPrompt(e); // Guardar el evento para más tarde
            setShowInstallPrompt(true); // Mostrar la alerta personalizada
        });
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt(); // Mostrar la ventana de instalación
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('El usuario aceptó instalar la PWA');
                } else {
                    console.log('El usuario rechazó la instalación');
                }
                setDeferredPrompt(null); // Limpiar el evento
                setShowInstallPrompt(false); // Ocultar la alerta
            });
        }
    };

    const handleAlertResponse = (response) => {
        if (response) {
            handleInstallClick(); // Si el usuario aceptó, iniciar la instalación
        } else {
            console.log('El usuario rechazó la instalación de la PWA.');
            setShowInstallPrompt(false); // Cerrar la alerta
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'add_task',
            title: inputRef.current.value
        });
        inputRef.current.value = '';
    };

    return (
        <>
            <h1 className="text-4xl font-bold text-zinc-800 mb-6 text-center">Lista de tareas</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
                <div className="mb-4">
                    <label className="text-zinc-700 text-lg font-semibold mb-3">Tarea</label>
                    <input
                        type="text"
                        name="title"
                        ref={inputRef}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
                        placeholder="Escribe una tarea..."
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-lime-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-400"
                >
                    Enviar
                </button>
            </form>

            <div className="tasks max-w-md mx-auto mt-6">
                {tasks && tasks.map((task, index) => (
                    <div
                        className="task flex items-center justify-between bg-gray-100 p-4 mb-2 rounded-md shadow-sm"
                        key={index}
                    >
                        <p className="text-gray-700">{task.title}</p>
                        <button
                            onClick={() => dispatch({ type: 'remove_task', index })}
                            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                            Borrar
                        </button>
                    </div>
                ))}
            </div>

            {showInstallPrompt && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
                    <div className="alert p-4 bg-white border rounded shadow-lg">
                        <p>¿Quieres instalar la PWA?</p>
                        <div className="flex justify-center space-x-4 mt-4">
                            <button
                                onClick={() => handleAlertResponse(true)}
                                className="bg-lime-500 text-white px-4 py-2 rounded-md"
                            >
                                Aceptar
                            </button>
                            <button
                                onClick={() => handleAlertResponse(false)}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </>
    );
}

export default App;
