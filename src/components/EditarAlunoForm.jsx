import { useEffect, useState } from "react";
import { listarAlunos, editarAluno } from "../api/faltasApi";

export default function EditarAlunoForm() {
  const [alunos, setAlunos]     = useState([]);
  const [alunoId, setAlunoId]   = useState("");
  const [nome, setNome]         = useState("");
  const [email, setEmail]       = useState("");
  const [mensagem, setMensagem] = useState(null);
  const [erro, setErro]         = useState(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    listarAlunos()
      .then(setAlunos)
      .catch(() => setErro("Não foi possível carregar a lista de alunos."));
  }, []);

  function handleSelecao(id) {
    setAlunoId(id);
    setMensagem(null);
    setErro(null);
    const aluno = alunos.find((a) => a.id === Number(id));
    setNome(aluno?.nome ?? "");
    setEmail(aluno?.email ?? "");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(null);
    setMensagem(null);
    setCarregando(true);
    try {
      const atualizado = await editarAluno(Number(alunoId), nome, email);
      setAlunos((prev) => prev.map((a) => a.id === atualizado.id ? atualizado : a));
      setMensagem("Aluno atualizado com sucesso!");
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="card">
      <div className="field">
        <label>Aluno</label>
        <select value={alunoId} onChange={(e) => handleSelecao(e.target.value)} required>
          <option value="">Selecione um aluno</option>
          {alunos.map((a) => (
            <option key={a.id} value={a.id}>{a.nome}</option>
          ))}
        </select>
      </div>

      {alunoId && (
        <form onSubmit={handleSubmit} style={{animation: "fadeSlideDown 0.2s ease both"}}>
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

          <button type="submit" className="btn btn-primary" disabled={carregando}>
            <lord-icon
              src="https://cdn.lordicon.com/yqiambns.json"
              trigger="hover"
              target=".btn"
              colors="primary:#ffffff"
              style={{width: "18px", height: "18px"}}
            ></lord-icon>
            {carregando ? "Salvando..." : "Salvar Alterações"}
          </button>
        </form>
      )}

      {mensagem && (
        <div className="feedback success">
          <lord-icon src="https://cdn.lordicon.com/jecyvwok.json" trigger="in" colors="primary:#16A34A" style={{width: "18px", height: "18px"}}></lord-icon>
          {mensagem}
        </div>
      )}
      {erro && (
        <div className="feedback error">
          <lord-icon src="https://cdn.lordicon.com/nqtddedc.json" trigger="in" colors="primary:#EF4444" style={{width: "18px", height: "18px"}}></lord-icon>
          {erro}
        </div>
      )}
    </div>
  );
}
