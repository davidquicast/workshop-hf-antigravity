# Recursos y procedencia

- Runtime React y framework: https://huggingface.co/spaces/sergiopaniego/train-the-agent-slides · commit b6bdc00. SDK static, license apache-2.0 en metadatos originales. Infraestructura acreditada allí a FineEnvs de Adithya S Kolavi: https://github.com/adithya-s-k/FineEnvs . Se reutilizan runtime, navegación, escalado, notas, índice, transiciones y controles. Contenido de investigación y diseño del workshop: David.
- Plantilla DevFest 2025 inspeccionada y guía de composición/paleta: https://docs.google.com/presentation/d/1SgexbAwG48vw9ROOdvmPVR4aA-lpu5o6YCuG8a9oXOM/edit . Referencias descargadas en public/brand, no incluidas en despliegue.
- Guía DevFest 2025: https://goo.gle/devfest25-brand-guide → https://docs.google.com/presentation/d/1NKjn6acEoQjObA0HXRivLoqc4L35fivDswifxneBpFA/edit . Pasteles, contornos, Google Sans, fondo #f0f0f0 y tintas #1e1e1e tomados de la plantilla.
- Assets oficiales DevFest 2026: https://developers.google.com/community/devfest . Corchetes de `static/community/devfest/images/2026/bracket-open.svg` y `bracket-close.svg`, ilustraciones `technical-content.png`, `hands-on-learning.png`, `community-connections.png`; símbolo GDG `images/lockup.svg` y `gdg-icon.svg`. Uso en contexto de charla DevFest; marcas pertenecen a sus titulares, sin aval de producto implícito. Se muestran corchetes y símbolo; las ilustraciones descargadas quedan disponibles como referencia de diseño.
- Google Sans Flex: https://fonts.google.com/specimen/Google+Sans+Flex ; archivos servidos por fonts.gstatic.com descargados con CSS de fonts.googleapis.com. Copias locales para funcionamiento sin red. El framework original usa fuentes de sistema para sus controles.
- Las tablas resumen los registros del laboratorio, sin trasladar cifras de benchmarks externos. La evidencia seleccionada explica su procedencia y sus limitaciones; el repositorio de investigación se prepara por separado.

Descargado e inspeccionado el 5 noviembre 2026.

## Imágenes de la revisión local (sesión 29)

- **Cusco:** «Plaza de Armas - Cusco.jpg», Joachim Pietsch; obra derivada de MrPanyGoff. [Ficha y autoría en Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Plaza_de_Armas_-_Cusco.jpg), [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/). Archivo local `public/images/cusco.jpg`; original descargado, encuadre aplicado mediante CSS. La fotografía se conserva en portada; se retiró del cierre a petición del ponente.
- **WandaVision:** fotograma de Vision y White Vision en la biblioteca, episodio 9, © Marvel Studios / Disney+. [Página de procedencia: GamesRadar+](https://www.gamesradar.com/wandavision-the-comic-book-roots-of-the-finales-ship-of-theseus-scene/), [imagen publicada](https://cdn.mos.cms.futurecdn.net/dTxBqGAU3LMtkLPjdN4szN-1280-80.jpg). Archivo local `public/images/vision-library.jpg`. Se usa para comentar la escena como analogía; no se atribuye una licencia abierta ni se presenta como imagen generada por nosotros.
- La imagen editorial de The Direct `wandavision.jpg` se descargó como candidata, pero se descartó de la presentación porque no mostraba la conversación entre los dos Vision. No forma parte de las figuras activas.

## Referencias de diseño e instrucción inspeccionadas

- Space de referencia: trazas oS, distribuciones cS, pruebas dS, bucle fS, proxy hS y renderer de código og; se reutilizan player y renderer de código, y se crean escenas propias sobre HTTP/MCP/ARD, autoridad, medición y defensas.
- [Simon Willison, PyCon US 2024, charla anotada](https://simonwillison.net/2024/Jul/14/pycon/): uso de ejemplos concretos y separación entre contenido e instrucciones.
- [Johann Rehberger, SpAIware, Black Hat EU 2024, slides originales](https://i.blackhat.com/EU-24/Presentations/EU-24-Rehberger-SpAIware-Advanced-Prompt-Injection-Exploits.pdf): PDF de 93 páginas inspeccionado; comparación de superficies y anatomía visual de exfiltración. No se copian sus ilustraciones, branding ni resultados a nuestras slides.

## Iconos del cierre

- GitHub: marca de Octicons, fuente oficial Primer/GitHub: https://github.com/primer/octicons/blob/main/icons/mark-github-16.svg (MIT).
- X: marca vectorial de Simple Icons: https://github.com/simple-icons/simple-icons/blob/develop/icons/x.svg (CC0 para la colección; marca de su titular).
- LinkedIn: icono original LI-In-Bug.png del ZIP oficial https://content.linkedin.com/content/dam/me/brand/en-us/brand-home/downloads/LinkedIn-Logos.zip , publicado en https://brand.linkedin.com/downloads . Sin redibujar ni recolorear.
- Hugging Face: logo oficial ya documentado, conservado sin modificación.
- QR generado localmente con qrcode para la URL exacta de src/links.json; decodificado con OpenCV. No cambia la privacidad del Space.
