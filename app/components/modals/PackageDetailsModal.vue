<template>
  <div class="app-package-details-modal t-modal" @mousedown.self="close">
    <div class="modal">
      <v-card>
        <header>
          <v-card-title>{{ item.package.name }}</v-card-title>
          <div class="version">{{ item.package.version }}</div>
        </header>
        <v-card-text>{{ item.package.description }}</v-card-text>

        <v-skeleton-loader v-if="!loaded" type="list-item"></v-skeleton-loader>
        <div v-if="loaded" class="details">
          <v-card-subtitle>Homepage</v-card-subtitle>
          <v-card-text>
            <a :href="details.homepage">{{ details.homepage }}</a>
          </v-card-text>
          <v-card-subtitle>License</v-card-subtitle>
          <v-card-text>
            {{ details.license }}
          </v-card-text>
          <v-card-subtitle>Maintainers</v-card-subtitle>
          <v-card-text>
            <span v-for="maintainer in details.maintainers" :key="maintainer.id">{{ maintainer.name }}</span>
          </v-card-text>
          <div class="versions">
            <!--            <div class="version" v-for="version in details.versions">{{version.version}}</div>-->
          </div>
        </div>
      </v-card>
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
  data() {
    return {
      loaded: false,
      details: null,
    };
  },
  mounted() {
    console.log(this.item);
    this.fetchPackage();
  },
  methods: {
    fetchPackage() {
      api()
        .get(`/${this.item.package.name}`)
        .then(res => {
          console.log(res.data);
          this.parseDetails(res.data);
          this.loaded = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    close() {
      this.$emit('close');
    },

    parseDetails(data) {
      this.details = data;

      this.details.versions = [];
      for (let key in data.versions) {
        this.details.versions.push(data.versions[key]);
      }
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
    height: auto;
    width: 750px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    position: relative;
    overflow: hidden;

    .v-card__text,
    .v-card__subtitle {
      padding-top: 8px;
      padding-bottom: 8px;
    }

    .v-card__title {
      padding-bottom: 8px;

    }


    .v-card {
      width: 100%;
      height: 100%;
      padding-bottom: 16px;

      header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .v-card__title {
          font-size: 16px;
        }

        .version {
          padding-right: 16px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
