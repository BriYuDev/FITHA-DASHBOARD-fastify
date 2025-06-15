import path from 'path'

const __dirname = import.meta.dirname;
const srcPath = path.dirname(__dirname)

export { handler } from path.join(srcPath, '/src/lambda.js')
