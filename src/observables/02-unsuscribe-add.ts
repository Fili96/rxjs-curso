import { Observable, Observer } from 'rxjs';

const observer: Observer<any> = {
    next: value => console.log(`siguiente: ${value}`),
    error: error => console.warn(`error: ${error}`),
    complete: () => console.log("Completado")
}


const intervalo$ = new Observable<number>( suscriber => {

    let cont: number = 0;
    
    // Cada segundo emite el contenido
    const intervalo = setInterval( () =>{
        cont += 1;
        // suscriber emite el contador
        suscriber.next(cont);
        console.log(cont);
    }, 1000);

    // Retardo de 2.5s
    setTimeout( () => {
        suscriber.complete();
    }, 2500 );

    return () => {
        clearInterval(intervalo);
        console.log("Intervalo destruido");
    }

});

const subscripcion1 = intervalo$.subscribe(observer);
const subscripcion2 = intervalo$.subscribe(observer);
const subscripcion3 = intervalo$.subscribe(observer);

// Retardo de 6s
setTimeout( () => {

    subscripcion1.add(subscripcion2)
                 .add(subscripcion3)
    subscripcion1.unsubscribe()
    // subscripcion2.unsubscribe()
    // subscripcion3.unsubscribe()

    console.log("Completado Timeout");
}, 6000);