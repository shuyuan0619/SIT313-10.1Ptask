import React, { Component } from 'react'



import db from "./firebase"


import { query, collection, doc} from "firebase/firestore";  
import {getDocs, updateDoc} from "firebase/firestore"; 



export default class SubscriptionSuccess extends Component {

  updatePremium = async () => {

    const first = query(
      collection(db, "users"),
    );

    var docData;
    var docRef;

    const querySnapshot = await getDocs(first);
    querySnapshot.forEach(document => {

    if (document.data().email === localStorage.getItem('email')){
      docRef = doc(db, "users", document.id);
      docData = document.data()
      
    }
    });
  
  
    await updateDoc(docRef, {
      firstName: docData.firstName,
      lastName: docData.lastName,
      email: docData.email,
      password: docData.password, 
      premium: true});
    localStorage.setItem("paying", 'true')


  }

  componentDidMount() {

    this.updatePremium();

  }


  render() {



    
    return (


      <div>
        Success
      </div>


    )
  }
}