# App de Administracion Escolar.

### Estructura de la aplicación

```/educational-management-app
├── /components
│   ├── /InstitutionCard
│   ├── /Calendar
│   ├── /Task
│   ├── /Student
│   ├── /Evaluation
│   ├── /Class
│   ├── /Note
│   └── /Navbar
├── /pages
│   ├── /api
│   │   ├── /institutions.ts
│   │   ├── /students.ts
│   │   ├── /tasks.ts
│   │   ├── /evaluations.ts
│   ├── /institutions
│   │   └── /[id].tsx
│   ├── /calendar.tsx
│   ├── /students.tsx
│   ├── /tasks.tsx
│   ├── /evaluations.tsx
│   ├── /notes.tsx
│   └── /index.tsx
├── /data
│   ├── institutions.ts
│   └── students.ts
├── /types
│   ├── Institution.ts
│   ├── Student.ts
│   ├── Evaluation.ts
│   ├── Task.ts
│   └── Note.ts
└── /utils
    ├── /storage.ts
    └── /calendar.ts

```

_Vamos a tener un panel para agregar, editar y eliminar instituciones. Cada institución tendrá atributos como nombre, logo, horarios, y materias asignadas._

`components/InstitutionCard/InstitutionCard.tsx`

`pages/api/institutions.ts` (API para manejar instituciones)

## Calendario Inteligente

_El calendario debe ser unO centralizado donde se muestren todas las actividades (clases, reuniones, evaluaciones, etc.). Este calendario también permitirá filtrar las actividades por institución y mostrar alertas._

`components/Calendar/Calendar.tsx`

# Gestión de Clases y Evaluaciones

_Aquí podrás crear, editar, y organizar clases por institución. También se permite la planificación de evaluaciones con notificaciones previas._

`components/Class/Class.tsx`

# Seguimiento de Estudiantes

_Para el seguimiento de los estudiantes, se gestionan los datos, asistencia, calificaciones y notas._

`components/Student/Student.tsx`

`types/Student.ts`

# Notas y Tareas Administrativas

_Podemos crear una página donde se puedan agregar notas rápidas o registrar tareas administrativas por institución._

`components/Note/Note.tsx`

# Sincronización y Acceso Multidispositivo

_Proximos pasos..._

`npm install react-dnd react-dnd-html5-backend`

