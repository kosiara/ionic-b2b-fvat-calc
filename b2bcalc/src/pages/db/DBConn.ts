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
        adapter: 'websql'
      }
    );
    console.log("Hey look, I've got PouchDB:", this.db);
    console.log("PouchDB class name:", this.db.constructor.name);

    let a = new A();
    a.a = "xxx";
    a.b = "yyy";

    this.add(a);
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  add(birthday: A) {
    return this.db.post(birthday);
  }

  getAll(): Promise<A> {

    if (!this._birthdays) {
      return this.db.allDocs({include_docs: true})
        .then(docs => {

          this._birthdays = docs.rows.map(row => {
            // Dates are not automatically converted from a string.
            row.doc.Date = new Date(row.doc.Date);
            return row.doc;
          });

          console.log("got bdays:", this._birthdays);

          return this._birthdays;
        });

    } else {
      // Return cached data as a promise
      return Promise.resolve(this._birthdays);
    }
  }
}

export class A {
  public a: String;
  public b: String;
}
