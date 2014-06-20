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
        socket.emit(code, data);
    }

    function bindHandlers() {
        $("#settings .checker").unbind('click').on('click', function () {

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

            fire('save-settings', model);
        });

        $("#save a").unbind('click').on('click', function (e) {
            e.preventDefault();
            fire('save-strategy', $(this).attr('model'));
        });

        $("#load a").unbind('click').on('click', function (e) {
            e.preventDefault();
            fire('hotfix', $(this).attr('model'));
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
