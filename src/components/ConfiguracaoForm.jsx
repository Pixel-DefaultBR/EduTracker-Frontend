import { useEffect, useState } from "react";

const BASE_URL = `${import.meta.env.VITE_API_URL ?? "http://localhost:5000"}/api/configuracao`;

export default function ConfiguracaoForm() {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [mensagem, setMensagem] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    fetch(BASE_URL)
      .then((r) => r.json())
      .then((data) => setWebhookUrl(data.discordWebhookUrl ?? ""))
      .catch(() => {});
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(null);
    setMensagem(null);
    setCarregando(true);

    try {
      const res = await fetch(`${BASE_URL}/webhook`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: webhookUrl }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.mensagem || "Erro ao salvar.");
      setMensagem("Webhook do Discord salvo com sucesso!");
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>Configuração — Discord</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.campo}>
          <label>URL do Webhook</label>
          <input
            type="url"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="https://discord.com/api/webhooks/..."
            required
            style={styles.input}
          />
        </div>

        <button type="submit" disabled={carregando} style={styles.botao}>
          {carregando ? "Salvando..." : "Salvar Webhook"}
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
    background: "#5865F2",
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 15,
  },
  sucesso: { color: "green", marginTop: 12 },
  erro: { color: "red", marginTop: 12 },
};
