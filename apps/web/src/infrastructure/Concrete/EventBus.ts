interface IListerner {
    (event: any): void;
}

export class EventBus {
    private readonly listeners: { [key: string]: IListerner[] } = {};
    private static instance: EventBus;

    constructor() {
        this.listeners = {};
    }

    subscribe(eventName: string, listener: IListerner) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(listener);
    }
    publish(eventName: string, args?: any) {
        if (!this.listeners[eventName]) {
            return;
        }
        this.listeners[eventName].forEach(listener => listener(args));
    }

    static getInstance() {
        if (!EventBus.instance) {
            EventBus.instance = new EventBus();
        }
        return EventBus.instance;
    }
}
