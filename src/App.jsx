import { useState } from "react";
import CadastroAlunoForm from "./components/CadastroAlunoForm";
import ConfiguracaoForm from "./components/ConfiguracaoForm";
import RegistroFaltaForm from "./components/RegistroFaltaForm";

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div>
      <ConfiguracaoForm />
      <hr style={{ margin: "32px 16px", borderColor: "#e2e8f0" }} />
      <CadastroAlunoForm onAlunoAdicionado={() => setRefreshKey((k) => k + 1)} />
      <hr style={{ margin: "32px 16px", borderColor: "#e2e8f0" }} />
      <RegistroFaltaForm key={refreshKey} />
    </div>
  );
}
