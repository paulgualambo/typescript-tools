import { z } from "zod";
import { AppError } from "./common/process-code/error-code";
import { ProcessCodes } from "./common/process-code/process-codes";
import { PersonaRequest } from "./persona-request";
import { Result, STATUS } from "./common/result";

export class PersonRequestValidator {
    private skillSchema = z.object({
        nombre: z.string().min(1),
        descripcion: z.string().optional(),
    });
    
    private personaRequestSchema = z.object({
        nombre: z.string().min(1),
        apellidos: z.string().min(1),
        fechaNacimiento: z.date().refine(date => date <= new Date(), {
            message: "Birth date cannot be in the future",
        }),
        pais: z.string().min(1),
        correo: z.string().email(),
        telefono: z.string().min(1),
        hobbies: z.array(z.string()).optional(),
        skills: z.array(this.skillSchema).optional(),
        experienciaAnios: z.number().optional(),
        activo: z.boolean(),
    });

    public execute(request: PersonaRequest): Result<PersonaRequest> {
        const dataVerificada = this.personaRequestSchema.safeParse(request);
        if (!dataVerificada.success) {
            throw new AppError(
                {
                    codeError: ProcessCodes.ERROR_REQUEST_DATA,
                    message: JSON.stringify(dataVerificada.error.errors)
                }
            )
        }
        return new Result<PersonaRequest>(request, STATUS.SUCCESS)
    }
}