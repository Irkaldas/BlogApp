import {
    trigger,
    transition,
    style,
    query,
    group,
    animateChild,
    animate,
    keyframes,
    state
} from '@angular/animations';

export const toggleNavBar =
    trigger('toggleNavBar',
        [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateX(-100%)' }),
                animate('200ms', style({ opacity: 1, transform: 'translateX(0%)' })),
            ]),
            transition(':leave', [
                animate('200ms', style({ opacity: 0, transform: 'translateX(-100%)' }))
            ])
        ]);
