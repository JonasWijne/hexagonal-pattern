import { Module } from '@/infrastructure/Decorators/Module';
import { CoreModule } from '@/modules/Core/CoreModule';
import { AppService } from '@/modules/App/AppService';

@Module({
    imports: [CoreModule],
    provides: [AppService],
})
export class AppModule {}
