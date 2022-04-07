import {ServiceBus} from "@/infrastructure/Concrete/ServiceBus";
import {InitUiCommand} from "@/modules/ui/Commands/InitUiCommand";
import {UiModule} from "@/modules/ui/UiModule";

const init = async () => {
    UiModule.bootstrap()
    const initUiCommand = new InitUiCommand();
    const serviceBus = ServiceBus.getInstance();
    const response = await serviceBus.handle(initUiCommand);
};

init();
