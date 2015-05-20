function Main() {
  this.stage = new PIXI.Stage(0x66FF99);
  this.renderer = new PIXI.autoDetectRenderer(
    768,
    480
  );
   document.body.appendChild(this.renderer.view);
  this.loadSpriteSheet();
  return this;
};

Main.prototype.loadSpriteSheet = function() {
  var assetsToLoad = ["localAssets/spritesheet.json", "localAssets/spritesheet.png"];
  loader = new PIXI.AssetLoader(assetsToLoad);
  loader.onComplete = this.spriteSheetLoaded.bind(this);
  loader.load();
};

var _q= 0;

Main.prototype.update = function() {
  this.renderer.render(this.stage);
  requestAnimFrame(this.update.bind(this));
};

ANIMATIONS = {};

Main.prototype.spriteSheetLoaded = function() {
 // this.scroller = new Scroller(this.stage);


  console.log(ANIMATIONS);

  init();
  requestAnimFrame(this.update.bind(this));

};