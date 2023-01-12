import { context, trace, propagation } from "@opentelemetry/api";

/**
 * @param ob Object                 The object to flatten
 * @param prefix String (Optional)  The prefix to add before each key, also used for recursion
 **/
function flattenObject(ob, prefix, result?) {
    if (prefix === void 0) { prefix = ""; }
    if (result === void 0) { result = {}; }
    // Preserve empty objects and arrays, they are lost otherwise
    if (prefix &&
        typeof ob === "object" &&
        ob !== null &&
        Object.keys(ob).length === 0) {
        result[prefix] = Array.isArray(ob) ? [] : {};
        return result;
    }
    prefix = prefix ? "".concat(prefix, ".") : "";
    for (var i in ob) {
        if (Object.prototype.hasOwnProperty.call(ob, i)) {
            if (typeof ob[i] === "object" && ob[i] !== null) {
                // Recursion on deeper objects
                flattenObject(ob[i], prefix + i, result);
            }
            else {
                result[prefix + i] = ob[i];
            }
        }
    }
    return result;
}


export const track = <F extends (...unknown) => ReturnType<() => void>>(name:string, func: F) => async (...args: Parameters<F>): Promise<ReturnType<F>> => {
    const tracer = trace.getTracer(name);

    const attrIn = flattenObject(args, "name.args");
  
    const span = tracer.startSpan(name, {
      attributes: attrIn,
    });
    const ctx = trace.setSpan(context.active(), span);
  
    // @ts-expect-error
    const result = await context.with<typeof args, F>(ctx, func, null, args);
  
    const attrOut = flattenObject(result, `${name}.result`);
    span.setAttributes(attrOut);
    span.end();
    return result;
}

export const enrich = (key: string, value: string | boolean | number) => {
    const activeSpan = trace.getSpan(context.active());
    if(activeSpan) {
        activeSpan.setAttribute(key, value)
    } else {
        console.log()
    }
} 

export const label = (key: string, value: string) => {
    const activeSpan = trace.getSpan(context.active());
    if(activeSpan) {
        const ctx = trace.setSpan(context.active(), activeSpan);
        const baggage = propagation.createBaggage({ [key]: { value }})
        propagation.setBaggage(ctx, baggage)
    } else {
        console.log('yo this did not work')
    }
}

export const log = (name: string, attributes?: Record<string, string | number | boolean>) => {
    const activeSpan = trace.getSpan(context.active());
    if(activeSpan) {
        if(attributes) {
            activeSpan.addEvent(name, attributes, Date.now())
        } else {
            activeSpan.addEvent(name, Date.now())
        }
        
    } else {
        console.log('yo this did not work')
    }
}