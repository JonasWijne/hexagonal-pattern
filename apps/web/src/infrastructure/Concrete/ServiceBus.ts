import { IServiceCall } from '@/infrastructure/Interfaces/IServiceCall';
import { ServiceResponse } from '@/infrastructure/Concrete/ServiceResponse';
import { IServiceCallHandler } from '@/infrastructure/Interfaces/IServiceCallHandler';
import { MiddlewareChain } from '@/infrastructure/Concrete/MiddlewareChain';
import { container, InjectionToken, singleton } from 'tsyringe';

@singleton()
export class ServiceBus {
    private readonly handlers: Map<
        string,
        InjectionToken<IServiceCallHandler<IServiceCall<any | undefined>, ServiceResponse<any | undefined>>>
    >;
    private readonly _middlewareChain: MiddlewareChain<IServiceCall<any | undefined>, ServiceResponse<any | undefined>>;

    constructor(middlewareChain: MiddlewareChain<IServiceCall<any | undefined>, ServiceResponse<any | undefined>>) {
        this.handlers = new Map();
        this._middlewareChain = middlewareChain;
    }

    public addMiddleware(middleware: any) {
        this._middlewareChain.add(middleware);
    }

    public register(
        serviceCallName: string,
        handler: InjectionToken<IServiceCallHandler<IServiceCall<any | undefined>, ServiceResponse<any | undefined>>>
    ): void {
        console.log(serviceCallName, handler);
        this.handlers.set(serviceCallName, handler);
    }

    public async handle<T extends IServiceCall<any | undefined>, U>(input: T): Promise<ServiceResponse<U | Error>> {
        const name = input.constructor.name; // getName is not defined on the interface but is added to the class by a decorator

        const token = this.handlers.get(name);
        if (!token) {
            const error = new Error('CommandHandler not found for command: ' + name);
            return ServiceResponse.failure(error);
        }
        const handler = container.resolve(token);

        if (!handler) {
            const error = new Error('CommandHandler not found for command: ' + name);
            return ServiceResponse.failure(error);
        }

        const handleFunction = handler.handle;
        return this._middlewareChain.execute(input, handleFunction);
    }
}
