interface String {
  capitalize(): string
}


type LNImage = {
  line: number
  page: string 
}

type LNPos = {
  page: number
  line: number
}

type LNEntityValue = {
  entities: Array<LNEntity>
}

type LNEntity = {
  id: string 
  display_name: string 
  text: string 
  values? : Array<LNEntityValue>
}

type LNDocument = {
  entities: Array<LNEntity>
  images: Array<LNImage>
}