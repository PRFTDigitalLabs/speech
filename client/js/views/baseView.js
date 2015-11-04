var baseView = Backbone.View.extend({

    initialize: function() {
        // this.router = new app.Router();
    },

    render: function(options) {

        options = options || {};

        if (options.page === true) {
            this.$el.addClass('page');
        }

        return this;
    },

    transitionIn: function(callback) {

        /*
        var view = this,
            delay

        var transitionIn = function() {
            view.$el.addClass('is-visible');
            view.$el.one('transitionend', function() {
                if (_.isFunction(callback)) {
                    callback();
                }
            })
        };

        _.delay(transitionIn, 20);
        */

        if (_.isFunction(callback)) {
            callback();
        };
    },

    transitionOut: function(callback) {

        if (_.isFunction(callback)) {
            callback();
        };

        /*
        view.$el.removeClass('is-visible');
        view.$el.one('transitionend', function() {
            if (_.isFunction(callback)) {
                callback();
            };
        });
        */
    }
});

export default baseView;