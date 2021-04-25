<template>
  <div class="app-package-details-modal t-modal" @mousedown.self="close">
    <div class="modal">
      <v-card>
        <header>
          <v-card-title>{{ item.package.name }}</v-card-title>
          <div class="version">{{ item.package.version }}</div>
        </header>
        <v-card-text>{{ item.package.description }}</v-card-text>

        <div class="details">
          <v-card-subtitle>Publisher email</v-card-subtitle>
          <v-card-text>
            <a :href="item.package.publisher.email">{{ item.package.publisher.email }}</a>
          </v-card-text>
          <v-card-subtitle>Maintainers</v-card-subtitle>
          <v-card-text class="maintainers">
            <span v-for="maintainer in item.package.maintainers" :key="maintainer.id">{{ maintainer.username }}</span>
          </v-card-text>
          <v-skeleton-loader v-if="!loaded" type="list-item"></v-skeleton-loader>

          <v-card-subtitle v-if="loaded">Versions</v-card-subtitle>
          <v-card-text class="versions" v-if="loaded">
            <span class="version" v-for="version in details.versions">{{version}}</span>
          </v-card-text>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import { fetchPackage } from '../../utils/api/packages.js';

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
    this.fetchPackage();
  },
  methods: {
    fetchPackage() {
      fetchPackage(this.item.package.name)
        .then(res => {
          console.log(res.data, this.item);
          this.details = res.data;
          this.loaded = true;
        })
        .catch(err => {
          console.log(err);
        });
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

    .v-card__text {
      span {
        margin-right: 8px;
        white-space: nowrap;
      }
    }
  }
}
</style>
