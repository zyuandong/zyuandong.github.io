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
            `<li class="li-h1">
              <a href="javascript:;" data-href="#title${i}" data-index="${i}">
                ${$(this).text()}
              </a>
            </li>`;
          break;
        case "H2":
          topArr.push($(this).get(0).offsetTop);
          $(this).attr("id", "title" + i);
          html +=
            `<li class="li-h2">
              <a href="javascript:;" data-href="#title${i}" data-index="${i}">
                ${$(this).text()}
              </a>
            </li>`;
          break;
        case "H3":
          topArr.push($(this).get(0).offsetTop);
          $(this).attr("id", "title" + i);
          html +=
            `<li class="li-h3">
              <a href="javascript:;" data-href="#title${i}" data-index="${i}">
                ${$(this).text()}
              </a>
            </li>`;
          break;
        case "H4":
          topArr.push($(this).get(0).offsetTop);
          $(this).attr("id", "title" + i);
          html +=
            `<li class="li-h4">
              <a href="javascript:;" data-href="#title${i}" data-index="${i}">
                ${$(this).text()}
              </a>
            </li>`;
          break;
        case "H5":
          topArr.push($(this).get(0).offsetTop);
          $(this).attr("id", "title" + i);
          html +=
            `<li class="li-h5">
              <a href="javascript:;" data-href="#title${i}" data-index="${i}">
                ${$(this).text()}
              </a>
            </li>`;
          break;
        case "H6":
          topArr.push($(this).get(0).offsetTop);
          $(this).attr("id", "title" + i);
          html +=
            `<li class="li-h6">
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
  .querySelector('#site-container .container')
  .addEventListener('scroll', menuFollowerCallback);
}

// set post menu controller
const setMenuController = () => {
  $(".sidebar-panel-ul li a").click(function (e) {
    // disabled menu scroll follower
    document
    .querySelector('#site-container .container')
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
  $("#site-container .container").scroll(function () {
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
    $("#site-container .container").animate(
      {
        scrollTop: "0"
      },
      700
    );
  });
}

$(function () {
  // switch file category tag
  // $("#aside .guid-item").on("click", function () {
  //   var page = $(this).data("page");
  //   $(this).addClass("active").siblings().removeClass("active");
  //   if (page) {
  //     $("#aside .page-item").hide();
  //     $("#aside")
  //       .find("." + page)
  //       .show()
  //       .not(".articles-all")
  //       .css("display", "flex");
  //   }
  // });

  // get categories-list
  // $(".category-all .category-item").on("click", function () {
  //   var key = $(this).data("category");
  //   $(this).addClass("active").siblings().removeClass("active");
  //   $(".category-box ul").each(function () {
  //     if ($(this).data("cateBox") == key) {
  //       $(this).show().siblings().hide();
  //     }
  //   });
  // });

  // get tags-list
  // $(".tags-all .tags-item").on("click", function () {
  //   var key = $(this).data("tag");
  //   $(this).addClass("active").siblings().removeClass("active");
  //   $(".tags-box ul").each(function () {
  //     if ($(this).data("tagBox") == key) {
  //       $(this).show().siblings().hide();
  //     }
  //   });
  // });

  // click toggle-btn to show or hide aside
  // $("#toggle").on("click", function () {
  //   if ($(this).hasClass("fullscreen")) {
  //     $(this).removeClass("fullscreen");
  //     $("#aside").animate(
  //       {
  //         marginLeft: "0"
  //       },
  //       {
  //         duration: 300,
  //         queue: false,
  //         complete: function () {
  //           $(".contents-box").removeClass("fullscreen");
  //         }
  //       }
  //     );
  //   } else {
  //     $(this).addClass("fullscreen");
  //     $("#aside").animate(
  //       {
  //         marginLeft: "-180px"
  //       },
  //       {
  //         duration: 300,
  //         queue: false,
  //         step: function () {
  //           $(".contents-box").addClass("fullscreen");
  //         }
  //       }
  //     );
  //   }
  // });

  // show or hide sidebar list
  // $("#sidebar-btn").click(function () {
  //   if ($(this).hasClass("show")) {
  //     $(this).removeClass("show");
  //     $("#sidebar-panel")
  //       .animate(
  //         {
  //           right: "-275px"
  //         },
  //         300
  //       )
  //       .dequeue();
  //   } else {
  //     $(this).addClass("show");
  //     $("#sidebar-panel")
  //       .animate(
  //         {
  //           right: "15px"
  //         },
  //         300
  //       )
  //       .dequeue();
  //   }
  // });

  // use jquery-pjax
  // $(document).pjax("[data-pjax] a, a[data-pjax]", "#contents", {
  //   fragment: "#contents",
  //   timeout: 10000
  // });

  // $(document).on({
  //   "pjax:click": function () {
  //     $("#contents").removeClass("fade-in").addClass("fade-out");
  //     NProgress.start();
  //   },
  //   "pjax:start": function () {
  //     $("#contents").css("opacity", 0);
  //   },
  //   "pjax:end": function () {
  //     $("#contents")
  //       .scrollTop(0)
  //       .css("opacity", 1)
  //       .removeClass("fade-out")
  //       .addClass("fade-in");
  //     NProgress.done();
  //     bindActive();
  //     pjaxEnd();
  //   }
  // });

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

  // open page in new tab
  // tagAAttrTarget()

  // code highlight
  // setCodeHighlight()

  // creat post menu
  // createMenu();

  // blog-title category mapping menu
  // imageViewer();

  // $(".blog-title .title-category").click(function () {
  //   var key = $(this).data("cateHref");
  //   $(".category-all .category-item").each(function () {
  //     if ($(this).data("category") == key) {
  //       $(this).addClass("active").siblings().removeClass("active");
  //     }
  //   });
  //   $(".category-box ul").each(function () {
  //     if ($(this).data("cateBox") == key) {
  //       $(this).show().siblings().hide();
  //     }
  //   });
  //   $("#aside .categories")
  //     .addClass("active")
  //     .siblings()
  //     .removeClass("active");
  //   $("#aside .page-item").hide();
  //   $(".category-all").css("display", "flex").show();
  // });

  // blog-title tag mapping menu
  // $(".blog-title .title-tag").click(function () {
  //   var key = $(this).data("tagHref");
  //   $(".tags-all .tags-item").each(function () {
  //     if ($(this).data("tag") == key) {
  //       $(this).addClass("active").siblings().removeClass("active");
  //     }
  //   });
  //   $(".tags-box ul").each(function () {
  //     if ($(this).data("tagBox") == key) {
  //       $(this).show().siblings().hide();
  //     }
  //   });
  //   $("#aside .tags").addClass("active").siblings().removeClass("active");
  //   $("#aside .page-item").hide();
  //   $(".tags-all").css("display", "flex").show();
  // });

  // sidebar-mapping by contents scroll
  // setMenuFollower()

  // focus list active
  // setMenuController()
}

// function bindActive() {
//   $(".x-pjax, .page-next, .page-previous").on("click", function () {
//     var id = $(this).data("id");
//     $_xpjax = $(".x-pjax");
//     $_xpjax.removeClass("active");
//     $_xpjax.each(function () {
//       if ($(this).data("id") == id) {
//         $(this).addClass("active");
//       }
//     });
//   });
// }
