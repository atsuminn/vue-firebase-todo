<template>
<v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" color="primary" dark>Create Reportform</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Create Report</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="newReport.studentid" label="studentid" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="newReport.company" label="company" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="newReport.place" label="place" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-menu
                  :close-on-content-click="false"
                   v-model="menu"
                   offset-x
                   lazy
                   transition="scale-transition"
                   full-width
                  min-width="290px"
                >
                <v-text-field
                  slot="activator"
                  v-model="newReport.startdate"
                  label="startdate"
                  prepend-icon="event"
                  readonly>
                </v-text-field>
        <v-date-picker v-model="newReport.startdate" @input="menu = false"></v-date-picker>
      </v-menu>
              </v-flex>
              <v-flex xs12>
                <v-menu
                  :close-on-content-click="false"
                   v-model="menu"
                   offset-x
                   lazy
                   transition="scale-transition"
                   full-width
                  min-width="290px"
                >
                <v-text-field
                  slot="activator"
                  v-model="newReport.enddate"
                  label="startdate"
                  prepend-icon="event"
                  readonly>
                </v-text-field>
        <v-date-picker v-model="newReport.enddate" @input="menu = false"></v-date-picker>
      </v-menu>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="newReport.content" label="content" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="newReport.status" label="status" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="addReport($event); dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import firebase from 'firebase'
import {config} from '../firebase/firebase_config'
var db = firebase.database();
var reportsRef = db.ref('report');
export default {
  name: 'dialogForm',
  firebase: {
    reports: reportsRef
  },
  data () {
    return {
      newReport: {
        studentid: '',
        company: '',
        place: '',
        startdate: '',
        enddate: '',
        content: '',
        status: '',
        menu: false,
        modal: false
      },
      dialog: false
    }
  },
  methods: {
    addReport: function() {
      reportsRef.push(this.newReport);
      this.newReport.studentid = '';
      this.newReport.company = '';
      this.newReport.place = '';
      this.newReport.startdate = '';
      this.newReport.enddate = '';
      this.newReport.content = '';
      this.newReport.status = '';
    },
  }
}
</script>