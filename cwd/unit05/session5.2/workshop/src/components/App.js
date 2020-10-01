import React, {useState, useEffect} from 'react';
import './App.css';
import FindPokemon from './FindPokemon'
import Pokemon from './Pokemon'
import SearchHistory from './SearchHistory'
import eevee from '../eevee.json'

import { uniq } from 'lodash'

const API_URL = "https://pokeapi.co/api/v2/pokemon"
 

  function App (props) {


  const [query, setQuery] = useState('');
  const [history, setHistory] = useState(['charizard', 'vaporeon', 'bulbasaur'])
  const [activePokemon, setActivePokemon] = useState(eevee);

  useEffect(() => {
    fetch(`${API_URL}/${query}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setHistory(activePokemon.name)
      setActivePokemon(data);
      // setActivePokemon(eevee)
    })
  })

    return <div className="App">
      <header className="App-header">
        <p>Find your own Pokemon now!</p>
        <div className="search">
          <FindPokemon value={query} onChange={(e) => setQuery(e.target.value)} />
          <SearchHistory
            onClick={(historical) => {setActivePokemon(historical)}}
            history={history}/>
        </div>
      </header>
      <Pokemon pokemon={activePokemon} />
    </div>
}

export default App;
