import { IServiceCall } from '@/infrastructure/Interfaces/IServiceCall';
import { ServiceResponse } from '@/infrastructure/Concrete/ServiceResponse';
import { IServiceCallHandler } from '@/infrastructure/Interfaces/IServiceCallHandler';
import { MiddlewareChain } from '@/infrastructure/Concrete/MiddlewareChain';

export class ServiceBus {
    private readonly handlers: Map<
        string,
        IServiceCallHandler<IServiceCall<any | undefined>, ServiceResponse<any | undefined>>
    >;
    private readonly middlewareChain: MiddlewareChain<IServiceCall<any | undefined>, ServiceResponse<any | undefined>>;
    private static instance: ServiceBus;

    private constructor() {
        this.handlers = new Map();
        this.middlewareChain = new MiddlewareChain();
    }

    public addMiddleware(middleware: any) {
        this.middlewareChain.add(middleware);
    }

    public register(serviceCallName: string, handler: IServiceCallHandler<any, any>): void {
        this.handlers.set(serviceCallName, handler);
    }

    public async handle<T extends IServiceCall<any | undefined>, U>(input: T): Promise<ServiceResponse<U | Error>> {
        // @ts-ignore
        const name = input.getName(); // getName is not defined on the interface but is added to the class by a decorator
        const handler = this.handlers.get(name);
        if (!handler) {
            const error = new Error('CommandHandler not found for command: ' + name);
            return ServiceResponse.failure(error);
        }

        const handleFunction = handler.handle;
        return this.middlewareChain.execute(input, handleFunction);
    }

    public static getInstance(): ServiceBus {
        if (!ServiceBus.instance) {
            ServiceBus.instance = new ServiceBus();
        }
        return ServiceBus.instance;
    }
}
