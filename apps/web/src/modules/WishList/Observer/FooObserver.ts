import { Observer } from '@/infrastructure/Decorators/Observer';
import { InitUiCommand } from '@/modules/Ui/Commands/InitUiCommand';
import { IObserver } from '@/infrastructure/Interfaces/IObserver';

@Observer(`onAfter${InitUiCommand}`)
export class FooObserver implements IObserver {
    execute(data?: any): void {
        console.log(data);
    }
}
