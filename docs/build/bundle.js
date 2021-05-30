
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function get_store_value(store) {
        let value;
        subscribe(store, _ => value = _)();
        return value;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    const active_docs = new Set();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = node.ownerDocument;
        active_docs.add(doc);
        const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
        const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
        if (!current_rules[name]) {
            current_rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            active_docs.forEach(doc => {
                const stylesheet = doc.__svelte_stylesheet;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                doc.__svelte_rules = {};
            });
            active_docs.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        let config = fn(node, params);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                delete_rule(node);
                if (is_function(config)) {
                    config = config();
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_bidirectional_transition(node, fn, params, intro) {
        let config = fn(node, params);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = program.b - t;
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program || pending_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config();
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.37.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    /** Extended writable store.
       Saved and loaded to localstorage with name. 
       Also exposes save() function to do it manually */
    function persistant(name, initial) {
    	let storedValue = JSON.parse(localStorage.getItem(name));

    	let store = writable(storedValue === null ? initial : storedValue);

    	store.save = function() {
    		localStorage.setItem(name, JSON.stringify(get_store_value(store)));
    		// console.log(`${name} saved!`)
    	};

    	window.addEventListener("beforeunload", store.save);
    	return store
    }

    const routines = persistant("routines", [
    	{id: 0, name: "Example Routine", break: 10, exercises: [
    		{id: 1, exerciseId: 5, reps: 10, time: 60},
    		{id: 2, exerciseId: 5, reps: 20, time: 120},
    		{id: 3, exerciseId: 5, reps: 25, time: 120},
    		{id: 4, exerciseId: 5, reps: 30, time: 120},
    	]}
    ]);

    routines.subscribe(routines.save);

    const addEmptyRoutine = function() {
    	routines.update(function(old) {
    		return [
    			...old,
    			 {id: newId(), name: "New Routine", break: 10, exercises: []}
    		]	
    	});
    };

    const deleteRoutine = function (routineIndex) {
    	routines.update(function (old) {
    		return [...old.slice(0, routineIndex), ...old.slice(i + routineIndex)]
    	});
    };

    const setRoutineNameAndBreak = function(routineIndex, name, breakTime) {
    	routines.update(function(old) {
    		old[routineIndex].name = name;
    		old[routineIndex].break = breakTime;
    		return old
    	});
    };

    const removeRoutineExercise = function(routineIndex, routineExerciseIndex) {
    	routines.update(function(old) {
    		old[routineIndex].exercises = [
    			...old[routineIndex].exercises.slice(0, routineExerciseIndex),
    			...old[routineIndex].exercises.slice(routineExerciseIndex + 1)
    		];
    		return old
    	});
    };

    const exerciseTable = persistant("exerciseTable", [
    	{id: 5, name: "Example Exercise", calories: 2}
    ]);

    exerciseTable.subscribe(exerciseTable.save);

    const computedRoutines = derived(
    	[routines, exerciseTable],

    	function([$routines], set) {
    		set($routines.map(function (routine) {
    			return {
    				...routine,
    				exercises: getRoutineExercises(routine),
    				time: getRoutineTime(routine),
    				calories: getRoutineCalories(routine)
    			}
    		}));
    	}
    );

    const categories = persistant("categories", [
    	{id: 6, name: "Example Category", exercises: [
    		{id: 7, exerciseId: 5}
    	]}
    ]);

    categories.subscribe(categories.save);

    const computedCategories = derived(
    	[categories, exerciseTable],

    	function([$categories], set) {
    		set($categories.map(function (category) {
    			return {
    				...category,
    				exercises: getCategoryExercises(category)
    			}
    		}));
    	}
    );

    const setCategoryName = function(categoryIndex, name) {
    	categories.update(function(categories) {
    		categories[categoryIndex].name = name;
    		return categories
    	});
    };

    const getCategoryExercises = function(category) {
    	return category.exercises.map(function (categoryExercise) {
    		return {
    			...getExerciseById(categoryExercise.exerciseId),
    			...categoryExercise
    		}
    	})
    };

    const addEmptyCategory = function() {
    	categories.update(function(categories) {
    		return [
    			...categories,
    			{id: newId(), name: "New Category", exercises: []}
    		]	
    	});
    };

    const setRoutineExerciseTimeAndReps = 
    	function(routineIndex, routineExerciseIndex, time, reps) {
    		routines.update(function(routines) {
    			routines[routineIndex].exercises[routineExerciseIndex].time = time;
    			routines[routineIndex].exercises[routineExerciseIndex].reps = reps;
    			return routines
    		});
    	};

    const swapRoutineExercises = function(routineIndex, i, j) {
    	routines.update(function(routines) {
    		let routineExerciseLength = routines[routineIndex].exercises.length;
    		if (Math.min(i, j) >= 0 && Math.max(i, j) < routineExerciseLength) {
    			let temp = routines[routineIndex].exercises[i];
    			routines[routineIndex].exercises[i] = routines[routineIndex].exercises[j];
    			routines[routineIndex].exercises[j] = temp;
    		}
    		return routines
    	});
    };

    const getExerciseById = function(id) {
    	for (let exercise of get_store_value(exerciseTable)) {
    		if(exercise.id === id)
    			return exercise
    	}
    	return undefined
    };

    const getExerciseIndexById = function(id) {
    	for (let [i, exercise] of get_store_value(exerciseTable).entries()) {
    		if(exercise.id === id)
    			return i
    	}
    	return undefined
    };

    const getRoutineExercises = function (routine) {
    	return routine.exercises.map(function (routineExercise) {
    		return {
    			...getExerciseById(routineExercise.exerciseId),
    			...routineExercise
    		}
    	})
    };

    const addEmptyExercise = function() {
    	exerciseTable.update(function(exerciseTable) {
    		exerciseTable.push({
    			id: newId(),
    			name: "New Exercise",
    			calories: 0.1
    		});
    		return exerciseTable
    	});
    };

    const addExerciseToRoutine = function(routineIndex, exercise) {
    	routines.update(function(routines) {
    		routines[routineIndex].exercises.push({
    			id: newId(),
    			exerciseId: exercise.id,
    			reps: exercise.lastReps ?? 0,
    			time: exercise.lastTime ?? 30
    		});
    		return routines
    	});
    };

    const addExerciseToCategory = function(categoryIndex, exercise) {
    	categories.update(function(categories) {
    		categories[categoryIndex].exercises.push({
    			id: newId(),
    			exerciseId: exercise.id
    		});
    		return categories
    	});
    };

    const deleteExerciseById = function(exerciseId) {
    	let exerciseIndex = getExerciseIndexById(exerciseId);
    	exerciseTable.update(function (exerciseTable) {
    		return [
    			...exerciseTable.slice(0, exerciseIndex),
    			...exerciseTable.slice(exerciseIndex + 1)
    		]
    	});
    };

    const setExerciseNameAndCalories = function(exerciseId, name, calories) {
    	let exerciseIndex = getExerciseIndexById(exerciseId);
    	exerciseTable.update(function(exerciseTable) {
    		exerciseTable[exerciseIndex].name = name;
    		exerciseTable[exerciseIndex].calories = calories;
    		return exerciseTable
    	});
    };

    const setExerciseDefaultTimeAndReps = function(exerciseId, time, reps) {
    	let exerciseIndex = getExerciseIndexById(exerciseId);
    	exerciseTable.update(function(exerciseTable) {
    		exerciseTable[exerciseIndex].lastTime = time;
    		exerciseTable[exerciseIndex].lastReps = reps;
    		return exerciseTable
    	});
    };

    /** Gets the total time of the ith routine. Includes breaks */
    const getRoutineTime = function (routine) {
    	if (!routine.exercises?.length) return 0
    	let totalTime = 0;

    	for(let { time } of routine.exercises) {
    		totalTime += time || 0;
    	}
    	totalTime += routine.break * (routine.exercises.length - 1);

    	return Math.round(totalTime)
    };

    /** Gets the total calories of the ith routine. */
    const getRoutineCalories = function (routine) {
    	try {
    		let totalCalories = 0;
    	
    		for(let { exerciseId, reps, time } of routine.exercises) {
    			let exercise = getExerciseById(exerciseId);
    			if(exercise !== undefined)
    				totalCalories += exercise.calories * (reps || time);
    		}
    		return Math.round(totalCalories / 10) * 10 // Round to decimal
    	}
    	catch {
    		return 0
    	}
    };

    let id = Number(localStorage.getItem("id")) || 99;
    /** Generates new non-repeating ID. */
    const newId = function() {
    	localStorage.setItem("id", `${id + 1}`);
    	return id++
    };

    // /* DEGUB
    window.log = function() {
    	console.log(get_store_value(routines), get_store_value(exerciseTable), get_store_value(computedRoutines), get_store_value(categories), get_store_value(computedCategories));
    };

    window.wipe = function() {
    	setTimeout(window.location.reload);
    	routines.set(null);
    	exerciseTable.set(null);
    	localStorage.removeItem("routines");
    	localStorage.removeItem("exerciseTable");
    	window.onbeforeunload = null;
    };
    // */

    let dialogue = writable({text: "", callback: function(){}});

    /** Returns answers of yes/no question. */
    const ask = async function(text) {
    	if(get_store_value(dialogue).text) return new Promise(function(resolve) { // already asking
    		resolve(false);
    	})
    	return new Promise(function(resolve) {
    		dialogue.set({text: text, callback: function(value) {
    			dialogue.set({text: "", callback: function(){}});
    			resolve(value);
    		}});
    	})
    };

    /** Returns the index of the option chosen for the question text given. */
    const multiple = async function (text, options) {
    	if(get_store_value(dialogue).text) return new Promise(function(resolve) { // already asking
    		resolve(false);
    	})
    	return new Promise(function(resolve) {
    		dialogue.set({text: text, options: options, callback: function(value) {
    			dialogue.set({text: "", callback: function(){}});
    			resolve(value);
    		}});
    	})
    };

    /* src\comps\Button.svelte generated by Svelte v3.37.0 */

    const file$a = "src\\comps\\Button.svelte";

    function create_fragment$b(ctx) {
    	let button;
    	let t;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			t = text(/*text*/ ctx[1]);
    			attr_dev(button, "class", "svelte-19o5qlr");
    			add_location(button, file$a, 5, 0, 86);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, t);

    			if (!mounted) {
    				dispose = listen_dev(
    					button,
    					"click",
    					function () {
    						if (is_function(/*callback*/ ctx[0])) /*callback*/ ctx[0].apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			if (dirty & /*text*/ 2) set_data_dev(t, /*text*/ ctx[1]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Button", slots, []);

    	let { callback = function () {
    		
    	} } = $$props;

    	let { text = "+" } = $$props;
    	const writable_props = ["callback", "text"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Button> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("callback" in $$props) $$invalidate(0, callback = $$props.callback);
    		if ("text" in $$props) $$invalidate(1, text = $$props.text);
    	};

    	$$self.$capture_state = () => ({ callback, text });

    	$$self.$inject_state = $$props => {
    		if ("callback" in $$props) $$invalidate(0, callback = $$props.callback);
    		if ("text" in $$props) $$invalidate(1, text = $$props.text);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [callback, text];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, { callback: 0, text: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$b.name
    		});
    	}

    	get callback() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set callback(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\comps\HorizontalCard.svelte generated by Svelte v3.37.0 */

    const file$9 = "src\\comps\\HorizontalCard.svelte";

    function create_fragment$a(ctx) {
    	let button;
    	let button_transition;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			button = element("button");
    			if (default_slot) default_slot.c();
    			attr_dev(button, "class", "svelte-1jyxh9d");
    			add_location(button, file$9, 19, 0, 380);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (default_slot) {
    				default_slot.m(button, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(
    					button,
    					"click",
    					function () {
    						if (is_function(/*callback*/ ctx[0])) /*callback*/ ctx[0].apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 4) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[2], dirty, null, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);

    			if (local) {
    				add_render_callback(() => {
    					if (!button_transition) button_transition = create_bidirectional_transition(button, /*trans*/ ctx[1], {}, true);
    					button_transition.run(1);
    				});
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);

    			if (local) {
    				if (!button_transition) button_transition = create_bidirectional_transition(button, /*trans*/ ctx[1], {}, false);
    				button_transition.run(0);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (default_slot) default_slot.d(detaching);
    			if (detaching && button_transition) button_transition.end();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("HorizontalCard", slots, ['default']);

    	let { callback = function () {
    		
    	} } = $$props;

    	let { trans = function (node, { duration = 200, delay = 0 }) {
    		let o = +getComputedStyle(node).opacity;
    		let h = +getComputedStyle(node).height.slice(0, -2);

    		return {
    			duration,
    			delay,
    			css(t) {
    				return `
					opacity: ${o * t};
					height: ${h * t}px;
				`;
    			}
    		};
    	} } = $$props;

    	const writable_props = ["callback", "trans"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<HorizontalCard> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("callback" in $$props) $$invalidate(0, callback = $$props.callback);
    		if ("trans" in $$props) $$invalidate(1, trans = $$props.trans);
    		if ("$$scope" in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ callback, trans });

    	$$self.$inject_state = $$props => {
    		if ("callback" in $$props) $$invalidate(0, callback = $$props.callback);
    		if ("trans" in $$props) $$invalidate(1, trans = $$props.trans);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [callback, trans, $$scope, slots];
    }

    class HorizontalCard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { callback: 0, trans: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "HorizontalCard",
    			options,
    			id: create_fragment$a.name
    		});
    	}

    	get callback() {
    		throw new Error("<HorizontalCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set callback(value) {
    		throw new Error("<HorizontalCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get trans() {
    		throw new Error("<HorizontalCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set trans(value) {
    		throw new Error("<HorizontalCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /** Makes an element emit 2 events, "press" and "hold" */
    function holdable(node, duration = 750) {
    	let clicked = false;
    	let timeout;
    	let triggerPress = true;
    	
    	function onDown() {
    		clicked = true;
    		triggerPress = true;
    		timeout = setTimeout(function () {
    			clicked = false;
    			triggerPress = false;
    			node.dispatchEvent(new CustomEvent("hold"));
    		}, duration);
    	}
    	
    	function onUp() {
    		clearTimeout(timeout);
    		if (triggerPress && clicked) {
    			node.dispatchEvent(new CustomEvent("press"));
    		}
    		triggerPress = true;
    		clicked = false;
    	}
    	
    	function onCancel() {
    		clearTimeout(timeout);
    		triggerPress = true;
    		clicked = false;
    	}
    	
    	node.addEventListener("mousedown", onDown);
    	node.addEventListener("click", onUp);

    	node.addEventListener("touchstart", onDown);
    	node.addEventListener("touchmove", onCancel);
    	node.addEventListener("touchcancel", onCancel);
    	
    	return {
    		destroy() {
    			node.onmousedown = null;
    			node.onmouseup = null;
    			node.ontouchstart = null;
    			node.ontouchmove = null;
    			node.ontouchcancel = null;
    		}
    	}
    }

    /* src\Exercise.svelte generated by Svelte v3.37.0 */
    const file$8 = "src\\Exercise.svelte";

    function create_fragment$9(ctx) {
    	let h1;
    	let t0;
    	let info;
    	let div0;
    	let input0;
    	let span0;
    	let t2;
    	let div1;
    	let input1;
    	let span1;
    	let t4;
    	let div2;
    	let input2;
    	let span2;
    	let t6;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			t0 = space();
    			info = element("info");
    			div0 = element("div");
    			input0 = element("input");
    			span0 = element("span");
    			span0.textContent = "kcal.";
    			t2 = space();
    			div1 = element("div");
    			input1 = element("input");
    			span1 = element("span");
    			span1.textContent = "seconds";
    			t4 = space();
    			div2 = element("div");
    			input2 = element("input");
    			span2 = element("span");
    			span2.textContent = "reps";
    			t6 = space();
    			button = element("button");
    			button.textContent = "OK";
    			attr_dev(h1, "contenteditable", "true");
    			attr_dev(h1, "class", "svelte-kgr7km");
    			if (/*name*/ ctx[0] === void 0) add_render_callback(() => /*h1_input_handler*/ ctx[7].call(h1));
    			add_location(h1, file$8, 25, 0, 593);
    			attr_dev(input0, "type", "number");
    			attr_dev(input0, "class", "svelte-kgr7km");
    			add_location(input0, file$8, 29, 2, 668);
    			add_location(span0, file$8, 29, 47, 713);
    			attr_dev(div0, "class", "svelte-kgr7km");
    			add_location(div0, file$8, 28, 1, 659);
    			attr_dev(input1, "type", "number");
    			attr_dev(input1, "class", "svelte-kgr7km");
    			add_location(input1, file$8, 32, 2, 752);
    			add_location(span1, file$8, 32, 43, 793);
    			attr_dev(div1, "class", "svelte-kgr7km");
    			add_location(div1, file$8, 31, 1, 743);
    			attr_dev(input2, "type", "number");
    			attr_dev(input2, "class", "svelte-kgr7km");
    			add_location(input2, file$8, 35, 2, 834);
    			add_location(span2, file$8, 35, 43, 875);
    			attr_dev(div2, "class", "svelte-kgr7km");
    			add_location(div2, file$8, 34, 1, 825);
    			attr_dev(info, "class", "svelte-kgr7km");
    			add_location(info, file$8, 27, 0, 650);
    			attr_dev(button, "class", "svelte-kgr7km");
    			add_location(button, file$8, 38, 0, 912);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);

    			if (/*name*/ ctx[0] !== void 0) {
    				h1.textContent = /*name*/ ctx[0];
    			}

    			insert_dev(target, t0, anchor);
    			insert_dev(target, info, anchor);
    			append_dev(info, div0);
    			append_dev(div0, input0);
    			set_input_value(input0, /*calories*/ ctx[1]);
    			append_dev(div0, span0);
    			append_dev(info, t2);
    			append_dev(info, div1);
    			append_dev(div1, input1);
    			set_input_value(input1, /*time*/ ctx[2]);
    			append_dev(div1, span1);
    			append_dev(info, t4);
    			append_dev(info, div2);
    			append_dev(div2, input2);
    			set_input_value(input2, /*reps*/ ctx[3]);
    			append_dev(div2, span2);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, button, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(h1, "input", /*h1_input_handler*/ ctx[7]),
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[8]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[9]),
    					listen_dev(input2, "input", /*input2_input_handler*/ ctx[10]),
    					listen_dev(button, "click", /*click_handler*/ ctx[11], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*name*/ 1 && /*name*/ ctx[0] !== h1.textContent) {
    				h1.textContent = /*name*/ ctx[0];
    			}

    			if (dirty & /*calories*/ 2 && to_number(input0.value) !== /*calories*/ ctx[1]) {
    				set_input_value(input0, /*calories*/ ctx[1]);
    			}

    			if (dirty & /*time*/ 4 && to_number(input1.value) !== /*time*/ ctx[2]) {
    				set_input_value(input1, /*time*/ ctx[2]);
    			}

    			if (dirty & /*reps*/ 8 && to_number(input2.value) !== /*reps*/ ctx[3]) {
    				set_input_value(input2, /*reps*/ ctx[3]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(info);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(button);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let $computedRoutines;
    	validate_store(computedRoutines, "computedRoutines");
    	component_subscribe($$self, computedRoutines, $$value => $$invalidate(12, $computedRoutines = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Exercise", slots, []);
    	let { routineIndex = 0 } = $$props;
    	let { routineExerciseIndex = 0 } = $$props;
    	let exercise = $computedRoutines[routineIndex].exercises[routineExerciseIndex];
    	let { name, calories, time, reps } = exercise;
    	const writable_props = ["routineIndex", "routineExerciseIndex"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Exercise> was created with unknown prop '${key}'`);
    	});

    	function h1_input_handler() {
    		name = this.textContent;
    		$$invalidate(0, name);
    	}

    	function input0_input_handler() {
    		calories = to_number(this.value);
    		$$invalidate(1, calories);
    	}

    	function input1_input_handler() {
    		time = to_number(this.value);
    		$$invalidate(2, time);
    	}

    	function input2_input_handler() {
    		reps = to_number(this.value);
    		$$invalidate(3, reps);
    	}

    	const click_handler = function () {
    		setExerciseDefaultTimeAndReps(exercise.exerciseId, time, reps);

    		// goes back to routine
    		hist.update(function (old) {
    			old.shift();
    			if (old[0].title === "Add Exercise") old.shift();
    			return old;
    		});
    	};

    	$$self.$$set = $$props => {
    		if ("routineIndex" in $$props) $$invalidate(5, routineIndex = $$props.routineIndex);
    		if ("routineExerciseIndex" in $$props) $$invalidate(6, routineExerciseIndex = $$props.routineExerciseIndex);
    	};

    	$$self.$capture_state = () => ({
    		routineIndex,
    		routineExerciseIndex,
    		computedRoutines,
    		setExerciseDefaultTimeAndReps,
    		setExerciseNameAndCalories,
    		setRoutineExerciseTimeAndReps,
    		hist,
    		exercise,
    		name,
    		calories,
    		time,
    		reps,
    		$computedRoutines
    	});

    	$$self.$inject_state = $$props => {
    		if ("routineIndex" in $$props) $$invalidate(5, routineIndex = $$props.routineIndex);
    		if ("routineExerciseIndex" in $$props) $$invalidate(6, routineExerciseIndex = $$props.routineExerciseIndex);
    		if ("exercise" in $$props) $$invalidate(4, exercise = $$props.exercise);
    		if ("name" in $$props) $$invalidate(0, name = $$props.name);
    		if ("calories" in $$props) $$invalidate(1, calories = $$props.calories);
    		if ("time" in $$props) $$invalidate(2, time = $$props.time);
    		if ("reps" in $$props) $$invalidate(3, reps = $$props.reps);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*name, calories*/ 3) {
    			setExerciseNameAndCalories(exercise.exerciseId, name, calories);
    		}

    		if ($$self.$$.dirty & /*routineIndex, routineExerciseIndex, time, reps*/ 108) {
    			setRoutineExerciseTimeAndReps(routineIndex, routineExerciseIndex, time, reps);
    		}
    	};

    	return [
    		name,
    		calories,
    		time,
    		reps,
    		exercise,
    		routineIndex,
    		routineExerciseIndex,
    		h1_input_handler,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler,
    		click_handler
    	];
    }

    class Exercise extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { routineIndex: 5, routineExerciseIndex: 6 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Exercise",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get routineIndex() {
    		throw new Error("<Exercise>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set routineIndex(value) {
    		throw new Error("<Exercise>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get routineExerciseIndex() {
    		throw new Error("<Exercise>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set routineExerciseIndex(value) {
    		throw new Error("<Exercise>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Category.svelte generated by Svelte v3.37.0 */
    const file$7 = "src\\Category.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	return child_ctx;
    }

    // (65:3) <HorizontalCard>
    function create_default_slot$3(ctx) {
    	let b;
    	let t0_value = /*exercise*/ ctx[12].name + "";
    	let t0;
    	let t1;
    	let p;
    	let t2_value = /*exercise*/ ctx[12].calories + "";
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			b = element("b");
    			t0 = text(t0_value);
    			t1 = space();
    			p = element("p");
    			t2 = text(t2_value);
    			t3 = text(" kcal.");
    			add_location(b, file$7, 65, 4, 1547);
    			add_location(p, file$7, 66, 4, 1575);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, b, anchor);
    			append_dev(b, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p, anchor);
    			append_dev(p, t2);
    			append_dev(p, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*category*/ 8 && t0_value !== (t0_value = /*exercise*/ ctx[12].name + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*category*/ 8 && t2_value !== (t2_value = /*exercise*/ ctx[12].calories + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(b);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(65:3) <HorizontalCard>",
    		ctx
    	});

    	return block;
    }

    // (41:1) {#each category.exercises as exercise (exercise.id)}
    function create_each_block$4(key_1, ctx) {
    	let div;
    	let horizontalcard;
    	let t;
    	let current;
    	let mounted;
    	let dispose;

    	horizontalcard = new HorizontalCard({
    			props: {
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	function press_handler() {
    		return /*press_handler*/ ctx[7](/*exercise*/ ctx[12]);
    	}

    	function hold_handler() {
    		return /*hold_handler*/ ctx[8](/*exercise*/ ctx[12]);
    	}

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			div = element("div");
    			create_component(horizontalcard.$$.fragment);
    			t = space();
    			attr_dev(div, "id", "exercise");
    			add_location(div, file$7, 41, 2, 1023);
    			this.first = div;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(horizontalcard, div, null);
    			append_dev(div, t);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(holdable.call(null, div)),
    					listen_dev(div, "press", press_handler, false, false, false),
    					listen_dev(div, "hold", hold_handler, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const horizontalcard_changes = {};

    			if (dirty & /*$$scope, category*/ 32776) {
    				horizontalcard_changes.$$scope = { dirty, ctx };
    			}

    			horizontalcard.$set(horizontalcard_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(horizontalcard.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(horizontalcard.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(horizontalcard);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(41:1) {#each category.exercises as exercise (exercise.id)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let h1;
    	let t0;
    	let list;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let t1;
    	let div;
    	let button;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = /*category*/ ctx[3].exercises;
    	validate_each_argument(each_value);
    	const get_key = ctx => /*exercise*/ ctx[12].id;
    	validate_each_keys(ctx, each_value, get_each_context$4, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$4(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$4(key, child_ctx));
    	}

    	button = new Button({
    			props: { callback: /*func*/ ctx[9] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			t0 = space();
    			list = element("list");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t1 = space();
    			div = element("div");
    			create_component(button.$$.fragment);
    			attr_dev(h1, "contenteditable", "true");
    			attr_dev(h1, "class", "svelte-zxhyls");
    			if (/*name*/ ctx[2] === void 0) add_render_callback(() => /*h1_input_handler*/ ctx[6].call(h1));
    			add_location(h1, file$7, 38, 0, 903);
    			add_location(list, file$7, 39, 0, 958);
    			attr_dev(div, "id", "button");
    			attr_dev(div, "class", "svelte-zxhyls");
    			add_location(div, file$7, 72, 0, 1662);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);

    			if (/*name*/ ctx[2] !== void 0) {
    				h1.textContent = /*name*/ ctx[2];
    			}

    			insert_dev(target, t0, anchor);
    			insert_dev(target, list, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(list, null);
    			}

    			insert_dev(target, t1, anchor);
    			insert_dev(target, div, anchor);
    			mount_component(button, div, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(h1, "input", /*h1_input_handler*/ ctx[6]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*name*/ 4 && /*name*/ ctx[2] !== h1.textContent) {
    				h1.textContent = /*name*/ ctx[2];
    			}

    			if (dirty & /*addExerciseToRoutine, routineIndex, getExerciseById, category, goTo, Exercise, $computedRoutines, ask, deleteExerciseById*/ 26) {
    				each_value = /*category*/ ctx[3].exercises;
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context$4, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, list, outro_and_destroy_block, create_each_block$4, null, get_each_context$4);
    				check_outros();
    			}

    			const button_changes = {};
    			if (dirty & /*routineIndex, $exerciseTable, categoryIndex, $computedRoutines*/ 51) button_changes.callback = /*func*/ ctx[9];
    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(list);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div);
    			destroy_component(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let $computedCategories;
    	let $computedRoutines;
    	let $exerciseTable;
    	validate_store(computedCategories, "computedCategories");
    	component_subscribe($$self, computedCategories, $$value => $$invalidate(10, $computedCategories = $$value));
    	validate_store(computedRoutines, "computedRoutines");
    	component_subscribe($$self, computedRoutines, $$value => $$invalidate(4, $computedRoutines = $$value));
    	validate_store(exerciseTable, "exerciseTable");
    	component_subscribe($$self, exerciseTable, $$value => $$invalidate(5, $exerciseTable = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Category", slots, []);
    	let { categoryIndex = 0 } = $$props;
    	let { routineIndex = 0 } = $$props;
    	let category = $computedCategories[categoryIndex];

    	let unsubscribe = computedCategories.subscribe(function (value) {
    		$$invalidate(3, category = value[categoryIndex]);
    	});

    	let name = category.name;
    	onDestroy(unsubscribe);
    	const writable_props = ["categoryIndex", "routineIndex"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Category> was created with unknown prop '${key}'`);
    	});

    	function h1_input_handler() {
    		name = this.textContent;
    		$$invalidate(2, name);
    	}

    	const press_handler = function (exercise) {
    		addExerciseToRoutine(routineIndex, getExerciseById(exercise.exerciseId));

    		goTo(
    			Exercise,
    			{
    				routineIndex,
    				routineExerciseIndex: $computedRoutines[routineIndex].exercises.length - 1
    			},
    			""
    		);
    	};

    	const hold_handler = async function (exercise) {
    		if (await ask(`Delete "${exercise.name}"?`)) deleteExerciseById(exercise.exerciseId);
    	};

    	const func = function () {
    		addEmptyExercise();
    		addExerciseToRoutine(routineIndex, $exerciseTable[$exerciseTable.length - 1]);
    		addExerciseToCategory(categoryIndex, $exerciseTable[$exerciseTable.length - 1]);

    		goTo(
    			Exercise,
    			{
    				routineIndex,
    				routineExerciseIndex: $computedRoutines[routineIndex].exercises.length - 1
    			},
    			""
    		);
    	};

    	$$self.$$set = $$props => {
    		if ("categoryIndex" in $$props) $$invalidate(0, categoryIndex = $$props.categoryIndex);
    		if ("routineIndex" in $$props) $$invalidate(1, routineIndex = $$props.routineIndex);
    	};

    	$$self.$capture_state = () => ({
    		onDestroy,
    		computedCategories,
    		setCategoryName,
    		addExerciseToRoutine,
    		computedRoutines,
    		deleteExerciseById,
    		getExerciseById,
    		addEmptyExercise,
    		exerciseTable,
    		addExerciseToCategory,
    		goTo,
    		ask,
    		holdable,
    		Exercise,
    		HorizontalCard,
    		Button,
    		categoryIndex,
    		routineIndex,
    		category,
    		unsubscribe,
    		name,
    		$computedCategories,
    		$computedRoutines,
    		$exerciseTable
    	});

    	$$self.$inject_state = $$props => {
    		if ("categoryIndex" in $$props) $$invalidate(0, categoryIndex = $$props.categoryIndex);
    		if ("routineIndex" in $$props) $$invalidate(1, routineIndex = $$props.routineIndex);
    		if ("category" in $$props) $$invalidate(3, category = $$props.category);
    		if ("unsubscribe" in $$props) unsubscribe = $$props.unsubscribe;
    		if ("name" in $$props) $$invalidate(2, name = $$props.name);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*categoryIndex, name*/ 5) {
    			setCategoryName(categoryIndex, name);
    		}
    	};

    	return [
    		categoryIndex,
    		routineIndex,
    		name,
    		category,
    		$computedRoutines,
    		$exerciseTable,
    		h1_input_handler,
    		press_handler,
    		hold_handler,
    		func
    	];
    }

    class Category extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { categoryIndex: 0, routineIndex: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Category",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get categoryIndex() {
    		throw new Error("<Category>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set categoryIndex(value) {
    		throw new Error("<Category>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get routineIndex() {
    		throw new Error("<Category>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set routineIndex(value) {
    		throw new Error("<Category>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Categories.svelte generated by Svelte v3.37.0 */
    const file$6 = "src\\Categories.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	child_ctx[6] = i;
    	return child_ctx;
    }

    // (19:3) <HorizontalCard>
    function create_default_slot$2(ctx) {
    	let b;
    	let t0_value = /*category*/ ctx[4].name + "";
    	let t0;
    	let t1;
    	let p;
    	let t2_value = /*category*/ ctx[4].exercises.length + "";
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			b = element("b");
    			t0 = text(t0_value);
    			t1 = space();
    			p = element("p");
    			t2 = text(t2_value);
    			t3 = text(" exercises");
    			add_location(b, file$6, 19, 4, 534);
    			add_location(p, file$6, 20, 4, 562);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, b, anchor);
    			append_dev(b, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p, anchor);
    			append_dev(p, t2);
    			append_dev(p, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$computedCategories*/ 2 && t0_value !== (t0_value = /*category*/ ctx[4].name + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*$computedCategories*/ 2 && t2_value !== (t2_value = /*category*/ ctx[4].exercises.length + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(b);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(19:3) <HorizontalCard>",
    		ctx
    	});

    	return block;
    }

    // (12:1) {#each $computedCategories as category, i (category.id)}
    function create_each_block$3(key_1, ctx) {
    	let div;
    	let horizontalcard;
    	let t;
    	let current;
    	let mounted;
    	let dispose;

    	horizontalcard = new HorizontalCard({
    			props: {
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	function click_handler() {
    		return /*click_handler*/ ctx[2](/*i*/ ctx[6]);
    	}

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			div = element("div");
    			create_component(horizontalcard.$$.fragment);
    			t = space();
    			attr_dev(div, "id", "exercise");
    			attr_dev(div, "class", "svelte-1837hal");
    			add_location(div, file$6, 12, 2, 385);
    			this.first = div;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(horizontalcard, div, null);
    			append_dev(div, t);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div, "click", click_handler, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const horizontalcard_changes = {};

    			if (dirty & /*$$scope, $computedCategories*/ 130) {
    				horizontalcard_changes.$$scope = { dirty, ctx };
    			}

    			horizontalcard.$set(horizontalcard_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(horizontalcard.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(horizontalcard.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(horizontalcard);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(12:1) {#each $computedCategories as category, i (category.id)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let list;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let t;
    	let div;
    	let button;
    	let current;
    	let each_value = /*$computedCategories*/ ctx[1];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*category*/ ctx[4].id;
    	validate_each_keys(ctx, each_value, get_each_context$3, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$3(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$3(key, child_ctx));
    	}

    	button = new Button({
    			props: { callback: /*func*/ ctx[3] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			list = element("list");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			div = element("div");
    			create_component(button.$$.fragment);
    			attr_dev(list, "class", "svelte-1837hal");
    			add_location(list, file$6, 10, 0, 316);
    			attr_dev(div, "id", "button");
    			attr_dev(div, "class", "svelte-1837hal");
    			add_location(div, file$6, 26, 0, 661);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, list, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(list, null);
    			}

    			insert_dev(target, t, anchor);
    			insert_dev(target, div, anchor);
    			mount_component(button, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*goTo, Category, routineIndex, $computedCategories*/ 3) {
    				each_value = /*$computedCategories*/ ctx[1];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context$3, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, list, outro_and_destroy_block, create_each_block$3, null, get_each_context$3);
    				check_outros();
    			}

    			const button_changes = {};
    			if (dirty & /*routineIndex, $computedCategories*/ 3) button_changes.callback = /*func*/ ctx[3];
    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(list);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(div);
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let $computedCategories;
    	validate_store(computedCategories, "computedCategories");
    	component_subscribe($$self, computedCategories, $$value => $$invalidate(1, $computedCategories = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Categories", slots, []);
    	let { routineIndex = 0 } = $$props;
    	const writable_props = ["routineIndex"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Categories> was created with unknown prop '${key}'`);
    	});

    	const click_handler = function (i) {
    		goTo(Category, { routineIndex, categoryIndex: i }, "");
    	};

    	const func = function () {
    		addEmptyCategory();

    		goTo(Category, {
    			routineIndex,
    			categoryIndex: $computedCategories.length - 1
    		});
    	};

    	$$self.$$set = $$props => {
    		if ("routineIndex" in $$props) $$invalidate(0, routineIndex = $$props.routineIndex);
    	};

    	$$self.$capture_state = () => ({
    		goTo,
    		addEmptyCategory,
    		computedCategories,
    		HorizontalCard,
    		Button,
    		Category,
    		routineIndex,
    		$computedCategories
    	});

    	$$self.$inject_state = $$props => {
    		if ("routineIndex" in $$props) $$invalidate(0, routineIndex = $$props.routineIndex);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [routineIndex, $computedCategories, click_handler, func];
    }

    class Categories extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { routineIndex: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Categories",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get routineIndex() {
    		throw new Error("<Categories>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set routineIndex(value) {
    		throw new Error("<Categories>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    let context = new AudioContext();

    /** Makes a beeping sound using the AudioContext API */
    function beep(type = "triangle", duration = 2) {
    	let oscilator = context.createOscillator();
    	let gain = context.createGain();

    	oscilator.connect(gain);
    	gain.connect(context.destination);
    	oscilator.type = type;

    	oscilator.start(0);
    	gain.gain
    		.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
    	oscilator.stop(context.currentTime + duration);
    }

    /* src\comps\KeepAwake.svelte generated by Svelte v3.37.0 */

    function create_fragment$6(ctx) {
    	const block = {
    		c: noop,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("KeepAwake", slots, []);
    	let wakeLock;

    	try {
    		wakeLock = navigator.wakeLock.request("screen");
    	} catch(err) {
    		
    	}

    	onDestroy(async function () {
    		if (wakeLock) {
    			wakeLock = await wakeLock;
    			wakeLock.release();
    		}
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<KeepAwake> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ onDestroy, wakeLock });

    	$$self.$inject_state = $$props => {
    		if ("wakeLock" in $$props) wakeLock = $$props.wakeLock;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [];
    }

    class KeepAwake extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "KeepAwake",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src\Go.svelte generated by Svelte v3.37.0 */
    const file$5 = "src\\Go.svelte";

    // (112:1) {:else}
    function create_else_block$2(ctx) {
    	let div;
    	let div_style_value;
    	let t0;
    	let roundthing;
    	let h1;

    	let t1_value = (/*inBreak*/ ctx[3]
    	? "Break"
    	: /*currentExercise*/ ctx[5].name) + "";

    	let t1;
    	let t2;
    	let t3;
    	let h2;

    	let t4_value = ((/*inBreak*/ ctx[3]
    	? /*$computedRoutines*/ ctx[4][/*i*/ ctx[0]].break
    	: /*currentExercise*/ ctx[5].time) - /*currentTime*/ ctx[2]).toFixed(1) + "";

    	let t4;
    	let t5;

    	function select_block_type_1(ctx, dirty) {
    		if (!/*inBreak*/ ctx[3] && /*currentExercise*/ ctx[5].reps) return create_if_block_2$1;
    		if (/*inBreak*/ ctx[3]) return create_if_block_3;
    	}

    	let current_block_type = select_block_type_1(ctx);
    	let if_block = current_block_type && current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = space();
    			roundthing = element("roundthing");
    			h1 = element("h1");
    			t1 = text(t1_value);
    			t2 = space();
    			if (if_block) if_block.c();
    			t3 = space();
    			h2 = element("h2");
    			t4 = text(t4_value);
    			t5 = text(" sec.");
    			attr_dev(div, "id", "circle");

    			attr_dev(div, "style", div_style_value = `--rotate: ${/*inBreak*/ ctx[3]
			? 360 - /*currentTime*/ ctx[2] / /*$computedRoutines*/ ctx[4][/*i*/ ctx[0]].break * 360
			: /*currentTime*/ ctx[2] / /*currentExercise*/ ctx[5].time * 360}deg`);

    			attr_dev(div, "class", "svelte-1k01av7");
    			add_location(div, file$5, 112, 2, 2430);
    			attr_dev(h1, "class", "svelte-1k01av7");
    			add_location(h1, file$5, 121, 3, 2640);
    			attr_dev(h2, "class", "svelte-1k01av7");
    			add_location(h2, file$5, 127, 3, 2857);
    			attr_dev(roundthing, "class", "svelte-1k01av7");
    			add_location(roundthing, file$5, 120, 2, 2623);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, roundthing, anchor);
    			append_dev(roundthing, h1);
    			append_dev(h1, t1);
    			append_dev(roundthing, t2);
    			if (if_block) if_block.m(roundthing, null);
    			append_dev(roundthing, t3);
    			append_dev(roundthing, h2);
    			append_dev(h2, t4);
    			append_dev(h2, t5);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*inBreak, currentTime, $computedRoutines, i, currentExercise*/ 61 && div_style_value !== (div_style_value = `--rotate: ${/*inBreak*/ ctx[3]
			? 360 - /*currentTime*/ ctx[2] / /*$computedRoutines*/ ctx[4][/*i*/ ctx[0]].break * 360
			: /*currentTime*/ ctx[2] / /*currentExercise*/ ctx[5].time * 360}deg`)) {
    				attr_dev(div, "style", div_style_value);
    			}

    			if (dirty & /*inBreak, currentExercise*/ 40 && t1_value !== (t1_value = (/*inBreak*/ ctx[3]
    			? "Break"
    			: /*currentExercise*/ ctx[5].name) + "")) set_data_dev(t1, t1_value);

    			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if (if_block) if_block.d(1);
    				if_block = current_block_type && current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(roundthing, t3);
    				}
    			}

    			if (dirty & /*inBreak, $computedRoutines, i, currentExercise, currentTime*/ 61 && t4_value !== (t4_value = ((/*inBreak*/ ctx[3]
    			? /*$computedRoutines*/ ctx[4][/*i*/ ctx[0]].break
    			: /*currentExercise*/ ctx[5].time) - /*currentTime*/ ctx[2]).toFixed(1) + "")) set_data_dev(t4, t4_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(roundthing);

    			if (if_block) {
    				if_block.d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(112:1) {:else}",
    		ctx
    	});

    	return block;
    }

    // (110:1) {#if currentExerciseIndex == -1}
    function create_if_block_1$2(ctx) {
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "Start";
    			attr_dev(button, "id", "start");
    			attr_dev(button, "class", "svelte-1k01av7");
    			add_location(button, file$5, 110, 2, 2366);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*start*/ ctx[6], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(110:1) {#if currentExerciseIndex == -1}",
    		ctx
    	});

    	return block;
    }

    // (125:21) 
    function create_if_block_3(ctx) {
    	let h2;
    	let t0;
    	let t1_value = /*currentExercise*/ ctx[5].name + "";
    	let t1;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			t0 = text("Next: ");
    			t1 = text(t1_value);
    			attr_dev(h2, "class", "svelte-1k01av7");
    			add_location(h2, file$5, 125, 4, 2805);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			append_dev(h2, t0);
    			append_dev(h2, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*currentExercise*/ 32 && t1_value !== (t1_value = /*currentExercise*/ ctx[5].name + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(125:21) ",
    		ctx
    	});

    	return block;
    }

    // (123:3) {#if !inBreak && currentExercise.reps}
    function create_if_block_2$1(ctx) {
    	let h2;
    	let t0_value = /*currentExercise*/ ctx[5].reps + "";
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			t0 = text(t0_value);
    			t1 = text(" reps");
    			attr_dev(h2, "class", "svelte-1k01av7");
    			add_location(h2, file$5, 123, 4, 2740);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			append_dev(h2, t0);
    			append_dev(h2, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*currentExercise*/ 32 && t0_value !== (t0_value = /*currentExercise*/ ctx[5].reps + "")) set_data_dev(t0, t0_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(123:3) {#if !inBreak && currentExercise.reps}",
    		ctx
    	});

    	return block;
    }

    // (138:0) {#if currentExerciseIndex !== -1}
    function create_if_block$3(ctx) {
    	let div;
    	let button0;
    	let t1;
    	let button1;
    	let t3;
    	let button2;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			button0 = element("button");
    			button0.textContent = "<";
    			t1 = space();
    			button1 = element("button");
    			button1.textContent = "○";
    			t3 = space();
    			button2 = element("button");
    			button2.textContent = ">";
    			attr_dev(button0, "class", "svelte-1k01av7");
    			add_location(button0, file$5, 139, 2, 3105);
    			attr_dev(button1, "class", "svelte-1k01av7");
    			add_location(button1, file$5, 140, 2, 3146);
    			attr_dev(button2, "class", "svelte-1k01av7");
    			add_location(button2, file$5, 141, 2, 3196);
    			attr_dev(div, "id", "controlbuttons");
    			attr_dev(div, "class", "svelte-1k01av7");
    			add_location(div, file$5, 138, 1, 3076);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button0);
    			append_dev(div, t1);
    			append_dev(div, button1);
    			append_dev(div, t3);
    			append_dev(div, button2);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*back*/ ctx[8], false, false, false),
    					listen_dev(button1, "click", /*playpause*/ ctx[7], false, false, false),
    					listen_dev(button2, "click", /*forward*/ ctx[9], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(138:0) {#if currentExerciseIndex !== -1}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let keepawake;
    	let t0;
    	let container;
    	let t1;
    	let if_block1_anchor;
    	let current;
    	keepawake = new KeepAwake({ $$inline: true });

    	function select_block_type(ctx, dirty) {
    		if (/*currentExerciseIndex*/ ctx[1] == -1) return create_if_block_1$2;
    		return create_else_block$2;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type(ctx);
    	let if_block1 = /*currentExerciseIndex*/ ctx[1] !== -1 && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			create_component(keepawake.$$.fragment);
    			t0 = space();
    			container = element("container");
    			if_block0.c();
    			t1 = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    			attr_dev(container, "class", "svelte-1k01av7");
    			add_location(container, file$5, 108, 0, 2316);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(keepawake, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, container, anchor);
    			if_block0.m(container, null);
    			insert_dev(target, t1, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
    				if_block0.p(ctx, dirty);
    			} else {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(container, null);
    				}
    			}

    			if (/*currentExerciseIndex*/ ctx[1] !== -1) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$3(ctx);
    					if_block1.c();
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(keepawake.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(keepawake.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(keepawake, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(container);
    			if_block0.d();
    			if (detaching) detach_dev(t1);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const intervalTime = 0.1; // time between counts in seconds

    function instance$5($$self, $$props, $$invalidate) {
    	let currentExercise;
    	let $computedRoutines;
    	validate_store(computedRoutines, "computedRoutines");
    	component_subscribe($$self, computedRoutines, $$value => $$invalidate(4, $computedRoutines = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Go", slots, []);
    	let { i = 0 } = $$props; // Routine index
    	let currentExerciseIndex = -1; // -1 means not to start yet.
    	let routine = $computedRoutines[i];
    	let currentTime = 0; // time from exercise/break start in seconds
    	let inBreak = false;
    	let paused = false;

    	let interval = setInterval(
    		function () {
    			if (currentExerciseIndex == -1 || paused) return;
    			$$invalidate(2, currentTime += intervalTime);
    			if (inBreak && currentTime >= $computedRoutines[i].break) finishBreak(); else if (!inBreak && currentTime >= currentExercise.time) finishExercise();
    		},
    		intervalTime * 1000
    	);

    	function finishBreak() {
    		beep("triangle", 4);
    		$$invalidate(2, currentTime = intervalTime);
    		$$invalidate(3, inBreak = false);
    	}

    	function finishExercise() {
    		beep("sine", 4);
    		$$invalidate(2, currentTime = intervalTime);
    		$$invalidate(3, inBreak = true);
    		goToNextExercise();
    	}

    	function goToNextExercise() {
    		if (currentExerciseIndex < routine.exercises.length - 1) $$invalidate(1, currentExerciseIndex++, currentExerciseIndex); else $$invalidate(1, currentExerciseIndex = -1);
    	}

    	function start() {
    		$$invalidate(1, currentExerciseIndex = 0);
    		$$invalidate(2, currentTime = 0);
    		paused = false;
    	}

    	function playpause() {
    		if (currentExerciseIndex == -1) return start();
    		paused = !paused;
    	}

    	function back() {
    		if (currentTime > 3) {
    			$$invalidate(2, currentTime = 0);
    			return;
    		}

    		if (inBreak) {
    			$$invalidate(1, currentExerciseIndex--, currentExerciseIndex);
    			$$invalidate(3, inBreak = false);
    			$$invalidate(2, currentTime = 0);
    			return;
    		}

    		if (currentExerciseIndex == 0) {
    			$$invalidate(1, currentExerciseIndex = -1);
    			return;
    		}

    		$$invalidate(3, inBreak = true);
    		$$invalidate(2, currentTime = 0);
    	}

    	function forward() {
    		$$invalidate(2, currentTime = inBreak
    		? $computedRoutines[i].break
    		: currentExercise.time);
    	}

    	function keyHandler(event) {
    		switch (event.key) {
    			case " ":
    				event.preventDefault();
    				playpause();
    				break;
    			case "ArrowLeft":
    				back();
    				break;
    			case "ArrowRight":
    				forward();
    				break;
    		}
    	}

    	document.addEventListener("keydown", keyHandler);

    	onDestroy(function () {
    		clearInterval(interval);
    		document.removeEventListener("keydown", keyHandler);
    	});

    	const writable_props = ["i"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Go> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("i" in $$props) $$invalidate(0, i = $$props.i);
    	};

    	$$self.$capture_state = () => ({
    		i,
    		computedRoutines,
    		beep,
    		KeepAwake,
    		onDestroy,
    		currentExerciseIndex,
    		routine,
    		currentTime,
    		inBreak,
    		paused,
    		intervalTime,
    		interval,
    		finishBreak,
    		finishExercise,
    		goToNextExercise,
    		start,
    		playpause,
    		back,
    		forward,
    		keyHandler,
    		$computedRoutines,
    		currentExercise
    	});

    	$$self.$inject_state = $$props => {
    		if ("i" in $$props) $$invalidate(0, i = $$props.i);
    		if ("currentExerciseIndex" in $$props) $$invalidate(1, currentExerciseIndex = $$props.currentExerciseIndex);
    		if ("routine" in $$props) $$invalidate(11, routine = $$props.routine);
    		if ("currentTime" in $$props) $$invalidate(2, currentTime = $$props.currentTime);
    		if ("inBreak" in $$props) $$invalidate(3, inBreak = $$props.inBreak);
    		if ("paused" in $$props) paused = $$props.paused;
    		if ("interval" in $$props) interval = $$props.interval;
    		if ("currentExercise" in $$props) $$invalidate(5, currentExercise = $$props.currentExercise);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*currentExerciseIndex*/ 2) {
    			$$invalidate(5, currentExercise = routine.exercises[currentExerciseIndex]);
    		}
    	};

    	return [
    		i,
    		currentExerciseIndex,
    		currentTime,
    		inBreak,
    		$computedRoutines,
    		currentExercise,
    		start,
    		playpause,
    		back,
    		forward
    	];
    }

    class Go extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { i: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Go",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get i() {
    		throw new Error("<Go>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set i(value) {
    		throw new Error("<Go>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }

    /* src\Routine.svelte generated by Svelte v3.37.0 */
    const file$4 = "src\\Routine.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	child_ctx[14] = i;
    	return child_ctx;
    }

    // (39:1) {#if routine.exercises}
    function create_if_block_2(ctx) {
    	let p;
    	let t0_value = /*routine*/ ctx[3].exercises.length + "";
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = text(" exercises");
    			attr_dev(p, "class", "svelte-19o1eed");
    			add_location(p, file$4, 39, 2, 1093);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*routine*/ 8 && t0_value !== (t0_value = /*routine*/ ctx[3].exercises.length + "")) set_data_dev(t0, t0_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(39:1) {#if routine.exercises}",
    		ctx
    	});

    	return block;
    }

    // (99:1) {:else}
    function create_else_block_1(ctx) {
    	let p;
    	let p_intro;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "No exercises.";
    			attr_dev(p, "id", "notfound");
    			attr_dev(p, "class", "svelte-19o1eed");
    			add_location(p, file$4, 99, 2, 2552);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		i: function intro(local) {
    			if (!p_intro) {
    				add_render_callback(() => {
    					p_intro = create_in_transition(p, fade, {});
    					p_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(99:1) {:else}",
    		ctx
    	});

    	return block;
    }

    // (49:1) {#if routine?.exercises?.length}
    function create_if_block$2(ctx) {
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_1_anchor;
    	let current;
    	let each_value = /*routine*/ ctx[3].exercises;
    	validate_each_argument(each_value);
    	const get_key = ctx => /*exercise*/ ctx[12].id;
    	validate_each_keys(ctx, each_value, get_each_context$2, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$2(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$2(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*multiple, routine, removeRoutineExercise, i, swapRoutineExercises, name, undefined, goTo, AddExercise, Math*/ 11) {
    				each_value = /*routine*/ ctx[3].exercises;
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context$2, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block$2, each_1_anchor, get_each_context$2);
    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d(detaching);
    			}

    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(49:1) {#if routine?.exercises?.length}",
    		ctx
    	});

    	return block;
    }

    // (90:5) {:else}
    function create_else_block$1(ctx) {
    	let p0;
    	let t0_value = /*exercise*/ ctx[12].time + "";
    	let t0;
    	let t1;
    	let t2;
    	let p1;
    	let t3_value = Math.round(/*exercise*/ ctx[12].time * /*exercise*/ ctx[12].calories) + "";
    	let t3;
    	let t4;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			t0 = text(t0_value);
    			t1 = text(" seconds");
    			t2 = space();
    			p1 = element("p");
    			t3 = text(t3_value);
    			t4 = text(" kcal.");
    			add_location(p0, file$4, 90, 6, 2366);
    			add_location(p1, file$4, 91, 6, 2404);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t0);
    			append_dev(p0, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, t3);
    			append_dev(p1, t4);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*routine*/ 8 && t0_value !== (t0_value = /*exercise*/ ctx[12].time + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*routine*/ 8 && t3_value !== (t3_value = Math.round(/*exercise*/ ctx[12].time * /*exercise*/ ctx[12].calories) + "")) set_data_dev(t3, t3_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(p1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(90:5) {:else}",
    		ctx
    	});

    	return block;
    }

    // (85:5) {#if exercise.reps}
    function create_if_block_1$1(ctx) {
    	let p0;
    	let t0_value = /*exercise*/ ctx[12].reps + "";
    	let t0;
    	let t1;
    	let t2;
    	let p1;
    	let t3_value = Math.round(/*exercise*/ ctx[12].reps * /*exercise*/ ctx[12].calories) + "";
    	let t3;
    	let t4;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			t0 = text(t0_value);
    			t1 = text(" reps");
    			t2 = space();
    			p1 = element("p");
    			t3 = text(t3_value);
    			t4 = text(" kcal.");
    			add_location(p0, file$4, 85, 6, 2232);
    			add_location(p1, file$4, 86, 6, 2267);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t0);
    			append_dev(p0, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, t3);
    			append_dev(p1, t4);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*routine*/ 8 && t0_value !== (t0_value = /*exercise*/ ctx[12].reps + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*routine*/ 8 && t3_value !== (t3_value = Math.round(/*exercise*/ ctx[12].reps * /*exercise*/ ctx[12].calories) + "")) set_data_dev(t3, t3_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(p1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(85:5) {#if exercise.reps}",
    		ctx
    	});

    	return block;
    }

    // (83:4) <HorizontalCard>
    function create_default_slot$1(ctx) {
    	let b;
    	let t0_value = /*exercise*/ ctx[12].name + "";
    	let t0;
    	let t1;
    	let if_block_anchor;

    	function select_block_type_1(ctx, dirty) {
    		if (/*exercise*/ ctx[12].reps) return create_if_block_1$1;
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type_1(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			b = element("b");
    			t0 = text(t0_value);
    			t1 = space();
    			if_block.c();
    			if_block_anchor = empty();
    			add_location(b, file$4, 83, 5, 2176);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, b, anchor);
    			append_dev(b, t0);
    			insert_dev(target, t1, anchor);
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*routine*/ 8 && t0_value !== (t0_value = /*exercise*/ ctx[12].name + "")) set_data_dev(t0, t0_value);

    			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(b);
    			if (detaching) detach_dev(t1);
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(83:4) <HorizontalCard>",
    		ctx
    	});

    	return block;
    }

    // (50:2) {#each routine.exercises as exercise, j (exercise.id)}
    function create_each_block$2(key_1, ctx) {
    	let div;
    	let horizontalcard;
    	let t;
    	let current;
    	let mounted;
    	let dispose;

    	horizontalcard = new HorizontalCard({
    			props: {
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	function hold_handler() {
    		return /*hold_handler*/ ctx[6](/*exercise*/ ctx[12], /*j*/ ctx[14]);
    	}

    	function press_handler() {
    		return /*press_handler*/ ctx[7](/*j*/ ctx[14]);
    	}

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			div = element("div");
    			create_component(horizontalcard.$$.fragment);
    			t = space();
    			attr_dev(div, "class", "svelte-19o1eed");
    			add_location(div, file$4, 50, 3, 1358);
    			this.first = div;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(horizontalcard, div, null);
    			append_dev(div, t);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(holdable.call(null, div)),
    					listen_dev(div, "hold", hold_handler, false, false, false),
    					listen_dev(div, "press", press_handler, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const horizontalcard_changes = {};

    			if (dirty & /*$$scope, routine*/ 32776) {
    				horizontalcard_changes.$$scope = { dirty, ctx };
    			}

    			horizontalcard.$set(horizontalcard_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(horizontalcard.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(horizontalcard.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(horizontalcard);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(50:2) {#each routine.exercises as exercise, j (exercise.id)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let h1;
    	let t0;
    	let info;
    	let p0;
    	let t1_value = Math.round(/*routine*/ ctx[3].time / 60) + "";
    	let t1;
    	let t2;
    	let t3;
    	let p1;
    	let t4_value = /*routine*/ ctx[3].calories + "";
    	let t4;
    	let t5;
    	let t6;
    	let t7;
    	let div0;
    	let input;
    	let t8;
    	let span;
    	let t10;
    	let list;
    	let current_block_type_index;
    	let if_block1;
    	let t11;
    	let button0;
    	let t13;
    	let div1;
    	let button1;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*routine*/ ctx[3].exercises && create_if_block_2(ctx);
    	const if_block_creators = [create_if_block$2, create_else_block_1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*routine*/ ctx[3]?.exercises?.length) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	button1 = new Button({
    			props: { callback: /*func*/ ctx[9] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			t0 = space();
    			info = element("info");
    			p0 = element("p");
    			t1 = text(t1_value);
    			t2 = text(" minute(s)");
    			t3 = space();
    			p1 = element("p");
    			t4 = text(t4_value);
    			t5 = text(" kcal.");
    			t6 = space();
    			if (if_block0) if_block0.c();
    			t7 = space();
    			div0 = element("div");
    			input = element("input");
    			t8 = space();
    			span = element("span");
    			span.textContent = "second breaks";
    			t10 = space();
    			list = element("list");
    			if_block1.c();
    			t11 = space();
    			button0 = element("button");
    			button0.textContent = "Go!";
    			t13 = space();
    			div1 = element("div");
    			create_component(button1.$$.fragment);
    			attr_dev(h1, "contenteditable", "true");
    			attr_dev(h1, "class", "svelte-19o1eed");
    			if (/*name*/ ctx[1] === void 0) add_render_callback(() => /*h1_input_handler*/ ctx[4].call(h1));
    			add_location(h1, file$4, 34, 0, 917);
    			attr_dev(p0, "class", "svelte-19o1eed");
    			add_location(p0, file$4, 36, 1, 981);
    			attr_dev(p1, "class", "svelte-19o1eed");
    			add_location(p1, file$4, 37, 1, 1032);
    			attr_dev(input, "type", "number");
    			attr_dev(input, "class", "svelte-19o1eed");
    			add_location(input, file$4, 42, 2, 1156);
    			add_location(span, file$4, 43, 2, 1206);
    			attr_dev(div0, "class", "svelte-19o1eed");
    			add_location(div0, file$4, 41, 1, 1147);
    			attr_dev(info, "class", "svelte-19o1eed");
    			add_location(info, file$4, 35, 0, 972);
    			attr_dev(list, "class", "svelte-19o1eed");
    			add_location(list, file$4, 47, 0, 1254);
    			attr_dev(button0, "id", "go");
    			attr_dev(button0, "class", "svelte-19o1eed");
    			add_location(button0, file$4, 102, 0, 2613);
    			attr_dev(div1, "id", "button");
    			attr_dev(div1, "class", "svelte-19o1eed");
    			add_location(div1, file$4, 109, 0, 2736);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);

    			if (/*name*/ ctx[1] !== void 0) {
    				h1.textContent = /*name*/ ctx[1];
    			}

    			insert_dev(target, t0, anchor);
    			insert_dev(target, info, anchor);
    			append_dev(info, p0);
    			append_dev(p0, t1);
    			append_dev(p0, t2);
    			append_dev(info, t3);
    			append_dev(info, p1);
    			append_dev(p1, t4);
    			append_dev(p1, t5);
    			append_dev(info, t6);
    			if (if_block0) if_block0.m(info, null);
    			append_dev(info, t7);
    			append_dev(info, div0);
    			append_dev(div0, input);
    			set_input_value(input, /*breakTime*/ ctx[2]);
    			append_dev(div0, t8);
    			append_dev(div0, span);
    			insert_dev(target, t10, anchor);
    			insert_dev(target, list, anchor);
    			if_blocks[current_block_type_index].m(list, null);
    			insert_dev(target, t11, anchor);
    			insert_dev(target, button0, anchor);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, div1, anchor);
    			mount_component(button1, div1, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(h1, "input", /*h1_input_handler*/ ctx[4]),
    					listen_dev(input, "input", /*input_input_handler*/ ctx[5]),
    					listen_dev(button0, "click", /*click_handler*/ ctx[8], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*name*/ 2 && /*name*/ ctx[1] !== h1.textContent) {
    				h1.textContent = /*name*/ ctx[1];
    			}

    			if ((!current || dirty & /*routine*/ 8) && t1_value !== (t1_value = Math.round(/*routine*/ ctx[3].time / 60) + "")) set_data_dev(t1, t1_value);
    			if ((!current || dirty & /*routine*/ 8) && t4_value !== (t4_value = /*routine*/ ctx[3].calories + "")) set_data_dev(t4, t4_value);

    			if (/*routine*/ ctx[3].exercises) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_2(ctx);
    					if_block0.c();
    					if_block0.m(info, t7);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (dirty & /*breakTime*/ 4 && to_number(input.value) !== /*breakTime*/ ctx[2]) {
    				set_input_value(input, /*breakTime*/ ctx[2]);
    			}

    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block1 = if_blocks[current_block_type_index];

    				if (!if_block1) {
    					if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block1.c();
    				} else {
    					if_block1.p(ctx, dirty);
    				}

    				transition_in(if_block1, 1);
    				if_block1.m(list, null);
    			}

    			const button1_changes = {};
    			if (dirty & /*i*/ 1) button1_changes.callback = /*func*/ ctx[9];
    			button1.$set(button1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block1);
    			transition_in(button1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block1);
    			transition_out(button1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(info);
    			if (if_block0) if_block0.d();
    			if (detaching) detach_dev(t10);
    			if (detaching) detach_dev(list);
    			if_blocks[current_block_type_index].d();
    			if (detaching) detach_dev(t11);
    			if (detaching) detach_dev(button0);
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(div1);
    			destroy_component(button1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let $computedRoutines;
    	validate_store(computedRoutines, "computedRoutines");
    	component_subscribe($$self, computedRoutines, $$value => $$invalidate(10, $computedRoutines = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Routine", slots, []);
    	let { i = 0 } = $$props;
    	let routine = $computedRoutines[i];
    	let name = routine.name;
    	let breakTime = routine.break;

    	let unsubscribe = computedRoutines.subscribe(function (computedRoutines) {
    		$$invalidate(3, routine = computedRoutines[i]);
    	});

    	onDestroy(unsubscribe);
    	const writable_props = ["i"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Routine> was created with unknown prop '${key}'`);
    	});

    	function h1_input_handler() {
    		name = this.textContent;
    		$$invalidate(1, name);
    	}

    	function input_input_handler() {
    		breakTime = to_number(this.value);
    		$$invalidate(2, breakTime);
    	}

    	const hold_handler = async function (exercise, j) {
    		let action = await multiple(`What do you want to do with "${exercise.name}"?`, ["Remove", "Move Up", "Move Down", "Cancel"]);

    		switch (action) {
    			case 0:
    				// Removes jth exercise
    				removeRoutineExercise(i, j);
    				break;
    			case 1:
    				// Moves jth exercise up
    				swapRoutineExercises(i, j, j - 1);
    				break;
    			case 2:
    				// Moves jth exercise down
    				swapRoutineExercises(i, j, j + 1);
    				break;
    		}
    	};

    	const press_handler = function (j) {
    		if (name !== undefined) // i.e. if exercise exists
    		goTo(Exercise, { routineIndex: i, routineExerciseIndex: j });
    	};

    	const click_handler = function () {
    		if (routine.exercises.length) goTo(Go, { i }, "");
    	};

    	const func = function () {
    		goTo(Categories, { routineIndex: i }, "Add Exercise");
    	};

    	$$self.$$set = $$props => {
    		if ("i" in $$props) $$invalidate(0, i = $$props.i);
    	};

    	$$self.$capture_state = () => ({
    		i,
    		Button,
    		HorizontalCard,
    		Categories,
    		Go,
    		AddExercise: Exercise,
    		computedRoutines,
    		removeRoutineExercise,
    		setRoutineNameAndBreak,
    		swapRoutineExercises,
    		goTo,
    		multiple,
    		holdable,
    		fade,
    		onDestroy,
    		routine,
    		name,
    		breakTime,
    		unsubscribe,
    		$computedRoutines
    	});

    	$$self.$inject_state = $$props => {
    		if ("i" in $$props) $$invalidate(0, i = $$props.i);
    		if ("routine" in $$props) $$invalidate(3, routine = $$props.routine);
    		if ("name" in $$props) $$invalidate(1, name = $$props.name);
    		if ("breakTime" in $$props) $$invalidate(2, breakTime = $$props.breakTime);
    		if ("unsubscribe" in $$props) unsubscribe = $$props.unsubscribe;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*i, name, breakTime*/ 7) {
    			setRoutineNameAndBreak(i, name, breakTime);
    		}
    	};

    	return [
    		i,
    		name,
    		breakTime,
    		routine,
    		h1_input_handler,
    		input_input_handler,
    		hold_handler,
    		press_handler,
    		click_handler,
    		func
    	];
    }

    class Routine extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { i: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Routine",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get i() {
    		throw new Error("<Routine>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set i(value) {
    		throw new Error("<Routine>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Routines.svelte generated by Svelte v3.37.0 */
    const file$3 = "src\\Routines.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	child_ctx[6] = i;
    	return child_ctx;
    }

    // (26:3) <HorizontalCard>
    function create_default_slot(ctx) {
    	let b;
    	let t0_value = /*routine*/ ctx[4].name + "";
    	let t0;
    	let t1;
    	let p0;
    	let t2_value = Math.round(/*routine*/ ctx[4].time / 60) + "";
    	let t2;
    	let t3;
    	let t4;
    	let p1;
    	let t5_value = /*routine*/ ctx[4].calories + "";
    	let t5;
    	let t6;

    	const block = {
    		c: function create() {
    			b = element("b");
    			t0 = text(t0_value);
    			t1 = space();
    			p0 = element("p");
    			t2 = text(t2_value);
    			t3 = text(" min.");
    			t4 = space();
    			p1 = element("p");
    			t5 = text(t5_value);
    			t6 = text(" kcal.");
    			add_location(b, file$3, 26, 4, 690);
    			add_location(p0, file$3, 27, 4, 717);
    			add_location(p1, file$3, 30, 4, 779);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, b, anchor);
    			append_dev(b, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t2);
    			append_dev(p0, t3);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, t5);
    			append_dev(p1, t6);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$computedRoutines*/ 1 && t0_value !== (t0_value = /*routine*/ ctx[4].name + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*$computedRoutines*/ 1 && t2_value !== (t2_value = Math.round(/*routine*/ ctx[4].time / 60) + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*$computedRoutines*/ 1 && t5_value !== (t5_value = /*routine*/ ctx[4].calories + "")) set_data_dev(t5, t5_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(b);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(p1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(26:3) <HorizontalCard>",
    		ctx
    	});

    	return block;
    }

    // (16:1) {#each $computedRoutines as routine, i (routine.id)}
    function create_each_block$1(key_1, ctx) {
    	let div;
    	let horizontalcard;
    	let current;
    	let mounted;
    	let dispose;

    	horizontalcard = new HorizontalCard({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	function press_handler() {
    		return /*press_handler*/ ctx[1](/*i*/ ctx[6]);
    	}

    	function hold_handler() {
    		return /*hold_handler*/ ctx[2](/*routine*/ ctx[4], /*i*/ ctx[6]);
    	}

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			div = element("div");
    			create_component(horizontalcard.$$.fragment);
    			attr_dev(div, "class", "svelte-1n6ushe");
    			add_location(div, file$3, 16, 2, 466);
    			this.first = div;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(horizontalcard, div, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(holdable.call(null, div)),
    					listen_dev(div, "press", press_handler, false, false, false),
    					listen_dev(div, "hold", hold_handler, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const horizontalcard_changes = {};

    			if (dirty & /*$$scope, $computedRoutines*/ 129) {
    				horizontalcard_changes.$$scope = { dirty, ctx };
    			}

    			horizontalcard.$set(horizontalcard_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(horizontalcard.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(horizontalcard.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(horizontalcard);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(16:1) {#each $computedRoutines as routine, i (routine.id)}",
    		ctx
    	});

    	return block;
    }

    // (35:1) {#if $computedRoutines.length == 0}
    function create_if_block$1(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "No routines";
    			attr_dev(p, "id", "notfound");
    			attr_dev(p, "class", "svelte-1n6ushe");
    			add_location(p, file$3, 35, 2, 894);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(35:1) {#if $computedRoutines.length == 0}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div0;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let t0;
    	let t1;
    	let div1;
    	let button;
    	let current;
    	let each_value = /*$computedRoutines*/ ctx[0];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*routine*/ ctx[4].id;
    	validate_each_keys(ctx, each_value, get_each_context$1, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$1(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
    	}

    	let if_block = /*$computedRoutines*/ ctx[0].length == 0 && create_if_block$1(ctx);

    	button = new Button({
    			props: { callback: /*func*/ ctx[3] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			if (if_block) if_block.c();
    			t1 = space();
    			div1 = element("div");
    			create_component(button.$$.fragment);
    			attr_dev(div0, "id", "list");
    			attr_dev(div0, "class", "svelte-1n6ushe");
    			add_location(div0, file$3, 14, 0, 392);
    			attr_dev(div1, "id", "button");
    			attr_dev(div1, "class", "svelte-1n6ushe");
    			add_location(div1, file$3, 39, 0, 946);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			append_dev(div0, t0);
    			if (if_block) if_block.m(div0, null);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			mount_component(button, div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*goTo, Routine, $computedRoutines, ask, deleteRoutine, Math*/ 1) {
    				each_value = /*$computedRoutines*/ ctx[0];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context$1, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div0, outro_and_destroy_block, create_each_block$1, t0, get_each_context$1);
    				check_outros();
    			}

    			if (/*$computedRoutines*/ ctx[0].length == 0) {
    				if (if_block) ; else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(div0, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			const button_changes = {};
    			if (dirty & /*$computedRoutines*/ 1) button_changes.callback = /*func*/ ctx[3];
    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			if (if_block) if_block.d();
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let $computedRoutines;
    	validate_store(computedRoutines, "computedRoutines");
    	component_subscribe($$self, computedRoutines, $$value => $$invalidate(0, $computedRoutines = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Routines", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Routines> was created with unknown prop '${key}'`);
    	});

    	const press_handler = function (i) {
    		goTo(Routine, { i }, "");
    	};

    	const hold_handler = async function (routine, i) {
    		if (await ask(`Delete "${routine.name}"?`)) deleteRoutine(i);
    	};

    	const func = function () {
    		addEmptyRoutine();
    		goTo(Routine, { i: $computedRoutines.length - 1 }, "");
    	};

    	$$self.$capture_state = () => ({
    		computedRoutines,
    		addEmptyRoutine,
    		deleteRoutine,
    		goTo,
    		ask,
    		Button,
    		HorizontalCard,
    		Routine,
    		holdable,
    		$computedRoutines
    	});

    	return [$computedRoutines, press_handler, hold_handler, func];
    }

    class Routines extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Routines",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    const hist = writable([ // history
    	{page: Routines, props: {}, title: "Routines"}
    ]);

    /** Goes to a component as page */
    const goTo = function (page = Routines, props = {}, title = "Routines") {
    	window.history.pushState({}, title, location.href);
    	hist.update(function(old) {
    		return [{page, props, title}, ...old]
    	});
    };

    /** Goes back n pages in history */
    const goBack = function (n = 1) {
    	if(get_store_value(hist).length <= 1) return true
    	window.history.go(-n);
    };

    /** Handles the back button */
    window.onpopstate = function () {
    	if(get_store_value(hist).length <= 1) return
    	hist.update(function(old) {
    		return old.slice(1)
    	});
    };

    /* src\Bar.svelte generated by Svelte v3.37.0 */
    const file$2 = "src\\Bar.svelte";

    function create_fragment$2(ctx) {
    	let div0;
    	let button;
    	let t0;
    	let button_style_value;
    	let t1;
    	let p;
    	let t2_value = /*$hist*/ ctx[0][0].title + "";
    	let t2;
    	let div0_style_value;
    	let t3;
    	let div1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			button = element("button");
    			t0 = text("<");
    			t1 = space();
    			p = element("p");
    			t2 = text(t2_value);
    			t3 = space();
    			div1 = element("div");
    			attr_dev(button, "style", button_style_value = /*$hist*/ ctx[0].length == 1 ? "display: none;" : "");
    			attr_dev(button, "class", "svelte-5w25g5");
    			add_location(button, file$2, 5, 1, 135);
    			attr_dev(p, "class", "svelte-5w25g5");
    			add_location(p, file$2, 11, 1, 262);
    			attr_dev(div0, "id", "bar");
    			attr_dev(div0, "style", div0_style_value = /*$hist*/ ctx[0][0].title ? "" : "border: none;");
    			attr_dev(div0, "class", "svelte-5w25g5");
    			add_location(div0, file$2, 4, 0, 72);
    			attr_dev(div1, "id", "space");
    			attr_dev(div1, "class", "svelte-5w25g5");
    			add_location(div1, file$2, 13, 0, 295);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, button);
    			append_dev(button, t0);
    			append_dev(div0, t1);
    			append_dev(div0, p);
    			append_dev(p, t2);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div1, anchor);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$hist*/ 1 && button_style_value !== (button_style_value = /*$hist*/ ctx[0].length == 1 ? "display: none;" : "")) {
    				attr_dev(button, "style", button_style_value);
    			}

    			if (dirty & /*$hist*/ 1 && t2_value !== (t2_value = /*$hist*/ ctx[0][0].title + "")) set_data_dev(t2, t2_value);

    			if (dirty & /*$hist*/ 1 && div0_style_value !== (div0_style_value = /*$hist*/ ctx[0][0].title ? "" : "border: none;")) {
    				attr_dev(div0, "style", div0_style_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $hist;
    	validate_store(hist, "hist");
    	component_subscribe($$self, hist, $$value => $$invalidate(0, $hist = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Bar", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Bar> was created with unknown prop '${key}'`);
    	});

    	const click_handler = function () {
    		goBack(1);
    	};

    	$$self.$capture_state = () => ({ hist, goBack, $hist });
    	return [$hist, click_handler];
    }

    class Bar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Bar",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\Dialogue.svelte generated by Svelte v3.37.0 */
    const file$1 = "src\\Dialogue.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	child_ctx[6] = i;
    	return child_ctx;
    }

    // (6:0) {#if $dialogue.text}
    function create_if_block(ctx) {
    	let darken;
    	let box;
    	let h1;
    	let t0_value = /*$dialogue*/ ctx[0].text + "";
    	let t0;
    	let t1;
    	let buttoncontainer;
    	let darken_transition;
    	let current;

    	function select_block_type(ctx, dirty) {
    		if (/*$dialogue*/ ctx[0].options === undefined) return create_if_block_1;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			darken = element("darken");
    			box = element("box");
    			h1 = element("h1");
    			t0 = text(t0_value);
    			t1 = space();
    			buttoncontainer = element("buttoncontainer");
    			if_block.c();
    			attr_dev(h1, "class", "svelte-7vg1f8");
    			add_location(h1, file$1, 8, 3, 193);
    			attr_dev(buttoncontainer, "class", "svelte-7vg1f8");
    			add_location(buttoncontainer, file$1, 9, 3, 223);
    			attr_dev(box, "class", "svelte-7vg1f8");
    			add_location(box, file$1, 7, 2, 183);
    			attr_dev(darken, "class", "svelte-7vg1f8");
    			add_location(darken, file$1, 6, 1, 135);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, darken, anchor);
    			append_dev(darken, box);
    			append_dev(box, h1);
    			append_dev(h1, t0);
    			append_dev(box, t1);
    			append_dev(box, buttoncontainer);
    			if_block.m(buttoncontainer, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*$dialogue*/ 1) && t0_value !== (t0_value = /*$dialogue*/ ctx[0].text + "")) set_data_dev(t0, t0_value);

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(buttoncontainer, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!darken_transition) darken_transition = create_bidirectional_transition(darken, fade, { duration: 100 }, true);
    				darken_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!darken_transition) darken_transition = create_bidirectional_transition(darken, fade, { duration: 100 }, false);
    			darken_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(darken);
    			if_block.d();
    			if (detaching && darken_transition) darken_transition.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(6:0) {#if $dialogue.text}",
    		ctx
    	});

    	return block;
    }

    // (24:4) {:else}
    function create_else_block(ctx) {
    	let each_1_anchor;
    	let each_value = /*$dialogue*/ ctx[0].options;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$dialogue*/ 1) {
    				each_value = /*$dialogue*/ ctx[0].options;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(24:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (11:4) {#if $dialogue.options === undefined}
    function create_if_block_1(ctx) {
    	let button0;
    	let t1;
    	let button1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button0 = element("button");
    			button0.textContent = "Yes";
    			t1 = space();
    			button1 = element("button");
    			button1.textContent = "No";
    			attr_dev(button0, "id", "yes");
    			attr_dev(button0, "class", "svelte-7vg1f8");
    			add_location(button0, file$1, 11, 5, 290);
    			attr_dev(button1, "id", "no");
    			attr_dev(button1, "class", "svelte-7vg1f8");
    			add_location(button1, file$1, 17, 5, 414);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, button1, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[1], false, false, false),
    					listen_dev(button1, "click", /*click_handler_1*/ ctx[2], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(button1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(11:4) {#if $dialogue.options === undefined}",
    		ctx
    	});

    	return block;
    }

    // (25:5) {#each $dialogue.options as option, i}
    function create_each_block(ctx) {
    	let button;
    	let t_value = /*option*/ ctx[4] + "";
    	let t;
    	let mounted;
    	let dispose;

    	function click_handler_2() {
    		return /*click_handler_2*/ ctx[3](/*i*/ ctx[6]);
    	}

    	const block = {
    		c: function create() {
    			button = element("button");
    			t = text(t_value);
    			set_style(button, "width", "100%");
    			attr_dev(button, "class", "svelte-7vg1f8");
    			add_location(button, file$1, 25, 6, 596);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, t);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", click_handler_2, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*$dialogue*/ 1 && t_value !== (t_value = /*option*/ ctx[4] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(25:5) {#each $dialogue.options as option, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*$dialogue*/ ctx[0].text && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$dialogue*/ ctx[0].text) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$dialogue*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $dialogue;
    	validate_store(dialogue, "dialogue");
    	component_subscribe($$self, dialogue, $$value => $$invalidate(0, $dialogue = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Dialogue", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Dialogue> was created with unknown prop '${key}'`);
    	});

    	const click_handler = function () {
    		$dialogue.callback(true);
    	};

    	const click_handler_1 = function () {
    		$dialogue.callback(false);
    	};

    	const click_handler_2 = function (i) {
    		$dialogue.callback(i);
    	};

    	$$self.$capture_state = () => ({ dialogue, fade, $dialogue });
    	return [$dialogue, click_handler, click_handler_1, click_handler_2];
    }

    class Dialogue extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Dialogue",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.37.0 */
    const file = "src\\App.svelte";

    // (22:0) {#key $hist[0]}
    function create_key_block(ctx) {
    	let div;
    	let switch_instance;
    	let div_intro;
    	let current;
    	const switch_instance_spread_levels = [/*$hist*/ ctx[0][0].props];
    	var switch_value = /*$hist*/ ctx[0][0].page;

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			attr_dev(div, "class", "svelte-19uewan");
    			add_location(div, file, 22, 1, 529);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (switch_instance) {
    				mount_component(switch_instance, div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*$hist*/ 1)
    			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*$hist*/ ctx[0][0].props)])
    			: {};

    			if (switch_value !== (switch_value = /*$hist*/ ctx[0][0].page)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, div, null);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);

    			if (!div_intro) {
    				add_render_callback(() => {
    					div_intro = create_in_transition(div, fade, { duration: 100, delay: 50 });
    					div_intro.start();
    				});
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (switch_instance) destroy_component(switch_instance);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_key_block.name,
    		type: "key",
    		source: "(22:0) {#key $hist[0]}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let bar;
    	let t0;
    	let previous_key = /*$hist*/ ctx[0][0];
    	let t1;
    	let dialogue;
    	let current;
    	bar = new Bar({ $$inline: true });
    	let key_block = create_key_block(ctx);
    	dialogue = new Dialogue({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(bar.$$.fragment);
    			t0 = space();
    			key_block.c();
    			t1 = space();
    			create_component(dialogue.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(bar, target, anchor);
    			insert_dev(target, t0, anchor);
    			key_block.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(dialogue, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$hist*/ 1 && safe_not_equal(previous_key, previous_key = /*$hist*/ ctx[0][0])) {
    				group_outros();
    				transition_out(key_block, 1, 1, noop);
    				check_outros();
    				key_block = create_key_block(ctx);
    				key_block.c();
    				transition_in(key_block);
    				key_block.m(t1.parentNode, t1);
    			} else {
    				key_block.p(ctx, dirty);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(bar.$$.fragment, local);
    			transition_in(key_block);
    			transition_in(dialogue.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(bar.$$.fragment, local);
    			transition_out(key_block);
    			transition_out(dialogue.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(bar, detaching);
    			if (detaching) detach_dev(t0);
    			key_block.d(detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(dialogue, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let $hist;
    	validate_store(hist, "hist");
    	component_subscribe($$self, hist, $$value => $$invalidate(0, $hist = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);

    	document.addEventListener("keydown", function (event) {
    		switch (event.key) {
    			case "Escape":
    				goBack();
    				break;
    			case " ":
    				let event = document.createEvent("MouseEvents");
    				event.initEvent("mousedown", true, true);
    				document.activeElement.dispatchEvent(event);
    				break;
    		}
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ goBack, hist, Bar, Dialogue, fade, $hist });
    	return [$hist];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
