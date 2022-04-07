import { IServiceCallHandler } from '@/infrastructure/Interfaces/IServiceCallHandler';
import { ServiceResponse, VoidResponse } from '@/infrastructure/Concrete/ServiceResponse';
import { ICommand } from '@/infrastructure/Interfaces/ICommand';

export type ICommandHandler<
    T extends ICommand<any>,
    U extends ServiceResponse<any> | VoidResponse
> = IServiceCallHandler<T, U>;
