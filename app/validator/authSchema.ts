import vine from "@vinejs/vine";

export const RegisterSchema = vine.object({
  name: vine.string().trim().maxLength(20),
  email: vine.string().email(),
  password: vine.string().minLength(6).maxLength(20),
});
