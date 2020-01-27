import Vue                                  from 'vue';
import { PluginObject, PluginFunction }     from 'vue';

// augment vue for typescript
declare module 'vue/types/vue' {
    export interface Vue {
        $chat: any;
    }
}

export enum ChatMessageTypes {
    text  = 'text',
    emoji = 'emoji',
    file  = 'file',
}

interface ChatMessageTextData {
    meta?: string;
    text: string;
}

interface ChatMessageFileDataItem {
    meta?: string;
    name: string;
    url: string;
}

interface ChatMessageFileData {
    meta?: string;
    file: ChatMessageFileDataItem;
}

interface ChatMessageEmojiData {
    meta?: string;
    emoji: string;
}


interface ChatMessageBase {
    id?: string;
    author?: string;
    type: ChatMessageTypes;
    isEdited?: boolean;
    suggestions?: string[];
    meta?: string;

    [key: string]: any;
}

export interface ChatMessageText extends ChatMessageBase {
    type: ChatMessageTypes.text;
    data: ChatMessageTextData;
}

export interface ChatMessageFile extends ChatMessageBase {
    type: ChatMessageTypes.file;
    data: ChatMessageFileData;
}

export interface ChatMessageEmoji extends ChatMessageBase {
    type: ChatMessageTypes.emoji;
    data: ChatMessageEmojiData;
}

export type ChatMessage = ChatMessageText | ChatMessageFile | ChatMessageEmoji;



interface ChatPluginOptions {
    componentName?: string
}


export declare class Chat implements PluginObject<ChatPluginOptions> {
    install: PluginFunction<ChatPluginOptions>;
    static install: PluginFunction<ChatPluginOptions>;
}
export default Chat;
