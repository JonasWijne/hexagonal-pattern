import {ServiceResponse, VoidResponse} from "@/infrastructure/Concrete/ServiceResponse";
import {IServiceCall} from "@/infrastructure/Interfaces/IServiceCall";

export interface IServiceCallHandler<T extends IServiceCall<any | undefined>, U extends ServiceResponse<any | undefined> | VoidResponse> {
    handle(input: T | undefined): Promise<U>;
}


