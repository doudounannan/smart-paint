<template>
  <div id="app">
    <button
      @click="showToast">
         show toast
    </button>
  </div>
</template>

<script>
import Toast from './components/toast/index';

export default {
  name: 'app',
  methods: {
    showToast() {
      Toast.show({
        text: '测试'
      });
    }
  }
};
</script>
