//获取站点数据对象
const siteData = JSON.parse(localStorage.getItem('siteData')) || [
  { href: 'https://bilibili.com', logo: 'B', text: 'Bilibili' }
];

const init = () => {
  //渲染初始列表
  render(siteData);
  //设置监听
  $('.siteLast').bind('click', addCard);
  //
  $('#search').focus(function() {
    $(document).off();
    console.log('qqq');
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
          <img class="logo" src=${node.favicon}></img>
          <div class="text">${node.text}</div>
        </div>
      </a>
    </li>
    `);
    //渲染到新增Card前面
    $('.siteLast')
      .parent()
      .before($li);

    //绑定删除事件
    $li.contextmenu(e => {
      e.stopPropagation(); // 阻止冒泡
      e.preventDefault(); //阻止默认
      siteData.splice(index, 1);
      render();
    });
    //设置图片加载事件
    const $sitebox = $li.children().children();
    const $image = $($sitebox.children().get(0));
    const $text = $($sitebox.children().get(1));
    $image.one('error', () => {
      const $logo = $(`<div class="logo">${node.logo}</div>`);
      $text.before($logo);
      $image.remove();
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
    }
  });
};

//离开保存;
onbeforeunload = () => {
  const data = JSON.stringify(siteData);
  localStorage.setItem('siteData', data);
};

//初始化
init();
