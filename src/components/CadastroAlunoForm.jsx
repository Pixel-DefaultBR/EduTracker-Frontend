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
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Nome Completo</label>
          <input
            type="text" value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome completo do Aluno: (e.g., Victor Hugo dos Santos)" required
          />
        </div>

        <div className="field">
          <label>E-mail do Responsável</label>
          <input
            type="email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail do Responsável: (e.g., responsavel@escola.com)" required
          />
        </div>

        <button type="submit" className="btn btn-success" disabled={carregando}>
          <lord-icon
            src="https://cdn.lordicon.com/dqxvvqzi.json"
            trigger="hover"
            target=".btn"
            colors="primary:#ffffff"
            style={{width: "18px", height: "18px"}}
          ></lord-icon>
          {carregando ? "Cadastrando..." : "Cadastrar Aluno"}
        </button>
      </form>

      {mensagem && (
        <div className="feedback success">
          <lord-icon
            src="https://cdn.lordicon.com/jecyvwok.json"
            trigger="in"
            colors="primary:#16A34A"
            style={{width: "18px", height: "18px"}}
          ></lord-icon>
          {mensagem}
        </div>
      )}
      {erro && (
        <div className="feedback error">
          <lord-icon
            src="https://cdn.lordicon.com/nqtddedc.json"
            trigger="in"
            colors="primary:#EF4444"
            style={{width: "18px", height: "18px"}}
          ></lord-icon>
          {erro}
        </div>
      )}
    </div>
  );
}
