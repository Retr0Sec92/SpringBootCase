<template>
  <div>
    <v-dialog v-model="dialog" @keydown.esc="dialog = !dialog" width="600px">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Güzergah İşlemleri</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="destForm">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-select
                    attach
                    chips
                    :items="cityList"
                    v-model="newDest.start"
                    label="Başlangıç Durağı"
                  ></v-select>
                  <v-select
                    attach
                    chips
                    :items="cityList"
                    v-model="newDest.finish"
                    label="Bitiş Durağı"
                  ></v-select>
                  <v-select
                    attach
                    multiple
                    chips
                    :items="cityList"
                    v-model="newDest.stations"
                    label="Ara Duraklar"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="saveNewDestination" block color="primary">Ekle</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Güzergah İşlemleri</v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-btn color="primary" @click="openDialog()"> Yeni Güzergah Ekle </v-btn>
      <v-data-table
        :headers="headers"
        :items="destination_list"
        light
        class="elevation-1 mt-5"
        item-key="id"
        :items-per-page="15"
        :footer-props="{
          'items-per-page-text': 'Sayfa Başına Güzergah',
        }"
      >
        <template v-slot:[`item.updateDest`]="{ item }">
          <v-icon right @click="updateDialog(item)"> mdi-plus </v-icon>
        </template>
        <template v-slot:[`item.delDest`]="{ item }">
          <v-icon right @click="deleteDestination(item)"> mdi-minus </v-icon>
        </template>
        <template v-slot:no-data>
          <v-alert :value="true" color="error">
            Güzergah Bulunmamaktadır !
          </v-alert>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      startRule: [(v) => !!v || 'Başlangıç Durağı zorunludur !'],
      finishRule: [(v) => !!v || 'Bitiş Durağı zorunludur !'],
      newDest: {
        id: undefined,
        start: undefined,
        finish: undefined,
        stations: [],
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
      dialog: false,
      headers: [
        {
          text: 'Başlangıç Durağı',
          value: 'start',
          class: 'primary--text title',
        },
        {
          text: 'Ara Duraklar',
          value: 'stationString',
          class: 'primary--text title',
        },
        {
          text: 'Son Durak',
          value: 'finish',
          class: 'primary--text title',
        },
        {
          text: 'Güzergah Sil',
          value: 'delDest',
          sortable: false,
          class: 'primary--text title',
        },
        {
          text: 'Güzergah Güncelle',
          value: 'updateDest',
          sortable: false,
          class: 'primary--text title',
        },
      ],
    }
  },

  beforeMount() {
    this.getDestinations()
  },

  computed: {
    ...mapGetters({
      destination_list: 'getDestinationList',
    }),
  },

  methods: {
    ...mapActions({
      getDestinations: 'get_destinations',
      removeDestinations: 'remove_destinations',
      saveDestinations: 'save_destinations',
      updateDestinations: 'update_destinations',
    }),

    saveNewDestination() {
      if (this.$refs.destForm.validate()) {
        if (this.newDest.stations.includes(this.newDest.start) == false) {
          this.newDest.stations.push(this.newDest.start)
        }
        if (this.newDest.stations.includes(this.newDest.finish) == false) {
          this.newDest.stations.push(this.newDest.finish)
        }
        if (this.newDest.id == null || this.newDest.id == undefined) {
          this.saveDestinations(this.newDest)
        } else {
          this.updateDestinations(this.newDest)
        }
        this.dialog = !this.dialog
      }
    },

    openDialog() {
      this.newDest.id = undefined
      this.newDest.start = undefined
      this.newDest.finish = undefined
      this.newDest.stations = []
      this.dialog = !this.dialog
    },

    updateDialog(item) {
      this.newDest.id = item.id
      this.newDest.start = item.start
      this.newDest.finish = item.finish
      this.newDest.stations = item.stations
      this.dialog = !this.dialog
    },

    deleteDestination(item) {
      this.removeDestinations(item.id)
    },
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

  &__brand {
    color: $blue;
    font-family: 'Oswald', serif;
    font-size: 7em;
    text-shadow: 5px 5px 10px rgb(88, 88, 88);
  }

  &__desc {
    color: $green;
    font-family: 'Oswald', cursive;
    font-size: 40px;
    margin-bottom: 1em;
    text-shadow: 5px 5px 10px rgb(88, 88, 88);
  }
}
</style>