import axios from 'axios';
import _ from 'underscore'



interface IDataProvider {
  getDocument(documentId: string) : Promise<any>
}

class DataProvider implements IDataProvider {
  getDocument(documentId: string): Promise<any> {
    console.log(documentId)
    return axios.get('https://storage.googleapis.com/tcloud-261610.appspot.com/' + documentId)
    
    /*return fetch('https://storage.googleapis.com/tcloud-261610.appspot.com/' + documentId).then( response => response.text().then( text => {
      return text
    }))*/
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