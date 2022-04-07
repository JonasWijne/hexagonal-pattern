import { InitUiCommandHandler } from '@/modules/ui/CommandHandlers/InitUiCommandHandler';
import { Module } from '@/infrastructure/Decorators/Module';

@Module({
    provides: [InitUiCommandHandler],
})
export class UiModule {}
