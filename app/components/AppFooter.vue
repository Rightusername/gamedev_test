<template>
  <v-footer tile class="app-footer">
    <v-card tile width="100%" class="black lighten-1 text-right">
      <v-card-text>
        <a href="https://github.com/Rightusername/gamedev_test" target="_blank">
          <v-btn class="mx-4">
            <v-icon size="24px">
              mdi-git
            </v-icon>
            <span>GitHub</span>
          </v-btn>
        </a>
      </v-card-text>

      <v-divider></v-divider>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style lang="scss" scoped>
.app-footer {
}
</style>
