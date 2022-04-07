import {ServiceBus} from "@/infrastructure/Concrete/ServiceBus";
import {UiModule} from "@/modules/ui/UiModule";
import {InitUiCommand} from "@/modules/ui/Commands/InitUiCommand";

const init = async () => {
    UiModule.bootstrap();

    const initUiCommand = new InitUiCommand();
    const serviceBus = ServiceBus.getInstance();
    await serviceBus.handle(initUiCommand);
};

init();
