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
2. Completa opcionalmente las fechas de inicio, fin y el recordatorio antes de agregar.
3. Verifica que la tarea y sus fechas aparezcan en la lista.
4. Marca la tarea como completada con el checkbox (debe cambiar el estilo).
5. Al completarla, la tarea desaparece de la lista de pendientes.
6. Presiona **Editar** para modificar el texto o las fechas y guarda los cambios.
7. Presiona **Eliminar** para quitar una tarea.
8. Recarga la página y confirma que las tareas persisten.

## Uso de fechas y recordatorios

- **Inicio** y **Fin** usan un selector de fecha simple.
- **Recordatorio** permite elegir fecha y hora, pero en esta versión solo se guarda y se muestra en pantalla (no dispara alarmas).
