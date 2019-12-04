import axios from 'axios';
import _ from 'underscore'



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

export const sortImages = (images: Array<LNImage>) : Array<LNImage> => {
  const finalList : Array<LNImage> = []
  images.reverse()
  const reducedList = _.groupBy(images,'page')
  Object.keys(reducedList).map( k => reducedList[k].map( (e:LNImage) => finalList.push(e)))
  console.log(finalList)
  return finalList
}

export const dataProvider = new DataProvider()