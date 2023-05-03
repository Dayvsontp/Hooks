import React, { useState, useEffect, useMemo, useCallback} from "react";

function App() {

  const [tarefas, setTarefas] = useState([            // useState uma forma melhor(API) de se utilizar states, neste caso passando entre colchetes a variavel que recebe a state e depois da virgula a state que recebe a atualizacao
]);                                                   // API Hooks criado menos verbalizar os codigos

  const [input, setInput] = useState();

 

  useEffect(() => {                                           // useEffect veio pra substituir os ciclos de vida (componetDidMount)  Este é o método que é executado depois que o componente foi montado no DOM
    const tarefaStorage = localStorage.getItem('tarefas');    // Toda vez que a state ('tarefas') sofrer alteracao o useEffect vai agir

    if (tarefaStorage){
      setTarefas(JSON.parse(tarefaStorage));                  // quando a state sofre alteracao e o useEffect for chamado vai realizar a acao de converter em JSON
    }
  }, [])


  useEffect(() => {                                            // Esse useEffect
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);


    const [contador, setContador] = useState(0);  

  const handleAdd = useCallback(() => {
    setTarefas([...tarefas, input]);
    setInput('');
  }, [tarefas, input]);

  const totalTarefas = useMemo(() => tarefas.length, [tarefas])           // useMemo utilizamos para evitar calculos/carregamentos no back desnecessarios, com isso cria-se uma varivel para receber a funcao
                                                                          


  return (
    <div>
      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa}> {tarefa} </li>

        ))}
       
        <input type='text' value={input} onChange={(e) => setInput(e.target.value)}/>  
        <button type='button' onClick={handleAdd}>Adicionar</button>

      </ul>
      <br/>
          <strong>Voce tem {totalTarefas} tarefas</strong> <br/>                    
          <div>
          <button type='button' onClick={() => setContador(contador+1)}>+</button>
          <h3>{contador}</h3>
          <button type='button' onClick={() => setContador(contador-1)}>-</button>
          </div>
      
    </div>
  );
}

export default App;
