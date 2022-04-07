import {IServiceCallHandler} from "@/infrastructure/Interfaces/IServiceCallHandler";
import {IQuery} from "@/infrastructure/Interfaces/IQuery";
import {ServiceResponse} from "@/infrastructure/Concrete/ServiceResponse";

export type IQueryHandler<T extends IQuery<any>, U extends ServiceResponse<any>> = IServiceCallHandler<T, U>

