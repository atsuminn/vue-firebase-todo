<template>
<div class="aa">
  <navi/>
  <v-content>
    <v-container fluid pa-5 justify-end >
        <v-flex xs12 offset-xs7>
        
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details>
        </v-text-field>
        </v-flex>
        <br/>
        <v-flex >
        <v-data-table
      :headers="headers"
      :items="reports"
      :search="search"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{props.item.studentid}}</td>
          <td class="text-xs-left">{{props.item.company}}</td>
          <td class="text-xs-left">{{props.item.place}}</td>
          <td class="text-xs-left">{{props.item.startdate}}</td>
          <td class="text-xs-left">{{props.item.enddate}}</td>
          <td class="text-xs-left">{{props.item.content}}</td>
          <td class="text-xs-left">{{props.item.status}}</td>
          <td class="justify-center layout px-0">
            <v-btn 
            value = "hoge"
            :loading="loading"
            v-if= "!visible"
            outline color="indigo"
            @click="loader = 'loading',visible = true"
            >
            承認</v-btn>
            <v-btn 
            value = "hoge1"
            :loading="loading"
            v-if= "visible"
            outline color="indigo"
            @click="loader = 'loading',visible = false">
            非承認</v-btn>
            <v-icon
              small
              @click="editReport(props.item)"
            >
            edit
            </v-icon>
            <v-icon
              small
              @click="removeReport(props.item)"
            >
              delete
            </v-icon>
          </td>
                </template>
                
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
            </v-data-table>
        </v-flex>
      
        <router-view/>
    </v-container>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>

  </v-content>
  
</div>
</template>
<script src="https://www.gstatic.com/firebasejs/5.5.8/firebase.js"></script>
<script>
import firebase from 'firebase'
import {config} from '../firebase/firebase_config'
import Navi from '@/components/Navi'
/*
export const config = {
  apiKey: "AIzaSyB8ZVjhyO5CvSpO4Iu6n0MmmsO_uOLPyPs",
  authDomain: "fk6-co.firebaseapp.com",
  databaseURL: "https://fk6-co.firebaseio.com",
  projectId: "fk6-co",
  storageBucket: "fk6-co.appspot.com",
  messagingSenderId: "810812087591"
}
*/
// const app = firebase.initializeApp(config);
const db = firebase.database();
const reportsRef = db.ref('report');
export default {
  name: 'Appform',
  firebase: {
    reports: reportsRef
  },
  components: {Navi},
  data () {
    return {
      visible: true,
      isPush : false,
      loader: null,
      loading: false,
      dialog: false,
      drawer: false,
      search: '',
      labels:[
        '承認','非承認'
      ],
      headers: [
        {
          text:'Studentid',value:'studentid'
        },
        {
          text:'Company',value:'company'  
        },
        {
          text:'Place',value:'place' 
        },
        {
          text:'Startdate',value:'startdate' 
        },
        {
          text:'Enddate',value:'enddate' 
        },
        {
          text:'Content',value:'content' 
        },
        {
          text:'Status',value:'status' 
        },
        {
          text:'State',value:'state'
        },
        {
          text:'Edit・Delete',value:'edit'
        },
      ]
    }
  },
  methods: {
    pushBtn : function() {
    this.isPush = true;

    },
    editReport: function(app) {
      var newPostKey = firebase.database().ref().child(app).push().key;
      var updates = {};
      updates['/posts/' + newPostKey] = postData;
      updates['/user-posts/' + uid + '/' + newPostKey] = headers;

      return firebase.database().ref().update(updates);
    },
    removeReport: function(app){
      reportsRef.child(app['.key']).remove();
    }
  },
  watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]
        setTimeout(() => (this[l] = false), 1000)
        this.loader = null
        
      }
    }
}
</script>
<style scoped>
.aa {
  background-image: url('../assets/background.jpeg') ;
}
.elevation-1 {
  opacity: 0.8
  ;
}
</style>
