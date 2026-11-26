# EduControl — Frontend

Panel de administración web para la gestión de entidades educativas (instituciones, usuarios, roles, docentes y estudiantes). Construido con **React 19 + TypeScript** sobre **Vite**, estilado con **Tailwind CSS 4** y conectado a un backend Express vía API REST.

> Proyecto personal en desarrollo activo. Este README resume el estado actual para poder retomarlo sin perder contexto.

## TL;DR (quick path)

```bash
npm install
npm run dev          # http://localhost:5173
```

El backend debe estar corriendo en `http://localhost:5000` (ver sección [Integración con backend](#integración-con-backend)).

## ¿Qué es y para quién?

EduControl es el frontend de un sistema de gestión educativa. Permite a un administrador (y a docentes/estudiantes con permisos) gestionar:

- **Usuarios** (cuentas, perfiles, avatares, roles, institución asociada).
- **Instituciones** (datos generales, contacto, capacidad/ubicación, asignación).
- **Roles** con nivel jerárquico y color identificativo.
- **Docentes** y **estudiantes** vinculados a instituciones.

La UI es en español y el código/identificadores en inglés, siguiendo las convenciones del proyecto (ver `CONTRIBUTING.md`).

## Stack

| Capa | Tecnología | Versión |
|------|-----------|---------|
| UI | React | 19.1 |
| Lenguaje | TypeScript | ~5.8 |
| Bundler / dev server | Vite | 6.3 |
| Estilos | Tailwind CSS (plugin Vite) | 4.1 |
| Routing | React Router DOM | 7.6 |
| Tablas | TanStack React Table | 8.21 |
| Formularios | React Hook Form | 7.57 |
| HTTP | Axios | 1.10 |
| Gráficos | Chart.js + react-chartjs-2 | 4.5 / 5.3 |
| Notificaciones | react-hot-toast | 2.5 |
| Iconos | react-icons | 5.5 |
| Primitivas UI | @headlessui/react | 2.2 |
| Utilidad de clases | tailwind-merge (`cn()`) | 3.7 |
| Tests | Vitest + Testing Library (jsdom) | 5.1 |
| Lint | ESLint 9 + typescript-eslint | 9.25 |

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Typecheck (`tsc -b`) + build de producción |
| `npm run preview` | Previsualizar el build |
| `npm run lint` | ESLint sobre todo el proyecto |
| `npm test` | Vitest (ejecución única) |
| `npm run test:watch` | Vitest en modo watch |

## Arquitectura y estructura

Patrón: SPA con routing por roles, layouts compartidos y componentes reutilizables. Las llamadas HTTP viven en `src/api/*` y los modelos/DTOs en `src/types`.

```
src/
├── api/                 # Clientes HTTP (axios) por entidad + handleApiError
│   ├── user.api.ts      # auth, perfil, listado, update, cambio de contraseña
│   ├── teacher.api.ts, student.api.ts, institution.api.ts
│   ├── roles.api.ts, municipality.api.ts, department.api.ts
│   ├── admin.api.ts, actividad.api.ts
├── components/
│   ├── ui/              # Primitivas: Button, Input, Select, Label, ErrorSpan, Title, Main, AuthDecoration, btn/*
│   ├── form/            # FormField, FormSection (reutilizables)
│   ├── table/           # Table (TanStack), HeaderSection, SearchSection, PaginationSection, MetricsSection
│   ├── home/admin/      # HomeAdmin, HomeCard, ActionButton, LineChart
│   ├── sidebar/         # SidebarAdmin, SidebarTeacher, SidebarStudent
│   ├── headerNav/       # NavHeader, NotificationMenu
│   ├── Home.tsx, SideBar.tsx, Header.tsx, Footer.tsx, Table.tsx
├── layouts/             # LayoutAuth, LayoutAdmin
├── pages/
│   ├── auth/            # Login, ForgetPassword, register/{RegisterUser, RegisterInstitutions, RegisterRol, components/*}
│   ├── admin/
│   │   ├── usuarios/    # ListUser, ProfileAdmin, profile/*, components/*
│   │   ├── instituciones/ # ListInstitutions, components/*
│   │   ├── docentes/    # ListTeacher, components/*
│   │   ├── estudiantes/ # ListStudent, components/*
│   │   └── roles/       # ListRoles, components/*
├── types/
│   ├── *.model.ts       # Modelos de dominio (User, Teacher, Student, Rol, Institution, ...)
│   └── dto/*.dto.ts     # DTOs de entrada (CreateUserDto, LoginUserDto, ...)
├── lib/cn.ts            # helper de clases (tailwind-merge)
├── test/setup.ts        # setup de Vitest (jest-dom)
├── App.tsx              # Definición de rutas
└── main.tsx             # Punto de entrada
```

### Routing (`App.tsx`)

- `/` → redirige a `/login`.
- `/login`, `/registerUser` → auth.
- `/admin/*` → `LayoutAdmin` (sidebar + header + outlet):
  - `/admin` → Home
  - `/admin/usuarios`, `/admin/usuario` (perfil), `/admin/registerUser`
  - `/admin/instituciones`, `/admin/instituciones/:id`, `/admin/registerInstitutions`
  - `/admin/docentes`, `/admin/alumnos`, `/admin/roles`, `/admin/registerRol`
- `*` → `Error404`.

> Nota: `ProtectRoute` está comentado; la protección de rutas aún no está activa.

### Roles y sidebar dinámico

`SideBar` obtiene el perfil del usuario (`getUserProfile`, con fallback a `localStorage`) y resuelve el nombre del rol. Según el rol renderiza `SidebarAdmin`, `SidebarTeacher` o `SidebarStudent`. Logout limpia `token`/`user` de `localStorage`.

## Módulos implementados (estado)

| Módulo | Funcionalidades |
|--------|-----------------|
| **Auth** | Login, registro de usuario/institución/rol |
| **Home admin** | Cards de métricas, gráfico (LineChart), acciones rápidas |
| **Usuarios** | Listado con tabla reutilizable (búsqueda, paginación, métricas), badge de rol por color, filtro de sede dinámico, columna "Último acceso" |
| **Perfil de usuario** | Edición de datos, avatar, estado de cuenta, cambio de contraseña con límite mensual, actividades recientes |
| **Instituciones** | Listado + formulario de registro/edición (info general, contacto, capacidad/ubicación, asignación) |
| **Docentes** | Listado con métricas y card de docentes vinculados |
| **Estudiantes** | Listado con métricas |
| **Roles** | Listado con badge por color + formulario de creación con nivel jerárquico |
| **Componentes reutilizables** | `Table`, `FormField`/`FormSection`, inputs, `Button` con variantes, `cn()` |

## Integración con backend

- Base URL hardcodeada en `src/api/user.api.ts`: `http://localhost:5000/api` (hay una URL de producción comentada).
- Autenticación por **Bearer token** guardado en `localStorage` (`token`), más el objeto `user`.
- Endpoints consumidos (prefijo `/api`): `/usuarios`, `/usuarios/login`, `/usuarios/me`, `/usuarios/:id`, `/usuarios/change-password`, y los de instituciones/roles/docentes/estudiantes/municipios/departamentos/actividades.
- Manejo de errores centralizado en `handleApiError` (extrae `message`/`error` de la respuesta).

Para desarrollo local el backend Express debe estar levantado en el puerto 5000. El `.env` de este repo contiene `DATABASE_URL` (MySQL/PostgreSQL) — probablemente leftover/compartido con el backend; verificar antes de usar.

## Convenciones del proyecto

Reglas completas en `CONTRIBUTING.md`. Resumen de las inquebrantables:

- **R2** — sin `git commit` sin aprobación explícita del mantenedor.
- **R3** — sin `git push` sin permiso explícito.
- **R15** — código legible para juniors sin experiencia (inquebrantable).
- Commits en español con Conventional Commits (`tipo(scope): descripción`).
- No commits directos a `master`/`main`; siempre rama feature + PR.
- `npm run lint` y `tsc -b` deben pasar antes de commitear.
- Tests obligatorios para componentes nuevos/modificados.
- Máximo 250 líneas por componente (incluyendo tests).
- Código/identificadores/comentarios en inglés; UI/copy/mensajes en español.
- PRs < 400 líneas cambiadas (si se excede, chained PRs).

## Testing

- Runner: **Vitest** con entorno `jsdom` y setup en `src/test/setup.ts` (`@testing-library/jest-dom`).
- Tests existentes: `Table.test.tsx`, `SearchSection.test.tsx`, `PaginationSection.test.tsx`, `MetricsSection.test.tsx`, `ListTeacher.test.tsx`.
- Ejecutar: `npm test` (una vez) o `npm run test:watch`.

## Estilo de código

- ESLint 9 con `eslint-plugin-react-hooks` y `eslint-plugin-react-refresh`.
- Tailwind 4 vía plugin Vite; helper `cn()` (`src/lib/cn.ts`) combina clases con `tailwind-merge`.
- Tipado estricto con `tsconfig.app.json` / `tsconfig.node.json`.

## Estado actual y pendientes

**Hecho:**
- Estructura base, layouts, routing, sidebar por rol.
- Auth (login + registros).
- Módulos de usuarios, instituciones, docentes, estudiantes, roles.
- Tabla reutilizable con búsqueda/paginación/métricas.
- Perfil de usuario completo (incl. cambio de contraseña con límite mensual y actividades).
- Componentes de formulario reutilizables (`FormField`, `FormSection`).
- Tests para tabla y secciones.

**Pendiente / a retomar:**
- Activar protección de rutas (`ProtectRoute`).
- Conectar variables de entorno para la API (hoy hardcodeada a `localhost:5000`).
- Verificar/limpiar el `.env` (contiene `DATABASE_URL` de backend).
- Ampliar cobertura de tests a los módulos restantes.
- Revisar consistencia de nombres de rutas (`/admin/alumnos` vs `/estudiantes`).

## Troubleshooting

- **"No hay token de autenticación"**: iniciar sesión; el token se guarda en `localStorage`.
- **CORS / conexión rechazada**: confirmar que el backend corre en `http://localhost:5000`.
- **Tipos rotos en build**: correr `npm run build` (incluye `tsc -b`) y revisar `tsconfig.app.json`.
- **Tests que no encuentran jest-dom**: verificar `src/test/setup.ts` y `setupFiles` en `vite.config.ts`.

## Referencias

- `CONTRIBUTING.md` — convenciones y reglas inquebrantables.
- `.agents/skills/` — skills de frontend/react/tailwind/typescript/vite/etc.
- `package.json` — scripts y dependencias.