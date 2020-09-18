import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {

  const [repository, setRepository] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data)
    })
  }, [])
  
  async function handleAddRepository() {
    await api.post('repositories', {
      url: "https://github.com/MVinicius43/",
      title: "Repository - Marcos Vinícius",
      techs: ["Java"]
    }).then(response => {
      setRepository([...repository, response.data])
    })
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    
    setRepository(repository.filter(repository => 
      repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map(item => 
          {return (
              <li key={item.id}>
                {item.title}
                <button onClick={() => handleRemoveRepository(item.id)}>
                  Remover
                </button>
              </li>
          )})}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
