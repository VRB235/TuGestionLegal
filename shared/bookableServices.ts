// All bookable services for the reservation form
// Only asesorías are bookable online

export interface BookableService {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
}

export const SERVICE_CATEGORIES = [
  {
    id: "asesorias",
    label: "Asesorías",
    services: [
      { id: "asesoria-videoconferencia", name: "Asesoría por Videoconferencia" },
      { id: "asesoria-inmobiliaria", name: "Asesoría Inmobiliaria" },
    ],
  },
] as const;

export const ALL_BOOKABLE_SERVICES: BookableService[] = SERVICE_CATEGORIES.flatMap(
  (cat) =>
    cat.services.map((s) => ({
      id: s.id,
      name: s.name,
      category: cat.id,
      categoryLabel: cat.label,
    }))
);
