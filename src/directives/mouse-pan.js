/*
 * @Author: lifangfang
 * @Date:   2019-02-22 18:24:22
 * @Last Modified by:   lifangfang
 * @Last Modified time: 2019-08-23 11:14:02
 */
import { position } from "../helpers/utils/event.js";

function getDirection(mod) {
    const none = mod.vertical !== true && mod.horizontal !== true;
    let direction = {};
    if (none || mod.vertical) {
        direction.vertical = true;
    }
    if (none || mod.horizontal) {
        direction.horizontal = true;
    }
    return direction;
}

function proccessChanges(e, ctx) {
    const pos = position(e),
        x = pos.left,
        y = pos.top,
        distX = x - ctx.event.x,
        distY = y - ctx.event.y,
        absX = Math.abs(distX),
        absY = Math.abs(distY);
    let direction, duration;

    if (!ctx.direction.vertical && ctx.direction.horizontal) {
        switch (distX < 0) {
            case true:
                direction = "left";
                break;
            case false:
            default:
                direction = "right";
                break;
        }
    } else if (!ctx.direction.horizontal && ctx.direction.vertical) {
        switch (distY < 0) {
            case true:
                direction = "up";
                break;
            case false:
            default:
                direction = "down";
                break;
        }
    } else {
        if (absX < absY) {
            switch (distY < 0) {
                case true:
                    direction = "up";
                    break;
                case false:
                default:
                    direction = "down";
                    break;
            }
        } else {
            switch (distX < 0) {
                case true:
                    direction = "left";
                    break;
                case false:
                default:
                    direction = "right";
                    break;
            }
        }
    }

    duration = parseInt(new Date().getTime()) - ctx.startTime;
    return {
        el: e,
        position: pos,
        direction: direction,
        duration: duration,
        isFirst: ctx.event.isFirst,
        isFinal: ctx.event.isFinal,
        distance: {
            x: absX,
            y: absY
        },
        relative: {
            x: distX,
            y: distY
        },
        delta: {
            x: pos.left - ctx.event.lastX,
            y: pos.top - ctx.event.lastY
        }

    };
}
export default {
    name: "mouse-pan",
    bind(el, binding, vnode) {
        let stopPropagation = binding.modifiers.stop;
        let preventDefault = binding.modifiers.prevent;
        let mousedownActive = false;
        let ctx = {
            startTime: 0,
            direction: getDirection(binding.modifiers),
            handle: binding.value,
            start: function(e) {
                let pos = position(e);
                mousedownActive = true;
                ctx.event = {
                    x: pos.left,
                    y: pos.top,
                    lastX: pos.left,
                    detected: ctx.direction.vertical && ctx.direction.horizontal,
                    abort: false,
                    isFirst: true,
                    isFinal: false
                };
                ctx.startTime = parseInt(new Date().getTime());
                stopPropagation && e.stopPropagation();
                preventDefault && e.preventDefault();
                document.body.addEventListener("mousemove", ctx.move);
                document.body.addEventListener("mouseup", ctx.end);
            },
            move: function(e) {
                if (!mousedownActive || ctx.event.abort) {
                    return;
                }

                if (ctx.event.detected) {
                    let pos = position(e);
                    let changes = proccessChanges(e, ctx);
                    ctx.handle && ctx.handle(changes);
                    ctx.event.lastX = pos.left;
                    ctx.event.lastY = pos.top;
                    ctx.event.isFirst = false;
                    stopPropagation && e.stopPropagation();
                    preventDefault && e.preventDefault();

                    return;
                }

                let changes = proccessChanges(e, ctx);
                ctx.event.detected = true;
                ctx.event.abort = ctx.direction.vertical
                    ? changes.distance.x > changes.distance.y
                    : changes.distance.y > changes.distance.x;
                ctx.move(e);
            },
            end: function(e) {
                if (ctx.event.abort || !ctx.event.detected) {
                    return;
                }
                ctx.event.isFinal = true;
                mousedownActive = false;
                let changes = proccessChanges(e, ctx);
                ctx.handle && ctx.handle(changes);

                stopPropagation && e.stopPropagation();
                preventDefault && e.preventDefault();
                document.body.removeEventListener("mousemove", ctx.move);
                document.body.removeEventListener("mouseup", ctx.end);
            }
        };
        el.__panctx = ctx;
        el.addEventListener("mousedown", ctx.start);

    },
    update(el, binding) {
        if (binding.oldValue !== binding.value) {
            el.__panctx.handle = binding.value;
        }
    },
    unbind(el, binding) {
        const ctx = el.__panctx;
        if (!ctx) {
            return;
        }
        el.removeEventListener("mousedown", ctx.start);
        document.body.removeEventListener("mousemove", ctx.move);
        el.removeEventListener("mouseup", ctx.end);
        delete el.__panctx;
    }
};
