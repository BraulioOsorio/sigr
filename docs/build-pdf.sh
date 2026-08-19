#!/usr/bin/env bash
# Genera Taller_LineaBase_SIGR.pdf desde este directorio (docs/).
# Requisitos: pandoc, xelatex, fuentes (p. ej. texlive-xetex).
set -euo pipefail
cd "$(dirname "$0")"

SRC="Taller_LineaBase_SIGR.md"
OUT="Taller_LineaBase_SIGR.pdf"

pandoc "$SRC" -o "$OUT" \
  --pdf-engine=xelatex \
  -H pandoc-pdf-header.tex \
  --resource-path=".:assets" \
  -V geometry:margin=1in \
  -V fontsize=11pt \
  -V lang=es-ES \
  -V documentclass=article

echo "Creado: $(pwd)/$OUT"
