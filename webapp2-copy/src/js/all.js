require.config({
  baseUrl: 'js/scripts',
  paths: {
    'ui.route': '../lib/angular-ui-router.min',
    'angular': '../lib/angular.min',
    'angular-route': '../lib/angular-route.mim',
    'angularAMD': '../lib/angularAMD',
    'jquery': '../lib/jquery-3.1.1.min',
    'ngload': '../lib/angular-plugins/ngload',
    'focusimg': '../lib/focusimg',
    'goTop': '../lib/goTop',
    'wow': '../lib/wow'
  },
  shim: {
    'angularAMD': ['angular'],
    'angular-route': ['angular'],
    'ui.route': ['angular'],
    'focusimg': {
      deps: ['jquery'],
      exports: 'focusimg'
    },
    'goTop': {
      deps: ['jquery'],
      exports: 'goTop'
    },
    'wow': {
      deps: ['jquery'],
      exports: 'wow'
    }
  },
  urlArgs: 'v=' + new Date().getTime(),
  deps: ['app']
});
/*
 AngularJS v1.2.3
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
!function (e, r, t) {
  'use strict';
  n.$inject = [
    'e',
    't',
    'n',
    'a',
    'o'
  ];
  function n(e, t, n, a, o) {
    return {
      restrict: 'ECA',
      terminal: !0,
      priority: 400,
      transclude: 'element',
      link: function (c, i, l, u, s) {
        function p() {
          h && (h.$destroy(), h = null), d && (o.leave(d), d = null);
        }
        function $() {
          var l = e.current && e.current.locals, u = l && l.$template;
          if (u) {
            var $ = c.$new(), g = s($, r.noop);
            g.html(u), o.enter(g, null, d || i, function () {
              !r.isDefined(f) || f && !c.$eval(f) || t();
            }), p();
            var u = n(g.contents()), v = e.current;
            h = v.scope = $, d = g, v.controller && (l.$scope = h, l = a(v.controller, l), v.controllerAs && (h[v.controllerAs] = l), g.data('$ngControllerController', l), g.children().data('$ngControllerController', l)), u(h), h.$emit('$viewContentLoaded'), h.$eval(m);
          } else
            p();
        }
        var h, d, f = l.autoscroll, m = l.onload || '';
        c.$on('$routeChangeSuccess', $), $();
      }
    };
  }
  e = r.module('ngRoute', ['ng']).provider('$route', function () {
    function e(e, t) {
      return r.extend(new (r.extend(function () {
      }, { prototype: e }))(), t);
    }
    function t(e, r) {
      var t = r.caseInsensitiveMatch, n = {
          originalPath: e,
          regexp: e
        }, a = n.keys = [];
      return e = e.replace(/([().])/g, '\\$1').replace(/(\/)?:(\w+)([\?|\*])?/g, function (e, r, t, n) {
        return e = '?' === n ? n : null, n = '*' === n ? n : null, a.push({
          name: t,
          optional: !!e
        }), r = r || '', '' + (e ? '' : r) + '(?:' + (e ? r : '') + (n && '(.+?)' || '([^/]+)') + (e || '') + ')' + (e || '');
      }).replace(/([\/$\*])/g, '\\$1'), n.regexp = RegExp('^' + e + '$', t ? 'i' : ''), n;
    }
    var n = {};
    this.when = function (e, a) {
      if (n[e] = r.extend({ reloadOnSearch: !0 }, a, e && t(e, a)), e) {
        var o = '/' == e[e.length - 1] ? e.substr(0, e.length - 1) : e + '/';
        n[o] = r.extend({ redirectTo: e }, t(o, a));
      }
      return this;
    }, this.otherwise = function (e) {
      return this.when(null, e), this;
    }, this.$get = [
      '$rootScope',
      '$location',
      '$routeParams',
      '$q',
      '$injector',
      '$http',
      '$templateCache',
      '$sce',
      function (t, a, o, c, i, l, u, s) {
        function p() {
          var e = $(), n = f.current;
          e && n && e.$$route === n.$$route && r.equals(e.pathParams, n.pathParams) && !e.reloadOnSearch && !d ? (n.params = e.params, r.copy(n.params, o), t.$broadcast('$routeUpdate', n)) : (e || n) && (d = !1, t.$broadcast('$routeChangeStart', e, n), (f.current = e) && e.redirectTo && (r.isString(e.redirectTo) ? a.path(h(e.redirectTo, e.params)).search(e.params).replace() : a.url(e.redirectTo(e.pathParams, a.path(), a.search())).replace()), c.when(e).then(function () {
            if (e) {
              var t, n, a = r.extend({}, e.resolve);
              return r.forEach(a, function (e, t) {
                a[t] = r.isString(e) ? i.get(e) : i.invoke(e);
              }), r.isDefined(t = e.template) ? r.isFunction(t) && (t = t(e.params)) : r.isDefined(n = e.templateUrl) && (r.isFunction(n) && (n = n(e.params)), n = s.getTrustedResourceUrl(n), r.isDefined(n) && (e.loadedTemplateUrl = n, t = l.get(n, { cache: u }).then(function (e) {
                return e.data;
              }))), r.isDefined(t) && (a.$template = t), c.all(a);
            }
          }).then(function (a) {
            e == f.current && (e && (e.locals = a, r.copy(e.params, o)), t.$broadcast('$routeChangeSuccess', e, n));
          }, function (r) {
            e == f.current && t.$broadcast('$routeChangeError', e, n, r);
          }));
        }
        function $() {
          var t, o;
          return r.forEach(n, function (n, c) {
            var i;
            if (i = !o) {
              var l = a.path();
              i = n.keys;
              var u = {};
              if (n.regexp)
                if (l = n.regexp.exec(l)) {
                  for (var s = 1, p = l.length; s < p; ++s) {
                    var $ = i[s - 1], h = 'string' == typeof l[s] ? decodeURIComponent(l[s]) : l[s];
                    $ && h && (u[$.name] = h);
                  }
                  i = u;
                } else
                  i = null;
              else
                i = null;
              i = t = i;
            }
            i && (o = e(n, {
              params: r.extend({}, a.search(), t),
              pathParams: t
            }), o.$$route = n);
          }), o || n[null] && e(n[null], {
            params: {},
            pathParams: {}
          });
        }
        function h(e, t) {
          var n = [];
          return r.forEach((e || '').split(':'), function (e, r) {
            if (0 === r)
              n.push(e);
            else {
              var a = e.match(/(\w+)(.*)/), o = a[1];
              n.push(t[o]), n.push(a[2] || ''), delete t[o];
            }
          }), n.join('');
        }
        var d = !1, f = {
            routes: n,
            reload: function () {
              d = !0, t.$evalAsync(p);
            }
          };
        return t.$on('$locationChangeSuccess', p), f;
      }
    ];
  }), e.provider('$routeParams', function () {
    this.$get = function () {
      return {};
    };
  }), e.directive('ngView', n), n.$inject = [
    '$route',
    '$anchorScroll',
    '$compile',
    '$controller',
    '$animate'
  ];
}(window, window.angular), define('angular-route.min', function () {
});
/**
 * State-based routing for AngularJS
 * @version v0.2.13
 * @link http://angular-ui.github.com/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'undefined' != typeof module && 'undefined' != typeof exports && module.exports === exports && (module.exports = 'ui.router'), function (e, t, r) {
  'use strict';
  function n(e, t) {
    return D(new (D(function () {
    }, { prototype: e }))(), t);
  }
  function i(e) {
    return R(arguments, function (t) {
      t !== e && R(t, function (t, r) {
        e.hasOwnProperty(r) || (e[r] = t);
      });
    }), e;
  }
  function a(e, t) {
    var r = [];
    for (var n in e.path) {
      if (e.path[n] !== t.path[n])
        break;
      r.push(e.path[n]);
    }
    return r;
  }
  function o(e) {
    if (Object.keys)
      return Object.keys(e);
    var r = [];
    return t.forEach(e, function (e, t) {
      r.push(t);
    }), r;
  }
  function u(e, t) {
    if (Array.prototype.indexOf)
      return e.indexOf(t, Number(arguments[2]) || 0);
    var r = e.length >>> 0, n = Number(arguments[2]) || 0;
    for (n = 0 > n ? Math.ceil(n) : Math.floor(n), 0 > n && (n += r); r > n; n++)
      if (n in e && e[n] === t)
        return n;
    return -1;
  }
  function s(e, t, r, n) {
    var i, s = a(r, n), l = {}, c = [];
    for (var f in s)
      if (s[f].params && (i = o(s[f].params), i.length))
        for (var p in i)
          u(c, i[p]) >= 0 || (c.push(i[p]), l[i[p]] = e[i[p]]);
    return D({}, l, t);
  }
  function l(e, t, r) {
    if (!r) {
      r = [];
      for (var n in e)
        r.push(n);
    }
    for (var i = 0; i < r.length; i++) {
      var a = r[i];
      if (e[a] != t[a])
        return !1;
    }
    return !0;
  }
  function c(e, t) {
    var r = {};
    return R(e, function (e) {
      r[e] = t[e];
    }), r;
  }
  function f(e) {
    var t = {}, r = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
    for (var n in e)
      -1 == u(r, n) && (t[n] = e[n]);
    return t;
  }
  function p(e, t) {
    var r = N(e), n = r ? [] : {};
    return R(e, function (e, i) {
      t(e, i) && (n[r ? n.length : i] = e);
    }), n;
  }
  function h(e, t) {
    var r = N(e) ? [] : {};
    return R(e, function (e, n) {
      r[n] = t(e, n);
    }), r;
  }
  function v(e, t) {
    var n = 1, a = 2, s = {}, l = [], c = s, p = D(e.when(s), {
        $$promises: s,
        $$values: s
      });
    this.study = function (s) {
      function h(e, r) {
        if (g[r] !== a) {
          if (m.push(r), g[r] === n)
            throw m.splice(0, u(m, r)), new Error('Cyclic dependency: ' + m.join(' -> '));
          if (g[r] = n, M(e))
            d.push(r, [function () {
                return t.get(e);
              }], l);
          else {
            var i = t.annotate(e);
            R(i, function (e) {
              e !== r && s.hasOwnProperty(e) && h(s[e], e);
            }), d.push(r, e, i);
          }
          m.pop(), g[r] = a;
        }
      }
      function v(e) {
        return F(e) && e.then && e.$$promises;
      }
      if (!F(s))
        throw new Error('\'invocables\' must be an object');
      var $ = o(s || {}), d = [], m = [], g = {};
      return R(s, h), s = m = g = null, function (n, a, o) {
        function u() {
          --y || (b || i(w, a.$$values), m.$$values = w, m.$$promises = m.$$promises || !0, delete m.$$inheritedValues, h.resolve(w));
        }
        function s(e) {
          m.$$failure = e, h.reject(e);
        }
        function l(r, i, a) {
          function l(e) {
            f.reject(e), s(e);
          }
          function c() {
            if (!I(m.$$failure))
              try {
                f.resolve(t.invoke(i, o, w)), f.promise.then(function (e) {
                  w[r] = e, u();
                }, l);
              } catch (e) {
                l(e);
              }
          }
          var f = e.defer(), p = 0;
          R(a, function (e) {
            g.hasOwnProperty(e) && !n.hasOwnProperty(e) && (p++, g[e].then(function (t) {
              w[e] = t, --p || c();
            }, l));
          }), p || c(), g[r] = f.promise;
        }
        if (v(n) && o === r && (o = a, a = n, n = null), n) {
          if (!F(n))
            throw new Error('\'locals\' must be an object');
        } else
          n = c;
        if (a) {
          if (!v(a))
            throw new Error('\'parent\' must be a promise returned by $resolve.resolve()');
        } else
          a = p;
        var h = e.defer(), m = h.promise, g = m.$$promises = {}, w = D({}, n), y = 1 + d.length / 3, b = !1;
        if (I(a.$$failure))
          return s(a.$$failure), m;
        a.$$inheritedValues && i(w, f(a.$$inheritedValues, $)), D(g, a.$$promises), a.$$values ? (b = i(w, f(a.$$values, $)), m.$$inheritedValues = f(a.$$values, $), u()) : (a.$$inheritedValues && (m.$$inheritedValues = f(a.$$inheritedValues, $)), a.then(u, s));
        for (var E = 0, S = d.length; S > E; E += 3)
          n.hasOwnProperty(d[E]) ? u() : l(d[E], d[E + 1], d[E + 2]);
        return m;
      };
    }, this.resolve = function (e, t, r, n) {
      return this.study(e)(t, r, n);
    };
  }
  function $(e, t, r) {
    this.fromConfig = function (e, t, r) {
      return I(e.template) ? this.fromString(e.template, t) : I(e.templateUrl) ? this.fromUrl(e.templateUrl, t) : I(e.templateProvider) ? this.fromProvider(e.templateProvider, t, r) : null;
    }, this.fromString = function (e, t) {
      return V(e) ? e(t) : e;
    }, this.fromUrl = function (r, n) {
      return V(r) && (r = r(n)), null == r ? null : e.get(r, {
        cache: t,
        headers: { Accept: 'text/html' }
      }).then(function (e) {
        return e.data;
      });
    }, this.fromProvider = function (e, t, n) {
      return r.invoke(e, null, n || { params: t });
    };
  }
  function d(e, t, i) {
    function a(t, r, n, i) {
      if (d.push(t), v[t])
        return v[t];
      if (!/^\w+(-+\w+)*(?:\[\])?$/.test(t))
        throw new Error('Invalid parameter name \'' + t + '\' in pattern \'' + e + '\'');
      if ($[t])
        throw new Error('Duplicate parameter name \'' + t + '\' in pattern \'' + e + '\'');
      return $[t] = new T.Param(t, r, n, i), $[t];
    }
    function o(e, t, r) {
      var n = [
          '',
          ''
        ], i = e.replace(/[\\\[\]\^$*+?.()|{}]/g, '\\$&');
      if (!t)
        return i;
      switch (r) {
      case !1:
        n = [
          '(',
          ')'
        ];
        break;
      case !0:
        n = [
          '?(',
          ')?'
        ];
        break;
      default:
        n = [
          '(' + r + '|',
          ')?'
        ];
      }
      return i + n[0] + t + n[1];
    }
    function u(r, i) {
      var a, o, u, s, l;
      return a = r[2] || r[3], l = t.params[a], u = e.substring(p, r.index), o = i ? r[4] : r[4] || ('*' == r[1] ? '.*' : null), s = T.type(o || 'string') || n(T.type('string'), { pattern: new RegExp(o) }), {
        id: a,
        regexp: o,
        segment: u,
        type: s,
        cfg: l
      };
    }
    t = D({ params: {} }, F(t) ? t : {});
    var s, l = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, c = /([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, f = '^', p = 0, h = this.segments = [], v = i ? i.params : {}, $ = this.params = i ? i.params.$$new() : new T.ParamSet(), d = [];
    this.source = e;
    for (var m, g, w; (s = l.exec(e)) && (m = u(s, !1), !(m.segment.indexOf('?') >= 0));)
      g = a(m.id, m.type, m.cfg, 'path'), f += o(m.segment, g.type.pattern.source, g.squash), h.push(m.segment), p = l.lastIndex;
    w = e.substring(p);
    var y = w.indexOf('?');
    if (y >= 0) {
      var b = this.sourceSearch = w.substring(y);
      if (w = w.substring(0, y), this.sourcePath = e.substring(0, p + y), b.length > 0)
        for (p = 0; s = c.exec(b);)
          m = u(s, !0), g = a(m.id, m.type, m.cfg, 'search'), p = l.lastIndex;
    } else
      this.sourcePath = e, this.sourceSearch = '';
    f += o(w) + (t.strict === !1 ? '/?' : '') + '$', h.push(w), this.regexp = new RegExp(f, t.caseInsensitive ? 'i' : r), this.prefix = h[0], this.$$paramNames = d;
  }
  function m(e) {
    D(this, e);
  }
  function g() {
    function e(e) {
      return null != e ? e.toString().replace(/\//g, '%2F') : e;
    }
    function i(e) {
      return null != e ? e.toString().replace(/%2F/g, '/') : e;
    }
    function a(e) {
      return this.pattern.test(e);
    }
    function s() {
      return {
        strict: w,
        caseInsensitive: $
      };
    }
    function l(e) {
      return V(e) || N(e) && V(e[e.length - 1]);
    }
    function c() {
      for (; S.length;) {
        var e = S.shift();
        if (e.pattern)
          throw new Error('You cannot override a type\'s .pattern at runtime.');
        t.extend(b[e.name], v.invoke(e.def));
      }
    }
    function f(e) {
      D(this, e || {});
    }
    T = this;
    var v, $ = !1, w = !0, y = !1, b = {}, E = !0, S = [], x = {
        string: {
          encode: e,
          decode: i,
          is: a,
          pattern: /[^\/]*/
        },
        int: {
          encode: e,
          decode: function (e) {
            return parseInt(e, 10);
          },
          is: function (e) {
            return I(e) && this.decode(e.toString()) === e;
          },
          pattern: /\d+/
        },
        bool: {
          encode: function (e) {
            return e ? 1 : 0;
          },
          decode: function (e) {
            return 0 !== parseInt(e, 10);
          },
          is: function (e) {
            return e === !0 || e === !1;
          },
          pattern: /0|1/
        },
        date: {
          encode: function (e) {
            return this.is(e) ? [
              e.getFullYear(),
              ('0' + (e.getMonth() + 1)).slice(-2),
              ('0' + e.getDate()).slice(-2)
            ].join('-') : r;
          },
          decode: function (e) {
            if (this.is(e))
              return e;
            var t = this.capture.exec(e);
            return t ? new Date(t[1], t[2] - 1, t[3]) : r;
          },
          is: function (e) {
            return e instanceof Date && !isNaN(e.valueOf());
          },
          equals: function (e, t) {
            return this.is(e) && this.is(t) && e.toISOString() === t.toISOString();
          },
          pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
          capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
        },
        json: {
          encode: t.toJson,
          decode: t.fromJson,
          is: t.isObject,
          equals: t.equals,
          pattern: /[^\/]*/
        },
        any: {
          encode: t.identity,
          decode: t.identity,
          is: t.identity,
          equals: t.equals,
          pattern: /.*/
        }
      };
    g.$$getDefaultValue = function (e) {
      if (!l(e.value))
        return e.value;
      if (!v)
        throw new Error('Injectable functions cannot be called at configuration time');
      return v.invoke(e.value);
    }, this.caseInsensitive = function (e) {
      return I(e) && ($ = e), $;
    }, this.strictMode = function (e) {
      return I(e) && (w = e), w;
    }, this.defaultSquashPolicy = function (e) {
      if (!I(e))
        return y;
      if (e !== !0 && e !== !1 && !M(e))
        throw new Error('Invalid squash policy: ' + e + '. Valid policies: false, true, arbitrary-string');
      return y = e, e;
    }, this.compile = function (e, t) {
      return new d(e, D(s(), t));
    }, this.isMatcher = function (e) {
      if (!F(e))
        return !1;
      var t = !0;
      return R(d.prototype, function (r, n) {
        V(r) && (t = t && I(e[n]) && V(e[n]));
      }), t;
    }, this.type = function (e, t, r) {
      if (!I(t))
        return b[e];
      if (b.hasOwnProperty(e))
        throw new Error('A type named \'' + e + '\' has already been defined.');
      return b[e] = new m(D({ name: e }, t)), r && (S.push({
        name: e,
        def: r
      }), E || c()), this;
    }, R(x, function (e, t) {
      b[t] = new m(D({ name: t }, e));
    }), b = n(b, {}), this.$get = [
      '$injector',
      function (e) {
        return v = e, E = !1, c(), R(x, function (e, t) {
          b[t] || (b[t] = new m(e));
        }), this;
      }
    ], this.Param = function (e, t, n, i) {
      function a(e) {
        var t = F(e) ? o(e) : [], r = -1 === u(t, 'value') && -1 === u(t, 'type') && -1 === u(t, 'squash') && -1 === u(t, 'array');
        return r && (e = { value: e }), e.$$fn = l(e.value) ? e.value : function () {
          return e.value;
        }, e;
      }
      function s(t, r, n) {
        if (t.type && r)
          throw new Error('Param \'' + e + '\' has two type configurations.');
        return r ? r : t.type ? t.type instanceof m ? t.type : new m(t.type) : 'config' === n ? b.any : b.string;
      }
      function c() {
        var t = { array: 'search' === i && 'auto' }, r = e.match(/\[\]$/) ? { array: !0 } : {};
        return D(t, r, n).array;
      }
      function f(e, t) {
        var r = e.squash;
        if (!t || r === !1)
          return !1;
        if (!I(r) || null == r)
          return y;
        if (r === !0 || M(r))
          return r;
        throw new Error('Invalid squash policy: \'' + r + '\'. Valid policies: false, true, or arbitrary string');
      }
      function $(e, t, n, i) {
        var a, o, s = [
            {
              from: '',
              to: n || t ? r : ''
            },
            {
              from: null,
              to: n || t ? r : ''
            }
          ];
        return a = N(e.replace) ? e.replace : [], M(i) && a.push({
          from: i,
          to: r
        }), o = h(a, function (e) {
          return e.from;
        }), p(s, function (e) {
          return -1 === u(o, e.from);
        }).concat(a);
      }
      function d() {
        if (!v)
          throw new Error('Injectable functions cannot be called at configuration time');
        return v.invoke(n.$$fn);
      }
      function g(e) {
        function t(e) {
          return function (t) {
            return t.from === e;
          };
        }
        function r(e) {
          var r = h(p(E.replace, t(e)), function (e) {
              return e.to;
            });
          return r.length ? r[0] : e;
        }
        return e = r(e), I(e) ? E.type.decode(e) : d();
      }
      function w() {
        return '{Param:' + e + ' ' + t + ' squash: \'' + P + '\' optional: ' + x + '}';
      }
      var E = this;
      n = a(n), t = s(n, t, i);
      var S = c();
      t = S ? t.$asArray(S, 'search' === i) : t, 'string' !== t.name || S || 'path' !== i || n.value !== r || (n.value = '');
      var x = n.value !== r, P = f(n, x), j = $(n, S, x, P);
      D(this, {
        id: e,
        type: t,
        location: i,
        array: S,
        squash: P,
        replace: j,
        isOptional: x,
        value: g,
        dynamic: r,
        config: n,
        toString: w
      });
    }, f.prototype = {
      $$new: function () {
        return n(this, D(new f(), { $$parent: this }));
      },
      $$keys: function () {
        for (var e = [], t = [], r = this, n = o(f.prototype); r;)
          t.push(r), r = r.$$parent;
        return t.reverse(), R(t, function (t) {
          R(o(t), function (t) {
            -1 === u(e, t) && -1 === u(n, t) && e.push(t);
          });
        }), e;
      },
      $$values: function (e) {
        var t = {}, r = this;
        return R(r.$$keys(), function (n) {
          t[n] = r[n].value(e && e[n]);
        }), t;
      },
      $$equals: function (e, t) {
        var r = !0, n = this;
        return R(n.$$keys(), function (i) {
          var a = e && e[i], o = t && t[i];
          n[i].type.equals(a, o) || (r = !1);
        }), r;
      },
      $$validates: function (e) {
        var t, r, n, i = !0, a = this;
        return R(this.$$keys(), function (o) {
          n = a[o], r = e[o], t = !r && n.isOptional, i = i && (t || !!n.type.is(r));
        }), i;
      },
      $$parent: r
    }, this.ParamSet = f;
  }
  function w(e, n) {
    function i(e) {
      var t = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(e.source);
      return null != t ? t[1].replace(/\\(.)/g, '$1') : '';
    }
    function a(e, t) {
      return e.replace(/\$(\$|\d{1,2})/, function (e, r) {
        return t['$' === r ? 0 : Number(r)];
      });
    }
    function o(e, t, r) {
      if (!r)
        return !1;
      var n = e.invoke(t, t, { $match: r });
      return !I(n) || n;
    }
    function u(n, i, a, o) {
      function u(e, t, r) {
        return '/' === $ ? e : t ? $.slice(0, -1) + e : r ? $.slice(1) + e : e;
      }
      function p(e) {
        function t(e) {
          var t = e(a, n);
          return !!t && (M(t) && n.replace().url(t), !0);
        }
        if (!e || !e.defaultPrevented) {
          var i = v && n.url() === v;
          if (v = r, i)
            return !0;
          var o, u = l.length;
          for (o = 0; u > o; o++)
            if (t(l[o]))
              return;
          c && t(c);
        }
      }
      function h() {
        return s = s || i.$on('$locationChangeSuccess', p);
      }
      var v, $ = o.baseHref(), d = n.url();
      return f || h(), {
        sync: function () {
          p();
        },
        listen: function () {
          return h();
        },
        update: function (e) {
          return e ? void (d = n.url()) : void (n.url() !== d && (n.url(d), n.replace()));
        },
        push: function (e, t, i) {
          n.url(e.format(t || {})), v = i && i.$$avoidResync ? n.url() : r, i && i.replace && n.replace();
        },
        href: function (r, i, a) {
          if (!r.validates(i))
            return null;
          var o = e.html5Mode();
          t.isObject(o) && (o = o.enabled);
          var s = r.format(i);
          if (a = a || {}, o || null === s || (s = '#' + e.hashPrefix() + s), s = u(s, o, a.absolute), !a.absolute || !s)
            return s;
          var l = !o && s ? '/' : '', c = n.port();
          return c = 80 === c || 443 === c ? '' : ':' + c, [
            n.protocol(),
            '://',
            n.host(),
            c,
            l,
            s
          ].join('');
        }
      };
    }
    var s, l = [], c = null, f = !1;
    this.rule = function (e) {
      if (!V(e))
        throw new Error('\'rule\' must be a function');
      return l.push(e), this;
    }, this.otherwise = function (e) {
      if (M(e)) {
        var t = e;
        e = function () {
          return t;
        };
      } else if (!V(e))
        throw new Error('\'rule\' must be a function');
      return c = e, this;
    }, this.when = function (e, t) {
      var r, u = M(t);
      if (M(e) && (e = n.compile(e)), !u && !V(t) && !N(t))
        throw new Error('invalid \'handler\' in when()');
      var s = {
          matcher: function (e, t) {
            return u && (r = n.compile(t), t = [
              '$match',
              function (e) {
                return r.format(e);
              }
            ]), D(function (r, n) {
              return o(r, t, e.exec(n.path(), n.search()));
            }, { prefix: M(e.prefix) ? e.prefix : '' });
          },
          regex: function (e, t) {
            if (e.global || e.sticky)
              throw new Error('when() RegExp must not be global or sticky');
            return u && (r = t, t = [
              '$match',
              function (e) {
                return a(r, e);
              }
            ]), D(function (r, n) {
              return o(r, t, e.exec(n.path()));
            }, { prefix: i(e) });
          }
        }, l = {
          matcher: n.isMatcher(e),
          regex: e instanceof RegExp
        };
      for (var c in l)
        if (l[c])
          return this.rule(s[c](e, t));
      throw new Error('invalid \'what\' in when()');
    }, this.deferIntercept = function (e) {
      e === r && (e = !0), f = e;
    }, this.$get = u, u.$inject = [
      '$location',
      '$rootScope',
      '$injector',
      '$browser'
    ];
  }
  function y(e, i) {
    function a(e) {
      return 0 === e.indexOf('.') || 0 === e.indexOf('^');
    }
    function f(e, t) {
      if (!e)
        return r;
      var n = M(e), i = n ? e : e.name, o = a(i);
      if (o) {
        if (!t)
          throw new Error('No reference point given for path \'' + i + '\'');
        t = f(t);
        for (var u = i.split('.'), s = 0, l = u.length, c = t; l > s; s++)
          if ('' !== u[s] || 0 !== s) {
            if ('^' !== u[s])
              break;
            if (!c.parent)
              throw new Error('Path \'' + i + '\' not valid for state \'' + t.name + '\'');
            c = c.parent;
          } else
            c = t;
        u = u.slice(s).join('.'), i = c.name + (c.name && u ? '.' : '') + u;
      }
      var p = x[i];
      return !p || !n && (n || p !== e && p.self !== e) ? r : p;
    }
    function p(e, t) {
      P[e] || (P[e] = []), P[e].push(t);
    }
    function v(e) {
      for (var t = P[e] || []; t.length;)
        $(t.shift());
    }
    function $(t) {
      t = n(t, {
        self: t,
        resolve: t.resolve || {},
        toString: function () {
          return this.name;
        }
      });
      var r = t.name;
      if (!M(r) || r.indexOf('@') >= 0)
        throw new Error('State must have a valid name');
      if (x.hasOwnProperty(r))
        throw new Error('State \'' + r + '\'\' is already defined');
      var i = -1 !== r.indexOf('.') ? r.substring(0, r.lastIndexOf('.')) : M(t.parent) ? t.parent : F(t.parent) && M(t.parent.name) ? t.parent.name : '';
      if (i && !x[i])
        return p(i, t.self);
      for (var a in O)
        V(O[a]) && (t[a] = O[a](t, O.$delegates[a]));
      return x[r] = t, !t[j] && t.url && e.when(t.url, [
        '$match',
        '$stateParams',
        function (e, r) {
          S.$current.navigable == t && l(e, r) || S.transitionTo(t, e, {
            inherit: !0,
            location: !1
          });
        }
      ]), v(r), t;
    }
    function d(e) {
      return e.indexOf('*') > -1;
    }
    function m(e) {
      var t = e.split('.'), r = S.$current.name.split('.');
      if ('**' === t[0] && (r = r.slice(u(r, t[1])), r.unshift('**')), '**' === t[t.length - 1] && (r.splice(u(r, t[t.length - 2]) + 1, Number.MAX_VALUE), r.push('**')), t.length != r.length)
        return !1;
      for (var n = 0, i = t.length; i > n; n++)
        '*' === t[n] && (r[n] = '*');
      return r.join('') === t.join('');
    }
    function g(e, t) {
      return M(e) && !I(t) ? O[e] : V(t) && M(e) ? (O[e] && !O.$delegates[e] && (O.$delegates[e] = O[e]), O[e] = t, this) : this;
    }
    function w(e, t) {
      return F(e) ? t = e : t.name = e, $(t), this;
    }
    function y(e, i, a, u, p, v, $) {
      function g(t, r, n, a) {
        var o = e.$broadcast('$stateNotFound', t, r, n);
        if (o.defaultPrevented)
          return $.update(), O;
        if (!o.retry)
          return null;
        if (a.$retry)
          return $.update(), A;
        var u = S.transition = i.when(o.retry);
        return u.then(function () {
          return u !== S.transition ? y : (t.options.$retry = !0, S.transitionTo(t.to, t.toParams, t.options));
        }, function () {
          return O;
        }), $.update(), u;
      }
      function w(e, r, n, o, s, l) {
        var f = n ? r : c(e.params.$$keys(), r), h = { $stateParams: f };
        s.resolve = p.resolve(e.resolve, h, s.resolve, e);
        var v = [s.resolve.then(function (e) {
              s.globals = e;
            })];
        return o && v.push(o), R(e.views, function (r, n) {
          var i = r.resolve && r.resolve !== e.resolve ? r.resolve : {};
          i.$template = [function () {
              return a.load(n, {
                view: r,
                locals: h,
                params: f,
                notify: l.notify
              }) || '';
            }], v.push(p.resolve(i, h, s.resolve, e).then(function (a) {
            if (V(r.controllerProvider) || N(r.controllerProvider)) {
              var o = t.extend({}, i, h);
              a.$$controller = u.invoke(r.controllerProvider, null, o);
            } else
              a.$$controller = r.controller;
            a.$$state = e, a.$$controllerAs = r.controllerAs, s[n] = a;
          }));
        }), i.all(v).then(function () {
          return s;
        });
      }
      var y = i.reject(new Error('transition superseded')), P = i.reject(new Error('transition prevented')), O = i.reject(new Error('transition aborted')), A = i.reject(new Error('transition failed'));
      return E.locals = {
        resolve: null,
        globals: { $stateParams: {} }
      }, S = {
        params: {},
        current: E.self,
        $current: E,
        transition: null
      }, S.reload = function () {
        return S.transitionTo(S.current, v, {
          reload: !0,
          inherit: !1,
          notify: !0
        });
      }, S.go = function (e, t, r) {
        return S.transitionTo(e, t, D({
          inherit: !0,
          relative: S.$current
        }, r));
      }, S.transitionTo = function (t, r, a) {
        r = r || {}, a = D({
          location: !0,
          inherit: !1,
          relative: null,
          notify: !0,
          reload: !1,
          $retry: !1
        }, a || {});
        var o, l = S.$current, p = S.params, h = l.path, d = f(t, a.relative);
        if (!I(d)) {
          var m = {
              to: t,
              toParams: r,
              options: a
            }, x = g(m, l.self, p, a);
          if (x)
            return x;
          if (t = m.to, r = m.toParams, a = m.options, d = f(t, a.relative), !I(d)) {
            if (!a.relative)
              throw new Error('No such state \'' + t + '\'');
            throw new Error('Could not resolve \'' + t + '\' from state \'' + a.relative + '\'');
          }
        }
        if (d[j])
          throw new Error('Cannot transition to abstract state \'' + t + '\'');
        if (a.inherit && (r = s(v, r || {}, S.$current, d)), !d.params.$$validates(r))
          return A;
        r = d.params.$$values(r), t = d;
        var O = t.path, q = 0, C = O[q], k = E.locals, V = [];
        if (!a.reload)
          for (; C && C === h[q] && C.ownParams.$$equals(r, p);)
            k = V[q] = C.locals, q++, C = O[q];
        if (b(t, l, k, a))
          return t.self.reloadOnSearch !== !1 && $.update(), S.transition = null, i.when(S.current);
        if (r = c(t.params.$$keys(), r || {}), a.notify && e.$broadcast('$stateChangeStart', t.self, r, l.self, p).defaultPrevented)
          return $.update(), P;
        for (var M = i.when(k), F = q; F < O.length; F++, C = O[F])
          k = V[F] = n(k), M = w(C, r, C === t, M, k, a);
        var N = S.transition = M.then(function () {
            var n, i, o;
            if (S.transition !== N)
              return y;
            for (n = h.length - 1; n >= q; n--)
              o = h[n], o.self.onExit && u.invoke(o.self.onExit, o.self, o.locals.globals), o.locals = null;
            for (n = q; n < O.length; n++)
              i = O[n], i.locals = V[n], i.self.onEnter && u.invoke(i.self.onEnter, i.self, i.locals.globals);
            return S.transition !== N ? y : (S.$current = t, S.current = t.self, S.params = r, U(S.params, v), S.transition = null, a.location && t.navigable && $.push(t.navigable.url, t.navigable.locals.globals.$stateParams, {
              $$avoidResync: !0,
              replace: 'replace' === a.location
            }), a.notify && e.$broadcast('$stateChangeSuccess', t.self, r, l.self, p), $.update(!0), S.current);
          }, function (n) {
            return S.transition !== N ? y : (S.transition = null, o = e.$broadcast('$stateChangeError', t.self, r, l.self, p, n), o.defaultPrevented || $.update(), i.reject(n));
          });
        return N;
      }, S.is = function (e, t, n) {
        n = D({ relative: S.$current }, n || {});
        var i = f(e, n.relative);
        return I(i) ? S.$current === i && (!t || l(i.params.$$values(t), v)) : r;
      }, S.includes = function (e, t, n) {
        if (n = D({ relative: S.$current }, n || {}), M(e) && d(e)) {
          if (!m(e))
            return !1;
          e = S.$current.name;
        }
        var i = f(e, n.relative);
        return I(i) ? !!I(S.$current.includes[i.name]) && (!t || l(i.params.$$values(t), v, o(t))) : r;
      }, S.href = function (e, t, n) {
        n = D({
          lossy: !0,
          inherit: !0,
          absolute: !1,
          relative: S.$current
        }, n || {});
        var i = f(e, n.relative);
        if (!I(i))
          return null;
        n.inherit && (t = s(v, t || {}, S.$current, i));
        var a = i && n.lossy ? i.navigable : i;
        return a && a.url !== r && null !== a.url ? $.href(a.url, c(i.params.$$keys(), t || {}), { absolute: n.absolute }) : null;
      }, S.get = function (e, t) {
        if (0 === arguments.length)
          return h(o(x), function (e) {
            return x[e].self;
          });
        var r = f(e, t || S.$current);
        return r && r.self ? r.self : null;
      }, S;
    }
    function b(e, t, r, n) {
      return e === t && (r === t.locals && !n.reload || e.self.reloadOnSearch === !1) || void 0;
    }
    var E, S, x = {}, P = {}, j = 'abstract', O = {
        parent: function (e) {
          if (I(e.parent) && e.parent)
            return f(e.parent);
          var t = /^(.+)\.[^.]+$/.exec(e.name);
          return t ? f(t[1]) : E;
        },
        data: function (e) {
          return e.parent && e.parent.data && (e.data = e.self.data = D({}, e.parent.data, e.data)), e.data;
        },
        url: function (e) {
          var t = e.url, r = { params: e.params || {} };
          if (M(t))
            return '^' == t.charAt(0) ? i.compile(t.substring(1), r) : (e.parent.navigable || E).url.concat(t, r);
          if (!t || i.isMatcher(t))
            return t;
          throw new Error('Invalid url \'' + t + '\' in state \'' + e + '\'');
        },
        navigable: function (e) {
          return e.url ? e : e.parent ? e.parent.navigable : null;
        },
        ownParams: function (e) {
          var t = e.url && e.url.params || new T.ParamSet();
          return R(e.params || {}, function (e, r) {
            t[r] || (t[r] = new T.Param(r, null, e, 'config'));
          }), t;
        },
        params: function (e) {
          return e.parent && e.parent.params ? D(e.parent.params.$$new(), e.ownParams) : new T.ParamSet();
        },
        views: function (e) {
          var t = {};
          return R(I(e.views) ? e.views : { '': e }, function (r, n) {
            n.indexOf('@') < 0 && (n += '@' + e.parent.name), t[n] = r;
          }), t;
        },
        path: function (e) {
          return e.parent ? e.parent.path.concat(e) : [];
        },
        includes: function (e) {
          var t = e.parent ? D({}, e.parent.includes) : {};
          return t[e.name] = !0, t;
        },
        $delegates: {}
      };
    E = $({
      name: '',
      url: '^',
      views: null,
      abstract: !0
    }), E.navigable = null, this.decorator = g, this.state = w, this.$get = y, y.$inject = [
      '$rootScope',
      '$q',
      '$view',
      '$injector',
      '$resolve',
      '$stateParams',
      '$urlRouter',
      '$location',
      '$urlMatcherFactory'
    ];
  }
  function b() {
    function e(e, t) {
      return {
        load: function (r, n) {
          var i, a = {
              template: null,
              controller: null,
              view: null,
              locals: null,
              notify: !0,
              async: !0,
              params: {}
            };
          return n = D(a, n), n.view && (i = t.fromConfig(n.view, n.params, n.locals)), i && n.notify && e.$broadcast('$viewContentLoading', n), i;
        }
      };
    }
    this.$get = e, e.$inject = [
      '$rootScope',
      '$templateFactory'
    ];
  }
  function E() {
    var e = !1;
    this.useAnchorScroll = function () {
      e = !0;
    }, this.$get = [
      '$anchorScroll',
      '$timeout',
      function (t, r) {
        return e ? t : function (e) {
          r(function () {
            e[0].scrollIntoView();
          }, 0, !1);
        };
      }
    ];
  }
  function S(e, r, n, i) {
    function a() {
      return r.has ? function (e) {
        return r.has(e) ? r.get(e) : null;
      } : function (e) {
        try {
          return r.get(e);
        } catch (e) {
          return null;
        }
      };
    }
    function o(e, t) {
      var r = function () {
        return {
          enter: function (e, t, r) {
            t.after(e), r();
          },
          leave: function (e, t) {
            e.remove(), t();
          }
        };
      };
      if (l)
        return {
          enter: function (e, t, r) {
            var n = l.enter(e, null, t, r);
            n && n.then && n.then(r);
          },
          leave: function (e, t) {
            var r = l.leave(e, t);
            r && r.then && r.then(t);
          }
        };
      if (s) {
        var n = s && s(t, e);
        return {
          enter: function (e, t, r) {
            n.enter(e, null, t), r();
          },
          leave: function (e, t) {
            n.leave(e), t();
          }
        };
      }
      return r();
    }
    var u = a(), s = u('$animator'), l = u('$animate'), c = {
        restrict: 'ECA',
        terminal: !0,
        priority: 400,
        transclude: 'element',
        compile: function (r, a, u) {
          return function (r, a, s) {
            function l() {
              f && (f.remove(), f = null), h && (h.$destroy(), h = null), p && (m.leave(p, function () {
                f = null;
              }), f = p, p = null);
            }
            function c(o) {
              var c, f = P(r, s, a, i), g = f && e.$current && e.$current.locals[f];
              if (o || g !== v) {
                c = r.$new(), v = e.$current.locals[f];
                var w = u(c, function (e) {
                    m.enter(e, a, function () {
                      h && h.$emit('$viewContentAnimationEnded'), (t.isDefined(d) && !d || r.$eval(d)) && n(e);
                    }), l();
                  });
                p = w, h = c, h.$emit('$viewContentLoaded'), h.$eval($);
              }
            }
            var f, p, h, v, $ = s.onload || '', d = s.autoscroll, m = o(s, r);
            r.$on('$stateChangeSuccess', function () {
              c(!1);
            }), r.$on('$viewContentLoading', function () {
              c(!1);
            }), c(!0);
          };
        }
      };
    return c;
  }
  function x(e, t, r, n) {
    return {
      restrict: 'ECA',
      priority: -400,
      compile: function (i) {
        var a = i.html();
        return function (i, o, u) {
          var s = r.$current, l = P(i, u, o, n), c = s && s.locals[l];
          if (c) {
            o.data('$uiView', {
              name: l,
              state: c.$$state
            }), o.html(c.$template ? c.$template : a);
            var f = e(o.contents());
            if (c.$$controller) {
              c.$scope = i;
              var p = t(c.$$controller, c);
              c.$$controllerAs && (i[c.$$controllerAs] = p), o.data('$ngControllerController', p), o.children().data('$ngControllerController', p);
            }
            f(i);
          }
        };
      }
    };
  }
  function P(e, t, r, n) {
    var i = n(t.uiView || t.name || '')(e), a = r.inheritedData('$uiView');
    return i.indexOf('@') >= 0 ? i : i + '@' + (a ? a.state.name : '');
  }
  function j(e, t) {
    var r, n = e.match(/^\s*({[^}]*})\s*$/);
    if (n && (e = t + '(' + n[1] + ')'), r = e.replace(/\n/g, ' ').match(/^([^(]+?)\s*(\((.*)\))?$/), !r || 4 !== r.length)
      throw new Error('Invalid state ref \'' + e + '\'');
    return {
      state: r[1],
      paramExpr: r[3] || null
    };
  }
  function O(e) {
    var t = e.parent().inheritedData('$uiView');
    return t && t.state && t.state.name ? t.state : void 0;
  }
  function A(e, r) {
    var n = [
        'location',
        'inherit',
        'reload'
      ];
    return {
      restrict: 'A',
      require: [
        '?^uiSrefActive',
        '?^uiSrefActiveEq'
      ],
      link: function (i, a, o, u) {
        var s = j(o.uiSref, e.current.name), l = null, c = O(a) || e.$current, f = null, p = 'A' === a.prop('tagName'), h = 'FORM' === a[0].nodeName, v = h ? 'action' : 'href', $ = !0, d = {
            relative: c,
            inherit: !0
          }, m = i.$eval(o.uiSrefOpts) || {};
        t.forEach(n, function (e) {
          e in m && (d[e] = m[e]);
        });
        var g = function (r) {
          if (r && (l = t.copy(r)), $) {
            f = e.href(s.state, l, d);
            var n = u[1] || u[0];
            return n && n.$$setStateInfo(s.state, l), null === f ? ($ = !1, !1) : void o.$set(v, f);
          }
        };
        s.paramExpr && (i.$watch(s.paramExpr, function (e) {
          e !== l && g(e);
        }, !0), l = t.copy(i.$eval(s.paramExpr))), g(), h || a.bind('click', function (t) {
          var n = t.which || t.button;
          if (!(n > 1 || t.ctrlKey || t.metaKey || t.shiftKey || a.attr('target'))) {
            var i = r(function () {
                e.go(s.state, l, d);
              });
            t.preventDefault();
            var o = p && !f ? 1 : 0;
            t.preventDefault = function () {
              o-- <= 0 && r.cancel(i);
            };
          }
        });
      }
    };
  }
  function q(e, t, r) {
    return {
      restrict: 'A',
      controller: [
        '$scope',
        '$element',
        '$attrs',
        function (t, n, i) {
          function a() {
            o() ? n.addClass(l) : n.removeClass(l);
          }
          function o() {
            return 'undefined' != typeof i.uiSrefActiveEq ? u && e.is(u.name, s) : u && e.includes(u.name, s);
          }
          var u, s, l;
          l = r(i.uiSrefActiveEq || i.uiSrefActive || '', !1)(t), this.$$setStateInfo = function (t, r) {
            u = e.get(t, O(n)), s = r, a();
          }, t.$on('$stateChangeSuccess', a);
        }
      ]
    };
  }
  function C(e) {
    var t = function (t) {
      return e.is(t);
    };
    return t.$stateful = !0, t;
  }
  function k(e) {
    var t = function (t) {
      return e.includes(t);
    };
    return t.$stateful = !0, t;
  }
  var I = t.isDefined, V = t.isFunction, M = t.isString, F = t.isObject, N = t.isArray, R = t.forEach, D = t.extend, U = t.copy;
  t.module('ui.router.util', ['ng']), t.module('ui.router.router', ['ui.router.util']), t.module('ui.router.state', [
    'ui.router.router',
    'ui.router.util'
  ]), t.module('ui.router', ['ui.router.state']), t.module('ui.router.compat', ['ui.router']), v.$inject = [
    '$q',
    '$injector'
  ], t.module('ui.router.util').service('$resolve', v), $.$inject = [
    '$http',
    '$templateCache',
    '$injector'
  ], t.module('ui.router.util').service('$templateFactory', $);
  var T;
  d.prototype.concat = function (e, t) {
    var r = {
        caseInsensitive: T.caseInsensitive(),
        strict: T.strictMode(),
        squash: T.defaultSquashPolicy()
      };
    return new d(this.sourcePath + e + this.sourceSearch, D(r, t), this);
  }, d.prototype.toString = function () {
    return this.source;
  }, d.prototype.exec = function (e, t) {
    function r(e) {
      function t(e) {
        return e.split('').reverse().join('');
      }
      function r(e) {
        return e.replace(/\\-/, '-');
      }
      var n = t(e).split(/-(?!\\)/), i = h(n, t);
      return h(i, r).reverse();
    }
    var n = this.regexp.exec(e);
    if (!n)
      return null;
    t = t || {};
    var i, a, o, u = this.parameters(), s = u.length, l = this.segments.length - 1, c = {};
    if (l !== n.length - 1)
      throw new Error('Unbalanced capture group in route \'' + this.source + '\'');
    for (i = 0; l > i; i++) {
      o = u[i];
      var f = this.params[o], p = n[i + 1];
      for (a = 0; a < f.replace; a++)
        f.replace[a].from === p && (p = f.replace[a].to);
      p && f.array === !0 && (p = r(p)), c[o] = f.value(p);
    }
    for (; s > i; i++)
      o = u[i], c[o] = this.params[o].value(t[o]);
    return c;
  }, d.prototype.parameters = function (e) {
    return I(e) ? this.params[e] || null : this.$$paramNames;
  }, d.prototype.validates = function (e) {
    return this.params.$$validates(e);
  }, d.prototype.format = function (e) {
    function t(e) {
      return encodeURIComponent(e).replace(/-/g, function (e) {
        return '%5C%' + e.charCodeAt(0).toString(16).toUpperCase();
      });
    }
    e = e || {};
    var r = this.segments, n = this.parameters(), i = this.params;
    if (!this.validates(e))
      return null;
    var a, o = !1, u = r.length - 1, s = n.length, l = r[0];
    for (a = 0; s > a; a++) {
      var c = u > a, f = n[a], p = i[f], v = p.value(e[f]), $ = p.isOptional && p.type.equals(p.value(), v), d = !!$ && p.squash, m = p.type.encode(v);
      if (c) {
        var g = r[a + 1];
        if (d === !1)
          null != m && (l += N(m) ? h(m, t).join('-') : encodeURIComponent(m)), l += g;
        else if (d === !0) {
          var w = l.match(/\/$/) ? /\/?(.*)/ : /(.*)/;
          l += g.match(w)[1];
        } else
          M(d) && (l += d + g);
      } else {
        if (null == m || $ && d !== !1)
          continue;
        N(m) || (m = [m]), m = h(m, encodeURIComponent).join('&' + f + '='), l += (o ? '&' : '?') + (f + '=' + m), o = !0;
      }
    }
    return l;
  }, m.prototype.is = function () {
    return !0;
  }, m.prototype.encode = function (e) {
    return e;
  }, m.prototype.decode = function (e) {
    return e;
  }, m.prototype.equals = function (e, t) {
    return e == t;
  }, m.prototype.$subPattern = function () {
    var e = this.pattern.toString();
    return e.substr(1, e.length - 2);
  }, m.prototype.pattern = /.*/, m.prototype.toString = function () {
    return '{Type:' + this.name + '}';
  }, m.prototype.$asArray = function (e, t) {
    function n(e, t) {
      function n(e, t) {
        return function () {
          return e[t].apply(e, arguments);
        };
      }
      function i(e) {
        return N(e) ? e : I(e) ? [e] : [];
      }
      function a(e) {
        switch (e.length) {
        case 0:
          return r;
        case 1:
          return 'auto' === t ? e[0] : e;
        default:
          return e;
        }
      }
      function o(e) {
        return !e;
      }
      function u(e, t) {
        return function (r) {
          r = i(r);
          var n = h(r, e);
          return t === !0 ? 0 === p(n, o).length : a(n);
        };
      }
      function s(e) {
        return function (t, r) {
          var n = i(t), a = i(r);
          if (n.length !== a.length)
            return !1;
          for (var o = 0; o < n.length; o++)
            if (!e(n[o], a[o]))
              return !1;
          return !0;
        };
      }
      this.encode = u(n(e, 'encode')), this.decode = u(n(e, 'decode')), this.is = u(n(e, 'is'), !0), this.equals = s(n(e, 'equals')), this.pattern = e.pattern, this.$arrayMode = t;
    }
    if (!e)
      return this;
    if ('auto' === e && !t)
      throw new Error('\'auto\' array mode is for query parameters only');
    return new n(this, e);
  }, t.module('ui.router.util').provider('$urlMatcherFactory', g), t.module('ui.router.util').run([
    '$urlMatcherFactory',
    function () {
    }
  ]), w.$inject = [
    '$locationProvider',
    '$urlMatcherFactoryProvider'
  ], t.module('ui.router.router').provider('$urlRouter', w), y.$inject = [
    '$urlRouterProvider',
    '$urlMatcherFactoryProvider'
  ], t.module('ui.router.state').value('$stateParams', {}).provider('$state', y), b.$inject = [], t.module('ui.router.state').provider('$view', b), t.module('ui.router.state').provider('$uiViewScroll', E), S.$inject = [
    '$state',
    '$injector',
    '$uiViewScroll',
    '$interpolate'
  ], x.$inject = [
    '$compile',
    '$controller',
    '$state',
    '$interpolate'
  ], t.module('ui.router.state').directive('uiView', S), t.module('ui.router.state').directive('uiView', x), A.$inject = [
    '$state',
    '$timeout'
  ], q.$inject = [
    '$state',
    '$stateParams',
    '$interpolate'
  ], t.module('ui.router.state').directive('uiSref', A).directive('uiSrefActive', q).directive('uiSrefActiveEq', q), C.$inject = ['$state'], k.$inject = ['$state'], t.module('ui.router.state').filter('isState', C).filter('includedByState', k);
}(window, window.angular), define('angular-ui-router.min', function () {
});
/*
 AngularJS v1.2.3
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
!function (t, e, n) {
  'use strict';
  function r(t) {
    return function () {
      var e, n = arguments[0], n = '[' + (t ? t + ':' : '') + n + '] http://errors.angularjs.org/1.2.3/' + (t ? t + '/' : '') + n;
      for (e = 1; e < arguments.length; e++)
        n = n + (1 == e ? '?' : '&') + 'p' + (e - 1) + '=' + encodeURIComponent('function' == typeof arguments[e] ? arguments[e].toString().replace(/ \{[\s\S]*$/, '') : 'undefined' == typeof arguments[e] ? 'undefined' : 'string' != typeof arguments[e] ? JSON.stringify(arguments[e]) : arguments[e]);
      return Error(n);
    };
  }
  function i(t) {
    if (null == t || E(t))
      return !1;
    var e = t.length;
    return !(1 !== t.nodeType || !e) || (w(t) || S(t) || 0 === e || 'number' == typeof e && 0 < e && e - 1 in t);
  }
  function o(t, e, n) {
    var r;
    if (t)
      if (C(t))
        for (r in t)
          'prototype' != r && 'length' != r && 'name' != r && t.hasOwnProperty(r) && e.call(n, t[r], r);
      else if (t.forEach && t.forEach !== o)
        t.forEach(e, n);
      else if (i(t))
        for (r = 0; r < t.length; r++)
          e.call(n, t[r], r);
      else
        for (r in t)
          t.hasOwnProperty(r) && e.call(n, t[r], r);
    return t;
  }
  function s(t) {
    var e, n = [];
    for (e in t)
      t.hasOwnProperty(e) && n.push(e);
    return n.sort();
  }
  function a(t, e, n) {
    for (var r = s(t), i = 0; i < r.length; i++)
      e.call(n, t[r[i]], r[i]);
    return r;
  }
  function u(t) {
    return function (e, n) {
      t(n, e);
    };
  }
  function c() {
    for (var t, e = Qe.length; e;) {
      if (e--, t = Qe[e].charCodeAt(0), 57 == t)
        return Qe[e] = 'A', Qe.join('');
      if (90 != t)
        return Qe[e] = String.fromCharCode(t + 1), Qe.join('');
      Qe[e] = '0';
    }
    return Qe.unshift('0'), Qe.join('');
  }
  function l(t, e) {
    e ? t.$$hashKey = e : delete t.$$hashKey;
  }
  function f(t) {
    var e = t.$$hashKey;
    return o(arguments, function (e) {
      e !== t && o(e, function (e, n) {
        t[n] = e;
      });
    }), l(t, e), t;
  }
  function h(t) {
    return parseInt(t, 10);
  }
  function p(t, e) {
    return f(new (f(function () {
    }, { prototype: t }))(), e);
  }
  function $() {
  }
  function d(t) {
    return t;
  }
  function v(t) {
    return function () {
      return t;
    };
  }
  function g(t) {
    return 'undefined' == typeof t;
  }
  function m(t) {
    return 'undefined' != typeof t;
  }
  function y(t) {
    return null != t && 'object' == typeof t;
  }
  function w(t) {
    return 'string' == typeof t;
  }
  function x(t) {
    return 'number' == typeof t;
  }
  function b(t) {
    return '[object Date]' == ze.apply(t);
  }
  function S(t) {
    return '[object Array]' == ze.apply(t);
  }
  function C(t) {
    return 'function' == typeof t;
  }
  function k(t) {
    return '[object RegExp]' == ze.apply(t);
  }
  function E(t) {
    return t && t.document && t.location && t.alert && t.setInterval;
  }
  function A(t) {
    return t && (t.nodeName || t.on && t.find);
  }
  function O(t, e, n) {
    var r = [];
    return o(t, function (t, i, o) {
      r.push(e.call(n, t, i, o));
    }), r;
  }
  function T(t, e) {
    if (t.indexOf)
      return t.indexOf(e);
    for (var n = 0; n < t.length; n++)
      if (e === t[n])
        return n;
    return -1;
  }
  function M(t, e) {
    var n = T(t, e);
    return 0 <= n && t.splice(n, 1), e;
  }
  function N(t, e) {
    if (E(t) || t && t.$evalAsync && t.$watch)
      throw We('cpws');
    if (e) {
      if (t === e)
        throw We('cpi');
      if (S(t))
        for (var n = e.length = 0; n < t.length; n++)
          e.push(N(t[n]));
      else {
        n = e.$$hashKey, o(e, function (t, n) {
          delete e[n];
        });
        for (var r in t)
          e[r] = N(t[r]);
        l(e, n);
      }
    } else
      (e = t) && (S(t) ? e = N(t, []) : b(t) ? e = new Date(t.getTime()) : k(t) ? e = RegExp(t.source) : y(t) && (e = N(t, {})));
    return e;
  }
  function P(t, e) {
    e = e || {};
    for (var n in t)
      t.hasOwnProperty(n) && '$$' !== n.substr(0, 2) && (e[n] = t[n]);
    return e;
  }
  function j(t, e) {
    if (t === e)
      return !0;
    if (null === t || null === e)
      return !1;
    if (t !== t && e !== e)
      return !0;
    var r, i = typeof t;
    if (i == typeof e && 'object' == i) {
      if (!S(t)) {
        if (b(t))
          return b(e) && t.getTime() == e.getTime();
        if (k(t) && k(e))
          return t.toString() == e.toString();
        if (t && t.$evalAsync && t.$watch || e && e.$evalAsync && e.$watch || E(t) || E(e) || S(e))
          return !1;
        i = {};
        for (r in t)
          if ('$' !== r.charAt(0) && !C(t[r])) {
            if (!j(t[r], e[r]))
              return !1;
            i[r] = !0;
          }
        for (r in e)
          if (!i.hasOwnProperty(r) && '$' !== r.charAt(0) && e[r] !== n && !C(e[r]))
            return !1;
        return !0;
      }
      if (!S(e))
        return !1;
      if ((i = t.length) == e.length) {
        for (r = 0; r < i; r++)
          if (!j(t[r], e[r]))
            return !1;
        return !0;
      }
    }
    return !1;
  }
  function D() {
    return e.securityPolicy && e.securityPolicy.isActive || e.querySelector && !(!e.querySelector('[ng-csp]') && !e.querySelector('[data-ng-csp]'));
  }
  function R(t, e) {
    var n = 2 < arguments.length ? _e.call(arguments, 2) : [];
    return !C(e) || e instanceof RegExp ? e : n.length ? function () {
      return arguments.length ? e.apply(t, n.concat(_e.call(arguments, 0))) : e.apply(t, n);
    } : function () {
      return arguments.length ? e.apply(t, arguments) : e.call(t);
    };
  }
  function V(t, r) {
    var i = r;
    return 'string' == typeof t && '$' === t.charAt(0) ? i = n : E(r) ? i = '$WINDOW' : r && e === r ? i = '$DOCUMENT' : r && r.$evalAsync && r.$watch && (i = '$SCOPE'), i;
  }
  function q(t, e) {
    return 'undefined' == typeof t ? n : JSON.stringify(t, V, e ? '  ' : null);
  }
  function U(t) {
    return w(t) ? JSON.parse(t) : t;
  }
  function I(t) {
    return t && 0 !== t.length ? (t = Fe('' + t), t = !('f' == t || '0' == t || 'false' == t || 'no' == t || 'n' == t || '[]' == t)) : t = !1, t;
  }
  function H(t) {
    t = qe(t).clone();
    try {
      t.html('');
    } catch (t) {
    }
    var e = qe('<div>').append(t).html();
    try {
      return 3 === t[0].nodeType ? Fe(e) : e.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function (t, e) {
        return '<' + Fe(e);
      });
    } catch (t) {
      return Fe(e);
    }
  }
  function F(t) {
    try {
      return decodeURIComponent(t);
    } catch (t) {
    }
  }
  function L(t) {
    var e, n, r = {};
    return o((t || '').split('&'), function (t) {
      t && (e = t.split('='), n = F(e[0]), m(n) && (t = !m(e[1]) || F(e[1]), r[n] ? S(r[n]) ? r[n].push(t) : r[n] = [
        r[n],
        t
      ] : r[n] = t));
    }), r;
  }
  function _(t) {
    var e = [];
    return o(t, function (t, n) {
      S(t) ? o(t, function (t) {
        e.push(z(n, !0) + (!0 === t ? '' : '=' + z(t, !0)));
      }) : e.push(z(n, !0) + (!0 === t ? '' : '=' + z(t, !0)));
    }), e.length ? e.join('&') : '';
  }
  function B(t) {
    return z(t, !0).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');
  }
  function z(t, e) {
    return encodeURIComponent(t).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, e ? '%20' : '+');
  }
  function W(t, n) {
    function r(t) {
      t && a.push(t);
    }
    var i, s, a = [t], u = [
        'ng:app',
        'ng-app',
        'x-ng-app',
        'data-ng-app'
      ], c = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
    o(u, function (n) {
      u[n] = !0, r(e.getElementById(n)), n = n.replace(':', '\\:'), t.querySelectorAll && (o(t.querySelectorAll('.' + n), r), o(t.querySelectorAll('.' + n + '\\:'), r), o(t.querySelectorAll('[' + n + ']'), r));
    }), o(a, function (t) {
      if (!i) {
        var e = c.exec(' ' + t.className + ' ');
        e ? (i = t, s = (e[2] || '').replace(/\s+/g, ',')) : o(t.attributes, function (e) {
          !i && u[e.name] && (i = t, s = e.value);
        });
      }
    }), i && n(i, s ? [s] : []);
  }
  function J(n, r) {
    var i = function () {
        if (n = qe(n), n.injector()) {
          var t = n[0] === e ? 'document' : H(n);
          throw We('btstrpd', t);
        }
        return r = r || [], r.unshift([
          '$provide',
          function (t) {
            t.value('$rootElement', n);
          }
        ]), r.unshift('ng'), t = xt(r), t.invoke([
          '$rootScope',
          '$rootElement',
          '$compile',
          '$injector',
          '$animate',
          function (t, e, n, r, i) {
            t.$apply(function () {
              e.data('$injector', r), n(e)(t);
            });
          }
        ]), t;
      }, s = /^NG_DEFER_BOOTSTRAP!/;
    return t && !s.test(t.name) ? i() : (t.name = t.name.replace(s, ''), void (Je.resumeBootstrap = function (t) {
      o(t, function (t) {
        r.push(t);
      }), i();
    }));
  }
  function Q(t, e) {
    return e = e || '_', t.replace(Xe, function (t, n) {
      return (n ? e : '') + t.toLowerCase();
    });
  }
  function Z(t, e, n) {
    if (!t)
      throw We('areq', e || '?', n || 'required');
    return t;
  }
  function X(t, e, n) {
    return n && S(t) && (t = t[t.length - 1]), Z(C(t), e, 'not a function, got ' + (t && 'object' == typeof t ? t.constructor.name || 'Object' : typeof t)), t;
  }
  function K(t, e) {
    if ('hasOwnProperty' === t)
      throw We('badname', e);
  }
  function Y(t, e, n) {
    if (!e)
      return t;
    e = e.split('.');
    for (var r, i = t, o = e.length, s = 0; s < o; s++)
      r = e[s], t && (t = (i = t)[r]);
    return !n && C(t) ? R(i, t) : t;
  }
  function G(t) {
    if (t.startNode === t.endNode)
      return qe(t.startNode);
    var e = t.startNode, n = [e];
    do {
      if (e = e.nextSibling, !e)
        break;
      n.push(e);
    } while (e !== t.endNode);
    return qe(n);
  }
  function tt(t) {
    var e = r('$injector'), n = r('ng');
    return t = t.angular || (t.angular = {}), t.$$minErr = t.$$minErr || r, t.module || (t.module = function () {
      var t = {};
      return function (r, i, o) {
        if ('hasOwnProperty' === r)
          throw n('badname', 'module');
        return i && t.hasOwnProperty(r) && (t[r] = null), t[r] || (t[r] = function () {
          function t(t, e, r) {
            return function () {
              return n[r || 'push']([
                t,
                e,
                arguments
              ]), u;
            };
          }
          if (!i)
            throw e('nomod', r);
          var n = [], s = [], a = t('$injector', 'invoke'), u = {
              _invokeQueue: n,
              _runBlocks: s,
              requires: i,
              name: r,
              provider: t('$provide', 'provider'),
              factory: t('$provide', 'factory'),
              service: t('$provide', 'service'),
              value: t('$provide', 'value'),
              constant: t('$provide', 'constant', 'unshift'),
              animation: t('$animateProvider', 'register'),
              filter: t('$filterProvider', 'register'),
              controller: t('$controllerProvider', 'register'),
              directive: t('$compileProvider', 'directive'),
              config: a,
              run: function (t) {
                return s.push(t), this;
              }
            };
          return o && a(o), u;
        }());
      };
    }());
  }
  function et(t) {
    return t.replace(rn, function (t, e, n, r) {
      return r ? n.toUpperCase() : n;
    }).replace(on, 'Moz$1');
  }
  function nt(t, e, n, r) {
    function i(t) {
      var i, s, a, u, c, l, f = n && t ? [this.filter(t)] : [this], h = e;
      if (!r || null != t)
        for (; f.length;)
          for (i = f.shift(), s = 0, a = i.length; s < a; s++)
            for (u = qe(i[s]), h ? u.triggerHandler('$destroy') : h = !h, c = 0, u = (l = u.children()).length; c < u; c++)
              f.push(Ue(l[c]));
      return o.apply(this, arguments);
    }
    var o = Ue.fn[t], o = o.$original || o;
    i.$original = o, Ue.fn[t] = i;
  }
  function rt(t) {
    if (t instanceof rt)
      return t;
    if (!(this instanceof rt)) {
      if (w(t) && '<' != t.charAt(0))
        throw sn('nosel');
      return new rt(t);
    }
    if (w(t)) {
      var n = e.createElement('div');
      n.innerHTML = '<div>&#160;</div>' + t, n.removeChild(n.firstChild), pt(this, n.childNodes), qe(e.createDocumentFragment()).append(this);
    } else
      pt(this, t);
  }
  function it(t) {
    return t.cloneNode(!0);
  }
  function ot(t) {
    at(t);
    var e = 0;
    for (t = t.childNodes || []; e < t.length; e++)
      ot(t[e]);
  }
  function st(t, e, n, r) {
    if (m(r))
      throw sn('offargs');
    var i = ut(t, 'events');
    ut(t, 'handle') && (g(e) ? o(i, function (e, n) {
      nn(t, n, e), delete i[n];
    }) : o(e.split(' '), function (e) {
      g(n) ? (nn(t, e, i[e]), delete i[e]) : M(i[e] || [], n);
    }));
  }
  function at(t, e) {
    var r = t[Ge], i = Ye[r];
    i && (e ? delete Ye[r].data[e] : (i.handle && (i.events.$destroy && i.handle({}, '$destroy'), st(t)), delete Ye[r], t[Ge] = n));
  }
  function ut(t, e, n) {
    var r = t[Ge], r = Ye[r || -1];
    return m(n) ? (r || (t[Ge] = r = ++tn, r = Ye[r] = {}), void (r[e] = n)) : r && r[e];
  }
  function ct(t, e, n) {
    var r = ut(t, 'data'), i = m(n), o = !i && m(e), s = o && !y(e);
    if (r || s || ut(t, 'data', r = {}), i)
      r[e] = n;
    else {
      if (!o)
        return r;
      if (s)
        return r && r[e];
      f(r, e);
    }
  }
  function lt(t, e) {
    return !!t.getAttribute && -1 < (' ' + (t.getAttribute('class') || '') + ' ').replace(/[\n\t]/g, ' ').indexOf(' ' + e + ' ');
  }
  function ft(t, e) {
    e && t.setAttribute && o(e.split(' '), function (e) {
      t.setAttribute('class', Ze((' ' + (t.getAttribute('class') || '') + ' ').replace(/[\n\t]/g, ' ').replace(' ' + Ze(e) + ' ', ' ')));
    });
  }
  function ht(t, e) {
    if (e && t.setAttribute) {
      var n = (' ' + (t.getAttribute('class') || '') + ' ').replace(/[\n\t]/g, ' ');
      o(e.split(' '), function (t) {
        t = Ze(t), -1 === n.indexOf(' ' + t + ' ') && (n += t + ' ');
      }), t.setAttribute('class', Ze(n));
    }
  }
  function pt(t, e) {
    if (e) {
      e = e.nodeName || !m(e.length) || E(e) ? [e] : e;
      for (var n = 0; n < e.length; n++)
        t.push(e[n]);
    }
  }
  function $t(t, e) {
    return dt(t, '$' + (e || 'ngController') + 'Controller');
  }
  function dt(t, e, r) {
    for (t = qe(t), 9 == t[0].nodeType && (t = t.find('html')), e = S(e) ? e : [e]; t.length;) {
      for (var i = 0, o = e.length; i < o; i++)
        if ((r = t.data(e[i])) !== n)
          return r;
      t = t.parent();
    }
  }
  function vt(t, e) {
    var n = un[e.toLowerCase()];
    return n && cn[t.nodeName] && n;
  }
  function gt(t, n) {
    var r = function (r, i) {
      if (r.preventDefault || (r.preventDefault = function () {
          r.returnValue = !1;
        }), r.stopPropagation || (r.stopPropagation = function () {
          r.cancelBubble = !0;
        }), r.target || (r.target = r.srcElement || e), g(r.defaultPrevented)) {
        var s = r.preventDefault;
        r.preventDefault = function () {
          r.defaultPrevented = !0, s.call(r);
        }, r.defaultPrevented = !1;
      }
      r.isDefaultPrevented = function () {
        return r.defaultPrevented || !1 === r.returnValue;
      }, o(n[i || r.type], function (e) {
        e.call(t, r);
      }), 8 >= Ve ? (r.preventDefault = null, r.stopPropagation = null, r.isDefaultPrevented = null) : (delete r.preventDefault, delete r.stopPropagation, delete r.isDefaultPrevented);
    };
    return r.elem = t, r;
  }
  function mt(t) {
    var e, r = typeof t;
    return 'object' == r && null !== t ? 'function' == typeof (e = t.$$hashKey) ? e = t.$$hashKey() : e === n && (e = t.$$hashKey = c()) : e = t, r + ':' + e;
  }
  function yt(t) {
    o(t, this.put, this);
  }
  function wt(t) {
    var e, n;
    return 'function' == typeof t ? (e = t.$inject) || (e = [], t.length && (n = t.toString().replace(pn, ''), n = n.match(ln), o(n[1].split(fn), function (t) {
      t.replace(hn, function (t, n, r) {
        e.push(r);
      });
    })), t.$inject = e) : S(t) ? (n = t.length - 1, X(t[n], 'fn'), e = t.slice(0, n)) : X(t, 'fn', !0), e;
  }
  function xt(t) {
    function e(t) {
      return function (e, n) {
        return y(e) ? void o(e, u(t)) : t(e, n);
      };
    }
    function n(t, e) {
      if (K(t, 'service'), (C(e) || S(e)) && (e = p.instantiate(e)), !e.$get)
        throw $n('pget', t);
      return h[t + c] = e;
    }
    function r(t, e) {
      return n(t, { $get: e });
    }
    function i(t) {
      var e, n, r, s, a = [];
      return o(t, function (t) {
        if (!f.get(t)) {
          f.put(t, !0);
          try {
            if (w(t))
              for (e = Ie(t), a = a.concat(i(e.requires)).concat(e._runBlocks), n = e._invokeQueue, r = 0, s = n.length; r < s; r++) {
                var o = n[r], u = p.get(o[0]);
                u[o[1]].apply(u, o[2]);
              }
            else
              C(t) ? a.push(p.invoke(t)) : S(t) ? a.push(p.invoke(t)) : X(t, 'module');
          } catch (e) {
            throw S(t) && (t = t[t.length - 1]), e.message && e.stack && -1 == e.stack.indexOf(e.message) && (e = e.message + '\n' + e.stack), $n('modulerr', t, e.stack || e.message || e);
          }
        }
      }), a;
    }
    function s(t, e) {
      function n(n) {
        if (t.hasOwnProperty(n)) {
          if (t[n] === a)
            throw $n('cdep', l.join(' <- '));
          return t[n];
        }
        try {
          return l.unshift(n), t[n] = a, t[n] = e(n);
        } finally {
          l.shift();
        }
      }
      function r(t, e, r) {
        var i, o, s, a = [], u = wt(t);
        for (o = 0, i = u.length; o < i; o++) {
          if (s = u[o], 'string' != typeof s)
            throw $n('itkn', s);
          a.push(r && r.hasOwnProperty(s) ? r[s] : n(s));
        }
        switch (t.$inject || (t = t[i]), e ? -1 : a.length) {
        case 0:
          return t();
        case 1:
          return t(a[0]);
        case 2:
          return t(a[0], a[1]);
        case 3:
          return t(a[0], a[1], a[2]);
        case 4:
          return t(a[0], a[1], a[2], a[3]);
        case 5:
          return t(a[0], a[1], a[2], a[3], a[4]);
        case 6:
          return t(a[0], a[1], a[2], a[3], a[4], a[5]);
        case 7:
          return t(a[0], a[1], a[2], a[3], a[4], a[5], a[6]);
        case 8:
          return t(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]);
        case 9:
          return t(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
        case 10:
          return t(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9]);
        default:
          return t.apply(e, a);
        }
      }
      return {
        invoke: r,
        instantiate: function (t, e) {
          var n, i = function () {
            };
          return i.prototype = (S(t) ? t[t.length - 1] : t).prototype, i = new i(), n = r(t, i, e), y(n) || C(n) ? n : i;
        },
        get: n,
        annotate: wt,
        has: function (e) {
          return h.hasOwnProperty(e + c) || t.hasOwnProperty(e);
        }
      };
    }
    var a = {}, c = 'Provider', l = [], f = new yt(), h = {
        $provide: {
          provider: e(n),
          factory: e(r),
          service: e(function (t, e) {
            return r(t, [
              '$injector',
              function (t) {
                return t.instantiate(e);
              }
            ]);
          }),
          value: e(function (t, e) {
            return r(t, v(e));
          }),
          constant: e(function (t, e) {
            K(t, 'constant'), h[t] = e, d[t] = e;
          }),
          decorator: function (t, e) {
            var n = p.get(t + c), r = n.$get;
            n.$get = function () {
              var t = g.invoke(r, n);
              return g.invoke(e, null, { $delegate: t });
            };
          }
        }
      }, p = h.$injector = s(h, function () {
        throw $n('unpr', l.join(' <- '));
      }), d = {}, g = d.$injector = s(d, function (t) {
        return t = p.get(t + c), g.invoke(t.$get, t);
      });
    return o(i(t), function (t) {
      g.invoke(t || $);
    }), g;
  }
  function bt() {
    var t = !0;
    this.disableAutoScrolling = function () {
      t = !1;
    }, this.$get = [
      '$window',
      '$location',
      '$rootScope',
      function (e, n, r) {
        function i(t) {
          var e = null;
          return o(t, function (t) {
            e || 'a' !== Fe(t.nodeName) || (e = t);
          }), e;
        }
        function s() {
          var t, r = n.hash();
          r ? (t = a.getElementById(r)) ? t.scrollIntoView() : (t = i(a.getElementsByName(r))) ? t.scrollIntoView() : 'top' === r && e.scrollTo(0, 0) : e.scrollTo(0, 0);
        }
        var a = e.document;
        return t && r.$watch(function () {
          return n.hash();
        }, function () {
          r.$evalAsync(s);
        }), s;
      }
    ];
  }
  function St(t, e, r, i) {
    function s(t) {
      try {
        t.apply(null, _e.call(arguments, 1));
      } finally {
        if (m--, 0 === m)
          for (; y.length;)
            try {
              y.pop()();
            } catch (t) {
              r.error(t);
            }
      }
    }
    function a(t, e) {
      !function n() {
        o(b, function (t) {
          t();
        }), x = e(n, t);
      }();
    }
    function u() {
      k = null, S != c.url() && (S = c.url(), o(E, function (t) {
        t(c.url());
      }));
    }
    var c = this, l = e[0], f = t.location, h = t.history, p = t.setTimeout, d = t.clearTimeout, v = {};
    c.isMock = !1;
    var m = 0, y = [];
    c.$$completeOutstandingRequest = s, c.$$incOutstandingRequestCount = function () {
      m++;
    }, c.notifyWhenNoOutstandingRequests = function (t) {
      o(b, function (t) {
        t();
      }), 0 === m ? t() : y.push(t);
    };
    var x, b = [];
    c.addPollFn = function (t) {
      return g(x) && a(100, p), b.push(t), t;
    };
    var S = f.href, C = e.find('base'), k = null;
    c.url = function (e, n) {
      return f !== t.location && (f = t.location), e ? S != e ? (S = e, i.history ? n ? h.replaceState(null, '', e) : (h.pushState(null, '', e), C.attr('href', C.attr('href'))) : (k = e, n ? f.replace(e) : f.href = e), c) : void 0 : k || f.href.replace(/%27/g, '\'');
    };
    var E = [], A = !1;
    c.onUrlChange = function (e) {
      return A || (i.history && qe(t).on('popstate', u), i.hashchange ? qe(t).on('hashchange', u) : c.addPollFn(u), A = !0), E.push(e), e;
    }, c.baseHref = function () {
      var t = C.attr('href');
      return t ? t.replace(/^https?\:\/\/[^\/]*/, '') : '';
    };
    var O = {}, T = '', M = c.baseHref();
    c.cookies = function (t, e) {
      var i, o, s, a;
      if (!t) {
        if (l.cookie !== T)
          for (T = l.cookie, i = T.split('; '), O = {}, s = 0; s < i.length; s++)
            o = i[s], a = o.indexOf('='), 0 < a && (t = unescape(o.substring(0, a)), O[t] === n && (O[t] = unescape(o.substring(a + 1))));
        return O;
      }
      e === n ? l.cookie = escape(t) + '=;path=' + M + ';expires=Thu, 01 Jan 1970 00:00:00 GMT' : w(e) && (i = (l.cookie = escape(t) + '=' + escape(e) + ';path=' + M).length + 1, 4096 < i && r.warn('Cookie \'' + t + '\' possibly not set or overflowed because it was too large (' + i + ' > 4096 bytes)!'));
    }, c.defer = function (t, e) {
      var n;
      return m++, n = p(function () {
        delete v[n], s(t);
      }, e || 0), v[n] = !0, n;
    }, c.defer.cancel = function (t) {
      return !!v[t] && (delete v[t], d(t), s($), !0);
    };
  }
  function Ct() {
    this.$get = [
      '$window',
      '$log',
      '$sniffer',
      '$document',
      function (t, e, n, r) {
        return new St(t, r, e, n);
      }
    ];
  }
  function kt() {
    this.$get = function () {
      function t(t, n) {
        function i(t) {
          t != h && (p ? p == t && (p = t.n) : p = t, o(t.n, t.p), o(t, h), h = t, h.n = null);
        }
        function o(t, e) {
          t != e && (t && (t.p = e), e && (e.n = t));
        }
        if (t in e)
          throw r('$cacheFactory')('iid', t);
        var s = 0, a = f({}, n, { id: t }), u = {}, c = n && n.capacity || Number.MAX_VALUE, l = {}, h = null, p = null;
        return e[t] = {
          put: function (t, e) {
            var n = l[t] || (l[t] = { key: t });
            if (i(n), !g(e))
              return t in u || s++, u[t] = e, s > c && this.remove(p.key), e;
          },
          get: function (t) {
            var e = l[t];
            if (e)
              return i(e), u[t];
          },
          remove: function (t) {
            var e = l[t];
            e && (e == h && (h = e.p), e == p && (p = e.n), o(e.n, e.p), delete l[t], delete u[t], s--);
          },
          removeAll: function () {
            u = {}, s = 0, l = {}, h = p = null;
          },
          destroy: function () {
            l = a = u = null, delete e[t];
          },
          info: function () {
            return f({}, a, { size: s });
          }
        };
      }
      var e = {};
      return t.info = function () {
        var t = {};
        return o(e, function (e, n) {
          t[n] = e.info();
        }), t;
      }, t.get = function (t) {
        return e[t];
      }, t;
    };
  }
  function Et() {
    this.$get = [
      '$cacheFactory',
      function (t) {
        return t('templates');
      }
    ];
  }
  function At(t, r) {
    var i = {}, s = 'Directive', a = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/, c = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/, l = /^(on[a-z]+|formaction)$/;
    this.directive = function e(n, r) {
      return K(n, 'directive'), w(n) ? (Z(r, 'directiveFactory'), i.hasOwnProperty(n) || (i[n] = [], t.factory(n + s, [
        '$injector',
        '$exceptionHandler',
        function (t, e) {
          var r = [];
          return o(i[n], function (i, o) {
            try {
              var s = t.invoke(i);
              C(s) ? s = { compile: v(s) } : !s.compile && s.link && (s.compile = v(s.link)), s.priority = s.priority || 0, s.index = o, s.name = s.name || n, s.require = s.require || s.controller && s.name, s.restrict = s.restrict || 'A', r.push(s);
            } catch (t) {
              e(t);
            }
          }), r;
        }
      ])), i[n].push(r)) : o(n, u(e)), this;
    }, this.aHrefSanitizationWhitelist = function (t) {
      return m(t) ? (r.aHrefSanitizationWhitelist(t), this) : r.aHrefSanitizationWhitelist();
    }, this.imgSrcSanitizationWhitelist = function (t) {
      return m(t) ? (r.imgSrcSanitizationWhitelist(t), this) : r.imgSrcSanitizationWhitelist();
    }, this.$get = [
      '$injector',
      '$interpolate',
      '$exceptionHandler',
      '$http',
      '$templateCache',
      '$parse',
      '$controller',
      '$rootScope',
      '$document',
      '$sce',
      '$animate',
      '$$sanitizeUri',
      function (t, r, u, h, $, g, m, x, b, k, E, A) {
        function O(t, e, n, r, i) {
          t instanceof qe || (t = qe(t)), o(t, function (e, n) {
            3 == e.nodeType && e.nodeValue.match(/\S+/) && (t[n] = qe(e).wrap('<span></span>').parent()[0]);
          });
          var s = M(t, e, t, n, r, i);
          return function (e, n, r) {
            Z(e, 'scope');
            var i = n ? an.clone.call(t) : t;
            o(r, function (t, e) {
              i.data('$' + e + 'Controller', t);
            }), r = 0;
            for (var a = i.length; r < a; r++) {
              var u = i[r];
              1 != u.nodeType && 9 != u.nodeType || i.eq(r).data('$scope', e);
            }
            return T(i, 'ng-scope'), n && n(i, e), s && s(e, i, i), i;
          };
        }
        function T(t, e) {
          try {
            t.addClass(e);
          } catch (t) {
          }
        }
        function M(t, e, r, i, o, s) {
          function a(t, r, i, o) {
            var s, a, u, c, l, h, p, $ = [];
            for (l = 0, h = r.length; l < h; l++)
              $.push(r[l]);
            for (p = l = 0, h = f.length; l < h; p++)
              a = $[p], r = f[l++], s = f[l++], u = qe(a), r ? (r.scope ? (c = t.$new(), u.data('$scope', c), T(u, 'ng-scope')) : c = t, (u = r.transclude) || !o && e ? r(s, c, a, i, N(t, u || e)) : r(s, c, a, n, o)) : s && s(t, a.childNodes, n, o);
          }
          for (var u, c, l, f = [], h = 0; h < t.length; h++)
            c = new Y(), u = j(t[h], [], c, 0 === h ? i : n, o), u = (s = u.length ? q(u, t[h], c, e, r, null, [], [], s) : null) && s.terminal || !t[h].childNodes || !t[h].childNodes.length ? null : M(t[h].childNodes, s ? s.transclude : e), f.push(s), f.push(u), l = l || s || u, s = null;
          return l ? a : null;
        }
        function N(t, e) {
          return function (n, r, i) {
            var o = !1;
            return n || (n = t.$new(), o = n.$$transcluded = !0), r = e(n, r, i), o && r.on('$destroy', R(n, n.$destroy)), r;
          };
        }
        function j(t, e, n, r, i) {
          var o, s = n.$attr;
          switch (t.nodeType) {
          case 1:
            I(e, Ot(He(t).toLowerCase()), 'E', r, i);
            var u, l, f;
            o = t.attributes;
            for (var h = 0, p = o && o.length; h < p; h++) {
              var $ = !1, d = !1;
              if (u = o[h], !Ve || 8 <= Ve || u.specified) {
                l = u.name, f = Ot(l), nt.test(f) && (l = Q(f.substr(6), '-'));
                var v = f.replace(/(Start|End)$/, '');
                f === v + 'Start' && ($ = l, d = l.substr(0, l.length - 5) + 'end', l = l.substr(0, l.length - 6)), f = Ot(l.toLowerCase()), s[f] = l, n[f] = u = Ze(Ve && 'href' == l ? decodeURIComponent(t.getAttribute(l, 2)) : u.value), vt(t, f) && (n[f] = !0), J(t, e, u, f), I(e, f, 'A', r, i, $, d);
              }
            }
            if (t = t.className, w(t) && '' !== t)
              for (; o = c.exec(t);)
                f = Ot(o[2]), I(e, f, 'C', r, i) && (n[f] = Ze(o[3])), t = t.substr(o.index + o[0].length);
            break;
          case 3:
            z(e, t.nodeValue);
            break;
          case 8:
            try {
              (o = a.exec(t.nodeValue)) && (f = Ot(o[1]), I(e, f, 'M', r, i) && (n[f] = Ze(o[2])));
            } catch (t) {
            }
          }
          return e.sort(_), e;
        }
        function D(t, e, n) {
          var r = [], i = 0;
          if (e && t.hasAttribute && t.hasAttribute(e)) {
            do {
              if (!t)
                throw gn('uterdir', e, n);
              1 == t.nodeType && (t.hasAttribute(e) && i++, t.hasAttribute(n) && i--), r.push(t), t = t.nextSibling;
            } while (0 < i);
          } else
            r.push(t);
          return qe(r);
        }
        function V(t, e, n) {
          return function (r, i, o, s, a) {
            return i = D(i[0], e, n), t(r, i, o, s, a);
          };
        }
        function q(t, i, s, a, c, l, f, h, p) {
          function $(t, e, n, r) {
            t && (n && (t = V(t, n, r)), t.require = M.require, (E === M || M.$$isolateScope) && (t = K(t, { isolateScope: !0 })), f.push(t)), e && (n && (e = V(e, n, r)), e.require = M.require, (E === M || M.$$isolateScope) && (e = K(e, { isolateScope: !0 })), h.push(e));
          }
          function d(t, e, n) {
            var r, i = 'data', s = !1;
            if (w(t)) {
              for (; '^' == (r = t.charAt(0)) || '?' == r;)
                t = t.substr(1), '^' == r && (i = 'inheritedData'), s = s || '?' == r;
              if (r = null, n && 'data' === i && (r = n[t]), r = r || e[i]('$' + t + 'Controller'), !r && !s)
                throw gn('ctreq', t, N);
            } else
              S(t) && (r = [], o(t, function (t) {
                r.push(d(t, e, n));
              }));
            return r;
          }
          function v(t, e, a, c, l) {
            function p(t, e) {
              var r;
              return 2 > arguments.length && (e = t, t = n), _ && (r = C), l(t, e, r);
            }
            var $, v, y, w, x, b, S, C = {};
            if ($ = i === a ? s : P(s, new Y(qe(a), s.$attr)), v = $.$$element, E) {
              var O = /^\s*([@=&])(\??)\s*(\w*)\s*$/;
              c = qe(a), b = e.$new(!0), A && A === E.$$originalDirective ? c.data('$isolateScope', b) : c.data('$isolateScopeNoTemplate', b), T(c, 'ng-isolate-scope'), o(E.scope, function (t, n) {
                var i, o, s, a = t.match(O) || [], u = a[3] || n, c = '?' == a[2], a = a[1];
                switch (b.$$isolateBindings[n] = a + u, a) {
                case '@':
                  $.$observe(u, function (t) {
                    b[n] = t;
                  }), $.$$observers[u].$$scope = e, $[u] && (b[n] = r($[u])(e));
                  break;
                case '=':
                  if (c && !$[u])
                    break;
                  o = g($[u]), s = o.assign || function () {
                    throw i = b[n] = o(e), gn('nonassign', $[u], E.name);
                  }, i = b[n] = o(e), b.$watch(function () {
                    var t = o(e);
                    return t !== b[n] && (t !== i ? i = b[n] = t : s(e, t = i = b[n])), t;
                  });
                  break;
                case '&':
                  o = g($[u]), b[n] = function (t) {
                    return o(e, t);
                  };
                  break;
                default:
                  throw gn('iscp', E.name, n, t);
                }
              });
            }
            for (S = l && p, k && o(k, function (t) {
                var n, r = {
                    $scope: t === E || t.$$isolateScope ? b : e,
                    $element: v,
                    $attrs: $,
                    $transclude: S
                  };
                x = t.controller, '@' == x && (x = $[t.name]), n = m(x, r), C[t.name] = n, _ || v.data('$' + t.name + 'Controller', n), t.controllerAs && (r.$scope[t.controllerAs] = n);
              }), c = 0, y = f.length; c < y; c++)
              try {
                (w = f[c])(w.isolateScope ? b : e, v, $, w.require && d(w.require, v, C), S);
              } catch (t) {
                u(t, H(v));
              }
            for (c = e, E && (E.template || null === E.templateUrl) && (c = b), t && t(c, a.childNodes, n, l), c = h.length - 1; 0 <= c; c--)
              try {
                (w = h[c])(w.isolateScope ? b : e, v, $, w.require && d(w.require, v, C), S);
              } catch (t) {
                u(t, H(v));
              }
          }
          p = p || {};
          var x, b = -Number.MAX_VALUE, k = p.controllerDirectives, E = p.newIsolateScopeDirective, A = p.templateDirective;
          p = p.nonTlbTranscludeDirective;
          for (var M, N, R, q, I = !1, _ = !1, z = s.$$element = qe(i), W = a, J = 0, Q = t.length; J < Q; J++) {
            M = t[J];
            var Z = M.$$start, G = M.$$end;
            if (Z && (z = D(i, Z, G)), R = n, b > M.priority)
              break;
            if ((R = M.scope) && (x = x || M, M.templateUrl || (B('new/isolated scope', E, M, z), y(R) && (E = M))), N = M.name, !M.templateUrl && M.controller && (R = M.controller, k = k || {}, B('\'' + N + '\' controller', k[N], M, z), k[N] = M), (R = M.transclude) && (I = !0, M.$$tlb || (B('transclusion', p, M, z), p = M), 'element' == R ? (_ = !0, b = M.priority, R = D(i, Z, G), z = s.$$element = qe(e.createComment(' ' + N + ': ' + s[N] + ' ')), i = z[0], X(c, qe(_e.call(R, 0)), i), W = O(R, a, b, l && l.name, { nonTlbTranscludeDirective: p })) : (R = qe(it(i)).contents(), z.html(''), W = O(R, a))), M.template)
              if (B('template', A, M, z), A = M, R = C(M.template) ? M.template(z, s) : M.template, R = et(R), M.replace) {
                if (l = M, R = qe('<div>' + Ze(R) + '</div>').contents(), i = R[0], 1 != R.length || 1 !== i.nodeType)
                  throw gn('tplrt', N, '');
                X(c, z, i), Q = { $attr: {} }, R = j(i, [], Q);
                var tt = t.splice(J + 1, t.length - (J + 1));
                E && U(R), t = t.concat(R).concat(tt), F(s, Q), Q = t.length;
              } else
                z.html(R);
            if (M.templateUrl)
              B('template', A, M, z), A = M, M.replace && (l = M), v = L(t.splice(J, t.length - J), z, s, c, W, f, h, {
                controllerDirectives: k,
                newIsolateScopeDirective: E,
                templateDirective: A,
                nonTlbTranscludeDirective: p
              }), Q = t.length;
            else if (M.compile)
              try {
                q = M.compile(z, s, W), C(q) ? $(null, q, Z, G) : q && $(q.pre, q.post, Z, G);
              } catch (t) {
                u(t, H(z));
              }
            M.terminal && (v.terminal = !0, b = Math.max(b, M.priority));
          }
          return v.scope = x && !0 === x.scope, v.transclude = I && W, v;
        }
        function U(t) {
          for (var e = 0, n = t.length; e < n; e++)
            t[e] = p(t[e], { $$isolateScope: !0 });
        }
        function I(e, r, o, a, c, l, f) {
          if (r === c)
            return null;
          if (c = null, i.hasOwnProperty(r)) {
            var h;
            r = t.get(r + s);
            for (var $ = 0, d = r.length; $ < d; $++)
              try {
                h = r[$], (a === n || a > h.priority) && -1 != h.restrict.indexOf(o) && (l && (h = p(h, {
                  $$start: l,
                  $$end: f
                })), e.push(h), c = h);
              } catch (t) {
                u(t);
              }
          }
          return c;
        }
        function F(t, e) {
          var n = e.$attr, r = t.$attr, i = t.$$element;
          o(t, function (r, i) {
            '$' != i.charAt(0) && (e[i] && (r += ('style' === i ? ';' : ' ') + e[i]), t.$set(i, r, !0, n[i]));
          }), o(e, function (e, o) {
            'class' == o ? (T(i, e), t.class = (t.class ? t.class + ' ' : '') + e) : 'style' == o ? (i.attr('style', i.attr('style') + ';' + e), t.style = (t.style ? t.style + ';' : '') + e) : '$' == o.charAt(0) || t.hasOwnProperty(o) || (t[o] = e, r[o] = n[o]);
          });
        }
        function L(t, e, n, r, i, s, a, u) {
          var c, l, p = [], d = e[0], v = t.shift(), g = f({}, v, {
              templateUrl: null,
              transclude: null,
              replace: null,
              $$originalDirective: v
            }), m = C(v.templateUrl) ? v.templateUrl(e, n) : v.templateUrl;
          return e.html(''), h.get(k.getTrustedResourceUrl(m), { cache: $ }).success(function (f) {
            var h, $;
            if (f = et(f), v.replace) {
              if (f = qe('<div>' + Ze(f) + '</div>').contents(), h = f[0], 1 != f.length || 1 !== h.nodeType)
                throw gn('tplrt', v.name, m);
              f = { $attr: {} }, X(r, e, h);
              var w = j(h, [], f);
              y(v.scope) && U(w), t = w.concat(t), F(n, f);
            } else
              h = d, e.html(f);
            for (t.unshift(g), c = q(t, h, n, i, e, v, s, a, u), o(r, function (t, n) {
                t == h && (r[n] = e[0]);
              }), l = M(e[0].childNodes, i); p.length;) {
              f = p.shift(), $ = p.shift();
              var x = p.shift(), b = p.shift(), w = e[0];
              $ !== d && (w = it(h), X(x, qe($), w)), $ = c.transclude ? N(f, c.transclude) : b, c(l, f, w, r, $);
            }
            p = null;
          }).error(function (t, e, n, r) {
            throw gn('tpload', r.url);
          }), function (t, e, n, r, i) {
            p ? (p.push(e), p.push(n), p.push(r), p.push(i)) : c(l, e, n, r, i);
          };
        }
        function _(t, e) {
          var n = e.priority - t.priority;
          return 0 !== n ? n : t.name !== e.name ? t.name < e.name ? -1 : 1 : t.index - e.index;
        }
        function B(t, e, n, r) {
          if (e)
            throw gn('multidir', e.name, n.name, t, H(r));
        }
        function z(t, e) {
          var n = r(e, !0);
          n && t.push({
            priority: 0,
            compile: v(function (t, e) {
              var r = e.parent(), i = r.data('$binding') || [];
              i.push(n), T(r.data('$binding', i), 'ng-binding'), t.$watch(n, function (t) {
                e[0].nodeValue = t;
              });
            })
          });
        }
        function W(t, e) {
          if ('srcdoc' == e)
            return k.HTML;
          var n = He(t);
          return 'xlinkHref' == e || 'FORM' == n && 'action' == e || 'IMG' != n && ('src' == e || 'ngSrc' == e) ? k.RESOURCE_URL : void 0;
        }
        function J(t, e, n, i) {
          var o = r(n, !0);
          if (o) {
            if ('multiple' === i && 'SELECT' === He(t))
              throw gn('selmulti', H(t));
            e.push({
              priority: 100,
              compile: function () {
                return {
                  pre: function (e, n, s) {
                    if (n = s.$$observers || (s.$$observers = {}), l.test(i))
                      throw gn('nodomevents');
                    (o = r(s[i], !0, W(t, i))) && (s[i] = o(e), (n[i] || (n[i] = [])).$$inter = !0, (s.$$observers && s.$$observers[i].$$scope || e).$watch(o, function (t, e) {
                      'class' === i && t != e ? s.$updateClass(t, e) : s.$set(i, t);
                    }));
                  }
                };
              }
            });
          }
        }
        function X(t, n, r) {
          var i, o, s = n[0], a = n.length, u = s.parentNode;
          if (t)
            for (i = 0, o = t.length; i < o; i++)
              if (t[i] == s) {
                t[i++] = r, o = i + a - 1;
                for (var c = t.length; i < c; i++, o++)
                  o < c ? t[i] = t[o] : delete t[i];
                t.length -= a - 1;
                break;
              }
          for (u && u.replaceChild(r, s), t = e.createDocumentFragment(), t.appendChild(s), r[qe.expando] = s[qe.expando], s = 1, a = n.length; s < a; s++)
            u = n[s], qe(u).remove(), t.appendChild(u), delete n[s];
          n[0] = r, n.length = 1;
        }
        function K(t, e) {
          return f(function () {
            return t.apply(null, arguments);
          }, t, e);
        }
        var Y = function (t, e) {
          this.$$element = t, this.$attr = e || {};
        };
        Y.prototype = {
          $normalize: Ot,
          $addClass: function (t) {
            t && 0 < t.length && E.addClass(this.$$element, t);
          },
          $removeClass: function (t) {
            t && 0 < t.length && E.removeClass(this.$$element, t);
          },
          $updateClass: function (t, e) {
            this.$removeClass(Tt(e, t)), this.$addClass(Tt(t, e));
          },
          $set: function (t, e, r, i) {
            var s = vt(this.$$element[0], t);
            s && (this.$$element.prop(t, e), i = s), this[t] = e, i ? this.$attr[t] = i : (i = this.$attr[t]) || (this.$attr[t] = i = Q(t, '-')), s = He(this.$$element), ('A' === s && 'href' === t || 'IMG' === s && 'src' === t) && (this[t] = e = A(e, 'src' === t)), !1 !== r && (null === e || e === n ? this.$$element.removeAttr(i) : this.$$element.attr(i, e)), (r = this.$$observers) && o(r[t], function (t) {
              try {
                t(e);
              } catch (t) {
                u(t);
              }
            });
          },
          $observe: function (t, e) {
            var n = this, r = n.$$observers || (n.$$observers = {}), i = r[t] || (r[t] = []);
            return i.push(e), x.$evalAsync(function () {
              i.$$inter || e(n[t]);
            }), e;
          }
        };
        var G = r.startSymbol(), tt = r.endSymbol(), et = '{{' == G || '}}' == tt ? d : function (t) {
            return t.replace(/\{\{/g, G).replace(/}}/g, tt);
          }, nt = /^ngAttr[A-Z]/;
        return O;
      }
    ];
  }
  function Ot(t) {
    return et(t.replace(mn, ''));
  }
  function Tt(t, e) {
    var n = '', r = t.split(/\s+/), i = e.split(/\s+/), o = 0;
    t:
      for (; o < r.length; o++) {
        for (var s = r[o], a = 0; a < i.length; a++)
          if (s == i[a])
            continue t;
        n += (0 < n.length ? ' ' : '') + s;
      }
    return n;
  }
  function Mt() {
    var t = {}, e = /^(\S+)(\s+as\s+(\w+))?$/;
    this.register = function (e, n) {
      K(e, 'controller'), y(e) ? f(t, e) : t[e] = n;
    }, this.$get = [
      '$injector',
      '$window',
      function (n, i) {
        return function (o, s) {
          var a, u, c;
          if (w(o) && (a = o.match(e), u = a[1], c = a[3], o = t.hasOwnProperty(u) ? t[u] : Y(s.$scope, u, !0) || Y(i, u, !0), X(o, u, !0)), a = n.instantiate(o, s), c) {
            if (!s || 'object' != typeof s.$scope)
              throw r('$controller')('noscp', u || o.name, c);
            s.$scope[c] = a;
          }
          return a;
        };
      }
    ];
  }
  function Nt() {
    this.$get = [
      '$window',
      function (t) {
        return qe(t.document);
      }
    ];
  }
  function Pt() {
    this.$get = [
      '$log',
      function (t) {
        return function (e, n) {
          t.error.apply(t, arguments);
        };
      }
    ];
  }
  function jt(t) {
    var e, n, r, i = {};
    return t ? (o(t.split('\n'), function (t) {
      r = t.indexOf(':'), e = Fe(Ze(t.substr(0, r))), n = Ze(t.substr(r + 1)), e && (i[e] = i[e] ? i[e] + (', ' + n) : n);
    }), i) : i;
  }
  function Dt(t) {
    var e = y(t) ? t : n;
    return function (n) {
      return e || (e = jt(t)), n ? e[Fe(n)] || null : e;
    };
  }
  function Rt(t, e, n) {
    return C(n) ? n(t, e) : (o(n, function (n) {
      t = n(t, e);
    }), t);
  }
  function Vt() {
    var t = /^\s*(\[|\{[^\{])/, e = /[\}\]]\s*$/, r = /^\)\]\}',?\n/, i = { 'Content-Type': 'application/json;charset=utf-8' }, s = this.defaults = {
        transformResponse: [function (n) {
            return w(n) && (n = n.replace(r, ''), t.test(n) && e.test(n) && (n = U(n))), n;
          }],
        transformRequest: [function (t) {
            return y(t) && '[object File]' !== ze.apply(t) ? q(t) : t;
          }],
        headers: {
          common: { Accept: 'application/json, text/plain, */*' },
          post: i,
          put: i,
          patch: i
        },
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN'
      }, u = this.interceptors = [], c = this.responseInterceptors = [];
    this.$get = [
      '$httpBackend',
      '$browser',
      '$cacheFactory',
      '$rootScope',
      '$q',
      '$injector',
      function (t, e, r, i, l, h) {
        function p(t) {
          function r(t) {
            var e = f({}, t, { data: Rt(t.data, t.headers, i.transformResponse) });
            return 200 <= t.status && 300 > t.status ? e : l.reject(e);
          }
          var i = {
              transformRequest: s.transformRequest,
              transformResponse: s.transformResponse
            }, a = function (t) {
              function e(t) {
                var e;
                o(t, function (n, r) {
                  C(n) && (e = n(), null != e ? t[r] = e : delete t[r]);
                });
              }
              var n, r, i = s.headers, a = f({}, t.headers), i = f({}, i.common, i[Fe(t.method)]);
              e(i), e(a);
              t:
                for (n in i) {
                  t = Fe(n);
                  for (r in a)
                    if (Fe(r) === t)
                      continue t;
                  a[n] = i[n];
                }
              return a;
            }(t);
          f(i, t), i.headers = a, i.method = Le(i.method), (t = me(i.url) ? e.cookies()[i.xsrfCookieName || s.xsrfCookieName] : n) && (a[i.xsrfHeaderName || s.xsrfHeaderName] = t);
          var u = [
              function (t) {
                a = t.headers;
                var e = Rt(t.data, Dt(a), t.transformRequest);
                return g(t.data) && o(a, function (t, e) {
                  'content-type' === Fe(e) && delete a[e];
                }), g(t.withCredentials) && !g(s.withCredentials) && (t.withCredentials = s.withCredentials), $(t, e, a).then(r, r);
              },
              n
            ], c = l.when(i);
          for (o(x, function (t) {
              (t.request || t.requestError) && u.unshift(t.request, t.requestError), (t.response || t.responseError) && u.push(t.response, t.responseError);
            }); u.length;) {
            t = u.shift();
            var h = u.shift(), c = c.then(t, h);
          }
          return c.success = function (t) {
            return c.then(function (e) {
              t(e.data, e.status, e.headers, i);
            }), c;
          }, c.error = function (t) {
            return c.then(null, function (e) {
              t(e.data, e.status, e.headers, i);
            }), c;
          }, c;
        }
        function $(e, n, r) {
          function o(t, e, n) {
            c && (200 <= t && 300 > t ? c.put(w, [
              t,
              e,
              jt(n)
            ]) : c.remove(w)), a(e, t, n), i.$$phase || i.$apply();
          }
          function a(t, n, r) {
            n = Math.max(n, 0), (200 <= n && 300 > n ? h.resolve : h.reject)({
              data: t,
              status: n,
              headers: Dt(r),
              config: e
            });
          }
          function u() {
            var t = T(p.pendingRequests, e);
            -1 !== t && p.pendingRequests.splice(t, 1);
          }
          var c, f, h = l.defer(), $ = h.promise, w = d(e.url, e.params);
          if (p.pendingRequests.push(e), $.then(u, u), (e.cache || s.cache) && !1 !== e.cache && 'GET' == e.method && (c = y(e.cache) ? e.cache : y(s.cache) ? s.cache : v), c)
            if (f = c.get(w), m(f)) {
              if (f.then)
                return f.then(u, u), f;
              S(f) ? a(f[1], f[0], N(f[2])) : a(f, 200, {});
            } else
              c.put(w, $);
          return g(f) && t(e.method, w, n, o, r, e.timeout, e.withCredentials, e.responseType), $;
        }
        function d(t, e) {
          if (!e)
            return t;
          var n = [];
          return a(e, function (t, e) {
            null === t || g(t) || (S(t) || (t = [t]), o(t, function (t) {
              y(t) && (t = q(t)), n.push(z(e) + '=' + z(t));
            }));
          }), t + (-1 == t.indexOf('?') ? '?' : '&') + n.join('&');
        }
        var v = r('$http'), x = [];
        return o(u, function (t) {
          x.unshift(w(t) ? h.get(t) : h.invoke(t));
        }), o(c, function (t, e) {
          var n = w(t) ? h.get(t) : h.invoke(t);
          x.splice(e, 0, {
            response: function (t) {
              return n(l.when(t));
            },
            responseError: function (t) {
              return n(l.reject(t));
            }
          });
        }), p.pendingRequests = [], function (t) {
          o(arguments, function (t) {
            p[t] = function (e, n) {
              return p(f(n || {}, {
                method: t,
                url: e
              }));
            };
          });
        }('get', 'delete', 'head', 'jsonp'), function (t) {
          o(arguments, function (t) {
            p[t] = function (e, n, r) {
              return p(f(r || {}, {
                method: t,
                url: e,
                data: n
              }));
            };
          });
        }('post', 'put'), p.defaults = s, p;
      }
    ];
  }
  function qt() {
    this.$get = [
      '$browser',
      '$window',
      '$document',
      function (t, e, n) {
        return Ut(t, yn, t.defer, e.angular.callbacks, n[0]);
      }
    ];
  }
  function Ut(t, e, n, r, i) {
    function s(t, e) {
      var n = i.createElement('script'), r = function () {
          n.onreadystatechange = n.onload = n.onerror = null, i.body.removeChild(n), e && e();
        };
      return n.type = 'text/javascript', n.src = t, Ve && 8 >= Ve ? n.onreadystatechange = function () {
        /loaded|complete/.test(n.readyState) && r();
      } : n.onload = n.onerror = function () {
        r();
      }, i.body.appendChild(n), r;
    }
    var a = -1;
    return function (i, u, c, l, f, h, p, d) {
      function v() {
        y = a, x && x(), b && b.abort();
      }
      function g(e, r, i, o) {
        var s = ge(u).protocol;
        S && n.cancel(S), x = b = null, r = 'file' == s && 0 === r ? i ? 200 : 404 : r, e(1223 == r ? 204 : r, i, o), t.$$completeOutstandingRequest($);
      }
      var y;
      if (t.$$incOutstandingRequestCount(), u = u || t.url(), 'jsonp' == Fe(i)) {
        var w = '_' + (r.counter++).toString(36);
        r[w] = function (t) {
          r[w].data = t;
        };
        var x = s(u.replace('JSON_CALLBACK', 'angular.callbacks.' + w), function () {
            r[w].data ? g(l, 200, r[w].data) : g(l, y || -2), delete r[w];
          });
      } else {
        var b = new e();
        b.open(i, u, !0), o(f, function (t, e) {
          m(t) && b.setRequestHeader(e, t);
        }), b.onreadystatechange = function () {
          if (4 == b.readyState) {
            var t = null, e = null;
            y !== a && (t = b.getAllResponseHeaders(), e = b.responseType ? b.response : b.responseText), g(l, y || b.status, e, t);
          }
        }, p && (b.withCredentials = !0), d && (b.responseType = d), b.send(c || null);
      }
      if (0 < h)
        var S = n(v, h);
      else
        h && h.then && h.then(v);
    };
  }
  function It() {
    var t = '{{', e = '}}';
    this.startSymbol = function (e) {
      return e ? (t = e, this) : t;
    }, this.endSymbol = function (t) {
      return t ? (e = t, this) : e;
    }, this.$get = [
      '$parse',
      '$exceptionHandler',
      '$sce',
      function (n, r, i) {
        function o(o, u, c) {
          for (var l, f, h = 0, p = [], $ = o.length, d = !1, v = []; h < $;)
            -1 != (l = o.indexOf(t, h)) && -1 != (f = o.indexOf(e, l + s)) ? (h != l && p.push(o.substring(h, l)), p.push(h = n(d = o.substring(l + s, f))), h.exp = d, h = f + a, d = !0) : (h != $ && p.push(o.substring(h)), h = $);
          if (($ = p.length) || (p.push(''), $ = 1), c && 1 < p.length)
            throw wn('noconcat', o);
          if (!u || d)
            return v.length = $, h = function (t) {
              try {
                for (var e, n = 0, s = $; n < s; n++)
                  'function' == typeof (e = p[n]) && (e = e(t), e = c ? i.getTrusted(c, e) : i.valueOf(e), null === e || g(e) ? e = '' : 'string' != typeof e && (e = q(e))), v[n] = e;
                return v.join('');
              } catch (e) {
                t = wn('interr', o, e.toString()), r(t);
              }
            }, h.exp = o, h.parts = p, h;
        }
        var s = t.length, a = e.length;
        return o.startSymbol = function () {
          return t;
        }, o.endSymbol = function () {
          return e;
        }, o;
      }
    ];
  }
  function Ht() {
    this.$get = [
      '$rootScope',
      '$window',
      '$q',
      function (t, e, n) {
        function r(r, o, s, a) {
          var u = e.setInterval, c = e.clearInterval, l = n.defer(), f = l.promise, h = 0, p = m(a) && !a;
          return s = m(s) ? s : 0, f.then(null, null, r), f.$$intervalId = u(function () {
            l.notify(h++), 0 < s && h >= s && (l.resolve(h), c(f.$$intervalId), delete i[f.$$intervalId]), p || t.$apply();
          }, o), i[f.$$intervalId] = l, f;
        }
        var i = {};
        return r.cancel = function (t) {
          return !!(t && t.$$intervalId in i) && (i[t.$$intervalId].reject('canceled'), clearInterval(t.$$intervalId), delete i[t.$$intervalId], !0);
        }, r;
      }
    ];
  }
  function Ft() {
    this.$get = function () {
      return {
        id: 'en-us',
        NUMBER_FORMATS: {
          DECIMAL_SEP: '.',
          GROUP_SEP: ',',
          PATTERNS: [
            {
              minInt: 1,
              minFrac: 0,
              maxFrac: 3,
              posPre: '',
              posSuf: '',
              negPre: '-',
              negSuf: '',
              gSize: 3,
              lgSize: 3
            },
            {
              minInt: 1,
              minFrac: 2,
              maxFrac: 2,
              posPre: '\xa4',
              posSuf: '',
              negPre: '(\xa4',
              negSuf: ')',
              gSize: 3,
              lgSize: 3
            }
          ],
          CURRENCY_SYM: '$'
        },
        DATETIME_FORMATS: {
          MONTH: 'January February March April May June July August September October November December'.split(' '),
          SHORTMONTH: 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' '),
          DAY: 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' '),
          SHORTDAY: 'Sun Mon Tue Wed Thu Fri Sat'.split(' '),
          AMPMS: [
            'AM',
            'PM'
          ],
          medium: 'MMM d, y h:mm:ss a',
          short: 'M/d/yy h:mm a',
          fullDate: 'EEEE, MMMM d, y',
          longDate: 'MMMM d, y',
          mediumDate: 'MMM d, y',
          shortDate: 'M/d/yy',
          mediumTime: 'h:mm:ss a',
          shortTime: 'h:mm a'
        },
        pluralCat: function (t) {
          return 1 === t ? 'one' : 'other';
        }
      };
    };
  }
  function Lt(t) {
    t = t.split('/');
    for (var e = t.length; e--;)
      t[e] = B(t[e]);
    return t.join('/');
  }
  function _t(t, e, n) {
    t = ge(t, n), e.$$protocol = t.protocol, e.$$host = t.hostname, e.$$port = h(t.port) || bn[t.protocol] || null;
  }
  function Bt(t, e, n) {
    var r = '/' !== t.charAt(0);
    r && (t = '/' + t), t = ge(t, n), e.$$path = decodeURIComponent(r && '/' === t.pathname.charAt(0) ? t.pathname.substring(1) : t.pathname), e.$$search = L(t.search), e.$$hash = decodeURIComponent(t.hash), e.$$path && '/' != e.$$path.charAt(0) && (e.$$path = '/' + e.$$path);
  }
  function zt(t, e) {
    if (0 === e.indexOf(t))
      return e.substr(t.length);
  }
  function Wt(t) {
    var e = t.indexOf('#');
    return -1 == e ? t : t.substr(0, e);
  }
  function Jt(t) {
    return t.substr(0, Wt(t).lastIndexOf('/') + 1);
  }
  function Qt(t, e) {
    this.$$html5 = !0, e = e || '';
    var r = Jt(t);
    _t(t, this, t), this.$$parse = function (e) {
      var n = zt(r, e);
      if (!w(n))
        throw Sn('ipthprfx', e, r);
      Bt(n, this, t), this.$$path || (this.$$path = '/'), this.$$compose();
    }, this.$$compose = function () {
      var t = _(this.$$search), e = this.$$hash ? '#' + B(this.$$hash) : '';
      this.$$url = Lt(this.$$path) + (t ? '?' + t : '') + e, this.$$absUrl = r + this.$$url.substr(1);
    }, this.$$rewrite = function (i) {
      var o;
      return (o = zt(t, i)) !== n ? (i = o, (o = zt(e, o)) !== n ? r + (zt('/', o) || o) : t + i) : (o = zt(r, i)) !== n ? r + o : r == i + '/' ? r : void 0;
    };
  }
  function Zt(t, e) {
    var n = Jt(t);
    _t(t, this, t), this.$$parse = function (r) {
      var i = zt(t, r) || zt(n, r), i = '#' == i.charAt(0) ? zt(e, i) : this.$$html5 ? i : '';
      if (!w(i))
        throw Sn('ihshprfx', r, e);
      Bt(i, this, t), r = this.$$path;
      var o = /^\/?.*?:(\/.*)/;
      0 === i.indexOf(t) && (i = i.replace(t, '')), o.exec(i) || (r = (i = o.exec(r)) ? i[1] : r), this.$$path = r, this.$$compose();
    }, this.$$compose = function () {
      var n = _(this.$$search), r = this.$$hash ? '#' + B(this.$$hash) : '';
      this.$$url = Lt(this.$$path) + (n ? '?' + n : '') + r, this.$$absUrl = t + (this.$$url ? e + this.$$url : '');
    }, this.$$rewrite = function (e) {
      if (Wt(t) == Wt(e))
        return e;
    };
  }
  function Xt(t, e) {
    this.$$html5 = !0, Zt.apply(this, arguments);
    var n = Jt(t);
    this.$$rewrite = function (r) {
      var i;
      return t == Wt(r) ? r : (i = zt(n, r)) ? t + e + i : n === r + '/' ? n : void 0;
    };
  }
  function Kt(t) {
    return function () {
      return this[t];
    };
  }
  function Yt(t, e) {
    return function (n) {
      return g(n) ? this[t] : (this[t] = e(n), this.$$compose(), this);
    };
  }
  function Gt() {
    var e = '', n = !1;
    this.hashPrefix = function (t) {
      return m(t) ? (e = t, this) : e;
    }, this.html5Mode = function (t) {
      return m(t) ? (n = t, this) : n;
    }, this.$get = [
      '$rootScope',
      '$browser',
      '$sniffer',
      '$rootElement',
      function (r, i, o, s) {
        function a(t) {
          r.$broadcast('$locationChangeSuccess', u.absUrl(), t);
        }
        var u, c = i.baseHref(), l = i.url();
        n ? (c = l.substring(0, l.indexOf('/', l.indexOf('//') + 2)) + (c || '/'), o = o.history ? Qt : Xt) : (c = Wt(l), o = Zt), u = new o(c, '#' + e), u.$$parse(u.$$rewrite(l)), s.on('click', function (e) {
          if (!e.ctrlKey && !e.metaKey && 2 != e.which) {
            for (var n = qe(e.target); 'a' !== Fe(n[0].nodeName);)
              if (n[0] === s[0] || !(n = n.parent())[0])
                return;
            var o = n.prop('href'), a = u.$$rewrite(o);
            o && !n.attr('target') && a && !e.isDefaultPrevented() && (e.preventDefault(), a != i.url() && (u.$$parse(a), r.$apply(), t.angular['ff-684208-preventDefault'] = !0));
          }
        }), u.absUrl() != l && i.url(u.absUrl(), !0), i.onUrlChange(function (t) {
          u.absUrl() != t && (r.$broadcast('$locationChangeStart', t, u.absUrl()).defaultPrevented ? i.url(u.absUrl()) : (r.$evalAsync(function () {
            var e = u.absUrl();
            u.$$parse(t), a(e);
          }), r.$$phase || r.$digest()));
        });
        var f = 0;
        return r.$watch(function () {
          var t = i.url(), e = u.$$replace;
          return f && t == u.absUrl() || (f++, r.$evalAsync(function () {
            r.$broadcast('$locationChangeStart', u.absUrl(), t).defaultPrevented ? u.$$parse(t) : (i.url(u.absUrl(), e), a(t));
          })), u.$$replace = !1, f;
        }), u;
      }
    ];
  }
  function te() {
    var t = !0, e = this;
    this.debugEnabled = function (e) {
      return m(e) ? (t = e, this) : t;
    }, this.$get = [
      '$window',
      function (n) {
        function r(t) {
          return t instanceof Error && (t.stack ? t = t.message && -1 === t.stack.indexOf(t.message) ? 'Error: ' + t.message + '\n' + t.stack : t.stack : t.sourceURL && (t = t.message + '\n' + t.sourceURL + ':' + t.line)), t;
        }
        function i(t) {
          var e = n.console || {}, i = e[t] || e.log || $;
          return i.apply ? function () {
            var t = [];
            return o(arguments, function (e) {
              t.push(r(e));
            }), i.apply(e, t);
          } : function (t, e) {
            i(t, null == e ? '' : e);
          };
        }
        return {
          log: i('log'),
          info: i('info'),
          warn: i('warn'),
          error: i('error'),
          debug: function () {
            var n = i('debug');
            return function () {
              t && n.apply(e, arguments);
            };
          }()
        };
      }
    ];
  }
  function ee(t, e) {
    if ('constructor' === t)
      throw kn('isecfld', e);
    return t;
  }
  function ne(t, e) {
    if (t && t.constructor === t)
      throw kn('isecfn', e);
    if (t && t.document && t.location && t.alert && t.setInterval)
      throw kn('isecwindow', e);
    if (t && (t.nodeName || t.on && t.find))
      throw kn('isecdom', e);
    return t;
  }
  function re(t, e, r, i, o) {
    o = o || {}, e = e.split('.');
    for (var s, a = 0; 1 < e.length; a++) {
      s = ee(e.shift(), i);
      var u = t[s];
      u || (u = {}, t[s] = u), t = u, t.then && o.unwrapPromises && (Cn(i), '$$v' in t || function (t) {
        t.then(function (e) {
          t.$$v = e;
        });
      }(t), t.$$v === n && (t.$$v = {}), t = t.$$v);
    }
    return s = ee(e.shift(), i), t[s] = r;
  }
  function ie(t, e, r, i, o, s, a) {
    return ee(t, s), ee(e, s), ee(r, s), ee(i, s), ee(o, s), a.unwrapPromises ? function (a, u) {
      var c, l = u && u.hasOwnProperty(t) ? u : a;
      return null === l || l === n ? l : ((l = l[t]) && l.then && (Cn(s), '$$v' in l || (c = l, c.$$v = n, c.then(function (t) {
        c.$$v = t;
      })), l = l.$$v), e && null !== l && l !== n ? ((l = l[e]) && l.then && (Cn(s), '$$v' in l || (c = l, c.$$v = n, c.then(function (t) {
        c.$$v = t;
      })), l = l.$$v), r && null !== l && l !== n ? ((l = l[r]) && l.then && (Cn(s), '$$v' in l || (c = l, c.$$v = n, c.then(function (t) {
        c.$$v = t;
      })), l = l.$$v), i && null !== l && l !== n ? ((l = l[i]) && l.then && (Cn(s), '$$v' in l || (c = l, c.$$v = n, c.then(function (t) {
        c.$$v = t;
      })), l = l.$$v), o && null !== l && l !== n ? ((l = l[o]) && l.then && (Cn(s), '$$v' in l || (c = l, c.$$v = n, c.then(function (t) {
        c.$$v = t;
      })), l = l.$$v), l) : l) : l) : l) : l);
    } : function (s, a) {
      var u = a && a.hasOwnProperty(t) ? a : s;
      return null === u || u === n ? u : (u = u[t], e && null !== u && u !== n ? (u = u[e], r && null !== u && u !== n ? (u = u[r], i && null !== u && u !== n ? (u = u[i], o && null !== u && u !== n ? u = u[o] : u) : u) : u) : u);
    };
  }
  function oe(t, e, r) {
    if (Nn.hasOwnProperty(t))
      return Nn[t];
    var i, s = t.split('.'), a = s.length;
    if (e.csp)
      i = 6 > a ? ie(s[0], s[1], s[2], s[3], s[4], r, e) : function (t, i) {
        var o, u = 0;
        do
          o = ie(s[u++], s[u++], s[u++], s[u++], s[u++], r, e)(t, i), i = n, t = o;
        while (u < a);
        return o;
      };
    else {
      var u = 'var l, fn, p;\n';
      o(s, function (t, n) {
        ee(t, r), u += 'if(s === null || s === undefined) return s;\nl=s;\ns=' + (n ? 's' : '((k&&k.hasOwnProperty("' + t + '"))?k:s)') + '["' + t + '"];\n' + (e.unwrapPromises ? 'if (s && s.then) {\n pw("' + r.replace(/(["\r\n])/g, '\\$1') + '");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n' : '');
      });
      var u = u + 'return s;', c = new Function('s', 'k', 'pw', u);
      c.toString = function () {
        return u;
      }, i = function (t, e) {
        return c(t, e, Cn);
      };
    }
    return 'hasOwnProperty' !== t && (Nn[t] = i), i;
  }
  function se() {
    var t = {}, e = {
        csp: !1,
        unwrapPromises: !1,
        logPromiseWarnings: !0
      };
    this.unwrapPromises = function (t) {
      return m(t) ? (e.unwrapPromises = !!t, this) : e.unwrapPromises;
    }, this.logPromiseWarnings = function (t) {
      return m(t) ? (e.logPromiseWarnings = t, this) : e.logPromiseWarnings;
    }, this.$get = [
      '$filter',
      '$sniffer',
      '$log',
      function (n, r, i) {
        return e.csp = r.csp, Cn = function (t) {
          e.logPromiseWarnings && !En.hasOwnProperty(t) && (En[t] = !0, i.warn('[$parse] Promise found in the expression `' + t + '`. Automatic unwrapping of promises in Angular expressions is deprecated.'));
        }, function (r) {
          var i;
          switch (typeof r) {
          case 'string':
            return t.hasOwnProperty(r) ? t[r] : (i = new Tn(e), i = new Mn(i, n, e).parse(r, !1), 'hasOwnProperty' !== r && (t[r] = i), i);
          case 'function':
            return r;
          default:
            return $;
          }
        };
      }
    ];
  }
  function ae() {
    this.$get = [
      '$rootScope',
      '$exceptionHandler',
      function (t, e) {
        return ue(function (e) {
          t.$evalAsync(e);
        }, e);
      }
    ];
  }
  function ue(t, e) {
    function r(t) {
      return t;
    }
    function i(t) {
      return u(t);
    }
    var s = function () {
        var o, c, l = [];
        return c = {
          resolve: function (e) {
            if (l) {
              var r = l;
              l = n, o = a(e), r.length && t(function () {
                for (var t, e = 0, n = r.length; e < n; e++)
                  t = r[e], o.then(t[0], t[1], t[2]);
              });
            }
          },
          reject: function (t) {
            c.resolve(u(t));
          },
          notify: function (e) {
            if (l) {
              var n = l;
              l.length && t(function () {
                for (var t, r = 0, i = n.length; r < i; r++)
                  t = n[r], t[2](e);
              });
            }
          },
          promise: {
            then: function (t, n, a) {
              var u = s(), c = function (n) {
                  try {
                    u.resolve((C(t) ? t : r)(n));
                  } catch (t) {
                    u.reject(t), e(t);
                  }
                }, f = function (t) {
                  try {
                    u.resolve((C(n) ? n : i)(t));
                  } catch (t) {
                    u.reject(t), e(t);
                  }
                }, h = function (t) {
                  try {
                    u.notify((C(a) ? a : r)(t));
                  } catch (t) {
                    e(t);
                  }
                };
              return l ? l.push([
                c,
                f,
                h
              ]) : o.then(c, f, h), u.promise;
            },
            catch: function (t) {
              return this.then(null, t);
            },
            finally: function (t) {
              function e(t, e) {
                var n = s();
                return e ? n.resolve(t) : n.reject(t), n.promise;
              }
              function n(n, i) {
                var o = null;
                try {
                  o = (t || r)();
                } catch (t) {
                  return e(t, !1);
                }
                return o && C(o.then) ? o.then(function () {
                  return e(n, i);
                }, function (t) {
                  return e(t, !1);
                }) : e(n, i);
              }
              return this.then(function (t) {
                return n(t, !0);
              }, function (t) {
                return n(t, !1);
              });
            }
          }
        };
      }, a = function (e) {
        return e && C(e.then) ? e : {
          then: function (n) {
            var r = s();
            return t(function () {
              r.resolve(n(e));
            }), r.promise;
          }
        };
      }, u = function (n) {
        return {
          then: function (r, o) {
            var a = s();
            return t(function () {
              try {
                a.resolve((C(o) ? o : i)(n));
              } catch (t) {
                a.reject(t), e(t);
              }
            }), a.promise;
          }
        };
      };
    return {
      defer: s,
      reject: u,
      when: function (n, o, c, l) {
        var f, h = s(), p = function (t) {
            try {
              return (C(o) ? o : r)(t);
            } catch (t) {
              return e(t), u(t);
            }
          }, $ = function (t) {
            try {
              return (C(c) ? c : i)(t);
            } catch (t) {
              return e(t), u(t);
            }
          }, d = function (t) {
            try {
              return (C(l) ? l : r)(t);
            } catch (t) {
              e(t);
            }
          };
        return t(function () {
          a(n).then(function (t) {
            f || (f = !0, h.resolve(a(t).then(p, $, d)));
          }, function (t) {
            f || (f = !0, h.resolve($(t)));
          }, function (t) {
            f || h.notify(d(t));
          });
        }), h.promise;
      },
      all: function (t) {
        var e = s(), n = 0, r = S(t) ? [] : {};
        return o(t, function (t, i) {
          n++, a(t).then(function (t) {
            r.hasOwnProperty(i) || (r[i] = t, --n || e.resolve(r));
          }, function (t) {
            r.hasOwnProperty(i) || e.reject(t);
          });
        }), 0 === n && e.resolve(r), e.promise;
      }
    };
  }
  function ce() {
    var t = 10, e = r('$rootScope');
    this.digestTtl = function (e) {
      return arguments.length && (t = e), t;
    }, this.$get = [
      '$injector',
      '$exceptionHandler',
      '$parse',
      '$browser',
      function (n, r, o, s) {
        function a() {
          this.$id = c(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this.this = this.$root = this, this.$$destroyed = !1, this.$$asyncQueue = [], this.$$postDigestQueue = [], this.$$listeners = {}, this.$$isolateBindings = {};
        }
        function u(t) {
          if (h.$$phase)
            throw e('inprog', h.$$phase);
          h.$$phase = t;
        }
        function l(t, e) {
          var n = o(t);
          return X(n, e), n;
        }
        function f() {
        }
        a.prototype = {
          constructor: a,
          $new: function (t) {
            return t ? (t = new a(), t.$root = this.$root, t.$$asyncQueue = this.$$asyncQueue, t.$$postDigestQueue = this.$$postDigestQueue) : (t = function () {
            }, t.prototype = this, t = new t(), t.$id = c()), t.this = t, t.$$listeners = {}, t.$parent = this, t.$$watchers = t.$$nextSibling = t.$$childHead = t.$$childTail = null, t.$$prevSibling = this.$$childTail, this.$$childHead ? this.$$childTail = this.$$childTail.$$nextSibling = t : this.$$childHead = this.$$childTail = t, t;
          },
          $watch: function (t, e, n) {
            var r = l(t, 'watch'), i = this.$$watchers, o = {
                fn: e,
                last: f,
                get: r,
                exp: t,
                eq: !!n
              };
            if (!C(e)) {
              var s = l(e || $, 'listener');
              o.fn = function (t, e, n) {
                s(n);
              };
            }
            if ('string' == typeof t && r.constant) {
              var a = o.fn;
              o.fn = function (t, e, n) {
                a.call(this, t, e, n), M(i, o);
              };
            }
            return i || (i = this.$$watchers = []), i.unshift(o), function () {
              M(i, o);
            };
          },
          $watchCollection: function (t, e) {
            var n, r, s = this, a = 0, u = o(t), c = [], l = {}, f = 0;
            return this.$watch(function () {
              r = u(s);
              var t, e;
              if (y(r))
                if (i(r))
                  for (n !== c && (n = c, f = n.length = 0, a++), t = r.length, f !== t && (a++, n.length = f = t), e = 0; e < t; e++)
                    n[e] !== r[e] && (a++, n[e] = r[e]);
                else {
                  n !== l && (n = l = {}, f = 0, a++), t = 0;
                  for (e in r)
                    r.hasOwnProperty(e) && (t++, n.hasOwnProperty(e) ? n[e] !== r[e] && (a++, n[e] = r[e]) : (f++, n[e] = r[e], a++));
                  if (f > t)
                    for (e in a++, n)
                      n.hasOwnProperty(e) && !r.hasOwnProperty(e) && (f--, delete n[e]);
                }
              else
                n !== r && (n = r, a++);
              return a;
            }, function () {
              e(r, n, s);
            });
          },
          $digest: function () {
            var n, i, o, s, a, c, l, p, $, d, v = this.$$asyncQueue, g = this.$$postDigestQueue, m = t, y = [];
            u('$digest');
            do {
              for (c = !1, l = this; v.length;)
                try {
                  d = v.shift(), d.scope.$eval(d.expression);
                } catch (t) {
                  r(t);
                }
              do {
                if (s = l.$$watchers)
                  for (a = s.length; a--;)
                    try {
                      (n = s[a]) && (i = n.get(l)) !== (o = n.last) && !(n.eq ? j(i, o) : 'number' == typeof i && 'number' == typeof o && isNaN(i) && isNaN(o)) && (c = !0, n.last = n.eq ? N(i) : i, n.fn(i, o === f ? i : o, l), 5 > m && (p = 4 - m, y[p] || (y[p] = []), $ = C(n.exp) ? 'fn: ' + (n.exp.name || n.exp.toString()) : n.exp, $ += '; newVal: ' + q(i) + '; oldVal: ' + q(o), y[p].push($)));
                    } catch (t) {
                      r(t);
                    }
                if (!(s = l.$$childHead || l !== this && l.$$nextSibling))
                  for (; l !== this && !(s = l.$$nextSibling);)
                    l = l.$parent;
              } while (l = s);
              if (c && !m--)
                throw h.$$phase = null, e('infdig', t, q(y));
            } while (c || v.length);
            for (h.$$phase = null; g.length;)
              try {
                g.shift()();
              } catch (t) {
                r(t);
              }
          },
          $destroy: function () {
            if (h != this && !this.$$destroyed) {
              var t = this.$parent;
              this.$broadcast('$destroy'), this.$$destroyed = !0, t.$$childHead == this && (t.$$childHead = this.$$nextSibling), t.$$childTail == this && (t.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
            }
          },
          $eval: function (t, e) {
            return o(t)(this, e);
          },
          $evalAsync: function (t) {
            h.$$phase || h.$$asyncQueue.length || s.defer(function () {
              h.$$asyncQueue.length && h.$digest();
            }), this.$$asyncQueue.push({
              scope: this,
              expression: t
            });
          },
          $$postDigest: function (t) {
            this.$$postDigestQueue.push(t);
          },
          $apply: function (t) {
            try {
              return u('$apply'), this.$eval(t);
            } catch (t) {
              r(t);
            } finally {
              h.$$phase = null;
              try {
                h.$digest();
              } catch (t) {
                throw r(t), t;
              }
            }
          },
          $on: function (t, e) {
            var n = this.$$listeners[t];
            return n || (this.$$listeners[t] = n = []), n.push(e), function () {
              n[T(n, e)] = null;
            };
          },
          $emit: function (t, e) {
            var n, i, o, s = [], a = this, u = !1, c = {
                name: t,
                targetScope: a,
                stopPropagation: function () {
                  u = !0;
                },
                preventDefault: function () {
                  c.defaultPrevented = !0;
                },
                defaultPrevented: !1
              }, l = [c].concat(_e.call(arguments, 1));
            do {
              for (n = a.$$listeners[t] || s, c.currentScope = a, i = 0, o = n.length; i < o; i++)
                if (n[i])
                  try {
                    n[i].apply(null, l);
                  } catch (t) {
                    r(t);
                  }
                else
                  n.splice(i, 1), i--, o--;
              if (u)
                break;
              a = a.$parent;
            } while (a);
            return c;
          },
          $broadcast: function (t, e) {
            var n, i, o = this, s = this, a = {
                name: t,
                targetScope: this,
                preventDefault: function () {
                  a.defaultPrevented = !0;
                },
                defaultPrevented: !1
              }, u = [a].concat(_e.call(arguments, 1));
            do {
              for (o = s, a.currentScope = o, s = o.$$listeners[t] || [], n = 0, i = s.length; n < i; n++)
                if (s[n])
                  try {
                    s[n].apply(null, u);
                  } catch (t) {
                    r(t);
                  }
                else
                  s.splice(n, 1), n--, i--;
              if (!(s = o.$$childHead || o !== this && o.$$nextSibling))
                for (; o !== this && !(s = o.$$nextSibling);)
                  o = o.$parent;
            } while (o = s);
            return a;
          }
        };
        var h = new a();
        return h;
      }
    ];
  }
  function le() {
    var t = /^\s*(https?|ftp|mailto|tel|file):/, e = /^\s*(https?|ftp|file):|data:image\//;
    this.aHrefSanitizationWhitelist = function (e) {
      return m(e) ? (t = e, this) : t;
    }, this.imgSrcSanitizationWhitelist = function (t) {
      return m(t) ? (e = t, this) : e;
    }, this.$get = function () {
      return function (n, r) {
        var i, o = r ? e : t;
        return Ve && !(8 <= Ve) || (i = ge(n).href, '' === i || i.match(o)) ? n : 'unsafe:' + i;
      };
    };
  }
  function fe(t) {
    if ('self' === t)
      return t;
    if (w(t)) {
      if (-1 < t.indexOf('***'))
        throw Pn('iwcard', t);
      return t = t.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').replace(/\x08/g, '\\x08').replace('\\*\\*', '.*').replace('\\*', '[^:/.?&;]*'), RegExp('^' + t + '$');
    }
    if (k(t))
      return RegExp('^' + t.source + '$');
    throw Pn('imatcher');
  }
  function he(t) {
    var e = [];
    return m(t) && o(t, function (t) {
      e.push(fe(t));
    }), e;
  }
  function pe() {
    this.SCE_CONTEXTS = jn;
    var t = ['self'], e = [];
    this.resourceUrlWhitelist = function (e) {
      return arguments.length && (t = he(e)), t;
    }, this.resourceUrlBlacklist = function (t) {
      return arguments.length && (e = he(t)), e;
    }, this.$get = [
      '$injector',
      function (r) {
        function i(t) {
          var e = function (t) {
            this.$$unwrapTrustedValue = function () {
              return t;
            };
          };
          return t && (e.prototype = new t()), e.prototype.valueOf = function () {
            return this.$$unwrapTrustedValue();
          }, e.prototype.toString = function () {
            return this.$$unwrapTrustedValue().toString();
          }, e;
        }
        var o = function (t) {
          throw Pn('unsafe');
        };
        r.has('$sanitize') && (o = r.get('$sanitize'));
        var s = i(), a = {};
        return a[jn.HTML] = i(s), a[jn.CSS] = i(s), a[jn.URL] = i(s), a[jn.JS] = i(s), a[jn.RESOURCE_URL] = i(a[jn.URL]), {
          trustAs: function (t, e) {
            var r = a.hasOwnProperty(t) ? a[t] : null;
            if (!r)
              throw Pn('icontext', t, e);
            if (null === e || e === n || '' === e)
              return e;
            if ('string' != typeof e)
              throw Pn('itype', t);
            return new r(e);
          },
          getTrusted: function (r, i) {
            if (null === i || i === n || '' === i)
              return i;
            var s = a.hasOwnProperty(r) ? a[r] : null;
            if (s && i instanceof s)
              return i.$$unwrapTrustedValue();
            if (r === jn.RESOURCE_URL) {
              var u, c, s = ge(i.toString()), l = !1;
              for (u = 0, c = t.length; u < c; u++)
                if ('self' === t[u] ? me(s) : t[u].exec(s.href)) {
                  l = !0;
                  break;
                }
              if (l)
                for (u = 0, c = e.length; u < c; u++)
                  if ('self' === e[u] ? me(s) : e[u].exec(s.href)) {
                    l = !1;
                    break;
                  }
              if (l)
                return i;
              throw Pn('insecurl', i.toString());
            }
            if (r === jn.HTML)
              return o(i);
            throw Pn('unsafe');
          },
          valueOf: function (t) {
            return t instanceof s ? t.$$unwrapTrustedValue() : t;
          }
        };
      }
    ];
  }
  function $e() {
    var t = !0;
    this.enabled = function (e) {
      return arguments.length && (t = !!e), t;
    }, this.$get = [
      '$parse',
      '$sniffer',
      '$sceDelegate',
      function (e, n, r) {
        if (t && n.msie && 8 > n.msieDocumentMode)
          throw Pn('iequirks');
        var i = N(jn);
        i.isEnabled = function () {
          return t;
        }, i.trustAs = r.trustAs, i.getTrusted = r.getTrusted, i.valueOf = r.valueOf, t || (i.trustAs = i.getTrusted = function (t, e) {
          return e;
        }, i.valueOf = d), i.parseAs = function (t, n) {
          var r = e(n);
          return r.literal && r.constant ? r : function (e, n) {
            return i.getTrusted(t, r(e, n));
          };
        };
        var s = i.parseAs, a = i.getTrusted, u = i.trustAs;
        return o(jn, function (t, e) {
          var n = Fe(e);
          i[et('parse_as_' + n)] = function (e) {
            return s(t, e);
          }, i[et('get_trusted_' + n)] = function (e) {
            return a(t, e);
          }, i[et('trust_as_' + n)] = function (e) {
            return u(t, e);
          };
        }), i;
      }
    ];
  }
  function de() {
    this.$get = [
      '$window',
      '$document',
      function (t, e) {
        var n, r = {}, i = h((/android (\d+)/.exec(Fe((t.navigator || {}).userAgent)) || [])[1]), o = /Boxee/i.test((t.navigator || {}).userAgent), s = e[0] || {}, a = s.documentMode, u = /^(Moz|webkit|O|ms)(?=[A-Z])/, c = s.body && s.body.style, l = !1, f = !1;
        if (c) {
          for (var p in c)
            if (l = u.exec(p)) {
              n = l[0], n = n.substr(0, 1).toUpperCase() + n.substr(1);
              break;
            }
          n || (n = 'WebkitOpacity' in c && 'webkit'), l = !!('transition' in c || n + 'Transition' in c), f = !!('animation' in c || n + 'Animation' in c), !i || l && f || (l = w(s.body.style.webkitTransition), f = w(s.body.style.webkitAnimation));
        }
        return {
          history: !(!t.history || !t.history.pushState || 4 > i || o),
          hashchange: 'onhashchange' in t && (!a || 7 < a),
          hasEvent: function (t) {
            if ('input' == t && 9 == Ve)
              return !1;
            if (g(r[t])) {
              var e = s.createElement('div');
              r[t] = 'on' + t in e;
            }
            return r[t];
          },
          csp: D(),
          vendorPrefix: n,
          transitions: l,
          animations: f,
          msie: Ve,
          msieDocumentMode: a
        };
      }
    ];
  }
  function ve() {
    this.$get = [
      '$rootScope',
      '$browser',
      '$q',
      '$exceptionHandler',
      function (t, e, n, r) {
        function i(i, s, a) {
          var u = n.defer(), c = u.promise, l = m(a) && !a;
          return s = e.defer(function () {
            try {
              u.resolve(i());
            } catch (t) {
              u.reject(t), r(t);
            } finally {
              delete o[c.$$timeoutId];
            }
            l || t.$apply();
          }, s), c.$$timeoutId = s, o[s] = u, c;
        }
        var o = {};
        return i.cancel = function (t) {
          return !!(t && t.$$timeoutId in o) && (o[t.$$timeoutId].reject('canceled'), delete o[t.$$timeoutId], e.defer.cancel(t.$$timeoutId));
        }, i;
      }
    ];
  }
  function ge(t, e) {
    var n = t;
    return Ve && (Dn.setAttribute('href', n), n = Dn.href), Dn.setAttribute('href', n), {
      href: Dn.href,
      protocol: Dn.protocol ? Dn.protocol.replace(/:$/, '') : '',
      host: Dn.host,
      search: Dn.search ? Dn.search.replace(/^\?/, '') : '',
      hash: Dn.hash ? Dn.hash.replace(/^#/, '') : '',
      hostname: Dn.hostname,
      port: Dn.port,
      pathname: '/' === Dn.pathname.charAt(0) ? Dn.pathname : '/' + Dn.pathname
    };
  }
  function me(t) {
    return t = w(t) ? ge(t) : t, t.protocol === Rn.protocol && t.host === Rn.host;
  }
  function ye() {
    this.$get = v(t);
  }
  function we(t) {
    function e(r, i) {
      if (y(r)) {
        var s = {};
        return o(r, function (t, n) {
          s[n] = e(n, t);
        }), s;
      }
      return t.factory(r + n, i);
    }
    var n = 'Filter';
    this.register = e, this.$get = [
      '$injector',
      function (t) {
        return function (e) {
          return t.get(e + n);
        };
      }
    ], e('currency', be), e('date', Oe), e('filter', xe), e('json', Te), e('limitTo', Me), e('lowercase', Hn), e('number', Se), e('orderBy', Ne), e('uppercase', Fn);
  }
  function xe() {
    return function (t, e, n) {
      if (!S(t))
        return t;
      var r = typeof n, i = [];
      i.check = function (t) {
        for (var e = 0; e < i.length; e++)
          if (!i[e](t))
            return !1;
        return !0;
      }, 'function' !== r && (n = 'boolean' === r && n ? function (t, e) {
        return Je.equals(t, e);
      } : function (t, e) {
        return e = ('' + e).toLowerCase(), -1 < ('' + t).toLowerCase().indexOf(e);
      });
      var o = function (t, e) {
        if ('string' == typeof e && '!' === e.charAt(0))
          return !o(t, e.substr(1));
        switch (typeof t) {
        case 'boolean':
        case 'number':
        case 'string':
          return n(t, e);
        case 'object':
          switch (typeof e) {
          case 'object':
            return n(t, e);
          default:
            for (var r in t)
              if ('$' !== r.charAt(0) && o(t[r], e))
                return !0;
          }
          return !1;
        case 'array':
          for (r = 0; r < t.length; r++)
            if (o(t[r], e))
              return !0;
          return !1;
        default:
          return !1;
        }
      };
      switch (typeof e) {
      case 'boolean':
      case 'number':
      case 'string':
        e = { $: e };
      case 'object':
        for (var s in e)
          '$' == s ? function () {
            if (e[s]) {
              var t = s;
              i.push(function (n) {
                return o(n, e[t]);
              });
            }
          }() : function () {
            if ('undefined' != typeof e[s]) {
              var t = s;
              i.push(function (n) {
                return o(Y(n, t), e[t]);
              });
            }
          }();
        break;
      case 'function':
        i.push(e);
        break;
      default:
        return t;
      }
      for (var r = [], a = 0; a < t.length; a++) {
        var u = t[a];
        i.check(u) && r.push(u);
      }
      return r;
    };
  }
  function be(t) {
    var e = t.NUMBER_FORMATS;
    return function (t, n) {
      return g(n) && (n = e.CURRENCY_SYM), Ce(t, e.PATTERNS[1], e.GROUP_SEP, e.DECIMAL_SEP, 2).replace(/\u00A4/g, n);
    };
  }
  function Se(t) {
    var e = t.NUMBER_FORMATS;
    return function (t, n) {
      return Ce(t, e.PATTERNS[0], e.GROUP_SEP, e.DECIMAL_SEP, n);
    };
  }
  function Ce(t, e, n, r, i) {
    if (isNaN(t) || !isFinite(t))
      return '';
    var o = 0 > t;
    t = Math.abs(t);
    var s = t + '', a = '', u = [], c = !1;
    if (-1 !== s.indexOf('e')) {
      var l = s.match(/([\d\.]+)e(-?)(\d+)/);
      l && '-' == l[2] && l[3] > i + 1 ? s = '0' : (a = s, c = !0);
    }
    if (c)
      0 < i && -1 < t && 1 > t && (a = t.toFixed(i));
    else {
      s = (s.split(Vn)[1] || '').length, g(i) && (i = Math.min(Math.max(e.minFrac, s), e.maxFrac)), s = Math.pow(10, i), t = Math.round(t * s) / s, t = ('' + t).split(Vn), s = t[0], t = t[1] || '';
      var l = 0, f = e.lgSize, h = e.gSize;
      if (s.length >= f + h)
        for (l = s.length - f, c = 0; c < l; c++)
          0 === (l - c) % h && 0 !== c && (a += n), a += s.charAt(c);
      for (c = l; c < s.length; c++)
        0 === (s.length - c) % f && 0 !== c && (a += n), a += s.charAt(c);
      for (; t.length < i;)
        t += '0';
      i && '0' !== i && (a += r + t.substr(0, i));
    }
    return u.push(o ? e.negPre : e.posPre), u.push(a), u.push(o ? e.negSuf : e.posSuf), u.join('');
  }
  function ke(t, e, n) {
    var r = '';
    for (0 > t && (r = '-', t = -t), t = '' + t; t.length < e;)
      t = '0' + t;
    return n && (t = t.substr(t.length - e)), r + t;
  }
  function Ee(t, e, n, r) {
    return n = n || 0, function (i) {
      return i = i['get' + t](), (0 < n || i > -n) && (i += n), 0 === i && -12 == n && (i = 12), ke(i, e, r);
    };
  }
  function Ae(t, e) {
    return function (n, r) {
      var i = n['get' + t](), o = Le(e ? 'SHORT' + t : t);
      return r[o][i];
    };
  }
  function Oe(t) {
    function e(t) {
      var e;
      if (e = t.match(n)) {
        t = new Date(0);
        var r = 0, i = 0, o = e[8] ? t.setUTCFullYear : t.setFullYear, s = e[8] ? t.setUTCHours : t.setHours;
        e[9] && (r = h(e[9] + e[10]), i = h(e[9] + e[11])), o.call(t, h(e[1]), h(e[2]) - 1, h(e[3])), r = h(e[4] || 0) - r, i = h(e[5] || 0) - i, o = h(e[6] || 0), e = Math.round(1000 * parseFloat('0.' + (e[7] || 0))), s.call(t, r, i, o, e);
      }
      return t;
    }
    var n = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
    return function (n, r) {
      var i, s, a = '', u = [];
      if (r = r || 'mediumDate', r = t.DATETIME_FORMATS[r] || r, w(n) && (n = In.test(n) ? h(n) : e(n)), x(n) && (n = new Date(n)), !b(n))
        return n;
      for (; r;)
        (s = Un.exec(r)) ? (u = u.concat(_e.call(s, 1)), r = u.pop()) : (u.push(r), r = null);
      return o(u, function (e) {
        i = qn[e], a += i ? i(n, t.DATETIME_FORMATS) : e.replace(/(^'|'$)/g, '').replace(/''/g, '\'');
      }), a;
    };
  }
  function Te() {
    return function (t) {
      return q(t, !0);
    };
  }
  function Me() {
    return function (t, e) {
      if (!S(t) && !w(t))
        return t;
      if (e = h(e), w(t))
        return e ? 0 <= e ? t.slice(0, e) : t.slice(e, t.length) : '';
      var n, r, i = [];
      for (e > t.length ? e = t.length : e < -t.length && (e = -t.length), 0 < e ? (n = 0, r = e) : (n = t.length + e, r = t.length); n < r; n++)
        i.push(t[n]);
      return i;
    };
  }
  function Ne(t) {
    return function (e, n, r) {
      function i(t, e) {
        return I(e) ? function (e, n) {
          return t(n, e);
        } : t;
      }
      if (!S(e) || !n)
        return e;
      n = S(n) ? n : [n], n = O(n, function (e) {
        var n = !1, r = e || d;
        return w(e) && ('+' != e.charAt(0) && '-' != e.charAt(0) || (n = '-' == e.charAt(0), e = e.substring(1)), r = t(e)), i(function (t, e) {
          var n;
          n = r(t);
          var i = r(e), o = typeof n, s = typeof i;
          return o == s ? ('string' == o && (n = n.toLowerCase(), i = i.toLowerCase()), n = n === i ? 0 : n < i ? -1 : 1) : n = o < s ? -1 : 1, n;
        }, n);
      });
      for (var o = [], s = 0; s < e.length; s++)
        o.push(e[s]);
      return o.sort(i(function (t, e) {
        for (var r = 0; r < n.length; r++) {
          var i = n[r](t, e);
          if (0 !== i)
            return i;
        }
        return 0;
      }, r));
    };
  }
  function Pe(t) {
    return C(t) && (t = { link: t }), t.restrict = t.restrict || 'AC', v(t);
  }
  function je(t, e) {
    function n(e, n) {
      n = n ? '-' + Q(n, '-') : '', t.removeClass((e ? tr : Gn) + n).addClass((e ? Gn : tr) + n);
    }
    var r = this, i = t.parent().controller('form') || Bn, s = 0, a = r.$error = {}, u = [];
    r.$name = e.name || e.ngForm, r.$dirty = !1, r.$pristine = !0, r.$valid = !0, r.$invalid = !1, i.$addControl(r), t.addClass(er), n(!0), r.$addControl = function (t) {
      K(t.$name, 'input'), u.push(t), t.$name && (r[t.$name] = t);
    }, r.$removeControl = function (t) {
      t.$name && r[t.$name] === t && delete r[t.$name], o(a, function (e, n) {
        r.$setValidity(n, !0, t);
      }), M(u, t);
    }, r.$setValidity = function (t, e, o) {
      var u = a[t];
      if (e)
        u && (M(u, o), u.length || (s--, s || (n(e), r.$valid = !0, r.$invalid = !1), a[t] = !1, n(!0, t), i.$setValidity(t, !0, r)));
      else {
        if (s || n(e), u) {
          if (-1 != T(u, o))
            return;
        } else
          a[t] = u = [], s++, n(!1, t), i.$setValidity(t, !1, r);
        u.push(o), r.$valid = !1, r.$invalid = !0;
      }
    }, r.$setDirty = function () {
      t.removeClass(er).addClass(nr), r.$dirty = !0, r.$pristine = !1, i.$setDirty();
    }, r.$setPristine = function () {
      t.removeClass(nr).addClass(er), r.$dirty = !1, r.$pristine = !0, o(u, function (t) {
        t.$setPristine();
      });
    };
  }
  function De(t, e, i, o, s, a) {
    var u = !1;
    e.on('compositionstart', function () {
      u = !0;
    }), e.on('compositionend', function () {
      u = !1;
    });
    var c = function () {
      if (!u) {
        var n = e.val();
        I(i.ngTrim || 'T') && (n = Ze(n)), o.$viewValue !== n && t.$apply(function () {
          o.$setViewValue(n);
        });
      }
    };
    if (s.hasEvent('input'))
      e.on('input', c);
    else {
      var l, f = function () {
          l || (l = a.defer(function () {
            c(), l = null;
          }));
        };
      e.on('keydown', function (t) {
        t = t.keyCode, 91 === t || 15 < t && 19 > t || 37 <= t && 40 >= t || f();
      }), s.hasEvent('paste') && e.on('paste cut', f);
    }
    e.on('change', c), o.$render = function () {
      e.val(o.$isEmpty(o.$viewValue) ? '' : o.$viewValue);
    };
    var p = i.ngPattern, $ = function (t, e) {
        return o.$isEmpty(e) || t.test(e) ? (o.$setValidity('pattern', !0), e) : (o.$setValidity('pattern', !1), n);
      };
    if (p && ((s = p.match(/^\/(.*)\/([gim]*)$/)) ? (p = RegExp(s[1], s[2]), s = function (t) {
        return $(p, t);
      }) : s = function (n) {
        var i = t.$eval(p);
        if (!i || !i.test)
          throw r('ngPattern')('noregexp', p, i, H(e));
        return $(i, n);
      }, o.$formatters.push(s), o.$parsers.push(s)), i.ngMinlength) {
      var d = h(i.ngMinlength);
      s = function (t) {
        return !o.$isEmpty(t) && t.length < d ? (o.$setValidity('minlength', !1), n) : (o.$setValidity('minlength', !0), t);
      }, o.$parsers.push(s), o.$formatters.push(s);
    }
    if (i.ngMaxlength) {
      var v = h(i.ngMaxlength);
      s = function (t) {
        return !o.$isEmpty(t) && t.length > v ? (o.$setValidity('maxlength', !1), n) : (o.$setValidity('maxlength', !0), t);
      }, o.$parsers.push(s), o.$formatters.push(s);
    }
  }
  function Re(t, e) {
    return t = 'ngClass' + t, function () {
      return {
        restrict: 'AC',
        link: function (n, r, i) {
          function s(t) {
            if (!0 === e || n.$index % 2 === e) {
              var r = a(t || '');
              u ? j(t, u) || i.$updateClass(r, a(u)) : i.$addClass(r);
            }
            u = N(t);
          }
          function a(t) {
            if (S(t))
              return t.join(' ');
            if (y(t)) {
              var e = [];
              return o(t, function (t, n) {
                t && e.push(n);
              }), e.join(' ');
            }
            return t;
          }
          var u;
          n.$watch(i[t], s, !0), i.$observe('class', function (e) {
            s(n.$eval(i[t]));
          }), 'ngClass' !== t && n.$watch('$index', function (r, o) {
            var s = 1 & r;
            if (s !== o & 1) {
              var u = a(n.$eval(i[t]));
              s === e ? i.$addClass(u) : i.$removeClass(u);
            }
          });
        }
      };
    };
  }
  var Ve, qe, Ue, Ie, He, Fe = function (t) {
      return w(t) ? t.toLowerCase() : t;
    }, Le = function (t) {
      return w(t) ? t.toUpperCase() : t;
    }, _e = [].slice, Be = [].push, ze = Object.prototype.toString, We = r('ng'), Je = t.angular || (t.angular = {}), Qe = [
      '0',
      '0',
      '0'
    ];
  Ve = h((/msie (\d+)/.exec(Fe(navigator.userAgent)) || [])[1]), isNaN(Ve) && (Ve = h((/trident\/.*; rv:(\d+)/.exec(Fe(navigator.userAgent)) || [])[1])), $.$inject = [], d.$inject = [];
  var Ze = function () {
      return String.prototype.trim ? function (t) {
        return w(t) ? t.trim() : t;
      } : function (t) {
        return w(t) ? t.replace(/^\s\s*/, '').replace(/\s\s*$/, '') : t;
      };
    }();
  He = 9 > Ve ? function (t) {
    return t = t.nodeName ? t : t[0], t.scopeName && 'HTML' != t.scopeName ? Le(t.scopeName + ':' + t.nodeName) : t.nodeName;
  } : function (t) {
    return t.nodeName ? t.nodeName : t[0].nodeName;
  };
  var Xe = /[A-Z]/g, Ke = {
      full: '1.2.3',
      major: 1,
      minor: 2,
      dot: 3,
      codeName: 'unicorn-zapper'
    }, Ye = rt.cache = {}, Ge = rt.expando = 'ng-' + new Date().getTime(), tn = 1, en = t.document.addEventListener ? function (t, e, n) {
      t.addEventListener(e, n, !1);
    } : function (t, e, n) {
      t.attachEvent('on' + e, n);
    }, nn = t.document.removeEventListener ? function (t, e, n) {
      t.removeEventListener(e, n, !1);
    } : function (t, e, n) {
      t.detachEvent('on' + e, n);
    }, rn = /([\:\-\_]+(.))/g, on = /^moz([A-Z])/, sn = r('jqLite'), an = rt.prototype = {
      ready: function (n) {
        function r() {
          i || (i = !0, n());
        }
        var i = !1;
        'complete' === e.readyState ? setTimeout(r) : (this.on('DOMContentLoaded', r), rt(t).on('load', r));
      },
      toString: function () {
        var t = [];
        return o(this, function (e) {
          t.push('' + e);
        }), '[' + t.join(', ') + ']';
      },
      eq: function (t) {
        return qe(0 <= t ? this[t] : this[this.length + t]);
      },
      length: 0,
      push: Be,
      sort: [].sort,
      splice: [].splice
    }, un = {};
  o('multiple selected checked disabled readOnly required open'.split(' '), function (t) {
    un[Fe(t)] = t;
  });
  var cn = {};
  o('input select option textarea button form details'.split(' '), function (t) {
    cn[Le(t)] = !0;
  }), o({
    data: ct,
    inheritedData: dt,
    scope: function (t) {
      return qe(t).data('$scope') || dt(t.parentNode || t, [
        '$isolateScope',
        '$scope'
      ]);
    },
    isolateScope: function (t) {
      return qe(t).data('$isolateScope') || qe(t).data('$isolateScopeNoTemplate');
    },
    controller: $t,
    injector: function (t) {
      return dt(t, '$injector');
    },
    removeAttr: function (t, e) {
      t.removeAttribute(e);
    },
    hasClass: lt,
    css: function (t, e, r) {
      if (e = et(e), !m(r)) {
        var i;
        return 8 >= Ve && (i = t.currentStyle && t.currentStyle[e], '' === i && (i = 'auto')), i = i || t.style[e], 8 >= Ve && (i = '' === i ? n : i), i;
      }
      t.style[e] = r;
    },
    attr: function (t, e, r) {
      var i = Fe(e);
      if (un[i]) {
        if (!m(r))
          return t[e] || (t.attributes.getNamedItem(e) || $).specified ? i : n;
        r ? (t[e] = !0, t.setAttribute(e, i)) : (t[e] = !1, t.removeAttribute(i));
      } else if (m(r))
        t.setAttribute(e, r);
      else if (t.getAttribute)
        return t = t.getAttribute(e, 2), null === t ? n : t;
    },
    prop: function (t, e, n) {
      return m(n) ? void (t[e] = n) : t[e];
    },
    text: function () {
      function t(t, n) {
        var r = e[t.nodeType];
        return g(n) ? r ? t[r] : '' : void (t[r] = n);
      }
      var e = [];
      return 9 > Ve ? (e[1] = 'innerText', e[3] = 'nodeValue') : e[1] = e[3] = 'textContent', t.$dv = '', t;
    }(),
    val: function (t, e) {
      if (g(e)) {
        if ('SELECT' === He(t) && t.multiple) {
          var n = [];
          return o(t.options, function (t) {
            t.selected && n.push(t.value || t.text);
          }), 0 === n.length ? null : n;
        }
        return t.value;
      }
      t.value = e;
    },
    html: function (t, e) {
      if (g(e))
        return t.innerHTML;
      for (var n = 0, r = t.childNodes; n < r.length; n++)
        ot(r[n]);
      t.innerHTML = e;
    }
  }, function (t, e) {
    rt.prototype[e] = function (e, r) {
      var i, o;
      if ((2 == t.length && t !== lt && t !== $t ? e : r) === n) {
        if (y(e)) {
          for (i = 0; i < this.length; i++)
            if (t === ct)
              t(this[i], e);
            else
              for (o in e)
                t(this[i], o, e[o]);
          return this;
        }
        i = t.$dv, o = i === n ? Math.min(this.length, 1) : this.length;
        for (var s = 0; s < o; s++) {
          var a = t(this[s], e, r);
          i = i ? i + a : a;
        }
        return i;
      }
      for (i = 0; i < this.length; i++)
        t(this[i], e, r);
      return this;
    };
  }), o({
    removeData: at,
    dealoc: ot,
    on: function t(n, r, i, s) {
      if (m(s))
        throw sn('onargs');
      var a = ut(n, 'events'), u = ut(n, 'handle');
      a || ut(n, 'events', a = {}), u || ut(n, 'handle', u = gt(n, a)), o(r.split(' '), function (r) {
        var o = a[r];
        if (!o) {
          if ('mouseenter' == r || 'mouseleave' == r) {
            var s = e.body.contains || e.body.compareDocumentPosition ? function (t, e) {
                var n = 9 === t.nodeType ? t.documentElement : t, r = e && e.parentNode;
                return t === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(r)));
              } : function (t, e) {
                if (e)
                  for (; e = e.parentNode;)
                    if (e === t)
                      return !0;
                return !1;
              };
            a[r] = [], t(n, {
              mouseleave: 'mouseout',
              mouseenter: 'mouseover'
            }[r], function (t) {
              var e = t.relatedTarget;
              e && (e === this || s(this, e)) || u(t, r);
            });
          } else
            en(n, r, u), a[r] = [];
          o = a[r];
        }
        o.push(i);
      });
    },
    off: st,
    replaceWith: function (t, e) {
      var n, r = t.parentNode;
      ot(t), o(new rt(e), function (e) {
        n ? r.insertBefore(e, n.nextSibling) : r.replaceChild(e, t), n = e;
      });
    },
    children: function (t) {
      var e = [];
      return o(t.childNodes, function (t) {
        1 === t.nodeType && e.push(t);
      }), e;
    },
    contents: function (t) {
      return t.childNodes || [];
    },
    append: function (t, e) {
      o(new rt(e), function (e) {
        1 !== t.nodeType && 11 !== t.nodeType || t.appendChild(e);
      });
    },
    prepend: function (t, e) {
      if (1 === t.nodeType) {
        var n = t.firstChild;
        o(new rt(e), function (e) {
          t.insertBefore(e, n);
        });
      }
    },
    wrap: function (t, e) {
      e = qe(e)[0];
      var n = t.parentNode;
      n && n.replaceChild(e, t), e.appendChild(t);
    },
    remove: function (t) {
      ot(t);
      var e = t.parentNode;
      e && e.removeChild(t);
    },
    after: function (t, e) {
      var n = t, r = t.parentNode;
      o(new rt(e), function (t) {
        r.insertBefore(t, n.nextSibling), n = t;
      });
    },
    addClass: ht,
    removeClass: ft,
    toggleClass: function (t, e, n) {
      g(n) && (n = !lt(t, e)), (n ? ht : ft)(t, e);
    },
    parent: function (t) {
      return (t = t.parentNode) && 11 !== t.nodeType ? t : null;
    },
    next: function (t) {
      if (t.nextElementSibling)
        return t.nextElementSibling;
      for (t = t.nextSibling; null != t && 1 !== t.nodeType;)
        t = t.nextSibling;
      return t;
    },
    find: function (t, e) {
      return t.getElementsByTagName(e);
    },
    clone: it,
    triggerHandler: function (t, e, n) {
      e = (ut(t, 'events') || {})[e], n = n || [];
      var r = [{
            preventDefault: $,
            stopPropagation: $
          }];
      o(e, function (e) {
        e.apply(t, r.concat(n));
      });
    }
  }, function (t, e) {
    rt.prototype[e] = function (e, n, r) {
      for (var i, o = 0; o < this.length; o++)
        g(i) ? (i = t(this[o], e, n, r), m(i) && (i = qe(i))) : pt(i, t(this[o], e, n, r));
      return m(i) ? i : this;
    }, rt.prototype.bind = rt.prototype.on, rt.prototype.unbind = rt.prototype.off;
  }), yt.prototype = {
    put: function (t, e) {
      this[mt(t)] = e;
    },
    get: function (t) {
      return this[mt(t)];
    },
    remove: function (t) {
      var e = this[t = mt(t)];
      return delete this[t], e;
    }
  };
  var ln = /^function\s*[^\(]*\(\s*([^\)]*)\)/m, fn = /,/, hn = /^\s*(_?)(\S+?)\1\s*$/, pn = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, $n = r('$injector'), dn = r('$animate'), vn = [
      '$provide',
      function (t) {
        this.$$selectors = {}, this.register = function (e, n) {
          var r = e + '-animation';
          if (e && '.' != e.charAt(0))
            throw dn('notcsel', e);
          this.$$selectors[e.substr(1)] = r, t.factory(r, n);
        }, this.$get = [
          '$timeout',
          function (t) {
            return {
              enter: function (e, n, r, i) {
                r ? r.after(e) : (n && n[0] || (n = r.parent()), n.append(e)), i && t(i, 0, !1);
              },
              leave: function (e, n) {
                e.remove(), n && t(n, 0, !1);
              },
              move: function (t, e, n, r) {
                this.enter(t, e, n, r);
              },
              addClass: function (e, n, r) {
                n = w(n) ? n : S(n) ? n.join(' ') : '', o(e, function (t) {
                  ht(t, n);
                }), r && t(r, 0, !1);
              },
              removeClass: function (e, n, r) {
                n = w(n) ? n : S(n) ? n.join(' ') : '', o(e, function (t) {
                  ft(t, n);
                }), r && t(r, 0, !1);
              },
              enabled: $
            };
          }
        ];
      }
    ], gn = r('$compile');
  At.$inject = [
    '$provide',
    '$$sanitizeUriProvider'
  ];
  var mn = /^(x[\:\-_]|data[\:\-_])/i, yn = t.XMLHttpRequest || function () {
      try {
        return new ActiveXObject('Msxml2.XMLHTTP.6.0');
      } catch (t) {
      }
      try {
        return new ActiveXObject('Msxml2.XMLHTTP.3.0');
      } catch (t) {
      }
      try {
        return new ActiveXObject('Msxml2.XMLHTTP');
      } catch (t) {
      }
      throw r('$httpBackend')('noxhr');
    }, wn = r('$interpolate'), xn = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, bn = {
      http: 80,
      https: 443,
      ftp: 21
    }, Sn = r('$location');
  Xt.prototype = Zt.prototype = Qt.prototype = {
    $$html5: !1,
    $$replace: !1,
    absUrl: Kt('$$absUrl'),
    url: function (t, e) {
      if (g(t))
        return this.$$url;
      var n = xn.exec(t);
      return n[1] && this.path(decodeURIComponent(n[1])), (n[2] || n[1]) && this.search(n[3] || ''), this.hash(n[5] || '', e), this;
    },
    protocol: Kt('$$protocol'),
    host: Kt('$$host'),
    port: Kt('$$port'),
    path: Yt('$$path', function (t) {
      return '/' == t.charAt(0) ? t : '/' + t;
    }),
    search: function (t, e) {
      switch (arguments.length) {
      case 0:
        return this.$$search;
      case 1:
        if (w(t))
          this.$$search = L(t);
        else {
          if (!y(t))
            throw Sn('isrcharg');
          this.$$search = t;
        }
        break;
      default:
        g(e) || null === e ? delete this.$$search[t] : this.$$search[t] = e;
      }
      return this.$$compose(), this;
    },
    hash: Yt('$$hash', d),
    replace: function () {
      return this.$$replace = !0, this;
    }
  };
  var Cn, kn = r('$parse'), En = {}, An = {
      null: function () {
        return null;
      },
      true: function () {
        return !0;
      },
      false: function () {
        return !1;
      },
      undefined: $,
      '+': function (t, e, r, i) {
        return r = r(t, e), i = i(t, e), m(r) ? m(i) ? r + i : r : m(i) ? i : n;
      },
      '-': function (t, e, n, r) {
        return n = n(t, e), r = r(t, e), (m(n) ? n : 0) - (m(r) ? r : 0);
      },
      '*': function (t, e, n, r) {
        return n(t, e) * r(t, e);
      },
      '/': function (t, e, n, r) {
        return n(t, e) / r(t, e);
      },
      '%': function (t, e, n, r) {
        return n(t, e) % r(t, e);
      },
      '^': function (t, e, n, r) {
        return n(t, e) ^ r(t, e);
      },
      '=': $,
      '===': function (t, e, n, r) {
        return n(t, e) === r(t, e);
      },
      '!==': function (t, e, n, r) {
        return n(t, e) !== r(t, e);
      },
      '==': function (t, e, n, r) {
        return n(t, e) == r(t, e);
      },
      '!=': function (t, e, n, r) {
        return n(t, e) != r(t, e);
      },
      '<': function (t, e, n, r) {
        return n(t, e) < r(t, e);
      },
      '>': function (t, e, n, r) {
        return n(t, e) > r(t, e);
      },
      '<=': function (t, e, n, r) {
        return n(t, e) <= r(t, e);
      },
      '>=': function (t, e, n, r) {
        return n(t, e) >= r(t, e);
      },
      '&&': function (t, e, n, r) {
        return n(t, e) && r(t, e);
      },
      '||': function (t, e, n, r) {
        return n(t, e) || r(t, e);
      },
      '&': function (t, e, n, r) {
        return n(t, e) & r(t, e);
      },
      '|': function (t, e, n, r) {
        return r(t, e)(t, e, n(t, e));
      },
      '!': function (t, e, n) {
        return !n(t, e);
      }
    }, On = {
      n: '\n',
      f: '\f',
      r: '\r',
      t: '\t',
      v: '\x0B',
      '\'': '\'',
      '"': '"'
    }, Tn = function (t) {
      this.options = t;
    };
  Tn.prototype = {
    constructor: Tn,
    lex: function (t) {
      this.text = t, this.index = 0, this.ch = n, this.lastCh = ':', this.tokens = [];
      var e;
      for (t = []; this.index < this.text.length;) {
        if (this.ch = this.text.charAt(this.index), this.is('"\''))
          this.readString(this.ch);
        else if (this.isNumber(this.ch) || this.is('.') && this.isNumber(this.peek()))
          this.readNumber();
        else if (this.isIdent(this.ch))
          this.readIdent(), this.was('{,') && '{' === t[0] && (e = this.tokens[this.tokens.length - 1]) && (e.json = -1 === e.text.indexOf('.'));
        else if (this.is('(){}[].,;:?'))
          this.tokens.push({
            index: this.index,
            text: this.ch,
            json: this.was(':[,') && this.is('{[') || this.is('}]:,')
          }), this.is('{[') && t.unshift(this.ch), this.is('}]') && t.shift(), this.index++;
        else {
          if (this.isWhitespace(this.ch)) {
            this.index++;
            continue;
          }
          var r = this.ch + this.peek(), i = r + this.peek(2), o = An[this.ch], s = An[r], a = An[i];
          a ? (this.tokens.push({
            index: this.index,
            text: i,
            fn: a
          }), this.index += 3) : s ? (this.tokens.push({
            index: this.index,
            text: r,
            fn: s
          }), this.index += 2) : o ? (this.tokens.push({
            index: this.index,
            text: this.ch,
            fn: o,
            json: this.was('[,:') && this.is('+-')
          }), this.index += 1) : this.throwError('Unexpected next character ', this.index, this.index + 1);
        }
        this.lastCh = this.ch;
      }
      return this.tokens;
    },
    is: function (t) {
      return -1 !== t.indexOf(this.ch);
    },
    was: function (t) {
      return -1 !== t.indexOf(this.lastCh);
    },
    peek: function (t) {
      return t = t || 1, this.index + t < this.text.length && this.text.charAt(this.index + t);
    },
    isNumber: function (t) {
      return '0' <= t && '9' >= t;
    },
    isWhitespace: function (t) {
      return ' ' === t || '\r' === t || '\t' === t || '\n' === t || '\x0B' === t || '\xa0' === t;
    },
    isIdent: function (t) {
      return 'a' <= t && 'z' >= t || 'A' <= t && 'Z' >= t || '_' === t || '$' === t;
    },
    isExpOperator: function (t) {
      return '-' === t || '+' === t || this.isNumber(t);
    },
    throwError: function (t, e, n) {
      throw n = n || this.index, e = m(e) ? 's ' + e + '-' + this.index + ' [' + this.text.substring(e, n) + ']' : ' ' + n, kn('lexerr', t, e, this.text);
    },
    readNumber: function () {
      for (var t = '', e = this.index; this.index < this.text.length;) {
        var n = Fe(this.text.charAt(this.index));
        if ('.' == n || this.isNumber(n))
          t += n;
        else {
          var r = this.peek();
          if ('e' == n && this.isExpOperator(r))
            t += n;
          else if (this.isExpOperator(n) && r && this.isNumber(r) && 'e' == t.charAt(t.length - 1))
            t += n;
          else {
            if (!this.isExpOperator(n) || r && this.isNumber(r) || 'e' != t.charAt(t.length - 1))
              break;
            this.throwError('Invalid exponent');
          }
        }
        this.index++;
      }
      t *= 1, this.tokens.push({
        index: e,
        text: t,
        json: !0,
        fn: function () {
          return t;
        }
      });
    },
    readIdent: function () {
      for (var t, e, n, r, i = this, o = '', s = this.index; this.index < this.text.length && (r = this.text.charAt(this.index), '.' === r || this.isIdent(r) || this.isNumber(r));)
        '.' === r && (t = this.index), o += r, this.index++;
      if (t)
        for (e = this.index; e < this.text.length;) {
          if (r = this.text.charAt(e), '(' === r) {
            n = o.substr(t - s + 1), o = o.substr(0, t - s), this.index = e;
            break;
          }
          if (!this.isWhitespace(r))
            break;
          e++;
        }
      if (s = {
          index: s,
          text: o
        }, An.hasOwnProperty(o))
        s.fn = An[o], s.json = An[o];
      else {
        var a = oe(o, this.options, this.text);
        s.fn = f(function (t, e) {
          return a(t, e);
        }, {
          assign: function (t, e) {
            return re(t, o, e, i.text, i.options);
          }
        });
      }
      this.tokens.push(s), n && (this.tokens.push({
        index: t,
        text: '.',
        json: !1
      }), this.tokens.push({
        index: t + 1,
        text: n,
        json: !1
      }));
    },
    readString: function (t) {
      var e = this.index;
      this.index++;
      for (var n = '', r = t, i = !1; this.index < this.text.length;) {
        var o = this.text.charAt(this.index), r = r + o;
        if (i)
          'u' === o ? (o = this.text.substring(this.index + 1, this.index + 5), o.match(/[\da-f]{4}/i) || this.throwError('Invalid unicode escape [\\u' + o + ']'), this.index += 4, n += String.fromCharCode(parseInt(o, 16))) : n = (i = On[o]) ? n + i : n + o, i = !1;
        else if ('\\' === o)
          i = !0;
        else {
          if (o === t)
            return this.index++, void this.tokens.push({
              index: e,
              text: r,
              string: n,
              json: !0,
              fn: function () {
                return n;
              }
            });
          n += o;
        }
        this.index++;
      }
      this.throwError('Unterminated quote', e);
    }
  };
  var Mn = function (t, e, n) {
    this.lexer = t, this.$filter = e, this.options = n;
  };
  Mn.ZERO = function () {
    return 0;
  }, Mn.prototype = {
    constructor: Mn,
    parse: function (t, e) {
      this.text = t, this.json = e, this.tokens = this.lexer.lex(t), e && (this.assignment = this.logicalOR, this.functionCall = this.fieldAccess = this.objectIndex = this.filterChain = function () {
        this.throwError('is not valid json', {
          text: t,
          index: 0
        });
      });
      var n = e ? this.primary() : this.statements();
      return 0 !== this.tokens.length && this.throwError('is an unexpected token', this.tokens[0]), n.literal = !!n.literal, n.constant = !!n.constant, n;
    },
    primary: function () {
      var t;
      if (this.expect('('))
        t = this.filterChain(), this.consume(')');
      else if (this.expect('['))
        t = this.arrayDeclaration();
      else if (this.expect('{'))
        t = this.object();
      else {
        var e = this.expect();
        (t = e.fn) || this.throwError('not a primary expression', e), e.json && (t.constant = !0, t.literal = !0);
      }
      for (var n; e = this.expect('(', '[', '.');)
        '(' === e.text ? (t = this.functionCall(t, n), n = null) : '[' === e.text ? (n = t, t = this.objectIndex(t)) : '.' === e.text ? (n = t, t = this.fieldAccess(t)) : this.throwError('IMPOSSIBLE');
      return t;
    },
    throwError: function (t, e) {
      throw kn('syntax', e.text, t, e.index + 1, this.text, this.text.substring(e.index));
    },
    peekToken: function () {
      if (0 === this.tokens.length)
        throw kn('ueoe', this.text);
      return this.tokens[0];
    },
    peek: function (t, e, n, r) {
      if (0 < this.tokens.length) {
        var i = this.tokens[0], o = i.text;
        if (o === t || o === e || o === n || o === r || !(t || e || n || r))
          return i;
      }
      return !1;
    },
    expect: function (t, e, n, r) {
      return !!(t = this.peek(t, e, n, r)) && (this.json && !t.json && this.throwError('is not valid json', t), this.tokens.shift(), t);
    },
    consume: function (t) {
      this.expect(t) || this.throwError('is unexpected, expecting [' + t + ']', this.peek());
    },
    unaryFn: function (t, e) {
      return f(function (n, r) {
        return t(n, r, e);
      }, { constant: e.constant });
    },
    ternaryFn: function (t, e, n) {
      return f(function (r, i) {
        return t(r, i) ? e(r, i) : n(r, i);
      }, { constant: t.constant && e.constant && n.constant });
    },
    binaryFn: function (t, e, n) {
      return f(function (r, i) {
        return e(r, i, t, n);
      }, { constant: t.constant && n.constant });
    },
    statements: function () {
      for (var t = [];;)
        if (0 < this.tokens.length && !this.peek('}', ')', ';', ']') && t.push(this.filterChain()), !this.expect(';'))
          return 1 === t.length ? t[0] : function (e, n) {
            for (var r, i = 0; i < t.length; i++) {
              var o = t[i];
              o && (r = o(e, n));
            }
            return r;
          };
    },
    filterChain: function () {
      for (var t, e = this.expression();;) {
        if (!(t = this.expect('|')))
          return e;
        e = this.binaryFn(e, t.fn, this.filter());
      }
    },
    filter: function () {
      for (var t = this.expect(), e = this.$filter(t.text), n = [];;) {
        if (!(t = this.expect(':'))) {
          var r = function (t, r, i) {
            i = [i];
            for (var o = 0; o < n.length; o++)
              i.push(n[o](t, r));
            return e.apply(t, i);
          };
          return function () {
            return r;
          };
        }
        n.push(this.expression());
      }
    },
    expression: function () {
      return this.assignment();
    },
    assignment: function () {
      var t, e, n = this.ternary();
      return (e = this.expect('=')) ? (n.assign || this.throwError('implies assignment but [' + this.text.substring(0, e.index) + '] can not be assigned to', e), t = this.ternary(), function (e, r) {
        return n.assign(e, t(e, r), r);
      }) : n;
    },
    ternary: function () {
      var t, e, n = this.logicalOR();
      return this.expect('?') ? (t = this.ternary(), (e = this.expect(':')) ? this.ternaryFn(n, t, this.ternary()) : void this.throwError('expected :', e)) : n;
    },
    logicalOR: function () {
      for (var t, e = this.logicalAND();;) {
        if (!(t = this.expect('||')))
          return e;
        e = this.binaryFn(e, t.fn, this.logicalAND());
      }
    },
    logicalAND: function () {
      var t, e = this.equality();
      return (t = this.expect('&&')) && (e = this.binaryFn(e, t.fn, this.logicalAND())), e;
    },
    equality: function () {
      var t, e = this.relational();
      return (t = this.expect('==', '!=', '===', '!==')) && (e = this.binaryFn(e, t.fn, this.equality())), e;
    },
    relational: function () {
      var t, e = this.additive();
      return (t = this.expect('<', '>', '<=', '>=')) && (e = this.binaryFn(e, t.fn, this.relational())), e;
    },
    additive: function () {
      for (var t, e = this.multiplicative(); t = this.expect('+', '-');)
        e = this.binaryFn(e, t.fn, this.multiplicative());
      return e;
    },
    multiplicative: function () {
      for (var t, e = this.unary(); t = this.expect('*', '/', '%');)
        e = this.binaryFn(e, t.fn, this.unary());
      return e;
    },
    unary: function () {
      var t;
      return this.expect('+') ? this.primary() : (t = this.expect('-')) ? this.binaryFn(Mn.ZERO, t.fn, this.unary()) : (t = this.expect('!')) ? this.unaryFn(t.fn, this.unary()) : this.primary();
    },
    fieldAccess: function (t) {
      var e = this, n = this.expect().text, r = oe(n, this.options, this.text);
      return f(function (e, n, i) {
        return r(i || t(e, n), n);
      }, {
        assign: function (r, i, o) {
          return re(t(r, o), n, i, e.text, e.options);
        }
      });
    },
    objectIndex: function (t) {
      var e = this, r = this.expression();
      return this.consume(']'), f(function (i, o) {
        var s, a = t(i, o), u = r(i, o);
        return a ? ((a = ne(a[u], e.text)) && a.then && e.options.unwrapPromises && (s = a, '$$v' in a || (s.$$v = n, s.then(function (t) {
          s.$$v = t;
        })), a = a.$$v), a) : n;
      }, {
        assign: function (n, i, o) {
          var s = r(n, o);
          return ne(t(n, o), e.text)[s] = i;
        }
      });
    },
    functionCall: function (t, e) {
      var n = [];
      if (')' !== this.peekToken().text)
        do
          n.push(this.expression());
        while (this.expect(','));
      this.consume(')');
      var r = this;
      return function (i, o) {
        for (var s = [], a = e ? e(i, o) : i, u = 0; u < n.length; u++)
          s.push(n[u](i, o));
        return u = t(i, o, a) || $, ne(a, r.text), ne(u, r.text), s = u.apply ? u.apply(a, s) : u(s[0], s[1], s[2], s[3], s[4]), ne(s, r.text);
      };
    },
    arrayDeclaration: function () {
      var t = [], e = !0;
      if (']' !== this.peekToken().text)
        do {
          var n = this.expression();
          t.push(n), n.constant || (e = !1);
        } while (this.expect(','));
      return this.consume(']'), f(function (e, n) {
        for (var r = [], i = 0; i < t.length; i++)
          r.push(t[i](e, n));
        return r;
      }, {
        literal: !0,
        constant: e
      });
    },
    object: function () {
      var t = [], e = !0;
      if ('}' !== this.peekToken().text)
        do {
          var n = this.expect(), n = n.string || n.text;
          this.consume(':');
          var r = this.expression();
          t.push({
            key: n,
            value: r
          }), r.constant || (e = !1);
        } while (this.expect(','));
      return this.consume('}'), f(function (e, n) {
        for (var r = {}, i = 0; i < t.length; i++) {
          var o = t[i];
          r[o.key] = o.value(e, n);
        }
        return r;
      }, {
        literal: !0,
        constant: e
      });
    }
  };
  var Nn = {}, Pn = r('$sce'), jn = {
      HTML: 'html',
      CSS: 'css',
      URL: 'url',
      RESOURCE_URL: 'resourceUrl',
      JS: 'js'
    }, Dn = e.createElement('a'), Rn = ge(t.location.href, !0);
  we.$inject = ['$provide'], be.$inject = ['$locale'], Se.$inject = ['$locale'];
  var Vn = '.', qn = {
      yyyy: Ee('FullYear', 4),
      yy: Ee('FullYear', 2, 0, !0),
      y: Ee('FullYear', 1),
      MMMM: Ae('Month'),
      MMM: Ae('Month', !0),
      MM: Ee('Month', 2, 1),
      M: Ee('Month', 1, 1),
      dd: Ee('Date', 2),
      d: Ee('Date', 1),
      HH: Ee('Hours', 2),
      H: Ee('Hours', 1),
      hh: Ee('Hours', 2, -12),
      h: Ee('Hours', 1, -12),
      mm: Ee('Minutes', 2),
      m: Ee('Minutes', 1),
      ss: Ee('Seconds', 2),
      s: Ee('Seconds', 1),
      sss: Ee('Milliseconds', 3),
      EEEE: Ae('Day'),
      EEE: Ae('Day', !0),
      a: function (t, e) {
        return 12 > t.getHours() ? e.AMPMS[0] : e.AMPMS[1];
      },
      Z: function (t) {
        return t = -1 * t.getTimezoneOffset(), t = (0 <= t ? '+' : '') + (ke(Math[0 < t ? 'floor' : 'ceil'](t / 60), 2) + ke(Math.abs(t % 60), 2));
      }
    }, Un = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/, In = /^\-?\d+$/;
  Oe.$inject = ['$locale'];
  var Hn = v(Fe), Fn = v(Le);
  Ne.$inject = ['$parse'];
  var Ln = v({
      restrict: 'E',
      compile: function (t, n) {
        return 8 >= Ve && (n.href || n.name || n.$set('href', ''), t.append(e.createComment('IE fix'))), function (t, e) {
          e.on('click', function (t) {
            e.attr('href') || t.preventDefault();
          });
        };
      }
    }), _n = {};
  o(un, function (t, e) {
    if ('multiple' != t) {
      var n = Ot('ng-' + e);
      _n[n] = function () {
        return {
          priority: 100,
          compile: function () {
            return function (t, r, i) {
              t.$watch(i[n], function (t) {
                i.$set(e, !!t);
              });
            };
          }
        };
      };
    }
  }), o([
    'src',
    'srcset',
    'href'
  ], function (t) {
    var e = Ot('ng-' + t);
    _n[e] = function () {
      return {
        priority: 99,
        link: function (n, r, i) {
          i.$observe(e, function (e) {
            e && (i.$set(t, e), Ve && r.prop(t, i[t]));
          });
        }
      };
    };
  });
  var Bn = {
      $addControl: $,
      $removeControl: $,
      $setValidity: $,
      $setDirty: $,
      $setPristine: $
    };
  je.$inject = [
    '$element',
    '$attrs',
    '$scope'
  ];
  var zn = function (t) {
      return [
        '$timeout',
        function (e) {
          return {
            name: 'form',
            restrict: t ? 'EAC' : 'E',
            controller: je,
            compile: function () {
              return {
                pre: function (t, r, i, o) {
                  if (!i.action) {
                    var s = function (t) {
                      t.preventDefault ? t.preventDefault() : t.returnValue = !1;
                    };
                    en(r[0], 'submit', s), r.on('$destroy', function () {
                      e(function () {
                        nn(r[0], 'submit', s);
                      }, 0, !1);
                    });
                  }
                  var a = r.parent().controller('form'), u = i.name || i.ngForm;
                  u && re(t, u, o, u), a && r.on('$destroy', function () {
                    a.$removeControl(o), u && re(t, u, n, u), f(o, Bn);
                  });
                }
              };
            }
          };
        }
      ];
    }, Wn = zn(), Jn = zn(!0), Qn = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, Zn = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/, Xn = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/, Kn = {
      text: De,
      number: function (t, e, r, i, o, s) {
        De(t, e, r, i, o, s), i.$parsers.push(function (t) {
          var e = i.$isEmpty(t);
          return e || Xn.test(t) ? (i.$setValidity('number', !0), '' === t ? null : e ? t : parseFloat(t)) : (i.$setValidity('number', !1), n);
        }), i.$formatters.push(function (t) {
          return i.$isEmpty(t) ? '' : '' + t;
        }), r.min && (t = function (t) {
          var e = parseFloat(r.min);
          return !i.$isEmpty(t) && t < e ? (i.$setValidity('min', !1), n) : (i.$setValidity('min', !0), t);
        }, i.$parsers.push(t), i.$formatters.push(t)), r.max && (t = function (t) {
          var e = parseFloat(r.max);
          return !i.$isEmpty(t) && t > e ? (i.$setValidity('max', !1), n) : (i.$setValidity('max', !0), t);
        }, i.$parsers.push(t), i.$formatters.push(t)), i.$formatters.push(function (t) {
          return i.$isEmpty(t) || x(t) ? (i.$setValidity('number', !0), t) : (i.$setValidity('number', !1), n);
        });
      },
      url: function (t, e, r, i, o, s) {
        De(t, e, r, i, o, s), t = function (t) {
          return i.$isEmpty(t) || Qn.test(t) ? (i.$setValidity('url', !0), t) : (i.$setValidity('url', !1), n);
        }, i.$formatters.push(t), i.$parsers.push(t);
      },
      email: function (t, e, r, i, o, s) {
        De(t, e, r, i, o, s), t = function (t) {
          return i.$isEmpty(t) || Zn.test(t) ? (i.$setValidity('email', !0), t) : (i.$setValidity('email', !1), n);
        }, i.$formatters.push(t), i.$parsers.push(t);
      },
      radio: function (t, e, n, r) {
        g(n.name) && e.attr('name', c()), e.on('click', function () {
          e[0].checked && t.$apply(function () {
            r.$setViewValue(n.value);
          });
        }), r.$render = function () {
          e[0].checked = n.value == r.$viewValue;
        }, n.$observe('value', r.$render);
      },
      checkbox: function (t, e, n, r) {
        var i = n.ngTrueValue, o = n.ngFalseValue;
        w(i) || (i = !0), w(o) || (o = !1), e.on('click', function () {
          t.$apply(function () {
            r.$setViewValue(e[0].checked);
          });
        }), r.$render = function () {
          e[0].checked = r.$viewValue;
        }, r.$isEmpty = function (t) {
          return t !== i;
        }, r.$formatters.push(function (t) {
          return t === i;
        }), r.$parsers.push(function (t) {
          return t ? i : o;
        });
      },
      hidden: $,
      button: $,
      submit: $,
      reset: $
    }, Yn = [
      '$browser',
      '$sniffer',
      function (t, e) {
        return {
          restrict: 'E',
          require: '?ngModel',
          link: function (n, r, i, o) {
            o && (Kn[Fe(i.type)] || Kn.text)(n, r, i, o, e, t);
          }
        };
      }
    ], Gn = 'ng-valid', tr = 'ng-invalid', er = 'ng-pristine', nr = 'ng-dirty', rr = [
      '$scope',
      '$exceptionHandler',
      '$attrs',
      '$element',
      '$parse',
      function (t, e, n, i, s) {
        function a(t, e) {
          e = e ? '-' + Q(e, '-') : '', i.removeClass((t ? tr : Gn) + e).addClass((t ? Gn : tr) + e);
        }
        this.$modelValue = this.$viewValue = Number.NaN, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$name = n.name;
        var u = s(n.ngModel), c = u.assign;
        if (!c)
          throw r('ngModel')('nonassign', n.ngModel, H(i));
        this.$render = $, this.$isEmpty = function (t) {
          return g(t) || '' === t || null === t || t !== t;
        };
        var l = i.inheritedData('$formController') || Bn, f = 0, h = this.$error = {};
        i.addClass(er), a(!0), this.$setValidity = function (t, e) {
          h[t] !== !e && (e ? (h[t] && f--, f || (a(!0), this.$valid = !0, this.$invalid = !1)) : (a(!1), this.$invalid = !0, this.$valid = !1, f++), h[t] = !e, a(e, t), l.$setValidity(t, e, this));
        }, this.$setPristine = function () {
          this.$dirty = !1, this.$pristine = !0, i.removeClass(nr).addClass(er);
        }, this.$setViewValue = function (n) {
          this.$viewValue = n, this.$pristine && (this.$dirty = !0, this.$pristine = !1, i.removeClass(er).addClass(nr), l.$setDirty()), o(this.$parsers, function (t) {
            n = t(n);
          }), this.$modelValue !== n && (this.$modelValue = n, c(t, n), o(this.$viewChangeListeners, function (t) {
            try {
              t();
            } catch (t) {
              e(t);
            }
          }));
        };
        var p = this;
        t.$watch(function () {
          var e = u(t);
          if (p.$modelValue !== e) {
            var n = p.$formatters, r = n.length;
            for (p.$modelValue = e; r--;)
              e = n[r](e);
            p.$viewValue !== e && (p.$viewValue = e, p.$render());
          }
        });
      }
    ], ir = function () {
      return {
        require: [
          'ngModel',
          '^?form'
        ],
        controller: rr,
        link: function (t, e, n, r) {
          var i = r[0], o = r[1] || Bn;
          o.$addControl(i), t.$on('$destroy', function () {
            o.$removeControl(i);
          });
        }
      };
    }, or = v({
      require: 'ngModel',
      link: function (t, e, n, r) {
        r.$viewChangeListeners.push(function () {
          t.$eval(n.ngChange);
        });
      }
    }), sr = function () {
      return {
        require: '?ngModel',
        link: function (t, e, n, r) {
          if (r) {
            n.required = !0;
            var i = function (t) {
              return n.required && r.$isEmpty(t) ? void r.$setValidity('required', !1) : (r.$setValidity('required', !0), t);
            };
            r.$formatters.push(i), r.$parsers.unshift(i), n.$observe('required', function () {
              i(r.$viewValue);
            });
          }
        }
      };
    }, ar = function () {
      return {
        require: 'ngModel',
        link: function (t, e, r, i) {
          var s = (t = /\/(.*)\//.exec(r.ngList)) && RegExp(t[1]) || r.ngList || ',';
          i.$parsers.push(function (t) {
            if (!g(t)) {
              var e = [];
              return t && o(t.split(s), function (t) {
                t && e.push(Ze(t));
              }), e;
            }
          }), i.$formatters.push(function (t) {
            return S(t) ? t.join(', ') : n;
          }), i.$isEmpty = function (t) {
            return !t || !t.length;
          };
        }
      };
    }, ur = /^(true|false|\d+)$/, cr = function () {
      return {
        priority: 100,
        compile: function (t, e) {
          return ur.test(e.ngValue) ? function (t, e, n) {
            n.$set('value', t.$eval(n.ngValue));
          } : function (t, e, n) {
            t.$watch(n.ngValue, function (t) {
              n.$set('value', t);
            });
          };
        }
      };
    }, lr = Pe(function (t, e, r) {
      e.addClass('ng-binding').data('$binding', r.ngBind), t.$watch(r.ngBind, function (t) {
        e.text(t == n ? '' : t);
      });
    }), fr = [
      '$interpolate',
      function (t) {
        return function (e, n, r) {
          e = t(n.attr(r.$attr.ngBindTemplate)), n.addClass('ng-binding').data('$binding', e), r.$observe('ngBindTemplate', function (t) {
            n.text(t);
          });
        };
      }
    ], hr = [
      '$sce',
      '$parse',
      function (t, e) {
        return function (n, r, i) {
          r.addClass('ng-binding').data('$binding', i.ngBindHtml);
          var o = e(i.ngBindHtml);
          n.$watch(function () {
            return (o(n) || '').toString();
          }, function (e) {
            r.html(t.getTrustedHtml(o(n)) || '');
          });
        };
      }
    ], pr = Re('', !0), $r = Re('Odd', 0), dr = Re('Even', 1), vr = Pe({
      compile: function (t, e) {
        e.$set('ngCloak', n), t.removeClass('ng-cloak');
      }
    }), gr = [function () {
        return {
          scope: !0,
          controller: '@',
          priority: 500
        };
      }], mr = {};
  o('click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste'.split(' '), function (t) {
    var e = Ot('ng-' + t);
    mr[e] = [
      '$parse',
      function (n) {
        return {
          compile: function (r, i) {
            var o = n(i[e]);
            return function (e, n, r) {
              n.on(Fe(t), function (t) {
                e.$apply(function () {
                  o(e, { $event: t });
                });
              });
            };
          }
        };
      }
    ];
  });
  var yr = [
      '$animate',
      function (t) {
        return {
          transclude: 'element',
          priority: 600,
          terminal: !0,
          restrict: 'A',
          $$tlb: !0,
          link: function (n, r, i, o, s) {
            var a, u;
            n.$watch(i.ngIf, function (o) {
              I(o) ? u || (u = n.$new(), s(u, function (n) {
                a = {
                  startNode: n[0],
                  endNode: n[n.length++] = e.createComment(' end ngIf: ' + i.ngIf + ' ')
                }, t.enter(n, r.parent(), r);
              })) : (u && (u.$destroy(), u = null), a && (t.leave(G(a)), a = null));
            });
          }
        };
      }
    ], wr = [
      '$http',
      '$templateCache',
      '$anchorScroll',
      '$compile',
      '$animate',
      '$sce',
      function (t, e, n, r, i, o) {
        return {
          restrict: 'ECA',
          priority: 400,
          terminal: !0,
          transclude: 'element',
          compile: function (s, a) {
            var u = a.ngInclude || a.src, c = a.onload || '', l = a.autoscroll;
            return function (s, a, f, h, p) {
              var d, v, g = 0, y = function () {
                  d && (d.$destroy(), d = null), v && (i.leave(v), v = null);
                };
              s.$watch(o.parseAsResourceUrl(u), function (o) {
                var u = function () {
                    !m(l) || l && !s.$eval(l) || n();
                  }, f = ++g;
                o ? (t.get(o, { cache: e }).success(function (t) {
                  if (f === g) {
                    var e = s.$new(), n = p(e, $);
                    y(), d = e, v = n, v.html(t), i.enter(v, null, a, u), r(v.contents())(d), d.$emit('$includeContentLoaded'), s.$eval(c);
                  }
                }).error(function () {
                  f === g && y();
                }), s.$emit('$includeContentRequested')) : y();
              });
            };
          }
        };
      }
    ], xr = Pe({
      compile: function () {
        return {
          pre: function (t, e, n) {
            t.$eval(n.ngInit);
          }
        };
      }
    }), br = Pe({
      terminal: !0,
      priority: 1000
    }), Sr = [
      '$locale',
      '$interpolate',
      function (t, e) {
        var n = /{}/g;
        return {
          restrict: 'EA',
          link: function (r, i, s) {
            var a = s.count, u = s.$attr.when && i.attr(s.$attr.when), c = s.offset || 0, l = r.$eval(u) || {}, f = {}, h = e.startSymbol(), p = e.endSymbol(), $ = /^when(Minus)?(.+)$/;
            o(s, function (t, e) {
              $.test(e) && (l[Fe(e.replace('when', '').replace('Minus', '-'))] = i.attr(s.$attr[e]));
            }), o(l, function (t, r) {
              f[r] = e(t.replace(n, h + a + '-' + c + p));
            }), r.$watch(function () {
              var e = parseFloat(r.$eval(a));
              return isNaN(e) ? '' : (e in l || (e = t.pluralCat(e - c)), f[e](r, i, !0));
            }, function (t) {
              i.text(t);
            });
          }
        };
      }
    ], Cr = [
      '$parse',
      '$animate',
      function (t, n) {
        var s = r('ngRepeat');
        return {
          transclude: 'element',
          priority: 1000,
          terminal: !0,
          $$tlb: !0,
          link: function (r, a, u, c, l) {
            var f, h, p, $, d, v, g = u.ngRepeat, m = g.match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/), y = { $id: mt };
            if (!m)
              throw s('iexp', g);
            if (u = m[1], c = m[2], (m = m[4]) ? (f = t(m), h = function (t, e, n) {
                return v && (y[v] = t), y[d] = e, y.$index = n, f(r, y);
              }) : (p = function (t, e) {
                return mt(e);
              }, $ = function (t) {
                return t;
              }), m = u.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/), !m)
              throw s('iidexp', u);
            d = m[3] || m[1], v = m[2];
            var w = {};
            r.$watchCollection(c, function (t) {
              var u, c, f, m, y, x, b, S, C, k = a[0], E = {}, A = [];
              if (i(t))
                S = t, f = h || p;
              else {
                f = h || $, S = [];
                for (x in t)
                  t.hasOwnProperty(x) && '$' != x.charAt(0) && S.push(x);
                S.sort();
              }
              for (m = S.length, c = A.length = S.length, u = 0; u < c; u++)
                if (x = t === S ? u : S[u], b = t[x], b = f(x, b, u), K(b, '`track by` id'), w.hasOwnProperty(b))
                  C = w[b], delete w[b], E[b] = C, A[u] = C;
                else {
                  if (E.hasOwnProperty(b))
                    throw o(A, function (t) {
                      t && t.startNode && (w[t.id] = t);
                    }), s('dupes', g, b);
                  A[u] = { id: b }, E[b] = !1;
                }
              for (x in w)
                w.hasOwnProperty(x) && (C = w[x], u = G(C), n.leave(u), o(u, function (t) {
                  t.$$NG_REMOVED = !0;
                }), C.scope.$destroy());
              for (u = 0, c = S.length; u < c; u++) {
                if (x = t === S ? u : S[u], b = t[x], C = A[u], A[u - 1] && (k = A[u - 1].endNode), C.startNode) {
                  y = C.scope, f = k;
                  do
                    f = f.nextSibling;
                  while (f && f.$$NG_REMOVED);
                  C.startNode != f && n.move(G(C), null, qe(k)), k = C.endNode;
                } else
                  y = r.$new();
                y[d] = b, v && (y[v] = x), y.$index = u, y.$first = 0 === u, y.$last = u === m - 1, y.$middle = !(y.$first || y.$last), y.$odd = !(y.$even = 0 === (1 & u)), C.startNode || l(y, function (t) {
                  t[t.length++] = e.createComment(' end ngRepeat: ' + g + ' '), n.enter(t, null, qe(k)), k = t, C.scope = y, C.startNode = k && k.endNode ? k.endNode : t[0], C.endNode = t[t.length - 1], E[C.id] = C;
                });
              }
              w = E;
            });
          }
        };
      }
    ], kr = [
      '$animate',
      function (t) {
        return function (e, n, r) {
          e.$watch(r.ngShow, function (e) {
            t[I(e) ? 'removeClass' : 'addClass'](n, 'ng-hide');
          });
        };
      }
    ], Er = [
      '$animate',
      function (t) {
        return function (e, n, r) {
          e.$watch(r.ngHide, function (e) {
            t[I(e) ? 'addClass' : 'removeClass'](n, 'ng-hide');
          });
        };
      }
    ], Ar = Pe(function (t, e, n) {
      t.$watch(n.ngStyle, function (t, n) {
        n && t !== n && o(n, function (t, n) {
          e.css(n, '');
        }), t && e.css(t);
      }, !0);
    }), Or = [
      '$animate',
      function (t) {
        return {
          restrict: 'EA',
          require: 'ngSwitch',
          controller: [
            '$scope',
            function () {
              this.cases = {};
            }
          ],
          link: function (e, n, r, i) {
            var s, a, u = [];
            e.$watch(r.ngSwitch || r.on, function (n) {
              for (var c = 0, l = u.length; c < l; c++)
                u[c].$destroy(), t.leave(a[c]);
              a = [], u = [], (s = i.cases['!' + n] || i.cases['?']) && (e.$eval(r.change), o(s, function (n) {
                var r = e.$new();
                u.push(r), n.transclude(r, function (e) {
                  var r = n.element;
                  a.push(e), t.enter(e, r.parent(), r);
                });
              }));
            });
          }
        };
      }
    ], Tr = Pe({
      transclude: 'element',
      priority: 800,
      require: '^ngSwitch',
      compile: function (t, e) {
        return function (t, n, r, i, o) {
          i.cases['!' + e.ngSwitchWhen] = i.cases['!' + e.ngSwitchWhen] || [], i.cases['!' + e.ngSwitchWhen].push({
            transclude: o,
            element: n
          });
        };
      }
    }), Mr = Pe({
      transclude: 'element',
      priority: 800,
      require: '^ngSwitch',
      link: function (t, e, n, r, i) {
        r.cases['?'] = r.cases['?'] || [], r.cases['?'].push({
          transclude: i,
          element: e
        });
      }
    }), Nr = Pe({
      controller: [
        '$element',
        '$transclude',
        function (t, e) {
          if (!e)
            throw r('ngTransclude')('orphan', H(t));
          this.$transclude = e;
        }
      ],
      link: function (t, e, n, r) {
        r.$transclude(function (t) {
          e.html(''), e.append(t);
        });
      }
    }), Pr = [
      '$templateCache',
      function (t) {
        return {
          restrict: 'E',
          terminal: !0,
          compile: function (e, n) {
            'text/ng-template' == n.type && t.put(n.id, e[0].text);
          }
        };
      }
    ], jr = r('ngOptions'), Dr = v({ terminal: !0 }), Rr = [
      '$compile',
      '$parse',
      function (t, r) {
        var i = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/, a = { $setViewValue: $ };
        return {
          restrict: 'E',
          require: [
            'select',
            '?ngModel'
          ],
          controller: [
            '$element',
            '$scope',
            '$attrs',
            function (t, e, n) {
              var r, i = this, o = {}, s = a;
              i.databound = n.ngModel, i.init = function (t, e, n) {
                s = t, r = n;
              }, i.addOption = function (e) {
                K(e, '"option value"'), o[e] = !0, s.$viewValue == e && (t.val(e), r.parent() && r.remove());
              }, i.removeOption = function (t) {
                this.hasOption(t) && (delete o[t], s.$viewValue == t && this.renderUnknownOption(t));
              }, i.renderUnknownOption = function (e) {
                e = '? ' + mt(e) + ' ?', r.val(e), t.prepend(r), t.val(e), r.prop('selected', !0);
              }, i.hasOption = function (t) {
                return o.hasOwnProperty(t);
              }, e.$on('$destroy', function () {
                i.renderUnknownOption = $;
              });
            }
          ],
          link: function (a, u, c, l) {
            function f(t, e, n, r) {
              n.$render = function () {
                var t = n.$viewValue;
                r.hasOption(t) ? (k.parent() && k.remove(), e.val(t), '' === t && $.prop('selected', !0)) : g(t) && $ ? e.val('') : r.renderUnknownOption(t);
              }, e.on('change', function () {
                t.$apply(function () {
                  k.parent() && k.remove(), n.$setViewValue(e.val());
                });
              });
            }
            function h(t, e, n) {
              var r;
              n.$render = function () {
                var t = new yt(n.$viewValue);
                o(e.find('option'), function (e) {
                  e.selected = m(t.get(e.value));
                });
              }, t.$watch(function () {
                j(r, n.$viewValue) || (r = N(n.$viewValue), n.$render());
              }), e.on('change', function () {
                t.$apply(function () {
                  var t = [];
                  o(e.find('option'), function (e) {
                    e.selected && t.push(e.value);
                  }), n.$setViewValue(t);
                });
              });
            }
            function p(e, o, a) {
              function u() {
                var t, n, r, i, u, c = { '': [] }, w = [''];
                i = a.$modelValue, u = d(e) || [];
                var k, E, A, O = h ? s(u) : u;
                E = {}, r = !1;
                var T, M;
                if (y)
                  if (v && S(i))
                    for (r = new yt([]), A = 0; A < i.length; A++)
                      E[f] = i[A], r.put(v(e, E), i[A]);
                  else
                    r = new yt(i);
                for (A = 0; k = O.length, A < k; A++) {
                  if (n = A, h) {
                    if (n = O[A], '$' === n.charAt(0))
                      continue;
                    E[h] = n;
                  }
                  E[f] = u[n], t = p(e, E) || '', (n = c[t]) || (n = c[t] = [], w.push(t)), y ? t = m(r.remove(v ? v(e, E) : $(e, E))) : (v ? (t = {}, t[f] = i, t = v(e, t) === v(e, E)) : t = i === $(e, E), r = r || t), T = l(e, E), T = m(T) ? T : '', n.push({
                    id: v ? v(e, E) : h ? O[A] : A,
                    label: T,
                    selected: t
                  });
                }
                for (y || (x || null === i ? c[''].unshift({
                    id: '',
                    label: '',
                    selected: !r
                  }) : r || c[''].unshift({
                    id: '?',
                    label: '',
                    selected: !0
                  })), E = 0, O = w.length; E < O; E++) {
                  for (t = w[E], n = c[t], g.length <= E ? (i = {
                      element: C.clone().attr('label', t),
                      label: n.label
                    }, u = [i], g.push(u), o.append(i.element)) : (u = g[E], i = u[0], i.label != t && i.element.attr('label', i.label = t)), T = null, A = 0, k = n.length; A < k; A++)
                    r = n[A], (t = u[A + 1]) ? (T = t.element, t.label !== r.label && T.text(t.label = r.label), t.id !== r.id && T.val(t.id = r.id), T[0].selected !== r.selected && T.prop('selected', t.selected = r.selected)) : ('' === r.id && x ? M = x : (M = b.clone()).val(r.id).attr('selected', r.selected).text(r.label), u.push({
                      element: M,
                      label: r.label,
                      id: r.id,
                      selected: r.selected
                    }), T ? T.after(M) : i.element.append(M), T = M);
                  for (A++; u.length > A;)
                    u.pop().element.remove();
                }
                for (; g.length > E;)
                  g.pop()[0].element.remove();
              }
              var c;
              if (!(c = w.match(i)))
                throw jr('iexp', w, H(o));
              var l = r(c[2] || c[1]), f = c[4] || c[6], h = c[5], p = r(c[3] || ''), $ = r(c[2] ? c[1] : f), d = r(c[7]), v = c[8] ? r(c[8]) : null, g = [[{
                      element: o,
                      label: ''
                    }]];
              x && (t(x)(e), x.removeClass('ng-scope'), x.remove()), o.html(''), o.on('change', function () {
                e.$apply(function () {
                  var t, r, i, s, u, c, l, p, m = d(e) || [], w = {};
                  if (y) {
                    for (i = [], u = 0, l = g.length; u < l; u++)
                      for (t = g[u], s = 1, c = t.length; s < c; s++)
                        if ((r = t[s].element)[0].selected) {
                          if (r = r.val(), h && (w[h] = r), v)
                            for (p = 0; p < m.length && (w[f] = m[p], v(e, w) != r); p++);
                          else
                            w[f] = m[r];
                          i.push($(e, w));
                        }
                  } else if (r = o.val(), '?' == r)
                    i = n;
                  else if ('' === r)
                    i = null;
                  else if (v) {
                    for (p = 0; p < m.length; p++)
                      if (w[f] = m[p], v(e, w) == r) {
                        i = $(e, w);
                        break;
                      }
                  } else
                    w[f] = m[r], h && (w[h] = r), i = $(e, w);
                  a.$setViewValue(i);
                });
              }), a.$render = u, e.$watch(u);
            }
            if (l[1]) {
              var $, d = l[0], v = l[1], y = c.multiple, w = c.ngOptions, x = !1, b = qe(e.createElement('option')), C = qe(e.createElement('optgroup')), k = b.clone();
              l = 0;
              for (var E = u.children(), A = E.length; l < A; l++)
                if ('' === E[l].value) {
                  $ = x = E.eq(l);
                  break;
                }
              if (d.init(v, x, k), y && (c.required || c.ngRequired)) {
                var O = function (t) {
                  return v.$setValidity('required', !c.required || t && t.length), t;
                };
                v.$parsers.push(O), v.$formatters.unshift(O), c.$observe('required', function () {
                  O(v.$viewValue);
                });
              }
              w ? p(a, u, v) : y ? h(a, u, v) : f(a, u, v, d);
            }
          }
        };
      }
    ], Vr = [
      '$interpolate',
      function (t) {
        var e = {
            addOption: $,
            removeOption: $
          };
        return {
          restrict: 'E',
          priority: 100,
          compile: function (n, r) {
            if (g(r.value)) {
              var i = t(n.text(), !0);
              i || r.$set('value', n.text());
            }
            return function (t, n, r) {
              var o = n.parent(), s = o.data('$selectController') || o.parent().data('$selectController');
              s && s.databound ? n.prop('selected', !1) : s = e, i ? t.$watch(i, function (t, e) {
                r.$set('value', t), t !== e && s.removeOption(e), s.addOption(t);
              }) : s.addOption(r.value), n.on('$destroy', function () {
                s.removeOption(r.value);
              });
            };
          }
        };
      }
    ], qr = v({
      restrict: 'E',
      terminal: !0
    });
  (Ue = t.jQuery) ? (qe = Ue, f(Ue.fn, {
    scope: an.scope,
    isolateScope: an.isolateScope,
    controller: an.controller,
    injector: an.injector,
    inheritedData: an.inheritedData
  }), nt('remove', !0, !0, !1), nt('empty', !1, !1, !1), nt('html', !1, !1, !0)) : qe = rt, Je.element = qe, function (e) {
    f(e, {
      bootstrap: J,
      copy: N,
      extend: f,
      equals: j,
      element: qe,
      forEach: o,
      injector: xt,
      noop: $,
      bind: R,
      toJson: q,
      fromJson: U,
      identity: d,
      isUndefined: g,
      isDefined: m,
      isString: w,
      isFunction: C,
      isObject: y,
      isNumber: x,
      isElement: A,
      isArray: S,
      version: Ke,
      isDate: b,
      lowercase: Fe,
      uppercase: Le,
      callbacks: { counter: 0 },
      $$minErr: r,
      $$csp: D
    }), Ie = tt(t);
    try {
      Ie('ngLocale');
    } catch (t) {
      Ie('ngLocale', []).provider('$locale', Ft);
    }
    Ie('ng', ['ngLocale'], [
      '$provide',
      function (t) {
        t.provider({ $$sanitizeUri: le }), t.provider('$compile', At).directive({
          a: Ln,
          input: Yn,
          textarea: Yn,
          form: Wn,
          script: Pr,
          select: Rr,
          style: qr,
          option: Vr,
          ngBind: lr,
          ngBindHtml: hr,
          ngBindTemplate: fr,
          ngClass: pr,
          ngClassEven: dr,
          ngClassOdd: $r,
          ngCloak: vr,
          ngController: gr,
          ngForm: Jn,
          ngHide: Er,
          ngIf: yr,
          ngInclude: wr,
          ngInit: xr,
          ngNonBindable: br,
          ngPluralize: Sr,
          ngRepeat: Cr,
          ngShow: kr,
          ngStyle: Ar,
          ngSwitch: Or,
          ngSwitchWhen: Tr,
          ngSwitchDefault: Mr,
          ngOptions: Dr,
          ngTransclude: Nr,
          ngModel: ir,
          ngList: ar,
          ngChange: or,
          required: sr,
          ngRequired: sr,
          ngValue: cr
        }).directive(_n).directive(mr), t.provider({
          $anchorScroll: bt,
          $animate: vn,
          $browser: Ct,
          $cacheFactory: kt,
          $controller: Mt,
          $document: Nt,
          $exceptionHandler: Pt,
          $filter: we,
          $interpolate: It,
          $interval: Ht,
          $http: Vt,
          $httpBackend: qt,
          $location: Gt,
          $log: te,
          $parse: se,
          $rootScope: ce,
          $q: ae,
          $sce: $e,
          $sceDelegate: pe,
          $sniffer: de,
          $templateCache: Et,
          $timeout: ve,
          $window: ye
        });
      }
    ]);
  }(Je), qe(e).ready(function () {
    W(e, J);
  });
}(window, document), !angular.$$csp() && angular.element(document).find('head').prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-start{border-spacing:1px 1px;-ms-zoom:1.0001;}.ng-animate-active{border-spacing:0px 0px;-ms-zoom:1;}</style>'), define('angular.min', function () {
});
/*
 angularAMD v<%= cvars.proj_version %>
 (c) 2013-2014 Marcos Lin https://github.com/marcoslin/
 License: MIT
*/
define('angularAMD', [], function () {
  'use strict';
  function e() {
    if (!f)
      throw new Error('angularAMD not initialized.  Need to call angularAMD.bootstrap(app) first.');
  }
  function r() {
    if (p)
      throw new Error('setAlternateAngular can only be called once.');
    p = {}, e(), c.extend(p, c), p.module = function (e, r) {
      if ('undefined' == typeof r)
        return y.hasOwnProperty(e) ? g[e] : c.module(e);
      var n = c.module.apply(null, arguments), o = {
          name: e,
          module: n
        };
      return h.push(o), c.extend(n, s), y[e] = !0, g[e] = n, n;
    }, window.angular = p, require.defined('angular') && (require.undef('angular'), define('angular', [], p));
  }
  function n() {
  }
  function o(e) {
    return function (r, n) {
      return f ? s[e](r, n) : v.push({
        recipe: e,
        name: r,
        constructor: n
      }), this;
    };
  }
  var t, i, a, l, u, c, p, f = !1, d = {}, s = {}, v = [], g = {}, y = {}, h = [];
  return n.prototype.route = function (e) {
    var r;
    if (e.hasOwnProperty('controllerUrl') ? (r = e.controllerUrl, delete e.controllerUrl, 'undefined' == typeof e.controller && (e.controller = [
        '$scope',
        '__AAMDCtrl',
        '$injector',
        function (e, r, n) {
          'undefined' != typeof r && n.invoke(r, this, { $scope: e });
        }
      ])) : 'string' == typeof e.controller && (r = e.controller), r) {
      var n = e.resolve || {};
      n.__AAMDCtrl = [
        '$q',
        '$rootScope',
        function (e, n) {
          var o = e.defer();
          return require([r], function (e) {
            o.resolve(e), n.$apply();
          }), o.promise;
        }
      ], e.resolve = n;
    }
    return e;
  }, n.prototype.appname = function () {
    return e(), t;
  }, n.prototype.processQueue = function () {
    function r(e) {
      l.invoke(e);
    }
    if (e(), 'undefined' == typeof p)
      throw new Error('Alternate angular not set.  Make sure that `enable_ngload` option has been set when calling angularAMD.bootstrap');
    for (var n = 0; n < h.length; n++) {
      var o, t = h[n], i = t.module._invokeQueue;
      for (o = 0; o < i.length; o += 1) {
        var a = i[o], c = a[0], f = a[1], s = a[2];
        if (d.hasOwnProperty(c)) {
          var v;
          v = '$injector' === c && 'invoke' === f ? u : d[c], v[f].apply(null, s);
        } else
          window.console && window.console.error('"' + c + '" not found!!!');
      }
      if (t.module._configBlocks) {
        var y = t.module._configBlocks;
        for (o = 0; o < y.length; o += 1) {
          var m = y[o], _ = m[1], w = m[2];
          u[_].apply(null, w);
        }
      }
    }
    for (; h.length;) {
      var t = h.shift();
      t.module._runBlocks && angular.forEach(t.module._runBlocks, r);
    }
    g = {};
  }, n.prototype.getCachedProvider = function (r) {
    e();
    var n;
    switch (r) {
    case '__orig_angular':
      n = c;
      break;
    case '__alt_angular':
      n = p;
      break;
    case '__orig_app':
      n = i;
      break;
    case '__alt_app':
      n = a;
      break;
    default:
      n = d[r];
    }
    return n;
  }, n.prototype.inject = function () {
    return e(), l.invoke.apply(null, arguments);
  }, n.prototype.config = function () {
    return e(), u.invoke.apply(null, arguments);
  }, n.prototype.reset = function () {
    'undefined' != typeof c && (window.angular = c, require.defined('angular') && (require.undef('angular'), define('angular', [], c)), i = void 0, a = void 0, p = void 0, c = void 0, s = {}, v = [], h = [], t = void 0, l = void 0, u = void 0, d = {}, f = !1);
  }, n.prototype.bootstrap = function (e, n, o) {
    if (f)
      throw Error('bootstrap can only be called once.');
    if ('undefined' == typeof n && (n = !0), c = angular, i = e, a = {}, c.extend(a, i), o = o || document.documentElement, e.config([
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$animateProvider',
        '$provide',
        '$injector',
        function (e, r, n, o, t, i) {
          u = i, d = {
            $controllerProvider: e,
            $compileProvider: r,
            $filterProvider: n,
            $animateProvider: o,
            $provide: t
          }, angular.extend(s, {
            provider: function (e, r) {
              return t.provider(e, r), this;
            },
            controller: function (r, n) {
              return e.register(r, n), this;
            },
            directive: function (e, n) {
              return r.directive(e, n), this;
            },
            filter: function (e, r) {
              return n.register(e, r), this;
            },
            factory: function (e, r) {
              return t.factory(e, r), this;
            },
            service: function (e, r) {
              return t.service(e, r), this;
            },
            constant: function (e, r) {
              return t.constant(e, r), this;
            },
            value: function (e, r) {
              return t.value(e, r), this;
            },
            animation: angular.bind(o, o.register)
          }), angular.extend(a, s);
        }
      ]), e.run([
        '$injector',
        function (e) {
          l = e, d.$injector = l;
        }
      ]), t = e.name, v.length > 0) {
      for (var p = 0; p < v.length; p += 1) {
        var g = v[p];
        i[g.recipe](g.name, g.constructor);
      }
      v = [];
    }
    return i.register = s, c.element(document).ready(function () {
      c.bootstrap(o, [t]), f = !0, n && r();
    }), a;
  }, n.prototype.provider = o('provider'), n.prototype.controller = o('controller'), n.prototype.directive = o('directive'), n.prototype.filter = o('filter'), n.prototype.factory = o('factory'), n.prototype.service = o('service'), n.prototype.constant = o('constant'), n.prototype.value = o('value'), n.prototype.animation = o('animation'), new n();
});
!function (e) {
  e.fn.focusimg = function (i) {
    var a = e.extend({
        auto: !0,
        nav: !0,
        playspeed: 8000,
        fadespeed: 200,
        loop: !0,
        pagination: !0,
        pagecenter: !0,
        prev: '.prev',
        next: '.next'
      }, i);
    return this.each(function () {
      var i = e(this), n = i.children(), t = 0, s = n.length - 1, c = (i.width(), a.prev), o = a.next;
      if (navigator.userAgent.match(/mobile/i) ? (n.css({ opacity: '0' }), n.eq(t).css({ opacity: '1' })) : (n.hide(), n.eq(t).show()), slideFadeIn = function () {
          navigator.userAgent.match(/mobile/i) ? (n.css({
            opacity: '0',
            '-webkit-transition': a.fadespeed / 1000 + 's'
          }), n.eq(t).css({
            opacity: '1',
            '-webkit-transition': a.fadespeed / 1000 + 's'
          })) : (n.fadeOut(a.fadespeed), n.eq(t).fadeIn(a.fadespeed));
        }, slideAdd = function () {
          a.loop ? t == s ? t = 0 : t++ : t == s ? t = s : t++, slideFadeIn();
        }, slideMinus = function () {
          a.loop ? 0 == t ? t = s : t-- : 0 == t ? t = 0 : t--, slideFadeIn();
        }, pagnation = function () {
          for (var a = e('<ul class=\'pagination\'></ul>'), n = '', c = 1; c <= s + 1; c++)
            n += '<li><a href=\'javascript:void(0)\'></a>';
          a.append(n), i.after(a), e('.pagination li a').eq(t).addClass('active');
        }, pageActive = function () {
          e('.pagination li a').removeAttr('class'), e('.pagination li a').eq(t).addClass('active');
        }, a.nav) {
        var d = '<a href=\'javascript:void(0)\' class=' + c.substring(1) + '></a><a href=\'javascript:void(0)\' class=' + o.substring(1) + '></a>';
        i.after(d), e(o).click(function () {
          slideAdd();
        }), e(c).click(function () {
          slideMinus();
        });
      }
      if (a.pagination && (pagnation(), e(c).click(function () {
          pageActive();
        }), e(o).click(function () {
          pageActive();
        }), e('.pagination li').click(function () {
          var i = e(this).index() - 1;
          t = i, slideAdd(), pageActive();
        })), a.pagecenter) {
        var l = e('.pagination').width();
        e('.pagination').css({
          position: 'absolute',
          left: '50%',
          bottom: '5px',
          'margin-left': -l / 2,
          'z-index': '99'
        });
      }
      if (a.auto) {
        var p = setInterval(function () {
            slideAdd(), pageActive();
          }, a.playspeed);
        i.nextAll().hover(function () {
          clearInterval(p);
        }, function () {
          p = setInterval(function () {
            slideAdd(), pageActive();
          }, a.playspeed);
        });
      }
    });
  };
}(jQuery), define('focusimg', function () {
});
!function () {
  var o = 300, n = 200, c = $('.gotop');
  $(window).scroll(function () {
    var o = $(window).scrollTop();
    o > n ? c.fadeIn() : c.fadeOut();
  }), c.click(function () {
    $('html,body').animate({ scrollTop: '0' }, o);
  });
}(), define('goTop', function () {
});
/*! jQuery v3.1.1 | (c) jQuery Foundation | jquery.org/license */
!function (e, t) {
  'use strict';
  'object' == typeof module && 'object' == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
    if (!e.document)
      throw new Error('jQuery requires a window with a document');
    return t(e);
  } : t(e);
}('undefined' != typeof window ? window : this, function (e, t) {
  'use strict';
  function n(e, t) {
    t = t || te;
    var n = t.createElement('script');
    n.text = e, t.head.appendChild(n).parentNode.removeChild(n);
  }
  function r(e) {
    var t = !!e && 'length' in e && e.length, n = he.type(e);
    return 'function' !== n && !he.isWindow(e) && ('array' === n || 0 === t || 'number' == typeof t && t > 0 && t - 1 in e);
  }
  function i(e, t, n) {
    return he.isFunction(t) ? he.grep(e, function (e, r) {
      return !!t.call(e, r, e) !== n;
    }) : t.nodeType ? he.grep(e, function (e) {
      return e === t !== n;
    }) : 'string' != typeof t ? he.grep(e, function (e) {
      return ae.call(t, e) > -1 !== n;
    }) : Ee.test(t) ? he.filter(t, e, n) : (t = he.filter(t, e), he.grep(e, function (e) {
      return ae.call(t, e) > -1 !== n && 1 === e.nodeType;
    }));
  }
  function o(e, t) {
    for (; (e = e[t]) && 1 !== e.nodeType;);
    return e;
  }
  function a(e) {
    var t = {};
    return he.each(e.match(Ae) || [], function (e, n) {
      t[n] = !0;
    }), t;
  }
  function s(e) {
    return e;
  }
  function u(e) {
    throw e;
  }
  function l(e, t, n) {
    var r;
    try {
      e && he.isFunction(r = e.promise) ? r.call(e).done(t).fail(n) : e && he.isFunction(r = e.then) ? r.call(e, t, n) : t.call(void 0, e);
    } catch (e) {
      n.call(void 0, e);
    }
  }
  function c() {
    te.removeEventListener('DOMContentLoaded', c), e.removeEventListener('load', c), he.ready();
  }
  function f() {
    this.expando = he.expando + f.uid++;
  }
  function p(e) {
    return 'true' === e || 'false' !== e && ('null' === e ? null : e === +e + '' ? +e : Re.test(e) ? JSON.parse(e) : e);
  }
  function d(e, t, n) {
    var r;
    if (void 0 === n && 1 === e.nodeType)
      if (r = 'data-' + t.replace(Me, '-$&').toLowerCase(), n = e.getAttribute(r), 'string' == typeof n) {
        try {
          n = p(n);
        } catch (e) {
        }
        Pe.set(e, t, n);
      } else
        n = void 0;
    return n;
  }
  function h(e, t, n, r) {
    var i, o = 1, a = 20, s = r ? function () {
        return r.cur();
      } : function () {
        return he.css(e, t, '');
      }, u = s(), l = n && n[3] || (he.cssNumber[t] ? '' : 'px'), c = (he.cssNumber[t] || 'px' !== l && +u) && We.exec(he.css(e, t));
    if (c && c[3] !== l) {
      l = l || c[3], n = n || [], c = +u || 1;
      do
        o = o || '.5', c /= o, he.style(e, t, c + l);
      while (o !== (o = s() / u) && 1 !== o && --a);
    }
    return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i;
  }
  function g(e) {
    var t, n = e.ownerDocument, r = e.nodeName, i = ze[r];
    return i ? i : (t = n.body.appendChild(n.createElement(r)), i = he.css(t, 'display'), t.parentNode.removeChild(t), 'none' === i && (i = 'block'), ze[r] = i, i);
  }
  function m(e, t) {
    for (var n, r, i = [], o = 0, a = e.length; o < a; o++)
      r = e[o], r.style && (n = r.style.display, t ? ('none' === n && (i[o] = Oe.get(r, 'display') || null, i[o] || (r.style.display = '')), '' === r.style.display && Be(r) && (i[o] = g(r))) : 'none' !== n && (i[o] = 'none', Oe.set(r, 'display', n)));
    for (o = 0; o < a; o++)
      null != i[o] && (e[o].style.display = i[o]);
    return e;
  }
  function v(e, t) {
    var n;
    return n = 'undefined' != typeof e.getElementsByTagName ? e.getElementsByTagName(t || '*') : 'undefined' != typeof e.querySelectorAll ? e.querySelectorAll(t || '*') : [], void 0 === t || t && he.nodeName(e, t) ? he.merge([e], n) : n;
  }
  function y(e, t) {
    for (var n = 0, r = e.length; n < r; n++)
      Oe.set(e[n], 'globalEval', !t || Oe.get(t[n], 'globalEval'));
  }
  function x(e, t, n, r, i) {
    for (var o, a, s, u, l, c, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++)
      if (o = e[d], o || 0 === o)
        if ('object' === he.type(o))
          he.merge(p, o.nodeType ? [o] : o);
        else if (Ye.test(o)) {
          for (a = a || f.appendChild(t.createElement('div')), s = (Ue.exec(o) || [
              '',
              ''
            ])[1].toLowerCase(), u = Ge[s] || Ge._default, a.innerHTML = u[1] + he.htmlPrefilter(o) + u[2], c = u[0]; c--;)
            a = a.lastChild;
          he.merge(p, a.childNodes), a = f.firstChild, a.textContent = '';
        } else
          p.push(t.createTextNode(o));
    for (f.textContent = '', d = 0; o = p[d++];)
      if (r && he.inArray(o, r) > -1)
        i && i.push(o);
      else if (l = he.contains(o.ownerDocument, o), a = v(f.appendChild(o), 'script'), l && y(a), n)
        for (c = 0; o = a[c++];)
          Ve.test(o.type || '') && n.push(o);
    return f;
  }
  function b() {
    return !0;
  }
  function w() {
    return !1;
  }
  function T() {
    try {
      return te.activeElement;
    } catch (e) {
    }
  }
  function C(e, t, n, r, i, o) {
    var a, s;
    if ('object' == typeof t) {
      'string' != typeof n && (r = r || n, n = void 0);
      for (s in t)
        C(e, s, n, r, t[s], o);
      return e;
    }
    if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ('string' == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), i === !1)
      i = w;
    else if (!i)
      return e;
    return 1 === o && (a = i, i = function (e) {
      return he().off(e), a.apply(this, arguments);
    }, i.guid = a.guid || (a.guid = he.guid++)), e.each(function () {
      he.event.add(this, t, i, r, n);
    });
  }
  function E(e, t) {
    return he.nodeName(e, 'table') && he.nodeName(11 !== t.nodeType ? t : t.firstChild, 'tr') ? e.getElementsByTagName('tbody')[0] || e : e;
  }
  function k(e) {
    return e.type = (null !== e.getAttribute('type')) + '/' + e.type, e;
  }
  function N(e) {
    var t = rt.exec(e.type);
    return t ? e.type = t[1] : e.removeAttribute('type'), e;
  }
  function S(e, t) {
    var n, r, i, o, a, s, u, l;
    if (1 === t.nodeType) {
      if (Oe.hasData(e) && (o = Oe.access(e), a = Oe.set(t, o), l = o.events)) {
        delete a.handle, a.events = {};
        for (i in l)
          for (n = 0, r = l[i].length; n < r; n++)
            he.event.add(t, i, l[i][n]);
      }
      Pe.hasData(e) && (s = Pe.access(e), u = he.extend({}, s), Pe.set(t, u));
    }
  }
  function j(e, t) {
    var n = t.nodeName.toLowerCase();
    'input' === n && Xe.test(e.type) ? t.checked = e.checked : 'input' !== n && 'textarea' !== n || (t.defaultValue = e.defaultValue);
  }
  function D(e, t, r, i) {
    t = ie.apply([], t);
    var o, a, s, u, l, c, f = 0, p = e.length, d = p - 1, h = t[0], g = he.isFunction(h);
    if (g || p > 1 && 'string' == typeof h && !pe.checkClone && nt.test(h))
      return e.each(function (n) {
        var o = e.eq(n);
        g && (t[0] = h.call(this, n, o.html())), D(o, t, r, i);
      });
    if (p && (o = x(t, e[0].ownerDocument, !1, e, i), a = o.firstChild, 1 === o.childNodes.length && (o = a), a || i)) {
      for (s = he.map(v(o, 'script'), k), u = s.length; f < p; f++)
        l = o, f !== d && (l = he.clone(l, !0, !0), u && he.merge(s, v(l, 'script'))), r.call(e[f], l, f);
      if (u)
        for (c = s[s.length - 1].ownerDocument, he.map(s, N), f = 0; f < u; f++)
          l = s[f], Ve.test(l.type || '') && !Oe.access(l, 'globalEval') && he.contains(c, l) && (l.src ? he._evalUrl && he._evalUrl(l.src) : n(l.textContent.replace(it, ''), c));
    }
    return e;
  }
  function A(e, t, n) {
    for (var r, i = t ? he.filter(t, e) : e, o = 0; null != (r = i[o]); o++)
      n || 1 !== r.nodeType || he.cleanData(v(r)), r.parentNode && (n && he.contains(r.ownerDocument, r) && y(v(r, 'script')), r.parentNode.removeChild(r));
    return e;
  }
  function q(e, t, n) {
    var r, i, o, a, s = e.style;
    return n = n || st(e), n && (a = n.getPropertyValue(t) || n[t], '' !== a || he.contains(e.ownerDocument, e) || (a = he.style(e, t)), !pe.pixelMarginRight() && at.test(a) && ot.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + '' : a;
  }
  function L(e, t) {
    return {
      get: function () {
        return e() ? void delete this.get : (this.get = t).apply(this, arguments);
      }
    };
  }
  function H(e) {
    if (e in pt)
      return e;
    for (var t = e[0].toUpperCase() + e.slice(1), n = ft.length; n--;)
      if (e = ft[n] + t, e in pt)
        return e;
  }
  function F(e, t, n) {
    var r = We.exec(t);
    return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || 'px') : t;
  }
  function O(e, t, n, r, i) {
    var o, a = 0;
    for (o = n === (r ? 'border' : 'content') ? 4 : 'width' === t ? 1 : 0; o < 4; o += 2)
      'margin' === n && (a += he.css(e, n + $e[o], !0, i)), r ? ('content' === n && (a -= he.css(e, 'padding' + $e[o], !0, i)), 'margin' !== n && (a -= he.css(e, 'border' + $e[o] + 'Width', !0, i))) : (a += he.css(e, 'padding' + $e[o], !0, i), 'padding' !== n && (a += he.css(e, 'border' + $e[o] + 'Width', !0, i)));
    return a;
  }
  function P(e, t, n) {
    var r, i = !0, o = st(e), a = 'border-box' === he.css(e, 'boxSizing', !1, o);
    if (e.getClientRects().length && (r = e.getBoundingClientRect()[t]), r <= 0 || null == r) {
      if (r = q(e, t, o), (r < 0 || null == r) && (r = e.style[t]), at.test(r))
        return r;
      i = a && (pe.boxSizingReliable() || r === e.style[t]), r = parseFloat(r) || 0;
    }
    return r + O(e, t, n || (a ? 'border' : 'content'), i, o) + 'px';
  }
  function R(e, t, n, r, i) {
    return new R.prototype.init(e, t, n, r, i);
  }
  function M() {
    ht && (e.requestAnimationFrame(M), he.fx.tick());
  }
  function I() {
    return e.setTimeout(function () {
      dt = void 0;
    }), dt = he.now();
  }
  function W(e, t) {
    var n, r = 0, i = { height: e };
    for (t = t ? 1 : 0; r < 4; r += 2 - t)
      n = $e[r], i['margin' + n] = i['padding' + n] = e;
    return t && (i.opacity = i.width = e), i;
  }
  function $(e, t, n) {
    for (var r, i = (z.tweeners[t] || []).concat(z.tweeners['*']), o = 0, a = i.length; o < a; o++)
      if (r = i[o].call(n, t, e))
        return r;
  }
  function B(e, t, n) {
    var r, i, o, a, s, u, l, c, f = 'width' in t || 'height' in t, p = this, d = {}, h = e.style, g = e.nodeType && Be(e), v = Oe.get(e, 'fxshow');
    n.queue || (a = he._queueHooks(e, 'fx'), null == a.unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function () {
      a.unqueued || s();
    }), a.unqueued++, p.always(function () {
      p.always(function () {
        a.unqueued--, he.queue(e, 'fx').length || a.empty.fire();
      });
    }));
    for (r in t)
      if (i = t[r], gt.test(i)) {
        if (delete t[r], o = o || 'toggle' === i, i === (g ? 'hide' : 'show')) {
          if ('show' !== i || !v || void 0 === v[r])
            continue;
          g = !0;
        }
        d[r] = v && v[r] || he.style(e, r);
      }
    if (u = !he.isEmptyObject(t), u || !he.isEmptyObject(d)) {
      f && 1 === e.nodeType && (n.overflow = [
        h.overflow,
        h.overflowX,
        h.overflowY
      ], l = v && v.display, null == l && (l = Oe.get(e, 'display')), c = he.css(e, 'display'), 'none' === c && (l ? c = l : (m([e], !0), l = e.style.display || l, c = he.css(e, 'display'), m([e]))), ('inline' === c || 'inline-block' === c && null != l) && 'none' === he.css(e, 'float') && (u || (p.done(function () {
        h.display = l;
      }), null == l && (c = h.display, l = 'none' === c ? '' : c)), h.display = 'inline-block')), n.overflow && (h.overflow = 'hidden', p.always(function () {
        h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2];
      })), u = !1;
      for (r in d)
        u || (v ? 'hidden' in v && (g = v.hidden) : v = Oe.access(e, 'fxshow', { display: l }), o && (v.hidden = !g), g && m([e], !0), p.done(function () {
          g || m([e]), Oe.remove(e, 'fxshow');
          for (r in d)
            he.style(e, r, d[r]);
        })), u = $(g ? v[r] : 0, r, p), r in v || (v[r] = u.start, g && (u.end = u.start, u.start = 0));
    }
  }
  function _(e, t) {
    var n, r, i, o, a;
    for (n in e)
      if (r = he.camelCase(n), i = t[r], o = e[n], he.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = he.cssHooks[r], a && 'expand' in a) {
        o = a.expand(o), delete e[r];
        for (n in o)
          n in e || (e[n] = o[n], t[n] = i);
      } else
        t[r] = i;
  }
  function z(e, t, n) {
    var r, i, o = 0, a = z.prefilters.length, s = he.Deferred().always(function () {
        delete u.elem;
      }), u = function () {
        if (i)
          return !1;
        for (var t = dt || I(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r, a = 0, u = l.tweens.length; a < u; a++)
          l.tweens[a].run(o);
        return s.notifyWith(e, [
          l,
          o,
          n
        ]), o < 1 && u ? n : (s.resolveWith(e, [l]), !1);
      }, l = s.promise({
        elem: e,
        props: he.extend({}, t),
        opts: he.extend(!0, {
          specialEasing: {},
          easing: he.easing._default
        }, n),
        originalProperties: t,
        originalOptions: n,
        startTime: dt || I(),
        duration: n.duration,
        tweens: [],
        createTween: function (t, n) {
          var r = he.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
          return l.tweens.push(r), r;
        },
        stop: function (t) {
          var n = 0, r = t ? l.tweens.length : 0;
          if (i)
            return this;
          for (i = !0; n < r; n++)
            l.tweens[n].run(1);
          return t ? (s.notifyWith(e, [
            l,
            1,
            0
          ]), s.resolveWith(e, [
            l,
            t
          ])) : s.rejectWith(e, [
            l,
            t
          ]), this;
        }
      }), c = l.props;
    for (_(c, l.opts.specialEasing); o < a; o++)
      if (r = z.prefilters[o].call(l, e, c, l.opts))
        return he.isFunction(r.stop) && (he._queueHooks(l.elem, l.opts.queue).stop = he.proxy(r.stop, r)), r;
    return he.map(c, $, l), he.isFunction(l.opts.start) && l.opts.start.call(e, l), he.fx.timer(he.extend(u, {
      elem: e,
      anim: l,
      queue: l.opts.queue
    })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always);
  }
  function X(e) {
    var t = e.match(Ae) || [];
    return t.join(' ');
  }
  function U(e) {
    return e.getAttribute && e.getAttribute('class') || '';
  }
  function V(e, t, n, r) {
    var i;
    if (he.isArray(t))
      he.each(t, function (t, i) {
        n || Nt.test(e) ? r(e, i) : V(e + '[' + ('object' == typeof i && null != i ? t : '') + ']', i, n, r);
      });
    else if (n || 'object' !== he.type(t))
      r(e, t);
    else
      for (i in t)
        V(e + '[' + i + ']', t[i], n, r);
  }
  function G(e) {
    return function (t, n) {
      'string' != typeof t && (n = t, t = '*');
      var r, i = 0, o = t.toLowerCase().match(Ae) || [];
      if (he.isFunction(n))
        for (; r = o[i++];)
          '+' === r[0] ? (r = r.slice(1) || '*', (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n);
    };
  }
  function Y(e, t, n, r) {
    function i(s) {
      var u;
      return o[s] = !0, he.each(e[s] || [], function (e, s) {
        var l = s(t, n, r);
        return 'string' != typeof l || a || o[l] ? a ? !(u = l) : void 0 : (t.dataTypes.unshift(l), i(l), !1);
      }), u;
    }
    var o = {}, a = e === Mt;
    return i(t.dataTypes[0]) || !o['*'] && i('*');
  }
  function Q(e, t) {
    var n, r, i = he.ajaxSettings.flatOptions || {};
    for (n in t)
      void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
    return r && he.extend(!0, e, r), e;
  }
  function J(e, t, n) {
    for (var r, i, o, a, s = e.contents, u = e.dataTypes; '*' === u[0];)
      u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader('Content-Type'));
    if (r)
      for (i in s)
        if (s[i] && s[i].test(r)) {
          u.unshift(i);
          break;
        }
    if (u[0] in n)
      o = u[0];
    else {
      for (i in n) {
        if (!u[0] || e.converters[i + ' ' + u[0]]) {
          o = i;
          break;
        }
        a || (a = i);
      }
      o = o || a;
    }
    if (o)
      return o !== u[0] && u.unshift(o), n[o];
  }
  function K(e, t, n, r) {
    var i, o, a, s, u, l = {}, c = e.dataTypes.slice();
    if (c[1])
      for (a in e.converters)
        l[a.toLowerCase()] = e.converters[a];
    for (o = c.shift(); o;)
      if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())
        if ('*' === o)
          o = u;
        else if ('*' !== u && u !== o) {
          if (a = l[u + ' ' + o] || l['* ' + o], !a)
            for (i in l)
              if (s = i.split(' '), s[1] === o && (a = l[u + ' ' + s[0]] || l['* ' + s[0]])) {
                a === !0 ? a = l[i] : l[i] !== !0 && (o = s[0], c.unshift(s[1]));
                break;
              }
          if (a !== !0)
            if (a && e.throws)
              t = a(t);
            else
              try {
                t = a(t);
              } catch (e) {
                return {
                  state: 'parsererror',
                  error: a ? e : 'No conversion from ' + u + ' to ' + o
                };
              }
        }
    return {
      state: 'success',
      data: t
    };
  }
  function Z(e) {
    return he.isWindow(e) ? e : 9 === e.nodeType && e.defaultView;
  }
  var ee = [], te = e.document, ne = Object.getPrototypeOf, re = ee.slice, ie = ee.concat, oe = ee.push, ae = ee.indexOf, se = {}, ue = se.toString, le = se.hasOwnProperty, ce = le.toString, fe = ce.call(Object), pe = {}, de = '3.1.1', he = function (e, t) {
      return new he.fn.init(e, t);
    }, ge = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, me = /^-ms-/, ve = /-([a-z])/g, ye = function (e, t) {
      return t.toUpperCase();
    };
  he.fn = he.prototype = {
    jquery: de,
    constructor: he,
    length: 0,
    toArray: function () {
      return re.call(this);
    },
    get: function (e) {
      return null == e ? re.call(this) : e < 0 ? this[e + this.length] : this[e];
    },
    pushStack: function (e) {
      var t = he.merge(this.constructor(), e);
      return t.prevObject = this, t;
    },
    each: function (e) {
      return he.each(this, e);
    },
    map: function (e) {
      return this.pushStack(he.map(this, function (t, n) {
        return e.call(t, n, t);
      }));
    },
    slice: function () {
      return this.pushStack(re.apply(this, arguments));
    },
    first: function () {
      return this.eq(0);
    },
    last: function () {
      return this.eq(-1);
    },
    eq: function (e) {
      var t = this.length, n = +e + (e < 0 ? t : 0);
      return this.pushStack(n >= 0 && n < t ? [this[n]] : []);
    },
    end: function () {
      return this.prevObject || this.constructor();
    },
    push: oe,
    sort: ee.sort,
    splice: ee.splice
  }, he.extend = he.fn.extend = function () {
    var e, t, n, r, i, o, a = arguments[0] || {}, s = 1, u = arguments.length, l = !1;
    for ('boolean' == typeof a && (l = a, a = arguments[s] || {}, s++), 'object' == typeof a || he.isFunction(a) || (a = {}), s === u && (a = this, s--); s < u; s++)
      if (null != (e = arguments[s]))
        for (t in e)
          n = a[t], r = e[t], a !== r && (l && r && (he.isPlainObject(r) || (i = he.isArray(r))) ? (i ? (i = !1, o = n && he.isArray(n) ? n : []) : o = n && he.isPlainObject(n) ? n : {}, a[t] = he.extend(l, o, r)) : void 0 !== r && (a[t] = r));
    return a;
  }, he.extend({
    expando: 'jQuery' + (de + Math.random()).replace(/\D/g, ''),
    isReady: !0,
    error: function (e) {
      throw new Error(e);
    },
    noop: function () {
    },
    isFunction: function (e) {
      return 'function' === he.type(e);
    },
    isArray: Array.isArray,
    isWindow: function (e) {
      return null != e && e === e.window;
    },
    isNumeric: function (e) {
      var t = he.type(e);
      return ('number' === t || 'string' === t) && !isNaN(e - parseFloat(e));
    },
    isPlainObject: function (e) {
      var t, n;
      return !(!e || '[object Object]' !== ue.call(e) || (t = ne(e)) && (n = le.call(t, 'constructor') && t.constructor, 'function' != typeof n || ce.call(n) !== fe));
    },
    isEmptyObject: function (e) {
      var t;
      for (t in e)
        return !1;
      return !0;
    },
    type: function (e) {
      return null == e ? e + '' : 'object' == typeof e || 'function' == typeof e ? se[ue.call(e)] || 'object' : typeof e;
    },
    globalEval: function (e) {
      n(e);
    },
    camelCase: function (e) {
      return e.replace(me, 'ms-').replace(ve, ye);
    },
    nodeName: function (e, t) {
      return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
    },
    each: function (e, t) {
      var n, i = 0;
      if (r(e))
        for (n = e.length; i < n && t.call(e[i], i, e[i]) !== !1; i++);
      else
        for (i in e)
          if (t.call(e[i], i, e[i]) === !1)
            break;
      return e;
    },
    trim: function (e) {
      return null == e ? '' : (e + '').replace(ge, '');
    },
    makeArray: function (e, t) {
      var n = t || [];
      return null != e && (r(Object(e)) ? he.merge(n, 'string' == typeof e ? [e] : e) : oe.call(n, e)), n;
    },
    inArray: function (e, t, n) {
      return null == t ? -1 : ae.call(t, e, n);
    },
    merge: function (e, t) {
      for (var n = +t.length, r = 0, i = e.length; r < n; r++)
        e[i++] = t[r];
      return e.length = i, e;
    },
    grep: function (e, t, n) {
      for (var r, i = [], o = 0, a = e.length, s = !n; o < a; o++)
        r = !t(e[o], o), r !== s && i.push(e[o]);
      return i;
    },
    map: function (e, t, n) {
      var i, o, a = 0, s = [];
      if (r(e))
        for (i = e.length; a < i; a++)
          o = t(e[a], a, n), null != o && s.push(o);
      else
        for (a in e)
          o = t(e[a], a, n), null != o && s.push(o);
      return ie.apply([], s);
    },
    guid: 1,
    proxy: function (e, t) {
      var n, r, i;
      if ('string' == typeof t && (n = e[t], t = e, e = n), he.isFunction(e))
        return r = re.call(arguments, 2), i = function () {
          return e.apply(t || this, r.concat(re.call(arguments)));
        }, i.guid = e.guid = e.guid || he.guid++, i;
    },
    now: Date.now,
    support: pe
  }), 'function' == typeof Symbol && (he.fn[Symbol.iterator] = ee[Symbol.iterator]), he.each('Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '), function (e, t) {
    se['[object ' + t + ']'] = t.toLowerCase();
  });
  var xe = function (e) {
      function t(e, t, n, r) {
        var i, o, a, s, u, l, c, p = t && t.ownerDocument, h = t ? t.nodeType : 9;
        if (n = n || [], 'string' != typeof e || !e || 1 !== h && 9 !== h && 11 !== h)
          return n;
        if (!r && ((t ? t.ownerDocument || t : $) !== H && L(t), t = t || H, O)) {
          if (11 !== h && (u = ve.exec(e)))
            if (i = u[1]) {
              if (9 === h) {
                if (!(a = t.getElementById(i)))
                  return n;
                if (a.id === i)
                  return n.push(a), n;
              } else if (p && (a = p.getElementById(i)) && I(t, a) && a.id === i)
                return n.push(a), n;
            } else {
              if (u[2])
                return K.apply(n, t.getElementsByTagName(e)), n;
              if ((i = u[3]) && T.getElementsByClassName && t.getElementsByClassName)
                return K.apply(n, t.getElementsByClassName(i)), n;
            }
          if (T.qsa && !U[e + ' '] && (!P || !P.test(e))) {
            if (1 !== h)
              p = t, c = e;
            else if ('object' !== t.nodeName.toLowerCase()) {
              for ((s = t.getAttribute('id')) ? s = s.replace(we, Te) : t.setAttribute('id', s = W), l = N(e), o = l.length; o--;)
                l[o] = '#' + s + ' ' + d(l[o]);
              c = l.join(','), p = ye.test(e) && f(t.parentNode) || t;
            }
            if (c)
              try {
                return K.apply(n, p.querySelectorAll(c)), n;
              } catch (e) {
              } finally {
                s === W && t.removeAttribute('id');
              }
          }
        }
        return j(e.replace(se, '$1'), t, n, r);
      }
      function n() {
        function e(n, r) {
          return t.push(n + ' ') > C.cacheLength && delete e[t.shift()], e[n + ' '] = r;
        }
        var t = [];
        return e;
      }
      function r(e) {
        return e[W] = !0, e;
      }
      function i(e) {
        var t = H.createElement('fieldset');
        try {
          return !!e(t);
        } catch (e) {
          return !1;
        } finally {
          t.parentNode && t.parentNode.removeChild(t), t = null;
        }
      }
      function o(e, t) {
        for (var n = e.split('|'), r = n.length; r--;)
          C.attrHandle[n[r]] = t;
      }
      function a(e, t) {
        var n = t && e, r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
        if (r)
          return r;
        if (n)
          for (; n = n.nextSibling;)
            if (n === t)
              return -1;
        return e ? 1 : -1;
      }
      function s(e) {
        return function (t) {
          var n = t.nodeName.toLowerCase();
          return 'input' === n && t.type === e;
        };
      }
      function u(e) {
        return function (t) {
          var n = t.nodeName.toLowerCase();
          return ('input' === n || 'button' === n) && t.type === e;
        };
      }
      function l(e) {
        return function (t) {
          return 'form' in t ? t.parentNode && t.disabled === !1 ? 'label' in t ? 'label' in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && Ee(t) === e : t.disabled === e : 'label' in t && t.disabled === e;
        };
      }
      function c(e) {
        return r(function (t) {
          return t = +t, r(function (n, r) {
            for (var i, o = e([], n.length, t), a = o.length; a--;)
              n[i = o[a]] && (n[i] = !(r[i] = n[i]));
          });
        });
      }
      function f(e) {
        return e && 'undefined' != typeof e.getElementsByTagName && e;
      }
      function p() {
      }
      function d(e) {
        for (var t = 0, n = e.length, r = ''; t < n; t++)
          r += e[t].value;
        return r;
      }
      function h(e, t, n) {
        var r = t.dir, i = t.next, o = i || r, a = n && 'parentNode' === o, s = _++;
        return t.first ? function (t, n, i) {
          for (; t = t[r];)
            if (1 === t.nodeType || a)
              return e(t, n, i);
          return !1;
        } : function (t, n, u) {
          var l, c, f, p = [
              B,
              s
            ];
          if (u) {
            for (; t = t[r];)
              if ((1 === t.nodeType || a) && e(t, n, u))
                return !0;
          } else
            for (; t = t[r];)
              if (1 === t.nodeType || a)
                if (f = t[W] || (t[W] = {}), c = f[t.uniqueID] || (f[t.uniqueID] = {}), i && i === t.nodeName.toLowerCase())
                  t = t[r] || t;
                else {
                  if ((l = c[o]) && l[0] === B && l[1] === s)
                    return p[2] = l[2];
                  if (c[o] = p, p[2] = e(t, n, u))
                    return !0;
                }
          return !1;
        };
      }
      function g(e) {
        return e.length > 1 ? function (t, n, r) {
          for (var i = e.length; i--;)
            if (!e[i](t, n, r))
              return !1;
          return !0;
        } : e[0];
      }
      function m(e, n, r) {
        for (var i = 0, o = n.length; i < o; i++)
          t(e, n[i], r);
        return r;
      }
      function v(e, t, n, r, i) {
        for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)
          (o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s)));
        return a;
      }
      function y(e, t, n, i, o, a) {
        return i && !i[W] && (i = y(i)), o && !o[W] && (o = y(o, a)), r(function (r, a, s, u) {
          var l, c, f, p = [], d = [], h = a.length, g = r || m(t || '*', s.nodeType ? [s] : s, []), y = !e || !r && t ? g : v(g, p, e, s, u), x = n ? o || (r ? e : h || i) ? [] : a : y;
          if (n && n(y, x, s, u), i)
            for (l = v(x, d), i(l, [], s, u), c = l.length; c--;)
              (f = l[c]) && (x[d[c]] = !(y[d[c]] = f));
          if (r) {
            if (o || e) {
              if (o) {
                for (l = [], c = x.length; c--;)
                  (f = x[c]) && l.push(y[c] = f);
                o(null, x = [], l, u);
              }
              for (c = x.length; c--;)
                (f = x[c]) && (l = o ? ee(r, f) : p[c]) > -1 && (r[l] = !(a[l] = f));
            }
          } else
            x = v(x === a ? x.splice(h, x.length) : x), o ? o(null, a, x, u) : K.apply(a, x);
        });
      }
      function x(e) {
        for (var t, n, r, i = e.length, o = C.relative[e[0].type], a = o || C.relative[' '], s = o ? 1 : 0, u = h(function (e) {
              return e === t;
            }, a, !0), l = h(function (e) {
              return ee(t, e) > -1;
            }, a, !0), c = [function (e, n, r) {
                var i = !o && (r || n !== D) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r));
                return t = null, i;
              }]; s < i; s++)
          if (n = C.relative[e[s].type])
            c = [h(g(c), n)];
          else {
            if (n = C.filter[e[s].type].apply(null, e[s].matches), n[W]) {
              for (r = ++s; r < i && !C.relative[e[r].type]; r++);
              return y(s > 1 && g(c), s > 1 && d(e.slice(0, s - 1).concat({ value: ' ' === e[s - 2].type ? '*' : '' })).replace(se, '$1'), n, s < r && x(e.slice(s, r)), r < i && x(e = e.slice(r)), r < i && d(e));
            }
            c.push(n);
          }
        return g(c);
      }
      function b(e, n) {
        var i = n.length > 0, o = e.length > 0, a = function (r, a, s, u, l) {
            var c, f, p, d = 0, h = '0', g = r && [], m = [], y = D, x = r || o && C.find.TAG('*', l), b = B += null == y ? 1 : Math.random() || 0.1, w = x.length;
            for (l && (D = a === H || a || l); h !== w && null != (c = x[h]); h++) {
              if (o && c) {
                for (f = 0, a || c.ownerDocument === H || (L(c), s = !O); p = e[f++];)
                  if (p(c, a || H, s)) {
                    u.push(c);
                    break;
                  }
                l && (B = b);
              }
              i && ((c = !p && c) && d--, r && g.push(c));
            }
            if (d += h, i && h !== d) {
              for (f = 0; p = n[f++];)
                p(g, m, a, s);
              if (r) {
                if (d > 0)
                  for (; h--;)
                    g[h] || m[h] || (m[h] = Q.call(u));
                m = v(m);
              }
              K.apply(u, m), l && !r && m.length > 0 && d + n.length > 1 && t.uniqueSort(u);
            }
            return l && (B = b, D = y), g;
          };
        return i ? r(a) : a;
      }
      var w, T, C, E, k, N, S, j, D, A, q, L, H, F, O, P, R, M, I, W = 'sizzle' + 1 * new Date(), $ = e.document, B = 0, _ = 0, z = n(), X = n(), U = n(), V = function (e, t) {
          return e === t && (q = !0), 0;
        }, G = {}.hasOwnProperty, Y = [], Q = Y.pop, J = Y.push, K = Y.push, Z = Y.slice, ee = function (e, t) {
          for (var n = 0, r = e.length; n < r; n++)
            if (e[n] === t)
              return n;
          return -1;
        }, te = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped', ne = '[\\x20\\t\\r\\n\\f]', re = '(?:\\\\.|[\\w-]|[^\0-\\xa0])+', ie = '\\[' + ne + '*(' + re + ')(?:' + ne + '*([*^$|!~]?=)' + ne + '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' + re + '))|)' + ne + '*\\]', oe = ':(' + re + ')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' + ie + ')*)|.*)\\)|)', ae = new RegExp(ne + '+', 'g'), se = new RegExp('^' + ne + '+|((?:^|[^\\\\])(?:\\\\.)*)' + ne + '+$', 'g'), ue = new RegExp('^' + ne + '*,' + ne + '*'), le = new RegExp('^' + ne + '*([>+~]|' + ne + ')' + ne + '*'), ce = new RegExp('=' + ne + '*([^\\]\'"]*?)' + ne + '*\\]', 'g'), fe = new RegExp(oe), pe = new RegExp('^' + re + '$'), de = {
          ID: new RegExp('^#(' + re + ')'),
          CLASS: new RegExp('^\\.(' + re + ')'),
          TAG: new RegExp('^(' + re + '|[*])'),
          ATTR: new RegExp('^' + ie),
          PSEUDO: new RegExp('^' + oe),
          CHILD: new RegExp('^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' + ne + '*(even|odd|(([+-]|)(\\d*)n|)' + ne + '*(?:([+-]|)' + ne + '*(\\d+)|))' + ne + '*\\)|)', 'i'),
          bool: new RegExp('^(?:' + te + ')$', 'i'),
          needsContext: new RegExp('^' + ne + '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + ne + '*((?:-\\d)?\\d*)' + ne + '*\\)|)(?=[^-]|$)', 'i')
        }, he = /^(?:input|select|textarea|button)$/i, ge = /^h\d$/i, me = /^[^{]+\{\s*\[native \w/, ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ye = /[+~]/, xe = new RegExp('\\\\([\\da-f]{1,6}' + ne + '?|(' + ne + ')|.)', 'ig'), be = function (e, t, n) {
          var r = '0x' + t - 65536;
          return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320);
        }, we = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, Te = function (e, t) {
          return t ? '\0' === e ? '\ufffd' : e.slice(0, -1) + '\\' + e.charCodeAt(e.length - 1).toString(16) + ' ' : '\\' + e;
        }, Ce = function () {
          L();
        }, Ee = h(function (e) {
          return e.disabled === !0 && ('form' in e || 'label' in e);
        }, {
          dir: 'parentNode',
          next: 'legend'
        });
      try {
        K.apply(Y = Z.call($.childNodes), $.childNodes), Y[$.childNodes.length].nodeType;
      } catch (e) {
        K = {
          apply: Y.length ? function (e, t) {
            J.apply(e, Z.call(t));
          } : function (e, t) {
            for (var n = e.length, r = 0; e[n++] = t[r++];);
            e.length = n - 1;
          }
        };
      }
      T = t.support = {}, k = t.isXML = function (e) {
        var t = e && (e.ownerDocument || e).documentElement;
        return !!t && 'HTML' !== t.nodeName;
      }, L = t.setDocument = function (e) {
        var t, n, r = e ? e.ownerDocument || e : $;
        return r !== H && 9 === r.nodeType && r.documentElement ? (H = r, F = H.documentElement, O = !k(H), $ !== H && (n = H.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener('unload', Ce, !1) : n.attachEvent && n.attachEvent('onunload', Ce)), T.attributes = i(function (e) {
          return e.className = 'i', !e.getAttribute('className');
        }), T.getElementsByTagName = i(function (e) {
          return e.appendChild(H.createComment('')), !e.getElementsByTagName('*').length;
        }), T.getElementsByClassName = me.test(H.getElementsByClassName), T.getById = i(function (e) {
          return F.appendChild(e).id = W, !H.getElementsByName || !H.getElementsByName(W).length;
        }), T.getById ? (C.filter.ID = function (e) {
          var t = e.replace(xe, be);
          return function (e) {
            return e.getAttribute('id') === t;
          };
        }, C.find.ID = function (e, t) {
          if ('undefined' != typeof t.getElementById && O) {
            var n = t.getElementById(e);
            return n ? [n] : [];
          }
        }) : (C.filter.ID = function (e) {
          var t = e.replace(xe, be);
          return function (e) {
            var n = 'undefined' != typeof e.getAttributeNode && e.getAttributeNode('id');
            return n && n.value === t;
          };
        }, C.find.ID = function (e, t) {
          if ('undefined' != typeof t.getElementById && O) {
            var n, r, i, o = t.getElementById(e);
            if (o) {
              if (n = o.getAttributeNode('id'), n && n.value === e)
                return [o];
              for (i = t.getElementsByName(e), r = 0; o = i[r++];)
                if (n = o.getAttributeNode('id'), n && n.value === e)
                  return [o];
            }
            return [];
          }
        }), C.find.TAG = T.getElementsByTagName ? function (e, t) {
          return 'undefined' != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : T.qsa ? t.querySelectorAll(e) : void 0;
        } : function (e, t) {
          var n, r = [], i = 0, o = t.getElementsByTagName(e);
          if ('*' === e) {
            for (; n = o[i++];)
              1 === n.nodeType && r.push(n);
            return r;
          }
          return o;
        }, C.find.CLASS = T.getElementsByClassName && function (e, t) {
          if ('undefined' != typeof t.getElementsByClassName && O)
            return t.getElementsByClassName(e);
        }, R = [], P = [], (T.qsa = me.test(H.querySelectorAll)) && (i(function (e) {
          F.appendChild(e).innerHTML = '<a id=\'' + W + '\'></a><select id=\'' + W + '-\r\\\' msallowcapture=\'\'><option selected=\'\'></option></select>', e.querySelectorAll('[msallowcapture^=\'\']').length && P.push('[*^$]=' + ne + '*(?:\'\'|"")'), e.querySelectorAll('[selected]').length || P.push('\\[' + ne + '*(?:value|' + te + ')'), e.querySelectorAll('[id~=' + W + '-]').length || P.push('~='), e.querySelectorAll(':checked').length || P.push(':checked'), e.querySelectorAll('a#' + W + '+*').length || P.push('.#.+[+~]');
        }), i(function (e) {
          e.innerHTML = '<a href=\'\' disabled=\'disabled\'></a><select disabled=\'disabled\'><option/></select>';
          var t = H.createElement('input');
          t.setAttribute('type', 'hidden'), e.appendChild(t).setAttribute('name', 'D'), e.querySelectorAll('[name=d]').length && P.push('name' + ne + '*[*^$|!~]?='), 2 !== e.querySelectorAll(':enabled').length && P.push(':enabled', ':disabled'), F.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(':disabled').length && P.push(':enabled', ':disabled'), e.querySelectorAll('*,:x'), P.push(',.*:');
        })), (T.matchesSelector = me.test(M = F.matches || F.webkitMatchesSelector || F.mozMatchesSelector || F.oMatchesSelector || F.msMatchesSelector)) && i(function (e) {
          T.disconnectedMatch = M.call(e, '*'), M.call(e, '[s!=\'\']:x'), R.push('!=', oe);
        }), P = P.length && new RegExp(P.join('|')), R = R.length && new RegExp(R.join('|')), t = me.test(F.compareDocumentPosition), I = t || me.test(F.contains) ? function (e, t) {
          var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
          return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)));
        } : function (e, t) {
          if (t)
            for (; t = t.parentNode;)
              if (t === e)
                return !0;
          return !1;
        }, V = t ? function (e, t) {
          if (e === t)
            return q = !0, 0;
          var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
          return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !T.sortDetached && t.compareDocumentPosition(e) === n ? e === H || e.ownerDocument === $ && I($, e) ? -1 : t === H || t.ownerDocument === $ && I($, t) ? 1 : A ? ee(A, e) - ee(A, t) : 0 : 4 & n ? -1 : 1);
        } : function (e, t) {
          if (e === t)
            return q = !0, 0;
          var n, r = 0, i = e.parentNode, o = t.parentNode, s = [e], u = [t];
          if (!i || !o)
            return e === H ? -1 : t === H ? 1 : i ? -1 : o ? 1 : A ? ee(A, e) - ee(A, t) : 0;
          if (i === o)
            return a(e, t);
          for (n = e; n = n.parentNode;)
            s.unshift(n);
          for (n = t; n = n.parentNode;)
            u.unshift(n);
          for (; s[r] === u[r];)
            r++;
          return r ? a(s[r], u[r]) : s[r] === $ ? -1 : u[r] === $ ? 1 : 0;
        }, H) : H;
      }, t.matches = function (e, n) {
        return t(e, null, null, n);
      }, t.matchesSelector = function (e, n) {
        if ((e.ownerDocument || e) !== H && L(e), n = n.replace(ce, '=\'$1\']'), T.matchesSelector && O && !U[n + ' '] && (!R || !R.test(n)) && (!P || !P.test(n)))
          try {
            var r = M.call(e, n);
            if (r || T.disconnectedMatch || e.document && 11 !== e.document.nodeType)
              return r;
          } catch (e) {
          }
        return t(n, H, null, [e]).length > 0;
      }, t.contains = function (e, t) {
        return (e.ownerDocument || e) !== H && L(e), I(e, t);
      }, t.attr = function (e, t) {
        (e.ownerDocument || e) !== H && L(e);
        var n = C.attrHandle[t.toLowerCase()], r = n && G.call(C.attrHandle, t.toLowerCase()) ? n(e, t, !O) : void 0;
        return void 0 !== r ? r : T.attributes || !O ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
      }, t.escape = function (e) {
        return (e + '').replace(we, Te);
      }, t.error = function (e) {
        throw new Error('Syntax error, unrecognized expression: ' + e);
      }, t.uniqueSort = function (e) {
        var t, n = [], r = 0, i = 0;
        if (q = !T.detectDuplicates, A = !T.sortStable && e.slice(0), e.sort(V), q) {
          for (; t = e[i++];)
            t === e[i] && (r = n.push(i));
          for (; r--;)
            e.splice(n[r], 1);
        }
        return A = null, e;
      }, E = t.getText = function (e) {
        var t, n = '', r = 0, i = e.nodeType;
        if (i) {
          if (1 === i || 9 === i || 11 === i) {
            if ('string' == typeof e.textContent)
              return e.textContent;
            for (e = e.firstChild; e; e = e.nextSibling)
              n += E(e);
          } else if (3 === i || 4 === i)
            return e.nodeValue;
        } else
          for (; t = e[r++];)
            n += E(t);
        return n;
      }, C = t.selectors = {
        cacheLength: 50,
        createPseudo: r,
        match: de,
        attrHandle: {},
        find: {},
        relative: {
          '>': {
            dir: 'parentNode',
            first: !0
          },
          ' ': { dir: 'parentNode' },
          '+': {
            dir: 'previousSibling',
            first: !0
          },
          '~': { dir: 'previousSibling' }
        },
        preFilter: {
          ATTR: function (e) {
            return e[1] = e[1].replace(xe, be), e[3] = (e[3] || e[4] || e[5] || '').replace(xe, be), '~=' === e[2] && (e[3] = ' ' + e[3] + ' '), e.slice(0, 4);
          },
          CHILD: function (e) {
            return e[1] = e[1].toLowerCase(), 'nth' === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ('even' === e[3] || 'odd' === e[3])), e[5] = +(e[7] + e[8] || 'odd' === e[3])) : e[3] && t.error(e[0]), e;
          },
          PSEUDO: function (e) {
            var t, n = !e[6] && e[2];
            return de.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || '' : n && fe.test(n) && (t = N(n, !0)) && (t = n.indexOf(')', n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3));
          }
        },
        filter: {
          TAG: function (e) {
            var t = e.replace(xe, be).toLowerCase();
            return '*' === e ? function () {
              return !0;
            } : function (e) {
              return e.nodeName && e.nodeName.toLowerCase() === t;
            };
          },
          CLASS: function (e) {
            var t = z[e + ' '];
            return t || (t = new RegExp('(^|' + ne + ')' + e + '(' + ne + '|$)')) && z(e, function (e) {
              return t.test('string' == typeof e.className && e.className || 'undefined' != typeof e.getAttribute && e.getAttribute('class') || '');
            });
          },
          ATTR: function (e, n, r) {
            return function (i) {
              var o = t.attr(i, e);
              return null == o ? '!=' === n : !n || (o += '', '=' === n ? o === r : '!=' === n ? o !== r : '^=' === n ? r && 0 === o.indexOf(r) : '*=' === n ? r && o.indexOf(r) > -1 : '$=' === n ? r && o.slice(-r.length) === r : '~=' === n ? (' ' + o.replace(ae, ' ') + ' ').indexOf(r) > -1 : '|=' === n && (o === r || o.slice(0, r.length + 1) === r + '-'));
            };
          },
          CHILD: function (e, t, n, r, i) {
            var o = 'nth' !== e.slice(0, 3), a = 'last' !== e.slice(-4), s = 'of-type' === t;
            return 1 === r && 0 === i ? function (e) {
              return !!e.parentNode;
            } : function (t, n, u) {
              var l, c, f, p, d, h, g = o !== a ? 'nextSibling' : 'previousSibling', m = t.parentNode, v = s && t.nodeName.toLowerCase(), y = !u && !s, x = !1;
              if (m) {
                if (o) {
                  for (; g;) {
                    for (p = t; p = p[g];)
                      if (s ? p.nodeName.toLowerCase() === v : 1 === p.nodeType)
                        return !1;
                    h = g = 'only' === e && !h && 'nextSibling';
                  }
                  return !0;
                }
                if (h = [a ? m.firstChild : m.lastChild], a && y) {
                  for (p = m, f = p[W] || (p[W] = {}), c = f[p.uniqueID] || (f[p.uniqueID] = {}), l = c[e] || [], d = l[0] === B && l[1], x = d && l[2], p = d && m.childNodes[d]; p = ++d && p && p[g] || (x = d = 0) || h.pop();)
                    if (1 === p.nodeType && ++x && p === t) {
                      c[e] = [
                        B,
                        d,
                        x
                      ];
                      break;
                    }
                } else if (y && (p = t, f = p[W] || (p[W] = {}), c = f[p.uniqueID] || (f[p.uniqueID] = {}), l = c[e] || [], d = l[0] === B && l[1], x = d), x === !1)
                  for (; (p = ++d && p && p[g] || (x = d = 0) || h.pop()) && ((s ? p.nodeName.toLowerCase() !== v : 1 !== p.nodeType) || !++x || (y && (f = p[W] || (p[W] = {}), c = f[p.uniqueID] || (f[p.uniqueID] = {}), c[e] = [
                      B,
                      x
                    ]), p !== t)););
                return x -= i, x === r || x % r === 0 && x / r >= 0;
              }
            };
          },
          PSEUDO: function (e, n) {
            var i, o = C.pseudos[e] || C.setFilters[e.toLowerCase()] || t.error('unsupported pseudo: ' + e);
            return o[W] ? o(n) : o.length > 1 ? (i = [
              e,
              e,
              '',
              n
            ], C.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function (e, t) {
              for (var r, i = o(e, n), a = i.length; a--;)
                r = ee(e, i[a]), e[r] = !(t[r] = i[a]);
            }) : function (e) {
              return o(e, 0, i);
            }) : o;
          }
        },
        pseudos: {
          not: r(function (e) {
            var t = [], n = [], i = S(e.replace(se, '$1'));
            return i[W] ? r(function (e, t, n, r) {
              for (var o, a = i(e, null, r, []), s = e.length; s--;)
                (o = a[s]) && (e[s] = !(t[s] = o));
            }) : function (e, r, o) {
              return t[0] = e, i(t, null, o, n), t[0] = null, !n.pop();
            };
          }),
          has: r(function (e) {
            return function (n) {
              return t(e, n).length > 0;
            };
          }),
          contains: r(function (e) {
            return e = e.replace(xe, be), function (t) {
              return (t.textContent || t.innerText || E(t)).indexOf(e) > -1;
            };
          }),
          lang: r(function (e) {
            return pe.test(e || '') || t.error('unsupported lang: ' + e), e = e.replace(xe, be).toLowerCase(), function (t) {
              var n;
              do
                if (n = O ? t.lang : t.getAttribute('xml:lang') || t.getAttribute('lang'))
                  return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + '-');
              while ((t = t.parentNode) && 1 === t.nodeType);
              return !1;
            };
          }),
          target: function (t) {
            var n = e.location && e.location.hash;
            return n && n.slice(1) === t.id;
          },
          root: function (e) {
            return e === F;
          },
          focus: function (e) {
            return e === H.activeElement && (!H.hasFocus || H.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
          },
          enabled: l(!1),
          disabled: l(!0),
          checked: function (e) {
            var t = e.nodeName.toLowerCase();
            return 'input' === t && !!e.checked || 'option' === t && !!e.selected;
          },
          selected: function (e) {
            return e.parentNode && e.parentNode.selectedIndex, e.selected === !0;
          },
          empty: function (e) {
            for (e = e.firstChild; e; e = e.nextSibling)
              if (e.nodeType < 6)
                return !1;
            return !0;
          },
          parent: function (e) {
            return !C.pseudos.empty(e);
          },
          header: function (e) {
            return ge.test(e.nodeName);
          },
          input: function (e) {
            return he.test(e.nodeName);
          },
          button: function (e) {
            var t = e.nodeName.toLowerCase();
            return 'input' === t && 'button' === e.type || 'button' === t;
          },
          text: function (e) {
            var t;
            return 'input' === e.nodeName.toLowerCase() && 'text' === e.type && (null == (t = e.getAttribute('type')) || 'text' === t.toLowerCase());
          },
          first: c(function () {
            return [0];
          }),
          last: c(function (e, t) {
            return [t - 1];
          }),
          eq: c(function (e, t, n) {
            return [n < 0 ? n + t : n];
          }),
          even: c(function (e, t) {
            for (var n = 0; n < t; n += 2)
              e.push(n);
            return e;
          }),
          odd: c(function (e, t) {
            for (var n = 1; n < t; n += 2)
              e.push(n);
            return e;
          }),
          lt: c(function (e, t, n) {
            for (var r = n < 0 ? n + t : n; --r >= 0;)
              e.push(r);
            return e;
          }),
          gt: c(function (e, t, n) {
            for (var r = n < 0 ? n + t : n; ++r < t;)
              e.push(r);
            return e;
          })
        }
      }, C.pseudos.nth = C.pseudos.eq;
      for (w in {
          radio: !0,
          checkbox: !0,
          file: !0,
          password: !0,
          image: !0
        })
        C.pseudos[w] = s(w);
      for (w in {
          submit: !0,
          reset: !0
        })
        C.pseudos[w] = u(w);
      return p.prototype = C.filters = C.pseudos, C.setFilters = new p(), N = t.tokenize = function (e, n) {
        var r, i, o, a, s, u, l, c = X[e + ' '];
        if (c)
          return n ? 0 : c.slice(0);
        for (s = e, u = [], l = C.preFilter; s;) {
          r && !(i = ue.exec(s)) || (i && (s = s.slice(i[0].length) || s), u.push(o = [])), r = !1, (i = le.exec(s)) && (r = i.shift(), o.push({
            value: r,
            type: i[0].replace(se, ' ')
          }), s = s.slice(r.length));
          for (a in C.filter)
            !(i = de[a].exec(s)) || l[a] && !(i = l[a](i)) || (r = i.shift(), o.push({
              value: r,
              type: a,
              matches: i
            }), s = s.slice(r.length));
          if (!r)
            break;
        }
        return n ? s.length : s ? t.error(e) : X(e, u).slice(0);
      }, S = t.compile = function (e, t) {
        var n, r = [], i = [], o = U[e + ' '];
        if (!o) {
          for (t || (t = N(e)), n = t.length; n--;)
            o = x(t[n]), o[W] ? r.push(o) : i.push(o);
          o = U(e, b(i, r)), o.selector = e;
        }
        return o;
      }, j = t.select = function (e, t, n, r) {
        var i, o, a, s, u, l = 'function' == typeof e && e, c = !r && N(e = l.selector || e);
        if (n = n || [], 1 === c.length) {
          if (o = c[0] = c[0].slice(0), o.length > 2 && 'ID' === (a = o[0]).type && 9 === t.nodeType && O && C.relative[o[1].type]) {
            if (t = (C.find.ID(a.matches[0].replace(xe, be), t) || [])[0], !t)
              return n;
            l && (t = t.parentNode), e = e.slice(o.shift().value.length);
          }
          for (i = de.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !C.relative[s = a.type]);)
            if ((u = C.find[s]) && (r = u(a.matches[0].replace(xe, be), ye.test(o[0].type) && f(t.parentNode) || t))) {
              if (o.splice(i, 1), e = r.length && d(o), !e)
                return K.apply(n, r), n;
              break;
            }
        }
        return (l || S(e, c))(r, t, !O, n, !t || ye.test(e) && f(t.parentNode) || t), n;
      }, T.sortStable = W.split('').sort(V).join('') === W, T.detectDuplicates = !!q, L(), T.sortDetached = i(function (e) {
        return 1 & e.compareDocumentPosition(H.createElement('fieldset'));
      }), i(function (e) {
        return e.innerHTML = '<a href=\'#\'></a>', '#' === e.firstChild.getAttribute('href');
      }) || o('type|href|height|width', function (e, t, n) {
        if (!n)
          return e.getAttribute(t, 'type' === t.toLowerCase() ? 1 : 2);
      }), T.attributes && i(function (e) {
        return e.innerHTML = '<input/>', e.firstChild.setAttribute('value', ''), '' === e.firstChild.getAttribute('value');
      }) || o('value', function (e, t, n) {
        if (!n && 'input' === e.nodeName.toLowerCase())
          return e.defaultValue;
      }), i(function (e) {
        return null == e.getAttribute('disabled');
      }) || o(te, function (e, t, n) {
        var r;
        if (!n)
          return e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
      }), t;
    }(e);
  he.find = xe, he.expr = xe.selectors, he.expr[':'] = he.expr.pseudos, he.uniqueSort = he.unique = xe.uniqueSort, he.text = xe.getText, he.isXMLDoc = xe.isXML, he.contains = xe.contains, he.escapeSelector = xe.escape;
  var be = function (e, t, n) {
      for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType;)
        if (1 === e.nodeType) {
          if (i && he(e).is(n))
            break;
          r.push(e);
        }
      return r;
    }, we = function (e, t) {
      for (var n = []; e; e = e.nextSibling)
        1 === e.nodeType && e !== t && n.push(e);
      return n;
    }, Te = he.expr.match.needsContext, Ce = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i, Ee = /^.[^:#\[\.,]*$/;
  he.filter = function (e, t, n) {
    var r = t[0];
    return n && (e = ':not(' + e + ')'), 1 === t.length && 1 === r.nodeType ? he.find.matchesSelector(r, e) ? [r] : [] : he.find.matches(e, he.grep(t, function (e) {
      return 1 === e.nodeType;
    }));
  }, he.fn.extend({
    find: function (e) {
      var t, n, r = this.length, i = this;
      if ('string' != typeof e)
        return this.pushStack(he(e).filter(function () {
          for (t = 0; t < r; t++)
            if (he.contains(i[t], this))
              return !0;
        }));
      for (n = this.pushStack([]), t = 0; t < r; t++)
        he.find(e, i[t], n);
      return r > 1 ? he.uniqueSort(n) : n;
    },
    filter: function (e) {
      return this.pushStack(i(this, e || [], !1));
    },
    not: function (e) {
      return this.pushStack(i(this, e || [], !0));
    },
    is: function (e) {
      return !!i(this, 'string' == typeof e && Te.test(e) ? he(e) : e || [], !1).length;
    }
  });
  var ke, Ne = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, Se = he.fn.init = function (e, t, n) {
      var r, i;
      if (!e)
        return this;
      if (n = n || ke, 'string' == typeof e) {
        if (r = '<' === e[0] && '>' === e[e.length - 1] && e.length >= 3 ? [
            null,
            e,
            null
          ] : Ne.exec(e), !r || !r[1] && t)
          return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
        if (r[1]) {
          if (t = t instanceof he ? t[0] : t, he.merge(this, he.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : te, !0)), Ce.test(r[1]) && he.isPlainObject(t))
            for (r in t)
              he.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
          return this;
        }
        return i = te.getElementById(r[2]), i && (this[0] = i, this.length = 1), this;
      }
      return e.nodeType ? (this[0] = e, this.length = 1, this) : he.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(he) : he.makeArray(e, this);
    };
  Se.prototype = he.fn, ke = he(te);
  var je = /^(?:parents|prev(?:Until|All))/, De = {
      children: !0,
      contents: !0,
      next: !0,
      prev: !0
    };
  he.fn.extend({
    has: function (e) {
      var t = he(e, this), n = t.length;
      return this.filter(function () {
        for (var e = 0; e < n; e++)
          if (he.contains(this, t[e]))
            return !0;
      });
    },
    closest: function (e, t) {
      var n, r = 0, i = this.length, o = [], a = 'string' != typeof e && he(e);
      if (!Te.test(e))
        for (; r < i; r++)
          for (n = this[r]; n && n !== t; n = n.parentNode)
            if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && he.find.matchesSelector(n, e))) {
              o.push(n);
              break;
            }
      return this.pushStack(o.length > 1 ? he.uniqueSort(o) : o);
    },
    index: function (e) {
      return e ? 'string' == typeof e ? ae.call(he(e), this[0]) : ae.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    },
    add: function (e, t) {
      return this.pushStack(he.uniqueSort(he.merge(this.get(), he(e, t))));
    },
    addBack: function (e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
    }
  }), he.each({
    parent: function (e) {
      var t = e.parentNode;
      return t && 11 !== t.nodeType ? t : null;
    },
    parents: function (e) {
      return be(e, 'parentNode');
    },
    parentsUntil: function (e, t, n) {
      return be(e, 'parentNode', n);
    },
    next: function (e) {
      return o(e, 'nextSibling');
    },
    prev: function (e) {
      return o(e, 'previousSibling');
    },
    nextAll: function (e) {
      return be(e, 'nextSibling');
    },
    prevAll: function (e) {
      return be(e, 'previousSibling');
    },
    nextUntil: function (e, t, n) {
      return be(e, 'nextSibling', n);
    },
    prevUntil: function (e, t, n) {
      return be(e, 'previousSibling', n);
    },
    siblings: function (e) {
      return we((e.parentNode || {}).firstChild, e);
    },
    children: function (e) {
      return we(e.firstChild);
    },
    contents: function (e) {
      return e.contentDocument || he.merge([], e.childNodes);
    }
  }, function (e, t) {
    he.fn[e] = function (n, r) {
      var i = he.map(this, t, n);
      return 'Until' !== e.slice(-5) && (r = n), r && 'string' == typeof r && (i = he.filter(r, i)), this.length > 1 && (De[e] || he.uniqueSort(i), je.test(e) && i.reverse()), this.pushStack(i);
    };
  });
  var Ae = /[^\x20\t\r\n\f]+/g;
  he.Callbacks = function (e) {
    e = 'string' == typeof e ? a(e) : he.extend({}, e);
    var t, n, r, i, o = [], s = [], u = -1, l = function () {
        for (i = e.once, r = t = !0; s.length; u = -1)
          for (n = s.shift(); ++u < o.length;)
            o[u].apply(n[0], n[1]) === !1 && e.stopOnFalse && (u = o.length, n = !1);
        e.memory || (n = !1), t = !1, i && (o = n ? [] : '');
      }, c = {
        add: function () {
          return o && (n && !t && (u = o.length - 1, s.push(n)), function t(n) {
            he.each(n, function (n, r) {
              he.isFunction(r) ? e.unique && c.has(r) || o.push(r) : r && r.length && 'string' !== he.type(r) && t(r);
            });
          }(arguments), n && !t && l()), this;
        },
        remove: function () {
          return he.each(arguments, function (e, t) {
            for (var n; (n = he.inArray(t, o, n)) > -1;)
              o.splice(n, 1), n <= u && u--;
          }), this;
        },
        has: function (e) {
          return e ? he.inArray(e, o) > -1 : o.length > 0;
        },
        empty: function () {
          return o && (o = []), this;
        },
        disable: function () {
          return i = s = [], o = n = '', this;
        },
        disabled: function () {
          return !o;
        },
        lock: function () {
          return i = s = [], n || t || (o = n = ''), this;
        },
        locked: function () {
          return !!i;
        },
        fireWith: function (e, n) {
          return i || (n = n || [], n = [
            e,
            n.slice ? n.slice() : n
          ], s.push(n), t || l()), this;
        },
        fire: function () {
          return c.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!r;
        }
      };
    return c;
  }, he.extend({
    Deferred: function (t) {
      var n = [
          [
            'notify',
            'progress',
            he.Callbacks('memory'),
            he.Callbacks('memory'),
            2
          ],
          [
            'resolve',
            'done',
            he.Callbacks('once memory'),
            he.Callbacks('once memory'),
            0,
            'resolved'
          ],
          [
            'reject',
            'fail',
            he.Callbacks('once memory'),
            he.Callbacks('once memory'),
            1,
            'rejected'
          ]
        ], r = 'pending', i = {
          state: function () {
            return r;
          },
          always: function () {
            return o.done(arguments).fail(arguments), this;
          },
          catch: function (e) {
            return i.then(null, e);
          },
          pipe: function () {
            var e = arguments;
            return he.Deferred(function (t) {
              he.each(n, function (n, r) {
                var i = he.isFunction(e[r[4]]) && e[r[4]];
                o[r[1]](function () {
                  var e = i && i.apply(this, arguments);
                  e && he.isFunction(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[r[0] + 'With'](this, i ? [e] : arguments);
                });
              }), e = null;
            }).promise();
          },
          then: function (t, r, i) {
            function o(t, n, r, i) {
              return function () {
                var l = this, c = arguments, f = function () {
                    var e, f;
                    if (!(t < a)) {
                      if (e = r.apply(l, c), e === n.promise())
                        throw new TypeError('Thenable self-resolution');
                      f = e && ('object' == typeof e || 'function' == typeof e) && e.then, he.isFunction(f) ? i ? f.call(e, o(a, n, s, i), o(a, n, u, i)) : (a++, f.call(e, o(a, n, s, i), o(a, n, u, i), o(a, n, s, n.notifyWith))) : (r !== s && (l = void 0, c = [e]), (i || n.resolveWith)(l, c));
                    }
                  }, p = i ? f : function () {
                    try {
                      f();
                    } catch (e) {
                      he.Deferred.exceptionHook && he.Deferred.exceptionHook(e, p.stackTrace), t + 1 >= a && (r !== u && (l = void 0, c = [e]), n.rejectWith(l, c));
                    }
                  };
                t ? p() : (he.Deferred.getStackHook && (p.stackTrace = he.Deferred.getStackHook()), e.setTimeout(p));
              };
            }
            var a = 0;
            return he.Deferred(function (e) {
              n[0][3].add(o(0, e, he.isFunction(i) ? i : s, e.notifyWith)), n[1][3].add(o(0, e, he.isFunction(t) ? t : s)), n[2][3].add(o(0, e, he.isFunction(r) ? r : u));
            }).promise();
          },
          promise: function (e) {
            return null != e ? he.extend(e, i) : i;
          }
        }, o = {};
      return he.each(n, function (e, t) {
        var a = t[2], s = t[5];
        i[t[1]] = a.add, s && a.add(function () {
          r = s;
        }, n[3 - e][2].disable, n[0][2].lock), a.add(t[3].fire), o[t[0]] = function () {
          return o[t[0] + 'With'](this === o ? void 0 : this, arguments), this;
        }, o[t[0] + 'With'] = a.fireWith;
      }), i.promise(o), t && t.call(o, o), o;
    },
    when: function (e) {
      var t = arguments.length, n = t, r = Array(n), i = re.call(arguments), o = he.Deferred(), a = function (e) {
          return function (n) {
            r[e] = this, i[e] = arguments.length > 1 ? re.call(arguments) : n, --t || o.resolveWith(r, i);
          };
        };
      if (t <= 1 && (l(e, o.done(a(n)).resolve, o.reject), 'pending' === o.state() || he.isFunction(i[n] && i[n].then)))
        return o.then();
      for (; n--;)
        l(i[n], a(n), o.reject);
      return o.promise();
    }
  });
  var qe = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
  he.Deferred.exceptionHook = function (t, n) {
    e.console && e.console.warn && t && qe.test(t.name) && e.console.warn('jQuery.Deferred exception: ' + t.message, t.stack, n);
  }, he.readyException = function (t) {
    e.setTimeout(function () {
      throw t;
    });
  };
  var Le = he.Deferred();
  he.fn.ready = function (e) {
    return Le.then(e).catch(function (e) {
      he.readyException(e);
    }), this;
  }, he.extend({
    isReady: !1,
    readyWait: 1,
    holdReady: function (e) {
      e ? he.readyWait++ : he.ready(!0);
    },
    ready: function (e) {
      (e === !0 ? --he.readyWait : he.isReady) || (he.isReady = !0, e !== !0 && --he.readyWait > 0 || Le.resolveWith(te, [he]));
    }
  }), he.ready.then = Le.then, 'complete' === te.readyState || 'loading' !== te.readyState && !te.documentElement.doScroll ? e.setTimeout(he.ready) : (te.addEventListener('DOMContentLoaded', c), e.addEventListener('load', c));
  var He = function (e, t, n, r, i, o, a) {
      var s = 0, u = e.length, l = null == n;
      if ('object' === he.type(n)) {
        i = !0;
        for (s in n)
          He(e, t, s, n[s], !0, o, a);
      } else if (void 0 !== r && (i = !0, he.isFunction(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function (e, t, n) {
          return l.call(he(e), n);
        })), t))
        for (; s < u; s++)
          t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
      return i ? e : l ? t.call(e) : u ? t(e[0], n) : o;
    }, Fe = function (e) {
      return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
    };
  f.uid = 1, f.prototype = {
    cache: function (e) {
      var t = e[this.expando];
      return t || (t = {}, Fe(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
        value: t,
        configurable: !0
      }))), t;
    },
    set: function (e, t, n) {
      var r, i = this.cache(e);
      if ('string' == typeof t)
        i[he.camelCase(t)] = n;
      else
        for (r in t)
          i[he.camelCase(r)] = t[r];
      return i;
    },
    get: function (e, t) {
      return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][he.camelCase(t)];
    },
    access: function (e, t, n) {
      return void 0 === t || t && 'string' == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t);
    },
    remove: function (e, t) {
      var n, r = e[this.expando];
      if (void 0 !== r) {
        if (void 0 !== t) {
          he.isArray(t) ? t = t.map(he.camelCase) : (t = he.camelCase(t), t = t in r ? [t] : t.match(Ae) || []), n = t.length;
          for (; n--;)
            delete r[t[n]];
        }
        (void 0 === t || he.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando]);
      }
    },
    hasData: function (e) {
      var t = e[this.expando];
      return void 0 !== t && !he.isEmptyObject(t);
    }
  };
  var Oe = new f(), Pe = new f(), Re = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, Me = /[A-Z]/g;
  he.extend({
    hasData: function (e) {
      return Pe.hasData(e) || Oe.hasData(e);
    },
    data: function (e, t, n) {
      return Pe.access(e, t, n);
    },
    removeData: function (e, t) {
      Pe.remove(e, t);
    },
    _data: function (e, t, n) {
      return Oe.access(e, t, n);
    },
    _removeData: function (e, t) {
      Oe.remove(e, t);
    }
  }), he.fn.extend({
    data: function (e, t) {
      var n, r, i, o = this[0], a = o && o.attributes;
      if (void 0 === e) {
        if (this.length && (i = Pe.get(o), 1 === o.nodeType && !Oe.get(o, 'hasDataAttrs'))) {
          for (n = a.length; n--;)
            a[n] && (r = a[n].name, 0 === r.indexOf('data-') && (r = he.camelCase(r.slice(5)), d(o, r, i[r])));
          Oe.set(o, 'hasDataAttrs', !0);
        }
        return i;
      }
      return 'object' == typeof e ? this.each(function () {
        Pe.set(this, e);
      }) : He(this, function (t) {
        var n;
        if (o && void 0 === t) {
          if (n = Pe.get(o, e), void 0 !== n)
            return n;
          if (n = d(o, e), void 0 !== n)
            return n;
        } else
          this.each(function () {
            Pe.set(this, e, t);
          });
      }, null, t, arguments.length > 1, null, !0);
    },
    removeData: function (e) {
      return this.each(function () {
        Pe.remove(this, e);
      });
    }
  }), he.extend({
    queue: function (e, t, n) {
      var r;
      if (e)
        return t = (t || 'fx') + 'queue', r = Oe.get(e, t), n && (!r || he.isArray(n) ? r = Oe.access(e, t, he.makeArray(n)) : r.push(n)), r || [];
    },
    dequeue: function (e, t) {
      t = t || 'fx';
      var n = he.queue(e, t), r = n.length, i = n.shift(), o = he._queueHooks(e, t), a = function () {
          he.dequeue(e, t);
        };
      'inprogress' === i && (i = n.shift(), r--), i && ('fx' === t && n.unshift('inprogress'), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire();
    },
    _queueHooks: function (e, t) {
      var n = t + 'queueHooks';
      return Oe.get(e, n) || Oe.access(e, n, {
        empty: he.Callbacks('once memory').add(function () {
          Oe.remove(e, [
            t + 'queue',
            n
          ]);
        })
      });
    }
  }), he.fn.extend({
    queue: function (e, t) {
      var n = 2;
      return 'string' != typeof e && (t = e, e = 'fx', n--), arguments.length < n ? he.queue(this[0], e) : void 0 === t ? this : this.each(function () {
        var n = he.queue(this, e, t);
        he._queueHooks(this, e), 'fx' === e && 'inprogress' !== n[0] && he.dequeue(this, e);
      });
    },
    dequeue: function (e) {
      return this.each(function () {
        he.dequeue(this, e);
      });
    },
    clearQueue: function (e) {
      return this.queue(e || 'fx', []);
    },
    promise: function (e, t) {
      var n, r = 1, i = he.Deferred(), o = this, a = this.length, s = function () {
          --r || i.resolveWith(o, [o]);
        };
      for ('string' != typeof e && (t = e, e = void 0), e = e || 'fx'; a--;)
        n = Oe.get(o[a], e + 'queueHooks'), n && n.empty && (r++, n.empty.add(s));
      return s(), i.promise(t);
    }
  });
  var Ie = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, We = new RegExp('^(?:([+-])=|)(' + Ie + ')([a-z%]*)$', 'i'), $e = [
      'Top',
      'Right',
      'Bottom',
      'Left'
    ], Be = function (e, t) {
      return e = t || e, 'none' === e.style.display || '' === e.style.display && he.contains(e.ownerDocument, e) && 'none' === he.css(e, 'display');
    }, _e = function (e, t, n, r) {
      var i, o, a = {};
      for (o in t)
        a[o] = e.style[o], e.style[o] = t[o];
      i = n.apply(e, r || []);
      for (o in t)
        e.style[o] = a[o];
      return i;
    }, ze = {};
  he.fn.extend({
    show: function () {
      return m(this, !0);
    },
    hide: function () {
      return m(this);
    },
    toggle: function (e) {
      return 'boolean' == typeof e ? e ? this.show() : this.hide() : this.each(function () {
        Be(this) ? he(this).show() : he(this).hide();
      });
    }
  });
  var Xe = /^(?:checkbox|radio)$/i, Ue = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i, Ve = /^$|\/(?:java|ecma)script/i, Ge = {
      option: [
        1,
        '<select multiple=\'multiple\'>',
        '</select>'
      ],
      thead: [
        1,
        '<table>',
        '</table>'
      ],
      col: [
        2,
        '<table><colgroup>',
        '</colgroup></table>'
      ],
      tr: [
        2,
        '<table><tbody>',
        '</tbody></table>'
      ],
      td: [
        3,
        '<table><tbody><tr>',
        '</tr></tbody></table>'
      ],
      _default: [
        0,
        '',
        ''
      ]
    };
  Ge.optgroup = Ge.option, Ge.tbody = Ge.tfoot = Ge.colgroup = Ge.caption = Ge.thead, Ge.th = Ge.td;
  var Ye = /<|&#?\w+;/;
  !function () {
    var e = te.createDocumentFragment(), t = e.appendChild(te.createElement('div')), n = te.createElement('input');
    n.setAttribute('type', 'radio'), n.setAttribute('checked', 'checked'), n.setAttribute('name', 't'), t.appendChild(n), pe.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = '<textarea>x</textarea>', pe.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue;
  }();
  var Qe = te.documentElement, Je = /^key/, Ke = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, Ze = /^([^.]*)(?:\.(.+)|)/;
  he.event = {
    global: {},
    add: function (e, t, n, r, i) {
      var o, a, s, u, l, c, f, p, d, h, g, m = Oe.get(e);
      if (m)
        for (n.handler && (o = n, n = o.handler, i = o.selector), i && he.find.matchesSelector(Qe, i), n.guid || (n.guid = he.guid++), (u = m.events) || (u = m.events = {}), (a = m.handle) || (a = m.handle = function (t) {
            return 'undefined' != typeof he && he.event.triggered !== t.type ? he.event.dispatch.apply(e, arguments) : void 0;
          }), t = (t || '').match(Ae) || [''], l = t.length; l--;)
          s = Ze.exec(t[l]) || [], d = g = s[1], h = (s[2] || '').split('.').sort(), d && (f = he.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = he.event.special[d] || {}, c = he.extend({
            type: d,
            origType: g,
            data: r,
            handler: n,
            guid: n.guid,
            selector: i,
            needsContext: i && he.expr.match.needsContext.test(i),
            namespace: h.join('.')
          }, o), (p = u[d]) || (p = u[d] = [], p.delegateCount = 0, f.setup && f.setup.call(e, r, h, a) !== !1 || e.addEventListener && e.addEventListener(d, a)), f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), he.event.global[d] = !0);
    },
    remove: function (e, t, n, r, i) {
      var o, a, s, u, l, c, f, p, d, h, g, m = Oe.hasData(e) && Oe.get(e);
      if (m && (u = m.events)) {
        for (t = (t || '').match(Ae) || [''], l = t.length; l--;)
          if (s = Ze.exec(t[l]) || [], d = g = s[1], h = (s[2] || '').split('.').sort(), d) {
            for (f = he.event.special[d] || {}, d = (r ? f.delegateType : f.bindType) || d, p = u[d] || [], s = s[2] && new RegExp('(^|\\.)' + h.join('\\.(?:.*\\.|)') + '(\\.|$)'), a = o = p.length; o--;)
              c = p[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ('**' !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
            a && !p.length && (f.teardown && f.teardown.call(e, h, m.handle) !== !1 || he.removeEvent(e, d, m.handle), delete u[d]);
          } else
            for (d in u)
              he.event.remove(e, d + t[l], n, r, !0);
        he.isEmptyObject(u) && Oe.remove(e, 'handle events');
      }
    },
    dispatch: function (e) {
      var t, n, r, i, o, a, s = he.event.fix(e), u = new Array(arguments.length), l = (Oe.get(this, 'events') || {})[s.type] || [], c = he.event.special[s.type] || {};
      for (u[0] = s, t = 1; t < arguments.length; t++)
        u[t] = arguments[t];
      if (s.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, s) !== !1) {
        for (a = he.event.handlers.call(this, s, l), t = 0; (i = a[t++]) && !s.isPropagationStopped();)
          for (s.currentTarget = i.elem, n = 0; (o = i.handlers[n++]) && !s.isImmediatePropagationStopped();)
            s.rnamespace && !s.rnamespace.test(o.namespace) || (s.handleObj = o, s.data = o.data, r = ((he.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, u), void 0 !== r && (s.result = r) === !1 && (s.preventDefault(), s.stopPropagation()));
        return c.postDispatch && c.postDispatch.call(this, s), s.result;
      }
    },
    handlers: function (e, t) {
      var n, r, i, o, a, s = [], u = t.delegateCount, l = e.target;
      if (u && l.nodeType && !('click' === e.type && e.button >= 1))
        for (; l !== this; l = l.parentNode || this)
          if (1 === l.nodeType && ('click' !== e.type || l.disabled !== !0)) {
            for (o = [], a = {}, n = 0; n < u; n++)
              r = t[n], i = r.selector + ' ', void 0 === a[i] && (a[i] = r.needsContext ? he(i, this).index(l) > -1 : he.find(i, this, null, [l]).length), a[i] && o.push(r);
            o.length && s.push({
              elem: l,
              handlers: o
            });
          }
      return l = this, u < t.length && s.push({
        elem: l,
        handlers: t.slice(u)
      }), s;
    },
    addProp: function (e, t) {
      Object.defineProperty(he.Event.prototype, e, {
        enumerable: !0,
        configurable: !0,
        get: he.isFunction(t) ? function () {
          if (this.originalEvent)
            return t(this.originalEvent);
        } : function () {
          if (this.originalEvent)
            return this.originalEvent[e];
        },
        set: function (t) {
          Object.defineProperty(this, e, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: t
          });
        }
      });
    },
    fix: function (e) {
      return e[he.expando] ? e : new he.Event(e);
    },
    special: {
      load: { noBubble: !0 },
      focus: {
        trigger: function () {
          if (this !== T() && this.focus)
            return this.focus(), !1;
        },
        delegateType: 'focusin'
      },
      blur: {
        trigger: function () {
          if (this === T() && this.blur)
            return this.blur(), !1;
        },
        delegateType: 'focusout'
      },
      click: {
        trigger: function () {
          if ('checkbox' === this.type && this.click && he.nodeName(this, 'input'))
            return this.click(), !1;
        },
        _default: function (e) {
          return he.nodeName(e.target, 'a');
        }
      },
      beforeunload: {
        postDispatch: function (e) {
          void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
        }
      }
    }
  }, he.removeEvent = function (e, t, n) {
    e.removeEventListener && e.removeEventListener(t, n);
  }, he.Event = function (e, t) {
    return this instanceof he.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? b : w, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && he.extend(this, t), this.timeStamp = e && e.timeStamp || he.now(), void (this[he.expando] = !0)) : new he.Event(e, t);
  }, he.Event.prototype = {
    constructor: he.Event,
    isDefaultPrevented: w,
    isPropagationStopped: w,
    isImmediatePropagationStopped: w,
    isSimulated: !1,
    preventDefault: function () {
      var e = this.originalEvent;
      this.isDefaultPrevented = b, e && !this.isSimulated && e.preventDefault();
    },
    stopPropagation: function () {
      var e = this.originalEvent;
      this.isPropagationStopped = b, e && !this.isSimulated && e.stopPropagation();
    },
    stopImmediatePropagation: function () {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = b, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation();
    }
  }, he.each({
    altKey: !0,
    bubbles: !0,
    cancelable: !0,
    changedTouches: !0,
    ctrlKey: !0,
    detail: !0,
    eventPhase: !0,
    metaKey: !0,
    pageX: !0,
    pageY: !0,
    shiftKey: !0,
    view: !0,
    char: !0,
    charCode: !0,
    key: !0,
    keyCode: !0,
    button: !0,
    buttons: !0,
    clientX: !0,
    clientY: !0,
    offsetX: !0,
    offsetY: !0,
    pointerId: !0,
    pointerType: !0,
    screenX: !0,
    screenY: !0,
    targetTouches: !0,
    toElement: !0,
    touches: !0,
    which: function (e) {
      var t = e.button;
      return null == e.which && Je.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && Ke.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which;
    }
  }, he.event.addProp), he.each({
    mouseenter: 'mouseover',
    mouseleave: 'mouseout',
    pointerenter: 'pointerover',
    pointerleave: 'pointerout'
  }, function (e, t) {
    he.event.special[e] = {
      delegateType: t,
      bindType: t,
      handle: function (e) {
        var n, r = this, i = e.relatedTarget, o = e.handleObj;
        return i && (i === r || he.contains(r, i)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n;
      }
    };
  }), he.fn.extend({
    on: function (e, t, n, r) {
      return C(this, e, t, n, r);
    },
    one: function (e, t, n, r) {
      return C(this, e, t, n, r, 1);
    },
    off: function (e, t, n) {
      var r, i;
      if (e && e.preventDefault && e.handleObj)
        return r = e.handleObj, he(e.delegateTarget).off(r.namespace ? r.origType + '.' + r.namespace : r.origType, r.selector, r.handler), this;
      if ('object' == typeof e) {
        for (i in e)
          this.off(i, t, e[i]);
        return this;
      }
      return t !== !1 && 'function' != typeof t || (n = t, t = void 0), n === !1 && (n = w), this.each(function () {
        he.event.remove(this, e, n, t);
      });
    }
  });
  var et = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi, tt = /<script|<style|<link/i, nt = /checked\s*(?:[^=]|=\s*.checked.)/i, rt = /^true\/(.*)/, it = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
  he.extend({
    htmlPrefilter: function (e) {
      return e.replace(et, '<$1></$2>');
    },
    clone: function (e, t, n) {
      var r, i, o, a, s = e.cloneNode(!0), u = he.contains(e.ownerDocument, e);
      if (!(pe.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || he.isXMLDoc(e)))
        for (a = v(s), o = v(e), r = 0, i = o.length; r < i; r++)
          j(o[r], a[r]);
      if (t)
        if (n)
          for (o = o || v(e), a = a || v(s), r = 0, i = o.length; r < i; r++)
            S(o[r], a[r]);
        else
          S(e, s);
      return a = v(s, 'script'), a.length > 0 && y(a, !u && v(e, 'script')), s;
    },
    cleanData: function (e) {
      for (var t, n, r, i = he.event.special, o = 0; void 0 !== (n = e[o]); o++)
        if (Fe(n)) {
          if (t = n[Oe.expando]) {
            if (t.events)
              for (r in t.events)
                i[r] ? he.event.remove(n, r) : he.removeEvent(n, r, t.handle);
            n[Oe.expando] = void 0;
          }
          n[Pe.expando] && (n[Pe.expando] = void 0);
        }
    }
  }), he.fn.extend({
    detach: function (e) {
      return A(this, e, !0);
    },
    remove: function (e) {
      return A(this, e);
    },
    text: function (e) {
      return He(this, function (e) {
        return void 0 === e ? he.text(this) : this.empty().each(function () {
          1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e);
        });
      }, null, e, arguments.length);
    },
    append: function () {
      return D(this, arguments, function (e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = E(this, e);
          t.appendChild(e);
        }
      });
    },
    prepend: function () {
      return D(this, arguments, function (e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = E(this, e);
          t.insertBefore(e, t.firstChild);
        }
      });
    },
    before: function () {
      return D(this, arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this);
      });
    },
    after: function () {
      return D(this, arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
      });
    },
    empty: function () {
      for (var e, t = 0; null != (e = this[t]); t++)
        1 === e.nodeType && (he.cleanData(v(e, !1)), e.textContent = '');
      return this;
    },
    clone: function (e, t) {
      return e = null != e && e, t = null == t ? e : t, this.map(function () {
        return he.clone(this, e, t);
      });
    },
    html: function (e) {
      return He(this, function (e) {
        var t = this[0] || {}, n = 0, r = this.length;
        if (void 0 === e && 1 === t.nodeType)
          return t.innerHTML;
        if ('string' == typeof e && !tt.test(e) && !Ge[(Ue.exec(e) || [
            '',
            ''
          ])[1].toLowerCase()]) {
          e = he.htmlPrefilter(e);
          try {
            for (; n < r; n++)
              t = this[n] || {}, 1 === t.nodeType && (he.cleanData(v(t, !1)), t.innerHTML = e);
            t = 0;
          } catch (e) {
          }
        }
        t && this.empty().append(e);
      }, null, e, arguments.length);
    },
    replaceWith: function () {
      var e = [];
      return D(this, arguments, function (t) {
        var n = this.parentNode;
        he.inArray(this, e) < 0 && (he.cleanData(v(this)), n && n.replaceChild(t, this));
      }, e);
    }
  }), he.each({
    appendTo: 'append',
    prependTo: 'prepend',
    insertBefore: 'before',
    insertAfter: 'after',
    replaceAll: 'replaceWith'
  }, function (e, t) {
    he.fn[e] = function (e) {
      for (var n, r = [], i = he(e), o = i.length - 1, a = 0; a <= o; a++)
        n = a === o ? this : this.clone(!0), he(i[a])[t](n), oe.apply(r, n.get());
      return this.pushStack(r);
    };
  });
  var ot = /^margin/, at = new RegExp('^(' + Ie + ')(?!px)[a-z%]+$', 'i'), st = function (t) {
      var n = t.ownerDocument.defaultView;
      return n && n.opener || (n = e), n.getComputedStyle(t);
    };
  !function () {
    function t() {
      if (s) {
        s.style.cssText = 'box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%', s.innerHTML = '', Qe.appendChild(a);
        var t = e.getComputedStyle(s);
        n = '1%' !== t.top, o = '2px' === t.marginLeft, r = '4px' === t.width, s.style.marginRight = '50%', i = '4px' === t.marginRight, Qe.removeChild(a), s = null;
      }
    }
    var n, r, i, o, a = te.createElement('div'), s = te.createElement('div');
    s.style && (s.style.backgroundClip = 'content-box', s.cloneNode(!0).style.backgroundClip = '', pe.clearCloneStyle = 'content-box' === s.style.backgroundClip, a.style.cssText = 'border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute', a.appendChild(s), he.extend(pe, {
      pixelPosition: function () {
        return t(), n;
      },
      boxSizingReliable: function () {
        return t(), r;
      },
      pixelMarginRight: function () {
        return t(), i;
      },
      reliableMarginLeft: function () {
        return t(), o;
      }
    }));
  }();
  var ut = /^(none|table(?!-c[ea]).+)/, lt = {
      position: 'absolute',
      visibility: 'hidden',
      display: 'block'
    }, ct = {
      letterSpacing: '0',
      fontWeight: '400'
    }, ft = [
      'Webkit',
      'Moz',
      'ms'
    ], pt = te.createElement('div').style;
  he.extend({
    cssHooks: {
      opacity: {
        get: function (e, t) {
          if (t) {
            var n = q(e, 'opacity');
            return '' === n ? '1' : n;
          }
        }
      }
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: { float: 'cssFloat' },
    style: function (e, t, n, r) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var i, o, a, s = he.camelCase(t), u = e.style;
        return t = he.cssProps[s] || (he.cssProps[s] = H(s) || s), a = he.cssHooks[t] || he.cssHooks[s], void 0 === n ? a && 'get' in a && void 0 !== (i = a.get(e, !1, r)) ? i : u[t] : (o = typeof n, 'string' === o && (i = We.exec(n)) && i[1] && (n = h(e, t, i), o = 'number'), void (null != n && n === n && ('number' === o && (n += i && i[3] || (he.cssNumber[s] ? '' : 'px')), pe.clearCloneStyle || '' !== n || 0 !== t.indexOf('background') || (u[t] = 'inherit'), a && 'set' in a && void 0 === (n = a.set(e, n, r)) || (u[t] = n))));
      }
    },
    css: function (e, t, n, r) {
      var i, o, a, s = he.camelCase(t);
      return t = he.cssProps[s] || (he.cssProps[s] = H(s) || s), a = he.cssHooks[t] || he.cssHooks[s], a && 'get' in a && (i = a.get(e, !0, n)), void 0 === i && (i = q(e, t, r)), 'normal' === i && t in ct && (i = ct[t]), '' === n || n ? (o = parseFloat(i), n === !0 || isFinite(o) ? o || 0 : i) : i;
    }
  }), he.each([
    'height',
    'width'
  ], function (e, t) {
    he.cssHooks[t] = {
      get: function (e, n, r) {
        if (n)
          return !ut.test(he.css(e, 'display')) || e.getClientRects().length && e.getBoundingClientRect().width ? P(e, t, r) : _e(e, lt, function () {
            return P(e, t, r);
          });
      },
      set: function (e, n, r) {
        var i, o = r && st(e), a = r && O(e, t, r, 'border-box' === he.css(e, 'boxSizing', !1, o), o);
        return a && (i = We.exec(n)) && 'px' !== (i[3] || 'px') && (e.style[t] = n, n = he.css(e, t)), F(e, n, a);
      }
    };
  }), he.cssHooks.marginLeft = L(pe.reliableMarginLeft, function (e, t) {
    if (t)
      return (parseFloat(q(e, 'marginLeft')) || e.getBoundingClientRect().left - _e(e, { marginLeft: 0 }, function () {
        return e.getBoundingClientRect().left;
      })) + 'px';
  }), he.each({
    margin: '',
    padding: '',
    border: 'Width'
  }, function (e, t) {
    he.cssHooks[e + t] = {
      expand: function (n) {
        for (var r = 0, i = {}, o = 'string' == typeof n ? n.split(' ') : [n]; r < 4; r++)
          i[e + $e[r] + t] = o[r] || o[r - 2] || o[0];
        return i;
      }
    }, ot.test(e) || (he.cssHooks[e + t].set = F);
  }), he.fn.extend({
    css: function (e, t) {
      return He(this, function (e, t, n) {
        var r, i, o = {}, a = 0;
        if (he.isArray(t)) {
          for (r = st(e), i = t.length; a < i; a++)
            o[t[a]] = he.css(e, t[a], !1, r);
          return o;
        }
        return void 0 !== n ? he.style(e, t, n) : he.css(e, t);
      }, e, t, arguments.length > 1);
    }
  }), he.Tween = R, R.prototype = {
    constructor: R,
    init: function (e, t, n, r, i, o) {
      this.elem = e, this.prop = n, this.easing = i || he.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (he.cssNumber[n] ? '' : 'px');
    },
    cur: function () {
      var e = R.propHooks[this.prop];
      return e && e.get ? e.get(this) : R.propHooks._default.get(this);
    },
    run: function (e) {
      var t, n = R.propHooks[this.prop];
      return this.options.duration ? this.pos = t = he.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : R.propHooks._default.set(this), this;
    }
  }, R.prototype.init.prototype = R.prototype, R.propHooks = {
    _default: {
      get: function (e) {
        var t;
        return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = he.css(e.elem, e.prop, ''), t && 'auto' !== t ? t : 0);
      },
      set: function (e) {
        he.fx.step[e.prop] ? he.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[he.cssProps[e.prop]] && !he.cssHooks[e.prop] ? e.elem[e.prop] = e.now : he.style(e.elem, e.prop, e.now + e.unit);
      }
    }
  }, R.propHooks.scrollTop = R.propHooks.scrollLeft = {
    set: function (e) {
      e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
    }
  }, he.easing = {
    linear: function (e) {
      return e;
    },
    swing: function (e) {
      return 0.5 - Math.cos(e * Math.PI) / 2;
    },
    _default: 'swing'
  }, he.fx = R.prototype.init, he.fx.step = {};
  var dt, ht, gt = /^(?:toggle|show|hide)$/, mt = /queueHooks$/;
  he.Animation = he.extend(z, {
    tweeners: {
      '*': [function (e, t) {
          var n = this.createTween(e, t);
          return h(n.elem, e, We.exec(t), n), n;
        }]
    },
    tweener: function (e, t) {
      he.isFunction(e) ? (t = e, e = ['*']) : e = e.match(Ae);
      for (var n, r = 0, i = e.length; r < i; r++)
        n = e[r], z.tweeners[n] = z.tweeners[n] || [], z.tweeners[n].unshift(t);
    },
    prefilters: [B],
    prefilter: function (e, t) {
      t ? z.prefilters.unshift(e) : z.prefilters.push(e);
    }
  }), he.speed = function (e, t, n) {
    var r = e && 'object' == typeof e ? he.extend({}, e) : {
        complete: n || !n && t || he.isFunction(e) && e,
        duration: e,
        easing: n && t || t && !he.isFunction(t) && t
      };
    return he.fx.off || te.hidden ? r.duration = 0 : 'number' != typeof r.duration && (r.duration in he.fx.speeds ? r.duration = he.fx.speeds[r.duration] : r.duration = he.fx.speeds._default), null != r.queue && r.queue !== !0 || (r.queue = 'fx'), r.old = r.complete, r.complete = function () {
      he.isFunction(r.old) && r.old.call(this), r.queue && he.dequeue(this, r.queue);
    }, r;
  }, he.fn.extend({
    fadeTo: function (e, t, n, r) {
      return this.filter(Be).css('opacity', 0).show().end().animate({ opacity: t }, e, n, r);
    },
    animate: function (e, t, n, r) {
      var i = he.isEmptyObject(e), o = he.speed(t, n, r), a = function () {
          var t = z(this, he.extend({}, e), o);
          (i || Oe.get(this, 'finish')) && t.stop(!0);
        };
      return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a);
    },
    stop: function (e, t, n) {
      var r = function (e) {
        var t = e.stop;
        delete e.stop, t(n);
      };
      return 'string' != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || 'fx', []), this.each(function () {
        var t = !0, i = null != e && e + 'queueHooks', o = he.timers, a = Oe.get(this);
        if (i)
          a[i] && a[i].stop && r(a[i]);
        else
          for (i in a)
            a[i] && a[i].stop && mt.test(i) && r(a[i]);
        for (i = o.length; i--;)
          o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
        !t && n || he.dequeue(this, e);
      });
    },
    finish: function (e) {
      return e !== !1 && (e = e || 'fx'), this.each(function () {
        var t, n = Oe.get(this), r = n[e + 'queue'], i = n[e + 'queueHooks'], o = he.timers, a = r ? r.length : 0;
        for (n.finish = !0, he.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;)
          o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
        for (t = 0; t < a; t++)
          r[t] && r[t].finish && r[t].finish.call(this);
        delete n.finish;
      });
    }
  }), he.each([
    'toggle',
    'show',
    'hide'
  ], function (e, t) {
    var n = he.fn[t];
    he.fn[t] = function (e, r, i) {
      return null == e || 'boolean' == typeof e ? n.apply(this, arguments) : this.animate(W(t, !0), e, r, i);
    };
  }), he.each({
    slideDown: W('show'),
    slideUp: W('hide'),
    slideToggle: W('toggle'),
    fadeIn: { opacity: 'show' },
    fadeOut: { opacity: 'hide' },
    fadeToggle: { opacity: 'toggle' }
  }, function (e, t) {
    he.fn[e] = function (e, n, r) {
      return this.animate(t, e, n, r);
    };
  }), he.timers = [], he.fx.tick = function () {
    var e, t = 0, n = he.timers;
    for (dt = he.now(); t < n.length; t++)
      e = n[t], e() || n[t] !== e || n.splice(t--, 1);
    n.length || he.fx.stop(), dt = void 0;
  }, he.fx.timer = function (e) {
    he.timers.push(e), e() ? he.fx.start() : he.timers.pop();
  }, he.fx.interval = 13, he.fx.start = function () {
    ht || (ht = e.requestAnimationFrame ? e.requestAnimationFrame(M) : e.setInterval(he.fx.tick, he.fx.interval));
  }, he.fx.stop = function () {
    e.cancelAnimationFrame ? e.cancelAnimationFrame(ht) : e.clearInterval(ht), ht = null;
  }, he.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  }, he.fn.delay = function (t, n) {
    return t = he.fx ? he.fx.speeds[t] || t : t, n = n || 'fx', this.queue(n, function (n, r) {
      var i = e.setTimeout(n, t);
      r.stop = function () {
        e.clearTimeout(i);
      };
    });
  }, function () {
    var e = te.createElement('input'), t = te.createElement('select'), n = t.appendChild(te.createElement('option'));
    e.type = 'checkbox', pe.checkOn = '' !== e.value, pe.optSelected = n.selected, e = te.createElement('input'), e.value = 't', e.type = 'radio', pe.radioValue = 't' === e.value;
  }();
  var vt, yt = he.expr.attrHandle;
  he.fn.extend({
    attr: function (e, t) {
      return He(this, he.attr, e, t, arguments.length > 1);
    },
    removeAttr: function (e) {
      return this.each(function () {
        he.removeAttr(this, e);
      });
    }
  }), he.extend({
    attr: function (e, t, n) {
      var r, i, o = e.nodeType;
      if (3 !== o && 8 !== o && 2 !== o)
        return 'undefined' == typeof e.getAttribute ? he.prop(e, t, n) : (1 === o && he.isXMLDoc(e) || (i = he.attrHooks[t.toLowerCase()] || (he.expr.match.bool.test(t) ? vt : void 0)), void 0 !== n ? null === n ? void he.removeAttr(e, t) : i && 'set' in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ''), n) : i && 'get' in i && null !== (r = i.get(e, t)) ? r : (r = he.find.attr(e, t), null == r ? void 0 : r));
    },
    attrHooks: {
      type: {
        set: function (e, t) {
          if (!pe.radioValue && 'radio' === t && he.nodeName(e, 'input')) {
            var n = e.value;
            return e.setAttribute('type', t), n && (e.value = n), t;
          }
        }
      }
    },
    removeAttr: function (e, t) {
      var n, r = 0, i = t && t.match(Ae);
      if (i && 1 === e.nodeType)
        for (; n = i[r++];)
          e.removeAttribute(n);
    }
  }), vt = {
    set: function (e, t, n) {
      return t === !1 ? he.removeAttr(e, n) : e.setAttribute(n, n), n;
    }
  }, he.each(he.expr.match.bool.source.match(/\w+/g), function (e, t) {
    var n = yt[t] || he.find.attr;
    yt[t] = function (e, t, r) {
      var i, o, a = t.toLowerCase();
      return r || (o = yt[a], yt[a] = i, i = null != n(e, t, r) ? a : null, yt[a] = o), i;
    };
  });
  var xt = /^(?:input|select|textarea|button)$/i, bt = /^(?:a|area)$/i;
  he.fn.extend({
    prop: function (e, t) {
      return He(this, he.prop, e, t, arguments.length > 1);
    },
    removeProp: function (e) {
      return this.each(function () {
        delete this[he.propFix[e] || e];
      });
    }
  }), he.extend({
    prop: function (e, t, n) {
      var r, i, o = e.nodeType;
      if (3 !== o && 8 !== o && 2 !== o)
        return 1 === o && he.isXMLDoc(e) || (t = he.propFix[t] || t, i = he.propHooks[t]), void 0 !== n ? i && 'set' in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && 'get' in i && null !== (r = i.get(e, t)) ? r : e[t];
    },
    propHooks: {
      tabIndex: {
        get: function (e) {
          var t = he.find.attr(e, 'tabindex');
          return t ? parseInt(t, 10) : xt.test(e.nodeName) || bt.test(e.nodeName) && e.href ? 0 : -1;
        }
      }
    },
    propFix: {
      for: 'htmlFor',
      class: 'className'
    }
  }), pe.optSelected || (he.propHooks.selected = {
    get: function (e) {
      var t = e.parentNode;
      return t && t.parentNode && t.parentNode.selectedIndex, null;
    },
    set: function (e) {
      var t = e.parentNode;
      t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
    }
  }), he.each([
    'tabIndex',
    'readOnly',
    'maxLength',
    'cellSpacing',
    'cellPadding',
    'rowSpan',
    'colSpan',
    'useMap',
    'frameBorder',
    'contentEditable'
  ], function () {
    he.propFix[this.toLowerCase()] = this;
  }), he.fn.extend({
    addClass: function (e) {
      var t, n, r, i, o, a, s, u = 0;
      if (he.isFunction(e))
        return this.each(function (t) {
          he(this).addClass(e.call(this, t, U(this)));
        });
      if ('string' == typeof e && e)
        for (t = e.match(Ae) || []; n = this[u++];)
          if (i = U(n), r = 1 === n.nodeType && ' ' + X(i) + ' ') {
            for (a = 0; o = t[a++];)
              r.indexOf(' ' + o + ' ') < 0 && (r += o + ' ');
            s = X(r), i !== s && n.setAttribute('class', s);
          }
      return this;
    },
    removeClass: function (e) {
      var t, n, r, i, o, a, s, u = 0;
      if (he.isFunction(e))
        return this.each(function (t) {
          he(this).removeClass(e.call(this, t, U(this)));
        });
      if (!arguments.length)
        return this.attr('class', '');
      if ('string' == typeof e && e)
        for (t = e.match(Ae) || []; n = this[u++];)
          if (i = U(n), r = 1 === n.nodeType && ' ' + X(i) + ' ') {
            for (a = 0; o = t[a++];)
              for (; r.indexOf(' ' + o + ' ') > -1;)
                r = r.replace(' ' + o + ' ', ' ');
            s = X(r), i !== s && n.setAttribute('class', s);
          }
      return this;
    },
    toggleClass: function (e, t) {
      var n = typeof e;
      return 'boolean' == typeof t && 'string' === n ? t ? this.addClass(e) : this.removeClass(e) : he.isFunction(e) ? this.each(function (n) {
        he(this).toggleClass(e.call(this, n, U(this), t), t);
      }) : this.each(function () {
        var t, r, i, o;
        if ('string' === n)
          for (r = 0, i = he(this), o = e.match(Ae) || []; t = o[r++];)
            i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
        else
          void 0 !== e && 'boolean' !== n || (t = U(this), t && Oe.set(this, '__className__', t), this.setAttribute && this.setAttribute('class', t || e === !1 ? '' : Oe.get(this, '__className__') || ''));
      });
    },
    hasClass: function (e) {
      var t, n, r = 0;
      for (t = ' ' + e + ' '; n = this[r++];)
        if (1 === n.nodeType && (' ' + X(U(n)) + ' ').indexOf(t) > -1)
          return !0;
      return !1;
    }
  });
  var wt = /\r/g;
  he.fn.extend({
    val: function (e) {
      var t, n, r, i = this[0];
      return arguments.length ? (r = he.isFunction(e), this.each(function (n) {
        var i;
        1 === this.nodeType && (i = r ? e.call(this, n, he(this).val()) : e, null == i ? i = '' : 'number' == typeof i ? i += '' : he.isArray(i) && (i = he.map(i, function (e) {
          return null == e ? '' : e + '';
        })), t = he.valHooks[this.type] || he.valHooks[this.nodeName.toLowerCase()], t && 'set' in t && void 0 !== t.set(this, i, 'value') || (this.value = i));
      })) : i ? (t = he.valHooks[i.type] || he.valHooks[i.nodeName.toLowerCase()], t && 'get' in t && void 0 !== (n = t.get(i, 'value')) ? n : (n = i.value, 'string' == typeof n ? n.replace(wt, '') : null == n ? '' : n)) : void 0;
    }
  }), he.extend({
    valHooks: {
      option: {
        get: function (e) {
          var t = he.find.attr(e, 'value');
          return null != t ? t : X(he.text(e));
        }
      },
      select: {
        get: function (e) {
          var t, n, r, i = e.options, o = e.selectedIndex, a = 'select-one' === e.type, s = a ? null : [], u = a ? o + 1 : i.length;
          for (r = o < 0 ? u : a ? o : 0; r < u; r++)
            if (n = i[r], (n.selected || r === o) && !n.disabled && (!n.parentNode.disabled || !he.nodeName(n.parentNode, 'optgroup'))) {
              if (t = he(n).val(), a)
                return t;
              s.push(t);
            }
          return s;
        },
        set: function (e, t) {
          for (var n, r, i = e.options, o = he.makeArray(t), a = i.length; a--;)
            r = i[a], (r.selected = he.inArray(he.valHooks.option.get(r), o) > -1) && (n = !0);
          return n || (e.selectedIndex = -1), o;
        }
      }
    }
  }), he.each([
    'radio',
    'checkbox'
  ], function () {
    he.valHooks[this] = {
      set: function (e, t) {
        if (he.isArray(t))
          return e.checked = he.inArray(he(e).val(), t) > -1;
      }
    }, pe.checkOn || (he.valHooks[this].get = function (e) {
      return null === e.getAttribute('value') ? 'on' : e.value;
    });
  });
  var Tt = /^(?:focusinfocus|focusoutblur)$/;
  he.extend(he.event, {
    trigger: function (t, n, r, i) {
      var o, a, s, u, l, c, f, p = [r || te], d = le.call(t, 'type') ? t.type : t, h = le.call(t, 'namespace') ? t.namespace.split('.') : [];
      if (a = s = r = r || te, 3 !== r.nodeType && 8 !== r.nodeType && !Tt.test(d + he.event.triggered) && (d.indexOf('.') > -1 && (h = d.split('.'), d = h.shift(), h.sort()), l = d.indexOf(':') < 0 && 'on' + d, t = t[he.expando] ? t : new he.Event(d, 'object' == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = h.join('.'), t.rnamespace = t.namespace ? new RegExp('(^|\\.)' + h.join('\\.(?:.*\\.|)') + '(\\.|$)') : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : he.makeArray(n, [t]), f = he.event.special[d] || {}, i || !f.trigger || f.trigger.apply(r, n) !== !1)) {
        if (!i && !f.noBubble && !he.isWindow(r)) {
          for (u = f.delegateType || d, Tt.test(u + d) || (a = a.parentNode); a; a = a.parentNode)
            p.push(a), s = a;
          s === (r.ownerDocument || te) && p.push(s.defaultView || s.parentWindow || e);
        }
        for (o = 0; (a = p[o++]) && !t.isPropagationStopped();)
          t.type = o > 1 ? u : f.bindType || d, c = (Oe.get(a, 'events') || {})[t.type] && Oe.get(a, 'handle'), c && c.apply(a, n), c = l && a[l], c && c.apply && Fe(a) && (t.result = c.apply(a, n), t.result === !1 && t.preventDefault());
        return t.type = d, i || t.isDefaultPrevented() || f._default && f._default.apply(p.pop(), n) !== !1 || !Fe(r) || l && he.isFunction(r[d]) && !he.isWindow(r) && (s = r[l], s && (r[l] = null), he.event.triggered = d, r[d](), he.event.triggered = void 0, s && (r[l] = s)), t.result;
      }
    },
    simulate: function (e, t, n) {
      var r = he.extend(new he.Event(), n, {
          type: e,
          isSimulated: !0
        });
      he.event.trigger(r, null, t);
    }
  }), he.fn.extend({
    trigger: function (e, t) {
      return this.each(function () {
        he.event.trigger(e, t, this);
      });
    },
    triggerHandler: function (e, t) {
      var n = this[0];
      if (n)
        return he.event.trigger(e, t, n, !0);
    }
  }), he.each('blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu'.split(' '), function (e, t) {
    he.fn[t] = function (e, n) {
      return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
    };
  }), he.fn.extend({
    hover: function (e, t) {
      return this.mouseenter(e).mouseleave(t || e);
    }
  }), pe.focusin = 'onfocusin' in e, pe.focusin || he.each({
    focus: 'focusin',
    blur: 'focusout'
  }, function (e, t) {
    var n = function (e) {
      he.event.simulate(t, e.target, he.event.fix(e));
    };
    he.event.special[t] = {
      setup: function () {
        var r = this.ownerDocument || this, i = Oe.access(r, t);
        i || r.addEventListener(e, n, !0), Oe.access(r, t, (i || 0) + 1);
      },
      teardown: function () {
        var r = this.ownerDocument || this, i = Oe.access(r, t) - 1;
        i ? Oe.access(r, t, i) : (r.removeEventListener(e, n, !0), Oe.remove(r, t));
      }
    };
  });
  var Ct = e.location, Et = he.now(), kt = /\?/;
  he.parseXML = function (t) {
    var n;
    if (!t || 'string' != typeof t)
      return null;
    try {
      n = new e.DOMParser().parseFromString(t, 'text/xml');
    } catch (e) {
      n = void 0;
    }
    return n && !n.getElementsByTagName('parsererror').length || he.error('Invalid XML: ' + t), n;
  };
  var Nt = /\[\]$/, St = /\r?\n/g, jt = /^(?:submit|button|image|reset|file)$/i, Dt = /^(?:input|select|textarea|keygen)/i;
  he.param = function (e, t) {
    var n, r = [], i = function (e, t) {
        var n = he.isFunction(t) ? t() : t;
        r[r.length] = encodeURIComponent(e) + '=' + encodeURIComponent(null == n ? '' : n);
      };
    if (he.isArray(e) || e.jquery && !he.isPlainObject(e))
      he.each(e, function () {
        i(this.name, this.value);
      });
    else
      for (n in e)
        V(n, e[n], t, i);
    return r.join('&');
  }, he.fn.extend({
    serialize: function () {
      return he.param(this.serializeArray());
    },
    serializeArray: function () {
      return this.map(function () {
        var e = he.prop(this, 'elements');
        return e ? he.makeArray(e) : this;
      }).filter(function () {
        var e = this.type;
        return this.name && !he(this).is(':disabled') && Dt.test(this.nodeName) && !jt.test(e) && (this.checked || !Xe.test(e));
      }).map(function (e, t) {
        var n = he(this).val();
        return null == n ? null : he.isArray(n) ? he.map(n, function (e) {
          return {
            name: t.name,
            value: e.replace(St, '\r\n')
          };
        }) : {
          name: t.name,
          value: n.replace(St, '\r\n')
        };
      }).get();
    }
  });
  var At = /%20/g, qt = /#.*$/, Lt = /([?&])_=[^&]*/, Ht = /^(.*?):[ \t]*([^\r\n]*)$/gm, Ft = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Ot = /^(?:GET|HEAD)$/, Pt = /^\/\//, Rt = {}, Mt = {}, It = '*/'.concat('*'), Wt = te.createElement('a');
  Wt.href = Ct.href, he.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: Ct.href,
      type: 'GET',
      isLocal: Ft.test(Ct.protocol),
      global: !0,
      processData: !0,
      async: !0,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      accepts: {
        '*': It,
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript'
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: 'responseXML',
        text: 'responseText',
        json: 'responseJSON'
      },
      converters: {
        '* text': String,
        'text html': !0,
        'text json': JSON.parse,
        'text xml': he.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function (e, t) {
      return t ? Q(Q(e, he.ajaxSettings), t) : Q(he.ajaxSettings, e);
    },
    ajaxPrefilter: G(Rt),
    ajaxTransport: G(Mt),
    ajax: function (t, n) {
      function r(t, n, r, s) {
        var l, p, d, b, w, T = n;
        c || (c = !0, u && e.clearTimeout(u), i = void 0, a = s || '', C.readyState = t > 0 ? 4 : 0, l = t >= 200 && t < 300 || 304 === t, r && (b = J(h, C, r)), b = K(h, b, C, l), l ? (h.ifModified && (w = C.getResponseHeader('Last-Modified'), w && (he.lastModified[o] = w), w = C.getResponseHeader('etag'), w && (he.etag[o] = w)), 204 === t || 'HEAD' === h.type ? T = 'nocontent' : 304 === t ? T = 'notmodified' : (T = b.state, p = b.data, d = b.error, l = !d)) : (d = T, !t && T || (T = 'error', t < 0 && (t = 0))), C.status = t, C.statusText = (n || T) + '', l ? v.resolveWith(g, [
          p,
          T,
          C
        ]) : v.rejectWith(g, [
          C,
          T,
          d
        ]), C.statusCode(x), x = void 0, f && m.trigger(l ? 'ajaxSuccess' : 'ajaxError', [
          C,
          h,
          l ? p : d
        ]), y.fireWith(g, [
          C,
          T
        ]), f && (m.trigger('ajaxComplete', [
          C,
          h
        ]), --he.active || he.event.trigger('ajaxStop')));
      }
      'object' == typeof t && (n = t, t = void 0), n = n || {};
      var i, o, a, s, u, l, c, f, p, d, h = he.ajaxSetup({}, n), g = h.context || h, m = h.context && (g.nodeType || g.jquery) ? he(g) : he.event, v = he.Deferred(), y = he.Callbacks('once memory'), x = h.statusCode || {}, b = {}, w = {}, T = 'canceled', C = {
          readyState: 0,
          getResponseHeader: function (e) {
            var t;
            if (c) {
              if (!s)
                for (s = {}; t = Ht.exec(a);)
                  s[t[1].toLowerCase()] = t[2];
              t = s[e.toLowerCase()];
            }
            return null == t ? null : t;
          },
          getAllResponseHeaders: function () {
            return c ? a : null;
          },
          setRequestHeader: function (e, t) {
            return null == c && (e = w[e.toLowerCase()] = w[e.toLowerCase()] || e, b[e] = t), this;
          },
          overrideMimeType: function (e) {
            return null == c && (h.mimeType = e), this;
          },
          statusCode: function (e) {
            var t;
            if (e)
              if (c)
                C.always(e[C.status]);
              else
                for (t in e)
                  x[t] = [
                    x[t],
                    e[t]
                  ];
            return this;
          },
          abort: function (e) {
            var t = e || T;
            return i && i.abort(t), r(0, t), this;
          }
        };
      if (v.promise(C), h.url = ((t || h.url || Ct.href) + '').replace(Pt, Ct.protocol + '//'), h.type = n.method || n.type || h.method || h.type, h.dataTypes = (h.dataType || '*').toLowerCase().match(Ae) || [''], null == h.crossDomain) {
        l = te.createElement('a');
        try {
          l.href = h.url, l.href = l.href, h.crossDomain = Wt.protocol + '//' + Wt.host != l.protocol + '//' + l.host;
        } catch (e) {
          h.crossDomain = !0;
        }
      }
      if (h.data && h.processData && 'string' != typeof h.data && (h.data = he.param(h.data, h.traditional)), Y(Rt, h, n, C), c)
        return C;
      f = he.event && h.global, f && 0 === he.active++ && he.event.trigger('ajaxStart'), h.type = h.type.toUpperCase(), h.hasContent = !Ot.test(h.type), o = h.url.replace(qt, ''), h.hasContent ? h.data && h.processData && 0 === (h.contentType || '').indexOf('application/x-www-form-urlencoded') && (h.data = h.data.replace(At, '+')) : (d = h.url.slice(o.length), h.data && (o += (kt.test(o) ? '&' : '?') + h.data, delete h.data), h.cache === !1 && (o = o.replace(Lt, '$1'), d = (kt.test(o) ? '&' : '?') + '_=' + Et++ + d), h.url = o + d), h.ifModified && (he.lastModified[o] && C.setRequestHeader('If-Modified-Since', he.lastModified[o]), he.etag[o] && C.setRequestHeader('If-None-Match', he.etag[o])), (h.data && h.hasContent && h.contentType !== !1 || n.contentType) && C.setRequestHeader('Content-Type', h.contentType), C.setRequestHeader('Accept', h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ('*' !== h.dataTypes[0] ? ', ' + It + '; q=0.01' : '') : h.accepts['*']);
      for (p in h.headers)
        C.setRequestHeader(p, h.headers[p]);
      if (h.beforeSend && (h.beforeSend.call(g, C, h) === !1 || c))
        return C.abort();
      if (T = 'abort', y.add(h.complete), C.done(h.success), C.fail(h.error), i = Y(Mt, h, n, C)) {
        if (C.readyState = 1, f && m.trigger('ajaxSend', [
            C,
            h
          ]), c)
          return C;
        h.async && h.timeout > 0 && (u = e.setTimeout(function () {
          C.abort('timeout');
        }, h.timeout));
        try {
          c = !1, i.send(b, r);
        } catch (e) {
          if (c)
            throw e;
          r(-1, e);
        }
      } else
        r(-1, 'No Transport');
      return C;
    },
    getJSON: function (e, t, n) {
      return he.get(e, t, n, 'json');
    },
    getScript: function (e, t) {
      return he.get(e, void 0, t, 'script');
    }
  }), he.each([
    'get',
    'post'
  ], function (e, t) {
    he[t] = function (e, n, r, i) {
      return he.isFunction(n) && (i = i || r, r = n, n = void 0), he.ajax(he.extend({
        url: e,
        type: t,
        dataType: i,
        data: n,
        success: r
      }, he.isPlainObject(e) && e));
    };
  }), he._evalUrl = function (e) {
    return he.ajax({
      url: e,
      type: 'GET',
      dataType: 'script',
      cache: !0,
      async: !1,
      global: !1,
      throws: !0
    });
  }, he.fn.extend({
    wrapAll: function (e) {
      var t;
      return this[0] && (he.isFunction(e) && (e = e.call(this[0])), t = he(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
        for (var e = this; e.firstElementChild;)
          e = e.firstElementChild;
        return e;
      }).append(this)), this;
    },
    wrapInner: function (e) {
      return he.isFunction(e) ? this.each(function (t) {
        he(this).wrapInner(e.call(this, t));
      }) : this.each(function () {
        var t = he(this), n = t.contents();
        n.length ? n.wrapAll(e) : t.append(e);
      });
    },
    wrap: function (e) {
      var t = he.isFunction(e);
      return this.each(function (n) {
        he(this).wrapAll(t ? e.call(this, n) : e);
      });
    },
    unwrap: function (e) {
      return this.parent(e).not('body').each(function () {
        he(this).replaceWith(this.childNodes);
      }), this;
    }
  }), he.expr.pseudos.hidden = function (e) {
    return !he.expr.pseudos.visible(e);
  }, he.expr.pseudos.visible = function (e) {
    return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
  }, he.ajaxSettings.xhr = function () {
    try {
      return new e.XMLHttpRequest();
    } catch (e) {
    }
  };
  var $t = {
      0: 200,
      1223: 204
    }, Bt = he.ajaxSettings.xhr();
  pe.cors = !!Bt && 'withCredentials' in Bt, pe.ajax = Bt = !!Bt, he.ajaxTransport(function (t) {
    var n, r;
    if (pe.cors || Bt && !t.crossDomain)
      return {
        send: function (i, o) {
          var a, s = t.xhr();
          if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
            for (a in t.xhrFields)
              s[a] = t.xhrFields[a];
          t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || i['X-Requested-With'] || (i['X-Requested-With'] = 'XMLHttpRequest');
          for (a in i)
            s.setRequestHeader(a, i[a]);
          n = function (e) {
            return function () {
              n && (n = r = s.onload = s.onerror = s.onabort = s.onreadystatechange = null, 'abort' === e ? s.abort() : 'error' === e ? 'number' != typeof s.status ? o(0, 'error') : o(s.status, s.statusText) : o($t[s.status] || s.status, s.statusText, 'text' !== (s.responseType || 'text') || 'string' != typeof s.responseText ? { binary: s.response } : { text: s.responseText }, s.getAllResponseHeaders()));
            };
          }, s.onload = n(), r = s.onerror = n('error'), void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function () {
            4 === s.readyState && e.setTimeout(function () {
              n && r();
            });
          }, n = n('abort');
          try {
            s.send(t.hasContent && t.data || null);
          } catch (e) {
            if (n)
              throw e;
          }
        },
        abort: function () {
          n && n();
        }
      };
  }), he.ajaxPrefilter(function (e) {
    e.crossDomain && (e.contents.script = !1);
  }), he.ajaxSetup({
    accepts: { script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript' },
    contents: { script: /\b(?:java|ecma)script\b/ },
    converters: {
      'text script': function (e) {
        return he.globalEval(e), e;
      }
    }
  }), he.ajaxPrefilter('script', function (e) {
    void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = 'GET');
  }), he.ajaxTransport('script', function (e) {
    if (e.crossDomain) {
      var t, n;
      return {
        send: function (r, i) {
          t = he('<script>').prop({
            charset: e.scriptCharset,
            src: e.url
          }).on('load error', n = function (e) {
            t.remove(), n = null, e && i('error' === e.type ? 404 : 200, e.type);
          }), te.head.appendChild(t[0]);
        },
        abort: function () {
          n && n();
        }
      };
    }
  });
  var _t = [], zt = /(=)\?(?=&|$)|\?\?/;
  he.ajaxSetup({
    jsonp: 'callback',
    jsonpCallback: function () {
      var e = _t.pop() || he.expando + '_' + Et++;
      return this[e] = !0, e;
    }
  }), he.ajaxPrefilter('json jsonp', function (t, n, r) {
    var i, o, a, s = t.jsonp !== !1 && (zt.test(t.url) ? 'url' : 'string' == typeof t.data && 0 === (t.contentType || '').indexOf('application/x-www-form-urlencoded') && zt.test(t.data) && 'data');
    if (s || 'jsonp' === t.dataTypes[0])
      return i = t.jsonpCallback = he.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(zt, '$1' + i) : t.jsonp !== !1 && (t.url += (kt.test(t.url) ? '&' : '?') + t.jsonp + '=' + i), t.converters['script json'] = function () {
        return a || he.error(i + ' was not called'), a[0];
      }, t.dataTypes[0] = 'json', o = e[i], e[i] = function () {
        a = arguments;
      }, r.always(function () {
        void 0 === o ? he(e).removeProp(i) : e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, _t.push(i)), a && he.isFunction(o) && o(a[0]), a = o = void 0;
      }), 'script';
  }), pe.createHTMLDocument = function () {
    var e = te.implementation.createHTMLDocument('').body;
    return e.innerHTML = '<form></form><form></form>', 2 === e.childNodes.length;
  }(), he.parseHTML = function (e, t, n) {
    if ('string' != typeof e)
      return [];
    'boolean' == typeof t && (n = t, t = !1);
    var r, i, o;
    return t || (pe.createHTMLDocument ? (t = te.implementation.createHTMLDocument(''), r = t.createElement('base'), r.href = te.location.href, t.head.appendChild(r)) : t = te), i = Ce.exec(e), o = !n && [], i ? [t.createElement(i[1])] : (i = x([e], t, o), o && o.length && he(o).remove(), he.merge([], i.childNodes));
  }, he.fn.load = function (e, t, n) {
    var r, i, o, a = this, s = e.indexOf(' ');
    return s > -1 && (r = X(e.slice(s)), e = e.slice(0, s)), he.isFunction(t) ? (n = t, t = void 0) : t && 'object' == typeof t && (i = 'POST'), a.length > 0 && he.ajax({
      url: e,
      type: i || 'GET',
      dataType: 'html',
      data: t
    }).done(function (e) {
      o = arguments, a.html(r ? he('<div>').append(he.parseHTML(e)).find(r) : e);
    }).always(n && function (e, t) {
      a.each(function () {
        n.apply(this, o || [
          e.responseText,
          t,
          e
        ]);
      });
    }), this;
  }, he.each([
    'ajaxStart',
    'ajaxStop',
    'ajaxComplete',
    'ajaxError',
    'ajaxSuccess',
    'ajaxSend'
  ], function (e, t) {
    he.fn[t] = function (e) {
      return this.on(t, e);
    };
  }), he.expr.pseudos.animated = function (e) {
    return he.grep(he.timers, function (t) {
      return e === t.elem;
    }).length;
  }, he.offset = {
    setOffset: function (e, t, n) {
      var r, i, o, a, s, u, l, c = he.css(e, 'position'), f = he(e), p = {};
      'static' === c && (e.style.position = 'relative'), s = f.offset(), o = he.css(e, 'top'), u = he.css(e, 'left'), l = ('absolute' === c || 'fixed' === c) && (o + u).indexOf('auto') > -1, l ? (r = f.position(), a = r.top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), he.isFunction(t) && (t = t.call(e, n, he.extend({}, s))), null != t.top && (p.top = t.top - s.top + a), null != t.left && (p.left = t.left - s.left + i), 'using' in t ? t.using.call(e, p) : f.css(p);
    }
  }, he.fn.extend({
    offset: function (e) {
      if (arguments.length)
        return void 0 === e ? this : this.each(function (t) {
          he.offset.setOffset(this, e, t);
        });
      var t, n, r, i, o = this[0];
      return o ? o.getClientRects().length ? (r = o.getBoundingClientRect(), r.width || r.height ? (i = o.ownerDocument, n = Z(i), t = i.documentElement, {
        top: r.top + n.pageYOffset - t.clientTop,
        left: r.left + n.pageXOffset - t.clientLeft
      }) : r) : {
        top: 0,
        left: 0
      } : void 0;
    },
    position: function () {
      if (this[0]) {
        var e, t, n = this[0], r = {
            top: 0,
            left: 0
          };
        return 'fixed' === he.css(n, 'position') ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), he.nodeName(e[0], 'html') || (r = e.offset()), r = {
          top: r.top + he.css(e[0], 'borderTopWidth', !0),
          left: r.left + he.css(e[0], 'borderLeftWidth', !0)
        }), {
          top: t.top - r.top - he.css(n, 'marginTop', !0),
          left: t.left - r.left - he.css(n, 'marginLeft', !0)
        };
      }
    },
    offsetParent: function () {
      return this.map(function () {
        for (var e = this.offsetParent; e && 'static' === he.css(e, 'position');)
          e = e.offsetParent;
        return e || Qe;
      });
    }
  }), he.each({
    scrollLeft: 'pageXOffset',
    scrollTop: 'pageYOffset'
  }, function (e, t) {
    var n = 'pageYOffset' === t;
    he.fn[e] = function (r) {
      return He(this, function (e, r, i) {
        var o = Z(e);
        return void 0 === i ? o ? o[t] : e[r] : void (o ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset) : e[r] = i);
      }, e, r, arguments.length);
    };
  }), he.each([
    'top',
    'left'
  ], function (e, t) {
    he.cssHooks[t] = L(pe.pixelPosition, function (e, n) {
      if (n)
        return n = q(e, t), at.test(n) ? he(e).position()[t] + 'px' : n;
    });
  }), he.each({
    Height: 'height',
    Width: 'width'
  }, function (e, t) {
    he.each({
      padding: 'inner' + e,
      content: t,
      '': 'outer' + e
    }, function (n, r) {
      he.fn[r] = function (i, o) {
        var a = arguments.length && (n || 'boolean' != typeof i), s = n || (i === !0 || o === !0 ? 'margin' : 'border');
        return He(this, function (t, n, i) {
          var o;
          return he.isWindow(t) ? 0 === r.indexOf('outer') ? t['inner' + e] : t.document.documentElement['client' + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body['scroll' + e], o['scroll' + e], t.body['offset' + e], o['offset' + e], o['client' + e])) : void 0 === i ? he.css(t, n, s) : he.style(t, n, i, s);
        }, t, a ? i : void 0, a);
      };
    });
  }), he.fn.extend({
    bind: function (e, t, n) {
      return this.on(e, null, t, n);
    },
    unbind: function (e, t) {
      return this.off(e, null, t);
    },
    delegate: function (e, t, n, r) {
      return this.on(t, e, n, r);
    },
    undelegate: function (e, t, n) {
      return 1 === arguments.length ? this.off(e, '**') : this.off(t, e || '**', n);
    }
  }), he.parseJSON = JSON.parse, 'function' == typeof define && define.amd && define('jquery', [], function () {
    return he;
  });
  var Xt = e.jQuery, Ut = e.$;
  return he.noConflict = function (t) {
    return e.$ === he && (e.$ = Ut), t && e.jQuery === he && (e.jQuery = Xt), he;
  }, t || (e.jQuery = e.$ = he), he;
}), define('jquery-3.1.1.min', function () {
});
/*
 angularAMD v<%= cvars.proj_version %>
 (c) 2013-2014 Marcos Lin https://github.com/marcoslin/
 License: MIT
*/
define('ngload', {
  load: function (n, e, u) {
    'use strict';
    e([
      'angularAMD',
      n
    ], function (n, e) {
      n.processQueue(), u(e);
    });
  }
});
/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.1.9 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with requirejs.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, navigator, document, importScripts, setTimeout, opera */
var requirejs, require, define;
(function (global) {
  var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = '2.1.9', commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm, cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, jsSuffixRegExp = /\.js$/, currDirRegExp = /^\.\//, op = Object.prototype, ostring = op.toString, hasOwn = op.hasOwnProperty, ap = Array.prototype, apsp = ap.splice, isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document), isWebWorker = !isBrowser && typeof importScripts !== 'undefined',
    //PS3 indicates loaded and complete, but need to wait for complete
    //specifically. Sequence is 'loading', 'loaded', execution,
    // then 'complete'. The UA check is unfortunate, but not sure how
    //to feature test w/o causing perf issues.
    readyRegExp = isBrowser && navigator.platform === 'PLAYSTATION 3' ? /^complete$/ : /^(complete|loaded)$/, defContextName = '_',
    //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
    isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]', contexts = {}, cfg = {}, globalDefQueue = [], useInteractive = false;
  function isFunction(it) {
    return ostring.call(it) === '[object Function]';
  }
  function isArray(it) {
    return ostring.call(it) === '[object Array]';
  }
  /**
     * Helper function for iterating over an array. If the func returns
     * a true value, it will break out of the loop.
     */
  function each(ary, func) {
    if (ary) {
      var i;
      for (i = 0; i < ary.length; i += 1) {
        if (ary[i] && func(ary[i], i, ary)) {
          break;
        }
      }
    }
  }
  /**
     * Helper function for iterating over an array backwards. If the func
     * returns a true value, it will break out of the loop.
     */
  function eachReverse(ary, func) {
    if (ary) {
      var i;
      for (i = ary.length - 1; i > -1; i -= 1) {
        if (ary[i] && func(ary[i], i, ary)) {
          break;
        }
      }
    }
  }
  function hasProp(obj, prop) {
    return hasOwn.call(obj, prop);
  }
  function getOwn(obj, prop) {
    return hasProp(obj, prop) && obj[prop];
  }
  /**
     * Cycles over properties in an object and calls a function for each
     * property value. If the function returns a truthy value, then the
     * iteration is stopped.
     */
  function eachProp(obj, func) {
    var prop;
    for (prop in obj) {
      if (hasProp(obj, prop)) {
        if (func(obj[prop], prop)) {
          break;
        }
      }
    }
  }
  /**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     */
  function mixin(target, source, force, deepStringMixin) {
    if (source) {
      eachProp(source, function (value, prop) {
        if (force || !hasProp(target, prop)) {
          if (deepStringMixin && typeof value !== 'string') {
            if (!target[prop]) {
              target[prop] = {};
            }
            mixin(target[prop], value, force, deepStringMixin);
          } else {
            target[prop] = value;
          }
        }
      });
    }
    return target;
  }
  //Similar to Function.prototype.bind, but the 'this' object is specified
  //first, since it is easier to read/figure out what 'this' will be.
  function bind(obj, fn) {
    return function () {
      return fn.apply(obj, arguments);
    };
  }
  function scripts() {
    return document.getElementsByTagName('script');
  }
  function defaultOnError(err) {
    throw err;
  }
  //Allow getting a global that expressed in
  //dot notation, like 'a.b.c'.
  function getGlobal(value) {
    if (!value) {
      return value;
    }
    var g = global;
    each(value.split('.'), function (part) {
      g = g[part];
    });
    return g;
  }
  /**
     * Constructs an error with a pointer to an URL with more information.
     * @param {String} id the error ID that maps to an ID on a web page.
     * @param {String} message human readable error.
     * @param {Error} [err] the original error, if there is one.
     *
     * @returns {Error}
     */
  function makeError(id, msg, err, requireModules) {
    var e = new Error(msg + '\nhttp://requirejs.org/docs/errors.html#' + id);
    e.requireType = id;
    e.requireModules = requireModules;
    if (err) {
      e.originalError = err;
    }
    return e;
  }
  if (typeof define !== 'undefined') {
    //If a define is already in play via another AMD loader,
    //do not overwrite.
    return;
  }
  if (typeof requirejs !== 'undefined') {
    if (isFunction(requirejs)) {
      //Do not overwrite and existing requirejs instance.
      return;
    }
    cfg = requirejs;
    requirejs = undefined;
  }
  //Allow for a require config object
  if (typeof require !== 'undefined' && !isFunction(require)) {
    //assume it is a config object.
    cfg = require;
    require = undefined;
  }
  function newContext(contextName) {
    var inCheckLoaded, Module, context, handlers, checkLoadedTimeoutId, config = {
        waitSeconds: 7,
        baseUrl: './',
        paths: {},
        pkgs: {},
        shim: {},
        config: {}
      }, registry = {},
      //registry of just enabled modules, to speed
      //cycle breaking code when lots of modules
      //are registered, but not activated.
      enabledRegistry = {}, undefEvents = {}, defQueue = [], defined = {}, urlFetched = {}, requireCounter = 1, unnormalizedCounter = 1;
    /**
         * Trims the . and .. from an array of path segments.
         * It will keep a leading path segment if a .. will become
         * the first path segment, to help with module name lookups,
         * which act like paths, but can be remapped. But the end result,
         * all paths that use this function should look normalized.
         * NOTE: this method MODIFIES the input array.
         * @param {Array} ary the array of path segments.
         */
    function trimDots(ary) {
      var i, part;
      for (i = 0; ary[i]; i += 1) {
        part = ary[i];
        if (part === '.') {
          ary.splice(i, 1);
          i -= 1;
        } else if (part === '..') {
          if (i === 1 && (ary[2] === '..' || ary[0] === '..')) {
            //End of the line. Keep at least one non-dot
            //path segment at the front so it can be mapped
            //correctly to disk. Otherwise, there is likely
            //no path mapping for a path starting with '..'.
            //This can still fail, but catches the most reasonable
            //uses of ..
            break;
          } else if (i > 0) {
            ary.splice(i - 1, 2);
            i -= 2;
          }
        }
      }
    }
    /**
         * Given a relative module name, like ./something, normalize it to
         * a real name that can be mapped to a path.
         * @param {String} name the relative name
         * @param {String} baseName a real name that the name arg is relative
         * to.
         * @param {Boolean} applyMap apply the map config to the value. Should
         * only be done if this normalization is for a dependency ID.
         * @returns {String} normalized name
         */
    function normalize(name, baseName, applyMap) {
      var pkgName, pkgConfig, mapValue, nameParts, i, j, nameSegment, foundMap, foundI, foundStarMap, starI, baseParts = baseName && baseName.split('/'), normalizedBaseParts = baseParts, map = config.map, starMap = map && map['*'];
      //Adjust any relative paths.
      if (name && name.charAt(0) === '.') {
        //If have a base name, try to normalize against it,
        //otherwise, assume it is a top-level require that will
        //be relative to baseUrl in the end.
        if (baseName) {
          if (getOwn(config.pkgs, baseName)) {
            //If the baseName is a package name, then just treat it as one
            //name to concat the name with.
            normalizedBaseParts = baseParts = [baseName];
          } else {
            //Convert baseName to array, and lop off the last part,
            //so that . matches that 'directory' and not name of the baseName's
            //module. For instance, baseName of 'one/two/three', maps to
            //'one/two/three.js', but we want the directory, 'one/two' for
            //this normalization.
            normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
          }
          name = normalizedBaseParts.concat(name.split('/'));
          trimDots(name);
          //Some use of packages may use a . path to reference the
          //'main' module name, so normalize for that.
          pkgConfig = getOwn(config.pkgs, pkgName = name[0]);
          name = name.join('/');
          if (pkgConfig && name === pkgName + '/' + pkgConfig.main) {
            name = pkgName;
          }
        } else if (name.indexOf('./') === 0) {
          // No baseName, so this is ID is resolved relative
          // to baseUrl, pull off the leading dot.
          name = name.substring(2);
        }
      }
      //Apply map config if available.
      if (applyMap && map && (baseParts || starMap)) {
        nameParts = name.split('/');
        for (i = nameParts.length; i > 0; i -= 1) {
          nameSegment = nameParts.slice(0, i).join('/');
          if (baseParts) {
            //Find the longest baseName segment match in the config.
            //So, do joins on the biggest to smallest lengths of baseParts.
            for (j = baseParts.length; j > 0; j -= 1) {
              mapValue = getOwn(map, baseParts.slice(0, j).join('/'));
              //baseName segment has config, find if it has one for
              //this name.
              if (mapValue) {
                mapValue = getOwn(mapValue, nameSegment);
                if (mapValue) {
                  //Match, update name to the new value.
                  foundMap = mapValue;
                  foundI = i;
                  break;
                }
              }
            }
          }
          if (foundMap) {
            break;
          }
          //Check for a star map match, but just hold on to it,
          //if there is a shorter segment match later in a matching
          //config, then favor over this star map.
          if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) {
            foundStarMap = getOwn(starMap, nameSegment);
            starI = i;
          }
        }
        if (!foundMap && foundStarMap) {
          foundMap = foundStarMap;
          foundI = starI;
        }
        if (foundMap) {
          nameParts.splice(0, foundI, foundMap);
          name = nameParts.join('/');
        }
      }
      return name;
    }
    function removeScript(name) {
      if (isBrowser) {
        each(scripts(), function (scriptNode) {
          if (scriptNode.getAttribute('data-requiremodule') === name && scriptNode.getAttribute('data-requirecontext') === context.contextName) {
            scriptNode.parentNode.removeChild(scriptNode);
            return true;
          }
        });
      }
    }
    function hasPathFallback(id) {
      var pathConfig = getOwn(config.paths, id);
      if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) {
        //Pop off the first array value, since it failed, and
        //retry
        pathConfig.shift();
        context.require.undef(id);
        context.require([id]);
        return true;
      }
    }
    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
      var prefix, index = name ? name.indexOf('!') : -1;
      if (index > -1) {
        prefix = name.substring(0, index);
        name = name.substring(index + 1, name.length);
      }
      return [
        prefix,
        name
      ];
    }
    /**
         * Creates a module mapping that includes plugin prefix, module
         * name, and path. If parentModuleMap is provided it will
         * also normalize the name via require.normalize()
         *
         * @param {String} name the module name
         * @param {String} [parentModuleMap] parent module map
         * for the module name, used to resolve relative names.
         * @param {Boolean} isNormalized: is the ID already normalized.
         * This is true if this call is done for a define() module ID.
         * @param {Boolean} applyMap: apply the map config to the ID.
         * Should only be true if this map is for a dependency.
         *
         * @returns {Object}
         */
    function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
      var url, pluginModule, suffix, nameParts, prefix = null, parentName = parentModuleMap ? parentModuleMap.name : null, originalName = name, isDefine = true, normalizedName = '';
      //If no name, then it means it is a require call, generate an
      //internal name.
      if (!name) {
        isDefine = false;
        name = '_@r' + (requireCounter += 1);
      }
      nameParts = splitPrefix(name);
      prefix = nameParts[0];
      name = nameParts[1];
      if (prefix) {
        prefix = normalize(prefix, parentName, applyMap);
        pluginModule = getOwn(defined, prefix);
      }
      //Account for relative paths if there is a base name.
      if (name) {
        if (prefix) {
          if (pluginModule && pluginModule.normalize) {
            //Plugin is loaded, use its normalize method.
            normalizedName = pluginModule.normalize(name, function (name) {
              return normalize(name, parentName, applyMap);
            });
          } else {
            normalizedName = normalize(name, parentName, applyMap);
          }
        } else {
          //A regular module.
          normalizedName = normalize(name, parentName, applyMap);
          //Normalized name may be a plugin ID due to map config
          //application in normalize. The map config values must
          //already be normalized, so do not need to redo that part.
          nameParts = splitPrefix(normalizedName);
          prefix = nameParts[0];
          normalizedName = nameParts[1];
          isNormalized = true;
          url = context.nameToUrl(normalizedName);
        }
      }
      //If the id is a plugin id that cannot be determined if it needs
      //normalization, stamp it with a unique ID so two matching relative
      //ids that may conflict can be separate.
      suffix = prefix && !pluginModule && !isNormalized ? '_unnormalized' + (unnormalizedCounter += 1) : '';
      return {
        prefix: prefix,
        name: normalizedName,
        parentMap: parentModuleMap,
        unnormalized: !!suffix,
        url: url,
        originalName: originalName,
        isDefine: isDefine,
        id: (prefix ? prefix + '!' + normalizedName : normalizedName) + suffix
      };
    }
    function getModule(depMap) {
      var id = depMap.id, mod = getOwn(registry, id);
      if (!mod) {
        mod = registry[id] = new context.Module(depMap);
      }
      return mod;
    }
    function on(depMap, name, fn) {
      var id = depMap.id, mod = getOwn(registry, id);
      if (hasProp(defined, id) && (!mod || mod.defineEmitComplete)) {
        if (name === 'defined') {
          fn(defined[id]);
        }
      } else {
        mod = getModule(depMap);
        if (mod.error && name === 'error') {
          fn(mod.error);
        } else {
          mod.on(name, fn);
        }
      }
    }
    function onError(err, errback) {
      var ids = err.requireModules, notified = false;
      if (errback) {
        errback(err);
      } else {
        each(ids, function (id) {
          var mod = getOwn(registry, id);
          if (mod) {
            //Set error on module, so it skips timeout checks.
            mod.error = err;
            if (mod.events.error) {
              notified = true;
              mod.emit('error', err);
            }
          }
        });
        if (!notified) {
          req.onError(err);
        }
      }
    }
    /**
         * Internal method to transfer globalQueue items to this context's
         * defQueue.
         */
    function takeGlobalQueue() {
      //Push all the globalDefQueue items into the context's defQueue
      if (globalDefQueue.length) {
        //Array splice in the values since the context code has a
        //local var ref to defQueue, so cannot just reassign the one
        //on context.
        apsp.apply(defQueue, [
          defQueue.length - 1,
          0
        ].concat(globalDefQueue));
        globalDefQueue = [];
      }
    }
    handlers = {
      'require': function (mod) {
        if (mod.require) {
          return mod.require;
        } else {
          return mod.require = context.makeRequire(mod.map);
        }
      },
      'exports': function (mod) {
        mod.usingExports = true;
        if (mod.map.isDefine) {
          if (mod.exports) {
            return mod.exports;
          } else {
            return mod.exports = defined[mod.map.id] = {};
          }
        }
      },
      'module': function (mod) {
        if (mod.module) {
          return mod.module;
        } else {
          return mod.module = {
            id: mod.map.id,
            uri: mod.map.url,
            config: function () {
              var c, pkg = getOwn(config.pkgs, mod.map.id);
              // For packages, only support config targeted
              // at the main module.
              c = pkg ? getOwn(config.config, mod.map.id + '/' + pkg.main) : getOwn(config.config, mod.map.id);
              return c || {};
            },
            exports: defined[mod.map.id]
          };
        }
      }
    };
    function cleanRegistry(id) {
      //Clean up machinery used for waiting modules.
      delete registry[id];
      delete enabledRegistry[id];
    }
    function breakCycle(mod, traced, processed) {
      var id = mod.map.id;
      if (mod.error) {
        mod.emit('error', mod.error);
      } else {
        traced[id] = true;
        each(mod.depMaps, function (depMap, i) {
          var depId = depMap.id, dep = getOwn(registry, depId);
          //Only force things that have not completed
          //being defined, so still in the registry,
          //and only if it has not been matched up
          //in the module already.
          if (dep && !mod.depMatched[i] && !processed[depId]) {
            if (getOwn(traced, depId)) {
              mod.defineDep(i, defined[depId]);
              mod.check();  //pass false?
            } else {
              breakCycle(dep, traced, processed);
            }
          }
        });
        processed[id] = true;
      }
    }
    function checkLoaded() {
      var map, modId, err, usingPathFallback, waitInterval = config.waitSeconds * 1000,
        //It is possible to disable the wait interval by using waitSeconds of 0.
        expired = waitInterval && context.startTime + waitInterval < new Date().getTime(), noLoads = [], reqCalls = [], stillLoading = false, needCycleCheck = true;
      //Do not bother if this call was a result of a cycle break.
      if (inCheckLoaded) {
        return;
      }
      inCheckLoaded = true;
      //Figure out the state of all the modules.
      eachProp(enabledRegistry, function (mod) {
        map = mod.map;
        modId = map.id;
        //Skip things that are not enabled or in error state.
        if (!mod.enabled) {
          return;
        }
        if (!map.isDefine) {
          reqCalls.push(mod);
        }
        if (!mod.error) {
          //If the module should be executed, and it has not
          //been inited and time is up, remember it.
          if (!mod.inited && expired) {
            if (hasPathFallback(modId)) {
              usingPathFallback = true;
              stillLoading = true;
            } else {
              noLoads.push(modId);
              removeScript(modId);
            }
          } else if (!mod.inited && mod.fetched && map.isDefine) {
            stillLoading = true;
            if (!map.prefix) {
              //No reason to keep looking for unfinished
              //loading. If the only stillLoading is a
              //plugin resource though, keep going,
              //because it may be that a plugin resource
              //is waiting on a non-plugin cycle.
              return needCycleCheck = false;
            }
          }
        }
      });
      if (expired && noLoads.length) {
        //If wait time expired, throw error of unloaded modules.
        err = makeError('timeout', 'Load timeout for modules: ' + noLoads, null, noLoads);
        err.contextName = context.contextName;
        return onError(err);
      }
      //Not expired, check for a cycle.
      if (needCycleCheck) {
        each(reqCalls, function (mod) {
          breakCycle(mod, {}, {});
        });
      }
      //If still waiting on loads, and the waiting load is something
      //other than a plugin resource, or there are still outstanding
      //scripts, then just try back later.
      if ((!expired || usingPathFallback) && stillLoading) {
        //Something is still waiting to load. Wait for it, but only
        //if a timeout is not already in effect.
        if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
          checkLoadedTimeoutId = setTimeout(function () {
            checkLoadedTimeoutId = 0;
            checkLoaded();
          }, 50);
        }
      }
      inCheckLoaded = false;
    }
    Module = function (map) {
      this.events = getOwn(undefEvents, map.id) || {};
      this.map = map;
      this.shim = getOwn(config.shim, map.id);
      this.depExports = [];
      this.depMaps = [];
      this.depMatched = [];
      this.pluginMaps = {};
      this.depCount = 0;  /* this.exports this.factory
               this.depMaps = [],
               this.enabled, this.fetched
            */
    };
    Module.prototype = {
      init: function (depMaps, factory, errback, options) {
        options = options || {};
        //Do not do more inits if already done. Can happen if there
        //are multiple define calls for the same module. That is not
        //a normal, common case, but it is also not unexpected.
        if (this.inited) {
          return;
        }
        this.factory = factory;
        if (errback) {
          //Register for errors on this module.
          this.on('error', errback);
        } else if (this.events.error) {
          //If no errback already, but there are error listeners
          //on this module, set up an errback to pass to the deps.
          errback = bind(this, function (err) {
            this.emit('error', err);
          });
        }
        //Do a copy of the dependency array, so that
        //source inputs are not modified. For example
        //"shim" deps are passed in here directly, and
        //doing a direct modification of the depMaps array
        //would affect that config.
        this.depMaps = depMaps && depMaps.slice(0);
        this.errback = errback;
        //Indicate this module has be initialized
        this.inited = true;
        this.ignore = options.ignore;
        //Could have option to init this module in enabled mode,
        //or could have been previously marked as enabled. However,
        //the dependencies are not known until init is called. So
        //if enabled previously, now trigger dependencies as enabled.
        if (options.enabled || this.enabled) {
          //Enable this module and dependencies.
          //Will call this.check()
          this.enable();
        } else {
          this.check();
        }
      },
      defineDep: function (i, depExports) {
        //Because of cycles, defined callback for a given
        //export can be called more than once.
        if (!this.depMatched[i]) {
          this.depMatched[i] = true;
          this.depCount -= 1;
          this.depExports[i] = depExports;
        }
      },
      fetch: function () {
        if (this.fetched) {
          return;
        }
        this.fetched = true;
        context.startTime = new Date().getTime();
        var map = this.map;
        //If the manager is for a plugin managed resource,
        //ask the plugin to load it now.
        if (this.shim) {
          context.makeRequire(this.map, { enableBuildCallback: true })(this.shim.deps || [], bind(this, function () {
            return map.prefix ? this.callPlugin() : this.load();
          }));
        } else {
          //Regular dependency.
          return map.prefix ? this.callPlugin() : this.load();
        }
      },
      load: function () {
        var url = this.map.url;
        //Regular dependency.
        if (!urlFetched[url]) {
          urlFetched[url] = true;
          context.load(this.map.id, url);
        }
      },
      check: function () {
        if (!this.enabled || this.enabling) {
          return;
        }
        var err, cjsModule, id = this.map.id, depExports = this.depExports, exports = this.exports, factory = this.factory;
        if (!this.inited) {
          this.fetch();
        } else if (this.error) {
          this.emit('error', this.error);
        } else if (!this.defining) {
          //The factory could trigger another require call
          //that would result in checking this module to
          //define itself again. If already in the process
          //of doing that, skip this work.
          this.defining = true;
          if (this.depCount < 1 && !this.defined) {
            if (isFunction(factory)) {
              //If there is an error listener, favor passing
              //to that instead of throwing an error. However,
              //only do it for define()'d  modules. require
              //errbacks should not be called for failures in
              //their callbacks (#699). However if a global
              //onError is set, use that.
              if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) {
                try {
                  exports = context.execCb(id, factory, depExports, exports);
                } catch (e) {
                  err = e;
                }
              } else {
                exports = context.execCb(id, factory, depExports, exports);
              }
              if (this.map.isDefine) {
                //If setting exports via 'module' is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                cjsModule = this.module;
                if (cjsModule && cjsModule.exports !== undefined && cjsModule.exports !== this.exports) {
                  exports = cjsModule.exports;
                } else if (exports === undefined && this.usingExports) {
                  //exports already set the defined value.
                  exports = this.exports;
                }
              }
              if (err) {
                err.requireMap = this.map;
                err.requireModules = this.map.isDefine ? [this.map.id] : null;
                err.requireType = this.map.isDefine ? 'define' : 'require';
                return onError(this.error = err);
              }
            } else {
              //Just a literal value
              exports = factory;
            }
            this.exports = exports;
            if (this.map.isDefine && !this.ignore) {
              defined[id] = exports;
              if (req.onResourceLoad) {
                req.onResourceLoad(context, this.map, this.depMaps);
              }
            }
            //Clean up
            cleanRegistry(id);
            this.defined = true;
          }
          //Finished the define stage. Allow calling check again
          //to allow define notifications below in the case of a
          //cycle.
          this.defining = false;
          if (this.defined && !this.defineEmitted) {
            this.defineEmitted = true;
            this.emit('defined', this.exports);
            this.defineEmitComplete = true;
          }
        }
      },
      callPlugin: function () {
        var map = this.map, id = map.id,
          //Map already normalized the prefix.
          pluginMap = makeModuleMap(map.prefix);
        //Mark this as a dependency for this plugin, so it
        //can be traced for cycles.
        this.depMaps.push(pluginMap);
        on(pluginMap, 'defined', bind(this, function (plugin) {
          var load, normalizedMap, normalizedMod, name = this.map.name, parentName = this.map.parentMap ? this.map.parentMap.name : null, localRequire = context.makeRequire(map.parentMap, { enableBuildCallback: true });
          //If current map is not normalized, wait for that
          //normalized name to load instead of continuing.
          if (this.map.unnormalized) {
            //Normalize the ID if the plugin allows it.
            if (plugin.normalize) {
              name = plugin.normalize(name, function (name) {
                return normalize(name, parentName, true);
              }) || '';
            }
            //prefix and name should already be normalized, no need
            //for applying map config again either.
            normalizedMap = makeModuleMap(map.prefix + '!' + name, this.map.parentMap);
            on(normalizedMap, 'defined', bind(this, function (value) {
              this.init([], function () {
                return value;
              }, null, {
                enabled: true,
                ignore: true
              });
            }));
            normalizedMod = getOwn(registry, normalizedMap.id);
            if (normalizedMod) {
              //Mark this as a dependency for this plugin, so it
              //can be traced for cycles.
              this.depMaps.push(normalizedMap);
              if (this.events.error) {
                normalizedMod.on('error', bind(this, function (err) {
                  this.emit('error', err);
                }));
              }
              normalizedMod.enable();
            }
            return;
          }
          load = bind(this, function (value) {
            this.init([], function () {
              return value;
            }, null, { enabled: true });
          });
          load.error = bind(this, function (err) {
            this.inited = true;
            this.error = err;
            err.requireModules = [id];
            //Remove temp unnormalized modules for this module,
            //since they will never be resolved otherwise now.
            eachProp(registry, function (mod) {
              if (mod.map.id.indexOf(id + '_unnormalized') === 0) {
                cleanRegistry(mod.map.id);
              }
            });
            onError(err);
          });
          //Allow plugins to load other code without having to know the
          //context or how to 'complete' the load.
          load.fromText = bind(this, function (text, textAlt) {
            /*jslint evil: true */
            var moduleName = map.name, moduleMap = makeModuleMap(moduleName), hasInteractive = useInteractive;
            //As of 2.1.0, support just passing the text, to reinforce
            //fromText only being called once per resource. Still
            //support old style of passing moduleName but discard
            //that moduleName in favor of the internal ref.
            if (textAlt) {
              text = textAlt;
            }
            //Turn off interactive script matching for IE for any define
            //calls in the text, then turn it back on at the end.
            if (hasInteractive) {
              useInteractive = false;
            }
            //Prime the system by creating a module instance for
            //it.
            getModule(moduleMap);
            //Transfer any config to this other module.
            if (hasProp(config.config, id)) {
              config.config[moduleName] = config.config[id];
            }
            try {
              req.exec(text);
            } catch (e) {
              return onError(makeError('fromtexteval', 'fromText eval for ' + id + ' failed: ' + e, e, [id]));
            }
            if (hasInteractive) {
              useInteractive = true;
            }
            //Mark this as a dependency for the plugin
            //resource
            this.depMaps.push(moduleMap);
            //Support anonymous modules.
            context.completeLoad(moduleName);
            //Bind the value of that module to the value for this
            //resource ID.
            localRequire([moduleName], load);
          });
          //Use parentName here since the plugin's name is not reliable,
          //could be some weird string with no path that actually wants to
          //reference the parentName's path.
          plugin.load(map.name, localRequire, load, config);
        }));
        context.enable(pluginMap, this);
        this.pluginMaps[pluginMap.id] = pluginMap;
      },
      enable: function () {
        enabledRegistry[this.map.id] = this;
        this.enabled = true;
        //Set flag mentioning that the module is enabling,
        //so that immediate calls to the defined callbacks
        //for dependencies do not trigger inadvertent load
        //with the depCount still being zero.
        this.enabling = true;
        //Enable each dependency
        each(this.depMaps, bind(this, function (depMap, i) {
          var id, mod, handler;
          if (typeof depMap === 'string') {
            //Dependency needs to be converted to a depMap
            //and wired up to this module.
            depMap = makeModuleMap(depMap, this.map.isDefine ? this.map : this.map.parentMap, false, !this.skipMap);
            this.depMaps[i] = depMap;
            handler = getOwn(handlers, depMap.id);
            if (handler) {
              this.depExports[i] = handler(this);
              return;
            }
            this.depCount += 1;
            on(depMap, 'defined', bind(this, function (depExports) {
              this.defineDep(i, depExports);
              this.check();
            }));
            if (this.errback) {
              on(depMap, 'error', bind(this, this.errback));
            }
          }
          id = depMap.id;
          mod = registry[id];
          //Skip special modules like 'require', 'exports', 'module'
          //Also, don't call enable if it is already enabled,
          //important in circular dependency cases.
          if (!hasProp(handlers, id) && mod && !mod.enabled) {
            context.enable(depMap, this);
          }
        }));
        //Enable each plugin that is used in
        //a dependency
        eachProp(this.pluginMaps, bind(this, function (pluginMap) {
          var mod = getOwn(registry, pluginMap.id);
          if (mod && !mod.enabled) {
            context.enable(pluginMap, this);
          }
        }));
        this.enabling = false;
        this.check();
      },
      on: function (name, cb) {
        var cbs = this.events[name];
        if (!cbs) {
          cbs = this.events[name] = [];
        }
        cbs.push(cb);
      },
      emit: function (name, evt) {
        each(this.events[name], function (cb) {
          cb(evt);
        });
        if (name === 'error') {
          //Now that the error handler was triggered, remove
          //the listeners, since this broken Module instance
          //can stay around for a while in the registry.
          delete this.events[name];
        }
      }
    };
    function callGetModule(args) {
      //Skip modules already defined.
      if (!hasProp(defined, args[0])) {
        getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]);
      }
    }
    function removeListener(node, func, name, ieName) {
      //Favor detachEvent because of IE9
      //issue, see attachEvent/addEventListener comment elsewhere
      //in this file.
      if (node.detachEvent && !isOpera) {
        //Probably IE. If not it will throw an error, which will be
        //useful to know.
        if (ieName) {
          node.detachEvent(ieName, func);
        }
      } else {
        node.removeEventListener(name, func, false);
      }
    }
    /**
         * Given an event from a script node, get the requirejs info from it,
         * and then removes the event listeners on the node.
         * @param {Event} evt
         * @returns {Object}
         */
    function getScriptData(evt) {
      //Using currentTarget instead of target for Firefox 2.0's sake. Not
      //all old browsers will be supported, but this one was easy enough
      //to support and still makes sense.
      var node = evt.currentTarget || evt.srcElement;
      //Remove the listeners once here.
      removeListener(node, context.onScriptLoad, 'load', 'onreadystatechange');
      removeListener(node, context.onScriptError, 'error');
      return {
        node: node,
        id: node && node.getAttribute('data-requiremodule')
      };
    }
    function intakeDefines() {
      var args;
      //Any defined modules in the global queue, intake them now.
      takeGlobalQueue();
      //Make sure any remaining defQueue items get properly processed.
      while (defQueue.length) {
        args = defQueue.shift();
        if (args[0] === null) {
          return onError(makeError('mismatch', 'Mismatched anonymous define() module: ' + args[args.length - 1]));
        } else {
          //args are id, deps, factory. Should be normalized by the
          //define() function.
          callGetModule(args);
        }
      }
    }
    context = {
      config: config,
      contextName: contextName,
      registry: registry,
      defined: defined,
      urlFetched: urlFetched,
      defQueue: defQueue,
      Module: Module,
      makeModuleMap: makeModuleMap,
      nextTick: req.nextTick,
      onError: onError,
      configure: function (cfg) {
        //Make sure the baseUrl ends in a slash.
        if (cfg.baseUrl) {
          if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== '/') {
            cfg.baseUrl += '/';
          }
        }
        //Save off the paths and packages since they require special processing,
        //they are additive.
        var pkgs = config.pkgs, shim = config.shim, objs = {
            paths: true,
            config: true,
            map: true
          };
        eachProp(cfg, function (value, prop) {
          if (objs[prop]) {
            if (prop === 'map') {
              if (!config.map) {
                config.map = {};
              }
              mixin(config[prop], value, true, true);
            } else {
              mixin(config[prop], value, true);
            }
          } else {
            config[prop] = value;
          }
        });
        //Merge shim
        if (cfg.shim) {
          eachProp(cfg.shim, function (value, id) {
            //Normalize the structure
            if (isArray(value)) {
              value = { deps: value };
            }
            if ((value.exports || value.init) && !value.exportsFn) {
              value.exportsFn = context.makeShimExports(value);
            }
            shim[id] = value;
          });
          config.shim = shim;
        }
        //Adjust packages if necessary.
        if (cfg.packages) {
          each(cfg.packages, function (pkgObj) {
            var location;
            pkgObj = typeof pkgObj === 'string' ? { name: pkgObj } : pkgObj;
            location = pkgObj.location;
            //Create a brand new object on pkgs, since currentPackages can
            //be passed in again, and config.pkgs is the internal transformed
            //state for all package configs.
            pkgs[pkgObj.name] = {
              name: pkgObj.name,
              location: location || pkgObj.name,
              main: (pkgObj.main || 'main').replace(currDirRegExp, '').replace(jsSuffixRegExp, '')
            };
          });
          //Done with modifications, assing packages back to context config
          config.pkgs = pkgs;
        }
        //If there are any "waiting to execute" modules in the registry,
        //update the maps for them, since their info, like URLs to load,
        //may have changed.
        eachProp(registry, function (mod, id) {
          //If module already has init called, since it is too
          //late to modify them, and ignore unnormalized ones
          //since they are transient.
          if (!mod.inited && !mod.map.unnormalized) {
            mod.map = makeModuleMap(id);
          }
        });
        //If a deps array or a config callback is specified, then call
        //require with those args. This is useful when require is defined as a
        //config object before require.js is loaded.
        if (cfg.deps || cfg.callback) {
          context.require(cfg.deps || [], cfg.callback);
        }
      },
      makeShimExports: function (value) {
        function fn() {
          var ret;
          if (value.init) {
            ret = value.init.apply(global, arguments);
          }
          return ret || value.exports && getGlobal(value.exports);
        }
        return fn;
      },
      makeRequire: function (relMap, options) {
        options = options || {};
        function localRequire(deps, callback, errback) {
          var id, map, requireMod;
          if (options.enableBuildCallback && callback && isFunction(callback)) {
            callback.__requireJsBuild = true;
          }
          if (typeof deps === 'string') {
            if (isFunction(callback)) {
              //Invalid call
              return onError(makeError('requireargs', 'Invalid require call'), errback);
            }
            //If require|exports|module are requested, get the
            //value for them from the special handlers. Caveat:
            //this only works while module is being defined.
            if (relMap && hasProp(handlers, deps)) {
              return handlers[deps](registry[relMap.id]);
            }
            //Synchronous access to one module. If require.get is
            //available (as in the Node adapter), prefer that.
            if (req.get) {
              return req.get(context, deps, relMap, localRequire);
            }
            //Normalize module name, if it contains . or ..
            map = makeModuleMap(deps, relMap, false, true);
            id = map.id;
            if (!hasProp(defined, id)) {
              return onError(makeError('notloaded', 'Module name "' + id + '" has not been loaded yet for context: ' + contextName + (relMap ? '' : '. Use require([])')));
            }
            return defined[id];
          }
          //Grab defines waiting in the global queue.
          intakeDefines();
          //Mark all the dependencies as needing to be loaded.
          context.nextTick(function () {
            //Some defines could have been added since the
            //require call, collect them.
            intakeDefines();
            requireMod = getModule(makeModuleMap(null, relMap));
            //Store if map config should be applied to this require
            //call for dependencies.
            requireMod.skipMap = options.skipMap;
            requireMod.init(deps, callback, errback, { enabled: true });
            checkLoaded();
          });
          return localRequire;
        }
        mixin(localRequire, {
          isBrowser: isBrowser,
          toUrl: function (moduleNamePlusExt) {
            var ext, index = moduleNamePlusExt.lastIndexOf('.'), segment = moduleNamePlusExt.split('/')[0], isRelative = segment === '.' || segment === '..';
            //Have a file extension alias, and it is not the
            //dots from a relative path.
            if (index !== -1 && (!isRelative || index > 1)) {
              ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length);
              moduleNamePlusExt = moduleNamePlusExt.substring(0, index);
            }
            return context.nameToUrl(normalize(moduleNamePlusExt, relMap && relMap.id, true), ext, true);
          },
          defined: function (id) {
            return hasProp(defined, makeModuleMap(id, relMap, false, true).id);
          },
          specified: function (id) {
            id = makeModuleMap(id, relMap, false, true).id;
            return hasProp(defined, id) || hasProp(registry, id);
          }
        });
        //Only allow undef on top level require calls
        if (!relMap) {
          localRequire.undef = function (id) {
            //Bind any waiting define() calls to this context,
            //fix for #408
            takeGlobalQueue();
            var map = makeModuleMap(id, relMap, true), mod = getOwn(registry, id);
            removeScript(id);
            delete defined[id];
            delete urlFetched[map.url];
            delete undefEvents[id];
            if (mod) {
              //Hold on to listeners in case the
              //module will be attempted to be reloaded
              //using a different config.
              if (mod.events.defined) {
                undefEvents[id] = mod.events;
              }
              cleanRegistry(id);
            }
          };
        }
        return localRequire;
      },
      enable: function (depMap) {
        var mod = getOwn(registry, depMap.id);
        if (mod) {
          getModule(depMap).enable();
        }
      },
      completeLoad: function (moduleName) {
        var found, args, mod, shim = getOwn(config.shim, moduleName) || {}, shExports = shim.exports;
        takeGlobalQueue();
        while (defQueue.length) {
          args = defQueue.shift();
          if (args[0] === null) {
            args[0] = moduleName;
            //If already found an anonymous module and bound it
            //to this name, then this is some other anon module
            //waiting for its completeLoad to fire.
            if (found) {
              break;
            }
            found = true;
          } else if (args[0] === moduleName) {
            //Found matching define call for this script!
            found = true;
          }
          callGetModule(args);
        }
        //Do this after the cycle of callGetModule in case the result
        //of those calls/init calls changes the registry.
        mod = getOwn(registry, moduleName);
        if (!found && !hasProp(defined, moduleName) && mod && !mod.inited) {
          if (config.enforceDefine && (!shExports || !getGlobal(shExports))) {
            if (hasPathFallback(moduleName)) {
              return;
            } else {
              return onError(makeError('nodefine', 'No define call for ' + moduleName, null, [moduleName]));
            }
          } else {
            //A script that does not call define(), so just simulate
            //the call for it.
            callGetModule([
              moduleName,
              shim.deps || [],
              shim.exportsFn
            ]);
          }
        }
        checkLoaded();
      },
      nameToUrl: function (moduleName, ext, skipExt) {
        var paths, pkgs, pkg, pkgPath, syms, i, parentModule, url, parentPath;
        //If a colon is in the URL, it indicates a protocol is used and it is just
        //an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
        //or ends with .js, then assume the user meant to use an url and not a module id.
        //The slash is important for protocol-less URLs as well as full paths.
        if (req.jsExtRegExp.test(moduleName)) {
          //Just a plain path, not module name lookup, so just return it.
          //Add extension if it is included. This is a bit wonky, only non-.js things pass
          //an extension, this method probably needs to be reworked.
          url = moduleName + (ext || '');
        } else {
          //A module that needs to be converted to a path.
          paths = config.paths;
          pkgs = config.pkgs;
          syms = moduleName.split('/');
          //For each module name segment, see if there is a path
          //registered for it. Start with most specific name
          //and work up from it.
          for (i = syms.length; i > 0; i -= 1) {
            parentModule = syms.slice(0, i).join('/');
            pkg = getOwn(pkgs, parentModule);
            parentPath = getOwn(paths, parentModule);
            if (parentPath) {
              //If an array, it means there are a few choices,
              //Choose the one that is desired
              if (isArray(parentPath)) {
                parentPath = parentPath[0];
              }
              syms.splice(0, i, parentPath);
              break;
            } else if (pkg) {
              //If module name is just the package name, then looking
              //for the main module.
              if (moduleName === pkg.name) {
                pkgPath = pkg.location + '/' + pkg.main;
              } else {
                pkgPath = pkg.location;
              }
              syms.splice(0, i, pkgPath);
              break;
            }
          }
          //Join the path parts together, then figure out if baseUrl is needed.
          url = syms.join('/');
          url += ext || (/^data\:|\?/.test(url) || skipExt ? '' : '.js');
          url = (url.charAt(0) === '/' || url.match(/^[\w\+\.\-]+:/) ? '' : config.baseUrl) + url;
        }
        return config.urlArgs ? url + ((url.indexOf('?') === -1 ? '?' : '&') + config.urlArgs) : url;
      },
      load: function (id, url) {
        req.load(context, id, url);
      },
      execCb: function (name, callback, args, exports) {
        return callback.apply(exports, args);
      },
      onScriptLoad: function (evt) {
        //Using currentTarget instead of target for Firefox 2.0's sake. Not
        //all old browsers will be supported, but this one was easy enough
        //to support and still makes sense.
        if (evt.type === 'load' || readyRegExp.test((evt.currentTarget || evt.srcElement).readyState)) {
          //Reset interactive script so a script node is not held onto for
          //to long.
          interactiveScript = null;
          //Pull out the name of the module and the context.
          var data = getScriptData(evt);
          context.completeLoad(data.id);
        }
      },
      onScriptError: function (evt) {
        var data = getScriptData(evt);
        if (!hasPathFallback(data.id)) {
          return onError(makeError('scripterror', 'Script error for: ' + data.id, evt, [data.id]));
        }
      }
    };
    context.require = context.makeRequire();
    return context;
  }
  /**
     * Main entry point.
     *
     * If the only argument to require is a string, then the module that
     * is represented by that string is fetched for the appropriate context.
     *
     * If the first argument is an array, then it will be treated as an array
     * of dependency string names to fetch. An optional function callback can
     * be specified to execute when all of those dependencies are available.
     *
     * Make a local req variable to help Caja compliance (it assumes things
     * on a require that are not standardized), and to give a short
     * name for minification/local scope use.
     */
  req = requirejs = function (deps, callback, errback, optional) {
    //Find the right context, use default
    var context, config, contextName = defContextName;
    // Determine if have config object in the call.
    if (!isArray(deps) && typeof deps !== 'string') {
      // deps is a config object
      config = deps;
      if (isArray(callback)) {
        // Adjust args if there are dependencies
        deps = callback;
        callback = errback;
        errback = optional;
      } else {
        deps = [];
      }
    }
    if (config && config.context) {
      contextName = config.context;
    }
    context = getOwn(contexts, contextName);
    if (!context) {
      context = contexts[contextName] = req.s.newContext(contextName);
    }
    if (config) {
      context.configure(config);
    }
    return context.require(deps, callback, errback);
  };
  /**
     * Support require.config() to make it easier to cooperate with other
     * AMD loaders on globally agreed names.
     */
  req.config = function (config) {
    return req(config);
  };
  /**
     * Execute something after the current tick
     * of the event loop. Override for other envs
     * that have a better solution than setTimeout.
     * @param  {Function} fn function to execute later.
     */
  req.nextTick = typeof setTimeout !== 'undefined' ? function (fn) {
    setTimeout(fn, 4);
  } : function (fn) {
    fn();
  };
  /**
     * Export require as a global, but only if it does not already exist.
     */
  if (!require) {
    require = req;
  }
  req.version = version;
  //Used to filter out dependencies that are already paths.
  req.jsExtRegExp = /^\/|:|\?|\.js$/;
  req.isBrowser = isBrowser;
  s = req.s = {
    contexts: contexts,
    newContext: newContext
  };
  //Create default context.
  req({});
  //Exports some context-sensitive methods on global require.
  each([
    'toUrl',
    'undef',
    'defined',
    'specified'
  ], function (prop) {
    //Reference from contexts instead of early binding to default context,
    //so that during builds, the latest instance of the default context
    //with its config gets used.
    req[prop] = function () {
      var ctx = contexts[defContextName];
      return ctx.require[prop].apply(ctx, arguments);
    };
  });
  if (isBrowser) {
    head = s.head = document.getElementsByTagName('head')[0];
    //If BASE tag is in play, using appendChild is a problem for IE6.
    //When that browser dies, this can be removed. Details in this jQuery bug:
    //http://dev.jquery.com/ticket/2709
    baseElement = document.getElementsByTagName('base')[0];
    if (baseElement) {
      head = s.head = baseElement.parentNode;
    }
  }
  /**
     * Any errors that require explicitly generates will be passed to this
     * function. Intercept/override it if you want custom error handling.
     * @param {Error} err the error object.
     */
  req.onError = defaultOnError;
  /**
     * Creates the node for the load command. Only used in browser envs.
     */
  req.createNode = function (config, moduleName, url) {
    var node = config.xhtml ? document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') : document.createElement('script');
    node.type = config.scriptType || 'text/javascript';
    node.charset = 'utf-8';
    node.async = true;
    return node;
  };
  /**
     * Does the request to load a module for the browser case.
     * Make this a separate function to allow other environments
     * to override it.
     *
     * @param {Object} context the require context to find state.
     * @param {String} moduleName the name of the module.
     * @param {Object} url the URL to the module.
     */
  req.load = function (context, moduleName, url) {
    var config = context && context.config || {}, node;
    if (isBrowser) {
      //In the browser so use a script tag
      node = req.createNode(config, moduleName, url);
      node.setAttribute('data-requirecontext', context.contextName);
      node.setAttribute('data-requiremodule', moduleName);
      //Set up load listener. Test attachEvent first because IE9 has
      //a subtle issue in its addEventListener and script onload firings
      //that do not match the behavior of all other browsers with
      //addEventListener support, which fire the onload event for a
      //script right after the script execution. See:
      //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
      //UNFORTUNATELY Opera implements attachEvent but does not follow the script
      //script execution mode.
      if (node.attachEvent && !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) && !isOpera) {
        //Probably IE. IE (at least 6-8) do not fire
        //script onload right after executing the script, so
        //we cannot tie the anonymous define call to a name.
        //However, IE reports the script as being in 'interactive'
        //readyState at the time of the define call.
        useInteractive = true;
        node.attachEvent('onreadystatechange', context.onScriptLoad);  //It would be great to add an error handler here to catch
                                                                       //404s in IE9+. However, onreadystatechange will fire before
                                                                       //the error handler, so that does not help. If addEventListener
                                                                       //is used, then IE will fire error before load, but we cannot
                                                                       //use that pathway given the connect.microsoft.com issue
                                                                       //mentioned above about not doing the 'script execute,
                                                                       //then fire the script load event listener before execute
                                                                       //next script' that other browsers do.
                                                                       //Best hope: IE10 fixes the issues,
                                                                       //and then destroys all installs of IE 6-9.
                                                                       //node.attachEvent('onerror', context.onScriptError);
      } else {
        node.addEventListener('load', context.onScriptLoad, false);
        node.addEventListener('error', context.onScriptError, false);
      }
      node.src = url;
      //For some cache cases in IE 6-8, the script executes before the end
      //of the appendChild execution, so to tie an anonymous define
      //call to the module name (which is stored on the node), hold on
      //to a reference to this node, but clear after the DOM insertion.
      currentlyAddingScript = node;
      if (baseElement) {
        head.insertBefore(node, baseElement);
      } else {
        head.appendChild(node);
      }
      currentlyAddingScript = null;
      return node;
    } else if (isWebWorker) {
      try {
        //In a web worker, use importScripts. This is not a very
        //efficient use of importScripts, importScripts will block until
        //its script is downloaded and evaluated. However, if web workers
        //are in play, the expectation that a build has been done so that
        //only one script needs to be loaded anyway. This may need to be
        //reevaluated if other use cases become common.
        importScripts(url);
        //Account for anonymous modules
        context.completeLoad(moduleName);
      } catch (e) {
        context.onError(makeError('importscripts', 'importScripts failed for ' + moduleName + ' at ' + url, e, [moduleName]));
      }
    }
  };
  function getInteractiveScript() {
    if (interactiveScript && interactiveScript.readyState === 'interactive') {
      return interactiveScript;
    }
    eachReverse(scripts(), function (script) {
      if (script.readyState === 'interactive') {
        return interactiveScript = script;
      }
    });
    return interactiveScript;
  }
  //Look for a data-main script attribute, which could also adjust the baseUrl.
  if (isBrowser && !cfg.skipDataMain) {
    //Figure out baseUrl. Get it from the script tag with require.js in it.
    eachReverse(scripts(), function (script) {
      //Set the 'head' where we can append children by
      //using the script's parent.
      if (!head) {
        head = script.parentNode;
      }
      //Look for a data-main attribute to set main script for the page
      //to load. If it is there, the path to data main becomes the
      //baseUrl, if it is not already set.
      dataMain = script.getAttribute('data-main');
      if (dataMain) {
        //Preserve dataMain in case it is a path (i.e. contains '?')
        mainScript = dataMain;
        //Set final baseUrl if there is not already an explicit one.
        if (!cfg.baseUrl) {
          //Pull off the directory of data-main for use as the
          //baseUrl.
          src = mainScript.split('/');
          mainScript = src.pop();
          subPath = src.length ? src.join('/') + '/' : './';
          cfg.baseUrl = subPath;
        }
        //Strip off any trailing .js since mainScript is now
        //like a module name.
        mainScript = mainScript.replace(jsSuffixRegExp, '');
        //If mainScript is still a path, fall back to dataMain
        if (req.jsExtRegExp.test(mainScript)) {
          mainScript = dataMain;
        }
        //Put the data-main script in the files to load.
        cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript];
        return true;
      }
    });
  }
  /**
     * The function that handles definitions of modules. Differs from
     * require() in that a string for the module should be the first argument,
     * and the function to execute after dependencies are loaded should
     * return a value to define the module corresponding to the first argument's
     * name.
     */
  define = function (name, deps, callback) {
    var node, context;
    //Allow for anonymous modules
    if (typeof name !== 'string') {
      //Adjust args appropriately
      callback = deps;
      deps = name;
      name = null;
    }
    //This module may not have dependencies
    if (!isArray(deps)) {
      callback = deps;
      deps = null;
    }
    //If no name, and callback is a function, then figure out if it a
    //CommonJS thing with dependencies.
    if (!deps && isFunction(callback)) {
      deps = [];
      //Remove comments from the callback string,
      //look for require calls, and pull them into the dependencies,
      //but only if there are function args.
      if (callback.length) {
        callback.toString().replace(commentRegExp, '').replace(cjsRequireRegExp, function (match, dep) {
          deps.push(dep);
        });
        //May be a CommonJS thing even without require calls, but still
        //could use exports, and module. Avoid doing exports and module
        //work though if it just needs require.
        //REQUIRES the function to expect the CommonJS variables in the
        //order listed below.
        deps = (callback.length === 1 ? ['require'] : [
          'require',
          'exports',
          'module'
        ]).concat(deps);
      }
    }
    //If in IE 6-8 and hit an anonymous define() call, do the interactive
    //work.
    if (useInteractive) {
      node = currentlyAddingScript || getInteractiveScript();
      if (node) {
        if (!name) {
          name = node.getAttribute('data-requiremodule');
        }
        context = contexts[node.getAttribute('data-requirecontext')];
      }
    }
    //Always save off evaluating the def call until the script onload handler.
    //This allows multiple modules to be in a file without prematurely
    //tracing dependencies, and allows for anonymous module support,
    //where the module name is not known until the script onload event
    //occurs. If no context, use the global queue, and get it processed
    //in the onscript load callback.
    (context ? context.defQueue : globalDefQueue).push([
      name,
      deps,
      callback
    ]);
  };
  define.amd = { jQuery: true };
  /**
     * Executes the text. Normally just uses eval, but can be modified
     * to use a better, environment-specific call. Only used for transpiling
     * loader plugins, not for plain JS modules.
     * @param {String} text the text to execute/evaluate.
     */
  req.exec = function (text) {
    /*jslint evil: true */
    return eval(text);
  };
  //Set up with config info.
  req(cfg);
}(this));
(function () {
  var t, e, n, i, o, r = function (t, e) {
      return function () {
        return t.apply(e, arguments);
      };
    }, s = [].indexOf || function (t) {
      for (var e = 0, n = this.length; e < n; e++)
        if (e in this && this[e] === t)
          return e;
      return -1;
    };
  e = function () {
    function t() {
    }
    return t.prototype.extend = function (t, e) {
      var n, i;
      for (n in e)
        i = e[n], null == t[n] && (t[n] = i);
      return t;
    }, t.prototype.isMobile = function (t) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t);
    }, t.prototype.addEvent = function (t, e, n) {
      return null != t.addEventListener ? t.addEventListener(e, n, !1) : null != t.attachEvent ? t.attachEvent('on' + e, n) : t[e] = n;
    }, t.prototype.removeEvent = function (t, e, n) {
      return null != t.removeEventListener ? t.removeEventListener(e, n, !1) : null != t.detachEvent ? t.detachEvent('on' + e, n) : delete t[e];
    }, t.prototype.innerHeight = function () {
      return 'innerHeight' in window ? window.innerHeight : document.documentElement.clientHeight;
    }, t;
  }(), n = this.WeakMap || this.MozWeakMap || (n = function () {
    function t() {
      this.keys = [], this.values = [];
    }
    return t.prototype.get = function (t) {
      var e, n, i, o, r;
      for (r = this.keys, e = i = 0, o = r.length; i < o; e = ++i)
        if (n = r[e], n === t)
          return this.values[e];
    }, t.prototype.set = function (t, e) {
      var n, i, o, r, s;
      for (s = this.keys, n = o = 0, r = s.length; o < r; n = ++o)
        if (i = s[n], i === t)
          return void (this.values[n] = e);
      return this.keys.push(t), this.values.push(e);
    }, t;
  }()), t = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (t = function () {
    function t() {
      'undefined' != typeof console && null !== console && console.warn('MutationObserver is not supported by your browser.'), 'undefined' != typeof console && null !== console && console.warn('WOW.js cannot detect dom mutations, please call .sync() after loading new content.');
    }
    return t.notSupported = !0, t.prototype.observe = function () {
    }, t;
  }()), i = this.getComputedStyle || function (t, e) {
    return this.getPropertyValue = function (e) {
      var n;
      return 'float' === e && (e = 'styleFloat'), o.test(e) && e.replace(o, function (t, e) {
        return e.toUpperCase();
      }), (null != (n = t.currentStyle) ? n[e] : void 0) || null;
    }, this;
  }, o = /(\-([a-z]){1})/g, this.WOW = function () {
    function o(t) {
      null == t && (t = {}), this.scrollCallback = r(this.scrollCallback, this), this.scrollHandler = r(this.scrollHandler, this), this.start = r(this.start, this), this.scrolled = !0, this.config = this.util().extend(t, this.defaults), this.animationNameCache = new n();
    }
    return o.prototype.defaults = {
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: !0,
      live: !0
    }, o.prototype.init = function () {
      var t;
      return this.element = window.document.documentElement, 'interactive' === (t = document.readyState) || 'complete' === t ? this.start() : this.util().addEvent(document, 'DOMContentLoaded', this.start), this.finished = [];
    }, o.prototype.start = function () {
      var e, n, i, o;
      if (this.stopped = !1, this.boxes = function () {
          var t, n, i, o;
          for (i = this.element.querySelectorAll('.' + this.config.boxClass), o = [], t = 0, n = i.length; t < n; t++)
            e = i[t], o.push(e);
          return o;
        }.call(this), this.all = function () {
          var t, n, i, o;
          for (i = this.boxes, o = [], t = 0, n = i.length; t < n; t++)
            e = i[t], o.push(e);
          return o;
        }.call(this), this.boxes.length)
        if (this.disabled())
          this.resetStyle();
        else {
          for (o = this.boxes, n = 0, i = o.length; n < i; n++)
            e = o[n], this.applyStyle(e, !0);
          this.util().addEvent(window, 'scroll', this.scrollHandler), this.util().addEvent(window, 'resize', this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50);
        }
      if (this.config.live)
        return new t(function (t) {
          return function (e) {
            var n, i, o, r, s;
            for (s = [], o = 0, r = e.length; o < r; o++)
              i = e[o], s.push(function () {
                var t, e, o, r;
                for (o = i.addedNodes || [], r = [], t = 0, e = o.length; t < e; t++)
                  n = o[t], r.push(this.doSync(n));
                return r;
              }.call(t));
            return s;
          };
        }(this)).observe(document.body, {
          childList: !0,
          subtree: !0
        });
    }, o.prototype.stop = function () {
      if (this.stopped = !0, this.util().removeEvent(window, 'scroll', this.scrollHandler), this.util().removeEvent(window, 'resize', this.scrollHandler), null != this.interval)
        return clearInterval(this.interval);
    }, o.prototype.sync = function (e) {
      if (t.notSupported)
        return this.doSync(this.element);
    }, o.prototype.doSync = function (t) {
      var e, n, i, o, r;
      if (!this.stopped) {
        if (null == t && (t = this.element), 1 !== t.nodeType)
          return;
        for (t = t.parentNode || t, o = t.querySelectorAll('.' + this.config.boxClass), r = [], n = 0, i = o.length; n < i; n++)
          e = o[n], s.call(this.all, e) < 0 ? (this.applyStyle(e, !0), this.boxes.push(e), this.all.push(e), r.push(this.scrolled = !0)) : r.push(void 0);
        return r;
      }
    }, o.prototype.show = function (t) {
      return this.applyStyle(t), t.className = '' + t.className + ' ' + this.config.animateClass;
    }, o.prototype.applyStyle = function (t, e) {
      var n, i, o;
      return i = t.getAttribute('data-wow-duration'), n = t.getAttribute('data-wow-delay'), o = t.getAttribute('data-wow-iteration'), this.animate(function (r) {
        return function () {
          return r.customStyle(t, e, i, n, o);
        };
      }(this));
    }, o.prototype.animate = function () {
      return 'requestAnimationFrame' in window ? function (t) {
        return window.requestAnimationFrame(t);
      } : function (t) {
        return t();
      };
    }(), o.prototype.resetStyle = function () {
      var t, e, n, i, o;
      for (i = this.boxes, o = [], e = 0, n = i.length; e < n; e++)
        t = i[e], o.push(t.setAttribute('style', 'visibility: visible;'));
      return o;
    }, o.prototype.customStyle = function (t, e, n, i, o) {
      return e && this.cacheAnimationName(t), t.style.visibility = e ? 'hidden' : 'visible', n && this.vendorSet(t.style, { animationDuration: n }), i && this.vendorSet(t.style, { animationDelay: i }), o && this.vendorSet(t.style, { animationIterationCount: o }), this.vendorSet(t.style, { animationName: e ? 'none' : this.cachedAnimationName(t) }), t;
    }, o.prototype.vendors = [
      'moz',
      'webkit'
    ], o.prototype.vendorSet = function (t, e) {
      var n, i, o, r;
      r = [];
      for (n in e)
        i = e[n], t['' + n] = i, r.push(function () {
          var e, r, s, l;
          for (s = this.vendors, l = [], e = 0, r = s.length; e < r; e++)
            o = s[e], l.push(t['' + o + n.charAt(0).toUpperCase() + n.substr(1)] = i);
          return l;
        }.call(this));
      return r;
    }, o.prototype.vendorCSS = function (t, e) {
      var n, o, r, s, l, a;
      for (o = i(t), n = o.getPropertyCSSValue(e), a = this.vendors, s = 0, l = a.length; s < l; s++)
        r = a[s], n = n || o.getPropertyCSSValue('-' + r + '-' + e);
      return n;
    }, o.prototype.animationName = function (t) {
      var e;
      try {
        e = this.vendorCSS(t, 'animation-name').cssText;
      } catch (n) {
        e = i(t).getPropertyValue('animation-name');
      }
      return 'none' === e ? '' : e;
    }, o.prototype.cacheAnimationName = function (t) {
      return this.animationNameCache.set(t, this.animationName(t));
    }, o.prototype.cachedAnimationName = function (t) {
      return this.animationNameCache.get(t);
    }, o.prototype.scrollHandler = function () {
      return this.scrolled = !0;
    }, o.prototype.scrollCallback = function () {
      var t;
      if (this.scrolled && (this.scrolled = !1, this.boxes = function () {
          var e, n, i, o;
          for (i = this.boxes, o = [], e = 0, n = i.length; e < n; e++)
            t = i[e], t && (this.isVisible(t) ? this.show(t) : o.push(t));
          return o;
        }.call(this), !this.boxes.length && !this.config.live))
        return this.stop();
    }, o.prototype.offsetTop = function (t) {
      for (var e; void 0 === t.offsetTop;)
        t = t.parentNode;
      for (e = t.offsetTop; t = t.offsetParent;)
        e += t.offsetTop;
      return e;
    }, o.prototype.isVisible = function (t) {
      var e, n, i, o, r;
      return n = t.getAttribute('data-wow-offset') || this.config.offset, r = window.pageYOffset, o = r + Math.min(this.element.clientHeight, this.util().innerHeight()) - n, i = this.offsetTop(t), e = i + t.clientHeight, i <= o && e >= r;
    }, o.prototype.util = function () {
      return null != this._util ? this._util : this._util = new e();
    }, o.prototype.disabled = function () {
      return !this.config.mobile && this.util().isMobile(navigator.userAgent);
    }, o;
  }();
}.call(this), define('wow', function () {
}));
define([
  'routes',
  'loader',
  'angularAMD',
  'ui.route'
], function (config, loader, angularAMD) {
  var app = angular.module('webapp', ['ui.router']);
  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      // 配置路由
      if (config.routes != undefined) {
        angular.forEach(config.routes, function (route, path) {
          $stateProvider.state(path, {
            templateUrl: route.templateUrl,
            url: route.url,
            resolve: loader(route.dependencies)
          });
        });
      }
      ;
      // 默认路由
      if (config.defaultRoute != undefined) {
        $urlRouterProvider.when('', config.defaultRoute);
      }
      ;
    }
  ]);
  return angularAMD.bootstrap(app);
});
define([], function () {
  return function (dependencies) {
    var definition = {
        resolver: [
          '$q',
          '$rootScope',
          function ($q, $rootScope) {
            var defered = $q.defer();
            require(dependencies, function () {
              $rootScope.$apply(function () {
                defered.resolve();
              });
            });
            return defered.promise;
          }
        ]
      };
    return definition;
  };
});
define([], function () {
  return {
    defaultRoute: '/index',
    routes: {
      'home': {
        templateUrl: 'views/home.html',
        url: '/index',
        dependencies: ['controller/homeController'],
        allowAnonymous: true
      },
      'gemeCenter': {
        templateUrl: 'views/game_center.html',
        url: '/gameCenter',
        dependencies: ['controller/homeController'],
        allowAnonymous: true
      },
      'newsActivity': {
        templateUrl: 'views/news_activity.html',
        url: '/newsActivity',
        dependencies: ['controller/homeController'],
        allowAnonymous: true
      },
      'joinUs': {
        templateUrl: 'views/join_us.html',
        url: '/joinus',
        dependencies: ['controller/homeController'],
        allowAnonymous: true
      },
      'aboutus': {
        templateUrl: 'views/about_us.html',
        url: '/aboutus',
        dependencies: [],
        allowAnonymous: true
      },
      'download_hn': {
        templateUrl: 'views/download/download_hn.html',
        url: '/download_hn',
        dependencies: ['controller/homeController'],
        allowAnonymous: true
      },
      'download_gd': {
        templateUrl: 'views/download/download_gd.html',
        url: '/download_gd',
        dependencies: ['controller/homeController'],
        allowAnonymous: true
      },
      'download_sx': {
        templateUrl: 'views/download/download_sx.html',
        url: '/download_sx',
        dependencies: ['controller/homeController'],
        allowAnonymous: true
      },
      'download_pdk': {
        templateUrl: 'views/download/download_pdk.html',
        url: '/download_pdk',
        dependencies: ['controller/homeController'],
        allowAnonymous: true
      },
      'download_hain': {
        templateUrl: 'views/download/download_hain.html',
        url: '/download_hain',
        dependencies: ['controller/homeController'],
        allowAnonymous: true
      },
      'download_sc': {
        templateUrl: 'views/download/download_sc.html',
        url: '/download_sc',
        dependencies: ['controller/homeController'],
        allowAnonymous: true
      },
      'promoter': {
        templateUrl: 'views/news/promoter.html',
        url: '/promoter',
        dependencies: ['controller/homeController'],
        allowAnonymous: true
      },
      'tv-game': {
        templateUrl: 'views/news/tv-game.html',
        url: '/tv',
        dependencies: ['controller/homeController'],
        allowAnonymous: true
      },
      'winner': {
        templateUrl: 'views/news/winner.html',
        url: '/winner',
        dependencies: ['controller/homeController'],
        allowAnonymous: true
      },
      'platform': {
        templateUrl: 'views/news/platform.html',
        url: '/platform',
        dependencies: ['controller/homeController'],
        allowAnonymous: true
      },
      'public_good': {
        templateUrl: 'views/news/public.html',
        url: '/public',
        dependencies: ['controller/homeController'],
        allowAnonymous: true
      },
      'loseinself': {
        templateUrl: 'views/loseinself.html',
        url: '/loseinself',
        dependencies: [],
        allowAnonymous: true
      },
      'parentcustody': {
        templateUrl: 'views/parent_custody.html',
        url: '/parentcustody',
        dependencies: ['controller/homeController'],
        allowAnonymous: true
      }
    }
  };
});
/**
 * Created by sunhangye on 17/5/18.
 */
define([
  'app',
  'jquery',
  'goTop',
  'wow',
  'focusimg'
], function (app, $, goTop, wow) {
  /*首页*/
  app.controller('homeController', [
    '$scope',
    '$rootScope',
    function ($scope, $rootScope) {
      $rootScope.$on('$stateChangeSuccess', function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      });
      $(document).ready(function () {
        $('.slides').focusimg();
        picAutoHeight();
      });
      resize();
      function picAutoHeight() {
        var w = $('body').width();
        if (w >= 1000) {
          var h = Math.ceil(532 * (w / 1920));
        } else {
          var h = Math.ceil(700 * (1000 / 1920));
        }
        $('#pic-scroll').height(h);
      }
      ;
      function resize() {
        $(window).resize(function () {
          picAutoHeight();
        });
      }
      ;
    }
  ]);
  /*游戏中心*/
  app.controller('gameController', [
    '$scope',
    '$rootScope',
    function ($scope, $rootScope) {
      new WOW().init();
      $rootScope.$on('$stateChangeSuccess', function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      });
    }
  ]);
  /*关于我们*/
  app.controller('aboutController', [
    '$scope',
    '$rootScope',
    function ($scope, $rootScope) {
      new WOW().init();
      $rootScope.$on('$stateChangeSuccess', function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      });
    }
  ]);
  /*新闻活动*/
  app.controller('newsController', [
    '$scope',
    '$rootScope',
    function ($scope, $rootScope) {
      new WOW().init();
      $rootScope.$on('$stateChangeSuccess', function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      });
    }
  ]);
  /*新闻详情*/
  app.controller('detailController', [
    '$scope',
    '$rootScope',
    function ($scope, $rootScope) {
      new WOW().init();
      $rootScope.$on('$stateChangeSuccess', function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      });
    }
  ]);
  /*加入我们*/
  app.controller('joinController', [
    '$scope',
    '$rootScope',
    function ($scope, $rootScope) {
      new WOW().init();
      $rootScope.$on('$stateChangeSuccess', function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      });
      var li = $('.menu li');
      li.click(function () {
        $(this).addClass('choose').siblings().removeClass('choose');
        var index = li.index(this);
        $('.list>div').eq(index).removeClass('hide').siblings().addClass('hide');
      });
    }
  ]);
  /*下载页*/
  app.controller('downloadController', [
    '$scope',
    '$rootScope',
    function ($scope, $rootScope) {
      new WOW().init();
      $rootScope.$on('$stateChangeSuccess', function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      });
    }
  ]);
  /*家长监护*/
  app.controller('parentController', [
    '$scope',
    '$rootScope',
    function ($scope, $rootScope) {
      new WOW().init();
      $rootScope.$on('$stateChangeSuccess', function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      });
      var li = $('.menu li');
      li.click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        var index = li.index(this);
        $('.list>article').eq(index).removeClass('hide').siblings().addClass('hide');
      });
    }
  ]);
});