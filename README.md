# ¿Puede Hugging Face manipular a Antigravity?

Material del workshop de **David Quispe · @davidquicast**, DevFest Cusco 2026.

**[Abrir las slides](https://huggingface.co/spaces/davidquicast/devfest-cusco-2026-ai-security)** · **[Generador de imágenes](https://huggingface.co/spaces/davidquicast/generador-imagenes-2)** · **[Consultar la evidencia](https://davidquicast-devfest-cusco-2026-ai-security.static.hf.space/evidence/index.html#capture)**

Estudiamos cómo Antigravity procesa instrucciones en recursos y herramientas externos.
Los positivos presentados utilizaron una **Skill colocada localmente por el laboratorio**.
No demostramos que bastara publicar un Space para instalar esa instrucción y completar
la cadena remota. Hugging Face aloja aplicaciones de terceros; no es el atacante del caso.

## Qué puedes revisar

| Material | Dónde |
|---|---|
| Método, resultados y limitaciones | [docs/RESULTADOS.md](docs/RESULTADOS.md) |
| Datos por ensayo, sin perfiles ni rutas privadas | [results/](results/) |
| Tres casos de captura y respuestas seleccionadas | [evidence/](evidence/) |
| Código fuente de las 22 slides ES/EN | [slides/](slides/) |
| Generador Gradio y pruebas de su interfaz | [lab/space/](lab/space/) |
| Runners seleccionados y condiciones de entrega | [lab/harness/](lab/harness/) |
| Cómo comprobar o repetir partes del trabajo | [docs/REPRODUCIR.md](docs/REPRODUCIR.md) |
| Alcance público y procedencia de los archivos | [docs/ALCANCE.md](docs/ALCANCE.md), [docs/SOURCE_EXPORT.json](docs/SOURCE_EXPORT.json) |

## Lo que encontramos

- Una nota en una Skill local produjo recomendaciones del paquete ficticio en **6/20,
  5/20 y 8/20** pruebas, según la redacción. No se instaló el paquete.
- Añadir la hora fue otro experimento: **21/30** primeras respuestas y **22/30** turnos siguientes.
- En las órdenes explícitas hubo **un comando benigno ejecutado entre 50 respuestas válidas**
  del grupo high. Otras condiciones dieron cero; no deben mezclarse.
- La campaña de captura reunió **63 llamadas completadas**, **6 apariciones de datos en
  registros** y **3 envíos con persistencia confirmada**, en cinco series con ajustes.
  No se calcula una tasa global de éxito.
- Los intentos MCP de la campaña de recomendaciones fallaron durante la conexión. Sus
  ceros no demuestran resistencia a una instrucción entregada por MCP.

Las tablas detallan denominadores y condiciones. Los resultados dependen del modelo,
la entrega de instrucciones, los permisos y la configuración; no garantizan una captura en vivo.

## Comprobar los resultados sin cuentas ni servicios

Con Python 3.10 o posterior, desde la raíz:

```bash
python scripts/analyze_results.py
```

Este comando solo lee los CSV publicados, recalcula los conteos e intervalos y los
contrasta con el resumen. No ejecuta Antigravity, genera imágenes ni escribe en datasets.

Para pruebas funcionales del generador, con las dependencias instaladas:

```bash
python -m pip install -r requirements.txt
python -m unittest discover -s lab/space -p test_app.py -v
```

Estas pruebas simulan la inferencia y el almacenamiento. El uso manual del Space necesita
solo una descripción; la ruta MCP conserva su configuración independiente.

## Datos y reproducción

Las pruebas utilizaron datos ficticios de **Ana**. Se distribuyen columnas seleccionadas,
extractos saneados y hashes; los perfiles, valores de sesión, credenciales y el dataset
privado original quedan fuera. Los CSV públicos permiten recalcular los conteos, pero
no sustituyen las trazas completas ni ofrecen acceso independiente al destino privado.

El código público incorpora ajustes documentados de configuración y de los valores
ficticios para nuevas pruebas. No se editaron los resultados históricos ni se ejecutaron
campañas nuevas para preparar esta publicación. La versión actual del generador incluye
una corrección posterior para su interfaz web.

La [guía de reproducción](docs/REPRODUCIR.md) separa el análisis offline de las pruebas
opcionales con un agente real. Los runners requieren activación expresa y un entorno
propio con datos sintéticos. No conectes las pruebas al servicio o dataset histórico del ponente.

## Código y recursos

El software propio se publica con licencia Apache-2.0. Las librerías y los recursos de
terceros mantienen sus licencias; logos, marcas y fotogramas no se relicencian como software.
Créditos en [ATTRIBUTION.md](ATTRIBUTION.md) y [NOTICE](NOTICE).
