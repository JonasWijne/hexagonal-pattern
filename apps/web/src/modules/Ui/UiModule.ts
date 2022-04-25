import { InitUiCommandHandler } from '@/modules/Ui/CommandHandlers/InitUiCommandHandler';
import { Module } from '@/infrastructure/Decorators/Module';
import { TestObserver } from '@/modules/Ui/Observers/TestObserver';

@Module({
    provides: [InitUiCommandHandler, TestObserver],
    imports: [],
})
export class UiModule {}
