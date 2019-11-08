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
  href: 'https://bilibili.com',
  logo: 'B',
  text: 'Bilibili'
}];

var init = function init() {
  //渲染初始列表
  render(siteData); //设置监听

  $('.siteLast').bind('click', addCard); //

  $('#search').focus(function () {
    $(document).off();
    console.log('qqq');
  });
  $('#search').blur(function () {
    $(document).keydown(keyOpen);
  });
};

var render = function render() {
  //清空
  $('.siteMain li[name!="addCard"]').remove(); //重新渲染

  $.each(siteData, function (index, node) {
    var $li = $("\n    <li>\n      <a href=".concat(node.href, " >\n        <div class=\"siteContainer\" >\n          <img class=\"logo\" src=").concat(node.favicon, "></img>\n          <div class=\"text\">").concat(node.text, "</div>\n        </div>\n      </a>\n    </li>\n    ")); //渲染到新增Card前面

    $('.siteLast').parent().before($li); //绑定删除事件

    $li.contextmenu(function (e) {
      e.stopPropagation(); // 阻止冒泡

      e.preventDefault(); //阻止默认

      siteData.splice(index, 1);
      render();
    }); //设置图片加载事件

    var $sitebox = $li.children().children();
    var $image = $($sitebox.children().get(0));
    var $text = $($sitebox.children().get(1));
    $image.one('error', function () {
      var $logo = $("<div class=\"logo\">".concat(node.logo, "</div>"));
      $text.before($logo);
      $image.remove();
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
    }
  });
}; //离开保存;


onbeforeunload = function onbeforeunload() {
  var data = JSON.stringify(siteData);
  localStorage.setItem('siteData', data);
}; //初始化


init();
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.e8d3ba36.js.map