import {ICommand} from "@/infrastructure/Interfaces/ICommand";

export class InitUiCommand implements ICommand<any> {
    name = "InitUiCommand";
    payload = null;
}
