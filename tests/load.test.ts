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

    it('should not load sample.js', async () => {
        const taskRoot = path.resolve(__dirname, 'data');
        const originalHandler = 'src/sample.handler';

        await expect(load(taskRoot, originalHandler)).rejects.toThrowErrorMatchingInlineSnapshot('"Could not load src/sample.handler"')
    });

    it('should load const-export.cjs', async () => {
        const taskRoot = path.resolve(__dirname, 'data');
        const originalHandler = 'src/const-export.handler';

        const handler = await load(taskRoot, originalHandler);
        expect(handler).toBeInstanceOf(Function);
    })
});