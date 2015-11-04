import BaseView from './baseView';

var home = BaseView.extend({

    initialize: function() {
        var self = this;
        self.check = $('check');
        self.input = $('#input');
        self.result = $('#result')
        self.errordiv = $('#error')
        


        self.socket = io('/client');

        self.socket.on('message', function(msg) {
            console.log(msg);
        });

    },

    events: {
        'click #check': 'check'
    },
    check: function(){
        var self = this;
            var msg = self.input.val();
            if (!msg) {
                return;
            }

            self.socket.emit('newTerm', msg);

    },
    render: function() {

        var self = this;
        var template = JST['home.hbs'](self);
        self.$el.html(template);

        // if browser doesn't support WebSocket, just show some notification and exit
        if (!window.WebSocket) {
            content.html($('<p>', { text: 'Sorry, but your browser doesn\'t '
                                        + 'support WebSockets.'} ));
            input.hide();
            $('span').hide();
        }

        return this;
    },

    transitionIn: function(callback) {

        TweenLite.fromTo(this.$('h1'), .5, {
            x: -100,
            autoAlpha: 0
        }, {
            x: 0,
            autoAlpha: 1,
            ease: 'easeOutExpo'
        });

        if (_.isFunction(callback)) {
            callback();
        };

    },

    transitionOut: function(callback) {

        var self = this;

        TweenLite.to(this.$('h1'), .5, {
            x: 100,
            autoAlpha: 0,
            ease: 'easeInExpo',
            onComplete: function() {
                if (_.isFunction(callback)) {
                    callback();
                };

            }
        });
    },

    hide: function() {
        this.$el.hide();
    },

    show: function() {
        this.$el.show();
    }

});

export default home;