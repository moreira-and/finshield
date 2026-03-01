import useSWR from "swr";

async function fetchApi(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DataBaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  let updatedAtText = "carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div> Última atualização: {updatedAtText}</div>;
}

function DataBaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  let payload = "carregando...";

  if (!isLoading && data) {
    payload = (
      <>
        <div>Versão: {data.dependences.database.version}</div>
        <div>
          Conexões abertas: {data.dependences.database.active_connections}
        </div>
        <div>Conexões máximas: {data.dependences.database.max_connections}</div>
      </>
    );
  }

  return (
    <div>
      <h2>Status do banco de dados</h2>
      <div> {payload}</div>
    </div>
  );
}
