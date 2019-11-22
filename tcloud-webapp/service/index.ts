import axios from 'axios';
import firebase from 'firebase'


var serviceAccount = require("../keys/tcloud-studio-firebase.json");

if (!firebase.apps.length) {
  firebase.initializeApp(serviceAccount);
}


interface IDataProvider {
  getDocument(documentId: string) : Promise<any>
  getUser(id: string) : UserOuttripper
}

class DataProvider implements IDataProvider {
  getUser(id: string): any {
    return firebase.firestore().
      collection('user').
        doc(id).get().then( doc => {
          return doc.data()  as UserOuttripper 
        })
  }


  getDocument(documentId: string): Promise<any> {
    return axios.get('https://ipfs.io/ipfs/' + documentId)
    // return axios.get('https://api.myjson.com/bins/' + documentId)
    //return axios.get('http://127.0.0.1:8080/ipfs/' + documentId)
  }


}

export default new DataProvider()