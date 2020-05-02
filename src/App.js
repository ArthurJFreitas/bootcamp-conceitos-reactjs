/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';

import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title,
      owner: 'Arthur Junio',
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    if (response.status === 204) {
      setRepositories(repositories.filter((repo) => repo.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            <h4>
              { repo.title }
            </h4>
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <input onChange={(e) => setTitle(e.target.value)} style={{ height: 36, margin: 10 }} />
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
