import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

export interface StatusProp extends RouteComponentProps<any>{
    status : number
}

export const Status = (props: StatusProp) => {
    const { staticContext, status } = props
    if(staticContext != null){
        staticContext.status = status
    }

    return <h1>Sup</h1>
}