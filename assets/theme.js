var qvSlider;
(window.theme = window.theme || {}), (window.theme = window.theme || {
}), (theme.Sections = function() {
  (this.constructors = {}), (this.instances = []), $(document)
    .on("shopify:section:load", this._onSectionLoad.bind(this))
    .on("shopify:section:unload", this._onSectionUnload.bind(this))
    .on("shopify:section:select", this._onSelect.bind(this))
    .on("shopify:section:deselect", this._onDeselect.bind(this))
    .on("shopify:block:select", this._onBlockSelect.bind(this))
    .on("shopify:block:deselect", this._onBlockDeselect.bind(this));
}), (theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
  _createInstance: function(p, v) {
    var y = $(p),
      C = y.attr("data-section-id"),
      k = y.attr("data-section-type");
    if (((v = v || this.constructors[k]), !_.isUndefined(v))) {
      var x = _.assignIn(new v(p), { id: C, type: k, container: p });
      this.instances.push(x);
    }
  },
  _onSectionLoad: function(p) {
    var v = $("[data-section-id]", p.target)[0];
    v && this._createInstance(v);
  },
  _onSectionUnload: function(p) {
    this.instances = _.filter(this.instances, function(v) {
      var y = v.id === p.detail.sectionId;
      return y && _.isFunction(v.onUnload) && v.onUnload(p), !y;
    });
  },
  _onSelect: function(p) {
    var v = _.find(this.instances, function(y) {
      return y.id === p.detail.sectionId;
    });
    !_.isUndefined(v) && _.isFunction(v.onSelect) && v.onSelect(p);
  },
  _onDeselect: function(p) {
    var v = _.find(this.instances, function(y) {
      return y.id === p.detail.sectionId;
    });
    !_.isUndefined(v) && _.isFunction(v.onDeselect) && v.onDeselect(p);
  },
  _onBlockSelect: function(p) {
    var v = _.find(this.instances, function(y) {
      return y.id === p.detail.sectionId;
    });
    !_.isUndefined(v) && _.isFunction(v.onBlockSelect) && v.onBlockSelect(p);
  },
  _onBlockDeselect: function(p) {
    var v = _.find(this.instances, function(y) {
      return y.id === p.detail.sectionId;
    });
    !_.isUndefined(v) &&
      _.isFunction(v.onBlockDeselect) &&
      v.onBlockDeselect(p);
  },
  register: function(p, v) {
    (this.constructors[p] = v), $("[data-section-type=" + p + "]").each(
      function(y, C) {
        this._createInstance(C, v);
      }.bind(this)
    );
  }
})), (window.slate = window.slate || {}), (slate.rte = {
  wrapTable: function() {
    $(".rte table").wrap('<div class="rte__table-wrapper"></div>');
  },
  iframeReset: function() {
    var p = $(
      '.rte iframe[src*="youtube.com/embed"], .rte iframe[src*="player.vimeo"]'
    ),
      v = p.add(".rte iframe#admin_bar_iframe");
    p.each(function() {
      $(this).wrap('<div class="video-wrapper"></div>');
    }), v.each(function() {
      this.src = this.src;
    });
  }
}), (window.slate = window.slate || {}), (slate.a11y = {
  pageLinkFocus: function(p) {
    var y = "js-focus-hidden";
    p
      .first()
      .attr("tabIndex", "-1")
      .focus()
      .addClass(y)
      .one("blur", function() {
        p.first().removeClass(y).removeAttr("tabindex");
      });
  },
  focusHash: function() {
    var p = window.location.hash;
    p && document.getElementById(p.slice(1)) && this.pageLinkFocus($(p));
  },
  bindInPageLinks: function() {
    $("a[href*=#]").on(
      "click",
      function(p) {
        this.pageLinkFocus($(p.currentTarget.hash));
      }.bind(this)
    );
  },
  trapFocus: function(p) {
    var v = p.namespace ? "focusin." + p.namespace : "focusin";
    p.$elementToFocus || (p.$elementToFocus = p.$container), p.$container.attr(
      "tabindex",
      "-1"
    ), p.$elementToFocus.focus(), $(document).off("focusin"), $(
      document
    ).on(v, function(y) {
      p.$container[0] === y.target ||
        p.$container.has(y.target).length ||
        p.$container.focus();
    });
  },
  removeTrapFocus: function(p) {
    var v = p.namespace ? "focusin." + p.namespace : "focusin";
    p.$container &&
      p.$container.length &&
      p.$container.removeAttr("tabindex"), $(document).off(v);
  }
}), (theme.Images = (function() {
  return {
    preload: function(S, I) {
      "string" == typeof S && (S = [S]);
      for (var P, T = 0; T < S.length; T++)
        (P = S[T]), this.loadImage(this.getSizedImageUrl(P, I));
    },
    loadImage: function(S) {
      new Image().src = S;
    },
    switchImage: function(S, I, T) {
      var P = this.imageSize(I.src), O = this.getSizedImageUrl(S.src, P);
      T ? T(O, S, I) : (I.src = O);
    },
    imageSize: function(S) {
      var I = S.match(
        /.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/
      );
      return null === I ? null : I[1];
    },
    getSizedImageUrl: function(S, I) {
      if (null == I) return S;
      if ("master" === I) return this.removeProtocol(S);
      var T = S.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
      if (null != T) {
        var P = S.split(T[0]), O = T[0];
        return this.removeProtocol(P[0] + "_" + I + O);
      }
      return null;
    },
    removeProtocol: function(S) {
      return S.replace(/http(s)?:/, "");
    }
  };
})()), (theme.Currency = (function() {
  return {
    formatMoney: function(y, C) {
      function k(T, P, O, A) {
        if (
          ((P = P || 2), (O = O || ","), (A = A || "."), isNaN(T) || null == T)
        )
          return 0;
        T = (T / 100).toFixed(P);
        var z = T.split("."),
          E = z[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + O),
          D = z[1] ? A + z[1] : "";
        return E + D;
      }
      "string" == typeof y && (y = y.replace(".", ""));
      var x = "", S = /\{\{\s*(\w+)\s*\}\}/, I = C || "${{amount}}";
      switch (I.match(S)[1]) {
        case "amount":
          x = k(y, 2);
          break;
        case "amount_no_decimals":
          x = k(y, 0);
          break;
        case "amount_with_comma_separator":
          x = k(y, 2, ".", ",");
          break;
        case "amount_no_decimals_with_comma_separator":
          x = k(y, 0, ".", ",");
          break;
        case "amount_no_decimals_with_space_separator":
          x = k(y, 0, " ");
      }
      return I.replace(S, x);
    }
  };
})()), (slate.Variants = (function() {
  function p(v) {
    (this.$container = v.$container), (this.product =
      v.product), (this.singleOptionSelector =
      v.singleOptionSelector), (this.originalSelectorId =
      v.originalSelectorId), (this.enableHistoryState =
      v.enableHistoryState), (this.currentVariant = this._getVariantFromOptions()), $(
      this.singleOptionSelector,
      this.$container
    ).on("change", this._onSelectChange.bind(this));
  }
  return (p.prototype = _.assignIn({}, p.prototype, {
    _getCurrentOptions: function() {
      var v = _.map($(this.singleOptionSelector, this.$container), function(y) {
        var C = $(y), k = C.attr("type"), x = {};
        return "radio" === k || "checkbox" === k
          ? !!C[0].checked &&
              ((x.value = C.val()), (x.index = C.data("index")), x)
          : ((x.value = C.val()), (x.index = C.data("index")), x);
      });
      return (v = _.compact(v)), v;
    },
    _getVariantFromOptions: function() {
      var v = this._getCurrentOptions(),
        y = this.product.variants,
        C = _.find(y, function(k) {
          return v.every(function(x) {
            return _.isEqual(k[x.index], x.value);
          });
        });
      return C;
    },
    _onSelectChange: function() {
      var v = this._getVariantFromOptions();
      this.$container.trigger({ type: "variantChange", variant: v }), v &&
        (this._updateMasterSelect(v), this._updateImages(v), this._updatePrice(
          v
        ), this._updateSKU(v), (this.currentVariant = v), this
          .enableHistoryState && this._updateHistoryState(v));
    },
    _updateImages: function(v) {
      var y = v.featured_image || {},
        C = this.currentVariant.featured_image || {};
      v.featured_image &&
        y.src !== C.src &&
        this.$container.trigger({ type: "variantImageChange", variant: v });
    },
    _updatePrice: function(v) {
      (v.price === this.currentVariant.price &&
        v.compare_at_price === this.currentVariant.compare_at_price) ||
        this.$container.trigger({ type: "variantPriceChange", variant: v });
    },
    _updateSKU: function(v) {
      v.sku === this.currentVariant.sku ||
        this.$container.trigger({ type: "variantSKUChange", variant: v });
    },
    _updateHistoryState: function(v) {
      if (history.replaceState && v) {
        var y =
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname +
          "?variant=" +
          v.id;
        window.history.replaceState({ path: y }, "", y);
      }
    },
    _updateMasterSelect: function(v) {
      $(this.originalSelectorId, this.$container).val(v.id);
    }
  })), p;
})()), (theme.Drawers = (function() {
  function p(v, y, C) {
    return (this.nodes = {
      $parent: $("html").add("body"),
      $page: $("#PageContainer")
    }), (this.config = $.extend(
      {
        close: ".js-drawer-close",
        open: ".js-drawer-open-" + y,
        openClass: "js-drawer-open",
        dirOpenClass: "js-drawer-open-" + y
      },
      C
    )), (this.position = y), (this.$drawer = $("#" + v)), !!this.$drawer
      .length && void ((this.drawerIsOpen = !1), this.init());
  }
  return (p.prototype.init = function() {
    $(this.config.open).on("click", $.proxy(this.open, this)), this.$drawer.on(
      "click",
      this.config.close,
      $.proxy(this.close, this)
    );
  }), (p.prototype.open = function(v) {
    var y = !1;
    return (v ? v.preventDefault() : (y = !0), v &&
      v.stopPropagation &&
      (v.stopPropagation(), (this.$activeSource = $(v.currentTarget))), this
      .drawerIsOpen && !y)
      ? this.close()
      : (this.$drawer.prepareTransition(), this.nodes.$parent.addClass(
          this.config.openClass + " " + this.config.dirOpenClass
        ), (this.drawerIsOpen = !0), slate.a11y.trapFocus({
          $container: this.$drawer,
          namespace: "drawer_focus"
        }), this.config.onDrawerOpen &&
          "function" == typeof this.config.onDrawerOpen &&
          !y &&
          this.config.onDrawerOpen(), this.$activeSource &&
          this.$activeSource.attr("aria-expanded") &&
          this.$activeSource.attr(
            "aria-expanded",
            "true"
          ), this.bindEvents(), this);
  }), (p.prototype.close = function() {
    this.drawerIsOpen &&
      ($(document.activeElement).trigger(
        "blur"
      ), this.$drawer.prepareTransition(), this.nodes.$parent.removeClass(
        this.config.dirOpenClass + " " + this.config.openClass
      ), (this.drawerIsOpen = !1), slate.a11y.removeTrapFocus({
        $container: this.$drawer,
        namespace: "drawer_focus"
      }), this.unbindEvents());
  }), (p.prototype.bindEvents = function() {
    this.nodes.$parent.on(
      "keyup.drawer",
      $.proxy(function(v) {
        return 27 !== v.keyCode || (this.close(), !1);
      }, this)
    ), this.nodes.$page.on("touchmove.drawer", function() {
      return !1;
    }), this.nodes.$page.on(
      "click.drawer",
      $.proxy(function() {
        return this.close(), !1;
      }, this)
    );
  }), (p.prototype.unbindEvents = function() {
    this.nodes.$page.off(".drawer"), this.nodes.$parent.off(".drawer");
  }), p;
})()), (window.theme = window.theme || {}), (theme.Header = (function() {
  function p() {
    $(k.navigationTarget).html(""), $(k.navigationSource)
      .detach()
      .appendTo(k.navigationTarget);
  }
  function v() {
    $(k.navigation).mmenu({ offCanvas: !1, navbar: { title: !1 } }), $(
      k.navigationTrigger
    ).on("click", function(x) {
      x.preventDefault();
      var S = $(".mm-listview > li");
      S.velocity("transition.slideLeftIn", {
        delay: 500,
        duration: 300,
        stagger: 100
      });
    });
  }
  function y() {
    if ("true" == $(k.header).attr("data-my-sticky")) {
      function H() {
        (U = F.height()), (D = E.height()), (B = E.scrollTop()), (q =
          V - B), P.toggleClass("header--narrow", B > I), $(
          document.body
        ).toggleClass("sticky-header-show", B > I), B <= z
          ? P.removeClass(x)
          : 0 < q && P.hasClass(x)
              ? P.removeClass(x)
              : 0 > q &&
                  (B + D >= U && P.hasClass(x)
                    ? P.removeClass(x)
                    : P.addClass(x)), (V = B);
      }
      var x = "header--hidden", I = 20, P = $(k.header);
      if (!P.length) return !0;
      "false" == $(k.header).attr("data-my-sticky-scroll") &&
        (x = ""), "true" == $(k.header).attr("data-my-sticky-mobile") &&
        $(k.header).addClass("mobile");
      var O = $("#topbar"),
        A = $("#masthead"),
        z = O.length ? O.outerHeight() : 0;
      (z += A.length ? A.outerHeight() : 0), (I += z);
      var E = $(window),
        D = 0,
        B = 0,
        V = 0,
        q = 0,
        F = $(document),
        U = 0,
        L = function(M, W) {
          var R, Q;
          return function() {
            var N = this, K = arguments, G = +new Date();
            R && G < R + M
              ? (clearTimeout(Q), (Q = setTimeout(function() {
                  (R = G), W.apply(N, K);
                }, M)))
              : ((R = G), W.apply(N, K));
          };
        };
      E.on(
        "scroll",
        L(50, function() {
          H();
        })
      ), H();
    }
  }
  var k = {
    header: ".site-header",
    navigation: "nav#menu",
    navigationTrigger: ".site-header .menu-trigger",
    navigationSource: ".site-header .menu-offcanvas",
    navigationTarget: ".offcanvas_aside_left #menu-offcanvas"
  };
  return {
    init: function() {
      $(k.navigation).length && (p(), v(), y());
    }
  };
})()), (window.theme = window.theme || {}), (theme.Search = (function() {
  function p() {
    $(C.searchTarget).html(""), $(C.search).detach().appendTo(C.searchTarget);
  }
  function v() {
    function k() {
      var A = P.val();
      if (2 > A.length)
        return I.removeClass(
          "searching found-products found-no-product"
        ).addClass("invalid-length"), void I.find(
          ".search_suggestion"
        ).slideDown();
      var z = "/search?" + T.serialize();
      if (
        (I.find(".search_suggestion").slideUp(function() {
          I.removeClass("found-products found-no-product").addClass(
            "searching"
          );
        }), A in S)
      ) {
        var E = S[A];
        I.removeClass("searching"), E.found
          ? (I.addClass("found-products"), O.find(
              ".search_result .suggestion_unlisted"
            ).html(E.products), O.find(
              ".search_result .suggestion_more a"
            ).attr("href", z), O.find(
              ".search_result .suggestion_unlisted, .search_result .suggestion_more"
            ).slideDown(function() {
              I.removeClass("invalid-length");
            }))
          : (I.addClass("found-no-product"), O.find(
              ".search_result .suggestion_unlisted"
            ).html(
              $('<div class="not-found text-center" />').text(E.text)
            ), O.find(".search_result .suggestion_more a").attr(
              "href",
              "#"
            ), O.find(".search_result .suggestion_more").slideUp(), O.find(
              ".search_result .suggestion_unlisted"
            ).slideDown(function() {
              I.removeClass("invalid-length");
            })), I.addClass("searched");
      } else
        x = $.get(
          z,
          function(D) {
            var B = $(D),
              V = B.find("#content-position .products"),
              q = B.find("#content-position .no-products .empty");
            I.removeClass("searching"), V.length
              ? (V.children(".last").nextAll().remove(), I.addClass(
                  "found-products"
                ), O.find(".search_result .suggestion_unlisted").html(
                  V
                ), O.find(".search_result .suggestion_more a").attr(
                  "href",
                  z
                ), O.find(
                  ".search_result .suggestion_unlisted, .search_result .suggestion_more"
                ).slideDown(function() {
                  I.removeClass("invalid-length");
                }), (S[A] = { found: !0, products: V }))
              : q.length &&
                  (I.addClass("found-no-product"), O.find(
                    ".search_result .suggestion_unlisted"
                  ).html(
                    $('<div class="not-found text-center" />').text(q.text())
                  ), O.find(".search_result .suggestion_more a").attr(
                    "href",
                    "#"
                  ), O.find(
                    ".search_result .suggestion_more"
                  ).slideUp(), O.find(
                    ".search_result .suggestion_unlisted"
                  ).slideDown(function() {
                    I.removeClass("invalid-length");
                  }), (S[A] = {
                    found: !1,
                    text: q.text()
                  })), theme.CurrencyPicker.convert(
              ".search_result .products .product .money"
            ), I.addClass("searched");
          },
          "html"
        );
    }
    var x = null,
      S = {},
      I = $("#search-offcanvas"),
      T = I.find("form"),
      P = T.find("input.search-field"),
      O = I.find(".suggestion_results");
    I.on("keyup", ".search-field", function(A) {
      var z = !1;
      "undefined" == typeof A.which
        ? (z = !0)
        : "number" == typeof A.which &&
            0 < A.which &&
            (z = !A.ctrlKey && !A.metaKey && !A.altKey);
      z && (x && (x.abort(), P.focus()), k());
    }).on("focusout", ".search-field", function() {
      2 > P.val().length &&
        O.find(
          ".search_result .suggestion_unlisted, .buttons"
        ).slideUp(function() {
          I.removeClass(
            "searching searched found-products found-no-product invalid-length"
          );
        });
    });
  }
  var C = {
    search: "#search-section",
    searchTarget: ".offcanvas_aside_right .offcanvas_search"
  };
  return {
    init: function() {
      $(C.search).length && (p(), v());
    }
  };
})()), (window.theme = window.theme || {
}), (theme.CurrencyPicker = (function() {
  function p() {
    var x = $(C.currency).closest(".language_currency");
    (k.currency_format = x
      .find(".currency_format")
      .val()), (k.shop_currency = x
      .find(".shop_currency")
      .val()), (k.default_currency = x
      .find(".default_currency")
      .val()), (k.money_with_currency_format = x
      .find(".money_with_currency_format")
      .val()), (k.money_format = x
      .find(".money_format")
      .val()), (Currency.format = k.currency_format);
    var S = k.shop_currency;
    (Currency.moneyFormats[S].money_with_currency_format =
      k.money_with_currency_format), (Currency.moneyFormats[S].money_format =
      k.money_format);
    var I = k.default_currency;
    try {
      var T = Currency.cookie.read();
      $("span.money span.money").each(function() {
        $(this).parents("span.money").removeClass("money");
      }), $("span.money").each(function() {
        $(this).attr("data-currency-" + k.shop_currency, $(this).html());
      }), null == T
        ? S === I ? (Currency.currentCurrency = I) : Currency.convertAll(S, I)
        : $(C.currency).length &&
            0 === $(C.currency + " .currency[data-code=" + T + "]").size()
            ? ((Currency.currentCurrency = S), Currency.cookie.write(S))
            : T === S
                ? (Currency.currentCurrency = S)
                : Currency.convertAll(S, T), $(
        C.currency
      ).on("click", ".currency:not(.active)", function() {
        var A = $(this).attr("data-code");
        Currency.convertAll(
          Currency.currentCurrency,
          A
        ), $(C.currencyPicker).removeClass("active"), $(this).addClass("active");
      });
      var P = window.selectCallback;
      $("body").on("ajaxCart.afterCartLoad", function() {
        Currency.convertAll(
          S,
          $(C.currencyActive).attr("data-code")
        ), $(C.currencyPicker).removeClass("active"), $(C.currency + " .currency[data-code=" + Currency.currentCurrency + "]").addClass("active");
      }), $(C.currencyPicker).removeClass("active"), $(
        C.currency + " .currency[data-code=" + Currency.currentCurrency + "]"
      ).addClass("active");
    } catch (A) {
      console.log(A.message);
    }
  }
  var C = {
    currency: ".language_currency .currency_switcher",
    currencyPicker: ".language_currency .currency_switcher .currency",
    currencyActive: ".language_currency .currency_switcher .currency.active"
  },
    k = {
      currency_format: "",
      shop_currency: "",
      default_currency: "",
      money_with_currency_format: "",
      money_format: ""
    };
  return {
    init: function() {
      $(C.currency).length && p();
    },
    convert: function(x) {
      if ($(C.currency).length)
        try {
          $(x).each(function() {
            $(this).attr("data-currency-" + k.shop_currency, $(this).html());
          }), Currency.convertAll(
            k.shop_currency,
            Currency.cookie.read(),
            x,
            k.currency_format
          );
        } catch (S) {
          console.log(S.message);
        }
    }
  };
})()), (function() {
  function p(C) {
    var k = document.createElement("a");
    return (k.ref = C), k.hostname;
  }
  var y = $({ backButton: ".return-link" }.backButton);
  document.referrer &&
    y.length &&
    window.history.length &&
    y.one("click", function(C) {
      C.preventDefault();
      var k = p(document.referrer), x = p(window.location.href);
      return x === k && history.back(), !1;
    });
})(), (theme.Slideshow = (function() {
  function p(I) {
    (this.$slideshow = $(I)), (this.$wrapper = this.$slideshow.closest(
      "." + S.wrapper
    )), (this.$pause = this.$wrapper.find(
      "." + S.pauseButton
    )), (this.settings = {
      accessibility: !0,
      arrows: !0,
      dots: !1,
      fade: !0,
      draggable: !0,
      touchThreshold: 20,
      autoplay: this.$slideshow.data("autoplay"),
      autoplaySpeed: this.$slideshow.data("speed")
    }), this.$slideshow.on("beforeChange", C.bind(this)), this.$slideshow.on(
      "init",
      y.bind(this)
    ), this.$slideshow.slick(this.settings), this.$pause.on(
      "click",
      this.togglePause.bind(this)
    ), v();
  }
  function v() {
    $("." + S.imageBackground).bgLoaded({
      afterLoaded: function() {
        $("." + S.wrapper).removeClass("loading").addClass("loaded"), $(
          "." + S.wrapper
        )
          .find(".tp-loader")
          .hide();
      }
    });
  }
  function y(I, T) {
    var P = T.$slider,
      O = T.$list,
      A = this.$wrapper,
      z = this.settings.autoplay;
    O.removeAttr("aria-live"), A.on("focusin", function(E) {
      A.has(E.target).length &&
        (O.attr("aria-live", "polite"), z && P.slick("slickPause"));
    }), A.on("focusout", function(E) {
      if (A.has(E.target).length && (O.removeAttr("aria-live"), z)) {
        if ($(E.target).hasClass(S.closeVideoBtn)) return;
        P.slick("slickPlay");
      }
    }), T.$dots &&
      T.$dots.on("keydown", function(E) {
        37 === E.which &&
          P.slick(
            "slickPrev"
          ), 39 === E.which && P.slick("slickNext"), (37 === E.which || 39 === E.which) && T.$dots.find(".slick-active button").focus();
      });
  }
  function C(I, T, P, O) {
    var A = T.$slider,
      z = A.find("." + S.currentSlide),
      E = A.find('.slideshow__slide[data-slick-index="' + O + '"]');
    if (k(z)) {
      var D = z.find("." + S.video), B = D.attr("id");
      theme.SlideshowVideo.pauseVideo(B), D.attr("tabindex", "-1");
    }
    if (k(E)) {
      var V = E.find("." + S.video),
        q = V.attr("id"),
        F = V.hasClass(S.videoBackground);
      F ? theme.SlideshowVideo.playVideo(q) : V.attr("tabindex", "0");
    }
  }
  function k(I) {
    return I.find("." + S.video).length;
  }
  function x(I) {
    return "#Slideshow-" + I.data("id");
  }
  this.$slideshow = null;
  var S = {
    wrapper: "slideshow-wrapper",
    slideshow: "slideshow",
    imageBackground: "slideshow__image",
    currentSlide: "slick-current",
    video: "slideshow__video",
    videoBackground: "slideshow__video--background",
    closeVideoBtn: "slideshow__video-control--close",
    pauseButton: "slideshow__pause",
    isPaused: "is-paused"
  };
  return (p.prototype.togglePause = function() {
    var I = x(this.$pause);
    this.$pause.hasClass(S.isPaused)
      ? (this.$pause.removeClass(S.isPaused), $(I).slick("slickPlay"))
      : (this.$pause.addClass(S.isPaused), $(I).slick("slickPause"));
  }), p;
})());
function onYouTubeIframeAPIReady() {
  theme.SlideshowVideo.loadVideos();
}
(theme.SlideshowVideo = (function() {
  function x(ee, te) {
    var ae = Z[ee], se = Y[ee], oe = Z[ee].$parentSlide;
    if (K) E(ae);
    else if (te || (R && Q))
      return oe.removeClass(X.loading), E(ae), void se.playVideo();
    R || I(se, oe);
  }
  function S(ee) {
    var te = ee ? X.supportsAutoplay : X.supportsNoAutoplay;
    $(document.documentElement).addClass(te), ee || (K = !0), (R = !0);
  }
  function I(ee, te) {
    ee.playVideo(), T(ee)
      .then(function() {
        S(!0);
      })
      .fail(function() {
        S(!1), ee.stopVideo();
      })
      .always(function() {
        (R = !0), te.removeClass(X.loading);
      });
  }
  function T(ee) {
    var ae, se, te = $.Deferred();
    return (ae = setInterval(function() {
      0 >= ee.getCurrentTime() ||
        ((Q = !0), clearInterval(ae), clearTimeout(se), te.resolve());
    }, 500)), (se = setTimeout(function() {
      clearInterval(ae), te.reject();
    }, 4e3)), te;
  }
  function P() {
    N ||
      (750 > $(window).width()
        ? (K = !0)
        : window.mobileCheck() && (K = !0), K && S(!1), (N = !0));
  }
  function z(ee) {
    switch (ee.type) {
      case "background":
        Y[ee.id].seekTo(0);
        break;
      case "background-chrome":
        Y[ee.id].seekTo(0), B(ee.id);
        break;
      case "chrome":
        B(ee.id);
    }
  }
  function E(ee) {
    var te = ee.$parentSlideshowWrapper, ae = ee.$parentSlide;
    if ((ae.removeClass(X.loading), "background" !== ee.status)) {
      switch (($("#" + ee.id).attr("tabindex", "0"), ee.type)) {
        case "chrome":
        case "background-chrome":
          te.removeClass(X.paused).addClass(X.playing), ae
            .removeClass(X.paused)
            .addClass(X.playing);
      }
      ae.find("." + X.closeVideoBtn).focus();
    }
  }
  function D(ee) {
    var te = ee.$parentSlideshowWrapper, ae = ee.$parentSlide;
    return "background-chrome" === ee.type
      ? void B(ee.id)
      : void ("closed" !== ee.status &&
          "background" !== ee.type &&
          (te.addClass(X.paused), ae.addClass(X.paused)), "chrome" ===
          ee.type &&
          "closed" === ee.status &&
          (te.removeClass(X.paused), ae.removeClass(X.paused)), te.removeClass(
          X.playing
        ), ae.removeClass(X.playing));
  }
  function B(ee) {
    var te = Z[ee],
      ae = te.$parentSlideshowWrapper,
      se = te.$parentSlide,
      oe = [X.pause, X.playing].join(" ");
    switch (($("#" + te.id).attr("tabindex", "-1"), (te.status =
      "closed"), te.type)) {
      case "background-chrome":
        Y[ee].mute(), H(ee);
        break;
      case "chrome":
        Y[ee].stopVideo(), D(te);
    }
    ae.removeClass(oe), se.removeClass(oe);
  }
  function V(ee) {
    return Z[ee.target.h.id];
  }
  function q(ee) {
    var te = Z[ee];
    switch ((te.$parentSlide.addClass(X.loading), (te.status =
      "open"), te.type)) {
      case "background-chrome":
        L(ee, te), Y[ee].unMute(), x(ee, !0);
        break;
      case "chrome":
        x(ee, !0);
    }
    $(document).on("keydown.videoPlayer", function(ae) {
      27 === ae.keyCode && B(ee);
    });
  }
  function F() {
    $("." + X.videoBackground).each(function(ee, te) {
      U($(te));
    });
  }
  function U(ee) {
    var te = ee.closest("." + X.slide);
    if (!te.hasClass(X.slickClone)) {
      var ae = te.width(), se = ee.width(), oe = ee.height();
      ae / J.ratio < oe
        ? ((se = Math.ceil(oe * J.ratio)), ee
            .width(se)
            .height(oe)
            .css({ left: (ae - se) / 2, top: 0 }))
        : ((oe = Math.ceil(ae / J.ratio)), ee
            .width(ae)
            .height(oe)
            .css({
              left: 0,
              top: (oe - oe) / 2
            })), ee.prepareTransition().addClass(X.loaded);
    }
  }
  function L(ee) {
    $("#" + ee)
      .removeAttr("style")
      .removeClass(X.videoBackground)
      .addClass(X.videoChrome), Z[ee].$parentSlideshowWrapper
      .removeClass(X.slideBackgroundVideo)
      .addClass(X.playing), Z[ee].$parentSlide
      .removeClass(X.slideBackgroundVideo)
      .addClass(X.playing), (Z[ee].status = "open");
  }
  function H(ee) {
    var te = $("#" + ee).addClass(X.videoBackground).removeClass(X.videoChrome);
    Z[ee].$parentSlide.addClass(X.slideBackgroundVideo), (Z[ee].status =
      "background"), U(te);
  }
  function M() {
    $(document).on("click.videoPlayer", "." + X.playVideoBtn, function(ee) {
      var te = $(ee.currentTarget).data("controls");
      q(te);
    }), $(document).on("click.videoPlayer", "." + X.closeVideoBtn, function(
      ee
    ) {
      var te = $(ee.currentTarget).data("controls");
      B(te);
    }), $(window).on(
      "resize.videoPlayer",
      $.debounce(250, function() {
        G && F();
      })
    );
  }
  var R = !1,
    Q = !1,
    N = !1,
    K = !1,
    G = !1,
    Z = {},
    Y = [],
    J = {
      ratio: 16 / 9,
      playerVars: {
        iv_load_policy: 3,
        modestbranding: 1,
        autoplay: 0,
        controls: 0,
        showinfo: 0,
        wmode: "opaque",
        branding: 0,
        autohide: 0,
        rel: 0
      },
      events: {
        onReady: function(ee) {
          ee.target.setPlaybackQuality("hd1080");
          var te = V(ee);
          switch ((P(), $("#" + te.id).attr("tabindex", "-1"), F(), te.type)) {
            case "background-chrome":
            case "background":
              ee.target.mute(), te.$parentSlide.hasClass(X.currentSlide) &&
                x(te.id);
          }
          te.$parentSlide.addClass(X.loaded);
        },
        onStateChange: function(ee) {
          var te = V(ee);
          switch (ee.data) {
            case 0:
              z(te);
              break;
            case 1:
              E(te);
              break;
            case 2:
              D(te);
          }
        }
      }
    },
    X = {
      playing: "video-is-playing",
      paused: "video-is-paused",
      loading: "video-is-loading",
      loaded: "video-is-loaded",
      slideshowWrapper: "slideshow-wrapper",
      slide: "slideshow__slide",
      slideBackgroundVideo: "slideshow__slide--background-video",
      slideDots: "slick-dots",
      videoChrome: "slideshow__video--chrome",
      videoBackground: "slideshow__video--background",
      playVideoBtn: "slideshow__video-control--play",
      closeVideoBtn: "slideshow__video-control--close",
      currentSlide: "slick-current",
      slickClone: "slick-cloned",
      supportsAutoplay: "autoplay",
      supportsNoAutoplay: "no-autoplay"
    };
  return {
    init: function(ee) {
      if (
        ee.length &&
        ((Z[ee.attr("id")] = {
          id: ee.attr("id"),
          videoId: ee.data("id"),
          type: ee.data("type"),
          status: "chrome" === ee.data("type") ? "closed" : "background",
          videoSelector: ee.attr("id"),
          $parentSlide: ee.closest("." + X.slide),
          $parentSlideshowWrapper: ee.closest("." + X.slideshowWrapper),
          controls: "background" === ee.data("type") ? 0 : 1,
          slideshow: ee.data("slideshow")
        }), !G)
      ) {
        var te = document.createElement("script");
        te.src = "https://www.youtube.com/iframe_api";
        var ae = document.getElementsByTagName("script")[0];
        ae.parentNode.insertBefore(te, ae);
      }
    },
    loadVideos: function() {
      for (var ee in Z)
        if (Z.hasOwnProperty(ee)) {
          var te = $.extend({}, J, Z[ee]);
          (te.playerVars.controls = te.controls), (Y[ee] = new YT.Player(
            ee,
            te
          ));
        }
      M(), (G = !0);
    },
    loadVideo: function(ee) {
      if (G) {
        var te = $.extend({}, J, Z[ee]);
        (te.playerVars.controls = te.controls), (Y[ee] = new YT.Player(
          ee,
          te
        )), M();
      }
    },
    playVideo: function(ee) {
      (N || K) && (!ee || "function" != typeof Y[ee].playVideo || x(ee));
    },
    pauseVideo: function(ee) {
      Y[ee] && "function" == typeof Y[ee].pauseVideo && Y[ee].pauseVideo();
    },
    removeEvents: function() {
      $(document).off(".videoPlayer"), $(window).off(".videoPlayer");
    }
  };
})()), (function() {
  var p = $("#BlogTagFilter");
  p.length &&
    p.on("change", function() {
      location.href = $(this).val();
    });
})(), (window.theme = theme || {}), (theme.customerTemplates = (function() {
  function p() {
    $("#RecoverPassword").on("click", function(x) {
      x.preventDefault(), v();
    }), $("#HideRecoverPasswordLink").on("click", function(x) {
      x.preventDefault(), v();
    });
  }
  function v() {
    $("#RecoverPasswordForm").toggleClass("hide"), $(
      "#CustomerLoginForm"
    ).toggleClass("hide");
  }
  function y() {
    var x = $(".reset-password-success");
    x.length && $("#ResetSuccess").removeClass("hide");
  }
  function C() {
    var x = $("#AddressNewForm");
    x.length &&
      (Shopify &&
        new Shopify.CountryProvinceSelector(
          "AddressCountryNew",
          "AddressProvinceNew",
          { hideElement: "AddressProvinceContainerNew" }
        ), $(".address-country-option").each(function() {
        var S = $(this).data("form-id");
        new Shopify.CountryProvinceSelector(
          "AddressCountry_" + S,
          "AddressProvince_" + S,
          { hideElement: "AddressProvinceContainer_" + S }
        );
      }), $(".address-new-toggle").on("click", function() {
        x.toggleClass("hide");
      }), $(".address-edit-toggle").on("click", function() {
        var S = $(this).data("form-id");
        $("#EditAddress_" + S).toggleClass("hide");
      }), $(".address-delete").on("click", function() {
        var S = $(this), I = S.data("form-id"), T = S.data("confirm-message");
        confirm(T || "Are you sure you wish to delete this address?") &&
          Shopify.postLink("/account/addresses/" + I, {
            parameters: { _method: "delete" }
          });
      }));
  }
  function k() {
    var x = window.location.hash;
    "#recover" === x && v();
  }
  return {
    init: function() {
      k(), p(), y(), C();
    }
  };
})()), (window.theme = window.theme || {}), (theme.Filters = (function() {
  function p() {
    $(C.filter).length &&
      ($(C.fiterTarget).html(""), $(C.filter)
        .clone()
        .appendTo(C.fiterTarget), $(".offcanvas_shop_sidebar").fitVids());
  }
  function v(k) {
    this.$container = $(k);
    p(), $(document).on(
      "change",
      C.sortSelection,
      this._onSortChange.bind(this)
    ), $(document).on(
      "change",
      C.filterSelection,
      this._onFilterChange.bind(this)
    ), $(document).on("click", C.filterClear, this._onFilterClear.bind(this));
  }
  var C = {
    sortSelection: ".filters-toolbar__input--sort",
    defaultSort: ".collection-header__default-sort",
    filter: ".shop-page #secondary",
    fiterTarget: ".offcanvas_aside_left .offcanvas_shop_sidebar .widget-area",
    filterSelection: ".advanced-filter .filter",
    filterClear: ".widget_filter .clear"
  };
  return (v.prototype = _.assignIn({}, v.prototype, {
    _filterAjaxClick: function(k) {
      delete Shopify.queryParams.page;
      var x = this._filterCreateUrl(k);
      this._filterGetContent(x);
    },
    _filterCreateUrl: function(k) {
      var x = $.param(Shopify.queryParams).replace(/%2B/g, "+");
      return k ? "" == x ? k : k + "?" + x : location.pathname + "?" + x;
    },
    _filterGetContent: function(k) {
      var x = "#content-position", S = ".shop_sidebar #secondary", T = this;
      $.ajax({
        type: "get",
        url: k,
        beforeSend: function() {
          $("body").addClass("loading");
        },
        success: function(P) {
          var O = $(P).filter("title").text();
          $(x).empty().html($(P).find(x).html()), $(S)
            .empty()
            .html($(P).find(S).html()), $(".offcanvas_shop_sidebar #secondary")
            .empty()
            .html($(P).find(S).html()), History.pushState(
            { param: Shopify.queryParams },
            O,
            k
          ), setTimeout(function() {
            $("html,body").animate(
              { scrollTop: $("body .site-content").offset().top },
              500,
              "swing"
            );
          }, 100), $("body").removeClass("loading"), T._mapReviews();
        },
        error: function() {
          $("body").removeClass("loading");
        }
      });
    },
    _mapReviews: function() {
      "undefined" != typeof SPR &&
        (SPR.registerCallbacks(), SPR.initRatingHandler(), SPR.initDomEls(), SPR.loadProducts(), SPR.loadBadges());
    },
    _onFilterClear: function(k) {
      var x = [];
      Shopify.queryParams.constraint &&
        (x = Shopify.queryParams.constraint.split("+"));
      var S = $(k.currentTarget),
        I = S.closest(".widget_filter").find("select");
      0 < I.length &&
        I.find("option").each(function() {
          var P = $(this).val();
          if (P) {
            var O = x.indexOf(P);
            0 <= O && x.splice(O, 1);
          }
        });
      var T = S.closest(".widget_filter").find("input");
      0 < T.length &&
        T.each(function() {
          var P = $(this).val();
          if (P) {
            var O = x.indexOf(P);
            0 <= O && x.splice(O, 1);
          }
        }), x.length
        ? (Shopify.queryParams.constraint = x.join("+"))
        : delete Shopify.queryParams.constraint, this._filterAjaxClick();
    },
    _onSortChange: function(k) {
      var x = $(k.currentTarget),
        S = $(C.defaultSort, this.$container).val(),
        I = x.val() ? x.val() : S;
      (Shopify.queryParams.sort_by = I), this._filterAjaxClick();
    },
    _onFilterChange: function(k) {
      var x = $(k.currentTarget),
        S = x.closest(".advanced-filter").attr("data-multi_choice"),
        I = [];
      if (
        (Shopify.queryParams.constraint &&
          (I = Shopify.queryParams.constraint.split("+")), "false" == S &&
          !x.closest(".filter-tag").hasClass("active"))
      ) {
        var T = x.closest(".advanced-filter").find(".active input");
        0 < T.length &&
          T.each(function() {
            var z = $(this).val();
            if (z) {
              var E = I.indexOf(z);
              0 <= E && I.splice(E, 1);
            }
          });
      }
      var P = x.closest(".advanced-filter").find("select");
      0 < P.length &&
        P.find("option").each(function() {
          var z = $(this).val();
          if (z) {
            var E = I.indexOf(z);
            0 <= E && I.splice(E, 1);
          }
        });
      var O = x.val();
      if (O) {
        var A = I.indexOf(O);
        0 <= A ? I.splice(A, 1) : I.push(O);
      }
      I.length
        ? (Shopify.queryParams.constraint = I.join("+"))
        : delete Shopify.queryParams.constraint, this._filterAjaxClick();
    },
    onUnload: function() {
      this.$sortSelect.off(
        "change",
        this._onSortChange
      ), this.$filterSelect.off(
        "change",
        this._onFilterChange
      ), this.$filterClear.off("click", this._onFilterClear);
    }
  })), v;
})()), (window.theme = window.theme || {}), (theme.HeaderSection = (function() {
  return function() {
    theme.Header.init(), theme.Search.init(), theme.CurrencyPicker.init();
  };
})()), (theme.MegaMenu = (function() {
  function p() {
    this.initMegaMenu();
  }
  return (p.prototype = _.assignIn({}, p.prototype, {
    initMegaMenu: function() {
      if ($("#menu-primary-mega-menu").length) {
        var v = $("#menu-primary-mega-menu .list-item").html();
        $(".site-header .list-item").html(v), $("#menu .offcanvas_menu")
          .find(".menu-item")
          .remove(), $("#menu .offcanvas_menu").prepend(v);
      }
    }
  })), p;
})()), (theme.Maps = (function() {
  function p(I) {
    (this.$container = $(I)), "loaded" === k
      ? this.createMap()
      : (x.push(this), "loading" != k &&
          ((k = "loading"), "undefined" == typeof window.google &&
            $.getScript(
              "https://maps.googleapis.com/maps/api/js?key=" + S
            ).then(function() {
              (k = "loaded"), v();
            })));
  }
  function v() {
    $.each(x, function(I, T) {
      T.createMap();
    });
  }
  function y(I) {
    var T = $.Deferred(),
      P = new google.maps.Geocoder(),
      O = I.data("address-setting");
    return P.geocode({ address: O }, function(A, z) {
      z !== google.maps.GeocoderStatus.OK && T.reject(z), T.resolve(A);
    }), T;
  }
  var C = { zoom: 14 }, k = null, x = [], S = theme.mapKey ? theme.mapKey : "";
  return (p.prototype = _.assignIn({}, p.prototype, {
    createMap: function() {
      var I = this.$container.find(".map-section__container");
      return y(I)
        .then(
          function(T) {
            var P = {
              zoom: C.zoom,
              center: T[0].geometry.location,
              disableDefaultUI: !0
            },
              O = (this.map = new google.maps.Map(I[0], P)),
              A = (this.center = O.getCenter()),
              z = new google.maps.Marker({ map: O, position: O.getCenter() });
            google.maps.event.addDomListener(
              window,
              "resize",
              $.debounce(250, function() {
                google.maps.event.trigger(O, "resize"), O.setCenter(A);
              })
            );
          }.bind(this)
        )
        .fail(function() {
          var T;
          (T = "ZERO_RESULTS" === status
            ? theme.strings.addressNoResults
            : "OVER_QUERY_LIMIT" === status
                ? theme.strings.addressQueryLimit
                : theme.strings
                    .addressError), I.parent().addClass("page-width map-section--load-error").html('<div class="errors text-center">' + T + "</div>");
        });
    },
    onUnload: function() {
      google.maps.event.clearListeners(this.map, "resize");
    }
  })), p;
})());
function gm_authFailure() {
  $(".map-section").addClass("map-section--load-error"), $(
    ".map-section__container"
  ).remove(), $(".map-section__link").remove(), $(
    ".map-section__overlay"
  ).after(
    '<div class="errors text-center">' + theme.strings.authError + "</div>"
  );
}
(theme.Product = (function() {
  function p(v) {
    var y = (this.$container = $(v)),
      C = (this.sectionId = y.attr("data-section-id"));
    (this.settings = {
      mediaQueryMediumUp: "screen and (min-width: 750px)",
      mediaQuerySmall: "screen and (max-width: 749px)",
      bpSmall: !1,
      enableHistoryState: y.data("enable-history-state") || !1,
      imageSize: null,
      namespace: ".slideshow-" + C,
      sectionId: C,
      sliderActive: !1,
      swatch_color: y.attr("data-product_swatch_color"),
      swatch_size: y.attr("data-product_swatch_size")
    }), (this.selectors = {
      product: "#ProductSection-" + C,
      addToCart: "#AddToCart-" + C,
      addToCartText: "#AddToCartText-" + C,
      stockText: ".stock-" + C,
      comparePrice: "#ComparePrice-" + C,
      originalPrice: "#ProductPrice-" + C,
      SKU: ".variant-sku",
      originalPriceWrapper: ".product-price__price-" + C,
      originalSelectorId: "#ProductSelect-" + C,
      productFeaturedImage: ".FeaturedImage-" + C,
      productImageWrap: "#FeaturedImageZoom-" + C,
      productQuickViewFeaturedImage: ".QuickViewFeaturedImage-" + C,
      productCarouselWrap: "#CarouselImages-" + C,
      productPrices: ".product-single__price-" + C,
      productThumbImages: "#product_thumbnails_swiper_container-" + C,
      productMainImages: "#product-images-carousel-" + C,
      productQuickViewMainImages: "#product-quickview-images-carousel-" + C,
      productUpsells: "#product-upsells-" + C,
      saleLabel: ".product-price__sale-label-" + C,
      singleOptionSelector: ".single-option-selector-" + C,
      singleOptionSelectorId: "#single-option-selector-" + C,
      singleOptionSwatches: "tawcvs-swatches-" + C,
      countDownId: ".countdown-" + C,
      threedId: ".threed-id-" + C
    }), $("#ProductJson-" + C).html() &&
      ((this.productSingleObject = JSON.parse(
        document.getElementById("ProductJson-" + C).innerHTML
      )), this._initCountDown(), this._initFeature(), this._stringOverrides(), this._initVariants(), this._initSwatches(), this._initImages(), this._initImagesScroll(), this._initImagesCarousel(), this._initGallery(), this._initTab(), this._socialSharing(), this._initInstagram(), this._relatedProducts(), this._stickUpSells(), this._upsellProducts());
  }
  return (p.prototype = _.assignIn({}, p.prototype, {
    _stringOverrides: function() {
      (theme.productStrings = theme.productStrings || {}), $.extend(
        theme.strings,
        theme.productStrings
      );
    },
    _initFeature: function() {
      if (
        (0 < $(this.selectors.product + " .product-video-button a").length &&
          $(this.selectors.product + " .product-video-button a").magnificPopup({
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: !1,
            disableOn: !1,
            fixedContentPos: !1
          }), 0 < $(this.selectors.product + " .product-360-button a").length)
      ) {
        for (
          var k,
            v = [],
            y = JSON.parse(
              document.getElementById("threed-id-" + this.sectionId).innerHTML
            ),
            C = 1;
          72 >= C;
          C++
        )
          (k = "f" + C), y[k] && v.push(y[k]);
        if (0 < v.length) {
          var x = v.length;
          $(this.selectors.threedId).ThreeSixty({
            totalFrames: x,
            endFrame: x,
            currentFrame: 1,
            imgList: ".threed-view-images",
            progress: ".spinner",
            imgArray: v,
            height: null,
            width: null,
            responsive: !0,
            navigation: !0,
            onReady: function() {
              $(".product-360-button a").magnificPopup({
                type: "inline",
                mainClass: "mfp-fade",
                removalDelay: 160,
                disableOn: !1,
                preloader: !1,
                fixedContentPos: !1,
                callbacks: {
                  open: function() {
                    $(window).resize();
                  }
                }
              });
            }
          });
        }
      }
    },
    _initCountDown: function() {
      if (
        !(0 >= $(this.selectors.countDownId).length) &&
        $().countdown &&
        0 < $(this.selectors.countDownId).length
      ) {
        var v = new Date(),
          y = $(this.selectors.countDownId).data("countdown").split("-"),
          y = new Date(y[2], parseInt(y[0]) - 1, y[1]);
        v < y &&
          $(this.selectors.countDownId).countdown({
            until: y,
            layout: "<div><i>{dn}</i><span>{dl}</span></div><div><i>{hn}</i><span>{hl}</span></div><div><i>{mn}</i><span>{ml}</span></div><div><i>{sn}</i><span>{sl}</span></div>"
          });
      }
    },
    _initBreakpoints: function() {
      this;
      enquire.register(this.settings.mediaQuerySmall, {
        match: function() {},
        unmatch: function() {}
      }), enquire.register(this.settings.mediaQueryMediumUp, {
        match: function() {}
      });
    },
    _stickUpSells: function() {
      var v = $("#topbar"),
        y = $("#masthead"),
        C = $(this.selectors.productUpsells);
      if (C.length) {
        var k = $("#primary"), x = v.length ? v.outerHeight() : 0;
        (x += y.length ? y.outerHeight() : 0), $(window)
          .on("scroll", function() {
            if (
              ($(document).scrollTop() >= x
                ? (C.addClass("sticky"), !C.data("wrap") &&
                    (C.wrap(
                      '<div id="upsells-wrap" class="upsells-wrap"/>'
                    ), C.data("wrap", !0)))
                : (C.removeClass("sticky"), C.data("wrap") &&
                    (C.unwrap(), C.data("wrap", !1))), $(window).scrollTop() >=
                k.offset().top + k.outerHeight() - window.innerHeight)
            ) {
              var S = $("#upsells-wrap");
              S.addClass("sticky-bottom").css("top", function() {
                return $(window).scrollTop() - k.offset().top;
              }), S.outerHeight() <= C.outerHeight()
                ? S.addClass("reach-bottom")
                : S.removeClass("reach-bottom");
            } else $("#upsells-wrap").removeClass("sticky-bottom").css("top", 0);
          })
          .trigger("scroll");
      }
    },
    _upsellProducts: function() {
      var v = $(this.selectors.productUpsells);
      !v.length ||
        (4 < v.find(".product").length &&
          v
            .find(".products")
            .addClass("owl-carousel")
            .owlCarousel({
              dots: !0,
              nav: !0,
              navText: ["", ""],
              items: 2,
              responsive: {
                0: { items: 1 },
                992: { items: 1 },
                1200: { items: 2 }
              }
            }));
    },
    _relatedProducts: function() {
      var v = $(
        this.selectors.product +
          " .single_product_summary_related .products-carousel .products"
      );
      if (v.length) {
        var y = v.attr("data-per-view");
        v.owlCarousel({
          items: y,
          margin: 30,
          lazyLoad: !0,
          dots: !0,
          responsiveClass: !0,
          nav: !0,
          mouseDrag: !0,
          navText: ["", ""],
          responsive: {
            0: { margin: 20, items: 2, nav: !1 },
            600: { margin: 25, items: 3, nav: !1 },
            1e3: { items: 4, nav: !0, dots: !1 },
            1200: { items: y, nav: !0, dots: !1 }
          }
        });
      }
    },
    _initTab: function() {
      $(this.selectors.product + " .product-tabs")
        .off("click")
        .on("click", "ul.tabs li a", function(v) {
          if ((v.preventDefault(), $(this).parent("li").hasClass("active")))
            return !1;
          var y = $(this),
            C = y.closest(".product-tabs"),
            k = C.find("ul.tabs");
          return k
            .find("li")
            .removeClass(
              "active"
            ), $(this).parent("li").addClass("active"), C.find(
            ".panel:visible"
          ).fadeOut(300, function() {
            C.find(y.attr("href")).fadeIn(300);
          }), !1;
        });
    },
    _socialSharing: function() {
      var v = $(this.selectors.product + " .box-share-master-container").attr(
        "data-share-elem"
      );
      $(this.selectors.product + " .social-sharing").socialShare({
        social: v,
        animation: "launchpadReverse",
        blur: !0
      });
    },
    _initInstagram: function() {
      if (0 < $("#product-instagram").length) {
        var v = $("#product-instagram"),
          y = v.attr("data-id"),
          C = v.attr("data-token"),
          k = v.attr("data-limit"),
          x = new Instafeed({
            get: "user",
            target: "product-instagram",
            accessToken: C,
            userId: parseInt(y),
            limit: parseInt(k),
            resolution: "thumbnail",
            resolution2: "thumbnail",
            template: '<li><a target="_blank" href="{{link}}"><img src="{{image}}" alt="{{caption}}" /></a></li>',
            after: function() {
            }
          });
        x.run();
      }
    },
    _initGallery: function() {
      (function(y) {
        function C(E, D) {
          return -1 < (" " + E.className + " ").indexOf(" " + D + " ");
        }
        for (
          var k = function(E) {
            for (
              var q,
                F,
                U,
                L,
                D = $(E).find(".photoswipe-item").get(),
                B = D.length,
                V = [],
                H = 0;
              H < B;
              H++
            )
              ((q = D[H]), 1 === q.nodeType) &&
                ((F = q.children[0]), (U = F.getAttribute("data-size").split(
                  "x"
                )), (L = "video" == $(F).data("type")
                  ? { html: $(F).data("video") }
                  : {
                      src: F.getAttribute("href"),
                      w: parseInt(U[0], 10),
                      h: parseInt(U[1], 10)
                    }), 1 < q.children.length &&
                  (L.title = $(q).find(".caption").html()), 0 <
                  F.children.length &&
                  (L.msrc = F.children[0].getAttribute(
                    "src"
                  )), (L.el = q), V.push(L));
            return V;
          },
            x = function E(D, B) {
              return D && (B(D) ? D : E(D.parentNode, B));
            },
            S = function(E) {
              (E = E || window.event), E.preventDefault
                ? E.preventDefault()
                : (E.returnValue = !1);
              var D = E.target || E.srcElement,
                B = x(D, function(M) {
                  return C(M, "photoswipe-item");
                });
              if (B) {
                for (
                  var L,
                    V = B.closest(".photoswipe-wrapper"),
                    q = $(B.closest(".photoswipe-wrapper"))
                      .find(".photoswipe-item")
                      .get(),
                    F = q.length,
                    U = 0,
                    H = 0;
                  H < F;
                  H++
                )
                  if (1 === q[H].nodeType) {
                    if (q[H] === B) {
                      L = U;
                      break;
                    }
                    U++;
                  }
                return 0 <= L && T(L, V), !1;
              }
            },
            I = function() {
              var E = window.location.hash.substring(1), D = {};
              if (5 > E.length) return D;
              for (var B = E.split("&"), V = 0; V < B.length; V++)
                if (B[V]) {
                  var q = B[V].split("=");
                  2 > q.length || (D[q[0]] = q[1]);
                }
              return D.gid && (D.gid = parseInt(D.gid, 10)), D;
            },
            T = function(E, D, B, V) {
              var F, U, L, q = document.querySelectorAll(".pswp")[0];
              if (
                ((L = k(D)), (U = {
                  closeOnScroll: !1,
                  galleryUID: D.getAttribute("data-pswp-uid"),
                  getThumbBoundsFn: function(M) {
                    var W = L[M].el.getElementsByTagName("img")[0],
                      R =
                        window.pageYOffset ||
                        document.documentElement.scrollTop,
                      Q = W.getBoundingClientRect();
                    return { x: Q.left, y: Q.top + R, w: Q.width };
                  }
                }), !V)
              )
                U.index = parseInt(E, 10);
              else if (U.galleryPIDs) {
                for (var H = 0; H < L.length; H++)
                  if (L[H].pid == E) {
                    U.index = H;
                    break;
                  }
              } else U.index = parseInt(E, 10) - 1;
              isNaN(U.index) ||
                (B && (U.showAnimationDuration = 0), (F = new PhotoSwipe(
                  q,
                  PhotoSwipeUI_Default,
                  L,
                  U
                )), F.init(), F.listen("beforeChange", function() {
                  var M = $(F.currItem.container);
                  $(".pswp__video").removeClass("active");
                  M.find(".pswp__video").addClass("active");
                  $(".pswp__video").each(function() {
                    $(this).hasClass("active") ||
                      $(this).attr("src", $(this).attr("src"));
                  });
                }), F.listen("close", function() {
                  $(".pswp__video").each(function() {
                    $(this).attr("src", $(this).attr("src"));
                  });
                }));
            },
            P = document.querySelectorAll(y),
            O = 0,
            A = P.length;
          O < A;
          O++
        )
          P[O].setAttribute("data-pswp-uid", O + 1), (P[O].onclick = S);
        var z = I();
        z.pid && z.gid && T(z.pid, P[z.gid - 1], !0, !0);
      })(this.selectors.product + " .photoswipe-wrapper");
    },
    _initImagesCarousel: function() {
      if ($(this.selectors.productCarouselWrap).length) {
        var v = $(this.selectors.productCarouselWrap),
          y = 2 < v.children().length ? 1 : 0;
        v.owlCarousel({
          items: 2,
          startPosition: y,
          loop: !1,
          margin: 30,
          center: !0,
          dots: !1,
          nav: !0,
          navText: ["", ""]
        });
      }
    },
    _initImagesScroll: function() {
      if ($(this.selectors.productImageWrap).hasClass("module")) {
        ($.fn.visible = function(y) {
          var C = $(this),
            k = $(window),
            x = k.scrollTop(),
            S = x + k.height(),
            I = C.offset().top,
            T = I + C.height(),
            P = !0 === y ? T : I,
            O = !0 === y ? I : T;
          return O <= S && P >= x;
        }), "false" == $("header.site-header").attr("data-my-sticky") &&
          $(this.selectors.product + " .product_infos").attr(
            "data-margin-top",
            "1"
          ), $(document).foundation();
        var v = $(".module");
        v.each(function(y, C) {
          var C = $(C);
          C.visible(!0) && C.addClass("already-visible");
        }), $(window).scroll(function() {
          1024 < $(window).width() &&
            v.each(function(C, k) {
              var k = $(k);
              k.visible(!0) && k.addClass("come-in");
            });
        });
      }
    },
    _initImages: function() {
      function v(T) {
        !1 != C && C.slideTo(T - 1, 300, !1), $(y.selectors.productThumbImages)
          .find(".swiper-slide")
          .removeClass("active")
          .eq(T)
          .addClass("active");
      }
      var y = this, C = !1;
      if (0 < $(y.selectors.productThumbImages).length)
        var k = $(y.selectors.productThumbImages).attr("data-direction"),
          C = new Swiper(y.selectors.productThumbImages, {
            direction: k,
            slidesPerView: "auto",
            mousewheelControl: !1,
            preventClicks: !1
          });
      $(y.selectors.productMainImages).owlCarousel({
        items: 1,
        lazyLoad: !0,
        animateIn: "fadeIn",
        animateOut: "fadeOut",
        nav: !0,
        dots: !0,
        navText: ["", ""],
        responsive: { 0: { dots: !0, nav: !1 }, 1024: { dots: !1, nav: !0 } }
      });
      var x = $(y.selectors.productMainImages);
      if (
        ($(".product_content_wrapper").each(function() {
          $(y.selectors.productThumbImages)
            .find(".swiper-slide")
            .eq(0)
            .addClass("active"), !1 != C &&
            C.on("onTap", function() {
              v(
                C.clickedIndex
              ), x.trigger("to.owl.carousel", [C.clickedIndex, 300]);
            });
        }), x.on("changed.owl.carousel", function(T) {
          if (jQuery(".product_thumbnails").length) {
            var P = T.item.index;
            !1 != C && C.slideTo(P - 1, 300, !1), $(
              y.selectors.productThumbImages
            )
              .find(".swiper-slide")
              .removeClass("active")
              .eq([P])
              .addClass("active");
          }
        }), !$(".easyzoom").length)
      )
        1024 < $(window).width() &&
          $(".variations").on("change", "select", function() {
            0 < $("#product-images-carousel").length &&
              x.trigger("to.owl.carousel", [0, 300]);
          });
      else if (1024 < $(window).width()) {
        var S = $(".easyzoom").easyZoom({
          loadingNotice: "",
          errorNotice: "",
          preventClicks: !0
        }),
          I = S.data("easyZoom");
        $(".variations").on("change", "select", function() {
          0 < $("#product-images-carousel").length &&
            x.trigger("to.owl.carousel", [0, 300]);
        });
      } else
        $(".easyzoom a").click(function(T) {
          T.preventDefault();
        }), $(".variations").on("change", "select", function() {
          0 < $("#product-images-carousel").length &&
            x.trigger("to.owl.carousel", [0, 300]);
        });
    },
    _initSwatches: function() {
      var v = this.productSingleObject, y = [];
      if (
        ("true" == this.settings.swatch_size && y.push("Size"), "true" ==
          this.settings.swatch_color && (y.push("Color"), y.push("Colour")), 0 <
          y.length)
      ) {
        var C = !1,
          k = !1,
          x = 0,
          S = theme.asset_url.substring(0, theme.asset_url.lastIndexOf("?")),
          I = theme.asset_url.substring(
            theme.asset_url.lastIndexOf("?"),
            theme.asset_url.length
          );
        for (i = 0; i < v.options.length; i++) {
          var T = "", P = "", O = "", A = "", z = "", E = "", D = "";
          if (
            ((T = "object" == typeof v.options[i]
              ? v.options[i].name
              : v.options[i]), (C = !1), (k = !1), -1 < y.indexOf(T))
          ) {
            (C = !0), (x = i);
            var B = T.toLowerCase();
            if ((/color|colour/i.test(B) && (k = !0), C)) {
              var q = [];
              for (j = 0; j < v.variants.length; j++) {
                var F = v.variants[j],
                  U = this._htmlEntities(F.options[x]),
                  L = this._convertToSlug(U),
                  M = "";
                /color|colour/i.test(B) &&
                  (M =
                    ' style="background-color:' +
                    L +
                    ";background-image:url(" +
                    S +
                    L +
                    ".png" +
                    I +
                    ');"'), 0 > q.indexOf(U) &&
                  ((D = "color" != B && "colour" != B
                    ? "swatch-label "
                    : ""), (E = $(
                    this.selectors.singleOptionSelectorId + "-" + x
                  ).val() == U
                    ? "selected "
                    : ""), (O =
                    O +
                    '<span data-id="' +
                    this.selectors.singleOptionSelectorId +
                    "-" +
                    x +
                    '" class="' +
                    E +
                    "swatch " +
                    D +
                    " swatch-" +
                    B +
                    " swatch-" +
                    U +
                    '" data-title="' +
                    U +
                    '" data-value="' +
                    U +
                    '"><span' +
                    M +
                    ">" +
                    U +
                    "</span></span>"), q.push(U));
              }
              (P =
                '<div class="' +
                this.selectors.singleOptionSwatches +
                ' tawcvs-swatches" data-attribute_name="attribute_pa_' +
                B +
                '">' +
                O +
                "</div>"), (A = $(
                this.selectors.singleOptionSelectorId + "-" + x
              )), (z = $(this.selectors.variationSelector + "-" + x)), "" !=
                P &&
                (A.after(P), A.parent().addClass("has-swatch"), z.addClass(
                  "hide-choose-option"
                ));
            }
          }
        }
      }
      var W = "";
      0 < $("." + this.selectors.singleOptionSwatches).length &&
        ((W = $(
          "." + this.selectors.singleOptionSwatches + " > span"
        )), W.unbind("click"), W.on("click", function() {
          var R = $(this).data("id");
          $(this).data("value") != $(R).val() &&
            ($(R).val($(this).data("value")).trigger("change"), $(R)
              .closest(".single-option-selector")
              .find(".swatch")
              .removeClass("selected"), $(this).addClass("selected"));
        }));
    },
    _htmlEntities: function(v) {
      return (v + "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    },
    _convertToSlug: function(v) {
      return v
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
    },
    _initVariants: function() {
     
      var v = {
        $container: this.$container,
        enableHistoryState: this.$container.data("enable-history-state") || !1,
        singleOptionSelector: this.selectors.singleOptionSelector,
        originalSelectorId: this.selectors.originalSelectorId,
        product: this.productSingleObject
      };
      (this.variants = new slate.Variants(v)), this.$container.on(
        "variantChange" + this.settings.namespace,
        this._updateAddToCart.bind(this)
      ), this.$container.on(
        "variantImageChange" + this.settings.namespace,
        this._updateImages.bind(this)
      ), this.$container.on(
        "variantPriceChange" + this.settings.namespace,
        this._updatePrice.bind(this)
      ), this.$container.on(
        "variantSKUChange" + this.settings.namespace,
        this._updateSKU.bind(this)
      );
    },
    _updateAddToCart: function(v) {
      var y = v.variant;
      y
        ? ($(this.selectors.productPrices)
            .removeClass("invisible")
            .attr("aria-hidden", "true"), y.available
            ? ($(this.selectors.addToCart)
                .prop("disabled", !1)
                .toggleClass("hide", !1), $(this.selectors.addToCartText).text(
                theme.strings.addToCart
              ), $(this.selectors.stockText)
                .text(theme.strings.inStock)
                .removeClass("out-of-stock")
                .addClass("in-stock"), "shopify" == y.inventory_management &&
                "continue" != y.inventory_policy &&
                0 < y.inventory_quantity &&
                $(this.selectors.stockText).text(
                  y.inventory_quantity + " " + theme.strings.inStock
                ))
            : ($(this.selectors.addToCart)
                .prop("disabled", !0)
                .toggleClass("hide", !0), $(this.selectors.addToCartText).text(
                theme.strings.soldOut
              ), $(this.selectors.stockText)
                .text(theme.strings.outStock)
                .removeClass("in-stock")
                .addClass("out-of-stock")))
        : ($(this.selectors.addToCart)
            .prop("disabled", !0)
            .toggleClass("hide", !0), $(this.selectors.addToCartText).text(
            theme.strings.unavailable
          ), $(this.selectors.stockText)
            .text(theme.strings.unavailable)
            .removeClass("in-stock")
            .addClass("out-of-stock"), $(this.selectors.productPrices)
            .addClass("invisible")
            .attr("aria-hidden", "false"));
    },
    _updateImages: function(v) {
      var y = v.variant,
        C = this,
        k = y.featured_image.src
          .replace("https:", "")
          .replace("http:", "")
          .split("?v=")[0];
      $(this.selectors.productFeaturedImage).each(function(x) {
        var S = $(this).attr("href");
        if (0 <= S.indexOf(k)) {
          var I = $(C.selectors.productMainImages);
          return void I.trigger("to.owl.carousel", [x, 300]);
        }
      }), 0 < $(this.selectors.productQuickViewFeaturedImage).length &&
        $(this.selectors.productQuickViewFeaturedImage).each(function(x) {
          var S = $(this).attr("data-href");
          if (0 <= S.indexOf(k)) return void qvSlider.slideTo(x);
        });
    },
    _updatePrice: function(v) {
      var y = v.variant;
      if (
        ($(this.selectors.originalPrice).html(
          '<span class="money">' +
            theme.Currency.formatMoney(y.price, theme.moneyFormat) +
            "</span>"
        ), y.compare_at_price > y.price)
      ) {
        if (
          ($(this.selectors.comparePrice)
            .html(
              '<span class="money">' +
                theme.Currency.formatMoney(
                  y.compare_at_price,
                  theme.moneyFormat
                ) +
                "</span>"
            )
            .removeClass("hide"), $(this.selectors.saleLabel)
            .find("span")
            .text(theme.strings.sale), "" != theme.sale_percentages)
        ) {
          var C = Math.round(
            100 * (y.compare_at_price - y.price) / y.compare_at_price
          );
          $(this.selectors.saleLabel).find("span").text("-" + C + "%");
        }
        $(this.selectors.saleLabel).removeClass("hide");
      } else
        $(this.selectors.comparePrice).addClass("hide"), $(
          this.selectors.saleLabel
        ).addClass("hide");
      theme.CurrencyPicker.convert(this.selectors.product + " .money");
    },
    _updateSKU: function(v) {
      var y = v.variant;
      "" == y.sku
        ? $(this.selectors.SKU).addClass("hide")
        : $(this.selectors.SKU).removeClass("hide").find(".sku").text(y.sku);
    },
    onUnload: function() {
      this.$container.off(this.settings.namespace);
    }
  })), p;
})()), (theme.Products = (function() {
  function p(v) {
    var y = (this.$container = $(v)), C = y.attr("data-section-id");
    (this.settings = {
      slider: "#products-" + C + " .products-carousel .products"
    }), this._initSlider();
  }
  return (p.prototype = _.assignIn({}, p.prototype, {
    _initSlider: function() {
      if ($(this.settings.slider).length) {
        var v = $(this.settings.slider).attr("data-per-view");
        $(this.settings.slider).owlCarousel({
          items: v,
          margin: 30,
          lazyLoad: !0,
          dots: !1,
          responsiveClass: !0,
          nav: !0,
          mouseDrag: !0,
          navText: ["", ""],
          responsive: {
            0: { margin: 20, items: 2, nav: !1 },
            600: { margin: 25, items: 3, nav: !1 },
            1e3: { items: 4, nav: !0, dots: !1 },
            1200: { items: v, nav: !0, dots: !1 }
          }
        });
      }
    },
    onUnload: function() {
      var v = $(this.settings.slider);
      v
        .trigger("destroy.owl.carousel")
        .removeClass("owl-carousel owl-loaded"), v
        .find(".owl-stage-outer")
        .children()
        .unwrap();
    },
    onBlockSelect: function() {}
  })), p;
})()), (theme.ProductTabs = (function() {
  function p(v) {
    var y = (this.$container = $(v)), C = y.attr("data-section-id");
    (this.settings = {
      slider: "#product-tabs-" + C + " .products-carousel .products",
      tab: "#product-tabs-" + C + " .product-tabs"
    }), this._initTab(), this._initSlider();
  }
  return (p.prototype = _.assignIn({}, p.prototype, {
    _initTab: function() {
      $(this.settings.tab).length &&
        $(this.settings.tab)
          .off("click")
          .on("click", "ul.tabs li a", function(v) {
            if ((v.preventDefault(), $(this).parent("li").hasClass("active")))
              return !1;
            var y = $(this),
              C = y.closest(".product-tabs"),
              k = C.find("ul.tabs");
            return k
              .find("li")
              .removeClass(
                "active"
              ), $(this).parent("li").addClass("active"), C.find(
              ".panel:visible"
            ).fadeOut(300, function() {
              C.find(y.attr("href")).fadeIn(300);
            }), !1;
          });
    },
    _initSlider: function() {
      if ($(this.settings.slider).length) {
        var v = $(this.settings.slider).attr("data-per-view");
        $(this.settings.slider).owlCarousel({
          items: v,
          margin: 30,
          lazyLoad: !0,
          dots: !1,
          responsiveClass: !0,
          nav: !0,
          mouseDrag: !0,
          navText: ["", ""],
          responsive: {
            0: { margin: 20, items: 2, nav: !1 },
            600: { margin: 25, items: 3, nav: !1 },
            1e3: { items: 4, nav: !0, dots: !1 },
            1200: { items: v, nav: !0, dots: !1 }
          }
        });
      }
    },
    onUnload: function() {
      var v = $(this.settings.slider);
      v
        .trigger("destroy.owl.carousel")
        .removeClass("owl-carousel owl-loaded"), v
        .find(".owl-stage-outer")
        .children()
        .unwrap();
    },
    onBlockSelect: function() {}
  })), p;
})()), (theme.Blog = (function() {
  function p(v) {
    var y = (this.$container = $(v)), C = y.attr("data-section-id");
    (this.settings = {
      slider: "#blog-" + C + " .from-the-blog"
    }), this._initSlider();
  }
  return (p.prototype = _.assignIn({}, p.prototype, {
    _initSlider: function() {
      $(this.settings.slider).length &&
        $(this.settings.slider).each(function() {
          var v = $(this);
          v.owlCarousel({
            items: 3,
            dots: !1,
            responsiveClass: !0,
            nav: !0,
            navText: ["", ""],
            responsive: {
              0: { items: 1, nav: !1, dots: !0 },
              600: { items: 2, nav: !1, dots: !0 },
              1e3: { items: 3, nav: !0 },
              1200: { items: 3, nav: !0 }
            }
          });
        });
    },
    onUnload: function() {
      var v = $(this.settings.slider);
      v
        .trigger("destroy.owl.carousel")
        .removeClass("owl-carousel owl-loaded"), v
        .find(".owl-stage-outer")
        .children()
        .unwrap();
    },
    onBlockSelect: function() {}
  })), p;
})()), (theme.Collections = (function() {
  function p(v) {
    var y = (this.$container = $(v)), C = y.attr("data-section-id");
    (this.settings = {
      slider: "#collections-" + C + " .product-category-carousel"
    }), this._initSlider();
  }
  return (p.prototype = _.assignIn({}, p.prototype, {
    _initSlider: function() {
      if ($(this.settings.slider).length) {
        var v = $(this.settings.slider).attr("data-per-view");
        $(this.settings.slider).owlCarousel({
          items: v,
          margin: 30,
          lazyLoad: !0,
          dots: !1,
          responsiveClass: !0,
          nav: !0,
          mouseDrag: !0,
          navText: ["", ""],
          responsive: {
            0: { margin: 20, items: 2, nav: !1 },
            600: { margin: 25, items: 3, nav: !1 },
            1e3: { items: 4, nav: !0, dots: !1 },
            1200: { items: v, nav: !0, dots: !1 }
          }
        });
      }
    },
    onUnload: function() {
      var v = $(this.settings.slider);
      v
        .trigger("destroy.owl.carousel")
        .removeClass("owl-carousel owl-loaded"), v
        .find(".owl-stage-outer")
        .children()
        .unwrap();
    },
    onBlockSelect: function() {}
  })), p;
})()), (theme.slideshows = {}), (theme.SlideshowSection = (function() {
  return function(v) {
    var y = (this.$container = $(v)),
      C = y.attr("data-section-id"),
      k = (this.slideshow = "#Slideshow-" + C);
    $(".slideshow__video", k).each(function() {
      var x = $(this);
      theme.SlideshowVideo.init(
        x
      ), theme.SlideshowVideo.loadVideo(x.attr("id"));
    }), (theme.slideshows[k] = new theme.Slideshow(k));
  };
})()), (theme.SlideshowSection.prototype = _.assignIn(
  {},
  theme.SlideshowSection.prototype,
  {
    onUnload: function() {
      delete theme.slideshows[this.slideshow];
    },
    onBlockSelect: function(p) {
      var v = $(this.slideshow),
        y = $(".slideshow__slide--" + p.detail.blockId + ":not(.slick-cloned)"),
        C = y.data("slick-index");
      v.slick("slickGoTo", C).slick("slickPause");
    },
    onBlockDeselect: function() {
      $(this.slideshow).slick("slickPlay");
    }
  }
)), (theme.FooterSection = (function() {
  function p(v) {
    var y = (this.$container = $(v)), C = y.attr("data-section-id");
    (this.settings = {
      instagram: "#site-footer-" + C + " #footer-instagram"
    }), this._initInstagram();
  }
  return (p.prototype = _.assignIn({}, p.prototype, {
    _initInstagram: function() {
      if ($(this.settings.instagram).length) {
        var v = $(this.settings.instagram),
          y = v.attr("data-id"),
          C = v.attr("data-token"),
          k = v.attr("data-limit"),
          x = new Instafeed({
            get: "user",
            target: "footer-instagram",
            accessToken: C,
            userId: parseInt(y),
            limit: parseInt(k),
            resolution: "thumbnail",
            resolution2: "thumbnail",
            template: '<li><a target="_blank" href="{{link}}"><img src="{{image}}" alt="{{caption}}" /></a></li>',
            after: function() {
            }
          });
        x.run();
      }
    },
    onUnload: function() {},
    onBlockSelect: function() {}
  })), p;
})());
var $special, resizeTimeout, $event = $.event;
$special = $event.special.debouncedresize = {
  setup: function() {
    $(this).on("resize", $special.handler);
  },
  teardown: function() {
    $(this).off("resize", $special.handler);
  },
  handler: function(p, v) {
    var y = this,
      C = arguments,
      k = function() {
        (p.type = "debouncedresize"), $event.dispatch.apply(y, C);
      };
    resizeTimeout && clearTimeout(resizeTimeout), v
      ? k()
      : (resizeTimeout = setTimeout(k, $special.threshold));
  },
  threshold: 250
};
var BLANK =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
($.fn.imagesLoaded = function(p) {
  function v() {
    var O = $(T), A = $(P);
    k && (P.length ? k.reject(S, O, A) : k.resolve(S)), $.isFunction(p) &&
      p.call(C, S, O, A);
  }
  function y(O, A) {
    O.src === BLANK ||
      -1 !== $.inArray(O, I) ||
      (I.push(O), A ? P.push(O) : T.push(O), $.data(O, "imagesLoaded", {
        isBroken: A,
        src: O.src
      }), x && k.notifyWith($(O), [A, S, $(T), $(P)]), S.length === I.length &&
        (setTimeout(v), S.unbind(".imagesLoaded")));
  }
  var C = this,
    k = $.isFunction($.Deferred) ? $.Deferred() : 0,
    x = $.isFunction(k.notify),
    S = C.find("img").add(C.filter("img")),
    I = [],
    T = [],
    P = [];
  return $.isPlainObject(p) &&
    $.each(p, function(O, A) {
      "callback" === O ? (p = A) : k && k[O](A);
    }), S.length
    ? S.bind("load.imagesLoaded error.imagesLoaded", function(O) {
        y(O.target, "error" === O.type);
      }).each(function(O, A) {
        var z = A.src, E = $.data(A, "imagesLoaded");
        return E && E.src === z
          ? void y(A, E.isBroken)
          : A.complete && void 0 !== A.naturalWidth
              ? void y(A, 0 === A.naturalWidth || 0 === A.naturalHeight)
              : void ((A.readyState || A.complete) &&
                  ((A.src = BLANK), (A.src = z)));
      })
    : v(), k ? k.promise(C) : C;
}), (theme.gridsSection = (function() {
  function p(v) {
    var y = (this.$container = $(v)),
      C = (this.sectionId = y.attr("data-section-id")),
      k = y.attr("data-section-type");
    (this.gridsId = $("#grid-wrapper-" + C)), (this.grids = $(
      "#grid-wrapper-" + C
    )), (this.gridsNamspace = "#grid-wrapper-" + C), this._init();
  }
  return (p.prototype = _.assignIn({}, p.prototype, {
    _init: function() {
      var v = this.sectionId,
        y = (function() {
          function x(Q) {
            E.each(function() {
              var N = $(this);
              N.data(
                "offsetTop",
                N.offset().top
              ), Q && N.data("height", N.height());
            });
          }
          function S() {
            I(E), F.on("debouncedresize", function() {
              (V = 0), (B = -1), x(), T();
              var Q = $.data(this, "preview");
              "undefined" != typeof Q && O();
            });
          }
          function I(Q) {
            Q.on("click", "span.og-close", function() {
              return O(), !1;
            })
              .children("a")
              .on("click", function() {
                var K = $(this).parent();
                return D === K.index() ? O() : P(K), !1;
              });
          }
          function T() {
            U = { width: F.width(), height: F.height() };
          }
          function P(Q) {
            var N = $.data(this, "preview"), K = Q.data("offsetTop");
            if (((V = 0), "undefined" != typeof N))
              if (B !== K) K > B && (V = N.height), O();
              else return N.update(Q), !1;
            (B = K), (N = $.data(this, "preview", new A(Q))), N.open();
          }
          function O() {
            D = -1;
            var Q = $.data(this, "preview");
            Q.close(), $.removeData(this, "preview");
          }
          function A(Q) {
            (this.$item = Q), (this.expandedIdx = this.$item.index()), this.create(), this.update();
          }
          var U,
            z = $("#og-grid-" + v),
            E = z.children("li"),
            D = -1,
            B = -1,
            V = 0,
            q = 10,
            F = $(window),
            L = $("html, body"),
            M = {
              WebkitTransition: "webkitTransitionEnd",
              MozTransition: "transitionend",
              OTransition: "oTransitionEnd",
              msTransition: "MSTransitionEnd",
              transition: "transitionend"
            }[Modernizr.prefixed("transition")],
            W = Modernizr.csstransitions,
            R = { minHeight: 500, speed: 350, easing: "ease" };
          return (A.prototype = {
            create: function() {
              (this.$title = $("<h3></h3>")), (this.$description = $(
                "<p></p>"
              )), (this.$href = $(
                '<a class="button btn1 bshadow alt" href="#"></a>'
              )), (this.$details = $('<div class="og-details"></div>').append(
                this.$title,
                this.$description,
                this.$href
              )), (this.$loading = $(
                '<div class="og-loading"></div>'
              )), (this.$fullimage = $('<div class="og-fullimg"></div>').append(
                this.$loading
              )), (this.$closePreview = $(
                '<span class="og-close"></span>'
              )), (this.$previewInner = $(
                '<div class="og-expander-inner"></div>'
              ).append(
                this.$closePreview,
                this.$fullimage,
                this.$details
              )), (this.$previewEl = $(
                '<div class="og-expander"></div>'
              ).append(this.$previewInner)), this.$item.append(
                this.getEl()
              ), W && this.setTransition();
            },
            update: function(Q) {
              if ((Q && (this.$item = Q), -1 != D)) {
                var N = E.eq(D);
                N.removeClass("og-expanded"), this.$item.addClass(
                  "og-expanded"
                ), this.positionPreview();
              }
              D = this.$item.index();
              var K = this.$item.children("a"),
                G = {
                  href: K.attr("href"),
                  largesrc: K.data("largesrc"),
                  title: K.data("title"),
                  cta: K.data("cta"),
                  description: K.data("description")
                };
              this.$title.html(G.title), this.$description.html(
                G.description
              ), this.$href.html("<span>" + G.cta + "</span>"), this.$href.attr(
                "href",
                G.href
              );
              var Z = this;
              "undefined" != typeof Z.$largeImg &&
                Z.$largeImg.remove(), Z.$fullimage.is(":visible") &&
                (this.$loading.show(), $("<img/>")
                  .load(function() {
                    var Y = $(this);
                    Y.attr("src") === Z.$item.children("a").data("largesrc") &&
                      (Z.$loading.hide(), Z.$fullimage
                        .find("img")
                        .remove(), (Z.$largeImg = Y.fadeIn(
                        350
                      )), Z.$fullimage.append(Z.$largeImg));
                  })
                  .attr("src", G.largesrc));
            },
            open: function() {
              setTimeout(
                $.proxy(function() {
                  this.setHeights(), this.positionPreview();
                }, this),
                25
              );
            },
            close: function() {
              var Q = this,
                N = function() {
                  W && $(this).off(M), Q.$item.removeClass(
                    "og-expanded"
                  ), Q.$previewEl.remove();
                };
              return setTimeout(
                $.proxy(function() {
                  "undefined" != typeof this.$largeImg &&
                    this.$largeImg.fadeOut(
                      "fast"
                    ), this.$previewEl.css("height", 0);
                  var K = E.eq(this.expandedIdx);
                  K.css("height", K.data("height")).on(
                    M,
                    N
                  ), W || N.call(), setTimeout(function() {
                    K.css("height", "auto");
                  }, 350);
                }, this),
                25
              ), !1;
            },
            calcHeight: function() {
              var Q = U.height - this.$item.data("height") - q, N = U.height;
              Q < R.minHeight &&
                ((Q = R.minHeight), (N =
                  R.minHeight +
                  this.$item.data("height") +
                  q)), (this.height = Q), (this.itemHeight = N);
            },
            setHeights: function() {
              var Q = this,
                N = function() {
                  W && Q.$item.off(M), Q.$item.addClass("og-expanded");
                };
              this.calcHeight(), this.$previewEl.css(
                "height",
                this.height
              ), this.$item.css("height", this.itemHeight).on(M, N), W ||
                N.call();
            },
            positionPreview: function() {
              var Q = this.$item.data("offsetTop"),
                N = this.$previewEl.offset().top - V,
                K = this.height + this.$item.data("height") + q <= U.height
                  ? Q
                  : this.height < U.height ? N - (U.height - this.height) : N;
              L.animate({ scrollTop: K }, R.speed);
            },
            setTransition: function() {
              this.$previewEl.css(
                "transition",
                "height " + R.speed + "ms " + R.easing
              ), this.$item.css(
                "transition",
                "height " + R.speed + "ms " + R.easing
              );
            },
            getEl: function() {
              return this.$previewEl;
            }
          }), {
            init: function(Q) {
              (R = $.extend(!0, {}, R, Q)), z.imagesLoaded(function() {
                x(!0), T(), S();
              });
            },
            addItems: function(Q) {
              (E = E.add(Q)), Q.each(function() {
                var N = $(this);
                N.data({ offsetTop: N.offset().top, height: N.height() });
              }), I(Q);
            }
          };
        })();
      $(function() {
        y.init();
      });
    },
    onUnload: function() {
      this.$container.off(this.gridsNamspace);
    }
  })), p;
})()), (theme.ProductVariantMobile = (function() {
  function p(v) {
    var y = (this.$container = $(v)),
      C = (this.sectionId = y.attr("data-section-id")),
      k = y.attr("data-section-type");
    (this.wrapperId = $("#" + C)), (this.wrapper = $(
      "#" + C
    )), (this.wrapperNamspace = "#" + C), (this.addCartId = $(
      "#btn-" + C + ".m-allow-cart"
    )), (this.addCartClass = $(
      ".variant-item-" + C + ".m-allow-cart"
    )), this._init();
  }
  return (p.prototype = _.assignIn({}, p.prototype, {
    _init: function() {
      var v = this;
      v._initCompact(), v._initEvents(), $(window).resize(function() {
        767 >= $(window).width() && v._initCompact();
      });
    },
    _initCompact: function() {
      if (0 < $(".product-variant-mobile-section").length) {
        var v = $(".product-variant-mobile-section"),
          y = $(".product-variants-mobile");
        y.each(function() {
          var C = $(this),
            k = C.find(".variants-header"),
            x = k.innerHeight(),
            S = C.find(".variants-content").outerHeight(),
            I = k.closest(".product-variants-mobile");
          k.data("height", x), C.data("height", x + S);
        }), y.each(function() {
          var C = $(this),
            k = C.find(".variants-header"),
            x = k.innerHeight(),
            S = C.find(".variants-content").outerHeight(),
            I = k.closest(".product-variants-mobile");
          k.data(
            "height",
            x
          ), C.data("height", x + S), I.hasClass("active") && I.height(I.data("height"));
        }), v.unbind("click") &&
          v.on("click", ".variants-header .title", function() {
            var C = $(this),
              k = C.closest(".variants-header"),
              x = C.closest(".product-variants-mobile");
            x.hasClass("active") ||
              y
                .closest(".active")
                .removeClass("active")
                .height(
                  C.data("height")
                ), x.toggleClass("active"), x.hasClass("active") ? x.height(x.data("height")) : x.height(k.data("height"));
          });
      }
    },
    _initEvents: function() {
      var v = $("#ProductSelect-product-template.variation-select").val();
      0 < this.addCartId.length &&
        (this.addCartId.unbind("click"), this.addCartId.on("click", function() {
          $("#ProductSelect-product-template.variation-select").val(
            v
          ), $("#AddToCart-product-template").trigger("click");
        })), 0 < this.addCartClass.length &&
        (this.addCartClass.unbind(
          "click"
        ), this.addCartClass.on("click", function() {
          var y = $(this).data("id");
          $("#ProductSelect-product-template.variation-select").val(
            y
          ), $("#AddToCart-product-template").trigger("click");
        }));
    },
    onUnload: function() {
      this.$container.off(this.wrapperNamspace);
    }
  })), p;
})()), $(document).ready(function() {
  var p = new theme.Sections();
  p.register(
    "product-variant-mobile",
    theme.ProductVariantMobile
  ), p.register("grid-view", theme.gridsSection), p.register("collection-template", theme.Filters), p.register("product-template", theme.Product), p.register("mega-menu", theme.MegaMenu), p.register("header-section", theme.HeaderSection), p.register("page-contact-template", theme.Maps), p.register("slideshow-section", theme.SlideshowSection), p.register("product-tabs", theme.ProductTabs), p.register("products", theme.Products), p.register("blog", theme.Blog), p.register("collections", theme.Collections), p.register("footer-section", theme.FooterSection);
}), (window.offcanvas_isopen = !1), (window.offcanvas_close = function() {
  (window.offcanvas_isopen = !1), $("body").removeClass(
    "offcanvas_open offcanvas_left offcanvas_right"
  ), $(
    ".offcanvas_main_content"
  ).one(
    "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
    function() {
      setTimeout(function() {
        $(window).trigger("resize");
      }, 600);
    }
  );
}), (window.offcanvas_open = function(p) {
  !0 == window.offcanvas_isopen &&
    window.offcanvas_close(), (window.offcanvas_isopen = !0), $("body")
    .removeClass("no-offcanvas-animation")
    .addClass("offcanvas_open offcanvas_" + p), $(".nano").nanoScroller({
    iOSNativeScrolling: !0
  });
}), (window.theme = theme || {}), (theme.roarApplication = (function() {
  function p() {
    $(document.body).on("click", '[data-toggle="offcanvas"]', function(le) {
      le.preventDefault();
      var de = $(this), ce = $("#" + de.data("target")), pe = de.data("src");
      ce.length && v(ce, pe);
    }), $(
      document.body
    ).on("click", ".offcanvas_overlay, .offcanvas_close", function(le) {
      le.preventDefault(), y();
    }), $(document).on("keyup", function(le) {
      27 == le.keyCode && y();
    });
  }
  function v(le, de) {
    $(".offcanvas_target").hide(), $(le)
      .show()
      .find(".offcanvas_target")
      .show(), $(
      ".offcanvas_aside_right"
    ).one(
      "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
      function() {
        le.find(".search-field").length &&
          le
            .find(".search-field")
            .focus()
            .end()
            .off(
              "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend"
            );
      }
    ), window.offcanvas_open(de), "left" == de
      ? "sidebar-offcanvas" == le.attr("id")
          ? $.Velocity.RunSequence([
              {
                e: $(
                  ".offcanvas_sidebars .offcanvas_close, .offcanvas_shop_sidebar"
                ),
                p: { opacity: [1, 0] },
                o: { duration: 300, delay: 0 }
              }
            ])
          : $.Velocity.RunSequence([
              {
                e: $(".offcanvas_mainmenu nav#menu"),
                p: { opacity: [1, 0] },
                o: { duration: 300, delay: 400 }
              },
              {
                e: $(
                  ".offcanvas_mainmenu .offcanvas_close, .language_currency, .mob_inputbox"
                ),
                p: { opacity: [1, 0] },
                o: { duration: 300, delay: 100 }
              },
              {
                e: $(".offcanvas_mainmenu nav#menu .hr-menu-item hr"),
                p: { opacity: [1, 0], width: [50] },
                o: { duration: 300, delay: 100 }
              }
            ])
      : $.Velocity.RunSequence([
          { e: le, p: { opacity: [1, 0] }, o: { duration: 300, delay: 0 } }
        ]);
  }
  function y() {
    window.offcanvas_close(), $.Velocity.RunSequence([
      {
        e: $(".offcanvas_target"),
        p: { opacity: [0, 1] },
        o: { duration: 300, delay: 200 }
      },
      {
        e: $(".offcanvas_mainmenu nav#menu .hr-menu-item hr"),
        p: { width: [0] },
        o: { duration: 300, delay: 200 }
      }
    ]);
  }
  function C() {
    $(
      document.body
    ).on(
      "focus",
      ".minimal-form-input input, .minimal-form-input textarea, .spr-form input.spr-form-input, .spr-form textarea.spr-form-input",
      function() {
        $(this)
          .closest(".minimal-form-input")
          .addClass("filled")
          .removeClass("no-text"), $(this)
          .closest('div[class^="spr-form-"]')
          .addClass("filled")
          .removeClass("no-text");
      }
    ), $(
      document.body
    ).on(
      "blur",
      '.minimal-form-input input, .minimal-form-input textarea, [class^="spr-form-"] input, [class^="spr-form-"] textarea',
      function() {
        0 < $(this).val().length
          ? ($(this)
              .closest(".minimal-form-input")
              .addClass("has-text")
              .removeClass("no-text"), $(this)
              .closest('div[class^="spr-form-"]')
              .addClass("has-text")
              .removeClass("no-text"))
          : ($(this)
              .closest(".minimal-form-input")
              .removeClass("has-text")
              .addClass("no-text"), $(this)
              .closest('div[class^="spr-form-"]')
              .removeClass("has-text")
              .addClass("no-text")), $(this)
          .closest(".minimal-form-input")
          .removeClass("filled"), $(this)
          .closest('div[class^="spr-form-"]')
          .removeClass("filled");
      }
    );
  }
  function k() {
    "undefined" != typeof SPR &&
      (SPR.registerCallbacks(), SPR.initRatingHandler(), SPR.initDomEls(), SPR.loadProducts(), SPR.loadBadges());
  }
  function x() {
    if (
      ($(".products .product").addClass("eva_ajax_load_more_item_visible"), $(
        document.body
      ).on("click", ".eva_ajax_load_button a", function(de) {
        if ((de.preventDefault(), $(".pagination a.next").length)) {
          $(".eva_ajax_load_button a").attr("data-processing", 1);
          var ce = $(".pagination a.next").attr("href"),
            pe = $(".eva_ajax_load_button a").attr("data-loading-items"),
            ue = $(".eva_ajax_load_button a").attr("data-no-more");
          $(".eva_ajax_load_button").hide(), $(".pagination").before(
            '<div class="eva_ajax_load_more_loader animated fadeIn"><a href="#"><i class="icon-px-outline-load"></i>&nbsp;&nbsp;<span>' +
              pe +
              "</span></a></div>"
          ), $.get(ce, function(ge) {
            $(".pagination").html(
              $(ge).find(".pagination").html()
            ), $(ge).find(".products .product").each(function() {
              $(this).addClass(
                "hidden"
              ), $(".products .product:last").after($(this)), k(), theme.CurrencyPicker.convert(".products .product:not(.eva_ajax_load_more_item_visible) .money"), ae(), oe();
            }), $(".eva_ajax_load_more_loader").fadeOut(
              "slow"
            ), $(".eva_ajax_load_button").fadeIn("slow"), $(".eva_ajax_load_button a").attr("data-processing", 0), setTimeout(function() {
              $(".products .product")
                .not(".eva_ajax_load_more_item_visible")
                .addClass("animated fadeIn")
                .one(
                  "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                  function() {
                    $(this)
                      .removeClass("hidden animated fadeIn")
                      .addClass("eva_ajax_load_more_item_visible");
                  }
                );
            }, 500), 0 == $(".pagination a.next").length &&
              ($(".eva_ajax_load_button")
                .addClass("finished")
                .removeClass("eva_ajax_load_more_hidden"), $(
                ".eva_ajax_load_button a"
              )
                .show()
                .html(ue)
                .addClass("disabled"));
          });
        } else {
          var ue = $(".eva_ajax_load_button a").attr("data-no-more");
          $(".eva_ajax_load_button")
            .addClass("finished")
            .removeClass("eva_ajax_load_more_hidden"), $(
            ".eva_ajax_load_button a"
          )
            .show()
            .html(ue)
            .addClass("disabled");
        }
      }), $(".eva_ajax_load_button").hasClass("eva_ajax_load_more_hidden"))
    ) {
      var le = Math.abs(0);
      $(window).scroll(function() {
        if ($(".products").length) {
          var de = $(".products").offset().top + $(".products").outerHeight(),
            ce = de - $(window).scrollTop();
          ce - le < $(window).height() &&
            0 == $(".eva_ajax_load_button a").attr("data-processing") &&
            $(".eva_ajax_load_button a").trigger("click");
        }
      });
    }
  }
  function T() {
    var le = $(".list_shop_categories.mobile a"),
      de = $(".list_shop_categories.mobile"),
      ce = $(".list_shop_categories.desktop");
    le.on("click", function(pe) {
      pe.preventDefault(), de.toggleClass("active"), ce.toggleClass("active");
    }), $(".catalog-ordering .shop-filter").click(function() {
      $(
        ".offcanvas_mainmenu"
      ).hide(), $(".offcanvas_sidebars").show(), $(".offcanvas_blog_sidebar").hide(), $(".offcanvas_shop_sidebar").show();
    });
  }
  function P() {
    T(), x();
  }
  function O() {
    $.ajax({
      url: "/search",
      beforeSend: function() {
        $(".offcanvas_aside_content .loading-overlay").fadeIn(200), $(
          ".widget_shopping_cart_content"
        )
          .removeClass("blurcontent-off")
          .addClass("blurcontent");
      },
      success: function(le) {
        var de = '.cart-button [data-toggle="offcanvas"]', ce = "#cart_block";
        $(de).html($(le).find(de).html()), $(ce).html(
          $(le).find(ce).html()
        ), theme.CurrencyPicker.convert("#cart_block .money");
      },
      error: function(le) {
        console.log(le);
      }
    }).done(function() {
      $(".offcanvas_aside_content .loading-overlay").fadeOut(
        100
      ), $(".offcanvas_minicart .widget_shopping_cart_content").removeClass("blurcontent").addClass("blurcontent-off"), $(".offcanvas_minicart .widget_shopping_cart_content").removeClass("blurcontent-off");
    });
  }
  function A() {
    $(document).on("click", ".add_to_cart_button", function() {
      var le = $(this), de = le.closest("form");
      return "" == theme.cart_ajax
        ? (de.submit(), !1)
        : ($.ajax({
            type: "POST",
            url: "/cart/add.js",
            async: !0,
            cache: !1,
            data: de.serialize(),
            dataType: "json",
            beforeSend: function() {
              le.addClass("loading");
            },
            complete: function() {
              O();
            },
            error: function(ce) {
              var pe = $.parseJSON(ce.responseText),
                ue = pe.message + ": " + pe.description;
              le.removeClass("loading"), alert(ue);
            },
            success: function() {}
          }).done(function() {
            V(re, ie), B(), setTimeout(function() {
              $('.cart-button [data-toggle="offcanvas"]').trigger(
                "click"
              ), le.removeClass("loading");
            }, 500);
          }), !1);
    });
  }
  function z() {
    $(document)
      .on("focus", "#cart_block .update", function() {
        $(this).select();
      })
      .on("blur", "#cart_block .update", function() {
        var le = $(this), de = le.val(), ce = le.attr("data-id");
        $.ajax({
          type: "POST",
          url: "/cart/change.js",
          data: "quantity=" + de + "&id=" + ce,
          dataType: "json",
          beforeSend: function() {
            $(".offcanvas_aside_content .loading-overlay").show(), $(
              ".widget_shopping_cart_content"
            )
              .removeClass("blurcontent-off")
              .addClass("blurcontent");
          },
          success: function() {
            O();
          },
          error: function(ue, ge) {
            Shopify.onError(ue, ge);
          }
        });
      });
  }
  function E() {
    $(document).on("click", "#cart_block .remove", function(le) {
      le.preventDefault();
      var de = $(this), ce = de.attr("data-id");
      $.ajax({
        type: "POST",
        url: "/cart/change.js",
        data: "quantity=0&id=" + ce,
        dataType: "json",
        beforeSend: function() {
          $(".offcanvas_aside_content .loading-overlay").show(), $(
            ".widget_shopping_cart_content"
          )
            .removeClass("blurcontent-off")
            .addClass("blurcontent");
        },
        success: function() {
          O();
        },
        error: function(ue, ge) {
          Shopify.onError(ue, ge);
        }
      });
    });
  }
  function D() {
    var le = ($(window).width() - $(".cd-quick-view").width()) / 2,
      de = ($(window).height() - $(".cd-quick-view").height()) / 2;
    $(".cd-quick-view").css({ top: de, left: le });
  }
  function B() {
    0 < $(".compare-preview").length &&
      $(".compare-preview .mfp-close").trigger("click");
  }
  function V(le, de) {
    var ce = $(".cd-close"), pe = $(".empty-box").find("img");
    pe.length &&
      (!$(".cd-quick-view").hasClass("velocity-animating") &&
        $(".cd-quick-view").hasClass("add-content")
        ? q(pe, le, de, "close")
        : F(pe, le, de));
  }
  function q(le, de, ce, pe) {
    var ue = le.closest(".product"),
      ge = le.offset().top - $(window).scrollTop(),
      me = le.offset().left,
      he = le.width(),
      fe = le.height(),
      ve = $(window).width(),
      _e = $(window).height(),
      ye = (ve - de) / 2,
      Ce = 596,
      be = (_e - Ce) / 2,
      we = 0.8 * ve < ce ? 0.8 * ve : ce;
    "open" == pe
      ? ($("body").addClass("overlay-layer"), ue.addClass("empty-box"), $(
          ".cd-quick-view"
        )
          .css({ top: ge, left: me, width: he, height: Ce })
          .velocity(
            { top: be + "px", left: ye + "px", width: de + "px" },
            1e3,
            [400, 20],
            function() {
              $(".cd-quick-view")
                .addClass("animate-width")
                .velocity(
                  { left: (ve - we) / 2 + "px", width: we + "px" },
                  300,
                  "ease",
                  function() {
                    $(".cd-quick-view").addClass(
                      "add-content"
                    ), (qvSlider = new Swiper(
                      ".cd-quick-view .swiper-container",
                      {
                        pagination: ".swiper-pagination",
                        nextButton: ".swiper-button-next",
                        prevButton: ".swiper-button-prev",
                        preventClick: !0,
                        preventClicksPropagation: !0,
                        grabCursor: !0,
                        onTouchStart: function() {
                          ne = !1;
                        },
                        onTouchMove: function() {
                          ne = !1;
                        },
                        onTouchEnd: function() {
                          setTimeout(function() {
                            ne = !0;
                          }, 300);
                        }
                      }
                    ));
                    var xe = new theme.Sections();
                    xe.register(
                      "product-quickview-template",
                      theme.Product
                    ), theme.CurrencyPicker.convert(
                      "#ProductSection-product-quickview-template .money"
                    );
                  }
                );
            }
          )
          .addClass("is-visible"))
      : $(".cd-quick-view")
          .removeClass("add-content")
          .velocity(
            { top: be + "px", left: ye + "px", width: de + "px" },
            300,
            "ease",
            function() {
              $("body").removeClass("overlay-layer"), $(".cd-quick-view")
                .removeClass("animate-width")
                .velocity(
                  { top: ge, left: me, width: he },
                  500,
                  "ease",
                  function() {
                    $(".cd-quick-view").removeClass(
                      "is-visible"
                    ), ue.removeClass("empty-box");
                  }
                );
            }
          );
  }
  function F(le) {
    var pe = le.closest(".product"),
      ue = le.offset().top - $(window).scrollTop(),
      ge = le.offset().left,
      me = le.width();
    $("body").removeClass("overlay-layer"), pe.removeClass("empty-box"), $(
      ".cd-quick-view"
    )
      .velocity("stop")
      .removeClass("add-content animate-width is-visible")
      .css({ top: ue, left: ge, width: me });
  }
  function U() {
    $(document).on("click", ".eva_product_quick_view_button", function(le) {
      le.preventDefault();
      var de = $(this);
      de.closest(".product").find(".product_thumbnail").addClass("loading");
      var ce = $(this).data("product_id"),
        pe = $(this).closest(".product").find(".product_thumbnail img");
      $.ajax({
        url: "/products/" + ce + "?view=quickview",
        success: function(ue) {
          $(".cd-quick-view").empty().html(ue), q(pe, re, ie, "open");
        },
        error: function(ue) {
          console.log(ue);
        }
      }).done(function() {
        de.parent().find(".product_thumbnail").removeClass("loading");
      });
    });
  }
  function L() {
    A(), E(), z(), U();
  }
  function H() {
    $(".format-gallery-swiper").each(function() {
      var pe = $(this),
        ue = new Swiper(this, {
          speed: 300,
          centeredSlides: !0,
          mode: "horizontal",
          loop: !0,
          slidesPerView: 1,
          paginationClickable: !0,
          pagination: ".pagination",
          grabCursor: !0,
          nextButton: pe.find(".swiper-button-next")[0],
          prevButton: pe.find(".swiper-button-prev")[0],
          onSwiperCreated: (function(ge) {
            setTimeout(function() {
              ge
                .closest(".gallery-slider-wrapper")
                .css(
                  "visibility",
                  "visible"
                ), ge.closest(".gallery-slider-wrapper").css("opacity", "1");
            }, 300);
          })(pe),
          onInit: function() {},
          onSlideChangeEnd: function() {},
          paginationBulletRender: function(ge, me, he) {
            return '<div class="' + he + '"><span></span></div>';
          }
        });
    });
  }
  function M() {
    var de = [
      {},
      {
        movement: {
          imgWrapper: {
            translation: { x: 10, y: 10, z: 30 },
            rotation: { x: 0, y: -10, z: 0 },
            reverseAnimation: { duration: 200, easing: "easeOutQuad" }
          },
          lines: {
            translation: { x: 10, y: 10, z: [0, 70] },
            rotation: { x: 0, y: 0, z: -2 },
            reverseAnimation: { duration: 2e3, easing: "easeOutExpo" }
          },
          caption: {
            rotation: { x: 0, y: 0, z: 2 },
            reverseAnimation: { duration: 200, easing: "easeOutQuad" }
          },
          overlay: {
            translation: { x: 10, y: -10, z: 0 },
            rotation: { x: 0, y: 0, z: 2 },
            reverseAnimation: { duration: 2e3, easing: "easeOutExpo" }
          },
          shine: {
            translation: { x: 100, y: 100, z: 0 },
            reverseAnimation: { duration: 200, easing: "easeOutQuad" }
          }
        }
      },
      {
        movement: {
          imgWrapper: {
            rotation: { x: -5, y: 10, z: 0 },
            reverseAnimation: { duration: 900, easing: "easeOutCubic" }
          },
          caption: {
            translation: { x: 30, y: 30, z: [0, 40] },
            rotation: { x: [0, 15], y: 0, z: 0 },
            reverseAnimation: { duration: 1200, easing: "easeOutExpo" }
          },
          overlay: {
            translation: { x: 10, y: 10, z: [0, 20] },
            reverseAnimation: { duration: 1e3, easing: "easeOutExpo" }
          },
          shine: {
            translation: { x: 100, y: 100, z: 0 },
            reverseAnimation: { duration: 900, easing: "easeOutCubic" }
          }
        }
      },
      {
        movement: {
          imgWrapper: {
            rotation: { x: -5, y: 10, z: 0 },
            reverseAnimation: { duration: 50, easing: "easeOutQuad" }
          },
          caption: {
            translation: { x: 20, y: 20, z: 0 },
            reverseAnimation: { duration: 200, easing: "easeOutQuad" }
          },
          overlay: {
            translation: { x: 5, y: -5, z: 0 },
            rotation: { x: 0, y: 0, z: 6 },
            reverseAnimation: { duration: 1e3, easing: "easeOutQuad" }
          },
          shine: {
            translation: { x: 50, y: 50, z: 0 },
            reverseAnimation: { duration: 50, easing: "easeOutQuad" }
          }
        }
      },
      {
        movement: {
          imgWrapper: {
            translation: { x: 0, y: -8, z: 0 },
            rotation: { x: 3, y: 3, z: 0 },
            reverseAnimation: { duration: 1200, easing: "easeOutExpo" }
          },
          lines: {
            translation: { x: 15, y: 15, z: [0, 15] },
            reverseAnimation: { duration: 1200, easing: "easeOutExpo" }
          },
          overlay: {
            translation: { x: 0, y: 8, z: 0 },
            reverseAnimation: { duration: 600, easing: "easeOutExpo" }
          },
          caption: {
            translation: { x: 10, y: -15, z: 0 },
            reverseAnimation: { duration: 900, easing: "easeOutExpo" }
          },
          shine: {
            translation: { x: 50, y: 50, z: 0 },
            reverseAnimation: { duration: 1200, easing: "easeOutExpo" }
          }
        }
      },
      {
        movement: {
          lines: {
            translation: { x: -5, y: 5, z: 0 },
            reverseAnimation: { duration: 1e3, easing: "easeOutExpo" }
          },
          caption: {
            translation: { x: 15, y: 15, z: 0 },
            rotation: { x: 0, y: 0, z: 3 },
            reverseAnimation: {
              duration: 1500,
              easing: "easeOutElastic",
              elasticity: 700
            }
          },
          overlay: {
            translation: { x: 15, y: -15, z: 0 },
            reverseAnimation: { duration: 500, easing: "easeOutExpo" }
          },
          shine: {
            translation: { x: 50, y: 50, z: 0 },
            reverseAnimation: { duration: 500, easing: "easeOutExpo" }
          }
        }
      },
      {
        movement: {
          imgWrapper: {
            translation: { x: 5, y: 5, z: 0 },
            reverseAnimation: { duration: 800, easing: "easeOutQuart" }
          },
          caption: {
            translation: { x: 10, y: 10, z: [0, 50] },
            reverseAnimation: { duration: 1e3, easing: "easeOutQuart" }
          },
          shine: {
            translation: { x: 50, y: 50, z: 0 },
            reverseAnimation: { duration: 800, easing: "easeOutQuart" }
          }
        }
      },
      {
        movement: {
          lines: {
            translation: { x: 40, y: 40, z: 0 },
            reverseAnimation: { duration: 1500, easing: "easeOutElastic" }
          },
          caption: {
            translation: { x: 20, y: 20, z: 0 },
            rotation: { x: 0, y: 0, z: -5 },
            reverseAnimation: { duration: 1e3, easing: "easeOutExpo" }
          },
          overlay: {
            translation: { x: -30, y: -30, z: 0 },
            rotation: { x: 0, y: 0, z: 3 },
            reverseAnimation: { duration: 750, easing: "easeOutExpo" }
          },
          shine: {
            translation: { x: 100, y: 100, z: 0 },
            reverseAnimation: { duration: 750, easing: "easeOutExpo" }
          }
        }
      }
    ];
    (function() {
      var ce = 0;
      [].slice
        .call(document.querySelectorAll(".tilter"))
        .forEach(function(pe, ue) {
          (ce = 0 == ue % 30 ? ce + 1 : ce), new TiltFx(pe, de[ce - 1]);
        });
    })();
  }
  function W() {
    $(document).on("click", ".add_to_wishlist:not(.added)", function(le) {
      if (!$(this).hasClass("need-login")) {
        le.preventDefault();
        var de = $(this),
          ce = de.closest("form"),
          pe = { action: "add_wishlist" };
        return (pe = ce.serialize() + "&" + $.param(pe)), $.ajax({
          type: "POST",
          url: "/a/wishlist",
          async: !0,
          cache: !1,
          data: pe,
          dataType: "json",
          beforeSend: function() {
            de.hasClass("tooltip")
              ? de.addClass("loading")
              : de
                  .attr("title", de.attr("data-loading-text"))
                  .find("span")
                  .text(de.attr("data-loading-text"));
          },
          error: function(ue) {
            console.log(ue);
          },
          success: function(ue) {
            de.hasClass("tooltip") && de.removeClass("loading");
            var ge = $(".wishlist" + de.prev().val());
            1 == ue.code
              ? (ge
                  .attr("title", de.attr("data-added"))
                  .addClass("added")
                  .find("span")
                  .text(de.attr("data-added")), $(
                  ".wishlist_items_number"
                ).text(ue.json))
              : (ge
                  .attr("title", de.attr("data-title"))
                  .find("span")
                  .text(de.attr("data-title")), alert(ue.json));
          }
        }), !1;
      }
    });
  }
  function R() {
    $(document).on("click", ".remove_from_wishlist", function(le) {
      le.preventDefault();
      var de = $(this),
        ce = de.closest("form"),
        pe = { action: "remove_wishlist" };
      return (pe = ce.serialize() + "&" + $.param(pe)), $.ajax({
        type: "POST",
        url: "/a/wishlist",
        async: !0,
        cache: !1,
        data: pe,
        dataType: "json",
        beforeSend: function() {
          $(".page-wishlist").addClass("loading");
        },
        error: function(ue) {
          console.log(ue), $(".page-wishlist").removeClass("loading");
        },
        success: function(ue) {
          1 == ue.code
            ? de.closest("tr").slideUp("fast", function() {
                de
                  .closest("tr")
                  .remove(), $(".page-wishlist .infos").removeClass("hide"), $(".wishlist_items_number").text(ue.json), 0 == ue.json && $(".wishlist-empty").removeClass("hide");
              })
            : alert(ue.json), $(".page-wishlist").removeClass("loading");
        }
      }), !1;
    });
  }
  function Q() {
    $(".blog-content-area, .content-area").fitVids();
  }
  function N() {
    var le = $(".box-share-master-container").attr("data-share-elem");
    $(".social-sharing").socialShare({
      social: le,
      animation: "launchpadReverse",
      blur: !0
    });
  }
  function K() {
    $(".toggle_simple .toggle_title").on("click", function() {
      var le = $(this),
        de = le.closest(".toggle_simple"),
        ce = de.find(".toggle_content");
      ce.slideToggle(function() {
        de.toggleClass("toggle_active"), $(window).trigger("resize");
      });
    });
  }
  function G() {
    if ($("#popup-mailchimp").length) {
      function ce() {
        $(document.body).removeClass("modal-open");
        var pe = $(".popup-modal.open");
        pe.fadeOut(function() {
          $(this).removeClass("open");
        }), $(document.body).trigger("roar_modal_closed", [pe]);
      }
      var le = parseInt(theme.popup_mailchimp_period),
        de = parseInt(theme.popup_mailchimp_delay);
      if (
        0 < le && document.cookie.match(/^(.*;)?\s*eva_popup\s*=\s*[^;]+(.*)?$/)
      )
        return;
      (de = Math.max(de, 0)), $(window).on("load", function() {
        setTimeout(function() {
          $(document.body).addClass(
            "modal-open"
          ), $(".popup-modal").fadeIn(), $(".popup-modal").addClass("open");
        }, 1e3 * de);
      }), $(document.body).on("roar_modal_closed", function(pe, ue) {
        if (ue.hasClass("roar-popup")) {
          var ge = new Date(), me = ge.getTime();
          ge.setTime(
            ge.getTime() + 1e3 * (60 * (60 * (24 * le)))
          ), (document.cookie =
            "eva_popup=" + me + ";expires=" + ge.toGMTString() + ";path=/");
        }
      }), $(
        document.body
      ).on("click", ".close-modal, .popup-backdrop", function(pe) {
        pe.preventDefault(), ce();
      }), $(document).on("keyup", function(pe) {
        27 === pe.keyCode && ce();
      });
    }
  }
  function Z() {
    $(window).on("load", function() {
      "undefined" != typeof window.notifySettings &&
        ((notifyProIO.settings = {}), (notifyProIO.settings.message =
          window.notifySettings.message), (notifyProIO.settings.hideMobile = !0), (notifyProIO.settings.initialDelay = 3e3), (notifyProIO.settings.displayInterval =
          window.notifySettings.displayInterval), (notifyProIO.settings.displayHold =
          window.notifySettings.displayHold), (notifyProIO.settings.totalPerPage =
          window.notifySettings.totalPerPage), (notifyProIO.settings.totalDisplayed = 0), (notifyProIO.settings.loop = !0), notifyProIO.setup(
          window.notifyProducts
        ));
    });
  }
  function Y() {
    return document.cookie.match(/^(.*;)?\s*eva_cookie\s*=\s*[^;]+(.*)?$/)
      ? void $(".cc_container").remove()
      : void ($(window).on("load", function() {
          setTimeout(function() {
            $(".cc_container").addClass("open");
          }, 5e3);
        }), $(".cc_btn").click(function(le) {
          le.preventDefault();
          var de = new Date(), ce = de.getTime();
          de.setTime(
            de.getTime() + 31536000000
          ), (document.cookie = "eva_cookie=" + ce + ";expires=" + de.toGMTString() + ";path=/"), $(".cc_container").removeClass("open");
        }));
  }
  function J() {
    function de(fe, ve, _e) {
      var ye = fe + "=" + encodeURIComponent(ve);
      if (_e) {
        var Ce = new Date();
        Ce.setTime(Ce.getTime() + 1e3 * (60 * (60 * (24 * _e)))), (ye +=
          ";expires=" + Ce.toGMTString());
      }
      (ye += ";path=/"), (document.cookie = ye);
    }
    function ce() {
      ue.hasClass("open")
        ? (ue.removeClass("open"), de("eva-fbchat", "0", 365))
        : (ue.addClass("open"), pe(), de("eva-fbchat", "1", 365));
    }
    function pe() {
      var fe = $(".fb-sheet-content-inner"),
        ve = fe.width(),
        _e = fe.height(),
        ye = fe.attr("data-timeline"),
        Ce = fe.attr("data-events"),
        be = fe.attr("data-page");
      me.html(
        '<div class="fb-page" data-tabs="messages' +
          ("true" == ye && ", timeline") +
          ("true" == Ce && ", events") +
          '" data-width="' +
          ve +
          '" data-height="' +
          _e +
          '" data-href="' +
          be +
          '" data-small-header="true"  data-hide-cover="false" data-show-facepile="true" data-adapt-container-width="false"><div class="fb-xfbml-parse-ignore"><blockquote>Loading...</blockquote></div></div>'
      ), "FB" in window && FB.XFBML.parse();
    }
    var ue = $(".fb-sheet"),
      ge = $(".fb-sheet-content"),
      me = $(".fb-sheet-content-part");
    $(".fbchat-badge").click(function() {
      return ce(), !1;
    }), $(".fb-sheet-head-close").click(function() {
      return ce(), !1;
    }), "1" ==
      (function(fe) {
        return (
          (fe = (document.cookie.match("(^|; )" + fe + "=([^;]*)") || 0)[2]) &&
          decodeURIComponent(fe)
        );
      })("eva-fbchat")
      ? (ue.addClass("open"), pe())
      : ue.removeClass("open");
    var he = (function() {
      var fe = {};
      return function(ve, _e, ye) {
        ye || (ye = "Don't call this twice without a uniqueId"), fe[ye] &&
          clearTimeout(fe[ye]), (fe[ye] = setTimeout(ve, _e));
      };
    })();
    $(window).resize(function() {
      me.html('<div class="fb-spin"></div>'), he(
        function() {
          pe();
        },
        500,
        "some unique string"
      );
    });
  }
  function X() {
    jQuery("#be_compare_features_table").on("scroll", function() {
      var le = jQuery(this).parent();
      jQuery(this).scrollLeft() + jQuery(this).innerWidth() >=
        jQuery(this)[0].scrollWidth
        ? le.hasClass("scroll-right") && le.removeClass("scroll-right")
        : 0 === jQuery(this).scrollLeft()
            ? le.hasClass("scroll-left") && le.removeClass("scroll-left")
            : (!le.hasClass("scroll-right") &&
                le.addClass("scroll-right"), !le.hasClass("scroll-left") &&
                le.addClass("scroll-left"));
    }), (be_compare_container = document.getElementById(
      "be_compare_features_table"
    )), null !== be_compare_container &&
      be_compare_container.offsetWidth < be_compare_container.scrollWidth &&
      !jQuery("#be_compare_features_table_inner").hasClass("scroll-right") &&
      jQuery("#be_compare_features_table_inner").addClass(
        "scroll-right"
      ), jQuery(window).on("resize", function() {
      ee();
    }), jQuery("#be_compare_features_table_inner").hasClass("scroll-left") ||
      jQuery("#be_compare_features_table_inner").hasClass("scroll-right")
      ? $(".compare-preview").addClass("no-flex")
      : $(".compare-preview").removeClass("no-flex");
  }
  function ee() {
    be_compare_container = document.getElementById("be_compare_features_table");
    null === be_compare_container ||
      (be_compare_container.offsetWidth < be_compare_container.scrollWidth
        ? !jQuery("#be_compare_features_table_inner").hasClass(
            "scroll-right"
          ) &&
            jQuery("#be_compare_features_table_inner").addClass("scroll-right")
        : (jQuery("#be_compare_features_table_inner").hasClass(
            "scroll-right"
          ) &&
            jQuery("#be_compare_features_table_inner").removeClass(
              "scroll-right"
            ), jQuery("#be_compare_features_table_inner").hasClass(
            "scroll-left"
          ) &&
            jQuery("#be_compare_features_table_inner").removeClass(
              "scroll-left"
            )), jQuery("#be_compare_features_table_inner").hasClass(
        "scroll-left"
      ) || jQuery("#be_compare_features_table_inner").hasClass("scroll-right")
        ? $(".compare-preview").addClass("no-flex")
        : $(".compare-preview").removeClass("no-flex"));
  }
  function te() {
    var le = $("body"), de = $("a.add_to_compare"), ce = "", ue = !1;
    le.on("click", "a.add_to_compare", function() {
      var ge = $(this),
        me = ge.data("pid"),
        he = Currency.cookie.rtread("rt-compare"),
        fe = !1;
      if (
        ((ue = !1), ge
          .closest(".product")
          .find(".product_thumbnail")
          .addClass("loading"), (he = null != he && "" != he
          ? he.split(",")
          : []), ge.hasClass("reach-limit") &&
          ((ue = !0), !1 === $(this).hasClass("added") &&
            ((fe = !0), jQuery("#rtp-message").html(
              theme.strings.c_msg
            ), jQuery("#rt-unero-popup-message")
              .css(
                "margin-left",
                "-" +
                  parseFloat(jQuery("#rt-unero-popup-message").width()) / 2 +
                  "px"
              )
              .fadeIn(), window.setTimeout(function() {
              jQuery("#rt-unero-popup-message").fadeOut();
            }, 2e3))), 0 > he.indexOf(me) &&
          !1 === $(this).hasClass("added") &&
          !1 == ue)
      ) {
        he.push(me);
        var ve = he.join(",");
        "," == ve.substring(0, 1) &&
          (ve = ve.substring(1)), Currency.cookie.rtwrite("rt-compare", ve);
      }
      !1 === $(this).hasClass("added") || "" == ce
        ? ((ce = ""), $.ajax({
            url: "/pages/compare/" + he,
            dataType: "html",
            type: "GET",
            success: function(_e) {
              ce = _e;
            },
            error: function() {
              console.log("ajax error"), ge
                .closest(".product")
                .find(".product_thumbnail")
                .removeClass("loading");
            },
            complete: function() {
              he.length >= parseInt(theme.compare_limit) &&
                0 < $("a.add_to_compare").length &&
                $("a.add_to_compare").each(function() {
                  $(this).addClass("reach-limit");
                }), $.magnificPopup.open({
                items: { src: ce, type: "inline" },
                preloader: !0,
                tLoading: "",
                mainClass: "compare-preview",
                removalDelay: 200,
                gallery: { enabled: !0 },
                callbacks: {
                  open: function() {
                    !1 == fe &&
                      ($('[data-pid="' + me + '"]')
                        .addClass("added")
                        .attr(
                          "data-original-title",
                          $('[data-pid="' + me + '"]').attr("data-added")
                        ), $('[data-pid="' + me + '"]').hasClass(
                        "eva_product_compare_button"
                      )
                        ? $('[data-pid="' + me + '"]').html(
                            $('[data-pid="' + me + '"]').attr("data-added")
                          )
                        : $('[data-pid="' + me + '"]')
                            .find("span")
                            .html(
                              $('[data-pid="' + me + '"]').attr("data-added")
                            )), ge
                      .closest(".product")
                      .find(".product_thumbnail")
                      .removeClass("loading"), theme.CurrencyPicker.convert(
                      ".compare-content .money"
                    ), k(), X();
                  }
                }
              });
            }
          }))
        : $.ajax({
            url: "/pages/compare/" + he,
            dataType: "html",
            type: "GET",
            success: function(_e) {
              ce = _e;
            },
            error: function() {
              console.log("ajax error"), ge
                .closest(".product")
                .find(".product_thumbnail")
                .removeClass("loading");
            },
            complete: function() {
              $.magnificPopup.open({
                items: { src: ce, type: "inline" },
                preloader: !0,
                tLoading: "",
                mainClass: "compare-preview",
                removalDelay: 200,
                gallery: { enabled: !0 },
                callbacks: {
                  open: function() {
                    ge
                      .closest(".product")
                      .find(".product_thumbnail")
                      .removeClass("loading"), theme.CurrencyPicker.convert(
                      ".compare-content .money"
                    ), k(), X();
                  }
                }
              });
            }
          });
    }), le.on("click", ".remove_from_compare", function(ge) {
      ge.preventDefault();
      var me = $(this), he = me.attr("data-rev"), fe = $(".compare-content");
      $('[data-pid="' + he + '"]')
        .removeClass("added")
        .attr(
          "data-original-title",
          $('[data-pid="' + he + '"]').attr("data-title")
        ), $('[data-pid="' + he + '"]').find("span").html($('[data-pid="' + he + '"]').attr("data-title"));
      var ve = decodeURI(Currency.cookie.rtread("rt-compare"));
      null != ve &&
        ((ve = ve.split(",")), ve.length <= theme.compare_limit &&
          0 < $("a.add_to_compare").length &&
          $("a.add_to_compare").each(function() {
            $(this).removeClass("reach-limit");
          })), (ve = jQuery.grep(ve, function(_e) {
        return _e != he;
      })), (ve = $.trim(
        ve
      )), Currency.cookie.rtwrite("rt-compare", ve), X(), $(".unero_" + he).remove(), 0 >= ve.length && $(".mfp-close").trigger("click");
    });
  }
  function ae() {
    if (0 != parseInt(theme.compare)) {
      var le = Currency.cookie.rtread("rt-compare");
      null == le
        ? (le = [])
        : ((le = le.split(",")), le.length >= parseInt(theme.compare_limit) &&
            $(".add_to_compare").addClass("reach-limit"), le.map(function(de) {
            $('[data-pid="' + de + '"]')
              .addClass("added")
              .attr(
                "data-original-title",
                $('[data-pid="' + de + '"]').attr("data-added")
              ), $('[data-pid="' + de + '"]').hasClass("eva_product_compare_button") ? $('[data-pid="' + de + '"]').html($('[data-pid="' + de + '"]').attr("data-added")) : $('[data-pid="' + de + '"]').find("span").html($('[data-pid="' + de + '"]').attr("data-added"));
          }));
    }
  }
  function se() {
    "1" == theme.compare && (te(), ae(), X());
  }
  function oe() {
    $().countdown &&
      0 < $(".countdown-item").length &&
      $(".countdown-item").each(function() {
        if (!$(this).hasClass("is-countdown")) {
          var le = new Date(),
            de = $(this).data("countdown").split("-"),
            de = new Date(de[2], parseInt(de[0]) - 1, de[1]);
          le < de &&
            $(this).countdown({
              until: de,
              layout: "<div><i>{dn}</i><span>{dl}</span></div><div><i>{hn}</i><span>{hl}</span></div><div><i>{mn}</i><span>{ml}</span></div><div><i>{sn}</i><span>{sl}</span></div>"
            });
        }
      });
  }
  $("body").on("click", function(le) {
    ($(le.target).is(".cd-close") || $(le.target).is("body.overlay-layer")) &&
      !0 == ne &&
      (le.preventDefault(), V(re, ie));
  }), $(document).keyup(function(le) {
    "27" == le.which && V(re, ie);
  }), $(window).on("resize", function() {
    $(".cd-quick-view").hasClass("is-visible") &&
      window.requestAnimationFrame(D);
  });
  var re = 480, ie = 960, ne = !0;
  return {
    init: function() {
      p(), C(), P(), L(), H(), M(), W(), R(), Q(), K(), N(), G(), Z(), Y(), J(), se(), oe();
    }
  };
})()), (theme.init = function() {
  theme.roarApplication.init(), theme.customerTemplates.init(), slate.rte.wrapTable(), slate.rte.iframeReset(), slate.a11y.pageLinkFocus(
    $(window.location.hash)
  ), $(".in-page-link").on("click", function(p) {
    slate.a11y.pageLinkFocus($(p.currentTarget.hash));
  }), $('a[href="#"]').on("click", function(p) {
    p.preventDefault();
  });
});
var roarLookbook = {
  getSizedImageUrl: function(p, v) {
    var y = document.createElement("a");
    if (((y.href = p), "cdn.shopify.com" != y.hostname)) return p;
    if (null == v) return p;
    if ("master" == v) return roarLookbook.removeProtocol(p);
    var C = p.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
    if (null != C) {
      var y = p.split(C[0]), k = C[0];
      return roarLookbook.removeProtocol(y[0] + "_" + v + k);
    }
    return null;
  },
  removeProtocol: function(p) {
    return p.replace(/http(s)?:/, "");
  },
  isProductUrl: function(p) {
    var v = window.location.hostname, y = document.createElement("a");
    return (y.href = p), y.hostname == v;
  },
  buildLookbook: function() {
    $(".roarlookbook").each(function(p) {
      var v = $(this);
      if (!v.hasClass("roarlookbook_init")) {
        var y = v.attr("data-lookbook"),
          C = { lookbook: y, action: "lookbook_get" };
        (C = $.param(C)), $.ajax({
          type: "POST",
          url: "/apps/roarlookbook",
          async: !0,
          cache: !1,
          data: C,
          dataType: "json",
          beforeSend: function() {},
          error: function() {},
          success: function(k) {
            v.append(k);
            var x = v.find(".media__blank-preview");
            x.imagesLoaded(function() {
              v
                .addClass("roarlookbook_init")
                .attr("data-lookbook", y + p), x.addClass("sfx-fadeIn");
            });
          }
        });
      }
    });
  },
  resetHotspots: function(p) {
    var v = $(".hotspot", p), y = p.attr("data-lookbook");
    v.each(function() {
      var C = $(this), k = C.attr("data-id"), x = $("#" + y + "-" + k, p);
      x.fadeOut("fast", function() {
        x.remove(), C.removeClass("hotspot_init");
      });
    });
  },
  hotspotPopup: function() {
    $(".roarlookbook").on("click", ".hotspot", function() {
      var v = $(this);
      if (!v.hasClass("hotspot_init")) {
        var y = v.closest(".roarlookbook"),
          C = v.attr("data-id"),
          k = v.closest(".roarlookbook").attr("data-lookbook") + "-" + C,
          x = "#" + v.closest(".roarlookbook").attr("data-lookbook") + "-" + C,
          S = v.attr("data-title"),
          I = v.attr("data-image"),
          T = v.attr("data-price"),
          P = v.attr("data-url"),
          O = "";
        if ("" == S && "" == P) return !1;
        if (
          (roarLookbook.resetHotspots(y), (O +=
            '<div id="' +
            k +
            '" class="hotspot-widget hotspot-loading">'), (O +=
            '<div class="hotspot-content">'), (O +=
            '<span class="hotspot-close">\xD7</span>'), (O +=
            '<div class="hotspot-inner">'), "" != I)
        ) {
          var A =
            '<img src="' +
            roarLookbook.getSizedImageUrl(I, "80x") +
            '" src="' +
            roarLookbook.getSizedImageUrl(I, "300x") +
            '" data-srcset="' +
            roarLookbook.getSizedImageUrl(I, "300x") +
            " 1x, " +
            roarLookbook.getSizedImageUrl(I, "600x") +
            ' 2x" alt="" />';
          O += "" == P ? A : '<a href="' + P + '">' + A + "</a>";
        }
        if (
          ("" != S &&
            ((O += "<h3>"), (O += "" == P
              ? S
              : '<a href="' + P + '">' + S + "</a>"), (O += "</h3>")), "" !=
            T &&
            ((O +=
              '<div class="price"><span class="money">' +
              T +
              "</span></div>"), roarLookbook.isProductUrl(P) &&
              ((O += '<div class="hotspot-btns">'), (O +=
                '<div class="hotspot-btn"><a href="' +
                P +
                '">' +
                theme.apps.details +
                "</a></div>"), (O +=
                '<div class="hotspot-btn"><a class="roar_add_to_cart" href="' +
                P +
                '?add-to-cart=true">' +
                theme.apps.buyNow +
                "</a></div>"), (O += "</div>"))), (O += "</div>"), (O +=
            "</div>"), (O += "</div>"), $(x).length || y.append(O), $(
            x
          ).imagesLoaded(function() {
            var E = $(x),
              D = v.offset().left,
              B = v.offset().top,
              V = E.outerWidth(),
              q = E.outerHeight(),
              F = y.offset().left,
              U = y.offset().top,
              L = y.outerWidth() - (D + V),
              H = "hotspot-right";
            50 > L
              ? ((D = D - V - 5), (H = "hotspot-left"))
              : (D =
                  D +
                  v.outerWidth() +
                  5), (B = B + v.outerHeight() / 2 - q / 2), E.css({ left: D - F, top: B - U }).removeClass("hotspot-left").removeClass("hotspot-right").addClass(H), v.addClass("hotspot_init"), E.removeClass("hotspot-loading").fadeIn("fast");
          }), $(x).find("img").length)
        ) {
          var z = $(x).find("img");
          z
            .attr("src", z.attr("data-src"))
            .removeAttr("data-src")
            .attr("srcset", z.attr("data-srcset"))
            .removeAttr("data-srcset");
        }
      } else {
        var y = v.closest(".roarlookbook");
        roarLookbook.resetHotspots(y);
      }
    }), $(document).on("click", ".hotspot-close", function() {
      var v = $(this),
        y = v.closest(".hotspot-widget"),
        C = y.attr("id"),
        k = C.split("-"),
        x = k[1];
      $('.roarlookbook .hotspot[data-id="' + x + '"]').removeClass(
        "hotspot_init"
      ), y.fadeOut("fast", function() {
        y.remove();
      });
    }), $(".roarlookbook").on("click", ".image-preview", function() {
      var v = $(this).closest(".roarlookbook");
      roarLookbook.resetHotspots(v);
    }), $(window).resize(function() {
      $(".roarlookbook .hotspot_init").length &&
        $(".roarlookbook .hotspot_init").each(function() {
          var v = $(this);
          v.removeClass("hotspot_init").trigger("click");
        });
    });
  },
  addToCart: function() {
    $(document).on("click", ".roar_add_to_cart", function(p) {
      p.preventDefault();
      var v = $(this), y = v.closest(".roarlookbook"), C = v.attr("href");
      $.ajax({
        type: "GET",
        url: C,
        beforeSend: function() {},
        success: function(k) {
          var x = $(k).find('form[action="/cart/add"]');
          x.appendTo(y).submit().remove();
        },
        dataType: "html"
      });
    });
  },
  init: function() {
    $(".roarlookbook").length &&
      (roarLookbook.buildLookbook(), roarLookbook.hotspotPopup(), roarLookbook.addToCart());
  }
};
try {
  $(theme.init), roarLookbook.init();
} finally {
  setTimeout(function() {
    $("body").addClass("loaded");
  }, 2e3);
}
