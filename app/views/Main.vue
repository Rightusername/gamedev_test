<template>
  <div class="app-main page">
    <v-app>
      <v-main>
        <v-app-bar class="flex-grow-0 ">
          <v-form ref="searchForm" class="container" @submit.prevent="fetchPackages">
            <v-row justify="space-between" align="center">
              <v-text-field
                v-model="searchQuery"
                :rules="searchRules"
                required
                placeholder="Package name"
                hide-details="auto"
              ></v-text-field>
              <v-btn class="mr-4 green white--text" type="submit">
                Search
              </v-btn>
            </v-row>
          </v-form>
        </v-app-bar>

        <v-container class="packages-list flex-grow-1">
          <v-progress-circular v-if="loading" indeterminate color="green"></v-progress-circular>
          <div v-if="!loading && loaded && packages.length === 0" class="no-packages">Packages not found</div>
          <v-list v-if="!loading && packages && packages.length > 0">
            <v-list-item
              v-for="item in pagedItems"
              :key="item.id"
              class="package-item"
              @click="showPackageDetails(item)"
            >
              <header>
                <div class="name">{{ item.package.name }}</div>
                <div class="version">{{ item.package.version }}</div>
              </header>
              <p>{{ item.package.description }}</p>
            </v-list-item>
          </v-list>
        </v-container>

        <v-pagination
          v-if="packages && packages.length > perPage && !loading"
          v-model="page"
          total-visible="8"
          :length="Math.ceil(packages.length / perPage)"
        ></v-pagination>
      </v-main>

      <AppFooter />
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import InstallAppModal from '../components/modals/PackageDetailsModal.vue';
import { searchPackages } from '../utils/api/packages.js';
import AppFooter from '../components/AppFooter.vue';

export default {
  name: 'Main',
  components: { AppFooter },
  data() {
    return {
      searchQuery: '',
      searchRules: [v => !!v || 'Name is required', v => (v && v.length > 2) || 'Name must be more than 2 characters'],
      loading: false,
      loaded: false,

      page: 1,
      perPage: 10,
      packages: [],
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
      if (this.$refs.searchForm && !this.$refs.searchForm.validate()) {
        return;
      }
      this.loading = true;
      this.page = 1;
      searchPackages(this.searchQuery)
        .then(res => {
          console.log(res);
          this.loading = false;
          if (res.status === 200) {
            this.packages = res.data.objects;
            this.applyRouteParams();
            this.loaded = true;
          } else {
            console.log('error fetchPackages');
          }
        })
        .catch(err => {
          this.loading = false;
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
      if (this.$route.query.search !== this.searchQuery) {
        this.$router.replace({ query: { search: this.searchQuery } });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.app-main {
  form {
    .row {
      margin-left: 0;
    }
    button {
      margin-left: 25px;
      margin-right: 0 !important;
    }
  }

  /deep/ .v-main__wrap {
    display: flex;
    flex-direction: column;
  }

  .packages-list {
    display: flex;
    justify-content: center;

    .v-progress-circular {
      margin-top: 100px;
    }

    .no-packages {
      margin-top: 100px;
    }

    .v-list {
      width: 100%;
    }
  }

  .package-item {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    min-height: unset;
    padding: 6px 10px;
    header {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .version {
        margin-left: 10px;
        color: darkgray;
      }
    }

    p {
      font-size: 13px;
      margin-top: 5px;
      margin-bottom: 0;
      color: gray;
    }
  }

  .v-footer {
    margin-top: 25px;
    padding: 0;
  }
}
</style>
