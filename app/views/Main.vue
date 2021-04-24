<template>
  <div class="app-main page">
    <v-app>
      <v-main>
        <v-app-bar>
          <v-form @submit.prevent="fetchPackages" class="container">
              <v-row justify="space-between" align="center">
                <v-text-field v-model="searchQuery" hide-details></v-text-field>
                <v-btn class="mr-4" type="submit">
                  Search
                </v-btn>
              </v-row>
          </v-form>
        </v-app-bar>

        <v-container>
          <v-list>
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
          <!--            <div v-for="item in pagedItems" :key="item.id" @click="showPackageDetails(item)">{{ item.package.name }}</div>-->
        </v-container>

        <v-pagination
          v-if="packages && packages.length > perPage"
          v-model="page"
          :length="packages.length / perPage"
        ></v-pagination>
      </v-main>

      <v-footer>
        <v-card width="100%" class="black lighten-1 text-right">
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
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '../utils/api.js';
import InstallAppModal from '../components/modals/PackageDetailsModal.vue';

/* TODO
 *  adaptive
 * set 250 packages limit ? change api
 * add search loader
 * */

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
    .row {
      margin-left: 0;
    }
    button {
      margin-left: 25px;
      margin-right: 0 !important;
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
