import { useEffect, useState } from "react";
import { listarAlunos, deletarAluno } from "../api/faltasApi";

export default function DeletarAlunoForm() {
  const [alunos, setAlunos]           = useState([]);
  const [alunoId, setAlunoId]         = useState("");
  const [confirmando, setConfirmando] = useState(false);
  const [mensagem, setMensagem]       = useState(null);
  const [erro, setErro]               = useState(null);
  const [carregando, setCarregando]   = useState(false);

  useEffect(() => {
    listarAlunos()
      .then(setAlunos)
      .catch(() => setErro("Não foi possível carregar a lista de alunos."));
  }, []);

  function handleSelecao(id) {
    setAlunoId(id);
    setConfirmando(false);
    setMensagem(null);
    setErro(null);
  }

  async function handleDeletar() {
    if (!confirmando) { setConfirmando(true); return; }

    setCarregando(true);
    setErro(null);
    try {
      await deletarAluno(Number(alunoId));
      const aluno = alunos.find((a) => a.id === Number(alunoId));
      setMensagem(`Aluno "${aluno?.nome}" removido com sucesso.`);
      setAlunos((prev) => prev.filter((a) => a.id !== Number(alunoId)));
      setAlunoId("");
      setConfirmando(false);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  const alunoSelecionado = alunos.find((a) => a.id === Number(alunoId));

  return (
    <div className="card">
      <div className="card-title">Deletar Aluno</div>

      <div className="field">
        <label>Aluno</label>
        <select value={alunoId} onChange={(e) => handleSelecao(e.target.value)}>
          <option value="">Selecione um aluno</option>
          {alunos.map((a) => (
            <option key={a.id} value={a.id}>{a.nome}</option>
          ))}
        </select>
      </div>

      {alunoSelecionado && (
        <div className="aluno-info">
          <span className="aluno-info-label">E-mail</span>
          <span className="aluno-info-value">{alunoSelecionado.email}</span>
        </div>
      )}

      <button
        className={`btn ${confirmando ? "btn-danger" : "btn-primary"}`}
        onClick={handleDeletar}
        disabled={!alunoId || carregando}
      >
        <lord-icon
          src={confirmando
            ? "https://cdn.lordicon.com/msetysan.json"
            : "https://cdn.lordicon.com/jmkrnisz.json"}
          trigger="in"
          colors={confirmando ? "primary:#ffffff" : "primary:#ffffff"}
          style={{width: "18px", height: "18px"}}
        ></lord-icon>
        {carregando ? "Deletando..." : confirmando ? "Confirmar exclusão" : "Deletar Aluno"}
      </button>

      {confirmando && (
        <p className="confirm-hint">Esta ação é irreversível. Clique novamente para confirmar.</p>
      )}

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
