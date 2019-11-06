import axios from 'axios';



interface IDataProvider {
  getDocument(documentId: string) : Promise<any>
}

class DataProvider implements IDataProvider {
  getDocument(documentId: string): Promise<any> {
    return axios.get('https://ipfs.io/ipfs/' + documentId)
    // return axios.get('https://api.myjson.com/bins/' + documentId)
    //return axios.get('http://127.0.0.1:8080/ipfs/' + documentId)
  }
}

export const dataProvider = new DataProvider()