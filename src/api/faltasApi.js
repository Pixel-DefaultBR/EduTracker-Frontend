const BASE_URL = "http://localhost:5000/api/faltas";

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

export async function obterResumoAluno(alunoId) {
  const res = await fetch(`${BASE_URL}/alunos/${alunoId}/resumo`);
  if (!res.ok) throw new Error("Erro ao carregar resumo do aluno.");
  return res.json();
}
