<template>
  <div>
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
    <v-dialog
      v-model="busDialog"
      @keydown.esc="busDialog = !busDialog"
      width="1000px"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Araç Bilgileri</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-data-table
            :headers="headersBus"
            :items="bus_list"
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
            <template v-slot:[`item.freeSpace`]="{ item }">
              {{ item.totalSpace - item.usedSpace }}
            </template>
            <template v-slot:[`item.destination`]="{ item }">
              <v-btn
                color="warning"
                @click="showDestination(item.destinationid)"
                >Güzergah Bilgileri</v-btn
              >
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
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Biletlerim</v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="ticket_list"
        light
        class="elevation-1 mt-5"
        item-key="id"
        :items-per-page="15"
        :footer-props="{
          'items-per-page-text': 'Sayfa Başına Kullanıcı',
        }"
      >
        <template v-slot:[`item.bus`]="{ item }">
          <v-btn color="success" @click="showBus(item.busid)"
            >Araç Bilgilerini Görüntüle</v-btn
          >
        </template>
        <template v-slot:[`item.ticketStatus`]="{ item }">
          {{ formatTicket(item.ticketStatus) }}
        </template>
        <template v-slot:no-data>
          <v-alert :value="true" color="error">
            Bilet Bulunmamaktadır !
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
      headersBus: [
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
          text: 'İşlemler',
          value: 'actions',
          class: 'primary--text title',
        },
      ],
      headers: [
        {
          text: 'İsim - Soyisim',
          value: 'name',
          class: 'primary--text title',
        },
        {
          text: 'Bilet Sayısı',
          value: 'count',
          class: 'primary--text title',
        },
        {
          text: 'Bilet Durumu',
          value: 'ticketStatus',
          class: 'primary--text title',
        },
        {
          text: 'Araç',
          value: 'bus',
          class: 'primary--text title',
        },
      ],
      busDialog: false,
      destDialog: false,
    }
  },

  beforeMount() {
    this.getAllTickets()
  },

  computed: {
    ...mapGetters({
      ticket_list: 'getTickets',
      bus_list: 'getBusList',
      destination_list: 'getDestinationList',
      user_details: 'getUserDetails',
    }),
  },

  methods: {
    ...mapActions({
      getAllTickets: 'get_all_tickets',
      cancelTickets: 'cancel_ticket',
      postponeTickets: 'postpone_ticket',
      getBusById: 'get_bus_by_İd',
      getDestinationById: 'get_destination_by_id',
    }),

    formatDate(item) {
      return new Date(item).toLocaleString()
    },

    formatTicket(item) {
      if (item == 'SOLD') {
        return 'Bilet Alındı'
      } else if (item == 'CANCELED') {
        return 'İptal Edildi'
      } else if (item == 'POSTPONED') {
        return 'Beklemeye Alındı'
      }
    },

    formatStations(item) {
      return item
        .map((element) => {
          return element
        })
        .join(' , ')
    },

    showBus(item) {
      debugger
      this.getBusById(item)
      this.busDialog = !this.busDialog
    },

    showDestination(item) {
      this.getDestinationById(item)
      this.destDialog = !this.destDialog
    },

    formatBus(item) {
      return (
        'Kalkış Durağı ve Saati : ' +
        this.formatDate(item.departure) +
        ' - ' +
        item.destination[0].start +
        '/' +
        'Varış Durağı ve Saati : ' +
        this.formatDate(item.arrival) +
        ' - ' +
        item.destination[0].finish
      )
    },

    cancel(item) {
      this.cancelTickets(item)
    },

    postpone(item) {
      this.postponeTickets(item)
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
