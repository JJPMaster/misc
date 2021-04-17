$.when( mw.loader.using( ['mediawiki.util'] ), $.ready ).done( function() {
  mw.util.addPortletLink(
    'p-personal',
    mw.util.getUrl('Special:MyPage/common.js'),
    'Common.js',
    'pt-pagecuration',
    'View your common.js',
    null,
    '#pt-preferences'
  );
});
$.when( mw.loader.using( ['mediawiki.util'] ), $.ready ).done( function() {
  mw.util.addPortletLink(
    'p-personal',
    mw.util.getUrl('Special:MyPage/sandbox'),
    'Sandbox',
    'pt-pagecuration',
    'View your sandbox',
    null,
    '#pt-preferences'
  );
});
