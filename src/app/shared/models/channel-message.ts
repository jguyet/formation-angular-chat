export class ChannelMessage {
    constructor(
        public id: string,
        public userId: string,
        public email: string,
        public picture: string,
        public message: string,
        public timestamp: string,
        public updated?: boolean,
        public deleted?: boolean,
        public recent?: boolean
    ) {}
}