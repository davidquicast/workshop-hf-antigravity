# Cómo comprobar y reproducir partes del workshop

## Recalcular las tablas publicadas

Python 3.10 o posterior; no requiere instalar dependencias:

```bash
python scripts/analyze_results.py
```

Se comprueban por separado recomendaciones, órdenes explícitas, formato entre turnos,
acciones, captura y transporte MCP. La procedencia y las transformaciones de los archivos
están en `SOURCE_EXPORT.json`.

En los CSV históricos `t1_ts` se reutilizó para métricas diferentes según el payload.
Los CSV públicos distinguen esas medidas. Para formato se conserva el detector de fecha/hora;
para acciones se separan propuestas y ejecuciones. El campo textual `tool_called` original
no demuestra una llamada MCP completada; `mcp-transport.csv` recoge la auditoría de eventos nativos.

Las filas de captura incorporan el contraste del destino realizado durante la auditoría.
Ese destino es privado: puedes recalcular los conteos publicados, pero no inspeccionar
sus filas originales desde este repositorio. Un hash identifica un artefacto; no sustituye su contenido.

## Ejecutar la presentación local

Node.js 18 o posterior y Python 3.10 o posterior:

```bash
npm ci --prefix slides
npm run build --prefix slides
npm run dev --prefix slides
```

Abrir http://localhost:4173/ . Español/English se elige en las opciones. Flechas o espacio
cambian de página; F activa pantalla completa y N muestra notas en español.
En Windows puede iniciarse el servidor con `py slides/scripts/serve.py`.

Los componentes de rutas antiguas se han retirado de esta copia pública. La narrativa,
los diagramas y las cifras de las 22 páginas son los de la presentación publicada.

La exportación es opcional, no forma parte del build:

```bash
npm run export --prefix slides
npm run export:en --prefix slides
```

Requiere Chrome/Chromium/Brave y `BROWSER_PATH` apuntando a su ejecutable si no está
instalado Brave en la ruta Linux usada por el laboratorio. El PPTX es una copia visual
con imágenes, notas e hipervínculos; los diagramas editables están en las fuentes React/SVG.
La ejecución física en Windows no se validó durante esta publicación.

## Probar el generador sin inferencia real

```bash
python -m venv .venv
# Activar el entorno según el sistema operativo.
python -m pip install -r requirements.txt
python -m unittest discover -s lab/space -p test_app.py -v
```

Las pruebas cubren botón/Enter, validación, errores y filtro de captura con dobles de
inferencia y almacenamiento. No son mediciones de susceptibilidad de un modelo.

Para un servidor local benigno, configurar un token propio de inferencia y ejecutar
`python lab/space/app.py`. El modo por defecto es `VARIANTE=off` y `CAPTURE_GATE=on`.
La interfaz humana no necesita `session_context` ni registra un perfil.

## Repetir un ensayo con Antigravity

Los runners seleccionados proceden del laboratorio Linux. Requieren el CLI real de
Antigravity y una cuenta con un modelo disponible. No se incluyen binarios del agente
ni se garantiza que nombres de modelos o contratos externos permanezcan iguales.

Usa un usuario/perfil de prueba, archivos sintéticos y, para captura, un Space y un
dataset privado propios. Los runners crean workspaces de ensayo; los de MCP también
registran conexiones en el perfil del CLI. No se usan voluntarios ni proyectos personales.

El comando por defecto se niega a iniciar campañas. `--help` y `--dry` permiten consultar
parámetros o ver payloads sin consumir inferencia:

```bash
python -m lab.harness.exp_da --dry
python -m lab.harness.behavior_runner --help
python -m lab.harness.exp_capture_skill --help
```

Para una ejecución deliberada, definir `DEVFEST_LAB_EXECUTE=1` y `AGY_BIN` con el CLI de
prueba. Las opciones `--model`, `--n`/`--trials`, `--repo` y `--dataset` deben apuntar a
recursos de tu entorno. Los ejemplos no deben ejecutarse contra el dataset histórico del workshop.

- `behavior_runner`: formato, contenido y canarios de acciones. `--wrap real` usa el
  builder instalado de hf-discover, cuyo intérprete se configura con `HF_DISCOVER_PYTHON`.
  Necesita que `from discover.hf_spaces import build_space_skill_markdown` funcione allí.
  `--wrap ideal` utiliza una preparación distinta; no es un sustituto de esa condición.
- `exp_da`: compara notas documentales para recomendar un paquete ficticio. No lo instala. `devfest-helper` es un marcador: no debes instalarlo.
- `exp_capture_skill`: conecta la herramienta de tu Space y coloca **localmente** la Skill.
  Instalar la Skill mediante el script no demuestra su entrega por ARD desde Hugging Face.

No se distribuye la extensión de descubrimiento de terceros ni se simula su instalación.
Una alternativa con otra versión del builder o con otra entrega debe registrarse como
otra condición. Los resultados no son una promesa de reproducir los porcentajes exactos.

## Diferencias de esta edición pública

- Valores de fixtures de futuras pruebas: Ana, dominio reservado `.invalid`, cuenta ficticia
  y coordenadas de prueba. No son nuevas filas de resultados históricos.
- Rutas del CLI/builder configurables por entorno.
- Lectura de `HF_TOKEN` desde el entorno o un `.env` propio, nunca distribuido.
- El contador de futuras pruebas consulta `sesiones.csv`; el runner histórico consultaba
  otro nombre. La auditoría histórica se basó en el destino independiente, no en aquel contador.
- Ayudante de rutas reducido y activación expresa; se omiten deploys destructivos,
  prototipos, configuraciones privadas y campañas ajenas al recorrido publicado.

Versiones anteriores y actuales del generador pueden consultarse en el historial público
de su Space: la corrección de la UI se publicó en `d55464d37483f864a1c9026b052ca20b8515e8e4`,
después de las campañas. No se reejecutaron campañas para preparar este repositorio.
