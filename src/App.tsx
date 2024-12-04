import React, { useState, useEffect } from 'react';

interface Advice {
  slip: {
    id: number;
    advice: string;
  };
}

interface SavedAdvice {
  id: number;
  advice: string;
  date: string;
}

const App = () => {
  const [advice, setAdvice] = useState<Advice | null>(null);
  const [savedAdvices, setSavedAdvices] = useState<SavedAdvice[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAdvice();
  }, []);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json();
      setAdvice(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveAdvice = () => {
    if (advice) {
      const newAdvice: SavedAdvice = {
        id: advice.slip.id,
        advice: advice.slip.advice,
        date: new Date().toLocaleString(),
      };
      setSavedAdvices([...savedAdvices, newAdvice]);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
      <h1 className="text-3xl text-gray-900 leading-tight">Consejos Aleatorios</h1>
      <div className="my-6">
        {loading ? (
          <p className="text-gray-600">Cargando...</p>
        ) : advice ? (
          <p className="text-gray-600">{advice.slip.advice}</p>
        ) : (
          <p className="text-gray-600">No hay consejos disponibles</p>
        )}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={fetchAdvice}
      >
        Consejo Aleatorio
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
        onClick={saveAdvice}
      >
        Guardar Consejo
      </button>
      <h2 className="text-2xl text-gray-900 leading-tight mt-6">Consejos Guardados</h2>
      <ul className="list-none">
        {savedAdvices.map((advice) => (
          <li key={advice.id} className="py-2">
            <p className="text-gray-600">{advice.advice}</p>
            <p className="text-gray-600 text-sm">{advice.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;