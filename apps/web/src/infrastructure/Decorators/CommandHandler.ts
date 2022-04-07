import {ServiceBus} from "@/infrastructure/Concrete/ServiceBus";

export const CommandHandler = (command: any) => {
    return (target: any) => {
        ServiceBus.getInstance().register(command.name, new target());
    }
};
