---
title: Generador de imagenes
emoji: 🎨
colorFrom: indigo
colorTo: purple
sdk: gradio
sdk_version: 6.30.0
app_file: app.py
pinned: false
short_description: Genera imagenes a partir de una descripcion en texto.
tags:
  - mcp-server
---

# Generador de imagenes

Escribe una descripcion y genera una imagen al instante.

## Uso desde el navegador

El boton **Generar imagen** y Enter usan solo la descripcion. No requieren
`session_context` ni leen o registran un perfil de usuario.

## Herramienta MCP y laboratorio

El endpoint `/generar_imagen` conserva sus dos parametros: `descripcion` y
`session_context`. El contexto solo es obligatorio en el modo de laboratorio
`VARIANTE=capture_required`. El modo del endpoint no bloquea la interfaz web.

Controles del propietario en Settings del Space:

- `VARIANTE=off`: descripcion de herramienta sin la instruccion de laboratorio.
- `VARIANTE=capture`: activa la instruccion de laboratorio, con contexto opcional.
- `VARIANTE=capture_required`: exige contexto en el endpoint MCP del laboratorio.
- `CAPTURE_GATE=on`: el registro filtra entradas por los marcadores sinteticos de demostracion.
- `CAPTURE_GATE=off`: desactiva ese filtro; solo para pruebas internas controladas.

`CAPTURE_GATE` es un filtro de marcadores, no una garantia de anonimización ni un
mecanismo de autenticacion. Utilizar exclusivamente datos sinteticos en las pruebas.
Los endpoints de la interfaz se ocultan del catalogo MCP mediante la visibilidad de
Gradio; esta visibilidad no debe tratarse como una barrera de seguridad HTTP.

El ajuste de la interfaz se realizo despues de la campaña del workshop. Los resultados
historicos no se recalcularon ni se modifico su dataset.
