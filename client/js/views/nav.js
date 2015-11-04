var nav = Backbone.View.extend({

    el: 'nav',

    initialize: function() {
        return this.render();
    },

    events: {
        'click .item': 'navigate'
    },

    render: function() {
        var template = JST['nav.hbs'];
        this.$el.html(template);
        this.links = this.$('.item');
    },

    navigate: function(e) {

        var link = $(e.currentTarget);
        var to = link.data('id');

        if (to) {
            this.links.removeClass('active');
            link.addClass('active');
            app.router.navigate(to, {trigger: true});
        }

    },

    update: function() {
        var fragment = Backbone.history.fragment,
            active = this.$el.find('.active'),
            attr = '[href="/' + fragment + '"]',
            link = this.$el.find(attr).parent();
        if (active) {
            active.removeClass('active');
        }
        link.addClass('active');
    }
});

export default nav;