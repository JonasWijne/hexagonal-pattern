import { ICommandHandler } from '@/infrastructure/Interfaces/ICommandHandler';
import { InitUiCommand } from '@/modules/ui/Commands/InitUiCommand';
import { ServiceResponse, VoidResponse } from '@/infrastructure/Concrete/ServiceResponse';
import { CommandHandler } from '@/infrastructure/Decorators/CommandHandler';

import App from '../App.vue';
import { createApp } from 'vue';
import { IServiceCallHandler } from '@/infrastructure/Interfaces/IServiceCallHandler';

@CommandHandler(InitUiCommand)
export class InitUiCommandHandler implements IServiceCallHandler<InitUiCommand, VoidResponse> {
    async handle(): Promise<VoidResponse> {
        const app = createApp(App);

        app.mount('#app');
        return ServiceResponse.success();
    }
}
