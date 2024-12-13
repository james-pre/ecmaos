var Xa = Object.defineProperty;
var Qe = (e) => {
  throw TypeError(e);
};
var Qa = (e, a, r) => a in e ? Xa(e, a, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[a] = r;
var d = (e, a, r) => Qa(e, typeof a != "symbol" ? a + "" : a, r), Ve = (e, a, r) => a.has(e) || Qe("Cannot " + r);
var s = (e, a, r) => (Ve(e, a, "read from private field"), r ? r.call(e) : a.get(e)), D = (e, a, r) => a.has(e) ? Qe("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(e) : a.set(e, r), m = (e, a, r, n) => (Ve(e, a, "write to private field"), n ? n.call(e, r) : a.set(e, r), r), g = (e, a, r) => (Ve(e, a, "access private method"), r);
var ea = (e, a, r, n) => ({
  set _(i) {
    m(e, a, i, r);
  },
  get _() {
    return s(e, a, n);
  }
});
var er = async (e, a = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = !1, dot: n = !1 } = a, u = (e instanceof Ba ? e.raw.headers : e.headers).get("Content-Type");
  return u != null && u.startsWith("multipart/form-data") || u != null && u.startsWith("application/x-www-form-urlencoded") ? ar(e, { all: r, dot: n }) : {};
};
async function ar(e, a) {
  const r = await e.formData();
  return r ? rr(r, a) : {};
}
function rr(e, a) {
  const r = /* @__PURE__ */ Object.create(null);
  return e.forEach((n, i) => {
    a.all || i.endsWith("[]") ? nr(r, i, n) : r[i] = n;
  }), a.dot && Object.entries(r).forEach(([n, i]) => {
    n.includes(".") && (ir(r, n, i), delete r[n]);
  }), r;
}
var nr = (e, a, r) => {
  e[a] !== void 0 ? Array.isArray(e[a]) ? e[a].push(r) : e[a] = [e[a], r] : e[a] = r;
}, ir = (e, a, r) => {
  let n = e;
  const i = a.split(".");
  i.forEach((u, t) => {
    t === i.length - 1 ? n[u] = r : ((!n[u] || typeof n[u] != "object" || Array.isArray(n[u]) || n[u] instanceof File) && (n[u] = /* @__PURE__ */ Object.create(null)), n = n[u]);
  });
}, ba = (e) => {
  const a = e.split("/");
  return a[0] === "" && a.shift(), a;
}, ur = (e) => {
  const { groups: a, path: r } = tr(e), n = ba(r);
  return or(n, a);
}, tr = (e) => {
  const a = [];
  return e = e.replace(/\{[^}]+\}/g, (r, n) => {
    const i = `@${n}`;
    return a.push([i, r]), i;
  }), { groups: a, path: e };
}, or = (e, a) => {
  for (let r = a.length - 1; r >= 0; r--) {
    const [n] = a[r];
    for (let i = e.length - 1; i >= 0; i--)
      if (e[i].includes(n)) {
        e[i] = e[i].replace(n, a[r][1]);
        break;
      }
  }
  return e;
}, Le = {}, aa = (e) => {
  if (e === "*")
    return "*";
  const a = e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  return a ? (Le[e] || (a[2] ? Le[e] = [e, a[1], new RegExp("^" + a[2] + "$")] : Le[e] = [e, a[1], !0]), Le[e]) : null;
}, fa = (e, a) => {
  try {
    return a(e);
  } catch {
    return e.replace(/(?:%[0-9A-Fa-f]{2})+/g, (r) => {
      try {
        return a(r);
      } catch {
        return r;
      }
    });
  }
}, lr = (e) => fa(e, decodeURI), Ca = (e) => {
  const a = e.url, r = a.indexOf("/", 8);
  let n = r;
  for (; n < a.length; n++) {
    const i = a.charCodeAt(n);
    if (i === 37) {
      const u = a.indexOf("?", n), t = a.slice(r, u === -1 ? void 0 : u);
      return lr(t.includes("%25") ? t.replace(/%25/g, "%2525") : t);
    } else if (i === 63)
      break;
  }
  return a.slice(r, n);
}, sr = (e) => {
  const a = Ca(e);
  return a.length > 1 && a[a.length - 1] === "/" ? a.slice(0, -1) : a;
}, fe = (...e) => {
  let a = "", r = !1;
  for (let n of e)
    a[a.length - 1] === "/" && (a = a.slice(0, -1), r = !0), n[0] !== "/" && (n = `/${n}`), n === "/" && r ? a = `${a}/` : n !== "/" && (a = `${a}${n}`), n === "/" && a === "" && (a = "/");
  return a;
}, Ea = (e) => {
  if (!e.match(/\:.+\?$/))
    return null;
  const a = e.split("/"), r = [];
  let n = "";
  return a.forEach((i) => {
    if (i !== "" && !/\:/.test(i))
      n += "/" + i;
    else if (/\:/.test(i))
      if (/\?/.test(i)) {
        r.length === 0 && n === "" ? r.push("/") : r.push(n);
        const u = i.replace("?", "");
        n += "/" + u, r.push(n);
      } else
        n += "/" + i;
  }), r.filter((i, u, t) => t.indexOf(i) === u);
}, je = (e) => /[%+]/.test(e) ? (e.indexOf("+") !== -1 && (e = e.replace(/\+/g, " ")), e.indexOf("%") !== -1 ? Aa(e) : e) : e, ka = (e, a, r) => {
  let n;
  if (!r && a && !/[%+]/.test(a)) {
    let t = e.indexOf(`?${a}`, 8);
    for (t === -1 && (t = e.indexOf(`&${a}`, 8)); t !== -1; ) {
      const l = e.charCodeAt(t + a.length + 1);
      if (l === 61) {
        const F = t + a.length + 2, o = e.indexOf("&", F);
        return je(e.slice(F, o === -1 ? void 0 : o));
      } else if (l == 38 || isNaN(l))
        return "";
      t = e.indexOf(`&${a}`, t + 1);
    }
    if (n = /[%+]/.test(e), !n)
      return;
  }
  const i = {};
  n ?? (n = /[%+]/.test(e));
  let u = e.indexOf("?", 8);
  for (; u !== -1; ) {
    const t = e.indexOf("&", u + 1);
    let l = e.indexOf("=", u);
    l > t && t !== -1 && (l = -1);
    let F = e.slice(
      u + 1,
      l === -1 ? t === -1 ? void 0 : t : l
    );
    if (n && (F = je(F)), u = t, F === "")
      continue;
    let o;
    l === -1 ? o = "" : (o = e.slice(l + 1, t === -1 ? void 0 : t), n && (o = je(o))), r ? (i[F] && Array.isArray(i[F]) || (i[F] = []), i[F].push(o)) : i[F] ?? (i[F] = o);
  }
  return a ? i[a] : i;
}, Fr = ka, cr = (e, a) => ka(e, a, !0), Aa = decodeURIComponent, ra = (e) => fa(e, Aa), he, W, q, Sa, va, Ue, X, Fa, Ba = (Fa = class {
  constructor(e, a = "/", r = [[]]) {
    D(this, q);
    d(this, "raw");
    D(this, he);
    D(this, W);
    d(this, "routeIndex", 0);
    d(this, "path");
    d(this, "bodyCache", {});
    D(this, X, (e) => {
      const { bodyCache: a, raw: r } = this, n = a[e];
      if (n)
        return n;
      const i = Object.keys(a)[0];
      return i ? a[i].then((u) => (i === "json" && (u = JSON.stringify(u)), new Response(u)[e]())) : a[e] = r[e]();
    });
    this.raw = e, this.path = a, m(this, W, r), m(this, he, {});
  }
  param(e) {
    return e ? g(this, q, Sa).call(this, e) : g(this, q, va).call(this);
  }
  query(e) {
    return Fr(this.url, e);
  }
  queries(e) {
    return cr(this.url, e);
  }
  header(e) {
    if (e)
      return this.raw.headers.get(e.toLowerCase()) ?? void 0;
    const a = {};
    return this.raw.headers.forEach((r, n) => {
      a[n] = r;
    }), a;
  }
  async parseBody(e) {
    var a;
    return (a = this.bodyCache).parsedBody ?? (a.parsedBody = await er(this, e));
  }
  json() {
    return s(this, X).call(this, "json");
  }
  text() {
    return s(this, X).call(this, "text");
  }
  arrayBuffer() {
    return s(this, X).call(this, "arrayBuffer");
  }
  blob() {
    return s(this, X).call(this, "blob");
  }
  formData() {
    return s(this, X).call(this, "formData");
  }
  addValidatedData(e, a) {
    s(this, he)[e] = a;
  }
  valid(e) {
    return s(this, he)[e];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get matchedRoutes() {
    return s(this, W)[0].map(([[, e]]) => e);
  }
  get routePath() {
    return s(this, W)[0].map(([[, e]]) => e)[this.routeIndex].path;
  }
}, he = new WeakMap(), W = new WeakMap(), q = new WeakSet(), Sa = function(e) {
  const a = s(this, W)[0][this.routeIndex][1][e], r = g(this, q, Ue).call(this, a);
  return r ? /\%/.test(r) ? ra(r) : r : void 0;
}, va = function() {
  const e = {}, a = Object.keys(s(this, W)[0][this.routeIndex][1]);
  for (const r of a) {
    const n = g(this, q, Ue).call(this, s(this, W)[0][this.routeIndex][1][r]);
    n && typeof n == "string" && (e[r] = /\%/.test(n) ? ra(n) : n);
  }
  return e;
}, Ue = function(e) {
  return s(this, W)[1] ? s(this, W)[1][e] : e;
}, X = new WeakMap(), Fa), dr = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
}, wa = async (e, a, r, n, i) => {
  typeof e == "object" && !(e instanceof String) && (e instanceof Promise || (e = e.toString()), e instanceof Promise && (e = await e));
  const u = e.callbacks;
  return u != null && u.length ? (i ? i[0] += e : i = [e], Promise.all(u.map((l) => l({ phase: a, buffer: i, context: n }))).then(
    (l) => Promise.all(
      l.filter(Boolean).map((F) => wa(F, a, !1, n, i))
    ).then(() => i[0])
  )) : Promise.resolve(e);
}, hr = "text/plain; charset=UTF-8", Ye = (e, a = {}) => {
  for (const r of Object.keys(a))
    e.set(r, a[r]);
  return e;
}, Be, Se, V, oe, j, A, S, K, Y, ve, me, pe, we, Me, P, N, ca, Ma = (ca = class {
  constructor(e, a) {
    D(this, P);
    D(this, Be);
    D(this, Se);
    d(this, "env", {});
    D(this, V);
    d(this, "finalized", !1);
    d(this, "error");
    D(this, oe, 200);
    D(this, j);
    D(this, A);
    D(this, S);
    D(this, K);
    D(this, Y, !0);
    D(this, ve);
    D(this, me);
    D(this, pe);
    D(this, we);
    D(this, Me);
    d(this, "render", (...e) => (s(this, me) ?? m(this, me, (a) => this.html(a)), s(this, me).call(this, ...e)));
    d(this, "setLayout", (e) => m(this, ve, e));
    d(this, "getLayout", () => s(this, ve));
    d(this, "setRenderer", (e) => {
      m(this, me, e);
    });
    d(this, "header", (e, a, r) => {
      if (a === void 0) {
        s(this, A) ? s(this, A).delete(e) : s(this, S) && delete s(this, S)[e.toLocaleLowerCase()], this.finalized && this.res.headers.delete(e);
        return;
      }
      r != null && r.append ? (s(this, A) || (m(this, Y, !1), m(this, A, new Headers(s(this, S))), m(this, S, {})), s(this, A).append(e, a)) : s(this, A) ? s(this, A).set(e, a) : (s(this, S) ?? m(this, S, {}), s(this, S)[e.toLowerCase()] = a), this.finalized && (r != null && r.append ? this.res.headers.append(e, a) : this.res.headers.set(e, a));
    });
    d(this, "status", (e) => {
      m(this, Y, !1), m(this, oe, e);
    });
    d(this, "set", (e, a) => {
      s(this, V) ?? m(this, V, /* @__PURE__ */ new Map()), s(this, V).set(e, a);
    });
    d(this, "get", (e) => s(this, V) ? s(this, V).get(e) : void 0);
    d(this, "newResponse", (...e) => g(this, P, N).call(this, ...e));
    d(this, "body", (e, a, r) => typeof a == "number" ? g(this, P, N).call(this, e, a, r) : g(this, P, N).call(this, e, a));
    d(this, "text", (e, a, r) => {
      if (!s(this, S)) {
        if (s(this, Y) && !r && !a)
          return new Response(e);
        m(this, S, {});
      }
      return s(this, S)["content-type"] = hr, typeof a == "number" ? g(this, P, N).call(this, e, a, r) : g(this, P, N).call(this, e, a);
    });
    d(this, "json", (e, a, r) => {
      const n = JSON.stringify(e);
      return s(this, S) ?? m(this, S, {}), s(this, S)["content-type"] = "application/json; charset=UTF-8", typeof a == "number" ? g(this, P, N).call(this, n, a, r) : g(this, P, N).call(this, n, a);
    });
    d(this, "html", (e, a, r) => (s(this, S) ?? m(this, S, {}), s(this, S)["content-type"] = "text/html; charset=UTF-8", typeof e == "object" ? wa(e, dr.Stringify, !1, {}).then((n) => typeof a == "number" ? g(this, P, N).call(this, n, a, r) : g(this, P, N).call(this, n, a)) : typeof a == "number" ? g(this, P, N).call(this, e, a, r) : g(this, P, N).call(this, e, a)));
    d(this, "redirect", (e, a) => (s(this, A) ?? m(this, A, new Headers()), s(this, A).set("Location", String(e)), this.newResponse(null, a ?? 302)));
    d(this, "notFound", () => (s(this, pe) ?? m(this, pe, () => new Response()), s(this, pe).call(this, this)));
    m(this, Be, e), a && (m(this, j, a.executionCtx), this.env = a.env, m(this, pe, a.notFoundHandler), m(this, Me, a.path), m(this, we, a.matchResult));
  }
  get req() {
    return s(this, Se) ?? m(this, Se, new Ba(s(this, Be), s(this, Me), s(this, we))), s(this, Se);
  }
  get event() {
    if (s(this, j) && "respondWith" in s(this, j))
      return s(this, j);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (s(this, j))
      return s(this, j);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return m(this, Y, !1), s(this, K) || m(this, K, new Response("404 Not Found", { status: 404 }));
  }
  set res(e) {
    if (m(this, Y, !1), s(this, K) && e)
      try {
        for (const [a, r] of s(this, K).headers.entries())
          if (a !== "content-type")
            if (a === "set-cookie") {
              const n = s(this, K).headers.getSetCookie();
              e.headers.delete("set-cookie");
              for (const i of n)
                e.headers.append("set-cookie", i);
            } else
              e.headers.set(a, r);
      } catch (a) {
        if (a instanceof TypeError && a.message.includes("immutable")) {
          this.res = new Response(e.body, {
            headers: e.headers,
            status: e.status
          });
          return;
        } else
          throw a;
      }
    m(this, K, e), this.finalized = !0;
  }
  get var() {
    return s(this, V) ? Object.fromEntries(s(this, V)) : {};
  }
}, Be = new WeakMap(), Se = new WeakMap(), V = new WeakMap(), oe = new WeakMap(), j = new WeakMap(), A = new WeakMap(), S = new WeakMap(), K = new WeakMap(), Y = new WeakMap(), ve = new WeakMap(), me = new WeakMap(), pe = new WeakMap(), we = new WeakMap(), Me = new WeakMap(), P = new WeakSet(), N = function(e, a, r) {
  if (s(this, Y) && !r && !a && s(this, oe) === 200)
    return new Response(e, {
      headers: s(this, S)
    });
  if (a && typeof a != "number") {
    const i = new Headers(a.headers);
    s(this, A) && s(this, A).forEach((t, l) => {
      l === "set-cookie" ? i.append(l, t) : i.set(l, t);
    });
    const u = Ye(i, s(this, S));
    return new Response(e, {
      headers: u,
      status: a.status ?? s(this, oe)
    });
  }
  const n = typeof a == "number" ? a : s(this, oe);
  s(this, S) ?? m(this, S, {}), s(this, A) ?? m(this, A, new Headers()), Ye(s(this, A), s(this, S)), s(this, K) && (s(this, K).headers.forEach((i, u) => {
    var t, l;
    u === "set-cookie" ? (t = s(this, A)) == null || t.append(u, i) : (l = s(this, A)) == null || l.set(u, i);
  }), Ye(s(this, A), s(this, S))), r ?? (r = {});
  for (const [i, u] of Object.entries(r))
    if (typeof u == "string")
      s(this, A).set(i, u);
    else {
      s(this, A).delete(i);
      for (const t of u)
        s(this, A).append(i, t);
    }
  return new Response(e, {
    status: n,
    headers: s(this, A)
  });
}, ca), na = (e, a, r) => (n, i) => {
  let u = -1;
  const t = n instanceof Ma;
  return l(0);
  async function l(F) {
    if (F <= u)
      throw new Error("next() called multiple times");
    u = F;
    let o, c = !1, h;
    if (e[F] ? (h = e[F][0][0], t && (n.req.routeIndex = F)) : h = F === e.length && i || void 0, !h)
      t && n.finalized === !1 && r && (o = await r(n));
    else
      try {
        o = await h(n, () => l(F + 1));
      } catch (p) {
        if (p instanceof Error && t && a)
          n.error = p, o = await a(p, n), c = !0;
        else
          throw p;
      }
    return o && (n.finalized === !1 || c) && (n.res = o), n;
  }
}, w = "ALL", mr = "all", pr = ["get", "post", "put", "delete", "options", "patch"], Ta = "Can not add a route since the matcher is already built.", La = class extends Error {
}, yr = Symbol("composedHandler"), Dr = (e) => e.text("404 Not Found", 404), ia = (e, a) => "getResponse" in e ? e.getResponse() : (console.error(e), a.text("Internal Server Error", 500)), x, M, Pa, $, Q, ue, He, Ge, da, Ra = (da = class {
  constructor(a = {}) {
    D(this, M);
    d(this, "get");
    d(this, "post");
    d(this, "put");
    d(this, "delete");
    d(this, "options");
    d(this, "patch");
    d(this, "all");
    d(this, "on");
    d(this, "use");
    d(this, "router");
    d(this, "getPath");
    d(this, "_basePath", "/");
    D(this, x, "/");
    d(this, "routes", []);
    D(this, $, Dr);
    D(this, Q, ia);
    d(this, "onError", (a) => (m(this, Q, a), this));
    d(this, "notFound", (a) => (m(this, $, a), this));
    d(this, "fetch", (a, ...r) => g(this, M, Ge).call(this, a, r[1], r[0], a.method));
    d(this, "request", (a, r, n, i) => a instanceof Request ? this.fetch(r ? new Request(a, r) : a, n, i) : (a = a.toString(), this.fetch(
      new Request(
        /^https?:\/\//.test(a) ? a : `http://localhost${fe("/", a)}`,
        r
      ),
      n,
      i
    )));
    d(this, "fire", () => {
      addEventListener("fetch", (a) => {
        a.respondWith(g(this, M, Ge).call(this, a.request, a, void 0, a.request.method));
      });
    });
    [...pr, mr].forEach((i) => {
      this[i] = (u, ...t) => (typeof u == "string" ? m(this, x, u) : g(this, M, ue).call(this, i, s(this, x), u), t.forEach((l) => {
        g(this, M, ue).call(this, i, s(this, x), l);
      }), this);
    }), this.on = (i, u, ...t) => {
      for (const l of [u].flat()) {
        m(this, x, l);
        for (const F of [i].flat())
          t.map((o) => {
            g(this, M, ue).call(this, F.toUpperCase(), s(this, x), o);
          });
      }
      return this;
    }, this.use = (i, ...u) => (typeof i == "string" ? m(this, x, i) : (m(this, x, "*"), u.unshift(i)), u.forEach((t) => {
      g(this, M, ue).call(this, w, s(this, x), t);
    }), this);
    const n = a.strict ?? !0;
    delete a.strict, Object.assign(this, a), this.getPath = n ? a.getPath ?? Ca : sr;
  }
  route(a, r) {
    const n = this.basePath(a);
    return r.routes.map((i) => {
      var t;
      let u;
      s(r, Q) === ia ? u = i.handler : (u = async (l, F) => (await na([], s(r, Q))(l, () => i.handler(l, F))).res, u[yr] = i.handler), g(t = n, M, ue).call(t, i.method, i.path, u);
    }), this;
  }
  basePath(a) {
    const r = g(this, M, Pa).call(this);
    return r._basePath = fe(this._basePath, a), r;
  }
  mount(a, r, n) {
    let i, u;
    n && (typeof n == "function" ? u = n : (u = n.optionHandler, i = n.replaceRequest));
    const t = u ? (F) => {
      const o = u(F);
      return Array.isArray(o) ? o : [o];
    } : (F) => {
      let o;
      try {
        o = F.executionCtx;
      } catch {
      }
      return [F.env, o];
    };
    i || (i = (() => {
      const F = fe(this._basePath, a), o = F === "/" ? 0 : F.length;
      return (c) => {
        const h = new URL(c.url);
        return h.pathname = h.pathname.slice(o) || "/", new Request(h, c);
      };
    })());
    const l = async (F, o) => {
      const c = await r(i(F.req.raw), ...t(F));
      if (c)
        return c;
      await o();
    };
    return g(this, M, ue).call(this, w, fe(a, "*"), l), this;
  }
}, x = new WeakMap(), M = new WeakSet(), Pa = function() {
  const a = new Ra({
    router: this.router,
    getPath: this.getPath
  });
  return a.routes = this.routes, a;
}, $ = new WeakMap(), Q = new WeakMap(), ue = function(a, r, n) {
  a = a.toUpperCase(), r = fe(this._basePath, r);
  const i = { path: r, method: a, handler: n };
  this.router.add(a, r, [n, i]), this.routes.push(i);
}, He = function(a, r) {
  if (a instanceof Error)
    return s(this, Q).call(this, a, r);
  throw a;
}, Ge = function(a, r, n, i) {
  if (i === "HEAD")
    return (async () => new Response(null, await g(this, M, Ge).call(this, a, r, n, "GET")))();
  const u = this.getPath(a, { env: n }), t = this.router.match(i, u), l = new Ma(a, {
    path: u,
    matchResult: t,
    env: n,
    executionCtx: r,
    notFoundHandler: s(this, $)
  });
  if (t[0].length === 1) {
    let o;
    try {
      o = t[0][0][0][0](l, async () => {
        l.res = await s(this, $).call(this, l);
      });
    } catch (c) {
      return g(this, M, He).call(this, c, l);
    }
    return o instanceof Promise ? o.then(
      (c) => c || (l.finalized ? l.res : s(this, $).call(this, l))
    ).catch((c) => g(this, M, He).call(this, c, l)) : o ?? s(this, $).call(this, l);
  }
  const F = na(t[0], s(this, Q), s(this, $));
  return (async () => {
    try {
      const o = await F(l);
      if (!o.finalized)
        throw new Error(
          "Context is not finalized. Did you forget to return a Response object or `await next()`?"
        );
      return o.res;
    } catch (o) {
      return g(this, M, He).call(this, o, l);
    }
  })();
}, da), We = "[^/]+", ke = ".*", Ae = "(?:|/.*)", Ee = Symbol(), gr = new Set(".\\+*[^]$()");
function br(e, a) {
  return e.length === 1 ? a.length === 1 ? e < a ? -1 : 1 : -1 : a.length === 1 || e === ke || e === Ae ? 1 : a === ke || a === Ae ? -1 : e === We ? 1 : a === We ? -1 : e.length === a.length ? e < a ? -1 : 1 : a.length - e.length;
}
var le, se, I, ha, _e = (ha = class {
  constructor() {
    D(this, le);
    D(this, se);
    D(this, I, /* @__PURE__ */ Object.create(null));
  }
  insert(a, r, n, i, u) {
    if (a.length === 0) {
      if (s(this, le) !== void 0)
        throw Ee;
      if (u)
        return;
      m(this, le, r);
      return;
    }
    const [t, ...l] = a, F = t === "*" ? l.length === 0 ? ["", "", ke] : ["", "", We] : t === "/*" ? ["", "", Ae] : t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let o;
    if (F) {
      const c = F[1];
      let h = F[2] || We;
      if (c && F[2] && (h = h.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(h)))
        throw Ee;
      if (o = s(this, I)[h], !o) {
        if (Object.keys(s(this, I)).some(
          (p) => p !== ke && p !== Ae
        ))
          throw Ee;
        if (u)
          return;
        o = s(this, I)[h] = new _e(), c !== "" && m(o, se, i.varIndex++);
      }
      !u && c !== "" && n.push([c, s(o, se)]);
    } else if (o = s(this, I)[t], !o) {
      if (Object.keys(s(this, I)).some(
        (c) => c.length > 1 && c !== ke && c !== Ae
      ))
        throw Ee;
      if (u)
        return;
      o = s(this, I)[t] = new _e();
    }
    o.insert(l, r, n, i, u);
  }
  buildRegExpStr() {
    const r = Object.keys(s(this, I)).sort(br).map((n) => {
      const i = s(this, I)[n];
      return (typeof s(i, se) == "number" ? `(${n})@${s(i, se)}` : gr.has(n) ? `\\${n}` : n) + i.buildRegExpStr();
    });
    return typeof s(this, le) == "number" && r.unshift(`#${s(this, le)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, le = new WeakMap(), se = new WeakMap(), I = new WeakMap(), ha), Oe, Te, ma, fr = (ma = class {
  constructor() {
    D(this, Oe, { varIndex: 0 });
    D(this, Te, new _e());
  }
  insert(e, a, r) {
    const n = [], i = [];
    for (let t = 0; ; ) {
      let l = !1;
      if (e = e.replace(/\{[^}]+\}/g, (F) => {
        const o = `@\\${t}`;
        return i[t] = [o, F], t++, l = !0, o;
      }), !l)
        break;
    }
    const u = e.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let t = i.length - 1; t >= 0; t--) {
      const [l] = i[t];
      for (let F = u.length - 1; F >= 0; F--)
        if (u[F].indexOf(l) !== -1) {
          u[F] = u[F].replace(l, i[t][1]);
          break;
        }
    }
    return s(this, Te).insert(u, a, n, s(this, Oe), r), n;
  }
  buildRegExp() {
    let e = s(this, Te).buildRegExpStr();
    if (e === "")
      return [/^$/, [], []];
    let a = 0;
    const r = [], n = [];
    return e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (i, u, t) => u !== void 0 ? (r[++a] = Number(u), "$()") : (t !== void 0 && (n[Number(t)] = ++a), "")), [new RegExp(`^${e}`), r, n];
  }
}, Oe = new WeakMap(), Te = new WeakMap(), ma), Ha = [], Cr = [/^$/, [], /* @__PURE__ */ Object.create(null)], Ne = /* @__PURE__ */ Object.create(null);
function Ga(e) {
  return Ne[e] ?? (Ne[e] = new RegExp(
    e === "*" ? "" : `^${e.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (a, r) => r ? `\\${r}` : "(?:|/.*)"
    )}$`
  ));
}
function Er() {
  Ne = /* @__PURE__ */ Object.create(null);
}
function kr(e) {
  var o;
  const a = new fr(), r = [];
  if (e.length === 0)
    return Cr;
  const n = e.map(
    (c) => [!/\*|\/:/.test(c[0]), ...c]
  ).sort(
    ([c, h], [p, f]) => c ? 1 : p ? -1 : h.length - f.length
  ), i = /* @__PURE__ */ Object.create(null);
  for (let c = 0, h = -1, p = n.length; c < p; c++) {
    const [f, b, C] = n[c];
    f ? i[b] = [C.map(([k]) => [k, /* @__PURE__ */ Object.create(null)]), Ha] : h++;
    let T;
    try {
      T = a.insert(b, h, f);
    } catch (k) {
      throw k === Ee ? new La(b) : k;
    }
    f || (r[h] = C.map(([k, G]) => {
      const v = /* @__PURE__ */ Object.create(null);
      for (G -= 1; G >= 0; G--) {
        const [be, L] = T[G];
        v[be] = L;
      }
      return [k, v];
    }));
  }
  const [u, t, l] = a.buildRegExp();
  for (let c = 0, h = r.length; c < h; c++)
    for (let p = 0, f = r[c].length; p < f; p++) {
      const b = (o = r[c][p]) == null ? void 0 : o[1];
      if (!b)
        continue;
      const C = Object.keys(b);
      for (let T = 0, k = C.length; T < k; T++)
        b[C[T]] = l[b[C[T]]];
    }
  const F = [];
  for (const c in t)
    F[c] = r[t[c]];
  return [u, F, i];
}
function de(e, a) {
  if (e) {
    for (const r of Object.keys(e).sort((n, i) => i.length - n.length))
      if (Ga(r).test(a))
        return [...e[r]];
  }
}
var ee, ae, De, Na, Wa, pa, Ar = (pa = class {
  constructor() {
    D(this, De);
    d(this, "name", "RegExpRouter");
    D(this, ee);
    D(this, ae);
    m(this, ee, { [w]: /* @__PURE__ */ Object.create(null) }), m(this, ae, { [w]: /* @__PURE__ */ Object.create(null) });
  }
  add(e, a, r) {
    var l;
    const n = s(this, ee), i = s(this, ae);
    if (!n || !i)
      throw new Error(Ta);
    n[e] || [n, i].forEach((F) => {
      F[e] = /* @__PURE__ */ Object.create(null), Object.keys(F[w]).forEach((o) => {
        F[e][o] = [...F[w][o]];
      });
    }), a === "/*" && (a = "*");
    const u = (a.match(/\/:/g) || []).length;
    if (/\*$/.test(a)) {
      const F = Ga(a);
      e === w ? Object.keys(n).forEach((o) => {
        var c;
        (c = n[o])[a] || (c[a] = de(n[o], a) || de(n[w], a) || []);
      }) : (l = n[e])[a] || (l[a] = de(n[e], a) || de(n[w], a) || []), Object.keys(n).forEach((o) => {
        (e === w || e === o) && Object.keys(n[o]).forEach((c) => {
          F.test(c) && n[o][c].push([r, u]);
        });
      }), Object.keys(i).forEach((o) => {
        (e === w || e === o) && Object.keys(i[o]).forEach(
          (c) => F.test(c) && i[o][c].push([r, u])
        );
      });
      return;
    }
    const t = Ea(a) || [a];
    for (let F = 0, o = t.length; F < o; F++) {
      const c = t[F];
      Object.keys(i).forEach((h) => {
        var p;
        (e === w || e === h) && ((p = i[h])[c] || (p[c] = [
          ...de(n[h], c) || de(n[w], c) || []
        ]), i[h][c].push([r, u - o + F + 1]));
      });
    }
  }
  match(e, a) {
    Er();
    const r = g(this, De, Na).call(this);
    return this.match = (n, i) => {
      const u = r[n] || r[w], t = u[2][i];
      if (t)
        return t;
      const l = i.match(u[0]);
      if (!l)
        return [[], Ha];
      const F = l.indexOf("", 1);
      return [u[1][F], l];
    }, this.match(e, a);
  }
}, ee = new WeakMap(), ae = new WeakMap(), De = new WeakSet(), Na = function() {
  const e = /* @__PURE__ */ Object.create(null);
  return Object.keys(s(this, ae)).concat(Object.keys(s(this, ee))).forEach((a) => {
    e[a] || (e[a] = g(this, De, Wa).call(this, a));
  }), m(this, ee, m(this, ae, void 0)), e;
}, Wa = function(e) {
  const a = [];
  let r = e === w;
  return [s(this, ee), s(this, ae)].forEach((n) => {
    const i = n[e] ? Object.keys(n[e]).map((u) => [u, n[e][u]]) : [];
    i.length !== 0 ? (r || (r = !0), a.push(...i)) : e !== w && a.push(
      ...Object.keys(n[w]).map((u) => [u, n[w][u]])
    );
  }), r ? kr(a) : null;
}, pa), re, U, ya, Br = (ya = class {
  constructor(e) {
    d(this, "name", "SmartRouter");
    D(this, re, []);
    D(this, U, []);
    m(this, re, e.routers);
  }
  add(e, a, r) {
    if (!s(this, U))
      throw new Error(Ta);
    s(this, U).push([e, a, r]);
  }
  match(e, a) {
    if (!s(this, U))
      throw new Error("Fatal error");
    const r = s(this, re), n = s(this, U), i = r.length;
    let u = 0, t;
    for (; u < i; u++) {
      const l = r[u];
      try {
        for (let F = 0, o = n.length; F < o; F++)
          l.add(...n[F]);
        t = l.match(e, a);
      } catch (F) {
        if (F instanceof La)
          continue;
        throw F;
      }
      this.match = l.match.bind(l), m(this, re, [l]), m(this, U, void 0);
      break;
    }
    if (u === i)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, t;
  }
  get activeRouter() {
    if (s(this, U) || s(this, re).length !== 1)
      throw new Error("No active router has been determined yet.");
    return s(this, re)[0];
  }
}, re = new WeakMap(), U = new WeakMap(), ya), ne, R, Fe, ye, H, _, te, Da, xa = (Da = class {
  constructor(e, a, r) {
    D(this, _);
    D(this, ne);
    D(this, R);
    D(this, Fe);
    D(this, ye, 0);
    D(this, H, /* @__PURE__ */ Object.create(null));
    if (m(this, R, r || /* @__PURE__ */ Object.create(null)), m(this, ne, []), e && a) {
      const n = /* @__PURE__ */ Object.create(null);
      n[e] = { handler: a, possibleKeys: [], score: 0 }, m(this, ne, [n]);
    }
    m(this, Fe, []);
  }
  insert(e, a, r) {
    m(this, ye, ++ea(this, ye)._);
    let n = this;
    const i = ur(a), u = [];
    for (let F = 0, o = i.length; F < o; F++) {
      const c = i[F];
      if (Object.keys(s(n, R)).includes(c)) {
        n = s(n, R)[c];
        const p = aa(c);
        p && u.push(p[1]);
        continue;
      }
      s(n, R)[c] = new xa();
      const h = aa(c);
      h && (s(n, Fe).push(h), u.push(h[1])), n = s(n, R)[c];
    }
    const t = /* @__PURE__ */ Object.create(null), l = {
      handler: r,
      possibleKeys: u.filter((F, o, c) => c.indexOf(F) === o),
      score: s(this, ye)
    };
    return t[e] = l, s(n, ne).push(t), n;
  }
  search(e, a) {
    const r = [];
    m(this, H, /* @__PURE__ */ Object.create(null));
    let i = [this];
    const u = ba(a);
    for (let l = 0, F = u.length; l < F; l++) {
      const o = u[l], c = l === F - 1, h = [];
      for (let p = 0, f = i.length; p < f; p++) {
        const b = i[p], C = s(b, R)[o];
        C && (m(C, H, s(b, H)), c ? (s(C, R)["*"] && r.push(
          ...g(this, _, te).call(this, s(C, R)["*"], e, s(b, H), /* @__PURE__ */ Object.create(null))
        ), r.push(
          ...g(this, _, te).call(this, C, e, s(b, H), /* @__PURE__ */ Object.create(null))
        )) : h.push(C));
        for (let T = 0, k = s(b, Fe).length; T < k; T++) {
          const G = s(b, Fe)[T], v = { ...s(b, H) };
          if (G === "*") {
            const ze = s(b, R)["*"];
            ze && (r.push(
              ...g(this, _, te).call(this, ze, e, s(b, H), /* @__PURE__ */ Object.create(null))
            ), h.push(ze));
            continue;
          }
          if (o === "")
            continue;
          const [be, L, E] = G, O = s(b, R)[be], Xe = u.slice(l).join("/");
          if (E instanceof RegExp && E.test(Xe)) {
            v[L] = Xe, r.push(...g(this, _, te).call(this, O, e, s(b, H), v));
            continue;
          }
          (E === !0 || E.test(o)) && (v[L] = o, c ? (r.push(...g(this, _, te).call(this, O, e, v, s(b, H))), s(O, R)["*"] && r.push(
            ...g(this, _, te).call(this, s(O, R)["*"], e, v, s(b, H))
          )) : (m(O, H, v), h.push(O)));
        }
      }
      i = h;
    }
    return [r.sort((l, F) => l.score - F.score).map(({ handler: l, params: F }) => [l, F])];
  }
}, ne = new WeakMap(), R = new WeakMap(), Fe = new WeakMap(), ye = new WeakMap(), H = new WeakMap(), _ = new WeakSet(), te = function(e, a, r, n) {
  const i = [];
  for (let u = 0, t = s(e, ne).length; u < t; u++) {
    const l = s(e, ne)[u], F = l[a] || l[w], o = {};
    if (F !== void 0) {
      F.params = /* @__PURE__ */ Object.create(null);
      for (let c = 0, h = F.possibleKeys.length; c < h; c++) {
        const p = F.possibleKeys[c], f = o[F.score];
        F.params[p] = n[p] && !f ? n[p] : r[p] ?? n[p], o[F.score] = !0;
      }
      i.push(F);
    }
  }
  return i;
}, Da), ce, ga, Sr = (ga = class {
  constructor() {
    d(this, "name", "TrieRouter");
    D(this, ce);
    m(this, ce, new xa());
  }
  add(e, a, r) {
    const n = Ea(a);
    if (n) {
      for (let i = 0, u = n.length; i < u; i++)
        s(this, ce).insert(e, n[i], r);
      return;
    }
    s(this, ce).insert(e, a, r);
  }
  match(e, a) {
    return s(this, ce).search(e, a);
  }
}, ce = new WeakMap(), ga), vr = class extends Ra {
  constructor(e = {}) {
    super(e), this.router = e.router ?? new Br({
      routers: [new Ar(), new Sr()]
    });
  }
}, wr = (e, a = {
  fetch: globalThis.fetch.bind(globalThis)
}) => (r) => {
  r.respondWith(
    (async () => {
      const n = await e.fetch(r.request);
      return a.fetch && n.status === 404 ? await a.fetch(r.request) : n;
    })()
  );
}, Mr = [{ name: "Aegean Airlines", iataCode: "A3" }, { name: "Aeroflot", iataCode: "SU" }, { name: "Aerolineas Argentinas", iataCode: "AR" }, { name: "Aeromexico", iataCode: "AM" }, { name: "Air Algerie", iataCode: "AH" }, { name: "Air Arabia", iataCode: "G9" }, { name: "Air Canada", iataCode: "AC" }, { name: "Air China", iataCode: "CA" }, { name: "Air Europa", iataCode: "UX" }, { name: "Air France-KLM", iataCode: "AF" }, { name: "Air India", iataCode: "AI" }, { name: "Air Mauritius", iataCode: "MK" }, { name: "Air New Zealand", iataCode: "NZ" }, { name: "Air Niugini", iataCode: "PX" }, { name: "Air Tahiti", iataCode: "VT" }, { name: "Air Tahiti Nui", iataCode: "TN" }, { name: "Air Transat", iataCode: "TS" }, { name: "AirAsia X", iataCode: "D7" }, { name: "AirAsia", iataCode: "AK" }, { name: "Aircalin", iataCode: "SB" }, { name: "Alaska Airlines", iataCode: "AS" }, { name: "Alitalia", iataCode: "AZ" }, { name: "All Nippon Airways", iataCode: "NH" }, { name: "Allegiant Air", iataCode: "G4" }, { name: "American Airlines", iataCode: "AA" }, { name: "Asiana Airlines", iataCode: "OZ" }, { name: "Avianca", iataCode: "AV" }, { name: "Azul Linhas Aereas Brasileiras", iataCode: "AD" }, { name: "Azur Air", iataCode: "ZF" }, { name: "Beijing Capital Airlines", iataCode: "JD" }, { name: "Boliviana de Aviacion", iataCode: "OB" }, { name: "British Airways", iataCode: "BA" }, { name: "Cathay Pacific", iataCode: "CX" }, { name: "Cebu Pacific Air", iataCode: "5J" }, { name: "China Airlines", iataCode: "CI" }, { name: "China Eastern Airlines", iataCode: "MU" }, { name: "China Southern Airlines", iataCode: "CZ" }, { name: "Condor", iataCode: "DE" }, { name: "Copa Airlines", iataCode: "CM" }, { name: "Delta Air Lines", iataCode: "DL" }, { name: "Easyfly", iataCode: "VE" }, { name: "EasyJet", iataCode: "U2" }, { name: "EcoJet", iataCode: "8J" }, { name: "Egyptair", iataCode: "MS" }, { name: "El Al", iataCode: "LY" }, { name: "Emirates Airlines", iataCode: "EK" }, { name: "Ethiopian Airlines", iataCode: "ET" }, { name: "Etihad Airways", iataCode: "EY" }, { name: "EVA Air", iataCode: "BR" }, { name: "Fiji Airways", iataCode: "FJ" }, { name: "Finnair", iataCode: "AY" }, { name: "Flybondi", iataCode: "FO" }, { name: "Flydubai", iataCode: "FZ" }, { name: "FlySafair", iataCode: "FA" }, { name: "Frontier Airlines", iataCode: "F9" }, { name: "Garuda Indonesia", iataCode: "GA" }, { name: "Go First", iataCode: "G8" }, { name: "Gol Linhas Aereas Inteligentes", iataCode: "G3" }, { name: "Hainan Airlines", iataCode: "HU" }, { name: "Hawaiian Airlines", iataCode: "HA" }, { name: "IndiGo Airlines", iataCode: "6E" }, { name: "Japan Airlines", iataCode: "JL" }, { name: "Jeju Air", iataCode: "7C" }, { name: "Jet2", iataCode: "LS" }, { name: "JetBlue Airways", iataCode: "B6" }, { name: "JetSMART", iataCode: "JA" }, { name: "Juneyao Airlines", iataCode: "HO" }, { name: "Kenya Airways", iataCode: "KQ" }, { name: "Korean Air", iataCode: "KE" }, { name: "Kulula.com", iataCode: "MN" }, { name: "LATAM Airlines", iataCode: "LA" }, { name: "Lion Air", iataCode: "JT" }, { name: "LOT Polish Airlines", iataCode: "LO" }, { name: "Lufthansa", iataCode: "LH" }, { name: "Libyan Airlines", iataCode: "LN" }, { name: "Linea Aerea Amaszonas", iataCode: "Z8" }, { name: "Malaysia Airlines", iataCode: "MH" }, { name: "Nordwind Airlines", iataCode: "N4" }, { name: "Norwegian Air Shuttle", iataCode: "DY" }, { name: "Oman Air", iataCode: "WY" }, { name: "Pakistan International Airlines", iataCode: "PK" }, { name: "Pegasus Airlines", iataCode: "PC" }, { name: "Philippine Airlines", iataCode: "PR" }, { name: "Qantas Group", iataCode: "QF" }, { name: "Qatar Airways", iataCode: "QR" }, { name: "Republic Airways", iataCode: "YX" }, { name: "Royal Air Maroc", iataCode: "AT" }, { name: "Ryanair", iataCode: "FR" }, { name: "S7 Airlines", iataCode: "S7" }, { name: "SAS", iataCode: "SK" }, { name: "Satena", iataCode: "9R" }, { name: "Saudia", iataCode: "SV" }, { name: "Shandong Airlines", iataCode: "SC" }, { name: "Sichuan Airlines", iataCode: "3U" }, { name: "Singapore Airlines", iataCode: "SQ" }, { name: "Sky Airline", iataCode: "H2" }, { name: "SkyWest Airlines", iataCode: "OO" }, { name: "South African Airways", iataCode: "SA" }, { name: "Southwest Airlines", iataCode: "WN" }, { name: "SpiceJet", iataCode: "SG" }, { name: "Spirit Airlines", iataCode: "NK" }, { name: "Spring Airlines", iataCode: "9S" }, { name: "SriLankan Airlines", iataCode: "UL" }, { name: "Star Peru", iataCode: "2I" }, { name: "Sun Country Airlines", iataCode: "SY" }, { name: "SunExpress", iataCode: "XQ" }, { name: "TAP Air Portugal", iataCode: "TP" }, { name: "Thai AirAsia", iataCode: "FD" }, { name: "Thai Airways", iataCode: "TG" }, { name: "TUI Airways", iataCode: "BY" }, { name: "Tunisair", iataCode: "TU" }, { name: "Turkish Airlines", iataCode: "TK" }, { name: "Ukraine International", iataCode: "PS" }, { name: "United Airlines", iataCode: "UA" }, { name: "Ural Airlines", iataCode: "U6" }, { name: "VietJet Air", iataCode: "VJ" }, { name: "Vietnam Airlines", iataCode: "VN" }, { name: "Virgin Atlantic Airways", iataCode: "VS" }, { name: "Virgin Australia", iataCode: "VA" }, { name: "VivaAerobus", iataCode: "VB" }, { name: "VOEPASS Linhas Aereas", iataCode: "2Z" }, { name: "Volaris", iataCode: "Y4" }, { name: "WestJet", iataCode: "WS" }, { name: "Wingo", iataCode: "P5" }, { name: "Wizz Air", iataCode: "W6" }], Tr = [{ name: "Aerospatiale/BAC Concorde", iataTypeCode: "SSC" }, { name: "Airbus A300", iataTypeCode: "AB3" }, { name: "Airbus A310", iataTypeCode: "310" }, { name: "Airbus A310-200", iataTypeCode: "312" }, { name: "Airbus A310-300", iataTypeCode: "313" }, { name: "Airbus A318", iataTypeCode: "318" }, { name: "Airbus A319", iataTypeCode: "319" }, { name: "Airbus A319neo", iataTypeCode: "31N" }, { name: "Airbus A320", iataTypeCode: "320" }, { name: "Airbus A320neo", iataTypeCode: "32N" }, { name: "Airbus A321", iataTypeCode: "321" }, { name: "Airbus A321neo", iataTypeCode: "32Q" }, { name: "Airbus A330", iataTypeCode: "330" }, { name: "Airbus A330-200", iataTypeCode: "332" }, { name: "Airbus A330-300", iataTypeCode: "333" }, { name: "Airbus A330-800neo", iataTypeCode: "338" }, { name: "Airbus A330-900neo", iataTypeCode: "339" }, { name: "Airbus A340", iataTypeCode: "340" }, { name: "Airbus A340-200", iataTypeCode: "342" }, { name: "Airbus A340-300", iataTypeCode: "343" }, { name: "Airbus A340-500", iataTypeCode: "345" }, { name: "Airbus A340-600", iataTypeCode: "346" }, { name: "Airbus A350", iataTypeCode: "350" }, { name: "Airbus A350-900", iataTypeCode: "359" }, { name: "Airbus A350-1000", iataTypeCode: "351" }, { name: "Airbus A380", iataTypeCode: "380" }, { name: "Airbus A380-800", iataTypeCode: "388" }, { name: "Antonov An-12", iataTypeCode: "ANF" }, { name: "Antonov An-24", iataTypeCode: "AN4" }, { name: "Antonov An-26", iataTypeCode: "A26" }, { name: "Antonov An-28", iataTypeCode: "A28" }, { name: "Antonov An-30", iataTypeCode: "A30" }, { name: "Antonov An-32", iataTypeCode: "A32" }, { name: "Antonov An-72", iataTypeCode: "AN7" }, { name: "Antonov An-124 Ruslan", iataTypeCode: "A4F" }, { name: "Antonov An-140", iataTypeCode: "A40" }, { name: "Antonov An-148", iataTypeCode: "A81" }, { name: "Antonov An-158", iataTypeCode: "A58" }, { name: "Antonov An-225 Mriya", iataTypeCode: "A5F" }, { name: "Boeing 707", iataTypeCode: "703" }, { name: "Boeing 717", iataTypeCode: "717" }, { name: "Boeing 720B", iataTypeCode: "B72" }, { name: "Boeing 727", iataTypeCode: "727" }, { name: "Boeing 727-100", iataTypeCode: "721" }, { name: "Boeing 727-200", iataTypeCode: "722" }, { name: "Boeing 737 MAX 7", iataTypeCode: "7M7" }, { name: "Boeing 737 MAX 8", iataTypeCode: "7M8" }, { name: "Boeing 737 MAX 9", iataTypeCode: "7M9" }, { name: "Boeing 737 MAX 10", iataTypeCode: "7MJ" }, { name: "Boeing 737", iataTypeCode: "737" }, { name: "Boeing 737-100", iataTypeCode: "731" }, { name: "Boeing 737-200", iataTypeCode: "732" }, { name: "Boeing 737-300", iataTypeCode: "733" }, { name: "Boeing 737-400", iataTypeCode: "734" }, { name: "Boeing 737-500", iataTypeCode: "735" }, { name: "Boeing 737-600", iataTypeCode: "736" }, { name: "Boeing 737-700", iataTypeCode: "73G" }, { name: "Boeing 737-800", iataTypeCode: "738" }, { name: "Boeing 737-900", iataTypeCode: "739" }, { name: "Boeing 747", iataTypeCode: "747" }, { name: "Boeing 747-100", iataTypeCode: "741" }, { name: "Boeing 747-200", iataTypeCode: "742" }, { name: "Boeing 747-300", iataTypeCode: "743" }, { name: "Boeing 747-400", iataTypeCode: "744" }, { name: "Boeing 747-400D", iataTypeCode: "74J" }, { name: "Boeing 747-8", iataTypeCode: "748" }, { name: "Boeing 747SP", iataTypeCode: "74L" }, { name: "Boeing 747SR", iataTypeCode: "74R" }, { name: "Boeing 757", iataTypeCode: "757" }, { name: "Boeing 757-200", iataTypeCode: "752" }, { name: "Boeing 757-300", iataTypeCode: "753" }, { name: "Boeing 767", iataTypeCode: "767" }, { name: "Boeing 767-200", iataTypeCode: "762" }, { name: "Boeing 767-300", iataTypeCode: "763" }, { name: "Boeing 767-400", iataTypeCode: "764" }, { name: "Boeing 777", iataTypeCode: "777" }, { name: "Boeing 777-200", iataTypeCode: "772" }, { name: "Boeing 777-200LR", iataTypeCode: "77L" }, { name: "Boeing 777-300", iataTypeCode: "773" }, { name: "Boeing 777-300ER", iataTypeCode: "77W" }, { name: "Boeing 787", iataTypeCode: "787" }, { name: "Boeing 787-8", iataTypeCode: "788" }, { name: "Boeing 787-9", iataTypeCode: "789" }, { name: "Boeing 787-10", iataTypeCode: "781" }, { name: "Canadair Challenger", iataTypeCode: "CCJ" }, { name: "Canadair CL-44", iataTypeCode: "CL4" }, { name: "Canadair Regional Jet 100", iataTypeCode: "CR1" }, { name: "Canadair Regional Jet 200", iataTypeCode: "CR2" }, { name: "Canadair Regional Jet 700", iataTypeCode: "CR7" }, { name: "Canadair Regional Jet 705", iataTypeCode: "CRA" }, { name: "Canadair Regional Jet 900", iataTypeCode: "CR9" }, { name: "Canadair Regional Jet 1000", iataTypeCode: "CRK" }, { name: "De Havilland Canada DHC-2 Beaver", iataTypeCode: "DHP" }, { name: "De Havilland Canada DHC-2 Turbo-Beaver", iataTypeCode: "DHR" }, { name: "De Havilland Canada DHC-3 Otter", iataTypeCode: "DHL" }, { name: "De Havilland Canada DHC-4 Caribou", iataTypeCode: "DHC" }, { name: "De Havilland Canada DHC-6 Twin Otter", iataTypeCode: "DHT" }, { name: "De Havilland Canada DHC-7 Dash 7", iataTypeCode: "DH7" }, { name: "De Havilland Canada DHC-8-100 Dash 8 / 8Q", iataTypeCode: "DH1" }, { name: "De Havilland Canada DHC-8-200 Dash 8 / 8Q", iataTypeCode: "DH2" }, { name: "De Havilland Canada DHC-8-300 Dash 8 / 8Q", iataTypeCode: "DH3" }, { name: "De Havilland Canada DHC-8-400 Dash 8Q", iataTypeCode: "DH4" }, { name: "De Havilland DH.104 Dove", iataTypeCode: "DHD" }, { name: "De Havilland DH.114 Heron", iataTypeCode: "DHH" }, { name: "Douglas DC-3", iataTypeCode: "D3F" }, { name: "Douglas DC-6", iataTypeCode: "D6F" }, { name: "Douglas DC-8-50", iataTypeCode: "D8T" }, { name: "Douglas DC-8-62", iataTypeCode: "D8L" }, { name: "Douglas DC-8-72", iataTypeCode: "D8Q" }, { name: "Douglas DC-9-10", iataTypeCode: "D91" }, { name: "Douglas DC-9-20", iataTypeCode: "D92" }, { name: "Douglas DC-9-30", iataTypeCode: "D93" }, { name: "Douglas DC-9-40", iataTypeCode: "D94" }, { name: "Douglas DC-9-50", iataTypeCode: "D95" }, { name: "Douglas DC-10", iataTypeCode: "D10" }, { name: "Douglas DC-10-10", iataTypeCode: "D1X" }, { name: "Douglas DC-10-30", iataTypeCode: "D1Y" }, { name: "Embraer 170", iataTypeCode: "E70" }, { name: "Embraer 175", iataTypeCode: "E75" }, { name: "Embraer 190", iataTypeCode: "E90" }, { name: "Embraer 195", iataTypeCode: "E95" }, { name: "Embraer E190-E2", iataTypeCode: "290" }, { name: "Embraer E195-E2", iataTypeCode: "295" }, { name: "Embraer EMB.110 Bandeirante", iataTypeCode: "EMB" }, { name: "Embraer EMB.120 Brasilia", iataTypeCode: "EM2" }, { name: "Embraer Legacy 600", iataTypeCode: "ER3" }, { name: "Embraer Phenom 100", iataTypeCode: "EP1" }, { name: "Embraer Phenom 300", iataTypeCode: "EP3" }, { name: "Embraer RJ135", iataTypeCode: "ER3" }, { name: "Embraer RJ140", iataTypeCode: "ERD" }, { name: "Embraer RJ145 Amazon", iataTypeCode: "ER4" }, { name: "Ilyushin IL18", iataTypeCode: "IL8" }, { name: "Ilyushin IL62", iataTypeCode: "IL6" }, { name: "Ilyushin IL76", iataTypeCode: "IL7" }, { name: "Ilyushin IL86", iataTypeCode: "ILW" }, { name: "Ilyushin IL96-300", iataTypeCode: "I93" }, { name: "Ilyushin IL114", iataTypeCode: "I14" }, { name: "Lockheed L-182 / 282 / 382 (L-100) Hercules", iataTypeCode: "LOH" }, { name: "Lockheed L-188 Electra", iataTypeCode: "LOE" }, { name: "Lockheed L-1011 Tristar", iataTypeCode: "L10" }, { name: "Lockheed L-1049 Super Constellation", iataTypeCode: "L49" }, { name: "McDonnell Douglas MD11", iataTypeCode: "M11" }, { name: "McDonnell Douglas MD80", iataTypeCode: "M80" }, { name: "McDonnell Douglas MD81", iataTypeCode: "M81" }, { name: "McDonnell Douglas MD82", iataTypeCode: "M82" }, { name: "McDonnell Douglas MD83", iataTypeCode: "M83" }, { name: "McDonnell Douglas MD87", iataTypeCode: "M87" }, { name: "McDonnell Douglas MD88", iataTypeCode: "M88" }, { name: "McDonnell Douglas MD90", iataTypeCode: "M90" }, { name: "Sukhoi Superjet 100-95", iataTypeCode: "SU9" }, { name: "Tupolev Tu-134", iataTypeCode: "TU3" }, { name: "Tupolev Tu-154", iataTypeCode: "TU5" }, { name: "Tupolev Tu-204", iataTypeCode: "T20" }, { name: "Yakovlev Yak-40", iataTypeCode: "YK4" }, { name: "Yakovlev Yak-42", iataTypeCode: "YK2" }], Lr = [{ name: "Adelaide International Airport", iataCode: "ADL" }, { name: "Adolfo Suarez Madrid-Barajas Airport", iataCode: "MAD" }, { name: "Aeroparque Jorge Newbery Airport", iataCode: "AEP" }, { name: "Afonso Pena International Airport", iataCode: "CWB" }, { name: "Alfonso Bonilla Aragon International Airport", iataCode: "CLO" }, { name: "Amsterdam Airport Schiphol", iataCode: "AMS" }, { name: "Arturo Merino Benitez International Airport", iataCode: "SCL" }, { name: "Auckland International Airport", iataCode: "AKL" }, { name: "Beijing Capital International Airport", iataCode: "PEK" }, { name: "Belem Val de Cans International Airport", iataCode: "BEL" }, { name: "Belo Horizonte Tancredo Neves International Airport", iataCode: "CNF" }, { name: "Berlin-Tegel Airport", iataCode: "TXL" }, { name: "Bole International Airport", iataCode: "ADD" }, { name: "Brasilia-Presidente Juscelino Kubitschek International Airport", iataCode: "BSB" }, { name: "Brisbane International Airport", iataCode: "BNE" }, { name: "Brussels Airport", iataCode: "BRU" }, { name: "Cairns Airport", iataCode: "CNS" }, { name: "Cairo International Airport", iataCode: "CAI" }, { name: "Canberra Airport", iataCode: "CBR" }, { name: "Capetown International Airport", iataCode: "CPT" }, { name: "Charles de Gaulle International Airport", iataCode: "CDG" }, { name: "Charlotte Douglas International Airport", iataCode: "CLT" }, { name: "Chengdu Shuangliu International Airport", iataCode: "CTU" }, { name: "Chhatrapati Shivaji International Airport", iataCode: "BOM" }, { name: "Chicago O'Hare International Airport", iataCode: "ORD" }, { name: "Chongqing Jiangbei International Airport", iataCode: "CKG" }, { name: "Christchurch International Airport", iataCode: "CHC" }, { name: "Copenhagen Kastrup Airport", iataCode: "CPH" }, { name: "Dallas Fort Worth International Airport", iataCode: "DFW" }, { name: "Daniel K. Inouye International Airport", iataCode: "HNL" }, { name: "Denver International Airport", iataCode: "DEN" }, { name: "Don Mueang International Airport", iataCode: "DMK" }, { name: "Dubai International Airport", iataCode: "DXB" }, { name: "Dublin Airport", iataCode: "DUB" }, { name: "Dusseldorf Airport", iataCode: "DUS" }, { name: "El Dorado International Airport", iataCode: "BOG" }, { name: "Eleftherios Venizelos International Airport", iataCode: "ATH" }, { name: "Faa'a International Airport", iataCode: "PPT" }, { name: "Fort Lauderdale Hollywood International Airport", iataCode: "FLL" }, { name: "Fortaleza Pinto Martins International Airport", iataCode: "FOR" }, { name: "Frankfurt am Main Airport", iataCode: "FRA" }, { name: "George Bush Intercontinental Houston Airport", iataCode: "IAH" }, { name: "Gold Coast Airport", iataCode: "OOL" }, { name: "Guarulhos - Governador Andre Franco Montoro International Airport", iataCode: "GRU" }, { name: "Hartsfield-Jackson Atlanta International Airport", iataCode: "ATL" }, { name: "Helsinki Vantaa Airport", iataCode: "HEL" }, { name: "Hobart International Airport", iataCode: "HBA" }, { name: "Hong Kong International Airport", iataCode: "HKG" }, { name: "Houari Boumediene Airport", iataCode: "ALG" }, { name: "Hurgada International Airport", iataCode: "HRG" }, { name: "Incheon International Airport", iataCode: "ICN" }, { name: "Indira Gandhi International Airport", iataCode: "DEL" }, { name: "Istanbul Airport", iataCode: "IST" }, { name: "Jacksons International Airport", iataCode: "POM" }, { name: "Jeju International Airport", iataCode: "CJU" }, { name: "John F Kennedy International Airport", iataCode: "JFK" }, { name: "Jorge Chavez International Airport", iataCode: "LIM" }, { name: "Jose Maria Cordova International Airport", iataCode: "MDE" }, { name: "Josep Tarradellas Barcelona-El Prat Airport", iataCode: "BCN" }, { name: "Kahului Airport", iataCode: "OGG" }, { name: "King Abdulaziz International Airport", iataCode: "JED" }, { name: "Kuala Lumpur International Airport", iataCode: "KUL" }, { name: "Kunming Changshui International Airport", iataCode: "KMG" }, { name: "La Tontouta International Airport", iataCode: "NOU" }, { name: "Leonardo da Vinci-Fiumicino Airport", iataCode: "FCO" }, { name: "London Heathrow Airport", iataCode: "LHR" }, { name: "Los Angeles International Airport", iataCode: "LAX" }, { name: "McCarran International Airport", iataCode: "LAS" }, { name: "Melbourne International Airport", iataCode: "MEL" }, { name: "Mexico City International Airport", iataCode: "MEX" }, { name: "Miami International Airport", iataCode: "MIA" }, { name: "Ministro Pistarini International Airport", iataCode: "EZE" }, { name: "Minneapolis-St Paul International/Wold-Chamberlain Airport", iataCode: "MSP" }, { name: "Mohammed V International Airport", iataCode: "CMN" }, { name: "Moscow Domodedovo Airport", iataCode: "DME" }, { name: "Munich Airport", iataCode: "MUC" }, { name: "Murtala Muhammed International Airport", iataCode: "LOS" }, { name: "Nadi International Airport", iataCode: "NAN" }, { name: "Nairobi Jomo Kenyatta International Airport", iataCode: "NBO" }, { name: "Narita International Airport", iataCode: "NRT" }, { name: "Newark Liberty International Airport", iataCode: "EWR" }, { name: "Ninoy Aquino International Airport", iataCode: "MNL" }, { name: "Noumea Magenta Airport", iataCode: "GEA" }, { name: "O. R. Tambo International Airport", iataCode: "JNB" }, { name: "Orlando International Airport", iataCode: "MCO" }, { name: "Oslo Lufthavn", iataCode: "OSL" }, { name: "Perth Airport", iataCode: "PER" }, { name: "Phoenix Sky Harbor International Airport", iataCode: "PHX" }, { name: "Recife Guararapes-Gilberto Freyre International Airport", iataCode: "REC" }, { name: "Rio de Janeiro Galeao International Airport", iataCode: "GIG" }, { name: "Salgado Filho International Airport", iataCode: "POA" }, { name: "Salvador Deputado Luis Eduardo Magalhaes International Airport", iataCode: "SSA" }, { name: "San Francisco International Airport", iataCode: "SFO" }, { name: "Santos Dumont Airport", iataCode: "SDU" }, { name: "Sao Paulo-Congonhas Airport", iataCode: "CGH" }, { name: "Seattle Tacoma International Airport", iataCode: "SEA" }, { name: "Shanghai Hongqiao International Airport", iataCode: "SHA" }, { name: "Shanghai Pudong International Airport", iataCode: "PVG" }, { name: "Shenzhen Bao'an International Airport", iataCode: "SZX" }, { name: "Sheremetyevo International Airport", iataCode: "SVO" }, { name: "Singapore Changi Airport", iataCode: "SIN" }, { name: "Soekarno-Hatta International Airport", iataCode: "CGK" }, { name: 'Stockholm-Arlanda Airport"', iataCode: "ARN" }, { name: "Suvarnabhumi Airport", iataCode: "BKK" }, { name: "Sydney Kingsford Smith International Airport", iataCode: "SYD" }, { name: "Taiwan Taoyuan International Airport", iataCode: "TPE" }, { name: "Tan Son Nhat International Airport", iataCode: "SGN" }, { name: "Tokyo Haneda International Airport", iataCode: "HND" }, { name: "Toronto Pearson International Airport", iataCode: "YYZ" }, { name: "Tunis Carthage International Airport", iataCode: "TUN" }, { name: "Vancouver International Airport", iataCode: "YVR" }, { name: "Vienna International Airport", iataCode: "VIE" }, { name: "Viracopos International Airport", iataCode: "VCP" }, { name: "Vnukovo International Airport", iataCode: "VKO" }, { name: "Wellington International Airport", iataCode: "WLG" }, { name: "Xi'an Xianyang International Airport", iataCode: "XIY" }, { name: "Zhukovsky International Airport", iataCode: "ZIA" }, { name: "Zurich Airport", iataCode: "ZRH" }], Rr = { airline: Mr, airplane: Tr, airport: Lr }, Pr = Rr, Hr = ["American black bear", "Asian black bear", "Brown bear", "Giant panda", "Polar bear", "Sloth bear", "Spectacled bear", "Sun bear"], Gr = ["Abert's Towhee", "Acadian Flycatcher", "Acorn Woodpecker", "Alder Flycatcher", "Aleutian Tern", "Allen's Hummingbird", "Altamira Oriole", "American Avocet", "American Bittern", "American Black Duck", "American Coot", "American Crow", "American Dipper", "American Golden-Plover", "American Goldfinch", "American Kestrel", "American Oystercatcher", "American Pipit", "American Redstart", "American Robin", "American Tree Sparrow", "American White Pelican", "American Wigeon", "American Woodcock", "Ancient Murrelet", "Anhinga", "Anna's Hummingbird", "Antillean Nighthawk", "Antillean Palm Swift", "Aplomado Falcon", "Arctic Loon", "Arctic Tern", "Arctic Warbler", "Ash-throated Flycatcher", "Ashy Storm-Petrel", "Asian Brown Flycatcher", "Atlantic Puffin", "Audubon's Oriole", "Audubon's Shearwater", "Aztec Thrush", "Azure Gallinule", "Bachman's Sparrow", "Bachman's Warbler", "Bahama Mockingbird", "Bahama Swallow", "Bahama Woodstar", "Baikal Teal", "Baird's Sandpiper", "Baird's Sparrow", "Bald Eagle", "Baltimore Oriole", "Bananaquit", "Band-rumped Storm-Petrel", "Band-tailed Gull", "Band-tailed Pigeon", "Bank Swallow", "Bar-tailed Godwit", "Barn Owl", "Barn Swallow", "Barnacle Goose", "Barred Owl", "Barrow's Goldeneye", "Bay-breasted Warbler", "Bean Goose", "Bell's Vireo", "Belted Kingfisher", "Bendire's Thrasher", "Berylline Hummingbird", "Bewick's Wren", "Bicknell's Thrush", "Black Catbird", "Black Guillemot", "Black Noddy", "Black Oystercatcher", "Black Phoebe", "Black Rail", "Black Rosy-Finch", "Black Scoter", "Black Skimmer", "Black Storm-Petrel", "Black Swift", "Black Tern", "Black Turnstone", "Black Vulture", "Black-and-white Warbler", "Black-backed Wagtail", "Black-backed Woodpecker", "Black-bellied Plover", "Black-bellied Whistling-Duck", "Black-billed Cuckoo", "Black-billed Magpie", "Black-browed Albatross", "Black-capped Chickadee", "Black-capped Gnatcatcher", "Black-capped Petrel", "Black-capped Vireo", "Black-chinned Hummingbird", "Black-chinned Sparrow", "Black-crowned Night-Heron", "Black-faced Grassquit", "Black-footed Albatross", "Black-headed Grosbeak", "Black-headed Gull", "Black-legged Kittiwake", "Black-necked Stilt", "Black-tailed Gnatcatcher", "Black-tailed Godwit", "Black-tailed Gull", "Black-throated Blue Warbler", "Black-throated Gray Warbler", "Black-throated Green Warbler", "Black-throated Sparrow", "Black-vented Oriole", "Black-vented Shearwater", "Black-whiskered Vireo", "Black-winged Stilt", "Blackburnian Warbler", "Blackpoll Warbler", "Blue Bunting", "Blue Grosbeak", "Blue Grouse", "Blue Jay", "Blue Mockingbird", "Blue-footed Booby", "Blue-gray Gnatcatcher", "Blue-headed Vireo", "Blue-throated Hummingbird", "Blue-winged Teal", "Blue-winged Warbler", "Bluethroat", "Boat-tailed Grackle", "Bobolink", "Bohemian Waxwing", "Bonaparte's Gull", "Boreal Chickadee", "Boreal Owl", "Botteri's Sparrow", "Brambling", "Brandt's Cormorant", "Brant", "Brewer's Blackbird", "Brewer's Sparrow", "Bridled Tern", "Bridled Titmouse", "Bristle-thighed Curlew", "Broad-billed Hummingbird", "Broad-billed Sandpiper", "Broad-tailed Hummingbird", "Broad-winged Hawk", "Bronzed Cowbird", "Brown Booby", "Brown Creeper", "Brown Jay", "Brown Noddy", "Brown Pelican", "Brown Shrike", "Brown Thrasher", "Brown-capped Rosy-Finch", "Brown-chested Martin", "Brown-crested Flycatcher", "Brown-headed Cowbird", "Brown-headed Nuthatch", "Budgerigar", "Buff-bellied Hummingbird", "Buff-breasted Flycatcher", "Buff-breasted Sandpiper", "Buff-collared Nightjar", "Bufflehead", "Buller's Shearwater", "Bullock's Oriole", "Bumblebee Hummingbird", "Burrowing Owl", "Bushtit", "Cactus Wren", "California Condor", "California Gnatcatcher", "California Gull", "California Quail", "California Thrasher", "California Towhee", "Calliope Hummingbird", "Canada Goose", "Canada Warbler", "Canvasback", "Canyon Towhee", "Canyon Wren", "Cape May Warbler", "Caribbean Elaenia", "Carolina Chickadee", "Carolina Parakeet", "Carolina Wren", "Caspian Tern", "Cassin's Auklet", "Cassin's Finch", "Cassin's Kingbird", "Cassin's Sparrow", "Cassin's Vireo", "Cattle Egret", "Cave Swallow", "Cedar Waxwing", "Cerulean Warbler", "Chestnut-backed Chickadee", "Chestnut-collared Longspur", "Chestnut-sided Warbler", "Chihuahuan Raven", "Chimney Swift", "Chinese Egret", "Chipping Sparrow", "Chuck-will's-widow", "Chukar", "Cinnamon Hummingbird", "Cinnamon Teal", "Citrine Wagtail", "Clapper Rail", "Clark's Grebe", "Clark's Nutcracker", "Clay-colored Robin", "Clay-colored Sparrow", "Cliff Swallow", "Colima Warbler", "Collared Forest-Falcon", "Collared Plover", "Common Black-Hawk", "Common Chaffinch", "Common Crane", "Common Cuckoo", "Common Eider", "Common Goldeneye", "Common Grackle", "Common Greenshank", "Common Ground-Dove", "Common House-Martin", "Common Loon", "Common Merganser", "Common Moorhen", "Common Murre", "Common Nighthawk", "Common Pauraque", "Common Pochard", "Common Poorwill", "Common Raven", "Common Redpoll", "Common Ringed Plover", "Common Rosefinch", "Common Sandpiper", "Common Snipe", "Common Swift", "Common Tern", "Common Yellowthroat", "Connecticut Warbler", "Cook's Petrel", "Cooper's Hawk", "Cordilleran Flycatcher", "Corn Crake", "Cory's Shearwater", "Costa's Hummingbird", "Couch's Kingbird", "Crane Hawk", "Craveri's Murrelet", "Crescent-chested Warbler", "Crested Auklet", "Crested Caracara", "Crested Myna", "Crimson-collared Grosbeak", "Crissal Thrasher", "Cuban Martin", "Curlew Sandpiper", "Curve-billed Thrasher", "Dark-eyed Junco", "Dickcissel", "Double-crested Cormorant", "Double-striped Thick-knee", "Dovekie", "Downy Woodpecker", "Dunlin", "Dusky Flycatcher", "Dusky Thrush", "Dusky Warbler", "Dusky-capped Flycatcher", "Eared Grebe", "Eared Trogon", "Eastern Bluebird", "Eastern Kingbird", "Eastern Meadowlark", "Eastern Phoebe", "Eastern Screech-Owl", "Eastern Towhee", "Eastern Wood-Pewee", "Elegant Tern", "Elegant Trogon", "Elf Owl", "Emperor Goose", "Eskimo Curlew", "Eurasian Blackbird", "Eurasian Bullfinch", "Eurasian Collared-Dove", "Eurasian Coot", "Eurasian Curlew", "Eurasian Dotterel", "Eurasian Hobby", "Eurasian Jackdaw", "Eurasian Kestrel", "Eurasian Oystercatcher", "Eurasian Siskin", "Eurasian Tree Sparrow", "Eurasian Wigeon", "Eurasian Woodcock", "Eurasian Wryneck", "European Golden-Plover", "European Starling", "European Storm-Petrel", "European Turtle-Dove", "Evening Grosbeak", "Eyebrowed Thrush", "Falcated Duck", "Fan-tailed Warbler", "Far Eastern Curlew", "Ferruginous Hawk", "Ferruginous Pygmy-Owl", "Field Sparrow", "Fieldfare", "Fish Crow", "Five-striped Sparrow", "Flame-colored Tanager", "Flammulated Owl", "Flesh-footed Shearwater", "Florida Scrub-Jay", "Fork-tailed Flycatcher", "Fork-tailed Storm-Petrel", "Fork-tailed Swift", "Forster's Tern", "Fox Sparrow", "Franklin's Gull", "Fulvous Whistling-Duck", "Gadwall", "Gambel's Quail", "Garganey", "Gila Woodpecker", "Gilded Flicker", "Glaucous Gull", "Glaucous-winged Gull", "Glossy Ibis", "Golden Eagle", "Golden-cheeked Warbler", "Golden-crowned Kinglet", "Golden-crowned Sparrow", "Golden-crowned Warbler", "Golden-fronted Woodpecker", "Golden-winged Warbler", "Grace's Warbler", "Grasshopper Sparrow", "Gray Bunting", "Gray Catbird", "Gray Flycatcher", "Gray Hawk", "Gray Jay", "Gray Kingbird", "Gray Partridge", "Gray Silky-flycatcher", "Gray Vireo", "Gray Wagtail", "Gray-breasted Martin", "Gray-cheeked Thrush", "Gray-crowned Rosy-Finch", "Gray-crowned Yellowthroat", "Gray-headed Chickadee", "Gray-spotted Flycatcher", "Gray-tailed Tattler", "Great Auk", "Great Black-backed Gull", "Great Blue Heron", "Great Cormorant", "Great Crested Flycatcher", "Great Egret", "Great Frigatebird", "Great Gray Owl", "Great Horned Owl", "Great Kiskadee", "Great Knot", "Great Skua", "Great Spotted Woodpecker", "Great-tailed Grackle", "Greater Flamingo", "Greater Pewee", "Greater Prairie-chicken", "Greater Roadrunner", "Greater Scaup", "Greater Shearwater", "Greater White-fronted Goose", "Greater Yellowlegs", "Green Heron", "Green Jay", "Green Kingfisher", "Green Sandpiper", "Green Violet-ear", "Green-breasted Mango", "Green-tailed Towhee", "Green-winged Teal", "Greenish Elaenia", "Groove-billed Ani", "Gull-billed Tern", "Gyrfalcon", "Hairy Woodpecker", "Hammond's Flycatcher", "Harlequin Duck", "Harris's Hawk", "Harris's Sparrow", "Hawfinch", "Heermann's Gull", "Henslow's Sparrow", "Hepatic Tanager", "Herald Petrel", "Hermit Thrush", "Hermit Warbler", "Herring Gull", "Himalayan Snowcock", "Hoary Redpoll", "Hooded Merganser", "Hooded Oriole", "Hooded Warbler", "Hook-billed Kite", "Hoopoe", "Horned Grebe", "Horned Lark", "Horned Puffin", "House Finch", "House Sparrow", "House Wren", "Hudsonian Godwit", "Hutton's Vireo", "Iceland Gull", "Inca Dove", "Indigo Bunting", "Island Scrub-Jay", "Ivory Gull", "Ivory-billed Woodpecker", "Jabiru", "Jack Snipe", "Jungle Nightjar", "Juniper Titmouse", "Kentucky Warbler", "Key West Quail-Dove", "Killdeer", "King Eider", "King Rail", "Kirtland's Warbler", "Kittlitz's Murrelet", "La Sagra's Flycatcher", "Labrador Duck", "Ladder-backed Woodpecker", "Lanceolated Warbler", "Lapland Longspur", "Large-billed Tern", "Lark Bunting", "Lark Sparrow", "Laughing Gull", "Lawrence's Goldfinch", "Laysan Albatross", "Lazuli Bunting", "Le Conte's Sparrow", "Le Conte's Thrasher", "Leach's Storm-Petrel", "Least Auklet", "Least Bittern", "Least Flycatcher", "Least Grebe", "Least Sandpiper", "Least Storm-Petrel", "Least Tern", "Lesser Black-backed Gull", "Lesser Frigatebird", "Lesser Goldfinch", "Lesser Nighthawk", "Lesser Prairie-chicken", "Lesser Scaup", "Lesser White-fronted Goose", "Lesser Yellowlegs", "Lewis's Woodpecker", "Limpkin", "Lincoln's Sparrow", "Little Blue Heron", "Little Bunting", "Little Curlew", "Little Egret", "Little Gull", "Little Ringed Plover", "Little Shearwater", "Little Stint", "Loggerhead Kingbird", "Loggerhead Shrike", "Long-billed Curlew", "Long-billed Dowitcher", "Long-billed Murrelet", "Long-billed Thrasher", "Long-eared Owl", "Long-tailed Jaeger", "Long-toed Stint", "Louisiana Waterthrush", "Lucifer Hummingbird", "Lucy's Warbler", "MacGillivray's Warbler", "Magnificent Frigatebird", "Magnificent Hummingbird", "Magnolia Warbler", "Mallard", "Mangrove Cuckoo", "Manx Shearwater", "Marbled Godwit", "Marbled Murrelet", "Marsh Sandpiper", "Marsh Wren", "Masked Booby", "Masked Duck", "Masked Tityra", "McCown's Longspur", "McKay's Bunting", "Merlin", "Mew Gull", "Mexican Chickadee", "Mexican Jay", "Middendorff's Grasshopper-Warbler", "Mississippi Kite", "Mongolian Plover", "Monk Parakeet", "Montezuma Quail", "Mottled Duck", "Mottled Owl", "Mottled Petrel", "Mountain Bluebird", "Mountain Chickadee", "Mountain Plover", "Mountain Quail", "Mourning Dove", "Mourning Warbler", "Mugimaki Flycatcher", "Murphy's Petrel", "Muscovy Duck", "Mute Swan", "Narcissus Flycatcher", "Nashville Warbler", "Nelson's Sharp-tailed Sparrow", "Neotropic Cormorant", "Northern Beardless-Tyrannulet", "Northern Bobwhite", "Northern Cardinal", "Northern Flicker", "Northern Fulmar", "Northern Gannet", "Northern Goshawk", "Northern Harrier", "Northern Hawk Owl", "Northern Jacana", "Northern Lapwing", "Northern Mockingbird", "Northern Parula", "Northern Pintail", "Northern Pygmy-Owl", "Northern Rough-winged Swallow", "Northern Saw-whet Owl", "Northern Shoveler", "Northern Shrike", "Northern Waterthrush", "Northern Wheatear", "Northwestern Crow", "Nuttall's Woodpecker", "Nutting's Flycatcher", "Oak Titmouse", "Oldsquaw", "Olive Sparrow", "Olive Warbler", "Olive-backed Pipit", "Olive-sided Flycatcher", "Orange-crowned Warbler", "Orchard Oriole", "Oriental Cuckoo", "Oriental Greenfinch", "Oriental Pratincole", "Oriental Scops-Owl", "Oriental Turtle-Dove", "Osprey", "Ovenbird", "Pacific Golden-Plover", "Pacific Loon", "Pacific-slope Flycatcher", "Paint-billed Crake", "Painted Bunting", "Painted Redstart", "Pallas's Bunting", "Palm Warbler", "Parakeet Auklet", "Parasitic Jaeger", "Passenger Pigeon", "Pechora Pipit", "Pectoral Sandpiper", "Pelagic Cormorant", "Peregrine Falcon", "Phainopepla", "Philadelphia Vireo", "Pied-billed Grebe", "Pigeon Guillemot", "Pileated Woodpecker", "Pin-tailed Snipe", "Pine Bunting", "Pine Grosbeak", "Pine Siskin", "Pine Warbler", "Pink-footed Goose", "Pink-footed Shearwater", "Pinyon Jay", "Piping Plover", "Plain Chachalaca", "Plain-capped Starthroat", "Plumbeous Vireo", "Pomarine Jaeger", "Prairie Falcon", "Prairie Warbler", "Prothonotary Warbler", "Purple Finch", "Purple Gallinule", "Purple Martin", "Purple Sandpiper", "Pygmy Nuthatch", "Pyrrhuloxia", "Razorbill", "Red Crossbill", "Red Knot", "Red Phalarope", "Red-bellied Woodpecker", "Red-billed Pigeon", "Red-billed Tropicbird", "Red-breasted Flycatcher", "Red-breasted Merganser", "Red-breasted Nuthatch", "Red-breasted Sapsucker", "Red-cockaded Woodpecker", "Red-crowned Parrot", "Red-eyed Vireo", "Red-faced Cormorant", "Red-faced Warbler", "Red-flanked Bluetail", "Red-footed Booby", "Red-headed Woodpecker", "Red-legged Kittiwake", "Red-naped Sapsucker", "Red-necked Grebe", "Red-necked Phalarope", "Red-necked Stint", "Red-shouldered Hawk", "Red-tailed Hawk", "Red-tailed Tropicbird", "Red-throated Loon", "Red-throated Pipit", "Red-whiskered Bulbul", "Red-winged Blackbird", "Reddish Egret", "Redhead", "Redwing", "Reed Bunting", "Rhinoceros Auklet", "Ring-billed Gull", "Ring-necked Duck", "Ring-necked Pheasant", "Ringed Kingfisher", "Roadside Hawk", "Rock Dove", "Rock Ptarmigan", "Rock Sandpiper", "Rock Wren", "Rose-breasted Grosbeak", "Rose-throated Becard", "Roseate Spoonbill", "Roseate Tern", "Ross's Goose", "Ross's Gull", "Rough-legged Hawk", "Royal Tern", "Ruby-crowned Kinglet", "Ruby-throated Hummingbird", "Ruddy Duck", "Ruddy Ground-Dove", "Ruddy Quail-Dove", "Ruddy Turnstone", "Ruff", "Ruffed Grouse", "Rufous Hummingbird", "Rufous-backed Robin", "Rufous-capped Warbler", "Rufous-crowned Sparrow", "Rufous-winged Sparrow", "Rustic Bunting", "Rusty Blackbird", "Sabine's Gull", "Sage Grouse", "Sage Sparrow", "Sage Thrasher", "Saltmarsh Sharp-tailed Sparrow", "Sanderling", "Sandhill Crane", "Sandwich Tern", "Savannah Sparrow", "Say's Phoebe", "Scaled Quail", "Scaly-naped Pigeon", "Scarlet Ibis", "Scarlet Tanager", "Scissor-tailed Flycatcher", "Scott's Oriole", "Seaside Sparrow", "Sedge Wren", "Semipalmated Plover", "Semipalmated Sandpiper", "Sharp-shinned Hawk", "Sharp-tailed Grouse", "Sharp-tailed Sandpiper", "Shiny Cowbird", "Short-billed Dowitcher", "Short-eared Owl", "Short-tailed Albatross", "Short-tailed Hawk", "Short-tailed Shearwater", "Shy Albatross", "Siberian Accentor", "Siberian Blue Robin", "Siberian Flycatcher", "Siberian Rubythroat", "Sky Lark", "Slate-throated Redstart", "Slaty-backed Gull", "Slender-billed Curlew", "Smew", "Smith's Longspur", "Smooth-billed Ani", "Snail Kite", "Snow Bunting", "Snow Goose", "Snowy Egret", "Snowy Owl", "Snowy Plover", "Solitary Sandpiper", "Song Sparrow", "Sooty Shearwater", "Sooty Tern", "Sora", "South Polar Skua", "Southern Martin", "Spectacled Eider", "Spoonbill Sandpiper", "Spot-billed Duck", "Spot-breasted Oriole", "Spotted Dove", "Spotted Owl", "Spotted Rail", "Spotted Redshank", "Spotted Sandpiper", "Spotted Towhee", "Sprague's Pipit", "Spruce Grouse", "Stejneger's Petrel", "Steller's Eider", "Steller's Jay", "Steller's Sea-Eagle", "Stilt Sandpiper", "Stonechat", "Streak-backed Oriole", "Streaked Shearwater", "Strickland's Woodpecker", "Stripe-headed Tanager", "Sulphur-bellied Flycatcher", "Summer Tanager", "Surf Scoter", "Surfbird", "Swainson's Hawk", "Swainson's Thrush", "Swainson's Warbler", "Swallow-tailed Kite", "Swamp Sparrow", "Tamaulipas Crow", "Tawny-shouldered Blackbird", "Temminck's Stint", "Tennessee Warbler", "Terek Sandpiper", "Thayer's Gull", "Thick-billed Kingbird", "Thick-billed Murre", "Thick-billed Parrot", "Thick-billed Vireo", "Three-toed Woodpecker", "Townsend's Solitaire", "Townsend's Warbler", "Tree Pipit", "Tree Swallow", "Tricolored Blackbird", "Tricolored Heron", "Tropical Kingbird", "Tropical Parula", "Trumpeter Swan", "Tufted Duck", "Tufted Flycatcher", "Tufted Puffin", "Tufted Titmouse", "Tundra Swan", "Turkey Vulture", "Upland Sandpiper", "Varied Bunting", "Varied Thrush", "Variegated Flycatcher", "Vaux's Swift", "Veery", "Verdin", "Vermilion Flycatcher", "Vesper Sparrow", "Violet-crowned Hummingbird", "Violet-green Swallow", "Virginia Rail", "Virginia's Warbler", "Wandering Albatross", "Wandering Tattler", "Warbling Vireo", "Wedge-rumped Storm-Petrel", "Wedge-tailed Shearwater", "Western Bluebird", "Western Grebe", "Western Gull", "Western Kingbird", "Western Meadowlark", "Western Reef-Heron", "Western Sandpiper", "Western Screech-Owl", "Western Scrub-Jay", "Western Tanager", "Western Wood-Pewee", "Whimbrel", "Whip-poor-will", "Whiskered Auklet", "Whiskered Screech-Owl", "Whiskered Tern", "White Ibis", "White Wagtail", "White-breasted Nuthatch", "White-cheeked Pintail", "White-chinned Petrel", "White-collared Seedeater", "White-collared Swift", "White-crowned Pigeon", "White-crowned Sparrow", "White-eared Hummingbird", "White-eyed Vireo", "White-faced Ibis", "White-faced Storm-Petrel", "White-headed Woodpecker", "White-rumped Sandpiper", "White-tailed Eagle", "White-tailed Hawk", "White-tailed Kite", "White-tailed Ptarmigan", "White-tailed Tropicbird", "White-throated Needletail", "White-throated Robin", "White-throated Sparrow", "White-throated Swift", "White-tipped Dove", "White-winged Crossbill", "White-winged Dove", "White-winged Parakeet", "White-winged Scoter", "White-winged Tern", "Whooper Swan", "Whooping Crane", "Wild Turkey", "Willet", "Williamson's Sapsucker", "Willow Flycatcher", "Willow Ptarmigan", "Wilson's Phalarope", "Wilson's Plover", "Wilson's Storm-Petrel", "Wilson's Warbler", "Winter Wren", "Wood Duck", "Wood Sandpiper", "Wood Stork", "Wood Thrush", "Wood Warbler", "Worm-eating Warbler", "Worthen's Sparrow", "Wrentit", "Xantus's Hummingbird", "Xantus's Murrelet", "Yellow Bittern", "Yellow Grosbeak", "Yellow Rail", "Yellow Wagtail", "Yellow Warbler", "Yellow-bellied Flycatcher", "Yellow-bellied Sapsucker", "Yellow-billed Cuckoo", "Yellow-billed Loon", "Yellow-billed Magpie", "Yellow-breasted Bunting", "Yellow-breasted Chat", "Yellow-crowned Night-Heron", "Yellow-eyed Junco", "Yellow-faced Grassquit", "Yellow-footed Gull", "Yellow-green Vireo", "Yellow-headed Blackbird", "Yellow-legged Gull", "Yellow-nosed Albatross", "Yellow-rumped Warbler", "Yellow-throated Vireo", "Yellow-throated Warbler", "Yucatan Vireo", "Zenaida Dove", "Zone-tailed Hawk"], Nr = ["Abyssinian", "American Bobtail", "American Curl", "American Shorthair", "American Wirehair", "Balinese", "Bengal", "Birman", "Bombay", "British Shorthair", "Burmese", "Chartreux", "Chausie", "Cornish Rex", "Devon Rex", "Donskoy", "Egyptian Mau", "Exotic Shorthair", "Havana", "Highlander", "Himalayan", "Japanese Bobtail", "Korat", "Kurilian Bobtail", "LaPerm", "Maine Coon", "Manx", "Minskin", "Munchkin", "Nebelung", "Norwegian Forest Cat", "Ocicat", "Ojos Azules", "Oriental", "Persian", "Peterbald", "Pixiebob", "Ragdoll", "Russian Blue", "Savannah", "Scottish Fold", "Selkirk Rex", "Serengeti", "Siamese", "Siberian", "Singapura", "Snowshoe", "Sokoke", "Somali", "Sphynx", "Thai", "Tonkinese", "Toyger", "Turkish Angora", "Turkish Van"], Wr = ["Amazon River Dolphin", "Arnoux's Beaked Whale", "Atlantic Humpbacked Dolphin", "Atlantic Spotted Dolphin", "Atlantic White-Sided Dolphin", "Australian Snubfin Dolphin", "Australian humpback Dolphin", "Blue Whale", "Bottlenose Dolphin", "Bryde’s whale", "Burrunan Dolphin", "Chilean Dolphin", "Chinese River Dolphin", "Chinese White Dolphin", "Clymene Dolphin", "Commerson’s Dolphin", "Costero", "Dusky Dolphin", "False Killer Whale", "Fin Whale", "Fraser’s Dolphin", "Ganges River Dolphin", "Guiana Dolphin", "Heaviside’s Dolphin", "Hector’s Dolphin", "Hourglass Dolphin", "Humpback whale", "Indo-Pacific Bottlenose Dolphin", "Indo-Pacific Hump-backed Dolphin", "Irrawaddy Dolphin", "Killer Whale (Orca)", "La Plata Dolphin", "Long-Beaked Common Dolphin", "Long-finned Pilot Whale", "Longman's Beaked Whale", "Melon-headed Whale", "Northern Rightwhale Dolphin", "Omura’s whale", "Pacific White-Sided Dolphin", "Pantropical Spotted Dolphin", "Peale’s Dolphin", "Pygmy Killer Whale", "Risso’s Dolphin", "Rough-Toothed Dolphin", "Sei Whale", "Short-Beaked Common Dolphin", "Short-finned Pilot Whale", "Southern Bottlenose Whale", "Southern Rightwhale Dolphin", "Sperm Whale", "Spinner Dolphin", "Striped Dolphin", "Tucuxi", "White-Beaked Dolphin"], xr = ["Aberdeen Angus", "Abergele", "Abigar", "Abondance", "Abyssinian Shorthorned Zebu", "Aceh", "Achham", "Adamawa", "Adaptaur", "Afar", "Africangus", "Afrikaner", "Agerolese", "Alambadi", "Alatau", "Albanian", "Albera", "Alderney", "Alentejana", "Aleutian wild cattle", "Aliad Dinka", "Alistana-Sanabresa", "Allmogekor", "Alur", "American", "American Angus", "American Beef Friesian", "American Brown Swiss", "American Milking Devon", "American White Park", "Amerifax", "Amrit Mahal", "Amsterdam Island cattle", "Anatolian Black", "Andalusian Black", "Andalusian Blond", "Andalusian Grey", "Angeln", "Angoni", "Ankina", "Ankole", "Ankole-Watusi", "Aracena", "Arado", "Argentine Criollo", "Argentine Friesian", "Armorican", "Arouquesa", "Arsi", "Asturian Mountain", "Asturian Valley", "Aubrac", "Aulie-Ata", "Aure et Saint-Girons", "Australian Braford", "Australian Brangus", "Australian Charbray", "Australian Friesian Sahiwal", "Australian Lowline", "Australian Milking Zebu", "Australian Shorthorn", "Austrian Simmental", "Austrian Yellow", "Avileña-Negra Ibérica", "Avétonou", "Aweil Dinka", "Ayrshire", "Azaouak", "Azebuado", "Azerbaijan Zebu", "Azores", "Bachaur cattle", "Baherie cattle", "Bakosi cattle", "Balancer", "Baoule", "Bargur cattle", "Barrosã", "Barzona", "Bazadaise", "Bedit", "Beef Freisian", "Beefalo", "Beefmaker", "Beefmaster", "Begayt", "Belgian Blue", "Belgian Red", "Belgian Red Pied", "Belgian White-and-Red", "Belmont Red", "Belted Galloway", "Bernese", "Berrenda cattle", "Betizu", "Bianca Modenese", "Blaarkop", "Black Angus", "Black Baldy", "Black Hereford", "Blanca Cacereña", "Blanco Orejinegro BON", "Blonde d'Aquitaine", "Blue Albion", "Blue Grey", "Bohuskulla", "Bonsmara", "Boran", "Boškarin", "Braford", "Brahman", "Brahmousin", "Brangus", "Braunvieh", "Brava", "Breed", "British Friesian", "British White", "Brown Carpathian", "Brown Caucasian", "Brown Swiss", "Bue Lingo", "Burlina", "Bushuyev", "Butana cattle", "Buša cattle", "Cachena", "Caldelana", "Camargue", "Campbell Island cattle", "Canadian Speckle Park", "Canadienne", "Canaria", "Canchim", "Caracu", "Carinthian Blondvieh", "Carora", "Cedit", "Charbray", "Charolais", "Chateaubriand", "Chiangus", "Chianina", "Chillingham cattle", "Chinese Black Pied", "Cholistani", "Coloursided White Back", "Commercial", "Corriente", "Corsican cattle", "Costeño con Cuernos", "Crioulo Lageano", "Cárdena Andaluza", "Dajal", "Dangi cattle", "Danish Black-Pied", "Danish Jersey", "Danish Red", "Dedit", "Deep Red cattle", "Deoni", "Devon", "Dexter cattle", "Dhanni", "Doayo cattle", "Doela", "Drakensberger", "Droughtmaster", "Dulong'", "Dutch Belted", "Dutch Friesian", "Dwarf Lulu", "Dølafe", "East Anatolian Red", "Eastern Finncattle", "Eastern Red Polled", "Eedit", "Enderby Island cattle", "English Longhorn", "Ennstaler Bergscheck", "Estonian Holstein", "Estonian Native", "Estonian Red cattle", "Fedit", "Finncattle", "Finnish Ayrshire", "Finnish Holstein-Friesian", "Fjäll", "Fleckvieh", "Florida Cracker cattle", "Fogera", "French Simmental", "Fribourgeoise", "Friesian Red and White", "Fulani Sudanese", "Fēng Cattle", "Galician Blond", "Galloway cattle", "Gangatiri", "Gaolao", "Garvonesa", "Gascon cattle", "Gedit", "Gelbvieh", "Georgian Mountain cattle", "German Angus", "German Black Pied Dairy", "German Black Pied cattle", "German Red Pied", "Gir", "Glan cattle", "Gloucester", "Gobra", "Greek Shorthorn", "Greek Steppe", "Greyman cattle", "Gudali", "Guernsey cattle", "Guzerá", "Hallikar4", "Hanwoo", "Hariana cattle", "Hartón del Valle", "Harzer Rotvieh", "Hays Converter", "Heck cattle", "Hedit", "Hereford", "Herens", "Highland cattle", "Hinterwald", "Holando-Argentino", "Holstein Friesian cattle", "Horro", "Hungarian Grey", "Huáng Cattle", "Hybridmaster", "Iberian cattle", "Icelandic", "Iedit", "Illawarra cattle", "Improved Red and White", "Indo-Brazilian", "Irish Moiled", "Israeli Holstein", "Israeli Red", "Istoben cattle", "Istrian cattle", "Jamaica Black", "Jamaica Hope", "Jamaica Red", "Japanese Brown", "Jarmelista", "Javari cattle", "Jedit", "Jersey cattle", "Jutland cattle", "Kabin Buri cattle", "Kalmyk cattle", "Kamphaeng Saen cattle", "Kangayam", "Kankrej", "Karan Swiss", "Kasaragod Dwarf cattle", "Kathiawadi", "Kazakh Whiteheaded", "Kedit", "Kenana cattle", "Kenkatha cattle", "Kerry cattle", "Kherigarh", "Khillari cattle", "Kholomogory", "Korat Wagyu", "Kostroma cattle", "Krishna Valley cattle", "Kurgan cattle", "Kuri", "La Reina cattle", "Lakenvelder cattle", "Lampurger", "Latvian Blue", "Latvian Brown", "Latvian Danish Red", "Lebedyn", "Ledit", "Levantina", "Limia cattle", "Limousin", "Limpurger", "Lincoln Red", "Lineback", "Lithuanian Black-and-White", "Lithuanian Light Grey", "Lithuanian Red", "Lithuanian White-Backed", "Lohani cattle", "Lourdais", "Lucerna cattle", "Luing", "Madagascar Zebu", "Madura", "Maine-Anjou", "Malnad Gidda", "Malvi", "Mandalong Special", "Mantequera Leonesa", "Maramureş Brown", "Marchigiana", "Maremmana", "Marinhoa", "Maronesa", "Masai", "Mashona", "Medit", "Menorquina", "Mertolenga", "Meuse-Rhine-Issel", "Mewati", "Milking Shorthorn", "Minhota", "Mirandesa", "Mirkadim", "Mocăniţă", "Mollie", "Monchina", "Mongolian", "Montbéliarde", "Morucha", "Murboden", "Murnau-Werdenfels", "Murray Grey", "Muturu", "N'Dama", "Nagori", "Nedit", "Negra Andaluza", "Nelore", "Nguni", "Nimari", "Normande", "North Bengal Grey", "Northern Finncattle", "Northern Shorthorn", "Norwegian Red", "Oedit]", "Ongole", "Original Simmental", "Pajuna", "Palmera", "Pantaneiro", "Parda Alpina", "Parthenaise", "Pasiega", "Pedit", "Pembroke", "Philippine Native", "Pie Rouge des Plaines", "Piedmontese cattle", "Pineywoods", "Pinzgauer", "Pirenaica", "Podolac", "Podolica", "Polish Black-and-White", "Polish Red", "Poll Shorthorn", "Polled Hereford", "Polled Shorthorn", "Ponwar", "Preta", "Pulikulam", "Punganur", "Pustertaler Sprinzen", "Qedit", "Qinchaun", "Queensland Miniature Boran", "RX3", "Ramo Grande", "Randall", "Raramuri Criollo", "Rathi", "Raya", "Red Angus", "Red Brangus", "Red Chittagong", "Red Fulani", "Red Gorbatov", "Red Holstein", "Red Kandhari", "Red Mingrelian", "Red Poll", "Red Polled Østland", "Red Sindhi", "Redit", "Retinta", "Riggit Galloway", "Ringamåla", "Rohjan", "Romagnola", "Romanian Bălţata", "Romanian Steppe Gray", "Romosinuano", "Russian Black Pied", "Rätisches Grauvieh", "Sahiwal", "Salers", "Salorn", "Sanga", "Sanhe", "Santa Cruz", "Santa Gertrudis", "Sayaguesa", "Schwyz", "Sedit", "Selembu", "Senepol", "Serbian Pied", "Serbian Steppe", "Sheko", "Shetland", "Shorthorn", "Siboney de Cuba", "Simbrah", "Simford", "Simmental", "Siri", "South Devon", "Spanish Fighting Bull", "Speckle Park", "Square Meater", "Sussex", "Swedish Friesian", "Swedish Polled", "Swedish Red Pied", "Swedish Red Polled", "Swedish Red-and-White", "Tabapuã", "Tarentaise", "Tasmanian Grey", "Tauros", "Tedit", "Telemark", "Texas Longhorn", "Texon", "Thai Black", "Thai Fighting Bull", "Thai Friesian", "Thai Milking Zebu", "Tharparkar", "Tswana", "Tudanca", "Tuli", "Tulim", "Turkish Grey Steppe", "Tux-Zillertal", "Tyrol Grey", "Uedit", "Ukrainian Grey", "Umblachery", "Valdostana Castana", "Valdostana Pezzata Nera", "Valdostana Pezzata Rossa", "Vaynol", "Vechur8", "Vedit", "Vestland Fjord", "Vestland Red Polled", "Vianesa", "Volinian Beef", "Vorderwald", "Vosgienne", "Väneko", "Waguli", "Wagyu", "Wangus", "Wedit", "Welsh Black", "Western Finncattle", "White Cáceres", "White Fulani", "White Lamphun", "White Park", "Whitebred Shorthorn", "Xedit", "Xingjiang Brown", "Yakutian", "Yanbian", "Yanhuang", "Yedit", "Yurino", "Zebu", "Zedit", "Évolène cattle", "Żubroń"], Ir = ["African Slender-snouted Crocodile", "Alligator mississippiensis", "American Crocodile", "Australian Freshwater Crocodile", "Black Caiman", "Broad-snouted Caiman", "Chinese Alligator", "Cuban Crocodile", "Cuvier’s Dwarf Caiman", "Dwarf Crocodile", "Gharial", "Morelet’s Crocodile", "Mugger Crocodile", "New Guinea Freshwater Crocodile", "Nile Crocodile", "Orinoco Crocodile", "Philippine Crocodile", "Saltwater Crocodile", "Schneider’s Smooth-fronted Caiman", "Siamese Crocodile", "Spectacled Caiman", "Tomistoma", "West African Crocodile", "Yacare Caiman"], Kr = ["Affenpinscher", "Afghan Hound", "Aidi", "Airedale Terrier", "Akbash", "Akita", "Alano Español", "Alapaha Blue Blood Bulldog", "Alaskan Husky", "Alaskan Klee Kai", "Alaskan Malamute", "Alopekis", "Alpine Dachsbracke", "American Bulldog", "American Bully", "American Cocker Spaniel", "American English Coonhound", "American Foxhound", "American Hairless Terrier", "American Pit Bull Terrier", "American Staffordshire Terrier", "American Water Spaniel", "Andalusian Hound", "Anglo-Français de Petite Vénerie", "Appenzeller Sennenhund", "Ariegeois", "Armant", "Armenian Gampr dog", "Artois Hound", "Australian Cattle Dog", "Australian Kelpie", "Australian Shepherd", "Australian Stumpy Tail Cattle Dog", "Australian Terrier", "Austrian Black and Tan Hound", "Austrian Pinscher", "Azawakh", "Bakharwal dog", "Banjara Hound", "Barbado da Terceira", "Barbet", "Basenji", "Basque Shepherd Dog", "Basset Artésien Normand", "Basset Bleu de Gascogne", "Basset Fauve de Bretagne", "Basset Hound", "Bavarian Mountain Hound", "Beagle", "Beagle-Harrier", "Bearded Collie", "Beauceron", "Bedlington Terrier", "Belgian Shepherd", "Bergamasco Shepherd", "Berger Picard", "Bernese Mountain Dog", "Bhotia", "Bichon Frisé", "Billy", "Black Mouth Cur", "Black Norwegian Elkhound", "Black Russian Terrier", "Black and Tan Coonhound", "Bloodhound", "Blue Lacy", "Blue Picardy Spaniel", "Bluetick Coonhound", "Boerboel", "Bohemian Shepherd", "Bolognese", "Border Collie", "Border Terrier", "Borzoi", "Bosnian Coarse-haired Hound", "Boston Terrier", "Bouvier des Ardennes", "Bouvier des Flandres", "Boxer", "Boykin Spaniel", "Bracco Italiano", "Braque Francais", "Braque Saint-Germain", "Braque d'Auvergne", "Braque de l'Ariège", "Braque du Bourbonnais", "Briard", "Briquet Griffon Vendéen", "Brittany", "Broholmer", "Bruno Jura Hound", "Brussels Griffon", "Bucovina Shepherd Dog", "Bull Arab", "Bull Terrier", "Bulldog", "Bullmastiff", "Bully Kutta", "Burgos Pointer", "Cairn Terrier", "Campeiro Bulldog", "Can de Chira", "Canaan Dog", "Canadian Eskimo Dog", "Cane Corso", "Cane Paratore", "Cane di Oropa", "Cantabrian Water Dog", "Cardigan Welsh Corgi", "Carea Castellano Manchego", "Carolina Dog", "Carpathian Shepherd Dog", "Catahoula Leopard Dog", "Catalan Sheepdog", "Caucasian Shepherd Dog", "Cavalier King Charles Spaniel", "Central Asian Shepherd Dog", "Cesky Fousek", "Cesky Terrier", "Chesapeake Bay Retriever", "Chien Français Blanc et Noir", "Chien Français Blanc et Orange", "Chien Français Tricolore", "Chihuahua", "Chilean Terrier", "Chinese Chongqing Dog", "Chinese Crested Dog", "Chinook", "Chippiparai", "Chongqing dog", "Chortai", "Chow Chow", "Cimarrón Uruguayo", "Cirneco dell'Etna", "Clumber Spaniel", "Colombian fino hound", "Coton de Tulear", "Cretan Hound", "Croatian Sheepdog", "Curly-Coated Retriever", "Cursinu", "Czechoslovakian Wolfdog", "Cão Fila de São Miguel", "Cão da Serra de Aires", "Cão de Castro Laboreiro", "Cão de Gado Transmontano", "Dachshund", "Dalmatian", "Dandie Dinmont Terrier", "Danish-Swedish Farmdog", "Denmark Feist", "Dingo", "Doberman Pinscher", "Dogo Argentino", "Dogo Guatemalteco", "Dogo Sardesco", "Dogue Brasileiro", "Dogue de Bordeaux", "Drentse Patrijshond", "Drever", "Dunker", "Dutch Shepherd", "Dutch Smoushond", "East European Shepherd", "East Siberian Laika", "English Cocker Spaniel", "English Foxhound", "English Mastiff", "English Setter", "English Shepherd", "English Springer Spaniel", "English Toy Terrier", "Entlebucher Mountain Dog", "Estonian Hound", "Estrela Mountain Dog", "Eurasier", "Field Spaniel", "Fila Brasileiro", "Finnish Hound", "Finnish Lapphund", "Finnish Spitz", "Flat-Coated Retriever", "French Bulldog", "French Spaniel", "Galgo Español", "Galician Shepherd Dog", "Garafian Shepherd", "Gascon Saintongeois", "Georgian Shepherd", "German Hound", "German Longhaired Pointer", "German Pinscher", "German Roughhaired Pointer", "German Shepherd Dog", "German Shorthaired Pointer", "German Spaniel", "German Spitz", "German Wirehaired Pointer", "Giant Schnauzer", "Glen of Imaal Terrier", "Golden Retriever", "Gordon Setter", "Gończy Polski", "Grand Anglo-Français Blanc et Noir", "Grand Anglo-Français Blanc et Orange", "Grand Anglo-Français Tricolore", "Grand Basset Griffon Vendéen", "Grand Bleu de Gascogne", "Grand Griffon Vendéen", "Great Dane", "Greater Swiss Mountain Dog", "Greek Harehound", "Greek Shepherd", "Greenland Dog", "Greyhound", "Griffon Bleu de Gascogne", "Griffon Fauve de Bretagne", "Griffon Nivernais", "Gull Dong", "Gull Terrier", "Hamiltonstövare", "Hanover Hound", "Harrier", "Havanese", "Hierran Wolfdog", "Hokkaido", "Hovawart", "Huntaway", "Hygen Hound", "Hällefors Elkhound", "Ibizan Hound", "Icelandic Sheepdog", "Indian Spitz", "Indian pariah dog", "Irish Red and White Setter", "Irish Setter", "Irish Terrier", "Irish Water Spaniel", "Irish Wolfhound", "Istrian Coarse-haired Hound", "Istrian Shorthaired Hound", "Italian Greyhound", "Jack Russell Terrier", "Jagdterrier", "Japanese Chin", "Japanese Spitz", "Japanese Terrier", "Jindo", "Jonangi", "Kai Ken", "Kaikadi", "Kangal Shepherd Dog", "Kanni", "Karakachan dog", "Karelian Bear Dog", "Kars", "Karst Shepherd", "Keeshond", "Kerry Beagle", "Kerry Blue Terrier", "King Charles Spaniel", "King Shepherd", "Kintamani", "Kishu", "Kokoni", "Kombai", "Komondor", "Kooikerhondje", "Koolie", "Koyun dog", "Kromfohrländer", "Kuchi", "Kuvasz", "Labrador Retriever", "Lagotto Romagnolo", "Lakeland Terrier", "Lancashire Heeler", "Landseer", "Lapponian Herder", "Large Münsterländer", "Leonberger", "Levriero Sardo", "Lhasa Apso", "Lithuanian Hound", "Lupo Italiano", "Löwchen", "Mackenzie River Husky", "Magyar agár", "Mahratta Greyhound", "Maltese", "Manchester Terrier", "Maremmano-Abruzzese Sheepdog", "McNab dog", "Miniature American Shepherd", "Miniature Bull Terrier", "Miniature Fox Terrier", "Miniature Pinscher", "Miniature Schnauzer", "Molossus of Epirus", "Montenegrin Mountain Hound", "Mountain Cur", "Mountain Feist", "Mucuchies", "Mudhol Hound", "Mudi", "Neapolitan Mastiff", "New Guinea Singing Dog", "New Zealand Heading Dog", "Newfoundland", "Norfolk Terrier", "Norrbottenspets", "Northern Inuit Dog", "Norwegian Buhund", "Norwegian Elkhound", "Norwegian Lundehund", "Norwich Terrier", "Nova Scotia Duck Tolling Retriever", "Old Croatian Sighthound", "Old Danish Pointer", "Old English Sheepdog", "Old English Terrier", "Olde English Bulldogge", "Otterhound", "Pachon Navarro", "Paisley Terrier", "Pampas Deerhound", "Papillon", "Parson Russell Terrier", "Pastore della Lessinia e del Lagorai", "Patagonian Sheepdog", "Patterdale Terrier", "Pekingese", "Pembroke Welsh Corgi", "Perro Majorero", "Perro de Pastor Mallorquin", "Perro de Presa Canario", "Perro de Presa Mallorquin", "Peruvian Inca Orchid", "Petit Basset Griffon Vendéen", "Petit Bleu de Gascogne", "Phalène", "Pharaoh Hound", "Phu Quoc Ridgeback", "Picardy Spaniel", "Plott Hound", "Plummer Terrier", "Podenco Canario", "Podenco Valenciano", "Pointer", "Poitevin", "Polish Greyhound", "Polish Hound", "Polish Lowland Sheepdog", "Polish Tatra Sheepdog", "Pomeranian", "Pont-Audemer Spaniel", "Poodle", "Porcelaine", "Portuguese Podengo", "Portuguese Pointer", "Portuguese Water Dog", "Posavac Hound", "Pražský Krysařík", "Pshdar Dog", "Pudelpointer", "Pug", "Puli", "Pumi", "Pungsan Dog", "Pyrenean Mastiff", "Pyrenean Mountain Dog", "Pyrenean Sheepdog", "Rafeiro do Alentejo", "Rajapalayam", "Rampur Greyhound", "Rat Terrier", "Ratonero Bodeguero Andaluz", "Ratonero Mallorquin", "Ratonero Murciano de Huerta", "Ratonero Valenciano", "Redbone Coonhound", "Rhodesian Ridgeback", "Romanian Mioritic Shepherd Dog", "Romanian Raven Shepherd Dog", "Rottweiler", "Rough Collie", "Russian Spaniel", "Russian Toy", "Russo-European Laika", "Saarloos Wolfdog", "Sabueso Español", "Saint Bernard", "Saint Hubert Jura Hound", "Saint-Usuge Spaniel", "Saluki", "Samoyed", "Sapsali", "Sarabi dog", "Sardinian Shepherd Dog", "Schapendoes", "Schillerstövare", "Schipperke", "Schweizer Laufhund", "Schweizerischer Niederlaufhund", "Scottish Deerhound", "Scottish Terrier", "Sealyham Terrier", "Segugio Italiano", "Segugio Maremmano", "Segugio dell'Appennino", "Seppala Siberian Sleddog", "Serbian Hound", "Serbian Tricolour Hound", "Serrano Bulldog", "Shar Pei", "Shetland Sheepdog", "Shiba Inu", "Shih Tzu", "Shikoku", "Shiloh Shepherd", "Siberian Husky", "Silken Windhound", "Silky Terrier", "Sinhala Hound", "Skye Terrier", "Sloughi", "Slovakian Wirehaired Pointer", "Slovenský Cuvac", "Slovenský Kopov", "Smalandstövare", "Small Greek domestic dog", "Small Münsterländer", "Smooth Collie", "Smooth Fox Terrier", "Soft-Coated Wheaten Terrier", "South Russian Ovcharka", "Spanish Mastiff", "Spanish Water Dog", "Spinone Italiano", "Sporting Lucas Terrier", "Stabyhoun", "Staffordshire Bull Terrier", "Standard Schnauzer", "Stephens Stock", "Styrian Coarse-haired Hound", "Sussex Spaniel", "Swedish Elkhound", "Swedish Lapphund", "Swedish Vallhund", "Swedish White Elkhound", "Taigan", "Taiwan Dog", "Tamaskan Dog", "Teddy Roosevelt Terrier", "Telomian", "Tenterfield Terrier", "Terrier Brasileiro", "Thai Bangkaew Dog", "Thai Ridgeback", "Tibetan Mastiff", "Tibetan Spaniel", "Tibetan Terrier", "Tornjak", "Tosa", "Toy Fox Terrier", "Toy Manchester Terrier", "Transylvanian Hound", "Treeing Cur", "Treeing Feist", "Treeing Tennessee Brindle", "Treeing Walker Coonhound", "Trigg Hound", "Tyrolean Hound", "Vikhan", "Villano de Las Encartaciones", "Villanuco de Las Encartaciones", "Vizsla", "Volpino Italiano", "Weimaraner", "Welsh Sheepdog", "Welsh Springer Spaniel", "Welsh Terrier", "West Highland White Terrier", "West Siberian Laika", "Westphalian Dachsbracke", "Wetterhoun", "Whippet", "White Shepherd", "White Swiss Shepherd Dog", "Wire Fox Terrier", "Wirehaired Pointing Griffon", "Wirehaired Vizsla", "Xiasi Dog", "Xoloitzcuintli", "Yakutian Laika", "Yorkshire Terrier", "Šarplaninac"], Or = ["Alaska pollock", "Albacore", "Amur catfish", "Araucanian herring", "Argentine hake", "Asari", "Asian swamp eel", "Atlantic cod", "Atlantic herring", "Atlantic horse mackerel", "Atlantic mackerel", "Atlantic menhaden", "Atlantic salmon", "Bigeye scad", "Bigeye tuna", "Bighead carp", "Black carp", "Blood cockle", "Blue swimming crab", "Blue whiting", "Bombay-duck", "Bonga shad", "California pilchard", "Cape horse mackerel", "Capelin", "Catla", "Channel catfish", "Chilean jack mackerel", "Chinese perch", "Chinese softshell turtle", "Chub mackerel", "Chum salmon", "Common carp", "Crucian carp", "Daggertooth pike conger", "European anchovy", "European pilchard", "European sprat", "Filipino Venus", "Gazami crab", "Goldstripe sardinella", "Grass carp", "Gulf menhaden", "Haddock", "Hilsa shad", "Indian mackerel", "Indian oil sardine", "Iridescent shark", "Japanese anchovy", "Japanese cockle", "Japanese common catfish", "Japanese flying squid", "Japanese jack mackerel", "Japanese littleneck", "Japanese pilchard", "Jumbo flying squid", "Kawakawa", "Korean bullhead", "Largehead hairtail", "Longtail tuna", "Madeiran sardinella", "Mandarin fish", "Milkfish", "Mrigal carp", "Narrow-barred Spanish mackerel", "Nile perch", "Nile tilapia", "North Pacific hake", "Northern snakehead", "Pacific anchoveta", "Pacific cod", "Pacific herring", "Pacific sand lance", "Pacific sandlance", "Pacific saury", "Pacific thread herring", "Peruvian anchoveta", "Pink salmon", "Pollock", "Pond loach", "Rainbow trout", "Rohu", "Round sardinella", "Short mackerel", "Silver carp", "Silver cyprinid", "Skipjack tuna", "Southern African anchovy", "Southern rough shrimp", "Whiteleg shrimp", "Wuchang bream", "Yellow croaker", "Yellowfin tuna", "Yellowhead catfish", "Yellowstripe scad"], Jr = ["Abaco Barb", "Abtenauer", "Abyssinian", "Aegidienberger", "Akhal-Teke", "Albanian Horse", "Altai Horse", "Altèr Real", "American Albino", "American Cream Draft", "American Indian Horse", "American Paint Horse", "American Quarter Horse", "American Saddlebred", "American Warmblood", "Andalusian Horse", "Andravida Horse", "Anglo-Arabian", "Anglo-Arabo-Sardo", "Anglo-Kabarda", "Appaloosa", "AraAppaloosa", "Arabian Horse", "Ardennes Horse", "Arenberg-Nordkirchen", "Argentine Criollo", "Asian wild Horse", "Assateague Horse", "Asturcón", "Augeron", "Australian Brumby", "Australian Draught Horse", "Australian Stock Horse", "Austrian Warmblood", "Auvergne Horse", "Auxois", "Azerbaijan Horse", "Azteca Horse", "Baise Horse", "Bale", "Balearic Horse", "Balikun Horse", "Baluchi Horse", "Banker Horse", "Barb Horse", "Bardigiano", "Bashkir Curly", "Basque Mountain Horse", "Bavarian Warmblood", "Belgian Half-blood", "Belgian Horse", "Belgian Warmblood ", "Bhutia Horse", "Black Forest Horse", "Blazer Horse", "Boerperd", "Borana", "Boulonnais Horse", "Brabant", "Brandenburger", "Brazilian Sport Horse", "Breton Horse", "Brumby", "Budyonny Horse", "Burguete Horse", "Burmese Horse", "Byelorussian Harness Horse", "Calabrese Horse", "Camargue Horse", "Camarillo White Horse", "Campeiro", "Campolina", "Canadian Horse", "Canadian Pacer", "Carolina Marsh Tacky", "Carthusian Horse", "Caspian Horse", "Castilian Horse", "Castillonnais", "Catria Horse", "Cavallo Romano della Maremma Laziale", "Cerbat Mustang", "Chickasaw Horse", "Chilean Corralero", "Choctaw Horse", "Cleveland Bay", "Clydesdale Horse", "Cob", "Coldblood Trotter", "Colonial Spanish Horse", "Colorado Ranger", "Comtois Horse", "Corsican Horse", "Costa Rican Saddle Horse", "Cretan Horse", "Criollo Horse", "Croatian Coldblood", "Cuban Criollo", "Cumberland Island Horse", "Curly Horse", "Czech Warmblood", "Daliboz", "Danish Warmblood", "Danube Delta Horse", "Dole Gudbrandsdal", "Don", "Dongola Horse", "Draft Trotter", "Dutch Harness Horse", "Dutch Heavy Draft", "Dutch Warmblood", "Dzungarian Horse", "East Bulgarian", "East Friesian Horse", "Estonian Draft", "Estonian Horse", "Falabella", "Faroese", "Finnhorse", "Fjord Horse", "Fleuve", "Florida Cracker Horse", "Foutanké", "Frederiksborg Horse", "Freiberger", "French Trotter", "Friesian Cross", "Friesian Horse", "Friesian Sporthorse", "Furioso-North Star", "Galiceño", "Galician Pony", "Gelderland Horse", "Georgian Grande Horse", "German Warmblood", "Giara Horse", "Gidran", "Groningen Horse", "Gypsy Horse", "Hackney Horse", "Haflinger", "Hanoverian Horse", "Heck Horse", "Heihe Horse", "Henson Horse", "Hequ Horse", "Hirzai", "Hispano-Bretón", "Holsteiner Horse", "Horro", "Hungarian Warmblood", "Icelandic Horse", "Iomud", "Irish Draught", "Irish Sport Horse sometimes called Irish Hunter", "Italian Heavy Draft", "Italian Trotter", "Jaca Navarra", "Jeju Horse", "Jutland Horse", "Kabarda Horse", "Kafa", "Kaimanawa Horses", "Kalmyk Horse", "Karabair", "Karabakh Horse", "Karachai Horse", "Karossier", "Kathiawari", "Kazakh Horse", "Kentucky Mountain Saddle Horse", "Kiger Mustang", "Kinsky Horse", "Kisber Felver", "Kiso Horse", "Kladruber", "Knabstrupper", "Konik", "Kundudo", "Kustanair", "Kyrgyz Horse", "Latvian Horse", "Lipizzan", "Lithuanian Heavy Draught", "Lokai", "Losino Horse", "Lusitano", "Lyngshest", "M'Bayar", "M'Par", "Mallorquín", "Malopolski", "Mangalarga", "Mangalarga Marchador", "Maremmano", "Marismeño Horse", "Marsh Tacky", "Marwari Horse", "Mecklenburger", "Menorquín", "Messara Horse", "Metis Trotter", "Mezőhegyesi Sport Horse", "Međimurje Horse", "Miniature Horse", "Misaki Horse", "Missouri Fox Trotter", "Monchina", "Mongolian Horse", "Mongolian Wild Horse", "Monterufolino", "Morab", "Morgan Horse", "Mountain Pleasure Horse", "Moyle Horse", "Murakoz Horse", "Murgese", "Mustang Horse", "Mérens Horse", "Namib Desert Horse", "Nangchen Horse", "National Show Horse", "Nez Perce Horse", "Nivernais Horse", "Nokota Horse", "Noma", "Nonius Horse", "Nooitgedachter", "Nordlandshest", "Noriker Horse", "Norman Cob", "North American Single-Footer Horse", "North Swedish Horse", "Norwegian Coldblood Trotter", "Norwegian Fjord", "Novokirghiz", "Oberlander Horse", "Ogaden", "Oldenburg Horse", "Orlov trotter", "Ostfriesen", "Paint", "Pampa Horse", "Paso Fino", "Pentro Horse", "Percheron", "Persano Horse", "Peruvian Paso", "Pintabian", "Pleven Horse", "Poitevin Horse", "Posavac Horse", "Pottok", "Pryor Mountain Mustang", "Przewalski's Horse", "Pura Raza Española", "Purosangue Orientale", "Qatgani", "Quarab", "Quarter Horse", "Racking Horse", "Retuerta Horse", "Rhenish German Coldblood", "Rhinelander Horse", "Riwoche Horse", "Rocky Mountain Horse", "Romanian Sporthorse", "Rottaler", "Russian Don", "Russian Heavy Draft", "Russian Trotter", "Saddlebred", "Salerno Horse", "Samolaco Horse", "San Fratello Horse", "Sarcidano Horse", "Sardinian Anglo-Arab", "Schleswig Coldblood", "Schwarzwälder Kaltblut", "Selale", "Sella Italiano", "Selle Français", "Shagya Arabian", "Shan Horse", "Shire Horse", "Siciliano Indigeno", "Silesian Horse", "Sokolsky Horse", "Sorraia", "South German Coldblood", "Soviet Heavy Draft", "Spanish Anglo-Arab", "Spanish Barb", "Spanish Jennet Horse", "Spanish Mustang", "Spanish Tarpan", "Spanish-Norman Horse", "Spiti Horse", "Spotted Saddle Horse", "Standardbred Horse", "Suffolk Punch", "Swedish Ardennes", "Swedish Warmblood", "Swedish coldblood trotter", "Swiss Warmblood", "Taishū Horse", "Takhi", "Tawleed", "Tchernomor", "Tennessee Walking Horse", "Tersk Horse", "Thoroughbred", "Tiger Horse", "Tinker Horse", "Tolfetano", "Tori Horse", "Trait Du Nord", "Trakehner", "Tsushima", "Tuigpaard", "Ukrainian Riding Horse", "Unmol Horse", "Uzunyayla", "Ventasso Horse", "Virginia Highlander", "Vlaamperd", "Vladimir Heavy Draft", "Vyatka", "Waler", "Waler Horse", "Walkaloosa", "Warlander", "Warmblood", "Welsh Cob", "Westphalian Horse", "Wielkopolski", "Württemberger", "Xilingol Horse", "Yakutian Horse", "Yili Horse", "Yonaguni Horse", "Zaniskari", "Zhemaichu", "Zweibrücker", "Žemaitukas"], zr = ["Acacia-ants", "Acorn-plum gall", "Aerial yellowjacket", "Africanized honey bee", "Allegheny mound ant", "Almond stone wasp", "Ant", "Arboreal ant", "Argentine ant", "Asian paper wasp", "Baldfaced hornet", "Bee", "Bigheaded ant", "Black and yellow mud dauber", "Black carpenter ant", "Black imported fire ant", "Blue horntail woodwasp", "Blue orchard bee", "Braconid wasp", "Bumble bee", "Carpenter ant", "Carpenter wasp", "Chalcid wasp", "Cicada killer", "Citrus blackfly parasitoid", "Common paper wasp", "Crazy ant", "Cuckoo wasp", "Cynipid gall wasp", "Eastern Carpenter bee", "Eastern yellowjacket", "Elm sawfly", "Encyrtid wasp", "Erythrina gall wasp", "Eulophid wasp", "European hornet", "European imported fire ant", "False honey ant", "Fire ant", "Forest bachac", "Forest yellowjacket", "German yellowjacket", "Ghost ant", "Giant ichneumon wasp", "Giant resin bee", "Giant wood wasp", "Golden northern bumble bee", "Golden paper wasp", "Gouty oak gall", "Grass Carrying Wasp", "Great black wasp", "Great golden digger wasp", "Hackberry nipple gall parasitoid", "Honey bee", "Horned oak gall", "Horse guard wasp", "Hunting wasp", "Ichneumonid wasp", "Keyhole wasp", "Knopper gall", "Large garden bumble bee", "Large oak-apple gall", "Leafcutting bee", "Little fire ant", "Little yellow ant", "Long-horned bees", "Long-legged ant", "Macao paper wasp", "Mallow bee", "Marble gall", "Mossyrose gall wasp", "Mud-daubers", "Multiflora rose seed chalcid", "Oak apple gall wasp", "Oak rough bulletgall wasp", "Oak saucer gall", "Oak shoot sawfly", "Odorous house ant", "Orange-tailed bumble bee", "Orangetailed potter wasp", "Oriental chestnut gall wasp", "Paper wasp", "Pavement ant", "Pigeon tremex", "Pip gall wasp", "Prairie yellowjacket", "Pteromalid wasp", "Pyramid ant", "Raspberry Horntail", "Red ant", "Red carpenter ant", "Red harvester ant", "Red imported fire ant", "Red wasp", "Red wood ant", "Red-tailed wasp", "Reddish carpenter ant", "Rough harvester ant", "Sawfly parasitic wasp", "Scale parasitoid", "Silky ant", "Sirex woodwasp", "Siricid woodwasp", "Smaller yellow ant", "Southeastern blueberry bee", "Southern fire ant", "Southern yellowjacket", "Sphecid wasp", "Stony gall", "Sweat bee", "Texas leafcutting ant", "Tiphiid wasp", "Torymid wasp", "Tramp ant", "Valentine ant", "Velvet ant", "Vespid wasp", "Weevil parasitoid", "Western harvester ant", "Western paper wasp", "Western thatching ant", "Western yellowjacket", "White-horned horntail", "Willow shoot sawfly", "Woodwasp", "Wool sower gall maker", "Yellow Crazy Ant", "Yellow and black potter wasp", "Yellow-horned horntail"], Vr = ["Asiatic Lion", "Barbary Lion", "Cape lion", "Masai Lion", "Northeast Congo Lion", "Transvaal lion", "West African Lion"], jr = ["Ace", "Archie", "Bailey", "Bandit", "Bella", "Bentley", "Bruno", "Buddy", "Charlie", "Coco", "Cookie", "Cooper", "Daisy", "Dixie", "Finn", "Ginger", "Gracie", "Gus", "Hank", "Jack", "Jax", "Joey", "Kobe", "Leo", "Lola", "Louie", "Lucy", "Maggie", "Max", "Mia", "Milo", "Molly", "Murphey", "Nala", "Nova", "Ollie", "Oreo", "Rosie", "Scout", "Stella", "Teddy", "Tuffy"], Yr = ["American", "American Chinchilla", "American Fuzzy Lop", "American Sable", "Argente Brun", "Belgian Hare", "Beveren", "Blanc de Hotot", "Britannia Petite", "Californian", "Champagne D’Argent", "Checkered Giant", "Cinnamon", "Crème D’Argent", "Dutch", "Dwarf Hotot", "English Angora", "English Lop", "English Spot", "Flemish Giant", "Florida White", "French Angora", "French Lop", "Giant Angora", "Giant Chinchilla", "Harlequin", "Havana", "Himalayan", "Holland Lop", "Jersey Wooly", "Lilac", "Lionhead", "Mini Lop", "Mini Rex", "Mini Satin", "Netherland Dwarf", "New Zealand", "Palomino", "Polish", "Rex", "Rhinelander", "Satin", "Satin Angora", "Silver", "Silver Fox", "Silver Marten", "Standard Chinchilla", "Tan", "Thrianta"], $r = ["Abrocoma", "Abrocoma schistacea", "Aconaemys", "Aconaemys porteri", "African brush-tailed porcupine", "Andean mountain cavy", "Argentine tuco-tuco", "Ashy chinchilla rat", "Asiatic brush-tailed porcupine", "Atherurus", "Azara's agouti", "Azara's tuco-tuco", "Bahia porcupine", "Bathyergus", "Bathyergus janetta", "Bathyergus suillus", "Bennett's chinchilla rat", "Bicolored-spined porcupine", "Black agouti", "Black dwarf porcupine", "Black-rumped agouti", "Black-tailed hairy dwarf porcupine", "Bolivian chinchilla rat", "Bolivian tuco-tuco", "Bonetto's tuco-tuco", "Brandt's yellow-toothed cavy", "Brazilian guinea pig", "Brazilian porcupine", "Brazilian tuco-tuco", "Bridge's degu", "Brown hairy dwarf porcupine", "Budin's chinchilla rat, A. budini", "Cape porcupine", "Catamarca tuco-tuco", "Cavia", "Central American agouti", "Chacoan tuco-tuco", "Chilean rock rat", "Chinchilla", "Coendou", "Coiban agouti", "Colburn's tuco-tuco", "Collared tuco-tuco", "Common degu", "Common yellow-toothed cavy", "Conover's tuco-tuco", "Coruro", "Crested agouti", "Crested porcupine", "Cryptomys", "Cryptomys bocagei", "Cryptomys damarensis", "Cryptomys foxi", "Cryptomys hottentotus", "Cryptomys mechowi", "Cryptomys ochraceocinereus", "Cryptomys zechi", "Ctenomys", "Cuniculus", "Cuscomys", "Cuscomys ashanika", "Dactylomys", "Dactylomys boliviensis", "Dactylomys dactylinus", "Dactylomys peruanus", "Dasyprocta", "Domestic guinea pig", "Emily's tuco-tuco", "Erethizon", "Famatina chinchilla rat", "Frosted hairy dwarf porcupine", "Fukomys", "Fukomys amatus", "Fukomys anselli", "Fukomys bocagei", "Fukomys damarensis", "Fukomys darlingi", "Fukomys foxi", "Fukomys ilariae", "Fukomys kafuensis", "Fukomys mechowii", "Fukomys micklemi", "Fukomys occlusus", "Fukomys ochraceocinereus", "Fukomys whytei", "Fukomys zechi", "Furtive tuco-tuco", "Galea", "Georychus", "Georychus capensis", "Golden viscacha-rat", "Goya tuco-tuco", "Greater guinea pig", "Green acouchi", "Haig's tuco-tuco", "Heliophobius", "Heliophobius argenteocinereus", "Heterocephalus", "Heterocephalus glaber", "Highland tuco-tuco", "Hystrix", "Indian porcupine", "Isla Mocha degu", "Kalinowski agouti", "Kannabateomys", "Kannabateomys amblyonyx", "Lagidium", "Lagostomus", "Lewis' tuco-tuco", "Long-tailed chinchilla", "Long-tailed porcupine", "Los Chalchaleros' viscacha-rat", "Lowland paca", "Magellanic tuco-tuco", "Malayan porcupine", "Maule tuco-tuco", "Mendoza tuco-tuco", "Mexican agouti", "Mexican hairy dwarf porcupine", "Microcavia", "Montane guinea pig", "Moon-toothed degu", "Mottled tuco-tuco", "Mountain degu", "Mountain paca", "Mountain viscacha-rat", "Myoprocta", "Natterer's tuco-tuco", "North American porcupine", "Northern viscacha", "Octodon", "Octodontomys", "Octomys", "Olallamys", "Olallamys albicauda", "Olallamys edax", "Orinoco agouti", "Paraguaian hairy dwarf porcupine", "Pearson's tuco-tuco", "Peruvian tuco-tuco", "Philippine porcupine", "Pipanacoctomys", "Plains viscacha", "Plains viscacha-rat", "Porteous' tuco-tuco", "Punta de Vacas chinchilla rat", "Red acouchi", "Red-rumped agouti", "Reddish tuco-tuco", "Rio Negro tuco-tuco", "Robust tuco-tuco", "Roosmalen's dwarf porcupine", "Rothschild's porcupine", "Ruatan Island agouti", "Sage's rock rat", "Salinoctomys", "Salta tuco-tuco", "San Luis tuco-tuco", "Santa Catarina's guinea pig", "Shiny guinea pig", "Shipton's mountain cavy", "Short-tailed chinchilla", "Silky tuco-tuco", "Social tuco-tuco", "Southern mountain cavy", "Southern tuco-tuco", "Southern viscacha", "Spalacopus", "Spix's yellow-toothed cavy", "Steinbach's tuco-tuco", "Streaked dwarf porcupine", "Strong tuco-tuco", "Stump-tailed porcupine", "Sumatran porcupine", "Sunda porcupine", "Talas tuco-tuco", "Tawny tuco-tuco", "Thick-spined porcupine", "Tiny tuco-tuco", "Trichys", "Tucuman tuco-tuco", "Tympanoctomys", "Uspallata chinchilla rat", "White-toothed tuco-tuco", "Wolffsohn's viscacha"], Ur = ["Abaco Island boa", "Aesculapian snake", "African beaked snake", "African puff adder", "African rock python", "African twig snake", "African wolf snake", "Amazon tree boa", "Amazonian palm viper", "American Vine Snake", "American copperhead", "Amethystine python", "Anaconda", "Andaman cat snake", "Andaman cobra", "Angolan python", "Annulated sea snake", "Arabian cobra", "Arafura file snake", "Arizona black rattlesnake", "Arizona coral snake", "Aruba rattlesnake", "Asian Vine Snake, Whip Snake", "Asian cobra", "Asian keelback", "Asian pipe snake", "Asp", "Asp viper", "Assam keelback", "Australian copperhead", "Australian scrub python", "Baird's rat snake", "Baja California lyresnake", "Ball Python", "Ball python", "Bamboo pitviper", "Bamboo viper", "Banded Flying Snake", "Banded cat-eyed snake", "Banded krait", "Banded pitviper", "Banded water cobra", "Barbour's pit viper", "Barred wolf snake", "Beaked sea snake", "Beauty rat snake", "Beddome's cat snake", "Beddome's coral snake", "Bimini racer", "Bird snake", "Bismarck ringed python", "Black headed python", "Black krait", "Black mamba", "Black rat snake", "Black snake", "Black tree cobra", "Black-banded trinket snake", "Black-headed snake", "Black-necked cobra", "Black-necked spitting cobra", "Black-speckled palm-pitviper", "Black-striped keelback", "Black-tailed horned pit viper", "Blanding's tree snake", "Blind snake", "Blonde hognose snake", "Blood python", "Blue krait", "Blunt-headed tree snake", "Bluntnose viper", "Boa", "Boa constrictor", "Bocourt's water snake", "Boelen python", "Boiga", "Bolivian anaconda", "Boomslang", "Bornean pitviper", "Borneo short-tailed python", "Brahminy blind snake", "Brazilian coral snake", "Brazilian mud Viper", "Brazilian smooth snake", "Bredl's python", "Brongersma's pitviper", "Brown snake", "Brown spotted pitviper[4]", "Brown tree snake", "Brown water python", "Brown white-lipped python", "Buff striped keelback", "Bull snake", "Burmese keelback", "Burmese krait", "Burmese python", "Burrowing cobra", "Burrowing viper", "Bush viper", "Bushmaster", "Buttermilk racer", "Calabar python", "California kingsnake", "Canebrake", "Cantil", "Cantor's pitviper", "Cape cobra", "Cape coral snake", "Cape gopher snake", "Carpet viper", "Cascabel", "Caspian cobra", "Cat snake", "Cat-eyed night snake", "Cat-eyed snake", "Central American lyre snake", "Central ranges taipan", "Centralian carpet python", "Ceylon krait", "Chappell Island tiger snake", "Checkered garter snake", "Checkered keelback", "Chicken snake", "Chihuahuan ridge-nosed rattlesnake", "Children's python", "Chinese tree viper", "Coachwhip snake", "Coastal carpet python", "Coastal taipan", "Cobra", "Collett's snake", "Colorado desert sidewinder", "Common adder", "Common cobra", "Common garter snake", "Common ground snake", "Common keelback", "Common lancehead", "Common tiger snake", "Common worm snake", "Congo snake", "Congo water cobra", "Copperhead", "Coral snake", "Corn snake", "Coronado Island rattlesnake", "Cottonmouth", "Crossed viper", "Crowned snake", "Cuban boa", "Cuban wood snake", "Cyclades blunt-nosed viper", "Dauan Island water python", "De Schauensee's anaconda", "Death Adder", "Desert death adder", "Desert kingsnake", "Desert woma python", "Diamond python", "Dog-toothed cat snake", "Down's tiger snake", "Dubois's sea snake", "Dumeril's boa", "Durango rock rattlesnake", "Dusky pigmy rattlesnake", "Dusty hognose snake", "Dwarf beaked snake", "Dwarf boa", "Dwarf pipe snake", "Dwarf sand adder", "Eastern brown snake", "Eastern coral snake", "Eastern diamondback rattlesnake", "Eastern green mamba", "Eastern hognose snake", "Eastern lyre snake", "Eastern mud snake", "Eastern racer", "Eastern tiger snake", "Eastern water cobra", "Eastern yellowbelly sad racer", "Egg-eater", "Egyptian asp", "Egyptian cobra", "Elegant pitviper", "Emerald tree boa", "Equatorial spitting cobra", "European asp", "European smooth snake", "Eyelash palm-pitviper", "Eyelash pit viper", "Eyelash viper", "False cobra", "False horned viper", "False water cobra", "Fan-Si-Pan horned pitviper", "Fea's viper", "Fer-de-lance", "Fierce snake", "Fifty pacer", "Fishing snake", "Flat-nosed pitviper", "Flinders python", "Flying snake", "Forest cobra", "Forest flame snake", "Forsten's cat snake", "Fox snake, three species of Pantherophis", "Gaboon viper", "Garter snake", "Giant Malagasy hognose snake", "Godman's pit viper", "Gold tree cobra", "Gold-ringed cat snake", "Golden tree snake", "Grand Canyon rattlesnake", "Grass snake", "Gray cat snake", "Great Basin rattlesnake", "Great Lakes bush viper", "Great Plains rat snake", "Green anaconda", "Green cat-eyed snake", "Green mamba", "Green palm viper", "Green rat snake", "Green snake", "Green tree pit viper", "Green tree python", "Grey Lora", "Grey-banded kingsnake", "Ground snake", "Guatemalan palm viper", "Guatemalan tree viper", "Habu", "Habu pit viper", "Hagen's pitviper", "Hairy bush viper", "Halmahera python", "Hardwicke's sea snake", "Harlequin coral snake", "High Woods coral snake", "Hill keelback", "Himalayan keelback", "Hogg Island boa", "Hognose snake", "Hognosed viper", "Honduran palm viper", "Hook Nosed Sea Snake", "Hopi rattlesnake", "Horned adder", "Horned desert viper", "Horned viper", "Horseshoe pitviper", "Hundred pacer", "Hutton's tree viper", "Ikaheka snake", "Indian cobra", "Indian flying snake", "Indian krait", "Indian python", "Indian tree viper", "Indigo snake", "Indochinese spitting cobra", "Indonesian water python", "Inland carpet python", "Inland taipan", "Jamaican Tree Snake", "Jamaican boa", "Jan's hognose snake", "Japanese forest rat snake", "Japanese rat snake", "Japanese striped snake", "Javan spitting cobra", "Jerdon's pitviper", "Jumping viper", "Jungle carpet python", "Kanburian pit viper", "Kaulback's lance-headed pitviper", "Kayaudi dwarf reticulated python", "Kaznakov's viper", "Keelback", "Kham Plateau pitviper", "Khasi Hills keelback", "King Island tiger snake", "King brown", "King cobra", "King rat snake", "King snake", "Krait", "Krefft's tiger snake", "Lance-headed rattlesnake", "Lancehead", "Large shield snake", "Large-eyed pitviper", "Large-scaled tree viper", "Leaf viper", "Leaf-nosed viper", "Lesser black krait", "Levant viper", "Long-nosed adder", "Long-nosed tree snake", "Long-nosed viper", "Long-nosed whip snake", "Long-tailed rattlesnake", "Longnosed worm snake", "Lora", "Lyre snake", "Machete savane", "Macklot's python", "Madagascar ground boa", "Madagascar tree boa", "Malabar rock pitviper", "Malayan krait", "Malayan long-glanded coral snake", "Malayan pit viper", "Malcolm's tree viper", "Mamba", "Mamushi", "Manchurian Black Water Snake", "Mandalay cobra", "Mandarin rat snake", "Mangrove pit viper", "Mangrove snake", "Mangshan pitviper", "Many-banded krait", "Many-banded tree snake", "Many-horned adder", "Many-spotted cat snake", "Massasauga rattlesnake", "McMahon's viper", "Mexican black kingsnake", "Mexican green rattlesnake", "Mexican hognose snake", "Mexican palm-pitviper", "Mexican parrot snake", "Mexican racer", "Mexican vine snake", "Mexican west coast rattlesnake", "Midget faded rattlesnake", "Milk snake", "Moccasin snake", "Modest keelback", "Mojave desert sidewinder", "Mojave rattlesnake", "Mole viper", "Mollucan python", "Moluccan flying snake", "Montpellier snake", "Motuo bamboo pitviper", "Mountain adder", "Mozambique spitting cobra", "Mud adder", "Mud snake", "Mussurana", "Namaqua dwarf adder", "Namib dwarf sand adder", "Narrowhead Garter Snake", "New Guinea carpet python", "Nichell snake", "Nicobar Island keelback", "Nicobar bamboo pitviper", "Night snake", "Nightingale adder", "Nilgiri keelback", "Nitsche's bush viper", "Nitsche's tree viper", "North Philippine cobra", "North eastern king snake", "Northeastern hill krait", "Northern black-tailed rattlesnake", "Northern tree snake", "Northern water snake", "Northern white-lipped python", "Northwestern carpet python", "Nose-horned viper", "Nubian spitting cobra", "Oaxacan small-headed rattlesnake", "Oenpelli python", "Olive python", "Olive sea snake", "Orange-collared keelback", "Ornate flying snake", "Palestine viper", "Pallas' viper", "Palm viper", "Papuan python", "Paradise flying snake", "Parrot snake", "Patchnose snake", "Paupan taipan", "Pelagic sea snake", "Peninsula tiger snake", "Peringuey's adder", "Perrotet's shieldtail snake", "Persian rat snake", "Philippine cobra", "Philippine pitviper", "Pine snake", "Pipe snake", "Pit viper", "Pointed-scaled pit viper[5]", "Pope's tree viper", "Portuguese viper", "Prairie kingsnake", "Puerto Rican boa", "Puff adder", "Pygmy python", "Python", "Queen snake", "Racer", "Raddysnake", "Rainbow boa", "Rat snake", "Rattler", "Rattlesnake", "Red blood python", "Red diamond rattlesnake", "Red spitting cobra", "Red-backed rat snake", "Red-bellied black snake", "Red-headed krait", "Red-necked keelback", "Red-tailed bamboo pitviper", "Red-tailed boa", "Red-tailed pipe snake", "Reticulated python", "Rhinoceros viper", "Rhombic night adder", "Ribbon snake", "Rinkhals", "Rinkhals cobra", "River jack", "Rosy boa", "Rough green snake", "Rough-scaled bush viper", "Rough-scaled python", "Rough-scaled tree viper", "Royal python", "Rubber boa", "Rufous beaked snake", "Rungwe tree viper", "San Francisco garter snake", "Sand adder", "Sand boa", "Savu python", "Saw-scaled viper", "Scarlet kingsnake", "Schlegel's viper", "Schultze's pitviper", "Sea snake", "Sedge viper", "Selayer reticulated python", "Sharp-nosed viper", "Shield-nosed cobra", "Shield-tailed snake", "Siamese palm viper", "Side-striped palm-pitviper", "Sidewinder", "Sikkim keelback", "Sinai desert cobra", "Sind krait", "Small-eyed snake", "Smooth green snake", "Smooth snake", "Snorkel viper", "Snouted cobra", "Sonoran sidewinder", "South American hognose snake", "South eastern corn snake", "Southern Indonesian spitting cobra", "Southern Pacific rattlesnake", "Southern Philippine cobra", "Southern black racer", "Southern white-lipped python", "Southwestern black spitting cobra", "Southwestern blackhead snake", "Southwestern carpet python", "Southwestern speckled rattlesnake", "Speckle-bellied keelback", "Speckled kingsnake", "Spectacled cobra", "Spiny bush viper", "Spitting cobra", "Spotted python", "Sri Lankan pit viper", "Stejneger's bamboo pitviper", "Stiletto snake", "Stimson's python", "Stoke's sea snake", "Storm water cobra", "Striped snake", "Sumatran short-tailed python", "Sumatran tree viper", "Sunbeam snake", "Taipan", "Taiwan cobra", "Tan racer", "Tancitaran dusky rattlesnake", "Tanimbar python", "Tasmanian tiger snake", "Tawny cat snake", "Temple pit viper", "Temple viper", "Tentacled snake", "Texas Coral Snake", "Texas blind snake", "Texas garter snake", "Texas lyre snake", "Texas night snake", "Thai cobra", "Three-lined ground snake", "Tibetan bamboo pitviper", "Tic polonga", "Tiger pit viper", "Tiger rattlesnake", "Tiger snake", "Tigre snake", "Timber rattlesnake", "Timor python", "Titanboa", "Tree boa", "Tree snake", "Tree viper", "Trinket snake", "Tropical rattlesnake", "Twig snake", "Twin Headed King Snake", "Twin-Barred tree snake", "Twin-spotted rat snake", "Twin-spotted rattlesnake", "Undulated pit viper", "Uracoan rattlesnake", "Ursini's viper", "Urutu", "Vine snake", "Viper", "Viper Adder", "Vipera ammodytes", "Wagler's pit viper", "Wart snake", "Water adder", "Water moccasin", "Water snake", "West Indian racer", "Western blind snake", "Western carpet python", "Western coral snake", "Western diamondback rattlesnake", "Western green mamba", "Western ground snake", "Western hog-nosed viper", "Western mud snake", "Western tiger snake", "Western woma python", "Wetar Island python", "Whip snake", "White-lipped keelback", "White-lipped python", "White-lipped tree viper", "Wirot's pit viper", "Wolf snake", "Woma python", "Worm snake", "Wutu", "Wynaad keelback", "Yarara", "Yellow anaconda", "Yellow-banded sea snake", "Yellow-bellied sea snake", "Yellow-lined palm viper", "Yellow-lipped sea snake", "Yellow-striped rat snake", "Yunnan keelback", "Zebra snake", "Zebra spitting cobra"], _r = ["bat", "bear", "bee", "bird", "butterfly", "cat", "cow", "crocodile", "deer", "dog", "dolphin", "eagle", "elephant", "fish", "flamingo", "fox", "frog", "gecko", "giraffe", "gorilla", "hamster", "hippopotamus", "horse", "kangaroo", "koala", "lion", "monkey", "ostrich", "panda", "parrot", "peacock", "penguin", "polar bear", "rabbit", "rhinoceros", "sea lion", "shark", "snake", "squirrel", "tiger", "turtle", "whale", "wolf", "zebra"], qr = { bear: Hr, bird: Gr, cat: Nr, cetacean: Wr, cow: xr, crocodilia: Ir, dog: Kr, fish: Or, horse: Jr, insect: zr, lion: Vr, pet_name: jr, rabbit: Yr, rodent: $r, snake: Ur, type: _r }, Zr = qr, Xr = ["{{person.name}}", "{{company.name}}"], Qr = ["Redhold", "Treeflex", "Trippledex", "Kanlam", "Bigtax", "Daltfresh", "Toughjoyfax", "Mat Lam Tam", "Otcom", "Tres-Zap", "Y-Solowarm", "Tresom", "Voltsillam", "Biodex", "Greenlam", "Viva", "Matsoft", "Temp", "Zoolab", "Subin", "Rank", "Job", "Stringtough", "Tin", "It", "Home Ing", "Zamit", "Sonsing", "Konklab", "Alpha", "Latlux", "Voyatouch", "Alphazap", "Holdlamis", "Zaam-Dox", "Sub-Ex", "Quo Lux", "Bamity", "Ventosanzap", "Lotstring", "Hatity", "Tempsoft", "Overhold", "Fixflex", "Konklux", "Zontrax", "Tampflex", "Span", "Namfix", "Transcof", "Stim", "Fix San", "Sonair", "Stronghold", "Fintone", "Y-find", "Opela", "Lotlux", "Ronstring", "Zathin", "Duobam", "Keylex"], en = ["0.#.#", "0.##", "#.##", "#.#", "#.#.#"], an = { author: Xr, name: Qr, version: en }, rn = an, nn = ["A.A. Milne", "Agatha Christie", "Alan Moore and Dave Gibbons", "Albert Camus", "Aldous Huxley", "Alexander Pope", "Alexandre Dumas", "Alice Walker", "Andrew Lang", "Anne Frank", "Anthony Burgess", "Anthony Trollope", "Antoine de Saint-Exupéry", "Anton Chekhov", "Anton Pavlovich Chekhov", "Arthur Conan Doyle", "Arthur Schopenhauer", "Aylmer Maude", "Ayn Rand", "Beatrix Potter", "Benjamin Disraeli", "Benjamin Jowett", "Bernard Shaw", "Bertrand Russell", "Bhagavanlal Indrajit", "Boris Pasternak", "Bram Stoker", "Brian Evenson", "C.E. Brock", "C.S. Lewis", "Carson McCallers", "Charles Dickens", "Charles E. Derbyshire", "Charlotte Brontë", "Charlotte Perkins Gilman", "Chinua Achebe", "Clifford R. Adams", "Constance Garnett", "Cormac McCarthy", "D.H. Lawrence", "Dan Brown", "Daniel Defoe", "Dante Alighieri", "Dashiell Hammett", "David Widger", "David Wyllie", "Dean Koontz", "Don DeLillo", "E.M. Forster", "Edgar Allan Poe", "Edgar Rice Burroughs", "Elizabeth Cleghorn Gaskell", "Elizabeth Von Arnim", "Emily Brontë", "Erich Remarque", "Ernest Hemingway", "Evelyn Waugh", "F. Scott Fitzgerald", "Ford Madox Ford", "Frances Hodgson Burnett", "Frank Herbert", "Frank T. Merrill", "Franz Kafka", "Friedrich Wilhelm Nietzsche", "Fyodor Dostoyevsky", "G.K. Chesterton", "Gabriel Garcia Marquez", "Geoffrey Chaucer", "George Eliot", "George Grossmith", "George Orwell", "George R. R. Martin", "George Saunders", "Grady Ward", "Graham Greene", "Gustave Doré", "Gustave Flaubert", "Guy de Maupassant", "Günter Grass", "H.G. Wells", "H.P. Lovecraft", "Harper Lee", "Harriet Beecher Stowe", "Haruki Murakami", "Henrik Ibsen", "Henry David Thoreau", "Henry Fielding", "Henry James", "Henry Miller", "Henry Morley", "Herman Melville", "Hermann Broch", "Homer", "Honoré de Balzac", "Ian McEwan", "Isabel Florence Hapgood", "Italo Calvino", "J.D. Salinger", "J.K. Rowling", "J.M. Barrie", "J.R.R. Tolkien", "Jack Kerouac", "Jack London", "Jacob Grimm", "Jacqueline Crooks", "James Baldwin", "James Dickey", "James Ellroy", "James Joyce", "James Patterson", "Jane Austen", "Johann Wolfgang von Goethe", "John Bunyan", "John Camden Hotten", "John Dos Passos", "John Green", "John Grisham", "John Kennedy Toole", "John Milton", "John Ormsby", "John Steinbeck", "John Updike", "Jonathan Franzen", "Jonathan Swift", "Joseph Conrad", "Joseph Heller", "José Rizal", "Judy Blume", "Jules Verne", "Junot Diaz", "Karl Marx", "Kazuo Ishiguro", "Ken Follett", "Ken Kesey", "Kenneth Grahame", "Khaled Hosseini", "Kingsley Amis", "Kurt Vonnegut", "L. Frank Baum", "L.M. Montgomery", "Laurence Sterne", "Leo Tolstoy", "Lewis Carroll", "Louisa May Alcott", "Louise Maude", "Malcolm Lowry", "Marcel Proust", "Margaret Atwood", "Margaret Mitchell", "Marilynne Robinson", "Mark Twain", "Martin Amis", "Mary Shelley", "Michael Chabon", "Miguel de Cervantes", "Mikhail Bulgakov", "Muriel Spark", "Nancy Mitford", "Nathanael West", "Nathaniel Hawthorne", "Neil Gaiman", "Niccolo Machiavelli", "Norman Mailer", "Oscar Levy", "Oscar Wilde", "P.G. Wodehouse", "Paulo Coelho", "Peter Carey", "Philip Pullman", "Philip Roth", "Plato", "R.L. Stine", "Rachel Kushner", "Ralph Ellison", "Ray Bradbury", "Raymond Chandler", "Richard Wagner", "Richard Wright", "Richard Yates", "Roald Dahl", "Robert Graves", "Robert Louis Stevenson", "Robert Penn Warren", "Rudyard Kipling", "Salman Rushdie", "Samuel Beckett", "Samuel Butler", "Samuel Richardson", "Saul Bellow", "Shivaram Parashuram Bhide", "Sir Arthur Conan Doyle", "Sir Richard Francis Burton", "Stendhal", "Stephen Hawking", "Stephen King", "Sun Tzu", "Suzanne Collins", "T. Smollett", "T.S. Eliot", "Theodore Alois Buckley", "Theodore Dreiser", "Thomas Hardy", "Thomas Love Peacock", "Thomas Mann", "Toni Morrison", "Truman Capote", "V.S. Naipaul", "Vance Packard", "Vatsyayana", "Victor Hugo", "Virgil", "Virginia Woolf", "Vladimir Nabokov", "Voltaire", "W.G. Sebald", "W.K. Marriott", "Walker Percy", "Walt Whitman", "Walter Scott", "Wilhelm Grimm", "Wilkie Collins", "William Faulkner", "William Gibson", "William Golding", "William Makepeace Thackeray", "William Shakespeare", "Zadie Smith"], un = ["Audiobook", "Ebook", "Hardcover", "Paperback"], tn = ["Adventure", "Biography", "Business", "Children's Literature", "Classic", "Comedy", "Comic", "Detective", "Drama", "Fantasy", "Graphic Novel", "Historical Fiction", "Horror", "Memoir", "Mystery", "Mythology", "Philosophy", "Poetry", "Psychology", "Religion", "Romance", "Science Fiction", "Thriller", "Western", "Young Adult"], on = ["Academic Press", "Ace Books", "Addison-Wesley", "Adis International", "Airiti Press", "Allen Ltd", "Andrews McMeel Publishing", "Anova Books", "Anvil Press Poetry", "Applewood Books", "Apress", "Athabasca University Press", "Atheneum Books", "Atheneum Publishers", "Atlantic Books", "Atlas Press", "BBC Books", "Ballantine Books", "Banner of Truth Trust", "Bantam Books", "Bantam Spectra", "Barrie & Jenkins", "Basic Books", "Belknap Press", "Bella Books", "Bellevue Literary Press", "Berg Publishers", "Berkley Books", "Bison Books", "Black Dog Publishing", "Black Library", "Black Sparrow Books", "Blackie and Son Limited", "Blackstaff Press", "Blackwell Publishing", "Bloodaxe Books", "Bloomsbury Publishing Plc", "Blue Ribbon Books", "Book League of America", "Book Works", "Booktrope", "Borgo Press", "Bowes & Bowes", "Boydell & Brewer", "Breslov Research Institute", "Brill", "Brimstone Press", "Broadview Press", "Burns & Oates", "Butterworth-Heinemann", "Caister Academic Press", "Cambridge University Press", "Candlewick Press", "Canongate Books", "Carcanet Press", "Carlton Books", "Carlton Publishing Group", "Carnegie Mellon University Press", "Casemate Publishers", "Cengage Learning", "Central European University Press", "Chambers Harrap", "Charles Scribner's Sons", "Chatto and Windus", "Chick Publications", "Chronicle Books", "Churchill Livingstone", "Cisco Press", "City Lights Publishers", "Cloverdale Corporation", "D. Appleton & Company", "D. Reidel", "DAW Books", "Da Capo Press", "Daedalus Publishing", "Dalkey Archive Press", "Darakwon Press", "David & Charles", "Dedalus Books", "Del Rey Books", "E. P. Dutton", "ECW Press", "Earthscan", "Edupedia Publications", "Eel Pie Publishing", "Eerdmans Publishing", "Ellora's Cave", "Elsevier", "Emerald Group Publishing", "Etruscan Press", "FabJob", "Faber and Faber", "Fairview Press", "Farrar, Straus & Giroux", "Fearless Books", "Felony & Mayhem Press", "Firebrand Books", "Flame Tree Publishing", "Focal Press", "G-Unit Books", "G. P. Putnam's Sons", "Gaspereau Press", "Gay Men's Press", "Gefen Publishing House", "George H. Doran Company", "George Newnes", "George Routledge & Sons", "Godwit Press", "Golden Cockerel Press", "HMSO", "Hachette Book Group USA", "Hackett Publishing Company", "Hamish Hamilton", "Happy House", "Harcourt Assessment", "Harcourt Trade Publishers", "Harlequin Enterprises Ltd", "Harper & Brothers", "Harper & Row", "HarperCollins", "HarperPrism", "HarperTrophy", "Harry N. Abrams, Inc.", "Harvard University Press", "Harvest House", "Harvill Press at Random House", "Hawthorne Books", "Hay House", "Haynes Manuals", "Heyday Books", "Hodder & Stoughton", "Hodder Headline", "Hogarth Press", "Holland Park Press", "Holt McDougal", "Horizon Scientific Press", "Ian Allan Publishing", "Ignatius Press", "Imperial War Museum", "Indiana University Press", "J. M. Dent", "Jaico Publishing House", "Jarrolds Publishing", "John Blake Publishing", "Karadi Tales", "Kensington Books", "Kessinger Publishing", "Kodansha", "Kogan Page", "Koren Publishers Jerusalem", "Ladybird Books", "Leaf Books", "Leafwood Publishers", "Left Book Club", "Legend Books", "Lethe Press", "Libertas Academica", "Liberty Fund", "Library of America", "Lion Hudson", "Macmillan Publishers", "Mainstream Publishing", "Manchester University Press", "Mandrake Press", "Mandrake of Oxford", "Manning Publications", "Manor House Publishing", "Mapin Publishing", "Marion Boyars Publishers", "Mark Batty Publisher", "Marshall Cavendish", "Marshall Pickering", "Martinus Nijhoff Publishers", "Mascot Books", "Matthias Media", "McClelland and Stewart", "McFarland & Company", "McGraw Hill Financial", "McGraw-Hill Education", "Medknow Publications", "Naiad Press", "Nauka", "NavPress", "New Directions Publishing", "New English Library", "New Holland Publishers", "New Village Press", "Newnes", "No Starch Press", "Nonesuch Press", "O'Reilly Media", "Oberon Books", "Open Court Publishing Company", "Open University Press", "Orchard Books", "Orion Books", "Packt Publishing", "Palgrave Macmillan", "Pan Books", "Pantheon Books at Random House", "Papadakis Publisher", "Parachute Publishing", "Parragon", "Pathfinder Press", "Paulist Press", "Pavilion Books", "Peace Hill Press", "Pecan Grove Press", "Pen and Sword Books", "Penguin Books", "Random House", "Reed Elsevier", "Reed Publishing", "SAGE Publications", "Salt Publishing", "Sams Publishing", "Schocken Books", "Scholastic Press", "Seagull Books", "Secker & Warburg", "Shambhala Publications", "Shire Books", "Shoemaker & Hoard Publishers", "Shuter & Shooter Publishers", "Sidgwick & Jackson", "Signet Books", "Simon & Schuster", "St. Martin's Press", "T & T Clark", "Tachyon Publications", "Tammi", "Target Books", "Tarpaulin Sky Press", "Tartarus Press", "Tate Publishing & Enterprises", "Taunton Press", "Taylor & Francis", "Ten Speed Press", "UCL Press", "Unfinished Monument Press", "United States Government Publishing Office", "University of Akron Press", "University of Alaska Press", "University of California Press", "University of Chicago Press", "University of Michigan Press", "University of Minnesota Press", "University of Nebraska Press", "Velazquez Press", "Verso Books", "Victor Gollancz Ltd", "Viking Press", "Vintage Books", "Vintage Books at Random House", "Virago Press", "Virgin Publishing", "Voyager Books", "Zed Books", "Ziff Davis Media", "Zondervan"], ln = ["A Song of Ice and Fire", "Anna Karenina", "Colonel Race", "Discworld", "Dune", "Harry Potter", "Hercule Poirot", "His Dark Materials", "Jane Austen Murder Mysteries", "Little Women", "Outlander", "Percy Jackson", "Sherlock Holmes", "The Arc of a Scythe", "The Bartimaeus Trilogy", "The Border Trilogy", "The Chronicles of Narnia", "The Dark Tower", "The Dresden Files", "The Eighth Life", "The Foundation Series", "The Hitchhiker's Guide to the Galaxy", "The Hunger Games", "The Infinity Cycle", "The Inheritance Cycle", "The Lord of the Rings", "The Maze Runner", "The Prison Healer", "The Red Rising Saga", "The Southern Reach", "The Wheel of Time", "Thursday Next Series", "Twilight", "War and Peace"], sn = ["1984", "20,000 Leagues Under the Sea", "A Bend in the River", "A Brief History of Time", "A Clockwork Orange", "A Confederacy of Dunces", "A Doll's House", "A Handful of Dust", "A Modest Proposal", "A Passage to India", "A Portrait of the Artist as a Young Man", "A Room with a View", "A Study in Scarlet", "A Tale of Two Cities", "A Wrinkle in Time", "Absalom, Absalom!", "Adventures of Huckleberry Finn", "Alice's Adventures in Wonderland", "All Quiet on the Western Front", "All the King's Men", "American Pastoral", "An American Tragedy", "And Then There Were None", "Animal Farm", "Anna Karenina", "Anne of Green Gables", "Are You There God? It's Me, Margaret", "As I Lay Dying", "Atlas Shrugged", "Atonement", "Austerlitz", "Beloved", "Beyond Good and Evil", "Bible", "Bleak House", "Blood Meridian", "Brave New World", "Brideshead Revisited", "Candide", "Carmilla", "Catch-22", "Charlie and the Chocolate Factory", "Charlotte's Web", "Clarissa", "Cranford", "Crime and Punishment", "Dao De Jing: A Minimalist Translation", "David Copperfield", "Deliverance", "Don Quixote", "Dora", "Dr. Zhivago", "Dracula", "Dubliners", "Dune", "East of Eden", "Emma", "Fahrenheit 451", "Faust", "For Whom the Bell Tolls", "Frankenstein", "Freakonomics", "Go Tell It on the Mountain", "Gone with the Wind", "Great Expectations", "Grimms' Fairy Tales", "Gulliver's Travels", "Hamlet", "Harry Potter and the Sorcerer's Stone", "Heart of Darkness", "Herzog", "His Dark Materials", "Hitting the line", "Housekeeping", "I, Claudius", "If on a Winter's Night a Traveler", "In Cold Blood", "In Search of Lost Time", "Invisible Man", "It", "Jane Eyre", "Josefine Mutzenbacher", "Jude the Obscure", "L.A. Confidential", "Leaves of Grass", "Les Miserables", "Life of Pi", "Little Women", "Lolita", "Long Walk to Freedom", "Lord Jim", "Lord of the Flies", "Lucky Jim", "Madame Bovary", "Malone Dies", "Meditations", "Men Without Women", "Metamorphosis", "Middlemarch", "Midnight's Children", "Moby Dick", "Money", "Mrs. Dalloway", "My Bondage and My Freedom", "My Life", "Native Son", "Neuromancer", "Never Let Me Go", "Nightmare Abbey", "Nineteen Eighty Four", "Nostromo", "Notes from the Underground ", "Of Mice and Men", "Oliver Twist", "On the Duty of Civil Disobedience", "On the Road", "One Flew Over the Cuckoo's Nest", "One Hundred Years of Solitude", "One Thousand and One Nights", "Oscar and Lucinda", "Pale Fire", "Paradise Lost", "Peter Pan", "Portnoy's Complaint", "Pride and Prejudice", "Rabbit, Run", "Republic", "Revolutionary Road", "Robinson Crusoe", "Romeo and Juliet", "Ruth Fielding in Alaska", "Scoop", "Second Treatise of Government", "Slaughterhouse Five", "Stories of Anton Chekhov", "Sybil", "Tess of the d'Urbervilles", "The Adventures of Augie March", "The Adventures of Huckleberry Finn", "The Adventures of Sherlock Holmes", "The Adventures of Tom Sawyer", "The Aeneid", "The Alchemist", "The Ambassadors", "The Art of War", "The Big Sleep", "The Black Sheep", "The Blue Castle", "The Brief Wondrous Life of Oscar Wao", "The Brothers Karamazov", "The Call of the Wild", "The Canterbury Tales", "The Catcher in the Rye", "The Color Purple", "The Complete Works of Edgar Allen Poe", "The Corrections", "The Count of Monte Cristo", "The Day of the Locust", "The Diary of a Nobody", "The Diary of a Young Girl", "The Divine Comedy", "The Enchanted April", "The Fountainhead", "The Golden Bowl", "The Golden Notebook", "The Good Soldier", "The Grapes of Wrath", "The Great Gatsby", "The Handmaid's Tale", "The Heart is a Lonely Hunter", "The Heart of the Matter", "The Hobbit", "The Hound of the Baskervilles", "The Idiot", "The Iliad", "The King in Yellow", "The Kite Runner", "The Lion, the Witch, and the Wardrobe", "The Little Prince", "The Lord of the Rings", "The Magic Mountain", "The Maltese Falcon", "The Master and Margarita", "The Moviegoer", "The Naked and the Dead", "The Odyssey", "The Old Man and the Sea", "The Pickwick Papers", "The Picture of Dorian Gray", "The Pilgrim's Progress", "The Pillars of the Earth", "The Plague", "The Portrait of a Lady", "The Prime of Miss Jean Brodie", "The Prince", "The Problems of Philosophy", "The Prophet", "The Pursuit of Love", "The Rainbow", "The Red and the Black", "The Remains of the Day", "The Republic", "The Scarlet Letter", "The Sleepwalkers", "The Sound and the Fury", "The Stand", "The Strange Case of Dr. Jekyll and Mr. Hyde", "The Stranger", "The Sun Also Rises", "The Thirty-Nine Steps", "The Three Musketeers", "The Time Machine", "The Tin Drum", "The Trial", "The War of the Worlds", "The Waste Land", "The Way We Live Now", "The Wind in the Willows", "The Woman in White", "The Wonderful Wizard of Oz", "The Works of Edgar Allan Poe", "The Yellow Wallpaper", "Things Fall Apart", "Tinker, Tailor, Soldier, Spy", "To Kill a Mockingbird", "To the Lighthouse", "Tom Jones", "Treasure Island", "Tristram Shandy", "Tropic of Cancer", "U.S.A. Trilogy", "Ulysses", "Uncle Tom's Cabin", "Under the Volcano", "Underworld", "Vanity Fair", "Walden", "War and Peace", "Watchmen", "Winnie-the-Pooh", "Wuthering Heights"], Fn = { author: nn, format: un, genre: tn, publisher: on, series: ln, title: sn }, cn = Fn, dn = ["###-###-####", "(###) ###-####", "1-###-###-####", "###.###.####"], hn = { formats: dn }, mn = hn, pn = ["azure", "black", "blue", "cyan", "fuchsia", "gold", "green", "grey", "indigo", "ivory", "lavender", "lime", "magenta", "maroon", "mint green", "olive", "orange", "orchid", "pink", "plum", "purple", "red", "salmon", "silver", "sky blue", "tan", "teal", "turquoise", "violet", "white", "yellow"], yn = { human: pn }, Dn = yn, gn = ["Automotive", "Baby", "Beauty", "Books", "Clothing", "Computers", "Electronics", "Games", "Garden", "Grocery", "Health", "Home", "Industrial", "Jewelry", "Kids", "Movies", "Music", "Outdoors", "Shoes", "Sports", "Tools", "Toys"], bn = ["Discover the {{animal.type}}-like agility of our {{commerce.product}}, perfect for {{word.adjective}} users", "Discover the {{word.adjective}} new {{commerce.product}} with an exciting mix of {{commerce.productMaterial}} ingredients", "Ergonomic {{commerce.product}} made with {{commerce.productMaterial}} for all-day {{word.adjective}} support", "Experience the {{color.human}} brilliance of our {{commerce.product}}, perfect for {{word.adjective}} environments", "Featuring {{science.chemical_element.name}}-enhanced technology, our {{commerce.product}} offers unparalleled {{word.adjective}} performance", "Innovative {{commerce.product}} featuring {{word.adjective}} technology and {{commerce.productMaterial}} construction", "Introducing the {{location.country}}-inspired {{commerce.product}}, blending {{word.adjective}} style with local craftsmanship", "New {{color.human}} {{commerce.product}} with ergonomic design for {{word.adjective}} comfort", 'New {{commerce.product}} model with {{number.int({"min": 1, "max": 100})}} GB RAM, {{number.int({"min": 1, "max": 1000})}} GB storage, and {{word.adjective}} features', "Our {{animal.type}}-friendly {{commerce.product}} ensures {{word.adjective}} comfort for your pets", "Our {{food.adjective}}-inspired {{commerce.product}} brings a taste of luxury to your {{word.adjective}} lifestyle", "Professional-grade {{commerce.product}} perfect for {{word.adjective}} training and recreational use", "Savor the {{food.adjective}} essence in our {{commerce.product}}, designed for {{word.adjective}} culinary adventures", "Stylish {{commerce.product}} designed to make you stand out with {{word.adjective}} looks", "The sleek and {{word.adjective}} {{commerce.product}} comes with {{color.human}} LED lighting for smart functionality", "The {{color.human}} {{commerce.product}} combines {{location.country}} aesthetics with {{science.chemical_element.name}}-based durability", "The {{company.catchPhrase}} {{commerce.product}} offers reliable performance and {{word.adjective}} design", "The {{person.firstName}} {{commerce.product}} is the latest in a series of {{word.adjective}} products from {{company.name}}", "{{commerce.productAdjective}} {{commerce.product}} designed with {{commerce.productMaterial}} for {{word.adjective}} performance", "{{company.name}}'s most advanced {{commerce.product}} technology increases {{word.adjective}} capabilities"], fn = { adjective: ["Awesome", "Bespoke", "Electronic", "Elegant", "Ergonomic", "Fantastic", "Generic", "Gorgeous", "Handcrafted", "Handmade", "Incredible", "Intelligent", "Licensed", "Luxurious", "Modern", "Oriental", "Practical", "Recycled", "Refined", "Rustic", "Sleek", "Small", "Tasty", "Unbranded"], material: ["Bronze", "Concrete", "Cotton", "Fresh", "Frozen", "Granite", "Metal", "Plastic", "Rubber", "Soft", "Steel", "Wooden"], product: ["Bacon", "Ball", "Bike", "Car", "Chair", "Cheese", "Chicken", "Chips", "Computer", "Fish", "Gloves", "Hat", "Keyboard", "Mouse", "Pants", "Pizza", "Salad", "Sausages", "Shirt", "Shoes", "Soap", "Table", "Towels", "Tuna"] }, Cn = { department: gn, product_description: bn, product_name: fn }, En = Cn, kn = ["AI-driven", "Adaptive", "Advanced", "Automated", "Balanced", "Business-focused", "Centralized", "Compatible", "Configurable", "Cross-platform", "Customer-focused", "Customizable", "Decentralized", "Devolved", "Digitized", "Distributed", "Diverse", "Enhanced", "Ergonomic", "Exclusive", "Expanded", "Extended", "Face to face", "Focused", "Front-line", "Fully-configurable", "Fundamental", "Future-proofed", "Grass-roots", "Horizontal", "Immersive", "Implemented", "Innovative", "Integrated", "Intuitive", "Managed", "Monitored", "Multi-tiered", "Networked", "Open-architected", "Open-source", "Operative", "Optimized", "Optional", "Organic", "Organized", "Persevering", "Persistent", "Phased", "Polarised", "Proactive", "Profit-focused", "Profound", "Programmable", "Progressive", "Public-key", "Quality-focused", "Reactive", "Realigned", "Reduced", "Reverse-engineered", "Robust", "Seamless", "Secured", "Self-enabling", "Sharable", "Smart", "Stand-alone", "Streamlined", "Sustainable", "Synchronised", "Team-oriented", "Total", "Triple-buffered", "Universal", "Upgradable", "User-centric", "User-friendly", "Versatile", "Virtual", "Visionary"], An = ["24/7", "AI-driven", "B2B", "B2C", "back-end", "best-of-breed", "bleeding-edge", "collaborative", "compelling", "cross-media", "cross-platform", "customized", "cutting-edge", "decentralized", "distributed", "dynamic", "efficient", "end-to-end", "enterprise", "extensible", "frictionless", "front-end", "generative", "global", "granular", "holistic", "immersive", "impactful", "innovative", "integrated", "interactive", "intuitive", "killer", "leading-edge", "magnetic", "mission-critical", "next-generation", "one-to-one", "open-source", "out-of-the-box", "plug-and-play", "proactive", "quantum", "real-time", "revolutionary", "rich", "robust", "scalable", "seamless", "smart", "sticky", "strategic", "sustainable", "synergistic", "transparent", "turn-key", "ubiquitous", "user-centric", "value-added", "vertical", "viral", "virtual", "visionary", "world-class"], Bn = ["AI", "ROI", "applications", "architectures", "blockchains", "channels", "communities", "content", "convergence", "deliverables", "e-commerce", "experiences", "functionalities", "infrastructures", "initiatives", "interfaces", "large language models", "lifetime value", "markets", "methodologies", "metrics", "mindshare", "models", "networks", "niches", "paradigms", "partnerships", "platforms", "relationships", "schemas", "smart contracts", "solutions", "supply-chains", "synergies", "systems", "technologies", "users", "web services"], Sn = ["aggregate", "architect", "benchmark", "brand", "collaborate", "cultivate", "deliver", "deploy", "disintermediate", "drive", "embrace", "empower", "enable", "engage", "engineer", "enhance", "evolve", "expedite", "exploit", "extend", "facilitate", "gamify", "generate", "grow", "harness", "implement", "incentivize", "incubate", "innovate", "integrate", "iterate", "leverage", "maximize", "mesh", "monetize", "optimize", "orchestrate", "productize", "redefine", "reinvent", "repurpose", "revolutionize", "scale", "seize", "simplify", "strategize", "streamline", "syndicate", "synthesize", "target", "transform", "transition", "unleash", "utilize", "visualize", "whiteboard"], vn = ["24 hour", "24/7", "AI-powered", "actuating", "analyzing", "asymmetric", "asynchronous", "attitude-oriented", "bifurcated", "bottom-line", "clear-thinking", "client-driven", "client-server", "cloud-native", "coherent", "cohesive", "composite", "content-based", "context-sensitive", "contextually-based", "data-driven", "dedicated", "demand-driven", "directional", "discrete", "disintermediate", "dynamic", "eco-centric", "empowering", "encompassing", "executive", "explicit", "exuding", "fault-tolerant", "fresh-thinking", "full-range", "global", "heuristic", "high-level", "holistic", "homogeneous", "human-resource", "hybrid", "immersive", "impactful", "incremental", "intangible", "interactive", "intermediate", "leading edge", "local", "logistical", "maximized", "methodical", "mission-critical", "mobile", "modular", "motivating", "national", "needs-based", "neutral", "next generation", "optimal", "optimizing", "radical", "real-time", "reciprocal", "regional", "resilient", "responsive", "scalable", "secondary", "stable", "static", "sustainable", "system-worthy", "systematic", "systemic", "tangible", "tertiary", "transitional", "uniform", "user-facing", "value-added", "well-modulated", "zero administration", "zero defect", "zero tolerance", "zero trust"], wn = ["Group", "Inc", "LLC", "and Sons"], Mn = ["{{person.last_name.generic}} - {{person.last_name.generic}}", "{{person.last_name.generic}} {{company.legal_entity_type}}", "{{person.last_name.generic}}, {{person.last_name.generic}} and {{person.last_name.generic}}"], Tn = ["ability", "access", "adapter", "algorithm", "alliance", "analyzer", "application", "approach", "architecture", "archive", "array", "artificial intelligence", "attitude", "benchmark", "budgetary management", "capability", "capacity", "challenge", "circuit", "collaboration", "complexity", "concept", "conglomeration", "contingency", "core", "customer loyalty", "data-warehouse", "database", "definition", "emulation", "encoding", "encryption", "firmware", "flexibility", "focus group", "forecast", "frame", "framework", "function", "functionalities", "generative AI", "hardware", "help-desk", "hierarchy", "hub", "implementation", "infrastructure", "initiative", "installation", "instruction set", "interface", "internet solution", "intranet", "knowledge base", "knowledge user", "leverage", "local area network", "matrices", "matrix", "methodology", "microservice", "middleware", "migration", "model", "moderator", "monitoring", "moratorium", "neural-net", "open architecture", "orchestration", "paradigm", "parallelism", "policy", "portal", "pricing structure", "process improvement", "product", "productivity", "project", "projection", "protocol", "service-desk", "software", "solution", "standardization", "strategy", "structure", "success", "support", "synergy", "system engine", "task-force", "throughput", "time-frame", "toolset", "utilisation", "website", "workforce"], Ln = { adjective: kn, buzz_adjective: An, buzz_noun: Bn, buzz_verb: Sn, descriptor: vn, legal_entity_type: wn, name_pattern: Mn, noun: Tn }, Rn = Ln, Pn = ["avatar", "category", "comment", "createdAt", "email", "group", "id", "name", "password", "phone", "status", "title", "token", "updatedAt"], Hn = { column: Pn }, Gn = Hn, Nn = { wide: ["April", "August", "December", "February", "January", "July", "June", "March", "May", "November", "October", "September"], abbr: ["Apr", "Aug", "Dec", "Feb", "Jan", "Jul", "Jun", "Mar", "May", "Nov", "Oct", "Sep"] }, Wn = { wide: ["Friday", "Monday", "Saturday", "Sunday", "Thursday", "Tuesday", "Wednesday"], abbr: ["Fri", "Mon", "Sat", "Sun", "Thu", "Tue", "Wed"] }, xn = { month: Nn, weekday: Wn }, In = xn, Kn = ["Auto Loan", "Checking", "Credit Card", "Home Loan", "Investment", "Money Market", "Personal Loan", "Savings"], On = ["34##-######-####L", "37##-######-####L"], Jn = ["30[0-5]#-######-###L", "36##-######-###L", "54##-####-####-###L"], zn = ["6011-####-####-###L", "6011-62##-####-####-###L", "64[4-9]#-####-####-###L", "64[4-9]#-62##-####-####-###L", "65##-####-####-###L", "65##-62##-####-####-###L"], Vn = ["3528-####-####-###L", "3529-####-####-###L", "35[3-8]#-####-####-###L"], jn = ["2[221-720]-####-####-###L", "5[1-5]##-####-####-###L"], Yn = ["4###########L", "4###-####-####-###L"], $n = { american_express: On, diners_club: Jn, discover: zn, jcb: Vn, mastercard: jn, visa: Yn }, Un = $n, _n = [{ name: "UAE Dirham", code: "AED", symbol: "" }, { name: "Afghani", code: "AFN", symbol: "؋" }, { name: "Lek", code: "ALL", symbol: "Lek" }, { name: "Armenian Dram", code: "AMD", symbol: "" }, { name: "Netherlands Antillian Guilder", code: "ANG", symbol: "ƒ" }, { name: "Kwanza", code: "AOA", symbol: "" }, { name: "Argentine Peso", code: "ARS", symbol: "$" }, { name: "Australian Dollar", code: "AUD", symbol: "$" }, { name: "Aruban Guilder", code: "AWG", symbol: "ƒ" }, { name: "Azerbaijanian Manat", code: "AZN", symbol: "ман" }, { name: "Convertible Marks", code: "BAM", symbol: "KM" }, { name: "Barbados Dollar", code: "BBD", symbol: "$" }, { name: "Taka", code: "BDT", symbol: "" }, { name: "Bulgarian Lev", code: "BGN", symbol: "лв" }, { name: "Bahraini Dinar", code: "BHD", symbol: "" }, { name: "Burundi Franc", code: "BIF", symbol: "" }, { name: "Bermudian Dollar (customarily known as Bermuda Dollar)", code: "BMD", symbol: "$" }, { name: "Brunei Dollar", code: "BND", symbol: "$" }, { name: "Boliviano boliviano", code: "BOB", symbol: "Bs" }, { name: "Brazilian Real", code: "BRL", symbol: "R$" }, { name: "Bahamian Dollar", code: "BSD", symbol: "$" }, { name: "Pula", code: "BWP", symbol: "P" }, { name: "Belarusian Ruble", code: "BYN", symbol: "Rbl" }, { name: "Belize Dollar", code: "BZD", symbol: "BZ$" }, { name: "Canadian Dollar", code: "CAD", symbol: "$" }, { name: "Congolese Franc", code: "CDF", symbol: "" }, { name: "Swiss Franc", code: "CHF", symbol: "CHF" }, { name: "Chilean Peso", code: "CLP", symbol: "$" }, { name: "Yuan Renminbi", code: "CNY", symbol: "¥" }, { name: "Colombian Peso", code: "COP", symbol: "$" }, { name: "Costa Rican Colon", code: "CRC", symbol: "₡" }, { name: "Cuban Peso", code: "CUP", symbol: "₱" }, { name: "Cape Verde Escudo", code: "CVE", symbol: "" }, { name: "Czech Koruna", code: "CZK", symbol: "Kč" }, { name: "Djibouti Franc", code: "DJF", symbol: "" }, { name: "Danish Krone", code: "DKK", symbol: "kr" }, { name: "Dominican Peso", code: "DOP", symbol: "RD$" }, { name: "Algerian Dinar", code: "DZD", symbol: "" }, { name: "Egyptian Pound", code: "EGP", symbol: "£" }, { name: "Nakfa", code: "ERN", symbol: "" }, { name: "Ethiopian Birr", code: "ETB", symbol: "" }, { name: "Euro", code: "EUR", symbol: "€" }, { name: "Fiji Dollar", code: "FJD", symbol: "$" }, { name: "Falkland Islands Pound", code: "FKP", symbol: "£" }, { name: "Pound Sterling", code: "GBP", symbol: "£" }, { name: "Lari", code: "GEL", symbol: "" }, { name: "Cedi", code: "GHS", symbol: "" }, { name: "Gibraltar Pound", code: "GIP", symbol: "£" }, { name: "Dalasi", code: "GMD", symbol: "" }, { name: "Guinea Franc", code: "GNF", symbol: "" }, { name: "Quetzal", code: "GTQ", symbol: "Q" }, { name: "Guyana Dollar", code: "GYD", symbol: "$" }, { name: "Hong Kong Dollar", code: "HKD", symbol: "$" }, { name: "Lempira", code: "HNL", symbol: "L" }, { name: "Gourde", code: "HTG", symbol: "" }, { name: "Forint", code: "HUF", symbol: "Ft" }, { name: "Rupiah", code: "IDR", symbol: "Rp" }, { name: "New Israeli Sheqel", code: "ILS", symbol: "₪" }, { name: "Bhutanese Ngultrum", code: "BTN", symbol: "Nu" }, { name: "Indian Rupee", code: "INR", symbol: "₹" }, { name: "Iraqi Dinar", code: "IQD", symbol: "" }, { name: "Iranian Rial", code: "IRR", symbol: "﷼" }, { name: "Iceland Krona", code: "ISK", symbol: "kr" }, { name: "Jamaican Dollar", code: "JMD", symbol: "J$" }, { name: "Jordanian Dinar", code: "JOD", symbol: "" }, { name: "Yen", code: "JPY", symbol: "¥" }, { name: "Kenyan Shilling", code: "KES", symbol: "" }, { name: "Som", code: "KGS", symbol: "лв" }, { name: "Riel", code: "KHR", symbol: "៛" }, { name: "Comoro Franc", code: "KMF", symbol: "" }, { name: "North Korean Won", code: "KPW", symbol: "₩" }, { name: "Won", code: "KRW", symbol: "₩" }, { name: "Kuwaiti Dinar", code: "KWD", symbol: "" }, { name: "Cayman Islands Dollar", code: "KYD", symbol: "$" }, { name: "Tenge", code: "KZT", symbol: "лв" }, { name: "Kip", code: "LAK", symbol: "₭" }, { name: "Lebanese Pound", code: "LBP", symbol: "£" }, { name: "Sri Lanka Rupee", code: "LKR", symbol: "₨" }, { name: "Liberian Dollar", code: "LRD", symbol: "$" }, { name: "Libyan Dinar", code: "LYD", symbol: "" }, { name: "Moroccan Dirham", code: "MAD", symbol: "" }, { name: "Moldovan Leu", code: "MDL", symbol: "" }, { name: "Malagasy Ariary", code: "MGA", symbol: "" }, { name: "Denar", code: "MKD", symbol: "ден" }, { name: "Kyat", code: "MMK", symbol: "" }, { name: "Tugrik", code: "MNT", symbol: "₮" }, { name: "Pataca", code: "MOP", symbol: "" }, { name: "Ouguiya", code: "MRU", symbol: "" }, { name: "Mauritius Rupee", code: "MUR", symbol: "₨" }, { name: "Rufiyaa", code: "MVR", symbol: "" }, { name: "Kwacha", code: "MWK", symbol: "" }, { name: "Mexican Peso", code: "MXN", symbol: "$" }, { name: "Malaysian Ringgit", code: "MYR", symbol: "RM" }, { name: "Metical", code: "MZN", symbol: "MT" }, { name: "Naira", code: "NGN", symbol: "₦" }, { name: "Cordoba Oro", code: "NIO", symbol: "C$" }, { name: "Norwegian Krone", code: "NOK", symbol: "kr" }, { name: "Nepalese Rupee", code: "NPR", symbol: "₨" }, { name: "New Zealand Dollar", code: "NZD", symbol: "$" }, { name: "Rial Omani", code: "OMR", symbol: "﷼" }, { name: "Balboa", code: "PAB", symbol: "B/." }, { name: "Nuevo Sol", code: "PEN", symbol: "S/." }, { name: "Kina", code: "PGK", symbol: "" }, { name: "Philippine Peso", code: "PHP", symbol: "Php" }, { name: "Pakistan Rupee", code: "PKR", symbol: "₨" }, { name: "Zloty", code: "PLN", symbol: "zł" }, { name: "Guarani", code: "PYG", symbol: "Gs" }, { name: "Qatari Rial", code: "QAR", symbol: "﷼" }, { name: "New Leu", code: "RON", symbol: "lei" }, { name: "Serbian Dinar", code: "RSD", symbol: "Дин." }, { name: "Russian Ruble", code: "RUB", symbol: "руб" }, { name: "Rwanda Franc", code: "RWF", symbol: "" }, { name: "Saudi Riyal", code: "SAR", symbol: "﷼" }, { name: "Solomon Islands Dollar", code: "SBD", symbol: "$" }, { name: "Seychelles Rupee", code: "SCR", symbol: "₨" }, { name: "Sudanese Pound", code: "SDG", symbol: "" }, { name: "Swedish Krona", code: "SEK", symbol: "kr" }, { name: "Singapore Dollar", code: "SGD", symbol: "$" }, { name: "Saint Helena Pound", code: "SHP", symbol: "£" }, { name: "Leone", code: "SLE", symbol: "" }, { name: "Somali Shilling", code: "SOS", symbol: "S" }, { name: "Surinam Dollar", code: "SRD", symbol: "$" }, { name: "South Sudanese pound", code: "SSP", symbol: "" }, { name: "Dobra", code: "STN", symbol: "Db" }, { name: "Syrian Pound", code: "SYP", symbol: "£" }, { name: "Lilangeni", code: "SZL", symbol: "" }, { name: "Baht", code: "THB", symbol: "฿" }, { name: "Somoni", code: "TJS", symbol: "" }, { name: "Manat", code: "TMT", symbol: "" }, { name: "Tunisian Dinar", code: "TND", symbol: "" }, { name: "Pa'anga", code: "TOP", symbol: "" }, { name: "Turkish Lira", code: "TRY", symbol: "₺" }, { name: "Trinidad and Tobago Dollar", code: "TTD", symbol: "TT$" }, { name: "New Taiwan Dollar", code: "TWD", symbol: "NT$" }, { name: "Tanzanian Shilling", code: "TZS", symbol: "" }, { name: "Hryvnia", code: "UAH", symbol: "₴" }, { name: "Uganda Shilling", code: "UGX", symbol: "" }, { name: "US Dollar", code: "USD", symbol: "$" }, { name: "Peso Uruguayo", code: "UYU", symbol: "$U" }, { name: "Uzbekistan Sum", code: "UZS", symbol: "лв" }, { name: "Venezuelan bolívar", code: "VES", symbol: "Bs" }, { name: "Dong", code: "VND", symbol: "₫" }, { name: "Vatu", code: "VUV", symbol: "" }, { name: "Tala", code: "WST", symbol: "" }, { name: "CFA Franc BEAC", code: "XAF", symbol: "" }, { name: "East Caribbean Dollar", code: "XCD", symbol: "$" }, { name: "CFA Franc BCEAO", code: "XOF", symbol: "" }, { name: "CFP Franc", code: "XPF", symbol: "" }, { name: "Yemeni Rial", code: "YER", symbol: "﷼" }, { name: "Rand", code: "ZAR", symbol: "R" }, { name: "Lesotho Loti", code: "LSL", symbol: "" }, { name: "Namibia Dollar", code: "NAD", symbol: "N$" }, { name: "Zambian Kwacha", code: "ZMW", symbol: "K" }, { name: "Zimbabwe Dollar", code: "ZWL", symbol: "" }], qn = ["deposit", "invoice", "payment", "withdrawal"], Zn = { account_type: Kn, credit_card: Un, currency: _n, transaction_type: qn }, Xn = Zn, Qn = ["bitter", "creamy", "crispy", "crunchy", "delicious", "fluffy", "fresh", "golden", "juicy", "moist", "rich", "salty", "savory", "smoky", "sour", "spicy", "sweet", "tangy", "tender", "zesty"], ei = ["A classic pie filled with delicious {{food.meat}} and {{food.adjective}} {{food.ingredient}}, baked in a {{food.adjective}} pastry crust and topped with a golden-brown lattice.", "A delightful tart combining {{food.adjective}} {{food.vegetable}} and sweet {{food.fruit}}, set in a buttery pastry shell and finished with a hint of {{food.spice}}.", "A heartwarming {{food.ethnic_category}} soup, featuring fresh {{food.ingredient}} and an aromatic blend of traditional spices.", "A robust {{food.adjective}} stew featuring {{food.ethnic_category}} flavors, loaded with {{food.adjective}} meat, {{food.adjective}} vegetables, and a {{food.adjective}}, {{food.adjective}} broth.", "A simple {{food.fruit}} pie. No fancy stuff. Just pie.", "A slow-roasted {{animal.bird}} with a {{food.adjective}}, {{food.adjective}} exterior. Stuffed with {{food.fruit}} and covered in {{food.fruit}} sauce. Sides with {{food.vegetable}} puree and wild {{food.vegetable}}.", "A special {{color.human}} {{food.ingredient}} from {{location.country}}. To support the strong flavor it is sided with a tablespoon of {{food.spice}}.", "A succulent {{food.meat}} steak, encased in a {{food.adjective}} {{food.spice}} crust, served with a side of {{food.spice}} mashed {{food.vegetable}}.", "An exquisite {{food.meat}} roast, infused with the essence of {{food.fruit}}, slow-roasted to bring out its natural flavors and served with a side of creamy {{food.vegetable}}", "Baked {{food.ingredient}}-stuffed {{food.meat}}, seasoned with {{food.spice}} and {{food.adjective}} herbs, accompanied by roasted {{food.vegetable}} medley.", "Crispy fried {{food.meat}} bites, seasoned with {{food.spice}} and served with a tangy {{food.fruit}} dipping sauce.", "Fresh mixed greens tossed with {{food.spice}}-rubbed {{food.meat}}, {{food.vegetable}}, and a light dressing.", "Fresh {{food.ingredient}} with a pinch of {{food.spice}}, topped by a caramelized {{food.fruit}} with whipped cream", "Grilled {{food.meat}} kebabs, marinated in {{food.ethnic_category}} spices and served with a fresh {{food.vegetable}} and {{food.fruit}} salad.", "Hearty {{food.ingredient}} and {{food.meat}} stew, slow-cooked with {{food.spice}} and {{food.vegetable}} for a comforting, flavorful meal.", "Juicy {{food.meat}}, grilled to your liking and drizzled with a bold {{food.spice}} sauce, served alongside roasted {{food.vegetable}}.", "Our {{food.adjective}} {{food.meat}}, slow-cooked to perfection, accompanied by steamed {{food.vegetable}} and a rich, savory gravy.", "Tender {{food.meat}} skewers, glazed with a sweet and tangy {{food.fruit}} sauce, served over a bed of fragrant jasmine rice.", "Tenderly braised {{food.meat}} in a rich {{food.spice}} and {{food.vegetable}} sauce, served with a side of creamy {{food.vegetable}}.", "Three {{food.ingredient}} with {{food.vegetable}}, {{food.vegetable}}, {{food.vegetable}}, {{food.vegetable}} and {{food.ingredient}}. With a side of baked {{food.fruit}}, and your choice of {{food.ingredient}} or {{food.ingredient}}.", '{{number.int({"min":1, "max":99})}}-day aged {{food.meat}} steak, with choice of {{number.int({"min":2, "max":4})}} sides.'], ai = ["California maki", "Peking duck", "Philadelphia maki", "arepas", "barbecue ribs", "bruschette with tomato", "bunny chow", "caesar salad", "caprese salad", "cauliflower penne", "cheeseburger", "chicken fajitas", "chicken milanese", "chicken parm", "chicken wings", "chilli con carne", "ebiten maki", "fettuccine alfredo", "fish and chips", "french fries with sausages", "french toast", "hummus", "katsu curry", "kebab", "lasagne", "linguine with clams", "massaman curry", "meatballs with sauce", "mushroom risotto", "pappardelle alla bolognese", "pasta and beans", "pasta carbonara", "pasta with tomato and basil", "pho", "pierogi", "pizza", "poke", "pork belly buns", "pork sausage roll", "poutine", "ricotta stuffed ravioli", "risotto with seafood", "salmon nigiri", "scotch eggs", "seafood paella", "som tam", "souvlaki", "stinky tofu", "sushi", "tacos", "teriyaki chicken donburi", "tiramisù", "tuna sashimi", "vegetable soup"], ri = ["{{food.adjective}} {{food.ethnic_category}} stew", "{{food.adjective}} {{food.meat}} with {{food.vegetable}}", "{{food.ethnic_category}} {{food.ingredient}} soup", "{{food.fruit}} and {{food.fruit}} tart", "{{food.fruit}} pie", "{{food.fruit}}-glazed {{food.meat}} skewers", "{{food.fruit}}-infused {{food.meat}} roast", "{{food.ingredient}} and {{food.meat}} pie", "{{food.ingredient}}-infused {{food.meat}}", "{{food.meat}} steak", "{{food.meat}} with {{food.fruit}} sauce", "{{food.spice}}-crusted {{food.meat}}", "{{food.spice}}-rubbed {{food.meat}} salad", "{{food.vegetable}} salad", "{{person.first_name.generic}}'s special {{food.ingredient}}"], ni = ["Ainu", "Albanian", "American", "Andhra", "Anglo-Indian", "Arab", "Argentine", "Armenian", "Assyrian", "Awadhi", "Azerbaijani", "Balochi", "Bangladeshi", "Bashkir", "Belarusian", "Bengali", "Berber", "Brazilian", "British", "Buddhist", "Bulgarian", "Cajun", "Cantonese", "Caribbean", "Chechen", "Chinese", "Chinese Islamic", "Circassian", "Crimean Tatar", "Cypriot", "Czech", "Danish", "Egyptian", "English", "Eritrean", "Estonian", "Ethiopian", "Filipino", "French", "Georgian", "German", "Goan", "Goan Catholic", "Greek", "Gujarati", "Hyderabad", "Indian", "Indian Chinese", "Indian Singaporean", "Indonesian", "Inuit", "Irish", "Italian", "Italian-American", "Jamaican", "Japanese", "Jewish - Israeli", "Karnataka", "Kazakh", "Keralite", "Korean", "Kurdish", "Laotian", "Latvian", "Lebanese", "Lithuanian", "Louisiana Creole", "Maharashtrian", "Malay", "Malaysian Chinese", "Malaysian Indian", "Mangalorean", "Mediterranean", "Mennonite", "Mexican", "Mordovian", "Mughal", "Native American", "Nepalese", "New Mexican", "Odia", "Pakistani", "Parsi", "Pashtun", "Pennsylvania Dutch", "Peranakan", "Persian", "Peruvian", "Polish", "Portuguese", "Punjabi", "Québécois", "Rajasthani", "Romani", "Romanian", "Russian", "Sami", "Serbian", "Sindhi", "Slovak", "Slovenian", "Somali", "South Indian", "Soviet", "Spanish", "Sri Lankan", "Taiwanese", "Tamil", "Tatar", "Texan", "Thai", "Turkish", "Udupi", "Ukrainian", "Vietnamese", "Yamal", "Zambian", "Zanzibari"], ii = ["apple", "apricot", "aubergine", "avocado", "banana", "berry", "blackberry", "blood orange", "blueberry", "bush tomato", "butternut pumpkin", "cantaloupe", "cavalo", "cherry", "corella pear", "cranberry", "cumquat", "currant", "custard apple", "custard apples daikon", "date", "dragonfruit", "dried apricot", "elderberry", "feijoa", "fig", "fingerlime", "goji berry", "grape", "grapefruit", "guava", "honeydew melon", "incaberry", "jarrahdale pumpkin", "juniper berry", "kiwi fruit", "kiwiberry", "lemon", "lime", "longan", "loquat", "lychee", "mandarin", "mango", "mangosteen", "melon", "mulberry", "nashi pear", "nectarine", "olive", "orange", "papaw", "papaya", "passionfruit", "peach", "pear", "pineapple", "plum", "pomegranate", "prune", "rockmelon", "snowpea", "sprout", "starfruit", "strawberry", "sultana", "tangelo", "tomato", "watermelon"], ui = ["achacha", "adzuki beans", "agar", "agave syrup", "ajowan seed", "albacore tuna", "alfalfa", "allspice", "almond oil", "almonds", "amaranth", "amchur", "anchovies", "aniseed", "annatto seed", "apple cider vinegar", "apple juice", "apple juice concentrate", "apples", "apricots", "arborio rice", "arrowroot", "artichoke", "arugula", "asafoetida", "asian greens", "asian noodles", "asparagus", "aubergine", "avocado", "avocado oil", "avocado spread", "bacon", "baking powder", "baking soda", "balsamic vinegar", "bamboo shoots", "banana", "barberry", "barley", "barramundi", "basil basmati rice", "bay leaves", "bean shoots", "bean sprouts", "beans", "beef", "beef stock", "beetroot", "berries", "besan", "black eyed beans", "blackberries", "blood oranges", "blue cheese", "blue eye trevalla", "blue swimmer crab", "blueberries", "bocconcini", "bok choy", "bonito flakes", "bonza", "borlotti beans", "bran", "brazil nut", "bread", "brie", "broccoli", "broccolini", "brown flour", "brown mushrooms", "brown rice", "brown rice vinegar", "brussels sprouts", "buckwheat", "buckwheat flour", "buckwheat noodles", "bulghur", "bush tomato", "butter", "butter beans", "buttermilk", "butternut lettuce", "butternut pumpkin", "cabbage", "cacao", "cake", "calamari", "camellia tea oil", "camembert", "camomile", "candle nut", "cannellini beans", "canola oil", "cantaloupe", "capers", "capsicum", "caraway seed", "cardamom", "carob carrot", "carrot", "cashews", "cassia bark", "cauliflower", "cavalo", "cayenne", "celery", "celery seed", "cheddar", "cherries", "chestnut", "chia seeds", "chicken", "chicken stock", "chickory", "chickpea", "chilli pepper", "chinese cabbage", "chinese five spice", "chives", "choy sum", "cinnamon", "clams", "cloves", "cocoa powder", "coconut", "coconut oil", "coconut water", "coffee", "common cultivated mushrooms", "corella pear", "coriander leaves", "coriander seed", "corn oil", "corn syrup", "corn tortilla", "cornichons", "cornmeal", "cos lettuce", "cottage cheese", "cous cous", "crabs", "cranberry", "cream", "cream cheese", "cucumber", "cumin", "cumquat", "currants", "curry leaves", "curry powder", "custard apples", "dandelion", "dark chocolate", "dashi", "dates", "dill", "dragonfruit", "dried apricots", "dried chinese broccoli", "duck", "edam", "edamame", "eggplant", "eggs", "elderberry", "endive", "english spinach", "enoki mushrooms", "extra virgin olive oil", "farmed prawns", "feijoa", "fennel", "fennel seeds", "fenugreek", "feta", "figs", "file powder", "fingerlime", "fish sauce", "fish stock", "flat mushrooms", "flathead", "flaxseed", "flaxseed oil", "flounder", "flour", "freekeh", "french eschallots", "fresh chillies", "fromage blanc", "fruit", "galangal", "garam masala", "garlic", "goat cheese", "goat milk", "goji berry", "grape seed oil", "grapefruit", "grapes", "green beans", "green pepper", "green tea", "green tea noodles", "greenwheat freekeh", "gruyere", "guava", "gula melaka", "haloumi", "ham", "haricot beans", "harissa", "hazelnut", "hijiki", "hiramasa kingfish", "hokkien noodles", "honey", "honeydew melon", "horseradish", "hot smoked salmon", "hummus", "iceberg lettuce", "incaberries", "jarrahdale pumpkin", "jasmine rice", "jelly", "jerusalem artichoke", "jewfish", "jicama", "juniper berries", "kale", "kangaroo", "kecap manis", "kenchur", "kidney beans", "kidneys", "kiwi berries", "kiwi fruit", "kohlrabi", "kokam", "kombu", "koshihikari rice", "kudzu", "kumera", "lamb", "lavender flowers", "leeks", "lemon", "lemongrass", "lentils", "lettuce", "licorice", "lime leaves", "limes", "liver", "lobster", "longan", "loquats", "lotus root", "lychees", "macadamia nut", "macadamia oil", "mace", "mackerel", "mahi mahi", "mahlab", "malt vinegar", "mandarins", "mango", "mangosteens", "maple syrup", "margarine", "marigold", "marjoram", "mastic", "melon", "milk", "milk chocolate", "mint", "miso", "molasses", "monkfish", "morwong", "mountain bread", "mozzarella", "muesli", "mulberries", "mullet", "mung beans", "mussels", "mustard", "mustard seed", "nashi pear", "nasturtium", "nectarines", "nori", "nutmeg", "nutritional yeast", "nuts", "oat flour", "oatmeal", "oats", "octopus", "okra", "olive oil", "olives", "omega spread", "onion", "oranges", "oregano", "oyster mushrooms", "oyster sauce", "oysters", "pandanus leaves", "papaw", "papaya", "paprik", "parmesan cheese", "parrotfish", "parsley", "parsnip", "passionfruit", "pasta", "peaches", "peanuts", "pear", "pear juice", "pears", "peas", "pecan nut", "pecorino", "pepitas", "peppercorns", "peppermint", "peppers", "persimmon", "pine nut", "pineapple", "pinto beans", "pistachio nut", "plums", "polenta", "pomegranate", "poppy seed", "porcini mushrooms", "pork", "potato flour", "potatoes", "provolone", "prunes", "pumpkin", "pumpkin seed", "purple carrot", "purple rice", "quark", "quince", "quinoa", "radicchio", "radish", "raisin", "raspberry", "red cabbage", "red lentils", "red pepper", "red wine", "red wine vinegar", "redfish", "rhubarb", "rice flour", "rice noodles", "rice paper", "rice syrup", "ricemilk", "ricotta", "rockmelon", "rose water", "rosemary", "rye", "rye bread", "safflower oil", "saffron", "sage", "sake", "salmon", "sardines", "sausages", "scallops", "sea salt", "semolina", "sesame oil", "sesame seeds", "shark", "shiitake mushrooms", "silverbeet", "slivered almonds", "smoked trout", "snapper", "snowpea sprouts", "snowpeas", "soba", "sour dough bread", "soy", "soy beans", "soy flour", "soy milk", "soy sauce", "soymilk", "spearmint", "spelt", "spelt bread", "spinach", "spring onions", "sprouts", "squash", "squid", "star anise", "star fruit", "starfruit", "stevia", "strawberries", "sugar", "sultanas", "sun-dried tomatoes", "sunflower oil", "sunflower seeds", "sweet chilli sauce", "sweet potato", "swiss chard", "swordfish", "szechuan pepperberry", "tabasco", "tahini", "taleggio cheese", "tamari", "tamarillo", "tangelo", "tapioca", "tapioca flour", "tarragon", "tea", "tea oil", "tempeh", "thyme", "tinned", "tofu", "tom yum", "tomatoes", "trout", "tuna", "turkey", "turmeric", "turnips", "unbleached flour", "vanilla beans", "vegetable oil", "vegetable spaghetti", "vegetable stock", "vermicelli noodles", "vinegar", "wakame", "walnut", "warehou", "wasabi", "water", "watercress", "watermelon", "wattleseed", "wheat", "wheatgrass juice", "white bread", "white flour", "white rice", "white wine", "white wine vinegar", "whiting wild rice", "wholegrain bread", "wholemeal", "wholewheat flour", "william pear", "yeast", "yellow papaw", "yellowtail kingfish", "yoghurt", "yogurt", "zucchini"], ti = ["beef", "chicken", "crocodile", "duck", "emu", "goose", "kangaroo", "lamb", "ostrich", "pigeon", "pork", "quail", "rabbit", "salmon", "turkey", "venison"], oi = ["achiote seed", "ajwain seed", "ajwan seed", "allspice", "amchoor", "anise", "anise star", "aniseed", "annatto seed", "arrowroot", "asafoetida", "baharat", "balti masala", "balti stir fry mix", "basil", "bay leaves", "bbq", "caraway seed", "cardamom", "cassia", "cayenne pepper", "celery", "chamomile", "chervil", "chilli", "chilli pepper", "chillies", "china star", "chives", "cinnamon", "cloves", "colombo", "coriander", "cumin", "curly leaf parsley", "curry", "dhansak", "dill", "fennel seed", "fenugreek", "fines herbes", "five spice", "french lavender", "galangal", "garam masala", "garlic", "german chamomile", "ginger", "green cardamom", "herbes de provence", "jalfrezi", "jerk", "kaffir leaves", "korma", "lavender", "lemon grass", "lemon pepper", "lime leaves", "liquorice root", "mace", "mango", "marjoram", "methi", "mint", "mustard", "nutmeg", "onion seed", "orange zest", "oregano", "paprika", "parsley", "pepper", "peppercorns", "pimento", "piri piri", "poppy seed", "pot marjoram", "poudre de colombo", "ras-el-hanout", "rice paper", "rogan josh", "rose baie", "rosemary", "saffron", "sage", "sesame seed", "spearmint", "sumac", "sweet basil", "sweet laurel", "tagine", "tandoori masala", "tarragon", "thyme", "tikka masala", "turmeric", "vanilla", "zahtar"], li = ["artichoke", "arugula", "asian greens", "asparagus", "bean shoots", "bean sprouts", "beans", "beetroot", "bok choy", "broccoli", "broccolini", "brussels sprouts", "butternut lettuce", "cabbage", "capers", "carob carrot", "carrot", "cauliflower", "celery", "chilli pepper", "chinese cabbage", "chives", "cornichons", "cos lettuce", "cucumber", "dried chinese broccoli", "eggplant", "endive", "english spinach", "french eschallots", "fresh chillies", "garlic", "green beans", "green pepper", "hijiki", "iceberg lettuce", "jerusalem artichoke", "jicama", "kale", "kohlrabi", "leeks", "lettuce", "okra", "onion", "parsnip", "peas", "peppers", "potatoes", "pumpkin", "purple carrot", "radicchio", "radish", "raspberry", "red cabbage", "red pepper", "rhubarb", "snowpea sprouts", "spinach", "squash", "sun dried tomatoes", "sweet potato", "swiss chard", "turnips", "zucchini"], si = { adjective: Qn, description_pattern: ei, dish: ai, dish_pattern: ri, ethnic_category: ni, fruit: ii, ingredient: ui, meat: ti, spice: oi, vegetable: li }, Fi = si, ci = ["1080p", "auxiliary", "back-end", "bluetooth", "cross-platform", "digital", "haptic", "mobile", "multi-byte", "neural", "online", "open-source", "optical", "primary", "redundant", "solid state", "virtual", "wireless"], di = ["backing up", "bypassing", "calculating", "compressing", "connecting", "copying", "generating", "hacking", "indexing", "navigating", "overriding", "parsing", "programming", "quantifying", "synthesizing", "transmitting"], hi = ["alarm", "application", "array", "bandwidth", "bus", "capacitor", "card", "circuit", "driver", "feed", "firewall", "hard drive", "interface", "matrix", "microchip", "monitor", "panel", "pixel", "port", "program", "protocol", "sensor", "system", "transmitter"], mi = ["I'll {{verb}} the {{adjective}} {{abbreviation}} {{noun}}, that should {{noun}} the {{abbreviation}} {{noun}}!", "If we {{verb}} the {{noun}}, we can get to the {{abbreviation}} {{noun}} through the {{adjective}} {{abbreviation}} {{noun}}!", "The {{abbreviation}} {{noun}} is down, {{verb}} the {{adjective}} {{noun}} so we can {{verb}} the {{abbreviation}} {{noun}}!", "Try to {{verb}} the {{abbreviation}} {{noun}}, maybe it will {{verb}} the {{adjective}} {{noun}}!", "Use the {{adjective}} {{abbreviation}} {{noun}}, then you can {{verb}} the {{adjective}} {{noun}}!", "We need to {{verb}} the {{adjective}} {{abbreviation}} {{noun}}!", "You can't {{verb}} the {{noun}} without {{ingverb}} the {{adjective}} {{abbreviation}} {{noun}}!", "{{ingverb}} the {{noun}} won't do anything, we need to {{verb}} the {{adjective}} {{abbreviation}} {{noun}}!"], pi = ["back up", "bypass", "calculate", "compress", "connect", "copy", "generate", "hack", "index", "input", "navigate", "override", "parse", "program", "quantify", "reboot", "synthesize", "transmit"], yi = { adjective: ci, ingverb: di, noun: hi, phrase: mi, verb: pi }, Di = yi, gi = ["com", "biz", "info", "name", "net", "org"], bi = ["example.org", "example.com", "example.net"], fi = ["gmail.com", "yahoo.com", "hotmail.com"], Ci = { domain_suffix: gi, example_email: bi, free_email: fi }, Ei = Ci, ki = ["#####", "####", "###"], Ai = ["Abilene", "Akron", "Alafaya", "Alameda", "Albany", "Albuquerque", "Alexandria", "Alhambra", "Aliso Viejo", "Allen", "Allentown", "Aloha", "Alpharetta", "Altadena", "Altamonte Springs", "Altoona", "Amarillo", "Ames", "Anaheim", "Anchorage", "Anderson", "Ankeny", "Ann Arbor", "Annandale", "Antelope", "Antioch", "Apex", "Apopka", "Apple Valley", "Appleton", "Arcadia", "Arden-Arcade", "Arecibo", "Arlington", "Arlington Heights", "Arvada", "Ashburn", "Asheville", "Aspen Hill", "Atascocita", "Athens-Clarke County", "Atlanta", "Attleboro", "Auburn", "Augusta-Richmond County", "Aurora", "Austin", "Avondale", "Azusa", "Bakersfield", "Baldwin Park", "Baltimore", "Barnstable Town", "Bartlett", "Baton Rouge", "Battle Creek", "Bayamon", "Bayonne", "Baytown", "Beaumont", "Beavercreek", "Beaverton", "Bedford", "Bel Air South", "Bell Gardens", "Belleville", "Bellevue", "Bellflower", "Bellingham", "Bend", "Bentonville", "Berkeley", "Berwyn", "Bethesda", "Bethlehem", "Billings", "Biloxi", "Binghamton", "Birmingham", "Bismarck", "Blacksburg", "Blaine", "Bloomington", "Blue Springs", "Boca Raton", "Boise City", "Bolingbrook", "Bonita Springs", "Bossier City", "Boston", "Bothell", "Boulder", "Bountiful", "Bowie", "Bowling Green", "Boynton Beach", "Bozeman", "Bradenton", "Brandon", "Brentwood", "Bridgeport", "Bristol", "Brockton", "Broken Arrow", "Brookhaven", "Brookline", "Brooklyn Park", "Broomfield", "Brownsville", "Bryan", "Buckeye", "Buena Park", "Buffalo", "Buffalo Grove", "Burbank", "Burien", "Burke", "Burleson", "Burlington", "Burnsville", "Caguas", "Caldwell", "Camarillo", "Cambridge", "Camden", "Canton", "Cape Coral", "Carlsbad", "Carmel", "Carmichael", "Carolina", "Carrollton", "Carson", "Carson City", "Cary", "Casa Grande", "Casas Adobes", "Casper", "Castle Rock", "Castro Valley", "Catalina Foothills", "Cathedral City", "Catonsville", "Cedar Hill", "Cedar Park", "Cedar Rapids", "Centennial", "Centreville", "Ceres", "Cerritos", "Champaign", "Chandler", "Chapel Hill", "Charleston", "Charlotte", "Charlottesville", "Chattanooga", "Cheektowaga", "Chesapeake", "Chesterfield", "Cheyenne", "Chicago", "Chico", "Chicopee", "Chino", "Chino Hills", "Chula Vista", "Cicero", "Cincinnati", "Citrus Heights", "Clarksville", "Clearwater", "Cleveland", "Cleveland Heights", "Clifton", "Clovis", "Coachella", "Coconut Creek", "Coeur d'Alene", "College Station", "Collierville", "Colorado Springs", "Colton", "Columbia", "Columbus", "Commerce City", "Compton", "Concord", "Conroe", "Conway", "Coon Rapids", "Coral Gables", "Coral Springs", "Corona", "Corpus Christi", "Corvallis", "Costa Mesa", "Council Bluffs", "Country Club", "Covina", "Cranston", "Cupertino", "Cutler Bay", "Cuyahoga Falls", "Cypress", "Dale City", "Dallas", "Daly City", "Danbury", "Danville", "Davenport", "Davie", "Davis", "Dayton", "Daytona Beach", "DeKalb", "DeSoto", "Dearborn", "Dearborn Heights", "Decatur", "Deerfield Beach", "Delano", "Delray Beach", "Deltona", "Denton", "Denver", "Des Moines", "Des Plaines", "Detroit", "Diamond Bar", "Doral", "Dothan", "Downers Grove", "Downey", "Draper", "Dublin", "Dubuque", "Duluth", "Dundalk", "Dunwoody", "Durham", "Eagan", "East Hartford", "East Honolulu", "East Lansing", "East Los Angeles", "East Orange", "East Providence", "Eastvale", "Eau Claire", "Eden Prairie", "Edina", "Edinburg", "Edmond", "El Cajon", "El Centro", "El Dorado Hills", "El Monte", "El Paso", "Elgin", "Elizabeth", "Elk Grove", "Elkhart", "Ellicott City", "Elmhurst", "Elyria", "Encinitas", "Enid", "Enterprise", "Erie", "Escondido", "Euclid", "Eugene", "Euless", "Evanston", "Evansville", "Everett", "Fairfield", "Fall River", "Fargo", "Farmington", "Farmington Hills", "Fayetteville", "Federal Way", "Findlay", "Fishers", "Flagstaff", "Flint", "Florence-Graham", "Florin", "Florissant", "Flower Mound", "Folsom", "Fond du Lac", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Myers", "Fort Pierce", "Fort Smith", "Fort Wayne", "Fort Worth", "Fountain Valley", "Fountainebleau", "Framingham", "Franklin", "Frederick", "Freeport", "Fremont", "Fresno", "Frisco", "Fullerton", "Gainesville", "Gaithersburg", "Galveston", "Garden Grove", "Gardena", "Garland", "Gary", "Gastonia", "Georgetown", "Germantown", "Gilbert", "Gilroy", "Glen Burnie", "Glendale", "Glendora", "Glenview", "Goodyear", "Grand Forks", "Grand Island", "Grand Junction", "Grand Prairie", "Grand Rapids", "Grapevine", "Great Falls", "Greeley", "Green Bay", "Greensboro", "Greenville", "Greenwood", "Gresham", "Guaynabo", "Gulfport", "Hacienda Heights", "Hackensack", "Haltom City", "Hamilton", "Hammond", "Hampton", "Hanford", "Harlingen", "Harrisburg", "Harrisonburg", "Hartford", "Hattiesburg", "Haverhill", "Hawthorne", "Hayward", "Hemet", "Hempstead", "Henderson", "Hendersonville", "Hesperia", "Hialeah", "Hicksville", "High Point", "Highland", "Highlands Ranch", "Hillsboro", "Hilo", "Hoboken", "Hoffman Estates", "Hollywood", "Homestead", "Honolulu", "Hoover", "Houston", "Huntersville", "Huntington", "Huntington Beach", "Huntington Park", "Huntsville", "Hutchinson", "Idaho Falls", "Independence", "Indianapolis", "Indio", "Inglewood", "Iowa City", "Irondequoit", "Irvine", "Irving", "Jackson", "Jacksonville", "Janesville", "Jefferson City", "Jeffersonville", "Jersey City", "Johns Creek", "Johnson City", "Joliet", "Jonesboro", "Joplin", "Jupiter", "Jurupa Valley", "Kalamazoo", "Kannapolis", "Kansas City", "Kearny", "Keller", "Kendale Lakes", "Kendall", "Kenner", "Kennewick", "Kenosha", "Kent", "Kentwood", "Kettering", "Killeen", "Kingsport", "Kirkland", "Kissimmee", "Knoxville", "Kokomo", "La Crosse", "La Habra", "La Mesa", "La Mirada", "Lacey", "Lafayette", "Laguna Niguel", "Lake Charles", "Lake Elsinore", "Lake Forest", "Lake Havasu City", "Lake Ridge", "Lakeland", "Lakeville", "Lakewood", "Lancaster", "Lansing", "Laredo", "Largo", "Las Cruces", "Las Vegas", "Lauderhill", "Lawrence", "Lawton", "Layton", "League City", "Lee's Summit", "Leesburg", "Lehi", "Lehigh Acres", "Lenexa", "Levittown", "Lewisville", "Lexington-Fayette", "Lincoln", "Linden", "Little Rock", "Littleton", "Livermore", "Livonia", "Lodi", "Logan", "Lombard", "Lompoc", "Long Beach", "Longmont", "Longview", "Lorain", "Los Angeles", "Louisville/Jefferson County", "Loveland", "Lowell", "Lubbock", "Lynchburg", "Lynn", "Lynwood", "Macon-Bibb County", "Madera", "Madison", "Malden", "Manchester", "Manhattan", "Mansfield", "Manteca", "Maple Grove", "Margate", "Maricopa", "Marietta", "Marysville", "Mayaguez", "McAllen", "McKinney", "McLean", "Medford", "Melbourne", "Memphis", "Menifee", "Mentor", "Merced", "Meriden", "Meridian", "Mesa", "Mesquite", "Metairie", "Methuen Town", "Miami", "Miami Beach", "Miami Gardens", "Middletown", "Midland", "Midwest City", "Milford", "Millcreek", "Milpitas", "Milwaukee", "Minneapolis", "Minnetonka", "Minot", "Miramar", "Mishawaka", "Mission", "Mission Viejo", "Missoula", "Missouri City", "Mobile", "Modesto", "Moline", "Monroe", "Montebello", "Monterey Park", "Montgomery", "Moore", "Moreno Valley", "Morgan Hill", "Mount Pleasant", "Mount Prospect", "Mount Vernon", "Mountain View", "Muncie", "Murfreesboro", "Murray", "Murrieta", "Nampa", "Napa", "Naperville", "Nashua", "Nashville-Davidson", "National City", "New Bedford", "New Braunfels", "New Britain", "New Brunswick", "New Haven", "New Orleans", "New Rochelle", "New York", "Newark", "Newport Beach", "Newport News", "Newton", "Niagara Falls", "Noblesville", "Norfolk", "Normal", "Norman", "North Bethesda", "North Charleston", "North Highlands", "North Las Vegas", "North Lauderdale", "North Little Rock", "North Miami", "North Miami Beach", "North Port", "North Richland Hills", "Norwalk", "Novato", "Novi", "O'Fallon", "Oak Lawn", "Oak Park", "Oakland", "Oakland Park", "Ocala", "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orland Park", "Orlando", "Oro Valley", "Oshkosh", "Overland Park", "Owensboro", "Oxnard", "Palatine", "Palm Bay", "Palm Beach Gardens", "Palm Coast", "Palm Desert", "Palm Harbor", "Palm Springs", "Palmdale", "Palo Alto", "Paradise", "Paramount", "Parker", "Parma", "Pasadena", "Pasco", "Passaic", "Paterson", "Pawtucket", "Peabody", "Pearl City", "Pearland", "Pembroke Pines", "Pensacola", "Peoria", "Perris", "Perth Amboy", "Petaluma", "Pflugerville", "Pharr", "Philadelphia", "Phoenix", "Pico Rivera", "Pine Bluff", "Pine Hills", "Pinellas Park", "Pittsburg", "Pittsburgh", "Pittsfield", "Placentia", "Plainfield", "Plano", "Plantation", "Pleasanton", "Plymouth", "Pocatello", "Poinciana", "Pomona", "Pompano Beach", "Ponce", "Pontiac", "Port Arthur", "Port Charlotte", "Port Orange", "Port St. Lucie", "Portage", "Porterville", "Portland", "Portsmouth", "Potomac", "Poway", "Providence", "Provo", "Pueblo", "Quincy", "Racine", "Raleigh", "Rancho Cordova", "Rancho Cucamonga", "Rancho Palos Verdes", "Rancho Santa Margarita", "Rapid City", "Reading", "Redding", "Redlands", "Redmond", "Redondo Beach", "Redwood City", "Reno", "Renton", "Reston", "Revere", "Rialto", "Richardson", "Richland", "Richmond", "Rio Rancho", "Riverside", "Riverton", "Riverview", "Roanoke", "Rochester", "Rochester Hills", "Rock Hill", "Rockford", "Rocklin", "Rockville", "Rockwall", "Rocky Mount", "Rogers", "Rohnert Park", "Rosemead", "Roseville", "Roswell", "Round Rock", "Rowland Heights", "Rowlett", "Royal Oak", "Sacramento", "Saginaw", "Salem", "Salina", "Salinas", "Salt Lake City", "Sammamish", "San Angelo", "San Antonio", "San Bernardino", "San Bruno", "San Buenaventura (Ventura)", "San Clemente", "San Diego", "San Francisco", "San Jacinto", "San Jose", "San Juan", "San Leandro", "San Luis Obispo", "San Marcos", "San Mateo", "San Rafael", "San Ramon", "San Tan Valley", "Sandy", "Sandy Springs", "Sanford", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Fe", "Santa Maria", "Santa Monica", "Santa Rosa", "Santee", "Sarasota", "Savannah", "Sayreville", "Schaumburg", "Schenectady", "Scottsdale", "Scranton", "Seattle", "Severn", "Shawnee", "Sheboygan", "Shoreline", "Shreveport", "Sierra Vista", "Silver Spring", "Simi Valley", "Sioux City", "Sioux Falls", "Skokie", "Smyrna", "Somerville", "South Bend", "South Gate", "South Hill", "South Jordan", "South San Francisco", "South Valley", "South Whittier", "Southaven", "Southfield", "Sparks", "Spokane", "Spokane Valley", "Spring", "Spring Hill", "Spring Valley", "Springdale", "Springfield", "St. Charles", "St. Clair Shores", "St. Cloud", "St. George", "St. Joseph", "St. Louis", "St. Louis Park", "St. Paul", "St. Peters", "St. Petersburg", "Stamford", "State College", "Sterling Heights", "Stillwater", "Stockton", "Stratford", "Strongsville", "Suffolk", "Sugar Land", "Summerville", "Sunnyvale", "Sunrise", "Sunrise Manor", "Surprise", "Syracuse", "Tacoma", "Tallahassee", "Tamarac", "Tamiami", "Tampa", "Taunton", "Taylor", "Taylorsville", "Temecula", "Tempe", "Temple", "Terre Haute", "Texas City", "The Hammocks", "The Villages", "The Woodlands", "Thornton", "Thousand Oaks", "Tigard", "Tinley Park", "Titusville", "Toledo", "Toms River", "Tonawanda", "Topeka", "Torrance", "Town 'n' Country", "Towson", "Tracy", "Trenton", "Troy", "Trujillo Alto", "Tuckahoe", "Tucson", "Tulare", "Tulsa", "Turlock", "Tuscaloosa", "Tustin", "Twin Falls", "Tyler", "Union City", "University", "Upland", "Urbana", "Urbandale", "Utica", "Vacaville", "Valdosta", "Vallejo", "Vancouver", "Victoria", "Victorville", "Vineland", "Virginia Beach", "Visalia", "Vista", "Waco", "Waipahu", "Waldorf", "Walnut Creek", "Waltham", "Warner Robins", "Warren", "Warwick", "Washington", "Waterbury", "Waterloo", "Watsonville", "Waukegan", "Waukesha", "Wauwatosa", "Wellington", "Wesley Chapel", "West Allis", "West Babylon", "West Covina", "West Des Moines", "West Hartford", "West Haven", "West Jordan", "West Lafayette", "West New York", "West Palm Beach", "West Sacramento", "West Seneca", "West Valley City", "Westfield", "Westland", "Westminster", "Weston", "Weymouth Town", "Wheaton", "White Plains", "Whittier", "Wichita", "Wichita Falls", "Wilmington", "Wilson", "Winston-Salem", "Woodbury", "Woodland", "Worcester", "Wylie", "Wyoming", "Yakima", "Yonkers", "Yorba Linda", "York", "Youngstown", "Yuba City", "Yucaipa", "Yuma"], Bi = ["{{location.city_prefix}} {{person.first_name.generic}}{{location.city_suffix}}", "{{location.city_prefix}} {{person.first_name.generic}}", "{{person.first_name.generic}}{{location.city_suffix}}", "{{person.last_name.generic}}{{location.city_suffix}}", "{{location.city_name}}"], Si = ["North", "East", "West", "South", "New", "Lake", "Port", "Fort"], vi = ["town", "ton", "land", "ville", "berg", "burgh", "boro", "borough", "bury", "view", "port", "mouth", "stad", "stead", "furt", "chester", "cester", "fort", "field", "haven", "side", "shire", "worth"], wi = ["Africa", "Antarctica", "Asia", "Australia", "Europe", "North America", "South America"], Mi = ["Afghanistan", "Aland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bonaire, Sint Eustatius and Saba", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory (Chagos Archipelago)", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czechia", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Faroe Islands", "Falkland Islands (Malvinas)", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Democratic People's Republic of Korea", "Republic of Korea", "Kuwait", "Kyrgyz Republic", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "North Macedonia", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn Islands", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Barthelemy", "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard & Jan Mayen Islands", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands, British", "Virgin Islands, U.S.", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"], Ti = ["Adams County", "Calhoun County", "Carroll County", "Clark County", "Clay County", "Crawford County", "Douglas County", "Fayette County", "Franklin County", "Grant County", "Greene County", "Hamilton County", "Hancock County", "Henry County", "Jackson County", "Jefferson County", "Johnson County", "Lake County", "Lawrence County", "Lee County", "Lincoln County", "Logan County", "Madison County", "Marion County", "Marshall County", "Monroe County", "Montgomery County", "Morgan County", "Perry County", "Pike County", "Polk County", "Scott County", "Union County", "Warren County", "Washington County", "Wayne County", "Avon", "Bedfordshire", "Berkshire", "Borders", "Buckinghamshire", "Cambridgeshire", "Central", "Cheshire", "Cleveland", "Clwyd", "Cornwall", "County Antrim", "County Armagh", "County Down", "County Fermanagh", "County Londonderry", "County Tyrone", "Cumbria", "Derbyshire", "Devon", "Dorset", "Dumfries and Galloway", "Durham", "Dyfed", "East Sussex", "Essex", "Fife", "Gloucestershire", "Grampian", "Greater Manchester", "Gwent", "Gwynedd County", "Hampshire", "Herefordshire", "Hertfordshire", "Highlands and Islands", "Humberside", "Isle of Wight", "Kent", "Lancashire", "Leicestershire", "Lincolnshire", "Lothian", "Merseyside", "Mid Glamorgan", "Norfolk", "North Yorkshire", "Northamptonshire", "Northumberland", "Nottinghamshire", "Oxfordshire", "Powys", "Rutland", "Shropshire", "Somerset", "South Glamorgan", "South Yorkshire", "Staffordshire", "Strathclyde", "Suffolk", "Surrey", "Tayside", "Tyne and Wear", "Warwickshire", "West Glamorgan", "West Midlands", "West Sussex", "West Yorkshire", "Wiltshire", "Worcestershire"], Li = { cardinal: ["North", "East", "South", "West"], cardinal_abbr: ["N", "E", "S", "W"], ordinal: ["Northeast", "Northwest", "Southeast", "Southwest"], ordinal_abbr: ["NE", "NW", "SE", "SW"] }, Ri = ["#####", "#####-####"], Pi = ["Apt. ###", "Suite ###"], Hi = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"], Gi = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"], Ni = { normal: "{{location.buildingNumber}} {{location.street}}", full: "{{location.buildingNumber}} {{location.street}} {{location.secondaryAddress}}" }, Wi = ["10th Street", "11th Street", "12th Street", "13th Street", "14th Street", "15th Street", "16th Street", "1st Avenue", "1st Street", "2nd Avenue", "2nd Street", "3rd Avenue", "3rd Street", "4th Avenue", "4th Street", "5th Avenue", "5th Street", "6th Avenue", "6th Street", "7th Avenue", "7th Street", "8th Avenue", "8th Street", "9th Street", "A Street", "Abbey Road", "Adams Avenue", "Adams Street", "Airport Road", "Albany Road", "Albert Road", "Albion Street", "Alexandra Road", "Alfred Street", "Alma Street", "Ash Close", "Ash Grove", "Ash Road", "Ash Street", "Aspen Close", "Atlantic Avenue", "Avenue Road", "Back Lane", "Baker Street", "Balmoral Road", "Barn Close", "Barton Road", "Bath Road", "Bath Street", "Bay Street", "Beach Road", "Bedford Road", "Beech Close", "Beech Drive", "Beech Grove", "Beech Road", "Beechwood Avenue", "Bell Lane", "Belmont Road", "Birch Avenue", "Birch Close", "Birch Grove", "Birch Road", "Blind Lane", "Bluebell Close", "Boundary Road", "Bramble Close", "Bramley Close", "Bridge Road", "Bridge Street", "Broad Lane", "Broad Street", "Broadway", "Broadway Avenue", "Broadway Street", "Brook Lane", "Brook Road", "Brook Street", "Brookside", "Buckingham Road", "Cambridge Street", "Canal Street", "Castle Close", "Castle Lane", "Castle Road", "Castle Street", "Cavendish Road", "Cedar Avenue", "Cedar Close", "Cedar Grove", "Cedar Road", "Cedar Street", "Cemetery Road", "Center Avenue", "Center Road", "Center Street", "Central Avenue", "Central Street", "Chapel Close", "Chapel Hill", "Chapel Road", "Chapel Street", "Charles Street", "Cherry Close", "Cherry Street", "Cherry Tree Close", "Chester Road", "Chestnut Close", "Chestnut Drive", "Chestnut Grove", "Chestnut Street", "Church Avenue", "Church Close", "Church Hill", "Church Lane", "Church Path", "Church Road", "Church Street", "Church View", "Church Walk", "Claremont Road", "Clarence Road", "Clarence Street", "Clarendon Road", "Clark Street", "Clay Lane", "Cleveland Street", "Cliff Road", "Clifton Road", "Clinton Street", "College Avenue", "College Street", "Columbia Avenue", "Commerce Street", "Commercial Road", "Commercial Street", "Common Lane", "Coronation Avenue", "Coronation Road", "County Line Road", "County Road", "Court Street", "Cow Lane", "Crescent Road", "Cromwell Road", "Cross Lane", "Cross Street", "Crown Street", "Cumberland Street", "Dale Street", "Dark Lane", "Davis Street", "Depot Street", "Derby Road", "Derwent Close", "Devonshire Road", "Division Street", "Douglas Road", "Duke Street", "E 10th Street", "E 11th Street", "E 12th Street", "E 14th Street", "E 1st Street", "E 2nd Street", "E 3rd Street", "E 4th Avenue", "E 4th Street", "E 5th Street", "E 6th Avenue", "E 6th Street", "E 7th Street", "E 8th Street", "E 9th Street", "E Bridge Street", "E Broad Street", "E Broadway", "E Broadway Street", "E Cedar Street", "E Center Street", "E Central Avenue", "E Church Street", "E Elm Street", "E Franklin Street", "E Front Street", "E Grand Avenue", "E High Street", "E Jackson Street", "E Jefferson Street", "E Main", "E Main Street", "E Maple Street", "E Market Street", "E North Street", "E Oak Street", "E Park Avenue", "E Pine Street", "E River Road", "E South Street", "E State Street", "E Union Street", "E Walnut Street", "E Washington Avenue", "E Washington Street", "E Water Street", "East Avenue", "East Road", "East Street", "Edward Street", "Elm Close", "Elm Grove", "Elm Road", "Elm Street", "Euclid Avenue", "Fairfield Road", "Farm Close", "Ferry Road", "Field Close", "Field Lane", "First Avenue", "First Street", "Fore Street", "Forest Avenue", "Forest Road", "Fourth Avenue", "Franklin Avenue", "Franklin Road", "Franklin Street", "Front Street", "Frontage Road", "Garden Close", "Garden Street", "George Street", "Gladstone Road", "Glebe Close", "Gloucester Road", "Gordon Road", "Gordon Street", "Grand Avenue", "Grange Avenue", "Grange Close", "Grange Road", "Grant Street", "Green Close", "Green Lane", "Green Street", "Greenville Road", "Greenway", "Greenwood Road", "Grove Lane", "Grove Road", "Grove Street", "Hall Lane", "Hall Street", "Harrison Avenue", "Harrison Street", "Hawthorn Avenue", "Hawthorn Close", "Hazel Close", "Hazel Grove", "Heath Road", "Heather Close", "Henry Street", "Heron Close", "Hickory Street", "High Road", "High Street", "Highfield Avenue", "Highfield Close", "Highfield Road", "Highland Avenue", "Hill Road", "Hill Street", "Hillside", "Hillside Avenue", "Hillside Close", "Hillside Road", "Holly Close", "Honeysuckle Close", "Howard Road", "Howard Street", "Jackson Avenue", "Jackson Street", "James Street", "Jefferson Avenue", "Jefferson Street", "Johnson Street", "Jubilee Close", "Juniper Close", "Kent Road", "Kestrel Close", "King Street", "King's Road", "Kingfisher Close", "Kings Highway", "Kingsway", "Laburnum Grove", "Lafayette Street", "Lake Avenue", "Lake Drive", "Lake Road", "Lake Street", "Lancaster Road", "Lansdowne Road", "Larch Close", "Laurel Close", "Lawrence Street", "Lee Street", "Liberty Street", "Lime Grove", "Lincoln Avenue", "Lincoln Highway", "Lincoln Road", "Lincoln Street", "Locust Street", "Lodge Close", "Lodge Lane", "London Road", "Long Lane", "Low Road", "Madison Avenue", "Madison Street", "Main", "Main Avenue", "Main Road", "Main Street", "Main Street E", "Main Street N", "Main Street S", "Main Street W", "Manchester Road", "Manor Close", "Manor Drive", "Manor Gardens", "Manor Road", "Manor Way", "Maple Avenue", "Maple Close", "Maple Drive", "Maple Road", "Maple Street", "Market Place", "Market Square", "Market Street", "Marlborough Road", "Marsh Lane", "Martin Luther King Boulevard", "Martin Luther King Drive", "Martin Luther King Jr Boulevard", "Mary Street", "Mayfield Road", "Meadow Close", "Meadow Drive", "Meadow Lane", "Meadow View", "Meadow Way", "Memorial Drive", "Middle Street", "Mill Close", "Mill Lane", "Mill Road", "Mill Street", "Milton Road", "Milton Street", "Monroe Street", "Moor Lane", "Moss Lane", "Mount Pleasant", "Mount Street", "Mulberry Street", "N 1st Street", "N 2nd Street", "N 3rd Street", "N 4th Street", "N 5th Street", "N 6th Street", "N 7th Street", "N 8th Street", "N 9th Street", "N Bridge Street", "N Broad Street", "N Broadway", "N Broadway Street", "N Cedar Street", "N Center Street", "N Central Avenue", "N Chestnut Street", "N Church Street", "N College Street", "N Court Street", "N Division Street", "N East Street", "N Elm Street", "N Franklin Street", "N Front Street", "N Harrison Street", "N High Street", "N Jackson Street", "N Jefferson Street", "N Lincoln Street", "N Locust Street", "N Main", "N Main Avenue", "N Main Street", "N Maple Street", "N Market Street", "N Monroe Street", "N Oak Street", "N Park Street", "N Pearl Street", "N Pine Street", "N Poplar Street", "N Railroad Street", "N State Street", "N Union Street", "N Walnut Street", "N Washington Avenue", "N Washington Street", "N Water Street", "Nelson Road", "Nelson Street", "New Lane", "New Road", "New Street", "Newton Road", "Nightingale Close", "Norfolk Road", "North Avenue", "North Lane", "North Road", "North Street", "Northfield Road", "Oak Avenue", "Oak Drive", "Oak Lane", "Oak Road", "Oak Street", "Oakfield Road", "Oaklands", "Old Lane", "Old Military Road", "Old Road", "Old State Road", "Orchard Drive", "Orchard Lane", "Orchard Road", "Orchard Street", "Oxford Road", "Oxford Street", "Park Avenue", "Park Crescent", "Park Drive", "Park Lane", "Park Place", "Park Road", "Park Street", "Park View", "Parkside", "Pearl Street", "Pennsylvania Avenue", "Pine Close", "Pine Grove", "Pine Street", "Pinfold Lane", "Pleasant Street", "Poplar Avenue", "Poplar Close", "Poplar Road", "Poplar Street", "Post Road", "Pound Lane", "Princes Street", "Princess Street", "Priory Close", "Priory Road", "Prospect Avenue", "Prospect Place", "Prospect Road", "Prospect Street", "Quarry Lane", "Quarry Road", "Queen's Road", "Railroad Avenue", "Railroad Street", "Railway Street", "Rectory Close", "Rectory Lane", "Richmond Close", "Richmond Road", "Ridge Road", "River Road", "River Street", "Riverside", "Riverside Avenue", "Riverside Drive", "Roman Road", "Roman Way", "Rowan Close", "Russell Street", "S 10th Street", "S 14th Street", "S 1st Avenue", "S 1st Street", "S 2nd Street", "S 3rd Street", "S 4th Street", "S 5th Street", "S 6th Street", "S 7th Street", "S 8th Street", "S 9th Street", "S Bridge Street", "S Broad Street", "S Broadway", "S Broadway Street", "S Center Street", "S Central Avenue", "S Chestnut Street", "S Church Street", "S College Street", "S Division Street", "S East Street", "S Elm Street", "S Franklin Street", "S Front Street", "S Grand Avenue", "S High Street", "S Jackson Street", "S Jefferson Street", "S Lincoln Street", "S Main", "S Main Avenue", "S Main Street", "S Maple Street", "S Market Street", "S Mill Street", "S Monroe Street", "S Oak Street", "S Park Street", "S Pine Street", "S Railroad Street", "S State Street", "S Union Street", "S Walnut Street", "S Washington Avenue", "S Washington Street", "S Water Street", "S West Street", "Salisbury Road", "Sandringham Road", "Sandy Lane", "School Close", "School Lane", "School Road", "School Street", "Second Avenue", "Silver Street", "Skyline Drive", "Smith Street", "Somerset Road", "South Avenue", "South Drive", "South Road", "South Street", "South View", "Spring Gardens", "Spring Street", "Springfield Close", "Springfield Road", "Spruce Street", "St Andrew's Road", "St Andrews Close", "St George's Road", "St John's Road", "St Mary's Close", "St Mary's Road", "Stanley Road", "Stanley Street", "State Avenue", "State Line Road", "State Road", "State Street", "Station Road", "Station Street", "Stoney Lane", "Sycamore Avenue", "Sycamore Close", "Sycamore Drive", "Sycamore Street", "Talbot Road", "Tennyson Road", "The Avenue", "The Beeches", "The Causeway", "The Chase", "The Coppice", "The Copse", "The Crescent", "The Croft", "The Dell", "The Drive", "The Fairway", "The Glebe", "The Grange", "The Green", "The Grove", "The Hawthorns", "The Lane", "The Laurels", "The Limes", "The Maltings", "The Meadows", "The Mews", "The Mount", "The Oaks", "The Orchard", "The Oval", "The Paddock", "The Paddocks", "The Poplars", "The Ridgeway", "The Ridings", "The Rise", "The Sidings", "The Spinney", "The Square", "The Willows", "The Woodlands", "Third Avenue", "Third Street", "Tower Road", "Trinity Road", "Tudor Close", "Union Avenue", "Union Street", "University Avenue", "University Drive", "Valley Road", "Veterans Memorial Drive", "Veterans Memorial Highway", "Vicarage Close", "Vicarage Lane", "Vicarage Road", "Victoria Place", "Victoria Road", "Victoria Street", "Vine Street", "W 10th Street", "W 11th Street", "W 12th Street", "W 14th Street", "W 1st Street", "W 2nd Street", "W 3rd Street", "W 4th Avenue", "W 4th Street", "W 5th Street", "W 6th Avenue", "W 6th Street", "W 7th Street", "W 8th Street", "W 9th Street", "W Bridge Street", "W Broad Street", "W Broadway", "W Broadway Avenue", "W Broadway Street", "W Center Street", "W Central Avenue", "W Chestnut Street", "W Church Street", "W Division Street", "W Elm Street", "W Franklin Street", "W Front Street", "W Grand Avenue", "W High Street", "W Jackson Street", "W Jefferson Street", "W Lake Street", "W Main", "W Main Street", "W Maple Street", "W Market Street", "W Monroe Street", "W North Street", "W Oak Street", "W Park Street", "W Pine Street", "W River Road", "W South Street", "W State Street", "W Union Street", "W Walnut Street", "W Washington Avenue", "W Washington Street", "Walnut Close", "Walnut Street", "Warren Close", "Warren Road", "Washington Avenue", "Washington Boulevard", "Washington Road", "Washington Street", "Water Lane", "Water Street", "Waterloo Road", "Waterside", "Watery Lane", "Waverley Road", "Well Lane", "Wellington Road", "Wellington Street", "West Avenue", "West End", "West Lane", "West Road", "West Street", "West View", "Western Avenue", "Western Road", "Westfield Road", "Westgate", "William Street", "Willow Close", "Willow Drive", "Willow Grove", "Willow Road", "Willow Street", "Windermere Road", "Windmill Close", "Windmill Lane", "Windsor Avenue", "Windsor Close", "Windsor Drive", "Wood Lane", "Wood Street", "Woodland Close", "Woodland Road", "Woodlands", "Woodlands Avenue", "Woodlands Close", "Woodlands Road", "Woodside", "Woodside Road", "Wren Close", "Yew Tree Close", "York Road", "York Street"], xi = ["{{person.first_name.generic}} {{location.street_suffix}}", "{{person.last_name.generic}} {{location.street_suffix}}", "{{location.street_name}}"], Ii = ["Alley", "Avenue", "Branch", "Bridge", "Brook", "Brooks", "Burg", "Burgs", "Bypass", "Camp", "Canyon", "Cape", "Causeway", "Center", "Centers", "Circle", "Circles", "Cliff", "Cliffs", "Club", "Common", "Corner", "Corners", "Course", "Court", "Courts", "Cove", "Coves", "Creek", "Crescent", "Crest", "Crossing", "Crossroad", "Curve", "Dale", "Dam", "Divide", "Drive", "Drives", "Estate", "Estates", "Expressway", "Extension", "Extensions", "Fall", "Falls", "Ferry", "Field", "Fields", "Flat", "Flats", "Ford", "Fords", "Forest", "Forge", "Forges", "Fork", "Forks", "Fort", "Freeway", "Garden", "Gardens", "Gateway", "Glen", "Glens", "Green", "Greens", "Grove", "Groves", "Harbor", "Harbors", "Haven", "Heights", "Highway", "Hill", "Hills", "Hollow", "Inlet", "Island", "Islands", "Isle", "Junction", "Junctions", "Key", "Keys", "Knoll", "Knolls", "Lake", "Lakes", "Land", "Landing", "Lane", "Light", "Lights", "Loaf", "Lock", "Locks", "Lodge", "Loop", "Mall", "Manor", "Manors", "Meadow", "Meadows", "Mews", "Mill", "Mills", "Mission", "Motorway", "Mount", "Mountain", "Mountains", "Neck", "Orchard", "Oval", "Overpass", "Park", "Parks", "Parkway", "Parkways", "Pass", "Passage", "Path", "Pike", "Pine", "Pines", "Place", "Plain", "Plains", "Plaza", "Point", "Points", "Port", "Ports", "Prairie", "Radial", "Ramp", "Ranch", "Rapid", "Rapids", "Rest", "Ridge", "Ridges", "River", "Road", "Roads", "Route", "Row", "Rue", "Run", "Shoal", "Shoals", "Shore", "Shores", "Skyway", "Spring", "Springs", "Spur", "Spurs", "Square", "Squares", "Station", "Stravenue", "Stream", "Street", "Streets", "Summit", "Terrace", "Throughway", "Trace", "Track", "Trafficway", "Trail", "Tunnel", "Turnpike", "Underpass", "Union", "Unions", "Valley", "Valleys", "Via", "Viaduct", "View", "Views", "Village", "Villages", "Ville", "Vista", "Walk", "Walks", "Wall", "Way", "Ways", "Well", "Wells"], Ki = { building_number: ki, city_name: Ai, city_pattern: Bi, city_prefix: Si, city_suffix: vi, continent: wi, country: Mi, county: Ti, direction: Li, postcode: Ri, secondary_address: Pi, state: Hi, state_abbr: Gi, street_address: Ni, street_name: Wi, street_pattern: xi, street_suffix: Ii }, Oi = Ki, Ji = ["a", "ab", "abbas", "abduco", "abeo", "abscido", "absconditus", "absens", "absorbeo", "absque", "abstergo", "absum", "abundans", "abutor", "accedo", "accendo", "acceptus", "accommodo", "accusamus", "accusantium", "accusator", "acer", "acerbitas", "acervus", "acidus", "acies", "acquiro", "acsi", "ad", "adamo", "adaugeo", "addo", "adduco", "ademptio", "adeo", "adeptio", "adfectus", "adfero", "adficio", "adflicto", "adhaero", "adhuc", "adicio", "adimpleo", "adinventitias", "adipisci", "adipiscor", "adiuvo", "administratio", "admiratio", "admitto", "admoneo", "admoveo", "adnuo", "adopto", "adsidue", "adstringo", "adsuesco", "adsum", "adulatio", "adulescens", "aduro", "advenio", "adversus", "advoco", "aedificium", "aeger", "aegre", "aegrotatio", "aegrus", "aeneus", "aequitas", "aequus", "aer", "aestas", "aestivus", "aestus", "aetas", "aeternus", "ager", "aggero", "aggredior", "agnitio", "agnosco", "ago", "ait", "aiunt", "alias", "alienus", "alii", "alioqui", "aliqua", "aliquam", "aliquid", "alius", "allatus", "alo", "alter", "altus", "alveus", "amaritudo", "ambitus", "ambulo", "amet", "amicitia", "amiculum", "amissio", "amita", "amitto", "amo", "amor", "amoveo", "amplexus", "amplitudo", "amplus", "ancilla", "angelus", "angulus", "angustus", "animadverto", "animi", "animus", "annus", "anser", "ante", "antea", "antepono", "antiquus", "aperiam", "aperio", "aperte", "apostolus", "apparatus", "appello", "appono", "appositus", "approbo", "apto", "aptus", "apud", "aqua", "ara", "aranea", "arbitro", "arbor", "arbustum", "arca", "arceo", "arcesso", "architecto", "arcus", "argentum", "argumentum", "arguo", "arma", "armarium", "aro", "ars", "articulus", "artificiose", "arto", "arx", "ascisco", "ascit", "asper", "asperiores", "aspernatur", "aspicio", "asporto", "assentator", "assumenda", "astrum", "at", "atavus", "ater", "atque", "atqui", "atrocitas", "atrox", "attero", "attollo", "attonbitus", "auctor", "auctus", "audacia", "audax", "audentia", "audeo", "audio", "auditor", "aufero", "aureus", "aurum", "aut", "autem", "autus", "auxilium", "avaritia", "avarus", "aveho", "averto", "baiulus", "balbus", "barba", "bardus", "basium", "beatae", "beatus", "bellicus", "bellum", "bene", "beneficium", "benevolentia", "benigne", "bestia", "bibo", "bis", "blandior", "blanditiis", "bonus", "bos", "brevis", "cado", "caecus", "caelestis", "caelum", "calamitas", "calcar", "calco", "calculus", "callide", "campana", "candidus", "canis", "canonicus", "canto", "capillus", "capio", "capitulus", "capto", "caput", "carbo", "carcer", "careo", "caries", "cariosus", "caritas", "carmen", "carpo", "carus", "casso", "caste", "casus", "catena", "caterva", "cattus", "cauda", "causa", "caute", "caveo", "cavus", "cedo", "celebrer", "celer", "celo", "cena", "cenaculum", "ceno", "censura", "centum", "cerno", "cernuus", "certe", "certus", "cervus", "cetera", "charisma", "chirographum", "cibo", "cibus", "cicuta", "cilicium", "cimentarius", "ciminatio", "cinis", "circumvenio", "cito", "civis", "civitas", "clam", "clamo", "claro", "clarus", "claudeo", "claustrum", "clementia", "clibanus", "coadunatio", "coaegresco", "coepi", "coerceo", "cogito", "cognatus", "cognomen", "cogo", "cohaero", "cohibeo", "cohors", "colligo", "collum", "colo", "color", "coma", "combibo", "comburo", "comedo", "comes", "cometes", "comis", "comitatus", "commemoro", "comminor", "commodi", "commodo", "communis", "comparo", "compello", "complectus", "compono", "comprehendo", "comptus", "conatus", "concedo", "concido", "conculco", "condico", "conduco", "confero", "confido", "conforto", "confugo", "congregatio", "conicio", "coniecto", "conitor", "coniuratio", "conor", "conqueror", "conscendo", "consectetur", "consequatur", "consequuntur", "conservo", "considero", "conspergo", "constans", "consuasor", "contabesco", "contego", "contigo", "contra", "conturbo", "conventus", "convoco", "copia", "copiose", "cornu", "corona", "corporis", "corpus", "correptius", "corrigo", "corroboro", "corrumpo", "corrupti", "coruscus", "cotidie", "crapula", "cras", "crastinus", "creator", "creber", "crebro", "credo", "creo", "creptio", "crepusculum", "cresco", "creta", "cribro", "crinis", "cruciamentum", "crudelis", "cruentus", "crur", "crustulum", "crux", "cubicularis", "cubitum", "cubo", "cui", "cuius", "culpa", "culpo", "cultellus", "cultura", "cum", "cumque", "cunabula", "cunae", "cunctatio", "cupiditas", "cupiditate", "cupio", "cuppedia", "cupressus", "cur", "cura", "curatio", "curia", "curiositas", "curis", "curo", "curriculum", "currus", "cursim", "curso", "cursus", "curto", "curtus", "curvo", "custodia", "damnatio", "damno", "dapifer", "debeo", "debilito", "debitis", "decens", "decerno", "decet", "decimus", "decipio", "decor", "decretum", "decumbo", "dedecor", "dedico", "deduco", "defaeco", "defendo", "defero", "defessus", "defetiscor", "deficio", "defleo", "defluo", "defungo", "degenero", "degero", "degusto", "deinde", "delectatio", "delectus", "delego", "deleniti", "deleo", "delibero", "delicate", "delinquo", "deludo", "demens", "demergo", "demitto", "demo", "demonstro", "demoror", "demulceo", "demum", "denego", "denique", "dens", "denuncio", "denuo", "deorsum", "depereo", "depono", "depopulo", "deporto", "depraedor", "deprecator", "deprimo", "depromo", "depulso", "deputo", "derelinquo", "derideo", "deripio", "deserunt", "desidero", "desino", "desipio", "desolo", "desparatus", "despecto", "dicta", "dignissimos", "distinctio", "dolor", "dolore", "dolorem", "doloremque", "dolores", "doloribus", "dolorum", "ducimus", "ea", "eaque", "earum", "eius", "eligendi", "enim", "eos", "error", "esse", "est", "et", "eum", "eveniet", "ex", "excepturi", "exercitationem", "expedita", "explicabo", "facere", "facilis", "fuga", "fugiat", "fugit", "harum", "hic", "id", "illo", "illum", "impedit", "in", "incidunt", "infit", "inflammatio", "inventore", "ipsa", "ipsam", "ipsum", "iste", "itaque", "iure", "iusto", "labore", "laboriosam", "laborum", "laudantium", "libero", "magnam", "magni", "maiores", "maxime", "minima", "minus", "modi", "molestiae", "molestias", "mollitia", "nam", "natus", "necessitatibus", "nemo", "neque", "nesciunt", "nihil", "nisi", "nobis", "non", "nostrum", "nulla", "numquam", "occaecati", "ocer", "odio", "odit", "officia", "officiis", "omnis", "optio", "paens", "pariatur", "patior", "patria", "patrocinor", "patruus", "pauci", "paulatim", "pauper", "pax", "peccatus", "pecco", "pecto", "pectus", "pecus", "peior", "pel", "perferendis", "perspiciatis", "placeat", "porro", "possimus", "praesentium", "provident", "quae", "quaerat", "quam", "quas", "quasi", "qui", "quia", "quibusdam", "quidem", "quis", "quisquam", "quo", "quod", "quos", "ratione", "recusandae", "reiciendis", "rem", "repellat", "repellendus", "reprehenderit", "repudiandae", "rerum", "saepe", "sapiente", "sed", "sequi", "similique", "sint", "sit", "socius", "sodalitas", "sol", "soleo", "solio", "solitudo", "solium", "sollers", "sollicito", "solum", "solus", "soluta", "solutio", "solvo", "somniculosus", "somnus", "sonitus", "sono", "sophismata", "sopor", "sordeo", "sortitus", "spargo", "speciosus", "spectaculum", "speculum", "sperno", "spero", "spes", "spiculum", "spiritus", "spoliatio", "sponte", "stabilis", "statim", "statua", "stella", "stillicidium", "stipes", "stips", "sto", "strenuus", "strues", "studio", "stultus", "suadeo", "suasoria", "sub", "subito", "subiungo", "sublime", "subnecto", "subseco", "substantia", "subvenio", "succedo", "succurro", "sufficio", "suffoco", "suffragium", "suggero", "sui", "sulum", "sum", "summa", "summisse", "summopere", "sumo", "sumptus", "sunt", "supellex", "super", "suppellex", "supplanto", "suppono", "supra", "surculus", "surgo", "sursum", "suscipio", "suscipit", "suspendo", "sustineo", "suus", "synagoga", "tabella", "tabernus", "tabesco", "tabgo", "tabula", "taceo", "tactus", "taedium", "talio", "talis", "talus", "tam", "tamdiu", "tamen", "tametsi", "tamisium", "tamquam", "tandem", "tantillus", "tantum", "tardus", "tego", "temeritas", "temperantia", "templum", "tempora", "tempore", "temporibus", "temptatio", "tempus", "tenax", "tendo", "teneo", "tener", "tenetur", "tenuis", "tenus", "tepesco", "tepidus", "ter", "terebro", "teres", "terga", "tergeo", "tergiversatio", "tergo", "tergum", "termes", "terminatio", "tero", "terra", "terreo", "territo", "terror", "tersus", "tertius", "testimonium", "texo", "textilis", "textor", "textus", "thalassinus", "theatrum", "theca", "thema", "theologus", "thermae", "thesaurus", "thesis", "thorax", "thymbra", "thymum", "tibi", "timidus", "timor", "titulus", "tolero", "tollo", "tondeo", "tonsor", "torqueo", "torrens", "tot", "totam", "totidem", "toties", "totus", "tracto", "trado", "traho", "trans", "tredecim", "tremo", "trepide", "tres", "tribuo", "tricesimus", "triduana", "tripudio", "tristis", "triumphus", "trucido", "truculenter", "tubineus", "tui", "tum", "tumultus", "tunc", "turba", "turbo", "turpis", "tutamen", "tutis", "tyrannus", "uberrime", "ubi", "ulciscor", "ullam", "ullus", "ulterius", "ultio", "ultra", "umbra", "umerus", "umquam", "una", "unde", "undique", "universe", "unus", "urbanus", "urbs", "uredo", "usitas", "usque", "ustilo", "ustulo", "usus", "ut", "uter", "uterque", "utilis", "utique", "utor", "utpote", "utrimque", "utroque", "utrum", "uxor", "vaco", "vacuus", "vado", "vae", "valde", "valens", "valeo", "valetudo", "validus", "vallum", "vapulus", "varietas", "varius", "vehemens", "vel", "velit", "velociter", "velum", "velut", "venia", "veniam", "venio", "ventito", "ventosus", "ventus", "venustas", "ver", "verbera", "verbum", "vere", "verecundia", "vereor", "vergo", "veritas", "veritatis", "vero", "versus", "verto", "verumtamen", "verus", "vesco", "vesica", "vesper", "vespillo", "vester", "vestigium", "vestrum", "vetus", "via", "vicinus", "vicissitudo", "victoria", "victus", "videlicet", "video", "viduo", "vigilo", "vigor", "vilicus", "vilis", "vilitas", "villa", "vinco", "vinculum", "vindico", "vinitor", "vinum", "vir", "virga", "virgo", "viridis", "viriliter", "virtus", "vis", "viscus", "vita", "vitae", "vitiosus", "vitium", "vito", "vivo", "vix", "vobis", "vociferor", "voco", "volaticus", "volo", "volubilis", "voluntarius", "volup", "voluptas", "voluptate", "voluptatem", "voluptates", "voluptatibus", "voluptatum", "volutabrum", "volva", "vomer", "vomica", "vomito", "vorago", "vorax", "voro", "vos", "votum", "voveo", "vox", "vulariter", "vulgaris", "vulgivagus", "vulgo", "vulgus", "vulnero", "vulnus", "vulpes", "vulticulus", "xiphias"], zi = { word: Ji }, Vi = zi, ji = { title: "English", code: "en", language: "en", endonym: "English", dir: "ltr", script: "Latn" }, Yi = ji, $i = ['"Awaken, My Love!"', "(What's The Story) Morning Glory?", "- Tragedy +", "13 Reasons Why (Season 3)", "21st Century Breakdown", "30 De Febrero", "432 Hz Deep Healing", "5-Star", "528 Hz Meditation Music", "54+1", "8 Mile", "808s & Heartbreak", "9 To 5 And Odd Jobs", "A Beautiful Lie", "A Day At The Races", "A Day Without Rain", "A Fever You Can't Sweat Out", "A Gangsta's Pain", "A Gift & A Curse", "A Hard Day's Night", "A Head Full Of Dreams", "A Kind Of Magic", "A Million Ways To Murder", "A Moment Apart", "A Song For Every Moon", "A Thousand Suns", "A Winter Romance", "ABBA", "AI YoungBoy", "AJ Tracey", "Act One", "After Hours", "Agent Provocateur", "All About You", "All I Know So Far: Setlist", "All Or Nothing", "All Out", "All Over The Place", "All Stand Together", "All The Lost Souls", "All The Things I Never Said", "All Things Must Pass", "Alleen", "Alright, Still", "Alta Suciedad", "America", "American Heartbreak", "American Teen", "And Justice For None", "Animal Songs", "Another Friday Night", "Anything Goes", "Ao Vivo Em São Paulo", "Ao Vivo No Ibirapuera", "Apricot Princess", "Aqui E Agora (Ao Vivo)", "Arcane League Of Legends", "Ardipithecus", "Aretha Now", "Around The Fur", "Arrival", "Artist 2.0", "As She Pleases", "Ascend", "Ashlyn", "Astro Lounge", "At Night, Alone.", "At. Long. Last. ASAP", "Atlas", "Audioslave", "Aura", "Austin", "Awake", "Away From The Sun", "Ayayay!", "Baby On Baby", "Back For Everything", "Back From The Edge", "Back In Black", "Back To Black", "Back To The Game", "Bad", "Bahía Ducati", "Baila", "Barbie The Album", "Battleground", "Bayou Country", "Bcos U Will Never B Free", "Be", "Be Here Now", "Beautiful Mind", "Beautiful Thugger Girls", "Beautiful Trauma", "Beauty And The Beast", "Beggars Banquet", "Being Funny In A Foreign Language", "Berlin Lebt", "Berry Is On Top", "Best White Noise For Baby Sleep - Loopable With No Fade", "Big Baby DRAM", "Bigger, Better, Faster, More!", "Billy Talent II", "Black Star Elephant", "Blackout", "Blank Face LP", "Bleach", "Blizzard Of Ozz", "Blonde", "Blood Sugar Sex Magik", "Bloom", "Blowin' Your Mind!", "Blu Celeste", "Blue", "Blue Banisters", "Blue Hawaii", "Blue Neighbourhood", "Bluebird Days", "Bobby Tarantino", "Bobby Tarantino II", "Bon Iver", "Born Pink", "Born To Run", "Brand New Eyes", "Break The Cycle", "Breakfast In America", "Breakthrough", "Brett Young", "Bridge Over Troubled Water", "Bright: The Album", "Brol", "Buds", "Buena Vista Social Club", "Built On Glass", "Bury Me At Makeout Creek", "Busyhead", "By The Way", "CB6", "CNCO", "California Sunrise", "Californication", "Call Me Irresponsible", "Calm", "Camino Palmero", "Camp", "Caracal", "Carbon Fiber Hits", "Carnival", "Carry On", "Cartel De Santa", "Certified Lover Boy", "Chaaama", "Chama Meu Nome", "Chapter 1: Snake Oil", "Chapter 2: Swamp Savant", "Chapter One", "Charlie's Angels", "Cherry Bomb", "Chief", "Chocolate Factory", "Chosen", "Chris Brown", "Christina Aguilera", "Chromatica", "Church", "City Of Evil", "Clandestino", "Clouds", "Coco", "Collision Course", "Colour Vision", "Combat Rock", "Come Around Sundown", "Come Away With Me", "Come Home The Kids Miss You", "Come What(ever) May", "Commando", "Common Sense", "Communion", "Conditions", "Confident", "Confrontation", "Control The Streets, Volume 2", "Corinne Bailey Rae", "Costello Music", "Cottonwood", "Covers, Vol. 2", "Cozy Tapes Vol. 2: Too Cozy", "Crash Talk", "Crazy Love", "Crazysexycool", "Crowded House", "Cruisin' With Junior H", "Culture", "Current Mood", "DS2", "Dale", "Danger Days: The True Lives Of The Fabulous Killjoys", "Dangerous Woman", "Dangerous: The Double Album", "Dark Horse", "Day69", "Daydream", "De Fiesta", "De Viaje", "DeAnn", "Death Race For Love", "Delirium", "Delta", "Demidevil", "Depression Cherry", "Descendants", "Desgenerados Mixtape", "Destin", "Destiny Fulfilled", "Desvelado", "Detroit 2", "Dex Meets Dexter", "Dharma", "Die A Legend", "Different World", "Dig Your Roots", "Digital Druglord", "Dirt", "Disclaimer I / II", "Discovery", "Disraeli Gears", "Disumano", "Dizzy Up The Girl", "Don't Play That Song", "Donda", "Donde Quiero Estar", "Doo-Wops & Hooligans", "Down The Way", "Dr. Feelgood", "Dream Your Life Away", "Dreaming Out Loud", "Drip Harder", "Drive", "Drones", "Dropped Outta College", "Drowning", "Dua Warna Cinta", "Dulce Beat", "Dusty In Memphis", "Dutty Rock", "Dying To Live", "ENR", "East Atlanta Love Letter", "Editorial", "Edna", "El Abayarde", "El Amor En Los Tiempos Del Perreo", "El Camino", "El Comienzo", "El Dorado", "El Karma", "El Mal Querer", "El Malo", "El Trabajo Es La Suerte", "El Viaje De Copperpot", "Electric Ladyland", "Emotion", "En Tus Planes", "Endless Summer Vacation", "Enter The Wu-Tang (36 Chambers)", "Equals (=)", "Estrella", "Euphoria", "Europop", "Evermore", "Every Kingdom", "Everyday Life", "Evolve", "Expectations", "Face Yourself", "Facelift", "Fallin'", "Fancy You", "Fantasía", "Favourite Worst Nightmare", "Fear Of The Dark", "Fearless", "Feel Something", "Feels Like Home", "Femme Fatale", "Ferxxocalipsis", "Fifty Shades Darker", "Fifty Shades Freed", "Fifty Shades Of Grey", "Final (Vol.1)", "Finding Beauty In Negative Spaces", "Fine Line", "First Impressions Of Earth", "First Steps", "Five Seconds Flat", "Folklore", "For Emma, Forever Ago", "Forajido EP 1", "Forever", "Forever Young", "Formula Of Love: O+T=<3", "Free 6lack", "Freudian", "Frozen II", "Full Moon Fever", "Funhouse", "Funk Wav Bounces Vol.1", "Future History", "FutureSex/LoveSounds", "Fuzzybrain", "Gallery", "Gangsta's Paradise", "Gemini", "Gemini Rights", "Generationwhy", "Get A Grip", "Get Up", "Gettin' Old", "Girl", "Gladiator", "Glisten", "Globalization", "Gloria", "Glory Days", "God's Project", "Gold Skies", "Golden", "Good Evening", "Good Thing", "Goodbye Yellow Brick Road", "Gossip Columns", "Got Your Six", "Graceland", "Graduation", "Grand Champ", "Grandson, Vol. 1", "Green River", "Guerra", "Ha*Ash Primera Fila - Hecho Realidad", "Haiz", "Hamilton", "Happy Endings", "Harry Styles", "Hasta La Raíz", "Hatful Of Hollow", "Head In The Clouds", "Heard It In A Past Life", "Heart Shaped World", "Heartbeat City", "Heartbreak On A Full Moon / Cuffing Season - 12 Days Of Christmas", "Heaven Or Hell", "Heaven knows", "Hellbilly Deluxe", "Hellboy", "Help!", "Her Loss", "Here Comes The Cowboy", "Hey World", "High School Musical", "High Tide In The Snake's Nest", "Historias De Un Capricornio", "Hndrxx", "Hombres G (Devuélveme A Mi Chica)", "Homerun", "Homework", "Hot Fuss", "Hot Pink", "Hot Sauce / Hello Future", "Hot Space", "Hotel Diablo", "Houses Of The Holy", "How Big, How Blue, How Beautiful", "How I'm Feeling", "How To Be Human", "How To Save A Life", "How To: Friend, Love, Freefall", "Hozier", "Human", "Huncho Jack, Jack Huncho", "Hunter Hayes", "Hysteria", "I Am...Sasha Fierce", "I Can't Handle Change", "I Met You When I Was 18. (The Playlist)", "I Never Liked You", "I Never Loved A Man The Way I Love You", "I See You", "I Think You Think Too Much Of Me", "I Used To Know Her", "I Used To Think I Could Fly", "I'm Comin' Over", "Ich & Keine Maske", "If You Can Believe Your Eyes & Ears", "Il Ballo Della Vita", "Ill Communication", "Imagination & The Misfit Kid", "Imagine", "Immortalized", "In A Perfect World...", "In Colour", "In My Own Words", "In Rainbows", "In Return", "In The Lonely Hour", "Infest", "Innuendo", "Inter Shibuya - La Mafia", "Interstellar", "Is This It", "It Was Written", "It's Not Me, It's You", "It's Only Me", "Ivory", "JackBoys", "Jamie", "Jazz", "Jibrail & Iblis", "Jordi", "Jordin Sparks", "Jose", "Just As I Am", "Just Cause Y'all Waited 2", "Just Like You", "Justified", "K-12 / After School", "K.I.D.S.", "K.O.", "K.O.B. Live", "KG0516", "KOD", "Kane Brown", "Kid A", "Kid Krow", "Kids See Ghosts", "Kids in Love", "Kinks (You Really Got Me)", "Know-It-All", "Konvicted", "Kring", "LANY", "LM5", "La Criatura", "La Flaca", "La Melodia De La Calle", "La Revolucion", "Lady Lady", "Lady Wood", "Langit Mong Bughaw", "Las Que No Iban A Salir", "Last Day Of Summer", "Last Year Was Complicated", "Layers", "Layover", "Lazarus", "Led Zeppelin", "Left Of The Middle", "Leftoverture", "Legends Never Die", "Let's Skip To The Wedding", "Let's Talk About Love", "Licensed To Ill", "Life In Cartoon Motion", "Life Thru A Lens", "Lifelines", "Like..?", "Lil Big Pac", "Lil Boat", "Lil Boat 2", "Lil Boat 3.5", "Lil Kiwi", "Lil Pump", "Limon Y Sal", "Listen Without Prejudice", "Little Voice", "Live On Red Barn Radio I & II", "Lo Que Andábamos Buscando", "Lofi Fruits Music 2021", "London Calling", "Los Campeones Del Pueblo", "Los Extraterrestres", "Los Favoritos 2", "Lost", "Lost In Love", "Loud", "Love Sick", "Love Story", "Love Stuff", "Love Yourself: Tear", "Lover", "Luca Brasi 2: Gangsta Grillz", "Lust For Life", "Luv Is Rage", "M!ssundaztood", "Ma Fleur", "Made In Lagos", "Mafia Bidness", "Magazines Or Novels", "Mainstream Sellout", "Majestic", "Make It Big", "Make Yourself", "Making Mirrors", "Mamma Mia! Here We Go Again", "Man Of The Woods", "Manic", "Me And My Gang", "Meduza", "Meet The Orphans", "Meet The Woo", "Melim", "Mellon Collie And The Infinite Sadness", "Melly vs. Melvin", "Memories...Do Not Open", "Menagerie", "Midnights", "Minecraft - Volume Alpha", "Minutes To Midnight", "Mix Pa Llorar En Tu Cuarto", "Modo Avión", "Monkey Business", "Mono.", "Montana", "Montevallo", "Moosetape", "Morning View", "Motivan2", "Moving Pictures", "Mr. Davis", "Mr. Misunderstood", "Mulan", "Mura Masa", "Music From The Edge Of Heaven", "Music Of The Sun", "My House", "My Kinda Party", "My Krazy Life", "My Liver Will Handle What My Heart Can't", "My Moment", "My Own Lane", "My Turn", "My Worlds", "Na Praia (Ao Vivo)", "Nakamura", "Nation Of Two", "Navegando", "Need You Now", "Neon Future III", "Neotheater", "Never Trust A Happy Song", "New English", "News Of The World", "Nicole", "Night & Day", "Nimmerland", "Nimrod", "Nine Track Mind", "No Angel", "No Me Pidas Perdón", "No More Drama", "No Protection", "No Strings Attached", "No Time To Die", "Nobody Is Listening", "Non Stop Erotic Cabaret", "Non-Fiction", "Northsbest", "Nostalgia", "Nostalgia, Ultra", "Notes On A Conditional Form", "Now Or Never", "O Embaixador (Ao Vivo)", "O My Heart", "OK Computer", "Ocean", "Ocean Avenue", "Ocean Eyes", "Odisea", "Oh My My", "Oh, What A Life", "On The 6", "One In A Million", "One More Light", "One Of These Nights", "Open Up And Say...Ahh!", "Ordinary Man", "Origins", "Out Of The Blue", "Over It", "OzuTochi", "PTSD", "Pa Las Baby's Y Belikeada", "Pa Que Hablen", "Pa' Luego Es Tarde", "Pa' Otro La 'O", "Pablo Honey", "Pain Is Love", "Pain Is Temporary", "Painting Pictures", "Palmen Aus Plastik 2", "Para Mi Ex", "Para Siempre", "Partners In Crime", "Pawn Shop", "Pegasus / Neon Shark VS Pegasus", "Pet Sounds", "Piece By Piece", "Pier Pressure", "Pineapple Sunrise", "Piseiro 2020 Ao Vivo", "Planet Pit", "Plans", "Play Deep", "Playa Saturno", "Por Primera Vez", "Por Vida", "Positions", "Post Human: Survival Horror", "Poster Girl", "Prazer, Eu Sou Ferrugem (Ao Vivo)", "Pretty Girls Like Trap Music", "Pretty. Odd.", "Prince Royce", "Prisma", "Prometo", "Providence", "Puberty 2", "Punisher", "Purgatory", "Purple Rain", "Que Bendición", "Queen Of The Clouds", "Quiero Volver", "R&G (Rhythm & Gangsta): The Masterpiece", "Raise!", "Ransom 2", "Rapunzel", "Rare", "Re Mida", "Ready To Die", "Realer", "Rebelde", "Reclassified", "Recovery", "Recuerden Mi Estilo", "Reggatta De Blanc", "Regulate… G Funk Era", "Reik", "Reise, Reise", "Relapse", "Relaxing Piano Lullabies And Natural Sleep Aid For Baby Sleep Music", "Religiously. The Album.", "Replay", "Results May Vary", "Revenge", "Revolve", "Revolver", "Ricky Martin", "Rien 100 Rien", "Ripcord", "Rise And Fall, Rage And Grace", "Rise Of An Empire", "Robin Hood: Prince Of Thieves", "Rock N Roll Jesus", "Romance", "Romances", "Ronan", "Royal Blood", "Rumours", "Sad Boyz 4 Life II", "San Lucas", "Santana World", "Saturation III", "Sauce Boyz", "Savage Mode", "Saxobeats", "Scarlet", "Schwarzes Herz", "Seal The Deal & Let's Boogie", "Section.80", "Segundo Romance", "Sehnsucht", "Shake The Snow Globe", "Shang-Chi And The Legend Of The Ten Rings: The Album", "Sheer Heart Attack", "Shiesty Season", "Shock Value", "Shoot For The Stars, Aim For The Moon", "Signed Sealed And Delivered", "Signos", "Silent Alarm", "Simplemente Gracias", "Sin Bandera", "Sing Me A Lullaby, My Sweet Temptation", "Sinner", "Sirio", "Sit Still, Look Pretty", "Skin", "Slowhand", "Smash", "Smithereens", "Snow Cougar", "Social Cues", "Some Girls", "Song Hits From Holiday Inn", "Songs For Dads", "Songs For The Deaf", "Songs For You, Truths For Me", "Songs In The Key Of Life", "Souled Out", "Sounds Of Silence", "Soy Como Quiero Ser", "Speak Now", "Speak Your Mind", "Speakerboxxx/The Love Below", "Spider-Man: Into The Spider-Verse", "Split Decision", "Square Up", "SremmLife", "Starboy", "Stay +", "Stay Dangerous", "Staying At Tamara's", "Steppenwolf", "Stick Season", "Still Bill", "Straight Outta Compton", "Strange Trails", "Stronger", "Suavemente", "Sublime", "Suck It and See", "Sucker", "Sueños", "Sugar", "Summer Forever", "Summer,", "Sunset Season", "Sunshine On Leith", "Surfer Rosa", "Sweet Talker", "SweetSexySavage", "System Of A Down", "TA13OO", "Talk That Talk", "Talking Heads: 77", "Tangled Up", "Tango In The Night", "Taxi Driver", "Taylor Swift", "Tell Me It's Real", "Ten", "Ten Summoner's Tales", "Terra Sem Cep (Ao Vivo)", "Terral", "Testing", "Tha Carter III", "Thank Me Later", "That's Christmas To Me", "The Academy", "The Adventures Of Bobby Ray", "The Album", "The Andy Williams Christmas Album", "The Aviary", "The Balcony", "The Battle Of Los Angeles", "The Beatles (White Album)", "The Beginning", "The Better Life", "The Big Day", "The Book", "The Breakfast Club", "The Cars", "The Colour And The Shape", "The Death Of Peace Of Mind", "The Diary Of Alicia Keys", "The Documentary", "The Emancipation Of Mimi", "The Eminem Show", "The End Of Everything", "The Final Countdown", "The Forever Story", "The Foundation", "The Goat", "The Golden Child", "The Good Parts", "The Greatest Showman: Reimagined", "The Green Trip", "The Hardest Love", "The Head And The Heart", "The Human Condition", "The Infamous", "The Lady Killer", "The Last Don II", "The Lion King", "The Lockdown Sessions", "The London Sessions", "The Lord Of The Rings: The Fellowship Of The Ring", "The Lost Boy", "The Magic Of Christmas / The Christmas Song", "The Marshall Mathers LP", "The Martin Garrix Collection", "The Melodic Blue", "The Mockingbird & The Crow", "The Pains Of Growing", "The Papercut Chronicles", "The Perfect Luv Tape", "The Pinkprint", "The Predator", "The Queen Is Dead", "The ReVe Festival: Finale", "The Rise And Fall Of Ziggy Stardust And The Spiders From Mars", "The Rising Tied", "The River", "The Stone Roses", "The Story Of Us", "The Stranger", "The Sufferer & The Witness", "The Sun's Tirade", "The Temptations Sing Smokey", "The Time Of Our Lives", "The Way It Is", "The Wonderful World Of Sam Cooke", "The Writing's On The Wall", "The Young And The Hopeless", "Therapy", "Therapy Session", "There Is More (Live)", "There Is Nothing Left To Lose", "These Things Happen", "Third Eye Blind", "This Is Me...Then", "This Unruly Mess I've Made", "Threat to Survival", "Thrill Of The Chase", "Time", "Timelezz", "To Let A Good Thing Die", "To Pimp A Butterfly", "Toast To Our Differences", "Todos Os Cantos, Vol. 1 (Ao Vivo)", "Too Hard", "Torches X", "Total Xanarchy", "Toto IV", "Toulouse Street", "Tourist History", "Toxicity", "Tragic Kingdom", "Tranquility Base Hotel & Casino", "Traumazine", "Traveler", "Tres Hombres", "Trip At Knight", "Tron: Legacy", "True Blue", "True Colors", "Trustfall", "Tu Veneno Mortal", "Tudo Em Paz", "Ubuntu", "Ugly Is Beautiful", "Ultra 2021", "Una Mattina", "Unbroken", "Uncovered", "Under Pressure", "Unsponsored Content", "Unstoppable", "Unwritten", "Urban Flora", "Urban Hymns", "Use Your Illusion I", "Veneer", "Versions Of Me", "Vibes", "Vice Versa", "Vices & Virtues", "Victory", "Vida", "Viejo Marihuano", "Visualízate", "Walk Away", "Walk Me Home...", "Watch The Throne", "Wave", "We Broke The Rules", "We Love You Tecca", "We Love You Tecca 2", "Weezer (Green Album)", "Welcome To The Madhouse", "Westlife", "What A Time To Be Alive", "What Do You Think About The Car?", "What Is Love?", "What Makes You Country", "What Separates Me From You", "What You See Is What You Get / What You See Ain't Always What You Get", "When It's Dark Out", "When We All Fall Asleep, Where Do We Go?", "Where The Light Is", "While The World Was Burning", "White Pony", "Whitney", "Who Really Cares", "Who You Are", "Who's Next", "Wide Open", "Wilder Mind", "Wildfire", "Willy And The Poor Boys", "Wings / You Never Walk Alone", "Wish", "Wish You Were Here", "Without Warning", "Wonder", "X&Y", "XOXO", "Y Que Quede Claro", "YBN: The Mixtape", "Yo Creo", "You Will Regret", "Youngblood", "Younger Now", "Youth"], Ui = ["$NOT", "$uicideboy$", "(G)I-DLE", "*NSYNC", "2 Chainz", "21 Savage", "6LACK", "? & The Mysterians", "A Boogie Wit da Hoodie", "A Taste of Honey", "A Tribe Called Quest", "A-Ha", "ABBA", "AC/DC", "AJ Tracey", "ATEEZ", "Ace of Base", "Adele", "Ado", "Aerosmith", "Agust D", "Aitana", "Al Dexter & his Troopers", "Al Green", "Al Jolson", "Al Martino", "Alan Jackson", "Alannah Myles", "Alec Benjamin", "Alejandro Sanz", "Alesso", "Alfredo Olivas", "Ali Gatie", "Alice In Chains", "Alina Baraz", "All Time Low", "All-4-One", "All-American Rejects", "Alok", "America", "American Quartet", "Amii Stewart", "Amitabh Bhattacharya", "Ana Castela", "Anderson .Paak", "Andy Grammer", "Angus & Julia Stone", "Anirudh Ravichander", "Anita Ward", "Anitta", "Anton Karas", "Anuel AA", "Arcade Fire", "Archie Bell & The Drells", "Archies", "Aretha Franklin", "Arizona Zervas", "Armin van Buuren", "Arthur Conley", "Artie Shaw", "Asake", "Asees Kaur", "Association", "Atif Aslam", "Audioslave", "Aventura", "Avril Lavigne", "Aya Nakamura", "B J Thomas", "B.o.B", "BLACKPINK", "BONES", "BROCKHAMPTON", "BTS", "Baby Keem", "Bachman-Turner Overdrive", "Backstreet Boys", "Bad Bunny", "Badshah", "Bailey Zimmerman", "Banda El Recodo", "Barbra Streisand", "Barry White", "Bazzi", "Bebe Rexha", "Becky G", "Becky Hill", "Bee Gees", "Ben Bernie", "Ben Howard", "Ben Selvin", "Berlin", "Bessie Smith", "Bethel Music", "Bette Midler", "Beyonce", "Bibi Blocksberg", "Bibi und Tina", "BigXthaPlug", "Bill Doggett", "Bill Haley & his Comets", "Bill Withers", "Billy Davis Jr", "Billy Joel", "Billy Paul", "Billy Preston", "Billy Swan", "Birdy", "Bizarrap", "Blake Shelton", "Blur", "Bob Marley & The Wailers", "Bob Seger", "Bobby Darin", "Bobby Lewis", "Bobby McFerrin", "Bobby Vinton", "Boney M.", "Bonez MC", "Bonnie Tyler", "Booba", "Boston", "BoyWithUke", "Boyce Avenue", "Bradley Cooper", "Bread", "Brent Faiyaz", "Brett Young", "Bring Me The Horizon", "Britney Spears", "Brooks & Dunn", "Bruce Channel", "Bruno & Marrone", "Bryan Adams", "Bryce Vine", "Buddy Holly", "Burna Boy", "C. Tangana", "CKay", "CRO", "Camilo", "Capital Bra", "Captain & Tennille", "Cardi B", "Carin Leon", "Carlos Vives", "Carly Simon", "Carpenters", "Cavetown", "Celine Dion", "Central Cee", "Chaka Khan", "Champs", "Charlie Rich", "Chayanne", "Cheat Codes", "Cher", "Chic", "Chicago", "Chris Brown", "Chris Isaak", "Chris Young", "Christina Aguilera", "Christina Perri", "Christopher Cross", "Chuck Berry", "Ciara", "Cigarettes After Sex", "Cliff Edwards (Ukelele Ike)", "Cody Johnson", "Colbie Caillat", "Colby O'Donis", "Cole Swindell", "Coleman Hawkins", "Contours", "Coolio", "Count Basie", "Cris Mj", "Culture Club", "Cyndi Lauper", "D-Block Europe", "DAY6", "DJ Khaled", "DJ Luian", "DJ Nelson", "DMX", "DNCE", "DaVido", "Dadju", "Daft Punk", "Dan + Shay", "Daniel Powter", "Danny Ocean", "Darius Rucker", "Dave", "David Bowie", "David Guetta", "Daya", "Dean Martin", "Deee-Lite", "Deep Purple", "Deftones", "Demi Lovato", "Dennis Lloyd", "Denzel Curry", "Dermot Kennedy", "Desiigner", "Devo", "Dewa 19", "Dexys Midnight Runners", "Diddy", "Dido", "Die drei !!!", "Diego & Victor Hugo", "Diljit Dosanjh", "Dimitri Vegas & Like Mike", "Dinah Shore", "Dionne Warwick", "Dire Straits", "Disclosure", "Dixie Cups", "Doja Cat", "Dolly Parton", "Don Diablo", "Don Henley", "Don McLean", "Don Omar", "Donna Summer", "Donovan", "Dr. Dre", "Drake", "Dreamville", "Dua Lipa", "EMF", "ENHYPEN", "Earth, Wind & Fire", "Ed Sheeran", "Eddie Cantor", "Eddie Cochran", "Eddy Howard", "Edgar Winter Group", "Edwin Hawkins Singers", "Edwin Starr", "El Alfa", "Eladio Carrion", "Electric Light Orchestra", "Elevation Worship", "Ella Henderson", "Ellie Goulding", "Elton John", "Elvis Presley", "Empire of the Sun", "En Vogue", "Enrique Iglesias", "Eslabon Armado", "Ethel Waters", "Etta James", "Evanescence", "Exile", "Extreme", "Faith Hill", "Fall Out Boy", "Fanny Brice", "Farruko", "Fats Domino", "Fats Waller", "Feid", "Felix Jaehn", "Fergie", "Fetty Wap", "Fiersa Besari", "Fifth Harmony", "Fine Young Cannibals", "Five Finger Death Punch", "Fleetwood Mac", "Flo-Rida", "Florence + The Machine", "Flume", "Foo Fighters", "Foreigner", "Foster The People", "Four Aces", "Frank Ocean", "Frank Sinatra", "Frankie Avalon", "Frankie Valli", "Fred Astaire", "Freda Payne", "Freddie Dredd", "Freddy Fender", "French Montana", "Fuerza Regida", "Fujii Kaze", "Future", "G-Eazy", "Garfunkel and Oates", "Gary Lewis & The Playboys", "Gary Numan", "Gene Autry", "Gene Chandler", "Gene Vincent", "George Michael", "George Strait", "Gera MX", "Ghost", "Ghostemane", "Gigi D'Agostino", "Gladys Knight & The Pips", "Glass Animals", "Glee Cast", "Gloria Gaynor", "Godsmack", "Gorillaz", "Gotye", "Grand Funk Railroad", "Green Day", "Grouplove", "Grupo Firme", "Grupo Marca Registrada", "Gryffin", "Gucci Mane", "Guess Who", "Gunna", "Gusttavo Lima", "Guy Mitchell", "Gwen Stefani", "Gzuz", "H.E.R.", "HARDY", "Hailee Steinfeld", "Halsey", "Hans Zimmer", "Harris Jayaraj", "Harry Chapin", "Harry James", "Harry Nilsson", "Harry Styles", "Hayley Williams", "Herb Alpert", "Herman's Hermits", "Hillsong UNITED", "Hillsong Worship", "Hollywood Undead", "Honey Cone", "Hoobastank", "Hues Corporation", "I Prevail", "ITZY", "IVE", "Ice Cube", "Ice Spice", "Iggy Azalea", "Imagine Dragons", "Incubus", "Internet Money", "Isaac Hayes", "J Geils Band", "J. Cole", "JAY-Z", "JJ Lin", "JP Saxe", "JVKE", "Jack Harlow", "Jack Johnson", "Jackie Wilson", "Jacquees", "James Arthur", "James Brown", "James TW", "James Taylor", "Jamie Foxx", "Janet Jackson", "Janis Joplin", "Jason Aldean", "Jason Mraz", "Jay Chou", "Jay Sean", "Jay Wheeler", "Jaymes Young", "Jean Knight", "Jeezy", "Jennifer Lopez", "Jennifer Warnes", "Jeremih", "Jeremy Zucker", "Jerry Lee Lewis", "Jerry Murad's Harmonicats", "Jess Glynne", "Jessie J", "Jewel", "Jimi Hendrix", "Jimin", "Jimmie Rodgers", "Jimmy Dean", "Jo Stafford", "Joan Jett & The Blackhearts", "Joao Gilberto", "Joel Corry", "John Fred & The Playboy Band", "John Legend", "John Mayer", "John Williams", "Johnnie Ray", "Johnnie Taylor", "Johnny Cash", "Johnny Horton", "Johnny Mathis", "Johnny Mercer", "Johnny Nash", "Joji", "Jon Bellion", "Jonas Blue", "Jonas Brothers", "Joni James", "Jorja Smith", "Juan Gabriel", "Juan Luis Guerra 4.40", "Juanes", "Juice Newton", "Julia Michaels", "Justin Bieber", "Justin Quiles", "KALEO", "KAROL G", "KAYTRANADA", "KK", "KSI", "KYLE", "Kacey Musgraves", "Kane Brown", "Kanye West", "Karan Aujla", "Kate Smith", "Katy Perry", "Kay Kyser", "Ke$ha", "Kehlani", "Kelly Clarkson", "Kenny Chesney", "Kenny Loggins", "Kenny Rogers", "Kenshi Yonezu", "Kenya Grace", "Kevin Gates", "Key Glock", "Khalid", "Kim Carnes", "Kim Petras", "Kimbra", "Kina", "King Gnu", "Kings of Leon", "Kingsmen", "Kitty Kallen", "Kodak Black", "Kodaline", "Kollegah", "Kool & The Gang", "Kungs", "Kygo", "Kylie Minogue", "LE SSERAFIM", "LISA", "LMFAO", "LUDMILLA", "La Adictiva Banda San José de Mesillas", "La Oreja de Van Gogh", "Labrinth", "Lady Antebellum", "Lady GaGa", "Lainey Wilson", "Lana Del Rey", "Latto", "Lauryn Hill", "Lauv", "League of Legends", "Lee Brice", "Leon Bridges", "Leona Lewis", "Lesley Gore", "Leslie Odom Jr.", "Liam Payne", "Lifehouse", "Lil Baby", "Lil Dicky", "Lil Durk", "Lil Mosey", "Lil Nas X", "Lil Pump", "Lil Skies", "Lil Tjay", "Lil Uzi Vert", "Lil Yachty", "Lil' Kim", "Lil' Wayne", "Lin-Manuel Miranda", "Linkin Park", "Lionel Richie", "Lipps Inc", "Lisa Loeb", "Little Peggy March", "Little Richard", "Lofi Fruits Music", "Lord Huron", "Los Del Rio", "Los Dos Carnales", "Los Lobos", "Los Temerarios", "Los Tigres Del Norte", "Los Tucanes De Tijuana", "Lou Reed", "Loud Luxury", "Louis Jordan", "Louis Tomlinson", "Love Unlimited", "Lovin' Spoonful", "Luan Santana", "Luciano", "Luis Miguel", "Luis R Conriquez", "Lulu", "Lunay", "Lupe Fiasco", "M", "MAX", "MC Hammer", "MC Ryan SP", "MKTO", "Mabel", "Machine Gun Kelly", "Madison Beer", "Madonna", "Mahalini", "Major Lazer", "Mambo Kingz", "Maneskin", "Marco Antonio Solís", "Margaret Whiting", "Maria Becerra", "Mario", "Mario Lanza", "Mark Ronson", "Maroon 5", "Marshmello", "Martin Garrix", "Mary Ford", "Mary J Blige", "Mary J. Blige", "Mary Wells", "Matoma", "Mau y Ricky", "Meek Mill", "Megadeth", "Melanie", "Melanie Martinez", "Melendi", "Men At Work", "Metro Boomin", "Michael Bublé", "Michael Jackson", "Michael McDonald", "Michael Sembello", "Miguel", "Mike Posner", "Miley Cyrus", "Milky Chance", "Minnie Riperton", "Miracle Tones", "Miranda Lambert", "Mohit Chauhan", "Mon Laferte", "Moneybagg Yo", "Monsta X", "Mora", "Morad", "Morat", "Mother Mother", "Motley Crue", "Ms. Lauryn Hill", "Mumford & Sons", "Muse", "Mya", "Myke Towers", "NCT 127", "NCT DREAM", "NEFFEX", "Nadin Amizah", "Nancy Sinatra", "Nat King Cole", "Nate Smith", "Natti Natasha", "Nayer", "Neil Diamond", "Neil Sedaka", "Nekfeu", "Nelly", "New Vaudeville Band", "Next", "Nickelback", "Nicki Minaj", "Nicki Nicole", "Nicky Jam", "Nina Simone", "Ninho", "Nipsey Hussle", "Nirvana", "Niska", "No Doubt", "Norah Jones", "Normani", "OMI", "ONE OK ROCK", "Oasis", "Official HIGE DANdism", "Offset", "Old Dominion", "Oliver Heldens", "Olivia Rodrigo", "Omah Lay", "One Direction", "Otis Redding", "OutKast", "Owl City", "P Diddy", "P!nk", "PLK", "PNL", "Pamungkas", "Passenger", "Pat Boone", "Patsy Cline", "Patti LaBelle", "Patti Page", "Paul & Paula", "Paul Revere & the Raiders", "Paul Robeson", "Paul Russell", "Paul Whiteman", "Paula Abdul", "Peaches & Herb", "Pearl Jam", "Pee Wee Hunt", "Pee Wee King", "Pentatonix", "Percy Faith", "Percy Sledge", "Peso Pluma", "Peter Cetera", "Peter Gabriel", "Peter, Paul & Mary", "Pharrell Williams", "Pierce The Veil", "Pineapple StormTv", "Pink Floyd", "Pink Sweat$", "Piso 21", "Pitbull", "Plan B", "Player", "Polo G", "Pop Smoke", "Portugal. The Man", "Pouya", "Prince", "Prince Royce", "Pusha T", "Quality Control", "Queen", "Quinn XCII", "R. Kelly", "RAF Camora", "RAYE", "REM", "REO Speedwagon", "Radiohead", "Rag'n'Bone Man", "Rage Against The Machine", "Rahat Fateh Ali Khan", "Rainbow Kitten Surprise", "Rammstein", "Rauw Alejandro", "Ray Charles", "Ray Parker Jr", "Ray Stevens", "Red Foley", "Red Hot Chili Peppers", "Red Velvet", "Regard", "Regina Belle", "Reik", "Rels B", "Rema", "Ricardo Arjona", "Rich The Kid", "Rick Astley", "Rick Dees & his Cast of Idiots", "Rick Ross", "Rick Springfield", "Ricky Martin", "Ricky Nelson", "Rihanna", "Rita Ora", "Ritchie Valens", "Rizky Febian", "Rob Thomas", "Roberta Flack", "Robin Schulz", "Robin Thicke", "Rod Stewart", "Rod Wave", "Roddy Ricch", "Roger Miller", "Romeo Santos", "Rosemary Clooney", "Roxette", "Roy Acuff", "Roy Orbison", "Rudimental", "Ruel", "Ruth B.", "Ryan Lewis", "SCH", "SEVENTEEN", "SWV", "Sabaton", "Sabrina Carpenter", "Sachet Tandon", "Sachin-Jigar", "Sade", "Sam Cooke", "Sam Feldt", "Sam Hunt", "Sam Smith", "Sam The Sham & The Pharaohs", "Sammy Davis Jr", "Sammy Kaye", "Santana", "Sasha Alex Sloan", "Savage Garden", "Saweetie", "Scorpions", "Sean Kingston", "Sean Paul", "Sebastian Yatra", "Sech", "Seeb", "Sezen Aksu", "Sfera Ebbasta", "Shaggy", "Shania Twain", "Shawn Mendes", "Sheena Easton", "Shinedown", "Shubh", "Sia", "Sid Sriram", "Sidhu Moose Wala", "Silk", "Silver Convention", "Simon & Garfunkel", "Sinead O'Connor", "Sir Mix-a-Lot", "Sister Sledge", "Ski Mask The Slump God", "Skillet", "Skrillex", "Sleeping At Last", "Smokey Robinson", "Snoop Dogg", "Snow Patrol", "Soda Stereo", "Sonu Nigam", "Sophie Ellis-Bextor", "Spencer Davis Group", "Spice Girls", "Stan Getz", "Starland Vocal Band", "Stephen Sanchez", "Steve Aoki", "Steve Lacy", "Steve Winwood", "Stevie B", "Sting", "Stormzy", "Strawberry Alarm Clock", "Stray Kids", "Stromae", "Sublime", "Sum 41", "Summer Walker", "Supertramp", "Survivor", "Swedish House Mafia", "System Of A Down", "T-Pain", "T.I.", "TAEYEON", "TKKG", "TLC", "TOMORROW X TOGETHER", "TOTO", "TWICE", "Tag Team", "Tainy", "Tammi Terrell", "Tanishk Bagchi", "Tate McRae", "Taylor Swift", "Tears For Fears", "Tems", "Tennessee Ernie Ford", "Terence Trent D'Arby", "Teresa Brewer", "Terry Jacks", "The Ames Brothers", "The Animals", "The B52s", "The Bangles", "The Beatles", "The Black Eyed Peas", "The Black Keys", "The Box Tops", "The Chainsmokers", "The Chiffons", "The Chordettes", "The Clash", "The Coasters", "The Commodores", "The Cowsills", "The Cranberries", "The Crew-Cuts", "The Cure", "The Detroit Spinners", "The Diamonds", "The Doobie Brothers", "The Doors", "The Drifters", "The Emotions", "The Eurythmics", "The Fireballs", "The Flamingos", "The Foundations", "The Four Seasons", "The Fray", "The Game", "The Go Gos", "The Goo Goo Dolls", "The Head And The Heart", "The Hollies", "The Ink Spots", "The Isley Brothers", "The Jackson 5", "The Kid LAROI", "The Killers", "The Kingston Trio", "The Kooks", "The Lemon Pipers", "The Living Tombstone", "The Lumineers", "The Mamas & The Papas", "The Marvelettes", "The McCoys", "The Mills Brothers", "The Miracles", "The Monkees", "The Moody Blues", "The National", "The Neighbourhood", "The Notorious B.I.G.", "The O'Jays", "The Offspring", "The Osmonds", "The Partridge Family", "The Penguins", "The Pet Shop Boys", "The Platters", "The Righteous Brothers", "The Rolling Stones", "The Ronettes", "The Score", "The Script", "The Seekers", "The Shangri-Las", "The Smashing Pumpkins", "The Staple Singers", "The Strokes", "The Supremes", "The Temptations", "The Turtles", "The Vamps", "The Verve", "The Village People", "The Weavers", "The White Stripes", "The Young Rascals", "The Zombies", "Thelma Houston", "Thomas Rhett", "Three Days Grace", "Three Dog Night", "Three Man Down", "Timbaland", "Timmy Trumpet", "Toby Keith", "Tom Jones", "Tom Petty and the Heartbreakers", "Tommy Dorsey", "Tommy Edwards", "Tommy James & the Shondells", "Tone Loc", "Toni Braxton", "Topic", "Tory Lanez", "Tove Lo", "Trevor Daniel", "Trey Songz", "Trippie Redd", "Trueno", "Tulsi Kumar", "Tulus", "Twenty One Pilots", "Two Feet", "Ty Dolla $ign", "Tyga", "Tyler Hubbard", "U2", "UB40", "UZI", "Ufo361", "Upchurch", "V", "Vampire Weekend", "Van McCoy", "Van Morrison", "Vance Joy", "Vanessa Carlton", "Vanessa Williams", "Vera Lynn", "Vernon Dalhart", "Vicente Fernandez", "Vishal-Shekhar", "Volbeat", "WILLOW", "Wale", "Wallows", "Weezer", "Wham!", "Whitney Houston", "Why Don't We", "Wilbert Harrison", "Wilson Phillips", "Wiz Khalifa", "Woody Guthrie", "Wyclef Jean", "XXXTENTACION", "Xavi", "YG", "YNW Melly", "YOASOBI", "Yandel", "Years & Years", "Yeat", "Yo Gotti", "Young Dolph", "Young Miko", "Young Thug", "YoungBoy Never Broke Again", "Yung Gravy", "Yuuri", "Yuvan Shankar Raja", "ZAYN", "ZZ Top", "Zac Brown Band", "Zach Bryan", "Zara Larsson", "aespa", "benny blanco", "blink-182", "d4vd", "deadmau5", "girl in red", "gnash", "iann dior", "will.i.am"], _i = ["Acid House", "Acid Jazz", "Acid Rock", "Acoustic", "Acoustic Blues", "Afro-Pop", "Afrobeat", "Alt-Rock", "Alternative", "Ambient", "American Trad Rock", "Americana", "Anime", "Arena Rock", "Art-Rock", "Avant-Garde", "Avant-Punk", "Baladas y Boleros", "Barbershop", "Baroque", "Bebop", "Big Band", "Black Metal", "Blue Note", "Bluegrass", "Blues", "Boogaloo", "Bop", "Bossa Nova", "Bounce", "Brazilian Funk", "Breakbeat", "Britpop", "CCM", "Cajun", "Cantopop", "Celtic", "Celtic Folk", "Chamber Music", "Chant", "Chanukah", "Chicago Blues", "Chicago House", "Chicano", "Children’s Music", "Chill", "Choral", "Christian", "Christmas", "Classical", "Club", "College Rock", "Conjunto", "Cool Jazz", "Country", "Crunk", "Dance", "Dancehall", "Death Metal", "Deep House", "Delta Blues", "Detroit Techno", "Dirty South", "Disco", "Disney", "Dixieland", "Doo-wop", "Downtempo", "Dream Pop", "Drill", "Drinking Songs", "Drone", "Drum'n'bass", "Dub", "Dubstep", "EDM", "Early Music", "East Coast Rap", "Easter", "Easy Listening", "Eclectic", "Electric Blues", "Electro", "Electronic", "Electronica", "Emo", "Enka", "Environmental", "Ethio-jazz", "Experimental", "Experimental Rock", "Flamenco", "Folk", "Folk-Rock", "Forro", "French Pop", "Funk", "Fusion", "Gangsta Rap", "Garage", "German Folk", "German Pop", "Glam Rock", "Gospel", "Goth", "Grime", "Grindcore", "Groove", "Grunge", "Hair Metal", "Halloween", "Happy", "Hard Bop", "Hard Dance", "Hard Rock", "Hardcore", "Hardcore Punk", "Hardcore Rap", "Hardstyle", "Healing", "Heavy Metal", "High Classical", "Hip Hop", "Holiday", "Honky Tonk", "House", "IDM", "Impressionist", "Indie", "Industrial", "Instrumental", "J-Dance", "J-Idol", "J-Pop", "J-Punk", "J-Rock", "J-Ska", "J-Synth", "Jackin House", "Jam Bands", "Japanese Pop", "Jazz", "Jungle", "K-Pop", "Karaoke", "Kayokyoku", "Kids", "Kitsch", "Klezmer", "Krautrock", "Latin", "Latin Jazz", "Latin Rap", "Local", "Lounge", "Lullabies", "MPB", "Mainstream Jazz", "Malay", "Mandopop", "March", "Mariachi", "Mawwal", "Medieval", "Meditation", "Metal", "Metalcore", "Minimal Techno", "Minimalism", "Modern", "Motown", "Mugham", "Musicals", "Musique Concrète", "Nature", "Neo-Soul", "Nerdcore", "New Acoustic", "New Age", "New Mex", "New Wave", "No Wave", "Noise", "Nordic", "Novelty", "OPM", "Oi!", "Old School Rap", "Opera", "Orchestral", "Original Score", "Outlaw Country", "Pagode", "Party", "Piano", "Polka", "Pop", "Pop Film", "Pop Latino", "Post Dubstep", "Power Pop", "Praise & Worship", "Progressive House", "Progressive Rock", "Proto-punk", "Psych Rock", "Psychedelic", "Punk", "Punk Rock", "Qawwali", "Quiet Storm", "R&B", "Ragtime", "Rainy Day", "Rap", "Reggae", "Reggaeton", "Regional Mexicano", "Relaxation", "Renaissance", "Retro", "Rock", "Rockabilly", "Rocksteady", "Romance", "Romantic", "Roots Reggae", "Roots Rock", "SKA", "Sad", "Salsa", "Samba", "Second Line", "Sertanejo", "Shaabi", "Shoegaze", "Sleep", "Smooth Jazz", "Soft Rock", "Soul", "Soundtrack", "Southern Gospel", "Southern Rock", "Space Rock", "Stage And Screen", "Steampunk", "Summer", "Surf", "Swamp Pop", "Swing", "Synth Pop", "Tango", "Techno", "Teen Pop", "Tejano", "Tex-Mex", "Thanksgiving", "Traditional", "Trance", "Trip Hop", "Tropical", "Underground Rap", "Urban", "Urban Cowboy", "West Coast Rap", "Western Swing", "World", "Worldbeat", "Zydeco"], qi = ["(Everything I Do) I Do it For You", "(Ghost) Riders in the Sky", "(I Can't Get No) Satisfaction", "(I've Got a Gal In) Kalamazoo", "(I've Had) the Time of My Life", "(It's No) Sin", "(Just Like) Starting Over", "(Let Me Be Your) Teddy Bear", "(Put Another Nickel In) Music! Music! Music!", "(Sexual) Healing", "(Sittin' On) the Dock of the Bay", "(They Long to Be) Close to You", "(You Keep Me) Hangin' On", "(You're My) Soul & Inspiration", "(Your Love Keeps Lifting Me) Higher & Higher", "12th Street Rag", "1999", "19th Nervous Breakdown", "50 Ways to Leave Your Lover", "9 to 5", "96 Tears", "A Boy Named Sue", "A Hard Day's Night", "A String of Pearls", "A Thousand Miles", "A Tree in the Meadow", "A Whiter Shade of Pale", "A Whole New World (Aladdin's Theme)", "A Woman in Love", "A-Tisket A-Tasket", "ABC", "Abracadabra", "Ac-cent-tchu-ate the Positive", "Addicted to Love", "After You've Gone", "Afternoon Delight", "Again", "Against All Odds (Take a Look At Me Now)", "Ain't Misbehavin'", "Ain't No Mountain High Enough", "Ain't No Sunshine", "Ain't That a Shame", "Airplanes", "All Along the Watchtower", "All I Have to Do is Dream", "All I Wanna Do", "All My Lovin' (You're Never Gonna Get It)", "All Night Long (All Night)", "All Out of Love", "All Shook Up", "All You Need is Love", "Alone", "Alone Again (Naturally)", "Always On My Mind", "American Pie", "American Woman", "Angie", "Another Brick in the Wall (part 2)", "Another Day in Paradise", "Another Night", "Another One Bites the Dust", "Apologize", "April Showers", "Aquarius/Let The Sunshine In", "Are You Lonesome Tonight?", "Arthur's Theme (Best That You Can Do)", "As Time Goes By", "At Last", "At the Hop", "Auf Wiederseh'n Sweetheart", "Baby Baby", "Baby Come Back", "Baby Got Back", "Baby Love", "Baby One More Time", "Bad", "Bad Day", "Bad Girls", "Bad Moon Rising", "Bad Romance", "Baker Street", "Ball of Confusion (That's What the World is Today)", "Ballad of the Green Berets", "Ballerina", "Band On the Run", "Band of Gold", "Battle of New Orleans", "Be Bop a Lula", "Be My Baby", "Be My Love", "Beat It", "Beautiful Day", "Beauty & the Beast", "Because I Love You (The Postman Song)", "Because You Loved Me", "Because of You", "Before The Next Teardrop Falls", "Begin the Beguine", "Behind Closed Doors", "Being With You", "Believe", "Ben", "Bennie & the Jets", "Besame Mucho", "Best of My Love", "Bette Davis Eyes", "Big Bad John", "Big Girls Don't Cry", "Billie Jean", "Bitter Sweet Symphony", "Black Or White", "Black Velvet", "Blaze of Glory", "Bleeding Love", "Blue Suede Shoes", "Blue Tango", "Blueberry Hill", "Blurred Lines", "Body & Soul", "Bohemian Rhapsody", "Boogie Oogie Oogie", "Boogie Woogie Bugle Boy", "Boom Boom Pow", "Born in the USA", "Born to Be Wild", "Born to Run", "Boulevard of Broken Dreams", "Brand New Key", "Brandy (You're A Fine Girl)", "Breaking Up is Hard to Do", "Breathe", "Bridge Over Troubled Water", "Brother", "Brother Louie", "Brown Eyed Girl", "Brown Sugar", "Build Me Up Buttercup", "Burn", "Buttons & Bows", "Bye", "Bye Bye", "Bye Bye Love", "Caldonia Boogie (What Makes Your Big Head So Hard)", "California Dreamin'", "California Girls", "Call Me", "Call Me Maybe", "Can You Feel the Love Tonight", "Can't Buy Me Love", "Can't Get Enough of Your Love", "Can't Help Falling in Love", "Candle in the Wind '97", "Candy Man", "Car Wash", "Careless Whisper", "Cars", "Cat's in the Cradle", "Cathy's Clown", "Celebration", "Centerfold", "Chain of Fools", "Chances Are", "Change the World", "Chapel of Love", "Chattanooga Choo Choo", "Chattanoogie Shoe-Shine Boy", "Check On It", "Cheek to Cheek", "Cherish", "Cherry Pink & Apple Blossom White", "Cold", "Colors of the Wind", "Come On Eileen", "Come On-a My House", "Come Together", "Coming Up", "Cracklin' Rosie", "Crazy", "Crazy For You", "Crazy Little Thing Called Love", "Crazy in Love", "Creep", "Crimson & Clover", "Crocodile Rock", "Cry", "Cry Like a Baby", "Crying", "Da Doo Ron Ron (When He Walked Me Home)", "Dance to the Music", "Dancing Queen", "Dancing in the Dark", "Dancing in the Street", "Dardanella", "Daydream Believer", "December 1963 (Oh What a Night)", "Delicado", "Dilemma", "Disco Duck", "Disco Lady", "Disturbia", "Dizzy", "Do That to Me One More Time", "Do Wah Diddy Diddy", "Do Ya Think I'm Sexy?", "Do You Love Me?", "Don't Be Cruel", "Don't Fence Me In", "Don't Go Breaking My Heart", "Don't Leave Me This Way", "Don't Let the Stars Get in Your Eyes", "Don't Let the Sun Go Down On Me", "Don't Speak", "Don't Stop 'Til You Get Enough", "Don't Worry Be Happy", "Don't You (Forget About Me)", "Don't You Want Me", "Doo Wop (That Thing)", "Down", "Down Hearted Blues", "Down Under", "Downtown", "Dreamlover", "Dreams", "Drop it Like It's Hot", "Drops of Jupiter (Tell Me)", "Duke of Earl", "E.T.", "Earth Angel", "Ebony & Ivory", "Eight Days a Week", "Empire State Of Mind", "End of the Road", "Endless Love", "Escape (The Pina Colada Song)", "Eve of Destruction", "Every Breath You Take", "Every Little Thing She Does is Magic", "Everybody Loves Somebody", "Everybody Wants to Rule the World", "Everyday People", "Eye of the Tiger", "Faith", "Fallin'", "Fame", "Family Affair", "Fantasy", "Fast Car", "Feel Good Inc", "Feel Like Making Love", "Fire & Rain", "Firework", "Flashdance. What a Feeling", "Fly Robin Fly", "Foolish Games", "Footloose", "For What It's Worth (Stop", "Fortunate Son", "Frankenstein", "Freak Me", "Freebird", "Frenesi", "Funkytown", "Gangsta's Paradise", "Georgia On My Mind", "Georgy Girl", "Get Back", "Get Down Tonight", "Get Off of My Cloud", "Ghostbusters", "Gimme Some Lovin'", "Girls Just Wanna Have Fun", "Give Me Everything", "Gives You Hell", "Glamorous", "Glory of Love", "Go Your Own Way", "God Bless America", "God Bless the Child", "Gold Digger", "Gonna Make You Sweat (Everybody Dance Now)", "Good Lovin'", "Good Times", "Good Vibrations", "Goodbye Yellow Brick Road", "Goodnight", "Got to Give it Up", "Grease", "Great Balls of Fire", "Greatest Love of All", "Green Onions", "Green River", "Green Tambourine", "Grenade", "Groove is in the Heart", "Groovin'", "Gypsies", "Hair", "Hang On Sloopy", "Hanging by a Moment", "Hanky Panky", "Happy Days Are Here Again", "Happy Together", "Harbour Lights", "Hard to Say I'm Sorry", "Harper Valley PTA", "Have You Ever Really Loved a Woman?", "He'll Have to Go", "He's So Fine", "He's a Rebel", "Heart of Glass", "Heart of Gold", "Heartbreak Hotel", "Hello", "Hello Dolly", "Help Me", "Help!", "Here Without You", "Here in My Heart", "Hero", "Hey Baby", "Hey Jude", "Hey Paula", "Hey There", "Hey There Delilah", "Hey Ya!", "Higher Love", "Hips don't lie", "Hit the Road", "Hold On", "Hollaback Girl", "Honey", "Honky Tonk", "Honky Tonk Woman", "Horse With No Name", "Hot Child In The City", "Hot Stuff", "Hotel California", "Hound Dog", "House of the Rising Sun", "How Deep is Your Love?", "How Do I Live?", "How Do You Mend a Broken Heart", "How High the Moon", "How Much is That Doggy in the Window?", "How Will I Know", "How You Remind Me", "How to Save a Life", "Hungry Heart", "Hurt So Good", "I Believe I Can Fly", "I Can Dream", "I Can Help", "I Can See Clearly Now", "I Can't Get Next to You", "I Can't Get Started", "I Can't Go For That (No Can Do)", "I Can't Help Myself (Sugar Pie", "I Can't Stop Loving You", "I Don't Want to Miss a Thing", "I Fall to Pieces", "I Feel Fine", "I Feel For You", "I Feel Love", "I Get Around", "I Got You (I Feel Good)", "I Got You Babe", "I Gotta Feeling", "I Heard it Through the Grapevine", "I Honestly Love You", "I Just Called to Say I Love You", "I Just Wanna Be Your Everything", "I Kissed A Girl", "I Love Rock 'n' Roll", "I Need You Now", "I Only Have Eyes For You", "I Shot the Sheriff", "I Still Haven't Found What I'm Looking For", "I Swear", "I Think I Love You", "I Walk the Line", "I Wanna Dance With Somebody (Who Loves Me)", "I Wanna Love You", "I Want You Back", "I Want to Hold Your Hand", "I Want to Know What Love Is", "I Went to Your Wedding", "I Will Always Love You", "I Will Follow Him", "I Will Survive", "I Write the Songs", "I'll Be Missing You", "I'll Be There", "I'll Make Love to You", "I'll Never Smile Again", "I'll Take You There", "I'll Walk Alone", "I'll be seeing you", "I'm Looking Over a Four Leaf Clover", "I'm So Lonesome I Could Cry", "I'm Sorry", "I'm Walking Behind You", "I'm Your Boogie Man", "I'm Yours", "I'm a Believer", "I've Heard That Song Before", "If (They Made Me a King)", "If I Didn't Care", "If You Don't Know Me By Now", "If You Leave Me Now", "Imagine", "In Da Club", "In the End", "In the Ghetto", "In the Mood", "In the Summertime", "In the Year 2525 (Exordium & Terminus)", "Incense & Peppermints", "Indian Reservation (The Lament Of The Cherokee Reservation Indian)", "Instant Karma", "Iris", "Ironic", "Irreplaceable", "It Had to Be You", "It's All in the Game", "It's My Party", "It's Now Or Never", "It's Still Rock 'n' Roll to Me", "It's Too Late", "Jack & Diane", "Jailhouse Rock", "Jessie's Girl", "Jive Talkin'", "Johnny B Goode", "Joy to the World", "Judy in Disguise (With Glasses)", "Jump", "Jumpin' Jack Flash", "Just Dance", "Just My Imagination (Running Away With Me)", "Just the Way You Are", "Kansas City", "Karma Chameleon", "Keep On Loving You", "Killing Me Softly With His Song", "King of the Road", "Kiss", "Kiss & Say Goodbye", "Kiss From a Rose", "Kiss Me", "Kiss On My List", "Kiss You All Over", "Knock On Wood", "Knock Three Times", "Kokomo", "Kryptonite", "Kung Fu Fighting", "La Bamba", "Lady", "Lady Marmalade (Voulez-Vous Coucher Aver Moi Ce Soir?)", "Last Train to Clarksville", "Layla", "Le Freak", "Leader of the Pack", "Lean On Me", "Leaving", "Let Me Call You Sweetheart", "Let Me Love You", "Let it Be", "Let it Snow! Let it Snow! Let it Snow!", "Let's Dance", "Let's Get it On", "Let's Groove", "Let's Hear it For the Boy", "Let's Stay Together", "Light My Fire", "Lights", "Like a Prayer", "Like a Rolling Stone", "Like a Virgin", "Little Darlin'", "Little Things Mean a Lot", "Live & Let Die", "Livin' La Vida Loca", "Livin' On a Prayer", "Living For the City", "Locked Out Of Heaven", "Lola", "Lonely Boy", "Long Cool Woman in a Black Dress", "Long Tall Sally", "Look Away", "Lookin' Out My Back Door", "Lose Yourself", "Losing My Religion", "Louie Louie", "Love Child", "Love Hangover", "Love In This Club", "Love Is Blue (L'Amour Est Bleu)", "Love Letters in the Sand", "Love Me Do", "Love Me Tender", "Love Shack", "Love Theme From 'A Star is Born' (Evergreen)", "Love Train", "Love Will Keep Us Together", "Love is a Many Splendoured Thing", "Love to Love You Baby", "Love's Theme", "Loving You", "Low", "Macarena", "Mack the Knife", "Maggie May", "Magic", "Magic Carpet Ride", "Make Love to Me", "Make it With You", "Makin' Whoopee", "Mama Told Me Not to Come", "Man in the Mirror", "Manana (Is Soon Enough For Me)", "Maneater", "Maniac", "Maybellene", "Me & Bobby McGee", "Me & Mrs Jones", "Memories Are Made of This", "Mercy Mercy Me (The Ecology)", "Mickey", "Midnight Train to Georgia", "Minnie the Moocher", "Miss You", "Miss You Much", "Mister Sandman", "Mmmbop", "Mona Lisa", "Monday Monday", "Money For Nothing", "Mony Mony", "Mood Indigo", "Moonlight Cocktail", "Moonlight Serenade", "More Than Words", "More Than a Feeling", "Morning Train (Nine to Five)", "Mr Big Stuff", "Mr Brightside", "Mr Tambourine Man", "Mrs Brown You've Got a Lovely Daughter", "Mrs Robinson", "Mule Train", "Music", "My Blue Heaven", "My Boyfriend's Back", "My Eyes Adored You", "My Girl", "My Guy", "My Heart Will Go On", "My Life", "My Love", "My Man", "My Prayer", "My Sharona", "My Sweet Lord", "Na Na Hey Hey (Kiss Him Goodbye)", "Nature Boy", "Near You", "Need You Now", "Need You Tonight", "Never Gonna Give You Up", "Night & Day", "Night Fever", "Nights in White Satin", "No One", "No Scrubs", "Nobody Does it Better", "Nothin' on You", "Nothing Compares 2 U", "Nothing's Gonna Stop Us Now", "Ode To Billie Joe", "Oh", "Oh Happy Day", "Oh My Papa (O Mein Papa)", "Ol' Man River", "Ole Buttermilk Sky", "On Bended Knee", "On My Own", "On the Atchison", "One", "One Bad Apple", "One More Try", "One O'Clock Jump", "One Sweet Day", "One of These Nights", "One of Us", "Only The Lonely (Know The Way I Feel)", "Only You (And You Alone)", "Open Arms", "Over There", "Over the Rainbow", "Paint it Black", "Papa Don't Preach", "Papa Was a Rolling Stone", "Papa's Got a Brand New Bag", "Paper Doll", "Paper Planes", "Paperback Writer", "Party Rock Anthem", "Peg o' My Heart", "Peggy Sue", "Pennies From Heaven", "Penny Lane", "People", "People Got to Be Free", "Personality", "Philadelphia Freedom", "Physical", "Piano Man", "Pick Up the Pieces", "Pistol Packin' Mama", "Play That Funky Music", "Please Mr Postman", "Poker Face", "Pon De Replay", "Pony Time", "Pop Muzik", "Prisoner of Love", "Private Eyes", "Promiscuous", "Proud Mary", "Purple Haze", "Purple Rain", "Puttin' on the Ritz", "Que sera sera (Whatever will be will be)", "Queen of Hearts", "Rag Doll", "Rag Mop", "Rags to Riches", "Raindrops Keep Falling On My Head", "Rapture", "Ray of Light", "Reach Out (I'll Be There)", "Red Red Wine", "Rehab", "Respect", "Return to Sender", "Reunited", "Revolution", "Rhapsody in Blue", "Rhinestone Cowboy", "Rich Girl", "Riders On the Storm", "Right Back Where We Started From", "Ring My Bell", "Ring of Fire", "Rock Around the Clock", "Rock With You", "Rock Your Baby", "Rock the Boat", "Rock the Casbah", "Roll Over Beethoven", "Roll With It", "Rolling In The Deep", "Rosanna", "Roses Are Red", "Royals", "Ruby Tuesday", "Rudolph", "Rum & Coca-Cola", "Runaround Sue", "Runaway", "Running Scared", "Rush Rush", "Sailing", "Save the Best For Last", "Save the Last Dance For Me", "Say It Right", "Say My Name", "Say Say Say", "Say You", "School's Out", "Seasons in the Sun", "Secret Love", "Sentimental Journey", "Sexyback", "Sh-Boom (Life Could Be a Dream)", "Shadow Dancing", "Shake Down", "Shake You Down", "She Drives Me Crazy", "She Loves You", "She's a Lady", "Shining Star", "Shop Around", "Shout", "Silly Love Songs", "Since U Been Gone", "Sing", "Singing The Blues", "Single Ladies (Put A Ring On It)", "Sir Duke", "Sixteen Tons", "Sledgehammer", "Sleep Walk", "Sleepy Lagoon", "Slow Poke", "Smells Like Teen Spirit", "Smoke Gets in Your Eyes", "Smoke On the Water", "Smoke! Smoke! Smoke! (That Cigarette)", "Smooth", "So Much in Love", "Soldier Boy", "Some Enchanted Evening", "Some of These Days", "Somebody That I Used to Know", "Somebody to Love", "Someday", "Somethin' Stupid", "Something", "Soul Man", "Spanish Harlem", "Spill the Wine", "Spinning Wheel", "Spirit in the Sky", "St George & the Dragonette", "St Louis Blues", "Stagger Lee", "Stairway to Heaven", "Stand By Me", "Stardust", "Stars & Stripes Forever", "Stay (I Missed You)", "Stayin' Alive", "Stop! in the Name of Love", "Stormy Weather (Keeps Rainin' All the Time)", "Straight Up", "Strange Fruit", "Stranger On the Shore", "Strangers in the Night", "Strawberry Fields Forever", "Streets of Philadelphia", "Stronger", "Stuck On You", "Sugar Shack", "Sugar Sugar", "Summer in the City", "Summertime Blues", "Sunday", "Sunshine Superman", "Sunshine of Your Love", "Superstar", "Superstition", "Surfin' USA", "Suspicious Minds", "Swanee", "Sweet Caroline (Good Times Never Seemed So Good)", "Sweet Child O' Mine", "Sweet Dreams (Are Made of This)", "Sweet Georgia Brown", "Sweet Home Alabama", "Sweet Soul Music", "Swinging On a Star", "T For Texas (Blue Yodel No 1)", "TSOP (The Sound of Philadelphia)", "Take Me Home", "Take My Breath Away", "Take On Me", "Take The 'A' Train", "Take a Bow", "Tammy", "Tangerine", "Tears in Heaven", "Tears of a Clown", "Temperature", "Tennessee Waltz", "Tequila", "Tha Crossroads", "Thank You (Falettinme be Mice Elf Again)", "That Lucky Old Sun (Just Rolls Around Heaven All Day)", "That Old Black Magic", "That'll Be the Day", "That's Amore", "That's What Friends Are For", "That's the Way (I Like It)", "That's the Way Love Goes", "The Boy is Mine", "The Boys of Summer", "The Christmas Song (Chestnuts Roasting On An Open Fire)", "The End of the World", "The First Time Ever I Saw Your Face", "The Girl From Ipanema", "The Glow-Worm", "The Great Pretender", "The Gypsy", "The Hustle", "The Joker", "The Last Dance", "The Letter", "The Loco-Motion", "The Long & Winding Road", "The Love You Save", "The Morning After", "The Power of Love", "The Prisoner's Song", "The Reason", "The Rose", "The Sign", "The Song From Moulin Rouge (Where Is Your Heart)", "The Sounds of Silence", "The Streak", "The Sweet Escape", "The Thing", "The Tide is High", "The Tracks of My Tears", "The Twist", "The Wanderer", "The Way We Were", "The Way You Look Tonight", "The Way You Move", "Theme From 'A Summer Place'", "Theme From 'Greatest American Hero' (Believe It Or Not)", "Theme From 'Shaft'", "There goes my baby", "These Boots Are Made For Walking", "Third Man Theme", "This Diamond Ring", "This Guy's in Love With You", "This Land is Your Land", "This Love", "This Ole House", "This Used to Be My Playground", "Three Coins in the Fountain", "Three Times a Lady", "Thrift Shop", "Thriller", "Ticket to Ride", "Tie a Yellow Ribbon 'round the Old Oak Tree", "Tiger Rag", "Tighten Up", "Tik-Toc", "Till I Waltz Again With You", "Till The End of Time", "Time After Time", "Time of the Season", "To Sir", "Tom Dooley", "Tonight's the Night (Gonna Be Alright)", "Too Close", "Too Young", "Tossing & Turning", "Total Eclipse of the Heart", "Touch Me", "Toxic", "Travellin' Band", "Travellin' Man", "Truly Madly Deeply", "Turn! Turn! Turn! (To Everything There is a Season)", "Tutti Frutti", "Twist & Shout", "Two Hearts", "U Can't Touch This", "U Got it Bad", "Umbrella", "Un-Break My Heart", "Unbelievable", "Unchained Melody", "Uncle Albert (Admiral Halsey)", "Under the Boardwalk", "Under the Bridge", "Unforgettable", "Up Around the Bend", "Up Up & Away", "Up Where We Belong", "Upside Down", "Use Somebody", "Vaya Con Dios (may God Be With You)", "Venus", "Vision of Love", "Viva La Vida", "Vogue", "Volare", "Wabash Cannonball", "Waiting For a Girl Like You", "Wake Me Up Before You Go Go", "Wake Up Little Susie", "Walk Don't Run", "Walk Like a Man", "Walk Like an Egyptian", "Walk On By", "Walk On the Wild Side", "Walk This Way", "Wannabe", "Want Ads", "Wanted", "War", "Waterfalls", "Wayward Wind", "We Are Family", "We Are Young", "We Are the Champions", "We Are the World", "We Belong Together", "We Built This City", "We Can Work it Out", "We Didn't Start the Fire", "We Found Love", "We Got The Beat", "We Will Rock You", "We've Only Just Begun", "Weak", "Wedding Bell Blues", "West End Blues", "West End Girls", "What Goes Around Comes Around", "What a Fool Believes", "What'd I Say", "What's Going On?", "What's Love Got to Do With It?", "Whatcha Say", "Wheel of Fortune", "When Doves Cry", "When You Wish Upon a Star", "When a Man Loves a Woman", "Where Did Our Love Go", "Where is the Love?", "Whip It", "Whispering", "White Christmas", "White Rabbit", "Whole Lotta Love", "Whole Lotta Shakin' Goin' On", "Whoomp! (There it Is)", "Why Do Fools Fall in Love?", "Why Don't You Believe Me?", "Wichita Lineman", "Wicked Game", "Wild Thing", "Wild Wild West", "Will It Go Round In Circles", "Will You Love Me Tomorrow", "Winchester Cathedral", "Wind Beneath My Wings", "Wipe Out", "Wishing Well", "With Or Without You", "Without Me", "Without You", "Woman", "Won't Get Fooled Again", "Wooly Bully", "Working My Way Back to You", "YMCA", "Yakety Yak", "Yeah!", "Yellow Rose of Texas", "Yesterday", "You Ain't Seen Nothin' Yet", "You Always Hurt the One You Love", "You Are the Sunshine of My Life", "You Belong With Me", "You Belong to Me", "You Can't Hurry Love", "You Don't Bring Me Flowers", "You Don't Have to Be a Star (To Be in My Show)", "You Light Up My Life", "You Make Me Feel Brand New", "You Make Me Feel Like Dancing", "You Really Got Me", "You Send Me", "You Sexy Thing", "You Were Meant for Me", "You make Me Wanna", "You'll Never Know", "You're Beautiful", "You're So Vain", "You're Still the One", "You're the One That I Want", "You've Got a Friend", "You've Lost That Lovin' Feelin'", "Your Cheatin' Heart", "Your Song"], Zi = { album: $i, artist: Ui, genre: _i, song_name: qi }, Xi = Zi, Qi = ["activist", "artist", "author", "blogger", "business owner", "coach", "creator", "designer", "developer", "dreamer", "educator", "engineer", "entrepreneur", "environmentalist", "film lover", "filmmaker", "foodie", "founder", "friend", "gamer", "geek", "grad", "inventor", "leader", "model", "musician", "nerd", "parent", "patriot", "person", "philosopher", "photographer", "public speaker", "scientist", "singer", "streamer", "student", "teacher", "traveler", "veteran", "writer"], eu = ["{{person.bio_part}}", "{{person.bio_part}}, {{person.bio_part}}", "{{person.bio_part}}, {{person.bio_part}}, {{person.bio_part}}", "{{person.bio_part}}, {{person.bio_part}}, {{person.bio_part}} {{internet.emoji}}", "{{word.noun}} {{person.bio_supporter}}", "{{word.noun}} {{person.bio_supporter}}  {{internet.emoji}}", "{{word.noun}} {{person.bio_supporter}}, {{person.bio_part}}", "{{word.noun}} {{person.bio_supporter}}, {{person.bio_part}} {{internet.emoji}}"], au = ["advocate", "devotee", "enthusiast", "fan", "junkie", "lover", "supporter"], ru = { generic: ["Aaliyah", "Aaron", "Abagail", "Abbey", "Abbie", "Abbigail", "Abby", "Abdiel", "Abdul", "Abdullah", "Abe", "Abel", "Abelardo", "Abigail", "Abigale", "Abigayle", "Abner", "Abraham", "Ada", "Adah", "Adalberto", "Adaline", "Adam", "Adan", "Addie", "Addison", "Adela", "Adelbert", "Adele", "Adelia", "Adeline", "Adell", "Adella", "Adelle", "Aditya", "Adolf", "Adolfo", "Adolph", "Adolphus", "Adonis", "Adrain", "Adrian", "Adriana", "Adrianna", "Adriel", "Adrien", "Adrienne", "Afton", "Aglae", "Agnes", "Agustin", "Agustina", "Ahmad", "Ahmed", "Aida", "Aidan", "Aiden", "Aileen", "Aimee", "Aisha", "Aiyana", "Akeem", "Al", "Alaina", "Alan", "Alana", "Alanis", "Alanna", "Alayna", "Alba", "Albert", "Alberta", "Albertha", "Alberto", "Albin", "Albina", "Alda", "Alden", "Alec", "Aleen", "Alejandra", "Alejandrin", "Alek", "Alena", "Alene", "Alessandra", "Alessandro", "Alessia", "Aletha", "Alex", "Alexa", "Alexander", "Alexandra", "Alexandre", "Alexandrea", "Alexandria", "Alexandrine", "Alexandro", "Alexane", "Alexanne", "Alexie", "Alexis", "Alexys", "Alexzander", "Alf", "Alfonso", "Alfonzo", "Alford", "Alfred", "Alfreda", "Alfredo", "Ali", "Alia", "Alice", "Alicia", "Alisa", "Alisha", "Alison", "Alivia", "Aliya", "Aliyah", "Aliza", "Alize", "Allan", "Allen", "Allene", "Allie", "Allison", "Ally", "Alphonso", "Alta", "Althea", "Alva", "Alvah", "Alvena", "Alvera", "Alverta", "Alvina", "Alvis", "Alyce", "Alycia", "Alysa", "Alysha", "Alyson", "Alysson", "Amalia", "Amanda", "Amani", "Amara", "Amari", "Amaya", "Amber", "Ambrose", "Amelia", "Amelie", "Amely", "America", "Americo", "Amie", "Amina", "Amir", "Amira", "Amiya", "Amos", "Amparo", "Amy", "Amya", "Ana", "Anabel", "Anabelle", "Anahi", "Anais", "Anastacio", "Anastasia", "Anderson", "Andre", "Andreane", "Andreanne", "Andres", "Andrew", "Andy", "Angel", "Angela", "Angelica", "Angelina", "Angeline", "Angelita", "Angelo", "Angie", "Angus", "Anibal", "Anika", "Anissa", "Anita", "Aniya", "Aniyah", "Anjali", "Anna", "Annabel", "Annabell", "Annabelle", "Annalise", "Annamae", "Annamarie", "Anne", "Annetta", "Annette", "Annie", "Ansel", "Ansley", "Anthony", "Antoinette", "Antone", "Antonetta", "Antonette", "Antonia", "Antonietta", "Antonina", "Antonio", "Antwan", "Antwon", "Anya", "April", "Ara", "Araceli", "Aracely", "Arch", "Archibald", "Ardella", "Arden", "Ardith", "Arely", "Ari", "Ariane", "Arianna", "Aric", "Ariel", "Arielle", "Arjun", "Arlene", "Arlie", "Arlo", "Armand", "Armando", "Armani", "Arnaldo", "Arne", "Arno", "Arnold", "Arnoldo", "Arnulfo", "Aron", "Art", "Arthur", "Arturo", "Arvel", "Arvid", "Arvilla", "Aryanna", "Asa", "Asha", "Ashlee", "Ashleigh", "Ashley", "Ashly", "Ashlynn", "Ashton", "Ashtyn", "Asia", "Assunta", "Astrid", "Athena", "Aubree", "Aubrey", "Audie", "Audra", "Audreanne", "Audrey", "August", "Augusta", "Augustine", "Augustus", "Aurelia", "Aurelie", "Aurelio", "Aurore", "Austen", "Austin", "Austyn", "Autumn", "Ava", "Avery", "Avis", "Axel", "Ayana", "Ayden", "Ayla", "Aylin", "Baby", "Bailee", "Bailey", "Barbara", "Barney", "Baron", "Barrett", "Barry", "Bart", "Bartholome", "Barton", "Baylee", "Beatrice", "Beau", "Beaulah", "Bell", "Bella", "Belle", "Ben", "Benedict", "Benjamin", "Bennett", "Bennie", "Benny", "Benton", "Berenice", "Bernadette", "Bernadine", "Bernard", "Bernardo", "Berneice", "Bernhard", "Bernice", "Bernie", "Berniece", "Bernita", "Berry", "Bert", "Berta", "Bertha", "Bertram", "Bertrand", "Beryl", "Bessie", "Beth", "Bethany", "Bethel", "Betsy", "Bette", "Bettie", "Betty", "Bettye", "Beulah", "Beverly", "Bianka", "Bill", "Billie", "Billy", "Birdie", "Blair", "Blaise", "Blake", "Blanca", "Blanche", "Blaze", "Bo", "Bobbie", "Bobby", "Bonita", "Bonnie", "Boris", "Boyd", "Brad", "Braden", "Bradford", "Bradley", "Bradly", "Brady", "Braeden", "Brain", "Brandi", "Brando", "Brandon", "Brandt", "Brandy", "Brandyn", "Brannon", "Branson", "Brant", "Braulio", "Braxton", "Brayan", "Breana", "Breanna", "Breanne", "Brenda", "Brendan", "Brenden", "Brendon", "Brenna", "Brennan", "Brennon", "Brent", "Bret", "Brett", "Bria", "Brian", "Briana", "Brianne", "Brice", "Bridget", "Bridgette", "Bridie", "Brielle", "Brigitte", "Brionna", "Brisa", "Britney", "Brittany", "Brock", "Broderick", "Brody", "Brook", "Brooke", "Brooklyn", "Brooks", "Brown", "Bruce", "Bryana", "Bryce", "Brycen", "Bryon", "Buck", "Bud", "Buddy", "Buford", "Bulah", "Burdette", "Burley", "Burnice", "Buster", "Cade", "Caden", "Caesar", "Caitlyn", "Cale", "Caleb", "Caleigh", "Cali", "Calista", "Callie", "Camden", "Cameron", "Camila", "Camilla", "Camille", "Camren", "Camron", "Camryn", "Camylle", "Candace", "Candelario", "Candice", "Candida", "Candido", "Cara", "Carey", "Carissa", "Carlee", "Carleton", "Carley", "Carli", "Carlie", "Carlo", "Carlos", "Carlotta", "Carmel", "Carmela", "Carmella", "Carmelo", "Carmen", "Carmine", "Carol", "Carolanne", "Carole", "Carolina", "Caroline", "Carolyn", "Carolyne", "Carrie", "Carroll", "Carson", "Carter", "Cary", "Casandra", "Casey", "Casimer", "Casimir", "Casper", "Cassandra", "Cassandre", "Cassidy", "Cassie", "Catalina", "Caterina", "Catharine", "Catherine", "Cathrine", "Cathryn", "Cathy", "Cayla", "Ceasar", "Cecelia", "Cecil", "Cecile", "Cecilia", "Cedrick", "Celestine", "Celestino", "Celia", "Celine", "Cesar", "Chad", "Chadd", "Chadrick", "Chaim", "Chance", "Chandler", "Chanel", "Chanelle", "Charity", "Charlene", "Charles", "Charley", "Charlie", "Charlotte", "Chase", "Chasity", "Chauncey", "Chaya", "Chaz", "Chelsea", "Chelsey", "Chelsie", "Chesley", "Chester", "Chet", "Cheyanne", "Cheyenne", "Chloe", "Chris", "Christ", "Christa", "Christelle", "Christian", "Christiana", "Christina", "Christine", "Christop", "Christophe", "Christopher", "Christy", "Chyna", "Ciara", "Cicero", "Cielo", "Cierra", "Cindy", "Citlalli", "Clair", "Claire", "Clara", "Clarabelle", "Clare", "Clarissa", "Clark", "Claud", "Claude", "Claudia", "Claudie", "Claudine", "Clay", "Clemens", "Clement", "Clementina", "Clementine", "Clemmie", "Cleo", "Cleora", "Cleta", "Cletus", "Cleve", "Cleveland", "Clifford", "Clifton", "Clint", "Clinton", "Clotilde", "Clovis", "Cloyd", "Clyde", "Coby", "Cody", "Colby", "Cole", "Coleman", "Colin", "Colleen", "Collin", "Colt", "Colten", "Colton", "Columbus", "Concepcion", "Conner", "Connie", "Connor", "Conor", "Conrad", "Constance", "Constantin", "Consuelo", "Cooper", "Cora", "Coralie", "Corbin", "Cordelia", "Cordell", "Cordia", "Cordie", "Corene", "Corine", "Cornelius", "Cornell", "Corrine", "Cortez", "Cortney", "Cory", "Coty", "Courtney", "Coy", "Craig", "Crawford", "Creola", "Cristal", "Cristian", "Cristina", "Cristobal", "Cristopher", "Cruz", "Crystal", "Crystel", "Cullen", "Curt", "Curtis", "Cydney", "Cynthia", "Cyril", "Cyrus", "Dagmar", "Dahlia", "Daija", "Daisha", "Daisy", "Dakota", "Dale", "Dallas", "Dallin", "Dalton", "Damaris", "Dameon", "Damian", "Damien", "Damion", "Damon", "Dan", "Dana", "Dandre", "Dane", "D'angelo", "Dangelo", "Danial", "Daniela", "Daniella", "Danielle", "Danika", "Dannie", "Danny", "Dante", "Danyka", "Daphne", "Daphnee", "Daphney", "Darby", "Daren", "Darian", "Dariana", "Darien", "Dario", "Darion", "Darius", "Darlene", "Daron", "Darrel", "Darrell", "Darren", "Darrick", "Darrin", "Darrion", "Darron", "Darryl", "Darwin", "Daryl", "Dashawn", "Dasia", "Dave", "David", "Davin", "Davion", "Davon", "Davonte", "Dawn", "Dawson", "Dax", "Dayana", "Dayna", "Dayne", "Dayton", "Dean", "Deangelo", "Deanna", "Deborah", "Declan", "Dedric", "Dedrick", "Dee", "Deion", "Deja", "Dejah", "Dejon", "Dejuan", "Delaney", "Delbert", "Delfina", "Delia", "Delilah", "Dell", "Della", "Delmer", "Delores", "Delpha", "Delphia", "Delphine", "Delta", "Demarco", "Demarcus", "Demario", "Demetris", "Demetrius", "Demond", "Dena", "Denis", "Dennis", "Deon", "Deondre", "Deontae", "Deonte", "Dereck", "Derek", "Derick", "Deron", "Derrick", "Deshaun", "Deshawn", "Desiree", "Desmond", "Dessie", "Destany", "Destin", "Destinee", "Destiney", "Destini", "Destiny", "Devan", "Devante", "Deven", "Devin", "Devon", "Devonte", "Devyn", "Dewayne", "Dewitt", "Dexter", "Diamond", "Diana", "Dianna", "Diego", "Dillan", "Dillon", "Dimitri", "Dina", "Dino", "Dion", "Dixie", "Dock", "Dolly", "Dolores", "Domenic", "Domenica", "Domenick", "Domenico", "Domingo", "Dominic", "Dominique", "Don", "Donald", "Donato", "Donavon", "Donna", "Donnell", "Donnie", "Donny", "Dora", "Dorcas", "Dorian", "Doris", "Dorothea", "Dorothy", "Dorris", "Dortha", "Dorthy", "Doug", "Douglas", "Dovie", "Doyle", "Drake", "Drew", "Duane", "Dudley", "Dulce", "Duncan", "Durward", "Dustin", "Dusty", "Dwight", "Dylan", "Earl", "Earlene", "Earline", "Earnest", "Earnestine", "Easter", "Easton", "Ebba", "Ebony", "Ed", "Eda", "Edd", "Eddie", "Eden", "Edgar", "Edgardo", "Edison", "Edmond", "Edmund", "Edna", "Eduardo", "Edward", "Edwardo", "Edwin", "Edwina", "Edyth", "Edythe", "Effie", "Efrain", "Efren", "Eileen", "Einar", "Eino", "Eladio", "Elaina", "Elbert", "Elda", "Eldon", "Eldora", "Eldred", "Eldridge", "Eleanora", "Eleanore", "Eleazar", "Electa", "Elena", "Elenor", "Elenora", "Eleonore", "Elfrieda", "Eli", "Elian", "Eliane", "Elias", "Eliezer", "Elijah", "Elinor", "Elinore", "Elisa", "Elisabeth", "Elise", "Eliseo", "Elisha", "Elissa", "Eliza", "Elizabeth", "Ella", "Ellen", "Ellie", "Elliot", "Elliott", "Ellis", "Ellsworth", "Elmer", "Elmira", "Elmo", "Elmore", "Elna", "Elnora", "Elody", "Eloisa", "Eloise", "Elouise", "Eloy", "Elroy", "Elsa", "Else", "Elsie", "Elta", "Elton", "Elva", "Elvera", "Elvie", "Elvis", "Elwin", "Elwyn", "Elyse", "Elyssa", "Elza", "Emanuel", "Emelia", "Emelie", "Emely", "Emerald", "Emerson", "Emery", "Emie", "Emil", "Emile", "Emilia", "Emiliano", "Emilie", "Emilio", "Emily", "Emma", "Emmalee", "Emmanuel", "Emmanuelle", "Emmet", "Emmett", "Emmie", "Emmitt", "Emmy", "Emory", "Ena", "Enid", "Enoch", "Enola", "Enos", "Enrico", "Enrique", "Ephraim", "Era", "Eriberto", "Eric", "Erica", "Erich", "Erick", "Ericka", "Erik", "Erika", "Erin", "Erling", "Erna", "Ernest", "Ernestina", "Ernestine", "Ernesto", "Ernie", "Ervin", "Erwin", "Eryn", "Esmeralda", "Esperanza", "Esta", "Esteban", "Estefania", "Estel", "Estell", "Estella", "Estelle", "Estevan", "Esther", "Estrella", "Etha", "Ethan", "Ethel", "Ethelyn", "Ethyl", "Ettie", "Eudora", "Eugene", "Eugenia", "Eula", "Eulah", "Eulalia", "Euna", "Eunice", "Eusebio", "Eva", "Evalyn", "Evan", "Evangeline", "Evans", "Eve", "Eveline", "Evelyn", "Everardo", "Everett", "Everette", "Evert", "Evie", "Ewald", "Ewell", "Ezekiel", "Ezequiel", "Ezra", "Fabian", "Fabiola", "Fae", "Fannie", "Fanny", "Fatima", "Faustino", "Fausto", "Favian", "Fay", "Faye", "Federico", "Felicia", "Felicita", "Felicity", "Felipa", "Felipe", "Felix", "Felton", "Fermin", "Fern", "Fernando", "Ferne", "Fidel", "Filiberto", "Filomena", "Finn", "Fiona", "Flavie", "Flavio", "Fleta", "Fletcher", "Flo", "Florence", "Florencio", "Florian", "Florida", "Florine", "Flossie", "Floy", "Floyd", "Ford", "Forest", "Forrest", "Foster", "Frances", "Francesca", "Francesco", "Francis", "Francisca", "Francisco", "Franco", "Frank", "Frankie", "Franz", "Fred", "Freda", "Freddie", "Freddy", "Frederic", "Frederick", "Frederik", "Frederique", "Fredrick", "Fredy", "Freeda", "Freeman", "Freida", "Frida", "Frieda", "Friedrich", "Fritz", "Furman", "Gabe", "Gabriel", "Gabriella", "Gabrielle", "Gaetano", "Gage", "Gail", "Gardner", "Garett", "Garfield", "Garland", "Garnet", "Garnett", "Garret", "Garrett", "Garrick", "Garrison", "Garry", "Garth", "Gaston", "Gavin", "Gayle", "Gene", "General", "Genesis", "Genevieve", "Gennaro", "Genoveva", "Geo", "Geoffrey", "George", "Georgette", "Georgiana", "Georgianna", "Geovanni", "Geovanny", "Geovany", "Gerald", "Geraldine", "Gerard", "Gerardo", "Gerda", "Gerhard", "Germaine", "German", "Gerry", "Gerson", "Gertrude", "Gia", "Gianni", "Gideon", "Gilbert", "Gilberto", "Gilda", "Giles", "Gillian", "Gina", "Gino", "Giovani", "Giovanna", "Giovanni", "Giovanny", "Gisselle", "Giuseppe", "Gladyce", "Gladys", "Glen", "Glenda", "Glenna", "Glennie", "Gloria", "Godfrey", "Golda", "Golden", "Gonzalo", "Gordon", "Grace", "Gracie", "Graciela", "Grady", "Graham", "Grant", "Granville", "Grayce", "Grayson", "Green", "Greg", "Gregg", "Gregoria", "Gregorio", "Gregory", "Greta", "Gretchen", "Greyson", "Griffin", "Grover", "Guadalupe", "Gudrun", "Guido", "Guillermo", "Guiseppe", "Gunnar", "Gunner", "Gus", "Gussie", "Gust", "Gustave", "Guy", "Gwen", "Gwendolyn", "Hadley", "Hailee", "Hailey", "Hailie", "Hal", "Haleigh", "Haley", "Halie", "Halle", "Hallie", "Hank", "Hanna", "Hannah", "Hans", "Hardy", "Harley", "Harmon", "Harmony", "Harold", "Harrison", "Harry", "Harvey", "Haskell", "Hassan", "Hassie", "Hattie", "Haven", "Hayden", "Haylee", "Hayley", "Haylie", "Hazel", "Hazle", "Heath", "Heather", "Heaven", "Heber", "Hector", "Heidi", "Helen", "Helena", "Helene", "Helga", "Hellen", "Helmer", "Heloise", "Henderson", "Henri", "Henriette", "Henry", "Herbert", "Herman", "Hermann", "Hermina", "Herminia", "Herminio", "Hershel", "Herta", "Hertha", "Hester", "Hettie", "Hilario", "Hilbert", "Hilda", "Hildegard", "Hillard", "Hillary", "Hilma", "Hilton", "Hipolito", "Hiram", "Hobart", "Holden", "Hollie", "Hollis", "Holly", "Hope", "Horace", "Horacio", "Hortense", "Hosea", "Houston", "Howard", "Howell", "Hoyt", "Hubert", "Hudson", "Hugh", "Hulda", "Humberto", "Hunter", "Hyman", "Ian", "Ibrahim", "Icie", "Ida", "Idell", "Idella", "Ignacio", "Ignatius", "Ike", "Ila", "Ilene", "Iliana", "Ima", "Imani", "Imelda", "Immanuel", "Imogene", "Ines", "Irma", "Irving", "Irwin", "Isaac", "Isabel", "Isabell", "Isabella", "Isabelle", "Isac", "Isadore", "Isai", "Isaiah", "Isaias", "Isidro", "Ismael", "Isobel", "Isom", "Israel", "Issac", "Itzel", "Iva", "Ivah", "Ivory", "Ivy", "Izabella", "Izaiah", "Jabari", "Jace", "Jacey", "Jacinthe", "Jacinto", "Jack", "Jackeline", "Jackie", "Jacklyn", "Jackson", "Jacky", "Jaclyn", "Jacquelyn", "Jacques", "Jacynthe", "Jada", "Jade", "Jaden", "Jadon", "Jadyn", "Jaeden", "Jaida", "Jaiden", "Jailyn", "Jaime", "Jairo", "Jakayla", "Jake", "Jakob", "Jaleel", "Jalen", "Jalon", "Jalyn", "Jamaal", "Jamal", "Jamar", "Jamarcus", "Jamel", "Jameson", "Jamey", "Jamie", "Jamil", "Jamir", "Jamison", "Jammie", "Jan", "Jana", "Janae", "Jane", "Janelle", "Janessa", "Janet", "Janice", "Janick", "Janie", "Janis", "Janiya", "Jannie", "Jany", "Jaquan", "Jaquelin", "Jaqueline", "Jared", "Jaren", "Jarod", "Jaron", "Jarred", "Jarrell", "Jarret", "Jarrett", "Jarrod", "Jarvis", "Jasen", "Jasmin", "Jason", "Jasper", "Jaunita", "Javier", "Javon", "Javonte", "Jay", "Jayce", "Jaycee", "Jayda", "Jayde", "Jayden", "Jaydon", "Jaylan", "Jaylen", "Jaylin", "Jaylon", "Jayme", "Jayne", "Jayson", "Jazlyn", "Jazmin", "Jazmyn", "Jazmyne", "Jean", "Jeanette", "Jeanie", "Jeanne", "Jed", "Jedediah", "Jedidiah", "Jeff", "Jefferey", "Jeffery", "Jeffrey", "Jeffry", "Jena", "Jenifer", "Jennie", "Jennifer", "Jennings", "Jennyfer", "Jensen", "Jerad", "Jerald", "Jeramie", "Jeramy", "Jerel", "Jeremie", "Jeremy", "Jermain", "Jermaine", "Jermey", "Jerod", "Jerome", "Jeromy", "Jerrell", "Jerrod", "Jerrold", "Jerry", "Jess", "Jesse", "Jessica", "Jessie", "Jessika", "Jessy", "Jessyca", "Jesus", "Jett", "Jettie", "Jevon", "Jewel", "Jewell", "Jillian", "Jimmie", "Jimmy", "Jo", "Joan", "Joana", "Joanie", "Joanne", "Joannie", "Joanny", "Joany", "Joaquin", "Jocelyn", "Jodie", "Jody", "Joe", "Joel", "Joelle", "Joesph", "Joey", "Johan", "Johann", "Johanna", "Johathan", "John", "Johnathan", "Johnathon", "Johnnie", "Johnny", "Johnpaul", "Johnson", "Jolie", "Jon", "Jonas", "Jonatan", "Jonathan", "Jonathon", "Jordan", "Jordane", "Jordi", "Jordon", "Jordy", "Jordyn", "Jorge", "Jose", "Josefa", "Josefina", "Joseph", "Josephine", "Josh", "Joshua", "Joshuah", "Josiah", "Josiane", "Josianne", "Josie", "Josue", "Jovan", "Jovani", "Jovanny", "Jovany", "Joy", "Joyce", "Juana", "Juanita", "Judah", "Judd", "Jude", "Judge", "Judson", "Judy", "Jules", "Julia", "Julian", "Juliana", "Julianne", "Julie", "Julien", "Juliet", "Julio", "Julius", "June", "Junior", "Junius", "Justen", "Justice", "Justina", "Justine", "Juston", "Justus", "Justyn", "Juvenal", "Juwan", "Kacey", "Kaci", "Kacie", "Kade", "Kaden", "Kadin", "Kaela", "Kaelyn", "Kaia", "Kailee", "Kailey", "Kailyn", "Kaitlin", "Kaitlyn", "Kale", "Kaleb", "Kaleigh", "Kaley", "Kali", "Kallie", "Kameron", "Kamille", "Kamren", "Kamron", "Kamryn", "Kane", "Kara", "Kareem", "Karelle", "Karen", "Kari", "Kariane", "Karianne", "Karina", "Karine", "Karl", "Karlee", "Karley", "Karli", "Karlie", "Karolann", "Karson", "Kasandra", "Kasey", "Kassandra", "Katarina", "Katelin", "Katelyn", "Katelynn", "Katharina", "Katherine", "Katheryn", "Kathleen", "Kathlyn", "Kathryn", "Kathryne", "Katlyn", "Katlynn", "Katrina", "Katrine", "Kattie", "Kavon", "Kay", "Kaya", "Kaycee", "Kayden", "Kayla", "Kaylah", "Kaylee", "Kayleigh", "Kayley", "Kayli", "Kaylie", "Kaylin", "Keagan", "Keanu", "Keara", "Keaton", "Keegan", "Keeley", "Keely", "Keenan", "Keira", "Keith", "Kellen", "Kelley", "Kelli", "Kellie", "Kelly", "Kelsi", "Kelsie", "Kelton", "Kelvin", "Ken", "Kendall", "Kendra", "Kendrick", "Kenna", "Kennedi", "Kennedy", "Kenneth", "Kennith", "Kenny", "Kenton", "Kenya", "Kenyatta", "Kenyon", "Keon", "Keshaun", "Keshawn", "Keven", "Kevin", "Kevon", "Keyon", "Keyshawn", "Khalid", "Khalil", "Kian", "Kiana", "Kianna", "Kiara", "Kiarra", "Kiel", "Kiera", "Kieran", "Kiley", "Kim", "Kimberly", "King", "Kip", "Kira", "Kirk", "Kirsten", "Kirstin", "Kitty", "Kobe", "Koby", "Kody", "Kolby", "Kole", "Korbin", "Korey", "Kory", "Kraig", "Kris", "Krista", "Kristian", "Kristin", "Kristina", "Kristofer", "Kristoffer", "Kristopher", "Kristy", "Krystal", "Krystel", "Krystina", "Kurt", "Kurtis", "Kyla", "Kyle", "Kylee", "Kyleigh", "Kyler", "Kylie", "Kyra", "Lacey", "Lacy", "Ladarius", "Lafayette", "Laila", "Laisha", "Lamar", "Lambert", "Lamont", "Lance", "Landen", "Lane", "Laney", "Larissa", "Laron", "Larry", "Larue", "Laura", "Laurel", "Lauren", "Laurence", "Lauretta", "Lauriane", "Laurianne", "Laurie", "Laurine", "Laury", "Lauryn", "Lavada", "Lavern", "Laverna", "Laverne", "Lavina", "Lavinia", "Lavon", "Lavonne", "Lawrence", "Lawson", "Layla", "Layne", "Lazaro", "Lea", "Leann", "Leanna", "Leanne", "Leatha", "Leda", "Lee", "Leif", "Leila", "Leilani", "Lela", "Lelah", "Leland", "Lelia", "Lempi", "Lemuel", "Lenna", "Lennie", "Lenny", "Lenora", "Lenore", "Leo", "Leola", "Leon", "Leonard", "Leonardo", "Leone", "Leonel", "Leonie", "Leonor", "Leonora", "Leopold", "Leopoldo", "Leora", "Lera", "Lesley", "Leslie", "Lesly", "Lessie", "Lester", "Leta", "Letha", "Letitia", "Levi", "Lew", "Lewis", "Lexi", "Lexie", "Lexus", "Lia", "Liam", "Liana", "Libbie", "Libby", "Lila", "Lilian", "Liliana", "Liliane", "Lilla", "Lillian", "Lilliana", "Lillie", "Lilly", "Lily", "Lilyan", "Lina", "Lincoln", "Linda", "Lindsay", "Lindsey", "Linnea", "Linnie", "Linwood", "Lionel", "Lisa", "Lisandro", "Lisette", "Litzy", "Liza", "Lizeth", "Lizzie", "Llewellyn", "Lloyd", "Logan", "Lois", "Lola", "Lolita", "Loma", "Lon", "London", "Lonie", "Lonnie", "Lonny", "Lonzo", "Lora", "Loraine", "Loren", "Lorena", "Lorenz", "Lorenza", "Lorenzo", "Lori", "Lorine", "Lorna", "Lottie", "Lou", "Louie", "Louisa", "Lourdes", "Louvenia", "Lowell", "Loy", "Loyal", "Loyce", "Lucas", "Luciano", "Lucie", "Lucienne", "Lucile", "Lucinda", "Lucio", "Lucious", "Lucius", "Lucy", "Ludie", "Ludwig", "Lue", "Luella", "Luigi", "Luis", "Luisa", "Lukas", "Lula", "Lulu", "Luna", "Lupe", "Lura", "Lurline", "Luther", "Luz", "Lyda", "Lydia", "Lyla", "Lynn", "Lyric", "Lysanne", "Mabel", "Mabelle", "Mable", "Mac", "Macey", "Maci", "Macie", "Mack", "Mackenzie", "Macy", "Madaline", "Madalyn", "Maddison", "Madeline", "Madelyn", "Madelynn", "Madge", "Madie", "Madilyn", "Madisen", "Madison", "Madisyn", "Madonna", "Madyson", "Mae", "Maegan", "Maeve", "Mafalda", "Magali", "Magdalen", "Magdalena", "Maggie", "Magnolia", "Magnus", "Maia", "Maida", "Maiya", "Major", "Makayla", "Makenna", "Makenzie", "Malachi", "Malcolm", "Malika", "Malinda", "Mallie", "Mallory", "Malvina", "Mandy", "Manley", "Manuel", "Manuela", "Mara", "Marc", "Marcel", "Marcelina", "Marcelino", "Marcella", "Marcelle", "Marcellus", "Marcelo", "Marcia", "Marco", "Marcos", "Marcus", "Margaret", "Margarete", "Margarett", "Margaretta", "Margarette", "Margarita", "Marge", "Margie", "Margot", "Margret", "Marguerite", "Maria", "Mariah", "Mariam", "Marian", "Mariana", "Mariane", "Marianna", "Marianne", "Mariano", "Maribel", "Marie", "Mariela", "Marielle", "Marietta", "Marilie", "Marilou", "Marilyne", "Marina", "Mario", "Marion", "Marisa", "Marisol", "Maritza", "Marjolaine", "Marjorie", "Marjory", "Mark", "Markus", "Marlee", "Marlen", "Marlene", "Marley", "Marlin", "Marlon", "Marques", "Marquis", "Marquise", "Marshall", "Marta", "Martin", "Martina", "Martine", "Marty", "Marvin", "Mary", "Maryam", "Maryjane", "Maryse", "Mason", "Mateo", "Mathew", "Mathias", "Mathilde", "Matilda", "Matilde", "Matt", "Matteo", "Mattie", "Maud", "Maude", "Maudie", "Maureen", "Maurice", "Mauricio", "Maurine", "Maverick", "Mavis", "Max", "Maxie", "Maxime", "Maximilian", "Maximillia", "Maximillian", "Maximo", "Maximus", "Maxine", "Maxwell", "May", "Maya", "Maybell", "Maybelle", "Maye", "Maymie", "Maynard", "Mayra", "Mazie", "Mckayla", "Mckenna", "Mckenzie", "Meagan", "Meaghan", "Meda", "Megane", "Meggie", "Meghan", "Mekhi", "Melany", "Melba", "Melisa", "Melissa", "Mellie", "Melody", "Melvin", "Melvina", "Melyna", "Melyssa", "Mercedes", "Meredith", "Merl", "Merle", "Merlin", "Merritt", "Mertie", "Mervin", "Meta", "Mia", "Micaela", "Micah", "Michael", "Michaela", "Michale", "Micheal", "Michel", "Michele", "Michelle", "Miguel", "Mikayla", "Mike", "Mikel", "Milan", "Miles", "Milford", "Miller", "Millie", "Milo", "Milton", "Mina", "Minerva", "Minnie", "Miracle", "Mireille", "Mireya", "Misael", "Missouri", "Misty", "Mitchel", "Mitchell", "Mittie", "Modesta", "Modesto", "Mohamed", "Mohammad", "Mohammed", "Moises", "Mollie", "Molly", "Mona", "Monica", "Monique", "Monroe", "Monserrat", "Monserrate", "Montana", "Monte", "Monty", "Morgan", "Moriah", "Morris", "Mortimer", "Morton", "Mose", "Moses", "Moshe", "Mossie", "Mozell", "Mozelle", "Muhammad", "Muriel", "Murl", "Murphy", "Murray", "Mustafa", "Mya", "Myah", "Mylene", "Myles", "Myra", "Myriam", "Myrl", "Myrna", "Myron", "Myrtice", "Myrtie", "Myrtis", "Myrtle", "Nadia", "Nakia", "Name", "Nannie", "Naomi", "Naomie", "Napoleon", "Narciso", "Nash", "Nasir", "Nat", "Natalia", "Natalie", "Natasha", "Nathan", "Nathanael", "Nathanial", "Nathaniel", "Nathen", "Nayeli", "Neal", "Ned", "Nedra", "Neha", "Neil", "Nelda", "Nella", "Nelle", "Nellie", "Nels", "Nelson", "Neoma", "Nestor", "Nettie", "Neva", "Newell", "Newton", "Nia", "Nicholas", "Nicholaus", "Nichole", "Nick", "Nicklaus", "Nickolas", "Nico", "Nicola", "Nicolas", "Nicole", "Nicolette", "Nigel", "Nikita", "Nikki", "Nikko", "Niko", "Nikolas", "Nils", "Nina", "Noah", "Noble", "Noe", "Noel", "Noelia", "Noemi", "Noemie", "Noemy", "Nola", "Nolan", "Nona", "Nora", "Norbert", "Norberto", "Norene", "Norma", "Norris", "Norval", "Norwood", "Nova", "Novella", "Nya", "Nyah", "Nyasia", "Obie", "Oceane", "Ocie", "Octavia", "Oda", "Odell", "Odessa", "Odie", "Ofelia", "Okey", "Ola", "Olaf", "Ole", "Olen", "Oleta", "Olga", "Olin", "Oliver", "Ollie", "Oma", "Omari", "Omer", "Ona", "Onie", "Opal", "Ophelia", "Ora", "Oral", "Oran", "Oren", "Orie", "Orin", "Orion", "Orland", "Orlando", "Orlo", "Orpha", "Orrin", "Orval", "Orville", "Osbaldo", "Osborne", "Oscar", "Osvaldo", "Oswald", "Oswaldo", "Otha", "Otho", "Otilia", "Otis", "Ottilie", "Ottis", "Otto", "Ova", "Owen", "Ozella", "Pablo", "Paige", "Palma", "Pamela", "Pansy", "Paolo", "Paris", "Parker", "Pascale", "Pasquale", "Pat", "Patience", "Patricia", "Patrick", "Patsy", "Pattie", "Paul", "Paula", "Pauline", "Paxton", "Payton", "Pearl", "Pearlie", "Pearline", "Pedro", "Peggie", "Penelope", "Percival", "Percy", "Perry", "Pete", "Peter", "Petra", "Peyton", "Philip", "Phoebe", "Phyllis", "Pierce", "Pierre", "Pietro", "Pink", "Pinkie", "Piper", "Polly", "Porter", "Precious", "Presley", "Preston", "Price", "Prince", "Princess", "Priscilla", "Providenci", "Prudence", "Queen", "Queenie", "Quentin", "Quincy", "Quinn", "Quinten", "Quinton", "Rachael", "Rachel", "Rachelle", "Rae", "Raegan", "Rafael", "Rafaela", "Raheem", "Rahsaan", "Rahul", "Raina", "Raleigh", "Ralph", "Ramiro", "Ramon", "Ramona", "Randal", "Randall", "Randi", "Randy", "Ransom", "Raoul", "Raphael", "Raphaelle", "Raquel", "Rashad", "Rashawn", "Rasheed", "Raul", "Raven", "Ray", "Raymond", "Raymundo", "Reagan", "Reanna", "Reba", "Rebeca", "Rebecca", "Rebeka", "Rebekah", "Reece", "Reed", "Reese", "Regan", "Reggie", "Reginald", "Reid", "Reilly", "Reina", "Reinhold", "Remington", "Rene", "Renee", "Ressie", "Reta", "Retha", "Retta", "Reuben", "Reva", "Rex", "Rey", "Reyes", "Reymundo", "Reyna", "Reynold", "Rhea", "Rhett", "Rhianna", "Rhiannon", "Rhoda", "Ricardo", "Richard", "Richie", "Richmond", "Rick", "Rickey", "Rickie", "Ricky", "Rico", "Rigoberto", "Riley", "Rita", "River", "Robb", "Robbie", "Robert", "Roberta", "Roberto", "Robin", "Robyn", "Rocio", "Rocky", "Rod", "Roderick", "Rodger", "Rodolfo", "Rodrick", "Rodrigo", "Roel", "Rogelio", "Roger", "Rogers", "Rolando", "Rollin", "Roma", "Romaine", "Roman", "Ron", "Ronaldo", "Ronny", "Roosevelt", "Rory", "Rosa", "Rosalee", "Rosalia", "Rosalind", "Rosalinda", "Rosalyn", "Rosamond", "Rosanna", "Rosario", "Roscoe", "Rose", "Rosella", "Roselyn", "Rosemarie", "Rosemary", "Rosendo", "Rosetta", "Rosie", "Rosina", "Roslyn", "Ross", "Rossie", "Rowan", "Rowena", "Rowland", "Roxane", "Roxanne", "Roy", "Royal", "Royce", "Rozella", "Ruben", "Rubie", "Ruby", "Rubye", "Rudolph", "Rudy", "Rupert", "Russ", "Russel", "Russell", "Rusty", "Ruth", "Ruthe", "Ruthie", "Ryan", "Ryann", "Ryder", "Rylan", "Rylee", "Ryleigh", "Ryley", "Sabina", "Sabrina", "Sabryna", "Sadie", "Sadye", "Sage", "Saige", "Sallie", "Sally", "Salma", "Salvador", "Salvatore", "Sam", "Samanta", "Samantha", "Samara", "Samir", "Sammie", "Sammy", "Samson", "Sandra", "Sandrine", "Sandy", "Sanford", "Santa", "Santiago", "Santina", "Santino", "Santos", "Sarah", "Sarai", "Sarina", "Sasha", "Saul", "Savanah", "Savanna", "Savannah", "Savion", "Scarlett", "Schuyler", "Scot", "Scottie", "Scotty", "Seamus", "Sean", "Sebastian", "Sedrick", "Selena", "Selina", "Selmer", "Serena", "Serenity", "Seth", "Shad", "Shaina", "Shakira", "Shana", "Shane", "Shanel", "Shanelle", "Shania", "Shanie", "Shaniya", "Shanna", "Shannon", "Shanny", "Shanon", "Shany", "Sharon", "Shaun", "Shawn", "Shawna", "Shaylee", "Shayna", "Shayne", "Shea", "Sheila", "Sheldon", "Shemar", "Sheridan", "Sherman", "Sherwood", "Shirley", "Shyann", "Shyanne", "Sibyl", "Sid", "Sidney", "Sienna", "Sierra", "Sigmund", "Sigrid", "Sigurd", "Silas", "Sim", "Simeon", "Simone", "Sincere", "Sister", "Skye", "Skyla", "Skylar", "Sofia", "Soledad", "Solon", "Sonia", "Sonny", "Sonya", "Sophia", "Sophie", "Spencer", "Stacey", "Stacy", "Stan", "Stanford", "Stanley", "Stanton", "Stefan", "Stefanie", "Stella", "Stephan", "Stephania", "Stephanie", "Stephany", "Stephen", "Stephon", "Sterling", "Steve", "Stevie", "Stewart", "Stone", "Stuart", "Summer", "Sunny", "Susan", "Susana", "Susanna", "Susie", "Suzanne", "Sven", "Syble", "Sydnee", "Sydney", "Sydni", "Sydnie", "Sylvan", "Sylvester", "Sylvia", "Tabitha", "Tad", "Talia", "Talon", "Tamara", "Tamia", "Tania", "Tanner", "Tanya", "Tara", "Taryn", "Tate", "Tatum", "Tatyana", "Taurean", "Tavares", "Taya", "Taylor", "Teagan", "Ted", "Telly", "Terence", "Teresa", "Terrance", "Terrell", "Terrence", "Terrill", "Terry", "Tess", "Tessie", "Tevin", "Thad", "Thaddeus", "Thalia", "Thea", "Thelma", "Theo", "Theodora", "Theodore", "Theresa", "Therese", "Theresia", "Theron", "Thomas", "Thora", "Thurman", "Tia", "Tiana", "Tianna", "Tiara", "Tierra", "Tiffany", "Tillman", "Timmothy", "Timmy", "Timothy", "Tina", "Tito", "Titus", "Tobin", "Toby", "Tod", "Tom", "Tomas", "Tomasa", "Tommie", "Toney", "Toni", "Tony", "Torey", "Torrance", "Torrey", "Toy", "Trace", "Tracey", "Tracy", "Travis", "Travon", "Tre", "Tremaine", "Tremayne", "Trent", "Trenton", "Tressa", "Tressie", "Treva", "Trever", "Trevion", "Trevor", "Trey", "Trinity", "Trisha", "Tristian", "Tristin", "Triston", "Troy", "Trudie", "Trycia", "Trystan", "Turner", "Twila", "Tyler", "Tyra", "Tyree", "Tyreek", "Tyrel", "Tyrell", "Tyrese", "Tyrique", "Tyshawn", "Tyson", "Ubaldo", "Ulices", "Ulises", "Una", "Unique", "Urban", "Uriah", "Uriel", "Ursula", "Vada", "Valentin", "Valentina", "Valentine", "Valerie", "Vallie", "Van", "Vance", "Vanessa", "Vaughn", "Veda", "Velda", "Vella", "Velma", "Velva", "Vena", "Verda", "Verdie", "Vergie", "Verla", "Verlie", "Vern", "Verna", "Verner", "Vernice", "Vernie", "Vernon", "Verona", "Veronica", "Vesta", "Vicenta", "Vicente", "Vickie", "Vicky", "Victor", "Victoria", "Vida", "Vidal", "Vilma", "Vince", "Vincent", "Vincenza", "Vincenzo", "Vinnie", "Viola", "Violet", "Violette", "Virgie", "Virgil", "Virginia", "Virginie", "Vita", "Vito", "Viva", "Vivian", "Viviane", "Vivianne", "Vivien", "Vivienne", "Vladimir", "Wade", "Waino", "Waldo", "Walker", "Wallace", "Walter", "Walton", "Wanda", "Ward", "Warren", "Watson", "Wava", "Waylon", "Wayne", "Webster", "Weldon", "Wellington", "Wendell", "Wendy", "Werner", "Westley", "Weston", "Whitney", "Wilber", "Wilbert", "Wilburn", "Wiley", "Wilford", "Wilfred", "Wilfredo", "Wilfrid", "Wilhelm", "Wilhelmine", "Will", "Willa", "Willard", "William", "Willie", "Willis", "Willow", "Willy", "Wilma", "Wilmer", "Wilson", "Wilton", "Winfield", "Winifred", "Winnifred", "Winona", "Winston", "Woodrow", "Wyatt", "Wyman", "Xander", "Xavier", "Xzavier", "Yadira", "Yasmeen", "Yasmin", "Yasmine", "Yazmin", "Yesenia", "Yessenia", "Yolanda", "Yoshiko", "Yvette", "Yvonne", "Zachariah", "Zachary", "Zachery", "Zack", "Zackary", "Zackery", "Zakary", "Zander", "Zane", "Zaria", "Zechariah", "Zelda", "Zella", "Zelma", "Zena", "Zetta", "Zion", "Zita", "Zoe", "Zoey", "Zoie", "Zoila", "Zola", "Zora", "Zula"], female: ["Mary", "Patricia", "Linda", "Barbara", "Elizabeth", "Jennifer", "Maria", "Susan", "Margaret", "Dorothy", "Lisa", "Nancy", "Karen", "Betty", "Helen", "Sandra", "Donna", "Carol", "Ruth", "Sharon", "Michelle", "Laura", "Sarah", "Kimberly", "Deborah", "Jessica", "Shirley", "Cynthia", "Angela", "Melissa", "Brenda", "Amy", "Anna", "Rebecca", "Virginia", "Kathleen", "Pamela", "Martha", "Debra", "Amanda", "Stephanie", "Carolyn", "Christine", "Marie", "Janet", "Catherine", "Frances", "Ann", "Joyce", "Diane", "Alice", "Julie", "Heather", "Teresa", "Doris", "Gloria", "Evelyn", "Jean", "Cheryl", "Mildred", "Katherine", "Joan", "Ashley", "Judith", "Rose", "Janice", "Kelly", "Nicole", "Judy", "Christina", "Kathy", "Theresa", "Beverly", "Denise", "Tammy", "Irene", "Jane", "Lori", "Rachel", "Marilyn", "Andrea", "Kathryn", "Louise", "Sara", "Anne", "Jacqueline", "Wanda", "Bonnie", "Julia", "Ruby", "Lois", "Tina", "Phyllis", "Norma", "Paula", "Diana", "Annie", "Lillian", "Emily", "Robin", "Peggy", "Crystal", "Gladys", "Rita", "Dawn", "Connie", "Florence", "Tracy", "Edna", "Tiffany", "Carmen", "Rosa", "Cindy", "Grace", "Wendy", "Victoria", "Edith", "Kim", "Sherry", "Sylvia", "Josephine", "Thelma", "Shannon", "Sheila", "Ethel", "Ellen", "Elaine", "Marjorie", "Carrie", "Charlotte", "Monica", "Esther", "Pauline", "Emma", "Juanita", "Anita", "Rhonda", "Hazel", "Amber", "Eva", "Debbie", "April", "Leslie", "Clara", "Lucille", "Jamie", "Joanne", "Eleanor", "Valerie", "Danielle", "Megan", "Alicia", "Suzanne", "Michele", "Gail", "Bertha", "Darlene", "Veronica", "Jill", "Erin", "Geraldine", "Lauren", "Cathy", "Joann", "Lorraine", "Lynn", "Sally", "Regina", "Erica", "Beatrice", "Dolores", "Bernice", "Audrey", "Yvonne", "Annette", "June", "Samantha", "Marion", "Dana", "Stacy", "Ana", "Renee", "Ida", "Vivian", "Roberta", "Holly", "Brittany", "Melanie", "Loretta", "Yolanda", "Jeanette", "Laurie", "Katie", "Kristen", "Vanessa", "Alma", "Sue", "Elsie", "Beth", "Jeanne", "Vicki", "Carla", "Tara", "Rosemary", "Eileen", "Terri", "Gertrude", "Lucy", "Tonya", "Ella", "Stacey", "Wilma", "Gina", "Kristin", "Jessie", "Natalie", "Agnes", "Vera", "Willie", "Charlene", "Bessie", "Delores", "Melinda", "Pearl", "Arlene", "Maureen", "Colleen", "Allison", "Tamara", "Joy", "Georgia", "Constance", "Lillie", "Claudia", "Jackie", "Marcia", "Tanya", "Nellie", "Minnie", "Marlene", "Heidi", "Glenda", "Lydia", "Viola", "Courtney", "Marian", "Stella", "Caroline", "Dora", "Jo", "Vickie", "Mattie", "Terry", "Maxine", "Irma", "Mabel", "Marsha", "Myrtle", "Lena", "Christy", "Deanna", "Patsy", "Hilda", "Gwendolyn", "Jennie", "Nora", "Margie", "Nina", "Cassandra", "Leah", "Penny", "Kay", "Priscilla", "Naomi", "Carole", "Brandy", "Olga", "Billie", "Dianne", "Tracey", "Leona", "Jenny", "Felicia", "Sonia", "Miriam", "Velma", "Becky", "Bobbie", "Violet", "Kristina", "Toni", "Misty", "Mae", "Shelly", "Daisy", "Ramona", "Sherri", "Erika", "Katrina", "Claire", "Lindsey", "Lindsay", "Geneva", "Guadalupe", "Belinda", "Margarita", "Sheryl", "Cora", "Faye", "Ada", "Natasha", "Sabrina", "Isabel", "Marguerite", "Hattie", "Harriet", "Molly", "Cecilia", "Kristi", "Brandi", "Blanche", "Sandy", "Rosie", "Joanna", "Iris", "Eunice", "Angie", "Inez", "Lynda", "Madeline", "Amelia", "Alberta", "Genevieve", "Monique", "Jodi", "Janie", "Maggie", "Kayla", "Sonya", "Jan", "Lee", "Kristine", "Candace", "Fannie", "Maryann", "Opal", "Alison", "Yvette", "Melody", "Luz", "Susie", "Olivia", "Flora", "Shelley", "Kristy", "Mamie", "Lula", "Lola", "Verna", "Beulah", "Antoinette", "Candice", "Juana", "Jeannette", "Pam", "Kelli", "Hannah", "Whitney", "Bridget", "Karla", "Celia", "Latoya", "Patty", "Shelia", "Gayle", "Della", "Vicky", "Lynne", "Sheri", "Marianne", "Kara", "Jacquelyn", "Erma", "Blanca", "Myra", "Leticia", "Pat", "Krista", "Roxanne", "Angelica", "Johnnie", "Robyn", "Francis", "Adrienne", "Rosalie", "Alexandra", "Brooke", "Bethany", "Sadie", "Bernadette", "Traci", "Jody", "Kendra", "Jasmine", "Nichole", "Rachael", "Chelsea", "Mable", "Ernestine", "Muriel", "Marcella", "Elena", "Krystal", "Angelina", "Nadine", "Kari", "Estelle", "Dianna", "Paulette", "Lora", "Mona", "Doreen", "Rosemarie", "Angel", "Desiree", "Antonia", "Hope", "Ginger", "Janis", "Betsy", "Christie", "Freda", "Mercedes", "Meredith", "Lynette", "Teri", "Cristina", "Eula", "Leigh", "Meghan", "Sophia", "Eloise", "Rochelle", "Gretchen", "Cecelia", "Raquel", "Henrietta", "Alyssa", "Jana", "Kelley", "Gwen", "Kerry", "Jenna", "Tricia", "Laverne", "Olive", "Alexis", "Tasha", "Silvia", "Elvira", "Casey", "Delia", "Sophie", "Kate", "Patti", "Lorena", "Kellie", "Sonja", "Lila", "Lana", "Darla", "May", "Mindy", "Essie", "Mandy", "Lorene", "Elsa", "Josefina", "Jeannie", "Miranda", "Dixie", "Lucia", "Marta", "Faith", "Lela", "Johanna", "Shari", "Camille", "Tami", "Shawna", "Elisa", "Ebony", "Melba", "Ora", "Nettie", "Tabitha", "Ollie", "Jaime", "Winifred", "Kristie"], male: ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Charles", "Joseph", "Thomas", "Christopher", "Daniel", "Paul", "Mark", "Donald", "George", "Kenneth", "Steven", "Edward", "Brian", "Ronald", "Anthony", "Kevin", "Jason", "Matthew", "Gary", "Timothy", "Jose", "Larry", "Jeffrey", "Frank", "Scott", "Eric", "Stephen", "Andrew", "Raymond", "Gregory", "Joshua", "Jerry", "Dennis", "Walter", "Patrick", "Peter", "Harold", "Douglas", "Henry", "Carl", "Arthur", "Ryan", "Roger", "Joe", "Juan", "Jack", "Albert", "Jonathan", "Justin", "Terry", "Gerald", "Keith", "Samuel", "Willie", "Ralph", "Lawrence", "Nicholas", "Roy", "Benjamin", "Bruce", "Brandon", "Adam", "Harry", "Fred", "Wayne", "Billy", "Steve", "Louis", "Jeremy", "Aaron", "Randy", "Howard", "Eugene", "Carlos", "Russell", "Bobby", "Victor", "Martin", "Ernest", "Phillip", "Todd", "Jesse", "Craig", "Alan", "Shawn", "Clarence", "Sean", "Philip", "Chris", "Johnny", "Earl", "Jimmy", "Antonio", "Danny", "Bryan", "Tony", "Luis", "Mike", "Stanley", "Leonard", "Nathan", "Dale", "Manuel", "Rodney", "Curtis", "Norman", "Allen", "Marvin", "Vincent", "Glenn", "Jeffery", "Travis", "Jeff", "Chad", "Jacob", "Lee", "Melvin", "Alfred", "Kyle", "Francis", "Bradley", "Jesus", "Herbert", "Frederick", "Ray", "Joel", "Edwin", "Don", "Eddie", "Ricky", "Troy", "Randall", "Barry", "Alexander", "Bernard", "Mario", "Leroy", "Francisco", "Marcus", "Micheal", "Theodore", "Clifford", "Miguel", "Oscar", "Jay", "Jim", "Tom", "Calvin", "Alex", "Jon", "Ronnie", "Bill", "Lloyd", "Tommy", "Leon", "Derek", "Warren", "Darrell", "Jerome", "Floyd", "Leo", "Alvin", "Tim", "Wesley", "Gordon", "Dean", "Greg", "Jorge", "Dustin", "Pedro", "Derrick", "Dan", "Lewis", "Zachary", "Corey", "Herman", "Maurice", "Vernon", "Roberto", "Clyde", "Glen", "Hector", "Shane", "Ricardo", "Sam", "Rick", "Lester", "Brent", "Ramon", "Charlie", "Tyler", "Gilbert", "Gene", "Marc", "Reginald", "Ruben", "Brett", "Angel", "Nathaniel", "Rafael", "Leslie", "Edgar", "Milton", "Raul", "Ben", "Chester", "Cecil", "Duane", "Franklin", "Andre", "Elmer", "Brad", "Gabriel", "Ron", "Mitchell", "Roland", "Arnold", "Harvey", "Jared", "Adrian", "Karl", "Cory", "Claude", "Erik", "Darryl", "Jamie", "Neil", "Jessie", "Christian", "Javier", "Fernando", "Clinton", "Ted", "Mathew", "Tyrone", "Darren", "Lonnie", "Lance", "Cody", "Julio", "Kelly", "Kurt", "Allan", "Nelson", "Guy", "Clayton", "Hugh", "Max", "Dwayne", "Dwight", "Armando", "Felix", "Jimmie", "Everett", "Jordan", "Ian", "Wallace", "Ken", "Bob", "Jaime", "Casey", "Alfredo", "Alberto", "Dave", "Ivan", "Johnnie", "Sidney", "Byron", "Julian", "Isaac", "Morris", "Clifton", "Willard", "Daryl", "Ross", "Virgil", "Andy", "Marshall", "Salvador", "Perry", "Kirk", "Sergio", "Marion", "Tracy", "Seth", "Kent", "Terrance", "Rene", "Eduardo", "Terrence", "Enrique", "Freddie", "Wade", "Austin", "Stuart", "Fredrick", "Arturo", "Alejandro", "Jackie", "Joey", "Nick", "Luther", "Wendell", "Jeremiah", "Evan", "Julius", "Dana", "Donnie", "Otis", "Shannon", "Trevor", "Oliver", "Luke", "Homer", "Gerard", "Doug", "Kenny", "Hubert", "Angelo", "Shaun", "Lyle", "Matt", "Lynn", "Alfonso", "Orlando", "Rex", "Carlton", "Ernesto", "Cameron", "Neal", "Pablo", "Lorenzo", "Omar", "Wilbur", "Blake", "Grant", "Horace", "Roderick", "Kerry", "Abraham", "Willis", "Rickey", "Jean", "Ira", "Andres", "Cesar", "Johnathan", "Malcolm", "Rudolph", "Damon", "Kelvin", "Rudy", "Preston", "Alton", "Archie", "Marco", "Wm", "Pete", "Randolph", "Garry", "Geoffrey", "Jonathon", "Felipe", "Bennie", "Gerardo", "Ed", "Dominic", "Robin", "Loren", "Delbert", "Colin", "Guillermo", "Earnest", "Lucas", "Benny", "Noel", "Spencer", "Rodolfo", "Myron", "Edmund", "Garrett", "Salvatore", "Cedric", "Lowell", "Gregg", "Sherman", "Wilson", "Devin", "Sylvester", "Kim", "Roosevelt", "Israel", "Jermaine", "Forrest", "Wilbert", "Leland", "Simon", "Guadalupe", "Clark", "Irving", "Carroll", "Bryant", "Owen", "Rufus", "Woodrow", "Sammy", "Kristopher", "Mack", "Levi", "Marcos", "Gustavo", "Jake", "Lionel", "Marty", "Taylor", "Ellis", "Dallas", "Gilberto", "Clint", "Nicolas", "Laurence", "Ismael", "Orville", "Drew", "Jody", "Ervin", "Dewey", "Al", "Wilfred", "Josh", "Hugo", "Ignacio", "Caleb", "Tomas", "Sheldon", "Erick", "Frankie", "Stewart", "Doyle", "Darrel", "Rogelio", "Terence", "Santiago", "Alonzo", "Elias", "Bert", "Elbert", "Ramiro", "Conrad", "Pat", "Noah", "Grady", "Phil", "Cornelius", "Lamar", "Rolando", "Clay", "Percy", "Dexter", "Bradford", "Merle", "Darin", "Amos", "Terrell", "Moses", "Irvin", "Saul", "Roman", "Darnell", "Randal", "Tommie", "Timmy", "Darrin", "Winston", "Brendan", "Toby", "Van", "Abel", "Dominick", "Boyd", "Courtney", "Jan", "Emilio", "Elijah", "Cary", "Domingo", "Santos", "Aubrey", "Emmett", "Marlon", "Emanuel", "Jerald", "Edmond"] }, nu = ["Agender", "Androgyne", "Androgynous", "Bigender", "Cis female", "Cis male", "Cis man", "Cis woman", "Cis", "Cisgender female", "Cisgender male", "Cisgender man", "Cisgender woman", "Cisgender", "Demi-boy", "Demi-girl", "Demi-man", "Demi-woman", "Demiflux", "Demigender", "F2M", "FTM", "Female to male trans man", "Female to male transgender man", "Female to male transsexual man", "Female to male", "Gender fluid", "Gender neutral", "Gender nonconforming", "Gender questioning", "Gender variant", "Genderflux", "Genderqueer", "Hermaphrodite", "Intersex man", "Intersex person", "Intersex woman", "Intersex", "M2F", "MTF", "Male to female trans woman", "Male to female transgender woman", "Male to female transsexual woman", "Male to female", "Man", "Multigender", "Neither", "Neutrois", "Non-binary", "Omnigender", "Other", "Pangender", "Polygender", "T* man", "T* woman", "Trans female", "Trans male", "Trans man", "Trans person", "Trans woman", "Trans", "Transsexual female", "Transsexual male", "Transsexual man", "Transsexual person", "Transsexual woman", "Transsexual", "Transgender female", "Transgender person", "Transmasculine", "Trigender", "Two* person", "Two-spirit person", "Two-spirit", "Woman", "Xenogender"], iu = ["Solutions", "Program", "Brand", "Security", "Research", "Marketing", "Directives", "Implementation", "Integration", "Functionality", "Response", "Paradigm", "Tactics", "Identity", "Markets", "Group", "Division", "Applications", "Optimization", "Operations", "Infrastructure", "Intranet", "Communications", "Web", "Branding", "Quality", "Assurance", "Mobility", "Accounts", "Data", "Creative", "Configuration", "Accountability", "Interactions", "Factors", "Usability", "Metrics"], uu = ["Lead", "Senior", "Direct", "Corporate", "Dynamic", "Future", "Product", "National", "Regional", "District", "Central", "Global", "Customer", "Investor", "International", "Legacy", "Forward", "Internal", "Human", "Chief", "Principal"], tu = ["{{person.jobDescriptor}} {{person.jobArea}} {{person.jobType}}"], ou = ["Supervisor", "Associate", "Executive", "Liaison", "Officer", "Manager", "Engineer", "Specialist", "Director", "Coordinator", "Administrator", "Architect", "Analyst", "Designer", "Planner", "Orchestrator", "Technician", "Developer", "Producer", "Consultant", "Assistant", "Facilitator", "Agent", "Representative", "Strategist"], lu = { generic: ["Abbott", "Abernathy", "Abshire", "Adams", "Altenwerth", "Anderson", "Ankunding", "Armstrong", "Auer", "Aufderhar", "Bahringer", "Bailey", "Balistreri", "Barrows", "Bartell", "Bartoletti", "Barton", "Bashirian", "Batz", "Bauch", "Baumbach", "Bayer", "Beahan", "Beatty", "Bechtelar", "Becker", "Bednar", "Beer", "Beier", "Berge", "Bergnaum", "Bergstrom", "Bernhard", "Bernier", "Bins", "Blanda", "Blick", "Block", "Bode", "Boehm", "Bogan", "Bogisich", "Borer", "Bosco", "Botsford", "Boyer", "Boyle", "Bradtke", "Brakus", "Braun", "Breitenberg", "Brekke", "Brown", "Bruen", "Buckridge", "Carroll", "Carter", "Cartwright", "Casper", "Cassin", "Champlin", "Christiansen", "Cole", "Collier", "Collins", "Conn", "Connelly", "Conroy", "Considine", "Corkery", "Cormier", "Corwin", "Cremin", "Crist", "Crona", "Cronin", "Crooks", "Cruickshank", "Cummerata", "Cummings", "Dach", "D'Amore", "Daniel", "Dare", "Daugherty", "Davis", "Deckow", "Denesik", "Dibbert", "Dickens", "Dicki", "Dickinson", "Dietrich", "Donnelly", "Dooley", "Douglas", "Doyle", "DuBuque", "Durgan", "Ebert", "Effertz", "Emard", "Emmerich", "Erdman", "Ernser", "Fadel", "Fahey", "Farrell", "Fay", "Feeney", "Feest", "Feil", "Ferry", "Fisher", "Flatley", "Frami", "Franecki", "Franey", "Friesen", "Fritsch", "Funk", "Gerhold", "Gerlach", "Gibson", "Gislason", "Gleason", "Gleichner", "Glover", "Goldner", "Goodwin", "Gorczany", "Gottlieb", "Goyette", "Grady", "Graham", "Grant", "Green", "Greenfelder", "Greenholt", "Grimes", "Gulgowski", "Gusikowski", "Gutkowski", "Gutmann", "Haag", "Hackett", "Hagenes", "Hahn", "Haley", "Halvorson", "Hamill", "Hammes", "Hand", "Hane", "Hansen", "Harber", "Harris", "Hartmann", "Harvey", "Hauck", "Hayes", "Heaney", "Heathcote", "Hegmann", "Heidenreich", "Heller", "Herman", "Hermann", "Hermiston", "Herzog", "Hessel", "Hettinger", "Hickle", "Hilll", "Hills", "Hilpert", "Hintz", "Hirthe", "Hodkiewicz", "Hoeger", "Homenick", "Hoppe", "Howe", "Howell", "Hudson", "Huel", "Huels", "Hyatt", "Jacobi", "Jacobs", "Jacobson", "Jakubowski", "Jaskolski", "Jast", "Jenkins", "Jerde", "Johns", "Johnson", "Johnston", "Jones", "Kassulke", "Kautzer", "Keebler", "Keeling", "Kemmer", "Kerluke", "Kertzmann", "Kessler", "Kiehn", "Kihn", "Kilback", "King", "Kirlin", "Klein", "Kling", "Klocko", "Koch", "Koelpin", "Koepp", "Kohler", "Konopelski", "Koss", "Kovacek", "Kozey", "Krajcik", "Kreiger", "Kris", "Kshlerin", "Kub", "Kuhic", "Kuhlman", "Kuhn", "Kulas", "Kunde", "Kunze", "Kuphal", "Kutch", "Kuvalis", "Labadie", "Lakin", "Lang", "Langosh", "Langworth", "Larkin", "Larson", "Leannon", "Lebsack", "Ledner", "Leffler", "Legros", "Lehner", "Lemke", "Lesch", "Leuschke", "Lind", "Lindgren", "Littel", "Little", "Lockman", "Lowe", "Lubowitz", "Lueilwitz", "Luettgen", "Lynch", "Macejkovic", "MacGyver", "Maggio", "Mann", "Mante", "Marks", "Marquardt", "Marvin", "Mayer", "Mayert", "McClure", "McCullough", "McDermott", "McGlynn", "McKenzie", "McLaughlin", "Medhurst", "Mertz", "Metz", "Miller", "Mills", "Mitchell", "Moen", "Mohr", "Monahan", "Moore", "Morar", "Morissette", "Mosciski", "Mraz", "Mueller", "Muller", "Murazik", "Murphy", "Murray", "Nader", "Nicolas", "Nienow", "Nikolaus", "Nitzsche", "Nolan", "Oberbrunner", "O'Connell", "O'Conner", "O'Hara", "O'Keefe", "O'Kon", "Okuneva", "Olson", "Ondricka", "O'Reilly", "Orn", "Ortiz", "Osinski", "Pacocha", "Padberg", "Pagac", "Parisian", "Parker", "Paucek", "Pfannerstill", "Pfeffer", "Pollich", "Pouros", "Powlowski", "Predovic", "Price", "Prohaska", "Prosacco", "Purdy", "Quigley", "Quitzon", "Rath", "Ratke", "Rau", "Raynor", "Reichel", "Reichert", "Reilly", "Reinger", "Rempel", "Renner", "Reynolds", "Rice", "Rippin", "Ritchie", "Robel", "Roberts", "Rodriguez", "Rogahn", "Rohan", "Rolfson", "Romaguera", "Roob", "Rosenbaum", "Rowe", "Ruecker", "Runolfsdottir", "Runolfsson", "Runte", "Russel", "Rutherford", "Ryan", "Sanford", "Satterfield", "Sauer", "Sawayn", "Schaden", "Schaefer", "Schamberger", "Schiller", "Schimmel", "Schinner", "Schmeler", "Schmidt", "Schmitt", "Schneider", "Schoen", "Schowalter", "Schroeder", "Schulist", "Schultz", "Schumm", "Schuppe", "Schuster", "Senger", "Shanahan", "Shields", "Simonis", "Sipes", "Skiles", "Smith", "Smitham", "Spencer", "Spinka", "Sporer", "Stamm", "Stanton", "Stark", "Stehr", "Steuber", "Stiedemann", "Stokes", "Stoltenberg", "Stracke", "Streich", "Stroman", "Strosin", "Swaniawski", "Swift", "Terry", "Thiel", "Thompson", "Tillman", "Torp", "Torphy", "Towne", "Toy", "Trantow", "Tremblay", "Treutel", "Tromp", "Turcotte", "Turner", "Ullrich", "Upton", "Vandervort", "Veum", "Volkman", "Von", "VonRueden", "Waelchi", "Walker", "Walsh", "Walter", "Ward", "Waters", "Watsica", "Weber", "Wehner", "Weimann", "Weissnat", "Welch", "West", "White", "Wiegand", "Wilderman", "Wilkinson", "Will", "Williamson", "Willms", "Windler", "Wintheiser", "Wisoky", "Wisozk", "Witting", "Wiza", "Wolf", "Wolff", "Wuckert", "Wunsch", "Wyman", "Yost", "Yundt", "Zboncak", "Zemlak", "Ziemann", "Zieme", "Zulauf"] }, su = { generic: [{ value: "{{person.last_name.generic}}", weight: 95 }, { value: "{{person.last_name.generic}}-{{person.last_name.generic}}", weight: 5 }] }, Fu = { generic: ["Addison", "Alex", "Anderson", "Angel", "Arden", "August", "Austin", "Avery", "Bailey", "Billie", "Blake", "Bowie", "Brooklyn", "Cameron", "Charlie", "Corey", "Dakota", "Drew", "Elliott", "Ellis", "Emerson", "Finley", "Gray", "Greer", "Harper", "Hayden", "Jaden", "James", "Jamie", "Jordan", "Jules", "Kai", "Kendall", "Kennedy", "Kyle", "Leslie", "Logan", "London", "Marlowe", "Micah", "Nico", "Noah", "North", "Parker", "Phoenix", "Quinn", "Reagan", "Reese", "Reign", "Riley", "River", "Robin", "Rory", "Rowan", "Ryan", "Sage", "Sasha", "Sawyer", "Shawn", "Shiloh", "Skyler", "Taylor"], female: ["Abigail", "Adele", "Alex", "Alice", "Alisha", "Amber", "Amelia", "Amora", "Anaïs", "Angelou", "Anika", "Anise", "Annabel", "Anne", "Aphrodite", "Aretha", "Arya", "Ashton", "Aster", "Audrey", "Avery", "Bailee", "Bay", "Belle", "Beth", "Billie", "Blair", "Blaise", "Blake", "Blanche", "Blue", "Bree", "Brielle", "Brienne", "Brooke", "Caleen", "Candice", "Caprice", "Carelyn", "Caylen", "Celine", "Cerise", "Cia", "Claire", "Claudia", "Clementine", "Coral", "Coraline", "Dahlia", "Dakota", "Dawn", "Della", "Demi", "Denise", "Denver", "Devine", "Devon", "Diana", "Dylan", "Ebony", "Eden", "Eleanor", "Elein", "Elizabeth", "Ellen", "Elodie", "Eloise", "Ember", "Emma", "Erin", "Eyre", "Faith", "Farrah", "Fawn", "Fayre", "Fern", "France", "Francis", "Frida", "Genisis", "Georgia", "Grace", "Gwen", "Harley", "Harper", "Hazel", "Helen", "Hippolyta", "Holly", "Hope", "Imani", "Iowa", "Ireland", "Irene", "Iris", "Isa", "Isla", "Ivy", "Jade", "Jane", "Jazz", "Jean", "Jess", "Jett", "Jo", "Joan", "Jolie", "Jordan", "Josie", "Journey", "Joy", "Jules", "Julien", "Juliet", "Juniper", "Justice", "Kali", "Karma", "Kat", "Kate", "Kennedy", "Keva", "Kylie", "Lake", "Lane", "Lark", "Layla", "Lee", "Leigh", "Leona", "Lexi", "London", "Lou", "Louise", "Love", "Luna", "Lux", "Lynn", "Lyric", "Maddie", "Mae", "Marie", "Matilda", "Maude", "Maybel", "Meadow", "Medusa", "Mercy", "Michelle", "Mirabel", "Monroe", "Morgan", "Nalia", "Naomi", "Nova", "Olive", "Paige", "Parker", "Pax", "Pearl", "Penelope", "Phoenix", "Quinn", "Rae", "Rain", "Raven", "Ray", "Raye", "Rebel", "Reese", "Reeve", "Regan", "Riley", "River", "Robin", "Rory", "Rose", "Royal", "Ruth", "Rylie", "Sage", "Sam", "Saturn", "Scout", "Serena", "Sky", "Skylar", "Sofia", "Sophia", "Storm", "Sue", "Suzanne", "Sydney", "Taylen", "Taylor", "Teagan", "Tempest", "Tenley", "Thea", "Trinity", "Valerie", "Venus", "Vera", "Violet", "Willow", "Winter", "Xena", "Zaylee", "Zion", "Zoe"], male: ["Ace", "Aiden", "Alexander", "Ander", "Anthony", "Asher", "August", "Aziel", "Bear", "Beckham", "Benjamin", "Buddy", "Calvin", "Carter", "Charles", "Christopher", "Clyde", "Cooper", "Daniel", "David", "Dior", "Dylan", "Elijah", "Ellis", "Emerson", "Ethan", "Ezra", "Fletcher", "Flynn", "Gabriel", "Grayson", "Gus", "Hank", "Harrison", "Hendrix", "Henry", "Houston", "Hudson", "Hugh", "Isaac", "Jack", "Jackson", "Jacob", "Jakobe", "James", "Jaxon", "Jaxtyn", "Jayden", "John", "Joseph", "Josiah", "Jude", "Julian", "Karsyn", "Kenji", "Kobe", "Kylo", "Lennon", "Leo", "Levi", "Liam", "Lincoln", "Logan", "Louis", "Lucas", "Lucky", "Luke", "Mason", "Mateo", "Matthew", "Maverick", "Michael", "Monroe", "Nixon", "Ocean", "Oliver", "Otis", "Otto", "Owen", "Ozzy", "Parker", "Rocky", "Samuel", "Sebastian", "Sonny", "Teddy", "Theo", "Theodore", "Thomas", "Truett", "Walter", "Warren", "Watson", "William", "Wison", "Wyatt", "Ziggy", "Zyair"] }, cu = [{ value: "{{person.firstName}} {{person.lastName}}", weight: 49 }, { value: "{{person.prefix}} {{person.firstName}} {{person.lastName}}", weight: 7 }, { value: "{{person.firstName}} {{person.lastName}} {{person.suffix}}", weight: 7 }, { value: "{{person.prefix}} {{person.firstName}} {{person.lastName}} {{person.suffix}}", weight: 1 }], du = { generic: ["Dr.", "Miss", "Mr.", "Mrs.", "Ms."], female: ["Mrs.", "Ms.", "Miss", "Dr."], male: ["Mr.", "Dr."] }, hu = ["female", "male"], mu = ["Jr.", "Sr.", "I", "II", "III", "IV", "V", "MD", "DDS", "PhD", "DVM"], pu = ["Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn"], yu = { bio_part: Qi, bio_pattern: eu, bio_supporter: au, first_name: ru, gender: nu, job_area: iu, job_descriptor: uu, job_title_pattern: tu, job_type: ou, last_name: lu, last_name_pattern: su, middle_name: Fu, name: cu, prefix: du, sex: hu, suffix: mu, western_zodiac_sign: pu }, Du = yu, gu = ["!##-!##-####", "(!##) !##-####", "1-!##-!##-####", "!##.!##.####", "!##-!##-#### x###", "(!##) !##-#### x###", "1-!##-!##-#### x###", "!##.!##.#### x###", "!##-!##-#### x####", "(!##) !##-#### x####", "1-!##-!##-#### x####", "!##.!##.#### x####", "!##-!##-#### x#####", "(!##) !##-#### x#####", "1-!##-!##-#### x#####", "!##.!##.#### x#####"], bu = ["+1!##!######"], fu = ["(!##) !##-####"], Cu = { human: gu, international: bu, national: fu }, Eu = Cu, ku = { format: Eu }, Au = ku, Bu = [{ symbol: "H", name: "Hydrogen", atomicNumber: 1 }, { symbol: "He", name: "Helium", atomicNumber: 2 }, { symbol: "Li", name: "Lithium", atomicNumber: 3 }, { symbol: "Be", name: "Beryllium", atomicNumber: 4 }, { symbol: "B", name: "Boron", atomicNumber: 5 }, { symbol: "C", name: "Carbon", atomicNumber: 6 }, { symbol: "N", name: "Nitrogen", atomicNumber: 7 }, { symbol: "O", name: "Oxygen", atomicNumber: 8 }, { symbol: "F", name: "Fluorine", atomicNumber: 9 }, { symbol: "Ne", name: "Neon", atomicNumber: 10 }, { symbol: "Na", name: "Sodium", atomicNumber: 11 }, { symbol: "Mg", name: "Magnesium", atomicNumber: 12 }, { symbol: "Al", name: "Aluminium", atomicNumber: 13 }, { symbol: "Si", name: "Silicon", atomicNumber: 14 }, { symbol: "P", name: "Phosphorus", atomicNumber: 15 }, { symbol: "S", name: "Sulfur", atomicNumber: 16 }, { symbol: "Cl", name: "Chlorine", atomicNumber: 17 }, { symbol: "Ar", name: "Argon", atomicNumber: 18 }, { symbol: "K", name: "Potassium", atomicNumber: 19 }, { symbol: "Ca", name: "Calcium", atomicNumber: 20 }, { symbol: "Sc", name: "Scandium", atomicNumber: 21 }, { symbol: "Ti", name: "Titanium", atomicNumber: 22 }, { symbol: "V", name: "Vanadium", atomicNumber: 23 }, { symbol: "Cr", name: "Chromium", atomicNumber: 24 }, { symbol: "Mn", name: "Manganese", atomicNumber: 25 }, { symbol: "Fe", name: "Iron", atomicNumber: 26 }, { symbol: "Co", name: "Cobalt", atomicNumber: 27 }, { symbol: "Ni", name: "Nickel", atomicNumber: 28 }, { symbol: "Cu", name: "Copper", atomicNumber: 29 }, { symbol: "Zn", name: "Zinc", atomicNumber: 30 }, { symbol: "Ga", name: "Gallium", atomicNumber: 31 }, { symbol: "Ge", name: "Germanium", atomicNumber: 32 }, { symbol: "As", name: "Arsenic", atomicNumber: 33 }, { symbol: "Se", name: "Selenium", atomicNumber: 34 }, { symbol: "Br", name: "Bromine", atomicNumber: 35 }, { symbol: "Kr", name: "Krypton", atomicNumber: 36 }, { symbol: "Rb", name: "Rubidium", atomicNumber: 37 }, { symbol: "Sr", name: "Strontium", atomicNumber: 38 }, { symbol: "Y", name: "Yttrium", atomicNumber: 39 }, { symbol: "Zr", name: "Zirconium", atomicNumber: 40 }, { symbol: "Nb", name: "Niobium", atomicNumber: 41 }, { symbol: "Mo", name: "Molybdenum", atomicNumber: 42 }, { symbol: "Tc", name: "Technetium", atomicNumber: 43 }, { symbol: "Ru", name: "Ruthenium", atomicNumber: 44 }, { symbol: "Rh", name: "Rhodium", atomicNumber: 45 }, { symbol: "Pd", name: "Palladium", atomicNumber: 46 }, { symbol: "Ag", name: "Silver", atomicNumber: 47 }, { symbol: "Cd", name: "Cadmium", atomicNumber: 48 }, { symbol: "In", name: "Indium", atomicNumber: 49 }, { symbol: "Sn", name: "Tin", atomicNumber: 50 }, { symbol: "Sb", name: "Antimony", atomicNumber: 51 }, { symbol: "Te", name: "Tellurium", atomicNumber: 52 }, { symbol: "I", name: "Iodine", atomicNumber: 53 }, { symbol: "Xe", name: "Xenon", atomicNumber: 54 }, { symbol: "Cs", name: "Caesium", atomicNumber: 55 }, { symbol: "Ba", name: "Barium", atomicNumber: 56 }, { symbol: "La", name: "Lanthanum", atomicNumber: 57 }, { symbol: "Ce", name: "Cerium", atomicNumber: 58 }, { symbol: "Pr", name: "Praseodymium", atomicNumber: 59 }, { symbol: "Nd", name: "Neodymium", atomicNumber: 60 }, { symbol: "Pm", name: "Promethium", atomicNumber: 61 }, { symbol: "Sm", name: "Samarium", atomicNumber: 62 }, { symbol: "Eu", name: "Europium", atomicNumber: 63 }, { symbol: "Gd", name: "Gadolinium", atomicNumber: 64 }, { symbol: "Tb", name: "Terbium", atomicNumber: 65 }, { symbol: "Dy", name: "Dysprosium", atomicNumber: 66 }, { symbol: "Ho", name: "Holmium", atomicNumber: 67 }, { symbol: "Er", name: "Erbium", atomicNumber: 68 }, { symbol: "Tm", name: "Thulium", atomicNumber: 69 }, { symbol: "Yb", name: "Ytterbium", atomicNumber: 70 }, { symbol: "Lu", name: "Lutetium", atomicNumber: 71 }, { symbol: "Hf", name: "Hafnium", atomicNumber: 72 }, { symbol: "Ta", name: "Tantalum", atomicNumber: 73 }, { symbol: "W", name: "Tungsten", atomicNumber: 74 }, { symbol: "Re", name: "Rhenium", atomicNumber: 75 }, { symbol: "Os", name: "Osmium", atomicNumber: 76 }, { symbol: "Ir", name: "Iridium", atomicNumber: 77 }, { symbol: "Pt", name: "Platinum", atomicNumber: 78 }, { symbol: "Au", name: "Gold", atomicNumber: 79 }, { symbol: "Hg", name: "Mercury", atomicNumber: 80 }, { symbol: "Tl", name: "Thallium", atomicNumber: 81 }, { symbol: "Pb", name: "Lead", atomicNumber: 82 }, { symbol: "Bi", name: "Bismuth", atomicNumber: 83 }, { symbol: "Po", name: "Polonium", atomicNumber: 84 }, { symbol: "At", name: "Astatine", atomicNumber: 85 }, { symbol: "Rn", name: "Radon", atomicNumber: 86 }, { symbol: "Fr", name: "Francium", atomicNumber: 87 }, { symbol: "Ra", name: "Radium", atomicNumber: 88 }, { symbol: "Ac", name: "Actinium", atomicNumber: 89 }, { symbol: "Th", name: "Thorium", atomicNumber: 90 }, { symbol: "Pa", name: "Protactinium", atomicNumber: 91 }, { symbol: "U", name: "Uranium", atomicNumber: 92 }, { symbol: "Np", name: "Neptunium", atomicNumber: 93 }, { symbol: "Pu", name: "Plutonium", atomicNumber: 94 }, { symbol: "Am", name: "Americium", atomicNumber: 95 }, { symbol: "Cm", name: "Curium", atomicNumber: 96 }, { symbol: "Bk", name: "Berkelium", atomicNumber: 97 }, { symbol: "Cf", name: "Californium", atomicNumber: 98 }, { symbol: "Es", name: "Einsteinium", atomicNumber: 99 }, { symbol: "Fm", name: "Fermium", atomicNumber: 100 }, { symbol: "Md", name: "Mendelevium", atomicNumber: 101 }, { symbol: "No", name: "Nobelium", atomicNumber: 102 }, { symbol: "Lr", name: "Lawrencium", atomicNumber: 103 }, { symbol: "Rf", name: "Rutherfordium", atomicNumber: 104 }, { symbol: "Db", name: "Dubnium", atomicNumber: 105 }, { symbol: "Sg", name: "Seaborgium", atomicNumber: 106 }, { symbol: "Bh", name: "Bohrium", atomicNumber: 107 }, { symbol: "Hs", name: "Hassium", atomicNumber: 108 }, { symbol: "Mt", name: "Meitnerium", atomicNumber: 109 }, { symbol: "Ds", name: "Darmstadtium", atomicNumber: 110 }, { symbol: "Rg", name: "Roentgenium", atomicNumber: 111 }, { symbol: "Cn", name: "Copernicium", atomicNumber: 112 }, { symbol: "Nh", name: "Nihonium", atomicNumber: 113 }, { symbol: "Fl", name: "Flerovium", atomicNumber: 114 }, { symbol: "Mc", name: "Moscovium", atomicNumber: 115 }, { symbol: "Lv", name: "Livermorium", atomicNumber: 116 }, { symbol: "Ts", name: "Tennessine", atomicNumber: 117 }, { symbol: "Og", name: "Oganesson", atomicNumber: 118 }], Su = [{ name: "meter", symbol: "m" }, { name: "second", symbol: "s" }, { name: "mole", symbol: "mol" }, { name: "ampere", symbol: "A" }, { name: "kelvin", symbol: "K" }, { name: "candela", symbol: "cd" }, { name: "kilogram", symbol: "kg" }, { name: "radian", symbol: "rad" }, { name: "hertz", symbol: "Hz" }, { name: "newton", symbol: "N" }, { name: "pascal", symbol: "Pa" }, { name: "joule", symbol: "J" }, { name: "watt", symbol: "W" }, { name: "coulomb", symbol: "C" }, { name: "volt", symbol: "V" }, { name: "ohm", symbol: "Ω" }, { name: "tesla", symbol: "T" }, { name: "degree Celsius", symbol: "°C" }, { name: "lumen", symbol: "lm" }, { name: "becquerel", symbol: "Bq" }, { name: "gray", symbol: "Gy" }, { name: "sievert", symbol: "Sv" }, { name: "steradian", symbol: "sr" }, { name: "farad", symbol: "F" }, { name: "siemens", symbol: "S" }, { name: "weber", symbol: "Wb" }, { name: "henry", symbol: "H" }, { name: "lux", symbol: "lx" }, { name: "katal", symbol: "kat" }], vu = { chemical_element: Bu, unit: Su }, wu = vu, Mu = ["ants", "bats", "bears", "bees", "birds", "buffalo", "cats", "chickens", "cattle", "dogs", "dolphins", "ducks", "elephants", "fishes", "foxes", "frogs", "geese", "goats", "horses", "kangaroos", "lions", "monkeys", "owls", "oxen", "penguins", "people", "pigs", "rabbits", "sheep", "tigers", "whales", "wolves", "zebras", "banshees", "crows", "black cats", "chimeras", "ghosts", "conspirators", "dragons", "dwarves", "elves", "enchanters", "exorcists", "sons", "foes", "giants", "gnomes", "goblins", "gooses", "griffins", "lycanthropes", "nemesis", "ogres", "oracles", "prophets", "sorcerors", "spiders", "spirits", "vampires", "warlocks", "vixens", "werewolves", "witches", "worshipers", "zombies", "druids"], Tu = ["{{location.state}} {{team.creature}}"], Lu = { creature: Mu, name: Tu }, Ru = Lu, Pu = ["Adventure Road Bicycle", "BMX Bicycle", "City Bicycle", "Cruiser Bicycle", "Cyclocross Bicycle", "Dual-Sport Bicycle", "Fitness Bicycle", "Flat-Foot Comfort Bicycle", "Folding Bicycle", "Hybrid Bicycle", "Mountain Bicycle", "Recumbent Bicycle", "Road Bicycle", "Tandem Bicycle", "Touring Bicycle", "Track/Fixed-Gear Bicycle", "Triathlon/Time Trial Bicycle", "Tricycle"], Hu = ["Diesel", "Electric", "Gasoline", "Hybrid"], Gu = ["Aston Martin", "Audi", "BMW", "BYD", "Bentley", "Bugatti", "Cadillac", "Chevrolet", "Chrysler", "Citroën", "Dodge", "Ferrari", "Fiat", "Ford", "Honda", "Hyundai", "Jaguar", "Jeep", "Kia", "Lamborghini", "Land Rover", "MG", "Mahindra & Mahindra", "Maruti", "Maserati", "Mazda", "Mercedes Benz", "Mini", "Mitsubishi", "NIO", "Nissan", "Peugeot", "Polestar", "Porsche", "Renault", "Rivian", "Rolls Royce", "Skoda", "Smart", "Subaru", "Suzuki", "Tata", "Tesla", "Toyota", "Vauxhall", "Volkswagen", "Volvo"], Nu = ["1", "2", "911", "A4", "A8", "ATS", "Accord", "Alpine", "Altima", "Aventador", "Beetle", "CTS", "CX-9", "Camaro", "Camry", "Challenger", "Charger", "Civic", "Colorado", "Corvette", "Countach", "Cruze", "Durango", "El Camino", "Element", "Escalade", "Expedition", "Explorer", "F-150", "Fiesta", "Focus", "Fortwo", "Golf", "Grand Caravan", "Grand Cherokee", "Impala", "Jetta", "Land Cruiser", "LeBaron", "Malibu", "Mercielago", "Model 3", "Model S", "Model T", "Model X", "Model Y", "Mustang", "PT Cruiser", "Prius", "Ranchero", "Roadster", "Sentra", "Silverado", "Spyder", "Taurus", "V90", "Volt", "Wrangler", "XC90", "XTS"], Wu = ["Cargo Van", "Convertible", "Coupe", "Crew Cab Pickup", "Extended Cab Pickup", "Hatchback", "Minivan", "Passenger Van", "SUV", "Sedan", "Wagon"], xu = { bicycle_type: Pu, fuel: Hu, manufacturer: Gu, model: Nu, type: Wu }, Iu = xu, Ku = ["abandoned", "able", "acceptable", "acclaimed", "accomplished", "accurate", "aching", "acidic", "actual", "admired", "adolescent", "advanced", "affectionate", "afraid", "aged", "aggravating", "aggressive", "agile", "agitated", "agreeable", "ajar", "alarmed", "alert", "alienated", "alive", "all", "altruistic", "amazing", "ambitious", "ample", "amused", "angelic", "anguished", "animated", "annual", "another", "antique", "any", "apprehensive", "appropriate", "apt", "arid", "artistic", "ashamed", "assured", "astonishing", "athletic", "austere", "authentic", "authorized", "avaricious", "average", "aware", "awesome", "awful", "babyish", "back", "bad", "baggy", "bare", "basic", "beloved", "beneficial", "best", "better", "big", "biodegradable", "bitter", "black", "black-and-white", "blank", "blaring", "bleak", "blind", "blond", "blue", "blushing", "bogus", "boiling", "bony", "boring", "bossy", "both", "bouncy", "bowed", "brave", "breakable", "bright", "brilliant", "brisk", "broken", "brown", "bruised", "bulky", "burdensome", "burly", "bustling", "busy", "buttery", "buzzing", "calculating", "candid", "carefree", "careless", "caring", "cautious", "cavernous", "celebrated", "charming", "cheap", "cheerful", "chilly", "chubby", "circular", "classic", "clean", "clear", "clear-cut", "close", "closed", "cloudy", "clueless", "clumsy", "cluttered", "coarse", "colorful", "colorless", "colossal", "comfortable", "common", "compassionate", "competent", "complete", "complicated", "concerned", "concrete", "confused", "considerate", "content", "cool", "cooperative", "coordinated", "corny", "corrupt", "courageous", "courteous", "crafty", "crazy", "creamy", "creative", "criminal", "critical", "crooked", "crowded", "cruel", "crushing", "cuddly", "cultivated", "cumbersome", "curly", "cute", "damaged", "damp", "dapper", "dark", "darling", "dazzling", "dead", "deadly", "deafening", "dearest", "decent", "decisive", "deep", "defenseless", "defensive", "deficient", "definite", "definitive", "delectable", "delicious", "delirious", "dense", "dental", "dependable", "dependent", "descriptive", "deserted", "determined", "devoted", "different", "difficult", "digital", "diligent", "dim", "direct", "dirty", "discrete", "disloyal", "dismal", "distant", "distinct", "distorted", "doting", "downright", "drab", "dramatic", "dreary", "dual", "dull", "dutiful", "each", "early", "earnest", "easy", "ecstatic", "edible", "educated", "elastic", "elderly", "electric", "elegant", "elementary", "elliptical", "eminent", "emotional", "empty", "enchanted", "enchanting", "energetic", "enlightened", "enraged", "entire", "equatorial", "essential", "esteemed", "ethical", "everlasting", "every", "evil", "exalted", "excellent", "excitable", "excited", "exhausted", "exotic", "expensive", "experienced", "expert", "extra-large", "extroverted", "failing", "faint", "fair", "fake", "familiar", "fantastic", "far", "far-flung", "far-off", "faraway", "fat", "fatal", "fatherly", "favorable", "favorite", "fearless", "feline", "filthy", "fine", "finished", "firm", "first", "firsthand", "fixed", "flashy", "flawed", "flawless", "flickering", "flimsy", "flowery", "fluffy", "flustered", "focused", "fond", "foolhardy", "foolish", "forceful", "formal", "forsaken", "fortunate", "fragrant", "frail", "frank", "free", "french", "frequent", "friendly", "frightened", "frilly", "frivolous", "frizzy", "front", "frozen", "frugal", "fruitful", "functional", "funny", "fussy", "fuzzy", "gaseous", "general", "gentle", "genuine", "gifted", "gigantic", "giving", "glaring", "glass", "gleaming", "glittering", "gloomy", "glorious", "glossy", "glum", "golden", "good", "good-natured", "gorgeous", "graceful", "gracious", "grandiose", "granular", "grave", "gray", "great", "greedy", "grim", "grimy", "gripping", "grizzled", "grouchy", "grounded", "growing", "grown", "grubby", "gruesome", "grumpy", "guilty", "gullible", "gummy", "hairy", "handsome", "handy", "happy", "happy-go-lucky", "hard-to-find", "harmful", "hasty", "hateful", "haunting", "heartfelt", "heavenly", "heavy", "hefty", "helpful", "helpless", "hidden", "hoarse", "hollow", "homely", "honorable", "honored", "hopeful", "hospitable", "hot", "huge", "humble", "humiliating", "hungry", "hurtful", "husky", "icy", "ideal", "idealistic", "idolized", "ignorant", "ill", "ill-fated", "illiterate", "illustrious", "imaginary", "imaginative", "immaculate", "immediate", "immense", "impartial", "impassioned", "impeccable", "impish", "impolite", "important", "impossible", "impractical", "impressionable", "impressive", "improbable", "impure", "inborn", "incomparable", "incomplete", "inconsequential", "indelible", "indolent", "inexperienced", "infamous", "infatuated", "inferior", "infinite", "informal", "innocent", "insecure", "insidious", "insignificant", "insistent", "instructive", "intelligent", "intent", "interesting", "internal", "international", "intrepid", "ironclad", "irresponsible", "jagged", "jam-packed", "jaunty", "jealous", "jittery", "joyful", "joyous", "jubilant", "judicious", "juicy", "jumbo", "junior", "juvenile", "kaleidoscopic", "key", "knotty", "knowledgeable", "known", "kooky", "kosher", "lanky", "last", "lasting", "late", "lavish", "lawful", "lazy", "leading", "lean", "left", "legal", "light", "lighthearted", "likable", "likely", "limited", "limp", "limping", "linear", "lined", "liquid", "little", "live", "lively", "livid", "lone", "lonely", "long", "long-term", "lost", "lovable", "lovely", "low", "lucky", "lumbering", "lumpy", "lustrous", "mad", "made-up", "magnificent", "majestic", "major", "male", "mammoth", "married", "marvelous", "massive", "mature", "meager", "mealy", "mean", "measly", "meaty", "mediocre", "medium", "memorable", "menacing", "merry", "messy", "metallic", "mild", "milky", "mindless", "minor", "minty", "miserable", "miserly", "misguided", "mixed", "moist", "monstrous", "monthly", "monumental", "moral", "motionless", "muddy", "muffled", "multicolored", "mundane", "murky", "mushy", "musty", "muted", "mysterious", "narrow", "natural", "naughty", "nautical", "near", "neat", "necessary", "needy", "negative", "neglected", "negligible", "neighboring", "nervous", "new", "next", "nice", "nifty", "nimble", "nippy", "nocturnal", "normal", "noted", "noteworthy", "noxious", "numb", "nutritious", "obedient", "oblong", "obvious", "odd", "oddball", "official", "oily", "old", "old-fashioned", "only", "optimal", "optimistic", "orange", "orderly", "ordinary", "ornate", "ornery", "other", "our", "outgoing", "outlandish", "outlying", "outrageous", "outstanding", "oval", "overcooked", "overdue", "palatable", "pale", "paltry", "parallel", "parched", "partial", "passionate", "pastel", "peaceful", "peppery", "perfumed", "perky", "personal", "pertinent", "pessimistic", "petty", "phony", "physical", "pink", "pitiful", "plain", "pleasant", "pleased", "pleasing", "plump", "pointed", "pointless", "polished", "polite", "political", "poor", "portly", "posh", "possible", "potable", "powerful", "powerless", "practical", "precious", "present", "prestigious", "pretty", "pricey", "prickly", "primary", "prime", "private", "probable", "productive", "profitable", "profuse", "proper", "proud", "prudent", "punctual", "puny", "pure", "purple", "pushy", "putrid", "puzzled", "qualified", "quarrelsome", "quarterly", "queasy", "querulous", "questionable", "quick", "quick-witted", "quiet", "quintessential", "quixotic", "radiant", "ragged", "rapid", "rare", "raw", "realistic", "reasonable", "recent", "reckless", "rectangular", "red", "reflecting", "regal", "regular", "remarkable", "remorseful", "repentant", "respectful", "responsible", "rewarding", "rich", "right", "rigid", "ripe", "roasted", "robust", "rosy", "rotating", "rotten", "rough", "round", "rowdy", "royal", "rubbery", "ruddy", "rundown", "runny", "rural", "rusty", "sad", "salty", "same", "sandy", "sarcastic", "sardonic", "scaly", "scared", "scary", "scented", "scientific", "scornful", "scratchy", "second", "second-hand", "secondary", "secret", "self-assured", "self-reliant", "selfish", "sentimental", "separate", "serene", "serpentine", "severe", "shabby", "shadowy", "shady", "shallow", "shameful", "shameless", "shimmering", "shiny", "shocked", "shoddy", "short", "short-term", "showy", "shrill", "shy", "sick", "silent", "silky", "silver", "similar", "simple", "simplistic", "sinful", "sizzling", "skeletal", "sleepy", "slight", "slimy", "slow", "slushy", "small", "smart", "smoggy", "smooth", "smug", "snappy", "snarling", "sneaky", "sniveling", "snoopy", "sociable", "soft", "soggy", "somber", "some", "sophisticated", "sore", "sorrowful", "soulful", "soupy", "sour", "spanish", "sparkling", "sparse", "specific", "speedy", "spherical", "spiffy", "spirited", "spiteful", "splendid", "spotless", "square", "squeaky", "squiggly", "stable", "staid", "stained", "stale", "standard", "stark", "steel", "steep", "sticky", "stiff", "stingy", "stormy", "straight", "strange", "strict", "strident", "striking", "strong", "stunning", "stupendous", "sturdy", "stylish", "subdued", "submissive", "substantial", "subtle", "suburban", "sudden", "sugary", "sunny", "super", "superb", "superficial", "superior", "supportive", "sure-footed", "surprised", "svelte", "sweet", "swift", "talkative", "tall", "tame", "tangible", "tasty", "tattered", "taut", "tedious", "teeming", "tempting", "tender", "tense", "tepid", "terrible", "that", "these", "thick", "thin", "thorny", "thorough", "those", "thrifty", "tidy", "tight", "timely", "tinted", "tiny", "tired", "torn", "total", "tough", "tragic", "trained", "triangular", "tricky", "trim", "trivial", "troubled", "true", "trusting", "trustworthy", "trusty", "turbulent", "twin", "ugly", "ultimate", "unaware", "uncomfortable", "uncommon", "unconscious", "understated", "uneven", "unfinished", "unfit", "unfortunate", "unhappy", "unhealthy", "uniform", "unimportant", "unique", "unkempt", "unknown", "unlawful", "unlined", "unlucky", "unpleasant", "unrealistic", "unripe", "unruly", "unselfish", "unsightly", "unsteady", "unsung", "untidy", "untimely", "untried", "untrue", "unused", "unusual", "unwelcome", "unwieldy", "unwilling", "unwritten", "upbeat", "upright", "upset", "urban", "usable", "useless", "utilized", "utter", "vague", "vain", "valuable", "variable", "vast", "velvety", "vengeful", "vibrant", "victorious", "violent", "vivacious", "vivid", "voluminous", "warlike", "warm", "warmhearted", "warped", "wasteful", "waterlogged", "watery", "wavy", "wealthy", "weary", "webbed", "wee", "weekly", "weighty", "weird", "well-documented", "well-groomed", "well-lit", "well-made", "well-off", "well-to-do", "well-worn", "which", "whimsical", "whirlwind", "whispered", "white", "whole", "whopping", "wicked", "wide", "wide-eyed", "wiggly", "willing", "wilted", "winding", "windy", "winged", "wise", "witty", "wobbly", "woeful", "wonderful", "wordy", "worldly", "worse", "worst", "worthless", "worthwhile", "worthy", "wrathful", "wretched", "writhing", "wrong", "wry", "yearly", "yellow", "yellowish", "young", "youthful", "yummy", "zany", "zealous", "zesty"], Ou = ["abnormally", "absentmindedly", "accidentally", "acidly", "actually", "adventurously", "afterwards", "almost", "always", "angrily", "annually", "anxiously", "arrogantly", "awkwardly", "badly", "bashfully", "beautifully", "bitterly", "bleakly", "blindly", "blissfully", "boastfully", "boldly", "bravely", "briefly", "brightly", "briskly", "broadly", "busily", "calmly", "carefully", "carelessly", "cautiously", "certainly", "cheerfully", "clearly", "cleverly", "closely", "coaxingly", "colorfully", "commonly", "continually", "coolly", "correctly", "courageously", "crossly", "cruelly", "curiously", "daily", "daintily", "dearly", "deceivingly", "deeply", "defiantly", "deliberately", "delightfully", "diligently", "dimly", "doubtfully", "dreamily", "easily", "elegantly", "energetically", "enormously", "enthusiastically", "equally", "especially", "even", "evenly", "eventually", "exactly", "excitedly", "extremely", "fairly", "faithfully", "famously", "far", "fast", "fatally", "ferociously", "fervently", "fiercely", "fondly", "foolishly", "fortunately", "frankly", "frantically", "freely", "frenetically", "frightfully", "fully", "furiously", "generally", "generously", "gently", "gladly", "gleefully", "gracefully", "gratefully", "greatly", "greedily", "happily", "hastily", "healthily", "heavily", "helpfully", "helplessly", "highly", "honestly", "hopelessly", "hourly", "hungrily", "immediately", "innocently", "inquisitively", "instantly", "intensely", "intently", "interestingly", "inwardly", "irritably", "jaggedly", "jealously", "joshingly", "jovially", "joyfully", "joyously", "jubilantly", "judgementally", "justly", "keenly", "kiddingly", "kindheartedly", "kindly", "kissingly", "knavishly", "knottily", "knowingly", "knowledgeably", "kookily", "lazily", "less", "lightly", "likely", "limply", "lively", "loftily", "longingly", "loosely", "loudly", "lovingly", "loyally", "madly", "majestically", "meaningfully", "mechanically", "merrily", "miserably", "mockingly", "monthly", "more", "mortally", "mostly", "mysteriously", "naturally", "nearly", "neatly", "needily", "nervously", "never", "nicely", "noisily", "not", "obediently", "obnoxiously", "oddly", "offensively", "officially", "often", "only", "openly", "optimistically", "overconfidently", "owlishly", "painfully", "partially", "patiently", "perfectly", "physically", "playfully", "politely", "poorly", "positively", "potentially", "powerfully", "promptly", "properly", "punctually", "quaintly", "quarrelsomely", "queasily", "questionably", "questioningly", "quicker", "quickly", "quietly", "quirkily", "quizzically", "rapidly", "rarely", "readily", "really", "reassuringly", "recklessly", "regularly", "reluctantly", "repeatedly", "reproachfully", "restfully", "righteously", "rightfully", "rigidly", "roughly", "rudely", "sadly", "safely", "scarcely", "scarily", "searchingly", "sedately", "seemingly", "seldom", "selfishly", "separately", "seriously", "shakily", "sharply", "sheepishly", "shrilly", "shyly", "silently", "sleepily", "slowly", "smoothly", "softly", "solemnly", "solidly", "sometimes", "soon", "speedily", "stealthily", "sternly", "strictly", "successfully", "suddenly", "surprisingly", "suspiciously", "sweetly", "swiftly", "sympathetically", "tenderly", "tensely", "terribly", "thankfully", "thoroughly", "thoughtfully", "tightly", "tomorrow", "too", "tremendously", "triumphantly", "truly", "truthfully", "ultimately", "unabashedly", "unaccountably", "unbearably", "unethically", "unexpectedly", "unfortunately", "unimpressively", "unnaturally", "unnecessarily", "upbeat", "upliftingly", "upright", "upside-down", "upward", "upwardly", "urgently", "usefully", "uselessly", "usually", "utterly", "vacantly", "vaguely", "vainly", "valiantly", "vastly", "verbally", "very", "viciously", "victoriously", "violently", "vivaciously", "voluntarily", "warmly", "weakly", "wearily", "well", "wetly", "wholly", "wildly", "willfully", "wisely", "woefully", "wonderfully", "worriedly", "wrongly", "yawningly", "yearly", "yearningly", "yesterday", "yieldingly", "youthfully"], Ju = ["after", "although", "and", "as", "because", "before", "but", "consequently", "even", "finally", "for", "furthermore", "hence", "how", "however", "if", "inasmuch", "incidentally", "indeed", "instead", "lest", "likewise", "meanwhile", "nor", "now", "once", "or", "provided", "since", "so", "supposing", "than", "that", "though", "till", "unless", "until", "what", "when", "whenever", "where", "whereas", "wherever", "whether", "which", "while", "who", "whoever", "whose", "why", "yet"], zu = ["yuck", "oh", "phooey", "blah", "boo", "whoa", "yowza", "huzzah", "boohoo", "fooey", "geez", "pfft", "ew", "ah", "yum", "brr", "hm", "yahoo", "aha", "woot", "drat", "gah", "meh", "psst", "aw", "ugh", "yippee", "eek", "gee", "bah", "gadzooks", "duh", "ha", "mmm", "ouch", "phew", "ack", "uh-huh", "gosh", "hmph", "pish", "zowie", "er", "ick", "oof", "um"], Vu = ["CD", "SUV", "abacus", "academics", "accelerator", "accompanist", "account", "accountability", "acquaintance", "ad", "adaptation", "address", "adrenalin", "adult", "advancement", "advertisement", "adviser", "affect", "affiliate", "aftermath", "agreement", "airbus", "aircraft", "airline", "airmail", "airman", "airport", "alb", "alert", "allegation", "alliance", "alligator", "allocation", "almighty", "amendment", "amnesty", "analogy", "angle", "annual", "antelope", "anticodon", "apparatus", "appliance", "approach", "apricot", "arcade", "archaeology", "armchair", "armoire", "asset", "assist", "atrium", "attraction", "availability", "avalanche", "awareness", "babushka", "backbone", "backburn", "bakeware", "bandwidth", "bar", "barge", "baritone", "barracks", "baseboard", "basket", "bathhouse", "bathrobe", "battle", "begonia", "behest", "bell", "bench", "bend", "beret", "best-seller", "bid", "bidet", "bin", "birdbath", "birdcage", "birth", "blight", "blossom", "blowgun", "bob", "bog", "bonfire", "bonnet", "bookcase", "bookend", "boulevard", "bourgeoisie", "bowler", "bowling", "boyfriend", "brace", "bracelet", "bran", "breastplate", "brief", "brochure", "brook", "brush", "bug", "bump", "bungalow", "cafe", "cake", "calculus", "cannon", "cantaloupe", "cap", "cappelletti", "captain", "caption", "carboxyl", "cardboard", "carnival", "case", "casement", "cash", "casket", "cassava", "castanet", "catalyst", "cauliflower", "cellar", "celsius", "cemetery", "ceramic", "ceramics", "certification", "chainstay", "chairperson", "challenge", "championship", "chap", "chapel", "character", "characterization", "charlatan", "charm", "chasuble", "cheese", "cheetah", "chiffonier", "chops", "chow", "cinder", "cinema", "circumference", "citizen", "clamp", "clavicle", "cleaner", "climb", "co-producer", "coal", "coast", "cod", "coil", "coin", "coliseum", "collaboration", "collectivization", "colon", "colonialism", "comestible", "commercial", "commodity", "community", "comparison", "completion", "complication", "compromise", "concentration", "configuration", "confusion", "conservation", "conservative", "consistency", "contractor", "contrail", "convection", "conversation", "cook", "coordination", "cop-out", "cope", "cork", "cornet", "corporation", "corral", "cosset", "costume", "couch", "council", "councilman", "countess", "courtroom", "cow", "creator", "creature", "crest", "cricket", "crocodile", "cross-contamination", "cruelty", "cuckoo", "curl", "custody", "custom", "cutlet", "cutover", "cycle", "daddy", "dandelion", "dash", "daughter", "dead", "decision", "deck", "declaration", "decongestant", "decryption", "deduction", "deed", "deer", "defendant", "density", "department", "dependency", "deployment", "depot", "derby", "descendant", "descent", "design", "designation", "desk", "detective", "devastation", "developing", "developmental", "devil", "diagram", "digestive", "digit", "dime", "director", "disadvantage", "disappointment", "disclosure", "disconnection", "discourse", "dish", "disk", "disposer", "distinction", "diver", "diversity", "dividend", "divine", "doing", "doorpost", "doubter", "draft", "draw", "dream", "dredger", "dress", "drive", "drug", "duffel", "dulcimer", "dusk", "duster", "dwell", "e-mail", "earth", "ecliptic", "ectoderm", "edge", "editor", "effector", "eggplant", "electronics", "elevation", "elevator", "elver", "embarrassment", "embossing", "emergent", "encouragement", "entry", "epic", "equal", "essence", "eternity", "ethyl", "euphonium", "event", "exasperation", "excess", "executor", "exhaust", "expansion", "expense", "experience", "exploration", "extension", "extent", "exterior", "eyebrow", "eyeliner", "farm", "farmer", "fat", "fax", "feather", "fedora", "fellow", "fen", "fencing", "ferret", "festival", "fibre", "filter", "final", "finding", "finer", "finger", "fireplace", "fisherman", "fishery", "fit", "flame", "flat", "fledgling", "flight", "flint", "flood", "flu", "fog", "fold", "folklore", "follower", "following", "foodstuffs", "footrest", "forage", "forager", "forgery", "fork", "formamide", "formation", "formula", "fort", "fowl", "fraudster", "freckle", "freezing", "freight", "fuel", "fun", "fund", "fundraising", "futon", "gallery", "galoshes", "gastropod", "gazebo", "gerbil", "ghost", "giant", "gift", "giggle", "glider", "gloom", "goat", "godfather", "godparent", "going", "goodwill", "governance", "government", "gown", "gradient", "graffiti", "grandpa", "grandson", "granny", "grass", "gray", "gripper", "grouper", "guacamole", "guard", "guidance", "guide", "gym", "gymnast", "habit", "haircut", "halt", "hamburger", "hammock", "handful", "handle", "handover", "harp", "haversack", "hawk", "heartache", "heartbeat", "heating", "hello", "help", "hepatitis", "heroine", "hexagon", "hierarchy", "hippodrome", "honesty", "hoof", "hope", "horde", "hornet", "horst", "hose", "hospitalization", "hovel", "hovercraft", "hubris", "humidity", "humor", "hundred", "hunger", "hunt", "husband", "hutch", "hydrant", "hydrocarbon", "hydrolyse", "hydrolyze", "hyena", "hygienic", "hyphenation", "ice-cream", "icebreaker", "igloo", "ignorance", "illusion", "impact", "import", "importance", "impostor", "in-joke", "incandescence", "independence", "individual", "information", "injunction", "innovation", "insolence", "inspection", "instance", "institute", "instruction", "instructor", "integer", "intellect", "intent", "interchange", "interior", "intervention", "interviewer", "invite", "iridescence", "issue", "jacket", "jazz", "jellyfish", "jet", "jogging", "joy", "juggernaut", "jump", "jungle", "junior", "jury", "kettledrum", "kick", "kielbasa", "kinase", "king", "kiss", "kit", "knickers", "knight", "knitting", "knuckle", "label", "labourer", "lace", "lady", "lamp", "language", "larva", "lashes", "laughter", "lava", "lawmaker", "lay", "leading", "league", "legend", "legging", "legislature", "lender", "license", "lid", "lieu", "lifestyle", "lift", "linseed", "litter", "loaf", "lobster", "longboat", "lotion", "lounge", "louse", "lox", "loyalty", "luck", "lyre", "maestro", "mainstream", "maintainer", "majority", "makeover", "making", "mallard", "management", "manner", "mantua", "marathon", "march", "marimba", "marketplace", "marksman", "markup", "marten", "massage", "masterpiece", "mathematics", "meadow", "meal", "meander", "meatloaf", "mechanic", "median", "membership", "mentor", "merit", "metabolite", "metal", "middle", "midwife", "milestone", "millet", "minion", "minister", "minor", "minority", "mixture", "mobility", "molasses", "mom", "moment", "monasticism", "monocle", "monster", "morbidity", "morning", "mortise", "mountain", "mouser", "mousse", "mozzarella", "muscat", "mythology", "napkin", "necklace", "nectarine", "negotiation", "nephew", "nerve", "netsuke", "newsletter", "newsprint", "newsstand", "nightlife", "noon", "nougat", "nucleotidase", "nudge", "numeracy", "numeric", "nun", "obedience", "obesity", "object", "obligation", "ocelot", "octave", "offset", "oil", "omelet", "onset", "opera", "operating", "optimal", "orchid", "order", "ostrich", "other", "outlaw", "outrun", "outset", "overcoat", "overheard", "overload", "ownership", "pacemaker", "packaging", "paintwork", "palate", "pants", "pantyhose", "papa", "parade", "parsnip", "partridge", "passport", "pasta", "patroller", "pear", "pearl", "pecan", "pendant", "peninsula", "pension", "peony", "pepper", "perfection", "permafrost", "perp", "petal", "petticoat", "pharmacopoeia", "phrase", "pick", "piglet", "pigpen", "pigsty", "pile", "pillbox", "pillow", "pilot", "pine", "pinstripe", "place", "plain", "planula", "plastic", "platter", "platypus", "pleasure", "pliers", "plugin", "plumber", "pneumonia", "pocket-watch", "poetry", "polarisation", "polyester", "pomelo", "pop", "poppy", "popularity", "populist", "porter", "possession", "postbox", "precedent", "premeditation", "premier", "premise", "premium", "pressure", "presume", "priesthood", "printer", "privilege", "procurement", "produce", "programme", "prohibition", "promise", "pronoun", "providence", "provider", "provision", "publication", "publicity", "pulse", "punctuation", "pupil", "puppet", "puritan", "quart", "quinoa", "quit", "railway", "range", "rationale", "ravioli", "rawhide", "reach", "reasoning", "reboot", "receptor", "recommendation", "reconsideration", "recovery", "redesign", "relative", "release", "remark", "reorganisation", "repeat", "replacement", "reporter", "representation", "republican", "request", "requirement", "reservation", "resolve", "resource", "responsibility", "restaurant", "retention", "retrospectivity", "reward", "ribbon", "rim", "riser", "roadway", "role", "rosemary", "roundabout", "rubric", "ruin", "rule", "runway", "rust", "safe", "sailor", "saloon", "sand", "sandbar", "sanity", "sarong", "sauerkraut", "saw", "scaffold", "scale", "scarification", "scenario", "schedule", "schnitzel", "scholarship", "scorn", "scorpion", "scout", "scrap", "scratch", "seafood", "seagull", "seal", "season", "secrecy", "secret", "section", "sediment", "self-confidence", "sermon", "sesame", "settler", "shadowbox", "shark", "shipper", "shore", "shoulder", "sideboard", "siege", "sightseeing", "signature", "silk", "simple", "singing", "skean", "skeleton", "skyline", "skyscraper", "slide", "slime", "slipper", "smog", "smoke", "sock", "soliloquy", "solution", "solvency", "someplace", "sonar", "sonata", "sonnet", "soup", "soybean", "space", "spear", "spirit", "spork", "sport", "spring", "sprinkles", "squid", "stall", "starboard", "statue", "status", "stay", "steak", "steeple", "step", "step-mother", "sticker", "stir-fry", "stitcher", "stock", "stool", "story", "strait", "stranger", "strategy", "straw", "stump", "subexpression", "submitter", "subsidy", "substitution", "suitcase", "summary", "summer", "sunbeam", "sundae", "supplier", "surface", "sushi", "suspension", "sustenance", "swanling", "swath", "sweatshop", "swim", "swine", "swing", "switch", "switchboard", "swordfish", "synergy", "t-shirt", "tabletop", "tackle", "tail", "tapioca", "taro", "tarragon", "taxicab", "teammate", "technician", "technologist", "tectonics", "tenant", "tenement", "tennis", "tentacle", "teriyaki", "term", "testimonial", "testing", "thigh", "thongs", "thorn", "thread", "thunderbolt", "thyme", "tinderbox", "toaster", "tomatillo", "tomb", "tomography", "tool", "tooth", "toothbrush", "toothpick", "topsail", "traditionalism", "traffic", "translation", "transom", "transparency", "trash", "travel", "tray", "trench", "tribe", "tributary", "trick", "trolley", "tuba", "tuber", "tune-up", "turret", "tusk", "tuxedo", "typeface", "typewriter", "unblinking", "underneath", "underpants", "understanding", "unibody", "unique", "unit", "utilization", "valentine", "validity", "valley", "valuable", "vanadyl", "vein", "velocity", "venom", "version", "verve", "vestment", "veto", "viability", "vibraphone", "vibration", "vicinity", "video", "violin", "vision", "vista", "vol", "volleyball", "wafer", "waist", "wallaby", "warming", "wasabi", "waterspout", "wear", "wedding", "whack", "whale", "wheel", "widow", "wilderness", "willow", "window", "wombat", "word", "worth", "wriggler", "yak", "yarmulke", "yeast", "yin", "yogurt", "zebra", "zen"], ju = ["a", "abaft", "aboard", "about", "above", "absent", "across", "afore", "after", "against", "along", "alongside", "amid", "amidst", "among", "amongst", "an", "anenst", "anti", "apropos", "apud", "around", "as", "aside", "astride", "at", "athwart", "atop", "barring", "before", "behind", "below", "beneath", "beside", "besides", "between", "beyond", "but", "by", "circa", "concerning", "considering", "despite", "down", "during", "except", "excepting", "excluding", "failing", "following", "for", "forenenst", "from", "given", "in", "including", "inside", "into", "lest", "like", "mid", "midst", "minus", "modulo", "near", "next", "notwithstanding", "of", "off", "on", "onto", "opposite", "out", "outside", "over", "pace", "past", "per", "plus", "pro", "qua", "regarding", "round", "sans", "save", "since", "than", "the", "through", "throughout", "till", "times", "to", "toward", "towards", "under", "underneath", "unlike", "until", "unto", "up", "upon", "versus", "via", "vice", "with", "within", "without", "worth"], Yu = ["abnegate", "abscond", "abseil", "absolve", "accentuate", "accept", "access", "accessorise", "accompany", "account", "accredit", "achieve", "acknowledge", "acquire", "adjourn", "adjudge", "admonish", "adumbrate", "advocate", "afford", "airbrush", "ameliorate", "amend", "amount", "anaesthetise", "analyse", "anesthetize", "anneal", "annex", "antagonize", "ape", "apologise", "apostrophize", "appertain", "appreciate", "appropriate", "approximate", "arbitrate", "archive", "arraign", "arrange", "ascertain", "ascribe", "assail", "atomize", "attend", "attest", "attribute", "augment", "avow", "axe", "baa", "banish", "bank", "baptise", "battle", "beard", "beep", "behold", "belabor", "bemuse", "besmirch", "bestride", "better", "bewail", "bicycle", "bide", "bind", "biodegrade", "blacken", "blaspheme", "bleach", "blend", "blink", "bliss", "bloom", "bludgeon", "bobble", "boggle", "bolster", "book", "boom", "bootleg", "border", "bore", "boss", "braid", "brand", "brandish", "break", "breed", "broadcast", "broadside", "brood", "browse", "buck", "burgeon", "bus", "butter", "buzzing", "camouflage", "cannibalise", "canter", "cap", "capitalise", "capitalize", "capsize", "card", "carouse", "carp", "carpool", "catalog", "catalyze", "catch", "categorise", "cease", "celebrate", "censor", "certify", "char", "charter", "chase", "chatter", "chime", "chip", "christen", "chromakey", "chunder", "chunter", "cinch", "circle", "circulate", "circumnavigate", "clamor", "clamour", "claw", "cleave", "clinch", "clinking", "clone", "clonk", "coagulate", "coexist", "coincide", "collaborate", "colligate", "colorize", "colour", "comb", "come", "commandeer", "commemorate", "communicate", "compete", "conceal", "conceptualize", "conclude", "concrete", "condense", "cone", "confide", "confirm", "confiscate", "confound", "confute", "congregate", "conjecture", "connect", "consign", "construe", "contradict", "contrast", "contravene", "controvert", "convalesce", "converse", "convince", "convoke", "coop", "cop", "corner", "covenant", "cow", "crackle", "cram", "crank", "creak", "creaking", "cripple", "croon", "cross", "crumble", "crystallize", "culminate", "culture", "curry", "curse", "customise", "cycle", "dally", "dampen", "darn", "debit", "debut", "decide", "decode", "decouple", "decriminalize", "deduce", "deduct", "deflate", "deflect", "deform", "defrag", "degenerate", "degrease", "delete", "delight", "deliquesce", "demob", "demobilise", "democratize", "demonstrate", "denitrify", "deny", "depart", "depend", "deplore", "deploy", "deprave", "depute", "dereference", "describe", "desecrate", "deselect", "destock", "detain", "develop", "devise", "dial", "dicker", "digitize", "dilate", "disapprove", "disarm", "disbar", "discontinue", "disgorge", "dishearten", "dishonor", "disinherit", "dislocate", "dispense", "display", "dispose", "disrespect", "dissemble", "ditch", "divert", "dock", "doodle", "downchange", "downshift", "dowse", "draft", "drag", "drain", "dramatize", "drowse", "drum", "dwell", "economise", "edge", "efface", "egg", "eke", "electrify", "embalm", "embed", "embody", "emboss", "emerge", "emphasise", "emphasize", "emulsify", "encode", "endow", "enfold", "engage", "engender", "enhance", "enlist", "enrage", "enrich", "enroll", "entice", "entomb", "entrench", "entwine", "equate", "essay", "etch", "eulogise", "even", "evince", "exacerbate", "exaggerate", "exalt", "exempt", "exonerate", "expatiate", "explode", "expostulate", "extract", "extricate", "eyeglasses", "fabricate", "facilitate", "factorise", "factorize", "fail", "fall", "familiarize", "fashion", "father", "fathom", "fax", "federate", "feminize", "fence", "fess", "fictionalize", "fiddle", "fidget", "fill", "flash", "fleck", "flight", "floodlight", "floss", "fluctuate", "fluff", "fly", "focalise", "foot", "forearm", "forecast", "foretell", "forgather", "forgo", "fork", "form", "forswear", "founder", "fraternise", "fray", "frizz", "fumigate", "function", "furlough", "fuss", "gad", "gallivant", "galvanize", "gape", "garage", "garrote", "gasp", "gestate", "give", "glimmer", "glisten", "gloat", "gloss", "glow", "gnash", "gnaw", "goose", "govern", "grade", "graduate", "graft", "grok", "guest", "guilt", "gulp", "gum", "gurn", "gust", "gut", "guzzle", "ham", "harangue", "harvest", "hassle", "haul", "haze", "headline", "hearten", "heighten", "highlight", "hoick", "hold", "hole", "hollow", "holster", "home", "homeschool", "hoot", "horn", "horse", "hotfoot", "house", "hover", "howl", "huddle", "huff", "hunger", "hunt", "husk", "hype", "hypothesise", "hypothesize", "idle", "ignite", "imagineer", "impact", "impanel", "implode", "incinerate", "incline", "inculcate", "industrialize", "ingratiate", "inhibit", "inject", "innovate", "inscribe", "insert", "insist", "inspect", "institute", "institutionalize", "intend", "intermarry", "intermesh", "intermix", "internalise", "internalize", "internationalize", "intrigue", "inure", "inveigle", "inventory", "investigate", "irk", "iterate", "jaywalk", "jell", "jeopardise", "jiggle", "jive", "joint", "jot", "jut", "keel", "knife", "knit", "know", "kowtow", "lack", "lampoon", "large", "leap", "lecture", "legitimize", "lend", "libel", "liberalize", "license", "ligate", "list", "lobotomise", "lock", "log", "loose", "low", "lowball", "machine", "magnetize", "major", "make", "malfunction", "manage", "manipulate", "maroon", "masculinize", "mash", "mask", "masquerade", "massage", "masticate", "materialise", "matter", "maul", "memorise", "merge", "mesh", "metabolise", "microblog", "microchip", "micromanage", "militate", "mill", "minister", "minor", "misappropriate", "miscalculate", "misfire", "misjudge", "miskey", "mismatch", "mispronounce", "misread", "misreport", "misspend", "mob", "mobilise", "mobilize", "moisten", "mooch", "moor", "moralise", "mortar", "mosh", "mothball", "motivate", "motor", "mould", "mount", "muddy", "mummify", "mutate", "mystify", "nab", "narrate", "narrowcast", "nasalise", "nauseate", "navigate", "neaten", "neck", "neglect", "norm", "notarize", "object", "obscure", "observe", "obsess", "obstruct", "obtrude", "offend", "offset", "option", "orchestrate", "orient", "orientate", "outbid", "outdo", "outfit", "outflank", "outfox", "outnumber", "outrank", "outrun", "outsource", "overburden", "overcharge", "overcook", "overdub", "overfeed", "overload", "overplay", "overproduce", "overreact", "override", "overspend", "overstay", "overtrain", "overvalue", "overwork", "own", "oxidise", "oxidize", "oxygenate", "pace", "pack", "pale", "pant", "paralyse", "parody", "part", "pause", "pave", "penalise", "persecute", "personalise", "perspire", "pertain", "peter", "pike", "pillory", "pinion", "pip", "pity", "pivot", "pixellate", "plagiarise", "plait", "plan", "please", "pluck", "ponder", "popularize", "portray", "prance", "preclude", "preheat", "prejudge", "preregister", "presell", "preside", "pretend", "print", "prioritize", "probate", "probe", "proceed", "procrastinate", "profane", "progress", "proliferate", "proofread", "propound", "proselytise", "provision", "pry", "publicize", "puff", "pull", "pulp", "pulverize", "purse", "put", "putrefy", "quadruple", "quaff", "quantify", "quarrel", "quash", "quaver", "question", "quiet", "quintuple", "quip", "quit", "rag", "rally", "ramp", "randomize", "rationalise", "rationalize", "ravage", "ravel", "react", "readies", "readjust", "readmit", "ready", "reapply", "rear", "reassemble", "rebel", "reboot", "reborn", "rebound", "rebuff", "rebuild", "rebuke", "recede", "reckon", "reclassify", "recompense", "reconstitute", "record", "recount", "redact", "redevelop", "redound", "redraw", "redress", "reel", "refer", "reference", "refine", "reflate", "refute", "regulate", "reiterate", "rejigger", "rejoin", "rekindle", "relaunch", "relieve", "remand", "remark", "reopen", "reorient", "replicate", "repossess", "represent", "reprimand", "reproach", "reprove", "repurpose", "requite", "reschedule", "resort", "respray", "restructure", "retool", "retract", "revere", "revitalise", "revoke", "reword", "rewrite", "ride", "ridge", "rim", "ring", "rise", "rival", "roger", "rosin", "rot", "rout", "row", "rue", "rule", "safeguard", "sashay", "sate", "satirise", "satirize", "satisfy", "saturate", "savour", "scale", "scamper", "scar", "scare", "scarper", "scent", "schematise", "scheme", "schlep", "scoff", "scoop", "scope", "scotch", "scowl", "scrabble", "scram", "scramble", "scrape", "screw", "scruple", "scrutinise", "scuffle", "scuttle", "search", "secularize", "see", "segregate", "sell", "sense", "sensitize", "sequester", "serenade", "serialize", "serve", "service", "settle", "sew", "shaft", "sham", "shampoo", "shanghai", "shear", "sheathe", "shell", "shinny", "shirk", "shoot", "shoulder", "shout", "shovel", "showboat", "shred", "shrill", "shudder", "shush", "sidetrack", "sign", "silt", "sin", "singe", "sit", "sizzle", "skateboard", "ski", "slake", "slap", "slather", "sleet", "slink", "slip", "slope", "slump", "smarten", "smuggle", "snack", "sneak", "sniff", "snoop", "snow", "snowplow", "snuggle", "soap", "solace", "solder", "solicit", "source", "spark", "spattering", "spectacles", "spectate", "spellcheck", "spew", "spice", "spirit", "splash", "splay", "split", "splosh", "splurge", "spook", "square", "squirm", "stabilise", "stable", "stack", "stage", "stake", "starch", "state", "statement", "stiffen", "stigmatize", "sting", "stint", "stoop", "store", "storyboard", "stratify", "structure", "stuff", "stunt", "substantiate", "subtract", "suckle", "suffice", "suffocate", "summarise", "sun", "sunbathe", "sunder", "sup", "surge", "surprise", "swat", "swathe", "sway", "swear", "swelter", "swerve", "swill", "swing", "symbolise", "synthesise", "syringe", "table", "tabulate", "tag", "tame", "tank", "tankful", "tarry", "task", "taxicab", "team", "telescope", "tenant", "terraform", "terrorise", "testify", "think", "throbbing", "thump", "tighten", "toady", "toe", "tough", "tousle", "traduce", "train", "transcend", "transplant", "trash", "treasure", "treble", "trek", "trial", "tromp", "trouser", "trust", "tune", "tut", "twine", "twist", "typify", "unbalance", "uncork", "uncover", "underachieve", "undergo", "underplay", "unearth", "unfreeze", "unfurl", "unlearn", "unscramble", "unzip", "uproot", "upsell", "usher", "vacation", "vamoose", "vanish", "vary", "veg", "venture", "verify", "vet", "veto", "volunteer", "vulgarise", "waft", "wallop", "waltz", "warp", "wash", "waver", "weary", "weatherize", "wedge", "weep", "weight", "welcome", "westernise", "westernize", "while", "whine", "whisper", "whistle", "whitewash", "whup", "wilt", "wing", "wire", "wisecrack", "wolf", "wound", "wring", "writ", "yak", "yawn", "yearn", "yuppify"], $u = { adjective: Ku, adverb: Ou, conjunction: Ju, interjection: zu, noun: Vu, preposition: ju, verb: Yu }, Uu = $u, _u = { airline: Pr, animal: Zr, app: rn, book: cn, cell_phone: mn, color: Dn, commerce: En, company: Rn, database: Gn, date: In, finance: Xn, food: Fi, hacker: Di, internet: Ei, location: Oi, lorem: Vi, metadata: Yi, music: Xi, person: Du, phone_number: Au, science: wu, team: Ru, vehicle: Iu, word: Uu }, qu = _u, y = class extends Error {
};
function Zu(e) {
  let a = Object.getPrototypeOf(e);
  do {
    for (let r of Object.getOwnPropertyNames(a)) typeof e[r] == "function" && r !== "constructor" && (e[r] = e[r].bind(e));
    a = Object.getPrototypeOf(a);
  } while (a !== Object.prototype);
}
var ge = class {
  constructor(e) {
    this.faker = e, Zu(this);
  }
}, B = class extends ge {
  constructor(e) {
    super(e), this.faker = e;
  }
}, Ia = ((e) => (e.Narrowbody = "narrowbody", e.Regional = "regional", e.Widebody = "widebody", e))(Ia || {}), Xu = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], Qu = ["0", "O", "1", "I", "L"], et = { regional: 20, narrowbody: 35, widebody: 60 }, at = { regional: ["A", "B", "C", "D"], narrowbody: ["A", "B", "C", "D", "E", "F"], widebody: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"] }, rt = class extends B {
  airport() {
    return this.faker.helpers.arrayElement(this.faker.definitions.airline.airport);
  }
  airline() {
    return this.faker.helpers.arrayElement(this.faker.definitions.airline.airline);
  }
  airplane() {
    return this.faker.helpers.arrayElement(this.faker.definitions.airline.airplane);
  }
  recordLocator(e = {}) {
    let { allowNumerics: a = !1, allowVisuallySimilarCharacters: r = !1 } = e, n = [];
    return a || n.push(...Xu), r || n.push(...Qu), this.faker.string.alphanumeric({ length: 6, casing: "upper", exclude: n });
  }
  seat(e = {}) {
    let { aircraftType: a = "narrowbody" } = e, r = et[a], n = at[a], i = this.faker.number.int({ min: 1, max: r }), u = this.faker.helpers.arrayElement(n);
    return `${i}${u}`;
  }
  aircraftType() {
    return this.faker.helpers.enumValue(Ia);
  }
  flightNumber(e = {}) {
    let { length: a = { min: 1, max: 4 }, addLeadingZeros: r = !1 } = e, n = this.faker.string.numeric({ length: a, allowLeadingZeros: !1 });
    return r ? n.padStart(4, "0") : n;
  }
}, Ka = ((e) => (e.SRGB = "sRGB", e.DisplayP3 = "display-p3", e.REC2020 = "rec2020", e.A98RGB = "a98-rgb", e.ProphotoRGB = "prophoto-rgb", e))(Ka || {}), Oa = ((e) => (e.RGB = "rgb", e.RGBA = "rgba", e.HSL = "hsl", e.HSLA = "hsla", e.HWB = "hwb", e.CMYK = "cmyk", e.LAB = "lab", e.LCH = "lch", e.COLOR = "color", e))(Oa || {});
function nt(e, a) {
  let { prefix: r, casing: n } = a;
  switch (n) {
    case "upper": {
      e = e.toUpperCase();
      break;
    }
    case "lower": {
      e = e.toLowerCase();
      break;
    }
  }
  return r && (e = r + e), e;
}
function Ja(e) {
  return e.map((a) => {
    if (a % 1 !== 0) {
      let r = new ArrayBuffer(4);
      new DataView(r).setFloat32(0, a);
      let n = new Uint8Array(r);
      return Ja([...n]).replaceAll(" ", "");
    }
    return (a >>> 0).toString(2).padStart(8, "0");
  }).join(" ");
}
function it(e, a = "rgb", r = "sRGB") {
  let n = (i) => Math.round(i * 100);
  switch (a) {
    case "rgba":
      return `rgba(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`;
    case "color":
      return `color(${r} ${e[0]} ${e[1]} ${e[2]})`;
    case "cmyk":
      return `cmyk(${n(e[0])}%, ${n(e[1])}%, ${n(e[2])}%, ${n(e[3])}%)`;
    case "hsl":
      return `hsl(${e[0]}deg ${n(e[1])}% ${n(e[2])}%)`;
    case "hsla":
      return `hsl(${e[0]}deg ${n(e[1])}% ${n(e[2])}% / ${n(e[3])})`;
    case "hwb":
      return `hwb(${e[0]} ${n(e[1])}% ${n(e[2])}%)`;
    case "lab":
      return `lab(${n(e[0])}% ${e[1]} ${e[2]})`;
    case "lch":
      return `lch(${n(e[0])}% ${e[1]} ${e[2]})`;
    case "rgb":
      return `rgb(${e[0]}, ${e[1]}, ${e[2]})`;
  }
}
function ie(e, a, r = "rgb", n = "sRGB") {
  switch (a) {
    case "css":
      return it(e, r, n);
    case "binary":
      return Ja(e);
    case "decimal":
      return e;
  }
}
var ut = class extends B {
  human() {
    return this.faker.helpers.arrayElement(this.faker.definitions.color.human);
  }
  space() {
    return this.faker.helpers.arrayElement(this.faker.definitions.color.space);
  }
  cssSupportedFunction() {
    return this.faker.helpers.enumValue(Oa);
  }
  cssSupportedSpace() {
    return this.faker.helpers.enumValue(Ka);
  }
  rgb(e = {}) {
    let { format: a = "hex", includeAlpha: r = !1, prefix: n = "#", casing: i = "lower" } = e, u, t = "rgb";
    return a === "hex" ? (u = this.faker.string.hexadecimal({ length: r ? 8 : 6, prefix: "" }), u = nt(u, { prefix: n, casing: i }), u) : (u = Array.from({ length: 3 }, () => this.faker.number.int(255)), r && (u.push(this.faker.number.float({ multipleOf: 0.01 })), t = "rgba"), ie(u, a, t));
  }
  cmyk(e = {}) {
    let { format: a = "decimal" } = e, r = Array.from({ length: 4 }, () => this.faker.number.float({ multipleOf: 0.01 }));
    return ie(r, a, "cmyk");
  }
  hsl(e = {}) {
    let { format: a = "decimal", includeAlpha: r = !1 } = e, n = [this.faker.number.int(360)];
    for (let i = 0; i < (e != null && e.includeAlpha ? 3 : 2); i++) n.push(this.faker.number.float({ multipleOf: 0.01 }));
    return ie(n, a, r ? "hsla" : "hsl");
  }
  hwb(e = {}) {
    let { format: a = "decimal" } = e, r = [this.faker.number.int(360)];
    for (let n = 0; n < 2; n++) r.push(this.faker.number.float({ multipleOf: 0.01 }));
    return ie(r, a, "hwb");
  }
  lab(e = {}) {
    let { format: a = "decimal" } = e, r = [this.faker.number.float({ multipleOf: 1e-6 })];
    for (let n = 0; n < 2; n++) r.push(this.faker.number.float({ min: -100, max: 100, multipleOf: 1e-4 }));
    return ie(r, a, "lab");
  }
  lch(e = {}) {
    let { format: a = "decimal" } = e, r = [this.faker.number.float({ multipleOf: 1e-6 })];
    for (let n = 0; n < 2; n++) r.push(this.faker.number.float({ max: 230, multipleOf: 0.1 }));
    return ie(r, a, "lch");
  }
  colorByCSSColorSpace(e = {}) {
    let { format: a = "decimal", space: r = "sRGB" } = e, n = Array.from({ length: 3 }, () => this.faker.number.float({ multipleOf: 1e-4 }));
    return ie(n, a, "color", r);
  }
}, za = ((e) => (e.Legacy = "legacy", e.Segwit = "segwit", e.Bech32 = "bech32", e.Taproot = "taproot", e))(za || {}), tt = ((e) => (e.Mainnet = "mainnet", e.Testnet = "testnet", e))(tt || {}), ot = { legacy: { prefix: { mainnet: "1", testnet: "m" }, length: { min: 26, max: 34 }, casing: "mixed", exclude: "0OIl" }, segwit: { prefix: { mainnet: "3", testnet: "2" }, length: { min: 26, max: 34 }, casing: "mixed", exclude: "0OIl" }, bech32: { prefix: { mainnet: "bc1", testnet: "tb1" }, length: { min: 42, max: 42 }, casing: "lower", exclude: "1bBiIoO" }, taproot: { prefix: { mainnet: "bc1p", testnet: "tb1p" }, length: { min: 62, max: 62 }, casing: "lower", exclude: "1bBiIoO" } }, Va = typeof Buffer > "u" ? (e) => {
  let a = new TextEncoder().encode(e), r = Array.from(a, (n) => String.fromCodePoint(n)).join("");
  return btoa(r);
} : (e) => Buffer.from(e).toString("base64"), ua = typeof Buffer > "u" ? (e) => Va(e).replaceAll("+", "-").replaceAll("/", "_").replaceAll(/=+$/g, "") : (e) => Buffer.from(e).toString("base64url");
function xe(e) {
  let a = `[@faker-js/faker]: ${e.deprecated} is deprecated`;
  e.since && (a += ` since v${e.since}`), e.until && (a += ` and will be removed in v${e.until}`), e.proposed && (a += `. Please use ${e.proposed} instead`), console.warn(`${a}.`);
}
var lt = Object.fromEntries([["А", "A"], ["а", "a"], ["Б", "B"], ["б", "b"], ["В", "V"], ["в", "v"], ["Г", "G"], ["г", "g"], ["Д", "D"], ["д", "d"], ["ъе", "ye"], ["Ъе", "Ye"], ["ъЕ", "yE"], ["ЪЕ", "YE"], ["Е", "E"], ["е", "e"], ["Ё", "Yo"], ["ё", "yo"], ["Ж", "Zh"], ["ж", "zh"], ["З", "Z"], ["з", "z"], ["И", "I"], ["и", "i"], ["ый", "iy"], ["Ый", "Iy"], ["ЫЙ", "IY"], ["ыЙ", "iY"], ["Й", "Y"], ["й", "y"], ["К", "K"], ["к", "k"], ["Л", "L"], ["л", "l"], ["М", "M"], ["м", "m"], ["Н", "N"], ["н", "n"], ["О", "O"], ["о", "o"], ["П", "P"], ["п", "p"], ["Р", "R"], ["р", "r"], ["С", "S"], ["с", "s"], ["Т", "T"], ["т", "t"], ["У", "U"], ["у", "u"], ["Ф", "F"], ["ф", "f"], ["Х", "Kh"], ["х", "kh"], ["Ц", "Ts"], ["ц", "ts"], ["Ч", "Ch"], ["ч", "ch"], ["Ш", "Sh"], ["ш", "sh"], ["Щ", "Sch"], ["щ", "sch"], ["Ъ", ""], ["ъ", ""], ["Ы", "Y"], ["ы", "y"], ["Ь", ""], ["ь", ""], ["Э", "E"], ["э", "e"], ["Ю", "Yu"], ["ю", "yu"], ["Я", "Ya"], ["я", "ya"]]), st = Object.fromEntries([["α", "a"], ["β", "v"], ["γ", "g"], ["δ", "d"], ["ε", "e"], ["ζ", "z"], ["η", "i"], ["θ", "th"], ["ι", "i"], ["κ", "k"], ["λ", "l"], ["μ", "m"], ["ν", "n"], ["ξ", "ks"], ["ο", "o"], ["π", "p"], ["ρ", "r"], ["σ", "s"], ["τ", "t"], ["υ", "y"], ["φ", "f"], ["χ", "x"], ["ψ", "ps"], ["ω", "o"], ["ά", "a"], ["έ", "e"], ["ί", "i"], ["ό", "o"], ["ύ", "y"], ["ή", "i"], ["ώ", "o"], ["ς", "s"], ["ϊ", "i"], ["ΰ", "y"], ["ϋ", "y"], ["ΐ", "i"], ["Α", "A"], ["Β", "B"], ["Γ", "G"], ["Δ", "D"], ["Ε", "E"], ["Ζ", "Z"], ["Η", "I"], ["Θ", "TH"], ["Ι", "I"], ["Κ", "K"], ["Λ", "L"], ["Μ", "M"], ["Ν", "N"], ["Ξ", "KS"], ["Ο", "O"], ["Π", "P"], ["Ρ", "R"], ["Σ", "S"], ["Τ", "T"], ["Υ", "Y"], ["Φ", "F"], ["Χ", "X"], ["Ψ", "PS"], ["Ω", "O"], ["Ά", "A"], ["Έ", "E"], ["Ί", "I"], ["Ό", "O"], ["Ύ", "Y"], ["Ή", "I"], ["Ώ", "O"], ["Ϊ", "I"], ["Ϋ", "Y"]]), Ft = Object.fromEntries([["ء", "e"], ["آ", "a"], ["أ", "a"], ["ؤ", "w"], ["إ", "i"], ["ئ", "y"], ["ا", "a"], ["ب", "b"], ["ة", "t"], ["ت", "t"], ["ث", "th"], ["ج", "j"], ["ح", "h"], ["خ", "kh"], ["د", "d"], ["ذ", "dh"], ["ر", "r"], ["ز", "z"], ["س", "s"], ["ش", "sh"], ["ص", "s"], ["ض", "d"], ["ط", "t"], ["ظ", "z"], ["ع", "e"], ["غ", "gh"], ["ـ", "_"], ["ف", "f"], ["ق", "q"], ["ك", "k"], ["ل", "l"], ["م", "m"], ["ن", "n"], ["ه", "h"], ["و", "w"], ["ى", "a"], ["ي", "y"], ["َ‎", "a"], ["ُ", "u"], ["ِ‎", "i"]]), ct = Object.fromEntries([["ա", "a"], ["Ա", "A"], ["բ", "b"], ["Բ", "B"], ["գ", "g"], ["Գ", "G"], ["դ", "d"], ["Դ", "D"], ["ե", "ye"], ["Ե", "Ye"], ["զ", "z"], ["Զ", "Z"], ["է", "e"], ["Է", "E"], ["ը", "y"], ["Ը", "Y"], ["թ", "t"], ["Թ", "T"], ["ժ", "zh"], ["Ժ", "Zh"], ["ի", "i"], ["Ի", "I"], ["լ", "l"], ["Լ", "L"], ["խ", "kh"], ["Խ", "Kh"], ["ծ", "ts"], ["Ծ", "Ts"], ["կ", "k"], ["Կ", "K"], ["հ", "h"], ["Հ", "H"], ["ձ", "dz"], ["Ձ", "Dz"], ["ղ", "gh"], ["Ղ", "Gh"], ["ճ", "tch"], ["Ճ", "Tch"], ["մ", "m"], ["Մ", "M"], ["յ", "y"], ["Յ", "Y"], ["ն", "n"], ["Ն", "N"], ["շ", "sh"], ["Շ", "Sh"], ["ո", "vo"], ["Ո", "Vo"], ["չ", "ch"], ["Չ", "Ch"], ["պ", "p"], ["Պ", "P"], ["ջ", "j"], ["Ջ", "J"], ["ռ", "r"], ["Ռ", "R"], ["ս", "s"], ["Ս", "S"], ["վ", "v"], ["Վ", "V"], ["տ", "t"], ["Տ", "T"], ["ր", "r"], ["Ր", "R"], ["ց", "c"], ["Ց", "C"], ["ու", "u"], ["ՈՒ", "U"], ["Ու", "U"], ["փ", "p"], ["Փ", "P"], ["ք", "q"], ["Ք", "Q"], ["օ", "o"], ["Օ", "O"], ["ֆ", "f"], ["Ֆ", "F"], ["և", "yev"]]), dt = Object.fromEntries([["چ", "ch"], ["ک", "k"], ["گ", "g"], ["پ", "p"], ["ژ", "zh"], ["ی", "y"]]), ht = Object.fromEntries([["א", "a"], ["ב", "b"], ["ג", "g"], ["ד", "d"], ["ה", "h"], ["ו", "v"], ["ז", "z"], ["ח", "ch"], ["ט", "t"], ["י", "y"], ["כ", "k"], ["ך", "kh"], ["ל", "l"], ["ם", "m"], ["מ", "m"], ["ן", "n"], ["נ", "n"], ["ס", "s"], ["ע", "a"], ["פ", "f"], ["ף", "ph"], ["צ", "ts"], ["ץ", "ts"], ["ק", "k"], ["ר", "r"], ["ש", "sh"], ["ת", "t"], ["ו", "v"]]), ta = { ...lt, ...st, ...Ft, ...dt, ...ct, ...ht };
function mt(e) {
  let a = () => e.helpers.arrayElement(["AB", "AF", "AN", "AR", "AS", "AZ", "BE", "BG", "BN", "BO", "BR", "BS", "CA", "CE", "CO", "CS", "CU", "CY", "DA", "DE", "EL", "EN", "EO", "ES", "ET", "EU", "FA", "FI", "FJ", "FO", "FR", "FY", "GA", "GD", "GL", "GV", "HE", "HI", "HR", "HT", "HU", "HY", "ID", "IS", "IT", "JA", "JV", "KA", "KG", "KO", "KU", "KW", "KY", "LA", "LB", "LI", "LN", "LT", "LV", "MG", "MK", "MN", "MO", "MS", "MT", "MY", "NB", "NE", "NL", "NN", "NO", "OC", "PL", "PT", "RM", "RO", "RU", "SC", "SE", "SK", "SL", "SO", "SQ", "SR", "SV", "SW", "TK", "TR", "TY", "UK", "UR", "UZ", "VI", "VO", "YI", "ZH"]), r = () => {
    let o = { chrome: ["win", "mac", "lin"], firefox: ["win", "mac", "lin"], opera: ["win", "mac", "lin"], safari: ["win", "mac"], iexplorer: ["win"] }, c = e.helpers.objectKey(o), h = e.helpers.arrayElement(o[c]);
    return [c, h];
  }, n = (o) => e.helpers.arrayElement({ lin: ["i686", "x86_64"], mac: ["Intel", "PPC", "U; Intel", "U; PPC"], win: ["", "WOW64", "Win64; x64"] }[o]), i = (o) => {
    let c = "";
    for (let h = 0; h < o; h++) c += `.${e.string.numeric({ allowLeadingZeros: !0 })}`;
    return c;
  }, u = { net() {
    return [e.number.int({ min: 1, max: 4 }), e.number.int(9), e.number.int({ min: 1e4, max: 99999 }), e.number.int(9)].join(".");
  }, nt() {
    return [e.number.int({ min: 5, max: 6 }), e.number.int(3)].join(".");
  }, ie() {
    return e.number.int({ min: 7, max: 11 });
  }, trident() {
    return [e.number.int({ min: 3, max: 7 }), e.number.int(1)].join(".");
  }, osx(o) {
    return [10, e.number.int({ min: 5, max: 10 }), e.number.int(9)].join(o || ".");
  }, chrome() {
    return [e.number.int({ min: 13, max: 39 }), 0, e.number.int({ min: 800, max: 899 }), 0].join(".");
  }, presto() {
    return `2.9.${e.number.int({ min: 160, max: 190 })}`;
  }, presto2() {
    return `${e.number.int({ min: 10, max: 12 })}.00`;
  }, safari() {
    return [e.number.int({ min: 531, max: 538 }), e.number.int(2), e.number.int(2)].join(".");
  } }, t = { firefox(o) {
    let c = `${e.number.int({ min: 5, max: 15 })}${i(2)}`, h = `Gecko/20100101 Firefox/${c}`, p = n(o);
    return `Mozilla/5.0 ${o === "win" ? `(Windows NT ${u.nt()}${p ? `; ${p}` : ""}` : o === "mac" ? `(Macintosh; ${p} Mac OS X ${u.osx()}` : `(X11; Linux ${p}`}; rv:${c.slice(0, -2)}) ${h}`;
  }, iexplorer() {
    let o = u.ie();
    return o >= 11 ? `Mozilla/5.0 (Windows NT 6.${e.number.int({ min: 1, max: 3 })}; Trident/7.0; ${e.datatype.boolean() ? "Touch; " : ""}rv:11.0) like Gecko` : `Mozilla/5.0 (compatible; MSIE ${o}.0; Windows NT ${u.nt()}; Trident/${u.trident()}${e.datatype.boolean() ? `; .NET CLR ${u.net()}` : ""})`;
  }, opera(o) {
    let c = ` Presto/${u.presto()} Version/${u.presto2()})`, h = o === "win" ? `(Windows NT ${u.nt()}; U; ${a()}${c}` : o === "lin" ? `(X11; Linux ${n(o)}; U; ${a()}${c}` : `(Macintosh; Intel Mac OS X ${u.osx()} U; ${a()} Presto/${u.presto()} Version/${u.presto2()})`;
    return `Opera/${e.number.int({ min: 9, max: 14 })}.${e.number.int(99)} ${h}`;
  }, safari(o) {
    let c = u.safari(), h = `${e.number.int({ min: 4, max: 7 })}.${e.number.int(1)}.${e.number.int(10)}`;
    return `Mozilla/5.0 ${o === "mac" ? `(Macintosh; ${n("mac")} Mac OS X ${u.osx("_")} rv:${e.number.int({ min: 2, max: 6 })}.0; ${a()}) ` : `(Windows; U; Windows NT ${u.nt()})`}AppleWebKit/${c} (KHTML, like Gecko) Version/${h} Safari/${c}`;
  }, chrome(o) {
    let c = u.safari();
    return `Mozilla/5.0 ${o === "mac" ? `(Macintosh; ${n("mac")} Mac OS X ${u.osx("_")}) ` : o === "win" ? `(Windows; U; Windows NT ${u.nt()})` : `(X11; Linux ${n(o)}`} AppleWebKit/${c} (KHTML, like Gecko) Chrome/${u.chrome()} Safari/${c}`;
  } }, [l, F] = r();
  return t[l](F);
}
var pt = ((e) => (e.Any = "any", e.Loopback = "loopback", e.PrivateA = "private-a", e.PrivateB = "private-b", e.PrivateC = "private-c", e.TestNet1 = "test-net-1", e.TestNet2 = "test-net-2", e.TestNet3 = "test-net-3", e.LinkLocal = "link-local", e.Multicast = "multicast", e))(pt || {}), yt = { any: "0.0.0.0/0", loopback: "127.0.0.0/8", "private-a": "10.0.0.0/8", "private-b": "172.16.0.0/12", "private-c": "192.168.0.0/16", "test-net-1": "192.0.2.0/24", "test-net-2": "198.51.100.0/24", "test-net-3": "203.0.113.0/24", "link-local": "169.254.0.0/16", multicast: "224.0.0.0/4" }, Dt = class extends B {
  email(e = {}) {
    let { firstName: a, lastName: r, provider: n = this.faker.helpers.arrayElement(this.faker.definitions.internet.free_email), allowSpecialCharacters: i = !1 } = e, u = this.username({ firstName: a, lastName: r });
    if (u = u.replaceAll(/[^A-Za-z0-9._+-]+/g, ""), u = u.substring(0, 50), i) {
      let t = [..."._-"], l = [...".!#$%&'*+-/=?^_`{|}~"];
      u = u.replace(this.faker.helpers.arrayElement(t), this.faker.helpers.arrayElement(l));
    }
    return u = u.replaceAll(/\.{2,}/g, "."), u = u.replace(/^\./, ""), u = u.replace(/\.$/, ""), `${u}@${n}`;
  }
  exampleEmail(e = {}) {
    let { firstName: a, lastName: r, allowSpecialCharacters: n = !1 } = e, i = this.faker.helpers.arrayElement(this.faker.definitions.internet.example_email);
    return this.email({ firstName: a, lastName: r, provider: i, allowSpecialCharacters: n });
  }
  userName(e = {}) {
    return xe({ deprecated: "faker.internet.userName()", proposed: "faker.internet.username()", since: "9.1.0", until: "10.0.0" }), this.username(e);
  }
  username(e = {}) {
    let { firstName: a = this.faker.person.firstName(), lastName: r = this.faker.person.lastName(), lastName: n } = e, i = this.faker.helpers.arrayElement([".", "_"]), u = this.faker.number.int(99), t = [() => `${a}${i}${r}${u}`, () => `${a}${i}${r}`];
    n || t.push(() => `${a}${u}`);
    let l = this.faker.helpers.arrayElement(t)();
    return l = l.normalize("NFKD").replaceAll(/[\u0300-\u036F]/g, ""), l = [...l].map((F) => {
      if (ta[F]) return ta[F];
      let o = F.codePointAt(0) ?? Number.NaN;
      return o < 128 ? F : o.toString(36);
    }).join(""), l = l.toString().replaceAll("'", ""), l = l.replaceAll(" ", ""), l;
  }
  displayName(e = {}) {
    let { firstName: a = this.faker.person.firstName(), lastName: r = this.faker.person.lastName() } = e, n = this.faker.helpers.arrayElement([".", "_"]), i = this.faker.number.int(99), u = [() => `${a}${i}`, () => `${a}${n}${r}`, () => `${a}${n}${r}${i}`], t = this.faker.helpers.arrayElement(u)();
    return t = t.toString().replaceAll("'", ""), t = t.replaceAll(" ", ""), t;
  }
  protocol() {
    let e = ["http", "https"];
    return this.faker.helpers.arrayElement(e);
  }
  httpMethod() {
    let e = ["GET", "POST", "PUT", "DELETE", "PATCH"];
    return this.faker.helpers.arrayElement(e);
  }
  httpStatusCode(e = {}) {
    let { types: a = Object.keys(this.faker.definitions.internet.http_status_code) } = e, r = this.faker.helpers.arrayElement(a);
    return this.faker.helpers.arrayElement(this.faker.definitions.internet.http_status_code[r]);
  }
  url(e = {}) {
    let { appendSlash: a = this.faker.datatype.boolean(), protocol: r = "https" } = e;
    return `${r}://${this.domainName()}${a ? "/" : ""}`;
  }
  domainName() {
    return `${this.domainWord()}.${this.domainSuffix()}`;
  }
  domainSuffix() {
    return this.faker.helpers.arrayElement(this.faker.definitions.internet.domain_suffix);
  }
  domainWord() {
    return this.faker.helpers.slugify(`${this.faker.word.adjective()}-${this.faker.word.noun()}`).toLowerCase();
  }
  ip() {
    return this.faker.datatype.boolean() ? this.ipv4() : this.ipv6();
  }
  ipv4(e = {}) {
    let { network: a = "any", cidrBlock: r = yt[a] } = e;
    if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2}$/.test(r)) throw new y(`Invalid CIDR block provided: ${r}. Must be in the format x.x.x.x/y.`);
    let [n, i] = r.split("/"), u = 4294967295 >>> Number.parseInt(i), [t, l, F, o] = n.split(".").map(Number), c = (t << 24 | l << 16 | F << 8 | o) & ~u, h = this.faker.number.int(u), p = c | h;
    return [p >>> 24 & 255, p >>> 16 & 255, p >>> 8 & 255, p & 255].join(".");
  }
  ipv6() {
    return Array.from({ length: 8 }, () => this.faker.string.hexadecimal({ length: 4, casing: "lower", prefix: "" })).join(":");
  }
  port() {
    return this.faker.number.int(65535);
  }
  userAgent() {
    return mt(this.faker);
  }
  color(e = {}) {
    let { redBase: a = 0, greenBase: r = 0, blueBase: n = 0 } = e, i = (F) => Math.floor((this.faker.number.int(256) + F) / 2).toString(16).padStart(2, "0"), u = i(a), t = i(r), l = i(n);
    return `#${u}${t}${l}`;
  }
  mac(e = {}) {
    typeof e == "string" && (e = { separator: e });
    let { separator: a = ":" } = e, r, n = "";
    for ([":", "-", ""].includes(a) || (a = ":"), r = 0; r < 12; r++) n += this.faker.number.hex(15), r % 2 === 1 && r !== 11 && (n += a);
    return n;
  }
  password(e = {}) {
    let a = /[aeiouAEIOU]$/, r = /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]$/, n = (F, o, c, h) => {
      if (h.length >= F) return h;
      o && (c = r.test(h) ? a : r);
      let p = this.faker.number.int(94) + 33, f = String.fromCodePoint(p);
      return o && (f = f.toLowerCase()), c.test(f) ? n(F, o, c, h + f) : n(F, o, c, h);
    }, { length: i = 15, memorable: u = !1, pattern: t = /\w/, prefix: l = "" } = e;
    return n(i, u, t, l);
  }
  emoji(e = {}) {
    let { types: a = Object.keys(this.faker.definitions.internet.emoji) } = e, r = this.faker.helpers.arrayElement(a);
    return this.faker.helpers.arrayElement(this.faker.definitions.internet.emoji[r]);
  }
  jwtAlgorithm() {
    return this.faker.helpers.arrayElement(this.faker.definitions.internet.jwt_algorithm);
  }
  jwt(e = {}) {
    let { refDate: a = this.faker.defaultRefDate() } = e, r = this.faker.date.recent({ refDate: a }), { header: n = { alg: this.jwtAlgorithm(), typ: "JWT" }, payload: i = { iat: Math.round(r.valueOf() / 1e3), exp: Math.round(this.faker.date.soon({ refDate: r }).valueOf() / 1e3), nbf: Math.round(this.faker.date.anytime({ refDate: a }).valueOf() / 1e3), iss: this.faker.company.name(), sub: this.faker.string.uuid(), aud: this.faker.string.uuid(), jti: this.faker.string.uuid() } } = e, u = ua(JSON.stringify(n)), t = ua(JSON.stringify(i)), l = this.faker.string.alphanumeric(64);
    return `${u}.${t}.${l}`;
  }
}, ja = ((e) => (e.Female = "female", e.Male = "male", e))(ja || {});
function Ce(e, a, r) {
  let { generic: n, female: i, male: u } = r;
  switch (a) {
    case "female":
      return i ?? n;
    case "male":
      return u ?? n;
    default:
      return n ?? e.helpers.arrayElement([i, u]) ?? [];
  }
}
var gt = class extends B {
  firstName(e) {
    return this.faker.helpers.arrayElement(Ce(this.faker, e, this.faker.definitions.person.first_name));
  }
  lastName(e) {
    var a;
    if (((a = this.faker.rawDefinitions.person) == null ? void 0 : a.last_name_pattern) != null) {
      let r = this.faker.helpers.weightedArrayElement(Ce(this.faker, e, this.faker.rawDefinitions.person.last_name_pattern));
      return this.faker.helpers.fake(r);
    }
    return this.faker.helpers.arrayElement(Ce(this.faker, e, this.faker.definitions.person.last_name));
  }
  middleName(e) {
    return this.faker.helpers.arrayElement(Ce(this.faker, e, this.faker.definitions.person.middle_name));
  }
  fullName(e = {}) {
    let { sex: a = this.faker.helpers.arrayElement(["female", "male"]), firstName: r = this.firstName(a), lastName: n = this.lastName(a) } = e, i = this.faker.helpers.weightedArrayElement(this.faker.definitions.person.name);
    return this.faker.helpers.mustache(i, { "person.prefix": () => this.prefix(a), "person.firstName": () => r, "person.middleName": () => this.middleName(a), "person.lastName": () => n, "person.suffix": () => this.suffix() });
  }
  gender() {
    return this.faker.helpers.arrayElement(this.faker.definitions.person.gender);
  }
  sex() {
    return this.faker.helpers.arrayElement(this.faker.definitions.person.sex);
  }
  sexType() {
    return this.faker.helpers.enumValue(ja);
  }
  bio() {
    let { bio_pattern: e } = this.faker.definitions.person;
    return this.faker.helpers.fake(e);
  }
  prefix(e) {
    return this.faker.helpers.arrayElement(Ce(this.faker, e, this.faker.definitions.person.prefix));
  }
  suffix() {
    return this.faker.helpers.arrayElement(this.faker.definitions.person.suffix);
  }
  jobTitle() {
    return this.faker.helpers.fake(this.faker.definitions.person.job_title_pattern);
  }
  jobDescriptor() {
    return this.faker.helpers.arrayElement(this.faker.definitions.person.job_descriptor);
  }
  jobArea() {
    return this.faker.helpers.arrayElement(this.faker.definitions.person.job_area);
  }
  jobType() {
    return this.faker.helpers.arrayElement(this.faker.definitions.person.job_type);
  }
  zodiacSign() {
    return this.faker.helpers.arrayElement(this.faker.definitions.person.western_zodiac_sign);
  }
}, bt = class {
  constructor() {
    d(this, "N", 624);
    d(this, "M", 397);
    d(this, "MATRIX_A", 2567483615);
    d(this, "UPPER_MASK", 2147483648);
    d(this, "LOWER_MASK", 2147483647);
    d(this, "mt", Array.from({ length: this.N }));
    d(this, "mti", this.N + 1);
    d(this, "mag01", [0, this.MATRIX_A]);
  }
  unsigned32(e) {
    return e < 0 ? (e ^ this.UPPER_MASK) + this.UPPER_MASK : e;
  }
  subtraction32(e, a) {
    return e < a ? this.unsigned32(4294967296 - (a - e) & 4294967295) : e - a;
  }
  addition32(e, a) {
    return this.unsigned32(e + a & 4294967295);
  }
  multiplication32(e, a) {
    let r = 0;
    for (let n = 0; n < 32; ++n) e >>> n & 1 && (r = this.addition32(r, this.unsigned32(a << n)));
    return r;
  }
  initGenrand(e) {
    for (this.mt[0] = this.unsigned32(e & 4294967295), this.mti = 1; this.mti < this.N; this.mti++) this.mt[this.mti] = this.addition32(this.multiplication32(1812433253, this.unsigned32(this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30)), this.mti), this.mt[this.mti] = this.unsigned32(this.mt[this.mti] & 4294967295);
  }
  initByArray(e, a) {
    this.initGenrand(19650218);
    let r = 1, n = 0, i = Math.max(this.N, a);
    for (; i; i--) this.mt[r] = this.addition32(this.addition32(this.unsigned32(this.mt[r] ^ this.multiplication32(this.unsigned32(this.mt[r - 1] ^ this.mt[r - 1] >>> 30), 1664525)), e[n]), n), this.mt[r] = this.unsigned32(this.mt[r] & 4294967295), r++, n++, r >= this.N && (this.mt[0] = this.mt[this.N - 1], r = 1), n >= a && (n = 0);
    for (i = this.N - 1; i; i--) this.mt[r] = this.subtraction32(this.unsigned32(this.mt[r] ^ this.multiplication32(this.unsigned32(this.mt[r - 1] ^ this.mt[r - 1] >>> 30), 1566083941)), r), this.mt[r] = this.unsigned32(this.mt[r] & 4294967295), r++, r >= this.N && (this.mt[0] = this.mt[this.N - 1], r = 1);
    this.mt[0] = 2147483648;
  }
  genrandInt32() {
    let e;
    if (this.mti >= this.N) {
      let a;
      for (this.mti === this.N + 1 && this.initGenrand(5489), a = 0; a < this.N - this.M; a++) e = this.unsigned32(this.mt[a] & this.UPPER_MASK | this.mt[a + 1] & this.LOWER_MASK), this.mt[a] = this.unsigned32(this.mt[a + this.M] ^ e >>> 1 ^ this.mag01[e & 1]);
      for (; a < this.N - 1; a++) e = this.unsigned32(this.mt[a] & this.UPPER_MASK | this.mt[a + 1] & this.LOWER_MASK), this.mt[a] = this.unsigned32(this.mt[a + (this.M - this.N)] ^ e >>> 1 ^ this.mag01[e & 1]);
      e = this.unsigned32(this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK), this.mt[this.N - 1] = this.unsigned32(this.mt[this.M - 1] ^ e >>> 1 ^ this.mag01[e & 1]), this.mti = 0;
    }
    return e = this.mt[this.mti++], e = this.unsigned32(e ^ e >>> 11), e = this.unsigned32(e ^ e << 7 & 2636928640), e = this.unsigned32(e ^ e << 15 & 4022730752), e = this.unsigned32(e ^ e >>> 18), e;
  }
  genrandInt31() {
    return this.genrandInt32() >>> 1;
  }
  genrandReal1() {
    return this.genrandInt32() * (1 / 4294967295);
  }
  genrandReal2() {
    return this.genrandInt32() * (1 / 4294967296);
  }
  genrandReal3() {
    return (this.genrandInt32() + 0.5) * (1 / 4294967296);
  }
  genrandRes53() {
    let e = this.genrandInt32() >>> 5, a = this.genrandInt32() >>> 6;
    return (e * 67108864 + a) * (1 / 9007199254740992);
  }
};
function ft() {
  let e = new bt();
  return e.initGenrand(Math.ceil(Math.random() * Number.MAX_SAFE_INTEGER)), { next() {
    return e.genrandRes53();
  }, seed(a) {
    typeof a == "number" ? e.initGenrand(a) : Array.isArray(a) && e.initByArray(a, a.length);
  } };
}
var Ct = class extends ge {
  boolean(e = {}) {
    typeof e == "number" && (e = { probability: e });
    let { probability: a = 0.5 } = e;
    return a <= 0 ? !1 : a >= 1 ? !0 : this.faker.number.float() < a;
  }
};
function z(e, a = "refDate") {
  let r = new Date(e);
  if (Number.isNaN(r.valueOf())) throw new y(`Invalid ${a} date: ${e.toString()}`);
  return r;
}
var Ie = () => {
  throw new y("You cannot edit the locale data on the faker instance");
};
function Et(e) {
  let a = {};
  return new Proxy(e, { has() {
    return !0;
  }, get(r, n) {
    return typeof n == "symbol" || n === "nodeType" ? r[n] : n in a ? a[n] : a[n] = kt(n, r[n]);
  }, set: Ie, deleteProperty: Ie });
}
function qe(e, ...a) {
  if (e === null) throw new y(`The locale data for '${a.join(".")}' aren't applicable to this locale.
  If you think this is a bug, please report it at: https://github.com/faker-js/faker`);
  if (e === void 0) throw new y(`The locale data for '${a.join(".")}' are missing in this locale.
  Please contribute the missing data to the project or use a locale/Faker instance that has these data.
  For more information see https://fakerjs.dev/guide/localization.html`);
}
function kt(e, a = {}) {
  return new Proxy(a, { has(r, n) {
    return r[n] != null;
  }, get(r, n) {
    let i = r[n];
    return typeof n == "symbol" || n === "nodeType" || qe(i, e, n.toString()), i;
  }, set: Ie, deleteProperty: Ie });
}
var Ya = class extends ge {
  anytime(e = {}) {
    let { refDate: a = this.faker.defaultRefDate() } = e, r = z(a).getTime();
    return this.between({ from: r - 1e3 * 60 * 60 * 24 * 365, to: r + 1e3 * 60 * 60 * 24 * 365 });
  }
  past(e = {}) {
    let { years: a = 1, refDate: r = this.faker.defaultRefDate() } = e;
    if (a <= 0) throw new y("Years must be greater than 0.");
    let n = z(r).getTime();
    return this.between({ from: n - a * 365 * 24 * 3600 * 1e3, to: n - 1e3 });
  }
  future(e = {}) {
    let { years: a = 1, refDate: r = this.faker.defaultRefDate() } = e;
    if (a <= 0) throw new y("Years must be greater than 0.");
    let n = z(r).getTime();
    return this.between({ from: n + 1e3, to: n + a * 365 * 24 * 3600 * 1e3 });
  }
  between(e) {
    if (e == null || e.from == null || e.to == null) throw new y("Must pass an options object with `from` and `to` values.");
    let { from: a, to: r } = e, n = z(a, "from").getTime(), i = z(r, "to").getTime();
    if (n > i) throw new y("`from` date must be before `to` date.");
    return new Date(this.faker.number.int({ min: n, max: i }));
  }
  betweens(e) {
    if (e == null || e.from == null || e.to == null) throw new y("Must pass an options object with `from` and `to` values.");
    let { from: a, to: r, count: n = 3 } = e;
    return this.faker.helpers.multiple(() => this.between({ from: a, to: r }), { count: n }).sort((i, u) => i.getTime() - u.getTime());
  }
  recent(e = {}) {
    let { days: a = 1, refDate: r = this.faker.defaultRefDate() } = e;
    if (a <= 0) throw new y("Days must be greater than 0.");
    let n = z(r).getTime();
    return this.between({ from: n - a * 24 * 3600 * 1e3, to: n - 1e3 });
  }
  soon(e = {}) {
    let { days: a = 1, refDate: r = this.faker.defaultRefDate() } = e;
    if (a <= 0) throw new y("Days must be greater than 0.");
    let n = z(r).getTime();
    return this.between({ from: n + 1e3, to: n + a * 24 * 3600 * 1e3 });
  }
  birthdate(e = {}) {
    let { mode: a = "age", min: r = 18, max: n = 80, refDate: i = this.faker.defaultRefDate(), mode: u, min: t, max: l } = e;
    if ([t, l, u].filter((c) => c != null).length % 3 !== 0) throw new y("The 'min', 'max', and 'mode' options must be set together.");
    let F = z(i), o = F.getUTCFullYear();
    switch (a) {
      case "age": {
        let c = new Date(F).setUTCFullYear(o - n - 1) + 864e5, h = new Date(F).setUTCFullYear(o - r);
        if (c > h) throw new y(`Max age ${n} should be greater than or equal to min age ${r}.`);
        return this.between({ from: c, to: h });
      }
      case "year": {
        let c = new Date(Date.UTC(0, 0, 2)).setUTCFullYear(r), h = new Date(Date.UTC(0, 11, 30)).setUTCFullYear(n);
        if (c > h) throw new y(`Max year ${n} should be greater than or equal to min year ${r}.`);
        return this.between({ from: c, to: h });
      }
    }
  }
}, At = class extends Ya {
  constructor(e) {
    super(e), this.faker = e;
  }
  month(e = {}) {
    let { abbreviated: a = !1, context: r = !1 } = e, n = this.faker.definitions.date.month, i;
    a ? i = r && n.abbr_context != null ? "abbr_context" : "abbr" : i = r && n.wide_context != null ? "wide_context" : "wide";
    let u = n[i];
    return qe(u, "date.month", i), this.faker.helpers.arrayElement(u);
  }
  weekday(e = {}) {
    let { abbreviated: a = !1, context: r = !1 } = e, n = this.faker.definitions.date.weekday, i;
    a ? i = r && n.abbr_context != null ? "abbr_context" : "abbr" : i = r && n.wide_context != null ? "wide_context" : "wide";
    let u = n[i];
    return qe(u, "date.weekday", i), this.faker.helpers.arrayElement(u);
  }
  timeZone() {
    return this.faker.helpers.arrayElement(this.faker.definitions.date.time_zone);
  }
}, Bt = /\.|\(/;
function St(e, a, r = [a, a.rawDefinitions]) {
  if (e.length === 0) throw new y("Eval expression cannot be empty.");
  if (r.length === 0) throw new y("Eval entrypoints cannot be empty.");
  let n = r, i = e;
  do {
    let t;
    i.startsWith("(") ? [t, n] = vt(i, n, e) : [t, n] = Mt(i, n), i = i.substring(t), n = n.filter((l) => l != null).map((l) => Array.isArray(l) ? a.helpers.arrayElement(l) : l);
  } while (i.length > 0 && n.length > 0);
  if (n.length === 0) throw new y(`Cannot resolve expression '${e}'`);
  let u = n[0];
  return typeof u == "function" ? u() : u;
}
function vt(e, a, r) {
  let [n, i] = wt(e), u = e[n + 1];
  switch (u) {
    case ".":
    case "(":
    case void 0:
      break;
    default:
      throw new y(`Expected dot ('.'), open parenthesis ('('), or nothing after function call but got '${u}'`);
  }
  return [n + (u === "." ? 2 : 1), a.map((t) => typeof t == "function" ? t(...i) : (console.warn(`[@faker-js/faker]: Invoking expressions which are not functions is deprecated since v9.0 and will be removed in v10.0.
Please remove the parentheses or replace the expression with an actual function.
${r}
${" ".repeat(r.length - e.length)}^`), t))];
}
function wt(e) {
  let a = e.indexOf(")", 1);
  if (a === -1) throw new y(`Missing closing parenthesis in '${e}'`);
  for (; a !== -1; ) {
    let n = e.substring(1, a);
    try {
      return [a, JSON.parse(`[${n}]`)];
    } catch {
      if (!n.includes("'") && !n.includes('"')) try {
        return [a, JSON.parse(`["${n}"]`)];
      } catch {
      }
    }
    a = e.indexOf(")", a + 1);
  }
  a = e.lastIndexOf(")");
  let r = e.substring(1, a);
  return [a, [r]];
}
function Mt(e, a) {
  let r = Bt.exec(e), n = ((r == null ? void 0 : r[0]) ?? "") === ".", i = (r == null ? void 0 : r.index) ?? e.length, u = e.substring(0, i);
  if (u.length === 0) throw new y(`Expression parts cannot be empty in '${e}'`);
  let t = e[i + 1];
  if (n && (t == null || t === "." || t === "(")) throw new y(`Found dot without property name in '${e}'`);
  return [i + (n ? 1 : 0), a.map((l) => Tt(l, u))];
}
function Tt(e, a) {
  switch (typeof e) {
    case "function": {
      try {
        e = e();
      } catch {
        return;
      }
      return e == null ? void 0 : e[a];
    }
    case "object":
      return e == null ? void 0 : e[a];
    default:
      return;
  }
}
function Lt(e) {
  let a = Rt(e.replace(/L?$/, "0"));
  return a === 0 ? 0 : 10 - a;
}
function Rt(e) {
  e = e.replaceAll(/[\s-]/g, "");
  let a = 0, r = !1;
  for (let n = e.length - 1; n >= 0; n--) {
    let i = Number.parseInt(e[n]);
    r && (i *= 2, i > 9 && (i = i % 10 + 1)), a += i, r = !r;
  }
  return a % 10;
}
function oa(e, a, r, n) {
  let i = 1;
  if (a) switch (a) {
    case "?": {
      i = e.datatype.boolean() ? 0 : 1;
      break;
    }
    case "*": {
      let u = 1;
      for (; e.datatype.boolean(); ) u *= 2;
      i = e.number.int({ min: 0, max: u });
      break;
    }
    case "+": {
      let u = 1;
      for (; e.datatype.boolean(); ) u *= 2;
      i = e.number.int({ min: 1, max: u });
      break;
    }
    default:
      throw new y("Unknown quantifier symbol provided.");
  }
  else r != null && n != null ? i = e.number.int({ min: Number.parseInt(r), max: Number.parseInt(n) }) : r != null && n == null && (i = Number.parseInt(r));
  return i;
}
function Pt(e, a = "") {
  let r = /(.)\{(\d+),(\d+)\}/, n = /(.)\{(\d+)\}/, i = /\[(\d+)-(\d+)\]/, u, t, l, F, o = r.exec(a);
  for (; o != null; ) u = Number.parseInt(o[2]), t = Number.parseInt(o[3]), u > t && (l = t, t = u, u = l), F = e.number.int({ min: u, max: t }), a = a.slice(0, o.index) + o[1].repeat(F) + a.slice(o.index + o[0].length), o = r.exec(a);
  for (o = n.exec(a); o != null; ) F = Number.parseInt(o[2]), a = a.slice(0, o.index) + o[1].repeat(F) + a.slice(o.index + o[0].length), o = n.exec(a);
  for (o = i.exec(a); o != null; ) u = Number.parseInt(o[1]), t = Number.parseInt(o[2]), u > t && (l = t, t = u, u = l), a = a.slice(0, o.index) + e.number.int({ min: u, max: t }).toString() + a.slice(o.index + o[0].length), o = i.exec(a);
  return a;
}
function $a(e, a = "", r = "#") {
  let n = "";
  for (let i = 0; i < a.length; i++) a.charAt(i) === r ? n += e.number.int(9) : a.charAt(i) === "!" ? n += e.number.int({ min: 2, max: 9 }) : n += a.charAt(i);
  return n;
}
var Ua = class extends ge {
  slugify(e = "") {
    return e.normalize("NFKD").replaceAll(/[\u0300-\u036F]/g, "").replaceAll(" ", "-").replaceAll(/[^\w.-]+/g, "");
  }
  replaceSymbols(e = "") {
    let a = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], r = "";
    for (let n = 0; n < e.length; n++) e.charAt(n) === "#" ? r += this.faker.number.int(9) : e.charAt(n) === "?" ? r += this.arrayElement(a) : e.charAt(n) === "*" ? r += this.faker.datatype.boolean() ? this.arrayElement(a) : this.faker.number.int(9) : r += e.charAt(n);
    return r;
  }
  replaceCreditCardSymbols(e = "6453-####-####-####-###L", a = "#") {
    e = Pt(this.faker, e), e = $a(this.faker, e, a);
    let r = Lt(e);
    return e.replace("L", String(r));
  }
  fromRegExp(e) {
    var h;
    let a = !1;
    e instanceof RegExp && (a = e.flags.includes("i"), e = e.toString(), e = ((h = /\/(.+?)\//.exec(e)) == null ? void 0 : h[1]) ?? "");
    let r, n, i, u = /([.A-Za-z0-9])(?:\{(\d+)(?:,(\d+)|)\}|(\?|\*|\+))(?![^[]*]|[^{]*})/, t = u.exec(e);
    for (; t != null; ) {
      let p = t[2], f = t[3], b = t[4];
      i = oa(this.faker, b, p, f), e = e.slice(0, t.index) + t[1].repeat(i) + e.slice(t.index + t[0].length), t = u.exec(e);
    }
    let l = /(\d-\d|\w-\w|\d|\w|[-!@#$&()`.+,/"])/, F = /\[(\^|)(-|)(.+?)\](?:\{(\d+)(?:,(\d+)|)\}|(\?|\*|\+)|)/;
    for (t = F.exec(e); t != null; ) {
      let p = t[1] === "^", f = t[2] === "-", b = t[4], C = t[5], T = t[6], k = [], G = t[3], v = l.exec(G);
      for (f && k.push(45); v != null; ) {
        if (v[0].includes("-")) {
          let L = v[0].split("-").map((E) => E.codePointAt(0) ?? Number.NaN);
          if (r = L[0], n = L[1], r > n) throw new y("Character range provided is out of order.");
          for (let E = r; E <= n; E++) if (a && Number.isNaN(Number(String.fromCodePoint(E)))) {
            let O = String.fromCodePoint(E);
            k.push(O.toUpperCase().codePointAt(0) ?? Number.NaN, O.toLowerCase().codePointAt(0) ?? Number.NaN);
          } else k.push(E);
        } else a && Number.isNaN(Number(v[0])) ? k.push(v[0].toUpperCase().codePointAt(0) ?? Number.NaN, v[0].toLowerCase().codePointAt(0) ?? Number.NaN) : k.push(v[0].codePointAt(0) ?? Number.NaN);
        G = G.substring(v[0].length), v = l.exec(G);
      }
      if (i = oa(this.faker, T, b, C), p) {
        let L = -1;
        for (let E = 48; E <= 57; E++) {
          if (L = k.indexOf(E), L > -1) {
            k.splice(L, 1);
            continue;
          }
          k.push(E);
        }
        for (let E = 65; E <= 90; E++) {
          if (L = k.indexOf(E), L > -1) {
            k.splice(L, 1);
            continue;
          }
          k.push(E);
        }
        for (let E = 97; E <= 122; E++) {
          if (L = k.indexOf(E), L > -1) {
            k.splice(L, 1);
            continue;
          }
          k.push(E);
        }
      }
      let be = this.multiple(() => String.fromCodePoint(this.arrayElement(k)), { count: i }).join("");
      e = e.slice(0, t.index) + be + e.slice(t.index + t[0].length), t = F.exec(e);
    }
    let o = /(.)\{(\d+),(\d+)\}/;
    for (t = o.exec(e); t != null; ) {
      if (r = Number.parseInt(t[2]), n = Number.parseInt(t[3]), r > n) throw new y("Numbers out of order in {} quantifier.");
      i = this.faker.number.int({ min: r, max: n }), e = e.slice(0, t.index) + t[1].repeat(i) + e.slice(t.index + t[0].length), t = o.exec(e);
    }
    let c = /(.)\{(\d+)\}/;
    for (t = c.exec(e); t != null; ) i = Number.parseInt(t[2]), e = e.slice(0, t.index) + t[1].repeat(i) + e.slice(t.index + t[0].length), t = c.exec(e);
    return e;
  }
  shuffle(e, a = {}) {
    let { inplace: r = !1 } = a;
    r || (e = [...e]);
    for (let n = e.length - 1; n > 0; --n) {
      let i = this.faker.number.int(n);
      [e[n], e[i]] = [e[i], e[n]];
    }
    return e;
  }
  uniqueArray(e, a) {
    if (Array.isArray(e)) {
      let n = [...new Set(e)];
      return this.shuffle(n).splice(0, a);
    }
    let r = /* @__PURE__ */ new Set();
    try {
      if (typeof e == "function") {
        let n = 1e3 * a, i = 0;
        for (; r.size < a && i < n; ) r.add(e()), i++;
      }
    } catch {
    }
    return [...r];
  }
  mustache(e, a) {
    if (e == null) return "";
    for (let r in a) {
      let n = new RegExp(`{{${r}}}`, "g"), i = a[r];
      typeof i == "string" && (i = i.replaceAll("$", "$$$$")), e = e.replace(n, i);
    }
    return e;
  }
  maybe(e, a = {}) {
    if (this.faker.datatype.boolean(a)) return e();
  }
  objectKey(e) {
    let a = Object.keys(e);
    return this.arrayElement(a);
  }
  objectValue(e) {
    let a = this.faker.helpers.objectKey(e);
    return e[a];
  }
  objectEntry(e) {
    let a = this.faker.helpers.objectKey(e);
    return [a, e[a]];
  }
  arrayElement(e) {
    if (e.length === 0) throw new y("Cannot get value from empty dataset.");
    let a = e.length > 1 ? this.faker.number.int({ max: e.length - 1 }) : 0;
    return e[a];
  }
  weightedArrayElement(e) {
    if (e.length === 0) throw new y("weightedArrayElement expects an array with at least one element");
    if (!e.every((i) => i.weight > 0)) throw new y("weightedArrayElement expects an array of { weight, value } objects where weight is a positive number");
    let a = e.reduce((i, { weight: u }) => i + u, 0), r = this.faker.number.float({ min: 0, max: a }), n = 0;
    for (let { weight: i, value: u } of e) if (n += i, r < n) return u;
    return e.at(-1).value;
  }
  arrayElements(e, a) {
    if (e.length === 0) return [];
    let r = this.rangeToNumber(a ?? { min: 1, max: e.length });
    if (r >= e.length) return this.shuffle(e);
    if (r <= 0) return [];
    let n = [...e], i = e.length, u = i - r, t, l;
    for (; i-- > u; ) l = this.faker.number.int(i), t = n[l], n[l] = n[i], n[i] = t;
    return n.slice(u);
  }
  enumValue(e) {
    let a = Object.keys(e).filter((n) => Number.isNaN(Number(n))), r = this.arrayElement(a);
    return e[r];
  }
  rangeToNumber(e) {
    return typeof e == "number" ? e : this.faker.number.int(e);
  }
  multiple(e, a = {}) {
    let r = this.rangeToNumber(a.count ?? 3);
    return r <= 0 ? [] : Array.from({ length: r }, e);
  }
}, Ht = class extends Ua {
  constructor(e) {
    super(e), this.faker = e;
  }
  fake(e) {
    e = typeof e == "string" ? e : this.arrayElement(e);
    let a = e.search(/{{[a-z]/), r = e.indexOf("}}", a);
    if (a === -1 || r === -1) return e;
    let n = e.substring(a + 2, r + 2).replace("}}", "").replace("{{", ""), i = St(n, this.faker), u = String(i), t = e.substring(0, a) + u + e.substring(r + 2);
    return this.fake(t);
  }
}, Gt = class extends ge {
  int(e = {}) {
    typeof e == "number" && (e = { max: e });
    let { min: a = 0, max: r = Number.MAX_SAFE_INTEGER, multipleOf: n = 1 } = e;
    if (!Number.isInteger(n)) throw new y("multipleOf should be an integer.");
    if (n <= 0) throw new y("multipleOf should be greater than 0.");
    let i = Math.ceil(a / n), u = Math.floor(r / n);
    if (i === u) return i * n;
    if (u < i) throw r >= a ? new y(`No suitable integer value between ${a} and ${r} found.`) : new y(`Max ${r} should be greater than min ${a}.`);
    let t = this.faker._randomizer.next(), l = u - i + 1;
    return Math.floor(t * l + i) * n;
  }
  float(e = {}) {
    typeof e == "number" && (e = { max: e });
    let { min: a = 0, max: r = 1, fractionDigits: n, multipleOf: i, multipleOf: u = n == null ? void 0 : 10 ** -n } = e;
    if (r === a) return a;
    if (r < a) throw new y(`Max ${r} should be greater than min ${a}.`);
    if (n != null) {
      if (i != null) throw new y("multipleOf and fractionDigits cannot be set at the same time.");
      if (!Number.isInteger(n)) throw new y("fractionDigits should be an integer.");
      if (n < 0) throw new y("fractionDigits should be greater than or equal to 0.");
    }
    if (u != null) {
      if (u <= 0) throw new y("multipleOf should be greater than 0.");
      let t = Math.log10(u), l = u < 1 && Number.isInteger(t) ? 10 ** -t : 1 / u;
      return this.int({ min: a * l, max: r * l }) / l;
    }
    return this.faker._randomizer.next() * (r - a) + a;
  }
  binary(e = {}) {
    typeof e == "number" && (e = { max: e });
    let { min: a = 0, max: r = 1 } = e;
    return this.int({ max: r, min: a }).toString(2);
  }
  octal(e = {}) {
    typeof e == "number" && (e = { max: e });
    let { min: a = 0, max: r = 7 } = e;
    return this.int({ max: r, min: a }).toString(8);
  }
  hex(e = {}) {
    typeof e == "number" && (e = { max: e });
    let { min: a = 0, max: r = 15 } = e;
    return this.int({ max: r, min: a }).toString(16);
  }
  bigInt(e = {}) {
    (typeof e == "bigint" || typeof e == "number" || typeof e == "string" || typeof e == "boolean") && (e = { max: e });
    let a = BigInt(e.min ?? 0), r = BigInt(e.max ?? a + BigInt(999999999999999));
    if (r === a) return a;
    if (r < a) throw new y(`Max ${r} should be larger then min ${a}.`);
    let n = r - a, i = BigInt(this.faker.string.numeric({ length: n.toString(10).length, allowLeadingZeros: !0 })) % (n + BigInt(1));
    return a + i;
  }
  romanNumeral(e = {}) {
    typeof e == "number" && (e = { max: e });
    let { min: a = 1, max: r = 3999 } = e;
    if (a < 1) throw new y(`Min value ${a} should be 1 or greater.`);
    if (r > 3999) throw new y(`Max value ${r} should be 3999 or less.`);
    let n = this.int({ min: a, max: r }), i = [["M", 1e3], ["CM", 900], ["D", 500], ["CD", 400], ["C", 100], ["XC", 90], ["L", 50], ["XL", 40], ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1]], u = "";
    for (let [t, l] of i) u += t.repeat(Math.floor(n / l)), n %= l;
    return u;
  }
}, _a = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
function Nt(e) {
  let a = e.valueOf(), r = "";
  for (let n = 10; n > 0; n--) {
    let i = a % 32;
    r = _a[i] + r, a = (a - i) / 32;
  }
  return r;
}
var Re = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"], Pe = [..."abcdefghijklmnopqrstuvwxyz"], la = [..."0123456789"], Wt = class extends ge {
  fromCharacters(e, a = 1) {
    if (a = this.faker.helpers.rangeToNumber(a), a <= 0) return "";
    if (typeof e == "string" && (e = [...e]), e.length === 0) throw new y("Unable to generate string: No characters to select from.");
    return this.faker.helpers.multiple(() => this.faker.helpers.arrayElement(e), { count: a }).join("");
  }
  alpha(e = {}) {
    typeof e == "number" && (e = { length: e });
    let a = this.faker.helpers.rangeToNumber(e.length ?? 1);
    if (a <= 0) return "";
    let { casing: r = "mixed" } = e, { exclude: n = [] } = e;
    typeof n == "string" && (n = [...n]);
    let i;
    switch (r) {
      case "upper": {
        i = [...Re];
        break;
      }
      case "lower": {
        i = [...Pe];
        break;
      }
      case "mixed": {
        i = [...Pe, ...Re];
        break;
      }
    }
    return i = i.filter((u) => !n.includes(u)), this.fromCharacters(i, a);
  }
  alphanumeric(e = {}) {
    typeof e == "number" && (e = { length: e });
    let a = this.faker.helpers.rangeToNumber(e.length ?? 1);
    if (a <= 0) return "";
    let { casing: r = "mixed" } = e, { exclude: n = [] } = e;
    typeof n == "string" && (n = [...n]);
    let i = [...la];
    switch (r) {
      case "upper": {
        i.push(...Re);
        break;
      }
      case "lower": {
        i.push(...Pe);
        break;
      }
      case "mixed": {
        i.push(...Pe, ...Re);
        break;
      }
    }
    return i = i.filter((u) => !n.includes(u)), this.fromCharacters(i, a);
  }
  binary(e = {}) {
    let { prefix: a = "0b" } = e, r = a;
    return r += this.fromCharacters(["0", "1"], e.length ?? 1), r;
  }
  octal(e = {}) {
    let { prefix: a = "0o" } = e, r = a;
    return r += this.fromCharacters(["0", "1", "2", "3", "4", "5", "6", "7"], e.length ?? 1), r;
  }
  hexadecimal(e = {}) {
    let { casing: a = "mixed", prefix: r = "0x" } = e, n = this.faker.helpers.rangeToNumber(e.length ?? 1);
    if (n <= 0) return r;
    let i = this.fromCharacters(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "A", "B", "C", "D", "E", "F"], n);
    return a === "upper" ? i = i.toUpperCase() : a === "lower" && (i = i.toLowerCase()), `${r}${i}`;
  }
  numeric(e = {}) {
    typeof e == "number" && (e = { length: e });
    let a = this.faker.helpers.rangeToNumber(e.length ?? 1);
    if (a <= 0) return "";
    let { allowLeadingZeros: r = !0 } = e, { exclude: n = [] } = e;
    typeof n == "string" && (n = [...n]);
    let i = la.filter((t) => !n.includes(t));
    if (i.length === 0 || i.length === 1 && !r && i[0] === "0") throw new y("Unable to generate numeric string, because all possible digits are excluded.");
    let u = "";
    return !r && !n.includes("0") && (u += this.faker.helpers.arrayElement(i.filter((t) => t !== "0"))), u += this.fromCharacters(i, a - u.length), u;
  }
  sample(e = 10) {
    e = this.faker.helpers.rangeToNumber(e);
    let a = { min: 33, max: 125 }, r = "";
    for (; r.length < e; ) r += String.fromCodePoint(this.faker.number.int(a));
    return r;
  }
  uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replaceAll("x", () => this.faker.number.hex({ min: 0, max: 15 })).replaceAll("y", () => this.faker.number.hex({ min: 8, max: 11 }));
  }
  ulid(e = {}) {
    let { refDate: a = this.faker.defaultRefDate() } = e, r = z(a);
    return Nt(r) + this.fromCharacters(_a, 16);
  }
  nanoid(e = 21) {
    if (e = this.faker.helpers.rangeToNumber(e), e <= 0) return "";
    let a = [{ value: () => this.alphanumeric(1), weight: 62 }, { value: () => this.faker.helpers.arrayElement(["_", "-"]), weight: 2 }], r = "";
    for (; r.length < e; ) {
      let n = this.faker.helpers.weightedArrayElement(a);
      r += n();
    }
    return r;
  }
  symbol(e = 1) {
    return this.fromCharacters(["!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"], e);
  }
}, qa = class {
  constructor(e = {}) {
    d(this, "_defaultRefDate", () => /* @__PURE__ */ new Date());
    d(this, "_randomizer");
    d(this, "datatype", new Ct(this));
    d(this, "date", new Ya(this));
    d(this, "helpers", new Ua(this));
    d(this, "number", new Gt(this));
    d(this, "string", new Wt(this));
    let { randomizer: a = ft() } = e;
    this._randomizer = a;
  }
  get defaultRefDate() {
    return this._defaultRefDate;
  }
  setDefaultRefDate(e = () => /* @__PURE__ */ new Date()) {
    typeof e == "function" ? this._defaultRefDate = e : this._defaultRefDate = () => new Date(e);
  }
  seed(e = Math.ceil(Math.random() * Number.MAX_SAFE_INTEGER)) {
    return this._randomizer.seed(e), e;
  }
};
new qa();
function xt(e) {
  let a = {};
  for (let r of e) for (let n in r) {
    let i = r[n];
    a[n] === void 0 ? a[n] = { ...i } : a[n] = { ...i, ...a[n] };
  }
  return a;
}
var It = class extends B {
  dog() {
    return this.faker.helpers.arrayElement(this.faker.definitions.animal.dog);
  }
  cat() {
    return this.faker.helpers.arrayElement(this.faker.definitions.animal.cat);
  }
  snake() {
    return this.faker.helpers.arrayElement(this.faker.definitions.animal.snake);
  }
  bear() {
    return this.faker.helpers.arrayElement(this.faker.definitions.animal.bear);
  }
  lion() {
    return this.faker.helpers.arrayElement(this.faker.definitions.animal.lion);
  }
  cetacean() {
    return this.faker.helpers.arrayElement(this.faker.definitions.animal.cetacean);
  }
  horse() {
    return this.faker.helpers.arrayElement(this.faker.definitions.animal.horse);
  }
  bird() {
    return this.faker.helpers.arrayElement(this.faker.definitions.animal.bird);
  }
  cow() {
    return this.faker.helpers.arrayElement(this.faker.definitions.animal.cow);
  }
  fish() {
    return this.faker.helpers.arrayElement(this.faker.definitions.animal.fish);
  }
  crocodilia() {
    return this.faker.helpers.arrayElement(this.faker.definitions.animal.crocodilia);
  }
  insect() {
    return this.faker.helpers.arrayElement(this.faker.definitions.animal.insect);
  }
  rabbit() {
    return this.faker.helpers.arrayElement(this.faker.definitions.animal.rabbit);
  }
  rodent() {
    return this.faker.helpers.arrayElement(this.faker.definitions.animal.rodent);
  }
  type() {
    return this.faker.helpers.arrayElement(this.faker.definitions.animal.type);
  }
  petName() {
    return this.faker.helpers.arrayElement(this.faker.definitions.animal.pet_name);
  }
}, Kt = class extends B {
  author() {
    return this.faker.helpers.arrayElement(this.faker.definitions.book.author);
  }
  format() {
    return this.faker.helpers.arrayElement(this.faker.definitions.book.format);
  }
  genre() {
    return this.faker.helpers.arrayElement(this.faker.definitions.book.genre);
  }
  publisher() {
    return this.faker.helpers.arrayElement(this.faker.definitions.book.publisher);
  }
  series() {
    return this.faker.helpers.arrayElement(this.faker.definitions.book.series);
  }
  title() {
    return this.faker.helpers.arrayElement(this.faker.definitions.book.title);
  }
}, Ot = { 0: [[1999999, 2], [2279999, 3], [2289999, 4], [3689999, 3], [3699999, 4], [6389999, 3], [6397999, 4], [6399999, 7], [6449999, 3], [6459999, 7], [6479999, 3], [6489999, 7], [6549999, 3], [6559999, 4], [6999999, 3], [8499999, 4], [8999999, 5], [9499999, 6], [9999999, 7]], 1: [[99999, 3], [299999, 2], [349999, 3], [399999, 4], [499999, 3], [699999, 2], [999999, 4], [3979999, 3], [5499999, 4], [6499999, 5], [6799999, 4], [6859999, 5], [7139999, 4], [7169999, 3], [7319999, 4], [7399999, 7], [7749999, 5], [7753999, 7], [7763999, 5], [7764999, 7], [7769999, 5], [7782999, 7], [7899999, 5], [7999999, 4], [8004999, 5], [8049999, 5], [8379999, 5], [8384999, 7], [8671999, 5], [8675999, 4], [8697999, 5], [9159999, 6], [9165059, 7], [9168699, 6], [9169079, 7], [9195999, 6], [9196549, 7], [9729999, 6], [9877999, 4], [9911499, 6], [9911999, 7], [9989899, 6], [9999999, 7]] }, Jt = class extends B {
  department() {
    return this.faker.helpers.arrayElement(this.faker.definitions.commerce.department);
  }
  productName() {
    return `${this.productAdjective()} ${this.productMaterial()} ${this.product()}`;
  }
  price(e = {}) {
    let { dec: a = 2, max: r = 1e3, min: n = 1, symbol: i = "" } = e;
    if (n < 0 || r < 0) return `${i}0`;
    if (n === r) return `${i}${n.toFixed(a)}`;
    let u = this.faker.number.float({ min: n, max: r, fractionDigits: a });
    if (a === 0) return `${i}${u.toFixed(a)}`;
    let t = u * 10 ** a % 10, l = this.faker.helpers.weightedArrayElement([{ weight: 5, value: 9 }, { weight: 3, value: 5 }, { weight: 1, value: 0 }, { weight: 1, value: this.faker.number.int({ min: 0, max: 9 }) }]), F = (1 / 10) ** a, o = t * F, c = l * F, h = u - o + c;
    return n <= h && h <= r ? `${i}${h.toFixed(a)}` : `${i}${u.toFixed(a)}`;
  }
  productAdjective() {
    return this.faker.helpers.arrayElement(this.faker.definitions.commerce.product_name.adjective);
  }
  productMaterial() {
    return this.faker.helpers.arrayElement(this.faker.definitions.commerce.product_name.material);
  }
  product() {
    return this.faker.helpers.arrayElement(this.faker.definitions.commerce.product_name.product);
  }
  productDescription() {
    return this.faker.helpers.fake(this.faker.definitions.commerce.product_description);
  }
  isbn(e = {}) {
    var b;
    typeof e == "number" && (e = { variant: e });
    let { variant: a = 13, separator: r = "-" } = e, n = "978", [i, u] = this.faker.helpers.objectEntry(Ot), t = this.faker.string.numeric(8), l = Number.parseInt(t.slice(0, -1)), F = (b = u.find(([C]) => l <= C)) == null ? void 0 : b[1];
    if (!F) throw new y(`Unable to find a registrant length for the group ${i}`);
    let o = t.slice(0, F), c = t.slice(F), h = [n, i, o, c];
    a === 10 && h.shift();
    let p = h.join(""), f = 0;
    for (let C = 0; C < a - 1; C++) {
      let T = a === 10 ? C + 1 : C % 2 ? 3 : 1;
      f += T * Number.parseInt(p[C]);
    }
    return f = a === 10 ? f % 11 : (10 - f % 10) % 10, h.push(f === 10 ? "X" : f.toString()), h.join(r);
  }
}, zt = class extends B {
  name() {
    return this.faker.helpers.fake(this.faker.definitions.company.name_pattern);
  }
  catchPhrase() {
    return [this.catchPhraseAdjective(), this.catchPhraseDescriptor(), this.catchPhraseNoun()].join(" ");
  }
  buzzPhrase() {
    return [this.buzzVerb(), this.buzzAdjective(), this.buzzNoun()].join(" ");
  }
  catchPhraseAdjective() {
    return this.faker.helpers.arrayElement(this.faker.definitions.company.adjective);
  }
  catchPhraseDescriptor() {
    return this.faker.helpers.arrayElement(this.faker.definitions.company.descriptor);
  }
  catchPhraseNoun() {
    return this.faker.helpers.arrayElement(this.faker.definitions.company.noun);
  }
  buzzAdjective() {
    return this.faker.helpers.arrayElement(this.faker.definitions.company.buzz_adjective);
  }
  buzzVerb() {
    return this.faker.helpers.arrayElement(this.faker.definitions.company.buzz_verb);
  }
  buzzNoun() {
    return this.faker.helpers.arrayElement(this.faker.definitions.company.buzz_noun);
  }
}, Vt = class extends B {
  column() {
    return this.faker.helpers.arrayElement(this.faker.definitions.database.column);
  }
  type() {
    return this.faker.helpers.arrayElement(this.faker.definitions.database.type);
  }
  collation() {
    return this.faker.helpers.arrayElement(this.faker.definitions.database.collation);
  }
  engine() {
    return this.faker.helpers.arrayElement(this.faker.definitions.database.engine);
  }
  mongodbObjectId() {
    return this.faker.string.hexadecimal({ length: 24, casing: "lower", prefix: "" });
  }
}, jt = { alpha: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], formats: [{ country: "AL", total: 28, bban: [{ type: "n", count: 8 }, { type: "c", count: 16 }], format: "ALkk bbbs sssx cccc cccc cccc cccc" }, { country: "AD", total: 24, bban: [{ type: "n", count: 8 }, { type: "c", count: 12 }], format: "ADkk bbbb ssss cccc cccc cccc" }, { country: "AT", total: 20, bban: [{ type: "n", count: 5 }, { type: "n", count: 11 }], format: "ATkk bbbb bccc cccc cccc" }, { country: "AZ", total: 28, bban: [{ type: "a", count: 4 }, { type: "n", count: 20 }], format: "AZkk bbbb cccc cccc cccc cccc cccc" }, { country: "BH", total: 22, bban: [{ type: "a", count: 4 }, { type: "c", count: 14 }], format: "BHkk bbbb cccc cccc cccc cc" }, { country: "BE", total: 16, bban: [{ type: "n", count: 3 }, { type: "n", count: 9 }], format: "BEkk bbbc cccc ccxx" }, { country: "BA", total: 20, bban: [{ type: "n", count: 6 }, { type: "n", count: 10 }], format: "BAkk bbbs sscc cccc ccxx" }, { country: "BR", total: 29, bban: [{ type: "n", count: 13 }, { type: "n", count: 10 }, { type: "a", count: 1 }, { type: "c", count: 1 }], format: "BRkk bbbb bbbb ssss sccc cccc ccct n" }, { country: "BG", total: 22, bban: [{ type: "a", count: 4 }, { type: "n", count: 6 }, { type: "c", count: 8 }], format: "BGkk bbbb ssss ddcc cccc cc" }, { country: "CR", total: 22, bban: [{ type: "n", count: 1 }, { type: "n", count: 3 }, { type: "n", count: 14 }], format: "CRkk xbbb cccc cccc cccc cc" }, { country: "HR", total: 21, bban: [{ type: "n", count: 7 }, { type: "n", count: 10 }], format: "HRkk bbbb bbbc cccc cccc c" }, { country: "CY", total: 28, bban: [{ type: "n", count: 8 }, { type: "c", count: 16 }], format: "CYkk bbbs ssss cccc cccc cccc cccc" }, { country: "CZ", total: 24, bban: [{ type: "n", count: 10 }, { type: "n", count: 10 }], format: "CZkk bbbb ssss sscc cccc cccc" }, { country: "DK", total: 18, bban: [{ type: "n", count: 4 }, { type: "n", count: 10 }], format: "DKkk bbbb cccc cccc cc" }, { country: "DO", total: 28, bban: [{ type: "a", count: 4 }, { type: "n", count: 20 }], format: "DOkk bbbb cccc cccc cccc cccc cccc" }, { country: "TL", total: 23, bban: [{ type: "n", count: 3 }, { type: "n", count: 16 }], format: "TLkk bbbc cccc cccc cccc cxx" }, { country: "EE", total: 20, bban: [{ type: "n", count: 4 }, { type: "n", count: 12 }], format: "EEkk bbss cccc cccc cccx" }, { country: "FO", total: 18, bban: [{ type: "n", count: 4 }, { type: "n", count: 10 }], format: "FOkk bbbb cccc cccc cx" }, { country: "FI", total: 18, bban: [{ type: "n", count: 6 }, { type: "n", count: 8 }], format: "FIkk bbbb bbcc cccc cx" }, { country: "FR", total: 27, bban: [{ type: "n", count: 10 }, { type: "c", count: 11 }, { type: "n", count: 2 }], format: "FRkk bbbb bggg ggcc cccc cccc cxx" }, { country: "GE", total: 22, bban: [{ type: "a", count: 2 }, { type: "n", count: 16 }], format: "GEkk bbcc cccc cccc cccc cc" }, { country: "DE", total: 22, bban: [{ type: "n", count: 8 }, { type: "n", count: 10 }], format: "DEkk bbbb bbbb cccc cccc cc" }, { country: "GI", total: 23, bban: [{ type: "a", count: 4 }, { type: "c", count: 15 }], format: "GIkk bbbb cccc cccc cccc ccc" }, { country: "GR", total: 27, bban: [{ type: "n", count: 7 }, { type: "c", count: 16 }], format: "GRkk bbbs sssc cccc cccc cccc ccc" }, { country: "GL", total: 18, bban: [{ type: "n", count: 4 }, { type: "n", count: 10 }], format: "GLkk bbbb cccc cccc cc" }, { country: "GT", total: 28, bban: [{ type: "c", count: 4 }, { type: "c", count: 4 }, { type: "c", count: 16 }], format: "GTkk bbbb mmtt cccc cccc cccc cccc" }, { country: "HU", total: 28, bban: [{ type: "n", count: 8 }, { type: "n", count: 16 }], format: "HUkk bbbs sssk cccc cccc cccc cccx" }, { country: "IS", total: 26, bban: [{ type: "n", count: 6 }, { type: "n", count: 16 }], format: "ISkk bbbb sscc cccc iiii iiii ii" }, { country: "IE", total: 22, bban: [{ type: "c", count: 4 }, { type: "n", count: 6 }, { type: "n", count: 8 }], format: "IEkk aaaa bbbb bbcc cccc cc" }, { country: "IL", total: 23, bban: [{ type: "n", count: 6 }, { type: "n", count: 13 }], format: "ILkk bbbn nncc cccc cccc ccc" }, { country: "IT", total: 27, bban: [{ type: "a", count: 1 }, { type: "n", count: 10 }, { type: "c", count: 12 }], format: "ITkk xaaa aabb bbbc cccc cccc ccc" }, { country: "JO", total: 30, bban: [{ type: "a", count: 4 }, { type: "n", count: 4 }, { type: "n", count: 18 }], format: "JOkk bbbb nnnn cccc cccc cccc cccc cc" }, { country: "KZ", total: 20, bban: [{ type: "n", count: 3 }, { type: "c", count: 13 }], format: "KZkk bbbc cccc cccc cccc" }, { country: "XK", total: 20, bban: [{ type: "n", count: 4 }, { type: "n", count: 12 }], format: "XKkk bbbb cccc cccc cccc" }, { country: "KW", total: 30, bban: [{ type: "a", count: 4 }, { type: "c", count: 22 }], format: "KWkk bbbb cccc cccc cccc cccc cccc cc" }, { country: "LV", total: 21, bban: [{ type: "a", count: 4 }, { type: "c", count: 13 }], format: "LVkk bbbb cccc cccc cccc c" }, { country: "LB", total: 28, bban: [{ type: "n", count: 4 }, { type: "c", count: 20 }], format: "LBkk bbbb cccc cccc cccc cccc cccc" }, { country: "LI", total: 21, bban: [{ type: "n", count: 5 }, { type: "c", count: 12 }], format: "LIkk bbbb bccc cccc cccc c" }, { country: "LT", total: 20, bban: [{ type: "n", count: 5 }, { type: "n", count: 11 }], format: "LTkk bbbb bccc cccc cccc" }, { country: "LU", total: 20, bban: [{ type: "n", count: 3 }, { type: "c", count: 13 }], format: "LUkk bbbc cccc cccc cccc" }, { country: "MK", total: 19, bban: [{ type: "n", count: 3 }, { type: "c", count: 10 }, { type: "n", count: 2 }], format: "MKkk bbbc cccc cccc cxx" }, { country: "MT", total: 31, bban: [{ type: "a", count: 4 }, { type: "n", count: 5 }, { type: "c", count: 18 }], format: "MTkk bbbb ssss sccc cccc cccc cccc ccc" }, { country: "MR", total: 27, bban: [{ type: "n", count: 10 }, { type: "n", count: 13 }], format: "MRkk bbbb bsss sscc cccc cccc cxx" }, { country: "MU", total: 30, bban: [{ type: "a", count: 4 }, { type: "n", count: 4 }, { type: "n", count: 15 }, { type: "a", count: 3 }], format: "MUkk bbbb bbss cccc cccc cccc 000d dd" }, { country: "MC", total: 27, bban: [{ type: "n", count: 10 }, { type: "c", count: 11 }, { type: "n", count: 2 }], format: "MCkk bbbb bsss sscc cccc cccc cxx" }, { country: "MD", total: 24, bban: [{ type: "c", count: 2 }, { type: "c", count: 18 }], format: "MDkk bbcc cccc cccc cccc cccc" }, { country: "ME", total: 22, bban: [{ type: "n", count: 3 }, { type: "n", count: 15 }], format: "MEkk bbbc cccc cccc cccc xx" }, { country: "NL", total: 18, bban: [{ type: "a", count: 4 }, { type: "n", count: 10 }], format: "NLkk bbbb cccc cccc cc" }, { country: "NO", total: 15, bban: [{ type: "n", count: 4 }, { type: "n", count: 7 }], format: "NOkk bbbb cccc ccx" }, { country: "PK", total: 24, bban: [{ type: "a", count: 4 }, { type: "n", count: 16 }], format: "PKkk bbbb cccc cccc cccc cccc" }, { country: "PS", total: 29, bban: [{ type: "c", count: 4 }, { type: "n", count: 9 }, { type: "n", count: 12 }], format: "PSkk bbbb xxxx xxxx xccc cccc cccc c" }, { country: "PL", total: 28, bban: [{ type: "n", count: 8 }, { type: "n", count: 16 }], format: "PLkk bbbs sssx cccc cccc cccc cccc" }, { country: "PT", total: 25, bban: [{ type: "n", count: 8 }, { type: "n", count: 13 }], format: "PTkk bbbb ssss cccc cccc cccx x" }, { country: "QA", total: 29, bban: [{ type: "a", count: 4 }, { type: "c", count: 21 }], format: "QAkk bbbb cccc cccc cccc cccc cccc c" }, { country: "RO", total: 24, bban: [{ type: "a", count: 4 }, { type: "c", count: 16 }], format: "ROkk bbbb cccc cccc cccc cccc" }, { country: "SM", total: 27, bban: [{ type: "a", count: 1 }, { type: "n", count: 10 }, { type: "c", count: 12 }], format: "SMkk xaaa aabb bbbc cccc cccc ccc" }, { country: "SA", total: 24, bban: [{ type: "n", count: 2 }, { type: "c", count: 18 }], format: "SAkk bbcc cccc cccc cccc cccc" }, { country: "RS", total: 22, bban: [{ type: "n", count: 3 }, { type: "n", count: 15 }], format: "RSkk bbbc cccc cccc cccc xx" }, { country: "SK", total: 24, bban: [{ type: "n", count: 10 }, { type: "n", count: 10 }], format: "SKkk bbbb ssss sscc cccc cccc" }, { country: "SI", total: 19, bban: [{ type: "n", count: 5 }, { type: "n", count: 10 }], format: "SIkk bbss sccc cccc cxx" }, { country: "ES", total: 24, bban: [{ type: "n", count: 10 }, { type: "n", count: 10 }], format: "ESkk bbbb gggg xxcc cccc cccc" }, { country: "SE", total: 24, bban: [{ type: "n", count: 3 }, { type: "n", count: 17 }], format: "SEkk bbbc cccc cccc cccc cccc" }, { country: "CH", total: 21, bban: [{ type: "n", count: 5 }, { type: "c", count: 12 }], format: "CHkk bbbb bccc cccc cccc c" }, { country: "TN", total: 24, bban: [{ type: "n", count: 5 }, { type: "n", count: 15 }], format: "TNkk bbss sccc cccc cccc cccc" }, { country: "TR", total: 26, bban: [{ type: "n", count: 5 }, { type: "n", count: 1 }, { type: "n", count: 16 }], format: "TRkk bbbb bxcc cccc cccc cccc cc" }, { country: "AE", total: 23, bban: [{ type: "n", count: 3 }, { type: "n", count: 16 }], format: "AEkk bbbc cccc cccc cccc ccc" }, { country: "GB", total: 22, bban: [{ type: "a", count: 4 }, { type: "n", count: 6 }, { type: "n", count: 8 }], format: "GBkk bbbb ssss sscc cccc cc" }, { country: "VG", total: 24, bban: [{ type: "a", count: 4 }, { type: "n", count: 16 }], format: "VGkk bbbb cccc cccc cccc cccc" }], iso3166: ["AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CC", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CW", "CX", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SY", "SZ", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UM", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS", "XK", "YE", "YT", "ZA", "ZM", "ZW"], mod97: (e) => {
  let a = 0;
  for (let r of e) a = (a * 10 + +r) % 97;
  return a;
}, pattern10: ["01", "02", "03", "04", "05", "06", "07", "08", "09"], pattern100: ["001", "002", "003", "004", "005", "006", "007", "008", "009"], toDigitString: (e) => e.replaceAll(/[A-Z]/gi, (a) => String((a.toUpperCase().codePointAt(0) ?? Number.NaN) - 55)) }, J = jt;
function Yt(e) {
  let a = "";
  for (let r = 0; r < e.length; r += 4) a += `${e.substring(r, r + 4)} `;
  return a.trimEnd();
}
var $t = class extends B {
  accountNumber(e = {}) {
    typeof e == "number" && (e = { length: e });
    let { length: a = 8 } = e;
    return this.faker.string.numeric({ length: a, allowLeadingZeros: !0 });
  }
  accountName() {
    return [this.faker.helpers.arrayElement(this.faker.definitions.finance.account_type), "Account"].join(" ");
  }
  routingNumber() {
    let e = this.faker.string.numeric({ length: 8, allowLeadingZeros: !0 }), a = 0;
    for (let r = 0; r < e.length; r += 3) a += Number(e[r]) * 3, a += Number(e[r + 1]) * 7, a += Number(e[r + 2]) || 0;
    return `${e}${Math.ceil(a / 10) * 10 - a}`;
  }
  maskedNumber(e = {}) {
    typeof e == "number" && (e = { length: e });
    let { ellipsis: a = !0, length: r = 4, parens: n = !0 } = e, i = this.faker.string.numeric({ length: r });
    return a && (i = `...${i}`), n && (i = `(${i})`), i;
  }
  amount(e = {}) {
    let { autoFormat: a = !1, dec: r = 2, max: n = 1e3, min: i = 0, symbol: u = "" } = e, t = this.faker.number.float({ max: n, min: i, fractionDigits: r }), l = a ? t.toLocaleString(void 0, { minimumFractionDigits: r }) : t.toFixed(r);
    return u + l;
  }
  transactionType() {
    return this.faker.helpers.arrayElement(this.faker.definitions.finance.transaction_type);
  }
  currency() {
    return this.faker.helpers.arrayElement(this.faker.definitions.finance.currency);
  }
  currencyCode() {
    return this.currency().code;
  }
  currencyName() {
    return this.currency().name;
  }
  currencySymbol() {
    let e;
    do
      e = this.currency().symbol;
    while (e.length === 0);
    return e;
  }
  bitcoinAddress(e = {}) {
    let { type: a = this.faker.helpers.enumValue(za), network: r = "mainnet" } = e, n = ot[a], i = n.prefix[r], u = this.faker.number.int(n.length), t = this.faker.string.alphanumeric({ length: u - i.length, casing: n.casing, exclude: n.exclude });
    return i + t;
  }
  litecoinAddress() {
    let e = this.faker.number.int({ min: 26, max: 33 });
    return this.faker.string.fromCharacters("LM3") + this.faker.string.fromCharacters("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ", e - 1);
  }
  creditCardNumber(e = {}) {
    typeof e == "string" && (e = { issuer: e });
    let { issuer: a = "" } = e, r, n = this.faker.definitions.finance.credit_card, i = a.toLowerCase();
    if (i in n) r = this.faker.helpers.arrayElement(n[i]);
    else if (a.includes("#")) r = a;
    else {
      let u = this.faker.helpers.objectValue(n);
      r = this.faker.helpers.arrayElement(u);
    }
    return r = r.replaceAll("/", ""), this.faker.helpers.replaceCreditCardSymbols(r);
  }
  creditCardCVV() {
    return this.faker.string.numeric({ length: 3, allowLeadingZeros: !0 });
  }
  creditCardIssuer() {
    return this.faker.helpers.objectKey(this.faker.definitions.finance.credit_card);
  }
  pin(e = {}) {
    typeof e == "number" && (e = { length: e });
    let { length: a = 4 } = e;
    if (a < 1) throw new y("minimum length is 1");
    return this.faker.string.numeric({ length: a, allowLeadingZeros: !0 });
  }
  ethereumAddress() {
    return this.faker.string.hexadecimal({ length: 40, casing: "lower" });
  }
  iban(e = {}) {
    let { countryCode: a, formatted: r = !1 } = e, n = a ? J.formats.find((F) => F.country === a) : this.faker.helpers.arrayElement(J.formats);
    if (!n) throw new y(`Country code ${a} not supported.`);
    let i = "", u = 0;
    for (let F of n.bban) {
      let o = F.count;
      for (u += F.count; o > 0; ) F.type === "a" ? i += this.faker.helpers.arrayElement(J.alpha) : F.type === "c" ? this.faker.datatype.boolean(0.8) ? i += this.faker.number.int(9) : i += this.faker.helpers.arrayElement(J.alpha) : o >= 3 && this.faker.datatype.boolean(0.3) ? this.faker.datatype.boolean() ? (i += this.faker.helpers.arrayElement(J.pattern100), o -= 2) : (i += this.faker.helpers.arrayElement(J.pattern10), o--) : i += this.faker.number.int(9), o--;
      i = i.substring(0, u);
    }
    let t = 98 - J.mod97(J.toDigitString(`${i}${n.country}00`));
    t < 10 && (t = `0${t}`);
    let l = `${n.country}${t}${i}`;
    return r ? Yt(l) : l;
  }
  bic(e = {}) {
    let { includeBranchCode: a = this.faker.datatype.boolean() } = e, r = this.faker.string.alpha({ length: 4, casing: "upper" }), n = this.faker.helpers.arrayElement(J.iso3166), i = this.faker.string.alphanumeric({ length: 2, casing: "upper" }), u = a ? this.faker.datatype.boolean() ? this.faker.string.alphanumeric({ length: 3, casing: "upper" }) : "XXX" : "";
    return `${r}${n}${i}${u}`;
  }
  transactionDescription() {
    let e = this.amount(), a = this.faker.company.name(), r = this.transactionType(), n = this.accountNumber(), i = this.maskedNumber(), u = this.currencyCode();
    return `${r} transaction at ${a} using card ending with ***${i} for ${u} ${e} in account ***${n}`;
  }
}, Ut = class extends B {
  adjective() {
    return this.faker.helpers.arrayElement(this.faker.definitions.food.adjective);
  }
  description() {
    return this.faker.helpers.fake(this.faker.definitions.food.description_pattern);
  }
  dish() {
    let e = (a) => a.split(" ").map((r) => r.charAt(0).toUpperCase() + r.slice(1)).join(" ");
    return this.faker.datatype.boolean() ? e(this.faker.helpers.fake(this.faker.definitions.food.dish_pattern)) : e(this.faker.helpers.arrayElement(this.faker.definitions.food.dish));
  }
  ethnicCategory() {
    return this.faker.helpers.arrayElement(this.faker.definitions.food.ethnic_category);
  }
  fruit() {
    return this.faker.helpers.arrayElement(this.faker.definitions.food.fruit);
  }
  ingredient() {
    return this.faker.helpers.arrayElement(this.faker.definitions.food.ingredient);
  }
  meat() {
    return this.faker.helpers.arrayElement(this.faker.definitions.food.meat);
  }
  spice() {
    return this.faker.helpers.arrayElement(this.faker.definitions.food.spice);
  }
  vegetable() {
    return this.faker.helpers.arrayElement(this.faker.definitions.food.vegetable);
  }
}, _t = " ", qt = class extends B {
  branch() {
    let e = this.faker.hacker.noun().replace(" ", "-"), a = this.faker.hacker.verb().replace(" ", "-");
    return `${e}-${a}`;
  }
  commitEntry(e = {}) {
    let { merge: a = this.faker.datatype.boolean({ probability: 0.2 }), eol: r = "CRLF", refDate: n } = e, i = [`commit ${this.faker.git.commitSha()}`];
    a && i.push(`Merge: ${this.commitSha({ length: 7 })} ${this.commitSha({ length: 7 })}`);
    let u = this.faker.person.firstName(), t = this.faker.person.lastName(), l = this.faker.person.fullName({ firstName: u, lastName: t }), F = this.faker.internet.username({ firstName: u, lastName: t }), o = this.faker.helpers.arrayElement([l, F]), c = this.faker.internet.email({ firstName: u, lastName: t });
    o = o.replaceAll(/^[.,:;"\\']|[<>\n]|[.,:;"\\']$/g, ""), i.push(`Author: ${o} <${c}>`, `Date: ${this.commitDate({ refDate: n })}`, "", `${_t.repeat(4)}${this.commitMessage()}`, "");
    let h = r === "CRLF" ? `\r
` : `
`;
    return i.join(h);
  }
  commitMessage() {
    return `${this.faker.hacker.verb()} ${this.faker.hacker.adjective()} ${this.faker.hacker.noun()}`;
  }
  commitDate(e = {}) {
    let { refDate: a = this.faker.defaultRefDate() } = e, r = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], n = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], i = this.faker.date.recent({ days: 1, refDate: a }), u = r[i.getUTCDay()], t = n[i.getUTCMonth()], l = i.getUTCDate(), F = i.getUTCHours().toString().padStart(2, "0"), o = i.getUTCMinutes().toString().padStart(2, "0"), c = i.getUTCSeconds().toString().padStart(2, "0"), h = i.getUTCFullYear(), p = this.faker.number.int({ min: -11, max: 12 }), f = Math.abs(p).toString().padStart(2, "0"), b = "00", C = p >= 0 ? "+" : "-";
    return `${u} ${t} ${l} ${F}:${o}:${c} ${h} ${C}${f}${b}`;
  }
  commitSha(e = {}) {
    let { length: a = 40 } = e;
    return this.faker.string.hexadecimal({ length: a, casing: "lower", prefix: "" });
  }
}, Zt = class extends B {
  abbreviation() {
    return this.faker.helpers.arrayElement(this.faker.definitions.hacker.abbreviation);
  }
  adjective() {
    return this.faker.helpers.arrayElement(this.faker.definitions.hacker.adjective);
  }
  noun() {
    return this.faker.helpers.arrayElement(this.faker.definitions.hacker.noun);
  }
  verb() {
    return this.faker.helpers.arrayElement(this.faker.definitions.hacker.verb);
  }
  ingverb() {
    return this.faker.helpers.arrayElement(this.faker.definitions.hacker.ingverb);
  }
  phrase() {
    let e = { abbreviation: this.abbreviation, adjective: this.adjective, ingverb: this.ingverb, noun: this.noun, verb: this.verb }, a = this.faker.helpers.arrayElement(this.faker.definitions.hacker.phrase);
    return this.faker.helpers.mustache(a, e);
  }
}, Xt = class extends B {
  avatar() {
    return this.avatarGitHub();
  }
  avatarGitHub() {
    return `https://avatars.githubusercontent.com/u/${this.faker.number.int(1e8)}`;
  }
  avatarLegacy() {
    return xe({ deprecated: "faker.image.avatarLegacy()", proposed: "faker.image.avatar()", since: "9.0.2", until: "10.0.0" }), `https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${this.faker.number.int(1249)}.jpg`;
  }
  url(e = {}) {
    let { width: a = this.faker.number.int({ min: 1, max: 3999 }), height: r = this.faker.number.int({ min: 1, max: 3999 }) } = e;
    return this.faker.helpers.arrayElement([this.urlLoremFlickr, ({ width: n, height: i }) => this.urlPicsumPhotos({ width: n, height: i, grayscale: !1, blur: 0 })])({ width: a, height: r });
  }
  urlLoremFlickr(e = {}) {
    let { width: a = this.faker.number.int({ min: 1, max: 3999 }), height: r = this.faker.number.int({ min: 1, max: 3999 }), category: n } = e;
    return `https://loremflickr.com/${a}/${r}${n == null ? "" : `/${n}`}?lock=${this.faker.number.int()}`;
  }
  urlPicsumPhotos(e = {}) {
    let { width: a = this.faker.number.int({ min: 1, max: 3999 }), height: r = this.faker.number.int({ min: 1, max: 3999 }), grayscale: n = this.faker.datatype.boolean(), blur: i = this.faker.number.int({ max: 10 }) } = e, u = `https://picsum.photos/seed/${this.faker.string.alphanumeric({ length: { min: 5, max: 10 } })}/${a}/${r}`, t = typeof i == "number" && i >= 1 && i <= 10;
    return (n || t) && (u += "?", n && (u += "grayscale"), n && t && (u += "&"), t && (u += `blur=${i}`)), u;
  }
  urlPlaceholder(e = {}) {
    let { width: a = this.faker.number.int({ min: 1, max: 3999 }), height: r = this.faker.number.int({ min: 1, max: 3999 }), backgroundColor: n = this.faker.color.rgb({ format: "hex", prefix: "" }), textColor: i = this.faker.color.rgb({ format: "hex", prefix: "" }), format: u = this.faker.helpers.arrayElement(["gif", "jpeg", "jpg", "png", "webp"]), text: t = this.faker.lorem.words() } = e, l = "https://via.placeholder.com";
    return l += `/${a}`, l += `x${r}`, l += `/${n}`, l += `/${i}`, l += `.${u}`, l += `?text=${encodeURIComponent(t)}`, l;
  }
  dataUri(e = {}) {
    let { width: a = this.faker.number.int({ min: 1, max: 3999 }), height: r = this.faker.number.int({ min: 1, max: 3999 }), color: n = this.faker.color.rgb(), type: i = this.faker.helpers.arrayElements(["svg-uri", "svg-base64"]) } = e, u = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width="${a}" height="${r}"><rect width="100%" height="100%" fill="${n}"/><text x="${a / 2}" y="${r / 2}" font-size="20" alignment-baseline="middle" text-anchor="middle" fill="white">${a}x${r}</text></svg>`;
    return i === "svg-uri" ? `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(u)}` : `data:image/svg+xml;base64,${Va(u)}`;
  }
}, Qt = class extends B {
  zipCode(e = {}) {
    typeof e == "string" && (e = { format: e });
    let { state: a } = e;
    if (a != null) {
      let n = this.faker.definitions.location.postcode_by_state[a];
      if (n == null) throw new y(`No zip code definition found for state "${a}"`);
      return this.faker.helpers.fake(n);
    }
    let { format: r = this.faker.definitions.location.postcode } = e;
    return typeof r == "string" && (r = [r]), r = this.faker.helpers.arrayElement(r), this.faker.helpers.replaceSymbols(r);
  }
  city() {
    return this.faker.helpers.fake(this.faker.definitions.location.city_pattern);
  }
  buildingNumber() {
    return this.faker.helpers.arrayElement(this.faker.definitions.location.building_number).replaceAll(/#+/g, (e) => this.faker.string.numeric({ length: e.length, allowLeadingZeros: !1 }));
  }
  street() {
    return this.faker.helpers.fake(this.faker.definitions.location.street_pattern);
  }
  streetAddress(e = {}) {
    typeof e == "boolean" && (e = { useFullAddress: e });
    let { useFullAddress: a } = e, r = this.faker.definitions.location.street_address[a ? "full" : "normal"];
    return this.faker.helpers.fake(r);
  }
  secondaryAddress() {
    return this.faker.helpers.fake(this.faker.definitions.location.secondary_address).replaceAll(/#+/g, (e) => this.faker.string.numeric({ length: e.length, allowLeadingZeros: !1 }));
  }
  county() {
    return this.faker.helpers.arrayElement(this.faker.definitions.location.county);
  }
  country() {
    return this.faker.helpers.arrayElement(this.faker.definitions.location.country);
  }
  continent() {
    return this.faker.helpers.arrayElement(this.faker.definitions.location.continent);
  }
  countryCode(e = {}) {
    typeof e == "string" && (e = { variant: e });
    let { variant: a = "alpha-2" } = e, r = (() => {
      switch (a) {
        case "numeric":
          return "numeric";
        case "alpha-3":
          return "alpha3";
        case "alpha-2":
          return "alpha2";
      }
    })();
    return this.faker.helpers.arrayElement(this.faker.definitions.location.country_code)[r];
  }
  state(e = {}) {
    let { abbreviated: a = !1 } = e, r = a ? this.faker.definitions.location.state_abbr : this.faker.definitions.location.state;
    return this.faker.helpers.arrayElement(r);
  }
  latitude(e = {}) {
    let { max: a = 90, min: r = -90, precision: n = 4 } = e;
    return this.faker.number.float({ min: r, max: a, fractionDigits: n });
  }
  longitude(e = {}) {
    let { max: a = 180, min: r = -180, precision: n = 4 } = e;
    return this.faker.number.float({ max: a, min: r, fractionDigits: n });
  }
  direction(e = {}) {
    let { abbreviated: a = !1 } = e;
    return a ? this.faker.helpers.arrayElement([...this.faker.definitions.location.direction.cardinal_abbr, ...this.faker.definitions.location.direction.ordinal_abbr]) : this.faker.helpers.arrayElement([...this.faker.definitions.location.direction.cardinal, ...this.faker.definitions.location.direction.ordinal]);
  }
  cardinalDirection(e = {}) {
    let { abbreviated: a = !1 } = e;
    return a ? this.faker.helpers.arrayElement(this.faker.definitions.location.direction.cardinal_abbr) : this.faker.helpers.arrayElement(this.faker.definitions.location.direction.cardinal);
  }
  ordinalDirection(e = {}) {
    let { abbreviated: a = !1 } = e;
    return a ? this.faker.helpers.arrayElement(this.faker.definitions.location.direction.ordinal_abbr) : this.faker.helpers.arrayElement(this.faker.definitions.location.direction.ordinal);
  }
  nearbyGPSCoordinate(e = {}) {
    let { origin: a, radius: r = 10, isMetric: n = !1 } = e;
    if (a == null) return [this.latitude(), this.longitude()];
    let i = this.faker.number.float({ max: 2 * Math.PI, fractionDigits: 5 }), u = n ? r : r * 1.60934, t = this.faker.number.float({ max: u, fractionDigits: 3 }) * 0.995, l = 4e4 / 360, F = t / l, o = [a[0] + Math.sin(i) * F, a[1] + Math.cos(i) * F];
    return o[0] = o[0] % 180, (o[0] < -90 || o[0] > 90) && (o[0] = Math.sign(o[0]) * 180 - o[0], o[1] += 180), o[1] = (o[1] % 360 + 540) % 360 - 180, [o[0], o[1]];
  }
  timeZone() {
    return this.faker.helpers.arrayElement(this.faker.definitions.location.time_zone);
  }
};
function eo(e, a, r = (n) => n) {
  let n = {};
  for (let i of e) {
    let u = a(i);
    n[u] === void 0 && (n[u] = []), n[u].push(r(i));
  }
  return n;
}
var $e = { fail: () => {
  throw new y("No words found that match the given length.");
}, closest: (e, a) => {
  let r = eo(e, (l) => l.length), n = Object.keys(r).map(Number), i = Math.min(...n), u = Math.max(...n), t = Math.min(a.min - i, u - a.max);
  return e.filter((l) => l.length === a.min - t || l.length === a.max + t);
}, shortest: (e) => {
  let a = Math.min(...e.map((r) => r.length));
  return e.filter((r) => r.length === a);
}, longest: (e) => {
  let a = Math.max(...e.map((r) => r.length));
  return e.filter((r) => r.length === a);
}, "any-length": (e) => [...e] };
function Z(e) {
  let { wordList: a, length: r, strategy: n = "any-length" } = e;
  if (r) {
    let i = typeof r == "number" ? (t) => t.length === r : (t) => t.length >= r.min && t.length <= r.max, u = a.filter(i);
    return u.length > 0 ? u : typeof r == "number" ? $e[n](a, { min: r, max: r }) : $e[n](a, r);
  } else if (n === "shortest" || n === "longest") return $e[n](a);
  return [...a];
}
var ao = class extends B {
  word(e = {}) {
    let a = typeof e == "number" ? { length: e } : e;
    return this.faker.helpers.arrayElement(Z({ ...a, wordList: this.faker.definitions.lorem.word }));
  }
  words(e = 3) {
    return this.faker.helpers.multiple(() => this.word(), { count: e }).join(" ");
  }
  sentence(e = { min: 3, max: 10 }) {
    let a = this.words(e);
    return `${a.charAt(0).toUpperCase() + a.substring(1)}.`;
  }
  slug(e = 3) {
    let a = this.words(e);
    return this.faker.helpers.slugify(a);
  }
  sentences(e = { min: 2, max: 6 }, a = " ") {
    return this.faker.helpers.multiple(() => this.sentence(), { count: e }).join(a);
  }
  paragraph(e = 3) {
    return this.sentences(e);
  }
  paragraphs(e = 3, a = `
`) {
    return this.faker.helpers.multiple(() => this.paragraph(), { count: e }).join(a);
  }
  text() {
    let e = ["sentence", "sentences", "paragraph", "paragraphs", "lines"], a = this.faker.helpers.arrayElement(e);
    return this[a]();
  }
  lines(e = { min: 1, max: 5 }) {
    return this.sentences(e, `
`);
  }
}, ro = class extends B {
  album() {
    return this.faker.helpers.arrayElement(this.faker.definitions.music.album);
  }
  artist() {
    return this.faker.helpers.arrayElement(this.faker.definitions.music.artist);
  }
  genre() {
    return this.faker.helpers.arrayElement(this.faker.definitions.music.genre);
  }
  songName() {
    return this.faker.helpers.arrayElement(this.faker.definitions.music.song_name);
  }
}, no = class extends B {
  number(e = {}) {
    let { style: a = "human" } = e, r = this.faker.definitions.phone_number.format[a];
    if (!r) throw new Error(`No definitions for ${a} in this locale`);
    let n = this.faker.helpers.arrayElement(r);
    return $a(this.faker, n);
  }
  imei() {
    return this.faker.helpers.replaceCreditCardSymbols("##-######-######-L", "#");
  }
}, io = class extends B {
  chemicalElement() {
    return this.faker.helpers.arrayElement(this.faker.definitions.science.chemical_element);
  }
  unit() {
    return this.faker.helpers.arrayElement(this.faker.definitions.science.unit);
  }
}, uo = ["video", "audio", "image", "text", "application"], to = ["application/pdf", "audio/mpeg", "audio/wav", "image/png", "image/jpeg", "image/gif", "video/mp4", "video/mpeg", "text/html"], oo = ["en", "wl", "ww"], sa = { index: "o", slot: "s", mac: "x", pci: "p" }, lo = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], so = class extends B {
  fileName(e = {}) {
    let { extensionCount: a = 1 } = e, r = this.faker.word.words().toLowerCase().replaceAll(/\W/g, "_"), n = this.faker.helpers.multiple(() => this.fileExt(), { count: a }).join(".");
    return n.length === 0 ? r : `${r}.${n}`;
  }
  commonFileName(e) {
    return `${this.fileName({ extensionCount: 0 })}.${e || this.commonFileExt()}`;
  }
  mimeType() {
    let e = Object.keys(this.faker.definitions.system.mime_type);
    return this.faker.helpers.arrayElement(e);
  }
  commonFileType() {
    return this.faker.helpers.arrayElement(uo);
  }
  commonFileExt() {
    return this.fileExt(this.faker.helpers.arrayElement(to));
  }
  fileType() {
    let e = this.faker.definitions.system.mime_type, a = new Set(Object.keys(e).map((r) => r.split("/")[0]));
    return this.faker.helpers.arrayElement([...a]);
  }
  fileExt(e) {
    let a = this.faker.definitions.system.mime_type;
    if (typeof e == "string") return this.faker.helpers.arrayElement(a[e].extensions);
    let r = new Set(Object.values(a).flatMap(({ extensions: n }) => n));
    return this.faker.helpers.arrayElement([...r]);
  }
  directoryPath() {
    let e = this.faker.definitions.system.directory_path;
    return this.faker.helpers.arrayElement(e);
  }
  filePath() {
    return `${this.directoryPath()}/${this.fileName()}`;
  }
  semver() {
    return [this.faker.number.int(9), this.faker.number.int(9), this.faker.number.int(9)].join(".");
  }
  networkInterface(e = {}) {
    let { interfaceType: a = this.faker.helpers.arrayElement(oo), interfaceSchema: r = this.faker.helpers.objectKey(sa) } = e, n, i = "", u = () => this.faker.string.numeric({ allowLeadingZeros: !0 });
    switch (r) {
      case "index": {
        n = u();
        break;
      }
      case "slot": {
        n = `${u()}${this.faker.helpers.maybe(() => `f${u()}`) ?? ""}${this.faker.helpers.maybe(() => `d${u()}`) ?? ""}`;
        break;
      }
      case "mac": {
        n = this.faker.internet.mac("");
        break;
      }
      case "pci": {
        i = this.faker.helpers.maybe(() => `P${u()}`) ?? "", n = `${u()}s${u()}${this.faker.helpers.maybe(() => `f${u()}`) ?? ""}${this.faker.helpers.maybe(() => `d${u()}`) ?? ""}`;
        break;
      }
    }
    return `${i}${a}${sa[r]}${n}`;
  }
  cron(e = {}) {
    let { includeYear: a = !1, includeNonStandard: r = !1 } = e, n = [this.faker.number.int(59), "*"], i = [this.faker.number.int(23), "*"], u = [this.faker.number.int({ min: 1, max: 31 }), "*", "?"], t = [this.faker.number.int({ min: 1, max: 12 }), "*"], l = [this.faker.number.int(6), this.faker.helpers.arrayElement(lo), "*", "?"], F = [this.faker.number.int({ min: 1970, max: 2099 }), "*"], o = this.faker.helpers.arrayElement(n), c = this.faker.helpers.arrayElement(i), h = this.faker.helpers.arrayElement(u), p = this.faker.helpers.arrayElement(t), f = this.faker.helpers.arrayElement(l), b = this.faker.helpers.arrayElement(F), C = `${o} ${c} ${h} ${p} ${f}`;
    a && (C += ` ${b}`);
    let T = ["@annually", "@daily", "@hourly", "@monthly", "@reboot", "@weekly", "@yearly"];
    return !r || this.faker.datatype.boolean() ? C : this.faker.helpers.arrayElement(T);
  }
}, Fo = class extends B {
  vehicle() {
    return `${this.manufacturer()} ${this.model()}`;
  }
  manufacturer() {
    return this.faker.helpers.arrayElement(this.faker.definitions.vehicle.manufacturer);
  }
  model() {
    return this.faker.helpers.arrayElement(this.faker.definitions.vehicle.model);
  }
  type() {
    return this.faker.helpers.arrayElement(this.faker.definitions.vehicle.type);
  }
  fuel() {
    return this.faker.helpers.arrayElement(this.faker.definitions.vehicle.fuel);
  }
  vin() {
    let e = ["o", "i", "q", "O", "I", "Q"];
    return `${this.faker.string.alphanumeric({ length: 10, casing: "upper", exclude: e })}${this.faker.string.alpha({ length: 1, casing: "upper", exclude: e })}${this.faker.string.alphanumeric({ length: 1, casing: "upper", exclude: e })}${this.faker.string.numeric({ length: 5, allowLeadingZeros: !0 })}`;
  }
  color() {
    return this.faker.color.human();
  }
  vrm() {
    return `${this.faker.string.alpha({ length: 2, casing: "upper" })}${this.faker.string.numeric({ length: 2, allowLeadingZeros: !0 })}${this.faker.string.alpha({ length: 3, casing: "upper" })}`;
  }
  bicycle() {
    return this.faker.helpers.arrayElement(this.faker.definitions.vehicle.bicycle_type);
  }
}, co = class extends B {
  adjective(e = {}) {
    let a = typeof e == "number" ? { length: e } : e;
    return this.faker.helpers.arrayElement(Z({ ...a, wordList: this.faker.definitions.word.adjective }));
  }
  adverb(e = {}) {
    let a = typeof e == "number" ? { length: e } : e;
    return this.faker.helpers.arrayElement(Z({ ...a, wordList: this.faker.definitions.word.adverb }));
  }
  conjunction(e = {}) {
    let a = typeof e == "number" ? { length: e } : e;
    return this.faker.helpers.arrayElement(Z({ ...a, wordList: this.faker.definitions.word.conjunction }));
  }
  interjection(e = {}) {
    let a = typeof e == "number" ? { length: e } : e;
    return this.faker.helpers.arrayElement(Z({ ...a, wordList: this.faker.definitions.word.interjection }));
  }
  noun(e = {}) {
    let a = typeof e == "number" ? { length: e } : e;
    return this.faker.helpers.arrayElement(Z({ ...a, wordList: this.faker.definitions.word.noun }));
  }
  preposition(e = {}) {
    let a = typeof e == "number" ? { length: e } : e;
    return this.faker.helpers.arrayElement(Z({ ...a, wordList: this.faker.definitions.word.preposition }));
  }
  verb(e = {}) {
    let a = typeof e == "number" ? { length: e } : e;
    return this.faker.helpers.arrayElement(Z({ ...a, wordList: this.faker.definitions.word.verb }));
  }
  sample(e = {}) {
    let a = this.faker.helpers.shuffle([this.adjective, this.adverb, this.conjunction, this.interjection, this.noun, this.preposition, this.verb]);
    for (let r of a) try {
      return r(e);
    } catch {
      continue;
    }
    throw new y("No matching word data available for the current locale");
  }
  words(e = {}) {
    typeof e == "number" && (e = { count: e });
    let { count: a = { min: 1, max: 3 } } = e;
    return this.faker.helpers.multiple(() => this.sample(), { count: a }).join(" ");
  }
}, ho = class extends qa {
  constructor(a) {
    super({ randomizer: a.randomizer });
    d(this, "rawDefinitions");
    d(this, "definitions");
    d(this, "airline", new rt(this));
    d(this, "animal", new It(this));
    d(this, "book", new Kt(this));
    d(this, "color", new ut(this));
    d(this, "commerce", new Jt(this));
    d(this, "company", new zt(this));
    d(this, "database", new Vt(this));
    d(this, "date", new At(this));
    d(this, "finance", new $t(this));
    d(this, "food", new Ut(this));
    d(this, "git", new qt(this));
    d(this, "hacker", new Zt(this));
    d(this, "helpers", new Ht(this));
    d(this, "image", new Xt(this));
    d(this, "internet", new Dt(this));
    d(this, "location", new Qt(this));
    d(this, "lorem", new ao(this));
    d(this, "music", new ro(this));
    d(this, "person", new gt(this));
    d(this, "phone", new no(this));
    d(this, "science", new io(this));
    d(this, "system", new so(this));
    d(this, "vehicle", new Fo(this));
    d(this, "word", new co(this));
    let { locale: r } = a;
    if (Array.isArray(r)) {
      if (r.length === 0) throw new y("The locale option must contain at least one locale definition.");
      r = xt(r);
    }
    this.rawDefinitions = r, this.definitions = Et(this.rawDefinitions);
  }
  get address() {
    return xe({ deprecated: "faker.address", proposed: "faker.location", since: "8.0", until: "10.0" }), this.location;
  }
  get name() {
    return xe({ deprecated: "faker.name", proposed: "faker.person", since: "8.0", until: "10.0" }), this.person;
  }
  getMetadata() {
    return this.rawDefinitions.metadata ?? {};
  }
}, mo = ["Academy Color Encoding System (ACES)", "Adobe RGB", "Adobe Wide Gamut RGB", "British Standard Colour (BS)", "CIE 1931 XYZ", "CIELAB", "CIELUV", "CIEUVW", "CMY", "CMYK", "DCI-P3", "Display-P3", "Federal Standard 595C", "HKS", "HSL", "HSLA", "HSLuv", "HSV", "HWB", "LCh", "LMS", "Munsell Color System", "Natural Color System (NSC)", "Pantone Matching System (PMS)", "ProPhoto RGB Color Space", "RAL", "RG", "RGBA", "RGK", "Rec. 2020", "Rec. 2100", "Rec. 601", "Rec. 709", "Uniform Color Spaces (UCSs)", "YDbDr", "YIQ", "YPbPr", "sRGB", "sYCC", "scRGB", "xvYCC"], po = { space: mo }, yo = po, Do = ["ascii_bin", "ascii_general_ci", "cp1250_bin", "cp1250_general_ci", "utf8_bin", "utf8_general_ci", "utf8_unicode_ci"], go = ["ARCHIVE", "BLACKHOLE", "CSV", "InnoDB", "MEMORY", "MyISAM"], bo = ["bigint", "binary", "bit", "blob", "boolean", "date", "datetime", "decimal", "double", "enum", "float", "geometry", "int", "mediumint", "point", "real", "serial", "set", "smallint", "text", "time", "timestamp", "tinyint", "varchar"], fo = { collation: Do, engine: go, type: bo }, Co = fo, Za = ["Africa/Abidjan", "Africa/Accra", "Africa/Addis_Ababa", "Africa/Algiers", "Africa/Asmara", "Africa/Bamako", "Africa/Bangui", "Africa/Banjul", "Africa/Bissau", "Africa/Blantyre", "Africa/Brazzaville", "Africa/Bujumbura", "Africa/Cairo", "Africa/Casablanca", "Africa/Ceuta", "Africa/Conakry", "Africa/Dakar", "Africa/Dar_es_Salaam", "Africa/Djibouti", "Africa/Douala", "Africa/El_Aaiun", "Africa/Freetown", "Africa/Gaborone", "Africa/Harare", "Africa/Johannesburg", "Africa/Juba", "Africa/Kampala", "Africa/Khartoum", "Africa/Kigali", "Africa/Kinshasa", "Africa/Lagos", "Africa/Libreville", "Africa/Lome", "Africa/Luanda", "Africa/Lubumbashi", "Africa/Lusaka", "Africa/Malabo", "Africa/Maputo", "Africa/Maseru", "Africa/Mbabane", "Africa/Mogadishu", "Africa/Monrovia", "Africa/Nairobi", "Africa/Ndjamena", "Africa/Niamey", "Africa/Nouakchott", "Africa/Ouagadougou", "Africa/Porto-Novo", "Africa/Sao_Tome", "Africa/Tripoli", "Africa/Tunis", "Africa/Windhoek", "America/Adak", "America/Anchorage", "America/Anguilla", "America/Antigua", "America/Araguaina", "America/Argentina/Buenos_Aires", "America/Argentina/Catamarca", "America/Argentina/Cordoba", "America/Argentina/Jujuy", "America/Argentina/La_Rioja", "America/Argentina/Mendoza", "America/Argentina/Rio_Gallegos", "America/Argentina/Salta", "America/Argentina/San_Juan", "America/Argentina/San_Luis", "America/Argentina/Tucuman", "America/Argentina/Ushuaia", "America/Aruba", "America/Asuncion", "America/Atikokan", "America/Bahia", "America/Bahia_Banderas", "America/Barbados", "America/Belem", "America/Belize", "America/Blanc-Sablon", "America/Boa_Vista", "America/Bogota", "America/Boise", "America/Cambridge_Bay", "America/Campo_Grande", "America/Cancun", "America/Caracas", "America/Cayenne", "America/Cayman", "America/Chicago", "America/Chihuahua", "America/Ciudad_Juarez", "America/Costa_Rica", "America/Creston", "America/Cuiaba", "America/Curacao", "America/Danmarkshavn", "America/Dawson", "America/Dawson_Creek", "America/Denver", "America/Detroit", "America/Dominica", "America/Edmonton", "America/Eirunepe", "America/El_Salvador", "America/Fort_Nelson", "America/Fortaleza", "America/Glace_Bay", "America/Goose_Bay", "America/Grand_Turk", "America/Grenada", "America/Guadeloupe", "America/Guatemala", "America/Guayaquil", "America/Guyana", "America/Halifax", "America/Havana", "America/Hermosillo", "America/Indiana/Indianapolis", "America/Indiana/Knox", "America/Indiana/Marengo", "America/Indiana/Petersburg", "America/Indiana/Tell_City", "America/Indiana/Vevay", "America/Indiana/Vincennes", "America/Indiana/Winamac", "America/Inuvik", "America/Iqaluit", "America/Jamaica", "America/Juneau", "America/Kentucky/Louisville", "America/Kentucky/Monticello", "America/Kralendijk", "America/La_Paz", "America/Lima", "America/Los_Angeles", "America/Lower_Princes", "America/Maceio", "America/Managua", "America/Manaus", "America/Marigot", "America/Martinique", "America/Matamoros", "America/Mazatlan", "America/Menominee", "America/Merida", "America/Metlakatla", "America/Mexico_City", "America/Miquelon", "America/Moncton", "America/Monterrey", "America/Montevideo", "America/Montserrat", "America/Nassau", "America/New_York", "America/Nome", "America/Noronha", "America/North_Dakota/Beulah", "America/North_Dakota/Center", "America/North_Dakota/New_Salem", "America/Nuuk", "America/Ojinaga", "America/Panama", "America/Paramaribo", "America/Phoenix", "America/Port-au-Prince", "America/Port_of_Spain", "America/Porto_Velho", "America/Puerto_Rico", "America/Punta_Arenas", "America/Rankin_Inlet", "America/Recife", "America/Regina", "America/Resolute", "America/Rio_Branco", "America/Santarem", "America/Santiago", "America/Santo_Domingo", "America/Sao_Paulo", "America/Scoresbysund", "America/Sitka", "America/St_Barthelemy", "America/St_Johns", "America/St_Kitts", "America/St_Lucia", "America/St_Thomas", "America/St_Vincent", "America/Swift_Current", "America/Tegucigalpa", "America/Thule", "America/Tijuana", "America/Toronto", "America/Tortola", "America/Vancouver", "America/Whitehorse", "America/Winnipeg", "America/Yakutat", "America/Yellowknife", "Antarctica/Casey", "Antarctica/Davis", "Antarctica/DumontDUrville", "Antarctica/Macquarie", "Antarctica/Mawson", "Antarctica/McMurdo", "Antarctica/Palmer", "Antarctica/Rothera", "Antarctica/Syowa", "Antarctica/Troll", "Antarctica/Vostok", "Arctic/Longyearbyen", "Asia/Aden", "Asia/Almaty", "Asia/Amman", "Asia/Anadyr", "Asia/Aqtau", "Asia/Aqtobe", "Asia/Ashgabat", "Asia/Atyrau", "Asia/Baghdad", "Asia/Bahrain", "Asia/Baku", "Asia/Bangkok", "Asia/Barnaul", "Asia/Beirut", "Asia/Bishkek", "Asia/Brunei", "Asia/Chita", "Asia/Choibalsan", "Asia/Colombo", "Asia/Damascus", "Asia/Dhaka", "Asia/Dili", "Asia/Dubai", "Asia/Dushanbe", "Asia/Famagusta", "Asia/Gaza", "Asia/Hebron", "Asia/Ho_Chi_Minh", "Asia/Hong_Kong", "Asia/Hovd", "Asia/Irkutsk", "Asia/Jakarta", "Asia/Jayapura", "Asia/Jerusalem", "Asia/Kabul", "Asia/Kamchatka", "Asia/Karachi", "Asia/Kathmandu", "Asia/Khandyga", "Asia/Kolkata", "Asia/Krasnoyarsk", "Asia/Kuala_Lumpur", "Asia/Kuching", "Asia/Kuwait", "Asia/Macau", "Asia/Magadan", "Asia/Makassar", "Asia/Manila", "Asia/Muscat", "Asia/Nicosia", "Asia/Novokuznetsk", "Asia/Novosibirsk", "Asia/Omsk", "Asia/Oral", "Asia/Phnom_Penh", "Asia/Pontianak", "Asia/Pyongyang", "Asia/Qatar", "Asia/Qostanay", "Asia/Qyzylorda", "Asia/Riyadh", "Asia/Sakhalin", "Asia/Samarkand", "Asia/Seoul", "Asia/Shanghai", "Asia/Singapore", "Asia/Srednekolymsk", "Asia/Taipei", "Asia/Tashkent", "Asia/Tbilisi", "Asia/Tehran", "Asia/Thimphu", "Asia/Tokyo", "Asia/Tomsk", "Asia/Ulaanbaatar", "Asia/Urumqi", "Asia/Ust-Nera", "Asia/Vientiane", "Asia/Vladivostok", "Asia/Yakutsk", "Asia/Yangon", "Asia/Yekaterinburg", "Asia/Yerevan", "Atlantic/Azores", "Atlantic/Bermuda", "Atlantic/Canary", "Atlantic/Cape_Verde", "Atlantic/Faroe", "Atlantic/Madeira", "Atlantic/Reykjavik", "Atlantic/South_Georgia", "Atlantic/St_Helena", "Atlantic/Stanley", "Australia/Adelaide", "Australia/Brisbane", "Australia/Broken_Hill", "Australia/Darwin", "Australia/Eucla", "Australia/Hobart", "Australia/Lindeman", "Australia/Lord_Howe", "Australia/Melbourne", "Australia/Perth", "Australia/Sydney", "Europe/Amsterdam", "Europe/Andorra", "Europe/Astrakhan", "Europe/Athens", "Europe/Belgrade", "Europe/Berlin", "Europe/Bratislava", "Europe/Brussels", "Europe/Bucharest", "Europe/Budapest", "Europe/Busingen", "Europe/Chisinau", "Europe/Copenhagen", "Europe/Dublin", "Europe/Gibraltar", "Europe/Guernsey", "Europe/Helsinki", "Europe/Isle_of_Man", "Europe/Istanbul", "Europe/Jersey", "Europe/Kaliningrad", "Europe/Kirov", "Europe/Kyiv", "Europe/Lisbon", "Europe/Ljubljana", "Europe/London", "Europe/Luxembourg", "Europe/Madrid", "Europe/Malta", "Europe/Mariehamn", "Europe/Minsk", "Europe/Monaco", "Europe/Moscow", "Europe/Oslo", "Europe/Paris", "Europe/Podgorica", "Europe/Prague", "Europe/Riga", "Europe/Rome", "Europe/Samara", "Europe/San_Marino", "Europe/Sarajevo", "Europe/Saratov", "Europe/Simferopol", "Europe/Skopje", "Europe/Sofia", "Europe/Stockholm", "Europe/Tallinn", "Europe/Tirane", "Europe/Ulyanovsk", "Europe/Vaduz", "Europe/Vatican", "Europe/Vienna", "Europe/Vilnius", "Europe/Volgograd", "Europe/Warsaw", "Europe/Zagreb", "Europe/Zurich", "Indian/Antananarivo", "Indian/Chagos", "Indian/Christmas", "Indian/Cocos", "Indian/Comoro", "Indian/Kerguelen", "Indian/Mahe", "Indian/Maldives", "Indian/Mauritius", "Indian/Mayotte", "Indian/Reunion", "Pacific/Apia", "Pacific/Auckland", "Pacific/Bougainville", "Pacific/Chatham", "Pacific/Chuuk", "Pacific/Easter", "Pacific/Efate", "Pacific/Fakaofo", "Pacific/Fiji", "Pacific/Funafuti", "Pacific/Galapagos", "Pacific/Gambier", "Pacific/Guadalcanal", "Pacific/Guam", "Pacific/Honolulu", "Pacific/Kanton", "Pacific/Kiritimati", "Pacific/Kosrae", "Pacific/Kwajalein", "Pacific/Majuro", "Pacific/Marquesas", "Pacific/Midway", "Pacific/Nauru", "Pacific/Niue", "Pacific/Norfolk", "Pacific/Noumea", "Pacific/Pago_Pago", "Pacific/Palau", "Pacific/Pitcairn", "Pacific/Pohnpei", "Pacific/Port_Moresby", "Pacific/Rarotonga", "Pacific/Saipan", "Pacific/Tahiti", "Pacific/Tarawa", "Pacific/Tongatapu", "Pacific/Wake", "Pacific/Wallis"], Eo = { time_zone: Za }, ko = Eo, Ao = ["ADP", "AGP", "AI", "API", "ASCII", "CLI", "COM", "CSS", "DNS", "DRAM", "EXE", "FTP", "GB", "HDD", "HEX", "HTTP", "IB", "IP", "JBOD", "JSON", "OCR", "PCI", "PNG", "RAM", "RSS", "SAS", "SCSI", "SDD", "SMS", "SMTP", "SQL", "SSD", "SSL", "TCP", "THX", "TLS", "UDP", "USB", "UTF8", "VGA", "XML", "XSS"], Bo = { abbreviation: Ao }, So = Bo, vo = { smiley: ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "☺️", "😚", "😙", "🥲", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐", "🤨", "😐", "😑", "😶", "😶‍🌫️", "😏", "😒", "🙄", "😬", "😮‍💨", "🤥", "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "🥴", "😵", "😵‍💫", "🤯", "🤠", "🥳", "🥸", "😎", "🤓", "🧐", "😕", "😟", "🙁", "☹️", "😮", "😯", "😲", "😳", "🥺", "😦", "😧", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫", "🥱", "😤", "😡", "😠", "🤬", "😈", "👿", "💀", "☠️", "💩", "🤡", "👹", "👺", "👻", "👽", "👾", "🤖", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🙈", "🙉", "🙊", "💋", "💌", "💘", "💝", "💖", "💗", "💓", "💞", "💕", "💟", "❣️", "💔", "❤️‍🔥", "❤️‍🩹", "❤️", "🧡", "💛", "💚", "💙", "💜", "🤎", "🖤", "🤍", "💯", "💢", "💥", "💫", "💦", "💨", "🕳️", "💣", "💬", "👁️‍🗨️", "🗨️", "🗯️", "💭", "💤"], body: ["👋", "👋🏻", "👋🏼", "👋🏽", "👋🏾", "👋🏿", "🤚", "🤚🏻", "🤚🏼", "🤚🏽", "🤚🏾", "🤚🏿", "🖐️", "🖐🏻", "🖐🏼", "🖐🏽", "🖐🏾", "🖐🏿", "✋", "✋🏻", "✋🏼", "✋🏽", "✋🏾", "✋🏿", "🖖", "🖖🏻", "🖖🏼", "🖖🏽", "🖖🏾", "🖖🏿", "👌", "👌🏻", "👌🏼", "👌🏽", "👌🏾", "👌🏿", "🤌", "🤌🏻", "🤌🏼", "🤌🏽", "🤌🏾", "🤌🏿", "🤏", "🤏🏻", "🤏🏼", "🤏🏽", "🤏🏾", "🤏🏿", "✌️", "✌🏻", "✌🏼", "✌🏽", "✌🏾", "✌🏿", "🤞", "🤞🏻", "🤞🏼", "🤞🏽", "🤞🏾", "🤞🏿", "🤟", "🤟🏻", "🤟🏼", "🤟🏽", "🤟🏾", "🤟🏿", "🤘", "🤘🏻", "🤘🏼", "🤘🏽", "🤘🏾", "🤘🏿", "🤙", "🤙🏻", "🤙🏼", "🤙🏽", "🤙🏾", "🤙🏿", "👈", "👈🏻", "👈🏼", "👈🏽", "👈🏾", "👈🏿", "👉", "👉🏻", "👉🏼", "👉🏽", "👉🏾", "👉🏿", "👆", "👆🏻", "👆🏼", "👆🏽", "👆🏾", "👆🏿", "🖕", "🖕🏻", "🖕🏼", "🖕🏽", "🖕🏾", "🖕🏿", "👇", "👇🏻", "👇🏼", "👇🏽", "👇🏾", "👇🏿", "☝️", "☝🏻", "☝🏼", "☝🏽", "☝🏾", "☝🏿", "👍", "👍🏻", "👍🏼", "👍🏽", "👍🏾", "👍🏿", "👎", "👎🏻", "👎🏼", "👎🏽", "👎🏾", "👎🏿", "✊", "✊🏻", "✊🏼", "✊🏽", "✊🏾", "✊🏿", "👊", "👊🏻", "👊🏼", "👊🏽", "👊🏾", "👊🏿", "🤛", "🤛🏻", "🤛🏼", "🤛🏽", "🤛🏾", "🤛🏿", "🤜", "🤜🏻", "🤜🏼", "🤜🏽", "🤜🏾", "🤜🏿", "👏", "👏🏻", "👏🏼", "👏🏽", "👏🏾", "👏🏿", "🙌", "🙌🏻", "🙌🏼", "🙌🏽", "🙌🏾", "🙌🏿", "👐", "👐🏻", "👐🏼", "👐🏽", "👐🏾", "👐🏿", "🤲", "🤲🏻", "🤲🏼", "🤲🏽", "🤲🏾", "🤲🏿", "🤝", "🙏", "🙏🏻", "🙏🏼", "🙏🏽", "🙏🏾", "🙏🏿", "✍️", "✍🏻", "✍🏼", "✍🏽", "✍🏾", "✍🏿", "💅", "💅🏻", "💅🏼", "💅🏽", "💅🏾", "💅🏿", "🤳", "🤳🏻", "🤳🏼", "🤳🏽", "🤳🏾", "🤳🏿", "💪", "💪🏻", "💪🏼", "💪🏽", "💪🏾", "💪🏿", "🦾", "🦿", "🦵", "🦵🏻", "🦵🏼", "🦵🏽", "🦵🏾", "🦵🏿", "🦶", "🦶🏻", "🦶🏼", "🦶🏽", "🦶🏾", "🦶🏿", "👂", "👂🏻", "👂🏼", "👂🏽", "👂🏾", "👂🏿", "🦻", "🦻🏻", "🦻🏼", "🦻🏽", "🦻🏾", "🦻🏿", "👃", "👃🏻", "👃🏼", "👃🏽", "👃🏾", "👃🏿", "🧠", "🫀", "🫁", "🦷", "🦴", "👀", "👁️", "👅", "👄"], person: ["👶", "👶🏻", "👶🏼", "👶🏽", "👶🏾", "👶🏿", "🧒", "🧒🏻", "🧒🏼", "🧒🏽", "🧒🏾", "🧒🏿", "👦", "👦🏻", "👦🏼", "👦🏽", "👦🏾", "👦🏿", "👧", "👧🏻", "👧🏼", "👧🏽", "👧🏾", "👧🏿", "🧑", "🧑🏻", "🧑🏼", "🧑🏽", "🧑🏾", "🧑🏿", "👱", "👱🏻", "👱🏼", "👱🏽", "👱🏾", "👱🏿", "👨", "👨🏻", "👨🏼", "👨🏽", "👨🏾", "👨🏿", "🧔", "🧔🏻", "🧔🏼", "🧔🏽", "🧔🏾", "🧔🏿", "🧔‍♂️", "🧔🏻‍♂️", "🧔🏼‍♂️", "🧔🏽‍♂️", "🧔🏾‍♂️", "🧔🏿‍♂️", "🧔‍♀️", "🧔🏻‍♀️", "🧔🏼‍♀️", "🧔🏽‍♀️", "🧔🏾‍♀️", "🧔🏿‍♀️", "👨‍🦰", "👨🏻‍🦰", "👨🏼‍🦰", "👨🏽‍🦰", "👨🏾‍🦰", "👨🏿‍🦰", "👨‍🦱", "👨🏻‍🦱", "👨🏼‍🦱", "👨🏽‍🦱", "👨🏾‍🦱", "👨🏿‍🦱", "👨‍🦳", "👨🏻‍🦳", "👨🏼‍🦳", "👨🏽‍🦳", "👨🏾‍🦳", "👨🏿‍🦳", "👨‍🦲", "👨🏻‍🦲", "👨🏼‍🦲", "👨🏽‍🦲", "👨🏾‍🦲", "👨🏿‍🦲", "👩", "👩🏻", "👩🏼", "👩🏽", "👩🏾", "👩🏿", "👩‍🦰", "👩🏻‍🦰", "👩🏼‍🦰", "👩🏽‍🦰", "👩🏾‍🦰", "👩🏿‍🦰", "🧑‍🦰", "🧑🏻‍🦰", "🧑🏼‍🦰", "🧑🏽‍🦰", "🧑🏾‍🦰", "🧑🏿‍🦰", "👩‍🦱", "👩🏻‍🦱", "👩🏼‍🦱", "👩🏽‍🦱", "👩🏾‍🦱", "👩🏿‍🦱", "🧑‍🦱", "🧑🏻‍🦱", "🧑🏼‍🦱", "🧑🏽‍🦱", "🧑🏾‍🦱", "🧑🏿‍🦱", "👩‍🦳", "👩🏻‍🦳", "👩🏼‍🦳", "👩🏽‍🦳", "👩🏾‍🦳", "👩🏿‍🦳", "🧑‍🦳", "🧑🏻‍🦳", "🧑🏼‍🦳", "🧑🏽‍🦳", "🧑🏾‍🦳", "🧑🏿‍🦳", "👩‍🦲", "👩🏻‍🦲", "👩🏼‍🦲", "👩🏽‍🦲", "👩🏾‍🦲", "👩🏿‍🦲", "🧑‍🦲", "🧑🏻‍🦲", "🧑🏼‍🦲", "🧑🏽‍🦲", "🧑🏾‍🦲", "🧑🏿‍🦲", "👱‍♀️", "👱🏻‍♀️", "👱🏼‍♀️", "👱🏽‍♀️", "👱🏾‍♀️", "👱🏿‍♀️", "👱‍♂️", "👱🏻‍♂️", "👱🏼‍♂️", "👱🏽‍♂️", "👱🏾‍♂️", "👱🏿‍♂️", "🧓", "🧓🏻", "🧓🏼", "🧓🏽", "🧓🏾", "🧓🏿", "👴", "👴🏻", "👴🏼", "👴🏽", "👴🏾", "👴🏿", "👵", "👵🏻", "👵🏼", "👵🏽", "👵🏾", "👵🏿", "🙍", "🙍🏻", "🙍🏼", "🙍🏽", "🙍🏾", "🙍🏿", "🙍‍♂️", "🙍🏻‍♂️", "🙍🏼‍♂️", "🙍🏽‍♂️", "🙍🏾‍♂️", "🙍🏿‍♂️", "🙍‍♀️", "🙍🏻‍♀️", "🙍🏼‍♀️", "🙍🏽‍♀️", "🙍🏾‍♀️", "🙍🏿‍♀️", "🙎", "🙎🏻", "🙎🏼", "🙎🏽", "🙎🏾", "🙎🏿", "🙎‍♂️", "🙎🏻‍♂️", "🙎🏼‍♂️", "🙎🏽‍♂️", "🙎🏾‍♂️", "🙎🏿‍♂️", "🙎‍♀️", "🙎🏻‍♀️", "🙎🏼‍♀️", "🙎🏽‍♀️", "🙎🏾‍♀️", "🙎🏿‍♀️", "🙅", "🙅🏻", "🙅🏼", "🙅🏽", "🙅🏾", "🙅🏿", "🙅‍♂️", "🙅🏻‍♂️", "🙅🏼‍♂️", "🙅🏽‍♂️", "🙅🏾‍♂️", "🙅🏿‍♂️", "🙅‍♀️", "🙅🏻‍♀️", "🙅🏼‍♀️", "🙅🏽‍♀️", "🙅🏾‍♀️", "🙅🏿‍♀️", "🙆", "🙆🏻", "🙆🏼", "🙆🏽", "🙆🏾", "🙆🏿", "🙆‍♂️", "🙆🏻‍♂️", "🙆🏼‍♂️", "🙆🏽‍♂️", "🙆🏾‍♂️", "🙆🏿‍♂️", "🙆‍♀️", "🙆🏻‍♀️", "🙆🏼‍♀️", "🙆🏽‍♀️", "🙆🏾‍♀️", "🙆🏿‍♀️", "💁", "💁🏻", "💁🏼", "💁🏽", "💁🏾", "💁🏿", "💁‍♂️", "💁🏻‍♂️", "💁🏼‍♂️", "💁🏽‍♂️", "💁🏾‍♂️", "💁🏿‍♂️", "💁‍♀️", "💁🏻‍♀️", "💁🏼‍♀️", "💁🏽‍♀️", "💁🏾‍♀️", "💁🏿‍♀️", "🙋", "🙋🏻", "🙋🏼", "🙋🏽", "🙋🏾", "🙋🏿", "🙋‍♂️", "🙋🏻‍♂️", "🙋🏼‍♂️", "🙋🏽‍♂️", "🙋🏾‍♂️", "🙋🏿‍♂️", "🙋‍♀️", "🙋🏻‍♀️", "🙋🏼‍♀️", "🙋🏽‍♀️", "🙋🏾‍♀️", "🙋🏿‍♀️", "🧏", "🧏🏻", "🧏🏼", "🧏🏽", "🧏🏾", "🧏🏿", "🧏‍♂️", "🧏🏻‍♂️", "🧏🏼‍♂️", "🧏🏽‍♂️", "🧏🏾‍♂️", "🧏🏿‍♂️", "🧏‍♀️", "🧏🏻‍♀️", "🧏🏼‍♀️", "🧏🏽‍♀️", "🧏🏾‍♀️", "🧏🏿‍♀️", "🙇", "🙇🏻", "🙇🏼", "🙇🏽", "🙇🏾", "🙇🏿", "🙇‍♂️", "🙇🏻‍♂️", "🙇🏼‍♂️", "🙇🏽‍♂️", "🙇🏾‍♂️", "🙇🏿‍♂️", "🙇‍♀️", "🙇🏻‍♀️", "🙇🏼‍♀️", "🙇🏽‍♀️", "🙇🏾‍♀️", "🙇🏿‍♀️", "🤦", "🤦🏻", "🤦🏼", "🤦🏽", "🤦🏾", "🤦🏿", "🤦‍♂️", "🤦🏻‍♂️", "🤦🏼‍♂️", "🤦🏽‍♂️", "🤦🏾‍♂️", "🤦🏿‍♂️", "🤦‍♀️", "🤦🏻‍♀️", "🤦🏼‍♀️", "🤦🏽‍♀️", "🤦🏾‍♀️", "🤦🏿‍♀️", "🤷", "🤷🏻", "🤷🏼", "🤷🏽", "🤷🏾", "🤷🏿", "🤷‍♂️", "🤷🏻‍♂️", "🤷🏼‍♂️", "🤷🏽‍♂️", "🤷🏾‍♂️", "🤷🏿‍♂️", "🤷‍♀️", "🤷🏻‍♀️", "🤷🏼‍♀️", "🤷🏽‍♀️", "🤷🏾‍♀️", "🤷🏿‍♀️", "🧑‍⚕️", "🧑🏻‍⚕️", "🧑🏼‍⚕️", "🧑🏽‍⚕️", "🧑🏾‍⚕️", "🧑🏿‍⚕️", "👨‍⚕️", "👨🏻‍⚕️", "👨🏼‍⚕️", "👨🏽‍⚕️", "👨🏾‍⚕️", "👨🏿‍⚕️", "👩‍⚕️", "👩🏻‍⚕️", "👩🏼‍⚕️", "👩🏽‍⚕️", "👩🏾‍⚕️", "👩🏿‍⚕️", "🧑‍🎓", "🧑🏻‍🎓", "🧑🏼‍🎓", "🧑🏽‍🎓", "🧑🏾‍🎓", "🧑🏿‍🎓", "👨‍🎓", "👨🏻‍🎓", "👨🏼‍🎓", "👨🏽‍🎓", "👨🏾‍🎓", "👨🏿‍🎓", "👩‍🎓", "👩🏻‍🎓", "👩🏼‍🎓", "👩🏽‍🎓", "👩🏾‍🎓", "👩🏿‍🎓", "🧑‍🏫", "🧑🏻‍🏫", "🧑🏼‍🏫", "🧑🏽‍🏫", "🧑🏾‍🏫", "🧑🏿‍🏫", "👨‍🏫", "👨🏻‍🏫", "👨🏼‍🏫", "👨🏽‍🏫", "👨🏾‍🏫", "👨🏿‍🏫", "👩‍🏫", "👩🏻‍🏫", "👩🏼‍🏫", "👩🏽‍🏫", "👩🏾‍🏫", "👩🏿‍🏫", "🧑‍⚖️", "🧑🏻‍⚖️", "🧑🏼‍⚖️", "🧑🏽‍⚖️", "🧑🏾‍⚖️", "🧑🏿‍⚖️", "👨‍⚖️", "👨🏻‍⚖️", "👨🏼‍⚖️", "👨🏽‍⚖️", "👨🏾‍⚖️", "👨🏿‍⚖️", "👩‍⚖️", "👩🏻‍⚖️", "👩🏼‍⚖️", "👩🏽‍⚖️", "👩🏾‍⚖️", "👩🏿‍⚖️", "🧑‍🌾", "🧑🏻‍🌾", "🧑🏼‍🌾", "🧑🏽‍🌾", "🧑🏾‍🌾", "🧑🏿‍🌾", "👨‍🌾", "👨🏻‍🌾", "👨🏼‍🌾", "👨🏽‍🌾", "👨🏾‍🌾", "👨🏿‍🌾", "👩‍🌾", "👩🏻‍🌾", "👩🏼‍🌾", "👩🏽‍🌾", "👩🏾‍🌾", "👩🏿‍🌾", "🧑‍🍳", "🧑🏻‍🍳", "🧑🏼‍🍳", "🧑🏽‍🍳", "🧑🏾‍🍳", "🧑🏿‍🍳", "👨‍🍳", "👨🏻‍🍳", "👨🏼‍🍳", "👨🏽‍🍳", "👨🏾‍🍳", "👨🏿‍🍳", "👩‍🍳", "👩🏻‍🍳", "👩🏼‍🍳", "👩🏽‍🍳", "👩🏾‍🍳", "👩🏿‍🍳", "🧑‍🔧", "🧑🏻‍🔧", "🧑🏼‍🔧", "🧑🏽‍🔧", "🧑🏾‍🔧", "🧑🏿‍🔧", "👨‍🔧", "👨🏻‍🔧", "👨🏼‍🔧", "👨🏽‍🔧", "👨🏾‍🔧", "👨🏿‍🔧", "👩‍🔧", "👩🏻‍🔧", "👩🏼‍🔧", "👩🏽‍🔧", "👩🏾‍🔧", "👩🏿‍🔧", "🧑‍🏭", "🧑🏻‍🏭", "🧑🏼‍🏭", "🧑🏽‍🏭", "🧑🏾‍🏭", "🧑🏿‍🏭", "👨‍🏭", "👨🏻‍🏭", "👨🏼‍🏭", "👨🏽‍🏭", "👨🏾‍🏭", "👨🏿‍🏭", "👩‍🏭", "👩🏻‍🏭", "👩🏼‍🏭", "👩🏽‍🏭", "👩🏾‍🏭", "👩🏿‍🏭", "🧑‍💼", "🧑🏻‍💼", "🧑🏼‍💼", "🧑🏽‍💼", "🧑🏾‍💼", "🧑🏿‍💼", "👨‍💼", "👨🏻‍💼", "👨🏼‍💼", "👨🏽‍💼", "👨🏾‍💼", "👨🏿‍💼", "👩‍💼", "👩🏻‍💼", "👩🏼‍💼", "👩🏽‍💼", "👩🏾‍💼", "👩🏿‍💼", "🧑‍🔬", "🧑🏻‍🔬", "🧑🏼‍🔬", "🧑🏽‍🔬", "🧑🏾‍🔬", "🧑🏿‍🔬", "👨‍🔬", "👨🏻‍🔬", "👨🏼‍🔬", "👨🏽‍🔬", "👨🏾‍🔬", "👨🏿‍🔬", "👩‍🔬", "👩🏻‍🔬", "👩🏼‍🔬", "👩🏽‍🔬", "👩🏾‍🔬", "👩🏿‍🔬", "🧑‍💻", "🧑🏻‍💻", "🧑🏼‍💻", "🧑🏽‍💻", "🧑🏾‍💻", "🧑🏿‍💻", "👨‍💻", "👨🏻‍💻", "👨🏼‍💻", "👨🏽‍💻", "👨🏾‍💻", "👨🏿‍💻", "👩‍💻", "👩🏻‍💻", "👩🏼‍💻", "👩🏽‍💻", "👩🏾‍💻", "👩🏿‍💻", "🧑‍🎤", "🧑🏻‍🎤", "🧑🏼‍🎤", "🧑🏽‍🎤", "🧑🏾‍🎤", "🧑🏿‍🎤", "👨‍🎤", "👨🏻‍🎤", "👨🏼‍🎤", "👨🏽‍🎤", "👨🏾‍🎤", "👨🏿‍🎤", "👩‍🎤", "👩🏻‍🎤", "👩🏼‍🎤", "👩🏽‍🎤", "👩🏾‍🎤", "👩🏿‍🎤", "🧑‍🎨", "🧑🏻‍🎨", "🧑🏼‍🎨", "🧑🏽‍🎨", "🧑🏾‍🎨", "🧑🏿‍🎨", "👨‍🎨", "👨🏻‍🎨", "👨🏼‍🎨", "👨🏽‍🎨", "👨🏾‍🎨", "👨🏿‍🎨", "👩‍🎨", "👩🏻‍🎨", "👩🏼‍🎨", "👩🏽‍🎨", "👩🏾‍🎨", "👩🏿‍🎨", "🧑‍✈️", "🧑🏻‍✈️", "🧑🏼‍✈️", "🧑🏽‍✈️", "🧑🏾‍✈️", "🧑🏿‍✈️", "👨‍✈️", "👨🏻‍✈️", "👨🏼‍✈️", "👨🏽‍✈️", "👨🏾‍✈️", "👨🏿‍✈️", "👩‍✈️", "👩🏻‍✈️", "👩🏼‍✈️", "👩🏽‍✈️", "👩🏾‍✈️", "👩🏿‍✈️", "🧑‍🚀", "🧑🏻‍🚀", "🧑🏼‍🚀", "🧑🏽‍🚀", "🧑🏾‍🚀", "🧑🏿‍🚀", "👨‍🚀", "👨🏻‍🚀", "👨🏼‍🚀", "👨🏽‍🚀", "👨🏾‍🚀", "👨🏿‍🚀", "👩‍🚀", "👩🏻‍🚀", "👩🏼‍🚀", "👩🏽‍🚀", "👩🏾‍🚀", "👩🏿‍🚀", "🧑‍🚒", "🧑🏻‍🚒", "🧑🏼‍🚒", "🧑🏽‍🚒", "🧑🏾‍🚒", "🧑🏿‍🚒", "👨‍🚒", "👨🏻‍🚒", "👨🏼‍🚒", "👨🏽‍🚒", "👨🏾‍🚒", "👨🏿‍🚒", "👩‍🚒", "👩🏻‍🚒", "👩🏼‍🚒", "👩🏽‍🚒", "👩🏾‍🚒", "👩🏿‍🚒", "👮", "👮🏻", "👮🏼", "👮🏽", "👮🏾", "👮🏿", "👮‍♂️", "👮🏻‍♂️", "👮🏼‍♂️", "👮🏽‍♂️", "👮🏾‍♂️", "👮🏿‍♂️", "👮‍♀️", "👮🏻‍♀️", "👮🏼‍♀️", "👮🏽‍♀️", "👮🏾‍♀️", "👮🏿‍♀️", "🕵️", "🕵🏻", "🕵🏼", "🕵🏽", "🕵🏾", "🕵🏿", "🕵️‍♂️", "🕵🏻‍♂️", "🕵🏼‍♂️", "🕵🏽‍♂️", "🕵🏾‍♂️", "🕵🏿‍♂️", "🕵️‍♀️", "🕵🏻‍♀️", "🕵🏼‍♀️", "🕵🏽‍♀️", "🕵🏾‍♀️", "🕵🏿‍♀️", "💂", "💂🏻", "💂🏼", "💂🏽", "💂🏾", "💂🏿", "💂‍♂️", "💂🏻‍♂️", "💂🏼‍♂️", "💂🏽‍♂️", "💂🏾‍♂️", "💂🏿‍♂️", "💂‍♀️", "💂🏻‍♀️", "💂🏼‍♀️", "💂🏽‍♀️", "💂🏾‍♀️", "💂🏿‍♀️", "🥷", "🥷🏻", "🥷🏼", "🥷🏽", "🥷🏾", "🥷🏿", "👷", "👷🏻", "👷🏼", "👷🏽", "👷🏾", "👷🏿", "👷‍♂️", "👷🏻‍♂️", "👷🏼‍♂️", "👷🏽‍♂️", "👷🏾‍♂️", "👷🏿‍♂️", "👷‍♀️", "👷🏻‍♀️", "👷🏼‍♀️", "👷🏽‍♀️", "👷🏾‍♀️", "👷🏿‍♀️", "🤴", "🤴🏻", "🤴🏼", "🤴🏽", "🤴🏾", "🤴🏿", "👸", "👸🏻", "👸🏼", "👸🏽", "👸🏾", "👸🏿", "👳", "👳🏻", "👳🏼", "👳🏽", "👳🏾", "👳🏿", "👳‍♂️", "👳🏻‍♂️", "👳🏼‍♂️", "👳🏽‍♂️", "👳🏾‍♂️", "👳🏿‍♂️", "👳‍♀️", "👳🏻‍♀️", "👳🏼‍♀️", "👳🏽‍♀️", "👳🏾‍♀️", "👳🏿‍♀️", "👲", "👲🏻", "👲🏼", "👲🏽", "👲🏾", "👲🏿", "🧕", "🧕🏻", "🧕🏼", "🧕🏽", "🧕🏾", "🧕🏿", "🤵", "🤵🏻", "🤵🏼", "🤵🏽", "🤵🏾", "🤵🏿", "🤵‍♂️", "🤵🏻‍♂️", "🤵🏼‍♂️", "🤵🏽‍♂️", "🤵🏾‍♂️", "🤵🏿‍♂️", "🤵‍♀️", "🤵🏻‍♀️", "🤵🏼‍♀️", "🤵🏽‍♀️", "🤵🏾‍♀️", "🤵🏿‍♀️", "👰", "👰🏻", "👰🏼", "👰🏽", "👰🏾", "👰🏿", "👰‍♂️", "👰🏻‍♂️", "👰🏼‍♂️", "👰🏽‍♂️", "👰🏾‍♂️", "👰🏿‍♂️", "👰‍♀️", "👰🏻‍♀️", "👰🏼‍♀️", "👰🏽‍♀️", "👰🏾‍♀️", "👰🏿‍♀️", "🤰", "🤰🏻", "🤰🏼", "🤰🏽", "🤰🏾", "🤰🏿", "🤱", "🤱🏻", "🤱🏼", "🤱🏽", "🤱🏾", "🤱🏿", "👩‍🍼", "👩🏻‍🍼", "👩🏼‍🍼", "👩🏽‍🍼", "👩🏾‍🍼", "👩🏿‍🍼", "👨‍🍼", "👨🏻‍🍼", "👨🏼‍🍼", "👨🏽‍🍼", "👨🏾‍🍼", "👨🏿‍🍼", "🧑‍🍼", "🧑🏻‍🍼", "🧑🏼‍🍼", "🧑🏽‍🍼", "🧑🏾‍🍼", "🧑🏿‍🍼", "👼", "👼🏻", "👼🏼", "👼🏽", "👼🏾", "👼🏿", "🎅", "🎅🏻", "🎅🏼", "🎅🏽", "🎅🏾", "🎅🏿", "🤶", "🤶🏻", "🤶🏼", "🤶🏽", "🤶🏾", "🤶🏿", "🧑‍🎄", "🧑🏻‍🎄", "🧑🏼‍🎄", "🧑🏽‍🎄", "🧑🏾‍🎄", "🧑🏿‍🎄", "🦸", "🦸🏻", "🦸🏼", "🦸🏽", "🦸🏾", "🦸🏿", "🦸‍♂️", "🦸🏻‍♂️", "🦸🏼‍♂️", "🦸🏽‍♂️", "🦸🏾‍♂️", "🦸🏿‍♂️", "🦸‍♀️", "🦸🏻‍♀️", "🦸🏼‍♀️", "🦸🏽‍♀️", "🦸🏾‍♀️", "🦸🏿‍♀️", "🦹", "🦹🏻", "🦹🏼", "🦹🏽", "🦹🏾", "🦹🏿", "🦹‍♂️", "🦹🏻‍♂️", "🦹🏼‍♂️", "🦹🏽‍♂️", "🦹🏾‍♂️", "🦹🏿‍♂️", "🦹‍♀️", "🦹🏻‍♀️", "🦹🏼‍♀️", "🦹🏽‍♀️", "🦹🏾‍♀️", "🦹🏿‍♀️", "🧙", "🧙🏻", "🧙🏼", "🧙🏽", "🧙🏾", "🧙🏿", "🧙‍♂️", "🧙🏻‍♂️", "🧙🏼‍♂️", "🧙🏽‍♂️", "🧙🏾‍♂️", "🧙🏿‍♂️", "🧙‍♀️", "🧙🏻‍♀️", "🧙🏼‍♀️", "🧙🏽‍♀️", "🧙🏾‍♀️", "🧙🏿‍♀️", "🧚", "🧚🏻", "🧚🏼", "🧚🏽", "🧚🏾", "🧚🏿", "🧚‍♂️", "🧚🏻‍♂️", "🧚🏼‍♂️", "🧚🏽‍♂️", "🧚🏾‍♂️", "🧚🏿‍♂️", "🧚‍♀️", "🧚🏻‍♀️", "🧚🏼‍♀️", "🧚🏽‍♀️", "🧚🏾‍♀️", "🧚🏿‍♀️", "🧛", "🧛🏻", "🧛🏼", "🧛🏽", "🧛🏾", "🧛🏿", "🧛‍♂️", "🧛🏻‍♂️", "🧛🏼‍♂️", "🧛🏽‍♂️", "🧛🏾‍♂️", "🧛🏿‍♂️", "🧛‍♀️", "🧛🏻‍♀️", "🧛🏼‍♀️", "🧛🏽‍♀️", "🧛🏾‍♀️", "🧛🏿‍♀️", "🧜", "🧜🏻", "🧜🏼", "🧜🏽", "🧜🏾", "🧜🏿", "🧜‍♂️", "🧜🏻‍♂️", "🧜🏼‍♂️", "🧜🏽‍♂️", "🧜🏾‍♂️", "🧜🏿‍♂️", "🧜‍♀️", "🧜🏻‍♀️", "🧜🏼‍♀️", "🧜🏽‍♀️", "🧜🏾‍♀️", "🧜🏿‍♀️", "🧝", "🧝🏻", "🧝🏼", "🧝🏽", "🧝🏾", "🧝🏿", "🧝‍♂️", "🧝🏻‍♂️", "🧝🏼‍♂️", "🧝🏽‍♂️", "🧝🏾‍♂️", "🧝🏿‍♂️", "🧝‍♀️", "🧝🏻‍♀️", "🧝🏼‍♀️", "🧝🏽‍♀️", "🧝🏾‍♀️", "🧝🏿‍♀️", "🧞", "🧞‍♂️", "🧞‍♀️", "🧟", "🧟‍♂️", "🧟‍♀️", "💆", "💆🏻", "💆🏼", "💆🏽", "💆🏾", "💆🏿", "💆‍♂️", "💆🏻‍♂️", "💆🏼‍♂️", "💆🏽‍♂️", "💆🏾‍♂️", "💆🏿‍♂️", "💆‍♀️", "💆🏻‍♀️", "💆🏼‍♀️", "💆🏽‍♀️", "💆🏾‍♀️", "💆🏿‍♀️", "💇", "💇🏻", "💇🏼", "💇🏽", "💇🏾", "💇🏿", "💇‍♂️", "💇🏻‍♂️", "💇🏼‍♂️", "💇🏽‍♂️", "💇🏾‍♂️", "💇🏿‍♂️", "💇‍♀️", "💇🏻‍♀️", "💇🏼‍♀️", "💇🏽‍♀️", "💇🏾‍♀️", "💇🏿‍♀️", "🚶", "🚶🏻", "🚶🏼", "🚶🏽", "🚶🏾", "🚶🏿", "🚶‍♂️", "🚶🏻‍♂️", "🚶🏼‍♂️", "🚶🏽‍♂️", "🚶🏾‍♂️", "🚶🏿‍♂️", "🚶‍♀️", "🚶🏻‍♀️", "🚶🏼‍♀️", "🚶🏽‍♀️", "🚶🏾‍♀️", "🚶🏿‍♀️", "🧍", "🧍🏻", "🧍🏼", "🧍🏽", "🧍🏾", "🧍🏿", "🧍‍♂️", "🧍🏻‍♂️", "🧍🏼‍♂️", "🧍🏽‍♂️", "🧍🏾‍♂️", "🧍🏿‍♂️", "🧍‍♀️", "🧍🏻‍♀️", "🧍🏼‍♀️", "🧍🏽‍♀️", "🧍🏾‍♀️", "🧍🏿‍♀️", "🧎", "🧎🏻", "🧎🏼", "🧎🏽", "🧎🏾", "🧎🏿", "🧎‍♂️", "🧎🏻‍♂️", "🧎🏼‍♂️", "🧎🏽‍♂️", "🧎🏾‍♂️", "🧎🏿‍♂️", "🧎‍♀️", "🧎🏻‍♀️", "🧎🏼‍♀️", "🧎🏽‍♀️", "🧎🏾‍♀️", "🧎🏿‍♀️", "🧑‍🦯", "🧑🏻‍🦯", "🧑🏼‍🦯", "🧑🏽‍🦯", "🧑🏾‍🦯", "🧑🏿‍🦯", "👨‍🦯", "👨🏻‍🦯", "👨🏼‍🦯", "👨🏽‍🦯", "👨🏾‍🦯", "👨🏿‍🦯", "👩‍🦯", "👩🏻‍🦯", "👩🏼‍🦯", "👩🏽‍🦯", "👩🏾‍🦯", "👩🏿‍🦯", "🧑‍🦼", "🧑🏻‍🦼", "🧑🏼‍🦼", "🧑🏽‍🦼", "🧑🏾‍🦼", "🧑🏿‍🦼", "👨‍🦼", "👨🏻‍🦼", "👨🏼‍🦼", "👨🏽‍🦼", "👨🏾‍🦼", "👨🏿‍🦼", "👩‍🦼", "👩🏻‍🦼", "👩🏼‍🦼", "👩🏽‍🦼", "👩🏾‍🦼", "👩🏿‍🦼", "🧑‍🦽", "🧑🏻‍🦽", "🧑🏼‍🦽", "🧑🏽‍🦽", "🧑🏾‍🦽", "🧑🏿‍🦽", "👨‍🦽", "👨🏻‍🦽", "👨🏼‍🦽", "👨🏽‍🦽", "👨🏾‍🦽", "👨🏿‍🦽", "👩‍🦽", "👩🏻‍🦽", "👩🏼‍🦽", "👩🏽‍🦽", "👩🏾‍🦽", "👩🏿‍🦽", "🏃", "🏃🏻", "🏃🏼", "🏃🏽", "🏃🏾", "🏃🏿", "🏃‍♂️", "🏃🏻‍♂️", "🏃🏼‍♂️", "🏃🏽‍♂️", "🏃🏾‍♂️", "🏃🏿‍♂️", "🏃‍♀️", "🏃🏻‍♀️", "🏃🏼‍♀️", "🏃🏽‍♀️", "🏃🏾‍♀️", "🏃🏿‍♀️", "💃", "💃🏻", "💃🏼", "💃🏽", "💃🏾", "💃🏿", "🕺", "🕺🏻", "🕺🏼", "🕺🏽", "🕺🏾", "🕺🏿", "🕴️", "🕴🏻", "🕴🏼", "🕴🏽", "🕴🏾", "🕴🏿", "👯", "👯‍♂️", "👯‍♀️", "🧖", "🧖🏻", "🧖🏼", "🧖🏽", "🧖🏾", "🧖🏿", "🧖‍♂️", "🧖🏻‍♂️", "🧖🏼‍♂️", "🧖🏽‍♂️", "🧖🏾‍♂️", "🧖🏿‍♂️", "🧖‍♀️", "🧖🏻‍♀️", "🧖🏼‍♀️", "🧖🏽‍♀️", "🧖🏾‍♀️", "🧖🏿‍♀️", "🧗", "🧗🏻", "🧗🏼", "🧗🏽", "🧗🏾", "🧗🏿", "🧗‍♂️", "🧗🏻‍♂️", "🧗🏼‍♂️", "🧗🏽‍♂️", "🧗🏾‍♂️", "🧗🏿‍♂️", "🧗‍♀️", "🧗🏻‍♀️", "🧗🏼‍♀️", "🧗🏽‍♀️", "🧗🏾‍♀️", "🧗🏿‍♀️", "🤺", "🏇", "🏇🏻", "🏇🏼", "🏇🏽", "🏇🏾", "🏇🏿", "⛷️", "🏂", "🏂🏻", "🏂🏼", "🏂🏽", "🏂🏾", "🏂🏿", "🏌️", "🏌🏻", "🏌🏼", "🏌🏽", "🏌🏾", "🏌🏿", "🏌️‍♂️", "🏌🏻‍♂️", "🏌🏼‍♂️", "🏌🏽‍♂️", "🏌🏾‍♂️", "🏌🏿‍♂️", "🏌️‍♀️", "🏌🏻‍♀️", "🏌🏼‍♀️", "🏌🏽‍♀️", "🏌🏾‍♀️", "🏌🏿‍♀️", "🏄", "🏄🏻", "🏄🏼", "🏄🏽", "🏄🏾", "🏄🏿", "🏄‍♂️", "🏄🏻‍♂️", "🏄🏼‍♂️", "🏄🏽‍♂️", "🏄🏾‍♂️", "🏄🏿‍♂️", "🏄‍♀️", "🏄🏻‍♀️", "🏄🏼‍♀️", "🏄🏽‍♀️", "🏄🏾‍♀️", "🏄🏿‍♀️", "🚣", "🚣🏻", "🚣🏼", "🚣🏽", "🚣🏾", "🚣🏿", "🚣‍♂️", "🚣🏻‍♂️", "🚣🏼‍♂️", "🚣🏽‍♂️", "🚣🏾‍♂️", "🚣🏿‍♂️", "🚣‍♀️", "🚣🏻‍♀️", "🚣🏼‍♀️", "🚣🏽‍♀️", "🚣🏾‍♀️", "🚣🏿‍♀️", "🏊", "🏊🏻", "🏊🏼", "🏊🏽", "🏊🏾", "🏊🏿", "🏊‍♂️", "🏊🏻‍♂️", "🏊🏼‍♂️", "🏊🏽‍♂️", "🏊🏾‍♂️", "🏊🏿‍♂️", "🏊‍♀️", "🏊🏻‍♀️", "🏊🏼‍♀️", "🏊🏽‍♀️", "🏊🏾‍♀️", "🏊🏿‍♀️", "⛹️", "⛹🏻", "⛹🏼", "⛹🏽", "⛹🏾", "⛹🏿", "⛹️‍♂️", "⛹🏻‍♂️", "⛹🏼‍♂️", "⛹🏽‍♂️", "⛹🏾‍♂️", "⛹🏿‍♂️", "⛹️‍♀️", "⛹🏻‍♀️", "⛹🏼‍♀️", "⛹🏽‍♀️", "⛹🏾‍♀️", "⛹🏿‍♀️", "🏋️", "🏋🏻", "🏋🏼", "🏋🏽", "🏋🏾", "🏋🏿", "🏋️‍♂️", "🏋🏻‍♂️", "🏋🏼‍♂️", "🏋🏽‍♂️", "🏋🏾‍♂️", "🏋🏿‍♂️", "🏋️‍♀️", "🏋🏻‍♀️", "🏋🏼‍♀️", "🏋🏽‍♀️", "🏋🏾‍♀️", "🏋🏿‍♀️", "🚴", "🚴🏻", "🚴🏼", "🚴🏽", "🚴🏾", "🚴🏿", "🚴‍♂️", "🚴🏻‍♂️", "🚴🏼‍♂️", "🚴🏽‍♂️", "🚴🏾‍♂️", "🚴🏿‍♂️", "🚴‍♀️", "🚴🏻‍♀️", "🚴🏼‍♀️", "🚴🏽‍♀️", "🚴🏾‍♀️", "🚴🏿‍♀️", "🚵", "🚵🏻", "🚵🏼", "🚵🏽", "🚵🏾", "🚵🏿", "🚵‍♂️", "🚵🏻‍♂️", "🚵🏼‍♂️", "🚵🏽‍♂️", "🚵🏾‍♂️", "🚵🏿‍♂️", "🚵‍♀️", "🚵🏻‍♀️", "🚵🏼‍♀️", "🚵🏽‍♀️", "🚵🏾‍♀️", "🚵🏿‍♀️", "🤸", "🤸🏻", "🤸🏼", "🤸🏽", "🤸🏾", "🤸🏿", "🤸‍♂️", "🤸🏻‍♂️", "🤸🏼‍♂️", "🤸🏽‍♂️", "🤸🏾‍♂️", "🤸🏿‍♂️", "🤸‍♀️", "🤸🏻‍♀️", "🤸🏼‍♀️", "🤸🏽‍♀️", "🤸🏾‍♀️", "🤸🏿‍♀️", "🤼", "🤼‍♂️", "🤼‍♀️", "🤽", "🤽🏻", "🤽🏼", "🤽🏽", "🤽🏾", "🤽🏿", "🤽‍♂️", "🤽🏻‍♂️", "🤽🏼‍♂️", "🤽🏽‍♂️", "🤽🏾‍♂️", "🤽🏿‍♂️", "🤽‍♀️", "🤽🏻‍♀️", "🤽🏼‍♀️", "🤽🏽‍♀️", "🤽🏾‍♀️", "🤽🏿‍♀️", "🤾", "🤾🏻", "🤾🏼", "🤾🏽", "🤾🏾", "🤾🏿", "🤾‍♂️", "🤾🏻‍♂️", "🤾🏼‍♂️", "🤾🏽‍♂️", "🤾🏾‍♂️", "🤾🏿‍♂️", "🤾‍♀️", "🤾🏻‍♀️", "🤾🏼‍♀️", "🤾🏽‍♀️", "🤾🏾‍♀️", "🤾🏿‍♀️", "🤹", "🤹🏻", "🤹🏼", "🤹🏽", "🤹🏾", "🤹🏿", "🤹‍♂️", "🤹🏻‍♂️", "🤹🏼‍♂️", "🤹🏽‍♂️", "🤹🏾‍♂️", "🤹🏿‍♂️", "🤹‍♀️", "🤹🏻‍♀️", "🤹🏼‍♀️", "🤹🏽‍♀️", "🤹🏾‍♀️", "🤹🏿‍♀️", "🧘", "🧘🏻", "🧘🏼", "🧘🏽", "🧘🏾", "🧘🏿", "🧘‍♂️", "🧘🏻‍♂️", "🧘🏼‍♂️", "🧘🏽‍♂️", "🧘🏾‍♂️", "🧘🏿‍♂️", "🧘‍♀️", "🧘🏻‍♀️", "🧘🏼‍♀️", "🧘🏽‍♀️", "🧘🏾‍♀️", "🧘🏿‍♀️", "🛀", "🛀🏻", "🛀🏼", "🛀🏽", "🛀🏾", "🛀🏿", "🛌", "🛌🏻", "🛌🏼", "🛌🏽", "🛌🏾", "🛌🏿", "🧑‍🤝‍🧑", "🧑🏻‍🤝‍🧑🏻", "🧑🏻‍🤝‍🧑🏼", "🧑🏻‍🤝‍🧑🏽", "🧑🏻‍🤝‍🧑🏾", "🧑🏻‍🤝‍🧑🏿", "🧑🏼‍🤝‍🧑🏻", "🧑🏼‍🤝‍🧑🏼", "🧑🏼‍🤝‍🧑🏽", "🧑🏼‍🤝‍🧑🏾", "🧑🏼‍🤝‍🧑🏿", "🧑🏽‍🤝‍🧑🏻", "🧑🏽‍🤝‍🧑🏼", "🧑🏽‍🤝‍🧑🏽", "🧑🏽‍🤝‍🧑🏾", "🧑🏽‍🤝‍🧑🏿", "🧑🏾‍🤝‍🧑🏻", "🧑🏾‍🤝‍🧑🏼", "🧑🏾‍🤝‍🧑🏽", "🧑🏾‍🤝‍🧑🏾", "🧑🏾‍🤝‍🧑🏿", "🧑🏿‍🤝‍🧑🏻", "🧑🏿‍🤝‍🧑🏼", "🧑🏿‍🤝‍🧑🏽", "🧑🏿‍🤝‍🧑🏾", "🧑🏿‍🤝‍🧑🏿", "👭", "👭🏻", "👩🏻‍🤝‍👩🏼", "👩🏻‍🤝‍👩🏽", "👩🏻‍🤝‍👩🏾", "👩🏻‍🤝‍👩🏿", "👩🏼‍🤝‍👩🏻", "👭🏼", "👩🏼‍🤝‍👩🏽", "👩🏼‍🤝‍👩🏾", "👩🏼‍🤝‍👩🏿", "👩🏽‍🤝‍👩🏻", "👩🏽‍🤝‍👩🏼", "👭🏽", "👩🏽‍🤝‍👩🏾", "👩🏽‍🤝‍👩🏿", "👩🏾‍🤝‍👩🏻", "👩🏾‍🤝‍👩🏼", "👩🏾‍🤝‍👩🏽", "👭🏾", "👩🏾‍🤝‍👩🏿", "👩🏿‍🤝‍👩🏻", "👩🏿‍🤝‍👩🏼", "👩🏿‍🤝‍👩🏽", "👩🏿‍🤝‍👩🏾", "👭🏿", "👫", "👫🏻", "👩🏻‍🤝‍👨🏼", "👩🏻‍🤝‍👨🏽", "👩🏻‍🤝‍👨🏾", "👩🏻‍🤝‍👨🏿", "👩🏼‍🤝‍👨🏻", "👫🏼", "👩🏼‍🤝‍👨🏽", "👩🏼‍🤝‍👨🏾", "👩🏼‍🤝‍👨🏿", "👩🏽‍🤝‍👨🏻", "👩🏽‍🤝‍👨🏼", "👫🏽", "👩🏽‍🤝‍👨🏾", "👩🏽‍🤝‍👨🏿", "👩🏾‍🤝‍👨🏻", "👩🏾‍🤝‍👨🏼", "👩🏾‍🤝‍👨🏽", "👫🏾", "👩🏾‍🤝‍👨🏿", "👩🏿‍🤝‍👨🏻", "👩🏿‍🤝‍👨🏼", "👩🏿‍🤝‍👨🏽", "👩🏿‍🤝‍👨🏾", "👫🏿", "👬", "👬🏻", "👨🏻‍🤝‍👨🏼", "👨🏻‍🤝‍👨🏽", "👨🏻‍🤝‍👨🏾", "👨🏻‍🤝‍👨🏿", "👨🏼‍🤝‍👨🏻", "👬🏼", "👨🏼‍🤝‍👨🏽", "👨🏼‍🤝‍👨🏾", "👨🏼‍🤝‍👨🏿", "👨🏽‍🤝‍👨🏻", "👨🏽‍🤝‍👨🏼", "👬🏽", "👨🏽‍🤝‍👨🏾", "👨🏽‍🤝‍👨🏿", "👨🏾‍🤝‍👨🏻", "👨🏾‍🤝‍👨🏼", "👨🏾‍🤝‍👨🏽", "👬🏾", "👨🏾‍🤝‍👨🏿", "👨🏿‍🤝‍👨🏻", "👨🏿‍🤝‍👨🏼", "👨🏿‍🤝‍👨🏽", "👨🏿‍🤝‍👨🏾", "👬🏿", "💏", "💏🏻", "💏🏼", "💏🏽", "💏🏾", "💏🏿", "🧑🏻‍❤️‍💋‍🧑🏼", "🧑🏻‍❤️‍💋‍🧑🏽", "🧑🏻‍❤️‍💋‍🧑🏾", "🧑🏻‍❤️‍💋‍🧑🏿", "🧑🏼‍❤️‍💋‍🧑🏻", "🧑🏼‍❤️‍💋‍🧑🏽", "🧑🏼‍❤️‍💋‍🧑🏾", "🧑🏼‍❤️‍💋‍🧑🏿", "🧑🏽‍❤️‍💋‍🧑🏻", "🧑🏽‍❤️‍💋‍🧑🏼", "🧑🏽‍❤️‍💋‍🧑🏾", "🧑🏽‍❤️‍💋‍🧑🏿", "🧑🏾‍❤️‍💋‍🧑🏻", "🧑🏾‍❤️‍💋‍🧑🏼", "🧑🏾‍❤️‍💋‍🧑🏽", "🧑🏾‍❤️‍💋‍🧑🏿", "🧑🏿‍❤️‍💋‍🧑🏻", "🧑🏿‍❤️‍💋‍🧑🏼", "🧑🏿‍❤️‍💋‍🧑🏽", "🧑🏿‍❤️‍💋‍🧑🏾", "👩‍❤️‍💋‍👨", "👩🏻‍❤️‍💋‍👨🏻", "👩🏻‍❤️‍💋‍👨🏼", "👩🏻‍❤️‍💋‍👨🏽", "👩🏻‍❤️‍💋‍👨🏾", "👩🏻‍❤️‍💋‍👨🏿", "👩🏼‍❤️‍💋‍👨🏻", "👩🏼‍❤️‍💋‍👨🏼", "👩🏼‍❤️‍💋‍👨🏽", "👩🏼‍❤️‍💋‍👨🏾", "👩🏼‍❤️‍💋‍👨🏿", "👩🏽‍❤️‍💋‍👨🏻", "👩🏽‍❤️‍💋‍👨🏼", "👩🏽‍❤️‍💋‍👨🏽", "👩🏽‍❤️‍💋‍👨🏾", "👩🏽‍❤️‍💋‍👨🏿", "👩🏾‍❤️‍💋‍👨🏻", "👩🏾‍❤️‍💋‍👨🏼", "👩🏾‍❤️‍💋‍👨🏽", "👩🏾‍❤️‍💋‍👨🏾", "👩🏾‍❤️‍💋‍👨🏿", "👩🏿‍❤️‍💋‍👨🏻", "👩🏿‍❤️‍💋‍👨🏼", "👩🏿‍❤️‍💋‍👨🏽", "👩🏿‍❤️‍💋‍👨🏾", "👩🏿‍❤️‍💋‍👨🏿", "👨‍❤️‍💋‍👨", "👨🏻‍❤️‍💋‍👨🏻", "👨🏻‍❤️‍💋‍👨🏼", "👨🏻‍❤️‍💋‍👨🏽", "👨🏻‍❤️‍💋‍👨🏾", "👨🏻‍❤️‍💋‍👨🏿", "👨🏼‍❤️‍💋‍👨🏻", "👨🏼‍❤️‍💋‍👨🏼", "👨🏼‍❤️‍💋‍👨🏽", "👨🏼‍❤️‍💋‍👨🏾", "👨🏼‍❤️‍💋‍👨🏿", "👨🏽‍❤️‍💋‍👨🏻", "👨🏽‍❤️‍💋‍👨🏼", "👨🏽‍❤️‍💋‍👨🏽", "👨🏽‍❤️‍💋‍👨🏾", "👨🏽‍❤️‍💋‍👨🏿", "👨🏾‍❤️‍💋‍👨🏻", "👨🏾‍❤️‍💋‍👨🏼", "👨🏾‍❤️‍💋‍👨🏽", "👨🏾‍❤️‍💋‍👨🏾", "👨🏾‍❤️‍💋‍👨🏿", "👨🏿‍❤️‍💋‍👨🏻", "👨🏿‍❤️‍💋‍👨🏼", "👨🏿‍❤️‍💋‍👨🏽", "👨🏿‍❤️‍💋‍👨🏾", "👨🏿‍❤️‍💋‍👨🏿", "👩‍❤️‍💋‍👩", "👩🏻‍❤️‍💋‍👩🏻", "👩🏻‍❤️‍💋‍👩🏼", "👩🏻‍❤️‍💋‍👩🏽", "👩🏻‍❤️‍💋‍👩🏾", "👩🏻‍❤️‍💋‍👩🏿", "👩🏼‍❤️‍💋‍👩🏻", "👩🏼‍❤️‍💋‍👩🏼", "👩🏼‍❤️‍💋‍👩🏽", "👩🏼‍❤️‍💋‍👩🏾", "👩🏼‍❤️‍💋‍👩🏿", "👩🏽‍❤️‍💋‍👩🏻", "👩🏽‍❤️‍💋‍👩🏼", "👩🏽‍❤️‍💋‍👩🏽", "👩🏽‍❤️‍💋‍👩🏾", "👩🏽‍❤️‍💋‍👩🏿", "👩🏾‍❤️‍💋‍👩🏻", "👩🏾‍❤️‍💋‍👩🏼", "👩🏾‍❤️‍💋‍👩🏽", "👩🏾‍❤️‍💋‍👩🏾", "👩🏾‍❤️‍💋‍👩🏿", "👩🏿‍❤️‍💋‍👩🏻", "👩🏿‍❤️‍💋‍👩🏼", "👩🏿‍❤️‍💋‍👩🏽", "👩🏿‍❤️‍💋‍👩🏾", "👩🏿‍❤️‍💋‍👩🏿", "💑", "💑🏻", "💑🏼", "💑🏽", "💑🏾", "💑🏿", "🧑🏻‍❤️‍🧑🏼", "🧑🏻‍❤️‍🧑🏽", "🧑🏻‍❤️‍🧑🏾", "🧑🏻‍❤️‍🧑🏿", "🧑🏼‍❤️‍🧑🏻", "🧑🏼‍❤️‍🧑🏽", "🧑🏼‍❤️‍🧑🏾", "🧑🏼‍❤️‍🧑🏿", "🧑🏽‍❤️‍🧑🏻", "🧑🏽‍❤️‍🧑🏼", "🧑🏽‍❤️‍🧑🏾", "🧑🏽‍❤️‍🧑🏿", "🧑🏾‍❤️‍🧑🏻", "🧑🏾‍❤️‍🧑🏼", "🧑🏾‍❤️‍🧑🏽", "🧑🏾‍❤️‍🧑🏿", "🧑🏿‍❤️‍🧑🏻", "🧑🏿‍❤️‍🧑🏼", "🧑🏿‍❤️‍🧑🏽", "🧑🏿‍❤️‍🧑🏾", "👩‍❤️‍👨", "👩🏻‍❤️‍👨🏻", "👩🏻‍❤️‍👨🏼", "👩🏻‍❤️‍👨🏽", "👩🏻‍❤️‍👨🏾", "👩🏻‍❤️‍👨🏿", "👩🏼‍❤️‍👨🏻", "👩🏼‍❤️‍👨🏼", "👩🏼‍❤️‍👨🏽", "👩🏼‍❤️‍👨🏾", "👩🏼‍❤️‍👨🏿", "👩🏽‍❤️‍👨🏻", "👩🏽‍❤️‍👨🏼", "👩🏽‍❤️‍👨🏽", "👩🏽‍❤️‍👨🏾", "👩🏽‍❤️‍👨🏿", "👩🏾‍❤️‍👨🏻", "👩🏾‍❤️‍👨🏼", "👩🏾‍❤️‍👨🏽", "👩🏾‍❤️‍👨🏾", "👩🏾‍❤️‍👨🏿", "👩🏿‍❤️‍👨🏻", "👩🏿‍❤️‍👨🏼", "👩🏿‍❤️‍👨🏽", "👩🏿‍❤️‍👨🏾", "👩🏿‍❤️‍👨🏿", "👨‍❤️‍👨", "👨🏻‍❤️‍👨🏻", "👨🏻‍❤️‍👨🏼", "👨🏻‍❤️‍👨🏽", "👨🏻‍❤️‍👨🏾", "👨🏻‍❤️‍👨🏿", "👨🏼‍❤️‍👨🏻", "👨🏼‍❤️‍👨🏼", "👨🏼‍❤️‍👨🏽", "👨🏼‍❤️‍👨🏾", "👨🏼‍❤️‍👨🏿", "👨🏽‍❤️‍👨🏻", "👨🏽‍❤️‍👨🏼", "👨🏽‍❤️‍👨🏽", "👨🏽‍❤️‍👨🏾", "👨🏽‍❤️‍👨🏿", "👨🏾‍❤️‍👨🏻", "👨🏾‍❤️‍👨🏼", "👨🏾‍❤️‍👨🏽", "👨🏾‍❤️‍👨🏾", "👨🏾‍❤️‍👨🏿", "👨🏿‍❤️‍👨🏻", "👨🏿‍❤️‍👨🏼", "👨🏿‍❤️‍👨🏽", "👨🏿‍❤️‍👨🏾", "👨🏿‍❤️‍👨🏿", "👩‍❤️‍👩", "👩🏻‍❤️‍👩🏻", "👩🏻‍❤️‍👩🏼", "👩🏻‍❤️‍👩🏽", "👩🏻‍❤️‍👩🏾", "👩🏻‍❤️‍👩🏿", "👩🏼‍❤️‍👩🏻", "👩🏼‍❤️‍👩🏼", "👩🏼‍❤️‍👩🏽", "👩🏼‍❤️‍👩🏾", "👩🏼‍❤️‍👩🏿", "👩🏽‍❤️‍👩🏻", "👩🏽‍❤️‍👩🏼", "👩🏽‍❤️‍👩🏽", "👩🏽‍❤️‍👩🏾", "👩🏽‍❤️‍👩🏿", "👩🏾‍❤️‍👩🏻", "👩🏾‍❤️‍👩🏼", "👩🏾‍❤️‍👩🏽", "👩🏾‍❤️‍👩🏾", "👩🏾‍❤️‍👩🏿", "👩🏿‍❤️‍👩🏻", "👩🏿‍❤️‍👩🏼", "👩🏿‍❤️‍👩🏽", "👩🏿‍❤️‍👩🏾", "👩🏿‍❤️‍👩🏿", "👪", "👨‍👩‍👦", "👨‍👩‍👧", "👨‍👩‍👧‍👦", "👨‍👩‍👦‍👦", "👨‍👩‍👧‍👧", "👨‍👨‍👦", "👨‍👨‍👧", "👨‍👨‍👧‍👦", "👨‍👨‍👦‍👦", "👨‍👨‍👧‍👧", "👩‍👩‍👦", "👩‍👩‍👧", "👩‍👩‍👧‍👦", "👩‍👩‍👦‍👦", "👩‍👩‍👧‍👧", "👨‍👦", "👨‍👦‍👦", "👨‍👧", "👨‍👧‍👦", "👨‍👧‍👧", "👩‍👦", "👩‍👦‍👦", "👩‍👧", "👩‍👧‍👦", "👩‍👧‍👧", "🗣️", "👤", "👥", "🫂", "👣"], nature: ["🐵", "🐒", "🦍", "🦧", "🐶", "🐕", "🦮", "🐕‍🦺", "🐩", "🐺", "🦊", "🦝", "🐱", "🐈", "🐈‍⬛", "🦁", "🐯", "🐅", "🐆", "🐴", "🐎", "🦄", "🦓", "🦌", "🦬", "🐮", "🐂", "🐃", "🐄", "🐷", "🐖", "🐗", "🐽", "🐏", "🐑", "🐐", "🐪", "🐫", "🦙", "🦒", "🐘", "🦣", "🦏", "🦛", "🐭", "🐁", "🐀", "🐹", "🐰", "🐇", "🐿️", "🦫", "🦔", "🦇", "🐻", "🐻‍❄️", "🐨", "🐼", "🦥", "🦦", "🦨", "🦘", "🦡", "🐾", "🦃", "🐔", "🐓", "🐣", "🐤", "🐥", "🐦", "🐧", "🕊️", "🦅", "🦆", "🦢", "🦉", "🦤", "🪶", "🦩", "🦚", "🦜", "🐸", "🐊", "🐢", "🦎", "🐍", "🐲", "🐉", "🦕", "🦖", "🐳", "🐋", "🐬", "🦭", "🐟", "🐠", "🐡", "🦈", "🐙", "🐚", "🐌", "🦋", "🐛", "🐜", "🐝", "🪲", "🐞", "🦗", "🪳", "🕷️", "🕸️", "🦂", "🦟", "🪰", "🪱", "🦠", "💐", "🌸", "💮", "🏵️", "🌹", "🥀", "🌺", "🌻", "🌼", "🌷", "🌱", "🪴", "🌲", "🌳", "🌴", "🌵", "🌾", "🌿", "☘️", "🍀", "🍁", "🍂", "🍃"], food: ["🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🥭", "🍎", "🍏", "🍐", "🍑", "🍒", "🍓", "🫐", "🥝", "🍅", "🫒", "🥥", "🥑", "🍆", "🥔", "🥕", "🌽", "🌶️", "🫑", "🥒", "🥬", "🥦", "🧄", "🧅", "🍄", "🥜", "🌰", "🍞", "🥐", "🥖", "🫓", "🥨", "🥯", "🥞", "🧇", "🧀", "🍖", "🍗", "🥩", "🥓", "🍔", "🍟", "🍕", "🌭", "🥪", "🌮", "🌯", "🫔", "🥙", "🧆", "🥚", "🍳", "🥘", "🍲", "🫕", "🥣", "🥗", "🍿", "🧈", "🧂", "🥫", "🍱", "🍘", "🍙", "🍚", "🍛", "🍜", "🍝", "🍠", "🍢", "🍣", "🍤", "🍥", "🥮", "🍡", "🥟", "🥠", "🥡", "🦀", "🦞", "🦐", "🦑", "🦪", "🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🧁", "🥧", "🍫", "🍬", "🍭", "🍮", "🍯", "🍼", "🥛", "☕", "🫖", "🍵", "🍶", "🍾", "🍷", "🍸", "🍹", "🍺", "🍻", "🥂", "🥃", "🥤", "🧋", "🧃", "🧉", "🧊", "🥢", "🍽️", "🍴", "🥄", "🔪", "🏺"], travel: ["🌍", "🌎", "🌏", "🌐", "🗺️", "🗾", "🧭", "🏔️", "⛰️", "🌋", "🗻", "🏕️", "🏖️", "🏜️", "🏝️", "🏞️", "🏟️", "🏛️", "🏗️", "🧱", "🪨", "🪵", "🛖", "🏘️", "🏚️", "🏠", "🏡", "🏢", "🏣", "🏤", "🏥", "🏦", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏯", "🏰", "💒", "🗼", "🗽", "⛪", "🕌", "🛕", "🕍", "⛩️", "🕋", "⛲", "⛺", "🌁", "🌃", "🏙️", "🌄", "🌅", "🌆", "🌇", "🌉", "♨️", "🎠", "🎡", "🎢", "💈", "🎪", "🚂", "🚃", "🚄", "🚅", "🚆", "🚇", "🚈", "🚉", "🚊", "🚝", "🚞", "🚋", "🚌", "🚍", "🚎", "🚐", "🚑", "🚒", "🚓", "🚔", "🚕", "🚖", "🚗", "🚘", "🚙", "🛻", "🚚", "🚛", "🚜", "🏎️", "🏍️", "🛵", "🦽", "🦼", "🛺", "🚲", "🛴", "🛹", "🛼", "🚏", "🛣️", "🛤️", "🛢️", "⛽", "🚨", "🚥", "🚦", "🛑", "🚧", "⚓", "⛵", "🛶", "🚤", "🛳️", "⛴️", "🛥️", "🚢", "✈️", "🛩️", "🛫", "🛬", "🪂", "💺", "🚁", "🚟", "🚠", "🚡", "🛰️", "🚀", "🛸", "🛎️", "🧳", "⌛", "⏳", "⌚", "⏰", "⏱️", "⏲️", "🕰️", "🕛", "🕧", "🕐", "🕜", "🕑", "🕝", "🕒", "🕞", "🕓", "🕟", "🕔", "🕠", "🕕", "🕡", "🕖", "🕢", "🕗", "🕣", "🕘", "🕤", "🕙", "🕥", "🕚", "🕦", "🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘", "🌙", "🌚", "🌛", "🌜", "🌡️", "☀️", "🌝", "🌞", "🪐", "⭐", "🌟", "🌠", "🌌", "☁️", "⛅", "⛈️", "🌤️", "🌥️", "🌦️", "🌧️", "🌨️", "🌩️", "🌪️", "🌫️", "🌬️", "🌀", "🌈", "🌂", "☂️", "☔", "⛱️", "⚡", "❄️", "☃️", "⛄", "☄️", "🔥", "💧", "🌊"], activity: ["🎃", "🎄", "🎆", "🎇", "🧨", "✨", "🎈", "🎉", "🎊", "🎋", "🎍", "🎎", "🎏", "🎐", "🎑", "🧧", "🎀", "🎁", "🎗️", "🎟️", "🎫", "🎖️", "🏆", "🏅", "🥇", "🥈", "🥉", "⚽", "⚾", "🥎", "🏀", "🏐", "🏈", "🏉", "🎾", "🥏", "🎳", "🏏", "🏑", "🏒", "🥍", "🏓", "🏸", "🥊", "🥋", "🥅", "⛳", "⛸️", "🎣", "🤿", "🎽", "🎿", "🛷", "🥌", "🎯", "🪀", "🪁", "🎱", "🔮", "🪄", "🧿", "🎮", "🕹️", "🎰", "🎲", "🧩", "🧸", "🪅", "🪆", "♠️", "♥️", "♦️", "♣️", "♟️", "🃏", "🀄", "🎴", "🎭", "🖼️", "🎨", "🧵", "🪡", "🧶", "🪢"], object: ["👓", "🕶️", "🥽", "🥼", "🦺", "👔", "👕", "👖", "🧣", "🧤", "🧥", "🧦", "👗", "👘", "🥻", "🩱", "🩲", "🩳", "👙", "👚", "👛", "👜", "👝", "🛍️", "🎒", "🩴", "👞", "👟", "🥾", "🥿", "👠", "👡", "🩰", "👢", "👑", "👒", "🎩", "🎓", "🧢", "🪖", "⛑️", "📿", "💄", "💍", "💎", "🔇", "🔈", "🔉", "🔊", "📢", "📣", "📯", "🔔", "🔕", "🎼", "🎵", "🎶", "🎙️", "🎚️", "🎛️", "🎤", "🎧", "📻", "🎷", "🪗", "🎸", "🎹", "🎺", "🎻", "🪕", "🥁", "🪘", "📱", "📲", "☎️", "📞", "📟", "📠", "🔋", "🔌", "💻", "🖥️", "🖨️", "⌨️", "🖱️", "🖲️", "💽", "💾", "💿", "📀", "🧮", "🎥", "🎞️", "📽️", "🎬", "📺", "📷", "📸", "📹", "📼", "🔍", "🔎", "🕯️", "💡", "🔦", "🏮", "🪔", "📔", "📕", "📖", "📗", "📘", "📙", "📚", "📓", "📒", "📃", "📜", "📄", "📰", "🗞️", "📑", "🔖", "🏷️", "💰", "🪙", "💴", "💵", "💶", "💷", "💸", "💳", "🧾", "💹", "✉️", "📧", "📨", "📩", "📤", "📥", "📦", "📫", "📪", "📬", "📭", "📮", "🗳️", "✏️", "✒️", "🖋️", "🖊️", "🖌️", "🖍️", "📝", "💼", "📁", "📂", "🗂️", "📅", "📆", "🗒️", "🗓️", "📇", "📈", "📉", "📊", "📋", "📌", "📍", "📎", "🖇️", "📏", "📐", "✂️", "🗃️", "🗄️", "🗑️", "🔒", "🔓", "🔏", "🔐", "🔑", "🗝️", "🔨", "🪓", "⛏️", "⚒️", "🛠️", "🗡️", "⚔️", "🔫", "🪃", "🏹", "🛡️", "🪚", "🔧", "🪛", "🔩", "⚙️", "🗜️", "⚖️", "🦯", "🔗", "⛓️", "🪝", "🧰", "🧲", "🪜", "⚗️", "🧪", "🧫", "🧬", "🔬", "🔭", "📡", "💉", "🩸", "💊", "🩹", "🩺", "🚪", "🛗", "🪞", "🪟", "🛏️", "🛋️", "🪑", "🚽", "🪠", "🚿", "🛁", "🪤", "🪒", "🧴", "🧷", "🧹", "🧺", "🧻", "🪣", "🧼", "🪥", "🧽", "🧯", "🛒", "🚬", "⚰️", "🪦", "⚱️", "🗿", "🪧"], symbol: ["🏧", "🚮", "🚰", "♿", "🚹", "🚺", "🚻", "🚼", "🚾", "🛂", "🛃", "🛄", "🛅", "⚠️", "🚸", "⛔", "🚫", "🚳", "🚭", "🚯", "🚱", "🚷", "📵", "🔞", "☢️", "☣️", "⬆️", "↗️", "➡️", "↘️", "⬇️", "↙️", "⬅️", "↖️", "↕️", "↔️", "↩️", "↪️", "⤴️", "⤵️", "🔃", "🔄", "🔙", "🔚", "🔛", "🔜", "🔝", "🛐", "⚛️", "🕉️", "✡️", "☸️", "☯️", "✝️", "☦️", "☪️", "☮️", "🕎", "🔯", "♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓", "⛎", "🔀", "🔁", "🔂", "▶️", "⏩", "⏭️", "⏯️", "◀️", "⏪", "⏮️", "🔼", "⏫", "🔽", "⏬", "⏸️", "⏹️", "⏺️", "⏏️", "🎦", "🔅", "🔆", "📶", "📳", "📴", "♀️", "♂️", "⚧️", "✖️", "➕", "➖", "➗", "♾️", "‼️", "⁉️", "❓", "❔", "❕", "❗", "〰️", "💱", "💲", "⚕️", "♻️", "⚜️", "🔱", "📛", "🔰", "⭕", "✅", "☑️", "✔️", "❌", "❎", "➰", "➿", "〽️", "✳️", "✴️", "❇️", "©️", "®️", "™️", "#️⃣", "*️⃣", "0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟", "🔠", "🔡", "🔢", "🔣", "🔤", "🅰️", "🆎", "🅱️", "🆑", "🆒", "🆓", "ℹ️", "🆔", "Ⓜ️", "🆕", "🆖", "🅾️", "🆗", "🅿️", "🆘", "🆙", "🆚", "🈁", "🈂️", "🈷️", "🈶", "🈯", "🉐", "🈹", "🈚", "🈲", "🉑", "🈸", "🈴", "🈳", "㊗️", "㊙️", "🈺", "🈵", "🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "🟤", "⚫", "⚪", "🟥", "🟧", "🟨", "🟩", "🟦", "🟪", "🟫", "⬛", "⬜", "◼️", "◻️", "◾", "◽", "▪️", "▫️", "🔶", "🔷", "🔸", "🔹", "🔺", "🔻", "💠", "🔘", "🔳", "🔲"], flag: ["🏁", "🚩", "🎌", "🏴", "🏳️", "🏳️‍🌈", "🏳️‍⚧️", "🏴‍☠️", "🇦🇨", "🇦🇩", "🇦🇪", "🇦🇫", "🇦🇬", "🇦🇮", "🇦🇱", "🇦🇲", "🇦🇴", "🇦🇶", "🇦🇷", "🇦🇸", "🇦🇹", "🇦🇺", "🇦🇼", "🇦🇽", "🇦🇿", "🇧🇦", "🇧🇧", "🇧🇩", "🇧🇪", "🇧🇫", "🇧🇬", "🇧🇭", "🇧🇮", "🇧🇯", "🇧🇱", "🇧🇲", "🇧🇳", "🇧🇴", "🇧🇶", "🇧🇷", "🇧🇸", "🇧🇹", "🇧🇻", "🇧🇼", "🇧🇾", "🇧🇿", "🇨🇦", "🇨🇨", "🇨🇩", "🇨🇫", "🇨🇬", "🇨🇭", "🇨🇮", "🇨🇰", "🇨🇱", "🇨🇲", "🇨🇳", "🇨🇴", "🇨🇵", "🇨🇷", "🇨🇺", "🇨🇻", "🇨🇼", "🇨🇽", "🇨🇾", "🇨🇿", "🇩🇪", "🇩🇬", "🇩🇯", "🇩🇰", "🇩🇲", "🇩🇴", "🇩🇿", "🇪🇦", "🇪🇨", "🇪🇪", "🇪🇬", "🇪🇭", "🇪🇷", "🇪🇸", "🇪🇹", "🇪🇺", "🇫🇮", "🇫🇯", "🇫🇰", "🇫🇲", "🇫🇴", "🇫🇷", "🇬🇦", "🇬🇧", "🇬🇩", "🇬🇪", "🇬🇫", "🇬🇬", "🇬🇭", "🇬🇮", "🇬🇱", "🇬🇲", "🇬🇳", "🇬🇵", "🇬🇶", "🇬🇷", "🇬🇸", "🇬🇹", "🇬🇺", "🇬🇼", "🇬🇾", "🇭🇰", "🇭🇲", "🇭🇳", "🇭🇷", "🇭🇹", "🇭🇺", "🇮🇨", "🇮🇩", "🇮🇪", "🇮🇱", "🇮🇲", "🇮🇳", "🇮🇴", "🇮🇶", "🇮🇷", "🇮🇸", "🇮🇹", "🇯🇪", "🇯🇲", "🇯🇴", "🇯🇵", "🇰🇪", "🇰🇬", "🇰🇭", "🇰🇮", "🇰🇲", "🇰🇳", "🇰🇵", "🇰🇷", "🇰🇼", "🇰🇾", "🇰🇿", "🇱🇦", "🇱🇧", "🇱🇨", "🇱🇮", "🇱🇰", "🇱🇷", "🇱🇸", "🇱🇹", "🇱🇺", "🇱🇻", "🇱🇾", "🇲🇦", "🇲🇨", "🇲🇩", "🇲🇪", "🇲🇫", "🇲🇬", "🇲🇭", "🇲🇰", "🇲🇱", "🇲🇲", "🇲🇳", "🇲🇴", "🇲🇵", "🇲🇶", "🇲🇷", "🇲🇸", "🇲🇹", "🇲🇺", "🇲🇻", "🇲🇼", "🇲🇽", "🇲🇾", "🇲🇿", "🇳🇦", "🇳🇨", "🇳🇪", "🇳🇫", "🇳🇬", "🇳🇮", "🇳🇱", "🇳🇴", "🇳🇵", "🇳🇷", "🇳🇺", "🇳🇿", "🇴🇲", "🇵🇦", "🇵🇪", "🇵🇫", "🇵🇬", "🇵🇭", "🇵🇰", "🇵🇱", "🇵🇲", "🇵🇳", "🇵🇷", "🇵🇸", "🇵🇹", "🇵🇼", "🇵🇾", "🇶🇦", "🇷🇪", "🇷🇴", "🇷🇸", "🇷🇺", "🇷🇼", "🇸🇦", "🇸🇧", "🇸🇨", "🇸🇩", "🇸🇪", "🇸🇬", "🇸🇭", "🇸🇮", "🇸🇯", "🇸🇰", "🇸🇱", "🇸🇲", "🇸🇳", "🇸🇴", "🇸🇷", "🇸🇸", "🇸🇹", "🇸🇻", "🇸🇽", "🇸🇾", "🇸🇿", "🇹🇦", "🇹🇨", "🇹🇩", "🇹🇫", "🇹🇬", "🇹🇭", "🇹🇯", "🇹🇰", "🇹🇱", "🇹🇲", "🇹🇳", "🇹🇴", "🇹🇷", "🇹🇹", "🇹🇻", "🇹🇼", "🇹🇿", "🇺🇦", "🇺🇬", "🇺🇲", "🇺🇳", "🇺🇸", "🇺🇾", "🇺🇿", "🇻🇦", "🇻🇨", "🇻🇪", "🇻🇬", "🇻🇮", "🇻🇳", "🇻🇺", "🇼🇫", "🇼🇸", "🇽🇰", "🇾🇪", "🇾🇹", "🇿🇦", "🇿🇲", "🇿🇼"] }, wo = { informational: [100, 101, 102, 103], success: [200, 201, 202, 203, 204, 205, 206, 207, 208, 226], redirection: [300, 301, 302, 303, 304, 305, 306, 307, 308], clientError: [400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 425, 426, 428, 429, 431, 451], serverError: [500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511] }, Mo = ["HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "PS256", "PS384", "PS512", "none"], To = { emoji: vo, http_status_code: wo, jwt_algorithm: Mo }, Lo = To, Ro = [{ alpha2: "AD", alpha3: "AND", numeric: "020" }, { alpha2: "AE", alpha3: "ARE", numeric: "784" }, { alpha2: "AF", alpha3: "AFG", numeric: "004" }, { alpha2: "AG", alpha3: "ATG", numeric: "028" }, { alpha2: "AI", alpha3: "AIA", numeric: "660" }, { alpha2: "AL", alpha3: "ALB", numeric: "008" }, { alpha2: "AM", alpha3: "ARM", numeric: "051" }, { alpha2: "AO", alpha3: "AGO", numeric: "024" }, { alpha2: "AQ", alpha3: "ATA", numeric: "010" }, { alpha2: "AR", alpha3: "ARG", numeric: "032" }, { alpha2: "AS", alpha3: "ASM", numeric: "016" }, { alpha2: "AT", alpha3: "AUT", numeric: "040" }, { alpha2: "AU", alpha3: "AUS", numeric: "036" }, { alpha2: "AW", alpha3: "ABW", numeric: "533" }, { alpha2: "AX", alpha3: "ALA", numeric: "248" }, { alpha2: "AZ", alpha3: "AZE", numeric: "031" }, { alpha2: "BA", alpha3: "BIH", numeric: "070" }, { alpha2: "BB", alpha3: "BRB", numeric: "052" }, { alpha2: "BD", alpha3: "BGD", numeric: "050" }, { alpha2: "BE", alpha3: "BEL", numeric: "056" }, { alpha2: "BF", alpha3: "BFA", numeric: "854" }, { alpha2: "BG", alpha3: "BGR", numeric: "100" }, { alpha2: "BH", alpha3: "BHR", numeric: "048" }, { alpha2: "BI", alpha3: "BDI", numeric: "108" }, { alpha2: "BJ", alpha3: "BEN", numeric: "204" }, { alpha2: "BL", alpha3: "BLM", numeric: "652" }, { alpha2: "BM", alpha3: "BMU", numeric: "060" }, { alpha2: "BN", alpha3: "BRN", numeric: "096" }, { alpha2: "BO", alpha3: "BOL", numeric: "068" }, { alpha2: "BQ", alpha3: "BES", numeric: "535" }, { alpha2: "BR", alpha3: "BRA", numeric: "076" }, { alpha2: "BS", alpha3: "BHS", numeric: "044" }, { alpha2: "BT", alpha3: "BTN", numeric: "064" }, { alpha2: "BV", alpha3: "BVT", numeric: "074" }, { alpha2: "BW", alpha3: "BWA", numeric: "072" }, { alpha2: "BY", alpha3: "BLR", numeric: "112" }, { alpha2: "BZ", alpha3: "BLZ", numeric: "084" }, { alpha2: "CA", alpha3: "CAN", numeric: "124" }, { alpha2: "CC", alpha3: "CCK", numeric: "166" }, { alpha2: "CD", alpha3: "COD", numeric: "180" }, { alpha2: "CF", alpha3: "CAF", numeric: "140" }, { alpha2: "CG", alpha3: "COG", numeric: "178" }, { alpha2: "CH", alpha3: "CHE", numeric: "756" }, { alpha2: "CI", alpha3: "CIV", numeric: "384" }, { alpha2: "CK", alpha3: "COK", numeric: "184" }, { alpha2: "CL", alpha3: "CHL", numeric: "152" }, { alpha2: "CM", alpha3: "CMR", numeric: "120" }, { alpha2: "CN", alpha3: "CHN", numeric: "156" }, { alpha2: "CO", alpha3: "COL", numeric: "170" }, { alpha2: "CR", alpha3: "CRI", numeric: "188" }, { alpha2: "CU", alpha3: "CUB", numeric: "192" }, { alpha2: "CV", alpha3: "CPV", numeric: "132" }, { alpha2: "CW", alpha3: "CUW", numeric: "531" }, { alpha2: "CX", alpha3: "CXR", numeric: "162" }, { alpha2: "CY", alpha3: "CYP", numeric: "196" }, { alpha2: "CZ", alpha3: "CZE", numeric: "203" }, { alpha2: "DE", alpha3: "DEU", numeric: "276" }, { alpha2: "DJ", alpha3: "DJI", numeric: "262" }, { alpha2: "DK", alpha3: "DNK", numeric: "208" }, { alpha2: "DM", alpha3: "DMA", numeric: "212" }, { alpha2: "DO", alpha3: "DOM", numeric: "214" }, { alpha2: "DZ", alpha3: "DZA", numeric: "012" }, { alpha2: "EC", alpha3: "ECU", numeric: "218" }, { alpha2: "EE", alpha3: "EST", numeric: "233" }, { alpha2: "EG", alpha3: "EGY", numeric: "818" }, { alpha2: "EH", alpha3: "ESH", numeric: "732" }, { alpha2: "ER", alpha3: "ERI", numeric: "232" }, { alpha2: "ES", alpha3: "ESP", numeric: "724" }, { alpha2: "ET", alpha3: "ETH", numeric: "231" }, { alpha2: "FI", alpha3: "FIN", numeric: "246" }, { alpha2: "FJ", alpha3: "FJI", numeric: "242" }, { alpha2: "FK", alpha3: "FLK", numeric: "238" }, { alpha2: "FM", alpha3: "FSM", numeric: "583" }, { alpha2: "FO", alpha3: "FRO", numeric: "234" }, { alpha2: "FR", alpha3: "FRA", numeric: "250" }, { alpha2: "GA", alpha3: "GAB", numeric: "266" }, { alpha2: "GB", alpha3: "GBR", numeric: "826" }, { alpha2: "GD", alpha3: "GRD", numeric: "308" }, { alpha2: "GE", alpha3: "GEO", numeric: "268" }, { alpha2: "GF", alpha3: "GUF", numeric: "254" }, { alpha2: "GG", alpha3: "GGY", numeric: "831" }, { alpha2: "GH", alpha3: "GHA", numeric: "288" }, { alpha2: "GI", alpha3: "GIB", numeric: "292" }, { alpha2: "GL", alpha3: "GRL", numeric: "304" }, { alpha2: "GM", alpha3: "GMB", numeric: "270" }, { alpha2: "GN", alpha3: "GIN", numeric: "324" }, { alpha2: "GP", alpha3: "GLP", numeric: "312" }, { alpha2: "GQ", alpha3: "GNQ", numeric: "226" }, { alpha2: "GR", alpha3: "GRC", numeric: "300" }, { alpha2: "GS", alpha3: "SGS", numeric: "239" }, { alpha2: "GT", alpha3: "GTM", numeric: "320" }, { alpha2: "GU", alpha3: "GUM", numeric: "316" }, { alpha2: "GW", alpha3: "GNB", numeric: "624" }, { alpha2: "GY", alpha3: "GUY", numeric: "328" }, { alpha2: "HK", alpha3: "HKG", numeric: "344" }, { alpha2: "HM", alpha3: "HMD", numeric: "334" }, { alpha2: "HN", alpha3: "HND", numeric: "340" }, { alpha2: "HR", alpha3: "HRV", numeric: "191" }, { alpha2: "HT", alpha3: "HTI", numeric: "332" }, { alpha2: "HU", alpha3: "HUN", numeric: "348" }, { alpha2: "ID", alpha3: "IDN", numeric: "360" }, { alpha2: "IE", alpha3: "IRL", numeric: "372" }, { alpha2: "IL", alpha3: "ISR", numeric: "376" }, { alpha2: "IM", alpha3: "IMN", numeric: "833" }, { alpha2: "IN", alpha3: "IND", numeric: "356" }, { alpha2: "IO", alpha3: "IOT", numeric: "086" }, { alpha2: "IQ", alpha3: "IRQ", numeric: "368" }, { alpha2: "IR", alpha3: "IRN", numeric: "364" }, { alpha2: "IS", alpha3: "ISL", numeric: "352" }, { alpha2: "IT", alpha3: "ITA", numeric: "380" }, { alpha2: "JE", alpha3: "JEY", numeric: "832" }, { alpha2: "JM", alpha3: "JAM", numeric: "388" }, { alpha2: "JO", alpha3: "JOR", numeric: "400" }, { alpha2: "JP", alpha3: "JPN", numeric: "392" }, { alpha2: "KE", alpha3: "KEN", numeric: "404" }, { alpha2: "KG", alpha3: "KGZ", numeric: "417" }, { alpha2: "KH", alpha3: "KHM", numeric: "116" }, { alpha2: "KI", alpha3: "KIR", numeric: "296" }, { alpha2: "KM", alpha3: "COM", numeric: "174" }, { alpha2: "KN", alpha3: "KNA", numeric: "659" }, { alpha2: "KP", alpha3: "PRK", numeric: "408" }, { alpha2: "KR", alpha3: "KOR", numeric: "410" }, { alpha2: "KW", alpha3: "KWT", numeric: "414" }, { alpha2: "KY", alpha3: "CYM", numeric: "136" }, { alpha2: "KZ", alpha3: "KAZ", numeric: "398" }, { alpha2: "LA", alpha3: "LAO", numeric: "418" }, { alpha2: "LB", alpha3: "LBN", numeric: "422" }, { alpha2: "LC", alpha3: "LCA", numeric: "662" }, { alpha2: "LI", alpha3: "LIE", numeric: "438" }, { alpha2: "LK", alpha3: "LKA", numeric: "144" }, { alpha2: "LR", alpha3: "LBR", numeric: "430" }, { alpha2: "LS", alpha3: "LSO", numeric: "426" }, { alpha2: "LT", alpha3: "LTU", numeric: "440" }, { alpha2: "LU", alpha3: "LUX", numeric: "442" }, { alpha2: "LV", alpha3: "LVA", numeric: "428" }, { alpha2: "LY", alpha3: "LBY", numeric: "434" }, { alpha2: "MA", alpha3: "MAR", numeric: "504" }, { alpha2: "MC", alpha3: "MCO", numeric: "492" }, { alpha2: "MD", alpha3: "MDA", numeric: "498" }, { alpha2: "ME", alpha3: "MNE", numeric: "499" }, { alpha2: "MF", alpha3: "MAF", numeric: "663" }, { alpha2: "MG", alpha3: "MDG", numeric: "450" }, { alpha2: "MH", alpha3: "MHL", numeric: "584" }, { alpha2: "MK", alpha3: "MKD", numeric: "807" }, { alpha2: "ML", alpha3: "MLI", numeric: "466" }, { alpha2: "MM", alpha3: "MMR", numeric: "104" }, { alpha2: "MN", alpha3: "MNG", numeric: "496" }, { alpha2: "MO", alpha3: "MAC", numeric: "446" }, { alpha2: "MP", alpha3: "MNP", numeric: "580" }, { alpha2: "MQ", alpha3: "MTQ", numeric: "474" }, { alpha2: "MR", alpha3: "MRT", numeric: "478" }, { alpha2: "MS", alpha3: "MSR", numeric: "500" }, { alpha2: "MT", alpha3: "MLT", numeric: "470" }, { alpha2: "MU", alpha3: "MUS", numeric: "480" }, { alpha2: "MV", alpha3: "MDV", numeric: "462" }, { alpha2: "MW", alpha3: "MWI", numeric: "454" }, { alpha2: "MX", alpha3: "MEX", numeric: "484" }, { alpha2: "MY", alpha3: "MYS", numeric: "458" }, { alpha2: "MZ", alpha3: "MOZ", numeric: "508" }, { alpha2: "NA", alpha3: "NAM", numeric: "516" }, { alpha2: "NC", alpha3: "NCL", numeric: "540" }, { alpha2: "NE", alpha3: "NER", numeric: "562" }, { alpha2: "NF", alpha3: "NFK", numeric: "574" }, { alpha2: "NG", alpha3: "NGA", numeric: "566" }, { alpha2: "NI", alpha3: "NIC", numeric: "558" }, { alpha2: "NL", alpha3: "NLD", numeric: "528" }, { alpha2: "NO", alpha3: "NOR", numeric: "578" }, { alpha2: "NP", alpha3: "NPL", numeric: "524" }, { alpha2: "NR", alpha3: "NRU", numeric: "520" }, { alpha2: "NU", alpha3: "NIU", numeric: "570" }, { alpha2: "NZ", alpha3: "NZL", numeric: "554" }, { alpha2: "OM", alpha3: "OMN", numeric: "512" }, { alpha2: "PA", alpha3: "PAN", numeric: "591" }, { alpha2: "PE", alpha3: "PER", numeric: "604" }, { alpha2: "PF", alpha3: "PYF", numeric: "258" }, { alpha2: "PG", alpha3: "PNG", numeric: "598" }, { alpha2: "PH", alpha3: "PHL", numeric: "608" }, { alpha2: "PK", alpha3: "PAK", numeric: "586" }, { alpha2: "PL", alpha3: "POL", numeric: "616" }, { alpha2: "PM", alpha3: "SPM", numeric: "666" }, { alpha2: "PN", alpha3: "PCN", numeric: "612" }, { alpha2: "PR", alpha3: "PRI", numeric: "630" }, { alpha2: "PS", alpha3: "PSE", numeric: "275" }, { alpha2: "PT", alpha3: "PRT", numeric: "620" }, { alpha2: "PW", alpha3: "PLW", numeric: "585" }, { alpha2: "PY", alpha3: "PRY", numeric: "600" }, { alpha2: "QA", alpha3: "QAT", numeric: "634" }, { alpha2: "RE", alpha3: "REU", numeric: "638" }, { alpha2: "RO", alpha3: "ROU", numeric: "642" }, { alpha2: "RS", alpha3: "SRB", numeric: "688" }, { alpha2: "RU", alpha3: "RUS", numeric: "643" }, { alpha2: "RW", alpha3: "RWA", numeric: "646" }, { alpha2: "SA", alpha3: "SAU", numeric: "682" }, { alpha2: "SB", alpha3: "SLB", numeric: "090" }, { alpha2: "SC", alpha3: "SYC", numeric: "690" }, { alpha2: "SD", alpha3: "SDN", numeric: "729" }, { alpha2: "SE", alpha3: "SWE", numeric: "752" }, { alpha2: "SG", alpha3: "SGP", numeric: "702" }, { alpha2: "SH", alpha3: "SHN", numeric: "654" }, { alpha2: "SI", alpha3: "SVN", numeric: "705" }, { alpha2: "SJ", alpha3: "SJM", numeric: "744" }, { alpha2: "SK", alpha3: "SVK", numeric: "703" }, { alpha2: "SL", alpha3: "SLE", numeric: "694" }, { alpha2: "SM", alpha3: "SMR", numeric: "674" }, { alpha2: "SN", alpha3: "SEN", numeric: "686" }, { alpha2: "SO", alpha3: "SOM", numeric: "706" }, { alpha2: "SR", alpha3: "SUR", numeric: "740" }, { alpha2: "SS", alpha3: "SSD", numeric: "728" }, { alpha2: "ST", alpha3: "STP", numeric: "678" }, { alpha2: "SV", alpha3: "SLV", numeric: "222" }, { alpha2: "SX", alpha3: "SXM", numeric: "534" }, { alpha2: "SY", alpha3: "SYR", numeric: "760" }, { alpha2: "SZ", alpha3: "SWZ", numeric: "748" }, { alpha2: "TC", alpha3: "TCA", numeric: "796" }, { alpha2: "TD", alpha3: "TCD", numeric: "148" }, { alpha2: "TF", alpha3: "ATF", numeric: "260" }, { alpha2: "TG", alpha3: "TGO", numeric: "768" }, { alpha2: "TH", alpha3: "THA", numeric: "764" }, { alpha2: "TJ", alpha3: "TJK", numeric: "762" }, { alpha2: "TK", alpha3: "TKL", numeric: "772" }, { alpha2: "TL", alpha3: "TLS", numeric: "626" }, { alpha2: "TM", alpha3: "TKM", numeric: "795" }, { alpha2: "TN", alpha3: "TUN", numeric: "788" }, { alpha2: "TO", alpha3: "TON", numeric: "776" }, { alpha2: "TR", alpha3: "TUR", numeric: "792" }, { alpha2: "TT", alpha3: "TTO", numeric: "780" }, { alpha2: "TV", alpha3: "TUV", numeric: "798" }, { alpha2: "TW", alpha3: "TWN", numeric: "158" }, { alpha2: "TZ", alpha3: "TZA", numeric: "834" }, { alpha2: "UA", alpha3: "UKR", numeric: "804" }, { alpha2: "UG", alpha3: "UGA", numeric: "800" }, { alpha2: "UM", alpha3: "UMI", numeric: "581" }, { alpha2: "US", alpha3: "USA", numeric: "840" }, { alpha2: "UY", alpha3: "URY", numeric: "858" }, { alpha2: "UZ", alpha3: "UZB", numeric: "860" }, { alpha2: "VA", alpha3: "VAT", numeric: "336" }, { alpha2: "VC", alpha3: "VCT", numeric: "670" }, { alpha2: "VE", alpha3: "VEN", numeric: "862" }, { alpha2: "VG", alpha3: "VGB", numeric: "092" }, { alpha2: "VI", alpha3: "VIR", numeric: "850" }, { alpha2: "VN", alpha3: "VNM", numeric: "704" }, { alpha2: "VU", alpha3: "VUT", numeric: "548" }, { alpha2: "WF", alpha3: "WLF", numeric: "876" }, { alpha2: "WS", alpha3: "WSM", numeric: "882" }, { alpha2: "YE", alpha3: "YEM", numeric: "887" }, { alpha2: "YT", alpha3: "MYT", numeric: "175" }, { alpha2: "ZA", alpha3: "ZAF", numeric: "710" }, { alpha2: "ZM", alpha3: "ZMB", numeric: "894" }, { alpha2: "ZW", alpha3: "ZWE", numeric: "716" }], Po = Za, Ho = { country_code: Ro, time_zone: Po }, Go = Ho, No = { title: "Base", code: "base" }, Wo = No, xo = ["/Applications", "/bin", "/boot", "/boot/defaults", "/dev", "/etc", "/etc/defaults", "/etc/mail", "/etc/namedb", "/etc/periodic", "/etc/ppp", "/home", "/home/user", "/home/user/dir", "/lib", "/Library", "/lost+found", "/media", "/mnt", "/net", "/Network", "/opt", "/opt/bin", "/opt/include", "/opt/lib", "/opt/sbin", "/opt/share", "/private", "/private/tmp", "/private/var", "/proc", "/rescue", "/root", "/sbin", "/selinux", "/srv", "/sys", "/System", "/tmp", "/Users", "/usr", "/usr/X11R6", "/usr/bin", "/usr/include", "/usr/lib", "/usr/libdata", "/usr/libexec", "/usr/local/bin", "/usr/local/src", "/usr/obj", "/usr/ports", "/usr/sbin", "/usr/share", "/usr/src", "/var", "/var/log", "/var/mail", "/var/spool", "/var/tmp", "/var/yp"], Io = { "application/epub+zip": { extensions: ["epub"] }, "application/gzip": { extensions: ["gz"] }, "application/java-archive": { extensions: ["jar", "war", "ear"] }, "application/json": { extensions: ["json", "map"] }, "application/ld+json": { extensions: ["jsonld"] }, "application/msword": { extensions: ["doc", "dot"] }, "application/octet-stream": { extensions: ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"] }, "application/ogg": { extensions: ["ogx"] }, "application/pdf": { extensions: ["pdf"] }, "application/rtf": { extensions: ["rtf"] }, "application/vnd.amazon.ebook": { extensions: ["azw"] }, "application/vnd.apple.installer+xml": { extensions: ["mpkg"] }, "application/vnd.mozilla.xul+xml": { extensions: ["xul"] }, "application/vnd.ms-excel": { extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"] }, "application/vnd.ms-fontobject": { extensions: ["eot"] }, "application/vnd.ms-powerpoint": { extensions: ["ppt", "pps", "pot"] }, "application/vnd.oasis.opendocument.presentation": { extensions: ["odp"] }, "application/vnd.oasis.opendocument.spreadsheet": { extensions: ["ods"] }, "application/vnd.oasis.opendocument.text": { extensions: ["odt"] }, "application/vnd.openxmlformats-officedocument.presentationml.presentation": { extensions: ["pptx"] }, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": { extensions: ["xlsx"] }, "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { extensions: ["docx"] }, "application/vnd.rar": { extensions: ["rar"] }, "application/vnd.visio": { extensions: ["vsd", "vst", "vss", "vsw"] }, "application/x-7z-compressed": { extensions: ["7z"] }, "application/x-abiword": { extensions: ["abw"] }, "application/x-bzip": { extensions: ["bz"] }, "application/x-bzip2": { extensions: ["bz2", "boz"] }, "application/x-csh": { extensions: ["csh"] }, "application/x-freearc": { extensions: ["arc"] }, "application/x-httpd-php": { extensions: ["php"] }, "application/x-sh": { extensions: ["sh"] }, "application/x-tar": { extensions: ["tar"] }, "application/xhtml+xml": { extensions: ["xhtml", "xht"] }, "application/xml": { extensions: ["xml", "xsl", "xsd", "rng"] }, "application/zip": { extensions: ["zip"] }, "audio/3gpp": { extensions: ["3gpp"] }, "audio/3gpp2": { extensions: ["3g2"] }, "audio/aac": { extensions: ["aac"] }, "audio/midi": { extensions: ["mid", "midi", "kar", "rmi"] }, "audio/mpeg": { extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"] }, "audio/ogg": { extensions: ["oga", "ogg", "spx", "opus"] }, "audio/opus": { extensions: ["opus"] }, "audio/wav": { extensions: ["wav"] }, "audio/webm": { extensions: ["weba"] }, "font/otf": { extensions: ["otf"] }, "font/ttf": { extensions: ["ttf"] }, "font/woff": { extensions: ["woff"] }, "font/woff2": { extensions: ["woff2"] }, "image/avif": { extensions: ["avif"] }, "image/bmp": { extensions: ["bmp"] }, "image/gif": { extensions: ["gif"] }, "image/jpeg": { extensions: ["jpeg", "jpg", "jpe"] }, "image/png": { extensions: ["png"] }, "image/svg+xml": { extensions: ["svg", "svgz"] }, "image/tiff": { extensions: ["tif", "tiff"] }, "image/vnd.microsoft.icon": { extensions: ["ico"] }, "image/webp": { extensions: ["webp"] }, "text/calendar": { extensions: ["ics", "ifb"] }, "text/css": { extensions: ["css"] }, "text/csv": { extensions: ["csv"] }, "text/html": { extensions: ["html", "htm", "shtml"] }, "text/javascript": { extensions: ["js", "mjs"] }, "text/plain": { extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"] }, "video/3gpp": { extensions: ["3gp", "3gpp"] }, "video/3gpp2": { extensions: ["3g2"] }, "video/mp2t": { extensions: ["ts"] }, "video/mp4": { extensions: ["mp4", "mp4v", "mpg4"] }, "video/mpeg": { extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"] }, "video/ogg": { extensions: ["ogv"] }, "video/webm": { extensions: ["webm"] }, "video/x-msvideo": { extensions: ["avi"] } }, Ko = { directory_path: xo, mime_type: Io }, Oo = Ko, Jo = { color: yo, database: Co, date: ko, hacker: So, internet: Lo, location: Go, metadata: Wo, system: Oo }, zo = Jo, Vo = new ho({ locale: [qu, zo] });
const jo = "@ecmaos/swapi", Yo = "0.1.2", $o = "EcmaOS Service Worker API", Uo = "Jay Mathis <code@mathis.network>", _o = "module", qo = { dev: "vite dev", build: "vite build", "install:kernel": "npm run build && cp dist/swapi.js ../kernel/public/" }, Zo = { "@ecmaos/config-typescript": "workspace:^", vite: "^6.0.1" }, Xo = { typescript: "^5.4.0" }, Qo = { "@faker-js/faker": "^9.1.0", hono: "^4.6.7" }, el = { access: "public" }, Ze = {
  name: jo,
  version: Yo,
  description: $o,
  author: Uo,
  type: _o,
  scripts: qo,
  devDependencies: Zo,
  peerDependencies: Xo,
  dependencies: Qo,
  publishConfig: el
}, Ke = /* @__PURE__ */ new Map(), Je = new vr().basePath("/swapi");
Je.get("/", (e) => e.json({ name: Ze.name, version: Ze.version }));
Je.get("/fake/:namespace/:func", (e) => {
  const { namespace: a, func: r } = e.req.param();
  return e.json(Vo[a][r]());
});
Je.get("/fs/:file{.*}", async (e) => {
  const a = e.req.param("file"), r = await self.clients.matchAll(), n = new Promise((i, u) => {
    const t = setTimeout(() => {
      Ke.delete(a), u(new Error("File request timed out"));
    }, 5e3);
    Ke.set(a, { resolve: i, reject: u, timeout: t });
  });
  r.forEach((i) => i.postMessage({ type: "fs", file: a }));
  try {
    const i = await n, u = {
      js: "application/javascript",
      wasm: "application/wasm",
      txt: "text/plain",
      md: "text/markdown",
      css: "text/css",
      html: "text/html"
    }, t = e.req.query("mime") || u[a.split(".").pop()] || "application/octet-stream";
    return new Response(i, {
      status: 200,
      headers: { "Content-Type": t }
    });
  } catch (i) {
    return e.json({ error: i.message }, 500);
  }
});
self.addEventListener("message", (e) => {
  switch (e.data.type) {
    case "fs":
      const { file: a, data: r, error: n } = e.data, i = Ke.get(a);
      i && (clearTimeout(i.timeout), Ke.delete(a), n ? i.reject(n) : i.resolve(r));
      break;
  }
});
self.addEventListener("activate", (e) => {
  self.skipWaiting(), e.waitUntil(
    (async () => {
      await self.clients.claim(), (await self.clients.matchAll()).forEach((r) => {
        r.postMessage({
          type: "log",
          message: `SWAPI ${Ze.version} is active`
        });
      });
    })()
  );
});
self.addEventListener("fetch", wr(Je));
