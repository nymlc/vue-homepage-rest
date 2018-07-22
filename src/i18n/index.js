import Vue from 'vue';
import VueI18n from 'vue-i18n';
import elementEnLocale from 'element-ui/lib/locale/lang/en'; // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'; // element-ui lang
import enLocale from './en';
import zhLocale from './zh';

Vue.use(VueI18n);

const messages = {
    'en-US': {
        ...enLocale,
        ...elementEnLocale
    },
    'zh-CN': {
        ...zhLocale,
        ...elementZhLocale
    }
};

// 自动设置语言
const navLang = navigator.language;
const localLang = navLang === 'zh-CN' || navLang === 'en-US' ? navLang : false;
const lang = window.localStorage.getItem('language') || localLang || 'zh-CN';
const i18n = new VueI18n({
    locale: lang, // set locale
    messages // set locale messages
});

export default i18n;

