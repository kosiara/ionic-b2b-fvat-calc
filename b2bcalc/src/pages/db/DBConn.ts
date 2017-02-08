/**
 * Created by bko on 2/8/17.
 */

import * as PouchDB from 'pouchdb';

export class DBConn {

  private static _instance: DBConn;
 // private db: PouchDB;

  private constructor() {

    //todo: refactor using: http://gonehybrid.com/how-to-use-pouchdb-sqlite-for-local-storage-in-ionic-2/
    //this.db = new PouchDB('myDB.db', {adapter: 'cordova-sqlite'});
    let aa = new PouchDB('myDB.db', {
      //adapter: 'cordova-sqlite'}
      adapter: 'websql'}
    );
    console.log("Hey look, I've got PouchDB:", aa);
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  add(birthday) {
    //return this._db.post(birthday);
  }
}
