# Implant model

The site renders a procedural implant until a real model is ready.

To replace it:

1. Export a GLB to `public/models/smart-implant.glb`.
2. Name the separable objects `Crown`, `SensorLayer`, `SmartAbutment`, `ImplantFixture`, and `Bone`.
3. Set `assets.useExternalImplantModel` to `true` in `config/brand.ts`.

The procedural geometry and the GLB path share the same explode animation contract.
