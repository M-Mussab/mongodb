'use client';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [data, setData] = useState<
    { name: string; description: string; _id: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const resp = await fetch('/api/data');
      const data = await resp.json();
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const addData = async () => {
    try {
      const resp = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'New Item',
          description: 'New Description',
        }),
      });
      const newData = await resp.json();
      setData([...data, newData]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <header className="py-5 bg-blue-800 text-center">
        <h1 className="text-3xl font-bold">API and MongoDB Practice App</h1>
        <p className="text-lg mt-2">Experiment with APIs and Databases</p>
        <button
          onClick={addData}
          className="bg-white text-black p-2 mt-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Add Data
        </button>
      </header>

      <main className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Data from MongoDB</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((item, index) => (
              <li
                key={item._id}
                className="bg-white text-black p-4 rounded shadow-lg"
              >
                <h3 className="font-bold">{item.name}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        )}
      </main>

      <footer className="py-4 bg-blue-800 text-center">
        <p>© 2024 Practice App</p>
      </footer>
    </div>
  );
}
