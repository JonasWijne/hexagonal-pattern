import { Module } from '@/infrastructure/Decorators/Module';
import { UiModule } from '@/modules/Ui/UiModule';
import { LogMiddleware } from '@/modules/Core/LogMiddleware';
import { HookEventMiddleware } from '@/modules/Core/HookEventMiddleware';

@Module({
    provides: [LogMiddleware, HookEventMiddleware],
    imports: [UiModule],
})
export class CoreModule {
    static bootstrap() {
        console.log('CoreModule bootstrapped');
    }
}
