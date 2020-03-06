import { BehaviorSubject, Subject } from "rxjs";
import { switchMap, tap } from "rxjs/operators";

describe('rxjs test', () => {

  test('rxjs direct output', async () => {

    const observable: Subject<boolean> = new Subject()

    observable.pipe(
      tap((value: boolean) => console.log(value)),
      switchMap(async (value: boolean) => {
        return await new Promise(resolve => {
          setTimeout(() => resolve(true), 100)
        })
      }),
    )
      .subscribe({
        next: (result: boolean) => console.log("subscribe function with value: " + result)
      });

    await observable.next(true)

  })

})

