const BASE_URL = `${import.meta.env.VITE_API_URL ?? "http://localhost:5000"}/api/faltas`;

export async function listarAlunos() {
  const res = await fetch(`${BASE_URL}/alunos`);
  if (!res.ok) throw new Error("Erro ao carregar alunos.");
  return res.json();
}

export async function registrarFalta(alunoId, data, quantidadeFaltas) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ alunoId, data, quantidadeFaltas }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.mensagem || "Erro ao registrar falta.");
  return json;
}

export async function criarAluno(nome, email) {
  const res = await fetch(`${BASE_URL}/alunos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.mensagem || "Erro ao criar aluno.");
  return json;
}

export async function obterResumoAluno(alunoId) {
  const res = await fetch(`${BASE_URL}/alunos/${alunoId}/resumo`);
  if (!res.ok) throw new Error("Erro ao carregar resumo do aluno.");
  return res.json();
}

export async function editarAluno(alunoId, nome, email) {
  const res = await fetch(`${BASE_URL}/alunos/${alunoId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.mensagem || "Erro ao editar aluno.");
  return json;
}

export async function deletarAluno(alunoId) {
  const res = await fetch(`${BASE_URL}/alunos/${alunoId}`, { method: "DELETE" });
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.mensagem || "Erro ao deletar aluno.");
  }
}

export async function deletarRegistroFalta(registroId) {
  const res = await fetch(`${BASE_URL}/${registroId}`, { method: "DELETE" });
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.mensagem || "Erro ao deletar registro de falta.");
  }
}
