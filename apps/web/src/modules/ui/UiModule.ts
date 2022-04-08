import { InitUiCommandHandler } from '@/modules/ui/CommandHandlers/InitUiCommandHandler';
import { Module } from '@/infrastructure/Decorators/Module';
import { TestObserver } from '@/modules/ui/Observers/TestObserver';

@Module({
    provides: [InitUiCommandHandler, TestObserver],
})
export class UiModule {}
