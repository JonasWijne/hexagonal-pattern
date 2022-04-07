import { ICommand } from '@/infrastructure/Interfaces/ICommand';
import { Command } from '@/infrastructure/Decorators/Command';

@Command
export class InitUiCommand implements ICommand<any> {
    // name = "InitUiCommand";
    payload = null;
}
