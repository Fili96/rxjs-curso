import { Observable, Observer, Subject } from 'rxjs';

const observer: Observer<any> = {
    next: value => console.log(`siguiente: ${value}`),
    error: error => console.warn(`error: ${error}`),
    complete: () => console.log("Completado")
}

const intervalo$ = new Observable<number>( subs => {

    const intervaloID = setInterval( () => {
        subs.next( Math.random() )
    }, 1000);

    return () => {
        clearInterval( intervaloID );
        console.log("Intervalo destruido");
    }

});

/**
 * 1- Casteo multiple
 * 2- Es Observable y tTambien es un observer
 * 3- Next, error y complete
 */
const subject$ = new Subject<any>();
const subscripcion = intervalo$.subscribe( subject$ );

// const subs1 = intervalo$.subscribe( rnd  => console.log(`subs1: ${rnd}`) )
// const subs2 = intervalo$.subscribe( rnd  => console.log(`subs2: ${rnd}`) )

const subs1 = subject$.subscribe( observer )
const subs2 = subject$.subscribe( observer )

setTimeout( ()=> {

    subject$.next(10);
    subject$.complete()

    subscripcion.unsubscribe();

}, 3500 );