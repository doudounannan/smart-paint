<template>
  <div
    :class="entryClassName"
    :ref="entryClassName"
  >
    <div
      :class="textClassName"
    >
      {{text}}
    </div>
  </div>
</template>

<script>
import { COMPONENT_NAMESPACE, TOAST_NAME } from '../../../util/constant';

const CURRENT_COMPONENT_FULL_NAME = `${COMPONENT_NAMESPACE}-${TOAST_NAME}`;

export default {
  name: CURRENT_COMPONENT_FULL_NAME,

  data() {
    return {
      entryClassName: CURRENT_COMPONENT_FULL_NAME,
      textClassName: `${CURRENT_COMPONENT_FULL_NAME}__text`
    };
  },

  props: {
    text: {
      type: String,
      default: ''
    },
    // 被移除
    needToBeRemoved: {
      type: Boolean,
      default: true
    },
    // 挂载点
    mountPoint: {
      type: String,
      default: 'body'
    }
  },

  created() {
    this.$mountPoint = document.querySelector(this.mountPoint);
  },

  mounted() {
    this.$refs[CURRENT_COMPONENT_FULL_NAME].addEventListener(
      'animationend',
      this.destroy
    );
    this.$refs[CURRENT_COMPONENT_FULL_NAME].addEventListener(
      'webkitAnimationEnd',
      this.destroy
    );
  },

  beforeDestroy() {
    this.$refs[CURRENT_COMPONENT_FULL_NAME].removeEventListener(
      'animationend',
      this.destroy
    );
    this.$refs[CURRENT_COMPONENT_FULL_NAME].removeEventListener(
      'webkitAnimationEnd',
      this.destroy
    );
  },

  destroyed() {
    if (this.needToBeRemoved) {
      this.$mountPoint.removeChild(this.$el);
    }
  },

  methods: {
    destroy() {
      this.$destroy();
    }
  }
};
</script>

<style lang="scss">
@import './index';
</style>
