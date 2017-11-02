import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import * as fs from 'fs'
import { JSDOM } from 'jsdom'
import { Request, Response, NextFunction } from 'express'
import { StaticRouter } from 'react-router'

import { INDEX_PATH } from './constants'
import { App, AppConstants } from '../app'

const INDEX_BUFFER = fs.readFileSync(INDEX_PATH)

export function renderTemplate(content: string, state?: any) {
    const jsDom = new JSDOM(INDEX_BUFFER)
    const { window: { document } } = jsDom
    if (state != null) {
        const script = document.createElement('script')
        script.setAttribute('type', 'text/javascript')
        script.innerHTML = `window["${AppConstants.GLOBAL_STATE_KEY}"]=${JSON.stringify(state)}`
        document.head.appendChild(script)
    }

    const contentElem = document.getElementById(AppConstants.CONTENT_ELEM_ID)
    if (contentElem == null) {
        throw new Error(`Could not find element with id ${AppConstants.CONTENT_ELEM_ID}`)
    }
    contentElem.innerHTML = content
    return jsDom.serialize()
}

export function serverRender(req: Request, res: Response, next: NextFunction) {
    const context: { [prop: string]: any } = {}
    const content = ReactDOMServer.renderToString((
        <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>
    ))

    if (context.status) {
        res.status(context.status)
    }

    res.write(renderTemplate(content))
    res.end()
}