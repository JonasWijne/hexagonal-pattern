import { EventBus } from '@/infrastructure/Concrete/EventBus';

export const Listener = (eventName: string) => {
    return (target: any): void => {
        EventBus.getInstance().subscribe(eventName, new target());
    };
};
