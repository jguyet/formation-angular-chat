import { Observable } from "rxjs";

export const myOf = (... args: string[]): Observable<string> => {
    return new Observable((subject) => {
        args.forEach((value, index) => {
            // emition de la valeur.
            subject.next(value);

            if (index == args.length - 1) { // au dernier element complete.
                subject.complete();
            }
        });
    });
};