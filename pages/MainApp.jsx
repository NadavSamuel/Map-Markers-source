import React from 'react';
import GoogleMap from '../cmps/GoogleMap'
import { TableCmp } from '../cmps/TableCmp'
import {CurrLocationBtn} from '../cmps/CurrLocationBtn'
import {Filter} from '../cmps/Filter'

export function MainApp(props){

    return (

      <section className="main-app-container  column-layout" >
        <section className="column-layout">
          <GoogleMap />
          <CurrLocationBtn />
        </section>
        <section className="table-cmp-container">
          <Filter/>
          <TableCmp />
        </section>
      </section>


    );
}

