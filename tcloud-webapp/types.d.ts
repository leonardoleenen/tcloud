declare module "worker-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}

interface String {
  capitalize(): string
}


type LNImage = {
  line: number
  page: number 
  b64: string
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
  pos ? : Array<LNPos>
}

type LNDocument = {
  entities: Array<LNEntity>
  images: Array<LNImage>
}

type LNSpecMeta = {
  b64: string 
}

type LNInputSpec = {
  plugin_name: string 
  worker : string 
  meta: LNSpecMeta
}

type LNOutPutSpec = {
  plugin_name: string
  worker: string 
}

type LNPipelineItem = {
  worker: string 
  plugin_name: string 
  input_adapter? : LNInputAdapter
  output_adapter? : LNOutputAdapter
}

type LNInputAdapter = {
  worker: string 
  puglin_name: string 
}

type LNOutputAdapter = {
  worker: string 
  puglin_name: string 
}

type LNSRequestSpec = {
  job_name: string 
  input_spec : LNInputSpec
  pipeline : Array<LNPipelineItem>
  output_spec : LNOutPutSpec
}

