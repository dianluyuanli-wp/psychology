interface DomEvent {
    currentTarget: targetObj,
    detail: detailObj,
    mark: object,
    mut: boolean,
    target: targetObj,
    timeStamp: Number,
    type: String
}

interface targetObj {
    dataset: datasetT,
    id: string,
    offsetLeft: Number,
    offsetTop: Number
}

interface detailObj {
    value: any
}

interface datasetT {
    field?: string
}

interface validateInfo {
    message: string,
    name: string,
    rule: ruleObj
}

interface ruleObj {
    message: string,
    name: string,
    required: boolean
}