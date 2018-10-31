<template>
    <div class="tab-load">
        <div class="header">
            <slot name="header-item"></slot>
        </div>

        <div class="main">
            <slot
                name="load-data"
                v-if="!hasLoad[index]"
            >
                <div class="h100 center load-data">
                    <loading :size="20"></loading>
                </div>
            </slot>

            <slot
                name="no-data"
                v-if="hasLoad[index] && mainData[index].length === 0"
            >
                <div class="h100 center no-data">暂无数据</div>
            </slot>

            <slot
                name="main-item"
                v-if="hasLoad[index] && mainData[index].length > 0"
            ></slot>

            <slot
                name="scroll-load"
                v-if="hasLoad[index] && mainData[index].length > 0 && !isEnd[index] && showScrollLoad"
            >
                <div class="h50 center scroll-load">
                    <loading :size="20"></loading>
                </div>
            </slot>

            <slot
                name="data-end"
                v-if="hasLoad[index] && mainData[index].length > 0 && isEnd[index]"
            >
                <div class="h50 center data-end">没有数据了</div>
            </slot>
        </div>
    </div>
</template>

<script>
import debounce from 'lodash/debounce';

import { Loading } from '@ks/sharp-ui';

const VIEW_HEIGHT = window.innerHeight || document.documentElement.clientHeight;

export default {
  name: 'tab-load',

  props: {
    tabData: {
      type: Object,
      required: true
    }
  },

  components: {
    Loading
  },

  data() {
    return {
      showScrollLoad: false
    };
  },

  watch: {
    index(newIndex, oldIndex) {
      this.showScrollLoad = false;
    }
  },

  computed: {
    minRemainDistancePx() {
      return this.tabData.minRemainDistancePx;
    },
    index() {
      return this.tabData.index;
    },
    headerData() {
      return this.tabData.headerData;
    },
    mainData() {
      return this.tabData.mainData;
    },
    hasLoad() {
      return this.tabData.hasLoad;
    },
    isFetching() {
      return this.tabData.isFetching;
    },
    isEnd() {
      return this.tabData.isEnd;
    }
  },

  mounted() {
    window.addEventListener(
      'scroll',
      debounce(this.handleScroll, 50, { maxWait: 400 })
    );
  },

  destroyed() {
    window.removeEventListener(
      'scroll',
      debounce(this.handleScroll, 50, { maxWait: 400 })
    );
  },

  methods: {
    handleScroll() {
      if (this.documentRemainDistance() > this.minRemainDistancePx) {
        return;
      }

      if (!this.isFetching[this.index] && !this.isEnd[this.index]) {
        this.showScrollLoad = true;

        this.$emit('scrollLoad');
      }
    },
    documentRemainDistance() {
      const scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      const documentHeight =
        document.body.clientHeight || document.documentElement.offsetHeight;

      return documentHeight - scrollTop - VIEW_HEIGHT;
    }
  }
};
</script>

<style lang="less" scoped>
.h50 {
  height: 50px;
}

.h100 {
  height: 100px;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-load {
  font-size: 20px;
  color: #ccc;

  .header {
    display: flex;

    background-color: #fff;
  }
}
</style>
