<template>
  <div
    class="app-confirm-modal t-modal"
    data-close="true"
    @mousedown="onClose"
  >
    <div class="modal">
      <header>
        <div class="title">{{ data.title }}</div>
        <div class="close-btn" data-close="true" @click="close">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            style="enable-background:new 0 0 512 512;"
            xml:space="preserve"
          >
            <g>
              <g>
                <path
                  d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249
                C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306
                C514.019,27.23,514.019,14.135,505.943,6.058z"
                />
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636
                c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"
                />
              </g>
            </g>
          </svg>
        </div>
      </header>
      <main>
        <p>
          {{data.text}}
        </p>
        <div class="controls">
          <div class="controls-btn cancel" @click="close" v-if="data.btns.cancel">
            {{ data.btns.cancel.title ? data.btns.cancel.title : 'Cancel' }}
          </div>
          <div class="controls-btn confirm" @click="confirm">
            {{ data.btns.confirm.title ? data.btns.confirm.title : 'Save' }}
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmModal',
  components: {},
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {
    document.addEventListener('keydown', this.onKeyDown);
  },
  destroyed() {
    document.removeEventListener('keydown', this.onKeyDown);
  },
  methods: {
    close() {
      this.$emit('close');
    },
    onClose(e) {
      if (e.target.dataset.close) {
        this.close();
      }
    },

    onKeyDown(e) {
      switch (e.which || e.charCode) {
        case 13: // Enter
          this.confirm();
          break;
      }
    },

    confirm() {
      if (
        this.data.btns &&
        this.data.btns.confirm &&
        this.data.btns.confirm.callback
      ) {
        this.data.btns.confirm.callback();
      }

      this.close();
    },
  },
};
</script>

<style lang="scss" scoped>
.app-confirm-modal {
  .modal {
    width: 440px;
    height: auto;
  }
  input {
    height: 35px;
  }
  main {
    padding: 20px 26px;
    padding-bottom: 80px;
    display: flex;
    flex-direction: column;
    p {
      color: var(--primary-text-color);
      font-size: 13px;
      line-height: 2.2;
      margin: 0;
      margin-bottom: 10px;
    }
  }
}
</style>
