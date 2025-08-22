import z from "zod";

export const classSchema = z.object({
  _id: z.string({ invalid_type_error: "Classe não encontrada" }).optional(),
  classTitle: z.string({ invalid_type_error: "Título inválido" }),
  classType: z.string({ invalid_type_error: "Tipo de Classe Inválido" }),
  teachers: z.array(z.string({ invalid_type_error: "Professores inválidos" })),
  students: z.array(z.string({ invalid_type_error: "Alunos inválidos" })),
  startDate: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
  endDate: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
  schedule: z
    .object({
      days: z
        .array(z.string({ invalid_type_error: "Dias inválidos" }))
        .optional(),
      time: z
        .string()
        .regex(
          /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
          "Formato de horário inválido. Use HH:MM"
        ),
    })
    .optional(),
  price: z.number({ invalid_type_error: "Mensalidade inválida" }),
  inheritFiles: z.boolean().default(false),
  files: z
    .array(z.string({ invalid_type_error: "Arquivos inválidos" }))
    .optional(),
  status: z.string({ invalid_type_error: "Status incorreto" }),
});
