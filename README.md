# Gestor de tareas
Descripción General de la Actividad
El estudiante desarrollará un Sistema de Gestión de Tareas utilizando HTML, CSS y JavaScript, aplicando principios de diseño web y lógica de programación. El proyecto debe implementar un CRUD completo (Crear, Leer, Actualizar y Eliminar) para administrar tareas académicas, utilizando JSON como estructura de datos interna.


El propósito de esta actividad es que el estudiante aplique las habilidades en construcción de interfaces, manipulación del DOM y organización de información mediante formatos estructurados.

Adjunto se encuentra una imagen del diseño propuesto. El desarrollo deberá respetar y reproducir, en lo posible, la estructura visual indicada en ese diseño.

 

Alcance del Proyecto
El sistema debe permitir a los estudiantes:

1. Registrar nuevas tareas
A través de un formulario donde puedan ingresar:

Fecha de entrega

Materia o área asignada

Nivel de prioridad (Baja / Media / Alta)

Título de la tarea

Descripción detallada

Cada tarea debe registrarse internamente como un objeto dentro de un JSON, el cual funcionará como contenedor principal de la información.

2. Visualizar las tareas (Lectura) — (añadido)
La visualización es parte central del producto; deberá ajustarse al diseño propuesto y cumplir con lo siguiente:

Diseño basado en tarjetas (cards): cada tarea se representa en una tarjeta independiente.

Contenido visible en la tarjeta: Fecha de entrega (visualmente destacada), Materia, Prioridad (con color o icono), Título (encabezado), y una vista corta de la Descripción (máx. 2–3 líneas) con opción “Ver más” para expandir la descripción completa.

Ubicación de acciones: botones Editar y Eliminar situados en la esquina superior derecha o inferior derecha de la tarjeta (según el mockup), claramente diferenciados entre sí (íconos + texto, colores contrastantes).

Indicadores visuales: uso de colores o pequeñas etiquetas para indicar prioridad y estado (por ejemplo: Pendiente, Entregada, Retrasada).

Interacción rápida: al pasar el cursor sobre la tarjeta mostrar sombra/realce y una microacción (por ejemplo, ver detalles, marcar completada).

Detalle expandido o modal: la tarjeta debe permitir abrir un panel lateral o modal para ver todos los campos completos y editar sin navegar a otra página.

Orden y filtros: permitir ordenar por fecha de entrega y prioridad; incluir, filtros rápidos por materia o prioridad.

Responsividad: las tarjetas deben reorganizarse para pantallas pequeñas (grid que baja de 3 → 2 → 1 columnas) manteniendo la usabilidad en móvil.

3. Editar tareas (Actualización)
El botón Editar debe:

Cargar los datos de la tarea en el formulario.

Permitir modificar cualquiera de los campos.

Guardar los cambios en el JSON y actualizar la interfaz inmediatamente.

4. Eliminar tareas
El botón Eliminar debe:

Solicitar confirmación antes de borrar.

Eliminar la tarea del JSON y remover la tarjeta del DOM.

5. Persistencia de Datos
El JSON deberá poder ser persistido en localStorage para mantener las tareas entre sesiones.

El formato del JSON deberá documentarse claramente (ejemplo incluido más abajo).

 

Criterios de Aceptación (qué debe entregarse para aprobar)
Interfaz que reproduzca fielmente el diseño adjunto en estructuras y comportamiento clave.

CRUD completo funcionando sobre JSON y persistencia en localStorage.

Visualización de tareas en tarjetas conforme a las especificaciones de la sección de Visualización (incluye “ver más”, indicadores de prioridad/estado y orden/filtrado básico).

Edición vía formulario y eliminación con confirmación.

Responsive: correcto comportamiento en escritorio, tablet y móvil.

Entrega de código fuente organizado y pequeño documento que explique la estructura del JSON y cómo arrancar la app localmente y desde Github Pages.

Adjunto
He incluido un diseño propuesto que especifica: paleta de colores, ubicación de botones Editar/Eliminar y estructura de la tarjeta. El proveedor deberá respetar la propuesta visual y comunicar cualquier ajuste necesario por restricciones técnicas.
# Funcionamiento y explicaciones (EN POCAS PALABRAS):📝
-Las tareas se visualizan mediante tarjetas individuales que muestran título, materia, fecha, prioridad y estado.
Cada tarjeta incluye indicadores visuales de prioridad y estado, así como un botón ‘Ver más’ que permite expandir la descripción completa.
La aplicación permite filtrar tareas por prioridad y ordenarlas por fecha o nivel de prioridad, cumpliendo con los criterios de visualización solicitados.

-El proyecto utiliza localStorage para almacenar las tareas de manera persistente en el navegador. Cada vez que el usuario crea, edita, elimina o mueve una tarea, la información se guarda automáticamente. Al cargar la página, los datos almacenados se recuperan y se muestran nuevamente, permitiendo que el sistema conserve la información sin necesidad de una base de datos externa.

# Estructura de JSON:
La aplicación Tasky – Sistema de Gestión de Tareas utiliza el localStorage del navegador para almacenar las tareas de forma persistente. La información se guarda bajo la clave tasks, cuyo valor es un arreglo de objetos en formato JSON. Cada objeto representa una tarea individual dentro del sistema.

La estructura del JSON está compuesta por varios campos que describen completamente una tarea. El campo id es un número único que permite identificar cada tarea de manera individual; este valor se genera utilizando Date.now() o se reutiliza cuando la tarea es editada. El campo title almacena el título de la tarea y es de tipo texto. El campo subject indica la materia o área asignada a la tarea, también en formato de texto.

El campo dueDate guarda la fecha límite de entrega en formato YYYY-MM-DD, lo que permite ordenar y comparar fechas correctamente dentro del sistema. El campo priority define el nivel de importancia de la tarea y puede tomar los valores Alta, Media o Baja, los cuales se utilizan tanto para el ordenamiento como para la visualización mediante colores.

El campo status representa el estado actual de la tarea dentro del tablero Kanban y puede ser Pendiente, Entregada o Retrasada. Este valor determina en qué columna se mostrará la tarea dentro de la interfaz. Finalmente, el campo description contiene una descripción detallada de la tarea y permite ampliar la información más allá del título.

Todas las tareas se almacenan dentro de un arreglo JSON y se guardan en el localStorage utilizando JSON.stringify(). Cuando la aplicación se carga, los datos se recuperan mediante JSON.parse() y se renderizan automáticamente en la interfaz, permitiendo que la información persista incluso después de cerrar o recargar el navegador.

