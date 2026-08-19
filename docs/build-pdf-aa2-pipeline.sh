#!/usr/bin/env bash
# Genera AA2_Pipeline_SistemaRestaurante.pdf
set -euo pipefail
cd "$(dirname "$0")"

SRC="AA2_Pipeline_SistemaRestaurante.md"
OUT="AA2_Pipeline_SistemaRestaurante.pdf"
FIG="assets/aa2-pipeline"

mkdir -p "$FIG"

# Placeholders solo si faltan capturas reales (>5 KB = no sobrescribir)
python3 << 'PY'
from pathlib import Path
from PIL import Image, ImageDraw

fig_dir = Path("assets/aa2-pipeline")
names = [
    "01-azure-pipeline-run.png", "02-azure-checkout.png", "02-azure-tests-ok.png",
    "03-github-build-project.png",
    "05-front-01-seleccion-mesa.png", "05-front-02-toma-pedido.png", "05-front-03-pago.png",
    "06-front-kds-pendiente.png", "06-front-kds-preparada.png",
    "07-github-actions-ci.png", "08-azure-tests-fail.png",
]
for name in names:
    p = fig_dir / name
    if p.exists() and p.stat().st_size > 5000:
        continue
    img = Image.new("RGB", (1200, 675), (28, 32, 40))
    d = ImageDraw.Draw(img)
    d.rectangle([20, 20, 1180, 655], outline=(232, 165, 75), width=3)
    d.text((60, 300), "Pendiente: " + name, fill=(200, 200, 200))
    img.save(p)
print("Figuras en", fig_dir)
PY

pandoc "$SRC" -o "$OUT" \
  --pdf-engine=xelatex \
  -H pandoc-pdf-header-unidad3.tex \
  --resource-path=".:assets:assets/aa2-pipeline" \
  -V geometry:margin=0.75in \
  -V fontsize=11pt \
  -V lang=es-MX \
  -V documentclass=article

echo "Creado: $(pwd)/$OUT"
