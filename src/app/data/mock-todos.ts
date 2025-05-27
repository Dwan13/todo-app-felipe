import { TodoViewModel } from '../presentation/viewmodels/todo.viewmodel';

export const MOCK_TODOS: TodoViewModel[] = [
  {
    id: '1',
    title: 'Comprar víveres',
    description: 'Leche, huevos, pan, frutas y verduras.',
    completed: false,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)), // Creada hace 1 día
  },
  {
    id: '2',
    title: 'Pagar facturas',
    description: 'Electricidad, agua e internet.',
    completed: false,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 5)), // Creada hace 5 días
  },
  {
    id: '3',
    title: 'Llamar al médico',
    description: 'Confirmar cita para el chequeo anual.',
    completed: true,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)), // Completada hace 2 días
  },
  {
    id: '4',
    title: 'Preparar presentación',
    description: 'Diapositivas para la reunión del lunes.',
    completed: false,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 10)), // Creada hace 10 días (vieja)
  },
  {
    id: '5',
    title: 'Hacer ejercicio',
    description: 'Rutina de 30 minutos.',
    completed: false,
    createdAt: new Date(), // Creada hoy
  },
  {
    id: '6',
    title: 'Leer libro',
    description: 'Capítulo 3 de "Cien años de soledad".',
    completed: false,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 3)), // Creada hace 3 días
  },
];