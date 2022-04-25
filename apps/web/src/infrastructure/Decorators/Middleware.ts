import { container } from 'tsyringe';
import { ServiceBus } from '@/infrastructure/Concrete/ServiceBus';
import { EventBus } from '@/infrastructure/Concrete/EventBus';

export const Middleware = () => {
    return (target: any) => {
        const middlewareToken = `Middleware.${target.name}`;
        container.register(middlewareToken, {
            useClass: target,
        });

        const serviceBus = container.resolve(ServiceBus);
        serviceBus.addMiddleware(middlewareToken);
    };
};
