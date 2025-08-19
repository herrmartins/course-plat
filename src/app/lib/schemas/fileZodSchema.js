import z from "zod";

export const fileZodSchema = z.object({
  _id: z.string({ invalid_type_error: "Classe não encontrada" }).optional(),
  title: z
    .string({
      invalid_type_error: "O título deve conter letras.",
    })
    .min(3, {
      message: "O título deve ter no mínimo 3 caracteres.",
    }),
  mimetype: z
    .string({
      invalid_type_error: "Tipo de mimetype incorreto, deve ser uma string",
    })
    .optional(),
  url: z.url({
    protocol: /^https?$/,
    hostname: /^[a-z0-9.-]+\.(com|org)$/i,
    normalize: true,
    error: "O url deve ser uma URL válida com https e domínio correto",
  }),
  size: z.number({
    invalid_type_error: "O tamanho do arquivo deve ser numérico",
  }),
  relatedToId: z.string().optional(),
  relatedToType: z.enum(["class", "classTypes", "loose"]).optional(),
uploadedBy: z.string(),
  description: z.string().optional(),
});
