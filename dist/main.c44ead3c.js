// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
//获取站点数据对象
var siteData = JSON.parse(localStorage.getItem('siteData')) || [{
  href: 'https://github.com',
  favicon: 'https://api.faviconkit.com/github.com/144',
  logo: 'g',
  text: 'github.com'
}, {
  href: 'https://developer.mozilla.org',
  favicon: 'https://api.faviconkit.com/developer.mozilla.org/144',
  logo: 'd',
  text: 'developer.mozilla.org'
}, {
  href: 'https://store.steampowered.com',
  favicon: 'https://api.faviconkit.com/store.steampowered.com/144',
  logo: 's',
  text: 'store.steampowered.com'
}, {
  href: 'https://store.ubi.com',
  favicon: 'https://api.faviconkit.com/store.ubi.com/144',
  logo: 's',
  text: 'store.ubi.com'
}, {
  href: 'https://www.facebook.com',
  favicon: 'https://api.faviconkit.com/facebook.com/144',
  logo: 'f',
  text: 'facebook.com'
}, {
  href: 'https://twitter.com',
  favicon: 'https://api.faviconkit.com/twitter.com/144',
  logo: 't',
  text: 'twitter.com'
}, {
  href: 'https://www.iconfont.cn',
  favicon: 'https://api.faviconkit.com/iconfont.cn/144',
  logo: 'i',
  text: 'iconfont.cn'
}, {
  href: 'https://www.ele.me',
  favicon: 'https://api.faviconkit.com/ele.me/144',
  logo: 'e',
  text: 'ele.me'
}, {
  href: 'https://youtube.com',
  favicon: 'https://api.faviconkit.com/youtube.com/144',
  logo: 'y',
  text: 'youtube.com'
}];

var init = function init() {
  //请求背景图
  backImage(); //渲染初始列表

  render(); //设置监听

  $(document).keydown(keyOpen);
  $('.siteLast').bind('click', addCard);
  $('#search').focus(function () {
    $(document).off();
  });
  $('#search').blur(function () {
    $(document).keydown(keyOpen);
  });
};

var render = function render() {
  //清空
  $('.siteMain li[name!="addCard"]').remove(); //重新渲染

  $.each(siteData, function (index, node) {
    var $li = $("\n    <li>\n      <a href=".concat(node.href, " >\n        <div class=\"siteContainer\" >\n          <div class=\"logo\">\n              <svg class=\"icon\" aria-hidden=\"true\">\n                <use xlink:href=\"#icon-loading\"></use>\n                <animateTransform\n                      attributeName=\"transform\"\n                      attributeType=\"XML\"\n                      type=\"rotate\"\n                      from=\"0\"\n                      to=\"360\"\n                      dur=\"3\"\n                      repeatCount=\"indefinite\" />\n              </svg>\n          </div>\n          <div class=\"text\">").concat(node.text, "</div>\n        </div>\n      </a>\n    </li>\n    ")); //加载图片

    loadImage($li, node); //渲染到新增Card前面

    $('.siteLast').parent().before($li); //绑定删除事件

    $li.contextmenu(function (e) {
      e.stopPropagation(); // 阻止冒泡

      e.preventDefault(); //阻止默认

      siteData.splice(index, 1);
      $li.remove(); // render();
    });
  });
};

var addCard = function addCard() {
  var url = prompt('请输入要添加的网址', 'https://');
  var pattern = /(http|https):\/\/(www.)?(\w+(\.)?)+/;
  var realUrl = url.match(pattern)[0];
  var text = realUrl.replace(/(http|https):\/\/(www.)?/, '');
  var favicon = "https://api.faviconkit.com/".concat(text, "/144"); //检测图片

  var card = {
    href: realUrl,
    favicon: favicon,
    logo: text[0],
    text: text
  };
  siteData.unshift(card);
  render();
};

var keyOpen = function keyOpen(e) {
  var key = e.key;
  $.each(siteData, function (index, node) {
    if (node.text[0].toLowerCase() === key) {
      window.open(node.href);
      return false;
    }
  });
}; //Image


var loadImage = function loadImage($li, node) {
  var $sitebox = $li.children().children();
  var $logo = $($sitebox.children().get(0));
  var $text = $($sitebox.children().get(1));
  var img = new Image();

  img.onload = function () {
    var $img = $(img);
    $logo.remove();
    $text.before($img.addClass('logo'));
  };

  img.src = node.favicon;
};

var backImage = function backImage() {
  var width = Math.ceil($('body').width());
  var height = Math.ceil($('body').height());
  var random = Math.ceil(Math.random() * 10);
  var ImgUrl = "https://picsum.photos/".concat(width, "/").concat(height, "/?blur=").concat(random);

  if (width > 500) {
    $('body').css('background-image', "url(".concat(ImgUrl, ")"));
  }
}; //离开保存;


onbeforeunload = function onbeforeunload() {
  var data = JSON.stringify(siteData);
  localStorage.setItem('siteData', data);
}; //初始化


init();
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.c44ead3c.js.map