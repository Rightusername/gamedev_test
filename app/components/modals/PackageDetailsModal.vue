<template>
  <div class="app-package-details-modal t-modal" @mousedown.self="close">
    <div class="modal">
      <v-card></v-card>
    </div>
  </div>
</template>

<script>
import api from '../../utils/api.js';

export default {
  name: 'PackageDetailsModal',
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    console.log(this.item);
    this.fetchPackage();
  },
  methods: {
    fetchPackage() {
      api().get(`/${this.item.package.name}`).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.app-package-details-modal {
  .modal {
    border-radius: 25px;
    padding: 30px;
    color: white;
    height: 280px;
    width: 750px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    position: relative;
    overflow: hidden;

    .v-card {
      width: 100%;
      height: 100%;
    }

  }
}
</style>
