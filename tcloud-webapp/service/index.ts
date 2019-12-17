import axios from 'axios';
import _ from 'underscore'



interface IDataProvider {
  getDocument(documentId: string) : Promise<any>
}

class DataProvider implements IDataProvider {
  getDocument(documentId: string): Promise<any> {
    console.log(documentId)
    return axios.get('https://storage.googleapis.com/tcloud-261610.appspot.com/' + documentId)
  }
}

export const sortImages = (images: Array<LNImage>) : Array<LNImage> => {
  const finalList : Array<LNImage> = []
  images.reverse()
  const reducedList = _.groupBy(images,'page')
  Object.keys(reducedList).map( k => reducedList[k].map( (e:LNImage) => finalList.push(e)))
  // console.log(finalList)
  return finalList
}

export const extractTextFromEntity = (entity : LNEntity)  : string => {
  return entity.pos &&  entity.pos.length >0  ? entity.text : entity.values ? entity.values.map( v => v.entities[0].text).join(' ') : ''
}

export const dataProvider = new DataProvider()