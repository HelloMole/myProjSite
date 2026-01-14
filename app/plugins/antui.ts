
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import * as Icons from '@ant-design/icons-vue'
import Icon from '@ant-design/icons-vue';

export default defineNuxtPlugin(nuxtApp => {
  // 使用 nuxtApp 进行操作
  nuxtApp.vueApp.use(Antd)
  console.log('Ant Design Vue 已注册', Icons)
  // 注册所有图标
    Object.keys(Icons).forEach(key => {
        if (key !== 'default' && !key.startsWith('_')) {
            nuxtApp.vueApp.component(key, (Icons as any)[key])
        }
    })
    nuxtApp.vueApp.component('icon', Icon);
})