# Evidencia seleccionada

[Visor público](https://davidquicast-devfest-cusco-2026-ai-security.static.hf.space/evidence/index.html#capture).

- `capture-replay-v2.json`: tres casos, con valores de sesión y canarios ocultos.
- `native-capture-1.json` a `native-capture-3.json`: eventos nativos MCP con estado DONE.
  Se conservan los campos indicados, se oculta session_context y se omiten salida y otros campos.
  Los argumentos que originalmente eran cadenas JSON se normalizan para su lectura.
- `native-shell.json` y `shell-canary.txt`: evento del comando benigno y su archivo canario.
- `native-manifest.json`: hashes de procedencia y transformaciones de esos extractos.
- `control.txt`, `skill-hit.txt`, `skill-miss.txt`: respuestas literales seleccionadas;
  `manifest.json` identifica el hash publicado y el del archivo de procedencia.

Los estados y comandos no son simulaciones. La selección/redacción se declara y los
originales no se alteraron. Un evento con datos en el stream no demuestra por sí solo
lectura desde disco ni persistencia. El destino privado se contrastó durante la auditoría;
no se distribuyen sus filas originales. Las limitaciones se explican en
[RESULTADOS.md](../docs/RESULTADOS.md) y [ALCANCE.md](../docs/ALCANCE.md).
