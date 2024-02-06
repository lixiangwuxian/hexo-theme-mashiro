(function ($) {
  // Caption
  $(".article-entry, .article-inner").each(function (i) {
    $(this)
      .find("img")
      .each(function () {
        if ($(this).parent().hasClass("fancybox") || $(this).parent().is("a"))
          return;

        var alt = this.alt;

        if (alt) $(this).after('<span class="caption">' + alt + "</span>");

        $(this).wrap(
          '<a class="fancybox" href="' +
            this.src +
            '" data-fancybox="gallery" data-caption="' +
            alt +
            '"></a>'
        );
      });

    $(this)
      .find(".fancybox")
      .each(function () {
        $(this).attr("rel", "article" + i);
      });
  });

  if ($.fancybox) {
    $(".fancybox").fancybox();
  }
  // Mobile nav
  var $container = $("#container"),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function () {
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function () {
    setTimeout(function () {
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  };

  var nav = document.getElementById("main-nav-toggle");
  nav.onclick = function () {
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    $container.toggleClass("mobile-nav-on");
    stopMobileNavAnim();
  };

  var wrap = document.getElementById("wrap");
  wrap.onclick = function () {
    if (isMobileNavAnim || !$container.hasClass("mobile-nav-on")) return;

    $container.removeClass("mobile-nav-on");
  };

  // 多语言文本资源
  const i18nTexts = {
    en: {
      copy: "Copy",
      copied: "Copied!",
    },
    zh: {
      copy: "复制",
      copied: "已复制!",
    },
    // 可以根据需要添加更多语言
  };

  // 检测用户语言
  let userLang = navigator.language || navigator.userLanguage;
  userLang = userLang.split("-")[0]; // 提取语言代码
  if (!i18nTexts[userLang]) {
    userLang = "en"; // 默认回退到英语
  }

  // 页面加载完成后，添加复制按钮
  document.addEventListener("DOMContentLoaded", () => {
    const codes = document.querySelectorAll(".code");
    codes.forEach((code) => {
      const copyButton = document.createElement("div");
      copyButton.className = "copy-button";
      copyButton.textContent = i18nTexts[userLang].copy; // 根据用户语言设置文本
      code.parentNode.insertBefore(copyButton, code);
    });

    // 初始化ClipboardJS并设置成功复制的回调
    const clipboard = new ClipboardJS(".copy-button", {
      target: (trigger) => trigger.nextElementSibling,
    }).on("success", (e) => {
      e.clearSelection();
      e.trigger.textContent = i18nTexts[userLang].copied; // 显示复制成功的文本
      setTimeout(
        () => (e.trigger.textContent = i18nTexts[userLang].copy),
        2000
      ); // 2秒后恢复原始文本
    });
  });
})(jQuery);
