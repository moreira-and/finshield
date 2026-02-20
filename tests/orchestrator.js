import retry from "async-retry";

async function fetchStatusPage() {
  const response = await fetch("http://localhost:3000/api/v1/status");
  if (!response.ok) {
    throw new Error(
      `Status page is not available. Status code: ${response.status}`,
    );
  }
  return response;
}

async function waitForWebServer() {
  return retry(fetchStatusPage, {
    retries: 100,
    minTimeout: 500,
    maxTimeout: 3000,
  });
}

async function waitForAllServices() {
  await waitForWebServer();
}

export default { waitForAllServices };
