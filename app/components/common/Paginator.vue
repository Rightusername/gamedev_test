<template>
  <div class="app-paginator">
    <paginate
      v-model="valueProp"
      :page-count="pagesLength"
      :next-class="'hidden'"
      :prev-class="'hidden'"
      :margin-pages="2"
      :page-number="5"
      :container-class="'pagination'"
      :click-handler="onPageChanged"
    >
      <span slot="breakViewContent">
        <svg width="16" height="4" viewBox="0 0 16 4">
          <circle fill="black" cx="2" cy="2" r="2" />
          <circle fill="black" cx="8" cy="2" r="2" />
          <circle fill="black" cx="14" cy="2" r="2" />
        </svg>
      </span>
    </paginate>
    <div class="next-btn" @click="setPage(value + 1)">
      <span class="y-round-btn">
        <img src="~app/assets/images/arrow.svg" alt="" />
      </span>
    </div>
  </div>
</template>

<script>
import Paginate from 'vuejs-paginate';

export default {
  name: 'Paginator',
  components: {
    Paginate,
  },
  props: {
    itemsLength: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 8,
    },
    value: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    pagesLength() {
      return Math.ceil(this.itemsLength / this.pageSize);
    },
    valueProp: {
      get(){
        return this.value;
      },
      set(newName) {
        return newName;
      },
    },
  },
  mounted() {
  },

  methods: {
    onPageChanged(page) {
      this.$emit('onPageChanged', page);
      this.$emit('input', page)
    },
    setPage(page) {
      if (page > this.pagesLength) {
        page = this.pagesLength;
      }
      if (page < 1) {
        page = 1;
      }

      if (this.value == page) {
        return;
      }
      this.onPageChanged(page);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-paginator {
  display: flex;
  align-items: center;

  /deep/ .pagination {
    margin: 0;
    display: flex;
    li {
      outline: none;
      padding: 0;
      margin: 0;
      height: 38px;
      width: 38px;
      cursor: pointer;
      user-select: none;

      a {
        outline: none;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 21px;
        color: black;
        user-select: none;





      }

      &.hidden {
        display: none;
      }

      &:last-child {
        margin-left: 8px;
      }

      &:before {
        display: none;
      }

      &.active {
        background: #ebf2f4;
        border-radius: 30px;
      }
    }
  }

  .next-btn {
    height: 38px;
    width: 38px;
    margin-left: 10px;
    .y-round-btn {
      width: 100%;
      height: 100%;
    }
    img {
      width: 20px;
      height: auto;
      transform: rotate(180deg) translateX(-1px);
      user-select: none;
    }
  }
}
</style>
