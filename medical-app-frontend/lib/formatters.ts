/**
 * Formatea fechas al estilo: 14 de Mayo, 2026
 */
export const formatDate = (date: string | Date) => {
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
};

/**
 * Capitaliza nombres de medicamentos o pacientes
 */
export const capitalize = (text: string) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};