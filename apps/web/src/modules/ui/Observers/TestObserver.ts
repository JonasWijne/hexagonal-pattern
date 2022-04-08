import { IObserver } from '@/infrastructure/Interfaces/IObserver';
import { injectable } from 'tsyringe';
import { ServiceBus } from '@/infrastructure/Concrete/ServiceBus';
import { InitUiCommand } from '@/modules/ui/Commands/InitUiCommand';
import { Observer } from '@/infrastructure/Decorators/Observer';

@injectable()
@Observer('test')
export class TestObserver implements IObserver {
    private _serviceBus: ServiceBus;

    constructor(serviceBus: ServiceBus) {
        this._serviceBus = serviceBus;
    }

    execute(): void {
        alert('TestObserver');
    }
}
