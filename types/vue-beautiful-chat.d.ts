declare module 'vue-beautiful-chat' {

    import {PluginFunction, PluginObject} from 'vue';

    /**
     * Vue Beautiful Chat
     *
     * @class
     */
    class VueBeautifulChat implements PluginObject<{}> {
        [key: string]: any;
        install: PluginFunction<{}>;
        static install(pVue: typeof Vue, options?:{} | undefined): void;
    }

    namespace VueBeautifulChat {
    }
    export = VueBeautifulChat;
}
