import * as express from 'express'
import * as path from 'path'
import { promisify } from 'util'

import { PUBLIC_DIR } from './constants'
import { serverRender } from './render'

const app = express()

app.use(express.static(PUBLIC_DIR, { index: false }))

app.get('/api', (req, res) => {
    res.json({ message: 'hello from server updated' })
})

app.use(serverRender)


const server = app.listen(3000, () => {
    console.log(`Listening @ ${server.address().port}`)
})

export default {
    async close() {
        if (server.listening) {
            await new Promise((resolve) => {
                server.close(resolve)
            })
        }
    }
}