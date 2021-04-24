<template>
  <div class="app-carousel">
    <div class="nav-btn-wrap prev" :class="{ disabled: startEdge, hidden: arrowsDisabled || !arrows }">
      <div class="prev btn" @click="scrollPrev">
        <img svg-inline src="app/assets/static/svg/right.svg" alt="" />
      </div>
    </div>
    <div class="nav-btn-wrap next" :class="{ disabled: endEdge, hidden: arrowsDisabled || !arrows }">
      <div class="next btn" @click="scrollNext">
        <img svg-inline src="app/assets/static/svg/right.svg" alt="" />
      </div>
    </div>

    <div ref="wrap" class="wrap" @scroll="onContainerScroll">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
    arrows: {
      type: Boolean,
      default: true,
    },
    scrollSpeed: {
      type: Number,
      default: 300,
    },
  },
  data() {
    return {
      startEdge: true,
      endEdge: false,
      arrowsDisabled: false,
    };
  },
  mounted() {
    this.setArrowsVisibility();
    window.addEventListener('resize', this.onResize);
  },

  destroyed() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    scrollNext() {
      console.log(this.scrollSpeed);
      this.$refs.wrap.scrollTo({
        left: this.$refs.wrap.scrollLeft + this.scrollSpeed,
        behavior: 'smooth',
      });
    },
    scrollPrev() {
      this.$refs.wrap.scrollTo({
        left: this.$refs.wrap.scrollLeft - this.scrollSpeed,
        behavior: 'smooth',
      });
    },

    setArrowsVisibility() {
      if (this.$refs.wrap.clientWidth >= this.$refs.wrap.scrollWidth) {
        this.arrowsDisabled = true;
      } else {
        this.arrowsDisabled = false;
      }
    },

    onContainerScroll() {
      if (this.$refs.wrap.scrollLeft + this.$refs.wrap.clientWidth > this.$refs.wrap.scrollWidth - 5) {
        this.endEdge = true;
        this.startEdge = false;
      } else {
        if (this.$refs.wrap.scrollLeft <= 0) {
          this.startEdge = true;
          this.endEdge = false;
        } else {
          this.endEdge = false;
          this.startEdge = false;
        }
      }
    },

    onResize() {
      this.setArrowsVisibility();
      this.onContainerScroll();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~styles/mixins';
.app-carousel {
  position: relative;
  width: 100%;

  .nav-btn-wrap {
    position: absolute;
    height: 100%;
    width: 80px;
    display: flex;
    align-items: center;

    .btn {
      //background: red;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 10px;
        height: auto;
      }
    }
    &.prev {
      left: 0;
      justify-content: flex-start;
      background: linear-gradient(270deg, transparent 0%, white 35%, white 100%);
      .btn {
        svg {
          transform: rotate(180deg);
        }
      }
    }
    &.next {
      right: 0;
      background: linear-gradient(90deg, transparent 0%, white 35%, white 100%);
      justify-content: flex-end;
    }
    &.disabled {
      opacity: 0;
      pointer-events: none;
    }

    &.hidden {
      opacity: 0;
      pointer-events: none;
    }
  }

  .wrap {
    overflow: auto;
    display: flex;
    @include scrollbar(0px);

    &::-webkit-scrollbar {
      display: none;
    }

    scrollbar-width: none !important;
  }
}
</style>
