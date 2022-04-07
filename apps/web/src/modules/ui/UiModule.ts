import {ServiceBus} from "@/infrastructure/Concrete/ServiceBus";
import {InitUiCommandHandler} from "@/modules/ui/CommandHandlers/InitUiCommandHandler";

export class UiModule{
    public static bootstrap(){
        console.log('UiModule.bootstrap');

        const instance = ServiceBus.getInstance();

        instance.register('InitUiCommand', new InitUiCommandHandler())
    }
}
