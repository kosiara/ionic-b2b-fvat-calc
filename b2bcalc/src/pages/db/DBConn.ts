/**
 * Created by bko on 2/8/17.
 */

import * as PouchDB from 'pouchdb';

export class DBConn {

  private static _instance: DBConn;
  private db;
  public _birthdays: A[];

  private constructor() {

    //todo: refactor using: http://gonehybrid.com/how-to-use-pouchdb-sqlite-for-local-storage-in-ionic-2/
    //this.db = new PouchDB('myDB.db', {adapter: 'cordova-sqlite'});
    this.db = new PouchDB('myDB.db', {
      //adapter: 'cordova-sqlite'}
      adapter: 'websql'}
    );
    console.log("Hey look, I've got PouchDB:", this.db);
    console.log("PouchDB class name:", this.db.constructor.name);

    let a = new A();
    a.a = "xxx";
    a.b = "yyy";

    this.add(a);
    this.getAll();
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  add(birthday : A) {
    return this.db.post(birthday);
  }

  getAll() {

    if (!this._birthdays) {
      return this.db.allDocs({ include_docs: true})
        .then(docs => {

          // Each row has a .doc object and we just want to send an
          // array of birthday objects back to the calling controller,
          // so let's map the array to contain just the .doc objects.

          this._birthdays = docs.rows.map(row => {
            // Dates are not automatically converted from a string.
            row.doc.Date = new Date(row.doc.Date);
            return row.doc;
          });

          console.log("got bdays:", this._birthdays);
          // // Listen for changes on the database.
          this.db.changes({ live: true, since: 'now', include_docs: true})
            .on('change', this.onDatabaseChange);

          return this._birthdays;
        });
    } else {
      // Return cached data as a promise
      return Promise.resolve(this._birthdays);
    }
  }

  private onDatabaseChange = (change) => {
    var index = this.findIndex(this._birthdays, change.id);
    var birthday = this._birthdays[index];

    console.log("got bdays, index:", index);
    console.log("got bdays, birthday:", birthday);

    // if (change.deleted) {
    //   if (birthday) {
    //     this._birthdays.splice(index, 1); // delete
    //   }
    // } else {
    //   change.doc.Date = new Date(change.doc.Date);
    //   if (birthday && birthday._id === change.id) {
    //     this._birthdays[index] = change.doc; // update
    //   } else {
    //     this._birthdays.splice(index, 0, change.doc) // insert
    //   }
    // }
  }

// Binary search, the array is by default sorted by _id.
  private findIndex(array, id) {
    var low = 0, high = array.length, mid;
    while (low < high) {
      mid = (low + high) >>> 1;
      array[mid]._id < id ? low = mid + 1 : high = mid
    }
    return low;
  }
}

class A {
  public a: String;
  public b: String;
}
