import {
  animate,
  style,
  state,
  transition,
  trigger
} from '@angular/animations';

export const fundido = trigger('fadeIn', [
  // state('*', style({
  //   opacity: 1
  // })),
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate('500ms linear')
  ])
]);

// ,
// transition(':leave', [
//   animate('500ms linear', style({
//     opacity: 0
//   }))
// ])
