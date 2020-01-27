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
    field?: string,
    [any: string]: any
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

interface openIdObj {
    openid: string
}

interface cloundFunResObj {
    result?: openIdObj,
    errMes: string
}