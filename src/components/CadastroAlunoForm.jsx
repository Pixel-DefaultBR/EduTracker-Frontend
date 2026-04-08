import { useState } from "react";
import { criarAluno } from "../api/faltasApi";

export default function CadastroAlunoForm({ onAlunoAdicionado }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(null);
    setMensagem(null);
    setCarregando(true);
    try {
      const aluno = await criarAluno(nome, email);
      setMensagem(`Aluno "${aluno.nome}" cadastrado com sucesso!`);
      setNome("");
      setEmail("");
      if (onAlunoAdicionado) onAlunoAdicionado(aluno);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="card">
      <div className="card-title">
        Cadastrar Aluno
      </div>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Nome</label>
          <input
            type="text" value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome completo" required
          />
        </div>

        <div className="field">
          <label>E-mail</label>
          <input
            type="email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@escola.com" required
          />
        </div>

        <button type="submit" className="btn btn-success" disabled={carregando}>
          <i className="fa-solid fa-user-check" />
          {carregando ? "Cadastrando..." : "Cadastrar Aluno"}
        </button>
      </form>

      {mensagem && (
        <div className="feedback success">
          <i className="fa-solid fa-circle-check" /> {mensagem}
        </div>
      )}
      {erro && (
        <div className="feedback error">
          <i className="fa-solid fa-circle-xmark" /> {erro}
        </div>
      )}
    </div>
  );
}
