import * as path from 'path'
import { path as appRoot } from 'app-root-path'

export const APP_ROOT = appRoot
export const DIST_DIR = path.join(APP_ROOT, 'dist')
export const PUBLIC_DIR = path.join(DIST_DIR, 'public')
export const INDEX_PATH = path.join(PUBLIC_DIR, 'index.html')