//读取=>解析=>初始化
let siteStr = localStorage.getItem('siteStr');

let siteList = JSON.parse(siteStr) || [
  { href: 'https://bilibili.com', logo: 'B', text: 'Bilibili' }
];

init(siteList);

// removeCard();

function init(initList) {
  //渲染新增Card
  let addStr = `<li name='addCard'>
  <div class="siteContainer siteLast">
    <div class="logo">a</div>
    <div class="text">新增</div>
  </div>
  </li>`;
  $('.siteMain > ul').append(addStr);
  //监听新增Card返回新增对象到siteList
  $('.siteLast').bind('click', function() {
    initList.unshift(addCard());
  });
  //渲染初始列表
  Render(initList);
}
function addCard() {
  const url = prompt('请输入要添加的网址', 'https://');
  let card = {
    href: url,
    logo: url[8],
    text: url.substring(8)
  };
  Render([card]);
  return card;
}
//渲染函数
function Render(cardList) {
  let renderResult = [];
  $.each(cardList, (index, node) => {
    renderResult.unshift(`
    <li>
      <a href=${node.href} >
        <div class="siteContainer" >
          <div class="logo">${node.logo}</div>
          <div class="text">${node.text}</div>
        </div>
      </a>
    </li>
    `);
  });
  //渲染到新增Card前面
  $('.siteLast')
    .parent()
    .before(renderResult);
  //为card绑定移除事件
  $('.siteMain li[name!="addCard"]').contextmenu(removeCard);
}

//删除函数
function removeCard(e) {
  e.preventDefault();
  $(e.target).remove();
}

//离开保存
onbeforeunload = function() {
  let siteStr = JSON.stringify(siteList);
  localStorage.setItem('siteStr', siteStr);
};
