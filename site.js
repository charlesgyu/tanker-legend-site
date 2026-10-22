// 언어 고르기: 주소의 ?lang= → 전에 고른 언어 → 기기 언어 → 한국어
(function () {
  var LANGS = ['ko', 'en', 'ja', 'es', 'ar'];
  var KEY = 'tanker-site-lang';
  function pick() {
    var q = (location.search.match(/[?&]lang=([a-z]{2})/) || [])[1];
    if (LANGS.indexOf(q) >= 0) return q;
    try { var s = localStorage.getItem(KEY); if (LANGS.indexOf(s) >= 0) return s; } catch (e) { /* 저장소 없음 */ }
    var langs = navigator.languages || [navigator.language || ''];
    for (var i = 0; i < langs.length; i++) {
      var l = String(langs[i]).slice(0, 2).toLowerCase();
      if (LANGS.indexOf(l) >= 0) return l;
    }
    return 'ko';
  }
  function apply(l) {
    var html = document.documentElement;
    html.lang = l;
    html.dir = l === 'ar' ? 'rtl' : 'ltr';
    var t = document.querySelector('title[data-' + l + ']');
    if (t) document.title = t.getAttribute('data-' + l);
    var btns = document.querySelectorAll('.langs button');
    for (var i = 0; i < btns.length; i++) btns[i].setAttribute('aria-pressed', btns[i].getAttribute('data-set') === l ? 'true' : 'false');
    var links = document.querySelectorAll('a[data-keep-lang]');
    for (var j = 0; j < links.length; j++) links[j].href = links[j].getAttribute('href').split('?')[0] + '?lang=' + l;
  }
  apply(pick());
  document.addEventListener('DOMContentLoaded', function () {
    apply(document.documentElement.lang);
    var btns = document.querySelectorAll('.langs button');
    for (var i = 0; i < btns.length; i++) btns[i].addEventListener('click', function () {
      var l = this.getAttribute('data-set');
      try { localStorage.setItem(KEY, l); } catch (e) { /* 무시 */ }
      apply(l);
    });
  });
})();
