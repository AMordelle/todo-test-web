# ToDo Test Web

Aplicación web simple para gestionar tareas, pensada para pruebas manuales rápidas.

## Requisitos previos

- Tener instalado un navegador web moderno.
- Tener instalado Python 3 (para levantar un servidor local de archivos estáticos).

## Instalación

No requiere dependencias adicionales.

## Ejecutar la app

1. Desde la raíz del repositorio, inicia un servidor local:

```bash
python -m http.server 8000
```

2. Abre en tu navegador:

```
http://localhost:8000
```

## Cómo probar las funciones principales

1. Escribe una tarea en el input y presiona **Agregar** o **Enter**.
2. Verifica que la tarea aparezca en la lista.
3. Marca la tarea como completada con el checkbox (debe cambiar el estilo).
4. Presiona **Eliminar** para quitar una tarea.
5. Recarga la página y confirma que las tareas persisten.
