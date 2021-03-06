import { createRoot } from 'react-dom/client'
import Router from './Router'
import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = createRoot(rootElement)

root.render(<Router />)
