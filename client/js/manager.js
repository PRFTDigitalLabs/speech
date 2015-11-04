import BaseView from './views/baseView';

var manager = Backbone.View.extend({

    el: 'main',

    initialize: function() {

    },

    goto: function(view) {

        var previous = this.currentPage || null;
        var self = this;
        var next = view;

        if (previous) {
            previous.transitionOut(function() {

                previous.remove();

                self.$el.append(next.$el);
                next.render({
                    page: true
                });

                next.transitionIn();
                self.currentPage = next;
            });

        } else {

            next.render();
            this.$el.append(next.$el);
            next.transitionIn();
            self.currentPage = next;
        }

        Backbone.trigger('manager:goto', view);
    }
});

export default manager;