import { describe, expect, it } from 'vitest';
import { load } from '../src/load-async';

import path from 'node:path';
 
describe('load()', () => {
    it('should load a file', async () => {
        const taskRoot = path.resolve(__dirname, 'data');
        const originalHandler = './src/original-handler.handler';

        const handler = await load(taskRoot, originalHandler);
        expect(handler).toBeInstanceOf(Function);
      
    })

    it('should load with no path', async () => {
        const taskRoot = path.resolve(__dirname, 'data');
        const originalHandler = 'index.main';

        const handler = await load(taskRoot, originalHandler);
        expect(handler).toBeInstanceOf(Function);
      
    })

    it('should load sample.js', async () => {
        const taskRoot = path.resolve(__dirname, 'data');
        const originalHandler = 'src/sample.handler';

        const handler = await load(taskRoot, originalHandler);
        expect(handler).toBeInstanceOf(Function);
    })
});