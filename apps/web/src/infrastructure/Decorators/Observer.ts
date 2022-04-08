import { container } from 'tsyringe';
import { EventBus } from '@/infrastructure/Concrete/EventBus';

export const Observer = (eventName: string) => {
    return (target: any) => {
        container.register(`Observer.${target.name}`, {
            useClass: target,
        });

        container.resolve(EventBus).subscribe(eventName, `Observer.${target.name}`);
    };
};
