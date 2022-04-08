import { ServiceBus } from '@/infrastructure/Concrete/ServiceBus';
import { container } from 'tsyringe';

export const CommandHandler = (command: any) => {
    return (target: any) => {
        container.register(`CommandHandler.${target.name}`, {
            useClass: target,
        });
        // @ts-ignore
        container.resolve(ServiceBus).register(command.name, `CommandHandler.${target.name}`);
    };
};
