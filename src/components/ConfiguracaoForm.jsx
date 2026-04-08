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
      setMensagem("Webhook salvo com sucesso!");
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="card">
      <div className="card-title">
        Configuração — Discord
      </div>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>URL do Webhook</label>
          <input
            type="url" value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="https://discord.com/api/webhooks/..." required
          />
        </div>

        <button type="submit" className="btn btn-discord" disabled={carregando}>
          <i className="fa-brands fa-discord" />
          {carregando ? "Salvando..." : "Salvar Webhook"}
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
