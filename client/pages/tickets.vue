<template>
  <div class="hero">
    <v-dialog v-model="dialog" @keydown.esc="dialog = !dialog" width="1000px">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Araçlar</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="search_list"
            light
            class="elevation-1 mt-5"
            item-key="id"
            :items-per-page="10"
            :footer-props="{
              'items-per-page-text': 'Sayfa Başına Araç',
            }"
          >
            <template v-slot:[`item.arrival`]="{ item }">
              {{ formatDate(item.arrival) }}
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn color="success" @click="buyTicket(item)">Bilet Al</v-btn>
            </template>
            <template v-slot:[`item.freeSpace`]="{ item }">
              {{ item.totalSpace - item.usedSpace }}
            </template>
            <template v-slot:[`item.destination`]="{ item }">
              {{ formatDestination(item.destination) }}
            </template>
            <template v-slot:[`item.stations`]="{ item }">
              {{ formatStations(item.destination[0].stations) }}
            </template>
            <template v-slot:[`item.departure`]="{ item }">
              {{ formatDate(item.departure) }}
            </template>
            <template v-slot:no-data>
              <v-alert :value="true" color="error">
                Araç Bulunmamaktadır !
              </v-alert>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-row align="center" justify="center">
      <v-card width="600px">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Bilet Ara</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-select
            attach
            chips
            :items="cityList"
            v-model="searchInfo.departure"
            label="Kalkış Durağı"
          ></v-select>
          <v-select
            attach
            chips
            :items="cityList"
            v-model="searchInfo.arrival"
            label="Varış Durağı"
          ></v-select>
          <v-btn color="primary" block class="mb-5 mt-5" @click="busSearch"
            >Ara</v-btn
          >
        </v-card-text>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      searchInfo: {
        departure: undefined,
        arrival: undefined,
      },
      cityList: [
        'Adana',
        'Adıyaman',
        'Afyon',
        'Ağrı',
        'Amasya',
        'Ankara',
        'Antalya',
        'Artvin',
        'Aydın',
        'Balıkesir',
        'Bilecik',
        'Bingöl',
        'Bitlis',
        'Bolu',
        'Burdur',
        'Bursa',
        'Çanakkale',
        'Çankırı',
        'Çorum',
        'Denizli',
        'Diyarbakır',
        'Edirne',
        'Elazığ',
        'Erzincan',
        'Erzurum',
        'Eskişehir',
        'Gaziantep',
        'Giresun',
        'Gümüşhane',
        'Hakkari',
        'Hatay',
        'Isparta',
        'Mersin',
        'İstanbul',
        'İzmir',
        'Kars',
        'Kastamonu',
        'Kayseri',
        'Kırklareli',
        'Kırşehir',
        'Kocaeli',
        'Konya',
        'Kütahya',
        'Malatya',
        'Manisa',
        'Kahramanmaraş',
        'Mardin',
        'Muğla',
        'Muş',
        'Nevşehir',
        'Niğde',
        'Ordu',
        'Rize',
        'Sakarya',
        'Samsun',
        'Siirt',
        'Sinop',
        'Sivas',
        'Tekirdağ',
        'Tokat',
        'Trabzon',
        'Tunceli',
        'Şanlıurfa',
        'Uşak',
        'Van',
        'Yozgat',
        'Zonguldak',
        'Aksaray',
        'Bayburt',
        'Karaman',
        'Kırıkkale',
        'Batman',
        'Şırnak',
        'Bartın',
        'Ardahan',
        'Iğdır',
        'Yalova',
        'Karabük',
        'Kilis',
        'Osmaniye',
        'Düzce',
      ],
      headers: [
        {
          text: 'Kalkış Saati',
          value: 'departure',
          class: 'primary--text title',
        },
        {
          text: 'Varış Saati',
          value: 'arrival',
          class: 'primary--text title',
        },
        {
          text: 'Boş Koltuk',
          value: 'freeSpace',
          class: 'primary--text title',
        },
        {
          text: 'Güzergah Bilgileri',
          value: 'destination',
          class: 'primary--text title',
        },
        {
          text: 'Ara Duraklar',
          value: 'stations',
          class: 'primary--text title',
          width: '300px',
        },
        {
          text: 'İşlemler',
          value: 'actions',
          class: 'primary--text title',
        },
      ],
      dialog: false,
      newTicket: {
        userId: undefined,
        count: undefined,
        bus: [],
      },
    }
  },

  computed: {
    ...mapGetters({
      search_list: 'getSearchList',
      get_user_info: 'getUserInfo',
    }),
  },

  methods: {
    ...mapActions({
      getSearch: 'get_search',
    }),

    formatDate(item) {
      return new Date(item).toLocaleString()
    },

    formatDestination(item) {
      return (
        'Kalkış durağı : ' +
        item[0].start +
        ' / Varış durağı : ' +
        item[0].finish
      )
    },

    formatStations(item) {
      return item
        .map((element) => {
          return element
        })
        .join(' , ')
    },

    busSearch() {
      if (
        this.searchInfo.arrival == null ||
        this.searchInfo.arrival == undefined
      ) {
        this.$toast.show('Varış durağı boş bırakılamaz', {
          theme: 'bubble',
          type: 'error',
          position: 'bottom-right',
          duration: 5000,
        })
        return
      }
      if (
        this.searchInfo.departure == null ||
        this.searchInfo.departure == undefined
      ) {
        this.$toast.show('Kalkış durağı boş bırakılamaz', {
          theme: 'bubble',
          type: 'error',
          position: 'bottom-right',
          duration: 5000,
        })
        return
      }
      this.getSearch(this.searchInfo)
      this.dialog = !this.dialog
    },

    buyTicket(item) {},
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Playfair+Display:ital@1&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&family=Roboto+Condensed:wght@300&display=swap');

.hero {
  margin: 0 auto;
  text-align: center;
  height: 100%;
  padding: 17em 0;
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
