import { createRequire } from 'module';

const require = createRequire(import.meta.url)
var QuickBooks = require('node-quickbooks')

export class QboFactory {
    private readonly factory: any

    constructor(
        private readonly consumerKey: string,
        private readonly consumerSecret: string
    ) {
        this.factory = new QuickBooks(
            consumerKey,
            consumerSecret
        )
    }
    
    getInstance() {
        return this.factory
    }
}