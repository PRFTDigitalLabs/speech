import BaseView from './baseView';

var home = BaseView.extend({

    initialize: function() {
        var self = this;
        self.check = $('check');
        self.input = $('#input');
        self.result = $('#result')
        self.errordiv = $('#error')
        self.word = '';
        self.timer = '';


        self.socket = io('localhost:1337');

        self.socket.on('message', function(msg) {
            console.log(msg);

            var image = JSON.parse(msg).icons;
            var imageUrl;

            console.log(image);
            if (image[0].icon_url) {
                imageUrl = image[0].icon_url
            } else {
                imageUrl = image[0].preview_url
            }
            $('#result').attr('src', imageUrl);
        });

    },

    events: {
        'click #check': 'check',
        'keyup #input': 'keyCheck'
    },
    check: function(){
        var self = this;
        var msg = $('#input').val();
        if (!msg) {
            return;
        }
        console.log(msg)
        self.socket.emit('newTerm', msg);

    },
    keyCheck: function(e) {
        var self = this;
        if(e.keyCode == 13) {
            var msg = $('#input').val();
            if (!msg) {
                return;
            }
            console.log(msg)
            self.socket.emit('newTerm', msg);
        }
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

        var final_transcript = '';
        var recognition;

        if (!('webkitSpeechRecognition' in window)) {
            unsupported();
        } else {

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function linebreak(s) {
  var two_line = /\n\n/g;
  var one_line = /\n/g;
  return s.replace(two_line, '').replace(one_line, '');
}

            recognition = new webkitSpeechRecognition();
            recognition.interimResults = true;
            recognition.continuous = true;
            recognition.onstart = function() {}
            recognition.onresult = function(e) {
                var interim_transcript = '';

                for (var i = e.resultIndex; i < e.results.length; ++i) {
                    if (e.results[i].isFinal) {
                        final_transcript = final_transcript + e.results[i][0].transcript;
                    } else {
                        interim_transcript = interim_transcript + e.results[i][0].transcript;

                        var word = self.$('#words').text().split(' ').pop().trim();
                        console.log(word, word != false)
                        if (word != self.word && word != '' && word != ' ') {
                            console.log('word is not blank')
                            if (self.timer) {
                                clearTimeout(self.timer);
                                console.log('timer cleared', word)
                            }
                            self.timer = setTimeout(
                                function(){
                                    self.word = word;
                                    console.log('timer expired', word)
                                    self.socket.emit('newTerm', word.trim());
                                    self.timer = '';
                                }, 400);
                        }
                    }
                }
                final_transcript = capitalize(final_transcript);
                self.$('#final_span').empty().html(linebreak(final_transcript));
                self.$('#interim_span').empty().html(linebreak(interim_transcript));

            };
        }
        recognition.onerror = function(e) {}

        final_transcript = '';
        //recognition.lang = select_dialect.value;
        recognition.start();

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