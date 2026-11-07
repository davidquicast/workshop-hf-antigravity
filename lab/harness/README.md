# Runners seleccionados

Consulta [la guía de reproducción](../../docs/REPRODUCIR.md) antes de iniciar un ensayo.

- `exp_da.py`: comparación de notas para recomendar un paquete ficticio.
- `behavior_runner.py`: cambios de formato, contenido y canarios benignos de acciones.
- `exp_capture_skill.py`: Skill colocada localmente y herramienta MCP de un Space propio.
- `exp_capture_live.py`: utilidades y contraste con la descripción de herramienta.
- `live_runner.py`: solo constantes compartidas; el runner antiguo de pósters se omite.

No se incluyen campañas ajenas al recorrido ni scripts que borren/recreen repositorios.
La ejecución requiere `DEVFEST_LAB_EXECUTE=1`; `--help` y `--dry` no ejecutan campañas.
Para consultar los resultados existentes, usa `python scripts/analyze_results.py`.
