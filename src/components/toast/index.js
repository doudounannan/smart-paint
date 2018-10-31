import Vue from 'vue';

import Toast from './src/index';

const ToastConstructor = Vue.extend(Toast);

let toastInstance = null;

Toast.show = ({ text }) => {
  if (toastInstance) {
    return;
  }

  toastInstance = new ToastConstructor({
    propsData: {
      text
    },
    destroyed() {
      toastInstance = null;
    }
  }).$mount();

  toastInstance.$on('destroyed', () => {
    toastInstance = null;
  });

  toastInstance.$mountPoint.appendChild(toastInstance.$el);
};

Toast.install = function(Vue) {
  Vue.component(Toast.name, Toast);
};

export default Toast;
