type NextFunction = (...args: any[]) => any;

interface IMiddleware {
    handle(request: any, next: NextFunction): Promise<any>;
}

export class MiddlewareChain<T, U> {
    private middlewares: IMiddleware[] = [];

    public add(middleware: IMiddleware): void {
        this.middlewares.push(middleware);
    }

    async execute(input: T | undefined, handleFunction: (input: T | undefined) => Promise<U>): Promise<U> {
        let index = 0;
        const next = (nextInput: T | undefined) => {
            if (index === this.middlewares.length) {
                return handleFunction(nextInput);
            }
            const middleware = this.middlewares[index++];
            return middleware.handle(nextInput, next);
        };
        return next(input);
    }
}
