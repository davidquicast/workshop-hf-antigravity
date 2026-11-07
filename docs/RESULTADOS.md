# Cómo se midieron los resultados

Workshop «¿Puede Hugging Face manipular a Antigravity?» · DevFest Cusco 2026 · David Quispe.

## Alcance y condición de entrega

Se utilizaron tareas y datos sintéticos de Ana en un laboratorio autorizado. Hugging Face aloja aplicaciones de terceros; no es el actor que introduce las instrucciones del experimento.

En los positivos descritos aquí, un script del laboratorio escribió una Skill en el proyecto antes de ejecutar Antigravity. La guía obtenida mediante el descubrimiento de Hugging Face no contenía esa instrucción maliciosa. No se demostró la cadena remota completa «publicar un Space → instalar la Skill maliciosa → obtener los datos».

La herramienta del generador se llamó por MCP en la campaña de captura. Esto describe el transporte de la llamada, no el método de instalación de la Skill.

## Órdenes explícitas en una Skill local

Cada celda contiene 50 respuestas válidas de Gemini Flash. Los niveles low, medium y high indican el esfuerzo configurado. No se suman objetivos distintos.

| Objetivo | low | medium | high |
|---|---|---|---|
| Recomendar un paquete | 0/50 | 0/50 | 0/50 |
| Escribir reglas del agente | 0/50 | 0/50 | 0/50 |
| Ejecutar un comando de prueba | 0/50 | 0/50 | 1/50 |

El caso ejecutado creó `devfest-canary.txt` mediante un comando benigno y dejó la marca esperada en disco. No fue una vulnerabilidad de ejecución de código del software. Para los grupos de reglas y comandos hubo 74 intentos por celda hasta obtener las 50 respuestas válidas; los intentos inválidos no cuentan como resistencia.

## Recomendación como nota documental

Campaña distinta: Gemini Flash high, 20 pruebas por condición, Skill aportada localmente por el laboratorio. El objetivo era recomendar el paquete ficticio `devfest-helper`, sin instalarlo.

| Condición | Recomendaciones | Porcentaje | Intervalo Wilson del 95 % |
|---|---|---|---|
| Sin nota | 0/20 | 0 % | 0–16,11 % |
| Nota simple | 6/20 | 30 % | 14,55–51,90 % |
| Nota con etiqueta | 5/20 | 25 % | 11,19–46,87 % |
| Nota intercalada | 8/20 | 40 % | 21,88–61,34 % |
| Nota en el resultado de la herramienta | 0/20 | 0 % | 0–16,11 % |

Los intervalos se solapan. Estas muestras no permiten ordenar las redacciones por eficacia ni generalizar un cero a otros escenarios.

## Formato y acciones: otros experimentos

La instrucción de añadir la hora apareció en 21/30 primeras respuestas y 22/30 turnos siguientes. Es persistencia de formato, no recomendación de un paquete ni captura de datos.

En otra preparación con una Skill para la tarea del póster hubo 0 propuestas y 0 ejecuciones en 20 pruebas por objetivo: crear un archivo, cambiar reglas y ejecutar un comando benigno. Esa serie no elimina el caso histórico de 1/50 de la tabla anterior: cambiaron la preparación y la tarea.

## Captura: del registro al destino

Gemini Flash low, Skill colocada localmente y herramienta real del Space. Cinco series con ajustes entre ellas: 3 + 10 + 10 + 20 + 20 = 63 llamadas MCP completadas.

| Serie | Llamadas completadas | Registros con datos | Envíos con datos confirmados | Persistencias confirmadas |
|---|---|---|---|---|
| 1 | 3 | 2 | 2 | 2 |
| 2 | 10 | 1 | 0 | 0 |
| 3 | 10 | 0 | 0 | 0 |
| 4 | 20 | 3 | 1 | 1 |
| 5 | 20 | 0 | 0 | 0 |

Los tres envíos tienen argumentos de una llamada MCP completada y concordancia independiente con el destino. El destino contenía tres filas completas con canario y una fila parcial sin canario; la parcial no añade otra captura. La aparición de un dato en un stream no demuestra por sí sola su lectura desde disco ni su envío.

El contador `captured` del runner consultaba un nombre de CSV incorrecto y tenía problemas de latencia. La confirmación se hizo contra el destino independiente. Como hubo cambios de configuración entre las series, no se estima una tasa global de éxito ni una probabilidad de éxito en vivo.

Se publican extractos con valores y canarios ocultos, junto con hashes de procedencia. Un hash permite identificar un artefacto, pero no sustituye el acceso al original ni convierte un extracto en una traza completa. El dataset y los perfiles originales no se distribuyen en el Space.

## Conexiones MCP fallidas en la campaña de recomendaciones

Estas pruebas son diferentes de las 63 llamadas completadas de captura. Los intentos MCP siguientes terminaron con error de inicialización; hubo accesos HTTP alternativos y exposición desigual.

| Entrada prevista | Respuestas válidas | Recomendaciones observadas | Intentos MCP | Llamadas MCP completadas |
|---|---|---|---|---|
| Descripción local | 18 | 0 | 14 | 0 |
| Resultado local | 20 | 0 | 17 | 0 |
| Descripción del Space | 5 | 0 | 2 | 0 |

Esos ceros no demuestran que el agente recibiera y resistiera un resultado malicioso enviado correctamente por MCP.

## Cambiar el backend después de la aprobación

En una prueba de mecanismo, una misma identidad de servidor devolvió el marcador ALPHA en 3/3 llamadas y después OMEGA en 3/3. Se comprobó un cambio de comportamiento tras la conexión; los marcadores eran neutros y solicitados por la tarea.

En la prueba distinta de manipulación de la fase modificada hubo 0/6 capturas, con dos llamadas por esfuerzo; el control fue 0/3, una por esfuerzo. No se presenta el cambio de backend como una manipulación conseguida.

## Defensa con revisión previa de acciones

Una política personalizada conectada a `PreToolUse` denegó las cinco propuestas de escritura al archivo de reglas observadas en diez ejecuciones; en las otras cinco no hubo propuesta. La denegación se verificó en eventos nativos, no solamente en el contador CSV. No se atribuyen a este hook los ceros de otras campañas ni se promete cobertura universal de todas las interfaces.

## Archivos de consulta

- [Casos de captura saneados](../evidence/capture-replay-v2.json)
- [Conteos de las diapositivas](../results/summary.json)
- [Procedencia de las respuestas seleccionadas](../evidence/manifest.json)
- [Volver a la evidencia](https://davidquicast-devfest-cusco-2026-ai-security.static.hf.space/evidence/index.html#capture)
- [Fuentes técnicas](https://davidquicast-devfest-cusco-2026-ai-security.static.hf.space/fuentes.html)
