if( !window.cogbotloaded ) (function() {

    $('#cogbot_panel').remove();
    $('body').append('<div id="cogbot_panel"></div>');

    var panel = $("#cogbot_panel");
    var socket = io('http://localhost:3334');

    socket.on('update-view', function (html) {
        var content = $(html);
        $.each($("#cogbot_panel .collapsible"), function(i, el) {
            var display = $(el).css('display')? $(el).css('display') : 'block';
            $($(content).find(".collapsible")[i]).css('display', display);
        });
        panel.empty();
        panel.append(content);
        bindHandlers();
    });

    function fire(code, data) {
        socket.emit("ui-action", { code: code, data: data});
    }

    function bindHandlers() {
        $("#cogbot_panel .checker").unbind('click').on('click', function () {

            if ($(this).hasClass('checked')) {
                $(this).removeClass('checked');
            }
            else {
                $(this).addClass('checked');
            }

            var model = {};
            var value = $(this).hasClass('checked');
            var property = $(this).attr('model');
            if (!property) return;
            setProperty(model, property, value);
            fire('settings', model);
        });

        $("#save-abyss").unbind('click').on('click', function (e) {
            e.preventDefault();
            fire("abyss", {save:{}});
        });

        $("#save-default").unbind('click').on('click', function (e) {
            e.preventDefault();
            fire("strategy", {save: 'default'});
        });

        $("#save-wboss").unbind('click').on('click', function (e) {
            e.preventDefault();
            fire("strategy", {save: 'wboss'});
        });

        $("#save-dung").unbind('click').on('click', function (e) {
            e.preventDefault();
            fire("dungeon", {"save":{}});
        });

        $("#load-default").unbind('click').on('click', function (e) {
            e.preventDefault();
            fire('strategy', {load: 'default'});
        });

        $("#abyss-auto").unbind('click').bind('click', function(e){
            fire('abyss', { auto: $("#abyss-end-room").val() });
        });

        $(".minimize").unbind('click').on('click', function (e) {
            e.preventDefault();
            $(this).parent().siblings('.collapsible').toggle();
        });

        $(".hint").unbind('mouseenter').unbind('mouseleave').hover(function () {
            $('.hint-info[hint=' + $(this).attr('hint') + ']').show();
        }, function () {
            $('.hint-info[hint=' + $(this).attr('hint') + ']').hide();
        });

        $("#purge").unbind('click').bind('click', function(e){
            $(".game_details_outer").remove();
            $(".game_page_wrap").remove();
            $(".footer").remove();
            $(".gamepage_header_outer").remove();
        });

        $("#open").unbind('click').bind('click', function(e){
            fire('settings', { open: {} });
        });
    }

    function setProperty(obj, prop, val) {
        if (_.isString(prop)) prop = prop.split(".");
        if (prop.length > 1) {
            var e = prop.shift();
            if (!obj[e]) obj[e] = {};
            setProperty(obj[e], prop, val);
        } else
            obj[prop[0]] = val;
    }


})();
window.cogbotloaded = true;
