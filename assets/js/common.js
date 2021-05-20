let html = "", topArr = [];

// creat post menu
const createMenu = () => {
  $("#post-menu .pin").css("top", "16rem");
  $("#post .post-content")
    .find("h1,h2,h3,h4,h5,h6")
    .each(function (i) {
      switch (this.tagName) {
        case "H1":
          topArr.push($(this).get(0).offsetTop);
          $(this).attr("id", "title" + i);
          html +=
            `<li class="li-h1" title="${$(this).text()}">
              <a href="javascript:;" data-href="#title${i}" data-index="${i}">
                ${$(this).text()}
              </a>
            </li>`;
          break;
        case "H2":
          topArr.push($(this).get(0).offsetTop);
          $(this).attr("id", "title" + i);
          html +=
            `<li class="li-h2" title="${$(this).text()}">
              <a href="javascript:;" data-href="#title${i}" data-index="${i}">
                ${$(this).text()}
              </a>
            </li>`;
          break;
        case "H3":
          topArr.push($(this).get(0).offsetTop);
          $(this).attr("id", "title" + i);
          html +=
            `<li class="li-h3" title="${$(this).text()}">
              <a href="javascript:;" data-href="#title${i}" data-index="${i}">
                ${$(this).text()}
              </a>
            </li>`;
          break;
        case "H4":
          topArr.push($(this).get(0).offsetTop);
          $(this).attr("id", "title" + i);
          html +=
            `<li class="li-h4" title="${$(this).text()}">
              <a href="javascript:;" data-href="#title${i}" data-index="${i}">
                ${$(this).text()}
              </a>
            </li>`;
          break;
        case "H5":
          topArr.push($(this).get(0).offsetTop);
          $(this).attr("id", "title" + i);
          html +=
            `<li class="li-h5" title="${$(this).text()}">
              <a href="javascript:;" data-href="#title${i}" data-index="${i}">
                ${$(this).text()}
              </a>
            </li>`;
          break;
        case "H6":
          topArr.push($(this).get(0).offsetTop);
          $(this).attr("id", "title" + i);
          html +=
            `<li class="li-h6" title="${$(this).text()}">
              <a href="javascript:;" data-href="#title${i}" data-index="${i}">
                ${$(this).text()}
              </a>
            </li>`;
          break;
      }
    });
  if (html.length) {
    $("#post-menu .sidebar-panel-ul").html(html);
    // $("#sidebar-btn, #sidebar-panel").show();
    $("#post-menu").parent().show();
  } else {
    $("#post-menu .sidebar-panel-ul").html("");
    // $("#sidebar-btn, #sidebar-panel").hide();
    $("#post-menu").parent().hide();
  }
}

// tag a add target="_blank"
const tagAAttrTarget = () => {
  $('a[href^="http"]').each(function () {
    $(this).attr("target", "_blank");
  });
}

// code highlight
const setCodeHighlight = () => {
  $("pre code").each(function (i, block) {
    hljs.highlightBlock(block);
  });
}

// set image viewer
const imageViewer = () => {
  $("#contents img").click(function () {
    var img = new Image();
    img.src = $(this).attr("src");
    $("#mask-layer").show();
    $("#mask-layer .mask-layer-img").html(img);
  });
}

// close image viewer
const closeImageViewer = () => {
  $(".mask-layer-btn").click(function () {
    $("#mask-layer").hide().find(".mask-layer-img").html("");
  });
}

// set post menu scroll follower
const POST_MENU_P_T = 16;
const POST_MENU_LI_H = 21;
const menuFollowerCallback = (e) => {
  const scrollTop = e.target.scrollTop;

  for (var i = topArr.length - 1; i >= 0; i--) {
    if (scrollTop >= topArr[i]) {
      $(".pin").css("top", i * POST_MENU_LI_H + POST_MENU_P_T + "rem");
      $('.sidebar-panel-ul').children().eq(i).addClass('is-active').siblings().removeClass('is-active');
      break;
    }
  }
}
const setMenuFollower = () => {
  document
  .querySelector('#site-scroll')
  .addEventListener('scroll', menuFollowerCallback);
}

// set post menu controller
const setMenuController = () => {
  $(".sidebar-panel-ul li a").click(function (e) {
    // disabled menu scroll follower
    document
    .querySelector('#site-scroll')
    .removeEventListener('scroll', menuFollowerCallback);

    const menuFollowerPromise = () => {
      return new Promise((resolve, reject) => {
        const self = $(this);
        const index = self.data("index");
        $(".pin").css("top", index * POST_MENU_LI_H + POST_MENU_P_T + "rem");
  
        self.parent().addClass('is-active').siblings().removeClass('is-active');
  
        const $post = document.querySelector(`#post .post-content ${self.data('href')}`);
        $post.scrollIntoView({
          behavior: 'smooth'
        });
        setTimeout(() => resolve(true), 750);
      })
    }

    // enabled menu scroll follower
    menuFollowerPromise().then(() => {
      setMenuFollower()
    })

  });
}

// show back2top btn
const showBack2topBtn = () => {
  $("#site-scroll").scroll(function () {
    var t = $(this).scrollTop();
    if (t >= 300) {
      if (!$("#back2top").is(":visible")) {
        $("#back2top").show();
      }
    } else {
      $("#back2top").hide();
    }
  });
}

// back2top controller
const setBack2topController = () => {
  $("#back2top").click(function () {
    $("#site-scroll").animate(
      {
        scrollTop: "0"
      },
      700
    );
  });
}

$(function () {

  // bindActive();
  // pjaxEnd();
  createMenu();
  tagAAttrTarget();
  setCodeHighlight();

  imageViewer();
  closeImageViewer();

  setMenuFollower();
  setMenuController();

  showBack2topBtn();
  setBack2topController();
});

function pjaxEnd() {
  // menu automatic hide in mobile
  if ($(window).width() <= 640) {
    $("#aside")
      .animate(
        {
          marginLeft: "-180px"
        },
        500
      )
      .dequeue();
    $("#toggle").addClass("fullscreen");
  }

  if ($("#toggle").hasClass("fullscreen")) {
    $(".contents-box").addClass("fullscreen");
  } else {
    $(".contents-box").removeClass("fullscreen");
  }
}

