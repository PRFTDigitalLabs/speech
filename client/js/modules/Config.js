function Config() {

    this.init();
    return this;
}

_.extend(Config.prototype, {

    SiteName: "exodus",

    init: function() {
      
    }
});

var config = new Config();
export default config;