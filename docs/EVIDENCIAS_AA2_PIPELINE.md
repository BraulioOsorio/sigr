# Capturas que debes pasar — AA2 Pipeline

Guarda cada archivo en: **`sigr/docs/assets/aa2-pipeline/`** con el nombre indicado.

| # | Archivo | Qué capturar |
|---|---------|----------------|
| 1 | `01-azure-pipeline-run.png` | Azure DevOps: vista general del pipeline (todas las etapas). |
| 2 | `02-azure-checkout.png` | Step **“Checkout (referencia del commit en Azure)”** en verde. |
| 3 | `08-azure-tests-fail.png` | Step **“Pruebas unitarias”** completo (log pytest; vale aunque falle). ✅ |
| 4 | `03-github-build-project.png` | GitHub Actions: **“Build project”** (front) en verde. ✅ |
| — | `03-azure-build-push.png` | *(Opcional)* Azure: Docker build y push al registry. |
| 5–9 | `05-front-01` … `06-front-kds-preparada` | Pasos front: mesa, pedido, pago, KDS pendiente, KDS preparada. ✅ |
| 10 | `07-github-actions-ci.png` | GitHub Actions (`lint.yml` en PR). ✅ |
| — | `02-azure-tests-ok.png` | *(Opcional)* Misma etapa en verde, si más adelante tienes un run exitoso. |

PDF final: **`AA2_Pipeline_SistemaRestaurante.pdf`** (sin figura de deploy SSH).
