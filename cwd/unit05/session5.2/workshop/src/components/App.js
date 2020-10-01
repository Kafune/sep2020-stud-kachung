import React, {useState, useEffect} from 'react';
import './App.css';
import FindPokemon from './FindPokemon'
import Pokemon from './Pokemon'
import SearchHistory from './SearchHistory'
import eevee from '../eevee.json'

import { uniq } from 'lodash'

const API_URL = "https://pokeapi.co/api/v2/pokemon"

  // function searchPokemon (query) {
  //   this.setState({query: query})
  //   fetch(`${API_URL}/${query}`)
  //   .then(response => response.json())
  //   .then(data => {
  //     this.setState({
  //       activePokemon: data,
  //       history: uniq(this.state.history.concat(query))
  //     })
  //   })
  // }

function App (props) {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     query: '',
  //     history: ['charizard', 'vaporeon', 'bulbasaur'],
  //     activePokemon: eevee
  //   }
  // }

  const [query, setQuery] = useState("");
  const [history, setHistory] = useState(['charizard', 'vaporeon', 'bulbasaur'])
  const [activePokemon, setActivePokemon] = useState(eevee);


  // render () {
    console.log(activePokemon)
    return <div className="App">
      <header className="App-header">
        <p>Find your own Pokemon now!</p>
        <div className="search">
          <FindPokemon value={query} onChange={(e) => setQuery(e.target.value)} />
          <SearchHistory
            onClick={() => {setHistory(activePokemon)}}
            history={history}/>
        </div>
      </header>
      <Pokemon pokemon={activePokemon} />
    </div>
  // }
}

export default App;
