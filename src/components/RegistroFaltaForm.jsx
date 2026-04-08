import { useEffect, useState } from "react";
import { listarAlunos, registrarFalta, obterResumoAluno } from "../api/faltasApi";

export default function RegistroFaltaForm() {
  const [alunos, setAlunos] = useState([]);
  const [alunoId, setAlunoId] = useState("");
  const [data, setData] = useState(() => new Date().toISOString().split("T")[0]);
  const [quantidade, setQuantidade] = useState(1);
  const [resumo, setResumo] = useState(null);
  const [mensagem, setMensagem] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    listarAlunos()
      .then(setAlunos)
      .catch(() => setErro("Não foi possível carregar a lista de alunos."));
  }, []);

  useEffect(() => {
    if (!alunoId) { setResumo(null); return; }
    obterResumoAluno(alunoId).then(setResumo).catch(() => setResumo(null));
  }, [alunoId]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(null);
    setMensagem(null);
    setCarregando(true);
    try {
      await registrarFalta(Number(alunoId), data, Number(quantidade));
      setMensagem("Falta registrada com sucesso!");
      const r = await obterResumoAluno(alunoId);
      setResumo(r);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="card">
      <div className="card-title">
        <i className="fa-solid fa-pen-to-square" />
        Registrar Falta
      </div>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Aluno</label>
          <select value={alunoId} onChange={(e) => setAlunoId(e.target.value)} required>
            <option value="">Selecione um aluno</option>
            {alunos.map((a) => (
              <option key={a.id} value={a.id}>{a.nome}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Data</label>
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />
        </div>

        <div className="field">
          <label>Quantidade de Faltas</label>
          <input
            type="number" min={1} max={10}
            value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={carregando}>
          <i className="fa-solid fa-check" />
          {carregando ? "Registrando..." : "Registrar Falta"}
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

      {resumo && (
        <div style={{ marginTop: 20 }}>
          <div className="resumo-stats">
            <div>
              <div className="resumo-label">Faltas — últimos 7 dias</div>
              <div className={`resumo-value ${resumo.limiteExcedido ? "danger" : "ok"}`}>
                {resumo.totalFaltasUltimos7Dias}
              </div>
            </div>
            {resumo.limiteExcedido && (
              <i className="fa-solid fa-triangle-exclamation" style={{ color: "var(--danger)", fontSize: 20 }} />
            )}
          </div>

          {resumo.limiteExcedido && (
            <div className="feedback warning">
              <i className="fa-brands fa-discord" /> Alerta enviado ao Discord para {resumo.nome}.
            </div>
          )}

          {resumo.registros.length > 0 && (
            <table className="tabela">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Faltas</th>
                </tr>
              </thead>
              <tbody>
                {resumo.registros.map((r, i) => (
                  <tr key={i}>
                    <td>{r.data}</td>
                    <td>{r.quantidadeFaltas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
