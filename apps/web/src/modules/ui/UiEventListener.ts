import { Listener } from '@/infrastructure/Decorators/Listener';

@Listener('test')
export class UiEventListener {
    public handle(test: any) {
        console.log(test);
    }
}
