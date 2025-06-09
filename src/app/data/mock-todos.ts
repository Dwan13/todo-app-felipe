import { Task } from '../domain/entities/task.entity';
import { v4 as uuidv4 } from 'uuid';

/**
 * Array de tareas de ejemplo (mock) para propósitos de desarrollo y prueba.
 * Cada objeto en este array representa una tarea con sus propiedades básicas
 * y está tipado como `Todo`.
 */
export const MOCK_TODOS: Task[] = [
  {
    id: uuidv4(),
    title: 'Comprar víveres',
    description: 'Leche, huevos, pan, frutas y verduras.',
    completed: false,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)), // Creada hace 1 día
  },
  {
    id: uuidv4(),
    title: 'Pagar facturas',
    description: 'Electricidad, agua e internet.',
    completed: false,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 5)), // Creada hace 5 días
  },
  {
    id: uuidv4(),
    title: 'Llamar al médico',
    description: 'Confirmar cita para el chequeo anual.',
    completed: true,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)), // Completada hace 2 días
  },
  {
    id: uuidv4(),
    title: 'Preparar presentación',
    description: 'Diapositivas para la reunión del lunes.',
    completed: false,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 10)), // Creada hace 10 días (vieja)
  },
  {
    id: uuidv4(),
    title: 'Hacer ejercicio',
    description: 'Rutina de 30 minutos.',
    completed: false,
    createdAt: new Date(), // Creada hoy
  },
  {
    id: uuidv4(),
    title: 'Leer libro',
    description: 'Capítulo 3 de "Cien años de soledad".',
    completed: false,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 3)), // Creada hace 3 días
  },
];