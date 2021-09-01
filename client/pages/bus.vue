<template>
  <div>
    <v-dialog v-model="dialog" @keydown.esc="dialog = !dialog" width="1000px">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Araç İşlemleri</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="busForm">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs4>
                  <v-text-field
                    counter
                    class="mr-5"
                    clearable
                    maxlength="3"
                    v-model="newBus.totalSpace"
                    :rules="spaceRule"
                    label="Toplam Koltuk Sayısı"
                  ></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <p>Kalkış Saat Tarihi</p>
                  <date-picker
                    v-model="newBus.departure"
                    format="DD/MM/YYYY HH:mm:00"
                    type="datetime"
                  ></date-picker>
                </v-flex>
                <v-flex xs4>
                  <p>Varış Saat Tarihi</p>
                  <date-picker
                    v-model="newBus.arrival"
                    format="DD/MM/YYYY HH:mm:00"
                    type="datetime"
                  ></date-picker>
                </v-flex>
                <v-flex xs12 class="mt-5">
                  <v-data-table
                    :headers="headersDest"
                    :items="destination_list"
                    v-model="selectedDestination"
                    show-select
                    light
                    class="elevation-1 mt-5"
                    item-key="id"
                    :items-per-page="5"
                    :footer-props="{
                      'items-per-page-text': 'Sayfa Başına Güzergah',
                    }"
                  >
                    <template v-slot:[`item.stations`]="{ item }">
                      {{ formatStations(item.stations) }}
                    </template>
                    <template v-slot:no-data>
                      <v-alert :value="true" color="error">
                        Güzergah Bulunmamaktadır !
                      </v-alert>
                    </template>
                  </v-data-table>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="saveNewBus" block color="primary">Ekle</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="destDialog"
      @keydown.esc="destDialog = !destDialog"
      width="1000px"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Güzergah Bilgileri</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-data-table
            :headers="headersDest"
            :items="destination_list"
            light
            class="elevation-1 mt-5"
            item-key="id"
            :items-per-page="5"
            :footer-props="{
              'items-per-page-text': 'Sayfa Başına Güzergah',
            }"
          >
            <template v-slot:[`item.stations`]="{ item }">
              {{ formatStations(item.stations) }}
            </template>
            <template v-slot:no-data>
              <v-alert :value="true" color="error">
                Güzergah Bulunmamaktadır !
              </v-alert>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Araç İşlemleri</v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-btn color="primary" @click="openDialog()"> Yeni Araç Ekle </v-btn>
      <v-data-table
        :headers="headers"
        :items="bus_list"
        light
        class="elevation-1 mt-5"
        item-key="id"
        :items-per-page="15"
        :footer-props="{
          'items-per-page-text': 'Sayfa Başına Araç',
        }"
      >
        <template v-slot:[`item.arrival`]="{ item }">
          {{ formatDate(item.arrival) }}
        </template>
        <template v-slot:[`item.departure`]="{ item }">
          {{ formatDate(item.departure) }}
        </template>
        <template v-slot:[`item.destination`]="{ item }">
          <v-btn color="success" @click="showDestination(item.destinationid)"
            >Güzergah Bilgilerini Göster</v-btn
          >
        </template>
        <template v-slot:[`item.updateBus`]="{ item }">
          <v-icon right @click="updateDialog(item)"> mdi-plus </v-icon>
        </template>
        <template v-slot:[`item.delBus`]="{ item }">
          <v-icon right @click="deleteBus(item)"> mdi-minus </v-icon>
        </template>
        <template v-slot:no-data>
          <v-alert :value="true" color="error">
            Araç Bulunmamaktadır !
          </v-alert>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
export default {
  components: { DatePicker },
  data() {
    return {
      spaceRule: [
        (v) => !!v || 'Toplam Koltuk Sayısı zorunludur !',
        (v) => /^[0-9]+$/.test(v) || 'Yalnızca rakam içerebilir',
      ],
      dialog: false,
      menuDeparture: false,
      destDialog: false,
      selectedDestination: [],
      menuArrival: false,
      newBus: {
        id: undefined,
        departure: undefined,
        arrival: undefined,
        totalSpace: undefined,
        destinationid: undefined,
      },
      headersDest: [
        {
          text: 'Başlangıç Durağı',
          value: 'start',
          class: 'primary--text title',
        },
        {
          text: 'Son Durak',
          value: 'finish',
          class: 'primary--text title',
        },
        {
          text: 'Ara Duraklar',
          value: 'stations',
          class: 'primary--text title',
        },
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
          text: 'Toplam Koltuk',
          value: 'totalSpace',
          class: 'primary--text title',
        },
        {
          text: 'Dolu Koltuk',
          value: 'usedSpace',
          class: 'primary--text title',
        },
        {
          text: 'Güzergah Bilgileri',
          value: 'destination',
          class: 'primary--text title',
        },
        {
          text: 'Araç Sil',
          value: 'delBus',
          sortable: false,
          class: 'primary--text title',
        },
        {
          text: 'Araç Güncelle',
          value: 'updateBus',
          sortable: false,
          class: 'primary--text title',
        },
      ],
    }
  },

  beforeMount() {
    this.getBusses()
  },

  computed: {
    ...mapGetters({
      bus_list: 'getBusList',
      destination_list: 'getDestinationList',
    }),
  },

  methods: {
    ...mapActions({
      getDestinations: 'get_destinations',
      getBusses: 'get_busses',
      getDestinations: 'get_destinations',
      getDestinationById: 'get_destination_by_id',
      removeBusses: 'remove_busses',
      saveBusses: 'save_busses',
      updateBusses: 'update_busses',
    }),

    showDestination(item) {
      this.getDestinationById(item)
      this.destDialog = !this.destDialog
    },

    saveNewBus() {
      if (this.newBus.arrival == null || this.newBus.arrival == undefined) {
        this.$toast.show('Varış tarih-saati boş bırakılamaz', {
          theme: 'bubble',
          type: 'error',
          position: 'bottom-right',
          duration: 5000,
        })
        return
      }
      if (this.newBus.departure == null || this.newBus.departure == undefined) {
        this.$toast.show('Kalkış tarih-saati boş bırakılamaz', {
          theme: 'bubble',
          type: 'error',
          position: 'bottom-right',
          duration: 5000,
        })
        return
      }
      if (
        this.selectedDestination == null ||
        this.selectedDestination.length == 0
      ) {
        this.$toast.show('Güzergah seçimi zorunludur !', {
          theme: 'bubble',
          type: 'error',
          position: 'bottom-right',
          duration: 5000,
        })
        return
      }
      if (this.selectedDestination.length > 1) {
        this.$toast.show('Birden fazla güzergah seçimi yapılamaz !', {
          theme: 'bubble',
          type: 'error',
          position: 'bottom-right',
          duration: 5000,
        })
        return
      }
      if (this.$refs.busForm.validate()) {
        this.newBus.destinationid = this.selectedDestination[0].id
        if (this.newBus.id == null || this.newBus.id == undefined) {
          this.saveBusses(this.newBus)
        } else {
          this.updateBusses(this.newBus)
        }
        this.dialog = !this.dialog
      }
    },

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

    openDialog() {
      this.getDestinations()
      this.selectedDestination = []
      this.newBus.id = undefined
      this.newBus.departure = undefined
      this.newBus.arrival = undefined
      this.newBus.totalSpace = undefined
      this.newBus.destinationid = undefined
      this.dialog = !this.dialog
    },

    updateDialog(item) {
      this.getDestinations()
      this.selectedDestination = []
      this.newBus.id = item.id
      this.newBus.departure = new Date(item.departure)
      this.newBus.arrival = new Date(item.arrival)
      this.newBus.totalSpace = item.totalSpace
      this.newBus.destinationid = item.destinationid
      this.selectedDestination.push(
        this.destination_list.find((dest) => dest.id === item.destinationid)
      )
      this.dialog = !this.dialog
    },

    deleteBus(item) {
      this.removeBusses(item.id)
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