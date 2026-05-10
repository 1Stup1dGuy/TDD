import './styles.css';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Missing #app element');
}

app.innerHTML = `
  <main class="shell">
    <section class="panel">
      <p class="eyebrow">Prototype scaffold ready</p>
      <h1>Dicebound Galaxy</h1>
      <p>
        Codex should replace this scaffold with the complete playable space dice RPG MVP described in issue #1 and AGENTS.md.
      </p>
      <button type="button">Awaiting Launch</button>
    </section>
  </main>
`;
