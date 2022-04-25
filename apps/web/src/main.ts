import 'reflect-metadata';

import { container } from 'tsyringe';
import { App } from '@/infrastructure/App';
import { CoreModule } from '@/modules/Core/CoreModule';
import { AppService } from '@/modules/App/AppService';

const init = async () => {
    CoreModule.bootstrap();
    const appService = container.resolve(AppService);
    appService.run();
};

init();
