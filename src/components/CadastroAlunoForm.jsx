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
    <div style={styles.container}>
      <h2 style={styles.titulo}>Cadastrar Aluno</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.campo}>
          <label>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome completo"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.campo}>
          <label>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@escola.com"
            required
            style={styles.input}
          />
        </div>

        <button type="submit" disabled={carregando} style={styles.botao}>
          {carregando ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>

      {mensagem && <p style={styles.sucesso}>{mensagem}</p>}
      {erro && <p style={styles.erro}>{erro}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 500,
    margin: "40px auto 0",
    fontFamily: "sans-serif",
    padding: "0 16px",
  },
  titulo: { marginBottom: 24 },
  form: { display: "flex", flexDirection: "column", gap: 16 },
  campo: { display: "flex", flexDirection: "column", gap: 4 },
  input: { padding: "8px 10px", fontSize: 14, borderRadius: 4, border: "1px solid #ccc" },
  botao: {
    padding: "10px 16px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 15,
  },
  sucesso: { color: "green", marginTop: 12 },
  erro: { color: "red", marginTop: 12 },
};
