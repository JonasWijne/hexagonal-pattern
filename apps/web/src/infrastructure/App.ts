import { injectable } from 'tsyringe';
import { ServiceBus } from '@/infrastructure/Concrete/ServiceBus';
import { InitUiCommand } from '@/modules/ui/Commands/InitUiCommand';
import { ServiceResponseStatus } from '@/infrastructure/Concrete/ServiceResponse';

@injectable()
export class App {
    private _serviceBus: ServiceBus;

    constructor(serviceBus: ServiceBus) {
        this._serviceBus = serviceBus;
    }

    public async run(): Promise<void> {
        console.log('App running');
        const response = await this._serviceBus.handle(new InitUiCommand());
        console.log(response);
        if (response.status === ServiceResponseStatus.ERROR) {
            console.log('App failed');
        }
    }
}
