import { injectable } from 'tsyringe';
import { ServiceBus } from '@/infrastructure/Concrete/ServiceBus';
import { InitUiCommand } from '@/modules/Ui/Commands/InitUiCommand';
import { ServiceResponseStatus } from '@/infrastructure/Concrete/ServiceResponse';
import { EventBus } from '@/infrastructure/Concrete/EventBus';

@injectable()
export class AppService {
    private _serviceBus: ServiceBus;
    private _eventBus: EventBus;

    constructor(serviceBus: ServiceBus, eventBus: EventBus) {
        this._serviceBus = serviceBus;
        this._eventBus = eventBus;
    }

    public async run(): Promise<void> {
        console.log('App running');
        const response = await this._serviceBus.handle(new InitUiCommand('#app'));

        this._eventBus.subscribe(`onAfter${InitUiCommand.name}`, (data: any) => {
            console.log('onAfterInitUiCommand', data);
        });
        console.log(response);
        if (response.status === ServiceResponseStatus.ERROR) {
            console.log('App failed');
        }
    }
}
