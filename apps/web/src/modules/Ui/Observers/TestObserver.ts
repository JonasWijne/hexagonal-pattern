import { IObserver } from '@/infrastructure/Interfaces/IObserver';
import { Observer } from '@/infrastructure/Decorators/Observer';
import { InitUiCommand } from '@/modules/Ui/Commands/InitUiCommand';

@Observer(`onAfter${InitUiCommand.name}`)
export class TestObserver implements IObserver {
    execute(data?: any): void {
        console.table(data);
        console.log(`TestObserver: ${data}`);
    }
}
