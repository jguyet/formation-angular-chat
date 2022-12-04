export class ChannelMessage {
    constructor(
        public id: string,
        public userId: string,
        public message: string,
        public timestamp: number,
        public updated?: boolean,
        public deleted?: boolean
    ) {}
}