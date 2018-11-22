<template>
<v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" color="primary" dark>Create form</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Create Book</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="newBook.title" label="title" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="newBook.author" label="author" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="newBook.url" label="url" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="addBook($event); dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import firebase from 'firebase'
import {config} from '../firebase/firebase_config'
const db = firebase.database();
const booksRef = db.ref('books');

export default {
  name: 'dialogForm',
  firebase: {
    books: booksRef
  },
  data () {
    return {
      newBook: {
        title: '',
        author: '',
        url: ''
      },
      dialog: false
    }
  },
  methods: {
    addBook: function() {
      booksRef.push(this.newBook);
      this.newBook.title = '';
      this.newBook.author = '';
      this.newBook.url = '';
    },
  }
}
</script>