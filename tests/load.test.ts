import { describe, expect, expectTypeOf, it } from 'vitest';
import { load } from '../src/loader';
import path from 'node:path';
 
describe('load()', () => {
    it('should load a file', async () => {
        const taskRoot = path.resolve(__dirname, 'data');
        const originalHandler = 'original-handler.handler';

        const handler = await load(taskRoot, originalHandler);
        console.log(handler)
        expect(handler).toBeInstanceOf(Function);
      
    })
});