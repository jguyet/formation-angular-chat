import { ChannelMessage } from "./channel-message";
 
export class Channel {
    constructor(
        public title: string,
        public messages: ChannelMessage[],
        public picture: string
    ) {}
}