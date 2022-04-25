import { Middleware } from '@/infrastructure/Decorators/Middleware';
import { IMiddleware } from '@/infrastructure/Interfaces/IMiddleware';
import { NextFunction } from '@/infrastructure/Concrete/MiddlewareChain';
import { injectable } from 'tsyringe';
import { EventBus } from '@/infrastructure/Concrete/EventBus';

@Middleware()
@injectable()
export class HookEventMiddleware implements IMiddleware<any, any> {
    private _eventBus: EventBus;

    constructor(eventBus: EventBus) {
        this._eventBus = eventBus;
    }

    async handle(request: any, next: NextFunction<any>): Promise<any> {
        const name = request?.constructor?.name;

        if (!name) {
            return next();
        }

        console.log(`event: onBefore${name}`);
        this._eventBus.publish(`onBefore${name}`, request);
        const response = await next();
        console.log(`event: onAfter${name}`);
        this._eventBus.publish(`onAfter${name}`, { request, response });

        return response;
    }
}
