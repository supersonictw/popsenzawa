import { createApp } from 'vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'

import App from './App.vue'
import Vuetify from './plugins/vuetify'

const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY

createApp(App).
    use(VueReCaptcha, {
        siteKey: recaptchaSiteKey,
        loaderOptions: {
            size: 'invisible'
        },
    }).
    use(Vuetify).
    mount('#app');
