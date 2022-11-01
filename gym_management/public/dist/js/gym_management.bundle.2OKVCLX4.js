(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

  // ../../node_modules/dayjs/dayjs.min.js
  var require_dayjs_min = __commonJS({
    "../../node_modules/dayjs/dayjs.min.js"(exports, module) {
      !function(t, e) {
        typeof exports == "object" && typeof module != "undefined" ? module.exports = e() : typeof define == "function" && define.amd ? define(e) : (t = typeof globalThis != "undefined" ? globalThis : t || self).dayjs = e();
      }(exports, function() {
        "use strict";
        var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", f = "month", h = "quarter", c = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
          var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
          return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
        } }, m = function(t2, e2, n2) {
          var r2 = String(t2);
          return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
        }, v = { s: m, z: function(t2) {
          var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
          return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
        }, m: function t2(e2, n2) {
          if (e2.date() < n2.date())
            return -t2(n2, e2);
          var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, f), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), f);
          return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
        }, a: function(t2) {
          return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
        }, p: function(t2) {
          return { M: f, y: c, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: h }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
        }, u: function(t2) {
          return t2 === void 0;
        } }, g = "en", D = {};
        D[g] = M;
        var p = function(t2) {
          return t2 instanceof _;
        }, S = function t2(e2, n2, r2) {
          var i2;
          if (!e2)
            return g;
          if (typeof e2 == "string") {
            var s2 = e2.toLowerCase();
            D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
            var u2 = e2.split("-");
            if (!i2 && u2.length > 1)
              return t2(u2[0]);
          } else {
            var a2 = e2.name;
            D[a2] = e2, i2 = a2;
          }
          return !r2 && i2 && (g = i2), i2 || !r2 && g;
        }, w = function(t2, e2) {
          if (p(t2))
            return t2.clone();
          var n2 = typeof e2 == "object" ? e2 : {};
          return n2.date = t2, n2.args = arguments, new _(n2);
        }, O = v;
        O.l = S, O.i = p, O.w = function(t2, e2) {
          return w(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
        };
        var _ = function() {
          function M2(t2) {
            this.$L = S(t2.locale, null, true), this.parse(t2);
          }
          var m2 = M2.prototype;
          return m2.parse = function(t2) {
            this.$d = function(t3) {
              var e2 = t3.date, n2 = t3.utc;
              if (e2 === null)
                return new Date(NaN);
              if (O.u(e2))
                return new Date();
              if (e2 instanceof Date)
                return new Date(e2);
              if (typeof e2 == "string" && !/Z$/i.test(e2)) {
                var r2 = e2.match($);
                if (r2) {
                  var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                  return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
                }
              }
              return new Date(e2);
            }(t2), this.$x = t2.x || {}, this.init();
          }, m2.init = function() {
            var t2 = this.$d;
            this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
          }, m2.$utils = function() {
            return O;
          }, m2.isValid = function() {
            return !(this.$d.toString() === l);
          }, m2.isSame = function(t2, e2) {
            var n2 = w(t2);
            return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
          }, m2.isAfter = function(t2, e2) {
            return w(t2) < this.startOf(e2);
          }, m2.isBefore = function(t2, e2) {
            return this.endOf(e2) < w(t2);
          }, m2.$g = function(t2, e2, n2) {
            return O.u(t2) ? this[e2] : this.set(n2, t2);
          }, m2.unix = function() {
            return Math.floor(this.valueOf() / 1e3);
          }, m2.valueOf = function() {
            return this.$d.getTime();
          }, m2.startOf = function(t2, e2) {
            var n2 = this, r2 = !!O.u(e2) || e2, h2 = O.p(t2), l2 = function(t3, e3) {
              var i2 = O.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
              return r2 ? i2 : i2.endOf(a);
            }, $2 = function(t3, e3) {
              return O.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
            }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
            switch (h2) {
              case c:
                return r2 ? l2(1, 0) : l2(31, 11);
              case f:
                return r2 ? l2(1, M3) : l2(0, M3 + 1);
              case o:
                var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
                return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
              case a:
              case d:
                return $2(v2 + "Hours", 0);
              case u:
                return $2(v2 + "Minutes", 1);
              case s:
                return $2(v2 + "Seconds", 2);
              case i:
                return $2(v2 + "Milliseconds", 3);
              default:
                return this.clone();
            }
          }, m2.endOf = function(t2) {
            return this.startOf(t2, false);
          }, m2.$set = function(t2, e2) {
            var n2, o2 = O.p(t2), h2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = h2 + "Date", n2[d] = h2 + "Date", n2[f] = h2 + "Month", n2[c] = h2 + "FullYear", n2[u] = h2 + "Hours", n2[s] = h2 + "Minutes", n2[i] = h2 + "Seconds", n2[r] = h2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
            if (o2 === f || o2 === c) {
              var y2 = this.clone().set(d, 1);
              y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
            } else
              l2 && this.$d[l2]($2);
            return this.init(), this;
          }, m2.set = function(t2, e2) {
            return this.clone().$set(t2, e2);
          }, m2.get = function(t2) {
            return this[O.p(t2)]();
          }, m2.add = function(r2, h2) {
            var d2, l2 = this;
            r2 = Number(r2);
            var $2 = O.p(h2), y2 = function(t2) {
              var e2 = w(l2);
              return O.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
            };
            if ($2 === f)
              return this.set(f, this.$M + r2);
            if ($2 === c)
              return this.set(c, this.$y + r2);
            if ($2 === a)
              return y2(1);
            if ($2 === o)
              return y2(7);
            var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
            return O.w(m3, this);
          }, m2.subtract = function(t2, e2) {
            return this.add(-1 * t2, e2);
          }, m2.format = function(t2) {
            var e2 = this, n2 = this.$locale();
            if (!this.isValid())
              return n2.invalidDate || l;
            var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = O.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, f2 = n2.months, h2 = function(t3, n3, i3, s3) {
              return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
            }, c2 = function(t3) {
              return O.s(s2 % 12 || 12, t3, "0");
            }, d2 = n2.meridiem || function(t3, e3, n3) {
              var r3 = t3 < 12 ? "AM" : "PM";
              return n3 ? r3.toLowerCase() : r3;
            }, $2 = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: a2 + 1, MM: O.s(a2 + 1, 2, "0"), MMM: h2(n2.monthsShort, a2, f2, 3), MMMM: h2(f2, a2), D: this.$D, DD: O.s(this.$D, 2, "0"), d: String(this.$W), dd: h2(n2.weekdaysMin, this.$W, o2, 2), ddd: h2(n2.weekdaysShort, this.$W, o2, 3), dddd: o2[this.$W], H: String(s2), HH: O.s(s2, 2, "0"), h: c2(1), hh: c2(2), a: d2(s2, u2, true), A: d2(s2, u2, false), m: String(u2), mm: O.s(u2, 2, "0"), s: String(this.$s), ss: O.s(this.$s, 2, "0"), SSS: O.s(this.$ms, 3, "0"), Z: i2 };
            return r2.replace(y, function(t3, e3) {
              return e3 || $2[t3] || i2.replace(":", "");
            });
          }, m2.utcOffset = function() {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
          }, m2.diff = function(r2, d2, l2) {
            var $2, y2 = O.p(d2), M3 = w(r2), m3 = (M3.utcOffset() - this.utcOffset()) * e, v2 = this - M3, g2 = O.m(this, M3);
            return g2 = ($2 = {}, $2[c] = g2 / 12, $2[f] = g2, $2[h] = g2 / 3, $2[o] = (v2 - m3) / 6048e5, $2[a] = (v2 - m3) / 864e5, $2[u] = v2 / n, $2[s] = v2 / e, $2[i] = v2 / t, $2)[y2] || v2, l2 ? g2 : O.a(g2);
          }, m2.daysInMonth = function() {
            return this.endOf(f).$D;
          }, m2.$locale = function() {
            return D[this.$L];
          }, m2.locale = function(t2, e2) {
            if (!t2)
              return this.$L;
            var n2 = this.clone(), r2 = S(t2, e2, true);
            return r2 && (n2.$L = r2), n2;
          }, m2.clone = function() {
            return O.w(this.$d, this);
          }, m2.toDate = function() {
            return new Date(this.valueOf());
          }, m2.toJSON = function() {
            return this.isValid() ? this.toISOString() : null;
          }, m2.toISOString = function() {
            return this.$d.toISOString();
          }, m2.toString = function() {
            return this.$d.toUTCString();
          }, M2;
        }(), T = _.prototype;
        return w.prototype = T, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", f], ["$y", c], ["$D", d]].forEach(function(t2) {
          T[t2[1]] = function(e2) {
            return this.$g(e2, t2[0], t2[1]);
          };
        }), w.extend = function(t2, e2) {
          return t2.$i || (t2(e2, _, w), t2.$i = true), w;
        }, w.locale = S, w.isDayjs = p, w.unix = function(t2) {
          return w(1e3 * t2);
        }, w.en = D[g], w.Ls = D, w.p = {}, w;
      });
    }
  });

  // ../gym_management/gym_management/public/js/gym_management.bundle.js
  var import_dayjs = __toESM(require_dayjs_min());

  // ../../node_modules/js-confetti/dist/es/index.js
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  function normalizeComputedStyleValue(string) {
    return +string.replace(/px/, "");
  }
  function fixDPR(canvas) {
    var dpr = window.devicePixelRatio;
    var computedStyles = getComputedStyle(canvas);
    var width = normalizeComputedStyleValue(computedStyles.getPropertyValue("width"));
    var height = normalizeComputedStyleValue(computedStyles.getPropertyValue("height"));
    canvas.setAttribute("width", (width * dpr).toString());
    canvas.setAttribute("height", (height * dpr).toString());
  }
  function generateRandomNumber(min, max) {
    var fractionDigits = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    var randomNumber = Math.random() * (max - min) + min;
    return Math.floor(randomNumber * Math.pow(10, fractionDigits)) / Math.pow(10, fractionDigits);
  }
  function generateRandomArrayElement(arr) {
    return arr[generateRandomNumber(0, arr.length)];
  }
  var FREE_FALLING_OBJECT_ACCELERATION = 125e-5;
  var MIN_DRAG_FORCE_COEFFICIENT = 5e-4;
  var MAX_DRAG_FORCE_COEFFICIENT = 9e-4;
  var ROTATION_SLOWDOWN_ACCELERATION = 1e-5;
  var INITIAL_SHAPE_RADIUS = 6;
  var INITIAL_EMOJI_SIZE = 80;
  var MIN_INITIAL_CONFETTI_SPEED = 0.9;
  var MAX_INITIAL_CONFETTI_SPEED = 1.7;
  var MIN_FINAL_X_CONFETTI_SPEED = 0.2;
  var MAX_FINAL_X_CONFETTI_SPEED = 0.6;
  var MIN_INITIAL_ROTATION_SPEED = 0.03;
  var MAX_INITIAL_ROTATION_SPEED = 0.07;
  var MIN_CONFETTI_ANGLE = 15;
  var MAX_CONFETTI_ANGLE = 82;
  var MAX_CONFETTI_POSITION_SHIFT = 150;
  var SHAPE_VISIBILITY_TRESHOLD = 100;
  var DEFAULT_CONFETTI_NUMBER = 250;
  var DEFAULT_EMOJIS_NUMBER = 40;
  var DEFAULT_CONFETTI_COLORS = ["#fcf403", "#62fc03", "#f4fc03", "#03e7fc", "#03fca5", "#a503fc", "#fc03ad", "#fc03c2"];
  function getWindowWidthCoefficient(canvasWidth) {
    var HD_SCREEN_WIDTH = 1920;
    return Math.log(canvasWidth) / Math.log(HD_SCREEN_WIDTH);
  }
  var ConfettiShape = /* @__PURE__ */ function() {
    function ConfettiShape2(args) {
      _classCallCheck(this, ConfettiShape2);
      var initialPosition = args.initialPosition, direction = args.direction, confettiRadius = args.confettiRadius, confettiColors = args.confettiColors, emojis = args.emojis, emojiSize = args.emojiSize, canvasWidth = args.canvasWidth;
      var randomConfettiSpeed = generateRandomNumber(MIN_INITIAL_CONFETTI_SPEED, MAX_INITIAL_CONFETTI_SPEED, 3);
      var initialSpeed = randomConfettiSpeed * getWindowWidthCoefficient(canvasWidth);
      this.confettiSpeed = {
        x: initialSpeed,
        y: initialSpeed
      };
      this.finalConfettiSpeedX = generateRandomNumber(MIN_FINAL_X_CONFETTI_SPEED, MAX_FINAL_X_CONFETTI_SPEED, 3);
      this.rotationSpeed = emojis.length ? 0.01 : generateRandomNumber(MIN_INITIAL_ROTATION_SPEED, MAX_INITIAL_ROTATION_SPEED, 3) * getWindowWidthCoefficient(canvasWidth);
      this.dragForceCoefficient = generateRandomNumber(MIN_DRAG_FORCE_COEFFICIENT, MAX_DRAG_FORCE_COEFFICIENT, 6);
      this.radius = {
        x: confettiRadius,
        y: confettiRadius
      };
      this.initialRadius = confettiRadius;
      this.rotationAngle = direction === "left" ? generateRandomNumber(0, 0.2, 3) : generateRandomNumber(-0.2, 0, 3);
      this.emojiSize = emojiSize;
      this.emojiRotationAngle = generateRandomNumber(0, 2 * Math.PI);
      this.radiusYUpdateDirection = "down";
      var angle = direction === "left" ? generateRandomNumber(MAX_CONFETTI_ANGLE, MIN_CONFETTI_ANGLE) * Math.PI / 180 : generateRandomNumber(-MIN_CONFETTI_ANGLE, -MAX_CONFETTI_ANGLE) * Math.PI / 180;
      this.absCos = Math.abs(Math.cos(angle));
      this.absSin = Math.abs(Math.sin(angle));
      var positionShift = generateRandomNumber(-MAX_CONFETTI_POSITION_SHIFT, 0);
      var shiftedInitialPosition = {
        x: initialPosition.x + (direction === "left" ? -positionShift : positionShift) * this.absCos,
        y: initialPosition.y - positionShift * this.absSin
      };
      this.currentPosition = Object.assign({}, shiftedInitialPosition);
      this.initialPosition = Object.assign({}, shiftedInitialPosition);
      this.color = emojis.length ? null : generateRandomArrayElement(confettiColors);
      this.emoji = emojis.length ? generateRandomArrayElement(emojis) : null;
      this.createdAt = new Date().getTime();
      this.direction = direction;
    }
    _createClass(ConfettiShape2, [{
      key: "draw",
      value: function draw(canvasContext) {
        var currentPosition = this.currentPosition, radius = this.radius, color = this.color, emoji = this.emoji, rotationAngle = this.rotationAngle, emojiRotationAngle = this.emojiRotationAngle, emojiSize = this.emojiSize;
        var dpr = window.devicePixelRatio;
        if (color) {
          canvasContext.fillStyle = color;
          canvasContext.beginPath();
          canvasContext.ellipse(currentPosition.x * dpr, currentPosition.y * dpr, radius.x * dpr, radius.y * dpr, rotationAngle, 0, 2 * Math.PI);
          canvasContext.fill();
        } else if (emoji) {
          canvasContext.font = "".concat(emojiSize, "px serif");
          canvasContext.save();
          canvasContext.translate(dpr * currentPosition.x, dpr * currentPosition.y);
          canvasContext.rotate(emojiRotationAngle);
          canvasContext.textAlign = "center";
          canvasContext.fillText(emoji, 0, 0);
          canvasContext.restore();
        }
      }
    }, {
      key: "updatePosition",
      value: function updatePosition(iterationTimeDelta, currentTime) {
        var confettiSpeed = this.confettiSpeed, dragForceCoefficient = this.dragForceCoefficient, finalConfettiSpeedX = this.finalConfettiSpeedX, radiusYUpdateDirection = this.radiusYUpdateDirection, rotationSpeed = this.rotationSpeed, createdAt = this.createdAt, direction = this.direction;
        var timeDeltaSinceCreation = currentTime - createdAt;
        if (confettiSpeed.x > finalConfettiSpeedX)
          this.confettiSpeed.x -= dragForceCoefficient * iterationTimeDelta;
        this.currentPosition.x += confettiSpeed.x * (direction === "left" ? -this.absCos : this.absCos) * iterationTimeDelta;
        this.currentPosition.y = this.initialPosition.y - confettiSpeed.y * this.absSin * timeDeltaSinceCreation + FREE_FALLING_OBJECT_ACCELERATION * Math.pow(timeDeltaSinceCreation, 2) / 2;
        this.rotationSpeed -= this.emoji ? 1e-4 : ROTATION_SLOWDOWN_ACCELERATION * iterationTimeDelta;
        if (this.rotationSpeed < 0)
          this.rotationSpeed = 0;
        if (this.emoji) {
          this.emojiRotationAngle += this.rotationSpeed * iterationTimeDelta % (2 * Math.PI);
          return;
        }
        if (radiusYUpdateDirection === "down") {
          this.radius.y -= iterationTimeDelta * rotationSpeed;
          if (this.radius.y <= 0) {
            this.radius.y = 0;
            this.radiusYUpdateDirection = "up";
          }
        } else {
          this.radius.y += iterationTimeDelta * rotationSpeed;
          if (this.radius.y >= this.initialRadius) {
            this.radius.y = this.initialRadius;
            this.radiusYUpdateDirection = "down";
          }
        }
      }
    }, {
      key: "getIsVisibleOnCanvas",
      value: function getIsVisibleOnCanvas(canvasHeight) {
        return this.currentPosition.y < canvasHeight + SHAPE_VISIBILITY_TRESHOLD;
      }
    }]);
    return ConfettiShape2;
  }();
  function createCanvas() {
    var canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "1000";
    canvas.style.pointerEvents = "none";
    document.body.appendChild(canvas);
    return canvas;
  }
  function normalizeConfettiConfig(confettiConfig) {
    var _confettiConfig$confe = confettiConfig.confettiRadius, confettiRadius = _confettiConfig$confe === void 0 ? INITIAL_SHAPE_RADIUS : _confettiConfig$confe, _confettiConfig$confe2 = confettiConfig.confettiNumber, confettiNumber = _confettiConfig$confe2 === void 0 ? confettiConfig.confettiesNumber || (confettiConfig.emojis ? DEFAULT_EMOJIS_NUMBER : DEFAULT_CONFETTI_NUMBER) : _confettiConfig$confe2, _confettiConfig$confe3 = confettiConfig.confettiColors, confettiColors = _confettiConfig$confe3 === void 0 ? DEFAULT_CONFETTI_COLORS : _confettiConfig$confe3, _confettiConfig$emoji = confettiConfig.emojis, emojis = _confettiConfig$emoji === void 0 ? confettiConfig.emojies || [] : _confettiConfig$emoji, _confettiConfig$emoji2 = confettiConfig.emojiSize, emojiSize = _confettiConfig$emoji2 === void 0 ? INITIAL_EMOJI_SIZE : _confettiConfig$emoji2;
    if (confettiConfig.emojies)
      console.error("emojies argument is deprecated, please use emojis instead");
    if (confettiConfig.confettiesNumber)
      console.error("confettiesNumber argument is deprecated, please use confettiNumber instead");
    return {
      confettiRadius,
      confettiNumber,
      confettiColors,
      emojis,
      emojiSize
    };
  }
  var ConfettiBatch = /* @__PURE__ */ function() {
    function ConfettiBatch2(canvasContext) {
      var _this = this;
      _classCallCheck(this, ConfettiBatch2);
      this.canvasContext = canvasContext;
      this.shapes = [];
      this.promise = new Promise(function(completionCallback) {
        return _this.resolvePromise = completionCallback;
      });
    }
    _createClass(ConfettiBatch2, [{
      key: "getBatchCompletePromise",
      value: function getBatchCompletePromise() {
        return this.promise;
      }
    }, {
      key: "addShapes",
      value: function addShapes() {
        var _this$shapes;
        (_this$shapes = this.shapes).push.apply(_this$shapes, arguments);
      }
    }, {
      key: "complete",
      value: function complete() {
        var _a;
        if (this.shapes.length) {
          return false;
        }
        (_a = this.resolvePromise) === null || _a === void 0 ? void 0 : _a.call(this);
        return true;
      }
    }, {
      key: "processShapes",
      value: function processShapes(time, canvasHeight, cleanupInvisibleShapes) {
        var _this2 = this;
        var timeDelta = time.timeDelta, currentTime = time.currentTime;
        this.shapes = this.shapes.filter(function(shape) {
          shape.updatePosition(timeDelta, currentTime);
          shape.draw(_this2.canvasContext);
          if (!cleanupInvisibleShapes) {
            return true;
          }
          return shape.getIsVisibleOnCanvas(canvasHeight);
        });
      }
    }]);
    return ConfettiBatch2;
  }();
  var JSConfetti = /* @__PURE__ */ function() {
    function JSConfetti2() {
      var jsConfettiConfig = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      _classCallCheck(this, JSConfetti2);
      this.activeConfettiBatches = [];
      this.canvas = jsConfettiConfig.canvas || createCanvas();
      this.canvasContext = this.canvas.getContext("2d");
      this.requestAnimationFrameRequested = false;
      this.lastUpdated = new Date().getTime();
      this.iterationIndex = 0;
      this.loop = this.loop.bind(this);
      requestAnimationFrame(this.loop);
    }
    _createClass(JSConfetti2, [{
      key: "loop",
      value: function loop() {
        this.requestAnimationFrameRequested = false;
        fixDPR(this.canvas);
        var currentTime = new Date().getTime();
        var timeDelta = currentTime - this.lastUpdated;
        var canvasHeight = this.canvas.offsetHeight;
        var cleanupInvisibleShapes = this.iterationIndex % 10 === 0;
        this.activeConfettiBatches = this.activeConfettiBatches.filter(function(batch) {
          batch.processShapes({
            timeDelta,
            currentTime
          }, canvasHeight, cleanupInvisibleShapes);
          if (!cleanupInvisibleShapes) {
            return true;
          }
          return !batch.complete();
        });
        this.iterationIndex++;
        this.queueAnimationFrameIfNeeded(currentTime);
      }
    }, {
      key: "queueAnimationFrameIfNeeded",
      value: function queueAnimationFrameIfNeeded(currentTime) {
        if (this.requestAnimationFrameRequested) {
          return;
        }
        if (this.activeConfettiBatches.length < 1) {
          return;
        }
        this.requestAnimationFrameRequested = true;
        this.lastUpdated = currentTime || new Date().getTime();
        requestAnimationFrame(this.loop);
      }
    }, {
      key: "addConfetti",
      value: function addConfetti() {
        var confettiConfig = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var _normalizeConfettiCon = normalizeConfettiConfig(confettiConfig), confettiRadius = _normalizeConfettiCon.confettiRadius, confettiNumber = _normalizeConfettiCon.confettiNumber, confettiColors = _normalizeConfettiCon.confettiColors, emojis = _normalizeConfettiCon.emojis, emojiSize = _normalizeConfettiCon.emojiSize;
        var canvasRect = this.canvas.getBoundingClientRect();
        var canvasWidth = canvasRect.width;
        var canvasHeight = canvasRect.height;
        var yPosition = canvasHeight * 5 / 7;
        var leftConfettiPosition = {
          x: 0,
          y: yPosition
        };
        var rightConfettiPosition = {
          x: canvasWidth,
          y: yPosition
        };
        var confettiGroup = new ConfettiBatch(this.canvasContext);
        for (var i = 0; i < confettiNumber / 2; i++) {
          var confettiOnTheRight = new ConfettiShape({
            initialPosition: leftConfettiPosition,
            direction: "right",
            confettiRadius,
            confettiColors,
            confettiNumber,
            emojis,
            emojiSize,
            canvasWidth
          });
          var confettiOnTheLeft = new ConfettiShape({
            initialPosition: rightConfettiPosition,
            direction: "left",
            confettiRadius,
            confettiColors,
            confettiNumber,
            emojis,
            emojiSize,
            canvasWidth
          });
          confettiGroup.addShapes(confettiOnTheRight, confettiOnTheLeft);
        }
        this.activeConfettiBatches.push(confettiGroup);
        this.queueAnimationFrameIfNeeded();
        return confettiGroup.getBatchCompletePromise();
      }
    }, {
      key: "clearCanvas",
      value: function clearCanvas() {
        this.activeConfettiBatches = [];
      }
    }]);
    return JSConfetti2;
  }();
  var es_default = JSConfetti;

  // ../gym_management/gym_management/public/js/gym_management.bundle.js
  var day_js = (0, import_dayjs.default)();
  console.log("dayjs()", day_js);
  var date1 = (0, import_dayjs.default)().format("{YYYY} MM-DDTHH:mm:ss SSS [Z] A");
  var jsConfetti = new es_default();
  jsConfetti.addConfetti();
})();
//# sourceMappingURL=gym_management.bundle.2OKVCLX4.js.map
