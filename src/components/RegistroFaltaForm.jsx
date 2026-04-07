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
    if (!alunoId) {
      setResumo(null);
      return;
    }
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

      const resumoAtualizado = await obterResumoAluno(alunoId);
      setResumo(resumoAtualizado);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>Registro de Faltas</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.campo}>
          <label>Aluno</label>
          <select
            value={alunoId}
            onChange={(e) => setAlunoId(e.target.value)}
            required
            style={styles.input}
          >
            <option value="">Selecione um aluno</option>
            {alunos.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nome}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.campo}>
          <label>Data</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.campo}>
          <label>Quantidade de Faltas</label>
          <input
            type="number"
            min={1}
            max={10}
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" disabled={carregando} style={styles.botao}>
          {carregando ? "Registrando..." : "Registrar Falta"}
        </button>
      </form>

      {mensagem && <p style={styles.sucesso}>{mensagem}</p>}
      {erro && <p style={styles.erroMsg}>{erro}</p>}

      {resumo && (
        <div style={styles.resumo}>
          <h3>Resumo de {resumo.nome}</h3>
          <p>
            Faltas nos últimos 7 dias:{" "}
            <strong style={{ color: resumo.limiteExcedido ? "red" : "green" }}>
              {resumo.totalFaltasUltimos7Dias}
            </strong>
          </p>
          {resumo.limiteExcedido && (
            <p style={styles.alerta}>
              Limite de faltas atingido! E-mail de alerta enviado para {resumo.email}.
            </p>
          )}

          {resumo.registros.length > 0 && (
            <table style={styles.tabela}>
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

const styles = {
  container: {
    maxWidth: 500,
    margin: "40px auto",
    fontFamily: "sans-serif",
    padding: "0 16px",
  },
  titulo: { marginBottom: 24 },
  form: { display: "flex", flexDirection: "column", gap: 16 },
  campo: { display: "flex", flexDirection: "column", gap: 4 },
  input: { padding: "8px 10px", fontSize: 14, borderRadius: 4, border: "1px solid #ccc" },
  botao: {
    padding: "10px 16px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 15,
  },
  sucesso: { color: "green", marginTop: 12 },
  erroMsg: { color: "red", marginTop: 12 },
  alerta: {
    background: "#fef2f2",
    border: "1px solid #fca5a5",
    padding: "8px 12px",
    borderRadius: 4,
    color: "#991b1b",
  },
  resumo: {
    marginTop: 24,
    padding: 16,
    background: "#f8fafc",
    borderRadius: 6,
    border: "1px solid #e2e8f0",
  },
  tabela: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 12,
    fontSize: 14,
  },
};
