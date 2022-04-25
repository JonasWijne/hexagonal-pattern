import { injectable } from 'tsyringe';
import { ServiceBus } from '@/infrastructure/Concrete/ServiceBus';
import { InitUiCommand } from '@/modules/Ui/Commands/InitUiCommand';
import { ServiceResponseStatus } from '@/infrastructure/Concrete/ServiceResponse';

@injectable()
export class App {}
