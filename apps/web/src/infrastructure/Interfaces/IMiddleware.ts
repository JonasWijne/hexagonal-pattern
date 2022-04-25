import { NextFunction } from '@/infrastructure/Concrete/MiddlewareChain';
import { ServiceResponse } from '@/infrastructure/Concrete/ServiceResponse';

export interface IMiddleware<T, U> {
    handle(request: T, next: NextFunction<T>): Promise<Promise<ServiceResponse<U | Error>>>;
}
