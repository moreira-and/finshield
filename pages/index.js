export default function Home() {
  return (
    <main className="wrapper">
      <div className="content">
        <h1>Site em construção...</h1>
        <p>Estamos preparando algo novo. Em breve.</p>
      </div>

      <style jsx>{`
        .wrapper {
          min-height: 100vh;
          display: grid;
          place-items: center;
          background: #0f172a;
          color: #e5e7eb;
          font-family:
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
        }

        .content {
          text-align: center;
        }

        h1 {
          font-size: 2rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
        }

        p {
          font-size: 1rem;
          color: #94a3b8;
        }
      `}</style>
    </main>
  );
}
