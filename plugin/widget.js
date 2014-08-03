if (!window.cogbotloaded) (function () {

    $('#cogbot_panel').remove();
    $('body').append('<div id="cogbot_panel"><div>CogBot server is not available at localhost:3333</div></div>');

    var panel = $("#cogbot_panel");
    var socket = io('http://localhost:3334');

    socket.on('connection', function (socket) {
        socket.on('disconnect', function () {
        });
    });

    socket.on('update-view', function (html) {
        var content = $(html);
        $.each($("#cogbot_panel .collapsible"), function (i, el) {
            var display = $(el).css('display') ? $(el).css('display') : 'block';
            $($(content).find(".collapsible")[i]).css('display', display);
        });

         panel.empty();
         panel.append(content);

        /*
        function update(oldContent, content) {
            content = _.filter($(content), function(el){ return el.nodeName != '#text' })

            if ($(oldContent).children().length != $(content).length) {
                $(oldContent).empty();
                $(oldContent).append(content);
            } else {

                $(oldContent).children().each(function (i, elem) {
                    if ($(content[i]).html() != $(elem).html()) {
                        $(elem).html($(content[i]).html());
                    } else {
                        update(elem, content[i]);
                    }
                });
            }
        }

        update(panel.children()[0], content);
        */
        bindHandlers();
    });

    socket.on('loguser', function (user) {
        $.ajax("http://www.kongregate.com/session", {
            method: 'DELETE'
        }).done(function (request) {

            $.ajax("https://www.kongregate.com/session ", {
                method: 'POST',
                data: {
                    utf8: true,
                    authenticity_token: $('meta[name=csrf-token]').attr('content'),
                    game_id: 117070,
                    from_welcome_box: true,
                    username: user.name,
                    password: user.pwd,
                    remember_me: true
                }
            }).done(function (rs) {
                document.location.reload();
            });
        });
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

        $("[fire]").unbind('click').on('click', function (e) {
            e.preventDefault();
            var code = $(this).attr('fire');
            var args;
            eval('args = ' + $(this).attr('args'));
            fire(code, args);
        });

        $("#abyss-auto").unbind('click').bind('click', function (e) {
            e.preventDefault();
            fire('abyss', { auto: $("#abyss-end-room").val() });
        });

        $("#next-alt").unbind('click').bind('click', function (e) {
            e.preventDefault();
            fire('alts', { change: 'next' });
        });

        $("#prev-alt").unbind('click').bind('click', function (e) {
            e.preventDefault();
            fire('alts', { change: 'prev' });
        });

        $(".minimize").unbind('click').on('click', function (e) {
            e.preventDefault();
            $(this).parent().siblings('.collapsible').toggle();
        });

        $(".hint").unbind('mouseenter').unbind('mouseleave').hover(function (e) {
            e.preventDefault();
            $('.hint-info[hint=' + $(this).attr('hint') + ']').show();
        }, function (e) {
            e.preventDefault();
            $('.hint-info[hint=' + $(this).attr('hint') + ']').hide();
        });

        $("#purge").unbind('click').bind('click', function (e) {
            e.preventDefault();
            $(".game_details_outer").remove();
            $(".game_page_wrap").remove();
            $(".footer").remove();
            $(".gamepage_header_outer").remove();
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


    var wait = setInterval(function() {
        var iframe = $('iframe#gameiframe');
        if( iframe.length!=0 ) {

            var innerframe = $('iframe#content', iframe.contents());
            if( innerframe.length!=0 ) {
                var enterButton = $('ol li a', innerframe.contents());
                if (enterButton.length != 0) {
                    clearInterval(wait);
                    var url = $(enterButton[enterButton.length - 1]).attr("href");
                    innerframe.attr("src", url);
                    innerframe = $('iframe#content', iframe.contents());
                    setTimeout(function() {
                        fire('fullauto', { loaded: true });
                    }, 1000);

                }
            }
        }
    }, 100);

})();
window.cogbotloaded = true;
