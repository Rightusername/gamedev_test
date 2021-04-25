<template>
  <div class="app-root">
    <div class="app-router-wrapper">
      <router-view></router-view>
      <modals-container />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {},
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.app-root {
  height: 100%;
  font-family: 'Inter', sans-serif;
  display: flex;
  line-height: 1.5;

  .app-router-wrapper {
    margin: 0 auto;
    width: 100%;
  }
}
</style>
