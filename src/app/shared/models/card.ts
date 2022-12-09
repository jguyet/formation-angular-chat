export class Card {
    public id?: string;
    constructor(
        public title: string,
        public description: string,
        public price: number,
        public type: string
    ) { }
}