import { container, InjectionToken, singleton } from 'tsyringe';
import { IObserver } from '@/infrastructure/Interfaces/IObserver';

export type ObserverFunction<T> = (event: T) => void;

@singleton()
export class EventBus {
    private readonly observers: { [key: string]: (InjectionToken<IObserver> | ObserverFunction<any>)[] } = {};

    constructor() {
        this.observers = {};
    }

    subscribe(eventName: string, listener: InjectionToken<IObserver> | ObserverFunction<any>): void {
        if (!this.observers[eventName]) {
            this.observers[eventName] = [];
        }
        this.observers[eventName].push(listener);
    }

    publish(eventName: string, args?: any): void {
        if (!this.observers[eventName]) {
            return;
        }
        this.observers[eventName].forEach(observer => {
            if (typeof observer === 'function') {
                (<ObserverFunction<any>>observer)(args);
                return;
            }
            container.resolve(observer).execute(args);
        });
    }
}
