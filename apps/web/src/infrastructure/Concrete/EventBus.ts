import { container, InjectionToken, singleton } from 'tsyringe';
import { IObserver } from '@/infrastructure/Interfaces/IObserver';

@singleton()
export class EventBus {
    private readonly observers: { [key: string]: InjectionToken<IObserver>[] } = {};

    constructor() {
        this.observers = {};
    }

    subscribe(eventName: string, listener: InjectionToken<IObserver>) {
        if (!this.observers[eventName]) {
            this.observers[eventName] = [];
        }
        this.observers[eventName].push(listener);
    }

    publish(eventName: string, args?: any) {
        if (!this.observers[eventName]) {
            return;
        }
        this.observers[eventName].forEach(observer => {
            container.resolve(observer).execute(args);
        });
    }
}
