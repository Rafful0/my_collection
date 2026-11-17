import { useState, useEffect } from 'react';
import './App.css';

const API = "http://127.0.0.1:8000/api/jogos/";

function App() {
  const [jogos, setJogos] = useState([]);
  const [resumo, setResumo] = useState({total: 0, media_avaliacao: 0, melhor: null})
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [ano, setAno] = useState(""); 
  const [avaliacao, setAvaliacao] = useState("");
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");

  const jogosFiltrados = jogos.filter(j =>
    j.nome.toLowerCase().includes(busca.toLowerCase())
  );

  function carregarJogos() {
    fetch(API)
      .then(res => res.json())
      .then(dados => setJogos(dados));
  }

  function carregarResumo() {
    fetch(API + "resumo/")
      .then(res => res.json())
      .then(dados => setResumo(dados));
  }

  useEffect(() => {
    carregarJogos();
    carregarResumo();
  }, []);

  function cadastrar(evento) {
    evento.preventDefault();
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, genero, ano: Number(ano), avaliacao: Number(avaliacao) }),
    })
      .then(res => res.json().then(dados => ({ok: res.ok, dados})))
      .then(({ok, dados}) => {

      if (!ok) {
        setErro(dados.erro);
        return;
      }

      setErro("");

      setNome("");
      setGenero("");
      setAno("");
      setAvaliacao("");
      carregarJogos();
      carregarResumo();
    })
    .catch(() => setErro("Não foi possível falar com o servidor"));
  }

  return (
    <div className="pagina">
      <h1>Cadastro de Jogos</h1>

      <header className="resumo">
        <p>Total: {resumo.total}</p>
        <p>Média: {resumo.media_avaliacao}</p>
        <p>Melhor: {resumo.melhor ?? "—"}</p>
      </header>

      <form onSubmit={cadastrar}>
        <input
          placeholder='Nome'
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <input
          placeholder='Genero'
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          required
        />

        <input
          type='number'
          placeholder='Ano'
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          required
        />

        <input
          type='number'
          step='any'
          placeholder='Avaliação'
          value={avaliacao}
          onChange={(e) => setAvaliacao(e.target.value)}
          required
        />
        <button type='submit'>Cadastrar</button>
      </form>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <input
        value={busca}
        onChange={e => setBusca(e.target.value)}
        placeholder="Buscar por nome"
      />

      {jogosFiltrados.length === 0 ? (
        <p>Nenhum item encontrado</p>
      ) : (
        <ul>
          {jogosFiltrados.map(j => (
            <li key={j.id}>{j.nome} — {j.genero} ({j.ano}) — {j.avaliacao}</li>
          ))}
        </ul>
      )}

    </div>
  )
}

export default App
