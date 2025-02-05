! function(a, b)
{
	if ("function" == typeof define && define.amd) define(["jquery"], b);
	else if ("undefined" != typeof exports) b(require("jquery"));
	else
	{
		var c = {
			exports:
			{}
		};
		b(a.jquery), a.metisMenu = c.exports
	}
}(this, function(a)
{
	"use strict";

	function b(a, b)
	{
		if (!(a instanceof b)) throw new TypeError(
			"Cannot call a class as a function")
	}
	var c = (function(a)
			{
				a && a.__esModule
			}(a), "function" == typeof Symbol && "symbol" == typeof Symbol
			.iterator ? function(a)
			{
				return typeof a
			} : function(a)
			{
				return a && "function" == typeof Symbol && a.constructor ===
					Symbol && a !== Symbol.prototype ? "symbol" : typeof a
			}),
		d = function(a)
		{
			function b()
			{
				return {
					bindType: e.end,
					delegateType: e.end,
					handle: function(b)
					{
						if (a(b.target).is(this)) return b.handleObj
							.handler.apply(this, arguments)
					}
				}
			}

			function c()
			{
				if (window.QUnit) return !1;
				var a = document.createElement("mm");
				for (var b in f)
					if (void 0 !== a.style[b]) return {
						end: f[b]
					};
				return !1
			}

			function d(b)
			{
				var c = this,
					d = !1;
				return a(this).one(g.TRANSITION_END, function()
				{
					d = !0
				}), setTimeout(function()
				{
					d || g.triggerTransitionEnd(c)
				}, b), this
			}
			var e = !1,
				f = {
					WebkitTransition: "webkitTransitionEnd",
					MozTransition: "transitionend",
					OTransition: "oTransitionEnd otransitionend",
					transition: "transitionend"
				},
				g = {
					TRANSITION_END: "mmTransitionEnd",
					triggerTransitionEnd: function(b)
					{
						a(b).trigger(e.end)
					},
					supportsTransitionEnd: function()
					{
						return Boolean(e)
					}
				};
			return function()
			{
				e = c(), a.fn.emulateTransitionEnd = d, g
					.supportsTransitionEnd() && (a.event.special[g
						.TRANSITION_END] = b())
			}(), g
		}(jQuery);
	! function(a)
	{
		var e = "metisMenu",
			f = a.fn[e],
			g = {
				toggle: !0,
				preventDefault: !0,
				activeClass: "active",
				collapseClass: "collapse",
				collapseInClass: "in",
				collapsingClass: "collapsing",
				triggerElement: "a",
				parentTrigger: "li",
				subMenu: "ul"
			},
			h = {
				SHOW: "show.metisMenu",
				SHOWN: "shown.metisMenu",
				HIDE: "hide.metisMenu",
				HIDDEN: "hidden.metisMenu",
				CLICK_DATA_API: "click.metisMenu.data-api"
			},
			i = function()
			{
				function e(a, c)
				{
					b(this, e), this._element = a, this._config = this
						._getConfig(c), this._transitioning = null, this
						.init()
				}
				return e.prototype.init = function()
				{
					var b = this;
					a(this._element).find(this._config.parentTrigger +
							"." + this._config.activeClass).has(this
							._config.subMenu).children(this._config
							.subMenu).attr("aria-expanded", !0)
						.addClass(this._config.collapseClass + " " +
							this._config.collapseInClass), a(this
							._element).find(this._config.parentTrigger)
						.not("." + this._config.activeClass).has(this
							._config.subMenu).children(this._config
							.subMenu).attr("aria-expanded", !1)
						.addClass(this._config.collapseClass), a(this
							._element).find(this._config.parentTrigger)
						.has(this._config.subMenu).children(this._config
							.triggerElement).on(h.CLICK_DATA_API,
							function(c)
							{
								var d = a(this),
									e = d.parent(b._config
										.parentTrigger),
									f = e.siblings(b._config
										.parentTrigger).children(b
										._config.triggerElement),
									g = e.children(b._config.subMenu);
								b._config.preventDefault && c
									.preventDefault(), "true" !== d
									.attr("aria-disabled") && (e
										.hasClass(b._config
										.activeClass) ? (d.attr(
												"aria-expanded", !1), b
											._hide(g)) : (b._show(g), d
											.attr("aria-expanded", !0),
											b._config.toggle && f.attr(
												"aria-expanded", !1)), b
										._config.onTransitionStart && b
										._config.onTransitionStart(c))
							})
				}, e.prototype._show = function(b)
				{
					if (!this._transitioning && !a(b).hasClass(this
							._config.collapsingClass))
					{
						var c = this,
							e = a(b),
							f = a.Event(h.SHOW);
						if (e.trigger(f), !f.isDefaultPrevented())
						{
							e.parent(this._config.parentTrigger)
								.addClass(this._config.activeClass),
								this._config.toggle && this._hide(e
									.parent(this._config.parentTrigger)
									.siblings().children(this._config
										.subMenu + "." + this._config
										.collapseInClass).attr(
										"aria-expanded", !1)), e
								.removeClass(this._config.collapseClass)
								.addClass(this._config.collapsingClass)
								.height(0), this.setTransitioning(!0);
							var g = function()
							{
								e.removeClass(c._config
										.collapsingClass).addClass(c
										._config.collapseClass +
										" " + c._config
										.collapseInClass).height("")
									.attr("aria-expanded", !0), c
									.setTransitioning(!1), e
									.trigger(h.SHOWN)
							};
							if (!d.supportsTransitionEnd())
							return void g();
							e.height(e[0].scrollHeight).one(d
									.TRANSITION_END, g)
								.emulateTransitionEnd(350)
						}
					}
				}, e.prototype._hide = function(b)
				{
					if (!this._transitioning && a(b).hasClass(this
							._config.collapseInClass))
					{
						var c = this,
							e = a(b),
							f = a.Event(h.HIDE);
						if (e.trigger(f), !f.isDefaultPrevented())
						{
							e.parent(this._config.parentTrigger)
								.removeClass(this._config.activeClass),
								e.height(e.height())[0].offsetHeight, e
								.addClass(this._config.collapsingClass)
								.removeClass(this._config.collapseClass)
								.removeClass(this._config
									.collapseInClass), this
								.setTransitioning(!0);
							var g = function()
							{
								c._transitioning && c._config
									.onTransitionEnd && c._config
									.onTransitionEnd(), c
									.setTransitioning(!1), e
									.trigger(h.HIDDEN), e
									.removeClass(c._config
										.collapsingClass).addClass(c
										._config.collapseClass)
									.attr("aria-expanded", !1)
							};
							if (!d.supportsTransitionEnd())
							return void g();
							0 == e.height() || "none" == e.css(
									"display") ? g() : e.height(0).one(d
									.TRANSITION_END, g)
								.emulateTransitionEnd(350)
						}
					}
				}, e.prototype.setTransitioning = function(a)
				{
					this._transitioning = a
				}, e.prototype.dispose = function()
				{
					a.removeData(this._element, "metisMenu"), a(this
							._element).find(this._config.parentTrigger)
						.has(this._config.subMenu).children(this._config
							.triggerElement).off("click"), this
						._transitioning = null, this._config = null,
						this._element = null
				}, e.prototype._getConfig = function(b)
				{
					return b = a.extend(
					{}, g, b)
				}, e._jQueryInterface = function(b)
				{
					return this.each(function()
					{
						var d = a(this),
							f = d.data("metisMenu"),
							h = a.extend(
							{}, g, d.data(), "object" === (
								void 0 === b ? "undefined" :
								c(b)) && b);
						if (!f && /dispose/.test(b) && this
							.dispose(), f || (f = new e(this,
								h), d.data("metisMenu", f)),
							"string" == typeof b)
						{
							if (void 0 === f[b])
							throw new Error(
									'No method named "' +
									b + '"');
							f[b]()
						}
					})
				}, e
			}();
		a.fn[e] = i._jQueryInterface, a.fn[e].Constructor = i, a.fn[e]
			.noConflict = function()
			{
				return a.fn[e] = f, i._jQueryInterface
			}
	}(jQuery)
}),
function(a)
{
	jQuery.fn.extend(
	{
		slimScroll: function(b)
		{
			var c = a.extend(
			{
				width: "auto",
				height: "250px",
				size: "7px",
				color: "#000",
				position: "right",
				distance: "1px",
				start: "top",
				opacity: .4,
				alwaysVisible: !1,
				disableFadeOut: !1,
				railVisible: !1,
				railColor: "#333",
				railOpacity: .2,
				railDraggable: !0,
				railClass: "slimScrollRail",
				barClass: "slimScrollBar",
				wrapperClass: "slimScrollDiv",
				allowPageScroll: !1,
				wheelStep: 20,
				touchScrollStep: 200,
				borderRadius: "7px",
				railBorderRadius: "7px"
			}, b);
			return this.each(function()
			{
				function d(b)
				{
					if (i)
					{
						b = b || window.event;
						var d = 0;
						b.wheelDelta && (d = -b.wheelDelta /
								120), b.detail && (d = b
								.detail / 3), a(b.target ||
								b.srcTarget || b.srcElement)
							.closest("." + c.wrapperClass)
							.is(s.parent()) && e(d, !0), b
							.preventDefault && !r && b
							.preventDefault(), r || (b
								.returnValue = !1)
					}
				}

				function e(a, b, d)
				{
					r = !1;
					var e = a,
						f = s.outerHeight() - v
						.outerHeight();
					b && (e = parseInt(v.css("top")) + a *
							parseInt(c.wheelStep) / 100 * v
							.outerHeight(), e = Math.min(
								Math.max(e, 0), f), e = 0 <
							a ? Math.ceil(e) : Math.floor(
							e), v.css(
							{
								top: e + "px"
							})), o = parseInt(v.css(
						"top")) / (s.outerHeight() - v
							.outerHeight()), e = o * (s[0]
							.scrollHeight - s.outerHeight()
							), d && (e = a, a = e / s[0]
							.scrollHeight * s.outerHeight(),
							a = Math.min(Math.max(a, 0), f),
							v.css(
							{
								top: a + "px"
							})), s.scrollTop(e), s.trigger(
							"slimscrolling", ~~e), g(), h()
				}

				function f()
				{
					n = Math.max(s.outerHeight() / s[0]
						.scrollHeight * s.outerHeight(),
						q), v.css(
					{
						height: n + "px"
					});
					var a = n == s.outerHeight() ? "none" :
						"block";
					v.css(
					{
						display: a
					})
				}

				function g()
				{
					f(), clearTimeout(l), o == ~~o ? (r = c
							.allowPageScroll, p != o && s
							.trigger("slimscroll", 0 == ~~
								o ? "top" : "bottom")) :
						r = !1, p = o, n >= s
					.outerHeight() ? r = !0 : (v.stop(!0, !
								0).fadeIn("fast"), c
							.railVisible && w.stop(!0, !0)
							.fadeIn("fast"))
				}

				function h()
				{
					c.alwaysVisible || (l = setTimeout(
						function()
						{
							c.disableFadeOut && i ||
								j || k || (v
									.fadeOut(
									"slow"), w
									.fadeOut("slow")
									)
						}, 1e3))
				}
				var i, j, k, l, m, n, o, p, q = 30,
					r = !1,
					s = a(this);
				if (s.parent().hasClass(c.wrapperClass))
				{
					var u = s.scrollTop(),
						v = s.parent().find("." + c
							.barClass),
						w = s.parent().find("." + c
							.railClass);
					if (f(), a.isPlainObject(b))
					{
						if ("height" in b && "auto" == b
							.height)
						{
							s.parent().css("height",
								"auto"), s.css("height",
									"auto");
							var x = s.parent().parent()
								.height();
							s.parent().css("height", x), s
								.css("height", x)
						}
						if ("scrollTo" in b) u = parseInt(c
							.scrollTo);
						else if ("scrollBy" in b) u +=
							parseInt(c.scrollBy);
						else if ("destroy" in b) return v
							.remove(), w.remove(),
							void s.unwrap();
						e(u, !1, !0)
					}
				}
				else
				{
					c.height = "auto" == c.height ? s
						.parent().height() : c.height, u =
						a("<div></div>").addClass(c
							.wrapperClass).css(
						{
							position: "relative",
							overflow: "hidden",
							width: c.width,
							height: c.height
						}), s.css(
						{
							overflow: "hidden",
							width: c.width,
							height: c.height
						});
					var w = a("<div></div>").addClass(c
							.railClass).css(
						{
							width: c.size,
							height: "100%",
							position: "absolute",
							top: 0,
							display: c.alwaysVisible &&
								c.railVisible ?
								"block" : "none",
							"border-radius": c
								.railBorderRadius,
							background: c.railColor,
							opacity: c.railOpacity,
							zIndex: 90
						}),
						v = a("<div></div>").addClass(c
							.barClass).css(
						{
							background: c.color,
							width: c.size,
							position: "absolute",
							top: 0,
							opacity: c.opacity,
							display: c.alwaysVisible ?
								"block" : "none",
							"border-radius": c
								.borderRadius,
							BorderRadius: c
								.borderRadius,
							MozBorderRadius: c
								.borderRadius,
							WebkitBorderRadius: c
								.borderRadius,
							zIndex: 99
						}),
						x = "right" == c.position ?
						{
							right: c.distance
						} :
						{
							left: c.distance
						};
					w.css(x), v.css(x), s.wrap(u), s
						.parent().append(v), s.parent()
						.append(w), c.railDraggable && v
						.bind("mousedown", function(b)
						{
							var c = a(document);
							return k = !0, t =
								parseFloat(v.css(
								"top")), pageY = b
								.pageY, c.bind(
									"mousemove.slimscroll",
									function(a)
									{
										currTop = t + a
											.pageY -
											pageY, v
											.css("top",
												currTop
												), e(0,
												v
												.position()
												.top, !1
												)
									}), c.bind(
									"mouseup.slimscroll",
									function(a)
									{
										k = !1, h(), c
											.unbind(
												".slimscroll"
												)
									}), !1
						}).bind("selectstart.slimscroll",
							function(a)
							{
								return a.stopPropagation(),
									a.preventDefault(), !1
							}), w.hover(function()
						{
							g()
						}, function()
						{
							h()
						}), v.hover(function()
						{
							j = !0
						}, function()
						{
							j = !1
						}), s.hover(function()
						{
							i = !0, g(), h()
						}, function()
						{
							i = !1, h()
						}), s.bind("touchstart", function(a,
							b)
						{
							a.originalEvent.touches
								.length && (m = a
									.originalEvent
									.touches[0].pageY)
						}), s.bind("touchmove", function(a)
						{
							r || a.originalEvent
								.preventDefault(), a
								.originalEvent.touches
								.length && (e((m - a
											.originalEvent
											.touches[0]
											.pageY) / c
										.touchScrollStep,
										!0), m = a
									.originalEvent
									.touches[0].pageY)
						}), f(), "bottom" === c.start ? (v
							.css(
							{
								top: s.outerHeight() - v
									.outerHeight()
							}), e(0, !0)) : "top" !== c
						.start && (e(a(c.start).position()
								.top, null, !0), c
							.alwaysVisible || v.hide()),
						function()
						{
							window.addEventListener ? (this
									.addEventListener(
										"DOMMouseScroll", d,
										!1), this
									.addEventListener(
										"mousewheel", d, !1
										), this
									.addEventListener(
										"MozMousePixelScroll",
										d, !1)) : document
								.attachEvent("onmousewheel",
									d)
						}()
				}
			}), this
		}
	}), jQuery.fn.extend(
	{
		slimscroll: jQuery.fn.slimScroll
	})
}(jQuery),
function(a)
{
	"use strict";
	var b = function(c, d)
	{
		this.$element = a(c), this.options = a.extend(
		{}, b.defaults, d)
	};
	b.defaults = {
		transition_delay: 300,
		refresh_speed: 50,
		display_text: "none",
		use_percentage: !0,
		percent_format: function(a)
		{
			return a + "%"
		},
		amount_format: function(a, b)
		{
			return a + " / " + b
		},
		update: a.noop,
		done: a.noop,
		fail: a.noop
	}, b.prototype.transition = function()
	{
		var c = this.$element,
			d = c.parent(),
			e = this.$back_text,
			f = this.$front_text,
			g = this.options,
			h = parseInt(c.attr("data-transitiongoal")),
			i = parseInt(c.attr("aria-valuemin")) || 0,
			j = parseInt(c.attr("aria-valuemax")) || 100,
			k = d.hasClass("vertical"),
			l = g.update && "function" == typeof g.update ? g.update : b
			.defaults.update,
			m = g.done && "function" == typeof g.done ? g.done : b.defaults
			.done,
			n = g.fail && "function" == typeof g.fail ? g.fail : b.defaults
			.fail;
		if (isNaN(h)) return void n("data-transitiongoal not set");
		var o = Math.round(100 * (h - i) / (j - i));
		if ("center" === g.display_text && !e && !f)
		{
			this.$back_text = e = a("<span>").addClass(
					"progressbar-back-text").prependTo(d), this
				.$front_text = f = a("<span>").addClass(
					"progressbar-front-text").prependTo(c);
			var p;
			k ? (p = d.css("height"), e.css(
			{
				height: p,
				"line-height": p
			}), f.css(
			{
				height: p,
				"line-height": p
			}), a(window).resize(function()
			{
				p = d.css("height"), e.css(
				{
					height: p,
					"line-height": p
				}), f.css(
				{
					height: p,
					"line-height": p
				})
			})) : (p = d.css("width"), f.css(
			{
				width: p
			}), a(window).resize(function()
			{
				p = d.css("width"), f.css(
				{
					width: p
				})
			}))
		}
		setTimeout(function()
		{
			var a, b, n, p, q;
			k ? c.css("height", o + "%") : c.css("width", o + "%");
			var r = setInterval(function()
			{
				k ? (n = c.height(), p = d.height()) : (n =
						c.width(), p = d.width()), a = Math
					.round(100 * n / p), b = Math.round(i +
						n / p * (j - i)), a >= o && (a = o,
						b = h, m(c), clearInterval(r)),
					"none" !== g.display_text && (q = g
						.use_percentage ? g.percent_format(
							a) : g.amount_format(b, j, i),
						"fill" === g.display_text ? c.text(
							q) : "center" === g
						.display_text && (e.text(q), f.text(
							q))), c.attr("aria-valuenow",
					b), l(a, c)
			}, g.refresh_speed)
		}, g.transition_delay)
	};
	var c = a.fn.progressbar;
	a.fn.progressbar = function(c)
		{
			return this.each(function()
			{
				var d = a(this),
					e = d.data("bs.progressbar"),
					f = "object" == typeof c && c;
				e && f && a.extend(e.options, f), e || d.data(
						"bs.progressbar", e = new b(this, f)), e
					.transition()
			})
		}, a.fn.progressbar.Constructor = b, a.fn.progressbar.noConflict =
		function()
		{
			return a.fn.progressbar = c, this
		}
}(window.jQuery),
function(a, b, c)
{
	! function(a)
	{
		"function" == typeof define && define.amd ? define(["jquery"], a) :
			jQuery && !jQuery.fn.sparkline && a(jQuery)
	}(function(c)
	{
		"use strict";
		var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x,
			y, z, A, B, C, D, E, F, G, H, I = {},
			J = 0;
		d = function()
			{
				return {
					common:
					{
						type: "line",
						lineColor: "#00f",
						fillColor: "#cdf",
						defaultPixelsPerValue: 3,
						width: "auto",
						height: "auto",
						composite: !1,
						tagValuesAttribute: "values",
						tagOptionsPrefix: "spark",
						enableTagOptions: !1,
						enableHighlight: !0,
						highlightLighten: 1.4,
						tooltipSkipNull: !0,
						tooltipPrefix: "",
						tooltipSuffix: "",
						disableHiddenCheck: !1,
						numberFormatter: !1,
						numberDigitGroupCount: 3,
						numberDigitGroupSep: ",",
						numberDecimalMark: ".",
						disableTooltips: !1,
						disableInteraction: !1
					},
					line:
					{
						spotColor: "#f80",
						highlightSpotColor: "#5f5",
						highlightLineColor: "#f22",
						spotRadius: 1.5,
						minSpotColor: "#f80",
						maxSpotColor: "#f80",
						lineWidth: 1,
						normalRangeMin: void 0,
						normalRangeMax: void 0,
						normalRangeColor: "#ccc",
						drawNormalOnTop: !1,
						chartRangeMin: void 0,
						chartRangeMax: void 0,
						chartRangeMinX: void 0,
						chartRangeMaxX: void 0,
						tooltipFormat: new f(
							'<span style="color: {{color}}">&#9679;</span> {{prefix}}{{y}}{{suffix}}'
							)
					},
					bar:
					{
						barColor: "#3366cc",
						negBarColor: "#f44",
						stackedBarColor: ["#3366cc", "#dc3912", "#ff9900",
							"#109618", "#66aa00", "#dd4477", "#0099c6",
							"#990099"
						],
						zeroColor: void 0,
						nullColor: void 0,
						zeroAxis: !0,
						barWidth: 4,
						barSpacing: 1,
						chartRangeMax: void 0,
						chartRangeMin: void 0,
						chartRangeClip: !1,
						colorMap: void 0,
						tooltipFormat: new f(
							'<span style="color: {{color}}">&#9679;</span> {{prefix}}{{value}}{{suffix}}'
							)
					},
					tristate:
					{
						barWidth: 4,
						barSpacing: 1,
						posBarColor: "#6f6",
						negBarColor: "#f44",
						zeroBarColor: "#999",
						colorMap:
						{},
						tooltipFormat: new f(
							'<span style="color: {{color}}">&#9679;</span> {{value:map}}'
							),
						tooltipValueLookups:
						{
							map:
							{
								"-1": "Loss",
								0: "Draw",
								1: "Win"
							}
						}
					},
					discrete:
					{
						lineHeight: "auto",
						thresholdColor: void 0,
						thresholdValue: 0,
						chartRangeMax: void 0,
						chartRangeMin: void 0,
						chartRangeClip: !1,
						tooltipFormat: new f(
							"{{prefix}}{{value}}{{suffix}}")
					},
					bullet:
					{
						targetColor: "#f33",
						targetWidth: 3,
						performanceColor: "#33f",
						rangeColors: ["#d3dafe", "#a8b6ff", "#7f94ff"],
						base: void 0,
						tooltipFormat: new f(
							"{{fieldkey:fields}} - {{value}}"),
						tooltipValueLookups:
						{
							fields:
							{
								r: "Range",
								p: "Performance",
								t: "Target"
							}
						}
					},
					pie:
					{
						offset: 0,
						sliceColors: ["#3366cc", "#dc3912", "#ff9900",
							"#109618", "#66aa00", "#dd4477", "#0099c6",
							"#990099"
						],
						borderWidth: 0,
						borderColor: "#000",
						tooltipFormat: new f(
							'<span style="color: {{color}}">&#9679;</span> {{value}} ({{percent.1}}%)'
							)
					},
					box:
					{
						raw: !1,
						boxLineColor: "#000",
						boxFillColor: "#cdf",
						whiskerColor: "#000",
						outlierLineColor: "#333",
						outlierFillColor: "#fff",
						medianColor: "#f00",
						showOutliers: !0,
						outlierIQR: 1.5,
						spotRadius: 1.5,
						target: void 0,
						targetColor: "#4a2",
						chartRangeMax: void 0,
						chartRangeMin: void 0,
						tooltipFormat: new f("{{field:fields}}: {{value}}"),
						tooltipFormatFieldlistKey: "field",
						tooltipValueLookups:
						{
							fields:
							{
								lq: "Lower Quartile",
								med: "Median",
								uq: "Upper Quartile",
								lo: "Left Outlier",
								ro: "Right Outlier",
								lw: "Left Whisker",
								rw: "Right Whisker"
							}
						}
					}
				}
			}, B =
			'.jqstooltip { position: absolute;left: 0px;top: 0px;visibility: hidden;background: rgb(0, 0, 0) transparent;background-color: rgba(0,0,0,0.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";color: white;font: 10px arial, san serif;text-align: left;white-space: nowrap;padding: 5px;border: 1px solid white;box-sizing: content-box;z-index: 10000;}.jqsfield { color: white;font: 10px arial, san serif;text-align: left;}',
			e = function()
			{
				var a, b;
				return a = function()
					{
						this.init.apply(this, arguments)
					}, arguments.length > 1 ? (arguments[0] ? (a.prototype =
						c.extend(new arguments[0], arguments[arguments
							.length - 1]), a._super = arguments[0]
						.prototype) : a.prototype = arguments[arguments
						.length - 1], arguments.length > 2 && (b = Array
						.prototype.slice.call(arguments, 1, -1), b
						.unshift(a.prototype), c.extend.apply(c, b))) : a
					.prototype = arguments[0], a.prototype.cls = a, a
			}, c.SPFormatClass = f = e(
			{
				fre: /\{\{([\w.]+?)(:(.+?))?\}\}/g,
				precre: /(\w+)\.(\d+)/,
				init: function(a, b)
				{
					this.format = a, this.fclass = b
				},
				render: function(a, b, c)
				{
					var d, e, f, g, h, i = this,
						j = a;
					return this.format.replace(this.fre, function()
					{
						var a;
						return e = arguments[1], f =
							arguments[3], d = i.precre.exec(
								e), d ? (h = d[2], e = d[
							1]) : h = !1, void 0 === (g = j[
								e]) ? "" : f && b && b[f] ?
							(a = b[f], a.get ? b[f].get(
								g) || g : b[f][g] || g) : (
								l(g) && (g = c.get(
										"numberFormatter") ?
									c.get("numberFormatter")
									(g) : p(g, h, c.get(
										"numberDigitGroupCount"
										), c.get(
										"numberDigitGroupSep"
										), c.get(
										"numberDecimalMark"
										))), g)
					})
				}
			}), c.spformat = function(a, b)
			{
				return new f(a, b)
			}, g = function(a, b, c)
			{
				return a < b ? b : a > c ? c : a
			}, h = function(a, c)
			{
				var d;
				return 2 === c ? (d = b.floor(a.length / 2), a.length % 2 ?
					a[d] : (a[d - 1] + a[d]) / 2) : a.length % 2 ? (d =
					(a.length * c + c) / 4, d % 1 ? (a[b.floor(d)] + a[b
						.floor(d) - 1]) / 2 : a[d - 1]) : (d = (a
					.length * c + 2) / 4, d % 1 ? (a[b.floor(d)] +
					a[b.floor(d) - 1]) / 2 : a[d - 1])
			}, i = function(a)
			{
				var b;
				switch (a)
				{
					case "undefined":
						a = void 0;
						break;
					case "null":
						a = null;
						break;
					case "true":
						a = !0;
						break;
					case "false":
						a = !1;
						break;
					default:
						b = parseFloat(a), a == b && (a = b)
				}
				return a
			}, j = function(a)
			{
				var b, c = [];
				for (b = a.length; b--;) c[b] = i(a[b]);
				return c
			}, k = function(a, b)
			{
				var c, d, e = [];
				for (c = 0, d = a.length; c < d; c++) a[c] !== b && e.push(
					a[c]);
				return e
			}, l = function(a)
			{
				return !isNaN(parseFloat(a)) && isFinite(a)
			}, p = function(a, b, d, e, f)
			{
				var g, h;
				for (a = (!1 === b ? parseFloat(a).toString() : a.toFixed(
						b)).split(""), g = (g = c.inArray(".", a)) < 0 ? a
					.length : g, g < a.length && (a[g] = f), h = g - d; h >
					0; h -= d) a.splice(h, 0, e);
				return a.join("")
			}, m = function(a, b, c)
			{
				var d;
				for (d = b.length; d--;)
					if ((!c || null !== b[d]) && b[d] !== a) return !1;
				return !0
			}, o = function(a)
			{
				return c.isArray(a) ? a : [a]
			}, n = function(b)
			{
				var c, d;
				if (a.createStyleSheet) try
				{
					return void(a.createStyleSheet().cssText = b)
				}
				catch (a)
				{
					d = !0
				}
				c = a.createElement("style"), c.type = "text/css", a
					.getElementsByTagName("head")[0].appendChild(c), d ? a
					.styleSheets[a.styleSheets.length - 1].cssText = b : c[
						"string" == typeof a.body.style.WebkitAppearance ?
						"innerText" : "innerHTML"] = b
			}, c.fn.simpledraw = function(b, d, e, f)
			{
				var g, h;
				if (e && (g = this.data("_jqs_vcanvas"))) return g;
				if (!1 === c.fn.sparkline.canvas) return !1;
				if (void 0 === c.fn.sparkline.canvas)
				{
					var i = a.createElement("canvas");
					if (i.getContext && i.getContext("2d")) c.fn.sparkline
						.canvas = function(a, b, c, d)
						{
							return new F(a, b, c, d)
						};
					else
					{
						if (!a.namespaces || a.namespaces.v) return c.fn
							.sparkline.canvas = !1, !1;
						a.namespaces.add("v",
								"urn:schemas-microsoft-com:vml",
								"#default#VML"), c.fn.sparkline.canvas =
							function(a, b, c, d)
							{
								return new G(a, b, c)
							}
					}
				}
				return void 0 === b && (b = c(this).innerWidth()),
					void 0 === d && (d = c(this).innerHeight()), g = c.fn
					.sparkline.canvas(b, d, this, f), h = c(this).data(
						"_jqs_mhandler"), h && h.registerCanvas(g), g
			}, c.fn.cleardraw = function()
			{
				var a = this.data("_jqs_vcanvas");
				a && a.reset()
			}, c.RangeMapClass = q = e(
			{
				init: function(a)
				{
					var b, c, d = [];
					for (b in a) a.hasOwnProperty(b) && "string" ==
						typeof b && b.indexOf(":") > -1 && (c = b
							.split(":"), c[0] = 0 === c[0].length ?
							-1 / 0 : parseFloat(c[0]), c[1] = 0 ===
							c[1].length ? 1 / 0 : parseFloat(c[1]),
							c[2] = a[b], d.push(c));
					this.map = a, this.rangelist = d || !1
				},
				get: function(a)
				{
					var b, c, d, e = this.rangelist;
					if (void 0 !== (d = this.map[a])) return d;
					if (e)
						for (b = e.length; b--;)
							if (c = e[b], c[0] <= a && c[1] >= a)
								return c[2]
				}
			}), c.range_map = function(a)
			{
				return new q(a)
			}, r = e(
			{
				init: function(a, b)
				{
					var d = c(a);
					this.$el = d, this.options = b, this
						.currentPageX = 0, this.currentPageY = 0,
						this.el = a, this.splist = [], this
						.tooltip = null, this.over = !1, this
						.displayTooltips = !b.get(
						"disableTooltips"), this
						.highlightEnabled = !b.get(
							"disableHighlight")
				},
				registerSparkline: function(a)
				{
					this.splist.push(a), this.over && this
						.updateDisplay()
				},
				registerCanvas: function(a)
				{
					var b = c(a.canvas);
					this.canvas = a, this.$canvas = b, b.mouseenter(
							c.proxy(this.mouseenter, this)), b
						.mouseleave(c.proxy(this.mouseleave, this)),
						b.click(c.proxy(this.mouseclick, this))
				},
				reset: function(a)
				{
					this.splist = [], this.tooltip && a && (this
						.tooltip.remove(), this.tooltip = void 0
						)
				},
				mouseclick: function(a)
				{
					var b = c.Event("sparklineClick");
					b.originalEvent = a, b.sparklines = this.splist,
						this.$el.trigger(b)
				},
				mouseenter: function(b)
				{
					c(a.body).unbind("mousemove.jqs"), c(a.body)
						.bind("mousemove.jqs", c.proxy(this
							.mousemove, this)), this.over = !0, this
						.currentPageX = b.pageX, this.currentPageY =
						b.pageY, this.currentEl = b.target, !this
						.tooltip && this.displayTooltips && (this
							.tooltip = new s(this.options), this
							.tooltip.updatePosition(b.pageX, b
								.pageY)), this.updateDisplay()
				},
				mouseleave: function()
				{
					c(a.body).unbind("mousemove.jqs");
					var b, d, e = this.splist,
						f = e.length,
						g = !1;
					for (this.over = !1, this.currentEl = null, this
						.tooltip && (this.tooltip.remove(), this
							.tooltip = null), d = 0; d < f; d++) b =
						e[d], b.clearRegionHighlight() && (g = !0);
					g && this.canvas.render()
				},
				mousemove: function(a)
				{
					this.currentPageX = a.pageX, this.currentPageY =
						a.pageY, this.currentEl = a.target, this
						.tooltip && this.tooltip.updatePosition(a
							.pageX, a.pageY), this.updateDisplay()
				},
				updateDisplay: function()
				{
					var a, b, d, e, f, g = this.splist,
						h = g.length,
						i = !1,
						j = this.$canvas.offset(),
						k = this.currentPageX - j.left,
						l = this.currentPageY - j.top;
					if (this.over)
					{
						for (d = 0; d < h; d++) b = g[d], (e = b
							.setRegionHighlight(this.currentEl,
								k, l)) && (i = !0);
						if (i)
						{
							if (f = c.Event(
								"sparklineRegionChange"), f
								.sparklines = this.splist, this.$el
								.trigger(f), this.tooltip)
							{
								for (a = "", d = 0; d < h; d++) b =
									g[d], a += b
									.getCurrentRegionTooltip();
								this.tooltip.setContent(a)
							}
							this.disableHighlight || this.canvas
								.render()
						}
						null === e && this.mouseleave()
					}
				}
			}), s = e(
			{
				sizeStyle: "position: static !important;display: block !important;visibility: hidden !important;float: left !important;",
				init: function(b)
				{
					var d, e = b.get("tooltipClassname",
							"jqstooltip"),
						f = this.sizeStyle;
					this.container = b.get("tooltipContainer") || a
						.body, this.tooltipOffsetX = b.get(
							"tooltipOffsetX", 10), this
						.tooltipOffsetY = b.get("tooltipOffsetY",
							12), c("#jqssizetip").remove(), c(
							"#jqstooltip").remove(), this.sizetip =
						c("<div/>",
						{
							id: "jqssizetip",
							style: f,
							class: e
						}), this.tooltip = c("<div/>",
						{
							id: "jqstooltip",
							class: e
						}).appendTo(this.container), d = this
						.tooltip.offset(), this.offsetLeft = d.left,
						this.offsetTop = d.top, this.hidden = !0, c(
							window).unbind("resize.jqs scroll.jqs"),
						c(window).bind("resize.jqs scroll.jqs", c
							.proxy(this.updateWindowDims, this)),
						this.updateWindowDims()
				},
				updateWindowDims: function()
				{
					this.scrollTop = c(window).scrollTop(), this
						.scrollLeft = c(window).scrollLeft(), this
						.scrollRight = this.scrollLeft + c(window)
						.width(), this.updatePosition()
				},
				getSize: function(a)
				{
					this.sizetip.html(a).appendTo(this.container),
						this.width = this.sizetip.width() + 1, this
						.height = this.sizetip.height(), this
						.sizetip.remove()
				},
				setContent: function(a)
				{
					if (!a) return this.tooltip.css("visibility",
						"hidden"), void(this.hidden = !0);
					this.getSize(a), this.tooltip.html(a).css(
					{
						width: this.width,
						height: this.height,
						visibility: "visible"
					}), this.hidden && (this.hidden = !1, this
						.updatePosition())
				},
				updatePosition: function(a, b)
				{
					if (void 0 === a)
					{
						if (void 0 === this.mousex) return;
						a = this.mousex - this.offsetLeft, b = this
							.mousey - this.offsetTop
					}
					else this.mousex = a -= this.offsetLeft, this
						.mousey = b -= this.offsetTop;
					this.height && this.width && !this.hidden && (
						b -= this.height + this.tooltipOffsetY,
						a += this.tooltipOffsetX, b < this
						.scrollTop && (b = this.scrollTop), a <
						this.scrollLeft ? a = this.scrollLeft :
						a + this.width > this.scrollRight && (
							a = this.scrollRight - this.width),
						this.tooltip.css(
						{
							left: a,
							top: b
						}))
				},
				remove: function()
				{
					this.tooltip.remove(), this.sizetip.remove(),
						this.sizetip = this.tooltip = void 0, c(
							window).unbind("resize.jqs scroll.jqs")
				}
			}), C = function()
			{
				n(B)
			}, c(C), H = [], c.fn.sparkline = function(b, d)
			{
				return this.each(function()
				{
					var e, f, g = new c.fn.sparkline.options(this,
							d),
						h = c(this);
					if (e = function()
						{
							var d, e, f, i, j, k, l;
							if ("html" === b || void 0 === b ? (l =
									this.getAttribute(g.get(
										"tagValuesAttribute")),
									void 0 !== l && null !== l || (
										l = h.html()), d = l
									.replace(
										/(^\s*<!--)|(-->\s*$)|\s+/g,
										"").split(",")) : d = b, e =
								"auto" === g.get("width") ? d
								.length * g.get(
									"defaultPixelsPerValue") : g
								.get("width"), "auto" === g.get(
									"height") ? g.get(
								"composite") && c.data(this,
									"_jqs_vcanvas") || (i = a
									.createElement("span"), i
									.innerHTML = "a", h.html(i), f =
									c(i).innerHeight() || c(i)
									.height(), c(i).remove(), i =
									null) : f = g.get("height"), g
								.get("disableInteraction") ? j = !
								1 : (j = c.data(this,
										"_jqs_mhandler"), j ? g.get(
										"composite") || j.reset() :
									(j = new r(this, g), c.data(
										this, "_jqs_mhandler", j
										))), g.get("composite") && !
								c.data(this, "_jqs_vcanvas"))
							return void(c.data(this,
									"_jqs_errnotify") || (
									alert(
										"Attempted to attach a composite sparkline to an element with no existing sparkline"
										), c.data(this,
										"_jqs_errnotify", !0
										)));
							k = new(c.fn.sparkline[g.get("type")])(
									this, d, g, e, f), k.render(),
								j && j.registerSparkline(k)
						}, c(this).html() && !g.get(
							"disableHiddenCheck") && c(this).is(
							":hidden") || !c(this).parents("body")
						.length)
					{
						if (!g.get("composite") && c.data(this,
								"_jqs_pending"))
							for (f = H.length; f; f--) H[f - 1][
								0] == this && H.splice(f - 1, 1);
						H.push([this, e]), c.data(this,
							"_jqs_pending", !0)
					}
					else e.call(this)
				})
			}, c.fn.sparkline.defaults = d(), c.sparkline_display_visible =
			function()
			{
				var a, b, d, e = [];
				for (b = 0, d = H.length; b < d; b++) a = H[b][0], c(a).is(
					":visible") && !c(a).parents().is(":hidden") ? (H[b]
					[1].call(a), c.data(H[b][0], "_jqs_pending", !1), e
					.push(b)) : c(a).closest("html").length || c.data(a,
					"_jqs_pending") || (c.data(H[b][0], "_jqs_pending",
					!1), e.push(b));
				for (b = e.length; b; b--) H.splice(e[b - 1], 1)
			}, c.fn.sparkline.options = e(
			{
				init: function(a, b)
				{
					var d, e, f, g;
					this.userOptions = b = b ||
						{}, this.tag = a, this.tagValCache = {}, e =
						c.fn.sparkline.defaults, f = e.common, this
						.tagOptionsPrefix = b.enableTagOptions && (b
							.tagOptionsPrefix || f.tagOptionsPrefix
							), g = this.getTagSetting("type"), d =
						g === I ? e[b.type || f.type] : e[g], this
						.mergedOptions = c.extend(
						{}, f, d, b)
				},
				getTagSetting: function(a)
				{
					var b, c, d, e, f = this.tagOptionsPrefix;
					if (!1 === f || void 0 === f) return I;
					if (this.tagValCache.hasOwnProperty(a)) b = this
						.tagValCache.key;
					else
					{
						if (void 0 === (b = this.tag.getAttribute(
								f + a)) || null === b) b = I;
						else if ("[" === b.substr(0, 1))
							for (b = b.substr(1, b.length - 2)
								.split(","), c = b.length; c--;) b[
								c] = i(b[c].replace(
								/(^\s*)|(\s*$)/g, ""));
						else if ("{" === b.substr(0, 1))
							for (d = b.substr(1, b.length - 2)
								.split(","), b = {}, c = d
								.length; c--;) e = d[c].split(":",
								2), b[e[0].replace(
								/(^\s*)|(\s*$)/g, "")] = i(e[1]
								.replace(/(^\s*)|(\s*$)/g, ""));
						else b = i(b);
						this.tagValCache.key = b
					}
					return b
				},
				get: function(a, b)
				{
					var c, d = this.getTagSetting(a);
					return d !== I ? d : void 0 === (c = this
						.mergedOptions[a]) ? b : c
				}
			}), c.fn.sparkline._base = e(
			{
				disabled: !1,
				init: function(a, b, d, e, f)
				{
					this.el = a, this.$el = c(a), this.values = b,
						this.options = d, this.width = e, this
						.height = f, this.currentRegion = void 0
				},
				initTarget: function()
				{
					var a = !this.options.get("disableInteraction");
					(this.target = this.$el.simpledraw(this.width,
						this.height, this.options.get(
							"composite"), a)) ? (this.canvasWidth =
						this.target.pixelWidth, this.canvasHeight =
						this.target.pixelHeight) : this.disabled = !
						0
				},
				render: function()
				{
					return !this.disabled || (this.el.innerHTML =
						"", !1)
				},
				getRegion: function(a, b) {},
				setRegionHighlight: function(a, b, c)
				{
					var d, e = this.currentRegion,
						f = !this.options.get("disableHighlight");
					return b > this.canvasWidth || c > this
						.canvasHeight || b < 0 || c < 0 ? null : (
							d = this.getRegion(a, b, c), e !== d &&
							(void 0 !== e && f && this
								.removeHighlight(), this
								.currentRegion = d, void 0 !== d &&
								f && this.renderHighlight(), !0))
				},
				clearRegionHighlight: function()
				{
					return void 0 !== this.currentRegion && (this
						.removeHighlight(), this.currentRegion =
						void 0, !0)
				},
				renderHighlight: function()
				{
					this.changeHighlight(!0)
				},
				removeHighlight: function()
				{
					this.changeHighlight(!1)
				},
				changeHighlight: function(a) {},
				getCurrentRegionTooltip: function()
				{
					var a, b, d, e, g, h, i, j, k, l, m, n, o, p,
						q = this.options,
						r = "",
						s = [];
					if (void 0 === this.currentRegion) return "";
					if (a = this.getCurrentRegionFields(), m = q
						.get("tooltipFormatter")) return m(this, q,
						a);
					if (q.get("tooltipChartTitle") && (r +=
							'<div class="jqs jqstitle">' + q.get(
								"tooltipChartTitle") + "</div>\n"),
						!(b = this.options.get("tooltipFormat")))
						return "";
					if (c.isArray(b) || (b = [b]), c.isArray(a) || (
							a = [a]), i = this.options.get(
							"tooltipFormatFieldlist"), j = this
						.options.get("tooltipFormatFieldlistKey"),
						i && j)
					{
						for (k = [], h = a.length; h--;) l = a[h][
							j], -1 != (p = c.inArray(l, i)) && (k[
								p] = a[h]);
						a = k
					}
					for (d = b.length, o = a.length, h = 0; h <
						d; h++)
						for (n = b[h], "string" == typeof n && (n =
								new f(n)), e = n.fclass ||
							"jqsfield", p = 0; p < o; p++) a[p]
							.isNull && q.get("tooltipSkipNull") || (
								c.extend(a[p],
								{
									prefix: q.get(
										"tooltipPrefix"),
									suffix: q.get(
										"tooltipSuffix")
								}), g = n.render(a[p], q.get(
									"tooltipValueLookups"), q), s
								.push('<div class="' + e + '">' +
									g + "</div>"));
					return s.length ? r + s.join("\n") : ""
				},
				getCurrentRegionFields: function() {},
				calcHighlightColor: function(a, c)
				{
					var d, e, f, h, i = c.get("highlightColor"),
						j = c.get("highlightLighten");
					if (i) return i;
					if (j && (d =
							/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i
							.exec(a) ||
							/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i
							.exec(a)))
					{
						for (f = [], e = 4 === a.length ? 16 : 1,
							h = 0; h < 3; h++) f[h] = g(b.round(
								parseInt(d[h + 1], 16) * e * j),
							0, 255);
						return "rgb(" + f.join(",") + ")"
					}
					return a
				}
			}), t = {
				changeHighlight: function(a)
				{
					var b, d = this.currentRegion,
						e = this.target,
						f = this.regionShapes[d];
					f && (b = this.renderRegion(d, a), c.isArray(b) || c
						.isArray(f) ? (e.replaceWithShapes(f, b),
							this.regionShapes[d] = c.map(b,
								function(a)
								{
									return a.id
								})) : (e.replaceWithShape(f, b),
							this.regionShapes[d] = b.id))
				},
				render: function()
				{
					var a, b, d, e, f = this.values,
						g = this.target,
						h = this.regionShapes;
					if (this.cls._super.render.call(this))
					{
						for (d = f.length; d--;)
							if (a = this.renderRegion(d))
								if (c.isArray(a))
								{
									for (b = [], e = a.length; e--;) a[
										e].append(), b.push(a[e].id);
									h[d] = b
								}
						else a.append(), h[d] = a.id;
						else h[d] = null;
						g.render()
					}
				}
			}, c.fn.sparkline.line = u = e(c.fn.sparkline._base,
			{
				type: "line",
				init: function(a, b, c, d, e)
				{
					u._super.init.call(this, a, b, c, d, e), this
						.vertices = [], this.regionMap = [], this
						.xvalues = [], this.yvalues = [], this
						.yminmax = [], this.hightlightSpotId = null,
						this.lastShapeId = null, this.initTarget()
				},
				getRegion: function(a, b, c)
				{
					var d, e = this.regionMap;
					for (d = e.length; d--;)
						if (null !== e[d] && b >= e[d][0] && b <= e[
								d][1]) return e[d][2]
				},
				getCurrentRegionFields: function()
				{
					var a = this.currentRegion;
					return {
						isNull: null === this.yvalues[a],
						x: this.xvalues[a],
						y: this.yvalues[a],
						color: this.options.get("lineColor"),
						fillColor: this.options.get("fillColor"),
						offset: a
					}
				},
				renderHighlight: function()
				{
					var a, b, c = this.currentRegion,
						d = this.target,
						e = this.vertices[c],
						f = this.options,
						g = f.get("spotRadius"),
						h = f.get("highlightSpotColor"),
						i = f.get("highlightLineColor");
					e && (g && h && (a = d.drawCircle(e[0], e[1], g,
							void 0, h), this
						.highlightSpotId = a.id, d
						.insertAfterShape(this.lastShapeId,
							a)), i && (b = d.drawLine(e[0],
							this.canvasTop, e[0], this
							.canvasTop + this.canvasHeight,
							i), this.highlightLineId = b.id,
						d.insertAfterShape(this.lastShapeId,
							b)))
				},
				removeHighlight: function()
				{
					var a = this.target;
					this.highlightSpotId && (a.removeShapeId(this
								.highlightSpotId), this
							.highlightSpotId = null), this
						.highlightLineId && (a.removeShapeId(this
								.highlightLineId), this
							.highlightLineId = null)
				},
				scanValues: function()
				{
					var a, c, d, e, f, g = this.values,
						h = g.length,
						i = this.xvalues,
						j = this.yvalues,
						k = this.yminmax;
					for (a = 0; a < h; a++) c = g[a], d =
						"string" == typeof g[a], e = "object" ==
						typeof g[a] && g[a] instanceof Array, f =
						d && g[a].split(":"), d && 2 === f.length ?
						(i.push(Number(f[0])), j.push(Number(f[1])),
							k.push(Number(f[1]))) : e ? (i.push(c[
							0]), j.push(c[1]), k.push(c[1])) : (i
							.push(a), null === g[a] || "null" === g[
								a] ? j.push(null) : (j.push(Number(
								c)), k.push(Number(c))));
					this.options.get("xvalues") && (i = this.options
							.get("xvalues")), this.maxy = this
						.maxyorg = b.max.apply(b, k), this.miny =
						this.minyorg = b.min.apply(b, k), this
						.maxx = b.max.apply(b, i), this.minx = b.min
						.apply(b, i), this.xvalues = i, this
						.yvalues = j, this.yminmax = k
				},
				processRangeOptions: function()
				{
					var a = this.options,
						b = a.get("normalRangeMin"),
						c = a.get("normalRangeMax");
					void 0 !== b && (b < this.miny && (this.miny =
								b), c > this.maxy && (this.maxy =
							c)), void 0 !== a.get(
						"chartRangeMin") && (a.get(
							"chartRangeClip") || a.get(
								"chartRangeMin") < this.miny) && (
							this.miny = a.get("chartRangeMin")),
						void 0 !== a.get("chartRangeMax") && (a.get(
							"chartRangeClip") || a.get(
							"chartRangeMax") > this.maxy) && (this
							.maxy = a.get("chartRangeMax")),
						void 0 !== a.get("chartRangeMinX") && (a
							.get("chartRangeClipX") || a.get(
								"chartRangeMinX") < this.minx) && (
							this.minx = a.get("chartRangeMinX")),
						void 0 !== a.get("chartRangeMaxX") && (a
							.get("chartRangeClipX") || a.get(
								"chartRangeMaxX") > this.maxx) && (
							this.maxx = a.get("chartRangeMaxX"))
				},
				drawNormalRange: function(a, c, d, e, f)
				{
					var g = this.options.get("normalRangeMin"),
						h = this.options.get("normalRangeMax"),
						i = c + b.round(d - d * ((h - this.miny) /
							f)),
						j = b.round(d * (h - g) / f);
					this.target.drawRect(a, i, e, j, void 0, this
							.options.get("normalRangeColor"))
						.append()
				},
				render: function()
				{
					var a, d, e, f, g, h, i, j, k, l, m, n, o, p, r,
						s, t, v, w, x, y, z, A, B, C, D = this
						.options,
						E = this.target,
						F = this.canvasWidth,
						G = this.canvasHeight,
						H = this.vertices,
						I = D.get("spotRadius"),
						J = this.regionMap;
					if (u._super.render.call(this) && (this
							.scanValues(), this
							.processRangeOptions(), A = this
							.xvalues, B = this.yvalues, this.yminmax
							.length && !(this.yvalues.length < 2)))
					{
						for (f = g = 0, a = this.maxx - this.minx ==
							0 ? 1 : this.maxx - this.minx, d = this
							.maxy - this.miny == 0 ? 1 : this.maxy -
							this.miny, e = this.yvalues.length - 1,
							I && (F < 4 * I || G < 4 * I) && (I =
							0), I && (y = D.get(
									"highlightSpotColor") && !D.get(
									"disableInteraction"), (y || D
									.get("minSpotColor") || D.get(
										"spotColor") && B[e] ===
									this.miny) && (G -= b.ceil(I)),
								(y || D.get("maxSpotColor") || D
									.get("spotColor") && B[e] ===
									this.maxy) && (G -= b.ceil(I),
									f += b.ceil(I)), (y || (D.get(
										"minSpotColor") || D
									.get("maxSpotColor")) && (B[
										0] === this.miny || B[
									0] === this.maxy)) && (g += b
									.ceil(I), F -= b.ceil(I)), (y ||
									D.get("spotColor") || D.get(
										"minSpotColor") || D.get(
										"maxSpotColor") && (B[e] ===
										this.miny || B[e] === this
										.maxy)) && (F -= b.ceil(I))
								), G--, void 0 === D.get(
								"normalRangeMin") || D.get(
								"drawNormalOnTop") || this
							.drawNormalRange(g, f, G, F, d), i = [],
							j = [i], p = r = null, s = B.length, C =
							0; C < s; C++) k = A[C], m = A[C + 1],
							l = B[C], n = g + b.round((k - this
								.minx) * (F / a)), o = C < s - 1 ?
							g + b.round((m - this.minx) * (F / a)) :
							F, r = n + (o - n) / 2, J[C] = [p || 0,
								r, C
							], p = r, null === l ? C && (null !== B[
									C - 1] && (i = [], j.push(i)), H
								.push(null)) : (l < this.miny && (
									l = this.miny), l > this.maxy &&
								(l = this.maxy), i.length || i.push(
									[n, f + G]), h = [n, f + b
									.round(G - G * ((l - this
										.miny) / d))
								], i.push(h), H.push(h));
						for (t = [], v = [], w = j.length, C =
							0; C < w; C++) i = j[C], i.length && (D
							.get("fillColor") && (i.push([i[i
									.length - 1][0], f +
								G
							]), v.push(i.slice(0)), i.pop()), i
							.length > 2 && (i[0] = [i[0][0], i[
								1][1]]), t.push(i));
						for (w = v.length, C = 0; C < w; C++) E
							.drawShape(v[C], D.get("fillColor"), D
								.get("fillColor")).append();
						for (void 0 !== D.get("normalRangeMin") && D
							.get("drawNormalOnTop") && this
							.drawNormalRange(g, f, G, F, d), w = t
							.length, C = 0; C < w; C++) E.drawShape(
							t[C], D.get("lineColor"), void 0, D
							.get("lineWidth")).append();
						if (I && D.get("valueSpots"))
							for (x = D.get("valueSpots"), void 0 ===
								x.get && (x = new q(x)), C = 0; C <
								s; C++)(z = x.get(B[C])) && E
								.drawCircle(g + b.round((A[C] - this
										.minx) * (F / a)), f + b
									.round(G - G * ((B[C] - this
										.miny) / d)), I, void 0, z)
								.append();
						I && D.get("spotColor") && null !== B[e] &&
							E.drawCircle(g + b.round((A[A.length -
									1] - this.minx) * (F / a)), f +
								b.round(G - G * ((B[e] - this
									.miny) / d)), I, void 0, D.get(
									"spotColor")).append(), this
							.maxy !== this.minyorg && (I && D.get(
								"minSpotColor") && (k = A[c
									.inArray(this.minyorg, B)],
								E.drawCircle(g + b.round((k -
											this.minx) * (F /
										a)), f + b.round(G - G *
										((this.minyorg - this
											.miny) / d)), I,
									void 0, D.get(
										"minSpotColor"))
								.append()), I && D.get(
								"maxSpotColor") && (k = A[c
									.inArray(this.maxyorg, B)],
								E.drawCircle(g + b.round((k -
											this.minx) * (F /
										a)), f + b.round(G - G *
										((this.maxyorg - this
											.miny) / d)), I,
									void 0, D.get(
										"maxSpotColor"))
								.append())), this.lastShapeId = E
							.getLastShapeId(), this.canvasTop = f, E
							.render()
					}
				}
			}), c.fn.sparkline.bar = v = e(c.fn.sparkline._base, t,
			{
				type: "bar",
				init: function(a, d, e, f, h)
				{
					var l, m, n, o, p, r, s, t, u, w, x, y, z, A, B,
						C, D, E, F, G, H, I, J = parseInt(e.get(
							"barWidth"), 10),
						K = parseInt(e.get("barSpacing"), 10),
						L = e.get("chartRangeMin"),
						M = e.get("chartRangeMax"),
						N = e.get("chartRangeClip"),
						O = 1 / 0,
						P = -1 / 0;
					for (v._super.init.call(this, a, d, e, f, h),
						r = 0, s = d.length; r < s; r++) G = d[r], (
						(l = "string" == typeof G && G.indexOf(
							":") > -1) || c.isArray(G)) && (
						B = !0, l && (G = d[r] = j(G.split(
							":"))), G = k(G, null), m = b.min
						.apply(b, G), n = b.max.apply(b, G), m <
						O && (O = m), n > P && (P = n));
					this.stacked = B, this.regionShapes = {}, this
						.barWidth = J, this.barSpacing = K, this
						.totalBarWidth = J + K, this.width = f = d
						.length * J + (d.length - 1) * K, this
						.initTarget(), N && (z = void 0 === L ? -1 /
							0 : L, A = void 0 === M ? 1 / 0 : M),
						p = [], o = B ? [] : p;
					var Q = [],
						R = [];
					for (r = 0, s = d.length; r < s; r++)
						if (B)
							for (C = d[r], d[r] = F = [], Q[r] = 0,
								o[r] = R[r] = 0, D = 0, E = C
								.length; D < E; D++) null !== (G =
									F[D] = N ? g(C[D], z, A) : C[D]
									) && (G > 0 && (Q[r] += G), O <
									0 && P > 0 ? G < 0 ? R[r] += b
									.abs(G) : o[r] += G : o[r] += b
									.abs(G - (G < 0 ? P : O)), p
									.push(G));
						else G = N ? g(d[r], z, A) : d[r], null !==
							(G = d[r] = i(G)) && p.push(G);
					this.max = y = b.max.apply(b, p), this.min = x =
						b.min.apply(b, p), this.stackMax = P = B ? b
						.max.apply(b, Q) : y, this.stackMin = O =
						B ? b.min.apply(b, p) : x, void 0 !== e.get(
							"chartRangeMin") && (e.get(
							"chartRangeClip") || e.get(
							"chartRangeMin") < x) && (x = e.get(
							"chartRangeMin")), void 0 !== e.get(
							"chartRangeMax") && (e.get(
							"chartRangeClip") || e.get(
							"chartRangeMax") > y) && (y = e.get(
							"chartRangeMax")), this.zeroAxis = u = e
						.get("zeroAxis", !0), w = x <= 0 && y >=
						0 && u ? 0 : 0 == u ? x : x > 0 ? x : y,
						this.xaxisOffset = w, t = B ? b.max.apply(b,
							o) + b.max.apply(b, R) : y - x, this
						.canvasHeightEf = u && x < 0 ? this
						.canvasHeight - 2 : this.canvasHeight - 1,
						x < w ? (I = B && y >= 0 ? P : y, (H = (I -
								w) / t * this.canvasHeight) !== b
							.ceil(H) && (this.canvasHeightEf -= 2,
								H = b.ceil(H))) : H = this
						.canvasHeight, this.yoffset = H, c.isArray(e
							.get("colorMap")) ? (this
							.colorMapByIndex = e.get("colorMap"),
							this.colorMapByValue = null) : (this
							.colorMapByIndex = null, this
							.colorMapByValue = e.get("colorMap"),
							this.colorMapByValue && void 0 === this
							.colorMapByValue.get && (this
								.colorMapByValue = new q(this
									.colorMapByValue))), this
						.range = t
				},
				getRegion: function(a, c, d)
				{
					var e = b.floor(c / this.totalBarWidth);
					return e < 0 || e >= this.values.length ?
						void 0 : e
				},
				getCurrentRegionFields: function()
				{
					var a, b, c = this.currentRegion,
						d = o(this.values[c]),
						e = [];
					for (b = d.length; b--;) a = d[b], e.push(
					{
						isNull: null === a,
						value: a,
						color: this.calcColor(b, a, c),
						offset: c
					});
					return e
				},
				calcColor: function(a, b, d)
				{
					var e, f, g = this.colorMapByIndex,
						h = this.colorMapByValue,
						i = this.options;
					return e = this.stacked ? i.get(
							"stackedBarColor") : b < 0 ? i.get(
							"negBarColor") : i.get("barColor"),
						0 === b && void 0 !== i.get("zeroColor") &&
						(e = i.get("zeroColor")), h && (f = h.get(
							b)) ? e = f : g && g.length > d && (e =
							g[d]), c.isArray(e) ? e[a % e.length] :
						e
				},
				renderRegion: function(a, d)
				{
					var e, f, g, h, i, j, k, l, n, o, p = this
						.values[a],
						q = this.options,
						r = this.xaxisOffset,
						s = [],
						t = this.range,
						u = this.stacked,
						v = this.target,
						w = a * this.totalBarWidth,
						x = this.canvasHeightEf,
						y = this.yoffset;
					if (p = c.isArray(p) ? p : [p], k = p.length,
						l = p[0], h = m(null, p), o = m(r, p, !0), h
						) return q.get("nullColor") ? (g = d ? q
							.get("nullColor") : this
							.calcHighlightColor(q.get(
								"nullColor"), q), e = y > 0 ?
							y - 1 : y, v.drawRect(w, e, this
								.barWidth - 1, 0, g, g)) :
						void 0;
					for (i = y, j = 0; j < k; j++)
					{
						if (l = p[j], u && l === r)
						{
							if (!o || n) continue;
							n = !0
						}
						f = t > 0 ? b.floor(x * (b.abs(l - r) /
							t)) + 1 : 1, l < r || l === r && 0 ===
							y ? (e = i, i += f) : (e = y - f, y -=
								f), g = this.calcColor(j, l, a),
							d && (g = this.calcHighlightColor(g,
							q)), s.push(v.drawRect(w, e, this
								.barWidth - 1, f - 1, g, g))
					}
					return 1 === s.length ? s[0] : s
				}
			}), c.fn.sparkline.tristate = w = e(c.fn.sparkline._base, t,
			{
				type: "tristate",
				init: function(a, b, d, e, f)
				{
					var g = parseInt(d.get("barWidth"), 10),
						h = parseInt(d.get("barSpacing"), 10);
					w._super.init.call(this, a, b, d, e, f), this
						.regionShapes = {}, this.barWidth = g, this
						.barSpacing = h, this.totalBarWidth = g + h,
						this.values = c.map(b, Number), this.width =
						e = b.length * g + (b.length - 1) * h, c
						.isArray(d.get("colorMap")) ? (this
							.colorMapByIndex = d.get("colorMap"),
							this.colorMapByValue = null) : (this
							.colorMapByIndex = null, this
							.colorMapByValue = d.get("colorMap"),
							this.colorMapByValue && void 0 === this
							.colorMapByValue.get && (this
								.colorMapByValue = new q(this
									.colorMapByValue))), this
						.initTarget()
				},
				getRegion: function(a, c, d)
				{
					return b.floor(c / this.totalBarWidth)
				},
				getCurrentRegionFields: function()
				{
					var a = this.currentRegion;
					return {
						isNull: void 0 === this.values[a],
						value: this.values[a],
						color: this.calcColor(this.values[a], a),
						offset: a
					}
				},
				calcColor: function(a, b)
				{
					var c, d = this.values,
						e = this.options,
						f = this.colorMapByIndex,
						g = this.colorMapByValue;
					return g && (c = g.get(a)) ? c : f && f.length >
						b ? f[b] : d[b] < 0 ? e.get("negBarColor") :
						d[b] > 0 ? e.get("posBarColor") : e.get(
							"zeroBarColor")
				},
				renderRegion: function(a, c)
				{
					var d, e, f, g, h, i, j = this.values,
						k = this.options,
						l = this.target;
					if (d = l.pixelHeight, f = b.round(d / 2), g =
						a * this.totalBarWidth, j[a] < 0 ? (h = f,
							e = f - 1) : j[a] > 0 ? (h = 0, e = f -
							1) : (h = f - 1, e = 2), null !== (i =
							this.calcColor(j[a], a))) return c && (
							i = this.calcHighlightColor(i, k)),
						l.drawRect(g, h, this.barWidth - 1, e -
							1, i, i)
				}
			}), c.fn.sparkline.discrete = x = e(c.fn.sparkline._base, t,
			{
				type: "discrete",
				init: function(a, d, e, f, g)
				{
					x._super.init.call(this, a, d, e, f, g), this
						.regionShapes = {}, this.values = d = c.map(
							d, Number), this.min = b.min.apply(b,
						d), this.max = b.max.apply(b, d), this
						.range = this.max - this.min, this.width =
						f = "auto" === e.get("width") ? 2 * d
						.length : this.width, this.interval = b
						.floor(f / d.length), this.itemWidth = f / d
						.length, void 0 !== e.get(
						"chartRangeMin") && (e.get(
							"chartRangeClip") || e.get(
								"chartRangeMin") < this.min) && (
							this.min = e.get("chartRangeMin")),
						void 0 !== e.get("chartRangeMax") && (e.get(
							"chartRangeClip") || e.get(
							"chartRangeMax") > this.max) && (this
							.max = e.get("chartRangeMax")), this
						.initTarget(), this.target && (this
							.lineHeight = "auto" === e.get(
								"lineHeight") ? b.round(.3 * this
								.canvasHeight) : e.get("lineHeight")
							)
				},
				getRegion: function(a, c, d)
				{
					return b.floor(c / this.itemWidth)
				},
				getCurrentRegionFields: function()
				{
					var a = this.currentRegion;
					return {
						isNull: void 0 === this.values[a],
						value: this.values[a],
						offset: a
					}
				},
				renderRegion: function(a, c)
				{
					var d, e, f, h, i = this.values,
						j = this.options,
						k = this.min,
						l = this.max,
						m = this.range,
						n = this.interval,
						o = this.target,
						p = this.canvasHeight,
						q = this.lineHeight,
						r = p - q;
					return e = g(i[a], k, l), h = a * n, d = b
						.round(r - r * ((e - k) / m)), f = j.get(
							"thresholdColor") && e < j.get(
							"thresholdValue") ? j.get(
							"thresholdColor") : j.get("lineColor"),
						c && (f = this.calcHighlightColor(f, j)), o
						.drawLine(h, d, h, d + q, f)
				}
			}), c.fn.sparkline.bullet = y = e(c.fn.sparkline._base,
			{
				type: "bullet",
				init: function(a, c, d, e, f)
				{
					var g, h, i;
					y._super.init.call(this, a, c, d, e, f), this
						.values = c = j(c), i = c.slice(), i[0] =
						null === i[0] ? i[2] : i[0], i[1] = null ===
						c[1] ? i[2] : i[1], g = b.min.apply(b, c),
						h = b.max.apply(b, c), g = void 0 === d.get(
							"base") ? g < 0 ? g : 0 : d.get("base"),
						this.min = g, this.max = h, this.range = h -
						g, this.shapes = {}, this.valueShapes = {},
						this.regiondata = {}, this.width = e =
						"auto" === d.get("width") ? "4.0em" : e,
						this.target = this.$el.simpledraw(e, f, d
							.get("composite")), c.length || (this
							.disabled = !0), this.initTarget()
				},
				getRegion: function(a, b, c)
				{
					var d = this.target.getShapeAt(a, b, c);
					return void 0 !== d && void 0 !== this.shapes[
						d] ? this.shapes[d] : void 0
				},
				getCurrentRegionFields: function()
				{
					var a = this.currentRegion;
					return {
						fieldkey: a.substr(0, 1),
						value: this.values[a.substr(1)],
						region: a
					}
				},
				changeHighlight: function(a)
				{
					var b, c = this.currentRegion,
						d = this.valueShapes[c];
					switch (delete this.shapes[d], c.substr(0, 1))
					{
						case "r":
							b = this.renderRange(c.substr(1), a);
							break;
						case "p":
							b = this.renderPerformance(a);
							break;
						case "t":
							b = this.renderTarget(a)
					}
					this.valueShapes[c] = b.id, this.shapes[b.id] =
						c, this.target.replaceWithShape(d, b)
				},
				renderRange: function(a, c)
				{
					var d = this.values[a],
						e = b.round(this.canvasWidth * ((d - this
							.min) / this.range)),
						f = this.options.get("rangeColors")[a - 2];
					return c && (f = this.calcHighlightColor(f, this
						.options)), this.target.drawRect(0, 0,
						e - 1, this.canvasHeight - 1, f, f)
				},
				renderPerformance: function(a)
				{
					var c = this.values[1],
						d = b.round(this.canvasWidth * ((c - this
							.min) / this.range)),
						e = this.options.get("performanceColor");
					return a && (e = this.calcHighlightColor(e, this
						.options)), this.target.drawRect(0, b
						.round(.3 * this.canvasHeight), d - 1, b
						.round(.4 * this.canvasHeight) - 1, e, e
						)
				},
				renderTarget: function(a)
				{
					var c = this.values[0],
						d = b.round(this.canvasWidth * ((c - this
								.min) / this.range) - this.options
							.get("targetWidth") / 2),
						e = b.round(.1 * this.canvasHeight),
						f = this.canvasHeight - 2 * e,
						g = this.options.get("targetColor");
					return a && (g = this.calcHighlightColor(g, this
						.options)), this.target.drawRect(d, e,
						this.options.get("targetWidth") - 1, f -
						1, g, g)
				},
				render: function()
				{
					var a, b, c = this.values.length,
						d = this.target;
					if (y._super.render.call(this))
					{
						for (a = 2; a < c; a++) b = this
							.renderRange(a).append(), this.shapes[b
								.id] = "r" + a, this.valueShapes[
								"r" + a] = b.id;
						null !== this.values[1] && (b = this
								.renderPerformance().append(), this
								.shapes[b.id] = "p1", this
								.valueShapes.p1 = b.id), null !==
							this.values[0] && (b = this
								.renderTarget().append(), this
								.shapes[b.id] = "t0", this
								.valueShapes.t0 = b.id), d.render()
					}
				}
			}), c.fn.sparkline.pie = z = e(c.fn.sparkline._base,
			{
				type: "pie",
				init: function(a, d, e, f, g)
				{
					var h, i = 0;
					if (z._super.init.call(this, a, d, e, f, g),
						this.shapes = {}, this.valueShapes = {},
						this.values = d = c.map(d, Number),
						"auto" === e.get("width") && (this.width =
							this.height), d.length > 0)
						for (h = d.length; h--;) i += d[h];
					this.total = i, this.initTarget(), this.radius =
						b.floor(b.min(this.canvasWidth, this
							.canvasHeight) / 2)
				},
				getRegion: function(a, b, c)
				{
					var d = this.target.getShapeAt(a, b, c);
					return void 0 !== d && void 0 !== this.shapes[
						d] ? this.shapes[d] : void 0
				},
				getCurrentRegionFields: function()
				{
					var a = this.currentRegion;
					return {
						isNull: void 0 === this.values[a],
						value: this.values[a],
						percent: this.values[a] / this.total * 100,
						color: this.options.get("sliceColors")[a %
							this.options.get("sliceColors")
							.length],
						offset: a
					}
				},
				changeHighlight: function(a)
				{
					var b = this.currentRegion,
						c = this.renderSlice(b, a),
						d = this.valueShapes[b];
					delete this.shapes[d], this.target
						.replaceWithShape(d, c), this.valueShapes[
						b] = c.id, this.shapes[c.id] = b
				},
				renderSlice: function(a, c)
				{
					var d, e, f, g, h, i = this.target,
						j = this.options,
						k = this.radius,
						l = j.get("borderWidth"),
						m = j.get("offset"),
						n = 2 * b.PI,
						o = this.values,
						p = this.total,
						q = m ? 2 * b.PI * (m / 360) : 0;
					for (g = o.length, f = 0; f < g; f++)
					{
						if (d = q, e = q, p > 0 && (e = q + n * (o[
								f] / p)), a === f) return h = j.get(
							"sliceColors")[f % j.get(
							"sliceColors").length], c && (
							h = this.calcHighlightColor(h,
								j)), i.drawPieSlice(k, k,
							k - l, d, e, void 0, h);
						q = e
					}
				},
				render: function()
				{
					var a, c, d = this.target,
						e = this.values,
						f = this.options,
						g = this.radius,
						h = f.get("borderWidth");
					if (z._super.render.call(this))
					{
						for (h && d.drawCircle(g, g, b.floor(g - h /
									2), f.get("borderColor"),
								void 0, h).append(), c = e
							.length; c--;) e[c] && (a = this
							.renderSlice(c).append(), this
							.valueShapes[c] = a.id, this.shapes[
								a.id] = c);
						d.render()
					}
				}
			}), c.fn.sparkline.box = A = e(c.fn.sparkline._base,
			{
				type: "box",
				init: function(a, b, d, e, f)
				{
					A._super.init.call(this, a, b, d, e, f), this
						.values = c.map(b, Number), this.width =
						"auto" === d.get("width") ? "4.0em" : e,
						this.initTarget(), this.values.length || (
							this.disabled = 1)
				},
				getRegion: function()
				{
					return 1
				},
				getCurrentRegionFields: function()
				{
					var a = [
					{
						field: "lq",
						value: this.quartiles[0]
					},
					{
						field: "med",
						value: this.quartiles[1]
					},
					{
						field: "uq",
						value: this.quartiles[2]
					}];
					return void 0 !== this.loutlier && a.push(
					{
						field: "lo",
						value: this.loutlier
					}), void 0 !== this.routlier && a.push(
					{
						field: "ro",
						value: this.routlier
					}), void 0 !== this.lwhisker && a.push(
					{
						field: "lw",
						value: this.lwhisker
					}), void 0 !== this.rwhisker && a.push(
					{
						field: "rw",
						value: this.rwhisker
					}), a
				},
				render: function()
				{
					var a, c, d, e, f, g, i, j, k, l, m, n = this
						.target,
						o = this.values,
						p = o.length,
						q = this.options,
						r = this.canvasWidth,
						s = this.canvasHeight,
						t = void 0 === q.get("chartRangeMin") ? b
						.min.apply(b, o) : q.get("chartRangeMin"),
						u = void 0 === q.get("chartRangeMax") ? b
						.max.apply(b, o) : q.get("chartRangeMax"),
						v = 0;
					if (A._super.render.call(this))
					{
						if (q.get("raw")) q.get("showOutliers") && o
							.length > 5 ? (c = o[0], a = o[1], e =
								o[2], f = o[3], g = o[4], i = o[5],
								j = o[6]) : (a = o[0], e = o[1], f =
								o[2], g = o[3], i = o[4]);
						else if (o.sort(function(a, b)
							{
								return a - b
							}), e = h(o, 1), f = h(o, 2), g = h(o,
								3), d = g - e, q.get(
							"showOutliers"))
						{
							for (a = i = void 0, k = 0; k < p; k++)
								void 0 === a && o[k] > e - d * q
								.get("outlierIQR") && (a = o[k]), o[
									k] < g + d * q.get(
								"outlierIQR") && (i = o[k]);
							c = o[0], j = o[p - 1]
						}
						else a = o[0], i = o[p - 1];
						this.quartiles = [e, f, g], this.lwhisker =
							a, this.rwhisker = i, this.loutlier = c,
							this.routlier = j, m = r / (u - t + 1),
							q.get("showOutliers") && (v = b.ceil(q
									.get("spotRadius")), r -= 2 * b
								.ceil(q.get("spotRadius")), m = r /
								(u - t + 1), c < a && n.drawCircle((
										c - t) * m + v, s / 2, q
									.get("spotRadius"), q.get(
										"outlierLineColor"), q.get(
										"outlierFillColor"))
								.append(), j > i && n.drawCircle((
										j - t) * m + v, s / 2, q
									.get("spotRadius"), q.get(
										"outlierLineColor"), q.get(
										"outlierFillColor"))
								.append()), n.drawRect(b.round((e -
									t) * m + v), b.round(.1 * s), b
								.round((g - e) * m), b.round(.8 *
								s), q.get("boxLineColor"), q.get(
									"boxFillColor")).append(), n
							.drawLine(b.round((a - t) * m + v), b
								.round(s / 2), b.round((e - t) * m +
									v), b.round(s / 2), q.get(
									"lineColor")).append(), n
							.drawLine(b.round((a - t) * m + v), b
								.round(s / 4), b.round((a - t) * m +
									v), b.round(s - s / 4), q.get(
									"whiskerColor")).append(), n
							.drawLine(b.round((i - t) * m + v), b
								.round(s / 2), b.round((g - t) * m +
									v), b.round(s / 2), q.get(
									"lineColor")).append(), n
							.drawLine(b.round((i - t) * m + v), b
								.round(s / 4), b.round((i - t) * m +
									v), b.round(s - s / 4), q.get(
									"whiskerColor")).append(), n
							.drawLine(b.round((f - t) * m + v), b
								.round(.1 * s), b.round((f - t) *
									m + v), b.round(.9 * s), q.get(
									"medianColor")).append(), q.get(
								"target") && (l = b.ceil(q.get(
									"spotRadius")), n.drawLine(b
									.round((q.get("target") - t) *
										m + v), b.round(s / 2 - l),
									b.round((q.get("target") - t) *
										m + v), b.round(s / 2 + l),
									q.get("targetColor")).append(),
								n.drawLine(b.round((q.get(
											"target") - t) * m + v -
										l), b.round(s / 2), b.round(
										(q.get("target") - t) * m +
										v + l), b.round(s / 2), q
									.get("targetColor")).append()),
							n.render()
					}
				}
			}), D = e(
			{
				init: function(a, b, c, d)
				{
					this.target = a, this.id = b, this.type = c,
						this.args = d
				},
				append: function()
				{
					return this.target.appendShape(this), this
				}
			}), E = e(
			{
				_pxregex: /(\d+)(px)?\s*$/i,
				init: function(a, b, d)
				{
					a && (this.width = a, this.height = b, this
						.target = d, this.lastShapeId = null, d[
							0] && (d = d[0]), c.data(d,
							"_jqs_vcanvas", this))
				},
				drawLine: function(a, b, c, d, e, f)
				{
					return this.drawShape([
						[a, b],
						[c, d]
					], e, f)
				},
				drawShape: function(a, b, c, d)
				{
					return this._genShape("Shape", [a, b, c, d])
				},
				drawCircle: function(a, b, c, d, e, f)
				{
					return this._genShape("Circle", [a, b, c, d, e,
						f
					])
				},
				drawPieSlice: function(a, b, c, d, e, f, g)
				{
					return this._genShape("PieSlice", [a, b, c, d,
						e, f, g
					])
				},
				drawRect: function(a, b, c, d, e, f)
				{
					return this._genShape("Rect", [a, b, c, d, e,
						f])
				},
				getElement: function()
				{
					return this.canvas
				},
				getLastShapeId: function()
				{
					return this.lastShapeId
				},
				reset: function()
				{
					alert("reset not implemented")
				},
				_insert: function(a, b)
				{
					c(b).html(a)
				},
				_calculatePixelDims: function(a, b, d)
				{
					var e;
					e = this._pxregex.exec(b), this.pixelHeight =
						e ? e[1] : c(d).height(), e = this._pxregex
						.exec(a), this.pixelWidth = e ? e[1] : c(d)
						.width()
				},
				_genShape: function(a, b)
				{
					var c = J++;
					return b.unshift(c), new D(this, c, a, b)
				},
				appendShape: function(a)
				{
					alert("appendShape not implemented")
				},
				replaceWithShape: function(a, b)
				{
					alert("replaceWithShape not implemented")
				},
				insertAfterShape: function(a, b)
				{
					alert("insertAfterShape not implemented")
				},
				removeShapeId: function(a)
				{
					alert("removeShapeId not implemented")
				},
				getShapeAt: function(a, b, c)
				{
					alert("getShapeAt not implemented")
				},
				render: function()
				{
					alert("render not implemented")
				}
			}), F = e(E,
			{
				init: function(b, d, e, f)
				{
					F._super.init.call(this, b, d, e), this.canvas =
						a.createElement("canvas"), e[0] && (e = e[
							0]), c.data(e, "_jqs_vcanvas", this), c(
							this.canvas).css(
						{
							display: "inline-block",
							width: b,
							height: d,
							verticalAlign: "top"
						}), this._insert(this.canvas, e), this
						._calculatePixelDims(b, d, this.canvas),
						this.canvas.width = this.pixelWidth, this
						.canvas.height = this.pixelHeight, this
						.interact = f, this.shapes = {}, this
						.shapeseq = [], this.currentTargetShapeId =
						void 0, c(this.canvas).css(
						{
							width: this.pixelWidth,
							height: this.pixelHeight
						})
				},
				_getContext: function(a, b, c)
				{
					var d = this.canvas.getContext("2d");
					return void 0 !== a && (d.strokeStyle = a), d
						.lineWidth = void 0 === c ? 1 : c,
						void 0 !== b && (d.fillStyle = b), d
				},
				reset: function()
				{
					this._getContext().clearRect(0, 0, this
							.pixelWidth, this.pixelHeight), this
						.shapes = {}, this.shapeseq = [], this
						.currentTargetShapeId = void 0
				},
				_drawShape: function(a, b, c, d, e)
				{
					var f, g, h = this._getContext(c, d, e);
					for (h.beginPath(), h.moveTo(b[0][0] + .5, b[0][
							1
						] + .5), f = 1, g = b.length; f < g; f++) h
						.lineTo(b[f][0] + .5, b[f][1] + .5);
					void 0 !== c && h.stroke(), void 0 !== d && h
						.fill(), void 0 !== this.targetX &&
						void 0 !== this.targetY && h.isPointInPath(
							this.targetX, this.targetY) && (this
							.currentTargetShapeId = a)
				},
				_drawCircle: function(a, c, d, e, f, g, h)
				{
					var i = this._getContext(f, g, h);
					i.beginPath(), i.arc(c, d, e, 0, 2 * b.PI, !1),
						void 0 !== this.targetX && void 0 !== this
						.targetY && i.isPointInPath(this.targetX,
							this.targetY) && (this
							.currentTargetShapeId = a), void 0 !==
						f && i.stroke(), void 0 !== g && i.fill()
				},
				_drawPieSlice: function(a, b, c, d, e, f, g, h)
				{
					var i = this._getContext(g, h);
					i.beginPath(), i.moveTo(b, c), i.arc(b, c, d, e,
							f, !1), i.lineTo(b, c), i.closePath(),
						void 0 !== g && i.stroke(), h && i.fill(),
						void 0 !== this.targetX && void 0 !== this
						.targetY && i.isPointInPath(this.targetX,
							this.targetY) && (this
							.currentTargetShapeId = a)
				},
				_drawRect: function(a, b, c, d, e, f, g)
				{
					return this._drawShape(a, [
						[b, c],
						[b + d, c],
						[b + d, c + e],
						[b, c + e],
						[b, c]
					], f, g)
				},
				appendShape: function(a)
				{
					return this.shapes[a.id] = a, this.shapeseq
						.push(a.id), this.lastShapeId = a.id, a.id
				},
				replaceWithShape: function(a, b)
				{
					var c, d = this.shapeseq;
					for (this.shapes[b.id] = b, c = d.length; c--;)
						d[c] == a && (d[c] = b.id);
					delete this.shapes[a]
				},
				replaceWithShapes: function(a, b)
				{
					var c, d, e, f = this.shapeseq,
						g = {};
					for (d = a.length; d--;) g[a[d]] = !0;
					for (d = f.length; d--;) c = f[d], g[c] && (f
						.splice(d, 1), delete this.shapes[c],
						e = d);
					for (d = b.length; d--;) f.splice(e, 0, b[d]
						.id), this.shapes[b[d].id] = b[d]
				},
				insertAfterShape: function(a, b)
				{
					var c, d = this.shapeseq;
					for (c = d.length; c--;)
						if (d[c] === a) return d.splice(c + 1, 0, b
							.id), void(this.shapes[b.id] =
							b)
				},
				removeShapeId: function(a)
				{
					var b, c = this.shapeseq;
					for (b = c.length; b--;)
						if (c[b] === a)
						{
							c.splice(b, 1);
							break
						} delete this.shapes[a]
				},
				getShapeAt: function(a, b, c)
				{
					return this.targetX = b, this.targetY = c, this
						.render(), this.currentTargetShapeId
				},
				render: function()
				{
					var a, b, c, d = this.shapeseq,
						e = this.shapes,
						f = d.length,
						g = this._getContext();
					for (g.clearRect(0, 0, this.pixelWidth, this
							.pixelHeight), c = 0; c < f; c++) a = d[
							c], b = e[a], this["_draw" + b.type]
						.apply(this, b.args);
					this.interact || (this.shapes = {}, this
						.shapeseq = [])
				}
			}), G = e(E,
			{
				init: function(b, d, e)
				{
					var f;
					G._super.init.call(this, b, d, e), e[0] && (e =
							e[0]), c.data(e, "_jqs_vcanvas", this),
						this.canvas = a.createElement("span"), c(
							this.canvas).css(
						{
							display: "inline-block",
							position: "relative",
							overflow: "hidden",
							width: b,
							height: d,
							margin: "0px",
							padding: "0px",
							verticalAlign: "top"
						}), this._insert(this.canvas, e), this
						._calculatePixelDims(b, d, this.canvas),
						this.canvas.width = this.pixelWidth, this
						.canvas.height = this.pixelHeight, f =
						'<v:group coordorigin="0 0" coordsize="' +
						this.pixelWidth + " " + this.pixelHeight +
						'" style="position:absolute;top:0;left:0;width:' +
						this.pixelWidth + "px;height=" + this
						.pixelHeight + 'px;"></v:group>', this
						.canvas.insertAdjacentHTML("beforeEnd", f),
						this.group = c(this.canvas).children()[0],
						this.rendered = !1, this.prerender = ""
				},
				_drawShape: function(a, b, c, d, e)
				{
					var f, g, h, i, j, k, l = [];
					for (k = 0, j = b.length; k < j; k++) l[k] = b[
						k][0] + "," + b[k][1];
					return f = l.splice(0, 1), e = void 0 === e ?
						1 : e, g = void 0 === c ?
						' stroked="false" ' : ' strokeWeight="' +
						e + 'px" strokeColor="' + c + '" ', h =
						void 0 === d ? ' filled="false"' :
						' fillColor="' + d + '" filled="true" ', i =
						l[0] === l[l.length - 1] ? "x " : "",
						'<v:shape coordorigin="0 0" coordsize="' +
						this.pixelWidth + " " + this.pixelHeight +
						'"  id="jqsshape' + a + '" ' + g + h +
						' style="position:absolute;left:0px;top:0px;height:' +
						this.pixelHeight + "px;width:" + this
						.pixelWidth +
						'px;padding:0px;margin:0px;"  path="m ' +
						f + " l " + l.join(", ") + " " + i +
						'e"> </v:shape>'
				},
				_drawCircle: function(a, b, c, d, e, f, g)
				{
					var h, i;
					return b -= d, c -= d, h = void 0 === e ?
						' stroked="false" ' : ' strokeWeight="' +
						g + 'px" strokeColor="' + e + '" ', i =
						void 0 === f ? ' filled="false"' :
						' fillColor="' + f + '" filled="true" ',
						'<v:oval  id="jqsshape' + a + '" ' + h + i +
						' style="position:absolute;top:' + c +
						"px; left:" + b + "px; width:" + 2 * d +
						"px; height:" + 2 * d + 'px"></v:oval>'
				},
				_drawPieSlice: function(a, c, d, e, f, g, h, i)
				{
					var j, k, l, m, n, o, p;
					if (f === g) return "";
					if (g - f == 2 * b.PI && (f = 0, g = 2 * b.PI),
						k = c + b.round(b.cos(f) * e), l = d + b
						.round(b.sin(f) * e), m = c + b.round(b.cos(
							g) * e), n = d + b.round(b.sin(g) * e),
						k === m && l === n)
					{
						if (g - f < b.PI) return "";
						k = m = c + e, l = n = d
					}
					return k === m && l === n && g - f < b.PI ? "" :
						(j = [c - e, d - e, c + e, d + e, k, l, m,
								n], o = void 0 === h ?
							' stroked="false" ' :
							' strokeWeight="1px" strokeColor="' +
							h + '" ', p = void 0 === i ?
							' filled="false"' : ' fillColor="' + i +
							'" filled="true" ',
							'<v:shape coordorigin="0 0" coordsize="' +
							this.pixelWidth + " " + this
							.pixelHeight + '"  id="jqsshape' + a +
							'" ' + o + p +
							' style="position:absolute;left:0px;top:0px;height:' +
							this.pixelHeight + "px;width:" + this
							.pixelWidth +
							'px;padding:0px;margin:0px;"  path="m ' +
							c + "," + d + " wa " + j.join(", ") +
							' x e"> </v:shape>')
				},
				_drawRect: function(a, b, c, d, e, f, g)
				{
					return this._drawShape(a, [
						[b, c],
						[b, c + e],
						[b + d, c + e],
						[b + d, c],
						[b, c]
					], f, g)
				},
				reset: function()
				{
					this.group.innerHTML = ""
				},
				appendShape: function(a)
				{
					var b = this["_draw" + a.type].apply(this, a
						.args);
					return this.rendered ? this.group
						.insertAdjacentHTML("beforeEnd", b) : this
						.prerender += b, this.lastShapeId = a.id, a
						.id
				},
				replaceWithShape: function(a, b)
				{
					var d = c("#jqsshape" + a),
						e = this["_draw" + b.type].apply(this, b
							.args);
					d[0].outerHTML = e
				},
				replaceWithShapes: function(a, b)
				{
					var d, e = c("#jqsshape" + a[0]),
						f = "",
						g = b.length;
					for (d = 0; d < g; d++) f += this["_draw" + b[d]
						.type].apply(this, b[d].args);
					for (e[0].outerHTML = f, d = 1; d < a
						.length; d++) c("#jqsshape" + a[d]).remove()
				},
				insertAfterShape: function(a, b)
				{
					var d = c("#jqsshape" + a),
						e = this["_draw" + b.type].apply(this, b
							.args);
					d[0].insertAdjacentHTML("afterEnd", e)
				},
				removeShapeId: function(a)
				{
					var b = c("#jqsshape" + a);
					this.group.removeChild(b[0])
				},
				getShapeAt: function(a, b, c)
				{
					return a.id.substr(8)
				},
				render: function()
				{
					this.rendered || (this.group.innerHTML = this
						.prerender, this.rendered = !0)
				}
			})
	})
}(document, Math);
