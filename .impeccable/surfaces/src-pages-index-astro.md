---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/[country]/dolar-hoy.astro"]
---

# Surface brief — portada, país, notas

Scope: el sitio completo. Portada `/`, país `/{code}/dolar-hoy` para ocho países, notas `/notas/{slug}`, páginas legales. Visitor mode: **Operate** en portada y país (el visitante viene a encontrar una cifra y hacer una cuenta), **Read** en notas.

Audience: adulto latinoamericano en el teléfono, a mitad de una decisión con plata real. Prioridad Bolivia. Job: encontrar la cifra sin buscarla, convertir su monto, ver hacia dónde viene moviéndose.

Content: ocho tableros desde dolarapi y su fallback; histórico desde fuentes públicas donde existen y desde el registro propio del proyecto donde no; notas editoriales escritas como ejemplo.

Constraints: cero comentarios en código; Astro estático salvo islas mínimas; modo oscuro como tema par; verde y rojo confirmados por el usuario pero nunca como único indicio; los huecos de AdSense van inertes; nunca asesorar.

Memorable moment: el sello. Escribes un monto y queda estampado en cada renglón del libro, como una anotación de cajero.

Unresolved: nombre y dominio; cabecera correcta de la clave restcountries.

## Direction contract

THESIS: Una cartilla de ahorros abierta sobre la mesa, no un panel de control. Rechaza el tablero austero de filetes que el usuario rechazó y también la rejilla de tarjetas con banderas del rubro.

OWN-WORLD: Papel manila cálido como suelo de lectura y verde cartilla profundo como tapa y cromo; esquinas redondeadas de tapa, renglones impresos en verde pálido, cifras estampadas en tinta sobre el rayado. Verde depósito y rojo retiro son la lengua propia del libro contable, no una convención bursátil pegada encima. Familjen Grotesk para rótulos y prosa, Azeret Mono entintada para toda cifra. Hoja de papel como contenedor, jamás tarjetas repetidas.

STORY: Este es el libro donde está anotado cuánto vale el dólar en mi país, con la fecha sellada; escribo mi monto y queda anotado en cada renglón.

FIRST VIEWPORT: Tapa verde con el sello de fecha; la hoja de papel abierta debajo; el saldo del día en cifra estampada grande con su nombre de cotización y su variación en verde o rojo al lado; el talón lateral fijo con el conversor; los primeros renglones del libro cortando el pliegue.

FORM: La cartilla de ahorros — candidato 5 de la lista ordenada, asignado por la tirada y elegido por el usuario sobre el aguayo andino, la rotulación popular y el estándar del rubro. Seed key 7fd9762c, re-roll 1.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

### Raises

- RAISE (depot blind courses, declinado): el rango se marca por inversión — el renglón principal imprime oscuro sobre papel pálido mientras el resto imprime al revés, así la cifra que importa se encuentra sin buscarla.
- RAISE (nixie laboratory counter, declinado): cada cotización posee un campo de dígitos fijo, y un cambio de valor se lee como un hecho físico, no como un desvanecido.
- RAISE (miura orbit sheet, declinado): un solo control propaga por todo el campo enlazado; el monto reescribe cada renglón del libro a la vez.
- ANTI-REFERENCE: el tablero de terminal documentado en DESIGN.md es evidencia de qué es el producto, nunca autoridad sobre en qué se convierte. No se conserva ni un token suyo.
