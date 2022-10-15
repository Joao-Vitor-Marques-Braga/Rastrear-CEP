import {  useState  } from 'react'
import {  FiSearch  } from 'react-icons/fi';
import './style.css'
import api from './services/api'

function App() {

  const[input, setImput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){
    if(input === ''){
      alert("Campo não preenchido, por favor preencha com um CEP verdadeiro")
      return;
    }try{
        const response = await api.get(`${input}/json`);
        setCep(response.data)
        setImput("")
    }catch{
      alert('Erro ao buscar')
      setImput("")
    }
  }

  return(
    <div className="container">
        <h1 className='title'>Buscador CEP</h1>

        <div className='containerInput'>
          <input
            type='text'
            placeholder='Digite seu CEP...'
            value={input}
            onChange={(e) => setImput(e.target.value)}
            >
          </input>

          <button className="buttonSearch" onClick={handleSearch}>
            <FiSearch size={25} color="#fff"/>
          </button>
        </div>

        {Object.keys(cep).length > 0 && (
          <main className='main'>
            <h2> CEP: {cep.cep}</h2>
            <span>{cep.logradouro}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>Cidade: {cep.localidade} - {cep.uf}</span>
          </main>
        )}
      </div>
  );
}

export default App;
