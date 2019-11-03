import axios from 'axios';



interface IDataProvider {
  getDocument(documentId: string) : Promise<any>
}

class DataProvider implements IDataProvider {
  getDocument(documentId: string): Promise<any> {
    return axios.get('https://api.myjson.com/bins/194s2k?' + documentId)
  }
}

export const dataProvider = new DataProvider()