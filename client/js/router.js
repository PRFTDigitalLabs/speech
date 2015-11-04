import Nav from './views/nav';
import Home from './views/home';
import Two from './views/two';
import Three from './views/three';


var ApplicationRouter = Backbone.Router.extend({

    routes: {
    	'home': 'home',
        'two': 'two',
        'three': 'three',
        '*actions': 'home' // Backbone will try to match the route above first
    },

    initialize: function() {
        var self = this;

        this.nav = new Nav();

        Backbone.on('manager:goto', function(view) {
            self.nav.update();
        });
    },

    home: function() {

        var view = new Home({
            tagName:'section',
            id: 'home'
        });
        app.manager.goto(view);
    },

    two: function() {

        var view = new Two({
            tagName:'section',
            id: 'two'
        });
        app.manager.goto(view);
    },

    three: function() {

        var view = new Three({
            tagName:'section',
            id: 'three'
        });
        app.manager.goto(view);
    },
});

export default ApplicationRouter;