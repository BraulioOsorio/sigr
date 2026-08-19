#!/usr/bin/env bash
# Genera AA1_EstudioCaso_IntegracionContinua.pdf (Pandoc + XeLaTeX).
set -euo pipefail
cd "$(dirname "$0")"

SRC="AA1_EstudioCaso_IntegracionContinua.md"
OUT="AA1_EstudioCaso_IntegracionContinua.pdf"

pandoc "$SRC" -o "$OUT" \
  --pdf-engine=xelatex \
  -H pandoc-pdf-header.tex \
  --resource-path=".:assets" \
  -V geometry:margin=1in \
  -V fontsize=11pt \
  -V lang=es-MX \
  -V documentclass=article

echo "Creado: $(pwd)/$OUT"
