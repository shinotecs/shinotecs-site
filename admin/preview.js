/* 編集画面の「プレビュー」: 入力内容を、実際のホームページと同じ見た目で右側に表示する。
   _includes/sections/*.html と同じ構造で組み立てる（見た目の確認専用。公開ページには影響しない）。 */
(function (root) {
  var esc = function (s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };
  var br = function (s) { return esc(s).replace(/\n/g, '<br>'); };
  var DEF_G = { tel: '', fax: '', email: '', postal: '', address: '', building: '', weekday_label: '平日', open: '', close: '', hours_text: '', holiday_note: '' };
  var hours = function (g) { return esc(g.hours_text); };
  var arr = function (x) { return Array.isArray(x) ? x : []; };

  var B = {};
  B.hero = function (d, g, img) {
    return '<section class="hero" id="top"><div class="container hero-grid"><div class="hero-text">' +
      '<span class="eyebrow">' + esc(d.eyebrow) + '</span>' +
      '<h1>' + esc(d.title_line1) + '<br><span class="accent">' + esc(d.title_accent) + '</span></h1>' +
      '<p class="lead">' + br(d.lead) + '</p>' +
      '<div class="hero-ctas"><a class="btn btn-primary">' + esc(d.cta1_label) + ' <span class="arrow">→</span></a>' +
      '<a class="btn btn-secondary">' + esc(d.cta2_label) + '</a></div></div>' +
      '<div class="hero-visual"><img src="' + esc(img(d.image)) + '" alt="" style="aspect-ratio: 4/5; object-fit: cover; width: 100%; border-radius: 4px;"></div></div></section>';
  };
  B.services = function (d, g, img) {
    var cards = arr(d.cards).map(function (c) {
      return '<article class="service-card reveal"><img src="' + esc(img(c.image)) + '" alt="" style="aspect-ratio: 16/10; object-fit: cover; width: 100%; margin-bottom: 32px; border-radius: 4px;">' +
        '<p class="service-num">' + esc(c.num) + '</p><h3>' + esc(c.title) + '</h3><p class="desc">' + esc(c.desc) + '</p>' +
        '<div class="service-card-cta"><a class="service-card-link">' + esc(c.link_label) + ' <span class="arrow">→</span></a></div>' +
        '<div class="service-meta"><span class="service-meta-label">' + br(c.meta_label) + '</span><span class="service-meta-num">' + esc(c.meta_num) + '</span></div></article>';
    }).join('');
    return '<section class="section services" id="services"><div class="container"><div class="section-head reveal">' +
      '<span class="eyebrow">' + esc(d.eyebrow) + '</span><h2>' + br(d.title) + '</h2><p>' + esc(d.lead) + '</p></div>' +
      '<div class="service-grid">' + cards + '</div></div></section>';
  };
  B.recruit = function (d, g, img) {
    var pts = arr(d.points).map(function (p, i) { return '<div class="point-item"><span class="point-num">' + (i < 9 ? '0' : '') + (i + 1) + '</span><strong>' + esc(p.title) + '</strong><p>' + esc(p.text) + '</p></div>'; }).join('');
    var roles = arr(d.roles).map(function (r, i) { return '<div class="role-item"><span class="role-item-num">Role ' + (i < 9 ? '0' : '') + (i + 1) + '</span><strong>' + br(r.name) + '</strong><p>' + esc(r.desc) + '</p><span class="role-status">' + esc(r.status) + '</span></div>'; }).join('');
    var meta = arr(d.meta).map(function (m) { return '<div class="recruit-meta-item">' + esc(m.label) + '<strong>' + esc(m.value) + '</strong></div>'; }).join('');
    return '<section class="section recruit" id="recruit"><div class="container"><div class="recruit-grid">' +
      '<div class="recruit-text reveal visible"><span class="eyebrow">' + esc(d.eyebrow) + '</span><h2>' + br(d.title) + '</h2><p class="lead">' + esc(d.lead) + '</p>' +
      '<div class="hero-ctas"><a class="btn btn-primary">' + esc(d.cta1_label) + '<span class="arrow">→</span></a><a class="btn btn-secondary">' + esc(d.cta2_label) + '</a></div></div>' +
      '<div class="recruit-visual reveal visible"><img src="' + esc(img(d.image)) + '" alt="" style="aspect-ratio: 4/3; object-fit: cover; width: 100%; border-radius: 4px;"></div></div>' +
      '<div class="recruit-block reveal visible"><h3 class="recruit-h3">' + esc(d.points_title) + '</h3><div class="recruit-points">' + pts + '</div></div>' +
      '<div class="recruit-block reveal visible"><h3 class="recruit-h3">' + esc(d.roles_title) + '</h3><div class="recruit-roles">' + roles + '</div></div>' +
      '<div class="recruit-block reveal visible"><h3 class="recruit-h3">' + esc(d.meta_title) + '</h3><div class="recruit-meta">' + meta + '</div><p class="recruit-note">' + esc(d.meta_note) + '</p></div>' +
      '</div></section>';
  };
  B.access = function (d, g) {
    return '<section class="section access" id="access"><div class="container"><div class="section-head reveal"><span class="eyebrow">' + esc(d.eyebrow) + '</span><h2>' + esc(d.title) + '</h2><p>' + esc(d.lead) + '</p></div>' +
      '<div class="access-grid"><div class="access-map reveal"><iframe src="' + esc(d.map_src) + '" loading="lazy" title="map"></iframe></div>' +
      '<ul class="access-info-list reveal"><li><span class="label">Address</span><span class="value"><strong>' + esc(d.company_name) + '</strong>〒' + esc(g.postal) + '<br>' + esc(g.address) + '<br>' + esc(g.building) + '</span></li>' +
      '<li><span class="label">Contact</span><span class="value"><strong>TEL ' + esc(g.tel) + '</strong>FAX ' + esc(g.fax) + '<br>' + esc(g.email) + '</span></li>' +
      '<li><span class="label">Hours</span><span class="value"><strong>' + hours(g) + '</strong>' + esc(g.holiday_note) + '</span></li></ul></div></div></section>';
  };
  B.contact = function (d, g) {
    return '<section class="section contact" id="contact"><div class="container"><div class="contact-grid"><div class="section-head reveal" style="margin-bottom: 0;"><span class="eyebrow">' + esc(d.eyebrow) + '</span><h2>' + br(d.title) + '</h2><p>' + esc(d.lead) + '</p></div>' +
      '<div class="contact-cards reveal">' +
      '<div class="contact-card"><p class="contact-card-label">Tel</p><p class="contact-card-value">' + esc(g.tel) + '</p><p class="contact-card-note">' + esc(d.tel_note_prefix) + hours(g) + '</p></div>' +
      '<div class="contact-card"><p class="contact-card-label">Fax</p><p class="contact-card-value">' + esc(g.fax) + '</p><p class="contact-card-note">' + esc(d.fax_note) + '</p></div>' +
      '<div class="contact-card"><p class="contact-card-label">E-mail</p><p class="contact-card-value contact-card-value--email">' + esc(g.email) + '</p><p class="contact-card-note">' + esc(d.email_note) + '</p></div>' +
      '<div class="contact-hours"><div><p class="contact-hours-label">' + esc(d.hours_label) + '</p><p class="contact-hours-value">' + hours(g) + ' ' + esc(d.hours_suffix) + '</p></div>' +
      '<a class="btn btn-primary">' + esc(d.call_label) + ' <span class="arrow">→</span></a></div></div></div></div></section>';
  };
  B.company = function (d, g) {
    var addr = g.address + ' ' + g.building;
    var rows = arr(d.rows).map(function (r) {
      var v = br(r.value).split('[[').join('<span class="value-num">').split(']]').join('</span>')
        .split('@@TEL@@').join(esc(g.tel)).split('@@FAX@@').join(esc(g.fax)).split('@@EMAIL@@').join(esc(g.email))
        .split('@@POSTAL@@').join(esc(g.postal)).split('@@ADDRESS@@').join(esc(addr));
      return '<li><span class="label">' + esc(r.label) + '</span><span class="value">' + v + '</span></li>';
    }).join('');
    return '<section class="section company" id="company"><div class="container company-grid"><div class="reveal"><span class="eyebrow">' + esc(d.eyebrow) + '</span><h2>' + esc(d.title) + '</h2><p class="company-mission">' + br(d.mission) + '</p></div>' +
      '<ul class="company-info-list reveal">' + rows + '</ul></div></section>';
  };
  B.footer = function (d, g) {
    var links = arr(d.links).map(function (l) { return '<li><a>' + esc(l.label) + '</a></li>'; }).join('');
    var lic = arr(d.licenses).map(function (l) { return '<li>' + esc(l.text) + '<span class="small">' + esc(l.num) + '</span></li>'; }).join('');
    return '<footer role="contentinfo"><div class="container"><div class="footer-grid"><div class="footer-brand"><a class="logo"><img src="/02_symbol_white.svg" alt="" class="logo-symbol"><span class="logo-text">SHINOTECS<small>Care &amp; Support</small></span></a><p>' + esc(d.brand_text) + '</p></div>' +
      '<div class="footer-col"><h5>Site</h5><ul>' + links + '</ul></div>' +
      '<div class="footer-col"><h5>Contact</h5><ul><li>〒' + esc(g.postal) + '<br>' + esc(g.address) + '<br>' + esc(g.building) + '</li><li>TEL <span class="small">' + esc(g.tel) + '</span></li><li>FAX <span class="small">' + esc(g.fax) + '</span></li><li><span class="small">' + esc(g.email) + '</span></li></ul></div>' +
      '<div class="footer-col"><h5>License</h5><ul>' + lic + '</ul></div></div>' +
      '<div class="footer-bottom"><div class="footer-bottom-left"><span>' + esc(d.copyright) + '</span><a class="footer-privacy-link">プライバシーポリシー</a></div><span class="footer-mark">Care &amp; Support</span></div></div></footer>';
  };
  // 共通情報：変更が反映される場所を実物の部品で見せる
  B.global = function (d) {
    var g = Object.assign({}, DEF_G, d);
    var c = { eyebrow: 'Contact', title: '', lead: '', tel_note_prefix: '受付: ', fax_note: '24時間受付', email_note: '24時間受付・順次返信', hours_label: 'Business Hours', hours_suffix: '/ 土日祝休', call_label: 'いますぐ電話する' };
    return '<p style="padding:12px 24px;background:#fff3cd;margin:0">▼ ここで変えた電話・住所・営業時間は、次の場所すべてに反映されます（お問い合わせ／アクセス／フッター／会社情報）</p>' +
      B.contact(c, g) + B.access({ eyebrow: 'Access', title: '事務所へのご来訪', lead: '', map_src: '', company_name: 'シノテクス株式会社' }, g) + B.footer({ links: [], licenses: [], brand_text: '', copyright: '' }, g);
  };
  B.layout = function (d) {
    var names = { hero: 'トップ（キャッチコピー）', services: '事業紹介', recruit: '採用', access: 'アクセス', contact: 'お問い合わせ', company: '会社情報' };
    var secs = arr(d.sections);
    var nav = secs.filter(function (s) { return s.nav_label; }).map(function (s) { return '<li><a>' + esc(s.nav_label) + '</a></li>'; }).join('');
    var order = secs.map(function (s, i) { return '<div style="padding:18px 24px;margin:8px 24px;border:2px solid #9a7b5a;border-radius:8px;background:#fff">' + (i + 1) + '. ' + esc(names[s.section] || s.section) + '</div>'; }).join('');
    return '<header class="site-header"><div class="container nav"><span class="logo-text">SHINOTECS</span><ul class="nav-links">' + nav + '</ul><a class="nav-cta">お問い合わせ</a></div></header>' +
      '<p style="padding:12px 24px;margin:0;color:#555">▼ ページの表示順（上から下）</p>' + order;
  };
  B.meta = function (d) {
    return '<div style="padding:24px;font-family:sans-serif"><p style="color:#555">検索結果での表示イメージ</p>' +
      '<div style="background:#fff;border:1px solid #ddd;padding:16px;border-radius:8px"><div style="color:#1a0dab;font-size:20px">' + esc(d.title) + '</div><div style="color:#006621">https://www.shinotecs.com/</div><div style="color:#545454">' + esc(d.description) + '</div></div>' +
      '<p style="color:#555;margin-top:24px">SNSで共有したときの説明文</p><div style="background:#fff;border:1px solid #ddd;padding:16px;border-radius:8px">' + esc(d.og_description) + '</div></div>';
  };
  root.PreviewBuilders = B;

  // ---- CMS への登録（ブラウザのみ） ----
  if (typeof root.CMS === 'undefined' || !root.CMS.React) return;
  var R = root.CMS.React, h = R.createElement;
  var toJS = function (x) { return x && x.toJS ? x.toJS() : (x || {}); };
  var makeTemplate = function (key) {
    return function (props) {
      var d = toJS(props.entry.get('data'));
      var gs = R.useState(DEF_G), g = gs[0], setG = gs[1];
      R.useEffect(function () {
        if (key === 'global' || ['hero', 'services', 'recruit', 'layout', 'meta'].indexOf(key) >= 0) return;
        props.getCollection('pages', 'global').then(function (e) { setG(Object.assign({}, DEF_G, toJS(e.get('data')))); }).catch(function () {});
      }, []);
      var img = function (p) { try { var a = props.getAsset(p); return (a && a.url) || p; } catch (e) { return p; } };
      var html = B[key](d, key === 'global' ? d : g, img);
      var wrap = key === 'footer' ? html : html;
      return h('div', { className: 'preview-wrap', dangerouslySetInnerHTML: { __html: wrap } });
    };
  };
  ['hero', 'services', 'recruit', 'access', 'contact', 'company', 'footer', 'global', 'layout', 'meta'].forEach(function (k) {
    root.CMS.registerPreviewTemplate(k, makeTemplate(k));
  });
  root.CMS.registerPreviewStyle('https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@400;500;600&family=Noto+Sans+JP:wght@300;400;500;700&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&display=swap', { raw: false });
  root.CMS.registerPreviewStyle('/style.css');
  root.CMS.registerPreviewStyle('.reveal{opacity:1!important;transform:none!important}.preview-wrap{background:#FAF7F2}.hero{padding-top:40px}', { raw: true });
})(typeof window !== 'undefined' ? window : globalThis);
