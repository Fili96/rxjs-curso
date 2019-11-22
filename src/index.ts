import { Observable, Observer } from 'rxjs';

const observer: Observer<any> = {
    next: value => console.log(`siguiente [next]: ${value}`),
    error: error => console.warn(`error [obs]: ${error}`),
    complete: () => console.log("Completado [obs]")
}

const obs$ = new Observable<string>( subs => {

    subs.next('Hola');
    subs.next('Mundo');
    subs.next("Angel");

    // Forzar un error
    const persona = undefined;
    persona.nombre = "Angel";

    subs.complete();

    subs.next('Este mensaje ya no deberia emitirse');

});

// obs$.subscribe(
//     valor => console.log(`next: ${valor}`),
//     error => console.warn(`error: ${error}`),
//     () => console.log("Completado")
// );

obs$.subscribe( observer );