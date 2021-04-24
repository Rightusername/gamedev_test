<template>
  <div class="app-main page">
    <v-app>
      <v-main>

        <v-app-bar>
          <v-form @submit.prevent="fetchPackages">
            <v-container>
              <v-row justify="space-between" align="center">
                <v-text-field hide-details v-model="searchQuery"></v-text-field>
                <v-btn class="mr-4" type="submit">
                  Search
                </v-btn>
              </v-row>
            </v-container>
          </v-form>
        </v-app-bar>

        <v-container>
          <v-list>
            <v-list-item v-for="item in pagedItems" :key="item.id" @click="showPackageDetails(item)">{{ item.package.name }}</v-list-item>
          </v-list>
          <!--            <div v-for="item in pagedItems" :key="item.id" @click="showPackageDetails(item)">{{ item.package.name }}</div>-->
        </v-container>

        <v-pagination
          v-if="packages && packages.length > perPage"
          v-model="page"
          :length="packages.length / perPage"
        ></v-pagination>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '../utils/api.js';
import InstallAppModal from '../components/modals/PackageDetailsModal.vue';

export default {
  name: 'Main',
  components: {},
  data() {
    return {
      searchQuery: '',

      page: 1,
      perPage: 10,
      packages: null,
    };
  },
  computed: {
    ...mapGetters(['storage']),

    pagedItems() {
      if (this.packages && this.packages.length > 0) {
        return this.packages.slice(this.page * this.perPage - this.perPage, this.page * this.perPage);
      }
      return [];
    },
  },

  created() {
    if (this.$route.query.search) {
      this.searchQuery = this.$route.query.search;
      this.fetchPackages();
    }
  },

  mounted() {},

  methods: {
    fetchPackages() {
      api()
        .get(`/-/v1/search?text=${this.searchQuery}`)
        .then(res => {
          if (res.status === 200) {
            this.packages = res.data.objects;

            this.applyRouteParams();
            console.log(res.data);
          } else {
            console.log('error fetchPackages');
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    showPackageDetails(item) {
      this.$modal.show(
        InstallAppModal,
        {
          item: item,
        },
        {
          transition: 'modal',
          overlayTransition: 'overlay',
        }
      );
    },

    applyRouteParams() {
      if (!this.$route.query.search) {
        this.$router.replace({ query: { search: this.searchQuery } });
      }
    },
  },
};
</script>

<style lang="scss" scoped>

.app-main {
  form {
    button {
      margin-left: 25px;
    }
  }
}
</style>
