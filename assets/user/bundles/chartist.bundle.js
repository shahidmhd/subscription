! function(a, b)
{
	"function" == typeof define && define.amd ? define("Chartist", [],
		function()
		{
			return a.Chartist = b()
		}) : "object" == typeof module && module.exports ? module.exports =
	b() : a.Chartist = b()
}(this, function()
{
	var a = {
		version: "0.11.0"
	};
	return function(a, b, c)
		{
			"use strict";
			c.namespaces = {
				svg: "http://www.w3.org/2000/svg",
				xmlns: "http://www.w3.org/2000/xmlns/",
				xhtml: "http://www.w3.org/1999/xhtml",
				xlink: "http://www.w3.org/1999/xlink",
				ct: "http://gionkunz.github.com/chartist-js/ct"
			}, c.noop = function(a)
			{
				return a
			}, c.alphaNumerate = function(a)
			{
				return String.fromCharCode(97 + a % 26)
			}, c.extend = function(a)
			{
				var b, d, e;
				for (a = a ||
					{}, b = 1; b < arguments.length; b++)
				{
					d = arguments[b];
					for (var f in d) e = d[f], "object" != typeof e ||
						null === e || e instanceof Array ? a[f] = e : a[
							f] = c.extend(a[f], e)
				}
				return a
			}, c.replaceAll = function(a, b, c)
			{
				return a.replace(new RegExp(b, "g"), c)
			}, c.ensureUnit = function(a, b)
			{
				return "number" == typeof a && (a += b), a
			}, c.quantity = function(a)
			{
				if ("string" == typeof a)
				{
					var b = /^(\d+)\s*(.*)$/g.exec(a);
					return {
						value: +b[1],
						unit: b[2] || void 0
					}
				}
				return {
					value: a
				}
			}, c.querySelector = function(a)
			{
				return a instanceof Node ? a : b.querySelector(a)
			}, c.times = function(a)
			{
				return Array.apply(null, new Array(a))
			}, c.sum = function(a, b)
			{
				return a + (b || 0)
			}, c.mapMultiply = function(a)
			{
				return function(b)
				{
					return b * a
				}
			}, c.mapAdd = function(a)
			{
				return function(b)
				{
					return b + a
				}
			}, c.serialMap = function(a, b)
			{
				var d = [],
					e = Math.max.apply(null, a.map(function(a)
					{
						return a.length
					}));
				return c.times(e).forEach(function(c, e)
				{
					var f = a.map(function(a)
					{
						return a[e]
					});
					d[e] = b.apply(null, f)
				}), d
			}, c.roundWithPrecision = function(a, b)
			{
				var d = Math.pow(10, b || c.precision);
				return Math.round(a * d) / d
			}, c.precision = 8, c.escapingMap = {
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				'"': "&quot;",
				"'": "&#039;"
			}, c.serialize = function(a)
			{
				return null === a || void 0 === a ? a : ("number" ==
					typeof a ? a = "" + a : "object" == typeof a &&
					(a = JSON.stringify(
					{
						data: a
					})), Object.keys(c.escapingMap).reduce(function(
						a, b)
					{
						return c.replaceAll(a, b, c.escapingMap[
							b])
					}, a))
			}, c.deserialize = function(a)
			{
				if ("string" != typeof a) return a;
				a = Object.keys(c.escapingMap).reduce(function(a, b)
				{
					return c.replaceAll(a, c.escapingMap[b], b)
				}, a);
				try
				{
					a = JSON.parse(a), a = void 0 !== a.data ? a.data :
						a
				}
				catch (a)
				{}
				return a
			}, c.createSvg = function(a, b, d, e)
			{
				var f;
				return b = b || "100%", d = d || "100%", Array.prototype
					.slice.call(a.querySelectorAll("svg")).filter(
						function(a)
						{
							return a.getAttributeNS(c.namespaces.xmlns,
								"ct")
						}).forEach(function(b)
					{
						a.removeChild(b)
					}), f = new c.Svg("svg").attr(
					{
						width: b,
						height: d
					}).addClass(e), f._node.style.width = b, f._node
					.style.height = d, a.appendChild(f._node), f
			}, c.normalizeData = function(a, b, d)
			{
				var e, f = {
					raw: a,
					normalized:
					{}
				};
				return f.normalized.series = c.getDataArray(
					{
						series: a.series || []
					}, b, d), e = f.normalized.series.every(function(a)
					{
						return a instanceof Array
					}) ? Math.max.apply(null, f.normalized.series.map(
						function(a)
						{
							return a.length
						})) : f.normalized.series.length, f.normalized
					.labels = (a.labels || []).slice(), Array.prototype
					.push.apply(f.normalized.labels, c.times(Math.max(0,
						e - f.normalized.labels.length)).map(
						function()
						{
							return ""
						})), b && c.reverseData(f.normalized), f
			}, c.safeHasProperty = function(a, b)
			{
				return null !== a && "object" == typeof a && a
					.hasOwnProperty(b)
			}, c.isDataHoleValue = function(a)
			{
				return null === a || void 0 === a || "number" ==
					typeof a && isNaN(a)
			}, c.reverseData = function(a)
			{
				a.labels.reverse(), a.series.reverse();
				for (var b = 0; b < a.series.length; b++) "object" ==
					typeof a.series[b] && void 0 !== a.series[b].data ?
					a.series[b].data.reverse() : a.series[
					b] instanceof Array && a.series[b].reverse()
			}, c.getDataArray = function(a, b, d)
			{
				function e(a)
				{
					if (c.safeHasProperty(a, "value")) return e(a
					.value);
					if (c.safeHasProperty(a, "data")) return e(a.data);
					if (a instanceof Array) return a.map(e);
					if (!c.isDataHoleValue(a))
					{
						if (d)
						{
							var b = {};
							return "string" == typeof d ? b[d] = c
								.getNumberOrUndefined(a) : b.y = c
								.getNumberOrUndefined(a), b.x = a
								.hasOwnProperty("x") ? c
								.getNumberOrUndefined(a.x) : b.x, b.y =
								a.hasOwnProperty("y") ? c
								.getNumberOrUndefined(a.y) : b.y, b
						}
						return c.getNumberOrUndefined(a)
					}
				}
				return a.series.map(e)
			}, c.normalizePadding = function(a, b)
			{
				return b = b || 0, "number" == typeof a ?
				{
					top: a,
					right: a,
					bottom: a,
					left: a
				} :
				{
					top: "number" == typeof a.top ? a.top : b,
					right: "number" == typeof a.right ? a.right : b,
					bottom: "number" == typeof a.bottom ? a.bottom :
						b,
					left: "number" == typeof a.left ? a.left : b
				}
			}, c.getMetaData = function(a, b)
			{
				var c = a.data ? a.data[b] : a[b];
				return c ? c.meta : void 0
			}, c.orderOfMagnitude = function(a)
			{
				return Math.floor(Math.log(Math.abs(a)) / Math.LN10)
			}, c.projectLength = function(a, b, c)
			{
				return b / c.range * a
			}, c.getAvailableHeight = function(a, b)
			{
				return Math.max((c.quantity(b.height).value || a
				.height()) - (b.chartPadding.top + b
					.chartPadding.bottom) - b.axisX.offset, 0)
			}, c.getHighLow = function(a, b, d)
			{
				function e(a)
				{
					if (void 0 !== a)
						if (a instanceof Array)
							for (var b = 0; b < a.length; b++) e(a[b]);
						else
						{
							var c = d ? +a[d] : +a;
							g && c > f.high && (f.high = c), h && c < f
								.low && (f.low = c)
						}
				}
				b = c.extend(
				{}, b, d ? b["axis" + d.toUpperCase()] :
				{});
				var f = {
						high: void 0 === b.high ? -Number.MAX_VALUE : +b
							.high,
						low: void 0 === b.low ? Number.MAX_VALUE : +b
							.low
					},
					g = void 0 === b.high,
					h = void 0 === b.low;
				return (g || h) && e(a), (b.referenceValue || 0 === b
					.referenceValue) && (f.high = Math.max(b
					.referenceValue, f.high), f.low = Math.min(b
					.referenceValue, f.low)), f.high <= f.low && (
					0 === f.low ? f.high = 1 : f.low < 0 ? f.high =
					0 : f.high > 0 ? f.low = 0 : (f.high = 1, f
						.low = 0)), f
			}, c.isNumeric = function(a)
			{
				return null !== a && isFinite(a)
			}, c.isFalseyButZero = function(a)
			{
				return !a && 0 !== a
			}, c.getNumberOrUndefined = function(a)
			{
				return c.isNumeric(a) ? +a : void 0
			}, c.isMultiValue = function(a)
			{
				return "object" == typeof a && ("x" in a || "y" in a)
			}, c.getMultiValue = function(a, b)
			{
				return c.isMultiValue(a) ? c.getNumberOrUndefined(a[b ||
					"y"]) : c.getNumberOrUndefined(a)
			}, c.rho = function(a)
			{
				function b(a, c)
				{
					return a % c == 0 ? c : b(c, a % c)
				}

				function c(a)
				{
					return a * a + 1
				}
				if (1 === a) return a;
				var d, e = 2,
					f = 2;
				if (a % 2 == 0) return 2;
				do {
					e = c(e) % a, f = c(c(f)) % a, d = b(Math.abs(e -
						f), a)
				} while (1 === d);
				return d
			}, c.getBounds = function(a, b, d, e)
			{
				function f(a, b)
				{
					return a === (a += b) && (a *= 1 + (b > 0 ? o : -
						o)), a
				}
				var g, h, i, j = 0,
					k = {
						high: b.high,
						low: b.low
					};
				k.valueRange = k.high - k.low, k.oom = c
					.orderOfMagnitude(k.valueRange), k.step = Math.pow(
						10, k.oom), k.min = Math.floor(k.low / k.step) *
					k.step, k.max = Math.ceil(k.high / k.step) * k.step,
					k.range = k.max - k.min, k.numberOfSteps = Math
					.round(k.range / k.step);
				var l = c.projectLength(a, k.step, k),
					m = l < d,
					n = e ? c.rho(k.range) : 0;
				if (e && c.projectLength(a, 1, k) >= d) k.step = 1;
				else if (e && n < k.step && c.projectLength(a, n, k) >=
					d) k.step = n;
				else
					for (;;)
					{
						if (m && c.projectLength(a, k.step, k) <= d) k
							.step *= 2;
						else
						{
							if (m || !(c.projectLength(a, k.step / 2,
									k) >= d)) break;
							if (k.step /= 2, e && k.step % 1 != 0)
							{
								k.step *= 2;
								break
							}
						}
						if (j++ > 1e3) throw new Error(
							"Exceeded maximum number of iterations while optimizing scale step!"
							)
					}
				var o = 2.221e-16;
				for (k.step = Math.max(k.step, o), h = k.min, i = k
					.max; h + k.step <= k.low;) h = f(h, k.step);
				for (; i - k.step >= k.high;) i = f(i, -k.step);
				k.min = h, k.max = i, k.range = k.max - k.min;
				var p = [];
				for (g = k.min; g <= k.max; g = f(g, k.step))
				{
					var q = c.roundWithPrecision(g);
					q !== p[p.length - 1] && p.push(q)
				}
				return k.values = p, k
			}, c.polarToCartesian = function(a, b, c, d)
			{
				var e = (d - 90) * Math.PI / 180;
				return {
					x: a + c * Math.cos(e),
					y: b + c * Math.sin(e)
				}
			}, c.createChartRect = function(a, b, d)
			{
				var e = !(!b.axisX && !b.axisY),
					f = e ? b.axisY.offset : 0,
					g = e ? b.axisX.offset : 0,
					h = a.width() || c.quantity(b.width).value || 0,
					i = a.height() || c.quantity(b.height).value || 0,
					j = c.normalizePadding(b.chartPadding, d);
				h = Math.max(h, f + j.left + j.right), i = Math.max(i,
					g + j.top + j.bottom);
				var k = {
					padding: j,
					width: function()
					{
						return this.x2 - this.x1
					},
					height: function()
					{
						return this.y1 - this.y2
					}
				};
				return e ? ("start" === b.axisX.position ? (k.y2 = j
						.top + g, k.y1 = Math.max(i - j.bottom, k
							.y2 + 1)) : (k.y2 = j.top, k.y1 = Math
						.max(i - j.bottom - g, k.y2 + 1)),
					"start" === b.axisY.position ? (k.x1 = j.left +
						f, k.x2 = Math.max(h - j.right, k.x1 + 1)) :
					(k.x1 = j.left, k.x2 = Math.max(h - j.right - f,
						k.x1 + 1))) : (k.x1 = j.left, k.x2 = Math
					.max(h - j.right, k.x1 + 1), k.y2 = j.top, k
					.y1 = Math.max(i - j.bottom, k.y2 + 1)), k
			}, c.createGrid = function(a, b, d, e, f, g, h, i)
			{
				var j = {};
				j[d.units.pos + "1"] = a, j[d.units.pos + "2"] = a, j[d
					.counterUnits.pos + "1"] = e, j[d.counterUnits
					.pos + "2"] = e + f;
				var k = g.elem("line", j, h.join(" "));
				i.emit("draw", c.extend(
				{
					type: "grid",
					axis: d,
					index: b,
					group: g,
					element: k
				}, j))
			}, c.createGridBackground = function(a, b, c, d)
			{
				var e = a.elem("rect",
				{
					x: b.x1,
					y: b.y2,
					width: b.width(),
					height: b.height()
				}, c, !0);
				d.emit("draw",
				{
					type: "gridBackground",
					group: a,
					element: e
				})
			}, c.createLabel = function(a, d, e, f, g, h, i, j, k, l, m)
			{
				var n, o = {};
				if (o[g.units.pos] = a + i[g.units.pos], o[g
						.counterUnits.pos] = i[g.counterUnits.pos], o[g
						.units.len] = d, o[g.counterUnits.len] = Math
					.max(0, h - 10), l)
				{
					var p = b.createElement("span");
					p.className = k.join(" "), p.setAttribute("xmlns", c
							.namespaces.xhtml), p.innerText = f[e], p
						.style[g.units.len] = Math.round(o[g.units
						.len]) + "px", p.style[g.counterUnits.len] =
						Math.round(o[g.counterUnits.len]) + "px", n = j
						.foreignObject(p, c.extend(
						{
							style: "overflow: visible;"
						}, o))
				}
				else n = j.elem("text", o, k.join(" ")).text(f[e]);
				m.emit("draw", c.extend(
				{
					type: "label",
					axis: g,
					index: e,
					group: j,
					element: n,
					text: f[e]
				}, o))
			}, c.getSeriesOption = function(a, b, c)
			{
				if (a.name && b.series && b.series[a.name])
				{
					var d = b.series[a.name];
					return d.hasOwnProperty(c) ? d[c] : b[c]
				}
				return b[c]
			}, c.optionsProvider = function(b, d, e)
			{
				function f(b)
				{
					var f = h;
					if (h = c.extend(
						{}, j), d)
						for (i = 0; i < d.length; i++)
						{
							var g = a.matchMedia(d[i][0]);
							g.matches && (h = c.extend(h, d[i][1]))
						}
					e && b && e.emit("optionsChanged",
					{
						previousOptions: f,
						currentOptions: h
					})
				}

				function g()
				{
					k.forEach(function(a)
					{
						a.removeListener(f)
					})
				}
				var h, i, j = c.extend(
					{}, b),
					k = [];
				if (!a.matchMedia)
				throw "window.matchMedia not found! Make sure you're using a polyfill.";
				if (d)
					for (i = 0; i < d.length; i++)
					{
						var l = a.matchMedia(d[i][0]);
						l.addListener(f), k.push(l)
					}
				return f(),
				{
					removeMediaQueryListeners: g,
					getCurrentOptions: function()
					{
						return c.extend(
						{}, h)
					}
				}
			}, c.splitIntoSegments = function(a, b, d)
			{
				var e = {
					increasingX: !1,
					fillHoles: !1
				};
				d = c.extend(
				{}, e, d);
				for (var f = [], g = !0, h = 0; h < a.length; h += 2)
					void 0 === c.getMultiValue(b[h / 2].value) ? d
					.fillHoles || (g = !0) : (d.increasingX && h >= 2 &&
						a[h] <= a[h - 2] && (g = !0), g && (f.push(
						{
							pathCoordinates: [],
							valueData: []
						}), g = !1), f[f.length - 1].pathCoordinates
						.push(a[h], a[h + 1]), f[f.length - 1].valueData
						.push(b[h / 2]));
				return f
			}
		}(window, document, a),
		function(a, b, c)
		{
			"use strict";
			c.Interpolation = {}, c.Interpolation.none = function(a)
			{
				var b = {
					fillHoles: !1
				};
				return a = c.extend(
					{}, b, a),
					function(b, d)
					{
						for (var e = new c.Svg.Path, f = !0, g = 0; g <
							b.length; g += 2)
						{
							var h = b[g],
								i = b[g + 1],
								j = d[g / 2];
							void 0 !== c.getMultiValue(j.value) ? (f ? e
									.move(h, i, !1, j) : e.line(h, i, !
										1, j), f = !1) : a.fillHoles ||
								(f = !0)
						}
						return e
					}
			}, c.Interpolation.simple = function(a)
			{
				var b = {
					divisor: 2,
					fillHoles: !1
				};
				a = c.extend(
				{}, b, a);
				var d = 1 / Math.max(1, a.divisor);
				return function(b, e)
				{
					for (var f, g, h, i = new c.Svg.Path, j = 0; j <
						b.length; j += 2)
					{
						var k = b[j],
							l = b[j + 1],
							m = (k - f) * d,
							n = e[j / 2];
						void 0 !== n.value ? (void 0 === h ? i.move(
								k, l, !1, n) : i.curve(f + m, g,
								k - m, l, k, l, !1, n), f = k,
							g = l, h = n) : a.fillHoles || (f =
							k = h = void 0)
					}
					return i
				}
			}, c.Interpolation.cardinal = function(a)
			{
				var b = {
					tension: 1,
					fillHoles: !1
				};
				a = c.extend(
				{}, b, a);
				var d = Math.min(1, Math.max(0, a.tension)),
					e = 1 - d;
				return function b(f, g)
				{
					var h = c.splitIntoSegments(f, g,
					{
						fillHoles: a.fillHoles
					});
					if (h.length)
					{
						if (h.length > 1)
						{
							var i = [];
							return h.forEach(function(a)
							{
								i.push(b(a.pathCoordinates,
									a.valueData))
							}), c.Svg.Path.join(i)
						}
						if (f = h[0].pathCoordinates, g = h[0]
							.valueData, f.length <= 4) return c
							.Interpolation.none()(f, g);
						for (var j = (new c.Svg.Path).move(f[0], f[
									1], !1, g[0]), k = 0, l = f
								.length; l - 2 > k; k += 2)
						{
							var m = [
							{
								x: +f[k - 2],
								y: +f[k - 1]
							},
							{
								x: +f[k],
								y: +f[k + 1]
							},
							{
								x: +f[k + 2],
								y: +f[k + 3]
							},
							{
								x: +f[k + 4],
								y: +f[k + 5]
							}];
							l - 4 === k ? m[3] = m[2] : k || (m[
							0] = {
								x: +f[k],
								y: +f[k + 1]
							}), j.curve(d * (-m[0].x + 6 * m[1]
									.x + m[2].x) / 6 + e * m[2]
								.x, d * (-m[0].y + 6 * m[1].y +
									m[2].y) / 6 + e * m[2].y,
								d * (m[1].x + 6 * m[2].x - m[3]
									.x) / 6 + e * m[2].x, d * (
									m[1].y + 6 * m[2].y - m[3].y
									) / 6 + e * m[2].y, m[2].x,
								m[2].y, !1, g[(k + 2) / 2])
						}
						return j
					}
					return c.Interpolation.none()([])
				}
			}, c.Interpolation.monotoneCubic = function(a)
			{
				var b = {
					fillHoles: !1
				};
				return a = c.extend(
					{}, b, a),
					function b(d, e)
					{
						var f = c.splitIntoSegments(d, e,
						{
							fillHoles: a.fillHoles,
							increasingX: !0
						});
						if (f.length)
						{
							if (f.length > 1)
							{
								var g = [];
								return f.forEach(function(a)
								{
									g.push(b(a.pathCoordinates,
										a.valueData))
								}), c.Svg.Path.join(g)
							}
							if (d = f[0].pathCoordinates, e = f[0]
								.valueData, d.length <= 4) return c
								.Interpolation.none()(d, e);
							var h, i, j = [],
								k = [],
								l = d.length / 2,
								m = [],
								n = [],
								o = [],
								p = [];
							for (h = 0; h < l; h++) j[h] = d[2 * h], k[
								h] = d[2 * h + 1];
							for (h = 0; h < l - 1; h++) o[h] = k[h +
								1] - k[h], p[h] = j[h + 1] - j[h], n[
								h] = o[h] / p[h];
							for (m[0] = n[0], m[l - 1] = n[l - 2], h =
								1; h < l - 1; h++) 0 === n[h] || 0 ===
								n[h - 1] || n[h - 1] > 0 != n[h] > 0 ?
								m[h] = 0 : (m[h] = 3 * (p[h - 1] + p[
									h]) / ((2 * p[h] + p[h - 1]) / n[h -
											1] + (p[h] + 2 * p[h - 1]) /
										n[h]), isFinite(m[h]) || (m[h] =
										0));
							for (i = (new c.Svg.Path).move(j[0], k[0], !
									1, e[0]), h = 0; h < l - 1; h++) i
								.curve(j[h] + p[h] / 3, k[h] + m[h] * p[
									h] / 3, j[h + 1] - p[h] / 3, k[
									h + 1] - m[h + 1] * p[h] / 3, j[
									h + 1], k[h + 1], !1, e[h + 1]);
							return i
						}
						return c.Interpolation.none()([])
					}
			}, c.Interpolation.step = function(a)
			{
				var b = {
					postpone: !0,
					fillHoles: !1
				};
				return a = c.extend(
					{}, b, a),
					function(b, d)
					{
						for (var e, f, g, h = new c.Svg.Path, i = 0; i <
							b.length; i += 2)
						{
							var j = b[i],
								k = b[i + 1],
								l = d[i / 2];
							void 0 !== l.value ? (void 0 === g ? h.move(
									j, k, !1, l) : (a.postpone ? h
									.line(j, f, !1, g) : h.line(e,
										k, !1, l), h.line(j, k, !1,
										l)), e = j, f = k, g = l) : a
								.fillHoles || (e = f = g = void 0)
						}
						return h
					}
			}
		}(window, document, a),
		function(a, b, c)
		{
			"use strict";
			c.EventEmitter = function()
			{
				function a(a, b)
				{
					d[a] = d[a] || [], d[a].push(b)
				}

				function b(a, b)
				{
					d[a] && (b ? (d[a].splice(d[a].indexOf(b), 1), 0 ===
						d[a].length && delete d[a]) : delete d[
						a])
				}

				function c(a, b)
				{
					d[a] && d[a].forEach(function(a)
					{
						a(b)
					}), d["*"] && d["*"].forEach(function(c)
					{
						c(a, b)
					})
				}
				var d = [];
				return {
					addEventHandler: a,
					removeEventHandler: b,
					emit: c
				}
			}
		}(window, document, a),
		function(a, b, c)
		{
			"use strict";

			function d(a)
			{
				var b = [];
				if (a.length)
					for (var c = 0; c < a.length; c++) b.push(a[c]);
				return b
			}

			function e(a, b)
			{
				var d = b || this.prototype || c.Class,
					e = Object.create(d);
				c.Class.cloneDefinitions(e, a);
				var f = function()
				{
					var a, b = e.constructor || function() {};
					return a = this === c ? Object.create(e) : this, b
						.apply(a, Array.prototype.slice.call(arguments,
							0)), a
				};
				return f.prototype = e, f.super = d, f.extend = this.extend,
					f
			}

			function f()
			{
				var a = d(arguments),
					b = a[0];
				return a.splice(1, a.length - 1).forEach(function(a)
				{
					Object.getOwnPropertyNames(a).forEach(function(
						c)
					{
						delete b[c], Object.defineProperty(
							b, c, Object
							.getOwnPropertyDescriptor(a,
								c))
					})
				}), b
			}
			c.Class = {
				extend: e,
				cloneDefinitions: f
			}
		}(window, document, a),
		function(a, b, c)
		{
			"use strict";

			function d(a, b, d)
			{
				return a && (this.data = a ||
						{}, this.data.labels = this.data.labels || [], this
						.data.series = this.data.series || [], this
						.eventEmitter.emit("data",
						{
							type: "update",
							data: this.data
						})), b && (this.options = c.extend(
						{}, d ? this.options : this.defaultOptions, b), this
						.initializeTimeoutId || (this.optionsProvider
							.removeMediaQueryListeners(), this
							.optionsProvider = c.optionsProvider(this
								.options, this.responsiveOptions, this
								.eventEmitter))), this
					.initializeTimeoutId || this.createChart(this
						.optionsProvider.getCurrentOptions()), this
			}

			function e()
			{
				return this.initializeTimeoutId ? a.clearTimeout(this
					.initializeTimeoutId) : (a.removeEventListener(
						"resize", this.resizeListener), this
					.optionsProvider.removeMediaQueryListeners()), this
			}

			function f(a, b)
			{
				return this.eventEmitter.addEventHandler(a, b), this
			}

			function g(a, b)
			{
				return this.eventEmitter.removeEventHandler(a, b), this
			}

			function h()
			{
				a.addEventListener("resize", this.resizeListener), this
					.optionsProvider = c.optionsProvider(this.options, this
						.responsiveOptions, this.eventEmitter), this
					.eventEmitter.addEventHandler("optionsChanged",
						function()
						{
							this.update()
						}.bind(this)), this.options.plugins && this.options
					.plugins.forEach(function(a)
					{
						a instanceof Array ? a[0](this, a[1]) : a(this)
					}.bind(this)), this.eventEmitter.emit("data",
					{
						type: "initial",
						data: this.data
					}), this.createChart(this.optionsProvider
						.getCurrentOptions()), this.initializeTimeoutId =
					void 0
			}

			function i(a, b, d, e, f)
			{
				this.container = c.querySelector(a), this.data = b ||
					{}, this.data.labels = this.data.labels || [], this.data
					.series = this.data.series || [], this.defaultOptions =
					d, this.options = e, this.responsiveOptions = f, this
					.eventEmitter = c.EventEmitter(), this
					.supportsForeignObject = c.Svg.isSupported(
						"Extensibility"), this.supportsAnimations = c.Svg
					.isSupported("AnimationEventsAttribute"), this
					.resizeListener = function()
					{
						this.update()
					}.bind(this), this.container && (this.container
						.__chartist__ && this.container.__chartist__
						.detach(), this.container.__chartist__ = this), this
					.initializeTimeoutId = setTimeout(h.bind(this), 0)
			}
			c.Base = c.Class.extend(
			{
				constructor: i,
				optionsProvider: void 0,
				container: void 0,
				svg: void 0,
				eventEmitter: void 0,
				createChart: function()
				{
					throw new Error(
						"Base chart type can't be instantiated!"
						)
				},
				update: d,
				detach: e,
				on: f,
				off: g,
				version: c.version,
				supportsForeignObject: !1
			})
		}(window, document, a),
		function(a, b, c)
		{
			"use strict";

			function d(a, d, e, f, g)
			{
				a instanceof Element ? this._node = a : (this._node = b
						.createElementNS(c.namespaces.svg, a), "svg" ===
						a && this.attr(
						{
							"xmlns:ct": c.namespaces.ct
						})), d && this.attr(d), e && this.addClass(e), f &&
					(g && f._node.firstChild ? f._node.insertBefore(this
							._node, f._node.firstChild) : f._node
						.appendChild(this._node))
			}

			function e(a, b)
			{
				return "string" == typeof a ? b ? this._node.getAttributeNS(
					b, a) : this._node.getAttribute(a) : (Object.keys(a)
					.forEach(function(b)
					{
						if (void 0 !== a[b])
							if (-1 !== b.indexOf(":"))
							{
								var d = b.split(":");
								this._node.setAttributeNS(c
									.namespaces[d[0]], b, a[b])
							}
						else this._node.setAttribute(b, a[b])
					}.bind(this)), this)
			}

			function f(a, b, d, e)
			{
				return new c.Svg(a, b, d, this, e)
			}

			function g()
			{
				return this._node.parentNode instanceof SVGElement ? new c
					.Svg(this._node.parentNode) : null
			}

			function h()
			{
				for (var a = this._node;
					"svg" !== a.nodeName;) a = a.parentNode;
				return new c.Svg(a)
			}

			function i(a)
			{
				var b = this._node.querySelector(a);
				return b ? new c.Svg(b) : null
			}

			function j(a)
			{
				var b = this._node.querySelectorAll(a);
				return b.length ? new c.Svg.List(b) : null
			}

			function k()
			{
				return this._node
			}

			function l(a, d, e, f)
			{
				if ("string" == typeof a)
				{
					var g = b.createElement("div");
					g.innerHTML = a, a = g.firstChild
				}
				a.setAttribute("xmlns", c.namespaces.xmlns);
				var h = this.elem("foreignObject", d, e, f);
				return h._node.appendChild(a), h
			}

			function m(a)
			{
				return this._node.appendChild(b.createTextNode(a)), this
			}

			function n()
			{
				for (; this._node.firstChild;) this._node.removeChild(this
					._node.firstChild);
				return this
			}

			function o()
			{
				return this._node.parentNode.removeChild(this._node), this
					.parent()
			}

			function p(a)
			{
				return this._node.parentNode.replaceChild(a._node, this
					._node), a
			}

			function q(a, b)
			{
				return b && this._node.firstChild ? this._node.insertBefore(
						a._node, this._node.firstChild) : this._node
					.appendChild(a._node), this
			}

			function r()
			{
				return this._node.getAttribute("class") ? this._node
					.getAttribute("class").trim().split(/\s+/) : []
			}

			function s(a)
			{
				return this._node.setAttribute("class", this.classes(this
					._node).concat(a.trim().split(/\s+/)).filter(
					function(a, b, c)
					{
						return c.indexOf(a) === b
					}).join(" ")), this
			}

			function t(a)
			{
				var b = a.trim().split(/\s+/);
				return this._node.setAttribute("class", this.classes(this
					._node).filter(function(a)
				{
					return -1 === b.indexOf(a)
				}).join(" ")), this
			}

			function u()
			{
				return this._node.setAttribute("class", ""), this
			}

			function v()
			{
				return this._node.getBoundingClientRect().height
			}

			function w()
			{
				return this._node.getBoundingClientRect().width
			}

			function x(a, b, d)
			{
				return void 0 === b && (b = !0), Object.keys(a).forEach(
					function(e)
					{
						function f(a, b)
						{
							var f, g, h, i = {};
							a.easing && (h = a.easing instanceof Array ?
									a.easing : c.Svg.Easing[a.easing],
									delete a.easing), a.begin = c
								.ensureUnit(a.begin, "ms"), a.dur = c
								.ensureUnit(a.dur, "ms"), h && (a
									.calcMode = "spline", a.keySplines =
									h.join(" "), a.keyTimes = "0;1"),
								b && (a.fill = "freeze", i[e] = a.from,
									this.attr(i), g = c.quantity(a
										.begin || 0).value, a.begin =
									"indefinite"), f = this.elem(
									"animate", c.extend(
									{
										attributeName: e
									}, a)), b && setTimeout(function()
								{
									try
									{
										f._node.beginElement()
									}
									catch (b)
									{
										i[e] = a.to, this.attr(i), f
											.remove()
									}
								}.bind(this), g), d && f._node
								.addEventListener("beginEvent",
									function()
									{
										d.emit("animationBegin",
										{
											element: this,
											animate: f._node,
											params: a
										})
									}.bind(this)), f._node
								.addEventListener("endEvent", function()
								{
									d && d.emit("animationEnd",
									{
										element: this,
										animate: f._node,
										params: a
									}), b && (i[e] = a.to, this
										.attr(i), f.remove())
								}.bind(this))
						}
						a[e] instanceof Array ? a[e].forEach(function(a)
						{
							f.bind(this)(a, !1)
						}.bind(this)) : f.bind(this)(a[e], b)
					}.bind(this)), this
			}

			function y(a)
			{
				var b = this;
				this.svgElements = [];
				for (var d = 0; d < a.length; d++) this.svgElements.push(
					new c.Svg(a[d]));
				Object.keys(c.Svg.prototype).filter(function(a)
				{
					return -1 === ["constructor", "parent",
						"querySelector", "querySelectorAll",
						"replace", "append", "classes",
						"height", "width"
					].indexOf(a)
				}).forEach(function(a)
				{
					b[a] = function()
					{
						var d = Array.prototype.slice.call(
							arguments, 0);
						return b.svgElements.forEach(function(b)
						{
							c.Svg.prototype[a].apply(b,
								d)
						}), b
					}
				})
			}
			c.Svg = c.Class.extend(
			{
				constructor: d,
				attr: e,
				elem: f,
				parent: g,
				root: h,
				querySelector: i,
				querySelectorAll: j,
				getNode: k,
				foreignObject: l,
				text: m,
				empty: n,
				remove: o,
				replace: p,
				append: q,
				classes: r,
				addClass: s,
				removeClass: t,
				removeAllClasses: u,
				height: v,
				width: w,
				animate: x
			}), c.Svg.isSupported = function(a)
			{
				return b.implementation.hasFeature(
					"http://www.w3.org/TR/SVG11/feature#" + a, "1.1"
					)
			};
			var z = {
				easeInSine: [.47, 0, .745, .715],
				easeOutSine: [.39, .575, .565, 1],
				easeInOutSine: [.445, .05, .55, .95],
				easeInQuad: [.55, .085, .68, .53],
				easeOutQuad: [.25, .46, .45, .94],
				easeInOutQuad: [.455, .03, .515, .955],
				easeInCubic: [.55, .055, .675, .19],
				easeOutCubic: [.215, .61, .355, 1],
				easeInOutCubic: [.645, .045, .355, 1],
				easeInQuart: [.895, .03, .685, .22],
				easeOutQuart: [.165, .84, .44, 1],
				easeInOutQuart: [.77, 0, .175, 1],
				easeInQuint: [.755, .05, .855, .06],
				easeOutQuint: [.23, 1, .32, 1],
				easeInOutQuint: [.86, 0, .07, 1],
				easeInExpo: [.95, .05, .795, .035],
				easeOutExpo: [.19, 1, .22, 1],
				easeInOutExpo: [1, 0, 0, 1],
				easeInCirc: [.6, .04, .98, .335],
				easeOutCirc: [.075, .82, .165, 1],
				easeInOutCirc: [.785, .135, .15, .86],
				easeInBack: [.6, -.28, .735, .045],
				easeOutBack: [.175, .885, .32, 1.275],
				easeInOutBack: [.68, -.55, .265, 1.55]
			};
			c.Svg.Easing = z, c.Svg.List = c.Class.extend(
			{
				constructor: y
			})
		}(window, document, a),
		function(a, b, c)
		{
			"use strict";

			function d(a, b, d, e, f, g)
			{
				var h = c.extend(
				{
					command: f ? a.toLowerCase() : a.toUpperCase()
				}, b, g ?
				{
					data: g
				} :
				{});
				d.splice(e, 0, h)
			}

			function e(a, b)
			{
				a.forEach(function(c, d)
				{
					u[c.command.toLowerCase()].forEach(function(e,
						f)
					{
						b(c, e, d, f, a)
					})
				})
			}

			function f(a, b)
			{
				this.pathElements = [], this.pos = 0, this.close = a, this
					.options = c.extend(
					{}, v, b)
			}

			function g(a)
			{
				return void 0 !== a ? (this.pos = Math.max(0, Math.min(this
					.pathElements.length, a)), this) : this.pos
			}

			function h(a)
			{
				return this.pathElements.splice(this.pos, a), this
			}

			function i(a, b, c, e)
			{
				return d("M",
				{
					x: +a,
					y: +b
				}, this.pathElements, this.pos++, c, e), this
			}

			function j(a, b, c, e)
			{
				return d("L",
				{
					x: +a,
					y: +b
				}, this.pathElements, this.pos++, c, e), this
			}

			function k(a, b, c, e, f, g, h, i)
			{
				return d("C",
				{
					x1: +a,
					y1: +b,
					x2: +c,
					y2: +e,
					x: +f,
					y: +g
				}, this.pathElements, this.pos++, h, i), this
			}

			function l(a, b, c, e, f, g, h, i, j)
			{
				return d("A",
				{
					rx: +a,
					ry: +b,
					xAr: +c,
					lAf: +e,
					sf: +f,
					x: +g,
					y: +h
				}, this.pathElements, this.pos++, i, j), this
			}

			function m(a)
			{
				var b = a.replace(/([A-Za-z])([0-9])/g, "$1 $2").replace(
						/([0-9])([A-Za-z])/g, "$1 $2").split(/[\s,]+/)
					.reduce(function(a, b)
					{
						return b.match(/[A-Za-z]/) && a.push([]), a[a
							.length - 1].push(b), a
					}, []);
				"Z" === b[b.length - 1][0].toUpperCase() && b.pop();
				var d = b.map(function(a)
					{
						var b = a.shift(),
							d = u[b.toLowerCase()];
						return c.extend(
						{
							command: b
						}, d.reduce(function(b, c, d)
						{
							return b[c] = +a[d], b
						},
						{}))
					}),
					e = [this.pos, 0];
				return Array.prototype.push.apply(e, d), Array.prototype
					.splice.apply(this.pathElements, e), this.pos += d
					.length, this
			}

			function n()
			{
				var a = Math.pow(10, this.options.accuracy);
				return this.pathElements.reduce(function(b, c)
				{
					var d = u[c.command.toLowerCase()].map(function(
						b)
					{
						return this.options.accuracy ? Math
							.round(c[b] * a) / a : c[b]
					}.bind(this));
					return b + c.command + d.join(",")
				}.bind(this), "") + (this.close ? "Z" : "")
			}

			function o(a, b)
			{
				return e(this.pathElements, function(c, d)
				{
					c[d] *= "x" === d[0] ? a : b
				}), this
			}

			function p(a, b)
			{
				return e(this.pathElements, function(c, d)
				{
					c[d] += "x" === d[0] ? a : b
				}), this
			}

			function q(a)
			{
				return e(this.pathElements, function(b, c, d, e, f)
				{
					var g = a(b, c, d, e, f);
					(g || 0 === g) && (b[c] = g)
				}), this
			}

			function r(a)
			{
				var b = new c.Svg.Path(a || this.close);
				return b.pos = this.pos, b.pathElements = this.pathElements
					.slice().map(function(a)
					{
						return c.extend(
						{}, a)
					}), b.options = c.extend(
					{}, this.options), b
			}

			function s(a)
			{
				var b = [new c.Svg.Path];
				return this.pathElements.forEach(function(d)
				{
					d.command === a.toUpperCase() && 0 !== b[b
							.length - 1].pathElements.length && b
						.push(new c.Svg.Path), b[b.length - 1]
						.pathElements.push(d)
				}), b
			}

			function t(a, b, d)
			{
				for (var e = new c.Svg.Path(b, d), f = 0; f < a.length; f++)
					for (var g = a[f], h = 0; h < g.pathElements
						.length; h++) e.pathElements.push(g.pathElements[
					h]);
				return e
			}
			var u = {
					m: ["x", "y"],
					l: ["x", "y"],
					c: ["x1", "y1", "x2", "y2", "x", "y"],
					a: ["rx", "ry", "xAr", "lAf", "sf", "x", "y"]
				},
				v = {
					accuracy: 3
				};
			c.Svg.Path = c.Class.extend(
			{
				constructor: f,
				position: g,
				remove: h,
				move: i,
				line: j,
				curve: k,
				arc: l,
				scale: o,
				translate: p,
				transform: q,
				parse: m,
				stringify: n,
				clone: r,
				splitByCommand: s
			}), c.Svg.Path.elementDescriptions = u, c.Svg.Path.join = t
		}(window, document, a),
		function(a, b, c)
		{
			"use strict";

			function d(a, b, c, d)
			{
				this.units = a, this.counterUnits = a === f.x ? f.y : f.x,
					this.chartRect = b, this.axisLength = b[a.rectEnd] - b[a
						.rectStart], this.gridOffset = b[a.rectOffset], this
					.ticks = c, this.options = d
			}

			function e(a, b, d, e, f)
			{
				var g = e["axis" + this.units.pos.toUpperCase()],
					h = this.ticks.map(this.projectValue.bind(this)),
					i = this.ticks.map(g.labelInterpolationFnc);
				h.forEach(function(j, k)
				{
					var l, m = {
						x: 0,
						y: 0
					};
					l = h[k + 1] ? h[k + 1] - j : Math.max(this
						.axisLength - j, 30), c.isFalseyButZero(
						i[k]) && "" !== i[k] || ("x" === this
						.units.pos ? (j = this.chartRect.x1 + j,
							m.x = e.axisX.labelOffset.x,
							"start" === e.axisX.position ? m.y =
							this.chartRect.padding.top + e.axisX
							.labelOffset.y + (d ? 5 : 20) : m
							.y = this.chartRect.y1 + e.axisX
							.labelOffset.y + (d ? 5 : 20)) : (
							j = this.chartRect.y1 - j, m.y = e
							.axisY.labelOffset.y - (d ? l : 0),
							"start" === e.axisY.position ? m.x =
							d ? this.chartRect.padding.left + e
							.axisY.labelOffset.x : this
							.chartRect.x1 - 10 : m.x = this
							.chartRect.x2 + e.axisY.labelOffset
							.x + 10), g.showGrid && c
						.createGrid(j, k, this, this.gridOffset,
							this.chartRect[this.counterUnits
								.len](), a, [e.classNames.grid,
								e.classNames[this.units.dir]
							], f), g.showLabel && c.createLabel(
							j, l, k, i, this, g.offset, m, b, [e
								.classNames.label, e.classNames[
									this.units.dir], "start" ===
								g.position ? e.classNames[g
									.position] : e.classNames
								.end
							], d, f))
				}.bind(this))
			}
			var f = {
				x:
				{
					pos: "x",
					len: "width",
					dir: "horizontal",
					rectStart: "x1",
					rectEnd: "x2",
					rectOffset: "y2"
				},
				y:
				{
					pos: "y",
					len: "height",
					dir: "vertical",
					rectStart: "y2",
					rectEnd: "y1",
					rectOffset: "x1"
				}
			};
			c.Axis = c.Class.extend(
			{
				constructor: d,
				createGridAndLabels: e,
				projectValue: function(a, b, c)
				{
					throw new Error(
						"Base axis can't be instantiated!")
				}
			}), c.Axis.units = f
		}(window, document, a),
		function(a, b, c)
		{
			"use strict";

			function d(a, b, d, e)
			{
				var f = e.highLow || c.getHighLow(b, e, a.pos);
				this.bounds = c.getBounds(d[a.rectEnd] - d[a.rectStart], f,
					e.scaleMinSpace || 20, e.onlyInteger), this
				.range = {
					min: this.bounds.min,
					max: this.bounds.max
				}, c.AutoScaleAxis.super.constructor.call(this, a, d,
					this.bounds.values, e)
			}

			function e(a)
			{
				return this.axisLength * (+c.getMultiValue(a, this.units
					.pos) - this.bounds.min) / this.bounds.range
			}
			c.AutoScaleAxis = c.Axis.extend(
			{
				constructor: d,
				projectValue: e
			})
		}(window, document, a),
		function(a, b, c)
		{
			"use strict";

			function d(a, b, d, e)
			{
				var f = e.highLow || c.getHighLow(b, e, a.pos);
				this.divisor = e.divisor || 1, this.ticks = e.ticks || c
					.times(this.divisor).map(function(a, b)
					{
						return f.low + (f.high - f.low) / this.divisor *
							b
					}.bind(this)), this.ticks.sort(function(a, b)
					{
						return a - b
					}), this.range = {
						min: f.low,
						max: f.high
					}, c.FixedScaleAxis.super.constructor.call(this, a, d,
						this.ticks, e), this.stepLength = this.axisLength /
					this.divisor
			}

			function e(a)
			{
				return this.axisLength * (+c.getMultiValue(a, this.units
					.pos) - this.range.min) / (this.range.max - this
					.range.min)
			}
			c.FixedScaleAxis = c.Axis.extend(
			{
				constructor: d,
				projectValue: e
			})
		}(window, document, a),
		function(a, b, c)
		{
			"use strict";

			function d(a, b, d, e)
			{
				c.StepAxis.super.constructor.call(this, a, d, e.ticks, e);
				var f = Math.max(1, e.ticks.length - (e.stretch ? 1 : 0));
				this.stepLength = this.axisLength / f
			}

			function e(a, b)
			{
				return this.stepLength * b
			}
			c.StepAxis = c.Axis.extend(
			{
				constructor: d,
				projectValue: e
			})
		}(window, document, a),
		function(a, b, c)
		{
			"use strict";

			function d(a)
			{
				var b = c.normalizeData(this.data, a.reverseData, !0);
				this.svg = c.createSvg(this.container, a.width, a.height, a
					.classNames.chart);
				var d, e, g = this.svg.elem("g").addClass(a.classNames
						.gridGroup),
					h = this.svg.elem("g"),
					i = this.svg.elem("g").addClass(a.classNames
					.labelGroup),
					j = c.createChartRect(this.svg, a, f.padding);
				d = void 0 === a.axisX.type ? new c.StepAxis(c.Axis.units.x,
						b.normalized.series, j, c.extend(
						{}, a.axisX,
						{
							ticks: b.normalized.labels,
							stretch: a.fullWidth
						})) : a.axisX.type.call(c, c.Axis.units.x, b
						.normalized.series, j, a.axisX), e = void 0 === a
					.axisY.type ? new c.AutoScaleAxis(c.Axis.units.y, b
						.normalized.series, j, c.extend(
						{}, a.axisY,
						{
							high: c.isNumeric(a.high) ? a.high : a.axisY
								.high,
							low: c.isNumeric(a.low) ? a.low : a.axisY
								.low
						})) : a.axisY.type.call(c, c.Axis.units.y, b
						.normalized.series, j, a.axisY), d
					.createGridAndLabels(g, i, this.supportsForeignObject,
						a, this.eventEmitter), e.createGridAndLabels(g, i,
						this.supportsForeignObject, a, this.eventEmitter), a
					.showGridBackground && c.createGridBackground(g, j, a
						.classNames.gridBackground, this.eventEmitter), b
					.raw.series.forEach(function(f, g)
					{
						var i = h.elem("g");
						i.attr(
						{
							"ct:series-name": f.name,
							"ct:meta": c.serialize(f.meta)
						}), i.addClass([a.classNames.series, f
							.className || a.classNames.series +
							"-" + c.alphaNumerate(g)
						].join(" "));
						var k = [],
							l = [];
						b.normalized.series[g].forEach(function(a, h)
						{
							var i = {
								x: j.x1 + d.projectValue(a,
									h, b.normalized
									.series[g]),
								y: j.y1 - e.projectValue(a,
									h, b.normalized
									.series[g])
							};
							k.push(i.x, i.y), l.push(
							{
								value: a,
								valueIndex: h,
								meta: c.getMetaData(f,
									h)
							})
						}.bind(this));
						var m = {
								lineSmooth: c.getSeriesOption(f, a,
									"lineSmooth"),
								showPoint: c.getSeriesOption(f, a,
									"showPoint"),
								showLine: c.getSeriesOption(f, a,
									"showLine"),
								showArea: c.getSeriesOption(f, a,
									"showArea"),
								areaBase: c.getSeriesOption(f, a,
									"areaBase")
							},
							n = "function" == typeof m.lineSmooth ? m
							.lineSmooth : m.lineSmooth ? c.Interpolation
							.monotoneCubic() : c.Interpolation.none(),
							o = n(k, l);
						if (m.showPoint && o.pathElements.forEach(
								function(b)
								{
									var h = i.elem("line",
									{
										x1: b.x,
										y1: b.y,
										x2: b.x + .01,
										y2: b.y
									}, a.classNames.point).attr(
									{
										"ct:value": [b.data
												.value.x, b.data
												.value.y
											].filter(c
												.isNumeric)
											.join(","),
										"ct:meta": c.serialize(b
											.data.meta)
									});
									this.eventEmitter.emit("draw",
									{
										type: "point",
										value: b.data.value,
										index: b.data
											.valueIndex,
										meta: b.data.meta,
										series: f,
										seriesIndex: g,
										axisX: d,
										axisY: e,
										group: i,
										element: h,
										x: b.x,
										y: b.y
									})
								}.bind(this)), m.showLine)
						{
							var p = i.elem("path",
							{
								d: o.stringify()
							}, a.classNames.line, !0);
							this.eventEmitter.emit("draw",
							{
								type: "line",
								values: b.normalized.series[g],
								path: o.clone(),
								chartRect: j,
								index: g,
								series: f,
								seriesIndex: g,
								seriesMeta: f.meta,
								axisX: d,
								axisY: e,
								group: i,
								element: p
							})
						}
						if (m.showArea && e.range)
						{
							var q = Math.max(Math.min(m.areaBase, e
									.range.max), e.range.min),
								r = j.y1 - e.projectValue(q);
							o.splitByCommand("M").filter(function(a)
							{
								return a.pathElements.length > 1
							}).map(function(a)
							{
								var b = a.pathElements[0],
									c = a.pathElements[a
										.pathElements.length - 1
										];
								return a.clone(!0).position(0)
									.remove(1).move(b.x, r)
									.line(b.x, b.y).position(a
										.pathElements.length + 1
										).line(c.x, r)
							}).forEach(function(c)
							{
								var h = i.elem("path",
									{
										d: c.stringify()
									}, a.classNames.area, !
									0);
								this.eventEmitter.emit("draw",
								{
									type: "area",
									values: b.normalized
										.series[g],
									path: c.clone(),
									series: f,
									seriesIndex: g,
									axisX: d,
									axisY: e,
									chartRect: j,
									index: g,
									group: i,
									element: h
								})
							}.bind(this))
						}
					}.bind(this)), this.eventEmitter.emit("created",
					{
						bounds: e.bounds,
						chartRect: j,
						axisX: d,
						axisY: e,
						svg: this.svg,
						options: a
					})
			}

			function e(a, b, d, e)
			{
				c.Line.super.constructor.call(this, a, b, f, c.extend(
				{}, f, d), e)
			}
			var f = {
				axisX:
				{
					offset: 30,
					position: "end",
					labelOffset:
					{
						x: 0,
						y: 0
					},
					showLabel: !0,
					showGrid: !0,
					labelInterpolationFnc: c.noop,
					type: void 0
				},
				axisY:
				{
					offset: 40,
					position: "start",
					labelOffset:
					{
						x: 0,
						y: 0
					},
					showLabel: !0,
					showGrid: !0,
					labelInterpolationFnc: c.noop,
					type: void 0,
					scaleMinSpace: 20,
					onlyInteger: !1
				},
				width: void 0,
				height: void 0,
				showLine: !0,
				showPoint: !0,
				showArea: !1,
				areaBase: 0,
				lineSmooth: !0,
				showGridBackground: !1,
				low: void 0,
				high: void 0,
				chartPadding:
				{
					top: 15,
					right: 15,
					bottom: 5,
					left: 10
				},
				fullWidth: !1,
				reverseData: !1,
				classNames:
				{
					chart: "ct-chart-line",
					label: "ct-label",
					labelGroup: "ct-labels",
					series: "ct-series",
					line: "ct-line",
					point: "ct-point",
					area: "ct-area",
					grid: "ct-grid",
					gridGroup: "ct-grids",
					gridBackground: "ct-grid-background",
					vertical: "ct-vertical",
					horizontal: "ct-horizontal",
					start: "ct-start",
					end: "ct-end"
				}
			};
			c.Line = c.Base.extend(
			{
				constructor: e,
				createChart: d
			})
		}(window, document, a),
		function(a, b, c)
		{
			"use strict";

			function d(a)
			{
				var b, d;
				a.distributeSeries ? (b = c.normalizeData(this.data, a
							.reverseData, a.horizontalBars ? "x" : "y"), b
						.normalized.series = b.normalized.series.map(
							function(a)
							{
								return [a]
							})) : b = c.normalizeData(this.data, a
						.reverseData, a.horizontalBars ? "x" : "y"), this
					.svg = c.createSvg(this.container, a.width, a.height, a
						.classNames.chart + (a.horizontalBars ? " " + a
							.classNames.horizontalBars : ""));
				var e = this.svg.elem("g").addClass(a.classNames.gridGroup),
					g = this.svg.elem("g"),
					h = this.svg.elem("g").addClass(a.classNames
					.labelGroup);
				if (a.stackBars && 0 !== b.normalized.series.length)
				{
					var i = c.serialMap(b.normalized.series, function()
					{
						return Array.prototype.slice.call(arguments)
							.map(function(a)
							{
								return a
							}).reduce(function(a, b)
							{
								return {
									x: a.x + (b && b.x) || 0,
									y: a.y + (b && b.y) || 0
								}
							},
							{
								x: 0,
								y: 0
							})
					});
					d = c.getHighLow([i], a, a.horizontalBars ? "x" : "y")
				}
				else d = c.getHighLow(b.normalized.series, a, a
					.horizontalBars ? "x" : "y");
				d.high = +a.high || (0 === a.high ? 0 : d.high), d.low = +a
					.low || (0 === a.low ? 0 : d.low);
				var j, k, l, m, n, o = c.createChartRect(this.svg, a, f
					.padding);
				k = a.distributeSeries && a.stackBars ? b.normalized.labels
					.slice(0, 1) : b.normalized.labels, a.horizontalBars ? (
						j = m = void 0 === a.axisX.type ? new c
						.AutoScaleAxis(c.Axis.units.x, b.normalized.series,
							o, c.extend(
							{}, a.axisX,
							{
								highLow: d,
								referenceValue: 0
							})) : a.axisX.type.call(c, c.Axis.units.x, b
							.normalized.series, o, c.extend(
							{}, a.axisX,
							{
								highLow: d,
								referenceValue: 0
							})), l = n = void 0 === a.axisY.type ? new c
						.StepAxis(c.Axis.units.y, b.normalized.series, o,
						{
							ticks: k
						}) : a.axisY.type.call(c, c.Axis.units.y, b
							.normalized.series, o, a.axisY)) : (l = m =
						void 0 === a.axisX.type ? new c.StepAxis(c.Axis
							.units.x, b.normalized.series, o,
							{
								ticks: k
							}) : a.axisX.type.call(c, c.Axis.units.x, b
							.normalized.series, o, a.axisX), j = n =
						void 0 === a.axisY.type ? new c.AutoScaleAxis(c.Axis
							.units.y, b.normalized.series, o, c.extend(
							{}, a.axisY,
							{
								highLow: d,
								referenceValue: 0
							})) : a.axisY.type.call(c, c.Axis.units.y, b
							.normalized.series, o, c.extend(
							{}, a.axisY,
							{
								highLow: d,
								referenceValue: 0
							})));
				var p = a.horizontalBars ? o.x1 + j.projectValue(0) : o.y1 -
					j.projectValue(0),
					q = [];
				l.createGridAndLabels(e, h, this.supportsForeignObject, a,
						this.eventEmitter), j.createGridAndLabels(e, h, this
						.supportsForeignObject, a, this.eventEmitter), a
					.showGridBackground && c.createGridBackground(e, o, a
						.classNames.gridBackground, this.eventEmitter), b
					.raw.series.forEach(function(d, e)
					{
						var f, h, i = e - (b.raw.series.length - 1) / 2;
						f = a.distributeSeries && !a.stackBars ? l
							.axisLength / b.normalized.series.length /
							2 : a.distributeSeries && a.stackBars ? l
							.axisLength / 2 : l.axisLength / b
							.normalized.series[e].length / 2, h = g
							.elem("g"), h.attr(
							{
								"ct:series-name": d.name,
								"ct:meta": c.serialize(d.meta)
							}), h.addClass([a.classNames.series, d
								.className || a.classNames.series +
								"-" + c.alphaNumerate(e)
							].join(" ")), b.normalized.series[e]
							.forEach(function(g, k)
							{
								var r, s, t, u;
								if (u = a.distributeSeries && !a
									.stackBars ? e : a
									.distributeSeries && a
									.stackBars ? 0 : k, r = a
									.horizontalBars ?
									{
										x: o.x1 + j.projectValue(
											g && g.x ? g.x : 0,
											k, b.normalized
											.series[e]),
										y: o.y1 - l.projectValue(
											g && g.y ? g.y : 0,
											u, b.normalized
											.series[e])
									} :
									{
										x: o.x1 + l.projectValue(
											g && g.x ? g.x : 0,
											u, b.normalized
											.series[e]),
										y: o.y1 - j.projectValue(
											g && g.y ? g.y : 0,
											k, b.normalized
											.series[e])
									}, l instanceof c.StepAxis && (l
										.options.stretch || (r[l
											.units.pos] += f * (
											a.horizontalBars ? -
											1 : 1)), r[l.units
										.pos] += a.stackBars || a
										.distributeSeries ? 0 : i *
										a.seriesBarDistance * (a
											.horizontalBars ? -1 : 1
											)), t = q[k] || p, q[
									k] = t - (p - r[l.counterUnits
										.pos]), void 0 !== g)
								{
									var v = {};
									v[l.units.pos + "1"] = r[l.units
											.pos], v[l.units.pos +
											"2"] = r[l.units.pos], !
										a.stackBars ||
										"accumulate" !== a
										.stackMode && a.stackMode ?
										(v[l.counterUnits.pos +
											"1"] = p, v[l
												.counterUnits.pos +
												"2"] = r[l
												.counterUnits.pos]
											) : (v[l.counterUnits
											.pos + "1"] = t, v[l
											.counterUnits.pos +
											"2"] = q[k]), v.x1 =
										Math.min(Math.max(v.x1, o
											.x1), o.x2), v.x2 = Math
										.min(Math.max(v.x2, o.x1), o
											.x2), v.y1 = Math.min(
											Math.max(v.y1, o.y2), o
											.y1), v.y2 = Math.min(
											Math.max(v.y2, o.y2), o
											.y1);
									var w = c.getMetaData(d, k);
									s = h.elem("line", v, a
										.classNames.bar).attr(
									{
										"ct:value": [g.x, g
												.y
											].filter(c
												.isNumeric)
											.join(","),
										"ct:meta": c
											.serialize(w)
									}), this.eventEmitter.emit(
										"draw", c.extend(
										{
											type: "bar",
											value: g,
											index: k,
											meta: w,
											series: d,
											seriesIndex: e,
											axisX: m,
											axisY: n,
											chartRect: o,
											group: h,
											element: s
										}, v))
								}
							}.bind(this))
					}.bind(this)), this.eventEmitter.emit("created",
					{
						bounds: j.bounds,
						chartRect: o,
						axisX: m,
						axisY: n,
						svg: this.svg,
						options: a
					})
			}

			function e(a, b, d, e)
			{
				c.Bar.super.constructor.call(this, a, b, f, c.extend(
				{}, f, d), e)
			}
			var f = {
				axisX:
				{
					offset: 30,
					position: "end",
					labelOffset:
					{
						x: 0,
						y: 0
					},
					showLabel: !0,
					showGrid: !0,
					labelInterpolationFnc: c.noop,
					scaleMinSpace: 30,
					onlyInteger: !1
				},
				axisY:
				{
					offset: 40,
					position: "start",
					labelOffset:
					{
						x: 0,
						y: 0
					},
					showLabel: !0,
					showGrid: !0,
					labelInterpolationFnc: c.noop,
					scaleMinSpace: 20,
					onlyInteger: !1
				},
				width: void 0,
				height: void 0,
				high: void 0,
				low: void 0,
				referenceValue: 0,
				chartPadding:
				{
					top: 15,
					right: 15,
					bottom: 5,
					left: 10
				},
				seriesBarDistance: 15,
				stackBars: !1,
				stackMode: "accumulate",
				horizontalBars: !1,
				distributeSeries: !1,
				reverseData: !1,
				showGridBackground: !1,
				classNames:
				{
					chart: "ct-chart-bar",
					horizontalBars: "ct-horizontal-bars",
					label: "ct-label",
					labelGroup: "ct-labels",
					series: "ct-series",
					bar: "ct-bar",
					grid: "ct-grid",
					gridGroup: "ct-grids",
					gridBackground: "ct-grid-background",
					vertical: "ct-vertical",
					horizontal: "ct-horizontal",
					start: "ct-start",
					end: "ct-end"
				}
			};
			c.Bar = c.Base.extend(
			{
				constructor: e,
				createChart: d
			})
		}(window, document, a),
		function(a, b, c)
		{
			"use strict";

			function d(a, b, c)
			{
				var d = b.x > a.x;
				return d && "explode" === c || !d && "implode" === c ?
					"start" : d && "implode" === c || !d && "explode" ===
					c ? "end" : "middle"
			}

			function e(a)
			{
				var b, e, f, h, i, j = c.normalizeData(this.data),
					k = [],
					l = a.startAngle;
				this.svg = c.createSvg(this.container, a.width, a.height, a
					.donut ? a.classNames.chartDonut : a.classNames
					.chartPie), e = c.createChartRect(this.svg, a, g
					.padding), f = Math.min(e.width() / 2, e.height() /
					2), i = a.total || j.normalized.series.reduce(
					function(a, b)
					{
						return a + b
					}, 0);
				var m = c.quantity(a.donutWidth);
				"%" === m.unit && (m.value *= f / 100), f -= a.donut && !a
					.donutSolid ? m.value / 2 : 0, h = "outside" === a
					.labelPosition || a.donut && !a.donutSolid ? f :
					"center" === a.labelPosition ? 0 : a.donutSolid ? f - m
					.value / 2 : f / 2, h += a.labelOffset;
				var n = {
						x: e.x1 + e.width() / 2,
						y: e.y2 + e.height() / 2
					},
					o = 1 === j.raw.series.filter(function(a)
					{
						return a.hasOwnProperty("value") ? 0 !== a
							.value : 0 !== a
					}).length;
				j.raw.series.forEach(function(a, b)
				{
					k[b] = this.svg.elem("g", null, null)
				}.bind(this)), a.showLabel && (b = this.svg.elem("g",
					null, null)), j.raw.series.forEach(function(e, g)
				{
					if (0 !== j.normalized.series[g] || !a
						.ignoreEmptyValues)
					{
						k[g].attr(
						{
							"ct:series-name": e.name
						}), k[g].addClass([a.classNames.series,
							e.className || a.classNames
							.series + "-" + c.alphaNumerate(
								g)
						].join(" "));
						var p = i > 0 ? l + j.normalized.series[g] /
							i * 360 : 0,
							q = Math.max(0, l - (0 === g || o ? 0 :
								.2));
						p - q >= 359.99 && (p = q + 359.99);
						var r, s, t, u = c.polarToCartesian(n.x, n
								.y, f, q),
							v = c.polarToCartesian(n.x, n.y, f, p),
							w = new c.Svg.Path(!a.donut || a
								.donutSolid).move(v.x, v.y).arc(f,
								f, 0, p - l > 180, 0, u.x, u.y);
						a.donut ? a.donutSolid && (t = f - m.value,
								r = c.polarToCartesian(n.x, n.y, t,
									l - (0 === g || o ? 0 : .2)),
								s = c.polarToCartesian(n.x, n.y, t,
									p), w.line(r.x, r.y), w.arc(t,
									t, 0, p - l > 180, 1, s.x, s.y)
								) : w.line(n.x, n.y);
						var x = a.classNames.slicePie;
						a.donut && (x = a.classNames.sliceDonut, a
							.donutSolid && (x = a.classNames
								.sliceDonutSolid));
						var y = k[g].elem("path",
						{
							d: w.stringify()
						}, x);
						if (y.attr(
							{
								"ct:value": j.normalized.series[
									g],
								"ct:meta": c.serialize(e.meta)
							}), a.donut && !a.donutSolid && (y._node
								.style.strokeWidth = m.value + "px"
								), this.eventEmitter.emit("draw",
							{
								type: "slice",
								value: j.normalized.series[g],
								totalDataSum: i,
								index: g,
								meta: e.meta,
								series: e,
								group: k[g],
								element: y,
								path: w.clone(),
								center: n,
								radius: f,
								startAngle: l,
								endAngle: p
							}), a.showLabel)
						{
							var z;
							z = 1 === j.raw.series.length ?
							{
								x: n.x,
								y: n.y
							} : c.polarToCartesian(n.x, n.y, h,
								l + (p - l) / 2);
							var A;
							A = j.normalized.labels && !c
								.isFalseyButZero(j.normalized
									.labels[g]) ? j.normalized
								.labels[g] : j.normalized.series[g];
							var B = a.labelInterpolationFnc(A, g);
							if (B || 0 === B)
							{
								var C = b.elem("text",
								{
									dx: z.x,
									dy: z.y,
									"text-anchor": d(n, z, a
										.labelDirection)
								}, a.classNames.label).text("" +
									B);
								this.eventEmitter.emit("draw",
								{
									type: "label",
									index: g,
									group: b,
									element: C,
									text: "" + B,
									x: z.x,
									y: z.y
								})
							}
						}
						l = p
					}
				}.bind(this)), this.eventEmitter.emit("created",
				{
					chartRect: e,
					svg: this.svg,
					options: a
				})
			}

			function f(a, b, d, e)
			{
				c.Pie.super.constructor.call(this, a, b, g, c.extend(
				{}, g, d), e)
			}
			var g = {
				width: void 0,
				height: void 0,
				chartPadding: 5,
				classNames:
				{
					chartPie: "ct-chart-pie",
					chartDonut: "ct-chart-donut",
					series: "ct-series",
					slicePie: "ct-slice-pie",
					sliceDonut: "ct-slice-donut",
					sliceDonutSolid: "ct-slice-donut-solid",
					label: "ct-label"
				},
				startAngle: 0,
				total: void 0,
				donut: !1,
				donutSolid: !1,
				donutWidth: 60,
				showLabel: !0,
				labelOffset: 0,
				labelPosition: "inside",
				labelInterpolationFnc: c.noop,
				labelDirection: "neutral",
				reverseData: !1,
				ignoreEmptyValues: !1
			};
			c.Pie = c.Base.extend(
			{
				constructor: f,
				createChart: e,
				determineAnchorPosition: d
			})
		}(window, document, a), a
}),
function(a, b)
{
	"function" == typeof define && define.amd ? define(["chartist"], function(c)
	{
		return a.returnExportsGlobal = b(c)
	}) : "object" == typeof exports ? module.exports = b(require(
		"chartist")) : a["Chartist.plugins.tooltips"] = b(Chartist)
}(this, function(a)
{
	return function(a, b, c)
	{
		"use strict";

		function d(a)
		{
			f(a, "tooltip-show") || (a.className = a.className +
				" tooltip-show")
		}

		function e(a)
		{
			var b = new RegExp("tooltip-show\\s*", "gi");
			a.className = a.className.replace(b, "").trim()
		}

		function f(a, b)
		{
			return (" " + a.getAttribute("class") + " ").indexOf(" " +
				b + " ") > -1
		}

		function g(a, b)
		{
			do {
				a = a.nextSibling
			} while (a && !f(a, b));
			return a
		}

		function h(a)
		{
			return a.innerText || a.textContent
		}
		var i = {
			currency: void 0,
			currencyFormatCallback: void 0,
			tooltipOffset:
			{
				x: 0,
				y: -20
			},
			anchorToPoint: !1,
			appendToBody: !1,
			class: void 0,
			pointClass: "ct-point"
		};
		c.plugins = c.plugins ||
		{}, c.plugins.tooltip = function(j)
		{
			return j = c.extend(
				{}, i, j),
				function(i)
				{
					function k(a, b, c)
					{
						n.addEventListener(a, function(a)
						{
							b && !f(a.target, b) || c(a)
						})
					}

					function l(b)
					{
						p = p || o.offsetHeight, q = q || o
							.offsetWidth;
						var c, d, e = -q / 2 + j.tooltipOffset.x,
							f = -p + j.tooltipOffset.y;
						if (j.appendToBody) o.style.top = b.pageY +
							f + "px", o.style.left = b.pageX + e +
							"px";
						else
						{
							var g = n.getBoundingClientRect(),
								h = b.pageX - g.left - a
								.pageXOffset,
								i = b.pageY - g.top - a.pageYOffset;
							!0 === j.anchorToPoint && b.target.x2 &&
								b.target.y2 && (c = parseInt(b
										.target.x2.baseVal.value),
									d = parseInt(b.target.y2.baseVal
										.value)), o.style.top = (
									d || i) + f + "px", o.style
								.left = (c || h) + e + "px"
						}
					}
					var m = j.pointClass;
					i instanceof c.Bar ? m = "ct-bar" :
						i instanceof c.Pie && (m = i.options.donut ?
							"ct-slice-donut" : "ct-slice-pie");
					var n = i.container,
						o = n.querySelector(".chartist-tooltip");
					o || (o = b.createElement("div"), o.className =
						j.class ? "chartist-tooltip " + j
						.class : "chartist-tooltip", j
						.appendToBody ? b.body.appendChild(o) :
						n.appendChild(o));
					var p = o.offsetHeight,
						q = o.offsetWidth;
					e(o), k("mouseover", m, function(a)
					{
						var e = a.target,
							f = "",
							k = i instanceof c.Pie ? e : e
							.parentNode,
							m = k ? e.parentNode
							.getAttribute("ct:meta") || e
							.parentNode.getAttribute(
								"ct:series-name") : "",
							n = e.getAttribute("ct:meta") ||
							m || "",
							r = !!n,
							s = e.getAttribute("ct:value");
						if (j.transformTooltipTextFnc &&
							"function" == typeof j
							.transformTooltipTextFnc && (s =
								j.transformTooltipTextFnc(s)
								), j.tooltipFnc &&
							"function" == typeof j
							.tooltipFnc) f = j.tooltipFnc(n,
							s);
						else
						{
							if (j.metaIsHTML)
							{
								var t = b.createElement(
									"textarea");
								t.innerHTML = n, n = t.value
							}
							if (n =
								'<span class="chartist-tooltip-meta">' +
								n + "</span>", r) f += n +
								"<br>";
							else if (i instanceof c.Pie)
							{
								var u = g(e, "ct-label");
								u && (f += h(u) + "<br>")
							}
							s && (j.currency && (s =
									void 0 != j
									.currencyFormatCallback ?
									j
									.currencyFormatCallback(
										s, j) : j
									.currency + s
									.replace(
										/(\d)(?=(\d{3})+(?:\.\d+)?$)/g,
										"$1,")), s =
								'<span class="chartist-tooltip-value">' +
								s + "</span>", f += s)
						}
						f && (o.innerHTML = f, l(a), d(o),
							p = o.offsetHeight, q = o
							.offsetWidth)
					}), k("mouseout", m, function()
					{
						e(o)
					}), k("mousemove", null, function(a)
					{
						!1 === j.anchorToPoint && l(a)
					})
				}
		}
	}(window, document, a), a.plugins.tooltips
}),
function(a, b)
{
	"function" == typeof define && define.amd ? define([], function()
	{
		return a.returnExportsGlobal = b()
	}) : "object" == typeof exports ? module.exports = b() : a[
		"Chartist.plugins.ctAxisTitle"] = b()
}(this, function()
{
	return function(a, b, c)
	{
		"use strict";
		var d = {
				axisTitle: "",
				axisClass: "ct-axis-title",
				offset:
				{
					x: 0,
					y: 0
				},
				textAnchor: "middle",
				flipText: !1
			},
			e = {
				xAxis: d,
				yAxis: d
			};
		c.plugins = c.plugins ||
		{}, c.plugins.ctAxisTitle = function(a)
		{
			return a = c.extend(
				{}, e, a),
				function(b)
				{
					b.on("created", function(b)
					{
						if (!a.axisX.axisTitle && !a.axisY
							.axisTitle) throw new Error(
							"ctAxisTitle plugin - You must provide at least one axis title"
							);
						if (!b.axisX && !b.axisY)
						throw new Error(
								"ctAxisTitle plugin can only be used on charts that have at least one axis"
								);
						var d, e, f;
						if (a.axisX.axisTitle && b.axisX &&
							(d = b.axisX.axisLength / 2 + b
								.options.axisX.offset + b
								.options.chartPadding.left,
								e = b.options.chartPadding
								.top, "end" === b.options
								.axisX.position && (e += b
									.axisY.axisLength), f =
								new c.Svg("text"), f
								.addClass(a.axisX
								.axisClass), f.text(a.axisX
									.axisTitle), f.attr(
								{
									x: d + a.axisX
										.offset.x,
									y: e + a.axisX
										.offset.y,
									"text-anchor": a
										.axisX
										.textAnchor
								}), b.svg.append(f, !0)), a
							.axisY.axisTitle && b.axisY)
						{
							d = 0, e = b.axisY.axisLength /
								2 + b.options.chartPadding
								.top, "end" === b.options
								.axisY.position && (d = b
									.axisX.axisLength);
							var g = "rotate(" + (a.axisY
									.flipTitle ? -90 : 90) +
								", " + d + ", " + e + ")";
							f = new c.Svg("text"), f
								.addClass(a.axisY
								.axisClass), f.text(a.axisY
									.axisTitle), f.attr(
								{
									x: d + a.axisY
										.offset.x,
									y: e + a.axisY
										.offset.y,
									transform: g,
									"text-anchor": a
										.axisY
										.textAnchor
								}), b.svg.append(f, !0)
						}
					})
				}
		}
	}(window, document, Chartist), Chartist.plugins.ctAxisTitle
}),
function(a, b)
{
	"function" == typeof define && define.amd ? define(["chartist"], function(c)
	{
		return a.returnExportsGlobal = b(c)
	}) : "object" == typeof exports ? module.exports = b(require(
		"chartist")) : a["Chartist.plugins.legend"] = b(a.Chartist)
}(this, function(a)
{
	"use strict";
	var b = {
		className: "",
		classNames: !1,
		removeAll: !1,
		legendNames: !1,
		clickable: !0,
		onClick: null,
		position: "top"
	};
	return a.plugins = a.plugins ||
	{}, a.plugins.legend = function(c)
	{
		function d(a, b)
		{
			return a - b
		}
		if (c && c.position)
		{
			if (!("top" === c.position || "bottom" === c.position || c
					.position instanceof HTMLElement)) throw Error(
				"The position you entered is not a valid position"
				);
			if (c.position instanceof HTMLElement)
			{
				var e = c.position;
				delete c.position
			}
		}
		return c = a.extend(
			{}, b, c), e && (c.position = e),
			function(b)
			{
				var e = b.container.querySelector(".ct-legend");
				if (e && e.parentNode.removeChild(e), c.clickable)
				{
					var f = b.data.series.map(function(c, d)
					{
						return "object" != typeof c && (c = {
								value: c
							}), c.className = c.className || b
							.options.classNames.series + "-" + a
							.alphaNumerate(d), c
					});
					b.data.series = f
				}
				var g = document.createElement("ul"),
					h = b instanceof a.Pie;
				g.className = "ct-legend", b instanceof a.Pie && g
					.classList.add("ct-legend-inside"), "string" ==
					typeof c.className && c.className.length > 0 && g
					.classList.add(c.className);
				var i = [],
					j = b.data.series.slice(0),
					k = b.data.series,
					l = h && b.data.labels;
				if (l)
				{
					var m = b.data.labels.slice(0);
					k = b.data.labels
				}
				k = c.legendNames || k;
				var n = Array.isArray(c.classNames) && c.classNames
					.length === k.length;
				k.forEach(function(a, b)
				{
					var d = document.createElement("li");
					d.className = "ct-series-" + b, n && (d
							.className += " " + c.classNames[b]
							), d.setAttribute("data-legend", b),
						d.textContent = a.name || a, g
						.appendChild(d)
				}), b.on("created", function(a)
				{
					if (c.position instanceof HTMLElement) c
						.position.insertBefore(g, null);
					else switch (c.position)
					{
						case "top":
							b.container.insertBefore(g, b
								.container.childNodes[0]
								);
							break;
						case "bottom":
							b.container.insertBefore(g,
								null)
					}
				}), c.clickable && g.addEventListener("click",
					function(a)
					{
						var e = a.target;
						if (e.parentNode === g && e.hasAttribute(
								"data-legend"))
						{
							a.preventDefault();
							var f = parseInt(e.getAttribute(
									"data-legend")),
								h = i.indexOf(f);
							if (h > -1) i.splice(h, 1), e.classList
								.remove("inactive");
							else if (c.removeAll) i.push(f), e
								.classList.add("inactive");
							else if (b.data.series.length > 1) i
								.push(f), e.classList.add(
									"inactive");
							else
							{
								i = [];
								var k = Array.prototype.slice.call(g
									.childNodes);
								k.forEach(function(a)
								{
									a.classList.remove(
										"inactive")
								})
							}
							var n = j.slice(0);
							if (l) var o = m.slice(0);
							i.sort(d).reverse(), i.forEach(function(
									a)
								{
									n.splice(a, 1), l && o
										.splice(a, 1)
								}), c.onClick && c.onClick(b, a), b
								.data.series = n, l && (b.data
									.labels = o), b.update()
						}
					})
			}
	}, a.plugins.legend
}),
function(a)
{
	if ("object" == typeof exports && "undefined" != typeof module) module
		.exports = a();
	else if ("function" == typeof define && define.amd) define([], a);
	else
	{
		var b;
		b = "undefined" != typeof window ? window : "undefined" !=
			typeof global ? global : "undefined" != typeof self ? self : this, b
			.Chart = a()
	}
}(function()
{
	var a;
	return function a(b, c, d)
	{
		function e(g, h)
		{
			if (!c[g])
			{
				if (!b[g])
				{
					var i = "function" == typeof require && require;
					if (!h && i) return i(g, !0);
					if (f) return f(g, !0);
					var j = new Error("Cannot find module '" + g + "'");
					throw j.code = "MODULE_NOT_FOUND", j
				}
				var k = c[g] = {
					exports:
					{}
				};
				b[g][0].call(k.exports, function(a)
				{
					var c = b[g][1][a];
					return e(c || a)
				}, k, k.exports, a, b, c, d)
			}
			return c[g].exports
		}
		for (var f = "function" == typeof require && require, g = 0; g <
			d.length; g++) e(d[g]);
		return e
	}(
	{
		1: [function(a, b, c)
		{
			function d(a)
			{
				if (a)
				{
					var b = /^#([a-fA-F0-9]{3})$/,
						c = /^#([a-fA-F0-9]{6})$/,
						d =
						/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
						e =
						/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
						f = /(\w+)/,
						g = [0, 0, 0],
						h = 1,
						i = a.match(b);
					if (i)
					{
						i = i[1];
						for (var j = 0; j < g.length; j++)
							g[j] = parseInt(i[j] + i[j], 16)
					}
					else if (i = a.match(c))
					{
						i = i[1];
						for (var j = 0; j < g.length; j++)
							g[j] = parseInt(i.slice(2 * j,
								2 * j + 2), 16)
					}
					else if (i = a.match(d))
					{
						for (var j = 0; j < g.length; j++)
							g[j] = parseInt(i[j + 1]);
						h = parseFloat(i[4])
					}
					else if (i = a.match(e))
					{
						for (var j = 0; j < g.length; j++)
							g[j] = Math.round(2.55 *
								parseFloat(i[j + 1]));
						h = parseFloat(i[4])
					}
					else if (i = a.match(f))
					{
						if ("transparent" == i[1]) return [
							0, 0, 0, 0
						];
						if (!(g = u[i[1]])) return
					}
					for (var j = 0; j < g.length; j++) g[
						j] = s(g[j], 0, 255);
					return h = h || 0 == h ? s(h, 0, 1) : 1,
						g[3] = h, g
				}
			}

			function e(a)
			{
				if (a)
				{
					var b =
						/^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,
						c = a.match(b);
					if (c)
					{
						var d = parseFloat(c[4]);
						return [s(parseInt(c[1]), 0, 360),
							s(parseFloat(c[2]), 0, 100),
							s(parseFloat(c[3]), 0, 100),
							s(isNaN(d) ? 1 : d, 0, 1)
						]
					}
				}
			}

			function f(a)
			{
				if (a)
				{
					var b =
						/^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,
						c = a.match(b);
					if (c)
					{
						var d = parseFloat(c[4]);
						return [s(parseInt(c[1]), 0, 360),
							s(parseFloat(c[2]), 0, 100),
							s(parseFloat(c[3]), 0, 100),
							s(isNaN(d) ? 1 : d, 0, 1)
						]
					}
				}
			}

			function g(a)
			{
				var b = d(a);
				return b && b.slice(0, 3)
			}

			function h(a)
			{
				var b = e(a);
				return b && b.slice(0, 3)
			}

			function i(a)
			{
				var b = d(a);
				return b ? b[3] : (b = e(a)) ? b[3] : (b =
					f(a)) ? b[3] : void 0
			}

			function j(a)
			{
				return "#" + t(a[0]) + t(a[1]) + t(a[2])
			}

			function k(a, b)
			{
				return b < 1 || a[3] && a[3] < 1 ? l(a, b) :
					"rgb(" + a[0] + ", " + a[1] + ", " + a[
						2] + ")"
			}

			function l(a, b)
			{
				return void 0 === b && (b = void 0 !== a[
						3] ? a[3] : 1), "rgba(" + a[0] +
					", " + a[1] + ", " + a[2] + ", " + b +
					")"
			}

			function m(a, b)
			{
				return b < 1 || a[3] && a[3] < 1 ? n(a, b) :
					"rgb(" + Math.round(a[0] / 255 * 100) +
					"%, " + Math.round(a[1] / 255 * 100) +
					"%, " + Math.round(a[2] / 255 * 100) +
					"%)"
			}

			function n(a, b)
			{
				return "rgba(" + Math.round(a[0] / 255 *
					100) + "%, " + Math.round(a[1] /
					255 * 100) + "%, " + Math.round(a[
					2] / 255 * 100) + "%, " + (b || a[
					3] || 1) + ")"
			}

			function o(a, b)
			{
				return b < 1 || a[3] && a[3] < 1 ? p(a, b) :
					"hsl(" + a[0] + ", " + a[1] + "%, " + a[
						2] + "%)"
			}

			function p(a, b)
			{
				return void 0 === b && (b = void 0 !== a[
						3] ? a[3] : 1), "hsla(" + a[0] +
					", " + a[1] + "%, " + a[2] + "%, " + b +
					")"
			}

			function q(a, b)
			{
				return void 0 === b && (b = void 0 !== a[
						3] ? a[3] : 1), "hwb(" + a[0] +
					", " + a[1] + "%, " + a[2] + "%" + (
						void 0 !== b && 1 !== b ? ", " + b :
						"") + ")"
			}

			function r(a)
			{
				return v[a.slice(0, 3)]
			}

			function s(a, b, c)
			{
				return Math.min(Math.max(b, a), c)
			}

			function t(a)
			{
				var b = a.toString(16).toUpperCase();
				return b.length < 2 ? "0" + b : b
			}
			var u = a(5);
			b.exports = {
				getRgba: d,
				getHsla: e,
				getRgb: g,
				getHsl: h,
				getHwb: f,
				getAlpha: i,
				hexString: j,
				rgbString: k,
				rgbaString: l,
				percentString: m,
				percentaString: n,
				hslString: o,
				hslaString: p,
				hwbString: q,
				keyword: r
			};
			var v = {};
			for (var w in u) v[u[w]] = w
		},
		{
			5: 5
		}],
		2: [function(a, b, c)
		{
			var d = a(4),
				e = a(1),
				f = function(a)
				{
					if (a instanceof f) return a;
					if (!(this instanceof f)) return new f(
						a);
					this.values = {
						rgb: [0, 0, 0],
						hsl: [0, 0, 0],
						hsv: [0, 0, 0],
						hwb: [0, 0, 0],
						cmyk: [0, 0, 0, 0],
						alpha: 1
					};
					var b;
					if ("string" == typeof a)
						if (b = e.getRgba(a)) this
							.setValues("rgb", b);
						else if (b = e.getHsla(a)) this
						.setValues("hsl", b);
					else
					{
						if (!(b = e.getHwb(a)))
						throw new Error(
								'Unable to parse color from string "' +
								a + '"');
						this.setValues("hwb", b)
					}
					else if ("object" == typeof a)
						if (b = a, void 0 !== b.r ||
							void 0 !== b.red) this
							.setValues("rgb", b);
						else if (void 0 !== b.l ||
						void 0 !== b.lightness) this
						.setValues("hsl", b);
					else if (void 0 !== b.v || void 0 !== b
						.value) this.setValues("hsv", b);
					else if (void 0 !== b.w || void 0 !== b
						.whiteness) this.setValues("hwb",
					b);
					else
					{
						if (void 0 === b.c && void 0 === b
							.cyan) throw new Error(
							"Unable to parse color from object " +
							JSON.stringify(a));
						this.setValues("cmyk", b)
					}
				};
			f.prototype = {
				rgb: function()
				{
					return this.setSpace("rgb",
						arguments)
				},
				hsl: function()
				{
					return this.setSpace("hsl",
						arguments)
				},
				hsv: function()
				{
					return this.setSpace("hsv",
						arguments)
				},
				hwb: function()
				{
					return this.setSpace("hwb",
						arguments)
				},
				cmyk: function()
				{
					return this.setSpace("cmyk",
						arguments)
				},
				rgbArray: function()
				{
					return this.values.rgb
				},
				hslArray: function()
				{
					return this.values.hsl
				},
				hsvArray: function()
				{
					return this.values.hsv
				},
				hwbArray: function()
				{
					var a = this.values;
					return 1 !== a.alpha ? a.hwb
						.concat([a.alpha]) : a.hwb
				},
				cmykArray: function()
				{
					return this.values.cmyk
				},
				rgbaArray: function()
				{
					var a = this.values;
					return a.rgb.concat([a.alpha])
				},
				hslaArray: function()
				{
					var a = this.values;
					return a.hsl.concat([a.alpha])
				},
				alpha: function(a)
				{
					return void 0 === a ? this
						.values.alpha : (this
							.setValues("alpha", a),
							this)
				},
				red: function(a)
				{
					return this.setChannel("rgb", 0,
						a)
				},
				green: function(a)
				{
					return this.setChannel("rgb", 1,
						a)
				},
				blue: function(a)
				{
					return this.setChannel("rgb", 2,
						a)
				},
				hue: function(a)
				{
					return a && (a %= 360, a = a <
							0 ? 360 + a : a), this
						.setChannel("hsl", 0, a)
				},
				saturation: function(a)
				{
					return this.setChannel("hsl", 1,
						a)
				},
				lightness: function(a)
				{
					return this.setChannel("hsl", 2,
						a)
				},
				saturationv: function(a)
				{
					return this.setChannel("hsv", 1,
						a)
				},
				whiteness: function(a)
				{
					return this.setChannel("hwb", 1,
						a)
				},
				blackness: function(a)
				{
					return this.setChannel("hwb", 2,
						a)
				},
				value: function(a)
				{
					return this.setChannel("hsv", 2,
						a)
				},
				cyan: function(a)
				{
					return this.setChannel("cmyk",
						0, a)
				},
				magenta: function(a)
				{
					return this.setChannel("cmyk",
						1, a)
				},
				yellow: function(a)
				{
					return this.setChannel("cmyk",
						2, a)
				},
				black: function(a)
				{
					return this.setChannel("cmyk",
						3, a)
				},
				hexString: function()
				{
					return e.hexString(this.values
						.rgb)
				},
				rgbString: function()
				{
					return e.rgbString(this.values
						.rgb, this.values.alpha)
				},
				rgbaString: function()
				{
					return e.rgbaString(this.values
						.rgb, this.values.alpha)
				},
				percentString: function()
				{
					return e.percentString(this
						.values.rgb, this.values
						.alpha)
				},
				hslString: function()
				{
					return e.hslString(this.values
						.hsl, this.values.alpha)
				},
				hslaString: function()
				{
					return e.hslaString(this.values
						.hsl, this.values.alpha)
				},
				hwbString: function()
				{
					return e.hwbString(this.values
						.hwb, this.values.alpha)
				},
				keyword: function()
				{
					return e.keyword(this.values
						.rgb, this.values.alpha)
				},
				rgbNumber: function()
				{
					var a = this.values.rgb;
					return a[0] << 16 | a[1] << 8 |
						a[2]
				},
				luminosity: function()
				{
					for (var a = this.values.rgb,
							b = [], c = 0; c < a
						.length; c++)
					{
						var d = a[c] / 255;
						b[c] = d <= .03928 ? d /
							12.92 : Math.pow((d +
									.055) / 1.055,
								2.4)
					}
					return .2126 * b[0] + .7152 * b[
						1] + .0722 * b[2]
				},
				contrast: function(a)
				{
					var b = this.luminosity(),
						c = a.luminosity();
					return b > c ? (b + .05) / (c +
						.05) : (c + .05) / (b +
						.05)
				},
				level: function(a)
				{
					var b = this.contrast(a);
					return b >= 7.1 ? "AAA" : b >=
						4.5 ? "AA" : ""
				},
				dark: function()
				{
					var a = this.values.rgb;
					return (299 * a[0] + 587 * a[
							1] + 114 * a[2]) / 1e3 <
						128
				},
				light: function()
				{
					return !this.dark()
				},
				negate: function()
				{
					for (var a = [], b = 0; b <
						3; b++) a[b] = 255 - this
						.values.rgb[b];
					return this.setValues("rgb", a),
						this
				},
				lighten: function(a)
				{
					var b = this.values.hsl;
					return b[2] += b[2] * a, this
						.setValues("hsl", b), this
				},
				darken: function(a)
				{
					var b = this.values.hsl;
					return b[2] -= b[2] * a, this
						.setValues("hsl", b), this
				},
				saturate: function(a)
				{
					var b = this.values.hsl;
					return b[1] += b[1] * a, this
						.setValues("hsl", b), this
				},
				desaturate: function(a)
				{
					var b = this.values.hsl;
					return b[1] -= b[1] * a, this
						.setValues("hsl", b), this
				},
				whiten: function(a)
				{
					var b = this.values.hwb;
					return b[1] += b[1] * a, this
						.setValues("hwb", b), this
				},
				blacken: function(a)
				{
					var b = this.values.hwb;
					return b[2] += b[2] * a, this
						.setValues("hwb", b), this
				},
				greyscale: function()
				{
					var a = this.values.rgb,
						b = .3 * a[0] + .59 * a[1] +
						.11 * a[2];
					return this.setValues("rgb", [b,
						b, b
					]), this
				},
				clearer: function(a)
				{
					var b = this.values.alpha;
					return this.setValues("alpha",
						b - b * a), this
				},
				opaquer: function(a)
				{
					var b = this.values.alpha;
					return this.setValues("alpha",
						b + b * a), this
				},
				rotate: function(a)
				{
					var b = this.values.hsl,
						c = (b[0] + a) % 360;
					return b[0] = c < 0 ? 360 + c :
						c, this.setValues("hsl", b),
						this
				},
				mix: function(a, b)
				{
					var c = this,
						d = a,
						e = void 0 === b ? .5 : b,
						f = 2 * e - 1,
						g = c.alpha() - d.alpha(),
						h = ((f * g == -1 ? f : (f +
								g) / (1 + f *
							g)) + 1) / 2,
						i = 1 - h;
					return this.rgb(h * c.red() +
						i * d.red(), h * c
						.green() + i * d
					.green(), h * c.blue() + i *
						d.blue()).alpha(c
						.alpha() * e + d
					.alpha() * (1 - e))
				},
				toJSON: function()
				{
					return this.rgb()
				},
				clone: function()
				{
					var a, b, c = new f,
						d = this.values,
						e = c.values;
					for (var g in d) d
						.hasOwnProperty(g) && (a =
							d[g], b = {}.toString
							.call(a),
							"[object Array]" === b ?
							e[g] = a.slice(0) :
							"[object Number]" ===
							b ? e[g] = a : console
							.error(
								"unexpected color value:",
								a));
					return c
				}
			}, f.prototype.spaces = {
				rgb: ["red", "green", "blue"],
				hsl: ["hue", "saturation", "lightness"],
				hsv: ["hue", "saturation", "value"],
				hwb: ["hue", "whiteness", "blackness"],
				cmyk: ["cyan", "magenta", "yellow",
					"black"
				]
			}, f.prototype.maxes = {
				rgb: [255, 255, 255],
				hsl: [360, 100, 100],
				hsv: [360, 100, 100],
				hwb: [360, 100, 100],
				cmyk: [100, 100, 100, 100]
			}, f.prototype.getValues = function(a)
			{
				for (var b = this.values, c = {}, d =
					0; d < a.length; d++) c[a.charAt(
					d)] = b[a][d];
				return 1 !== b.alpha && (c.a = b.alpha),
					c
			}, f.prototype.setValues = function(a, b)
			{
				var c, e = this.values,
					f = this.spaces,
					g = this.maxes,
					h = 1;
				if ("alpha" === a) h = b;
				else if (b.length) e[a] = b.slice(0, a
					.length), h = b[a.length];
				else if (void 0 !== b[a.charAt(0)])
				{
					for (c = 0; c < a.length; c++) e[a][
						c
					] = b[a.charAt(c)];
					h = b.a
				}
				else if (void 0 !== b[f[a][0]])
				{
					var i = f[a];
					for (c = 0; c < a.length; c++) e[a][
						c
					] = b[i[c]];
					h = b.alpha
				}
				if (e.alpha = Math.max(0, Math.min(1,
						void 0 === h ? e.alpha : h)),
					"alpha" === a) return !1;
				var j;
				for (c = 0; c < a.length; c++) j = Math
					.max(0, Math.min(g[a][c], e[a][c])),
					e[a][c] = Math.round(j);
				for (var k in f) k !== a && (e[k] = d[a]
					[k](e[a]));
				return !0
			}, f.prototype.setSpace = function(a, b)
			{
				var c = b[0];
				return void 0 === c ? this.getValues(
					a) : ("number" == typeof c && (c =
						Array.prototype.slice.call(
							b)), this.setValues(a,
						c), this)
			}, f.prototype.setChannel = function(a, b,
				c)
			{
				var d = this.values[a];
				return void 0 === c ? d[b] : c === d[
					b] ? this : (d[b] = c, this
						.setValues(a, d), this)
			}, "undefined" != typeof window && (window
				.Color = f), b.exports = f
		},
		{
			1: 1,
			4: 4
		}],
		3: [function(a, c, d)
		{
			function e(a)
			{
				var b, c, d, e = a[0] / 255,
					f = a[1] / 255,
					g = a[2] / 255,
					h = Math.min(e, f, g),
					i = Math.max(e, f, g),
					j = i - h;
				return i == h ? b = 0 : e == i ? b = (f -
					g) / j : f == i ? b = 2 + (g - e) / j :
					g == i && (b = 4 + (e - f) / j), b =
					Math.min(60 * b, 360), b < 0 && (b +=
						360), d = (h + i) / 2, c = i == h ?
					0 : d <= .5 ? j / (i + h) : j / (2 - i -
						h), [b, 100 * c, 100 * d]
			}

			function f(a)
			{
				var b, c, d, e = a[0],
					f = a[1],
					g = a[2],
					h = Math.min(e, f, g),
					i = Math.max(e, f, g),
					j = i - h;
				return c = 0 == i ? 0 : j / i * 1e3 / 10,
					i == h ? b = 0 : e == i ? b = (f - g) /
					j : f == i ? b = 2 + (g - e) / j : g ==
					i && (b = 4 + (e - f) / j), b = Math
					.min(60 * b, 360), b < 0 && (b += 360),
					d = i / 255 * 1e3 / 10, [b, c, d]
			}

			function h(a)
			{
				var b = a[0],
					c = a[1],
					d = a[2],
					f = e(a)[0],
					g = 1 / 255 * Math.min(b, Math.min(c,
						d)),
					d = 1 - 1 / 255 * Math.max(b, Math.max(
						c, d));
				return [f, 100 * g, 100 * d]
			}

			function i(a)
			{
				var b, c, d, e, f = a[0] / 255,
					g = a[1] / 255,
					h = a[2] / 255;
				return e = Math.min(1 - f, 1 - g, 1 - h),
					b = (1 - f - e) / (1 - e) || 0, c = (1 -
						g - e) / (1 - e) || 0, d = (1 - h -
						e) / (1 - e) || 0, [100 * b, 100 *
						c, 100 * d, 100 * e
					]
			}

			function j(a)
			{
				return Z[JSON.stringify(a)]
			}

			function k(a)
			{
				var b = a[0] / 255,
					c = a[1] / 255,
					d = a[2] / 255;
				return b = b > .04045 ? Math.pow((b +
						.055) / 1.055, 2.4) : b / 12.92, c =
					c > .04045 ? Math.pow((c + .055) /
						1.055, 2.4) : c / 12.92, d = d >
					.04045 ? Math.pow((d + .055) / 1.055,
						2.4) : d / 12.92, [100 * (.4124 *
							b + .3576 * c + .1805 * d),
						100 * (.2126 * b + .7152 * c +
							.0722 * d), 100 * (.0193 * b +
							.1192 * c + .9505 * d)
					]
			}

			function l(a)
			{
				var b, c, d, e = k(a),
					f = e[0],
					g = e[1],
					h = e[2];
				return f /= 95.047, g /= 100, h /= 108.883,
					f = f > .008856 ? Math.pow(f, 1 / 3) :
					7.787 * f + 16 / 116, g = g > .008856 ?
					Math.pow(g, 1 / 3) : 7.787 * g + 16 /
					116, h = h > .008856 ? Math.pow(h, 1 /
						3) : 7.787 * h + 16 / 116, b = 116 *
					g - 16, c = 500 * (f - g), d = 200 * (
						g - h), [b, c, d]
			}

			function m(a)
			{
				return M(l(a))
			}

			function n(a)
			{
				var b, c, d, e, f, g = a[0] / 360,
					h = a[1] / 100,
					i = a[2] / 100;
				if (0 == h) return f = 255 * i, [f, f, f];
				c = i < .5 ? i * (1 + h) : i + h - i * h,
					b = 2 * i - c, e = [0, 0, 0];
				for (var j = 0; j < 3; j++) d = g + 1 / 3 *
					-(j - 1), d < 0 && d++, d > 1 && d--,
					f = 6 * d < 1 ? b + 6 * (c - b) * d :
					2 * d < 1 ? c : 3 * d < 2 ? b + (c -
					b) * (2 / 3 - d) * 6 : b, e[j] = 255 *
					f;
				return e
			}

			function o(a)
			{
				var b, c, d = a[0],
					e = a[1] / 100,
					f = a[2] / 100;
				return 0 === f ? [0, 0, 0] : (f *= 2, e *=
					f <= 1 ? f : 2 - f, c = (f + e) / 2,
					b = 2 * e / (f + e), [d, 100 * b,
						100 * c
					])
			}

			function p(a)
			{
				return h(n(a))
			}

			function q(a)
			{
				return i(n(a))
			}

			function s(a)
			{
				return j(n(a))
			}

			function t(a)
			{
				var b = a[0] / 60,
					c = a[1] / 100,
					d = a[2] / 100,
					e = Math.floor(b) % 6,
					f = b - Math.floor(b),
					g = 255 * d * (1 - c),
					h = 255 * d * (1 - c * f),
					i = 255 * d * (1 - c * (1 - f)),
					d = 255 * d;
				switch (e)
				{
					case 0:
						return [d, i, g];
					case 1:
						return [h, d, g];
					case 2:
						return [g, d, i];
					case 3:
						return [g, h, d];
					case 4:
						return [i, g, d];
					case 5:
						return [d, g, h]
				}
			}

			function u(a)
			{
				var b, c, d = a[0],
					e = a[1] / 100,
					f = a[2] / 100;
				return c = (2 - e) * f, b = e * f, b /= c <=
					1 ? c : 2 - c, b = b || 0, c /= 2, [d,
						100 * b, 100 * c
					]
			}

			function v(a)
			{
				return h(t(a))
			}

			function w(a)
			{
				return i(t(a))
			}

			function x(a)
			{
				return j(t(a))
			}

			function y(a)
			{
				var c, d, e, f, h = a[0] / 360,
					i = a[1] / 100,
					j = a[2] / 100,
					k = i + j;
				switch (k > 1 && (i /= k, j /= k), c = Math
					.floor(6 * h), d = 1 - j, e = 6 * h - c,
					0 != (1 & c) && (e = 1 - e), f = i + e *
					(d - i), c)
				{
					default:
					case 6:
					case 0:
						r = d, g = f, b = i;
						break;
					case 1:
						r = f, g = d, b = i;
						break;
					case 2:
						r = i, g = d, b = f;
						break;
					case 3:
						r = i, g = f, b = d;
						break;
					case 4:
						r = f, g = i, b = d;
						break;
					case 5:
						r = d, g = i, b = f
				}
				return [255 * r, 255 * g, 255 * b]
			}

			function z(a)
			{
				return e(y(a))
			}

			function A(a)
			{
				return f(y(a))
			}

			function B(a)
			{
				return i(y(a))
			}

			function C(a)
			{
				return j(y(a))
			}

			function D(a)
			{
				var b, c, d, e = a[0] / 100,
					f = a[1] / 100,
					g = a[2] / 100,
					h = a[3] / 100;
				return b = 1 - Math.min(1, e * (1 - h) + h),
					c = 1 - Math.min(1, f * (1 - h) + h),
					d = 1 - Math.min(1, g * (1 - h) + h), [
						255 * b, 255 * c, 255 * d
					]
			}

			function E(a)
			{
				return e(D(a))
			}

			function F(a)
			{
				return f(D(a))
			}

			function G(a)
			{
				return h(D(a))
			}

			function H(a)
			{
				return j(D(a))
			}

			function I(a)
			{
				var b, c, d, e = a[0] / 100,
					f = a[1] / 100,
					g = a[2] / 100;
				return b = 3.2406 * e + -1.5372 * f + -
					.4986 * g, c = -.9689 * e + 1.8758 * f +
					.0415 * g, d = .0557 * e + -.204 * f +
					1.057 * g, b = b > .0031308 ? 1.055 *
					Math.pow(b, 1 / 2.4) - .055 : b *=
					12.92, c = c > .0031308 ? 1.055 * Math
					.pow(c, 1 / 2.4) - .055 : c *= 12.92,
					d = d > .0031308 ? 1.055 * Math.pow(d,
						1 / 2.4) - .055 : d *= 12.92, b =
					Math.min(Math.max(0, b), 1), c = Math
					.min(Math.max(0, c), 1), d = Math.min(
						Math.max(0, d), 1), [255 * b, 255 *
						c, 255 * d
					]
			}

			function J(a)
			{
				var b, c, d, e = a[0],
					f = a[1],
					g = a[2];
				return e /= 95.047, f /= 100, g /= 108.883,
					e = e > .008856 ? Math.pow(e, 1 / 3) :
					7.787 * e + 16 / 116, f = f > .008856 ?
					Math.pow(f, 1 / 3) : 7.787 * f + 16 /
					116, g = g > .008856 ? Math.pow(g, 1 /
						3) : 7.787 * g + 16 / 116, b = 116 *
					f - 16, c = 500 * (e - f), d = 200 * (
						f - g), [b, c, d]
			}

			function K(a)
			{
				return M(J(a))
			}

			function L(a)
			{
				var b, c, d, e, f = a[0],
					g = a[1],
					h = a[2];
				return f <= 8 ? (c = 100 * f / 903.3, e =
						c / 100 * 7.787 + 16 / 116) : (c =
						100 * Math.pow((f + 16) / 116, 3),
						e = Math.pow(c / 100, 1 / 3)), b =
					b / 95.047 <= .008856 ? b = 95.047 * (
						g / 500 + e - 16 / 116) / 7.787 :
					95.047 * Math.pow(g / 500 + e, 3), d =
					d / 108.883 <= .008859 ? d = 108.883 * (
						e - h / 200 - 16 / 116) / 7.787 :
					108.883 * Math.pow(e - h / 200, 3), [b,
						c, d
					]
			}

			function M(a)
			{
				var b, c, d, e = a[0],
					f = a[1],
					g = a[2];
				return b = Math.atan2(g, f), c = 360 * b /
					2 / Math.PI, c < 0 && (c += 360), d =
					Math.sqrt(f * f + g * g), [e, d, c]
			}

			function N(a)
			{
				return I(L(a))
			}

			function O(a)
			{
				var b, c, d, e = a[0],
					f = a[1],
					g = a[2];
				return d = g / 360 * 2 * Math.PI, b = f *
					Math.cos(d), c = f * Math.sin(d), [e, b,
						c
					]
			}

			function P(a)
			{
				return L(O(a))
			}

			function Q(a)
			{
				return N(O(a))
			}

			function R(a)
			{
				return Y[a]
			}

			function S(a)
			{
				return e(R(a))
			}

			function T(a)
			{
				return f(R(a))
			}

			function U(a)
			{
				return h(R(a))
			}

			function V(a)
			{
				return i(R(a))
			}

			function W(a)
			{
				return l(R(a))
			}

			function X(a)
			{
				return k(R(a))
			}
			c.exports = {
				rgb2hsl: e,
				rgb2hsv: f,
				rgb2hwb: h,
				rgb2cmyk: i,
				rgb2keyword: j,
				rgb2xyz: k,
				rgb2lab: l,
				rgb2lch: m,
				hsl2rgb: n,
				hsl2hsv: o,
				hsl2hwb: p,
				hsl2cmyk: q,
				hsl2keyword: s,
				hsv2rgb: t,
				hsv2hsl: u,
				hsv2hwb: v,
				hsv2cmyk: w,
				hsv2keyword: x,
				hwb2rgb: y,
				hwb2hsl: z,
				hwb2hsv: A,
				hwb2cmyk: B,
				hwb2keyword: C,
				cmyk2rgb: D,
				cmyk2hsl: E,
				cmyk2hsv: F,
				cmyk2hwb: G,
				cmyk2keyword: H,
				keyword2rgb: R,
				keyword2hsl: S,
				keyword2hsv: T,
				keyword2hwb: U,
				keyword2cmyk: V,
				keyword2lab: W,
				keyword2xyz: X,
				xyz2rgb: I,
				xyz2lab: J,
				xyz2lch: K,
				lab2xyz: L,
				lab2rgb: N,
				lab2lch: M,
				lch2lab: O,
				lch2xyz: P,
				lch2rgb: Q
			};
			var Y = {
					aliceblue: [240, 248, 255],
					antiquewhite: [250, 235, 215],
					aqua: [0, 255, 255],
					aquamarine: [127, 255, 212],
					azure: [240, 255, 255],
					beige: [245, 245, 220],
					bisque: [255, 228, 196],
					black: [0, 0, 0],
					blanchedalmond: [255, 235, 205],
					blue: [0, 0, 255],
					blueviolet: [138, 43, 226],
					brown: [165, 42, 42],
					burlywood: [222, 184, 135],
					cadetblue: [95, 158, 160],
					chartreuse: [127, 255, 0],
					chocolate: [210, 105, 30],
					coral: [255, 127, 80],
					cornflowerblue: [100, 149, 237],
					cornsilk: [255, 248, 220],
					crimson: [220, 20, 60],
					cyan: [0, 255, 255],
					darkblue: [0, 0, 139],
					darkcyan: [0, 139, 139],
					darkgoldenrod: [184, 134, 11],
					darkgray: [169, 169, 169],
					darkgreen: [0, 100, 0],
					darkgrey: [169, 169, 169],
					darkkhaki: [189, 183, 107],
					darkmagenta: [139, 0, 139],
					darkolivegreen: [85, 107, 47],
					darkorange: [255, 140, 0],
					darkorchid: [153, 50, 204],
					darkred: [139, 0, 0],
					darksalmon: [233, 150, 122],
					darkseagreen: [143, 188, 143],
					darkslateblue: [72, 61, 139],
					darkslategray: [47, 79, 79],
					darkslategrey: [47, 79, 79],
					darkturquoise: [0, 206, 209],
					darkviolet: [148, 0, 211],
					deeppink: [255, 20, 147],
					deepskyblue: [0, 191, 255],
					dimgray: [105, 105, 105],
					dimgrey: [105, 105, 105],
					dodgerblue: [30, 144, 255],
					firebrick: [178, 34, 34],
					floralwhite: [255, 250, 240],
					forestgreen: [34, 139, 34],
					fuchsia: [255, 0, 255],
					gainsboro: [220, 220, 220],
					ghostwhite: [248, 248, 255],
					gold: [255, 215, 0],
					goldenrod: [218, 165, 32],
					gray: [128, 128, 128],
					green: [0, 128, 0],
					greenyellow: [173, 255, 47],
					grey: [128, 128, 128],
					honeydew: [240, 255, 240],
					hotpink: [255, 105, 180],
					indianred: [205, 92, 92],
					indigo: [75, 0, 130],
					ivory: [255, 255, 240],
					khaki: [240, 230, 140],
					lavender: [230, 230, 250],
					lavenderblush: [255, 240, 245],
					lawngreen: [124, 252, 0],
					lemonchiffon: [255, 250, 205],
					lightblue: [173, 216, 230],
					lightcoral: [240, 128, 128],
					lightcyan: [224, 255, 255],
					lightgoldenrodyellow: [250, 250, 210],
					lightgray: [211, 211, 211],
					lightgreen: [144, 238, 144],
					lightgrey: [211, 211, 211],
					lightpink: [255, 182, 193],
					lightsalmon: [255, 160, 122],
					lightseagreen: [32, 178, 170],
					lightskyblue: [135, 206, 250],
					lightslategray: [119, 136, 153],
					lightslategrey: [119, 136, 153],
					lightsteelblue: [176, 196, 222],
					lightyellow: [255, 255, 224],
					lime: [0, 255, 0],
					limegreen: [50, 205, 50],
					linen: [250, 240, 230],
					magenta: [255, 0, 255],
					maroon: [128, 0, 0],
					mediumaquamarine: [102, 205, 170],
					mediumblue: [0, 0, 205],
					mediumorchid: [186, 85, 211],
					mediumpurple: [147, 112, 219],
					mediumseagreen: [60, 179, 113],
					mediumslateblue: [123, 104, 238],
					mediumspringgreen: [0, 250, 154],
					mediumturquoise: [72, 209, 204],
					mediumvioletred: [199, 21, 133],
					midnightblue: [25, 25, 112],
					mintcream: [245, 255, 250],
					mistyrose: [255, 228, 225],
					moccasin: [255, 228, 181],
					navajowhite: [255, 222, 173],
					navy: [0, 0, 128],
					oldlace: [253, 245, 230],
					olive: [128, 128, 0],
					olivedrab: [107, 142, 35],
					orange: [255, 165, 0],
					orangered: [255, 69, 0],
					orchid: [218, 112, 214],
					palegoldenrod: [238, 232, 170],
					palegreen: [152, 251, 152],
					paleturquoise: [175, 238, 238],
					palevioletred: [219, 112, 147],
					papayawhip: [255, 239, 213],
					peachpuff: [255, 218, 185],
					peru: [205, 133, 63],
					pink: [255, 192, 203],
					plum: [221, 160, 221],
					powderblue: [176, 224, 230],
					purple: [128, 0, 128],
					rebeccapurple: [102, 51, 153],
					red: [255, 0, 0],
					rosybrown: [188, 143, 143],
					royalblue: [65, 105, 225],
					saddlebrown: [139, 69, 19],
					salmon: [250, 128, 114],
					sandybrown: [244, 164, 96],
					seagreen: [46, 139, 87],
					seashell: [255, 245, 238],
					sienna: [160, 82, 45],
					silver: [192, 192, 192],
					skyblue: [135, 206, 235],
					slateblue: [106, 90, 205],
					slategray: [112, 128, 144],
					slategrey: [112, 128, 144],
					snow: [255, 250, 250],
					springgreen: [0, 255, 127],
					steelblue: [70, 130, 180],
					tan: [210, 180, 140],
					teal: [0, 128, 128],
					thistle: [216, 191, 216],
					tomato: [255, 99, 71],
					turquoise: [64, 224, 208],
					violet: [238, 130, 238],
					wheat: [245, 222, 179],
					white: [255, 255, 255],
					whitesmoke: [245, 245, 245],
					yellow: [255, 255, 0],
					yellowgreen: [154, 205, 50]
				},
				Z = {};
			for (var $ in Y) Z[JSON.stringify(Y[$])] = $
		},
		{}],
		4: [function(a, b, c)
		{
			var d = a(3),
				e = function()
				{
					return new j
				};
			for (var f in d)
			{
				e[f + "Raw"] = function(a)
				{
					return function(b)
					{
						return "number" ==
							typeof b && (b = Array
								.prototype.slice
								.call(arguments)),
							d[a](b)
					}
				}(f);
				var g = /(\w+)2(\w+)/.exec(f),
					h = g[1],
					i = g[2];
				e[h] = e[h] ||
				{}, e[h][i] = e[f] = function(a)
				{
					return function(b)
					{
						"number" == typeof b && (b =
							Array.prototype
							.slice.call(
								arguments));
						var c = d[a](b);
						if ("string" == typeof c ||
							void 0 === c) return c;
						for (var e = 0; e < c
							.length; e++) c[e] =
							Math.round(c[e]);
						return c
					}
				}(f)
			}
			var j = function()
			{
				this.convs = {}
			};
			j.prototype.routeSpace = function(a, b)
				{
					var c = b[0];
					return void 0 === c ? this.getValues(
						a) : ("number" == typeof c && (c =
							Array.prototype.slice.call(
								b)), this.setValues(a,
							c))
				}, j.prototype.setValues = function(a, b)
				{
					return this.space = a, this.convs = {},
						this.convs[a] = b, this
				}, j.prototype.getValues = function(a)
				{
					var b = this.convs[a];
					if (!b)
					{
						var c = this.space,
							d = this.convs[c];
						b = e[c][a](d), this.convs[a] = b
					}
					return b
				}, ["rgb", "hsl", "hsv", "cmyk", "keyword"]
				.forEach(function(a)
				{
					j.prototype[a] = function(b)
					{
						return this.routeSpace(a,
							arguments)
					}
				}), b.exports = e
		},
		{
			3: 3
		}],
		5: [function(a, b, c)
		{
			b.exports = {
				aliceblue: [240, 248, 255],
				antiquewhite: [250, 235, 215],
				aqua: [0, 255, 255],
				aquamarine: [127, 255, 212],
				azure: [240, 255, 255],
				beige: [245, 245, 220],
				bisque: [255, 228, 196],
				black: [0, 0, 0],
				blanchedalmond: [255, 235, 205],
				blue: [0, 0, 255],
				blueviolet: [138, 43, 226],
				brown: [165, 42, 42],
				burlywood: [222, 184, 135],
				cadetblue: [95, 158, 160],
				chartreuse: [127, 255, 0],
				chocolate: [210, 105, 30],
				coral: [255, 127, 80],
				cornflowerblue: [100, 149, 237],
				cornsilk: [255, 248, 220],
				crimson: [220, 20, 60],
				cyan: [0, 255, 255],
				darkblue: [0, 0, 139],
				darkcyan: [0, 139, 139],
				darkgoldenrod: [184, 134, 11],
				darkgray: [169, 169, 169],
				darkgreen: [0, 100, 0],
				darkgrey: [169, 169, 169],
				darkkhaki: [189, 183, 107],
				darkmagenta: [139, 0, 139],
				darkolivegreen: [85, 107, 47],
				darkorange: [255, 140, 0],
				darkorchid: [153, 50, 204],
				darkred: [139, 0, 0],
				darksalmon: [233, 150, 122],
				darkseagreen: [143, 188, 143],
				darkslateblue: [72, 61, 139],
				darkslategray: [47, 79, 79],
				darkslategrey: [47, 79, 79],
				darkturquoise: [0, 206, 209],
				darkviolet: [148, 0, 211],
				deeppink: [255, 20, 147],
				deepskyblue: [0, 191, 255],
				dimgray: [105, 105, 105],
				dimgrey: [105, 105, 105],
				dodgerblue: [30, 144, 255],
				firebrick: [178, 34, 34],
				floralwhite: [255, 250, 240],
				forestgreen: [34, 139, 34],
				fuchsia: [255, 0, 255],
				gainsboro: [220, 220, 220],
				ghostwhite: [248, 248, 255],
				gold: [255, 215, 0],
				goldenrod: [218, 165, 32],
				gray: [128, 128, 128],
				green: [0, 128, 0],
				greenyellow: [173, 255, 47],
				grey: [128, 128, 128],
				honeydew: [240, 255, 240],
				hotpink: [255, 105, 180],
				indianred: [205, 92, 92],
				indigo: [75, 0, 130],
				ivory: [255, 255, 240],
				khaki: [240, 230, 140],
				lavender: [230, 230, 250],
				lavenderblush: [255, 240, 245],
				lawngreen: [124, 252, 0],
				lemonchiffon: [255, 250, 205],
				lightblue: [173, 216, 230],
				lightcoral: [240, 128, 128],
				lightcyan: [224, 255, 255],
				lightgoldenrodyellow: [250, 250, 210],
				lightgray: [211, 211, 211],
				lightgreen: [144, 238, 144],
				lightgrey: [211, 211, 211],
				lightpink: [255, 182, 193],
				lightsalmon: [255, 160, 122],
				lightseagreen: [32, 178, 170],
				lightskyblue: [135, 206, 250],
				lightslategray: [119, 136, 153],
				lightslategrey: [119, 136, 153],
				lightsteelblue: [176, 196, 222],
				lightyellow: [255, 255, 224],
				lime: [0, 255, 0],
				limegreen: [50, 205, 50],
				linen: [250, 240, 230],
				magenta: [255, 0, 255],
				maroon: [128, 0, 0],
				mediumaquamarine: [102, 205, 170],
				mediumblue: [0, 0, 205],
				mediumorchid: [186, 85, 211],
				mediumpurple: [147, 112, 219],
				mediumseagreen: [60, 179, 113],
				mediumslateblue: [123, 104, 238],
				mediumspringgreen: [0, 250, 154],
				mediumturquoise: [72, 209, 204],
				mediumvioletred: [199, 21, 133],
				midnightblue: [25, 25, 112],
				mintcream: [245, 255, 250],
				mistyrose: [255, 228, 225],
				moccasin: [255, 228, 181],
				navajowhite: [255, 222, 173],
				navy: [0, 0, 128],
				oldlace: [253, 245, 230],
				olive: [128, 128, 0],
				olivedrab: [107, 142, 35],
				orange: [255, 165, 0],
				orangered: [255, 69, 0],
				orchid: [218, 112, 214],
				palegoldenrod: [238, 232, 170],
				palegreen: [152, 251, 152],
				paleturquoise: [175, 238, 238],
				palevioletred: [219, 112, 147],
				papayawhip: [255, 239, 213],
				peachpuff: [255, 218, 185],
				peru: [205, 133, 63],
				pink: [255, 192, 203],
				plum: [221, 160, 221],
				powderblue: [176, 224, 230],
				purple: [128, 0, 128],
				rebeccapurple: [102, 51, 153],
				red: [255, 0, 0],
				rosybrown: [188, 143, 143],
				royalblue: [65, 105, 225],
				saddlebrown: [139, 69, 19],
				salmon: [250, 128, 114],
				sandybrown: [244, 164, 96],
				seagreen: [46, 139, 87],
				seashell: [255, 245, 238],
				sienna: [160, 82, 45],
				silver: [192, 192, 192],
				skyblue: [135, 206, 235],
				slateblue: [106, 90, 205],
				slategray: [112, 128, 144],
				slategrey: [112, 128, 144],
				snow: [255, 250, 250],
				springgreen: [0, 255, 127],
				steelblue: [70, 130, 180],
				tan: [210, 180, 140],
				teal: [0, 128, 128],
				thistle: [216, 191, 216],
				tomato: [255, 99, 71],
				turquoise: [64, 224, 208],
				violet: [238, 130, 238],
				wheat: [245, 222, 179],
				white: [255, 255, 255],
				whitesmoke: [245, 245, 245],
				yellow: [255, 255, 0],
				yellowgreen: [154, 205, 50]
			}
		},
		{}],
		6: [function(b, c, d)
		{
			! function(b, e)
			{
				"object" == typeof d && void 0 !== c ? c
					.exports = e() : "function" ==
					typeof a && a.amd ? a(e) : b.moment =
					e()
			}(this, function()
			{
				"use strict";

				function a()
				{
					return nd.apply(null, arguments)
				}

				function d(a)
				{
					return a instanceof Array ||
						"[object Array]" === Object
						.prototype.toString.call(a)
				}

				function e(a)
				{
					return "[object Object]" === Object
						.prototype.toString.call(a)
				}

				function f(a)
				{
					var b;
					for (b in a) return !1;
					return !0
				}

				function g(a)
				{
					return a instanceof Date ||
						"[object Date]" === Object
						.prototype.toString.call(a)
				}

				function h(a, b)
				{
					var c, d = [];
					for (c = 0; c < a.length; ++c) d
						.push(b(a[c], c));
					return d
				}

				function i(a, b)
				{
					return Object.prototype
						.hasOwnProperty.call(a, b)
				}

				function j(a, b)
				{
					for (var c in b) i(b, c) && (a[c] =
						b[c]);
					return i(b, "toString") && (a
						.toString = b.toString), i(
						b, "valueOf") && (a
						.valueOf = b.valueOf), a
				}

				function k(a, b, c, d)
				{
					return rb(a, b, c, d, !0).utc()
				}

				function l()
				{
					return {
						empty: !1,
						unusedTokens: [],
						unusedInput: [],
						overflow: -2,
						charsLeftOver: 0,
						nullInput: !1,
						invalidMonth: null,
						invalidFormat: !1,
						userInvalidated: !1,
						iso: !1,
						parsedDateParts: [],
						meridiem: null
					}
				}

				function m(a)
				{
					return null == a._pf && (a._pf =
					l()), a._pf
				}

				function n(a)
				{
					if (null == a._isValid)
					{
						var b = m(a),
							c = od.call(b
								.parsedDateParts,
								function(a)
								{
									return null != a
								});
						a._isValid = !isNaN(a._d
								.getTime()) && b
							.overflow < 0 && !b.empty &&
							!b.invalidMonth && !b
							.invalidWeekday && !b
							.nullInput && !b
							.invalidFormat && !b
							.userInvalidated && (!b
								.meridiem || b
								.meridiem && c), a
							._strict && (a._isValid = a
								._isValid && 0 === b
								.charsLeftOver && 0 ===
								b.unusedTokens.length &&
								void 0 === b.bigHour)
					}
					return a._isValid
				}

				function o(a)
				{
					var b = k(NaN);
					return null != a ? j(m(b), a) : m(b)
						.userInvalidated = !0, b
				}

				function p(a)
				{
					return void 0 === a
				}

				function q(a, b)
				{
					var c, d, e;
					if (p(b._isAMomentObject) || (a
							._isAMomentObject = b
							._isAMomentObject), p(b
						._i) || (a._i = b._i), p(b
						._f) || (a._f = b._f), p(b
						._l) || (a._l = b._l), p(b
							._strict) || (a._strict = b
							._strict), p(b._tzm) || (a
							._tzm = b._tzm), p(b
						._isUTC) || (a._isUTC = b
							._isUTC), p(b._offset) || (a
							._offset = b._offset), p(b
							._pf) || (a._pf = m(b)), p(b
							._locale) || (a._locale = b
							._locale), pd.length > 0)
						for (c in pd) d = pd[c], e = b[
							d], p(e) || (a[d] = e);
					return a
				}

				function r(b)
				{
					q(this, b), this._d = new Date(
							null != b._d ? b._d
							.getTime() : NaN), !1 ===
						qd && (qd = !0, a.updateOffset(
							this), qd = !1)
				}

				function s(a)
				{
					return a instanceof r || null !=
						a && null != a._isAMomentObject
				}

				function t(a)
				{
					return a < 0 ? Math.ceil(a) || 0 :
						Math.floor(a)
				}

				function u(a)
				{
					var b = +a,
						c = 0;
					return 0 !== b && isFinite(b) && (
						c = t(b)), c
				}

				function v(a, b, c)
				{
					var d, e = Math.min(a.length, b
							.length),
						f = Math.abs(a.length - b
							.length),
						g = 0;
					for (d = 0; d < e; d++)(c && a[
						d] !== b[d] || !c && u(a[
						d]) !== u(b[d])) && g++;
					return g + f
				}

				function w(b)
				{
					!1 === a
						.suppressDeprecationWarnings &&
						"undefined" != typeof console &&
						console.warn && console.warn(
							"Deprecation warning: " + b)
				}

				function x(b, c)
				{
					var d = !0;
					return j(function()
					{
						return null != a
							.deprecationHandler &&
							a
							.deprecationHandler(
								null, b), d && (
								w(b +
									"\nArguments: " +
									Array
									.prototype
									.slice.call(
										arguments
										).join(
										", ") +
									"\n" + (
										new Error
										).stack
									), d = !1),
							c.apply(this,
								arguments)
					}, c)
				}

				function y(b, c)
				{
					null != a.deprecationHandler && a
						.deprecationHandler(b, c), rd[
						b] || (w(c), rd[b] = !0)
				}

				function z(a)
				{
					return a instanceof Function ||
						"[object Function]" === Object
						.prototype.toString.call(a)
				}

				function A(a)
				{
					var b, c;
					for (c in a) b = a[c], z(b) ? this[
						c] = b : this["_" + c] = b;
					this._config = a, this
						._ordinalParseLenient =
						new RegExp(this._ordinalParse
							.source + "|" + /\d{1,2}/
							.source)
				}

				function B(a, b)
				{
					var c, d = j(
					{}, a);
					for (c in b) i(b, c) && (e(a[c]) &&
						e(b[c]) ? (d[c] = {}, j(d[
							c], a[c]), j(d[c],
							b[c])) : null != b[c] ?
						d[c] = b[c] : delete d[c]);
					for (c in a) i(a, c) && !i(b, c) &&
						e(a[c]) && (d[c] = j(
						{}, d[c]));
					return d
				}

				function C(a)
				{
					null != a && this.set(a)
				}

				function D(a, b, c)
				{
					var d = this._calendar[a] || this
						._calendar.sameElse;
					return z(d) ? d.call(b, c) : d
				}

				function E(a)
				{
					var b = this._longDateFormat[a],
						c = this._longDateFormat[a
							.toUpperCase()];
					return b || !c ? b : (this
						._longDateFormat[a] = c
						.replace(/MMMM|MM|DD|dddd/g,
							function(a)
							{
								return a.slice(1)
							}), this
						._longDateFormat[a])
				}

				function F()
				{
					return this._invalidDate
				}

				function G(a)
				{
					return this._ordinal.replace("%d",
						a)
				}

				function H(a, b, c, d)
				{
					var e = this._relativeTime[c];
					return z(e) ? e(a, b, c, d) : e
						.replace(/%d/i, a)
				}

				function I(a, b)
				{
					var c = this._relativeTime[a > 0 ?
						"future" : "past"];
					return z(c) ? c(b) : c.replace(
						/%s/i, b)
				}

				function J(a, b)
				{
					var c = a.toLowerCase();
					yd[c] = yd[c + "s"] = yd[b] = a
				}

				function K(a)
				{
					return "string" == typeof a ? yd[
						a] || yd[a.toLowerCase()] :
						void 0
				}

				function L(a)
				{
					var b, c, d = {};
					for (c in a) i(a, c) && (b = K(
						c)) && (d[b] = a[c]);
					return d
				}

				function M(a, b)
				{
					zd[a] = b
				}

				function N(a)
				{
					var b = [];
					for (var c in a) b.push(
					{
						unit: c,
						priority: zd[c]
					});
					return b.sort(function(a, b)
					{
						return a.priority - b
							.priority
					}), b
				}

				function O(b, c)
				{
					return function(d)
					{
						return null != d ? (Q(this,
								b, d), a
							.updateOffset(this,
								c), this) : P(
							this, b)
					}
				}

				function P(a, b)
				{
					return a.isValid() ? a._d["get" + (a
							._isUTC ? "UTC" : "") +
						b]() : NaN
				}

				function Q(a, b, c)
				{
					a.isValid() && a._d["set" + (a
							._isUTC ? "UTC" : "") +
						b](c)
				}

				function R(a)
				{
					return a = K(a), z(this[a]) ? this[
						a]() : this
				}

				function S(a, b)
				{
					if ("object" == typeof a)
					{
						a = L(a);
						for (var c = N(a), d = 0; d < c
							.length; d++) this[c[d]
							.unit](a[c[d].unit])
					}
					else if (a = K(a), z(this[a]))
						return this[a](b);
					return this
				}

				function T(a, b, c)
				{
					var d = "" + Math.abs(a),
						e = b - d.length;
					return (a >= 0 ? c ? "+" : "" :
						"-") + Math.pow(10, Math.max(0,
							e)).toString().substr(1) + d
				}

				function U(a, b, c, d)
				{
					var e = d;
					"string" == typeof d && (e =
						function()
						{
							return this[d]()
						}), a && (Dd[a] = e), b && (
						Dd[b[0]] = function()
						{
							return T(e.apply(this,
									arguments),
								b[1], b[2])
						}), c && (Dd[c] = function()
					{
						return this.localeData()
							.ordinal(e.apply(
									this,
									arguments),
								a)
					})
				}

				function V(a)
				{
					return a.match(/\[[\s\S]/) ? a
						.replace(/^\[|\]$/g, "") : a
						.replace(/\\/g, "")
				}

				function W(a)
				{
					var b, c, d = a.match(Ad);
					for (b = 0, c = d.length; b <
						c; b++) Dd[d[b]] ? d[b] = Dd[d[
						b]] : d[b] = V(d[b]);
					return function(b)
					{
						var e, f = "";
						for (e = 0; e < c; e++) f +=
							d[
							e] instanceof Function ?
							d[e].call(b, a) : d[e];
						return f
					}
				}

				function X(a, b)
				{
					return a.isValid() ? (b = Y(b, a
								.localeData()), Cd[b] =
							Cd[b] || W(b), Cd[b](a)) : a
						.localeData().invalidDate()
				}

				function Y(a, b)
				{
					function c(a)
					{
						return b.longDateFormat(a) || a
					}
					var d = 5;
					for (Bd.lastIndex = 0; d >= 0 && Bd
						.test(a);) a = a.replace(Bd, c),
						Bd.lastIndex = 0, d -= 1;
					return a
				}

				function Z(a, b, c)
				{
					Vd[a] = z(b) ? b : function(a, d)
					{
						return a && c ? c : b
					}
				}

				function $(a, b)
				{
					return i(Vd, a) ? Vd[a](b._strict, b
						._locale) : new RegExp(_(a))
				}

				function _(a)
				{
					return aa(a.replace("\\", "")
						.replace(
							/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
							function(a, b, c, d, e)
							{
								return b || c ||
									d || e
							}))
				}

				function aa(a)
				{
					return a.replace(
						/[-\/\\^$*+?.()|[\]{}]/g,
						"\\$&")
				}

				function ba(a, b)
				{
					var c, d = b;
					for ("string" == typeof a && (a = [
							a]), "number" == typeof b &&
						(d = function(a, c)
						{
							c[b] = u(a)
						}), c = 0; c < a.length; c++)
						Wd[a[c]] = d
				}

				function ca(a, b)
				{
					ba(a, function(a, c, d, e)
					{
						d._w = d._w ||
						{}, b(a, d._w, d, e)
					})
				}

				function da(a, b, c)
				{
					null != b && i(Wd, a) && Wd[a](b, c
						._a, c, a)
				}

				function ea(a, b)
				{
					return new Date(Date.UTC(a, b + 1,
						0)).getUTCDate()
				}

				function fa(a, b)
				{
					return d(this._months) ? this
						._months[a.month()] : this
						._months[(this._months
								.isFormat || ee).test(
							b) ? "format" : "standalone"
							][a.month()]
				}

				function ga(a, b)
				{
					return d(this._monthsShort) ? this
						._monthsShort[a.month()] : this
						._monthsShort[ee.test(b) ?
							"format" : "standalone"][a
							.month()
						]
				}

				function ha(a, b, c)
				{
					var d, e, f, g = a
						.toLocaleLowerCase();
					if (!this._monthsParse)
						for (this._monthsParse = [],
							this._longMonthsParse = [],
							this._shortMonthsParse = [],
							d = 0; d < 12; ++d) f = k([
								2e3, d
							]), this._shortMonthsParse[
								d] = this.monthsShort(f,
								"").toLocaleLowerCase(),
							this._longMonthsParse[d] =
							this.months(f, "")
							.toLocaleLowerCase();
					return c ? "MMM" === b ? (e = td
							.call(this
								._shortMonthsParse, g),
							-1 !== e ? e : null) : (e =
							td.call(this
								._longMonthsParse, g), -
							1 !== e ? e : null) :
						"MMM" === b ? -1 !== (e = td
							.call(this
								._shortMonthsParse, g)
							) ? e : (e = td.call(this
								._longMonthsParse, g), -
							1 !== e ? e : null) : -1 !==
						(e = td.call(this
							._longMonthsParse, g)) ? e :
						(e = td.call(this
								._shortMonthsParse, g),
							-1 !== e ? e : null)
				}

				function ia(a, b, c)
				{
					var d, e, f;
					if (this._monthsParseExact)
					return ha.call(this, a, b, c);
					for (this._monthsParse || (this
							._monthsParse = [], this
							._longMonthsParse = [], this
							._shortMonthsParse = []),
						d = 0; d < 12; d++)
					{
						if (e = k([2e3, d]), c && !this
							._longMonthsParse[d] && (
								this._longMonthsParse[
								d] = new RegExp("^" +
									this.months(e, "")
									.replace(".", "") +
									"$", "i"), this
								._shortMonthsParse[d] =
								new RegExp("^" + this
									.monthsShort(e, "")
									.replace(".", "") +
									"$", "i")), c ||
							this._monthsParse[d] || (f =
								"^" + this.months(e,
								"") + "|^" + this
								.monthsShort(e, ""),
								this._monthsParse[d] =
								new RegExp(f.replace(
									".", ""), "i")),
							c && "MMMM" === b && this
							._longMonthsParse[d].test(a)
							) return d;
						if (c && "MMM" === b && this
							._shortMonthsParse[d].test(
								a)) return d;
						if (!c && this._monthsParse[d]
							.test(a)) return d
					}
				}

				function ja(a, b)
				{
					var c;
					if (!a.isValid()) return a;
					if ("string" == typeof b)
						if (/^\d+$/.test(b)) b = u(b);
						else if ("number" != typeof(b =
							a.localeData().monthsParse(
								b))) return a;
					return c = Math.min(a.date(), ea(a
						.year(), b)), a._d["set" + (
							a._isUTC ? "UTC" : "") +
						"Month"](b, c), a
				}

				function ka(b)
				{
					return null != b ? (ja(this, b), a
						.updateOffset(this, !0),
						this) : P(this, "Month")
				}

				function la()
				{
					return ea(this.year(), this.month())
				}

				function ma(a)
				{
					return this._monthsParseExact ? (i(
							this, "_monthsRegex") ||
						oa.call(this), a ? this
						._monthsShortStrictRegex :
						this._monthsShortRegex) : (
						i(this,
						"_monthsShortRegex") || (
							this._monthsShortRegex =
							he), this
						._monthsShortStrictRegex &&
						a ? this
						._monthsShortStrictRegex :
						this._monthsShortRegex)
				}

				function na(a)
				{
					return this._monthsParseExact ? (i(
							this, "_monthsRegex") ||
						oa.call(this), a ? this
						._monthsStrictRegex : this
						._monthsRegex) : (i(this,
							"_monthsRegex") || (this
							._monthsRegex = ie),
						this._monthsStrictRegex &&
						a ? this
						._monthsStrictRegex : this
						._monthsRegex)
				}

				function oa()
				{
					function a(a, b)
					{
						return b.length - a.length
					}
					var b, c, d = [],
						e = [],
						f = [];
					for (b = 0; b < 12; b++) c = k([2e3,
						b
					]), d.push(this.monthsShort(c,
						"")), e.push(this.months(c,
						"")), f.push(this.months(c,
						"")), f.push(this
						.monthsShort(c, ""));
					for (d.sort(a), e.sort(a), f.sort(
						a), b = 0; b < 12; b++) d[b] =
						aa(d[b]), e[b] = aa(e[b]);
					for (b = 0; b < 24; b++) f[b] = aa(
						f[b]);
					this._monthsRegex = new RegExp(
							"^(" + f.join("|") + ")",
							"i"), this
						._monthsShortRegex = this
						._monthsRegex, this
						._monthsStrictRegex =
						new RegExp("^(" + e.join("|") +
							")", "i"), this
						._monthsShortStrictRegex =
						new RegExp("^(" + d.join("|") +
							")", "i")
				}

				function pa(a)
				{
					return qa(a) ? 366 : 365
				}

				function qa(a)
				{
					return a % 4 == 0 && a % 100 != 0 ||
						a % 400 == 0
				}

				function ra()
				{
					return qa(this.year())
				}

				function sa(a, b, c, d, e, f, g)
				{
					var h = new Date(a, b, c, d, e, f,
						g);
					return a < 100 && a >= 0 &&
						isFinite(h.getFullYear()) && h
						.setFullYear(a), h
				}

				function ta(a)
				{
					var b = new Date(Date.UTC.apply(
						null, arguments));
					return a < 100 && a >= 0 &&
						isFinite(b.getUTCFullYear()) &&
						b.setUTCFullYear(a), b
				}

				function ua(a, b, c)
				{
					var d = 7 + b - c;
					return -(7 + ta(a, 0, d)
					.getUTCDay() - b) % 7 + d - 1
				}

				function va(a, b, c, d, e)
				{
					var f, g, h = (7 + c - d) % 7,
						i = ua(a, d, e),
						j = 1 + 7 * (b - 1) + h + i;
					return j <= 0 ? (f = a - 1, g = pa(
						f) + j) : j > pa(a) ? (f =
						a + 1, g = j - pa(a)) : (f =
						a, g = j),
					{
						year: f,
						dayOfYear: g
					}
				}

				function wa(a, b, c)
				{
					var d, e, f = ua(a.year(), b, c),
						g = Math.floor((a.dayOfYear() -
							f - 1) / 7) + 1;
					return g < 1 ? (e = a.year() - 1,
							d = g + xa(e, b, c)) : g >
						xa(a.year(), b, c) ? (d = g -
							xa(a.year(), b, c), e = a
							.year() + 1) : (e = a
						.year(), d = g),
						{
							week: d,
							year: e
						}
				}

				function xa(a, b, c)
				{
					var d = ua(a, b, c),
						e = ua(a + 1, b, c);
					return (pa(a) - d + e) / 7
				}

				function ya(a)
				{
					return wa(a, this._week.dow, this
						._week.doy).week
				}

				function za()
				{
					return this._week.dow
				}

				function Aa()
				{
					return this._week.doy
				}

				function Ba(a)
				{
					var b = this.localeData().week(
					this);
					return null == a ? b : this.add(7 *
						(a - b), "d")
				}

				function Ca(a)
				{
					var b = wa(this, 1, 4).week;
					return null == a ? b : this.add(7 *
						(a - b), "d")
				}

				function Da(a, b)
				{
					return "string" != typeof a ? a :
						isNaN(a) ? (a = b.weekdaysParse(
								a), "number" ==
							typeof a ? a : null) :
						parseInt(a, 10)
				}

				function Ea(a, b)
				{
					return "string" == typeof a ? b
						.weekdaysParse(a) % 7 || 7 :
						isNaN(a) ? null : a
				}

				function Fa(a, b)
				{
					return d(this._weekdays) ? this
						._weekdays[a.day()] : this
						._weekdays[this._weekdays
							.isFormat.test(b) ?
							"format" : "standalone"][a
							.day()
						]
				}

				function Ga(a)
				{
					return this._weekdaysShort[a.day()]
				}

				function Ha(a)
				{
					return this._weekdaysMin[a.day()]
				}

				function Ia(a, b, c)
				{
					var d, e, f, g = a
						.toLocaleLowerCase();
					if (!this._weekdaysParse)
						for (this._weekdaysParse = [],
							this
							._shortWeekdaysParse = [],
							this._minWeekdaysParse = [],
							d = 0; d < 7; ++d) f = k([
								2e3, 1
							]).day(d), this
							._minWeekdaysParse[d] = this
							.weekdaysMin(f, "")
							.toLocaleLowerCase(), this
							._shortWeekdaysParse[d] =
							this.weekdaysShort(f, "")
							.toLocaleLowerCase(), this
							._weekdaysParse[d] = this
							.weekdays(f, "")
							.toLocaleLowerCase();
					return c ? "dddd" === b ? (e = td
							.call(this._weekdaysParse,
								g), -1 !== e ? e : null
							) : "ddd" === b ? (e = td
							.call(this
								._shortWeekdaysParse, g
								), -1 !== e ? e : null
							) : (e = td.call(this
								._minWeekdaysParse, g),
							-1 !== e ? e : null) :
						"dddd" === b ? -1 !== (e = td
							.call(this._weekdaysParse,
								g)) ? e : -1 !== (e = td
							.call(this
								._shortWeekdaysParse, g)
							) ? e : (e = td.call(this
								._minWeekdaysParse, g),
							-1 !== e ? e : null) :
						"ddd" === b ? -1 !== (e = td
							.call(this
								._shortWeekdaysParse, g)
							) ? e : -1 !== (e = td.call(
							this._weekdaysParse, g)) ?
						e : (e = td.call(this
								._minWeekdaysParse, g),
							-1 !== e ? e : null) : -
						1 !== (e = td.call(this
							._minWeekdaysParse, g)) ?
						e : -1 !== (e = td.call(this
							._weekdaysParse, g)) ? e : (
							e = td.call(this
								._shortWeekdaysParse, g
								), -1 !== e ? e : null)
				}

				function Ja(a, b, c)
				{
					var d, e, f;
					if (this._weekdaysParseExact)
					return Ia.call(this, a, b, c);
					for (this._weekdaysParse || (this
							._weekdaysParse = [], this
							._minWeekdaysParse = [],
							this
							._shortWeekdaysParse = [],
							this._fullWeekdaysParse = []
							), d = 0; d < 7; d++)
					{
						if (e = k([2e3, 1]).day(d), c &&
							!this._fullWeekdaysParse[
							d] && (this
								._fullWeekdaysParse[d] =
								new RegExp("^" + this
									.weekdays(e, "")
									.replace(".",
									".?") + "$", "i"),
								this
								._shortWeekdaysParse[
								d] = new RegExp("^" +
									this.weekdaysShort(
										e, "").replace(
										".", ".?") +
									"$", "i"), this
								._minWeekdaysParse[d] =
								new RegExp("^" + this
									.weekdaysMin(e, "")
									.replace(".",
									".?") + "$", "i")),
							this._weekdaysParse[d] || (
								f = "^" + this.weekdays(
									e, "") + "|^" + this
								.weekdaysShort(e, "") +
								"|^" + this.weekdaysMin(
									e, ""), this
								._weekdaysParse[d] =
								new RegExp(f.replace(
									".", ""), "i")),
							c && "dddd" === b && this
							._fullWeekdaysParse[d].test(
								a)) return d;
						if (c && "ddd" === b && this
							._shortWeekdaysParse[d]
							.test(a)) return d;
						if (c && "dd" === b && this
							._minWeekdaysParse[d].test(
								a)) return d;
						if (!c && this._weekdaysParse[d]
							.test(a)) return d
					}
				}

				function Ka(a)
				{
					if (!this.isValid()) return null !=
						a ? this : NaN;
					var b = this._isUTC ? this._d
						.getUTCDay() : this._d.getDay();
					return null != a ? (a = Da(a, this
							.localeData()), this
						.add(a - b, "d")) : b
				}

				function La(a)
				{
					if (!this.isValid()) return null !=
						a ? this : NaN;
					var b = (this.day() + 7 - this
						.localeData()._week.dow) % 7;
					return null == a ? b : this.add(a -
						b, "d")
				}

				function Ma(a)
				{
					if (!this.isValid()) return null !=
						a ? this : NaN;
					if (null != a)
					{
						var b = Ea(a, this
					.localeData());
						return this.day(this.day() % 7 ?
							b : b - 7)
					}
					return this.day() || 7
				}

				function Na(a)
				{
					return this._weekdaysParseExact ? (
						i(this, "_weekdaysRegex") ||
						Qa.call(this), a ? this
						._weekdaysStrictRegex : this
						._weekdaysRegex) : (i(this,
							"_weekdaysRegex") || (
							this._weekdaysRegex = oe
							), this
						._weekdaysStrictRegex && a ?
						this._weekdaysStrictRegex :
						this._weekdaysRegex)
				}

				function Oa(a)
				{
					return this._weekdaysParseExact ? (
							i(this, "_weekdaysRegex") ||
							Qa.call(this), a ? this
							._weekdaysShortStrictRegex :
							this._weekdaysShortRegex) :
						(i(this,
							"_weekdaysShortRegex") || (
								this
								._weekdaysShortRegex =
								pe), this
							._weekdaysShortStrictRegex &&
							a ? this
							._weekdaysShortStrictRegex :
							this._weekdaysShortRegex)
				}

				function Pa(a)
				{
					return this._weekdaysParseExact ? (
						i(this, "_weekdaysRegex") ||
						Qa.call(this), a ? this
						._weekdaysMinStrictRegex :
						this._weekdaysMinRegex) : (
						i(this,
						"_weekdaysMinRegex") || (
							this._weekdaysMinRegex =
							qe), this
						._weekdaysMinStrictRegex &&
						a ? this
						._weekdaysMinStrictRegex :
						this._weekdaysMinRegex)
				}

				function Qa()
				{
					function a(a, b)
					{
						return b.length - a.length
					}
					var b, c, d, e, f, g = [],
						h = [],
						i = [],
						j = [];
					for (b = 0; b < 7; b++) c = k([2e3,
							1
						]).day(b), d = this.weekdaysMin(
							c, ""), e = this
						.weekdaysShort(c, ""), f = this
						.weekdays(c, ""), g.push(d), h
						.push(e), i.push(f), j.push(d),
						j.push(e), j.push(f);
					for (g.sort(a), h.sort(a), i.sort(
						a), j.sort(a), b = 0; b < 7; b++
						) h[b] = aa(h[b]), i[b] = aa(i[
						b]), j[b] = aa(j[b]);
					this._weekdaysRegex = new RegExp(
							"^(" + j.join("|") + ")",
							"i"), this
						._weekdaysShortRegex = this
						._weekdaysRegex, this
						._weekdaysMinRegex = this
						._weekdaysRegex, this
						._weekdaysStrictRegex =
						new RegExp("^(" + i.join("|") +
							")", "i"), this
						._weekdaysShortStrictRegex =
						new RegExp("^(" + h.join("|") +
							")", "i"), this
						._weekdaysMinStrictRegex =
						new RegExp("^(" + g.join("|") +
							")", "i")
				}

				function Ra()
				{
					return this.hours() % 12 || 12
				}

				function Sa()
				{
					return this.hours() || 24
				}

				function Ta(a, b)
				{
					U(a, 0, 0, function()
					{
						return this.localeData()
							.meridiem(this
								.hours(), this
								.minutes(), b)
					})
				}

				function Ua(a, b)
				{
					return b._meridiemParse
				}

				function Va(a)
				{
					return "p" === (a + "")
					.toLowerCase().charAt(0)
				}

				function Wa(a, b, c)
				{
					return a > 11 ? c ? "pm" : "PM" :
						c ? "am" : "AM"
				}

				function Xa(a)
				{
					return a ? a.toLowerCase().replace(
						"_", "-") : a
				}

				function Ya(a)
				{
					for (var b, c, d, e, f = 0; f < a
						.length;)
					{
						for (e = Xa(a[f]).split("-"),
							b = e.length, c = Xa(a[f +
								1]), c = c ? c.split(
								"-") : null; b > 0;)
						{
							if (d = Za(e.slice(0, b)
									.join("-")))
							return d;
							if (c && c.length >= b && v(
									e, c, !0) >= b - 1)
								break;
							b--
						}
						f++
					}
					return null
				}

				function Za(a)
				{
					var d = null;
					if (!ve[a] && void 0 !== c && c && c
						.exports) try
					{
						d = re._abbr, b(
								"./locale/" + a),
							$a(d)
					}
					catch (a)
					{}
					return ve[a]
				}

				function $a(a, b)
				{
					var c;
					return a && (c = p(b) ? bb(a) : _a(
						a, b)) && (re = c), re._abbr
				}

				function _a(a, b)
				{
					if (null !== b)
					{
						var c = ue;
						return b.abbr = a, null != ve[
							a] ? (y("defineLocaleOverride",
									"use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
									), c = ve[a]
								._config) : null != b
							.parentLocale && (null !=
								ve[b.parentLocale] ? c =
								ve[b.parentLocale]
								._config : y(
									"parentLocaleUndefined",
									"specified parentLocale is not defined yet. See http://momentjs.com/guides/#/warnings/parent-locale/"
									)), ve[a] = new C(B(
								c, b)), $a(a), ve[a]
					}
					return delete ve[a], null
				}

				function ab(a, b)
				{
					if (null != b)
					{
						var c, d = ue;
						null != ve[a] && (d = ve[a]
								._config), b = B(d, b),
							c = new C(b), c
							.parentLocale = ve[a], ve[
							a] = c, $a(a)
					}
					else null != ve[a] && (null != ve[a]
						.parentLocale ? ve[a] = ve[
							a].parentLocale :
						null != ve[a] && delete ve[
							a]);
					return ve[a]
				}

				function bb(a)
				{
					var b;
					if (a && a._locale && a._locale
						._abbr && (a = a._locale._abbr),
						!a) return re;
					if (!d(a))
					{
						if (b = Za(a)) return b;
						a = [a]
					}
					return Ya(a)
				}

				function cb()
				{
					return sd(ve)
				}

				function db(a)
				{
					var b, c = a._a;
					return c && -2 === m(a).overflow &&
						(b = c[Yd] < 0 || c[Yd] > 11 ?
							Yd : c[Zd] < 1 || c[Zd] >
							ea(c[Xd], c[Yd]) ? Zd : c[
								$d] < 0 || c[$d] > 24 ||
							24 === c[$d] && (0 !== c[
								_d] || 0 !== c[ae] ||
								0 !== c[be]) ? $d : c[
								_d] < 0 || c[_d] > 59 ?
							_d : c[ae] < 0 || c[ae] >
							59 ? ae : c[be] < 0 || c[
							be] > 999 ? be : -1, m(a)
							._overflowDayOfYear && (b <
								Xd || b > Zd) && (b =
								Zd), m(a)
							._overflowWeeks && -1 ===
							b && (b = ce), m(a)
							._overflowWeekday && -1 ===
							b && (b = de), m(a)
							.overflow = b), a
				}

				function eb(a)
				{
					var b, c, d, e, f, g, h = a._i,
						i = we.exec(h) || xe.exec(h);
					if (i)
					{
						for (m(a).iso = !0, b = 0, c =
							ze.length; b < c; b++)
							if (ze[b][1].exec(i[1]))
							{
								e = ze[b][0], d = !1 !==
									ze[b][2];
								break
							} if (null == e)
						return void(a._isValid = !1);
						if (i[3])
						{
							for (b = 0, c = Ae
								.length; b < c; b++)
								if (Ae[b][1].exec(i[3]))
								{
									f = (i[2] || " ") +
										Ae[b][0];
									break
								} if (null == f)
							return void(a
									._isValid = !1)
						}
						if (!d && null != f)
						return void(a._isValid = !1);
						if (i[4])
						{
							if (!ye.exec(i[4]))
							return void(a
									._isValid = !1);
							g = "Z"
						}
						a._f = e + (f || "") + (g ||
							""), kb(a)
					}
					else a._isValid = !1
				}

				function fb(b)
				{
					var c = Be.exec(b._i);
					if (null !== c) return void(b._d =
						new Date(+c[1]));
					eb(b), !1 === b._isValid && (
						delete b._isValid, a
						.createFromInputFallback(b))
				}

				function gb(a, b, c)
				{
					return null != a ? a : null != b ?
						b : c
				}

				function hb(b)
				{
					var c = new Date(a.now());
					return b._useUTC ? [c
						.getUTCFullYear(), c
						.getUTCMonth(), c
						.getUTCDate()
					] : [c.getFullYear(), c
						.getMonth(), c.getDate()
					]
				}

				function ib(a)
				{
					var b, c, d, e, f = [];
					if (!a._d)
					{
						for (d = hb(a), a._w && null ==
							a._a[Zd] && null == a._a[
							Yd] && jb(a), a
							._dayOfYear && (e = gb(a._a[
									Xd], d[Xd]), a
								._dayOfYear > pa(e) && (
									m(a)
									._overflowDayOfYear = !
									0), c = ta(e, 0, a
									._dayOfYear), a._a[
									Yd] = c
								.getUTCMonth(), a._a[
								Zd] = c.getUTCDate()),
							b = 0; b < 3 && null == a
							._a[b]; ++b) a._a[b] = f[
							b] = d[b];
						for (; b < 7; b++) a._a[b] = f[
								b] = null == a._a[b] ?
							2 === b ? 1 : 0 : a._a[b];
						24 === a._a[$d] && 0 === a._a[
								_d] && 0 === a._a[ae] &&
							0 === a._a[be] && (a
								._nextDay = !0, a._a[
								$d] = 0), a._d = (a
								._useUTC ? ta : sa)
							.apply(null, f), null != a
							._tzm && a._d.setUTCMinutes(
								a._d.getUTCMinutes() - a
								._tzm), a._nextDay && (a
								._a[$d] = 24)
					}
				}

				function jb(a)
				{
					var b, c, d, e, f, g, h, i;
					b = a._w, null != b.GG || null != b
						.W || null != b.E ? (f = 1, g =
							4, c = gb(b.GG, a._a[Xd],
								wa(sb(), 1, 4).year),
							d = gb(b.W, 1), ((e = gb(b
									.E, 1)) < 1 || e >
								7) && (i = !0)) : (f = a
							._locale._week.dow, g = a
							._locale._week.doy, c = gb(b
								.gg, a._a[Xd], wa(sb(),
									f, g).year), d = gb(
								b.w, 1), null != b.d ? (
								(e = b.d) < 0 || e > 6
								) && (i = !0) : null !=
							b.e ? (e = b.e + f, (b.e <
								0 || b.e > 6) && (
								i = !0)) : e = f), d <
						1 || d > xa(c, f, g) ? m(a)
						._overflowWeeks = !0 : null !=
						i ? m(a)._overflowWeekday = !0 :
						(h = va(c, d, e, f, g), a._a[
							Xd] = h.year, a._dayOfYear =
							h.dayOfYear)
				}

				function kb(b)
				{
					if (b._f === a.ISO_8601)
					return void eb(b);
					b._a = [], m(b).empty = !0;
					var c, d, e, f, g, h = "" + b._i,
						i = h.length,
						j = 0;
					for (e = Y(b._f, b._locale).match(
							Ad) || [], c = 0; c < e
						.length; c++) f = e[c], d = (h
							.match($(f, b)) || [])[0],
						d && (g = h.substr(0, h.indexOf(
								d)), g.length > 0 && m(
								b).unusedInput.push(g),
							h = h.slice(h.indexOf(d) + d
								.length), j += d.length
							), Dd[f] ? (d ? m(b)
							.empty = !1 : m(b)
							.unusedTokens.push(f), da(f,
								d, b)) : b._strict && !
						d && m(b).unusedTokens.push(f);
					m(b).charsLeftOver = i - j, h
						.length > 0 && m(b).unusedInput
						.push(h), b._a[$d] <= 12 && !
						0 === m(b).bigHour && b._a[$d] >
						0 && (m(b).bigHour = void 0), m(
							b).parsedDateParts = b._a
						.slice(0), m(b).meridiem = b
						._meridiem, b._a[$d] = lb(b
							._locale, b._a[$d], b
							._meridiem), ib(b), db(b)
				}

				function lb(a, b, c)
				{
					var d;
					return null == c ? b : null != a
						.meridiemHour ? a.meridiemHour(
							b, c) : null != a.isPM ? (
							d = a.isPM(c), d && b <
							12 && (b += 12), d || 12 !==
							b || (b = 0), b) : b
				}

				function mb(a)
				{
					var b, c, d, e, f;
					if (0 === a._f.length) return m(a)
						.invalidFormat = !0, void(a
							._d = new Date(NaN));
					for (e = 0; e < a._f.length; e++)
						f = 0, b = q(
						{}, a), null != a._useUTC && (b
							._useUTC = a._useUTC), b
						._f = a._f[e], kb(b), n(b) && (
							f += m(b).charsLeftOver,
							f += 10 * m(b).unusedTokens
							.length, m(b).score = f, (
								null == d || f < d) && (
								d = f, c = b));
					j(a, c || b)
				}

				function nb(a)
				{
					if (!a._d)
					{
						var b = L(a._i);
						a._a = h([b.year, b.month, b
							.day || b.date, b
							.hour, b.minute, b
							.second, b
							.millisecond
						], function(a)
						{
							return a &&
								parseInt(a, 10)
						}), ib(a)
					}
				}

				function ob(a)
				{
					var b = new r(db(pb(a)));
					return b._nextDay && (b.add(1, "d"),
						b._nextDay = void 0), b
				}

				function pb(a)
				{
					var b = a._i,
						c = a._f;
					return a._locale = a._locale || bb(a
							._l), null === b ||
						void 0 === c && "" === b ? o(
						{
							nullInput: !0
						}) : ("string" == typeof b && (a
								._i = b = a._locale
								.preparse(b)), s(b) ?
							new r(db(b)) : (d(c) ? mb(
								a) : g(b) ? a._d = b :
								c ? kb(a) : qb(a), n(
								a) || (a._d = null), a))
				}

				function qb(b)
				{
					var c = b._i;
					void 0 === c ? b._d = new Date(a
							.now()) : g(c) ? b._d =
						new Date(c.valueOf()) :
						"string" == typeof c ? fb(b) :
						d(c) ? (b._a = h(c.slice(0),
							function(a)
							{
								return parseInt(a,
									10)
							}), ib(b)) : "object" ==
						typeof c ? nb(b) : "number" ==
						typeof c ? b._d = new Date(c) :
						a.createFromInputFallback(b)
				}

				function rb(a, b, c, g, h)
				{
					var i = {};
					return "boolean" == typeof c && (g =
							c, c = void 0), (e(a) && f(
								a) || d(a) && 0 === a
							.length) && (a = void 0), i
						._isAMomentObject = !0, i
						._useUTC = i._isUTC = h, i._l =
						c, i._i = a, i._f = b, i
						._strict = g, ob(i)
				}

				function sb(a, b, c, d)
				{
					return rb(a, b, c, d, !1)
				}

				function tb(a, b)
				{
					var c, e;
					if (1 === b.length && d(b[0]) && (
							b = b[0]), !b.length)
					return sb();
					for (c = b[0], e = 1; e < b
						.length; ++e) b[e].isValid() &&
						!b[e][a](c) || (c = b[e]);
					return c
				}

				function ub()
				{
					return tb("isBefore", [].slice.call(
						arguments, 0))
				}

				function vb()
				{
					return tb("isAfter", [].slice.call(
						arguments, 0))
				}

				function wb(a)
				{
					var b = L(a),
						c = b.year || 0,
						d = b.quarter || 0,
						e = b.month || 0,
						f = b.week || 0,
						g = b.day || 0,
						h = b.hour || 0,
						i = b.minute || 0,
						j = b.second || 0,
						k = b.millisecond || 0;
					this._milliseconds = +k + 1e3 * j +
						6e4 * i + 1e3 * h * 60 * 60,
						this._days = +g + 7 * f, this
						._months = +e + 3 * d + 12 * c,
						this._data = {}, this._locale =
						bb(), this._bubble()
				}

				function xb(a)
				{
					return a instanceof wb
				}

				function yb(a, b)
				{
					U(a, 0, 0, function()
					{
						var a = this
						.utcOffset(),
							c = "+";
						return a < 0 && (a = -a,
								c = "-"), c + T(
								~~(a / 60), 2) +
							b + T(~~a % 60, 2)
					})
				}

				function zb(a, b)
				{
					var c = (b || "").match(a) || [],
						d = c[c.length - 1] || [],
						e = (d + "").match(Fe) || ["-",
							0, 0
						],
						f = 60 * e[1] + u(e[2]);
					return "+" === e[0] ? f : -f
				}

				function Ab(b, c)
				{
					var d, e;
					return c._isUTC ? (d = c.clone(),
							e = (s(b) || g(b) ? b
								.valueOf() : sb(b)
								.valueOf()) - d
							.valueOf(), d._d.setTime(d
								._d.valueOf() + e), a
							.updateOffset(d, !1), d) :
						sb(b).local()
				}

				function Bb(a)
				{
					return 15 * -Math.round(a._d
						.getTimezoneOffset() / 15)
				}

				function Cb(b, c)
				{
					var d, e = this._offset || 0;
					return this.isValid() ? null != b ?
						("string" == typeof b ? b = zb(
								Sd, b) : Math.abs(b) <
							16 && (b *= 60), !this
							._isUTC && c && (d = Bb(
								this)), this._offset =
							b, this._isUTC = !0, null !=
							d && this.add(d, "m"), e !==
							b && (!c || this
								._changeInProgress ? Tb(
									this, Nb(b - e,
									"m"), 1, !1) : this
								._changeInProgress || (
									this
									._changeInProgress = !
									0, a.updateOffset(
										this, !0), this
									._changeInProgress =
									null)), this) : this
						._isUTC ? e : Bb(this) : null !=
						b ? this : NaN
				}

				function Db(a, b)
				{
					return null != a ? ("string" !=
							typeof a && (a = -a), this
							.utcOffset(a, b), this) : -
						this.utcOffset()
				}

				function Eb(a)
				{
					return this.utcOffset(0, a)
				}

				function Fb(a)
				{
					return this._isUTC && (this
							.utcOffset(0, a), this
							._isUTC = !1, a && this
							.subtract(Bb(this), "m")),
						this
				}

				function Gb()
				{
					return this._tzm ? this.utcOffset(
							this._tzm) : "string" ==
						typeof this._i && this
						.utcOffset(zb(Rd, this._i)),
						this
				}

				function Hb(a)
				{
					return !!this.isValid() && (a = a ?
						sb(a).utcOffset() : 0, (this
							.utcOffset() - a) %
						60 == 0)
				}

				function Ib()
				{
					return this.utcOffset() > this
						.clone().month(0).utcOffset() ||
						this.utcOffset() > this.clone()
						.month(5).utcOffset()
				}

				function Jb()
				{
					if (!p(this._isDSTShifted))
					return this._isDSTShifted;
					var a = {};
					if (q(a, this), a = pb(a), a._a)
					{
						var b = a._isUTC ? k(a._a) : sb(
							a._a);
						this._isDSTShifted = this
							.isValid() && v(a._a, b
								.toArray()) > 0
					}
					else this._isDSTShifted = !1;
					return this._isDSTShifted
				}

				function Kb()
				{
					return !!this.isValid() && !this
						._isUTC
				}

				function Lb()
				{
					return !!this.isValid() && this
						._isUTC
				}

				function Mb()
				{
					return !!this.isValid() && (this
						._isUTC && 0 === this
						._offset)
				}

				function Nb(a, b)
				{
					var c, d, e, f = a,
						g = null;
					return xb(a) ? f = {
							ms: a._milliseconds,
							d: a._days,
							M: a._months
						} : "number" == typeof a ? (
							f = {}, b ? f[b] = a : f
							.milliseconds = a) : (g = Ge
							.exec(a)) ? (c = "-" === g[
							1] ? -1 : 1, f = {
							y: 0,
							d: u(g[Zd]) * c,
							h: u(g[$d]) * c,
							m: u(g[_d]) * c,
							s: u(g[ae]) * c,
							ms: u(g[be]) * c
						}) : (g = He.exec(a)) ? (c =
							"-" === g[1] ? -1 : 1, f = {
								y: Ob(g[2], c),
								M: Ob(g[3], c),
								w: Ob(g[4], c),
								d: Ob(g[5], c),
								h: Ob(g[6], c),
								m: Ob(g[7], c),
								s: Ob(g[8], c)
							}) : null == f ? f = {} :
						"object" == typeof f && (
							"from" in f || "to" in f) &&
						(e = Qb(sb(f.from), sb(f.to)),
							f = {}, f.ms = e
							.milliseconds, f.M = e
							.months), d = new wb(f), xb(
							a) && i(a, "_locale") && (d
							._locale = a._locale), d
				}

				function Ob(a, b)
				{
					var c = a && parseFloat(a.replace(
						",", "."));
					return (isNaN(c) ? 0 : c) * b
				}

				function Pb(a, b)
				{
					var c = {
						milliseconds: 0,
						months: 0
					};
					return c.months = b.month() - a
						.month() + 12 * (b.year() - a
							.year()), a.clone().add(c
							.months, "M").isAfter(b) &&
						--c.months, c.milliseconds = +
						b - +a.clone().add(c.months,
							"M"), c
				}

				function Qb(a, b)
				{
					var c;
					return a.isValid() && b.isValid() ?
						(b = Ab(b, a), a.isBefore(b) ?
							c = Pb(a, b) : (c = Pb(b,
								a), c.milliseconds = -c
								.milliseconds, c
								.months = -c.months), c
							) :
						{
							milliseconds: 0,
							months: 0
						}
				}

				function Rb(a)
				{
					return a < 0 ? -1 * Math.round(-1 *
						a) : Math.round(a)
				}

				function Sb(a, b)
				{
					return function(c, d)
					{
						var e, f;
						return null === d || isNaN(+
								d) || (y(b,
									"moment()." +
									b +
									"(period, number) is deprecated. Please use moment()." +
									b +
									"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
									), f = c, c = d,
								d = f), c =
							"string" == typeof c ? +
							c : c, e = Nb(c, d), Tb(
								this, e, a), this
					}
				}

				function Tb(b, c, d, e)
				{
					var f = c._milliseconds,
						g = Rb(c._days),
						h = Rb(c._months);
					b.isValid() && (e = null == e || e,
						f && b._d.setTime(b._d
							.valueOf() + f * d),
						g && Q(b, "Date", P(b,
							"Date") + g * d), h &&
						ja(b, P(b, "Month") + h *
						d), e && a.updateOffset(b,
							g || h))
				}

				function Ub(a, b)
				{
					var c = a.diff(b, "days", !0);
					return c < -6 ? "sameElse" : c < -
						1 ? "lastWeek" : c < 0 ?
						"lastDay" : c < 1 ? "sameDay" :
						c < 2 ? "nextDay" : c < 7 ?
						"nextWeek" : "sameElse"
				}

				function Vb(b, c)
				{
					var d = b || sb(),
						e = Ab(d, this).startOf("day"),
						f = a.calendarFormat(this, e) ||
						"sameElse",
						g = c && (z(c[f]) ? c[f].call(
							this, d) : c[f]);
					return this.format(g || this
						.localeData().calendar(f,
							this, sb(d)))
				}

				function Wb()
				{
					return new r(this)
				}

				function Xb(a, b)
				{
					var c = s(a) ? a : sb(a);
					return !(!this.isValid() || !c
						.isValid()) && (b = K(p(b) ?
							"millisecond" : b),
						"millisecond" === b ? this
						.valueOf() > c.valueOf() : c
						.valueOf() < this.clone()
						.startOf(b).valueOf())
				}

				function Yb(a, b)
				{
					var c = s(a) ? a : sb(a);
					return !(!this.isValid() || !c
						.isValid()) && (b = K(p(b) ?
							"millisecond" : b),
						"millisecond" === b ? this
						.valueOf() < c.valueOf() :
						this.clone().endOf(b)
						.valueOf() < c.valueOf())
				}

				function Zb(a, b, c, d)
				{
					return d = d || "()", ("(" === d[
						0] ? this.isAfter(a, c) : !
						this.isBefore(a, c)) && (
						")" === d[1] ? this
						.isBefore(b, c) : !this
						.isAfter(b, c))
				}

				function $b(a, b)
				{
					var c, d = s(a) ? a : sb(a);
					return !(!this.isValid() || !d
						.isValid()) && (b = K(b ||
							"millisecond"),
						"millisecond" === b ? this
						.valueOf() === d.valueOf() :
						(c = d.valueOf(), this
							.clone().startOf(b)
							.valueOf() <= c && c <=
							this.clone().endOf(b)
							.valueOf()))
				}

				function _b(a, b)
				{
					return this.isSame(a, b) || this
						.isAfter(a, b)
				}

				function ac(a, b)
				{
					return this.isSame(a, b) || this
						.isBefore(a, b)
				}

				function bc(a, b, c)
				{
					var d, e, f, g;
					return this.isValid() ? (d = Ab(a,
							this), d.isValid() ? (
							e = 6e4 * (d
							.utcOffset() - this
								.utcOffset()), b =
							K(b), "year" === b ||
							"month" === b ||
							"quarter" === b ? (g =
								cc(this, d),
								"quarter" === b ?
								g /= 3 : "year" ===
								b && (g /= 12)) : (
								f = this - d, g =
								"second" === b ? f /
								1e3 : "minute" ===
								b ? f / 6e4 :
								"hour" === b ? f /
								36e5 : "day" === b ?
								(f - e) / 864e5 :
								"week" === b ? (f -
									e) / 6048e5 : f
								), c ? g : t(g)) :
						NaN) : NaN
				}

				function cc(a, b)
				{
					var c, d, e = 12 * (b.year() - a
							.year()) + (b.month() - a
							.month()),
						f = a.clone().add(e, "months");
					return b - f < 0 ? (c = a.clone()
						.add(e - 1, "months"), d = (
							b - f) / (f - c)) : (c =
						a.clone().add(e + 1,
							"months"), d = (b - f) /
						(c - f)), -(e + d) || 0
				}

				function dc()
				{
					return this.clone().locale("en")
						.format(
							"ddd MMM DD YYYY HH:mm:ss [GMT]ZZ"
							)
				}

				function ec()
				{
					var a = this.clone().utc();
					return 0 < a.year() && a.year() <=
						9999 ? z(Date.prototype
							.toISOString) ? this
						.toDate().toISOString() : X(a,
							"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"
							) : X(a,
							"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]"
							)
				}

				function fc(b)
				{
					b || (b = this.isUtc() ? a
						.defaultFormatUtc : a
						.defaultFormat);
					var c = X(this, b);
					return this.localeData().postformat(
						c)
				}

				function gc(a, b)
				{
					return this.isValid() && (s(a) && a
							.isValid() || sb(a)
							.isValid()) ? Nb(
						{
							to: this,
							from: a
						}).locale(this.locale())
						.humanize(!b) : this
						.localeData().invalidDate()
				}

				function hc(a)
				{
					return this.from(sb(), a)
				}

				function ic(a, b)
				{
					return this.isValid() && (s(a) && a
							.isValid() || sb(a)
							.isValid()) ? Nb(
						{
							from: this,
							to: a
						}).locale(this.locale())
						.humanize(!b) : this
						.localeData().invalidDate()
				}

				function jc(a)
				{
					return this.to(sb(), a)
				}

				function kc(a)
				{
					var b;
					return void 0 === a ? this._locale
						._abbr : (b = bb(a), null !=
							b && (this._locale = b),
							this)
				}

				function lc()
				{
					return this._locale
				}

				function mc(a)
				{
					switch (a = K(a))
					{
						case "year":
							this.month(0);
						case "quarter":
						case "month":
							this.date(1);
						case "week":
						case "isoWeek":
						case "day":
						case "date":
							this.hours(0);
						case "hour":
							this.minutes(0);
						case "minute":
							this.seconds(0);
						case "second":
							this.milliseconds(0)
					}
					return "week" === a && this.weekday(
							0), "isoWeek" === a && this
						.isoWeekday(1), "quarter" ===
						a && this.month(3 * Math.floor(
							this.month() / 3)), this
				}

				function nc(a)
				{
					return void 0 === (a = K(a)) ||
						"millisecond" === a ? this : (
							"date" === a && (a = "day"),
							this.startOf(a).add(1,
								"isoWeek" === a ?
								"week" : a).subtract(1,
								"ms"))
				}

				function oc()
				{
					return this._d.valueOf() - 6e4 * (
						this._offset || 0)
				}

				function pc()
				{
					return Math.floor(this.valueOf() /
						1e3)
				}

				function qc()
				{
					return new Date(this.valueOf())
				}

				function rc()
				{
					var a = this;
					return [a.year(), a.month(), a
						.date(), a.hour(), a
						.minute(), a.second(), a
						.millisecond()
					]
				}

				function sc()
				{
					var a = this;
					return {
						years: a.year(),
						months: a.month(),
						date: a.date(),
						hours: a.hours(),
						minutes: a.minutes(),
						seconds: a.seconds(),
						milliseconds: a.milliseconds()
					}
				}

				function tc()
				{
					return this.isValid() ? this
						.toISOString() : null
				}

				function uc()
				{
					return n(this)
				}

				function vc()
				{
					return j(
					{}, m(this))
				}

				function wc()
				{
					return m(this).overflow
				}

				function xc()
				{
					return {
						input: this._i,
						format: this._f,
						locale: this._locale,
						isUTC: this._isUTC,
						strict: this._strict
					}
				}

				function yc(a, b)
				{
					U(0, [a, a.length], 0, b)
				}

				function zc(a)
				{
					return Dc.call(this, a, this.week(),
						this.weekday(), this
						.localeData()._week.dow,
						this.localeData()._week.doy)
				}

				function Ac(a)
				{
					return Dc.call(this, a, this
						.isoWeek(), this
						.isoWeekday(), 1, 4)
				}

				function Bc()
				{
					return xa(this.year(), 1, 4)
				}

				function Cc()
				{
					var a = this.localeData()._week;
					return xa(this.year(), a.dow, a.doy)
				}

				function Dc(a, b, c, d, e)
				{
					var f;
					return null == a ? wa(this, d, e)
						.year : (f = xa(a, d, e), b >
							f && (b = f), Ec.call(this,
								a, b, c, d, e))
				}

				function Ec(a, b, c, d, e)
				{
					var f = va(a, b, c, d, e),
						g = ta(f.year, 0, f.dayOfYear);
					return this.year(g
					.getUTCFullYear()), this.month(g
							.getUTCMonth()), this.date(g
							.getUTCDate()), this
				}

				function Fc(a)
				{
					return null == a ? Math.ceil((this
							.month() + 1) / 3) : this
						.month(3 * (a - 1) + this
						.month() % 3)
				}

				function Gc(a)
				{
					var b = Math.round((this.clone()
						.startOf("day") - this
						.clone().startOf("year")
						) / 864e5) + 1;
					return null == a ? b : this.add(a -
						b, "d")
				}

				function Hc(a, b)
				{
					b[be] = u(1e3 * ("0." + a))
				}

				function Ic()
				{
					return this._isUTC ? "UTC" : ""
				}

				function Jc()
				{
					return this._isUTC ?
						"Coordinated Universal Time" :
						""
				}

				function Kc(a)
				{
					return sb(1e3 * a)
				}

				function Lc()
				{
					return sb.apply(null, arguments)
						.parseZone()
				}

				function Mc(a)
				{
					return a
				}

				function Nc(a, b, c, d)
				{
					var e = bb(),
						f = k().set(d, b);
					return e[c](f, a)
				}

				function Oc(a, b, c)
				{
					if ("number" == typeof a && (b = a,
							a = void 0), a = a || "",
						null != b) return Nc(a, b, c,
						"month");
					var d, e = [];
					for (d = 0; d < 12; d++) e[d] = Nc(
						a, d, c, "month");
					return e
				}

				function Pc(a, b, c, d)
				{
					"boolean" == typeof a ? ("number" ==
							typeof b && (c = b, b =
								void 0), b = b || "") :
						(b = a, c = b, a = !1,
							"number" == typeof b && (c =
								b, b = void 0), b = b ||
							"");
					var e = bb(),
						f = a ? e._week.dow : 0;
					if (null != c) return Nc(b, (c +
						f) % 7, d, "day");
					var g, h = [];
					for (g = 0; g < 7; g++) h[g] = Nc(b,
						(g + f) % 7, d, "day");
					return h
				}

				function Qc(a, b)
				{
					return Oc(a, b, "months")
				}

				function Rc(a, b)
				{
					return Oc(a, b, "monthsShort")
				}

				function Sc(a, b, c)
				{
					return Pc(a, b, c, "weekdays")
				}

				function Tc(a, b, c)
				{
					return Pc(a, b, c, "weekdaysShort")
				}

				function Uc(a, b, c)
				{
					return Pc(a, b, c, "weekdaysMin")
				}

				function Vc()
				{
					var a = this._data;
					return this._milliseconds = Te(this
							._milliseconds), this
						._days = Te(this._days), this
						._months = Te(this._months), a
						.milliseconds = Te(a
							.milliseconds), a.seconds =
						Te(a.seconds), a.minutes = Te(a
							.minutes), a.hours = Te(a
							.hours), a.months = Te(a
							.months), a.years = Te(a
							.years), this
				}

				function Wc(a, b, c, d)
				{
					var e = Nb(b, c);
					return a._milliseconds += d * e
						._milliseconds, a._days += d * e
						._days, a._months += d * e
						._months, a._bubble()
				}

				function Xc(a, b)
				{
					return Wc(this, a, b, 1)
				}

				function Yc(a, b)
				{
					return Wc(this, a, b, -1)
				}

				function Zc(a)
				{
					return a < 0 ? Math.floor(a) : Math
						.ceil(a)
				}

				function $c()
				{
					var a, b, c, d, e, f = this
						._milliseconds,
						g = this._days,
						h = this._months,
						i = this._data;
					return f >= 0 && g >= 0 && h >= 0 ||
						f <= 0 && g <= 0 && h <= 0 || (
							f += 864e5 * Zc(ad(h) + g),
							g = 0, h = 0), i
						.milliseconds = f % 1e3, a = t(
							f / 1e3), i.seconds = a %
						60, b = t(a / 60), i.minutes =
						b % 60, c = t(b / 60), i.hours =
						c % 24, g += t(c / 24), e = t(
							_c(g)), h += e, g -= Zc(ad(
							e)), d = t(h / 12), h %= 12,
						i.days = g, i.months = h, i
						.years = d, this
				}

				function _c(a)
				{
					return 4800 * a / 146097
				}

				function ad(a)
				{
					return 146097 * a / 4800
				}

				function bd(a)
				{
					var b, c, d = this._milliseconds;
					if ("month" === (a = K(a)) ||
						"year" === a) return b = this
						._days + d / 864e5, c = this
						._months + _c(b),
						"month" === a ? c : c / 12;
					switch (b = this._days + Math.round(
						ad(this._months)), a)
					{
						case "week":
							return b / 7 + d / 6048e5;
						case "day":
							return b + d / 864e5;
						case "hour":
							return 24 * b + d / 36e5;
						case "minute":
							return 1440 * b + d / 6e4;
						case "second":
							return 86400 * b + d / 1e3;
						case "millisecond":
							return Math.floor(864e5 *
								b) + d;
						default:
							throw new Error(
								"Unknown unit " + a)
					}
				}

				function cd()
				{
					return this._milliseconds + 864e5 *
						this._days + this._months % 12 *
						2592e6 + 31536e6 * u(this
							._months / 12)
				}

				function dd(a)
				{
					return function()
					{
						return this.as(a)
					}
				}

				function ed(a)
				{
					return a = K(a), this[a + "s"]()
				}

				function fd(a)
				{
					return function()
					{
						return this._data[a]
					}
				}

				function gd()
				{
					return t(this.days() / 7)
				}

				function hd(a, b, c, d, e)
				{
					return e.relativeTime(b || 1, !!c,
						a, d)
				}

				function id(a, b, c)
				{
					var d = Nb(a).abs(),
						e = hf(d.as("s")),
						f = hf(d.as("m")),
						g = hf(d.as("h")),
						h = hf(d.as("d")),
						i = hf(d.as("M")),
						j = hf(d.as("y")),
						k = e < jf.s && ["s", e] || f <=
						1 && ["m"] || f < jf.m && ["mm",
							f
						] || g <= 1 && ["h"] || g < jf
						.h && ["hh", g] || h <= 1 && [
							"d"
						] || h < jf.d && ["dd", h] ||
						i <= 1 && ["M"] || i < jf.M && [
							"MM", i
						] || j <= 1 && ["y"] || ["yy",
							j];
					return k[2] = b, k[3] = +a > 0, k[
						4] = c, hd.apply(null, k)
				}

				function jd(a)
				{
					return void 0 === a ? hf :
						"function" == typeof a && (hf =
							a, !0)
				}

				function kd(a, b)
				{
					return void 0 !== jf[a] && (
						void 0 === b ? jf[a] : (jf[
							a] = b, !0))
				}

				function ld(a)
				{
					var b = this.localeData(),
						c = id(this, !a, b);
					return a && (c = b.pastFuture(+this,
						c)), b.postformat(c)
				}

				function md()
				{
					var a, b, c, d = kf(this
							._milliseconds) / 1e3,
						e = kf(this._days),
						f = kf(this._months);
					a = t(d / 60), b = t(a / 60), d %=
						60, a %= 60, c = t(f / 12), f %=
						12;
					var g = c,
						h = f,
						i = e,
						j = b,
						k = a,
						l = d,
						m = this.asSeconds();
					return m ? (m < 0 ? "-" : "") +
						"P" + (g ? g + "Y" : "") + (h ?
							h + "M" : "") + (i ? i +
							"D" : "") + (j || k || l ?
							"T" : "") + (j ? j + "H" :
							"") + (k ? k + "M" : "") + (
							l ? l + "S" : "") : "P0D"
				}
				var nd, od;
				od = Array.prototype.some ? Array
					.prototype.some : function(a)
					{
						for (var b = Object(this), c = b
								.length >>> 0, d =
								0; d < c; d++)
							if (d in b && a.call(this,
									b[d], d, b))
							return !0;
						return !1
					};
				var pd = a.momentProperties = [],
					qd = !1,
					rd = {};
				a.suppressDeprecationWarnings = !1, a
					.deprecationHandler = null;
				var sd;
				sd = Object.keys ? Object.keys :
					function(a)
					{
						var b, c = [];
						for (b in a) i(a, b) && c.push(
							b);
						return c
					};
				var td, ud = {
						sameDay: "[Today at] LT",
						nextDay: "[Tomorrow at] LT",
						nextWeek: "dddd [at] LT",
						lastDay: "[Yesterday at] LT",
						lastWeek: "[Last] dddd [at] LT",
						sameElse: "L"
					},
					vd = {
						LTS: "h:mm:ss A",
						LT: "h:mm A",
						L: "MM/DD/YYYY",
						LL: "MMMM D, YYYY",
						LLL: "MMMM D, YYYY h:mm A",
						LLLL: "dddd, MMMM D, YYYY h:mm A"
					},
					wd = /\d{1,2}/,
					xd = {
						future: "in %s",
						past: "%s ago",
						s: "a few seconds",
						m: "a minute",
						mm: "%d minutes",
						h: "an hour",
						hh: "%d hours",
						d: "a day",
						dd: "%d days",
						M: "a month",
						MM: "%d months",
						y: "a year",
						yy: "%d years"
					},
					yd = {},
					zd = {},
					Ad =
					/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
					Bd =
					/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
					Cd = {},
					Dd = {},
					Ed = /\d/,
					Fd = /\d\d/,
					Gd = /\d{3}/,
					Hd = /\d{4}/,
					Id = /[+-]?\d{6}/,
					Jd = /\d\d?/,
					Kd = /\d\d\d\d?/,
					Ld = /\d\d\d\d\d\d?/,
					Md = /\d{1,3}/,
					Nd = /\d{1,4}/,
					Od = /[+-]?\d{1,6}/,
					Pd = /\d+/,
					Qd = /[+-]?\d+/,
					Rd = /Z|[+-]\d\d:?\d\d/gi,
					Sd = /Z|[+-]\d\d(?::?\d\d)?/gi,
					Td = /[+-]?\d+(\.\d{1,3})?/,
					Ud =
					/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
					Vd = {},
					Wd = {},
					Xd = 0,
					Yd = 1,
					Zd = 2,
					$d = 3,
					_d = 4,
					ae = 5,
					be = 6,
					ce = 7,
					de = 8;
				td = Array.prototype.indexOf ? Array
					.prototype.indexOf : function(a)
					{
						var b;
						for (b = 0; b < this.length; ++
							b)
							if (this[b] === a) return b;
						return -1
					}, U("M", ["MM", 2], "Mo",
					function()
					{
						return this.month() + 1
					}), U("MMM", 0, 0, function(a)
					{
						return this.localeData()
							.monthsShort(this, a)
					}), U("MMMM", 0, 0, function(a)
					{
						return this.localeData()
							.months(this, a)
					}), J("month", "M"), M("month", 8),
					Z("M", Jd), Z("MM", Jd, Fd), Z(
						"MMM",
						function(a, b)
						{
							return b.monthsShortRegex(a)
						}), Z("MMMM", function(a, b)
					{
						return b.monthsRegex(a)
					}), ba(["M", "MM"], function(a, b)
					{
						b[Yd] = u(a) - 1
					}), ba(["MMM", "MMMM"], function(a,
						b, c, d)
					{
						var e = c._locale
							.monthsParse(a, d, c
								._strict);
						null != e ? b[Yd] = e : m(c)
							.invalidMonth = a
					});
				var ee =
					/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,
					fe =
					"January_February_March_April_May_June_July_August_September_October_November_December"
					.split("_"),
					ge =
					"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec"
					.split("_"),
					he = Ud,
					ie = Ud;
				U("Y", 0, 0, function()
					{
						var a = this.year();
						return a <= 9999 ? "" + a :
							"+" + a
					}), U(0, ["YY", 2], 0, function()
					{
						return this.year() % 100
					}), U(0, ["YYYY", 4], 0, "year"), U(
						0, ["YYYYY", 5], 0, "year"), U(
						0, ["YYYYYY", 6, !0], 0, "year"
						), J("year", "y"), M("year", 1),
					Z("Y", Qd), Z("YY", Jd, Fd), Z(
						"YYYY", Nd, Hd), Z("YYYYY", Od,
						Id), Z("YYYYYY", Od, Id), ba([
						"YYYYY", "YYYYYY"
					], Xd), ba("YYYY", function(b, c)
					{
						c[Xd] = 2 === b.length ? a
							.parseTwoDigitYear(b) :
							u(b)
					}), ba("YY", function(b, c)
					{
						c[Xd] = a.parseTwoDigitYear(
							b)
					}), ba("Y", function(a, b)
					{
						b[Xd] = parseInt(a, 10)
					}), a.parseTwoDigitYear = function(
						a)
					{
						return u(a) + (u(a) > 68 ?
							1900 : 2e3)
					};
				var je = O("FullYear", !0);
				U("w", ["ww", 2], "wo", "week"), U("W",
						["WW", 2], "Wo", "isoWeek"), J(
						"week", "w"), J("isoWeek", "W"),
					M("week", 5), M("isoWeek", 5), Z(
						"w", Jd), Z("ww", Jd, Fd), Z(
						"W", Jd), Z("WW", Jd, Fd), ca([
						"w", "ww", "W", "WW"
					], function(a, b, c, d)
					{
						b[d.substr(0, 1)] = u(a)
					});
				var ke = {
					dow: 0,
					doy: 6
				};
				U("d", 0, "do", "day"), U("dd", 0, 0,
						function(a)
						{
							return this.localeData()
								.weekdaysMin(this, a)
						}), U("ddd", 0, 0, function(a)
					{
						return this.localeData()
							.weekdaysShort(this, a)
					}), U("dddd", 0, 0, function(a)
					{
						return this.localeData()
							.weekdays(this, a)
					}), U("e", 0, 0, "weekday"), U("E",
						0, 0, "isoWeekday"), J("day",
						"d"), J("weekday", "e"), J(
						"isoWeekday", "E"), M("day",
					11), M("weekday", 11), M(
						"isoWeekday", 11), Z("d", Jd),
					Z("e", Jd), Z("E", Jd), Z("dd",
						function(a, b)
						{
							return b.weekdaysMinRegex(a)
						}), Z("ddd", function(a, b)
					{
						return b.weekdaysShortRegex(
							a)
					}), Z("dddd", function(a, b)
					{
						return b.weekdaysRegex(a)
					}), ca(["dd", "ddd", "dddd"],
						function(a, b, c, d)
						{
							var e = c._locale
								.weekdaysParse(a, d, c
									._strict);
							null != e ? b.d = e : m(c)
								.invalidWeekday = a
						}), ca(["d", "e", "E"],
						function(a, b, c, d)
						{
							b[d] = u(a)
						});
				var le =
					"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday"
					.split("_"),
					me = "Sun_Mon_Tue_Wed_Thu_Fri_Sat"
					.split("_"),
					ne = "Su_Mo_Tu_We_Th_Fr_Sa".split(
						"_"),
					oe = Ud,
					pe = Ud,
					qe = Ud;
				U("H", ["HH", 2], 0, "hour"), U("h", [
						"hh", 2
					], 0, Ra), U("k", ["kk", 2], 0, Sa),
					U("hmm", 0, 0, function()
					{
						return "" + Ra.apply(this) +
							T(this.minutes(), 2)
					}), U("hmmss", 0, 0, function()
					{
						return "" + Ra.apply(this) +
							T(this.minutes(), 2) +
							T(this.seconds(), 2)
					}), U("Hmm", 0, 0, function()
					{
						return "" + this.hours() +
							T(this.minutes(), 2)
					}), U("Hmmss", 0, 0, function()
					{
						return "" + this.hours() +
							T(this.minutes(), 2) +
							T(this.seconds(), 2)
					}), Ta("a", !0), Ta("A", !1), J(
						"hour", "h"), M("hour", 13), Z(
						"a", Ua), Z("A", Ua), Z("H",
					Jd), Z("h", Jd), Z("HH", Jd, Fd), Z(
						"hh", Jd, Fd), Z("hmm", Kd), Z(
						"hmmss", Ld), Z("Hmm", Kd), Z(
						"Hmmss", Ld), ba(["H", "HH"],
						$d), ba(["a", "A"], function(a,
						b, c)
					{
						c._isPm = c._locale.isPM(a),
							c._meridiem = a
					}), ba(["h", "hh"], function(a, b,
						c)
					{
						b[$d] = u(a), m(c)
							.bigHour = !0
					}), ba("hmm", function(a, b, c)
					{
						var d = a.length - 2;
						b[$d] = u(a.substr(0, d)),
							b[_d] = u(a.substr(d)),
							m(c).bigHour = !0
					}), ba("hmmss", function(a, b, c)
					{
						var d = a.length - 4,
							e = a.length - 2;
						b[$d] = u(a.substr(0, d)),
							b[_d] = u(a.substr(d,
								2)), b[ae] = u(a
								.substr(e)), m(c)
							.bigHour = !0
					}), ba("Hmm", function(a, b, c)
					{
						var d = a.length - 2;
						b[$d] = u(a.substr(0, d)),
							b[_d] = u(a.substr(d))
					}), ba("Hmmss", function(a, b, c)
					{
						var d = a.length - 4,
							e = a.length - 2;
						b[$d] = u(a.substr(0, d)),
							b[_d] = u(a.substr(d,
								2)), b[ae] = u(a
								.substr(e))
					});
				var re, se = /[ap]\.?m?\.?/i,
					te = O("Hours", !0),
					ue = {
						calendar: ud,
						longDateFormat: vd,
						invalidDate: "Invalid date",
						ordinal: "%d",
						ordinalParse: wd,
						relativeTime: xd,
						months: fe,
						monthsShort: ge,
						week: ke,
						weekdays: le,
						weekdaysMin: ne,
						weekdaysShort: me,
						meridiemParse: se
					},
					ve = {},
					we =
					/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
					xe =
					/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
					ye = /Z|[+-]\d\d(?::?\d\d)?/,
					ze = [
						["YYYYYY-MM-DD",
							/[+-]\d{6}-\d\d-\d\d/
						],
						["YYYY-MM-DD",
							/\d{4}-\d\d-\d\d/],
						["GGGG-[W]WW-E",
							/\d{4}-W\d\d-\d/
						],
						["GGGG-[W]WW", /\d{4}-W\d\d/, !
							1],
						["YYYY-DDD", /\d{4}-\d{3}/],
						["YYYY-MM", /\d{4}-\d\d/, !1],
						["YYYYYYMMDD", /[+-]\d{10}/],
						["YYYYMMDD", /\d{8}/],
						["GGGG[W]WWE", /\d{4}W\d{3}/],
						["GGGG[W]WW", /\d{4}W\d{2}/, !
						1],
						["YYYYDDD", /\d{7}/]
					],
					Ae = [
						["HH:mm:ss.SSSS",
							/\d\d:\d\d:\d\d\.\d+/
						],
						["HH:mm:ss,SSSS",
							/\d\d:\d\d:\d\d,\d+/
						],
						["HH:mm:ss", /\d\d:\d\d:\d\d/],
						["HH:mm", /\d\d:\d\d/],
						["HHmmss.SSSS",
							/\d\d\d\d\d\d\.\d+/
						],
						["HHmmss,SSSS",
							/\d\d\d\d\d\d,\d+/
						],
						["HHmmss", /\d\d\d\d\d\d/],
						["HHmm", /\d\d\d\d/],
						["HH", /\d\d/]
					],
					Be = /^\/?Date\((\-?\d+)/i;
				a.createFromInputFallback = x(
					"moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
					function(a)
					{
						a._d = new Date(a._i + (a
							._useUTC ?
							" UTC" : ""))
					}), a.ISO_8601 = function() {};
				var Ce = x(
						"moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
						function()
						{
							var a = sb.apply(null,
								arguments);
							return this.isValid() && a
								.isValid() ? a < this ?
								this : a : o()
						}),
					De = x(
						"moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
						function()
						{
							var a = sb.apply(null,
								arguments);
							return this.isValid() && a
								.isValid() ? a > this ?
								this : a : o()
						}),
					Ee = function()
					{
						return Date.now ? Date.now() : +
							new Date
					};
				yb("Z", ":"), yb("ZZ", ""), Z("Z", Sd),
					Z("ZZ", Sd), ba(["Z", "ZZ"],
						function(a, b, c)
						{
							c._useUTC = !0, c._tzm = zb(
								Sd, a)
						});
				var Fe = /([\+\-]|\d\d)/gi;
				a.updateOffset = function() {};
				var Ge =
					/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/,
					He =
					/^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
				Nb.fn = wb.prototype;
				var Ie = Sb(1, "add"),
					Je = Sb(-1, "subtract");
				a.defaultFormat =
					"YYYY-MM-DDTHH:mm:ssZ", a
					.defaultFormatUtc =
					"YYYY-MM-DDTHH:mm:ss[Z]";
				var Ke = x(
					"moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
					function(a)
					{
						return void 0 === a ? this
							.localeData() : this
							.locale(a)
					});
				U(0, ["gg", 2], 0, function()
					{
						return this.weekYear() % 100
					}), U(0, ["GG", 2], 0, function()
					{
						return this.isoWeekYear() %
							100
					}), yc("gggg", "weekYear"), yc(
						"ggggg", "weekYear"), yc("GGGG",
						"isoWeekYear"), yc("GGGGG",
						"isoWeekYear"), J("weekYear",
						"gg"), J("isoWeekYear", "GG"),
					M("weekYear", 1), M("isoWeekYear",
						1), Z("G", Qd), Z("g", Qd), Z(
						"GG", Jd, Fd), Z("gg", Jd, Fd),
					Z("GGGG", Nd, Hd), Z("gggg", Nd,
					Hd), Z("GGGGG", Od, Id), Z("ggggg",
						Od, Id), ca(["gggg", "ggggg",
						"GGGG", "GGGGG"
					], function(a, b, c, d)
					{
						b[d.substr(0, 2)] = u(a)
					}), ca(["gg", "GG"], function(b, c,
						d, e)
					{
						c[e] = a.parseTwoDigitYear(
							b)
					}), U("Q", 0, "Qo", "quarter"), J(
						"quarter", "Q"), M("quarter",
					7), Z("Q", Ed), ba("Q", function(a,
						b)
					{
						b[Yd] = 3 * (u(a) - 1)
					}), U("D", ["DD", 2], "Do", "date"),
					J("date", "D"), M("date", 9), Z("D",
						Jd), Z("DD", Jd, Fd), Z("Do",
						function(a, b)
						{
							return a ? b._ordinalParse :
								b._ordinalParseLenient
						}), ba(["D", "DD"], Zd), ba(
						"Do",
						function(a, b)
						{
							b[Zd] = u(a.match(Jd)[0],
								10)
						});
				var Le = O("Date", !0);
				U("DDD", ["DDDD", 3], "DDDo",
						"dayOfYear"), J("dayOfYear",
						"DDD"), M("dayOfYear", 4), Z(
						"DDD", Md), Z("DDDD", Gd), ba([
						"DDD", "DDDD"
					], function(a, b, c)
					{
						c._dayOfYear = u(a)
					}), U("m", ["mm", 2], 0, "minute"),
					J("minute", "m"), M("minute", 14),
					Z("m", Jd), Z("mm", Jd, Fd), ba([
						"m", "mm"
					], _d);
				var Me = O("Minutes", !1);
				U("s", ["ss", 2], 0, "second"), J(
						"second", "s"), M("second", 15),
					Z("s", Jd), Z("ss", Jd, Fd), ba([
						"s", "ss"
					], ae);
				var Ne = O("Seconds", !1);
				U("S", 0, 0, function()
				{
					return ~~(this
					.millisecond() / 100)
				}), U(0, ["SS", 2], 0, function()
				{
					return ~~(this
					.millisecond() / 10)
				}), U(0, ["SSS", 3], 0,
					"millisecond"), U(0, ["SSSS",
					4], 0,
					function()
					{
						return 10 * this
							.millisecond()
					}), U(0, ["SSSSS", 5], 0,
					function()
					{
						return 100 * this
							.millisecond()
					}), U(0, ["SSSSSS", 6], 0,
					function()
					{
						return 1e3 * this
							.millisecond()
					}), U(0, ["SSSSSSS", 7], 0,
					function()
					{
						return 1e4 * this
							.millisecond()
					}), U(0, ["SSSSSSSS", 8], 0,
					function()
					{
						return 1e5 * this
							.millisecond()
					}), U(0, ["SSSSSSSSS", 9], 0,
					function()
					{
						return 1e6 * this
							.millisecond()
					}), J("millisecond", "ms"), M(
					"millisecond", 16), Z("S", Md,
					Ed), Z("SS", Md, Fd), Z("SSS",
					Md, Gd);
				var Oe;
				for (Oe = "SSSS"; Oe.length <= 9; Oe +=
					"S") Z(Oe, Pd);
				for (Oe = "S"; Oe.length <= 9; Oe +=
					"S") ba(Oe, Hc);
				var Pe = O("Milliseconds", !1);
				U("z", 0, 0, "zoneAbbr"), U("zz", 0, 0,
					"zoneName");
				var Qe = r.prototype;
				Qe.add = Ie, Qe.calendar = Vb, Qe
					.clone = Wb, Qe.diff = bc, Qe
					.endOf = nc, Qe.format = fc, Qe
					.from = gc, Qe.fromNow = hc, Qe.to =
					ic, Qe.toNow = jc, Qe.get = R, Qe
					.invalidAt = wc, Qe.isAfter = Xb, Qe
					.isBefore = Yb, Qe.isBetween = Zb,
					Qe.isSame = $b, Qe.isSameOrAfter =
					_b, Qe.isSameOrBefore = ac, Qe
					.isValid = uc, Qe.lang = Ke, Qe
					.locale = kc, Qe.localeData = lc, Qe
					.max = De, Qe.min = Ce, Qe
					.parsingFlags = vc, Qe.set = S, Qe
					.startOf = mc, Qe.subtract = Je, Qe
					.toArray = rc, Qe.toObject = sc, Qe
					.toDate = qc, Qe.toISOString = ec,
					Qe.toJSON = tc, Qe.toString = dc, Qe
					.unix = pc, Qe.valueOf = oc, Qe
					.creationData = xc, Qe.year = je, Qe
					.isLeapYear = ra, Qe.weekYear = zc,
					Qe.isoWeekYear = Ac, Qe.quarter = Qe
					.quarters = Fc, Qe.month = ka, Qe
					.daysInMonth = la, Qe.week = Qe
					.weeks = Ba, Qe.isoWeek = Qe
					.isoWeeks = Ca, Qe.weeksInYear = Cc,
					Qe.isoWeeksInYear = Bc, Qe.date =
					Le, Qe.day = Qe.days = Ka, Qe
					.weekday = La, Qe.isoWeekday = Ma,
					Qe.dayOfYear = Gc, Qe.hour = Qe
					.hours = te, Qe.minute = Qe
					.minutes = Me, Qe.second = Qe
					.seconds = Ne, Qe.millisecond = Qe
					.milliseconds = Pe, Qe.utcOffset =
					Cb, Qe.utc = Eb, Qe.local = Fb, Qe
					.parseZone = Gb, Qe
					.hasAlignedHourOffset = Hb, Qe
					.isDST = Ib, Qe.isLocal = Kb, Qe
					.isUtcOffset = Lb, Qe.isUtc = Mb, Qe
					.isUTC = Mb, Qe.zoneAbbr = Ic, Qe
					.zoneName = Jc, Qe.dates = x(
						"dates accessor is deprecated. Use date instead.",
						Le), Qe.months = x(
						"months accessor is deprecated. Use month instead",
						ka), Qe.years = x(
						"years accessor is deprecated. Use year instead",
						je), Qe.zone = x(
						"moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
						Db), Qe.isDSTShifted = x(
						"isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
						Jb);
				var Re = Qe,
					Se = C.prototype;
				Se.calendar = D, Se.longDateFormat = E,
					Se.invalidDate = F, Se.ordinal = G,
					Se.preparse = Mc, Se.postformat =
					Mc, Se.relativeTime = H, Se
					.pastFuture = I, Se.set = A, Se
					.months = fa, Se.monthsShort = ga,
					Se.monthsParse = ia, Se
					.monthsRegex = na, Se
					.monthsShortRegex = ma, Se.week =
					ya, Se.firstDayOfYear = Aa, Se
					.firstDayOfWeek = za, Se.weekdays =
					Fa, Se.weekdaysMin = Ha, Se
					.weekdaysShort = Ga, Se
					.weekdaysParse = Ja, Se
					.weekdaysRegex = Na, Se
					.weekdaysShortRegex = Oa, Se
					.weekdaysMinRegex = Pa, Se.isPM =
					Va, Se.meridiem = Wa, $a("en",
					{
						ordinalParse: /\d{1,2}(th|st|nd|rd)/,
						ordinal: function(a)
						{
							var b = a % 10;
							return a + (1 === u(
									a %
									100 / 10
									) ?
								"th" : 1 ===
								b ? "st" :
								2 === b ?
								"nd" : 3 ===
								b ? "rd" :
								"th")
						}
					}), a.lang = x(
						"moment.lang is deprecated. Use moment.locale instead.",
						$a), a.langData = x(
						"moment.langData is deprecated. Use moment.localeData instead.",
						bb);
				var Te = Math.abs,
					Ue = dd("ms"),
					Ve = dd("s"),
					We = dd("m"),
					Xe = dd("h"),
					Ye = dd("d"),
					Ze = dd("w"),
					$e = dd("M"),
					_e = dd("y"),
					af = fd("milliseconds"),
					bf = fd("seconds"),
					cf = fd("minutes"),
					df = fd("hours"),
					ef = fd("days"),
					ff = fd("months"),
					gf = fd("years"),
					hf = Math.round,
					jf = {
						s: 45,
						m: 45,
						h: 22,
						d: 26,
						M: 11
					},
					kf = Math.abs,
					lf = wb.prototype;
				return lf.abs = Vc, lf.add = Xc, lf
					.subtract = Yc, lf.as = bd, lf
					.asMilliseconds = Ue, lf.asSeconds =
					Ve, lf.asMinutes = We, lf.asHours =
					Xe, lf.asDays = Ye, lf.asWeeks = Ze,
					lf.asMonths = $e, lf.asYears = _e,
					lf.valueOf = cd, lf._bubble = $c, lf
					.get = ed, lf.milliseconds = af, lf
					.seconds = bf, lf.minutes = cf, lf
					.hours = df, lf.days = ef, lf
					.weeks = gd, lf.months = ff, lf
					.years = gf, lf.humanize = ld, lf
					.toISOString = md, lf.toString = md,
					lf.toJSON = md, lf.locale = kc, lf
					.localeData = lc, lf.toIsoString =
					x("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
						md), lf.lang = Ke, U("X", 0, 0,
						"unix"), U("x", 0, 0,
					"valueOf"), Z("x", Qd), Z("X", Td),
					ba("X", function(a, b, c)
					{
						c._d = new Date(1e3 *
							parseFloat(a, 10))
					}), ba("x", function(a, b, c)
					{
						c._d = new Date(u(a))
					}), a.version = "2.14.1",
					function(a)
					{
						nd = a
					}(sb), a.fn = Re, a.min = ub, a
					.max = vb, a.now = Ee, a.utc = k, a
					.unix = Kc, a.months = Qc, a
					.isDate = g, a.locale = $a, a
					.invalid = o, a.duration = Nb, a
					.isMoment = s, a.weekdays = Sc, a
					.parseZone = Lc, a.localeData = bb,
					a.isDuration = xb, a.monthsShort =
					Rc, a.weekdaysMin = Uc, a
					.defineLocale = _a, a.updateLocale =
					ab, a.locales = cb, a
					.weekdaysShort = Tc, a
					.normalizeUnits = K, a
					.relativeTimeRounding = jd, a
					.relativeTimeThreshold = kd, a
					.calendarFormat = Ub, a.prototype =
					Re, a
			})
		},
		{}],
		7: [function(a, b, c)
		{
			var d = a(27)();
			a(26)(d), a(22)(d), a(25)(d), a(21)(d), a(23)(
				d), a(24)(d), a(28)(d), a(32)(d), a(30)(d),
				a(31)(d), a(33)(d), a(29)(d), a(34)(d), a(
					35)(d), a(36)(d), a(37)(d), a(38)(d), a(
					41)(d), a(39)(d), a(40)(d), a(42)(d), a(
					43)(d), a(44)(d), a(15)(d), a(16)(d), a(
					17)(d), a(18)(d), a(19)(d), a(20)(d), a(
					8)(d), a(9)(d), a(10)(d), a(11)(d), a(
					12)(d), a(13)(d), a(14)(d), window
				.Chart = b.exports = d
		},
		{
			10: 10,
			11: 11,
			12: 12,
			13: 13,
			14: 14,
			15: 15,
			16: 16,
			17: 17,
			18: 18,
			19: 19,
			20: 20,
			21: 21,
			22: 22,
			23: 23,
			24: 24,
			25: 25,
			26: 26,
			27: 27,
			28: 28,
			29: 29,
			30: 30,
			31: 31,
			32: 32,
			33: 33,
			34: 34,
			35: 35,
			36: 36,
			37: 37,
			38: 38,
			39: 39,
			40: 40,
			41: 41,
			42: 42,
			43: 43,
			44: 44,
			8: 8,
			9: 9
		}],
		8: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				a.Bar = function(b, c)
				{
					return c.type = "bar", new a(b,
						c)
				}
			}
		},
		{}],
		9: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				a.Bubble = function(b, c)
				{
					return c.type = "bubble", new a(
						b, c)
				}
			}
		},
		{}],
		10: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				a.Doughnut = function(b, c)
				{
					return c.type = "doughnut",
						new a(b, c)
				}
			}
		},
		{}],
		11: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				a.Line = function(b, c)
				{
					return c.type = "line", new a(b,
						c)
				}
			}
		},
		{}],
		12: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				a.PolarArea = function(b, c)
				{
					return c.type = "polarArea",
						new a(b, c)
				}
			}
		},
		{}],
		13: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				a.Radar = function(b, c)
				{
					return c.options = a.helpers
						.configMerge(
						{
							aspectRatio: 1
						}, c.options), c.type =
						"radar", new a(b, c)
				}
			}
		},
		{}],
		14: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				var b = {
					hover:
					{
						mode: "single"
					},
					scales:
					{
						xAxes: [
						{
							type: "linear",
							position: "bottom",
							id: "x-axis-1"
						}],
						yAxes: [
						{
							type: "linear",
							position: "left",
							id: "y-axis-1"
						}]
					},
					tooltips:
					{
						callbacks:
						{
							title: function()
							{
								return ""
							},
							label: function(a)
							{
								return "(" + a
									.xLabel +
									", " + a
									.yLabel +
									")"
							}
						}
					}
				};
				a.defaults.scatter = b, a.controllers
					.scatter = a.controllers.line, a
					.Scatter = function(b, c)
					{
						return c.type = "scatter",
							new a(b, c)
					}
			}
		},
		{}],
		15: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				var b = a.helpers;
				a.defaults.bar = {
						hover:
						{
							mode: "label"
						},
						scales:
						{
							xAxes: [
							{
								type: "category",
								categoryPercentage: .8,
								barPercentage: .9,
								gridLines:
								{
									offsetGridLines:
										!0
								}
							}],
							yAxes: [
							{
								type: "linear"
							}]
						}
					}, a.controllers.bar = a
					.DatasetController.extend(
					{
						dataElementType: a.elements
							.Rectangle,
						initialize: function(b, c)
						{
							a.DatasetController
								.prototype
								.initialize
								.call(this, b,
									c), this
								.getMeta()
								.bar = !0
						},
						getBarCount: function()
						{
							var a = this,
								c = 0;
							return b.each(a
								.chart.data
								.datasets,
								function(b,
									d)
								{
									a.chart
										.getDatasetMeta(
											d
											)
										.bar &&
										a
										.chart
										.isDatasetVisible(
											d
											) &&
										++c
								}, a), c
						},
						update: function(a)
						{
							var c = this;
							b.each(c.getMeta()
								.data,
								function(b,
									d)
								{
									c.updateElement(
										b,
										d,
										a
										)
								}, c)
						},
						updateElement: function(a,
							c, d)
						{
							var e = this,
								f = e.getMeta(),
								g = e
								.getScaleForId(f
									.xAxisID),
								h = e
								.getScaleForId(f
									.yAxisID),
								i = h
								.getBasePixel(),
								j = e.chart
								.options
								.elements
								.rectangle,
								k = a.custom ||
								{},
								l = e
								.getDataset();
							b.extend(a,
							{
								_xScale: g,
								_yScale: h,
								_datasetIndex: e
									.index,
								_index: c,
								_model:
								{
									x: e.calculateBarX(
										c,
										e
										.index
										),
									y: d ?
										i :
										e
										.calculateBarY(
											c,
											e
											.index
											),
									label: e
										.chart
										.data
										.labels[
											c
											],
									datasetLabel: l
										.label,
									base: d ?
										i :
										e
										.calculateBarBase(
											e
											.index,
											c
											),
									width: e
										.calculateBarWidth(
											c
											),
									backgroundColor: k
										.backgroundColor ?
										k
										.backgroundColor :
										b
										.getValueAtIndexOrDefault(
											l
											.backgroundColor,
											c,
											j
											.backgroundColor
											),
									borderSkipped: k
										.borderSkipped ?
										k
										.borderSkipped :
										j
										.borderSkipped,
									borderColor: k
										.borderColor ?
										k
										.borderColor :
										b
										.getValueAtIndexOrDefault(
											l
											.borderColor,
											c,
											j
											.borderColor
											),
									borderWidth: k
										.borderWidth ?
										k
										.borderWidth :
										b
										.getValueAtIndexOrDefault(
											l
											.borderWidth,
											c,
											j
											.borderWidth
											)
								}
							}), a.pivot()
						},
						calculateBarBase: function(
							a, b)
						{
							var c = this,
								d = c.getMeta(),
								e = c
								.getScaleForId(d
									.yAxisID),
								f = 0;
							if (e.options
								.stacked)
							{
								for (var g = c
										.chart,
										h = g
										.data
										.datasets,
										i =
										Number(
											h[a]
											.data[
												b
												]
											),
										j =
										0; j <
									a; j++)
								{
									var k = h[
										j],
										l = g
										.getDatasetMeta(
											j);
									if (l.bar &&
										l
										.yAxisID ===
										e.id &&
										g
										.isDatasetVisible(
											j))
									{
										var m =
											Number(
												k
												.data[
													b
													]
												);
										f += i <
											0 ?
											Math
											.min(
												m,
												0
												) :
											Math
											.max(
												m,
												0
												)
									}
								}
								return e
									.getPixelForValue(
										f)
							}
							return e
								.getBasePixel()
						},
						getRuler: function(a)
						{
							var b, c = this,
								d = c.getMeta(),
								e = c
								.getScaleForId(d
									.xAxisID),
								f = c
								.getBarCount();
							b = "category" === e
								.options.type ?
								e
								.getPixelForTick(
									a + 1) - e
								.getPixelForTick(
									a) : e
								.width / e.ticks
								.length;
							var g = b * e
								.options
								.categoryPercentage,
								h = (b - b * e
									.options
									.categoryPercentage
									) / 2,
								i = g / f;
							if (e.ticks
								.length !== c
								.chart.data
								.labels.length)
							{
								i *= e.ticks
									.length / c
									.chart.data
									.labels
									.length
							}
							return {
								datasetCount: f,
								tickWidth: b,
								categoryWidth: g,
								categorySpacing: h,
								fullBarWidth: i,
								barWidth: i * e
									.options
									.barPercentage,
								barSpacing: i -
									i * e
									.options
									.barPercentage
							}
						},
						calculateBarWidth: function(
							a)
						{
							var b = this
								.getScaleForId(
									this
									.getMeta()
									.xAxisID);
							if (b.options
								.barThickness)
								return b.options
									.barThickness;
							var c = this
								.getRuler(a);
							return b.options
								.stacked ? c
								.categoryWidth :
								c.barWidth
						},
						getBarIndex: function(a)
						{
							var b, c, d = 0;
							for (c = 0; c <
								a; ++c) b = this
								.chart
								.getDatasetMeta(
									c), b.bar &&
								this.chart
								.isDatasetVisible(
									c) && ++d;
							return d
						},
						calculateBarX: function(a,
							b)
						{
							var c = this,
								d = c.getMeta(),
								e = c
								.getScaleForId(d
									.xAxisID),
								f = c
								.getBarIndex(b),
								g = c.getRuler(
									a),
								h = e
								.getPixelForValue(
									null, a, b,
									c.chart
									.isCombo);
							return h -= c.chart
								.isCombo ? g
								.tickWidth / 2 :
								0, e.options
								.stacked ? h + g
								.categoryWidth /
								2 + g
								.categorySpacing :
								h + g.barWidth /
								2 + g
								.categorySpacing +
								g.barWidth * f +
								g.barSpacing /
								2 + g
								.barSpacing * f
						},
						calculateBarY: function(a,
							b)
						{
							var c = this,
								d = c.getMeta(),
								e = c
								.getScaleForId(d
									.yAxisID),
								f = Number(c
									.getDataset()
									.data[a]);
							if (e.options
								.stacked)
							{
								for (var g = 0,
										h = 0,
										i =
										0; i <
									b; i++)
								{
									var j = c
										.chart
										.data
										.datasets[
											i],
										k = c
										.chart
										.getDatasetMeta(
											i);
									if (k.bar &&
										k
										.yAxisID ===
										e.id &&
										c.chart
										.isDatasetVisible(
											i))
									{
										var l =
											Number(
												j
												.data[
													a
													]
												);
										l < 0 ?
											h +=
											l ||
											0 :
											g +=
											l ||
											0
									}
								}
								return f < 0 ? e
									.getPixelForValue(
										h + f) :
									e
									.getPixelForValue(
										g + f)
							}
							return e
								.getPixelForValue(
									f)
						},
						draw: function(a)
						{
							var c = this,
								d = a || 1;
							b.each(c.getMeta()
								.data,
								function(a,
									b)
								{
									var e =
										c
										.getDataset()
										.data[
											b
											];
									null ===
										e ||
										void 0 ===
										e ||
										isNaN(
											e
											) ||
										a
										.transition(
											d
											)
										.draw()
								}, c)
						},
						setHoverStyle: function(a)
						{
							var c = this.chart
								.data.datasets[a
									._datasetIndex
									],
								d = a._index,
								e = a.custom ||
								{},
								f = a._model;
							f.backgroundColor =
								e
								.hoverBackgroundColor ?
								e
								.hoverBackgroundColor :
								b
								.getValueAtIndexOrDefault(
									c
									.hoverBackgroundColor,
									d, b
									.getHoverColor(
										f
										.backgroundColor
										)), f
								.borderColor = e
								.hoverBorderColor ?
								e
								.hoverBorderColor :
								b
								.getValueAtIndexOrDefault(
									c
									.hoverBorderColor,
									d, b
									.getHoverColor(
										f
										.borderColor
										)), f
								.borderWidth = e
								.hoverBorderWidth ?
								e
								.hoverBorderWidth :
								b
								.getValueAtIndexOrDefault(
									c
									.hoverBorderWidth,
									d, f
									.borderWidth
									)
						},
						removeHoverStyle: function(
							a)
						{
							var c = this.chart
								.data.datasets[a
									._datasetIndex
									],
								d = a._index,
								e = a.custom ||
								{},
								f = a._model,
								g = this.chart
								.options
								.elements
								.rectangle;
							f.backgroundColor =
								e
								.backgroundColor ?
								e
								.backgroundColor :
								b
								.getValueAtIndexOrDefault(
									c
									.backgroundColor,
									d, g
									.backgroundColor
									), f
								.borderColor = e
								.borderColor ? e
								.borderColor : b
								.getValueAtIndexOrDefault(
									c
									.borderColor,
									d, g
									.borderColor
									), f
								.borderWidth = e
								.borderWidth ? e
								.borderWidth : b
								.getValueAtIndexOrDefault(
									c
									.borderWidth,
									d, g
									.borderWidth
									)
						}
					}), a.defaults.horizontalBar = {
						hover:
						{
							mode: "label"
						},
						scales:
						{
							xAxes: [
							{
								type: "linear",
								position: "bottom"
							}],
							yAxes: [
							{
								position: "left",
								type: "category",
								categoryPercentage: .8,
								barPercentage: .9,
								gridLines:
								{
									offsetGridLines:
										!0
								}
							}]
						},
						elements:
						{
							rectangle:
							{
								borderSkipped: "left"
							}
						},
						tooltips:
						{
							callbacks:
							{
								title: function(a, b)
								{
									var c = "";
									return a
										.length >
										0 && (a[0]
											.yLabel ?
											c = a[0]
											.yLabel :
											b.labels
											.length >
											0 && a[
												0]
											.index <
											b.labels
											.length &&
											(c = b
												.labels[
													a[
														0]
													.index
													]
												)),
										c
								},
								label: function(a, b)
								{
									return (b
											.datasets[
												a
												.datasetIndex
												]
											.label ||
											"") +
										": " + a
										.xLabel
								}
							}
						}
					}, a.controllers.horizontalBar = a
					.controllers.bar.extend(
					{
						updateElement: function(a,
							c, d)
						{
							var e = this,
								f = e.getMeta(),
								g = e
								.getScaleForId(f
									.xAxisID),
								h = e
								.getScaleForId(f
									.yAxisID),
								i = g
								.getBasePixel(),
								j = a.custom ||
								{},
								k = e
								.getDataset(),
								l = e.chart
								.options
								.elements
								.rectangle;
							b.extend(a,
							{
								_xScale: g,
								_yScale: h,
								_datasetIndex: e
									.index,
								_index: c,
								_model:
								{
									x: d ?
										i :
										e
										.calculateBarX(
											c,
											e
											.index
											),
									y: e.calculateBarY(
										c,
										e
										.index
										),
									label: e
										.chart
										.data
										.labels[
											c
											],
									datasetLabel: k
										.label,
									base: d ?
										i :
										e
										.calculateBarBase(
											e
											.index,
											c
											),
									height: e
										.calculateBarHeight(
											c
											),
									backgroundColor: j
										.backgroundColor ?
										j
										.backgroundColor :
										b
										.getValueAtIndexOrDefault(
											k
											.backgroundColor,
											c,
											l
											.backgroundColor
											),
									borderSkipped: j
										.borderSkipped ?
										j
										.borderSkipped :
										l
										.borderSkipped,
									borderColor: j
										.borderColor ?
										j
										.borderColor :
										b
										.getValueAtIndexOrDefault(
											k
											.borderColor,
											c,
											l
											.borderColor
											),
									borderWidth: j
										.borderWidth ?
										j
										.borderWidth :
										b
										.getValueAtIndexOrDefault(
											k
											.borderWidth,
											c,
											l
											.borderWidth
											)
								},
								draw: function()
								{
									function a(
										a
										)
									{
										return i[
											(k +
												a) %
											4
											]
									}
									var b =
										this
										._chart
										.ctx,
										c =
										this
										._view,
										d =
										c
										.height /
										2,
										e =
										c
										.y -
										d,
										f =
										c
										.y +
										d,
										g =
										c
										.base -
										(c.base -
											c
											.x
											),
										h =
										c
										.borderWidth /
										2;
									c.borderWidth &&
										(e +=
											h,
											f -=
											h,
											g +=
											h
											),
										b
										.beginPath(),
										b
										.fillStyle =
										c
										.backgroundColor,
										b
										.strokeStyle =
										c
										.borderColor,
										b
										.lineWidth =
										c
										.borderWidth;
									var i = [
											[c.base,
												f
											],
											[c.base,
												e
											],
											[g,
												e],
											[g,
												f]
										],
										j = [
											"bottom",
											"left",
											"top",
											"right"
										],
										k =
										j
										.indexOf(
											c
											.borderSkipped,
											0
											); -
									1 ===
										k &&
										(k =
											0),
										b
										.moveTo
										.apply(
											b,
											a(
												0)
											);
									for (
										var l =
											1; l <
										4; l++
										)
										b
										.lineTo
										.apply(
											b,
											a(
												l)
											);
									b.fill(),
										c
										.borderWidth &&
										b
										.stroke()
								},
								inRange: function(
									a,
									b
									)
								{
									var c =
										this
										._view,
										d = !
										1;
									return c &&
										(d = c
											.x <
											c
											.base ?
											b >=
											c
											.y -
											c
											.height /
											2 &&
											b <=
											c
											.y +
											c
											.height /
											2 &&
											a >=
											c
											.x &&
											a <=
											c
											.base :
											b >=
											c
											.y -
											c
											.height /
											2 &&
											b <=
											c
											.y +
											c
											.height /
											2 &&
											a >=
											c
											.base &&
											a <=
											c
											.x
											),
										d
								}
							}), a.pivot()
						},
						calculateBarBase: function(
							a, b)
						{
							var c = this,
								d = c.getMeta(),
								e = c
								.getScaleForId(d
									.xAxisID),
								f = 0;
							if (e.options
								.stacked)
							{
								for (var g = c
										.chart,
										h = g
										.data
										.datasets,
										i =
										Number(
											h[a]
											.data[
												b
												]
											),
										j =
										0; j <
									a; j++)
								{
									var k = h[
										j],
										l = g
										.getDatasetMeta(
											j);
									if (l.bar &&
										l
										.xAxisID ===
										e.id &&
										g
										.isDatasetVisible(
											j))
									{
										var m =
											Number(
												k
												.data[
													b
													]
												);
										f += i <
											0 ?
											Math
											.min(
												m,
												0
												) :
											Math
											.max(
												m,
												0
												)
									}
								}
								return e
									.getPixelForValue(
										f)
							}
							return e
								.getBasePixel()
						},
						getRuler: function(a)
						{
							var b, c = this,
								d = c.getMeta(),
								e = c
								.getScaleForId(d
									.yAxisID),
								f = c
								.getBarCount();
							b = "category" === e
								.options.type ?
								e
								.getPixelForTick(
									a + 1) - e
								.getPixelForTick(
									a) : e
								.width / e.ticks
								.length;
							var g = b * e
								.options
								.categoryPercentage,
								h = (b - b * e
									.options
									.categoryPercentage
									) / 2,
								i = g / f;
							if (e.ticks
								.length !== c
								.chart.data
								.labels.length)
							{
								i *= e.ticks
									.length / c
									.chart.data
									.labels
									.length
							}
							return {
								datasetCount: f,
								tickHeight: b,
								categoryHeight: g,
								categorySpacing: h,
								fullBarHeight: i,
								barHeight: i * e
									.options
									.barPercentage,
								barSpacing: i -
									i * e
									.options
									.barPercentage
							}
						},
						calculateBarHeight: function(
							a)
						{
							var b = this,
								c = b
								.getScaleForId(b
									.getMeta()
									.yAxisID);
							if (c.options
								.barThickness)
								return c.options
									.barThickness;
							var d = b.getRuler(
								a);
							return c.options
								.stacked ? d
								.categoryHeight :
								d.barHeight
						},
						calculateBarX: function(a,
							b)
						{
							var c = this,
								d = c.getMeta(),
								e = c
								.getScaleForId(d
									.xAxisID),
								f = Number(c
									.getDataset()
									.data[a]);
							if (e.options
								.stacked)
							{
								for (var g = 0,
										h = 0,
										i =
										0; i <
									b; i++)
								{
									var j = c
										.chart
										.data
										.datasets[
											i],
										k = c
										.chart
										.getDatasetMeta(
											i);
									if (k.bar &&
										k
										.xAxisID ===
										e.id &&
										c.chart
										.isDatasetVisible(
											i))
									{
										var l =
											Number(
												j
												.data[
													a
													]
												);
										l < 0 ?
											h +=
											l ||
											0 :
											g +=
											l ||
											0
									}
								}
								return f < 0 ? e
									.getPixelForValue(
										h + f) :
									e
									.getPixelForValue(
										g + f)
							}
							return e
								.getPixelForValue(
									f)
						},
						calculateBarY: function(a,
							b)
						{
							var c = this,
								d = c.getMeta(),
								e = c
								.getScaleForId(d
									.yAxisID),
								f = c
								.getBarIndex(b),
								g = c.getRuler(
									a),
								h = e
								.getPixelForValue(
									null, a, b,
									c.chart
									.isCombo);
							return h -= c.chart
								.isCombo ? g
								.tickHeight /
								2 : 0, e.options
								.stacked ? h + g
								.categoryHeight /
								2 + g
								.categorySpacing :
								h + g
								.barHeight / 2 +
								g
								.categorySpacing +
								g.barHeight *
								f + g
								.barSpacing /
								2 + g
								.barSpacing * f
						}
					})
			}
		},
		{}],
		16: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				var b = a.helpers;
				a.defaults.bubble = {
						hover:
						{
							mode: "single"
						},
						scales:
						{
							xAxes: [
							{
								type: "linear",
								position: "bottom",
								id: "x-axis-0"
							}],
							yAxes: [
							{
								type: "linear",
								position: "left",
								id: "y-axis-0"
							}]
						},
						tooltips:
						{
							callbacks:
							{
								title: function()
								{
									return ""
								},
								label: function(a, b)
								{
									var c = b
										.datasets[a
											.datasetIndex
											]
										.label ||
										"",
										d = b
										.datasets[a
											.datasetIndex
											].data[a
											.index];
									return c +
										": (" + d
										.x + ", " +
										d.y + ", " +
										d.r + ")"
								}
							}
						}
					}, a.controllers.bubble = a
					.DatasetController.extend(
					{
						dataElementType: a.elements
							.Point,
						update: function(a)
						{
							var c = this,
								d = c.getMeta(),
								e = d.data;
							b.each(e, function(
								b, d)
							{
								c.updateElement(
									b,
									d,
									a
									)
							})
						},
						updateElement: function(c,
							d, e)
						{
							var f = this,
								g = f.getMeta(),
								h = f
								.getScaleForId(g
									.xAxisID),
								i = f
								.getScaleForId(g
									.yAxisID),
								j = c.custom ||
								{},
								k = f
								.getDataset(),
								l = k.data[d],
								m = f.chart
								.options
								.elements.point,
								n = f.index;
							b.extend(c,
								{
									_xScale: h,
									_yScale: i,
									_datasetIndex: n,
									_index: d,
									_model:
									{
										x: e ?
											h
											.getPixelForDecimal(
												.5
												) :
											h
											.getPixelForValue(
												"object" ==
												typeof l ?
												l :
												NaN,
												d,
												n,
												f
												.chart
												.isCombo
												),
										y: e ?
											i
											.getBasePixel() :
											i
											.getPixelForValue(
												l,
												d,
												n
												),
										radius: e ?
											0 :
											j
											.radius ?
											j
											.radius :
											f
											.getRadius(
												l
												),
										hitRadius: j
											.hitRadius ?
											j
											.hitRadius :
											b
											.getValueAtIndexOrDefault(
												k
												.hitRadius,
												d,
												m
												.hitRadius
												)
									}
								}), a
								.DatasetController
								.prototype
								.removeHoverStyle
								.call(f, c, m);
							var o = c._model;
							o.skip = j.skip ? j
								.skip : isNaN(o
									.x) ||
								isNaN(o.y), c
								.pivot()
						},
						getRadius: function(a)
						{
							return a.r || this
								.chart.options
								.elements.point
								.radius
						},
						setHoverStyle: function(c)
						{
							var d = this;
							a.DatasetController
								.prototype
								.setHoverStyle
								.call(d, c);
							var e = d.chart.data
								.datasets[c
									._datasetIndex
									],
								f = c._index,
								g = c.custom ||
								{};
							c._model.radius = g
								.hoverRadius ? g
								.hoverRadius : b
								.getValueAtIndexOrDefault(
									e
									.hoverRadius,
									f, d.chart
									.options
									.elements
									.point
									.hoverRadius
									) + d
								.getRadius(e
									.data[f])
						},
						removeHoverStyle: function(
							b)
						{
							var c = this;
							a.DatasetController
								.prototype
								.removeHoverStyle
								.call(c, b, c
									.chart
									.options
									.elements
									.point);
							var d = c.chart.data
								.datasets[b
									._datasetIndex
									].data[b
									._index],
								e = b.custom ||
								{};
							b._model.radius = e
								.radius ? e
								.radius : c
								.getRadius(d)
						}
					})
			}
		},
		{}],
		17: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				var b = a.helpers,
					c = a.defaults;
				c.doughnut = {
						animation:
						{
							animateRotate: !0,
							animateScale: !1
						},
						aspectRatio: 1,
						hover:
						{
							mode: "single"
						},
						legendCallback: function(a)
						{
							var b = [];
							b.push('<ul class="' + a
								.id +
								'-legend">');
							var c = a.data,
								d = c.datasets,
								e = c.labels;
							if (d.length)
								for (var f = 0; f <
									d[0].data
									.length; ++f) b
									.push(
										'<li><span style="background-color:' +
										d[0]
										.backgroundColor[
											f] +
										'"></span>'
										), e[f] && b
									.push(e[f]), b
									.push("</li>");
							return b.push("</ul>"),
								b.join("")
						},
						legend:
						{
							labels:
							{
								generateLabels: function(
									a)
								{
									var c = a.data;
									return c.labels
										.length && c
										.datasets
										.length ? c
										.labels.map(
											function(
												d, e
												)
											{
												var f =
													a
													.getDatasetMeta(
														0
														),
													g =
													c
													.datasets[
														0
														],
													h =
													f
													.data[
														e
														],
													i =
													h &&
													h
													.custom ||
													{},
													j =
													b
													.getValueAtIndexOrDefault,
													k =
													a
													.options
													.elements
													.arc;
												return {
													text: d,
													fillStyle: i
														.backgroundColor ?
														i
														.backgroundColor :
														j(g.backgroundColor,
															e,
															k
															.backgroundColor
															),
													strokeStyle: i
														.borderColor ?
														i
														.borderColor :
														j(g.borderColor,
															e,
															k
															.borderColor
															),
													lineWidth: i
														.borderWidth ?
														i
														.borderWidth :
														j(g.borderWidth,
															e,
															k
															.borderWidth
															),
													hidden: isNaN(
															g
															.data[
																e
																]
															) ||
														f
														.data[
															e
															]
														.hidden,
													index: e
												}
											}) : []
								}
							},
							onClick: function(a, b)
							{
								var c, d, e, f = b
									.index,
									g = this.chart;
								for (c = 0, d = (g
										.data
										.datasets ||
										[])
									.length; c <
									d; ++c) e = g
									.getDatasetMeta(
										c), e.data[
										f]
									.hidden = !e
									.data[f].hidden;
								g.update()
							}
						},
						cutoutPercentage: 50,
						rotation: -.5 * Math.PI,
						circumference: 2 * Math.PI,
						tooltips:
						{
							callbacks:
							{
								title: function()
								{
									return ""
								},
								label: function(a, b)
								{
									return b.labels[
											a.index
											] +
										": " + b
										.datasets[a
											.datasetIndex
											].data[a
											.index]
								}
							}
						}
					}, c.pie = b.clone(c.doughnut), b
					.extend(c.pie,
					{
						cutoutPercentage: 0
					}), a.controllers.doughnut = a
					.controllers.pie = a
					.DatasetController.extend(
					{
						dataElementType: a.elements
							.Arc,
						linkScales: b.noop,
						getRingIndex: function(a)
						{
							for (var b = 0, c =
									0; c < a; ++
								c) this.chart
								.isDatasetVisible(
									c) && ++b;
							return b
						},
						update: function(a)
						{
							var c = this,
								d = c.chart,
								e = d.chartArea,
								f = d.options,
								g = f.elements
								.arc,
								h = e.right - e
								.left - g
								.borderWidth,
								i = e.bottom - e
								.top - g
								.borderWidth,
								j = Math.min(h,
									i),
								k = {
									x: 0,
									y: 0
								},
								l = c.getMeta(),
								m = f
								.cutoutPercentage,
								n = f
								.circumference;
							if (n < 2 * Math.PI)
							{
								var o = f
									.rotation %
									(2 * Math
										.PI);
								o += 2 * Math
									.PI * (o >=
										Math
										.PI ? -
										1 : o <
										-Math
										.PI ?
										1 : 0);
								var p = o + n,
									q = {
										x: Math
											.cos(
												o
												),
										y: Math
											.sin(
												o
												)
									},
									r = {
										x: Math
											.cos(
												p
												),
										y: Math
											.sin(
												p
												)
									},
									s = o <=
									0 && 0 <=
									p || o <=
									2 * Math
									.PI && 2 *
									Math.PI <=
									p,
									t = o <=
									.5 * Math
									.PI && .5 *
									Math.PI <=
									p || o <=
									2.5 * Math
									.PI && 2.5 *
									Math.PI <=
									p,
									u = o <= -
									Math.PI && -
									Math.PI <=
									p || o <=
									Math.PI &&
									Math.PI <=
									p,
									v = o <=
									.5 * -Math
									.PI && .5 *
									-Math.PI <=
									p || o <=
									1.5 * Math
									.PI && 1.5 *
									Math.PI <=
									p,
									w = m / 100,
									x = {
										x: u ? -
											1 :
											Math
											.min(
												q
												.x *
												(q.x <
													0 ?
													1 :
													w
													),
												r
												.x *
												(r.x <
													0 ?
													1 :
													w
													)
												),
										y: v ? -
											1 :
											Math
											.min(
												q
												.y *
												(q.y <
													0 ?
													1 :
													w
													),
												r
												.y *
												(r.y <
													0 ?
													1 :
													w
													)
												)
									},
									y = {
										x: s ?
											1 :
											Math
											.max(
												q
												.x *
												(q.x >
													0 ?
													1 :
													w
													),
												r
												.x *
												(r.x >
													0 ?
													1 :
													w
													)
												),
										y: t ?
											1 :
											Math
											.max(
												q
												.y *
												(q.y >
													0 ?
													1 :
													w
													),
												r
												.y *
												(r.y >
													0 ?
													1 :
													w
													)
												)
									},
									z = {
										width: .5 *
											(y.x -
												x
												.x
												),
										height: .5 *
											(y.y -
												x
												.y
												)
									};
								j = Math.min(h /
										z.width,
										i / z
										.height
										), k = {
										x: -.5 *
											(y.x +
												x
												.x
												),
										y: -.5 *
											(y.y +
												x
												.y
												)
									}
							}
							d.borderWidth = c
								.getMaxBorderWidth(
									l.data), d
								.outerRadius =
								Math.max((j - d
										.borderWidth
										) / 2,
									0), d
								.innerRadius =
								Math.max(m ? d
									.outerRadius /
									100 * m : 1,
									0), d
								.radiusLength =
								(d.outerRadius -
									d
									.innerRadius
									) / d
								.getVisibleDatasetCount(),
								d.offsetX = k
								.x * d
								.outerRadius, d
								.offsetY = k.y *
								d.outerRadius, l
								.total = c
								.calculateTotal(),
								c.outerRadius =
								d.outerRadius -
								d.radiusLength *
								c.getRingIndex(c
									.index), c
								.innerRadius = c
								.outerRadius - d
								.radiusLength, b
								.each(l.data,
									function(b,
										d)
									{
										c.updateElement(
											b,
											d,
											a
											)
									})
						},
						updateElement: function(a,
							c, d)
						{
							var e = this,
								f = e.chart,
								g = f.chartArea,
								h = f.options,
								i = h.animation,
								j = (g.left + g
									.right) / 2,
								k = (g.top + g
									.bottom) /
								2,
								l = h.rotation,
								m = h.rotation,
								n = e
								.getDataset(),
								o = d && i
								.animateRotate ?
								0 : a.hidden ?
								0 : e
								.calculateCircumference(
									n.data[c]) *
								(h.circumference /
									(2 * Math
										.PI)),
								p = d && i
								.animateScale ?
								0 : e
								.innerRadius,
								q = d && i
								.animateScale ?
								0 : e
								.outerRadius,
								r = b
								.getValueAtIndexOrDefault;
							b.extend(a,
							{
								_datasetIndex: e
									.index,
								_index: c,
								_model:
								{
									x: j +
										f
										.offsetX,
									y: k +
										f
										.offsetY,
									startAngle: l,
									endAngle: m,
									circumference: o,
									outerRadius: q,
									innerRadius: p,
									label: r(
										n
										.label,
										c,
										f
										.data
										.labels[
											c
											]
										)
								}
							});
							var s = a._model;
							this.removeHoverStyle(
									a), d && i
								.animateRotate ||
								(s.startAngle =
									0 === c ? h
									.rotation :
									e.getMeta()
									.data[c - 1]
									._model
									.endAngle, s
									.endAngle =
									s
									.startAngle +
									s
									.circumference
									), a.pivot()
						},
						removeHoverStyle: function(
							b)
						{
							a.DatasetController
								.prototype
								.removeHoverStyle
								.call(this, b,
									this.chart
									.options
									.elements
									.arc)
						},
						calculateTotal: function()
						{
							var a, c = this
								.getDataset(),
								d = this
								.getMeta(),
								e = 0;
							return b.each(d
								.data,
								function(b,
									d)
								{
									a = c
										.data[
											d
											],
										isNaN(
											a
											) ||
										b
										.hidden ||
										(e +=
											Math
											.abs(
												a
												)
											)
								}), e
						},
						calculateCircumference: function(
							a)
						{
							var b = this
								.getMeta()
								.total;
							return b > 0 && !
								isNaN(a) ? 2 *
								Math.PI * (a /
									b) : 0
						},
						getMaxBorderWidth: function(
							a)
						{
							for (var b, c, d =
									0, e = this
									.index, f =
									a.length,
									g = 0; g <
								f; g++) b = a[g]
								._model ? a[g]
								._model
								.borderWidth :
								0, c = a[g]
								._chart ? a[g]
								._chart.config
								.data.datasets[
									e]
								.hoverBorderWidth :
								0, d = b > d ?
								b : d, d = c >
								d ? c : d;
							return d
						}
					})
			}
		},
		{}],
		18: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				function b(a, b)
				{
					return c.getValueOrDefault(a
						.showLine, b.showLines)
				}
				var c = a.helpers;
				a.defaults.line = {
						showLines: !0,
						spanGaps: !1,
						hover:
						{
							mode: "label"
						},
						scales:
						{
							xAxes: [
							{
								type: "category",
								id: "x-axis-0"
							}],
							yAxes: [
							{
								type: "linear",
								id: "y-axis-0"
							}]
						}
					}, a.controllers.line = a
					.DatasetController.extend(
					{
						datasetElementType: a
							.elements.Line,
						dataElementType: a.elements
							.Point,
						addElementAndReset: function(
							c)
						{
							var d = this,
								e = d.chart
								.options,
								f = d.getMeta();
							a.DatasetController
								.prototype
								.addElementAndReset
								.call(d, c), b(d
									.getDataset(),
									e) && 0 !==
								f.dataset._model
								.tension && d
								.updateBezierControlPoints()
						},
						update: function(a)
						{
							var d, e, f, g =
								this,
								h = g.getMeta(),
								i = h.dataset,
								j = h.data ||
							[],
								k = g.chart
								.options,
								l = k.elements
								.line,
								m = g
								.getScaleForId(h
									.yAxisID),
								n = g
								.getDataset(),
								o = b(n, k);
							for (o && (f = i
									.custom ||
									{},
									void 0 !== n
									.tension &&
									void 0 === n
									.lineTension &&
									(n.lineTension =
										n
										.tension
										), i
									._scale = m,
									i
									._datasetIndex =
									g.index, i
									._children =
									j, i
									._model = {
										spanGaps: n
											.spanGaps ?
											n
											.spanGaps :
											k
											.spanGaps,
										tension: f
											.tension ?
											f
											.tension :
											c
											.getValueOrDefault(
												n
												.lineTension,
												l
												.tension
												),
										backgroundColor: f
											.backgroundColor ?
											f
											.backgroundColor :
											n
											.backgroundColor ||
											l
											.backgroundColor,
										borderWidth: f
											.borderWidth ?
											f
											.borderWidth :
											n
											.borderWidth ||
											l
											.borderWidth,
										borderColor: f
											.borderColor ?
											f
											.borderColor :
											n
											.borderColor ||
											l
											.borderColor,
										borderCapStyle: f
											.borderCapStyle ?
											f
											.borderCapStyle :
											n
											.borderCapStyle ||
											l
											.borderCapStyle,
										borderDash: f
											.borderDash ?
											f
											.borderDash :
											n
											.borderDash ||
											l
											.borderDash,
										borderDashOffset: f
											.borderDashOffset ?
											f
											.borderDashOffset :
											n
											.borderDashOffset ||
											l
											.borderDashOffset,
										borderJoinStyle: f
											.borderJoinStyle ?
											f
											.borderJoinStyle :
											n
											.borderJoinStyle ||
											l
											.borderJoinStyle,
										fill: f
											.fill ?
											f
											.fill :
											void 0 !==
											n
											.fill ?
											n
											.fill :
											l
											.fill,
										steppedLine: f
											.steppedLine ?
											f
											.steppedLine :
											c
											.getValueOrDefault(
												n
												.steppedLine,
												l
												.stepped
												),
										scaleTop: m
											.top,
										scaleBottom: m
											.bottom,
										scaleZero: m
											.getBasePixel()
									}, i.pivot()
									), d = 0,
								e = j
								.length; d <
								e; ++d) g
								.updateElement(
									j[d], d, a);
							for (o && 0 !== i
								._model
								.tension && g
								.updateBezierControlPoints(),
								d = 0, e = j
								.length; d <
								e; ++d) j[d]
								.pivot()
						},
						getPointBackgroundColor: function(
							a, b)
						{
							var d = this.chart
								.options
								.elements.point
								.backgroundColor,
								e = this
								.getDataset(),
								f = a.custom ||
								{};
							return f
								.backgroundColor ?
								d = f
								.backgroundColor :
								e
								.pointBackgroundColor ?
								d = c
								.getValueAtIndexOrDefault(
									e
									.pointBackgroundColor,
									b, d) : e
								.backgroundColor &&
								(d = e
									.backgroundColor
									), d
						},
						getPointBorderColor: function(
							a, b)
						{
							var d = this.chart
								.options
								.elements.point
								.borderColor,
								e = this
								.getDataset(),
								f = a.custom ||
								{};
							return f
								.borderColor ?
								d = f
								.borderColor : e
								.pointBorderColor ?
								d = c
								.getValueAtIndexOrDefault(
									e
									.pointBorderColor,
									b, d) : e
								.borderColor &&
								(d = e
									.borderColor
									), d
						},
						getPointBorderWidth: function(
							a, b)
						{
							var d = this.chart
								.options
								.elements.point
								.borderWidth,
								e = this
								.getDataset(),
								f = a.custom ||
								{};
							return f
								.borderWidth ?
								d = f
								.borderWidth : e
								.pointBorderWidth ?
								d = c
								.getValueAtIndexOrDefault(
									e
									.pointBorderWidth,
									b, d) : e
								.borderWidth &&
								(d = e
									.borderWidth
									), d
						},
						updateElement: function(a,
							b, d)
						{
							var e, f, g = this,
								h = g.getMeta(),
								i = a.custom ||
								{},
								j = g
								.getDataset(),
								k = g.index,
								l = j.data[b],
								m = g
								.getScaleForId(h
									.yAxisID),
								n = g
								.getScaleForId(h
									.xAxisID),
								o = g.chart
								.options
								.elements.point;
							void 0 !== j
								.radius &&
								void 0 === j
								.pointRadius &&
								(j.pointRadius =
									j.radius),
								void 0 !== j
								.hitRadius &&
								void 0 === j
								.pointHitRadius &&
								(j.pointHitRadius =
									j.hitRadius
									), e = n
								.getPixelForValue(
									"object" ==
									typeof l ?
									l : NaN, b,
									k, g.chart
									.isCombo),
								f = d ? m
								.getBasePixel() :
								g
								.calculatePointY(
									l, b, k), a
								._xScale = n, a
								._yScale = m, a
								._datasetIndex =
								k, a._index = b,
								a._model = {
									x: e,
									y: f,
									skip: i
										.skip ||
										isNaN(
										e) ||
										isNaN(
										f),
									radius: i
										.radius ||
										c
										.getValueAtIndexOrDefault(
											j
											.pointRadius,
											b, o
											.radius
											),
									pointStyle: i
										.pointStyle ||
										c
										.getValueAtIndexOrDefault(
											j
											.pointStyle,
											b, o
											.pointStyle
											),
									backgroundColor: g
										.getPointBackgroundColor(
											a, b
											),
									borderColor: g
										.getPointBorderColor(
											a, b
											),
									borderWidth: g
										.getPointBorderWidth(
											a, b
											),
									tension: h
										.dataset
										._model ?
										h
										.dataset
										._model
										.tension :
										0,
									steppedLine:
										!!h
										.dataset
										._model &&
										h
										.dataset
										._model
										.steppedLine,
									hitRadius: i
										.hitRadius ||
										c
										.getValueAtIndexOrDefault(
											j
											.pointHitRadius,
											b, o
											.hitRadius
											)
								}
						},
						calculatePointY: function(a,
							b, c)
						{
							var d, e, f, g =
								this,
								h = g.chart,
								i = g.getMeta(),
								j = g
								.getScaleForId(i
									.yAxisID),
								k = 0,
								l = 0;
							if (j.options
								.stacked)
							{
								for (d = 0; d <
									c; d++)
									if (e = h
										.data
										.datasets[
											d],
										f = h
										.getDatasetMeta(
											d),
										"line" ===
										f
										.type &&
										f
										.yAxisID ===
										j.id &&
										h
										.isDatasetVisible(
											d))
									{
										var m =
											Number(
												j
												.getRightValue(
													e
													.data[
														b
														]
													)
												);
										m < 0 ?
											l +=
											m ||
											0 :
											k +=
											m ||
											0
									} var n =
									Number(j
										.getRightValue(
											a));
								return n < 0 ? j
									.getPixelForValue(
										l + n) :
									j
									.getPixelForValue(
										k + n)
							}
							return j
								.getPixelForValue(
									a)
						},
						updateBezierControlPoints: function()
						{
							function a(a, b, c)
							{
								return l ? Math
									.max(Math
										.min(a,
											c),
										b) : a
							}
							var b, d, e, f, g,
								h = this,
								i = h.getMeta(),
								j = h.chart
								.chartArea,
								k = (i.data ||
								[]).filter(
									function(a)
									{
										return !
											a
											._model
											.skip
									}),
								l = h.chart
								.options
								.elements.line
								.capBezierPoints;
							for (b = 0, d = k
								.length; b <
								d; ++b) e = k[
								b], f = e
								._model, g = c
								.splineCurve(c
									.previousItem(
										k, b)
									._model, f,
									c.nextItem(
										k, b)
									._model, i
									.dataset
									._model
									.tension), f
								.controlPointPreviousX =
								a(g.previous.x,
									j.left, j
									.right), f
								.controlPointPreviousY =
								a(g.previous.y,
									j.top, j
									.bottom), f
								.controlPointNextX =
								a(g.next.x, j
									.left, j
									.right), f
								.controlPointNextY =
								a(g.next.y, j
									.top, j
									.bottom)
						},
						draw: function(a)
						{
							var c, d, e = this,
								f = e.getMeta(),
								g = f.data ||
							[],
								h = a || 1;
							for (c = 0, d = g
								.length; c <
								d; ++c) g[c]
								.transition(h);
							for (b(e.getDataset(),
									e.chart
									.options) &&
								f.dataset
								.transition(h)
								.draw(), c = 0,
								d = g
								.length; c <
								d; ++c) g[c]
								.draw()
						},
						setHoverStyle: function(a)
						{
							var b = this.chart
								.data.datasets[a
									._datasetIndex
									],
								d = a._index,
								e = a.custom ||
								{},
								f = a._model;
							f.radius = e
								.hoverRadius ||
								c
								.getValueAtIndexOrDefault(
									b
									.pointHoverRadius,
									d, this
									.chart
									.options
									.elements
									.point
									.hoverRadius
									), f
								.backgroundColor =
								e
								.hoverBackgroundColor ||
								c
								.getValueAtIndexOrDefault(
									b
									.pointHoverBackgroundColor,
									d, c
									.getHoverColor(
										f
										.backgroundColor
										)), f
								.borderColor = e
								.hoverBorderColor ||
								c
								.getValueAtIndexOrDefault(
									b
									.pointHoverBorderColor,
									d, c
									.getHoverColor(
										f
										.borderColor
										)), f
								.borderWidth = e
								.hoverBorderWidth ||
								c
								.getValueAtIndexOrDefault(
									b
									.pointHoverBorderWidth,
									d, f
									.borderWidth
									)
						},
						removeHoverStyle: function(
							a)
						{
							var b = this,
								d = b.chart.data
								.datasets[a
									._datasetIndex
									],
								e = a._index,
								f = a.custom ||
								{},
								g = a._model;
							void 0 !== d
								.radius &&
								void 0 === d
								.pointRadius &&
								(d.pointRadius =
									d.radius), g
								.radius = f
								.radius || c
								.getValueAtIndexOrDefault(
									d
									.pointRadius,
									e, b.chart
									.options
									.elements
									.point
									.radius), g
								.backgroundColor =
								b
								.getPointBackgroundColor(
									a, e), g
								.borderColor = b
								.getPointBorderColor(
									a, e), g
								.borderWidth = b
								.getPointBorderWidth(
									a, e)
						}
					})
			}
		},
		{}],
		19: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				var b = a.helpers;
				a.defaults.polarArea = {
						scale:
						{
							type: "radialLinear",
							lineArc: !0,
							ticks:
							{
								beginAtZero: !0
							}
						},
						animation:
						{
							animateRotate: !0,
							animateScale: !0
						},
						startAngle: -.5 * Math.PI,
						aspectRatio: 1,
						legendCallback: function(a)
						{
							var b = [];
							b.push('<ul class="' + a
								.id +
								'-legend">');
							var c = a.data,
								d = c.datasets,
								e = c.labels;
							if (d.length)
								for (var f = 0; f <
									d[0].data
									.length; ++f) b
									.push(
										'<li><span style="background-color:' +
										d[0]
										.backgroundColor[
											f] +
										'">'), e[
									f] && b.push(e[
										f]), b.push(
										"</span></li>"
										);
							return b.push("</ul>"),
								b.join("")
						},
						legend:
						{
							labels:
							{
								generateLabels: function(
									a)
								{
									var c = a.data;
									return c.labels
										.length && c
										.datasets
										.length ? c
										.labels.map(
											function(
												d, e
												)
											{
												var f =
													a
													.getDatasetMeta(
														0
														),
													g =
													c
													.datasets[
														0
														],
													h =
													f
													.data[
														e
														],
													i =
													h
													.custom ||
													{},
													j =
													b
													.getValueAtIndexOrDefault,
													k =
													a
													.options
													.elements
													.arc;
												return {
													text: d,
													fillStyle: i
														.backgroundColor ?
														i
														.backgroundColor :
														j(g.backgroundColor,
															e,
															k
															.backgroundColor
															),
													strokeStyle: i
														.borderColor ?
														i
														.borderColor :
														j(g.borderColor,
															e,
															k
															.borderColor
															),
													lineWidth: i
														.borderWidth ?
														i
														.borderWidth :
														j(g.borderWidth,
															e,
															k
															.borderWidth
															),
													hidden: isNaN(
															g
															.data[
																e
																]
															) ||
														f
														.data[
															e
															]
														.hidden,
													index: e
												}
											}) : []
								}
							},
							onClick: function(a, b)
							{
								var c, d, e, f = b
									.index,
									g = this.chart;
								for (c = 0, d = (g
										.data
										.datasets ||
										[])
									.length; c <
									d; ++c) e = g
									.getDatasetMeta(
										c), e.data[
										f]
									.hidden = !e
									.data[f].hidden;
								g.update()
							}
						},
						tooltips:
						{
							callbacks:
							{
								title: function()
								{
									return ""
								},
								label: function(a, b)
								{
									return b.labels[
											a.index
											] +
										": " + a
										.yLabel
								}
							}
						}
					}, a.controllers.polarArea = a
					.DatasetController.extend(
					{
						dataElementType: a.elements
							.Arc,
						linkScales: b.noop,
						update: function(a)
						{
							var c = this,
								d = c.chart,
								e = d.chartArea,
								f = c.getMeta(),
								g = d.options,
								h = g.elements
								.arc,
								i = Math.min(e
									.right - e
									.left, e
									.bottom - e
									.top);
							d.outerRadius = Math
								.max((i - h
										.borderWidth /
										2) / 2,
									0), d
								.innerRadius =
								Math.max(g
									.cutoutPercentage ?
									d
									.outerRadius /
									100 * g
									.cutoutPercentage :
									1, 0), d
								.radiusLength =
								(d.outerRadius -
									d
									.innerRadius
									) / d
								.getVisibleDatasetCount(),
								c.outerRadius =
								d.outerRadius -
								d.radiusLength *
								c.index, c
								.innerRadius = c
								.outerRadius - d
								.radiusLength, f
								.count = c
								.countVisibleElements(),
								b.each(f.data,
									function(b,
										d)
									{
										c.updateElement(
											b,
											d,
											a
											)
									})
						},
						updateElement: function(a,
							c, d)
						{
							for (var e = this,
									f = e.chart,
									g = e
									.getDataset(),
									h = f
									.options,
									i = h
									.animation,
									j = f.scale,
									k = b
									.getValueAtIndexOrDefault,
									l = f.data
									.labels, m =
									e
									.calculateCircumference(
										g.data[
											c]),
									n = j
									.xCenter,
									o = j
									.yCenter,
									p = 0, q = e
									.getMeta(),
									r = 0; r <
								c; ++r) isNaN(g
									.data[r]) ||
								q.data[r]
								.hidden || ++p;
							var s = h
								.startAngle,
								t = a.hidden ?
								0 : j
								.getDistanceFromCenterForValue(
									g.data[c]),
								u = s + m * p,
								v = u + (a
									.hidden ?
									0 : m),
								w = i
								.animateScale ?
								0 : j
								.getDistanceFromCenterForValue(
									g.data[c]);
							b.extend(a,
								{
									_datasetIndex: e
										.index,
									_index: c,
									_scale: j,
									_model:
									{
										x: n,
										y: o,
										innerRadius: 0,
										outerRadius: d ?
											w :
											t,
										startAngle: d &&
											i
											.animateRotate ?
											s :
											u,
										endAngle: d &&
											i
											.animateRotate ?
											s :
											v,
										label: k(
											l,
											c,
											l[
												c]
											)
									}
								}), e
								.removeHoverStyle(
									a), a
								.pivot()
						},
						removeHoverStyle: function(
							b)
						{
							a.DatasetController
								.prototype
								.removeHoverStyle
								.call(this, b,
									this.chart
									.options
									.elements
									.arc)
						},
						countVisibleElements: function()
						{
							var a = this
								.getDataset(),
								c = this
								.getMeta(),
								d = 0;
							return b.each(c
								.data,
								function(b,
									c)
								{
									isNaN(a.data[
											c
											]) ||
										b
										.hidden ||
										d++
								}), d
						},
						calculateCircumference: function(
							a)
						{
							var b = this
								.getMeta()
								.count;
							return b > 0 && !
								isNaN(a) ? 2 *
								Math.PI / b : 0
						}
					})
			}
		},
		{}],
		20: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				var b = a.helpers;
				a.defaults.radar = {
						scale:
						{
							type: "radialLinear"
						},
						elements:
						{
							line:
							{
								tension: 0
							}
						}
					}, a.controllers.radar = a
					.DatasetController.extend(
					{
						datasetElementType: a
							.elements.Line,
						dataElementType: a.elements
							.Point,
						linkScales: b.noop,
						addElementAndReset: function(
							b)
						{
							a.DatasetController
								.prototype
								.addElementAndReset
								.call(this, b),
								this
								.updateBezierControlPoints()
						},
						update: function(a)
						{
							var c = this,
								d = c.getMeta(),
								e = d.dataset,
								f = d.data,
								g = e.custom ||
								{},
								h = c
								.getDataset(),
								i = c.chart
								.options
								.elements.line,
								j = c.chart
								.scale;
							void 0 !== h
								.tension &&
								void 0 === h
								.lineTension &&
								(h.lineTension =
									h.tension),
								b.extend(d
									.dataset,
									{
										_datasetIndex: c
											.index,
										_children: f,
										_loop: !
											0,
										_model:
										{
											tension: g
												.tension ?
												g
												.tension :
												b
												.getValueOrDefault(
													h
													.lineTension,
													i
													.tension
													),
											backgroundColor: g
												.backgroundColor ?
												g
												.backgroundColor :
												h
												.backgroundColor ||
												i
												.backgroundColor,
											borderWidth: g
												.borderWidth ?
												g
												.borderWidth :
												h
												.borderWidth ||
												i
												.borderWidth,
											borderColor: g
												.borderColor ?
												g
												.borderColor :
												h
												.borderColor ||
												i
												.borderColor,
											fill: g
												.fill ?
												g
												.fill :
												void 0 !==
												h
												.fill ?
												h
												.fill :
												i
												.fill,
											borderCapStyle: g
												.borderCapStyle ?
												g
												.borderCapStyle :
												h
												.borderCapStyle ||
												i
												.borderCapStyle,
											borderDash: g
												.borderDash ?
												g
												.borderDash :
												h
												.borderDash ||
												i
												.borderDash,
											borderDashOffset: g
												.borderDashOffset ?
												g
												.borderDashOffset :
												h
												.borderDashOffset ||
												i
												.borderDashOffset,
											borderJoinStyle: g
												.borderJoinStyle ?
												g
												.borderJoinStyle :
												h
												.borderJoinStyle ||
												i
												.borderJoinStyle,
											scaleTop: j
												.top,
											scaleBottom: j
												.bottom,
											scaleZero: j
												.getBasePosition()
										}
									}), d
								.dataset
							.pivot(), b.each(f,
									function(b,
										d)
									{
										c.updateElement(
											b,
											d,
											a
											)
									}, c), c
								.updateBezierControlPoints()
						},
						updateElement: function(a,
							c, d)
						{
							var e = this,
								f = a.custom ||
								{},
								g = e
								.getDataset(),
								h = e.chart
								.scale,
								i = e.chart
								.options
								.elements.point,
								j = h
								.getPointPositionForValue(
									c, g.data[c]
									);
							b.extend(a,
								{
									_datasetIndex: e
										.index,
									_index: c,
									_scale: h,
									_model:
									{
										x: d ?
											h
											.xCenter :
											j
											.x,
										y: d ?
											h
											.yCenter :
											j
											.y,
										tension: f
											.tension ?
											f
											.tension :
											b
											.getValueOrDefault(
												g
												.tension,
												e
												.chart
												.options
												.elements
												.line
												.tension
												),
										radius: f
											.radius ?
											f
											.radius :
											b
											.getValueAtIndexOrDefault(
												g
												.pointRadius,
												c,
												i
												.radius
												),
										backgroundColor: f
											.backgroundColor ?
											f
											.backgroundColor :
											b
											.getValueAtIndexOrDefault(
												g
												.pointBackgroundColor,
												c,
												i
												.backgroundColor
												),
										borderColor: f
											.borderColor ?
											f
											.borderColor :
											b
											.getValueAtIndexOrDefault(
												g
												.pointBorderColor,
												c,
												i
												.borderColor
												),
										borderWidth: f
											.borderWidth ?
											f
											.borderWidth :
											b
											.getValueAtIndexOrDefault(
												g
												.pointBorderWidth,
												c,
												i
												.borderWidth
												),
										pointStyle: f
											.pointStyle ?
											f
											.pointStyle :
											b
											.getValueAtIndexOrDefault(
												g
												.pointStyle,
												c,
												i
												.pointStyle
												),
										hitRadius: f
											.hitRadius ?
											f
											.hitRadius :
											b
											.getValueAtIndexOrDefault(
												g
												.hitRadius,
												c,
												i
												.hitRadius
												)
									}
								}), a._model
								.skip = f.skip ?
								f.skip : isNaN(a
									._model.x
									) || isNaN(a
									._model.y)
						},
						updateBezierControlPoints: function()
						{
							var a = this.chart
								.chartArea,
								c = this
								.getMeta();
							b.each(c.data,
								function(d,
									e)
								{
									var f =
										d
										._model,
										g =
										b
										.splineCurve(
											b
											.previousItem(
												c
												.data,
												e,
												!
												0
												)
											._model,
											f,
											b
											.nextItem(
												c
												.data,
												e,
												!
												0
												)
											._model,
											f
											.tension
											);
									f.controlPointPreviousX =
										Math
										.max(
											Math
											.min(
												g
												.previous
												.x,
												a
												.right
												),
											a
											.left
											),
										f
										.controlPointPreviousY =
										Math
										.max(
											Math
											.min(
												g
												.previous
												.y,
												a
												.bottom
												),
											a
											.top
											),
										f
										.controlPointNextX =
										Math
										.max(
											Math
											.min(
												g
												.next
												.x,
												a
												.right
												),
											a
											.left
											),
										f
										.controlPointNextY =
										Math
										.max(
											Math
											.min(
												g
												.next
												.y,
												a
												.bottom
												),
											a
											.top
											),
										d
										.pivot()
								})
						},
						draw: function(a)
						{
							var c = this
								.getMeta(),
								d = a || 1;
							b.each(c.data,
									function(a)
									{
										a.transition(
											d
											)
									}), c
								.dataset
								.transition(d)
								.draw(), b.each(
									c.data,
									function(a)
									{
										a.draw()
									})
						},
						setHoverStyle: function(a)
						{
							var c = this.chart
								.data.datasets[a
									._datasetIndex
									],
								d = a.custom ||
								{},
								e = a._index,
								f = a._model;
							f.radius = d
								.hoverRadius ? d
								.hoverRadius : b
								.getValueAtIndexOrDefault(
									c
									.pointHoverRadius,
									e, this
									.chart
									.options
									.elements
									.point
									.hoverRadius
									), f
								.backgroundColor =
								d
								.hoverBackgroundColor ?
								d
								.hoverBackgroundColor :
								b
								.getValueAtIndexOrDefault(
									c
									.pointHoverBackgroundColor,
									e, b
									.getHoverColor(
										f
										.backgroundColor
										)), f
								.borderColor = d
								.hoverBorderColor ?
								d
								.hoverBorderColor :
								b
								.getValueAtIndexOrDefault(
									c
									.pointHoverBorderColor,
									e, b
									.getHoverColor(
										f
										.borderColor
										)), f
								.borderWidth = d
								.hoverBorderWidth ?
								d
								.hoverBorderWidth :
								b
								.getValueAtIndexOrDefault(
									c
									.pointHoverBorderWidth,
									e, f
									.borderWidth
									)
						},
						removeHoverStyle: function(
							a)
						{
							var c = this.chart
								.data.datasets[a
									._datasetIndex
									],
								d = a.custom ||
								{},
								e = a._index,
								f = a._model,
								g = this.chart
								.options
								.elements.point;
							f.radius = d
								.radius ? d
								.radius : b
								.getValueAtIndexOrDefault(
									c.radius, e,
									g.radius), f
								.backgroundColor =
								d
								.backgroundColor ?
								d
								.backgroundColor :
								b
								.getValueAtIndexOrDefault(
									c
									.pointBackgroundColor,
									e, g
									.backgroundColor
									), f
								.borderColor = d
								.borderColor ? d
								.borderColor : b
								.getValueAtIndexOrDefault(
									c
									.pointBorderColor,
									e, g
									.borderColor
									), f
								.borderWidth = d
								.borderWidth ? d
								.borderWidth : b
								.getValueAtIndexOrDefault(
									c
									.pointBorderWidth,
									e, g
									.borderWidth
									)
						}
					})
			}
		},
		{}],
		21: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				var b = a.helpers;
				a.defaults.global.animation = {
					duration: 1e3,
					easing: "easeOutQuart",
					onProgress: b.noop,
					onComplete: b.noop
				}, a.Animation = a.Element.extend(
				{
					currentStep: null,
					numSteps: 60,
					easing: "",
					render: null,
					onAnimationProgress: null,
					onAnimationComplete: null
				}), a.animationService = {
					frameDuration: 17,
					animations: [],
					dropFrames: 0,
					request: null,
					addAnimation: function(a, b, c,
						d)
					{
						var e = this;
						d || (a.animating = !0);
						for (var f = 0; f < e
							.animations
							.length; ++f)
							if (e.animations[f]
								.chartInstance ===
								a) return void(e
								.animations[
									f]
								.animationObject =
								b);
						e.animations.push(
							{
								chartInstance: a,
								animationObject: b
							}), 1 === e
							.animations
							.length && e
							.requestAnimationFrame()
					},
					cancelAnimation: function(a)
					{
						var c = b.findIndex(this
							.animations,
							function(b)
							{
								return b
									.chartInstance ===
									a
							}); - 1 !== c && (
							this.animations
							.splice(c, 1), a
							.animating = !1)
					},
					requestAnimationFrame: function()
					{
						var a = this;
						null === a.request && (a
							.request = b
							.requestAnimFrame
							.call(window,
								function()
								{
									a.request =
										null,
										a
										.startDigest()
								}))
					},
					startDigest: function()
					{
						var a = this,
							b = Date.now(),
							c = 0;
						a.dropFrames > 1 && (c =
							Math.floor(a
								.dropFrames
								), a
							.dropFrames = a
							.dropFrames % 1);
						for (var d = 0; d < a
							.animations.length;)
							null === a
							.animations[d]
							.animationObject
							.currentStep && (a
								.animations[d]
								.animationObject
								.currentStep = 0
								), a.animations[
								d]
							.animationObject
							.currentStep += 1 +
							c, a.animations[d]
							.animationObject
							.currentStep > a
							.animations[d]
							.animationObject
							.numSteps && (a
								.animations[d]
								.animationObject
								.currentStep = a
								.animations[d]
								.animationObject
								.numSteps), a
							.animations[d]
							.animationObject
							.render(a
								.animations[d]
								.chartInstance,
								a.animations[d]
								.animationObject
								), a.animations[
								d]
							.animationObject
							.onAnimationProgress &&
							a.animations[d]
							.animationObject
							.onAnimationProgress
							.call && a
							.animations[d]
							.animationObject
							.onAnimationProgress
							.call(a.animations[
									d]
								.chartInstance,
								a.animations[d]
								), a.animations[
								d]
							.animationObject
							.currentStep === a
							.animations[d]
							.animationObject
							.numSteps ? (a
								.animations[d]
								.animationObject
								.onAnimationComplete &&
								a.animations[d]
								.animationObject
								.onAnimationComplete
								.call && a
								.animations[d]
								.animationObject
								.onAnimationComplete
								.call(a
									.animations[
										d]
									.chartInstance,
									a
									.animations[
										d]), a
								.animations[d]
								.chartInstance
								.animating = !1,
								a.animations
								.splice(d, 1)) :
							++d;
						var e = Date.now(),
							f = (e - b) / a
							.frameDuration;
						a.dropFrames += f, a
							.animations.length >
							0 && a
							.requestAnimationFrame()
					}
				}
			}
		},
		{}],
		22: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				(a.canvasHelpers = {}).drawPoint =
					function(a, b, c, d, e)
					{
						var f, g, h, i, j, k;
						if ("object" == typeof b && (
								"[object HTMLImageElement]" ===
								(f = b.toString()) ||
								"[object HTMLCanvasElement]" ===
								f)) return void a
							.drawImage(b, d - b
								.width / 2, e - b
								.height / 2);
						if (!(isNaN(c) || c <= 0))
						{
							switch (b)
							{
								default:
									a.beginPath(), a
										.arc(d, e, c, 0,
											2 * Math.PI
											), a
										.closePath(), a
										.fill();
									break;
								case "triangle":
									a.beginPath(), g =
										3 * c / Math
										.sqrt(3), j =
										g * Math.sqrt(
										3) / 2, a
										.moveTo(d - g /
											2, e + j / 3
											), a.lineTo(
											d + g / 2,
											e + j / 3),
										a.lineTo(d, e -
											2 * j / 3),
										a.closePath(), a
										.fill();
									break;
								case "rect":
									k = 1 / Math.SQRT2 *
										c, a
									.beginPath(), a
										.fillRect(d - k,
											e - k, 2 *
											k, 2 * k), a
										.strokeRect(d -
											k, e - k,
											2 * k, 2 * k
											);
									break;
								case "rectRot":
									k = 1 / Math.SQRT2 *
										c, a
									.beginPath(), a
										.moveTo(d - k,
											e), a
										.lineTo(d, e +
											k), a
										.lineTo(d + k,
											e), a
										.lineTo(d, e -
											k), a
										.closePath(), a
										.fill();
									break;
								case "cross":
									a.beginPath(), a
										.moveTo(d, e +
											c), a
										.lineTo(d, e -
											c), a
										.moveTo(d - c,
											e), a
										.lineTo(d + c,
											e), a
										.closePath();
									break;
								case "crossRot":
									a.beginPath(), h =
										Math.cos(Math
											.PI / 4) *
										c, i = Math.sin(
											Math.PI / 4
											) * c, a
										.moveTo(d - h,
											e - i), a
										.lineTo(d + h,
											e + i), a
										.moveTo(d - h,
											e + i), a
										.lineTo(d + h,
											e - i), a
										.closePath();
									break;
								case "star":
									a.beginPath(), a
										.moveTo(d, e +
											c), a
										.lineTo(d, e -
											c), a
										.moveTo(d - c,
											e), a
										.lineTo(d + c,
											e), h = Math
										.cos(Math.PI /
											4) * c, i =
										Math.sin(Math
											.PI / 4) *
										c, a.moveTo(d -
											h, e - i), a
										.lineTo(d + h,
											e + i), a
										.moveTo(d - h,
											e + i), a
										.lineTo(d + h,
											e - i), a
										.closePath();
									break;
								case "line":
									a.beginPath(), a
										.moveTo(d - c,
											e), a
										.lineTo(d + c,
											e), a
										.closePath();
									break;
								case "dash":
									a.beginPath(), a
										.moveTo(d, e), a
										.lineTo(d + c,
											e), a
										.closePath()
							}
							a.stroke()
						}
					}
			}
		},
		{}],
		23: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				var b = a.helpers;
				a.types = {}, a.instances = {}, a
					.controllers = {}, a.Controller =
					function(c)
					{
						return this.chart = c, this
							.config = c.config, this
							.options = this.config
							.options = b.configMerge(a
								.defaults.global, a
								.defaults[this.config
									.type], this.config
								.options ||
								{}), this.id = b.uid(),
							Object.defineProperty(this,
								"data",
								{
									get: function()
									{
										return this
											.config
											.data
									}
								}), a.instances[this
							.id] = this, this.options
							.responsive && this.resize(!
								0), this.initialize(),
							this
					}, b.extend(a.Controller.prototype,
					{
						initialize: function()
						{
							var b = this;
							return a.plugins
								.notify(
									"beforeInit",
									[b]), b
								.bindEvents(), b
								.ensureScalesHaveIDs(),
								b
								.buildOrUpdateControllers(),
								b.buildScales(),
								b
							.updateLayout(), b
								.resetElements(),
								b.initToolTip(),
								b.update(), a
								.plugins.notify(
									"afterInit",
									[b]), b
						},
						clear: function()
						{
							return b.clear(this
									.chart),
								this
						},
						stop: function()
						{
							return a
								.animationService
								.cancelAnimation(
									this), this
						},
						resize: function(c)
						{
							var d = this,
								e = d.chart,
								f = e.canvas,
								g = b
								.getMaximumWidth(
									f),
								h = e
								.aspectRatio,
								i = d.options
								.maintainAspectRatio &&
								!1 === isNaN(
								h) && isFinite(
									h) && 0 !==
								h ? g / h : b
								.getMaximumHeight(
									f);
							if (e.width === g &&
								e.height === i)
								return d;
							f.width = e.width =
								g, f.height = e
								.height = i, b
								.retinaScale(e);
							var j = {
								width: g,
								height: i
							};
							return a.plugins
								.notify(
									"resize", [
										d, j
									]), d
								.options
								.onResize && d
								.options
								.onResize(d, j),
								c || (d.stop(),
									d.update(d
										.options
										.responsiveAnimationDuration
										)), d
						},
						ensureScalesHaveIDs: function()
						{
							var a = this
								.options,
								c = a.scales ||
								{},
								d = a.scale;
							b.each(c.xAxes,
								function(a,
									b)
								{
									a.id = a
										.id ||
										"x-axis-" +
										b
								}), b.each(c
								.yAxes,
								function(a,
									b)
								{
									a.id = a
										.id ||
										"y-axis-" +
										b
								}), d && (d
								.id = d
								.id ||
								"scale")
						},
						buildScales: function()
						{
							var c = this,
								d = c.options,
								e = c
								.scales = {},
								f = [];
							d.scales && (f = f
									.concat((d
											.scales
											.xAxes ||
											[])
										.map(
											function(
												a
												)
											{
												return {
													options: a,
													dtype: "category"
												}
											}),
										(d.scales
											.yAxes ||
											[])
										.map(
											function(
												a
												)
											{
												return {
													options: a,
													dtype: "linear"
												}
											}))
									), d
								.scale && f
								.push(
								{
									options: d
										.scale,
									dtype: "radialLinear",
									isDefault:
										!0
								}), b.each(f,
									function(d)
									{
										var f =
											d
											.options,
											g =
											b
											.getValueOrDefault(
												f
												.type,
												d
												.dtype
												),
											h =
											a
											.scaleService
											.getScaleConstructor(
												g
												);
										if (h)
										{
											var i =
												new h(
												{
													id: f
														.id,
													options: f,
													ctx: c
														.chart
														.ctx,
													chart: c
												});
											e[i.id] =
												i,
												d
												.isDefault &&
												(c.scale =
													i
													)
										}
									}), a
								.scaleService
								.addScalesToLayout(
									this)
						},
						updateLayout: function()
						{
							a.layoutService
								.update(this,
									this.chart
									.width, this
									.chart
									.height)
						},
						buildOrUpdateControllers: function()
						{
							var c = this,
								d = [],
								e = [];
							if (b.each(c.data
									.datasets,
									function(b,
										f)
									{
										var g =
											c
											.getDatasetMeta(
												f
												);
										g.type ||
											(g.type =
												b
												.type ||
												c
												.config
												.type
												),
											d
											.push(
												g
												.type
												),
											g
											.controller ?
											g
											.controller
											.updateIndex(
												f
												) :
											(g.controller =
												new a
												.controllers[
													g
													.type
													]
												(c,
													f),
												e
												.push(
													g
													.controller
													)
												)
									}, c), d
								.length > 1)
								for (var f =
									1; f < d
									.length; f++
									)
									if (d[f] !==
										d[f - 1]
										)
									{
										c.isCombo = !
											0;
										break
									} return e
						},
						resetElements: function()
						{
							var a = this;
							b.each(a.data
								.datasets,
								function(b,
									c)
								{
									a.getDatasetMeta(
											c
											)
										.controller
										.reset()
								}, a)
						},
						update: function(c, d)
						{
							var e = this;
							a.plugins.notify(
									"beforeUpdate",
									[e]), e
								.tooltip._data =
								e.data;
							var f = e
								.buildOrUpdateControllers();
							b.each(e.data
									.datasets,
									function(a,
										b)
									{
										e.getDatasetMeta(
												b
												)
											.controller
											.buildOrUpdateElements()
									}, e), a
								.layoutService
								.update(e, e
									.chart
									.width, e
									.chart
									.height), a
								.plugins.notify(
									"afterScaleUpdate",
									[e]), b
								.each(f,
									function(a)
									{
										a.reset()
									}), e
								.updateDatasets(),
								a.plugins
								.notify(
									"afterUpdate",
									[e]), e
								.render(c, d)
						},
						updateDatasets: function()
						{
							var b, c, d = this;
							if (a.plugins
								.notify(
									"beforeDatasetsUpdate",
									[d]))
							{
								for (b = 0, c =
									d.data
									.datasets
									.length; b <
									c; ++b) d
									.getDatasetMeta(
										b)
									.controller
									.update();
								a.plugins
									.notify(
										"afterDatasetsUpdate",
										[d])
							}
						},
						render: function(c, d)
						{
							var e = this;
							a.plugins.notify(
								"beforeRender",
								[e]);
							var f = e.options
								.animation;
							if (f && (void 0 !==
									c && 0 !==
									c ||
									void 0 ===
									c && 0 !== f
									.duration))
							{
								var g = new a
									.Animation;
								g.numSteps = (
										c || f
										.duration
										) /
									16.66, g
									.easing = f
									.easing, g
									.render =
									function(a,
										c)
									{
										var d =
											b
											.easingEffects[
												c
												.easing
												],
											e =
											c
											.currentStep /
											c
											.numSteps,
											f =
											d(
											e);
										a.draw(f,
											e,
											c
											.currentStep
											)
									}, g
									.onAnimationProgress =
									f
									.onProgress,
									g
									.onAnimationComplete =
									f
									.onComplete,
									a
									.animationService
									.addAnimation(
										e, g, c,
										d)
							}
							else e.draw(), f &&
								f.onComplete &&
								f.onComplete
								.call && f
								.onComplete
								.call(e);
							return e
						},
						draw: function(c)
						{
							var d = this,
								e = c || 1;
							d.clear(), a.plugins
								.notify(
									"beforeDraw",
									[d, e]), b
								.each(d.boxes,
									function(a)
									{
										a.draw(d
											.chartArea)
									}, d), d
								.scale && d
								.scale.draw(), a
								.plugins.notify(
									"beforeDatasetsDraw",
									[d, e]), b
								.each(d.data
									.datasets,
									function(a,
										b)
									{
										d.isDatasetVisible(
												b
												) &&
											d
											.getDatasetMeta(
												b
												)
											.controller
											.draw(
												c
												)
									}, d, !0), a
								.plugins.notify(
									"afterDatasetsDraw",
									[d, e]), d
								.tooltip
								.transition(e)
								.draw(), a
								.plugins.notify(
									"afterDraw",
									[d, e])
						},
						getElementAtEvent: function(
							a)
						{
							var c = this,
								d = b
								.getRelativePosition(
									a, c.chart),
								e = [];
							return b.each(c.data
								.datasets,
								function(a,
									f)
								{
									if (c
										.isDatasetVisible(
											f
											)
										)
									{
										var g =
											c
											.getDatasetMeta(
												f
												);
										b.each(g.data,
											function(
												a
												)
											{
												if (a
													.inRange(
														d
														.x,
														d
														.y
														)
													)
													return e
														.push(
															a
															),
														e
											}
											)
									}
								}), e.slice(
								0, 1)
						},
						getElementsAtEvent: function(
							a)
						{
							var c = this,
								d = b
								.getRelativePosition(
									a, c.chart),
								e = [],
								f = function()
								{
									if (c.data
										.datasets
										)
										for (var a =
												0; a <
											c
											.data
											.datasets
											.length; a++
											)
										{
											var b =
												c
												.getDatasetMeta(
													a
													);
											if (c
												.isDatasetVisible(
													a
													)
												)
												for (
													var e =
														0; e <
													b
													.data
													.length; e++
													)
													if (b
														.data[
															e
															]
														.inRange(
															d
															.x,
															d
															.y
															)
														)
														return b
															.data[
																e
																]
										}
								}.call(c);
							return f ? (b.each(c
									.data
									.datasets,
									function(
										a, b
										)
									{
										if (c
											.isDatasetVisible(
												b
												)
											)
										{
											var d =
												c
												.getDatasetMeta(
													b
													),
												g =
												d
												.data[
													f
													._index
													];
											g && !
												g
												._view
												.skip &&
												e
												.push(
													g
													)
										}
									}, c),
								e) : e
						},
						getElementsAtXAxis: function(
							a)
						{
							var c = this,
								d = b
								.getRelativePosition(
									a, c.chart),
								e = [],
								f = function()
								{
									if (c.data
										.datasets
										)
										for (var a =
												0; a <
											c
											.data
											.datasets
											.length; a++
											)
										{
											var b =
												c
												.getDatasetMeta(
													a
													);
											if (c
												.isDatasetVisible(
													a
													)
												)
												for (
													var e =
														0; e <
													b
													.data
													.length; e++
													)
													if (b
														.data[
															e
															]
														.inLabelRange(
															d
															.x,
															d
															.y
															)
														)
														return b
															.data[
																e
																]
										}
								}.call(c);
							return f ? (b.each(c
									.data
									.datasets,
									function(
										a, d
										)
									{
										if (c
											.isDatasetVisible(
												d
												)
											)
										{
											var g =
												c
												.getDatasetMeta(
													d
													),
												h =
												b
												.findIndex(
													g
													.data,
													function(
														a
														)
													{
														return f
															._model
															.x ===
															a
															._model
															.x
													}
													); -
											1 ===
												h ||
												g
												.data[
													h
													]
												._view
												.skip ||
												e
												.push(
													g
													.data[
														h
														]
													)
										}
									}, c),
								e) : e
						},
						getElementsAtEventForMode: function(
							a, b)
						{
							var c = this;
							switch (b)
							{
								case "single":
									return c
										.getElementAtEvent(
											a);
								case "label":
									return c
										.getElementsAtEvent(
											a);
								case "dataset":
									return c
										.getDatasetAtEvent(
											a);
								case "x-axis":
									return c
										.getElementsAtXAxis(
											a);
								default:
									return a
							}
						},
						getDatasetAtEvent: function(
							a)
						{
							var b = this
								.getElementAtEvent(
									a);
							return b.length >
								0 && (b = this
									.getDatasetMeta(
										b[0]
										._datasetIndex
										).data),
								b
						},
						getDatasetMeta: function(a)
						{
							var b = this,
								c = b.data
								.datasets[a];
							c._meta || (c
								._meta = {});
							var d = c._meta[b
								.id];
							return d || (d = c
								._meta[b
								.id] = {
									type: null,
									data: [],
									dataset: null,
									controller: null,
									hidden: null,
									xAxisID: null,
									yAxisID: null
								}), d
						},
						getVisibleDatasetCount: function()
						{
							for (var a = 0, b =
									0, c = this
									.data
									.datasets
									.length; b <
								c; ++b) this
								.isDatasetVisible(
									b) && a++;
							return a
						},
						isDatasetVisible: function(
							a)
						{
							var b = this
								.getDatasetMeta(
									a);
							return "boolean" ==
								typeof b
								.hidden ? !b
								.hidden : !this
								.data.datasets[
									a].hidden
						},
						generateLegend: function()
						{
							return this.options
								.legendCallback(
									this)
						},
						destroy: function()
						{
							var c = this;
							c.stop(), c.clear(),
								b.unbindEvents(
									c, c.events
									), b
								.removeResizeListener(
									c.chart
									.canvas
									.parentNode
									);
							var d = c.chart
								.canvas;
							d.width = c.chart
								.width, d
								.height = c
								.chart.height,
								void 0 !== c
								.chart
								.originalDevicePixelRatio &&
								c.chart.ctx
								.scale(1 / c
									.chart
									.originalDevicePixelRatio,
									1 / c.chart
									.originalDevicePixelRatio
									), d.style
								.width = c.chart
								.originalCanvasStyleWidth,
								d.style.height =
								c.chart
								.originalCanvasStyleHeight,
								a.plugins
								.notify(
									"destroy", [
										c
									]), delete a
								.instances[c.id]
						},
						toBase64Image: function()
						{
							return this.chart
								.canvas
								.toDataURL
								.apply(this
									.chart
									.canvas,
									arguments)
						},
						initToolTip: function()
						{
							var b = this;
							b.tooltip = new a
								.Tooltip(
								{
									_chart: b
										.chart,
									_chartInstance: b,
									_data: b
										.data,
									_options: b
										.options
										.tooltips
								}, b)
						},
						bindEvents: function()
						{
							var a = this;
							b.bindEvents(a, a
								.options
								.events,
								function(b)
								{
									a.eventHandler(
										b
										)
								})
						},
						updateHoverStyle: function(
							a, b, c)
						{
							var d, e, f, g = c ?
								"setHoverStyle" :
								"removeHoverStyle";
							switch (b)
							{
								case "single":
									a = [a[0]];
									break;
								case "label":
								case "dataset":
								case "x-axis":
									break;
								default:
									return
							}
							for (e = 0, f = a
								.length; e <
								f; ++e)(d = a[
									e]) && this
								.getDatasetMeta(
									d
									._datasetIndex
									)
								.controller[g](
									d)
						},
						eventHandler: function(a)
						{
							var c = this,
								d = c.tooltip,
								e = c.options ||
								{},
								f = e.hover,
								g = e.tooltips;
							return c
								.lastActive = c
								.lastActive ||
								[], c
								.lastTooltipActive =
								c
								.lastTooltipActive ||
								[],
								"mouseout" === a
								.type ? (c
									.active = [],
									c
									.tooltipActive = []
									) : (c
									.active = c
									.getElementsAtEventForMode(
										a, f
										.mode),
									c
									.tooltipActive =
									c
									.getElementsAtEventForMode(
										a, g
										.mode)),
								f.onHover && f
								.onHover.call(c,
									c.active),
								"mouseup" !== a
								.type &&
								"click" !== a
								.type || (e
									.onClick &&
									e.onClick
									.call(c, a,
										c.active
										), c
									.legend && c
									.legend
									.handleEvent &&
									c.legend
									.handleEvent(
										a)), c
								.lastActive
								.length && c
								.updateHoverStyle(
									c
									.lastActive,
									f.mode, !1),
								c.active
								.length && f
								.mode && c
								.updateHoverStyle(
									c.active, f
									.mode, !0),
								(g.enabled || g
									.custom) &&
								(d.initialize(),
									d._active =
									c
									.tooltipActive,
									d.update(!0)
									), d
							.pivot(), c
								.animating || b
								.arrayEquals(c
									.active, c
									.lastActive
									) && b
								.arrayEquals(c
									.tooltipActive,
									c
									.lastTooltipActive
									) || (c
									.stop(), (g
										.enabled ||
										g.custom
										) && d
									.update(!0),
									c.render(f
										.animationDuration,
										!0)), c
								.lastActive = c
								.active, c
								.lastTooltipActive =
								c.tooltipActive,
								c
						}
					})
			}
		},
		{}],
		24: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				var b = a.helpers,
					c = b.noop;
				a.DatasetController = function(a, b)
					{
						this.initialize.call(this, a, b)
					}, b.extend(a.DatasetController
						.prototype,
						{
							datasetElementType: null,
							dataElementType: null,
							initialize: function(a, b)
							{
								var c = this;
								c.chart = a, c
									.index = b, c
									.linkScales(), c
									.addElements()
							},
							updateIndex: function(a)
							{
								this.index = a
							},
							linkScales: function()
							{
								var a = this,
									b = a.getMeta(),
									c = a
									.getDataset();
								null === b
									.xAxisID && (b
										.xAxisID = c
										.xAxisID ||
										a.chart
										.options
										.scales
										.xAxes[0].id
										), null ===
									b.yAxisID && (b
										.yAxisID = c
										.yAxisID ||
										a.chart
										.options
										.scales
										.yAxes[0].id
										)
							},
							getDataset: function()
							{
								return this.chart
									.data.datasets[
										this.index]
							},
							getMeta: function()
							{
								return this.chart
									.getDatasetMeta(
										this.index)
							},
							getScaleForId: function(a)
							{
								return this.chart
									.scales[a]
							},
							reset: function()
							{
								this.update(!0)
							},
							createMetaDataset: function()
							{
								var a = this,
									b = a
									.datasetElementType;
								return b && new b(
								{
									_chart: a
										.chart
										.chart,
									_datasetIndex: a
										.index
								})
							},
							createMetaData: function(a)
							{
								var b = this,
									c = b
									.dataElementType;
								return c && new c(
								{
									_chart: b
										.chart
										.chart,
									_datasetIndex: b
										.index,
									_index: a
								})
							},
							addElements: function()
							{
								var a, b, c = this,
									d = c.getMeta(),
									e = c
									.getDataset()
									.data || [],
									f = d.data;
								for (a = 0, b = e
									.length; a <
									b; ++a) f[a] =
									f[a] || c
									.createMetaData(
										d, a);
								d.dataset = d
									.dataset || c
									.createMetaDataset()
							},
							addElementAndReset: function(
								a)
							{
								var b = this,
									c = b
									.createMetaData(
										a);
								b.getMeta().data
									.splice(a, 0,
									c), b
									.updateElement(
										c, a, !0)
							},
							buildOrUpdateElements: function()
							{
								var a = this
									.getMeta(),
									b = a.data,
									c = this
									.getDataset()
									.data.length,
									d = b.length;
								if (c < d) b.splice(
									c, d - c);
								else if (c > d)
									for (var e =
										d; e < c; ++
										e) this
										.addElementAndReset(
											e)
							},
							update: c,
							draw: function(a)
							{
								var c = a || 1;
								b.each(this
									.getMeta()
									.data,
									function(a)
									{
										a.transition(
												c
												)
											.draw()
									})
							},
							removeHoverStyle: function(
								a, c)
							{
								var d = this.chart
									.data.datasets[a
										._datasetIndex
										],
									e = a._index,
									f = a.custom ||
									{},
									g = b
									.getValueAtIndexOrDefault,
									h = a._model;
								h.backgroundColor =
									f
									.backgroundColor ?
									f
									.backgroundColor :
									g(d.backgroundColor,
										e, c
										.backgroundColor
										), h
									.borderColor = f
									.borderColor ? f
									.borderColor :
									g(d.borderColor,
										e, c
										.borderColor
										), h
									.borderWidth = f
									.borderWidth ? f
									.borderWidth :
									g(d.borderWidth,
										e, c
										.borderWidth
										)
							},
							setHoverStyle: function(a)
							{
								var c = this.chart
									.data.datasets[a
										._datasetIndex
										],
									d = a._index,
									e = a.custom ||
									{},
									f = b
									.getValueAtIndexOrDefault,
									g = b
									.getHoverColor,
									h = a._model;
								h.backgroundColor =
									e
									.hoverBackgroundColor ?
									e
									.hoverBackgroundColor :
									f(c.hoverBackgroundColor,
										d, g(h
											.backgroundColor
											)), h
									.borderColor = e
									.hoverBorderColor ?
									e
									.hoverBorderColor :
									f(c.hoverBorderColor,
										d, g(h
											.borderColor
											)), h
									.borderWidth = e
									.hoverBorderWidth ?
									e
									.hoverBorderWidth :
									f(c.hoverBorderWidth,
										d, h
										.borderWidth
										)
							}
						}), a.DatasetController.extend =
					b.inherits
			}
		},
		{}],
		25: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				var b = a.helpers;
				a.elements = {}, a.Element = function(a)
				{
					b.extend(this, a), this
						.initialize.apply(this,
							arguments)
				}, b.extend(a.Element.prototype,
				{
					initialize: function()
					{
						this.hidden = !1
					},
					pivot: function()
					{
						var a = this;
						return a._view || (a
								._view = b
								.clone(a
									._model)
								), a
							._start = b
							.clone(a._view),
							a
					},
					transition: function(a)
					{
						var c = this;
						return c._view || (c
								._view = b
								.clone(c
									._model)
								), 1 === a ?
							(c._view = c
								._model, c
								._start =
								null, c) : (
								c._start ||
								c.pivot(), b
								.each(c
									._model,
									function(
										d, e
										)
									{
										if ("_" ===
											e[
												0]
											)
										;
										else if (
											c
											._view
											.hasOwnProperty(
												e
												)
											)
											if (d ===
												c
												._view[
													e
													]
												)
											;
											else if (
											"string" ==
											typeof d
											)
											try
											{
												var f =
													b
													.color(
														c
														._model[
															e
															]
														)
													.mix(
														b
														.color(
															c
															._start[
																e
																]
															),
														a
														);
												c._view[
														e] =
													f
													.rgbString()
											}
										catch (
											a
											)
										{
											c._view[
													e] =
												d
										}
										else if (
											"number" ==
											typeof d
											)
										{
											var g =
												void 0 !==
												c
												._start[
													e
													] &&
												!
												1 ===
												isNaN(
													c
													._start[
														e
														]
													) ?
												c
												._start[
													e
													] :
												0;
											c._view[
													e] =
												(c._model[
														e
														] -
													g
													) *
												a +
												g
										}
										else c
											._view[
												e
												] =
											d;
										else "number" !=
											typeof d ||
											isNaN(
												c
												._view[
													e
													]
												) ?
											c
											._view[
												e
												] =
											d :
											c
											._view[
												e
												] =
											d *
											a
									}, c), c
								)
					},
					tooltipPosition: function()
					{
						return {
							x: this._model
								.x,
							y: this._model.y
						}
					},
					hasValue: function()
					{
						return b.isNumber(
								this._model
								.x) && b
							.isNumber(this
								._model.y)
					}
				}), a.Element.extend = b.inherits
			}
		},
		{}],
		26: [function(a, b, c)
		{
			"use strict";
			var d = a(2);
			b.exports = function(a)
			{
				function b(a, b, c)
				{
					var d;
					return "string" == typeof a ? (d =
							parseInt(a, 10), -1 != a
							.indexOf("%") && (d = d /
								100 * b.parentNode[c])
							) : d = a, d
				}

				function c(a)
				{
					return void 0 !== a && null !== a &&
						"none" !== a
				}

				function e(a, d, e)
				{
					var f = document.defaultView,
						g = a.parentNode,
						h = f.getComputedStyle(a)[d],
						i = f.getComputedStyle(g)[d],
						j = c(h),
						k = c(i),
						l = Number.POSITIVE_INFINITY;
					return j || k ? Math.min(j ? b(h, a,
							e) : l, k ? b(i, g, e) :
						l) : "none"
				}
				var f = a.helpers = {};
				f.each = function(a, b, c, d)
					{
						var e, g;
						if (f.isArray(a))
							if (g = a.length, d)
								for (e = g - 1; e >=
									0; e--) b.call(c, a[
									e], e);
							else
								for (e = 0; e < g; e++)
									b.call(c, a[e], e);
						else if ("object" == typeof a)
						{
							var h = Object.keys(a);
							for (g = h.length, e =
								0; e < g; e++) b.call(c,
								a[h[e]], h[e])
						}
					}, f.clone = function(a)
					{
						var b = {};
						return f.each(a, function(a, c)
						{
							f.isArray(a) ? b[
								c] = a.slice(
								0) : b[c] =
								"object" ==
								typeof a &&
								null !== a ? f
								.clone(a) : a
						}), b
					}, f.extend = function(a)
					{
						for (var b = function(b, c)
								{
									a[c] = b
								}, c = 1, d = arguments
								.length; c < d; c++) f
							.each(arguments[c], b);
						return a
					}, f.configMerge = function(b)
					{
						var c = f.clone(b);
						return f.each(Array.prototype
							.slice.call(arguments,
								1),
							function(b)
							{
								f.each(b, function(
									b, d)
								{
									if ("scales" ===
										d)
										c[
										d] =
										f
										.scaleMerge(
											c
											.hasOwnProperty(
												d
												) ?
											c[
												d] :
											{},
											b
											);
									else if (
										"scale" ===
										d)
										c[
										d] =
										f
										.configMerge(
											c
											.hasOwnProperty(
												d
												) ?
											c[
												d] :
											{},
											a
											.scaleService
											.getScaleDefaults(
												b
												.type
												),
											b
											);
									else if (
										c
										.hasOwnProperty(
											d
											) &&
										f
										.isArray(
											c[
												d]
											) &&
										f
										.isArray(
											b
											)
										)
									{
										var e =
											c[
												d];
										f.each(b,
											function(
												a,
												b
												)
											{
												b < e
													.length ?
													"object" ==
													typeof e[
														b
														] &&
													null !==
													e[
														b] &&
													"object" ==
													typeof a &&
													null !==
													a ?
													e[
														b] =
													f
													.configMerge(
														e[
															b],
														a
														) :
													e[
														b] =
													a :
													e
													.push(
														a
														)
											}
											)
									}
									else c
										.hasOwnProperty(
											d
											) &&
										"object" ==
										typeof c[
											d
											] &&
										null !==
										c[
										d] &&
										"object" ==
										typeof b ?
										c[
										d] =
										f
										.configMerge(
											c[
												d],
											b
											) :
										c[
										d] =
										b
								})
							}), c
					}, f.scaleMerge = function(b, c)
					{
						var d = f.clone(b);
						return f.each(c, function(b, c)
						{
							"xAxes" === c ||
								"yAxes" === c ?
								d
								.hasOwnProperty(
									c) ? f.each(
									b,
									function(b,
										e)
									{
										var g =
											f
											.getValueOrDefault(
												b
												.type,
												"xAxes" ===
												c ?
												"category" :
												"linear"
												),
											h =
											a
											.scaleService
											.getScaleDefaults(
												g
												);
										e >= d[
												c]
											.length ||
											!d[
												c]
											[e]
											.type ?
											d[c]
											.push(
												f
												.configMerge(
													h,
													b
													)
												) :
											b
											.type &&
											b
											.type !==
											d[c]
											[e]
											.type ?
											d[c]
											[
											e] =
											f
											.configMerge(
												d[
													c]
												[
													e],
												h,
												b
												) :
											d[c]
											[
											e] =
											f
											.configMerge(
												d[
													c]
												[
													e],
												b
												)
									}) : (d[
									c] = [], f
									.each(b,
										function(
											b)
										{
											var e =
												f
												.getValueOrDefault(
													b
													.type,
													"xAxes" ===
													c ?
													"category" :
													"linear"
													);
											d[c].push(
												f
												.configMerge(
													a
													.scaleService
													.getScaleDefaults(
														e
														),
													b
													)
												)
										})) : d
								.hasOwnProperty(
									c) &&
								"object" ==
								typeof d[c] &&
								null !== d[c] &&
								"object" ==
								typeof b ? d[
								c] = f
								.configMerge(d[
									c], b) : d[
									c] = b
						}), d
					}, f.getValueAtIndexOrDefault =
					function(a, b, c)
					{
						return void 0 === a || null ===
							a ? c : f.isArray(a) ? b < a
							.length ? a[b] : c : a
					}, f.getValueOrDefault = function(a,
						b)
					{
						return void 0 === a ? b : a
					}, f.indexOf = Array.prototype
					.indexOf ? function(a, b)
					{
						return a.indexOf(b)
					} : function(a, b)
					{
						for (var c = 0, d = a
							.length; c < d; ++c)
							if (a[c] === b) return c;
						return -1
					}, f.where = function(a, b)
					{
						if (f.isArray(a) && Array
							.prototype.filter) return a
							.filter(b);
						var c = [];
						return f.each(a, function(a)
						{
							b(a) && c.push(a)
						}), c
					}, f.findIndex = Array.prototype
					.findIndex ? function(a, b, c)
					{
						return a.findIndex(b, c)
					} : function(a, b, c)
					{
						c = void 0 === c ? a : c;
						for (var d = 0, e = a
							.length; d < e; ++d)
							if (b.call(c, a[d], d, a))
								return d;
						return -1
					}, f.findNextWhere = function(a, b,
						c)
					{
						void 0 !== c && null !== c || (
							c = -1);
						for (var d = c + 1; d < a
							.length; d++)
						{
							var e = a[d];
							if (b(e)) return e
						}
					}, f.findPreviousWhere = function(a,
						b, c)
					{
						void 0 !== c && null !== c || (
							c = a.length);
						for (var d = c - 1; d >= 0; d--)
						{
							var e = a[d];
							if (b(e)) return e
						}
					}, f.inherits = function(a)
					{
						var b = this,
							c = a && a.hasOwnProperty(
								"constructor") ? a
							.constructor : function()
							{
								return b.apply(this,
									arguments)
							},
							d = function()
							{
								this.constructor = c
							};
						return d.prototype = b
							.prototype, c.prototype =
							new d, c.extend = f
							.inherits, a && f.extend(c
								.prototype, a), c
							.__super__ = b.prototype, c
					}, f.noop = function() {}, f.uid =
					function()
					{
						var a = 0;
						return function()
						{
							return a++
						}
					}(), f.isNumber = function(a)
					{
						return !isNaN(parseFloat(a)) &&
							isFinite(a)
					}, f.almostEquals = function(a, b,
						c)
					{
						return Math.abs(a - b) < c
					}, f.max = function(a)
					{
						return a.reduce(function(a, b)
							{
								return isNaN(b) ?
									a : Math.max(a,
										b)
							}, Number
							.NEGATIVE_INFINITY)
					}, f.min = function(a)
					{
						return a.reduce(function(a, b)
							{
								return isNaN(b) ?
									a : Math.min(a,
										b)
							}, Number
							.POSITIVE_INFINITY)
					}, f.sign = Math.sign ? function(a)
					{
						return Math.sign(a)
					} : function(a)
					{
						return a = +a, 0 === a || isNaN(
							a) ? a : a > 0 ? 1 : -1
					}, f.log10 = Math.log10 ? function(
						a)
					{
						return Math.log10(a)
					} : function(a)
					{
						return Math.log(a) / Math.LN10
					}, f.toRadians = function(a)
					{
						return a * (Math.PI / 180)
					}, f.toDegrees = function(a)
					{
						return a * (180 / Math.PI)
					}, f.getAngleFromPoint = function(a,
						b)
					{
						var c = b.x - a.x,
							d = b.y - a.y,
							e = Math.sqrt(c * c + d *
							d),
							f = Math.atan2(d, c);
						return f < -.5 * Math.PI && (
							f += 2 * Math.PI),
						{
							angle: f,
							distance: e
						}
					}, f.aliasPixel = function(a)
					{
						return a % 2 == 0 ? 0 : .5
					}, f.splineCurve = function(a, b, c,
						d)
					{
						var e = a.skip ? b : a,
							f = b,
							g = c.skip ? b : c,
							h = Math.sqrt(Math.pow(f.x -
								e.x, 2) + Math.pow(f
								.y - e.y, 2)),
							i = Math.sqrt(Math.pow(g.x -
								f.x, 2) + Math.pow(g
								.y - f.y, 2)),
							j = h / (h + i),
							k = i / (h + i);
						j = isNaN(j) ? 0 : j, k = isNaN(
							k) ? 0 : k;
						var l = d * j,
							m = d * k;
						return {
							previous:
							{
								x: f.x - l * (g.x - e
									.x),
								y: f.y - l * (g.y - e.y)
							},
							next:
							{
								x: f.x + m * (g.x - e
									.x),
								y: f.y + m * (g.y - e.y)
							}
						}
					}, f.nextItem = function(a, b, c)
					{
						return c ? b >= a.length - 1 ?
							a[0] : a[b + 1] : b >= a
							.length - 1 ? a[a.length -
								1] : a[b + 1]
					}, f.previousItem = function(a, b,
						c)
					{
						return c ? b <= 0 ? a[a.length -
								1] : a[b - 1] : b <= 0 ?
							a[0] : a[b - 1]
					}, f.niceNum = function(a, b)
					{
						var c = Math.floor(f.log10(a)),
							d = a / Math.pow(10, c);
						return (b ? d < 1.5 ? 1 : d <
								3 ? 2 : d < 7 ? 5 : 10 :
								d <= 1 ? 1 : d <= 2 ?
								2 : d <= 5 ? 5 : 10) *
							Math.pow(10, c)
					};
				var g = f.easingEffects = {
					linear: function(a)
					{
						return a
					},
					easeInQuad: function(a)
					{
						return a * a
					},
					easeOutQuad: function(a)
					{
						return -1 * a * (a - 2)
					},
					easeInOutQuad: function(a)
					{
						return (a /= .5) < 1 ?
							.5 * a * a : -.5 * (
								--a * (a - 2) -
								1)
					},
					easeInCubic: function(a)
					{
						return a * a * a
					},
					easeOutCubic: function(a)
					{
						return 1 * ((a = a / 1 -
								1) * a * a +
							1)
					},
					easeInOutCubic: function(a)
					{
						return (a /= .5) < 1 ?
							.5 * a * a * a :
							.5 * ((a -= 2) * a *
								a + 2)
					},
					easeInQuart: function(a)
					{
						return a * a * a * a
					},
					easeOutQuart: function(a)
					{
						return -1 * ((a = a /
								1 - 1) * a *
							a * a - 1)
					},
					easeInOutQuart: function(a)
					{
						return (a /= .5) < 1 ?
							.5 * a * a * a * a :
							-.5 * ((a -= 2) *
								a * a * a - 2)
					},
					easeInQuint: function(a)
					{
						return 1 * (a /= 1) *
							a * a * a * a
					},
					easeOutQuint: function(a)
					{
						return 1 * ((a = a / 1 -
								1) * a * a *
							a * a + 1)
					},
					easeInOutQuint: function(a)
					{
						return (a /= .5) < 1 ?
							.5 * a * a * a * a *
							a : .5 * ((a -= 2) *
								a * a * a * a +
								2)
					},
					easeInSine: function(a)
					{
						return -1 * Math.cos(a /
							1 * (Math.PI /
								2)) + 1
					},
					easeOutSine: function(a)
					{
						return 1 * Math.sin(a /
							1 * (Math.PI /
								2))
					},
					easeInOutSine: function(a)
					{
						return -.5 * (Math.cos(
							Math.PI *
							a / 1) - 1)
					},
					easeInExpo: function(a)
					{
						return 0 === a ? 1 : 1 *
							Math.pow(2, 10 * (
								a / 1 - 1))
					},
					easeOutExpo: function(a)
					{
						return 1 === a ? 1 : 1 *
							(1 - Math.pow(2, -
								10 * a / 1))
					},
					easeInOutExpo: function(a)
					{
						return 0 === a ? 0 :
							1 === a ? 1 : (a /=
								.5) < 1 ? .5 *
							Math.pow(2, 10 * (
								a - 1)) : .5 * (
								2 - Math.pow(2,
									-10 * --a))
					},
					easeInCirc: function(a)
					{
						return a >= 1 ? a : -1 *
							(Math.sqrt(1 - (a /=
								1) * a) - 1)
					},
					easeOutCirc: function(a)
					{
						return 1 * Math.sqrt(1 -
							(a = a / 1 -
							1) * a)
					},
					easeInOutCirc: function(a)
					{
						return (a /= .5) < 1 ? -
							.5 * (Math.sqrt(1 -
								a * a) - 1) :
							.5 * (Math.sqrt(1 -
								(a -= 2) * a
								) + 1)
					},
					easeInElastic: function(a)
					{
						var b = 1.70158,
							c = 0,
							d = 1;
						return 0 === a ? 0 :
							1 == (a /= 1) ? 1 :
							(c || (c = .3), d <
								Math.abs(1) ? (
									d = 1, b =
									c / 4) : b =
								c / (2 * Math
									.PI) * Math
								.asin(1 / d), -
								d * Math.pow(2,
									10 * (a -=
										1)) *
								Math.sin((1 *
										a - b) *
									(2 * Math
										.PI) / c
									))
					},
					easeOutElastic: function(a)
					{
						var b = 1.70158,
							c = 0,
							d = 1;
						return 0 === a ? 0 :
							1 == (a /= 1) ? 1 :
							(c || (c = .3), d <
								Math.abs(1) ? (
									d = 1, b =
									c / 4) : b =
								c / (2 * Math
									.PI) * Math
								.asin(1 / d),
								d * Math.pow(2,
									-10 * a) *
								Math.sin((1 *
										a - b) *
									(2 * Math
										.PI) / c
									) + 1)
					},
					easeInOutElastic: function(a)
					{
						var b = 1.70158,
							c = 0,
							d = 1;
						return 0 === a ? 0 :
							2 == (a /= .5) ? 1 :
							(c || (c = .3 *
									1.5 * 1),
								d < Math.abs(
								1) ? (d = 1, b =
									c / 4) : b =
								c / (2 * Math
									.PI) * Math
								.asin(1 / d),
								a < 1 ? d * Math
								.pow(2, 10 * (
									a -= 1)) *
								Math.sin((1 *
										a - b) *
									(2 * Math
										.PI) / c
									) * -.5 :
								d * Math.pow(2,
									-10 * (a -=
										1)) *
								Math.sin((1 *
										a - b) *
									(2 * Math
										.PI) / c
									) * .5 + 1)
					},
					easeInBack: function(a)
					{
						var b = 1.70158;
						return 1 * (a /= 1) *
							a * ((b + 1) * a -
								b)
					},
					easeOutBack: function(a)
					{
						var b = 1.70158;
						return 1 * ((a = a / 1 -
							1) * a * ((
								b + 1) *
							a + b) + 1)
					},
					easeInOutBack: function(a)
					{
						var b = 1.70158;
						return (a /= .5) < 1 ?
							a * a * ((1 + (b *=
									1.525)) *
								a - b) * .5 :
							.5 * ((a -= 2) * a *
								((1 + (b *=
										1.525)) *
									a + b) + 2)
					},
					easeInBounce: function(a)
					{
						return 1 - g
							.easeOutBounce(1 -
								a)
					},
					easeOutBounce: function(a)
					{
						return (a /= 1) < 1 /
							2.75 ? 7.5625 * a *
							a * 1 : a < 2 /
							2.75 ? 1 * (7.5625 *
								(a -= 1.5 /
									2.75) * a +
								.75) : a < 2.5 /
							2.75 ? 1 * (7.5625 *
								(a -= 2.25 /
									2.75) * a +
								.9375) : 1 * (
								7.5625 * (a -=
									2.625 / 2.75
									) * a +
								.984375)
					},
					easeInOutBounce: function(a)
					{
						return a < .5 ? .5 * g
							.easeInBounce(2 *
							a) : .5 * g
							.easeOutBounce(2 *
								a - 1) + .5
					}
				};
				f.requestAnimFrame = function()
					{
						return window
							.requestAnimationFrame ||
							window
							.webkitRequestAnimationFrame ||
							window
							.mozRequestAnimationFrame ||
							window
							.oRequestAnimationFrame ||
							window
							.msRequestAnimationFrame ||
							function(a)
							{
								return window
									.setTimeout(a, 1e3 /
										60)
							}
					}(), f.cancelAnimFrame = function()
					{
						return window
							.cancelAnimationFrame ||
							window
							.webkitCancelAnimationFrame ||
							window
							.mozCancelAnimationFrame ||
							window
							.oCancelAnimationFrame ||
							window
							.msCancelAnimationFrame ||
							function(a)
							{
								return window
									.clearTimeout(a,
										1e3 / 60)
							}
					}(), f.getRelativePosition =
					function(a, b)
					{
						var c, d, e = a.originalEvent ||
							a,
							g = a.currentTarget || a
							.srcElement,
							h = g
							.getBoundingClientRect(),
							i = e.touches;
						i && i.length > 0 ? (c = i[0]
							.clientX, d = i[0]
							.clientY) : (c = e
							.clientX, d = e.clientY);
						var j = parseFloat(f.getStyle(g,
								"padding-left")),
							k = parseFloat(f.getStyle(g,
								"padding-top")),
							l = parseFloat(f.getStyle(g,
								"padding-right")),
							m = parseFloat(f.getStyle(g,
								"padding-bottom")),
							n = h.right - h.left - j -
							l,
							o = h.bottom - h.top - k -
							m;
						return c = Math.round((c - h
								.left - j) / n * g
							.width / b
							.currentDevicePixelRatio
							), d = Math.round((d - h
								.top - k) / o * g
							.height / b
							.currentDevicePixelRatio
							),
						{
							x: c,
							y: d
						}
					}, f.addEvent = function(a, b, c)
					{
						a.addEventListener ? a
							.addEventListener(b, c) : a
							.attachEvent ? a
							.attachEvent("on" + b, c) :
							a["on" + b] = c
					}, f.removeEvent = function(a, b, c)
					{
						a.removeEventListener ? a
							.removeEventListener(b, c, !
								1) : a.detachEvent ? a
							.detachEvent("on" + b, c) :
							a["on" + b] = f.noop
					}, f.bindEvents = function(a, b, c)
					{
						var d = a.events = a.events ||
						{};
						f.each(b, function(b)
						{
							d[b] = function()
							{
								c.apply(a,
									arguments
									)
							}, f.addEvent(a
								.chart
								.canvas, b,
								d[b])
						})
					}, f.unbindEvents = function(a, b)
					{
						var c = a.chart.canvas;
						f.each(b, function(a, b)
						{
							f.removeEvent(c, b,
								a)
						})
					}, f.getConstraintWidth = function(
						a)
					{
						return e(a, "max-width",
							"clientWidth")
					}, f.getConstraintHeight = function(
						a)
					{
						return e(a, "max-height",
							"clientHeight")
					}, f.getMaximumWidth = function(a)
					{
						var b = a.parentNode,
							c = parseInt(f.getStyle(b,
								"padding-left")) +
							parseInt(f.getStyle(b,
								"padding-right")),
							d = b.clientWidth - c,
							e = f.getConstraintWidth(a);
						return isNaN(e) ? d : Math.min(
							d, e)
					}, f.getMaximumHeight = function(a)
					{
						var b = a.parentNode,
							c = parseInt(f.getStyle(b,
								"padding-top")) +
							parseInt(f.getStyle(b,
								"padding-bottom")),
							d = b.clientHeight - c,
							e = f.getConstraintHeight(
							a);
						return isNaN(e) ? d : Math.min(
							d, e)
					}, f.getStyle = function(a, b)
					{
						return a.currentStyle ? a
							.currentStyle[b] : document
							.defaultView
							.getComputedStyle(a, null)
							.getPropertyValue(b)
					}, f.retinaScale = function(a)
					{
						var b = a.ctx,
							c = a.canvas,
							d = c.width,
							e = c.height,
							f = a
							.currentDevicePixelRatio =
							window.devicePixelRatio ||
							1;
						1 !== f && (c.height = e * f, c
								.width = d * f, b.scale(
									f, f), a
								.originalDevicePixelRatio =
								a
								.originalDevicePixelRatio ||
								f), c.style.width = d +
							"px", c.style.height = e +
							"px"
					}, f.clear = function(a)
					{
						a.ctx.clearRect(0, 0, a.width, a
							.height)
					}, f.fontString = function(a, b, c)
					{
						return b + " " + a + "px " + c
					}, f.longestText = function(a, b, c,
						d)
					{
						d = d ||
						{};
						var e = d.data = d.data ||
							{},
							g = d.garbageCollect = d
							.garbageCollect || [];
						d.font !== b && (e = d
							.data = {}, g = d
							.garbageCollect = [], d
							.font = b), a.font = b;
						var h = 0;
						f.each(c, function(b)
						{
							void 0 !== b &&
								null !== b && !
								0 !== f.isArray(
									b) ? h = f
								.measureText(a,
									e, g, h, b
									) : f
								.isArray(b) && f
								.each(b,
									function(b)
									{
										void 0
											===
											b ||
											null ===
											b ||
											f
											.isArray(
												b
												) ||
											(h = f
												.measureText(
													a,
													e,
													g,
													h,
													b
													)
												)
									})
						});
						var i = g.length / 2;
						if (i > c.length)
						{
							for (var j = 0; j < i; j++)
								delete e[g[j]];
							g.splice(0, i)
						}
						return h
					}, f.measureText = function(a, b, c,
						d, e)
					{
						var f = b[e];
						return f || (f = b[e] = a
							.measureText(e).width, c
							.push(e)), f > d && (d =
							f), d
					}, f.numberOfLabelLines = function(
						a)
					{
						var b = 1;
						return f.each(a, function(a)
						{
							f.isArray(a) && a
								.length > b && (
									b = a.length
									)
						}), b
					}, f.drawRoundedRectangle =
					function(a, b, c, d, e, f)
					{
						a.beginPath(), a.moveTo(b + f,
								c), a.lineTo(b + d - f,
								c), a.quadraticCurveTo(
								b + d, c, b + d, c + f),
							a.lineTo(b + d, c + e - f),
							a.quadraticCurveTo(b + d,
								c + e, b + d - f, c + e
								), a.lineTo(b + f, c +
								e), a.quadraticCurveTo(
								b, c + e, b, c + e - f),
							a.lineTo(b, c + f), a
							.quadraticCurveTo(b, c, b +
								f, c), a.closePath()
					}, f.color = function(b)
					{
						return d ? d(
							b instanceof CanvasGradient ?
							a.defaults.global
							.defaultColor : b) : (
							console.log(
								"Color.js not found!"
								), b)
					}, f.addResizeListener = function(a,
						b)
					{
						var c = document.createElement(
							"iframe");
						c.classlist ? c.classlist.add(
								"chartjs-hidden-iframe"
								) : c.setAttribute(
								"class",
								"chartjs-hidden-iframe"
								);
						var d = c.style;
						d.width = "100%", d.display =
							"block", d.border = 0, d
							.height = 0, d.margin = 0, d
							.position = "absolute", d
							.left = 0, d.right = 0, d
							.top = 0, d.bottom = 0, a
							.insertBefore(c, a
								.firstChild), (c
								.contentWindow || c)
							.onresize = function()
							{
								b && b()
							}
					}, f.removeResizeListener =
					function(a)
					{
						var b = a.querySelector(
							".chartjs-hidden-iframe"
							);
						b && b.parentNode.removeChild(b)
					}, f.isArray = Array.isArray ?
					function(a)
					{
						return Array.isArray(a)
					} : function(a)
					{
						return "[object Array]" ===
							Object.prototype.toString
							.call(a)
					}, f.arrayEquals = function(a, b)
					{
						var c, d, e, g;
						if (!a || !b || a.length != b
							.length) return !1;
						for (c = 0, d = a.length; c <
							d; ++c)
							if (e = a[c], g = b[c],
								e instanceof Array &&
								g instanceof Array)
							{
								if (!f.arrayEquals(e,
									g)) return !1
							}
						else if (e != g) return !1;
						return !0
					}, f.callCallback = function(a, b,
						c)
					{
						a && "function" == typeof a
							.call && a.apply(c, b)
					}, f.getHoverColor = function(a)
					{
						return a instanceof CanvasPattern ?
							a : f.color(a).saturate(.5)
							.darken(.1).rgbString()
					}
			}
		},
		{
			2: 2
		}],
		27: [function(a, b, c)
		{
			"use strict";
			b.exports = function()
			{
				var a = function(b, c)
				{
					var d = this,
						e = a.helpers;
					return d.config = c ||
						{
							data:
							{
								datasets: []
							}
						}, b.length && b[0]
						.getContext && (b = b[0]), b
						.getContext && (b = b
							.getContext("2d")), d
						.ctx = b, d.canvas = b
						.canvas, b.canvas.style
						.display = b.canvas.style
						.display || "block", d
						.width = b.canvas.width ||
						parseInt(e.getStyle(b
								.canvas, "width"),
							10) || e
						.getMaximumWidth(b.canvas),
						d.height = b.canvas
						.height || parseInt(e
							.getStyle(b.canvas,
								"height"), 10) || e
						.getMaximumHeight(b.canvas),
						d.aspectRatio = d.width / d
						.height, (isNaN(d
								.aspectRatio) || !
							1 === isFinite(d
								.aspectRatio)) && (d
							.aspectRatio =
							void 0 !== c
							.aspectRatio ? c
							.aspectRatio : 2), d
						.originalCanvasStyleWidth =
						b.canvas.style.width, d
						.originalCanvasStyleHeight =
						b.canvas.style.height, e
						.retinaScale(d), d
						.controller = new a
						.Controller(d), e
						.addResizeListener(b.canvas
							.parentNode,
							function()
							{
								d.controller && d
									.controller
									.config.options
									.responsive && d
									.controller
									.resize()
							}), d.controller ? d
						.controller : d
				};
				return a.defaults = {
					global:
					{
						responsive: !0,
						responsiveAnimationDuration: 0,
						maintainAspectRatio: !0,
						events: ["mousemove",
							"mouseout", "click",
							"touchstart",
							"touchmove"
						],
						hover:
						{
							onHover: null,
							mode: "single",
							animationDuration: 400
						},
						onClick: null,
						defaultColor: "rgba(0,0,0,0.1)",
						defaultFontColor: "#666",
						defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
						defaultFontSize: 12,
						defaultFontStyle: "normal",
						showLines: !0,
						elements:
						{},
						legendCallback: function(a)
						{
							var b = [];
							b.push('<ul class="' +
								a.id +
								'-legend">');
							for (var c = 0; c <
								a.data.datasets
								.length; c++) b
								.push(
									'<li><span style="background-color:' +
									a.data
									.datasets[c]
									.backgroundColor +
									'"></span>'
									), a.data
								.datasets[c]
								.label && b
								.push(a.data
									.datasets[c]
									.label), b
								.push("</li>");
							return b.push(
									"</ul>"), b
								.join("")
						}
					}
				}, a.Chart = a, a
			}
		},
		{}],
		28: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				var b = a.helpers;
				a.layoutService = {
					defaults:
					{},
					addBox: function(a, b)
					{
						a.boxes || (a
							.boxes = []), a
							.boxes.push(b)
					},
					removeBox: function(a, b)
					{
						a.boxes && a.boxes
							.splice(a.boxes
								.indexOf(b), 1)
					},
					update: function(a, c, d)
					{
						function e(a)
						{
							var b, c = a
								.isHorizontal();
							c ? (b = a.update(a
										.options
										.fullWidth ?
										o : u, t
										), v -=
									b.height) :
								(b = a.update(s,
										r), u -=
									b.width), w
								.push(
								{
									horizontal: c,
									minSize: b,
									box: a
								})
						}

						function f(a)
						{
							var c = b
								.findNextWhere(
									w,
									function(b)
									{
										return b
											.box ===
											a
									});
							if (c)
								if (a
									.isHorizontal()
									)
								{
									var d = {
										left: x,
										right: y,
										top: 0,
										bottom: 0
									};
									a.update(a
										.options
										.fullWidth ?
										o :
										u,
										p /
										2, d
										)
								}
							else a.update(c
								.minSize
								.width, v)
						}

						function g(a)
						{
							var c = b
								.findNextWhere(
									w,
									function(b)
									{
										return b
											.box ===
											a
									}),
								d = {
									left: 0,
									right: 0,
									top: z,
									bottom: A
								};
							c && a.update(c
								.minSize
								.width, v, d
								)
						}

						function h(a)
						{
							a.isHorizontal() ? (
									a.left = a
									.options
									.fullWidth ?
									i : x, a
									.right = a
									.options
									.fullWidth ?
									c - i : x +
									u, a.top =
									E, a
									.bottom =
									E + a
									.height, E =
									a.bottom) :
								(a.left = D, a
									.right = D +
									a.width, a
									.top = z, a
									.bottom =
									z + v, D = a
									.right)
						}
						if (a)
						{
							var i = 0,
								j = b.where(a
									.boxes,
									function(a)
									{
										return "left" ===
											a
											.options
											.position
									}),
								k = b.where(a
									.boxes,
									function(a)
									{
										return "right" ===
											a
											.options
											.position
									}),
								l = b.where(a
									.boxes,
									function(a)
									{
										return "top" ===
											a
											.options
											.position
									}),
								m = b.where(a
									.boxes,
									function(a)
									{
										return "bottom" ===
											a
											.options
											.position
									}),
								n = b.where(a
									.boxes,
									function(a)
									{
										return "chartArea" ===
											a
											.options
											.position
									});
							l.sort(function(a,
								b)
							{
								return (b
										.options
										.fullWidth ?
										1 :
										0
										) -
									(a.options
										.fullWidth ?
										1 :
										0
										)
							}), m.sort(
								function(a,
									b)
								{
									return (a
											.options
											.fullWidth ?
											1 :
											0
											) -
										(b.options
											.fullWidth ?
											1 :
											0
											)
								});
							var o = c - 2 * i,
								p = d - 0,
								q = o / 2,
								r = p / 2,
								s = (c - q) / (j
									.length + k
									.length),
								t = (d - r) / (l
									.length + m
									.length),
								u = o,
								v = p,
								w = [];
							b.each(j.concat(k,
									l, m),
								e);
							var x = i,
								y = i,
								z = 0,
								A = 0;
							b.each(j.concat(k),
									f), b.each(
									j,
									function(a)
									{
										x += a
											.width
									}), b.each(
									k,
									function(a)
									{
										y += a
											.width
									}), b.each(l
									.concat(m),
									f), b.each(
									l,
									function(a)
									{
										z += a
											.height
									}), b.each(
									m,
									function(a)
									{
										A += a
											.height
									}), b.each(j
									.concat(k),
									g), x = i,
								y = i, z = 0,
								A = 0, b.each(j,
									function(a)
									{
										x += a
											.width
									}), b.each(
									k,
									function(a)
									{
										y += a
											.width
									}), b.each(
									l,
									function(a)
									{
										z += a
											.height
									}), b.each(
									m,
									function(a)
									{
										A += a
											.height
									});
							var B = d - z - A,
								C = c - x - y;
							C === u && B ===
								v || (b.each(j,
										function(
											a)
										{
											a.height =
												B
										}), b
									.each(k,
										function(
											a)
										{
											a.height =
												B
										}), b
									.each(l,
										function(
											a)
										{
											a.options
												.fullWidth ||
												(a.width =
													C
													)
										}), b
									.each(m,
										function(
											a)
										{
											a.options
												.fullWidth ||
												(a.width =
													C
													)
										}), v =
									B, u = C);
							var D = i,
								E = 0;
							b.each(j.concat(l),
									h), D += u,
								E += v, b.each(
									k, h), b
								.each(m, h), a
								.chartArea = {
									left: x,
									top: z,
									right: x +
										u,
									bottom: z +
										v
								}, b.each(n,
									function(b)
									{
										b.left =
											a
											.chartArea
											.left,
											b
											.top =
											a
											.chartArea
											.top,
											b
											.right =
											a
											.chartArea
											.right,
											b
											.bottom =
											a
											.chartArea
											.bottom,
											b
											.update(
												u,
												v
												)
									})
						}
					}
				}
			}
		},
		{}],
		29: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				var b = a.helpers,
					c = b.noop;
				a.defaults.global.legend = {
					display: !0,
					position: "top",
					fullWidth: !0,
					reverse: !1,
					onClick: function(a, b)
					{
						var c = b.datasetIndex,
							d = this.chart,
							e = d
							.getDatasetMeta(c);
						e.hidden = null === e
							.hidden ? !d.data
							.datasets[c]
							.hidden : null, d
							.update()
					},
					labels:
					{
						boxWidth: 40,
						padding: 10,
						generateLabels: function(a)
						{
							var c = a.data;
							return b.isArray(c
									.datasets) ?
								c.datasets.map(
									function(c,
										d)
									{
										return {
											text: c
												.label,
											fillStyle: b
												.isArray(
													c
													.backgroundColor
													) ?
												c
												.backgroundColor[
													0
													] :
												c
												.backgroundColor,
											hidden:
												!
												a
												.isDatasetVisible(
													d
													),
											lineCap: c
												.borderCapStyle,
											lineDash: c
												.borderDash,
											lineDashOffset: c
												.borderDashOffset,
											lineJoin: c
												.borderJoinStyle,
											lineWidth: c
												.borderWidth,
											strokeStyle: c
												.borderColor,
											pointStyle: c
												.pointStyle,
											datasetIndex: d
										}
									}, this) :
								[]
						}
					}
				}, a.Legend = a.Element.extend(
				{
					initialize: function(a)
					{
						b.extend(this, a),
							this
							.legendHitBoxes = [],
							this
							.doughnutMode = !
							1
					},
					beforeUpdate: c,
					update: function(a, b, c)
					{
						var d = this;
						return d
							.beforeUpdate(),
							d.maxWidth = a,
							d.maxHeight = b,
							d.margins = c, d
							.beforeSetDimensions(),
							d
							.setDimensions(),
							d
							.afterSetDimensions(),
							d
							.beforeBuildLabels(),
							d.buildLabels(),
							d
							.afterBuildLabels(),
							d.beforeFit(), d
							.fit(), d
							.afterFit(), d
							.afterUpdate(),
							d.minSize
					},
					afterUpdate: c,
					beforeSetDimensions: c,
					setDimensions: function()
					{
						var a = this;
						a.isHorizontal() ? (
								a.width = a
								.maxWidth, a
								.left = 0, a
								.right = a
								.width) : (a
								.height = a
								.maxHeight,
								a.top = 0, a
								.bottom = a
								.height), a
							.paddingLeft =
							0, a
							.paddingTop = 0,
							a.paddingRight =
							0, a
							.paddingBottom =
							0, a.minSize = {
								width: 0,
								height: 0
							}
					},
					afterSetDimensions: c,
					beforeBuildLabels: c,
					buildLabels: function()
					{
						var a = this;
						a.legendItems = a
							.options.labels
							.generateLabels
							.call(a, a
								.chart), a
							.options
							.reverse && a
							.legendItems
							.reverse()
					},
					afterBuildLabels: c,
					beforeFit: c,
					fit: function()
					{
						var c = this,
							d = c.options,
							e = d.labels,
							f = d.display,
							g = c.ctx,
							h = a.defaults
							.global,
							i = b
							.getValueOrDefault,
							j = i(e
								.fontSize, h
								.defaultFontSize
								),
							k = i(e
								.fontStyle,
								h
								.defaultFontStyle
								),
							l = i(e
								.fontFamily,
								h
								.defaultFontFamily
								),
							m = b
							.fontString(j,
								k, l),
							n = c
							.legendHitBoxes = [],
							o = c.minSize,
							p = c
							.isHorizontal();
						if (p ? (o.width = c
								.maxWidth, o
								.height =
								f ? 10 : 0
								) : (o
								.width = f ?
								10 : 0, o
								.height = c
								.maxHeight),
							f)
							if (g.font = m,
								p)
							{
								var q = c
									.lineWidths = [
										0
									],
									r = c
									.legendItems
									.length ?
									j + e
									.padding :
									0;
								g.textAlign =
									"left",
									g
									.textBaseline =
									"top", b
									.each(c
										.legendItems,
										function(
											a,
											b
											)
										{
											var d =
												e
												.usePointStyle ?
												j *
												Math
												.sqrt(
													2
													) :
												e
												.boxWidth,
												f =
												d +
												j /
												2 +
												g
												.measureText(
													a
													.text
													)
												.width;
											q[q.length -
													1
													] +
												f +
												e
												.padding >=
												c
												.width &&
												(r +=
													j +
													e
													.padding,
													q[q
														.length] =
													c
													.left
													),
												n[
													b] = {
													left: 0,
													top: 0,
													width: f,
													height: j
												},
												q[q.length -
													1
													] +=
												f +
												e
												.padding
										}),
									o
									.height +=
									r
							}
						else
						{
							var s = e
								.padding,
								t = c
								.columnWidths = [],
								u = e
								.padding,
								v = 0,
								w = 0,
								x = j + s;
							b.each(c.legendItems,
									function(
										a, b
										)
									{
										var c =
											e
											.usePointStyle ?
											2 *
											e
											.boxWidth :
											e
											.boxWidth,
											d =
											c +
											j /
											2 +
											g
											.measureText(
												a
												.text
												)
											.width;
										w + x >
											o
											.height &&
											(u +=
												v +
												e
												.padding,
												t
												.push(
													v
													),
												v =
												0,
												w =
												0
												),
											v =
											Math
											.max(
												v,
												d
												),
											w +=
											x,
											n[
												b] = {
												left: 0,
												top: 0,
												width: d,
												height: j
											}
									}), u +=
								v, t.push(
								v), o
								.width += u
						}
						c.width = o.width, c
							.height = o
							.height
					},
					afterFit: c,
					isHorizontal: function()
					{
						return "top" ===
							this.options
							.position ||
							"bottom" ===
							this.options
							.position
					},
					draw: function()
					{
						var c = this,
							d = c.options,
							e = d.labels,
							f = a.defaults
							.global,
							g = f.elements
							.line,
							h = c.width,
							i = c
							.lineWidths;
						if (d.display)
						{
							var j, k = c
								.ctx,
								l = b
								.getValueOrDefault,
								m = l(e
									.fontColor,
									f
									.defaultFontColor
									),
								n = l(e
									.fontSize,
									f
									.defaultFontSize
									),
								o = l(e
									.fontStyle,
									f
									.defaultFontStyle
									),
								p = l(e
									.fontFamily,
									f
									.defaultFontFamily
									),
								q = b
								.fontString(
									n, o, p
									);
							k.textAlign =
								"left", k
								.textBaseline =
								"top", k
								.lineWidth =
								.5, k
								.strokeStyle =
								m, k
								.fillStyle =
								m, k.font =
								q;
							var r = e
								.boxWidth,
								s = c
								.legendHitBoxes,
								t =
								function(b,
									c, e)
								{
									if (!(isNaN(
												r) ||
											r <=
											0
											))
									{
										if (k
											.save(),
											k
											.fillStyle =
											l(e.fillStyle,
												f
												.defaultColor
												),
											k
											.lineCap =
											l(e.lineCap,
												g
												.borderCapStyle
												),
											k
											.lineDashOffset =
											l(e.lineDashOffset,
												g
												.borderDashOffset
												),
											k
											.lineJoin =
											l(e.lineJoin,
												g
												.borderJoinStyle
												),
											k
											.lineWidth =
											l(e.lineWidth,
												g
												.borderWidth
												),
											k
											.strokeStyle =
											l(e.strokeStyle,
												f
												.defaultColor
												),
											k
											.setLineDash &&
											k
											.setLineDash(
												l(e.lineDash,
													g
													.borderDash
													)
												),
											d
											.labels &&
											d
											.labels
											.usePointStyle
											)
										{
											var h =
												n *
												Math
												.SQRT2 /
												2,
												i =
												h /
												Math
												.SQRT2,
												j =
												b +
												i,
												m =
												c +
												i;
											a.canvasHelpers
												.drawPoint(
													k,
													e
													.pointStyle,
													h,
													j,
													m
													)
										}
										else k
											.strokeRect(
												b,
												c,
												r,
												n
												),
											k
											.fillRect(
												b,
												c,
												r,
												n
												);
										k.restore()
									}
								},
								u =
								function(a,
									b, c, d)
								{
									k.fillText(
											c
											.text,
											r +
											n /
											2 +
											a,
											b
											),
										c
										.hidden &&
										(k.beginPath(),
											k
											.lineWidth =
											2,
											k
											.moveTo(
												r +
												n /
												2 +
												a,
												b +
												n /
												2
												),
											k
											.lineTo(
												r +
												n /
												2 +
												a +
												d,
												b +
												n /
												2
												),
											k
											.stroke()
											)
								},
								v = c
								.isHorizontal();
							j = v ?
							{
								x: c.left +
									(h - i[
										0]) /
									2,
								y: c.top +
									e
									.padding,
								line: 0
							} :
							{
								x: c.left +
									e
									.padding,
								y: c.top +
									e
									.padding,
								line: 0
							};
							var w = n + e
								.padding;
							b.each(c.legendItems,
								function(
									a, b
									)
								{
									var d =
										k
										.measureText(
											a
											.text
											)
										.width,
										f =
										e
										.usePointStyle ?
										n +
										n /
										2 +
										d :
										r +
										n /
										2 +
										d,
										g =
										j
										.x,
										l =
										j
										.y;
									v ? g +
										f >=
										h &&
										(l = j
											.y +=
											w,
											j
											.line++,
											g =
											j
											.x =
											c
											.left +
											(h - i[j
												.line]) /
											2
											) :
										l +
										w >
										c
										.bottom &&
										(g = j
											.x =
											g +
											c
											.columnWidths[
												j
												.line
												] +
											e
											.padding,
											l =
											j
											.y =
											c
											.top,
											j
											.line++
											),
										t(g, l,
											a
											),
										s[
											b]
										.left =
										g,
										s[
											b]
										.top =
										l,
										u(g, l,
											a,
											d
											),
										v ?
										j
										.x +=
										f +
										e
										.padding :
										j
										.y +=
										w
								})
						}
					},
					handleEvent: function(a)
					{
						var c = this,
							d = b
							.getRelativePosition(
								a, c.chart
								.chart),
							e = d.x,
							f = d.y,
							g = c.options;
						if (e >= c.left &&
							e <= c.right &&
							f >= c.top &&
							f <= c.bottom)
							for (var h = c
									.legendHitBoxes,
									i =
									0; i < h
								.length; ++i
								)
							{
								var j = h[
								i];
								if (e >= j
									.left &&
									e <= j
									.left +
									j
									.width &&
									f >= j
									.top &&
									f <= j
									.top + j
									.height)
								{
									g.onClick &&
										g
										.onClick
										.call(
											c,
											a,
											c
											.legendItems[
												i
												]
											);
									break
								}
							}
					}
				}), a.plugins.register(
				{
					beforeInit: function(b)
					{
						var c = b.options,
							d = c.legend;
						d && (b.legend =
							new a
							.Legend(
							{
								ctx: b
									.chart
									.ctx,
								options: d,
								chart: b
							}), a
							.layoutService
							.addBox(b, b
								.legend)
							)
					}
				})
			}
		},
		{}],
		30: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				var b = a.helpers.noop;
				a.plugins = {
					_plugins: [],
					register: function(a)
					{
						var b = this._plugins;
						[].concat(a).forEach(
							function(a)
							{
								-1 === b
									.indexOf(
										a
										) &&
									b.push(
										a)
							})
					},
					unregister: function(a)
					{
						var b = this._plugins;
						[].concat(a).forEach(
							function(a)
							{
								var c = b
									.indexOf(
										a
										); -
								1 !== c && b
									.splice(
										c, 1
										)
							})
					},
					clear: function()
					{
						this._plugins = []
					},
					count: function()
					{
						return this._plugins
							.length
					},
					getAll: function()
					{
						return this._plugins
					},
					notify: function(a, b)
					{
						var c, d, e = this
							._plugins,
							f = e.length;
						for (c = 0; c < f; ++c)
							if (d = e[c],
								"function" ==
								typeof d[a] && !
								1 === d[a]
								.apply(d, b ||
								[])) return !1;
						return !0
					}
				}, a.PluginBase = a.Element.extend(
				{
					beforeInit: b,
					afterInit: b,
					beforeUpdate: b,
					afterUpdate: b,
					beforeDraw: b,
					afterDraw: b,
					destroy: b
				}), a.pluginService = a.plugins
			}
		},
		{}],
		31: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				var b = a.helpers;
				a.defaults.scale = {
					display: !0,
					position: "left",
					gridLines:
					{
						display: !0,
						color: "rgba(0, 0, 0, 0.1)",
						lineWidth: 1,
						drawBorder: !0,
						drawOnChartArea: !0,
						drawTicks: !0,
						tickMarkLength: 10,
						zeroLineWidth: 1,
						zeroLineColor: "rgba(0,0,0,0.25)",
						offsetGridLines: !1
					},
					scaleLabel:
					{
						labelString: "",
						display: !1
					},
					ticks:
					{
						beginAtZero: !1,
						minRotation: 0,
						maxRotation: 50,
						mirror: !1,
						padding: 10,
						reverse: !1,
						display: !0,
						autoSkip: !0,
						autoSkipPadding: 0,
						labelOffset: 0,
						callback: function(a)
						{
							return b.isArray(
								a) ? a : "" + a
						}
					}
				}, a.Scale = a.Element.extend(
				{
					beforeUpdate: function()
					{
						b.callCallback(this
							.options
							.beforeUpdate,
							[this])
					},
					update: function(a, c, d)
					{
						var e = this;
						return e
							.beforeUpdate(),
							e.maxWidth = a,
							e.maxHeight = c,
							e.margins = b
							.extend(
							{
								left: 0,
								right: 0,
								top: 0,
								bottom: 0
							}, d), e
							.beforeSetDimensions(),
							e
							.setDimensions(),
							e
							.afterSetDimensions(),
							e
							.beforeDataLimits(),
							e
							.determineDataLimits(),
							e
							.afterDataLimits(),
							e
							.beforeBuildTicks(),
							e.buildTicks(),
							e
							.afterBuildTicks(),
							e
							.beforeTickToLabelConversion(),
							e
							.convertTicksToLabels(),
							e
							.afterTickToLabelConversion(),
							e
							.beforeCalculateTickRotation(),
							e
							.calculateTickRotation(),
							e
							.afterCalculateTickRotation(),
							e.beforeFit(), e
							.fit(), e
							.afterFit(), e
							.afterUpdate(),
							e.minSize
					},
					afterUpdate: function()
					{
						b.callCallback(this
							.options
							.afterUpdate,
							[this])
					},
					beforeSetDimensions: function()
					{
						b.callCallback(this
							.options
							.beforeSetDimensions,
							[this])
					},
					setDimensions: function()
					{
						var a = this;
						a.isHorizontal() ? (
								a.width = a
								.maxWidth, a
								.left = 0, a
								.right = a
								.width) : (a
								.height = a
								.maxHeight,
								a.top = 0, a
								.bottom = a
								.height), a
							.paddingLeft =
							0, a
							.paddingTop = 0,
							a.paddingRight =
							0, a
							.paddingBottom =
							0
					},
					afterSetDimensions: function()
					{
						b.callCallback(this
							.options
							.afterSetDimensions,
							[this])
					},
					beforeDataLimits: function()
					{
						b.callCallback(this
							.options
							.beforeDataLimits,
							[this])
					},
					determineDataLimits: b.noop,
					afterDataLimits: function()
					{
						b.callCallback(this
							.options
							.afterDataLimits,
							[this])
					},
					beforeBuildTicks: function()
					{
						b.callCallback(this
							.options
							.beforeBuildTicks,
							[this])
					},
					buildTicks: b.noop,
					afterBuildTicks: function()
					{
						b.callCallback(this
							.options
							.afterBuildTicks,
							[this])
					},
					beforeTickToLabelConversion: function()
					{
						b.callCallback(this
							.options
							.beforeTickToLabelConversion,
							[this])
					},
					convertTicksToLabels: function()
					{
						var a = this;
						a.ticks = a.ticks
							.map(function(b,
								c, d)
							{
								return a
									.options
									.ticks
									.userCallback ?
									a
									.options
									.ticks
									.userCallback(
										b,
										c,
										d
										) :
									a
									.options
									.ticks
									.callback(
										b,
										c,
										d
										)
							}, a)
					},
					afterTickToLabelConversion: function()
					{
						b.callCallback(this
							.options
							.afterTickToLabelConversion,
							[this])
					},
					beforeCalculateTickRotation: function()
					{
						b.callCallback(this
							.options
							.beforeCalculateTickRotation,
							[this])
					},
					calculateTickRotation: function()
					{
						var c = this,
							d = c.ctx,
							e = a.defaults
							.global,
							f = c.options
							.ticks,
							g = b
							.getValueOrDefault(
								f.fontSize,
								e
								.defaultFontSize
								),
							h = b
							.getValueOrDefault(
								f.fontStyle,
								e
								.defaultFontStyle
								),
							i = b
							.getValueOrDefault(
								f
								.fontFamily,
								e
								.defaultFontFamily
								),
							j = b
							.fontString(g,
								h, i);
						d.font = j;
						var k, l = d
							.measureText(c
								.ticks[0])
							.width,
							m = d
							.measureText(c
								.ticks[c
									.ticks
									.length -
									1])
							.width;
						if (c
							.labelRotation =
							f.minRotation ||
							0, c
							.paddingRight =
							0, c
							.paddingLeft =
							0, c.options
							.display && c
							.isHorizontal())
						{
							c.paddingRight =
								m / 2 + 3, c
								.paddingLeft =
								l / 2 + 3, c
								.longestTextCache ||
								(c
									.longestTextCache = {});
							for (var n, o,
									p = b
									.longestText(
										d,
										j, c
										.ticks,
										c
										.longestTextCache
										),
									q = p,
									r = c
									.getPixelForTick(
										1) -
									c
									.getPixelForTick(
										0) -
									6; q >
								r && c
								.labelRotation <
								f
								.maxRotation;
								)
							{
								if (n = Math
									.cos(b
										.toRadians(
											c
											.labelRotation
											)
										),
									o = Math
									.sin(b
										.toRadians(
											c
											.labelRotation
											)
										),
									k = n *
									l, k +
									g / 2 >
									c
									.yLabelWidth &&
									(c.paddingLeft =
										k +
										g /
										2),
									c
									.paddingRight =
									g / 2,
									o * p >
									c
									.maxHeight
									)
								{
									c
									.labelRotation--;
									break
								}
								c.labelRotation++,
									q = n *
									p
							}
						}
						c.margins && (c
							.paddingLeft =
							Math.max(c
								.paddingLeft -
								c
								.margins
								.left, 0
								), c
							.paddingRight =
							Math.max(c
								.paddingRight -
								c
								.margins
								.right,
								0))
					},
					afterCalculateTickRotation: function()
					{
						b.callCallback(this
							.options
							.afterCalculateTickRotation,
							[this])
					},
					beforeFit: function()
					{
						b.callCallback(this
							.options
							.beforeFit,
							[this])
					},
					fit: function()
					{
						var c = this,
							d = c
							.minSize = {
								width: 0,
								height: 0
							},
							e = c.options,
							f = a.defaults
							.global,
							g = e.ticks,
							h = e
							.scaleLabel,
							i = e.display,
							j = c
							.isHorizontal(),
							k = b
							.getValueOrDefault(
								g.fontSize,
								f
								.defaultFontSize
								),
							l = b
							.getValueOrDefault(
								g.fontStyle,
								f
								.defaultFontStyle
								),
							m = b
							.getValueOrDefault(
								g
								.fontFamily,
								f
								.defaultFontFamily
								),
							n = b
							.fontString(k,
								l, m),
							o = b
							.getValueOrDefault(
								h.fontSize,
								f
								.defaultFontSize
								),
							p = e.gridLines
							.tickMarkLength;
						if (d.width = j ? c
							.isFullWidth() ?
							c.maxWidth - c
							.margins.left -
							c.margins
							.right : c
							.maxWidth : i ?
							p : 0, d
							.height = j ?
							i ? p : 0 : c
							.maxHeight, h
							.display && i &&
							(j ? d.height +=
								1.5 * o : d
								.width +=
								1.5 * o), g
							.display && i)
						{
							c.longestTextCache ||
								(c
									.longestTextCache = {});
							var q = b
								.longestText(
									c.ctx,
									n, c
									.ticks,
									c
									.longestTextCache
									),
								r = b
								.numberOfLabelLines(
									c.ticks
									),
								s = .5 * k;
							if (j)
							{
								c.longestLabelWidth =
									q;
								var t = Math
									.sin(b
										.toRadians(
											c
											.labelRotation
											)
										) *
									c
									.longestLabelWidth +
									k * r +
									s * r;
								d.height =
									Math
									.min(c
										.maxHeight,
										d
										.height +
										t),
									c.ctx
									.font =
									n;
								var u = c
									.ctx
									.measureText(
										c
										.ticks[
											0
											]
										)
									.width,
									v = c
									.ctx
									.measureText(
										c
										.ticks[
											c
											.ticks
											.length -
											1
											]
										)
									.width,
									w = Math
									.cos(b
										.toRadians(
											c
											.labelRotation
											)
										),
									x = Math
									.sin(b
										.toRadians(
											c
											.labelRotation
											)
										);
								c.paddingLeft =
									0 !== c
									.labelRotation ?
									w * u +
									3 : u /
									2 + 3, c
									.paddingRight =
									0 !== c
									.labelRotation ?
									x * (k /
										2) +
									3 : v /
									2 + 3
							}
							else
							{
								var y = c
									.maxWidth -
									d.width;
								g.mirror ?
									q = 0 :
									q += c
									.options
									.ticks
									.padding,
									q < y ?
									d
									.width +=
									q : d
									.width =
									c
									.maxWidth,
									c
									.paddingTop =
									k / 2, c
									.paddingBottom =
									k / 2
							}
						}
						c.margins && (c
								.paddingLeft =
								Math.max(c
									.paddingLeft -
									c
									.margins
									.left, 0
									), c
								.paddingTop =
								Math.max(c
									.paddingTop -
									c
									.margins
									.top, 0
									), c
								.paddingRight =
								Math.max(c
									.paddingRight -
									c
									.margins
									.right,
									0),
								c
								.paddingBottom =
								Math.max(c
									.paddingBottom -
									c
									.margins
									.bottom,
									0)), c
							.width = d
							.width, c
							.height = d
							.height
					},
					afterFit: function()
					{
						b.callCallback(this
							.options
							.afterFit, [
								this
							])
					},
					isHorizontal: function()
					{
						return "top" ===
							this.options
							.position ||
							"bottom" ===
							this.options
							.position
					},
					isFullWidth: function()
					{
						return this.options
							.fullWidth
					},
					getRightValue: function(a)
					{
						return null === a ||
							void 0 === a ?
							NaN :
							"number" ==
							typeof a &&
							isNaN(a) ? NaN :
							"object" ==
							typeof a ?
							a instanceof Date ||
							a.isValid ? a :
							this
							.getRightValue(
								this
								.isHorizontal() ?
								a.x : a.y) :
							a
					},
					getLabelForIndex: b.noop,
					getPixelForValue: b.noop,
					getValueForPixel: b.noop,
					getPixelForTick: function(a,
						b)
					{
						var c = this;
						if (c
						.isHorizontal())
						{
							var d = c
								.width - (c
									.paddingLeft +
									c
									.paddingRight
									),
								e = d / Math
								.max(c.ticks
									.length -
									(c.options
										.gridLines
										.offsetGridLines ?
										0 :
										1),
									1),
								f = e * a +
								c
								.paddingLeft;
							b && (f += e /
								2);
							var g = c.left +
								Math.round(
									f);
							return g += c
								.isFullWidth() ?
								c.margins
								.left : 0
						}
						var h = c.height - (
							c
							.paddingTop +
							c
							.paddingBottom
							);
						return c.top + a * (
							h / (c.ticks
								.length -
								1))
					},
					getPixelForDecimal: function(
						a)
					{
						var b = this;
						if (b
						.isHorizontal())
						{
							var c = b
								.width - (b
									.paddingLeft +
									b
									.paddingRight
									),
								d = c * a +
								b
								.paddingLeft,
								e = b.left +
								Math.round(
									d);
							return e += b
								.isFullWidth() ?
								b.margins
								.left : 0
						}
						return b.top + a * b
							.height
					},
					getBasePixel: function()
					{
						var a = this,
							b = a.min,
							c = a.max;
						return a
							.getPixelForValue(
								a
								.beginAtZero ?
								0 : b < 0 &&
								c < 0 ? c :
								b > 0 && c >
								0 ? b : 0)
					},
					draw: function(c)
					{
						var d = this,
							e = d.options;
						if (e.display)
						{
							var f, g, h = d
								.ctx,
								i = a
								.defaults
								.global,
								j = e.ticks,
								k = e
								.gridLines,
								l = e
								.scaleLabel,
								m = 0 !== d
								.labelRotation,
								n = j
								.autoSkip,
								o = d
								.isHorizontal();
							j.maxTicksLimit &&
								(g = j
									.maxTicksLimit
									);
							var p = b
								.getValueOrDefault(
									j
									.fontColor,
									i
									.defaultFontColor
									),
								q = b
								.getValueOrDefault(
									j
									.fontSize,
									i
									.defaultFontSize
									),
								r = b
								.getValueOrDefault(
									j
									.fontStyle,
									i
									.defaultFontStyle
									),
								s = b
								.getValueOrDefault(
									j
									.fontFamily,
									i
									.defaultFontFamily
									),
								t = b
								.fontString(
									q, r, s
									),
								u = k
								.tickMarkLength,
								v = b
								.getValueOrDefault(
									l
									.fontColor,
									i
									.defaultFontColor
									),
								w = b
								.getValueOrDefault(
									l
									.fontSize,
									i
									.defaultFontSize
									),
								x = b
								.getValueOrDefault(
									l
									.fontStyle,
									i
									.defaultFontStyle
									),
								y = b
								.getValueOrDefault(
									l
									.fontFamily,
									i
									.defaultFontFamily
									),
								z = b
								.fontString(
									w, x, y
									),
								A = b
								.toRadians(d
									.labelRotation
									),
								B = Math
								.cos(A),
								C = d
								.longestLabelWidth *
								B;
							h.fillStyle = p;
							var D = [];
							if (o)
							{
								if (f = !1,
									m && (
										C /=
										2),
									(C + j
										.autoSkipPadding
										) *
									d.ticks
									.length >
									d
									.width -
									(d.paddingLeft +
										d
										.paddingRight
										) &&
									(f = 1 +
										Math
										.floor(
											(C + j
												.autoSkipPadding
												) *
											d
											.ticks
											.length /
											(d.width -
												(d.paddingLeft +
													d
													.paddingRight
													)
												)
											)
										),
									g && d
									.ticks
									.length >
									g)
									for (; !
										f ||
										d
										.ticks
										.length /
										(f ||
											1
											) >
										g;)
										f ||
										(f =
											1),
										f +=
										1;
								n || (f = !
									1)
							}
							var E =
								"right" ===
								e.position ?
								d.left : d
								.right - u,
								F =
								"right" ===
								e.position ?
								d.left + u :
								d.right,
								G =
								"bottom" ===
								e.position ?
								d.top : d
								.bottom - u,
								H =
								"bottom" ===
								e.position ?
								d.top + u :
								d.bottom;
							if (b.each(d
									.ticks,
									function(
										a, g
										)
									{
										if (void 0 !==
											a &&
											null !==
											a
											)
										{
											var h =
												d
												.ticks
												.length ===
												g +
												1;
											if ((!(f > 1 &&
														g %
														f >
														0 ||
														g %
														f ==
														0 &&
														g +
														f >=
														d
														.ticks
														.length
														) ||
													h
													) &&
												void 0 !==
												a &&
												null !==
												a
												)
											{
												var i,
													l;
												g ===
													(void 0 !==
														d
														.zeroLineIndex ?
														d
														.zeroLineIndex :
														0
														) ?
													(i = k
														.zeroLineWidth,
														l =
														k
														.zeroLineColor
														) :
													(i = b
														.getValueAtIndexOrDefault(
															k
															.lineWidth,
															g
															),
														l =
														b
														.getValueAtIndexOrDefault(
															k
															.color,
															g
															)
														);
												var n,
													p,
													q,
													r,
													s,
													t,
													v,
													w,
													x,
													y,
													z,
													B =
													"middle";
												if (
													o)
												{
													m || (B =
															"top" ===
															e
															.position ?
															"bottom" :
															"top"
															),
														z =
														m ?
														"right" :
														"center";
													var C =
														d
														.getPixelForTick(
															g
															) +
														b
														.aliasPixel(
															i
															);
													x = d
														.getPixelForTick(
															g,
															k
															.offsetGridLines
															) +
														j
														.labelOffset,
														y =
														m ?
														d
														.top +
														12 :
														"top" ===
														e
														.position ?
														d
														.bottom -
														u :
														d
														.top +
														u,
														n =
														q =
														s =
														v =
														C,
														p =
														G,
														r =
														H,
														t =
														c
														.top,
														w =
														c
														.bottom
												}
												else
												{
													"left" ===
													e.position ?
														j
														.mirror ?
														(x = d
															.right +
															j
															.padding,
															z =
															"left"
															) :
														(x = d
															.right -
															j
															.padding,
															z =
															"right"
															) :
														j
														.mirror ?
														(x = d
															.left -
															j
															.padding,
															z =
															"right"
															) :
														(x = d
															.left +
															j
															.padding,
															z =
															"left"
															);
													var I =
														d
														.getPixelForTick(
															g
															);
													I += b
														.aliasPixel(
															i
															),
														y =
														d
														.getPixelForTick(
															g,
															k
															.offsetGridLines
															),
														n =
														E,
														q =
														F,
														s =
														c
														.left,
														v =
														c
														.right,
														p =
														r =
														t =
														w =
														I
												}
												D.push(
												{
													tx1: n,
													ty1: p,
													tx2: q,
													ty2: r,
													x1: s,
													y1: t,
													x2: v,
													y2: w,
													labelX: x,
													labelY: y,
													glWidth: i,
													glColor: l,
													rotation:
														-
														1 *
														A,
													label: a,
													textBaseline: B,
													textAlign: z
												})
											}
										}
									}), b
								.each(D,
									function(
										a)
									{
										if (k
											.display &&
											(h.lineWidth =
												a
												.glWidth,
												h
												.strokeStyle =
												a
												.glColor,
												h
												.beginPath(),
												k
												.drawTicks &&
												(h.moveTo(
														a
														.tx1,
														a
														.ty1
														),
													h
													.lineTo(
														a
														.tx2,
														a
														.ty2
														)
													),
												k
												.drawOnChartArea &&
												(h.moveTo(
														a
														.x1,
														a
														.y1
														),
													h
													.lineTo(
														a
														.x2,
														a
														.y2
														)
													),
												h
												.stroke()
												),
											j
											.display
											)
										{
											h.save(),
												h
												.translate(
													a
													.labelX,
													a
													.labelY
													),
												h
												.rotate(
													a
													.rotation
													),
												h
												.font =
												t,
												h
												.textBaseline =
												a
												.textBaseline,
												h
												.textAlign =
												a
												.textAlign;
											var c =
												a
												.label;
											if (b
												.isArray(
													c
													)
												)
												for (
													var d =
														0,
														e =
														0; d <
													c
													.length; ++
													d
													)
													h
													.fillText(
														"" +
														c[
															d],
														0,
														e
														),
													e +=
													1.5 *
													q;
											else h
												.fillText(
													c,
													0,
													0
													);
											h.restore()
										}
									}), l
								.display)
							{
								var I, J,
									K = 0;
								if (o) I = d
									.left +
									(d.right -
										d
										.left
										) /
									2, J =
									"bottom" ===
									e
									.position ?
									d
									.bottom -
									w / 2 :
									d.top +
									w / 2;
								else
								{
									var L =
										"left" ===
										e
										.position;
									I = L ?
										d
										.left +
										w /
										2 :
										d
										.right -
										w /
										2,
										J =
										d
										.top +
										(d.bottom -
											d
											.top
											) /
										2,
										K =
										L ?
										-
										.5 *
										Math
										.PI :
										.5 *
										Math
										.PI
								}
								h.save(), h
									.translate(
										I, J
										), h
									.rotate(
										K),
									h
									.textAlign =
									"center",
									h
									.textBaseline =
									"middle",
									h
									.fillStyle =
									v, h
									.font =
									z, h
									.fillText(
										l
										.labelString,
										0, 0
										), h
									.restore()
							}
							if (k
								.drawBorder)
							{
								h.lineWidth =
									b
									.getValueAtIndexOrDefault(
										k
										.lineWidth,
										0),
									h
									.strokeStyle =
									b
									.getValueAtIndexOrDefault(
										k
										.color,
										0);
								var M = d
									.left,
									N = d
									.right,
									O = d
									.top,
									P = d
									.bottom,
									Q = b
									.aliasPixel(
										h
										.lineWidth
										);
								o ? (O = P =
										"top" ===
										e
										.position ?
										d
										.bottom :
										d
										.top,
										O +=
										Q,
										P +=
										Q) :
									(M = N =
										"left" ===
										e
										.position ?
										d
										.right :
										d
										.left,
										M +=
										Q,
										N +=
										Q),
									h
									.beginPath(),
									h
									.moveTo(
										M, O
										), h
									.lineTo(
										N, P
										), h
									.stroke()
							}
						}
					}
				})
			}
		},
		{}],
		32: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				var b = a.helpers;
				a.scaleService = {
					constructors:
					{},
					defaults:
					{},
					registerScaleType: function(a,
						c, d)
					{
						this.constructors[a] =
							c, this.defaults[
							a] = b.clone(d)
					},
					getScaleConstructor: function(a)
					{
						return this.constructors
							.hasOwnProperty(a) ?
							this.constructors[
							a] : void 0
					},
					getScaleDefaults: function(c)
					{
						return this.defaults
							.hasOwnProperty(c) ?
							b.scaleMerge(a
								.defaults.scale,
								this.defaults[c]
								) :
							{}
					},
					updateScaleDefaults: function(a,
						c)
					{
						var d = this.defaults;
						d.hasOwnProperty(a) && (
							d[a] = b.extend(
								d[a], c))
					},
					addScalesToLayout: function(c)
					{
						b.each(c.scales,
							function(b)
							{
								a.layoutService
									.addBox(
										c, b
										)
							})
					}
				}
			}
		},
		{}],
		33: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				var b = a.helpers;
				a.defaults.global.title = {
					display: !1,
					position: "top",
					fullWidth: !0,
					fontStyle: "bold",
					padding: 10,
					text: ""
				};
				var c = b.noop;
				a.Title = a.Element.extend(
				{
					initialize: function(c)
					{
						var d = this;
						b.extend(d, c), d
							.options = b
							.configMerge(a
								.defaults
								.global
								.title, c
								.options), d
							.legendHitBoxes = []
					},
					beforeUpdate: function()
					{
						var c = this.chart
							.options;
						c && c.title && (
							this
							.options = b
							.configMerge(
								a
								.defaults
								.global
								.title,
								c.title)
							)
					},
					update: function(a, b, c)
					{
						var d = this;
						return d
							.beforeUpdate(),
							d.maxWidth = a,
							d.maxHeight = b,
							d.margins = c, d
							.beforeSetDimensions(),
							d
							.setDimensions(),
							d
							.afterSetDimensions(),
							d
							.beforeBuildLabels(),
							d.buildLabels(),
							d
							.afterBuildLabels(),
							d.beforeFit(), d
							.fit(), d
							.afterFit(), d
							.afterUpdate(),
							d.minSize
					},
					afterUpdate: c,
					beforeSetDimensions: c,
					setDimensions: function()
					{
						var a = this;
						a.isHorizontal() ? (
								a.width = a
								.maxWidth, a
								.left = 0, a
								.right = a
								.width) : (a
								.height = a
								.maxHeight,
								a.top = 0, a
								.bottom = a
								.height), a
							.paddingLeft =
							0, a
							.paddingTop = 0,
							a.paddingRight =
							0, a
							.paddingBottom =
							0, a.minSize = {
								width: 0,
								height: 0
							}
					},
					afterSetDimensions: c,
					beforeBuildLabels: c,
					buildLabels: c,
					afterBuildLabels: c,
					beforeFit: c,
					fit: function()
					{
						var c = this,
							d = b
							.getValueOrDefault,
							e = c.options,
							f = a.defaults
							.global,
							g = e.display,
							h = d(e
								.fontSize, f
								.defaultFontSize
								),
							i = c.minSize;
						c.isHorizontal() ? (
								i.width = c
								.maxWidth, i
								.height =
								g ? h + 2 *
								e.padding :
								0) : (i
								.width = g ?
								h + 2 * e
								.padding :
								0, i
								.height = c
								.maxHeight),
							c.width = i
							.width, c
							.height = i
							.height
					},
					afterFit: c,
					isHorizontal: function()
					{
						var a = this.options
							.position;
						return "top" ===
							a ||
							"bottom" === a
					},
					draw: function()
					{
						var c = this,
							d = c.ctx,
							e = b
							.getValueOrDefault,
							f = c.options,
							g = a.defaults
							.global;
						if (f.display)
						{
							var h, i, j = e(
									f
									.fontSize,
									g
									.defaultFontSize
									),
								k = e(f
									.fontStyle,
									g
									.defaultFontStyle
									),
								l = e(f
									.fontFamily,
									g
									.defaultFontFamily
									),
								m = b
								.fontString(
									j, k, l
									),
								n = 0,
								o = c.top,
								p = c.left,
								q = c
								.bottom,
								r = c.right;
							d.fillStyle = e(
									f
									.fontColor,
									g
									.defaultFontColor
									), d
								.font = m, c
								.isHorizontal() ?
								(h = p + (
										r -
										p) /
									2, i =
									o + (q -
										o) /
									2) : (
									h =
									"left" ===
									f
									.position ?
									p + j /
									2 : r -
									j / 2,
									i = o +
									(q -
									o) / 2,
									n = Math
									.PI * (
										"left" ===
										f
										.position ?
										-
										.5 :
										.5)
									), d
								.save(), d
								.translate(
									h, i), d
								.rotate(n),
								d
								.textAlign =
								"center", d
								.textBaseline =
								"middle", d
								.fillText(f
									.text,
									0, 0), d
								.restore()
						}
					}
				}), a.plugins.register(
				{
					beforeInit: function(b)
					{
						var c = b.options,
							d = c.title;
						d && (b.titleBlock =
							new a.Title(
							{
								ctx: b
									.chart
									.ctx,
								options: d,
								chart: b
							}), a
							.layoutService
							.addBox(b, b
								.titleBlock
								))
					}
				})
			}
		},
		{}],
		34: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				function b(a, b)
				{
					return b && (e.isArray(b) ? Array
						.prototype.push.apply(a,
						b) : a.push(b)), a
				}

				function c(a)
				{
					if (!a.length) return !1;
					var b, c, d = [],
						e = [];
					for (b = 0, c = a.length; b < c; ++
						b)
					{
						var f = a[b];
						if (f && f.hasValue())
						{
							var g = f.tooltipPosition();
							d.push(g.x), e.push(g.y)
						}
					}
					var h = 0,
						i = 0;
					for (b = 0; b < d.length; ++b) d[
						b] && (h += d[b], i += e[b]);
					return {
						x: Math.round(h / d.length),
						y: Math.round(i / d.length)
					}
				}

				function d(a)
				{
					var b = a._xScale,
						c = a._yScale || a._scale,
						d = a._index,
						e = a._datasetIndex;
					return {
						xLabel: b ? b.getLabelForIndex(
							d, e) : "",
						yLabel: c ? c.getLabelForIndex(
							d, e) : "",
						index: d,
						datasetIndex: e
					}
				}
				var e = a.helpers;
				a.defaults.global.tooltips = {
					enabled: !0,
					custom: null,
					mode: "single",
					backgroundColor: "rgba(0,0,0,0.8)",
					titleFontStyle: "bold",
					titleSpacing: 2,
					titleMarginBottom: 6,
					titleFontColor: "#fff",
					titleAlign: "left",
					bodySpacing: 2,
					bodyFontColor: "#fff",
					bodyAlign: "left",
					footerFontStyle: "bold",
					footerSpacing: 2,
					footerMarginTop: 6,
					footerFontColor: "#fff",
					footerAlign: "left",
					yPadding: 6,
					xPadding: 6,
					yAlign: "center",
					xAlign: "center",
					caretSize: 5,
					cornerRadius: 6,
					multiKeyBackground: "#fff",
					callbacks:
					{
						beforeTitle: e.noop,
						title: function(a, b)
						{
							var c = "",
								d = b.labels,
								e = d ? d
								.length : 0;
							if (a.length > 0)
							{
								var f = a[0];
								f.xLabel ? c = f
									.xLabel :
									e > 0 && f
									.index <
									e && (c = d[
										f
										.index
										])
							}
							return c
						},
						afterTitle: e.noop,
						beforeBody: e.noop,
						beforeLabel: e.noop,
						label: function(a, b)
						{
							return (b.datasets[a
										.datasetIndex
										]
									.label || ""
									) + ": " + a
								.yLabel
						},
						labelColor: function(a, b)
						{
							var c = b
								.getDatasetMeta(
									a
									.datasetIndex
									),
								d = c.data[a
									.index],
								e = d._view;
							return {
								borderColor: e
									.borderColor,
								backgroundColor: e
									.backgroundColor
							}
						},
						afterLabel: e.noop,
						afterBody: e.noop,
						beforeFooter: e.noop,
						footer: e.noop,
						afterFooter: e.noop
					}
				}, a.Tooltip = a.Element.extend(
				{
					initialize: function()
					{
						var b = this,
							c = a.defaults
							.global,
							d = b._options,
							f = e
							.getValueOrDefault;
						e.extend(b,
						{
							_model:
							{
								xPadding: d
									.xPadding,
								yPadding: d
									.yPadding,
								xAlign: d
									.xAlign,
								yAlign: d
									.yAlign,
								bodyFontColor: d
									.bodyFontColor,
								_bodyFontFamily: f(
									d
									.bodyFontFamily,
									c
									.defaultFontFamily
									),
								_bodyFontStyle: f(
									d
									.bodyFontStyle,
									c
									.defaultFontStyle
									),
								_bodyAlign: d
									.bodyAlign,
								bodyFontSize: f(
									d
									.bodyFontSize,
									c
									.defaultFontSize
									),
								bodySpacing: d
									.bodySpacing,
								titleFontColor: d
									.titleFontColor,
								_titleFontFamily: f(
									d
									.titleFontFamily,
									c
									.defaultFontFamily
									),
								_titleFontStyle: f(
									d
									.titleFontStyle,
									c
									.defaultFontStyle
									),
								titleFontSize: f(
									d
									.titleFontSize,
									c
									.defaultFontSize
									),
								_titleAlign: d
									.titleAlign,
								titleSpacing: d
									.titleSpacing,
								titleMarginBottom: d
									.titleMarginBottom,
								footerFontColor: d
									.footerFontColor,
								_footerFontFamily: f(
									d
									.footerFontFamily,
									c
									.defaultFontFamily
									),
								_footerFontStyle: f(
									d
									.footerFontStyle,
									c
									.defaultFontStyle
									),
								footerFontSize: f(
									d
									.footerFontSize,
									c
									.defaultFontSize
									),
								_footerAlign: d
									.footerAlign,
								footerSpacing: d
									.footerSpacing,
								footerMarginTop: d
									.footerMarginTop,
								caretSize: d
									.caretSize,
								cornerRadius: d
									.cornerRadius,
								backgroundColor: d
									.backgroundColor,
								opacity: 0,
								legendColorBackground: d
									.multiKeyBackground
							}
						})
					},
					getTitle: function()
					{
						var a = this,
							c = a._options,
							d = c.callbacks,
							e = d
							.beforeTitle
							.apply(a,
								arguments),
							f = d.title
							.apply(a,
								arguments),
							g = d.afterTitle
							.apply(a,
								arguments),
							h = [];
						return h = b(h, e),
							h = b(h, f), h =
							b(h, g)
					},
					getBeforeBody: function()
					{
						var a = this
							._options
							.callbacks
							.beforeBody
							.apply(this,
								arguments);
						return e.isArray(
							a) ? a :
							void 0 !== a ? [
								a
							] : []
					},
					getBody: function(a, c)
					{
						var d = this,
							f = d._options
							.callbacks,
							g = [];
						return e.each(a,
							function(a)
							{
								var e = {
									before: [],
									lines: [],
									after: []
								};
								b(e.before,
										f
										.beforeLabel
										.call(
											d,
											a,
											c
											)
										),
									b(e.lines,
										f
										.label
										.call(
											d,
											a,
											c
											)
										),
									b(e.after,
										f
										.afterLabel
										.call(
											d,
											a,
											c
											)
										),
									g
									.push(
										e
										)
							}), g
					},
					getAfterBody: function()
					{
						var a = this
							._options
							.callbacks
							.afterBody
							.apply(this,
								arguments);
						return e.isArray(
							a) ? a :
							void 0 !== a ? [
								a
							] : []
					},
					getFooter: function()
					{
						var a = this,
							c = a._options
							.callbacks,
							d = c
							.beforeFooter
							.apply(a,
								arguments),
							e = c.footer
							.apply(a,
								arguments),
							f = c
							.afterFooter
							.apply(a,
								arguments),
							g = [];
						return g = b(g, d),
							g = b(g, e), g =
							b(g, f)
					},
					update: function(a)
					{
						var b, f, g = this,
							h = g._options,
							i = g._model,
							j = g._active,
							k = g._data,
							l = g
							._chartInstance;
						if (j.length)
						{
							i.opacity = 1;
							var m = [],
								n = c(j),
								o = [];
							for (b = 0, f =
								j
								.length; b <
								f; ++b) o
								.push(d(j[
									b]));
							h.itemSort && (
									o = o
									.sort(h
										.itemSort
										)),
								j.length >
								1 && e.each(
									o,
									function(
										a)
									{
										m.push(h.callbacks
											.labelColor
											.call(
												g,
												a,
												l
												)
											)
									}), e
								.extend(i,
								{
									title: g
										.getTitle(
											o,
											k
											),
									beforeBody: g
										.getBeforeBody(
											o,
											k
											),
									body: g
										.getBody(
											o,
											k
											),
									afterBody: g
										.getAfterBody(
											o,
											k
											),
									footer: g
										.getFooter(
											o,
											k
											),
									x: Math
										.round(
											n
											.x
											),
									y: Math
										.round(
											n
											.y
											),
									caretPadding: e
										.getValueOrDefault(
											n
											.padding,
											2
											),
									labelColors: m
								});
							var p = g
								.getTooltipSize(
									i);
							g.determineAlignment(
									p), e
								.extend(i, g
									.getBackgroundPoint(
										i, p
										))
						}
						else g._model
							.opacity = 0;
						return a && h
							.custom && h
							.custom.call(g,
								i), g
					},
					getTooltipSize: function(a)
					{
						var b = this._chart
							.ctx,
							c = {
								height: 2 *
									a
									.yPadding,
								width: 0
							},
							d = a.body,
							f = d.reduce(
								function(a,
									b)
								{
									return a +
										b
										.before
										.length +
										b
										.lines
										.length +
										b
										.after
										.length
								}, 0);
						f += a.beforeBody
							.length + a
							.afterBody
							.length;
						var g = a.title
							.length,
							h = a.footer
							.length,
							i = a
							.titleFontSize,
							j = a
							.bodyFontSize,
							k = a
							.footerFontSize;
						c.height += g * i, c
							.height += (g -
								1) * a
							.titleSpacing, c
							.height += g ? a
							.titleMarginBottom :
							0, c.height +=
							f * j, c
							.height += f ? (
								f - 1) * a
							.bodySpacing :
							0, c.height +=
							h ? a
							.footerMarginTop :
							0, c.height +=
							h * k, c
							.height += h ? (
								h - 1) * a
							.footerSpacing :
							0;
						var l = 0,
							m = function(a)
							{
								c.width =
									Math
									.max(c
										.width,
										b
										.measureText(
											a
											)
										.width +
										l)
							};
						return b.font = e
							.fontString(i, a
								._titleFontStyle,
								a
								._titleFontFamily
								), e.each(a
								.title, m),
							b.font = e
							.fontString(j, a
								._bodyFontStyle,
								a
								._bodyFontFamily
								), e.each(a
								.beforeBody
								.concat(a
									.afterBody
									), m),
							l = d.length >
							1 ? j + 2 : 0, e
							.each(d,
								function(a)
								{
									e.each(a.before,
											m
											),
										e
										.each(
											a
											.lines,
											m
											),
										e
										.each(
											a
											.after,
											m
											)
								}), l = 0, b
							.font = e
							.fontString(k, a
								._footerFontStyle,
								a
								._footerFontFamily
								), e.each(a
								.footer, m),
							c.width += 2 * a
							.xPadding, c
					},
					determineAlignment: function(
						a)
					{
						var b = this,
							c = b._model,
							d = b._chart,
							e = b
							._chartInstance
							.chartArea;
						c.y < a.height ? c
							.yAlign =
							"top" : c.y > d
							.height - a
							.height && (c
								.yAlign =
								"bottom");
						var f, g, h, i, j,
							k = (e.left + e
								.right) / 2,
							l = (e.top + e
								.bottom) /
							2;
						"center" === c
							.yAlign ? (f =
								function(a)
								{
									return a <=
										k
								}, g =
								function(a)
								{
									return a >
										k
								}) : (f =
								function(b)
								{
									return b <=
										a
										.width /
										2
								}, g =
								function(b)
								{
									return b >=
										d
										.width -
										a
										.width /
										2
								}), h =
							function(b)
							{
								return b + a
									.width >
									d.width
							}, i = function(
								b)
							{
								return b - a
									.width <
									0
							}, j = function(
								a)
							{
								return a <=
									l ?
									"top" :
									"bottom"
							}, f(c.x) ? (c
								.xAlign =
								"left", h(c
									.x) && (
									c
									.xAlign =
									"center",
									c
									.yAlign =
									j(c.y))
								) : g(c
							.x) && (c
								.xAlign =
								"right", i(c
									.x) && (
									c
									.xAlign =
									"center",
									c
									.yAlign =
									j(c.y)))
					},
					getBackgroundPoint: function(
						a, b)
					{
						var c = {
								x: a.x,
								y: a.y
							},
							d = a.caretSize,
							e = a
							.caretPadding,
							f = a
							.cornerRadius,
							g = a.xAlign,
							h = a.yAlign,
							i = d + e,
							j = f + e;
						return "right" ===
							g ? c.x -= b
							.width :
							"center" ===
							g && (c.x -= b
								.width / 2),
							"top" === h ? c
							.y += i : c.y -=
							"bottom" === h ?
							b.height + i : b
							.height / 2,
							"center" === h ?
							"left" === g ? c
							.x += i :
							"right" === g &&
							(c.x -= i) :
							"left" === g ? c
							.x -= j :
							"right" === g &&
							(c.x += j), c
					},
					drawCaret: function(a, b, c)
					{
						var d, f, g, h, i,
							j, k = this
							._view,
							l = this._chart
							.ctx,
							m = k.caretSize,
							n = k
							.cornerRadius,
							o = k.xAlign,
							p = k.yAlign,
							q = a.x,
							r = a.y,
							s = b.width,
							t = b.height;
						"center" === p ? (
								"left" ===
								o ? (d = q,
									f = d -
									m, g = d
									) : (d =
									q + s,
									f = d +
									m, g = d
									), i =
								r + t / 2,
								h = i - m,
								j = i + m) :
							("left" === o ?
								(d = q + n,
									f = d +
									m, g =
									f + m) :
								"right" ===
								o ? (d = q +
									s - n,
									f = d -
									m, g =
									f - m) :
								(f = q + s /
									2, d =
									f - m,
									g = f +
									m),
								"top" ===
								p ? (h = r,
									i = h -
									m, j = h
									) : (h =
									r + t,
									i = h +
									m, j = h
									));
						var u = e.color(k
							.backgroundColor
							);
						l.fillStyle = u
							.alpha(c * u
								.alpha())
							.rgbString(), l
							.beginPath(), l
							.moveTo(d, h), l
							.lineTo(f, i), l
							.lineTo(g, j), l
							.closePath(), l
							.fill()
					},
					drawTitle: function(a, b, c,
						d)
					{
						var f = b.title;
						if (f.length)
						{
							c.textAlign = b
								._titleAlign,
								c
								.textBaseline =
								"top";
							var g = b
								.titleFontSize,
								h = b
								.titleSpacing,
								i = e.color(
									b
									.titleFontColor
									);
							c.fillStyle = i
								.alpha(d * i
									.alpha()
									)
								.rgbString(),
								c.font = e
								.fontString(
									g, b
									._titleFontStyle,
									b
									._titleFontFamily
									);
							var j, k;
							for (j = 0, k =
								f
								.length; j <
								k; ++j) c
								.fillText(f[
										j],
									a.x, a.y
									), a
								.y += g + h,
								j + 1 === f
								.length && (
									a.y += b
									.titleMarginBottom -
									h)
						}
					},
					drawBody: function(a, b, c,
						d)
					{
						var f = b
							.bodyFontSize,
							g = b
							.bodySpacing,
							h = b.body;
						c.textAlign = b
							._bodyAlign, c
							.textBaseline =
							"top";
						var i = e.color(b
								.bodyFontColor
								),
							j = i.alpha(d *
								i.alpha())
							.rgbString();
						c.fillStyle = j, c
							.font = e
							.fontString(f, b
								._bodyFontStyle,
								b
								._bodyFontFamily
								);
						var k = 0,
							l = function(b)
							{
								c.fillText(
										b, a
										.x +
										k, a
										.y),
									a.y +=
									f + g
							};
						e.each(b.beforeBody,
							l);
						var m = h.length >
						1;
						k = m ? f + 2 : 0, e
							.each(h,
								function(g,
									h)
								{
									e.each(g.before,
											l
											),
										e
										.each(
											g
											.lines,
											function(
												g
												)
											{
												m && (c.fillStyle =
														e
														.color(
															b
															.legendColorBackground
															)
														.alpha(
															d
															)
														.rgbaString(),
														c
														.fillRect(
															a
															.x,
															a
															.y,
															f,
															f
															),
														c
														.strokeStyle =
														e
														.color(
															b
															.labelColors[
																h
																]
															.borderColor
															)
														.alpha(
															d
															)
														.rgbaString(),
														c
														.strokeRect(
															a
															.x,
															a
															.y,
															f,
															f
															),
														c
														.fillStyle =
														e
														.color(
															b
															.labelColors[
																h
																]
															.backgroundColor
															)
														.alpha(
															d
															)
														.rgbaString(),
														c
														.fillRect(
															a
															.x +
															1,
															a
															.y +
															1,
															f -
															2,
															f -
															2
															),
														c
														.fillStyle =
														j
														),
													l(
														g)
											}
											),
										e
										.each(
											g
											.after,
											l
											)
								}), k = 0, e
							.each(b
								.afterBody,
								l), a.y -= g
					},
					drawFooter: function(a, b,
						c, d)
					{
						var f = b.footer;
						if (f.length)
						{
							a.y += b
								.footerMarginTop,
								c
								.textAlign =
								b
								._footerAlign,
								c
								.textBaseline =
								"top";
							var g = e.color(
								b
								.footerFontColor
								);
							c.fillStyle = g
								.alpha(d * g
									.alpha()
									)
								.rgbString(),
								c.font = e
								.fontString(
									b
									.footerFontSize,
									b
									._footerFontStyle,
									b
									._footerFontFamily
									), e
								.each(f,
									function(
										d)
									{
										c.fillText(
												d,
												a
												.x,
												a
												.y
												),
											a
											.y +=
											b
											.footerFontSize +
											b
											.footerSpacing
									})
						}
					},
					draw: function()
					{
						var a = this._chart
							.ctx,
							b = this._view;
						if (0 !== b.opacity)
						{
							var c = this
								.getTooltipSize(
									b),
								d = {
									x: b.x,
									y: b.y
								},
								f = Math
								.abs(b
									.opacity <
									.001) ?
								0 : b
								.opacity;
							if (this
								._options
								.enabled)
							{
								var g = e
									.color(b
										.backgroundColor
										);
								a.fillStyle =
									g.alpha(
										f *
										g
										.alpha()
										)
									.rgbString(),
									e
									.drawRoundedRectangle(
										a, d
										.x,
										d.y,
										c
										.width,
										c
										.height,
										b
										.cornerRadius
										), a
									.fill(),
									this
									.drawCaret(
										d,
										c, f
										), d
									.x += b
									.xPadding,
									d.y += b
									.yPadding,
									this
									.drawTitle(
										d,
										b,
										a, f
										),
									this
									.drawBody(
										d,
										b,
										a, f
										),
									this
									.drawFooter(
										d,
										b,
										a, f
										)
							}
						}
					}
				})
			}
		},
		{}],
		35: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				var b = a.helpers,
					c = a.defaults.global;
				c.elements.arc = {
						backgroundColor: c.defaultColor,
						borderColor: "#fff",
						borderWidth: 2
					}, a.elements.Arc = a.Element
					.extend(
					{
						inLabelRange: function(a)
						{
							var b = this._view;
							return !!b && Math
								.pow(a - b.x,
								2) < Math.pow(b
									.radius + b
									.hoverRadius,
									2)
						},
						inRange: function(a, c)
						{
							var d = this._view;
							if (d)
							{
								for (var e = b
										.getAngleFromPoint(
											d,
											{
												x: a,
												y: c
											}),
										f = e
										.angle,
										g = e
										.distance,
										h = d
										.startAngle,
										i = d
										.endAngle; i <
									h;) i += 2 *
									Math.PI;
								for (; f > i;)
									f -= 2 *
									Math.PI;
								for (; f < h;)
									f += 2 *
									Math.PI;
								var j = f >=
									h && f <= i,
									k = g >= d
									.innerRadius &&
									g <= d
									.outerRadius;
								return j && k
							}
							return !1
						},
						tooltipPosition: function()
						{
							var a = this._view,
								b = a
								.startAngle + (a
									.endAngle -
									a.startAngle
									) / 2,
								c = (a
									.outerRadius -
									a
									.innerRadius
									) / 2 + a
								.innerRadius;
							return {
								x: a.x + Math
									.cos(b) * c,
								y: a.y + Math
									.sin(b) * c
							}
						},
						draw: function()
						{
							var a = this._chart
								.ctx,
								b = this._view,
								c = b
								.startAngle,
								d = b.endAngle;
							a.beginPath(), a
								.arc(b.x, b.y, b
									.outerRadius,
									c, d), a
								.arc(b.x, b.y, b
									.innerRadius,
									d, c, !0), a
								.closePath(), a
								.strokeStyle = b
								.borderColor, a
								.lineWidth = b
								.borderWidth, a
								.fillStyle = b
								.backgroundColor,
								a.fill(), a
								.lineJoin =
								"bevel", b
								.borderWidth &&
								a.stroke()
						}
					})
			}
		},
		{}],
		36: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				var b = a.helpers,
					c = a.defaults.global;
				a.defaults.global.elements.line = {
						tension: .4,
						backgroundColor: c.defaultColor,
						borderWidth: 3,
						borderColor: c.defaultColor,
						borderCapStyle: "butt",
						borderDash: [],
						borderDashOffset: 0,
						borderJoinStyle: "miter",
						capBezierPoints: !0,
						fill: !0
					}, a.elements.Line = a.Element
					.extend(
					{
						draw: function()
						{
							function a(a, b)
							{
								var c = b._view;
								!0 === b._view
									.steppedLine ?
									(i.lineTo(b
											._view
											.x,
											a
											._view
											.y),
										i
										.lineTo(
											b
											._view
											.x,
											b
											._view
											.y)
										) :
									0 === b
									._view
									.tension ? i
									.lineTo(c.x,
										c.y) : i
									.bezierCurveTo(
										a._view
										.controlPointNextX,
										a._view
										.controlPointNextY,
										c
										.controlPointPreviousX,
										c
										.controlPointPreviousY,
										c.x, c.y
										)
							}
							var d = this,
								e = d._view,
								f = e.spanGaps,
								g = e.scaleZero,
								h = d._loop,
								i = d._chart
								.ctx;
							i.save();
							var j = d._children
								.slice(),
								k = -1;
							h && j.length && j
								.push(j[0]);
							var l, m, n, o;
							if (j.length && e
								.fill)
							{
								for (i
									.beginPath(),
									l = 0; l < j
									.length; ++l
									) m = j[l],
									n = b
									.previousItem(
										j, l),
									o = m._view,
									0 === l ? (
										h ? i
										.moveTo(
											g.x,
											g.y
											) :
										i
										.moveTo(
											o.x,
											g),
										o
										.skip ||
										(k = l,
											i
											.lineTo(
												o
												.x,
												o
												.y
												)
											)) :
									(n = -1 ===
										k ? n :
										j[k], o
										.skip ?
										f ||
										k !==
										l - 1 ||
										(h ? i
											.lineTo(
												g
												.x,
												g
												.y
												) :
											i
											.lineTo(
												n
												._view
												.x,
												g
												)
											) :
										(k !==
											l -
											1 ?
											f &&
											-
											1 !==
											k ?
											a(n,
												m) :
											h ?
											i
											.lineTo(
												o
												.x,
												o
												.y
												) :
											(i.lineTo(
													o
													.x,
													g
													),
												i
												.lineTo(
													o
													.x,
													o
													.y
													)
												) :
											a(n,
												m),
											k =
											l));
								h || i.lineTo(j[
											k]
										._view
										.x, g),
									i
									.fillStyle =
									e
									.backgroundColor ||
									c
									.defaultColor,
									i
									.closePath(),
									i.fill()
							}
							var p = c.elements
								.line;
							for (i.lineCap = e
								.borderCapStyle ||
								p
								.borderCapStyle,
								i.setLineDash &&
								i.setLineDash(e
									.borderDash ||
									p.borderDash
									), i
								.lineDashOffset =
								e
								.borderDashOffset ||
								p
								.borderDashOffset,
								i.lineJoin = e
								.borderJoinStyle ||
								p
								.borderJoinStyle,
								i.lineWidth = e
								.borderWidth ||
								p.borderWidth, i
								.strokeStyle = e
								.borderColor ||
								c.defaultColor,
								i.beginPath(),
								k = -1, l =
								0; l < j
								.length; ++l)
								m = j[l], n = b
								.previousItem(j,
									l), o = m
								._view, 0 ===
								l ? o.skip || (i
									.moveTo(o.x,
										o.y),
									k = l) : (
									n = -1 ===
									k ? n : j[
									k], o
									.skip || (
										k !==
										l - 1 &&
										!f || -
										1 ===
										k ? i
										.moveTo(
											o.x,
											o.y
											) :
										a(n, m),
										k = l));
							i.stroke(), i
								.restore()
						}
					})
			}
		},
		{}],
		37: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				var b = a.helpers,
					c = a.defaults.global,
					d = c.defaultColor;
				c.elements.point = {
						radius: 3,
						pointStyle: "circle",
						backgroundColor: d,
						borderWidth: 1,
						borderColor: d,
						hitRadius: 1,
						hoverRadius: 4,
						hoverBorderWidth: 1
					}, a.elements.Point = a.Element
					.extend(
					{
						inRange: function(a, b)
						{
							var c = this._view;
							return !!c && Math
								.pow(a - c.x,
								2) + Math.pow(
									b - c.y, 2
									) < Math
								.pow(c
									.hitRadius +
									c.radius, 2)
						},
						inLabelRange: function(a)
						{
							var b = this._view;
							return !!b && Math
								.pow(a - b.x,
								2) < Math.pow(b
									.radius + b
									.hitRadius,
									2)
						},
						tooltipPosition: function()
						{
							var a = this._view;
							return {
								x: a.x,
								y: a.y,
								padding: a
									.radius + a
									.borderWidth
							}
						},
						draw: function()
						{
							var e = this._view,
								f = this._chart
								.ctx,
								g = e
								.pointStyle,
								h = e.radius,
								i = e.x,
								j = e.y;
							e.skip || (f
								.strokeStyle =
								e
								.borderColor ||
								d, f
								.lineWidth =
								b
								.getValueOrDefault(
									e
									.borderWidth,
									c
									.elements
									.point
									.borderWidth
									), f
								.fillStyle =
								e
								.backgroundColor ||
								d, a
								.canvasHelpers
								.drawPoint(
									f, g, h,
									i, j))
						}
					})
			}
		},
		{}],
		38: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				var b = a.defaults.global;
				b.elements.rectangle = {
						backgroundColor: b.defaultColor,
						borderWidth: 0,
						borderColor: b.defaultColor,
						borderSkipped: "bottom"
					}, a.elements.Rectangle = a.Element
					.extend(
					{
						draw: function()
						{
							function a(a)
							{
								return i[(k +
									a) % 4]
							}
							var b = this._chart
								.ctx,
								c = this._view,
								d = c.width / 2,
								e = c.x - d,
								f = c.x + d,
								g = c.base - (c
									.base - c.y
									),
								h = c
								.borderWidth /
								2;
							c.borderWidth && (
									e += h, f -=
									h, g += h),
								b.beginPath(), b
								.fillStyle = c
								.backgroundColor,
								b.strokeStyle =
								c.borderColor, b
								.lineWidth = c
								.borderWidth;
							var i = [
									[e, c.base],
									[e, g],
									[f, g],
									[f, c.base]
								],
								j = ["bottom",
									"left",
									"top",
									"right"
								],
								k = j.indexOf(c
									.borderSkipped,
									0); - 1 ===
								k && (k = 0), b
								.moveTo.apply(b,
									a(0));
							for (var l = 1; l <
								4; l++) b.lineTo
								.apply(b, a(l));
							b.fill(), c
								.borderWidth &&
								b.stroke()
						},
						height: function()
						{
							var a = this._view;
							return a.base - a.y
						},
						inRange: function(a, b)
						{
							var c = this._view;
							return !!c && (c.y <
								c.base ?
								a >= c.x - c
								.width /
								2 && a <= c
								.x + c
								.width /
								2 && b >= c
								.y && b <= c
								.base : a >=
								c.x - c
								.width /
								2 && a <= c
								.x + c
								.width /
								2 && b >= c
								.base &&
								b <= c.y)
						},
						inLabelRange: function(a)
						{
							var b = this._view;
							return !!b && (a >=
								b.x - b
								.width /
								2 && a <= b
								.x + b
								.width / 2)
						},
						tooltipPosition: function()
						{
							var a = this._view;
							return {
								x: a.x,
								y: a.y
							}
						}
					})
			}
		},
		{}],
		39: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				var b = a.helpers,
					c = {
						position: "bottom"
					},
					d = a.Scale.extend(
					{
						getLabels: function()
						{
							var a = this.chart
								.data;
							return (this
									.isHorizontal() ?
									a.xLabels :
									a.yLabels
									) || a
								.labels
						},
						determineDataLimits: function()
						{
							var a = this,
								c = a
								.getLabels();
							a.minIndex = 0, a
								.maxIndex = c
								.length - 1;
							var d;
							void 0 !== a.options
								.ticks.min && (
									d = b
									.indexOf(c,
										a
										.options
										.ticks
										.min), a
									.minIndex = -
									1 !== d ?
									d : a
									.minIndex),
								void 0 !== a
								.options.ticks
								.max && (d = b
									.indexOf(c,
										a
										.options
										.ticks
										.max), a
									.maxIndex = -
									1 !== d ?
									d : a
									.maxIndex),
								a.min = c[a
									.minIndex],
								a.max = c[a
									.maxIndex]
						},
						buildTicks: function()
						{
							var a = this,
								b = a
								.getLabels();
							a.ticks = 0 === a
								.minIndex && a
								.maxIndex === b
								.length - 1 ?
								b : b.slice(a
									.minIndex, a
									.maxIndex +
									1)
						},
						getLabelForIndex: function(
							a)
						{
							return this.ticks[a]
						},
						getPixelForValue: function(
							a, b, c, d)
						{
							var e = this,
								f = Math.max(e
									.maxIndex +
									1 - e
									.minIndex -
									(e.options
										.gridLines
										.offsetGridLines ?
										0 : 1),
									1);
							if (void 0 !== a)
							{
								var g = e
									.getLabels(),
									h = g
									.indexOf(a);
								b = -1 !== h ?
									h : b
							}
							if (e
							.isHorizontal())
							{
								var i = e
									.width - (e
										.paddingLeft +
										e
										.paddingRight
										),
									j = i / f,
									k = j * (b -
										e
										.minIndex
										) + e
									.paddingLeft;
								return e.options
									.gridLines
									.offsetGridLines &&
									d && (k +=
										j / 2),
									e.left +
									Math.round(
										k)
							}
							var l = e.height - (
									e
									.paddingTop +
									e
									.paddingBottom
									),
								m = l / f,
								n = m * (b - e
									.minIndex) +
								e.paddingTop;
							return e.options
								.gridLines
								.offsetGridLines &&
								d && (n += m /
									2), e.top +
								Math.round(n)
						},
						getPixelForTick: function(a,
							b)
						{
							return this
								.getPixelForValue(
									this.ticks[
										a], a +
									this
									.minIndex,
									null, b)
						},
						getValueForPixel: function(
							a)
						{
							var b = this,
								c = Math.max(b
									.ticks
									.length - (b
										.options
										.gridLines
										.offsetGridLines ?
										0 : 1),
									1),
								d = b
								.isHorizontal(),
								e = d ? b
								.width - (b
									.paddingLeft +
									b
									.paddingRight
									) : b
								.height - (b
									.paddingTop +
									b
									.paddingBottom
									),
								f = e / c;
							return a -= d ? b
								.left : b.top, b
								.options
								.gridLines
								.offsetGridLines &&
								(a -= f / 2),
								a -= d ? b
								.paddingLeft : b
								.paddingTop,
								a <= 0 ? 0 :
								Math.round(a /
									f)
						},
						getBasePixel: function()
						{
							return this.bottom
						}
					});
				a.scaleService.registerScaleType(
					"category", d, c)
			}
		},
		{}],
		40: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				var b = a.helpers,
					c = {
						position: "left",
						ticks:
						{
							callback: function(a, c, d)
							{
								var e = d.length >
									3 ? d[2] - d[
									1] : d[1] - d[
									0];
								Math.abs(e) > 1 &&
									a !== Math
									.floor(a) && (
										e = a - Math
										.floor(a));
								var f = b.log10(Math
										.abs(e)),
									g = "";
								if (0 !== a)
								{
									var h = -1 *
										Math.floor(
											f);
									h = Math.max(
											Math
											.min(h,
												20),
											0), g =
										a.toFixed(h)
								}
								else g = "0";
								return g
							}
						}
					},
					d = a.LinearScaleBase.extend(
					{
						determineDataLimits: function()
						{
							function a(a)
							{
								return h ? a
									.xAxisID ===
									c.id : a
									.yAxisID ===
									c.id
							}
							var c = this,
								d = c.options,
								e = c.chart,
								f = e.data,
								g = f.datasets,
								h = c
								.isHorizontal();
							if (c.min = null, c
								.max = null, d
								.stacked)
							{
								var i = {},
									j = !1,
									k = !1;
								b.each(g,
										function(
											f, g
											)
										{
											var h =
												e
												.getDatasetMeta(
													g
													);
											void 0
												===
												i[h
													.type] &&
												(i[h.type] = {
													positiveValues: [],
													negativeValues: []
												});
											var l =
												i[h
													.type]
												.positiveValues,
												m =
												i[h
													.type]
												.negativeValues;
											e.isDatasetVisible(
													g
													) &&
												a(
													h) &&
												b
												.each(
													f
													.data,
													function(
														a,
														b
														)
													{
														var e = +
															c
															.getRightValue(
																a
																);
														isNaN
															(
																e) ||
															h
															.data[
																b
																]
															.hidden ||
															(l[b] =
																l[
																	b] ||
																0,
																m[
																	b] =
																m[
																	b] ||
																0,
																d
																.relativePoints ?
																l[
																	b] =
																100 :
																e <
																0 ?
																(k = !
																	0,
																	m[
																		b] +=
																	e
																	) :
																(j = !
																	0,
																	l[
																		b] +=
																	e
																	)
																)
													}
													)
										}), b
									.each(i,
										function(
											a)
										{
											var d =
												a
												.positiveValues
												.concat(
													a
													.negativeValues
													),
												e =
												b
												.min(
													d
													),
												f =
												b
												.max(
													d
													);
											c.min =
												null ===
												c
												.min ?
												e :
												Math
												.min(
													c
													.min,
													e
													),
												c
												.max =
												null ===
												c
												.max ?
												f :
												Math
												.max(
													c
													.max,
													f
													)
										})
							}
							else b.each(g,
								function(d,
									f)
								{
									var g =
										e
										.getDatasetMeta(
											f
											);
									e.isDatasetVisible(
											f
											) &&
										a(
										g) &&
										b
										.each(
											d
											.data,
											function(
												a,
												b
												)
											{
												var d = +
													c
													.getRightValue(
														a
														);
												isNaN
													(
														d) ||
													g
													.data[
														b
														]
													.hidden ||
													(null ===
														c
														.min ?
														c
														.min =
														d :
														d <
														c
														.min &&
														(c.min =
															d
															),
														null ===
														c
														.max ?
														c
														.max =
														d :
														d >
														c
														.max &&
														(c.max =
															d
															)
														)
											}
											)
								});
							this.handleTickRangeOptions()
						},
						getTickLimit: function()
						{
							var c, d = this,
								e = d.options
								.ticks;
							if (d
							.isHorizontal()) c =
								Math.min(e
									.maxTicksLimit ?
									e
									.maxTicksLimit :
									11, Math
									.ceil(d
										.width /
										50));
							else
							{
								var f = b
									.getValueOrDefault(
										e
										.fontSize,
										a
										.defaults
										.global
										.defaultFontSize
										);
								c = Math.min(e
									.maxTicksLimit ?
									e
									.maxTicksLimit :
									11, Math
									.ceil(d
										.height /
										(2 *
											f)
										))
							}
							return c
						},
						handleDirectionalChanges: function()
						{
							this.isHorizontal() ||
								this.ticks
								.reverse()
						},
						getLabelForIndex: function(
							a, b)
						{
							return +this
								.getRightValue(
									this.chart
									.data
									.datasets[b]
									.data[a])
						},
						getPixelForValue: function(
							a)
						{
							var b, c, d = this,
								e = d
								.paddingLeft,
								f = d
								.paddingBottom,
								g = d.start,
								h = +d
								.getRightValue(
									a),
								i = d.end - g;
							return d
								.isHorizontal() ?
								(c = d.width - (
										e + d
										.paddingRight
										), b = d
									.left + c /
									i * (h - g),
									Math.round(
										b + e)
									) : (c = d
									.height - (d
										.paddingTop +
										f), b =
									d.bottom -
									f - c / i *
									(h - g),
									Math.round(
										b))
						},
						getValueForPixel: function(
							a)
						{
							var b = this,
								c = b
								.isHorizontal(),
								d = b
								.paddingLeft,
								e = b
								.paddingBottom,
								f = c ? b
								.width - (d + b
									.paddingRight
									) : b
								.height - (b
									.paddingTop +
									e),
								g = (c ? a - b
									.left - d :
									b.bottom -
									e - a) / f;
							return b.start + (b
								.end - b
								.start) * g
						},
						getPixelForTick: function(a)
						{
							return this
								.getPixelForValue(
									this
									.ticksAsNumbers[
										a])
						}
					});
				a.scaleService.registerScaleType(
					"linear", d, c)
			}
		},
		{}],
		41: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				var b = a.helpers,
					c = b.noop;
				a.LinearScaleBase = a.Scale.extend(
				{
					handleTickRangeOptions: function()
					{
						var a = this,
							c = a.options,
							d = c.ticks;
						if (d.beginAtZero)
						{
							var e = b.sign(a
									.min),
								f = b.sign(a
									.max);
							e < 0 && f < 0 ?
								a.max = 0 :
								e > 0 && f >
								0 && (a
									.min = 0
									)
						}
						void 0 !== d.min ? a
							.min = d.min :
							void 0 !== d
							.suggestedMin &&
							(a.min = Math
								.min(a.min,
									d
									.suggestedMin
									)),
							void 0 !== d
							.max ? a.max = d
							.max :
							void 0 !== d
							.suggestedMax &&
							(a.max = Math
								.max(a.max,
									d
									.suggestedMax
									)), a
							.min === a
							.max && (a
								.max++, d
								.beginAtZero ||
								a.min--)
					},
					getTickLimit: c,
					handleDirectionalChanges: c,
					buildTicks: function()
					{
						var a = this,
							c = a.options,
							d = a
						.ticks = [],
							e = c.ticks,
							f = b
							.getValueOrDefault,
							g = a
							.getTickLimit();
						g = Math.max(2, g);
						var h;
						if (e
							.fixedStepSize &&
							e
							.fixedStepSize >
							0 || e
							.stepSize && e
							.stepSize > 0)
							h = f(e
								.fixedStepSize,
								e.stepSize);
						else
						{
							var i = b
								.niceNum(a
									.max - a
									.min, !1
									);
							h = b.niceNum(
								i / (g -
									1),
								!0)
						}
						var j = Math.floor(a
								.min / h) *
							h,
							k = Math.ceil(a
								.max / h) *
							h,
							l = (k - j) / h;
						l = b.almostEquals(
								l, Math
								.round(l),
								h / 1e3) ?
							Math.round(l) :
							Math.ceil(l), d
							.push(void 0 !==
								e.min ? e
								.min : j);
						for (var m = 1; m <
							l; ++m) d.push(
							j + m * h);
						d.push(void 0 !== e
								.max ? e
								.max : k), a
							.handleDirectionalChanges(),
							a.max = b.max(
							d), a.min = b
							.min(d), e
							.reverse ? (d
								.reverse(),
								a.start = a
								.max, a
								.end = a.min
								) : (a
								.start = a
								.min, a
								.end = a.max
								)
					},
					convertTicksToLabels: function()
					{
						var b = this;
						b.ticksAsNumbers = b
							.ticks.slice(),
							b
							.zeroLineIndex =
							b.ticks.indexOf(
								0), a.Scale
							.prototype
							.convertTicksToLabels
							.call(b)
					}
				})
			}
		},
		{}],
		42: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				var b = a.helpers,
					c = {
						position: "left",
						ticks:
						{
							callback: function(a, c, d)
							{
								var e = a / Math
									.pow(10, Math
										.floor(b
											.log10(
												a))
										);
								return 1 === e ||
									2 === e || 5 ===
									e || 0 === c ||
									c === d.length -
									1 ? a
									.toExponential() :
									""
							}
						}
					},
					d = a.Scale.extend(
					{
						determineDataLimits: function()
						{
							function a(a)
							{
								return j ? a
									.xAxisID ===
									c.id : a
									.yAxisID ===
									c.id
							}
							var c = this,
								d = c.options,
								e = d.ticks,
								f = c.chart,
								g = f.data,
								h = g.datasets,
								i = b
								.getValueOrDefault,
								j = c
								.isHorizontal();
							if (c.min = null, c
								.max = null, d
								.stacked)
							{
								var k = {};
								b.each(h,
										function(
											e, g
											)
										{
											var h =
												f
												.getDatasetMeta(
													g
													);
											f.isDatasetVisible(
													g
													) &&
												a(
													h) &&
												(void 0 ===
													k[h
														.type] &&
													(k[h
													.type] = []),
													b
													.each(
														e
														.data,
														function(
															a,
															b
															)
														{
															var e =
																k[h
																	.type],
																f = +
																c
																.getRightValue(
																	a
																	);
															isNaN
																(
																	f) ||
																h
																.data[
																	b
																	]
																.hidden ||
																(e[b] =
																	e[
																		b] ||
																	0,
																	d
																	.relativePoints ?
																	e[
																		b] =
																	100 :
																	e[
																		b] +=
																	f
																	)
														}
														)
													)
										}), b
									.each(k,
										function(
											a)
										{
											var d =
												b
												.min(
													a
													),
												e =
												b
												.max(
													a
													);
											c.min =
												null ===
												c
												.min ?
												d :
												Math
												.min(
													c
													.min,
													d
													),
												c
												.max =
												null ===
												c
												.max ?
												e :
												Math
												.max(
													c
													.max,
													e
													)
										})
							}
							else b.each(h,
								function(d,
									e)
								{
									var g =
										f
										.getDatasetMeta(
											e
											);
									f.isDatasetVisible(
											e
											) &&
										a(
										g) &&
										b
										.each(
											d
											.data,
											function(
												a,
												b
												)
											{
												var d = +
													c
													.getRightValue(
														a
														);
												isNaN
													(
														d) ||
													g
													.data[
														b
														]
													.hidden ||
													(null ===
														c
														.min ?
														c
														.min =
														d :
														d <
														c
														.min &&
														(c.min =
															d
															),
														null ===
														c
														.max ?
														c
														.max =
														d :
														d >
														c
														.max &&
														(c.max =
															d
															)
														)
											}
											)
								});
							c.min = i(e.min, c
									.min), c
								.max = i(e.max,
									c.max), c
								.min === c
								.max && (0 !== c
									.min &&
									null !== c
									.min ? (c
										.min =
										Math
										.pow(10,
											Math
											.floor(
												b
												.log10(
													c
													.min
													)
												) -
											1),
										c.max =
										Math
										.pow(10,
											Math
											.floor(
												b
												.log10(
													c
													.max
													)
												) +
											1)
										) : (c
										.min =
										1, c
										.max =
										10))
						},
						buildTicks: function()
						{
							for (var a = this,
									c = a
									.options,
									d = c.ticks,
									e = b
									.getValueOrDefault,
									f = a
									.ticks = [],
									g = e(d.min,
										Math
										.pow(10,
											Math
											.floor(
												b
												.log10(
													a
													.min
													)
												)
											)
										); g < a
								.max;)
							{
								f.push(g);
								var h = Math
									.floor(b
										.log10(
											g)),
									i = Math
									.floor(g /
										Math
										.pow(10,
											h)
										) + 1;
								10 === i && (i =
										1, ++h),
									g = i * Math
									.pow(10, h)
							}
							var j = e(d.max, g);
							f.push(j), a
								.isHorizontal() ||
								f.reverse(), a
								.max = b.max(f),
								a.min = b.min(
								f), d.reverse ?
								(f.reverse(), a
									.start = a
									.max, a
									.end = a.min
									) : (a
									.start = a
									.min, a
									.end = a.max
									)
						},
						convertTicksToLabels: function()
						{
							this.tickValues =
								this.ticks
								.slice(), a
								.Scale.prototype
								.convertTicksToLabels
								.call(this)
						},
						getLabelForIndex: function(
							a, b)
						{
							return +this
								.getRightValue(
									this.chart
									.data
									.datasets[b]
									.data[a])
						},
						getPixelForTick: function(a)
						{
							return this
								.getPixelForValue(
									this
									.tickValues[
										a])
						},
						getPixelForValue: function(
							a)
						{
							var c, d, e = this,
								f = e.start,
								g = +e
								.getRightValue(
									a),
								h = b.log10(e
									.end) - b
								.log10(f),
								i = e
								.paddingTop,
								j = e
								.paddingBottom,
								k = e
								.paddingLeft;
							return e
								.isHorizontal() ?
								0 === g ? d = e
								.left + k : (c =
									e.width - (
										k + e
										.paddingRight
										), d = e
									.left + c /
									h * (b
										.log10(
											g) -
										b.log10(
											f)),
									d += k) :
								0 === g ? d = e
								.top + i : (c =
									e.height - (
										i + j),
									d = e
									.bottom -
									j - c / h *
									(b.log10(
										g) - b
										.log10(
											f))
									), d
						},
						getValueForPixel: function(
							a)
						{
							var c, d, e = this,
								f = b.log10(e
									.end) - b
								.log10(e.start);
							return e
								.isHorizontal() ?
								(d = e.width - (
										e
										.paddingLeft +
										e
										.paddingRight
										), c = e
									.start *
									Math.pow(10,
										(a - e
											.left -
											e
											.paddingLeft
											) *
										f / d)
									) : (d = e
									.height - (e
										.paddingTop +
										e
										.paddingBottom
										), c =
									Math.pow(10,
										(e.bottom -
											e
											.paddingBottom -
											a) *
										f / d) /
									e.start), c
						}
					});
				a.scaleService.registerScaleType(
					"logarithmic", d, c)
			}
		},
		{}],
		43: [function(a, b, c)
		{
			"use strict";
			b.exports = function(a)
			{
				var b = a.helpers,
					c = a.defaults.global,
					d = {
						display: !0,
						animate: !0,
						lineArc: !1,
						position: "chartArea",
						angleLines:
						{
							display: !0,
							color: "rgba(0, 0, 0, 0.1)",
							lineWidth: 1
						},
						ticks:
						{
							showLabelBackdrop: !0,
							backdropColor: "rgba(255,255,255,0.75)",
							backdropPaddingY: 2,
							backdropPaddingX: 2
						},
						pointLabels:
						{
							fontSize: 10,
							callback: function(a)
							{
								return a
							}
						}
					},
					e = a.LinearScaleBase.extend(
					{
						getValueCount: function()
						{
							return this.chart
								.data.labels
								.length
						},
						setDimensions: function()
						{
							var a = this,
								d = a.options,
								e = d.ticks;
							a.width = a
								.maxWidth, a
								.height = a
								.maxHeight, a
								.xCenter = Math
								.round(a.width /
									2), a
								.yCenter = Math
								.round(a
									.height / 2
									);
							var f = b.min([a
									.height,
									a.width
								]),
								g = b
								.getValueOrDefault(
									e.fontSize,
									c
									.defaultFontSize
									);
							a.drawingArea = d
								.display ? f /
								2 - (g / 2 + e
									.backdropPaddingY
									) : f / 2
						},
						determineDataLimits: function()
						{
							var a = this,
								c = a.chart;
							a.min = null, a
								.max = null, b
								.each(c.data
									.datasets,
									function(d,
										e)
									{
										if (c
											.isDatasetVisible(
												e
												)
											)
										{
											var f =
												c
												.getDatasetMeta(
													e
													);
											b.each(d.data,
												function(
													b,
													c
													)
												{
													var d = +
														a
														.getRightValue(
															b
															);
													isNaN
														(
															d) ||
														f
														.data[
															c
															]
														.hidden ||
														(null ===
															a
															.min ?
															a
															.min =
															d :
															d <
															a
															.min &&
															(a.min =
																d
																),
															null ===
															a
															.max ?
															a
															.max =
															d :
															d >
															a
															.max &&
															(a.max =
																d
																)
															)
												}
												)
										}
									}), a
								.handleTickRangeOptions()
						},
						getTickLimit: function()
						{
							var a = this.options
								.ticks,
								d = b
								.getValueOrDefault(
									a.fontSize,
									c
									.defaultFontSize
									);
							return Math.min(a
								.maxTicksLimit ?
								a
								.maxTicksLimit :
								11, Math
								.ceil(this
									.drawingArea /
									(1.5 *
										d)))
						},
						convertTicksToLabels: function()
						{
							var b = this;
							a.LinearScaleBase
								.prototype
								.convertTicksToLabels
								.call(b), b
								.pointLabels = b
								.chart.data
								.labels.map(b
									.options
									.pointLabels
									.callback, b
									)
						},
						getLabelForIndex: function(
							a, b)
						{
							return +this
								.getRightValue(
									this.chart
									.data
									.datasets[b]
									.data[a])
						},
						fit: function()
						{
							var a, d, e, f, g,
								h, i, j, k, l,
								m, n, o = this
								.options
								.pointLabels,
								p = b
								.getValueOrDefault(
									o.fontSize,
									c
									.defaultFontSize
									),
								q = b
								.getValueOrDefault(
									o.fontStyle,
									c
									.defaultFontStyle
									),
								r = b
								.getValueOrDefault(
									o
									.fontFamily,
									c
									.defaultFontFamily
									),
								s = b
								.fontString(p,
									q, r),
								t = b.min([this
									.height /
									2 - p -
									5, this
									.width /
									2
								]),
								u = this.width,
								v = 0;
							for (this.ctx.font =
								s, d = 0; d <
								this
								.getValueCount(); d++
								)
							{
								a = this
									.getPointPosition(
										d, t),
									e = this.ctx
									.measureText(
										this
										.pointLabels[
											d] ?
										this
										.pointLabels[
											d] :
										"")
									.width + 5;
								var w = this
									.getIndexAngle(
										d) +
									Math.PI / 2,
									x = 360 *
									w / (2 *
										Math.PI
										) % 360;
								0 === x ||
									180 === x ?
									(f = e / 2,
										a.x +
										f > u &&
										(u = a
											.x +
											f,
											g =
											d),
										a.x -
										f < v &&
										(v = a
											.x -
											f,
											i =
											d)
										) : x <
									180 ? a.x +
									e > u && (
										u = a
										.x + e,
										g = d) :
									a.x - e <
									v && (v = a
										.x - e,
										i = d)
							}
							k = v, l = Math
								.ceil(u - this
									.width), h =
								this
								.getIndexAngle(
									g), j = this
								.getIndexAngle(
									i), m = l /
								Math.sin(h +
									Math.PI / 2
									), n = k /
								Math.sin(j +
									Math.PI / 2
									), m = b
								.isNumber(m) ?
								m : 0, n = b
								.isNumber(n) ?
								n : 0, this
								.drawingArea =
								Math.round(t - (
										n + m) /
									2), this
								.setCenterPoint(
									n, m)
						},
						setCenterPoint: function(a,
							b)
						{
							var c = this,
								d = c.width -
								b - c
								.drawingArea,
								e = a + c
								.drawingArea;
							c.xCenter = Math
								.round((e + d) /
									2 + c.left),
								c.yCenter = Math
								.round(c
									.height /
									2 + c.top)
						},
						getIndexAngle: function(a)
						{
							var b = 2 * Math
								.PI / this
								.getValueCount(),
								c = this.chart
								.options && this
								.chart.options
								.startAngle ?
								this.chart
								.options
								.startAngle : 0,
								d = c * Math
								.PI * 2 / 360;
							return a * b - Math
								.PI / 2 + d
						},
						getDistanceFromCenterForValue: function(
							a)
						{
							var b = this;
							if (null === a)
								return 0;
							var c = b
								.drawingArea / (
									b.max - b
									.min);
							return b.options
								.reverse ? (b
									.max - a) *
								c : (a - b
								.min) * c
						},
						getPointPosition: function(
							a, b)
						{
							var c = this,
								d = c
								.getIndexAngle(
									a);
							return {
								x: Math.round(
										Math
										.cos(
										d) * b
										) + c
									.xCenter,
								y: Math.round(
										Math
										.sin(
										d) * b
										) + c
									.yCenter
							}
						},
						getPointPositionForValue: function(
							a, b)
						{
							return this
								.getPointPosition(
									a, this
									.getDistanceFromCenterForValue(
										b))
						},
						getBasePosition: function()
						{
							var a = this,
								b = a.min,
								c = a.max;
							return a
								.getPointPositionForValue(
									0, a
									.beginAtZero ?
									0 : b < 0 &&
									c < 0 ? c :
									b > 0 && c >
									0 ? b : 0)
						},
						draw: function()
						{
							var a = this,
								d = a.options,
								e = d.gridLines,
								f = d.ticks,
								g = d
								.angleLines,
								h = d
								.pointLabels,
								i = b
								.getValueOrDefault;
							if (d.display)
							{
								var j = a.ctx,
									k = i(f
										.fontSize,
										c
										.defaultFontSize
										),
									l = i(f
										.fontStyle,
										c
										.defaultFontStyle
										),
									m = i(f
										.fontFamily,
										c
										.defaultFontFamily
										),
									n = b
									.fontString(
										k, l, m
										);
								if (b.each(a
										.ticks,
										function(
											g, h
											)
										{
											if (h >
												0 ||
												d
												.reverse
												)
											{
												var l =
													a
													.getDistanceFromCenterForValue(
														a
														.ticksAsNumbers[
															h
															]
														),
													m =
													a
													.yCenter -
													l;
												if (e
													.display &&
													0 !==
													h
													)
													if (j
														.strokeStyle =
														b
														.getValueAtIndexOrDefault(
															e
															.color,
															h -
															1
															),
														j
														.lineWidth =
														b
														.getValueAtIndexOrDefault(
															e
															.lineWidth,
															h -
															1
															),
														d
														.lineArc
														)
														j
														.beginPath(),
														j
														.arc(
															a
															.xCenter,
															a
															.yCenter,
															l,
															0,
															2 *
															Math
															.PI
															),
														j
														.closePath(),
														j
														.stroke();
													else
													{
														j
													.beginPath();
														for (
															var o =
																0; o <
															a
															.getValueCount(); o++
															)
														{
															var p =
																a
																.getPointPosition(
																	o,
																	l
																	);
															0 ===
																o ?
																j
																.moveTo(
																	p
																	.x,
																	p
																	.y
																	) :
																j
																.lineTo(
																	p
																	.x,
																	p
																	.y
																	)
														}
														j.closePath(),
															j
															.stroke()
													} if (
													f
													.display
													)
												{
													var q =
														i(f.fontColor,
															c
															.defaultFontColor
															);
													if (j
														.font =
														n,
														f
														.showLabelBackdrop
														)
													{
														var r =
															j
															.measureText(
																g
																)
															.width;
														j.fillStyle =
															f
															.backdropColor,
															j
															.fillRect(
																a
																.xCenter -
																r /
																2 -
																f
																.backdropPaddingX,
																m -
																k /
																2 -
																f
																.backdropPaddingY,
																r +
																2 *
																f
																.backdropPaddingX,
																k +
																2 *
																f
																.backdropPaddingY
																)
													}
													j.textAlign =
														"center",
														j
														.textBaseline =
														"middle",
														j
														.fillStyle =
														q,
														j
														.fillText(
															g,
															a
															.xCenter,
															m
															)
												}
											}
										}), !d
									.lineArc)
								{
									j.lineWidth =
										g
										.lineWidth,
										j
										.strokeStyle =
										g.color;
									for (var o =
											a
											.getDistanceFromCenterForValue(
												d
												.reverse ?
												a
												.min :
												a
												.max
												),
											p =
											i(h.fontSize,
												c
												.defaultFontSize
												),
											q =
											i(h.fontStyle,
												c
												.defaultFontStyle
												),
											r =
											i(h.fontFamily,
												c
												.defaultFontFamily
												),
											s =
											b
											.fontString(
												p,
												q,
												r
												),
											t =
											a
											.getValueCount() -
											1; t >=
										0; t--)
									{
										if (g
											.display
											)
										{
											var u =
												a
												.getPointPosition(
													t,
													o
													);
											j.beginPath(),
												j
												.moveTo(
													a
													.xCenter,
													a
													.yCenter
													),
												j
												.lineTo(
													u
													.x,
													u
													.y
													),
												j
												.stroke(),
												j
												.closePath()
										}
										var v =
											a
											.getPointPosition(
												t,
												o +
												5
												),
											w =
											i(h.fontColor,
												c
												.defaultFontColor
												);
										j.font =
											s, j
											.fillStyle =
											w;
										var x =
											a
											.pointLabels,
											y =
											this
											.getIndexAngle(
												t
												) +
											Math
											.PI /
											2,
											z =
											360 *
											y /
											(2 * Math
												.PI
												) %
											360;
										j.textAlign =
											0 ===
											z ||
											180 ===
											z ?
											"center" :
											z <
											180 ?
											"left" :
											"right",
											j
											.textBaseline =
											90 ===
											z ||
											270 ===
											z ?
											"middle" :
											z >
											270 ||
											z <
											90 ?
											"bottom" :
											"top",
											j
											.fillText(
												x[
													t] ?
												x[
													t] :
												"",
												v
												.x,
												v
												.y
												)
									}
								}
							}
						}
					});
				a.scaleService.registerScaleType(
					"radialLinear", e, d)
			}
		},
		{}],
		44: [function(a, b, c)
		{
			"use strict";
			var d = a(6);
			d = "function" == typeof d ? d : window.moment,
				b.exports = function(a)
				{
					var b = a.helpers,
						c = {
							units: [
							{
								name: "millisecond",
								steps: [1, 2, 5, 10,
									20, 50, 100,
									250, 500
								]
							},
							{
								name: "second",
								steps: [1, 2, 5, 10,
									30
								]
							},
							{
								name: "minute",
								steps: [1, 2, 5, 10,
									30
								]
							},
							{
								name: "hour",
								steps: [1, 2, 3, 6,
									12
								]
							},
							{
								name: "day",
								steps: [1, 2, 5]
							},
							{
								name: "week",
								maxStep: 4
							},
							{
								name: "month",
								maxStep: 3
							},
							{
								name: "quarter",
								maxStep: 4
							},
							{
								name: "year",
								maxStep: !1
							}]
						},
						e = {
							position: "bottom",
							time:
							{
								parser: !1,
								format: !1,
								unit: !1,
								round: !1,
								displayFormat: !1,
								isoWeekday: !1,
								displayFormats:
								{
									millisecond: "h:mm:ss.SSS a",
									second: "h:mm:ss a",
									minute: "h:mm:ss a",
									hour: "MMM D, hA",
									day: "ll",
									week: "ll",
									month: "MMM YYYY",
									quarter: "[Q]Q - YYYY",
									year: "YYYY"
								}
							},
							ticks:
							{
								autoSkip: !1
							}
						},
						f = a.Scale.extend(
						{
							initialize: function()
							{
								if (!d) throw new Error(
									"Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com"
									);
								a.Scale.prototype
									.initialize
									.call(this)
							},
							getLabelMoment: function(a,
								b)
							{
								return void 0 !==
									this
									.labelMoments[
									a] ? this
									.labelMoments[a]
									[b] : null
							},
							getMomentStartOf: function(
								a)
							{
								var b = this;
								return "week" === b
									.options.time
									.unit && !1 !==
									b.options.time
									.isoWeekday ? a
									.clone()
									.startOf(
										"isoWeek")
									.isoWeekday(b
										.options
										.time
										.isoWeekday
										) : a
									.clone()
									.startOf(b
										.tickUnit)
							},
							determineDataLimits: function()
							{
								var a = this;
								a.labelMoments = [];
								var c = [];
								a.chart.data
									.labels && a
									.chart.data
									.labels.length >
									0 ? (b.each(a
											.chart
											.data
											.labels,
											function(
												b)
											{
												var d =
													a
													.parseTime(
														b
														);
												d.isValid() &&
													(a.options
														.time
														.round &&
														d
														.startOf(
															a
															.options
															.time
															.round
															),
														c
														.push(
															d
															)
														)
											}, a), a
										.firstTick =
										d.min.call(
											a, c), a
										.lastTick =
										d.max.call(
											a, c)) :
									(a.firstTick =
										null, a
										.lastTick =
										null), b
									.each(a.chart
										.data
										.datasets,
										function(e,
											f)
										{
											var g = [],
												h =
												a
												.chart
												.isDatasetVisible(
													f
													);
											"object" ==
											typeof e
												.data[
													0
													] &&
												null !==
												e
												.data[
													0
													] ?
												b
												.each(
													e
													.data,
													function(
														b
														)
													{
														var c =
															a
															.parseTime(
																a
																.getRightValue(
																	b
																	)
																);
														c.isValid() &&
															(a.options
																.time
																.round &&
																c
																.startOf(
																	a
																	.options
																	.time
																	.round
																	),
																g
																.push(
																	c
																	),
																h &&
																(a.firstTick =
																	null !==
																	a
																	.firstTick ?
																	d
																	.min(
																		a
																		.firstTick,
																		c
																		) :
																	c,
																	a
																	.lastTick =
																	null !==
																	a
																	.lastTick ?
																	d
																	.max(
																		a
																		.lastTick,
																		c
																		) :
																	c
																	)
																)
													},
													a
													) :
												g =
												c, a
												.labelMoments
												.push(
													g
													)
										}, a), a
									.options.time
									.min && (a
										.firstTick =
										a.parseTime(
											a
											.options
											.time
											.min)),
									a.options.time
									.max && (a
										.lastTick =
										a.parseTime(
											a
											.options
											.time
											.max)),
									a.firstTick = (a
										.firstTick ||
										d())
								.clone(), a
									.lastTick = (a
										.lastTick ||
										d()).clone()
							},
							buildTicks: function()
							{
								var d = this;
								d.ctx.save();
								var e = b
									.getValueOrDefault(
										d.options
										.ticks
										.fontSize, a
										.defaults
										.global
										.defaultFontSize
										),
									f = b
									.getValueOrDefault(
										d.options
										.ticks
										.fontStyle,
										a.defaults
										.global
										.defaultFontStyle
										),
									g = b
									.getValueOrDefault(
										d.options
										.ticks
										.fontFamily,
										a.defaults
										.global
										.defaultFontFamily
										),
									h = b
									.fontString(e,
										f, g);
								if (d.ctx.font = h,
									d.ticks = [], d
									.unitScale = 1,
									d
									.scaleSizeInUnits =
									0, d.options
									.time.unit) d
									.tickUnit = d
									.options.time
									.unit || "day",
									d
									.displayFormat =
									d.options.time
									.displayFormats[
										d.tickUnit],
									d
									.scaleSizeInUnits =
									d.lastTick.diff(
										d.firstTick,
										d.tickUnit,
										!0), d
									.unitScale = b
									.getValueOrDefault(
										d.options
										.time
										.unitStepSize,
										1);
								else
								{
									var i = d
										.isHorizontal() ?
										d.width - (d
											.paddingLeft +
											d
											.paddingRight
											) : d
										.height - (d
											.paddingTop +
											d
											.paddingBottom
											),
										j = d
										.tickFormatFunction(
											d
											.firstTick,
											0, []),
										k = d.ctx
										.measureText(
											j)
										.width;
									k = k * Math
										.cos(b
											.toRadians(
												d
												.options
												.ticks
												.maxRotation
												)) +
										e * Math
										.sin(b
											.toRadians(
												d
												.options
												.ticks
												.maxRotation
												));
									var l = i / k;
									d.tickUnit =
										"millisecond",
										d
										.scaleSizeInUnits =
										d.lastTick
										.diff(d
											.firstTick,
											d
											.tickUnit,
											!0), d
										.displayFormat =
										d.options
										.time
										.displayFormats[
											d
											.tickUnit
											];
									for (var m = 0,
											n = c
											.units[
												m]; m <
										c.units
										.length;)
									{
										if (d
											.unitScale =
											1, b
											.isArray(
												n
												.steps
												) &&
											Math
											.ceil(d
												.scaleSizeInUnits /
												l) <
											b.max(n
												.steps
												))
										{
											for (var o =
													0; o <
												n
												.steps
												.length; ++
												o)
												if (n
													.steps[
														o
														] >=
													Math
													.ceil(
														d
														.scaleSizeInUnits /
														l
														)
													)
												{
													d.unitScale =
														b
														.getValueOrDefault(
															d
															.options
															.time
															.unitStepSize,
															n
															.steps[
																o
																]
															);
													break
												} break
										}
										if (!1 === n
											.maxStep ||
											Math
											.ceil(d
												.scaleSizeInUnits /
												l) <
											n
											.maxStep
											)
										{
											d.unitScale =
												b
												.getValueOrDefault(
													d
													.options
													.time
													.unitStepSize,
													Math
													.ceil(
														d
														.scaleSizeInUnits /
														l
														)
													);
											break
										}++m, n = c
											.units[
												m],
											d
											.tickUnit =
											n.name;
										var p = d
											.firstTick
											.diff(d
												.getMomentStartOf(
													d
													.firstTick
													),
												d
												.tickUnit,
												!0),
											q = d
											.getMomentStartOf(
												d
												.lastTick
												.clone()
												.add(
													1,
													d
													.tickUnit
													)
												)
											.diff(d
												.lastTick,
												d
												.tickUnit,
												!0);
										d.scaleSizeInUnits =
											d
											.lastTick
											.diff(d
												.firstTick,
												d
												.tickUnit,
												!0
												) +
											p + q, d
											.displayFormat =
											d
											.options
											.time
											.displayFormats[
												n
												.name
												]
									}
								}
								var r;
								if (d.options.time
									.min ? r = d
									.getMomentStartOf(
										d.firstTick
										) : (d
										.firstTick =
										d
										.getMomentStartOf(
											d
											.firstTick
											), r = d
										.firstTick),
									!d.options.time
									.max)
								{
									var s = d
										.getMomentStartOf(
											d
											.lastTick
											),
										t = s.diff(d
											.lastTick,
											d
											.tickUnit,
											!0);
									t < 0 ? d
										.lastTick =
										d
										.getMomentStartOf(
											d
											.lastTick
											.add(1,
												d
												.tickUnit
												)) :
										t >= 0 && (d
											.lastTick =
											s), d
										.scaleSizeInUnits =
										d.lastTick
										.diff(d
											.firstTick,
											d
											.tickUnit,
											!0)
								}
								d.smallestLabelSeparation =
									d.width, b.each(
										d.chart.data
										.datasets,
										function(a,
											b)
										{
											for (var c =
													1; c <
												d
												.labelMoments[
													b
													]
												.length; c++
												) d
												.smallestLabelSeparation =
												Math
												.min(
													d
													.smallestLabelSeparation,
													d
													.labelMoments[
														b
														]
													[
														c]
													.diff(
														d
														.labelMoments[
															b
															]
														[c -
															1],
														d
														.tickUnit,
														!
														0
														)
													)
										}, d), d
									.options.time
									.displayFormat &&
									(d.displayFormat =
										d.options
										.time
										.displayFormat
										), d.ticks
									.push(d
										.firstTick
										.clone());
								for (var u = 1; u <=
									d
									.scaleSizeInUnits; ++
									u)
								{
									var v = r
										.clone()
										.add(u, d
											.tickUnit
											);
									if (d.options
										.time.max &&
										v.diff(d
											.lastTick,
											d
											.tickUnit,
											!0) >= 0
										) break;
									u % d
										.unitScale ==
										0 && d.ticks
										.push(v)
								}
								0 === d.ticks[d
										.ticks
										.length - 1]
									.diff(d
										.lastTick, d
										.tickUnit
										) && 0 !== d
									.scaleSizeInUnits ||
									(d.options.time
										.max ? (d
											.ticks
											.push(d
												.lastTick
												.clone()
												), d
											.scaleSizeInUnits =
											d
											.lastTick
											.diff(d
												.ticks[
													0
													],
												d
												.tickUnit,
												!0)
											) : (d
											.ticks
											.push(d
												.lastTick
												.clone()
												), d
											.scaleSizeInUnits =
											d
											.lastTick
											.diff(d
												.firstTick,
												d
												.tickUnit,
												!0))
										), d.ctx
									.restore()
							},
							getLabelForIndex: function(
								a, b)
							{
								var c = this,
									d = c.chart.data
									.labels && a < c
									.chart.data
									.labels.length ?
									c.chart.data
									.labels[a] : "";
								return "object" ==
									typeof c.chart
									.data.datasets[
										b].data[
									0] && (d = c
										.getRightValue(
											c.chart
											.data
											.datasets[
												b]
											.data[a]
											)), c
									.options.time
									.tooltipFormat &&
									(d = c
										.parseTime(
											d)
										.format(c
											.options
											.time
											.tooltipFormat
											)), d
							},
							tickFormatFunction: function(
								a, c, d)
							{
								var e = a.format(
										this
										.displayFormat
										),
									f = this.options
									.ticks,
									g = b
									.getValueOrDefault(
										f.callback,
										f
										.userCallback
										);
								return g ? g(e, c,
									d) : e
							},
							convertTicksToLabels: function()
							{
								var a = this;
								a.tickMoments = a
									.ticks, a
									.ticks = a.ticks
									.map(a
										.tickFormatFunction,
										a)
							},
							getPixelForValue: function(
								a, b, c)
							{
								var e = this;
								a && a.isValid || (
									a = d(e
										.getRightValue(
											a)));
								var f = a && a
									.isValid && a
									.isValid() ? a :
									e
									.getLabelMoment(
										c, b);
								if (f)
								{
									var g = f.diff(e
											.firstTick,
											e
											.tickUnit,
											!0),
										h = 0 !==
										g ? g / e
										.scaleSizeInUnits :
										g;
									if (e
										.isHorizontal()
										)
									{
										var i = e
											.width -
											(e.paddingLeft +
												e
												.paddingRight
												),
											j = i *
											h + e
											.paddingLeft;
										return e
											.left +
											Math
											.round(
												j)
									}
									var k = e
										.height - (e
											.paddingTop +
											e
											.paddingBottom
											),
										l = k * h +
										e
										.paddingTop;
									return e.top +
										Math.round(
											l)
								}
							},
							getPixelForTick: function(a)
							{
								return this
									.getPixelForValue(
										this
										.tickMoments[
											a],
										null, null)
							},
							getValueForPixel: function(
								a)
							{
								var b = this,
									c = b
									.isHorizontal() ?
									b.width - (b
										.paddingLeft +
										b
										.paddingRight
										) : b
									.height - (b
										.paddingTop +
										b
										.paddingBottom
										),
									e = (a - (b
										.isHorizontal() ?
										b.left +
										b
										.paddingLeft :
										b.top +
										b
										.paddingTop
										)) / c;
								return e *= b
									.scaleSizeInUnits,
									b.firstTick
									.clone().add(d
										.duration(e,
											b
											.tickUnit
											)
										.asSeconds(),
										"seconds")
							},
							parseTime: function(a)
							{
								var b = this;
								return "string" ==
									typeof b.options
									.time.parser ?
									d(a, b.options
										.time.parser
										) :
									"function" ==
									typeof b.options
									.time.parser ? b
									.options.time
									.parser(a) :
									"function" ==
									typeof a
									.getMonth ||
									"number" ==
									typeof a ? d(
									a) : a
									.isValid && a
									.isValid() ? a :
									"string" !=
									typeof b.options
									.time.format &&
									b.options.time
									.format.call ? (
										console
										.warn(
											"options.time.format is deprecated and replaced by options.time.parser. See http://nnnick.github.io/Chart.js/docs-v2/#scales-time-scale"
											), b
										.options
										.time
										.format(a)
										) : d(a, b
										.options
										.time.format
										)
							}
						});
					a.scaleService.registerScaleType("time",
						f, e)
				}
		},
		{
			6: 6
		}]
	},
	{}, [7])(7)
});
