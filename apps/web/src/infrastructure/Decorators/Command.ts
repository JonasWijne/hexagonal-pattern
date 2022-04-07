import {ServiceBus} from "@/infrastructure/Concrete/ServiceBus";

export const Command = (target: any) => {
    target.prototype.getName = () => target.name;
};
