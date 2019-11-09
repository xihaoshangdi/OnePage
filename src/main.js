//获取站点数据对象
const siteData = JSON.parse(localStorage.getItem('siteData')) || [
  {
    href: 'https://github.com',
    favicon: 'https://api.faviconkit.com/github.com/144',
    logo: 'g',
    text: 'github.com'
  },
  {
    href: 'https://developer.mozilla.org',
    favicon: 'https://api.faviconkit.com/developer.mozilla.org/144',
    logo: 'd',
    text: 'developer.mozilla.org'
  },
  {
    href: 'https://store.steampowered.com',
    favicon: 'https://api.faviconkit.com/store.steampowered.com/144',
    logo: 's',
    text: 'store.steampowered.com'
  },
  {
    href: 'https://store.ubi.com',
    favicon: 'https://api.faviconkit.com/store.ubi.com/144',
    logo: 's',
    text: 'store.ubi.com'
  },
  {
    href: 'https://www.facebook.com',
    favicon: 'https://api.faviconkit.com/facebook.com/144',
    logo: 'f',
    text: 'facebook.com'
  },
  {
    href: 'https://twitter.com',
    favicon: 'https://api.faviconkit.com/twitter.com/144',
    logo: 't',
    text: 'twitter.com'
  },
  {
    href: 'https://www.iconfont.cn',
    favicon: 'https://api.faviconkit.com/iconfont.cn/144',
    logo: 'i',
    text: 'iconfont.cn'
  },
  {
    href: 'https://www.ele.me',
    favicon: 'https://api.faviconkit.com/ele.me/144',
    logo: 'e',
    text: 'ele.me'
  },
  {
    href: 'https://youtube.com',
    favicon: 'https://api.faviconkit.com/youtube.com/144',
    logo: 'y',
    text: 'youtube.com'
  }
];

const init = () => {
  //请求背景图
  backImage();
  //渲染初始列表
  render();
  //设置监听
  $(document).keydown(keyOpen);
  $('.siteLast').bind('click', addCard);
  $('#search').focus(function() {
    $(document).off();
  });
  $('#search').blur(function() {
    $(document).keydown(keyOpen);
  });
};

const render = () => {
  //清空
  $('.siteMain li[name!="addCard"]').remove();
  //重新渲染
  $.each(siteData, (index, node) => {
    const $li = $(`
    <li>
      <a href=${node.href} >
        <div class="siteContainer" >
          <div class="logo">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-loading"></use>
                <animateTransform
                      attributeName="transform"
                      attributeType="XML"
                      type="rotate"
                      from="0"
                      to="360"
                      dur="3"
                      repeatCount="indefinite" />
              </svg>
          </div>
          <div class="text">${node.text}</div>
        </div>
      </a>
    </li>
    `);

    //加载图片
    loadImage($li, node);
    //渲染到新增Card前面
    $('.siteLast')
      .parent()
      .before($li);
    //绑定删除事件
    $li.contextmenu(e => {
      e.stopPropagation(); // 阻止冒泡
      e.preventDefault(); //阻止默认
      siteData.splice(index, 1);
      $li.remove();
      // render();
    });
  });
};

const addCard = () => {
  const url = prompt('请输入要添加的网址', 'https://');
  const pattern = /(http|https):\/\/(www.)?(\w+(\.)?)+/;
  const realUrl = url.match(pattern)[0];
  const text = realUrl.replace(/(http|https):\/\/(www.)?/, '');
  const favicon = `https://api.faviconkit.com/${text}/144`;
  //检测图片
  let card = {
    href: realUrl,
    favicon: favicon,
    logo: text[0],
    text: text
  };
  siteData.unshift(card);
  render();
};

const keyOpen = e => {
  const { key } = e;
  $.each(siteData, (index, node) => {
    if (node.text[0].toLowerCase() === key) {
      window.open(node.href);
      return false;
    }
  });
};

//Image
const loadImage = ($li, node) => {
  const $sitebox = $li.children().children();
  const $logo = $($sitebox.children().get(0));
  const $text = $($sitebox.children().get(1));
  const img = new Image();
  img.onload = function() {
    const $img = $(img);
    $logo.remove();
    $text.before($img.addClass('logo'));
  };
  img.src = node.favicon;
};

const backImage = () => {
  const width = Math.ceil($('body').width());
  const height = Math.ceil($('body').height());
  const random = Math.ceil(Math.random() * 10);
  const ImgUrl = `https://picsum.photos/${width}/${height}/?blur=${random}`;
  if (width > 500) {
    $('body').css('background-image', `url(${ImgUrl})`);
  }
};

//离开保存;
onbeforeunload = () => {
  const data = JSON.stringify(siteData);
  localStorage.setItem('siteData', data);
};

//初始化
init();
