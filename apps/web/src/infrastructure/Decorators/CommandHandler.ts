import { ServiceBus } from '@/infrastructure/Concrete/ServiceBus';
import { container } from 'tsyringe';

export const CommandHandler = (command: any) => {
    return (target: any) => {
        const token = `CommandHandler.${target.name}`;

        container.register(token, {
            useClass: target,
        });

        // @ts-ignore
        const serviceBus = container.resolve(ServiceBus);

        serviceBus.register(command.name, token);
    };
};
