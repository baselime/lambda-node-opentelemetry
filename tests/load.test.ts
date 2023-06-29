import { describe, expect, it } from 'vitest';
import { load } from '../src/loader';
import path from 'node:path';
 
describe('load()', () => {
    it('should load a file', async () => {
        const taskRoot = path.resolve(__dirname, 'data');
        const originalHandler = './src/original-handler.handler';

        const handler = await load(taskRoot, originalHandler);
        expect(handler).toBeInstanceOf(Function);
      
    })
});