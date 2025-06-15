import path from 'path'

const __dirname = import.meta.dirname;

export { handler } from path.join(__dirname, 'lambda.js')
