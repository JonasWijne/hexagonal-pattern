import { Middleware } from '@/infrastructure/Decorators/Middleware';
import { IMiddleware } from '@/infrastructure/Interfaces/IMiddleware';
import { NextFunction } from '@/infrastructure/Concrete/MiddlewareChain';

@Middleware()
export class LogMiddleware implements IMiddleware<any, any> {
    async handle(request: any, next: NextFunction<any>): Promise<any> {
        return next();
    }
}
