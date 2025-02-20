import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { DomainService } from "../services/domain.service";
import { BaseHandler } from "../handlers/myHandler/myHandler";



export const initContainer = () => {
    // Aquí podrías tener más importaciones si tienes más servicios
    const container = new Container();
    // Registramos el servicio de dominio
    container.bind<DomainService>(TYPES.DomainService).to(DomainService).inSingletonScope();
    container.bind<BaseHandler>(TYPES.BaseHandler).to(BaseHandler).inSingletonScope();

    return container
}
