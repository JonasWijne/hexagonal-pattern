import { InitUiCommandHandler } from '@/modules/ui/CommandHandlers/InitUiCommandHandler';
import { Module } from '@/infrastructure/Decorators/Module';
import { UiEventListener } from '@/modules/ui/UiEventListener';

@Module({
    provides: [InitUiCommandHandler, UiEventListener],
})
export class UiModule {}
