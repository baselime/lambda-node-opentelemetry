import { trace, context } from '@opentelemetry/api';
import { flatten } from 'flat';
const levels = ['debug', 'info', 'warn', 'error', 'fatal'];

function _log(level: string, message: string, data: Record<string, unknown>) {
    if (!_isLogged(level)) return;
    if (!levels.includes(level)) {
        throw new Error(`Invalid log level ${level}`);
    }

    const span = trace.getSpan(context.active());
    span?.addEvent(message, flatten(data));
}

const LOG_LEVEL = process.env.LOG_LEVEL || "INFO";

function _isLogged(level: string) {
    if (level === "baselime") {
        return true;
    }
    const levels = ["DEBUG", "INFO", "WARN", "ERROR"];

    return levels.indexOf(level.toUpperCase()) >= levels.indexOf(LOG_LEVEL);
}


function getErrorData(data: Record<string, unknown>, err: Error): Record<string, unknown> {
    if (!err) {
        return data;
    }

    return {
        ...(data || {}),
        error: {
            name: err.name,
            message: err.message,
            stack: err.stack,
        },
    };
}

export function info(message: string, data?: Record<string, unknown>) {
    _log('info', message, data || {});
}

export function debug(message: string, data?: Record<string, unknown>) {
    _log('warn', message, data || {});
}

export function warn(message: string, data?: Record<string, unknown>, err?: Error) {
    _log('warn', message, getErrorData(data || {}, err || new Error(message)));
}

export function error(message: string, data?: Record<string, unknown>, err?: Error) {
    _log('error', message, getErrorData(data || {}, err || new Error(message)));
}