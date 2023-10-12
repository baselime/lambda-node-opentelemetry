import { describe, expect, expectTypeOf, it } from 'vitest';
import { loadSync } from '../src/load-sync';
import path from 'node:path';
 
describe('load()', () => {
    it('should load a file', async () => {
        const taskRoot = path.resolve(__dirname, 'data');
        const originalHandler = './src/original-handler.handler';

        const handler = loadSync(taskRoot, originalHandler)
        expect(handler).toBeInstanceOf(Function);
      
    })
});