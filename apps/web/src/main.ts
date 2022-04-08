import 'reflect-metadata';

import { container } from 'tsyringe';
import { UiModule } from '@/modules/ui/UiModule';
import { App } from '@/infrastructure/App';

const init = async () => {
    UiModule;
    const app = container.resolve(App);
    app.run();
};

init();
