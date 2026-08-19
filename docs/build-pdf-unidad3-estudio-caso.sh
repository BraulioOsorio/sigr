#!/usr/bin/env bash
# Genera Taller_EstudioCaso_Unidad3_David_Osorio.pdf (máx. contenido razonable para ~5 páginas).
set -euo pipefail
cd "$(dirname "$0")"

SRC="Taller_EstudioCaso_Unidad3_David_Osorio.md"
OUT="Taller_EstudioCaso_Unidad3_David_Osorio.pdf"

pandoc "$SRC" -o "$OUT" \
  --pdf-engine=xelatex \
  -H pandoc-pdf-header-unidad3.tex \
  --resource-path=".:assets" \
  -V geometry:margin=0.55in \
  -V fontsize=10pt \
  -V lang=es-MX \
  -V documentclass=article

echo "Creado: $(pwd)/$OUT"
