# Convenciones de trabajo — entidades-react

> Reglas acordadas con el mantenedor. **Inquebrantables**: R2 (commits) y R3 (push).

## R1 — Commits en español con Conventional Commits

- Todo commit se escribe en **español**.
- Formato: `tipo(scope): descripción en imperativo`.
- Tipos permitidos: `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `test`, `perf`, `ci`.
- Ejemplo: `feat(usuarios): se agregó columna nombre al listado`.
- Scope = módulo/entidad afectada (`usuarios`, `instituciones`, `auth`, etc.).
- Un commit = una unidad de trabajo revisable (código + tests + docs juntos).

## R2 — Sin commits sin visto bueno (INQUEBRANTABLE)

- **Nunca** se ejecuta `git commit` sin aprobación explícita del mantenedor.
- Antes de commitear: se muestra el diff (`git diff --cached`) y se espera confirmación.
- Si el mantenedor dice "no", se deshace el staging y se ajusta.

## R3 — Sin push sin permiso (INQUEBRANTABLE)

- **Nunca** se ejecuta `git push` sin permiso explícito del mantenedor.
- Aplica también a force-push, tags y releases.

## R4 — SDD + skills de `.agents`

- Los cambios sustanciales se planifican con **SDD** (`/sdd-new`, `/sdd-ff`, etc.).
- Antes de trabajar, resolver y cargar las skills relevantes de `.agents/skills/`
  (y las del registro en `.atl/skill-registry.md`) según el contexto del cambio.
- Los artifacts SDD (proposal/spec/design/tasks) se escriben en **inglés**.

## R5 — No commits directos a `master`/`main`

- Siempre trabajar en una rama feature/fix y abrir PR.
- `master`/`main` solo recibe merges vía PR revisado.

## R6 — Lint y typecheck antes de commit

- `npm run lint` y `tsc -b` deben pasar sin errores antes de commitear.
- Un commit que rompe el build no se permite.

## R7 — Commits atómicos por work-unit

- Código, tests y docs del mismo cambio van en el mismo commit.
- No mezclar refactors no relacionados con features.

## R8 — No commitear secretos

- `.env`, tokens y credenciales nunca se commitean (ya están en `.gitignore`).
- Verificar `git status` antes de cada commit.

## R9 — Idiomas del código vs. UI

- **Código/identificadores/comentarios técnicos**: inglés.
- **UI/copy/mensajes al usuario**: español (consistente con el proyecto actual).

## R10 — Tamaño de PR

- PRs < 400 líneas cambiadas.
- Si se excede, dividir en PRs encadenados (chained PRs).

## R11 — Mensajes de commit con scope

- Siempre incluir scope cuando aplique: `feat(modulo): ...`.
- Descripción clara, en imperativo, en español.

## R12 — Skill resolution obligatoria

- Antes de cualquier trabajo de código, cargar las skills aplicables
  desde `.agents/skills/` (frontend, react, tailwind, typescript, etc.).
- No hardcodear paths; resolver vía el registro de skills.

## R13 — Cobertura de tests obligatoria

- Todo componente nuevo o modificado debe tener **tests** (unitarios y/o de integración).
- No se acepta un PR que agregue/modifique componentes sin sus tests acompañantes.
- Los tests deben pasar (`npm test` / el runner configurado) antes de commitear.

## R14 — Límite de 250 líneas por componente

- Ningún componente nuevo o modificado puede superar **250 líneas de código**,
  **incluyendo sus tests**.
- Si un componente excede el límite, se debe **dividir/refactorizar** en componentes más pequeños
  antes de abrir el PR.
- Aplica a archivos `.tsx`/`.ts` de componentes y a sus archivos de test asociados.

---

_Mantenedor: Oscar Lozano · Proyecto: entidades-react_
" path="F:\Oscar\Desktop\practicas de programacion\Proyectos_Personales_React_Express\entidadesReact\CONTRIBUTING.md"