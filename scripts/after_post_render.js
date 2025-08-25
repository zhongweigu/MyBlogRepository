'use strict';
var cheerio = require('cheerio');

hexo.extend.filter.register('after_post_render', function (data) {
    var config = hexo.config;
    if (config.post_asset_folder) {
        // 直接取 pathname，而不是手动 substring
        var urlObj = new URL(data.permalink);
        var link = urlObj.pathname;

        // 保证以 / 结尾
        if (!link.endsWith('/')) {
            if (link.endsWith('index.html')) {
                link = link.replace('index.html', 'index/');
            } else {
                link = link.substring(0, link.lastIndexOf('.')) + '/';
            }
        }

        // ---- 处理 front-matter 的 cover ----
        if (data.cover && !/^https?:\/\//.test(data.cover)) {
            var src = data.cover.replace(/\\/g, '/');
            var srcArray = src.split('/').filter(e => e && e !== '.');
            if (srcArray.length > 1) srcArray.shift();
            src = srcArray.join('/');
            data.cover = (config.root + link + src).replace(/\/{2,}/g, '/');
            console.info("update cover as --> " + data.cover);
        }

        // ---- 处理正文里的图片 ----
        var toprocess = ['excerpt', 'more', 'content'];
        for (var i = 0; i < toprocess.length; i++) {
            var key = toprocess[i];

            var $ = cheerio.load(data[key] || '', {
                ignoreWhitespace: false,
                xmlMode: false,
                lowerCaseTags: false,
                decodeEntities: false
            });

            $('img').each(function () {
                if ($(this).attr('src')) {
                    var src = $(this).attr('src').replace(/\\/g, '/');
                    if (!(/http[s]*.*|\/\/.*/.test(src)
                        || /^\s*\//.test(src)
                        || /^\s*\/uploads|images\//.test(src))) {

                        var srcArray = src.split('/').filter(e => e && e !== '.');
                        if (srcArray.length > 1) srcArray.shift();
                        src = srcArray.join('/');

                        $(this).attr('src', (config.root + link + src).replace(/\/{2,}/g, '/'));
                        console.info("update img as --> " + (config.root + link + src).replace(/\/{2,}/g, '/'));
                    }
                } else {
                    console.info("no src attr, skipped...");
                    console.info($(this));
                }
            });

            data[key] = $.html();
        }
    }
});
