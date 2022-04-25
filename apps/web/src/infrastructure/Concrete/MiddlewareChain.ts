import { IMiddleware } from '@/infrastructure/Interfaces/IMiddleware';
import { container, InjectionToken } from 'tsyringe';
import { ServiceResponse } from '@/infrastructure/Concrete/ServiceResponse';

export type NextFunction<T> = () => Promise<ServiceResponse<T | Error>>;

export class MiddlewareChain {
    private middlewares: InjectionToken<IMiddleware<any, any>>[] = [];

    public add(middleware: InjectionToken<IMiddleware<any, any>>): void {
        this.middlewares.push(middleware);
    }

    async execute<T, U>(
        input: T | undefined,
        handleFunction: (input: T | undefined) => Promise<ServiceResponse<U | Error>>
    ): Promise<ServiceResponse<U | Error>> {
        let index = 0;
        const next = (nextInput: T | undefined): Promise<ServiceResponse<U | Error>> => {
            if (index === this.middlewares.length) {
                return handleFunction(nextInput);
            }
            const middleware: IMiddleware<T | undefined, U> = container.resolve(this.middlewares[index++]);
            // @ts-ignore
            return middleware.handle(nextInput, () => <any>next(nextInput));
        };
        return next(input);
    }
}
