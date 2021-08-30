<template>
  <div class="main">
    <div v-if="suppliers">
      <v-data-table
        :headers="supplierHeaders"
        :items="suppliers"
        item-key="id"
        class="elevation-1"
        hide-default-footer
        :search="search"
        @click:row="detail"
      >
        <template v-slot:top>
          <v-toolbar color="#002f54" dark>
            <v-icon class="mr-3">mdi-format-list-bulleted-type</v-icon>
            <v-toolbar-title>Tedarikçi Listesi</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-btn text class="ml-3" @click="filterDialogOpen"
              ><v-icon class="mr-3">mdi-filter</v-icon>Filtre</v-btn
            >
          </v-toolbar>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="secondary"
          >Aradığınız "{{ search }}" değeri bulunamadı.</v-alert
        >
      </v-data-table>
    </div>
    <v-dialog v-model="filterDialog" width="500">
      <v-card>
        <v-card-title> Filtre Seçenekleri </v-card-title>
        <v-card-text>
          <v-autocomplete
            v-model="filterCategory"
            :items="categories"
            chips
            small-chips
            label="Kategoriler"
            multiple
            class="mt-7"
          ></v-autocomplete>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      search: '',
      categories: ['Medikal', 'İnşaat', 'Yemek'],
      filterCategory: [],
      filterDialog: false,
      supplierHeaders: [
        {
          text: 'Şirket Adı',
          sortable: true,
          value: 'company_name',
        },
        {
          text: 'Şirket Tipi',
          sortable: true,
          value: 'company_type',
        },
        {
          text: 'İlgili Kişi Adı',
          sortable: true,
          value: 'name',
        },
        {
          text: 'İlgili Kişi Soyadı',
          sortable: true,
          value: 'surname',
        },
        {
          text: 'Hitap',
          sortable: true,
          value: 'title',
        },
        {
          text: 'E-Mail',
          sortable: true,
          value: 'email',
        },
        {
          text: 'Vergi Numarası',
          sortable: true,
          value: 'tax_number',
        },
        {
          text: 'Vergi Dairesi',
          sortable: true,
          value: 'tax_office',
        },
        {
          text: 'Cep Telefonu',
          sortable: true,
          value: 'phone',
        },
        {
          text: 'Cep Telefonu(Diğer)',
          sortable: true,
          value: 'phone_2',
        },
        {
          text: 'Şehir',
          sortable: true,
          value: 'city',
        },
        {
          text: 'Web Sitesi',
          sortable: true,
          value: 'website',
        },
      ],
    }
  },
  mounted() {
    this.getSuppliers()
  },
  computed: {
    ...mapGetters({
      suppliers: 'suppliers/getSuppliers',
    }),
  },
  methods: {
    ...mapActions({
      getSuppliers: 'suppliers/getAllSuppliers',
    }),

    detail(item) {
      this.$router.push('/suppliers/' + item.id)
    },

    filterDialogOpen() {
      this.filterDialog = true
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  background: radial-gradient(
    rgb(255, 255, 255) 0%,
    rgb(255, 255, 255) 40%,
    rgb(216, 216, 216) 70%,
    rgb(141, 141, 141) 100%
  );
  background-size: cover;
  background-repeat: no-repeat;
  background-blend-mode: multiply;
  background-attachment: fixed;
}
</style>