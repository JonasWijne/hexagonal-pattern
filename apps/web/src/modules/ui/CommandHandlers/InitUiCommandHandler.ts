import {ICommandHandler} from "@/infrastructure/Interfaces/ICommandHandler";
import {InitUiCommand} from "@/modules/ui/Commands/InitUiCommand";
import {ServiceResponse, VoidResponse} from "@/infrastructure/Concrete/ServiceResponse";

import App from '../App.vue';
import { createApp } from 'vue';


export class InitUiCommandHandler implements ICommandHandler<InitUiCommand, VoidResponse> {
    async handle(): Promise<VoidResponse> {

        const app = createApp(App);

        app.mount('#app');
        return ServiceResponse.success()
    }
}
