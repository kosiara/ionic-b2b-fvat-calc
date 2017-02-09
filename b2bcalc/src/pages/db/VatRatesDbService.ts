/**
 * Created by bko on 2/8/17.
 */

import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';
import { Rate } from "./model/Rate";

@Injectable()
export class VatRatesDbService {

  private _db;
  private _rows: Rate[];

  public constructor() {
    this._db = new PouchDB('rates.db', { adapter: 'websql' });

    //this.add(<A>{ a: "xxx", b: "yyy" });
  }

  add(rate: Rate) {
    return this._db.post(rate);
  }

  update(rate: Rate) {
    this._db.put(rate);
  }

  getAll(): Promise<Rate[]> {
    if (!this._rows) {
      return this._db.allDocs({include_docs: true})
        .then(docs => {

          this._rows = docs.rows.map(row => {
            // Dates are not automatically converted from a string.
            row.doc.Date = new Date(row.doc.Date);
            return row.doc;
          });

          console.log("got bdays:", this._rows);

          return this._rows;
        });

    } else {
      // Return cached data as a promise
      return Promise.resolve(this._rows);
    }
  }
}
