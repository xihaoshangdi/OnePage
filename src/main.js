//获取站点数据对象
const siteData = JSON.parse(localStorage.getItem('siteData')) || [
  { href: 'https://bilibili.com', logo: 'B', text: 'Bilibili' }
];

const init = () => {
  //渲染初始列表
  render(siteData);
  //设置监听
  $('.siteLast').bind('click', addCard);
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
          <div class="logo">${node.logo}</div>
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
  });
};

const addCard = () => {
  const url = prompt('请输入要添加的网址', 'https://');
  const pattern = /(http|https):\/\/(www.)?(\w+(\.)?)+/;
  let realUrl = url.match(pattern)[0];
  let text = realUrl.replace(/(http|https):\/\/(www.)?/, '');
  let card = {
    href: realUrl,
    logo: text[0],
    text: text
  };
  siteData.unshift(card);
  render();
};

//离开保存;
onbeforeunload = () => {
  const data = JSON.stringify(siteData);
  console.log(data);
  localStorage.setItem('siteData', data);
};

//初始化
init();
