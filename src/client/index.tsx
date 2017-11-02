import * as React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { App, AppConstants } from '../app'

const content = document.getElementById(AppConstants.CONTENT_ELEM_ID)
hydrate((
    <BrowserRouter>
        <App></App>
    </BrowserRouter>
), content)