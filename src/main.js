import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import jaLocale from './locales/ja.json'
import enLocale from './locales/en.json'

const lang = navigator.language || navigator.userLanguage;

const i18n = createI18n({
    locale: lang,
    fallbackLocale: 'ja',
    messages: {
        ja: jaLocale,
        en: enLocale
    }
});

const app = createApp(App);

app.use(i18n);

app.mount('#app');
