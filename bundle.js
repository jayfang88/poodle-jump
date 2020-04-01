/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Game; });
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./platform */ "./lib/platform.js");
/* harmony import */ var _poodle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./poodle */ "./lib/poodle.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Game = /*#__PURE__*/function () {
  function Game(canvas, difficulty) {
    _classCallCheck(this, Game);

    this.ctx = canvas.getContext('2d');
    this.dimensions = {
      width: canvas.width,
      height: canvas.height
    };
    this.difficulty = difficulty;
    this.gameOver = false;
    this.score = 0;
    this.platforms = [];
    this.poodle = new _poodle__WEBPACK_IMPORTED_MODULE_1__["default"](this.dimensions, this.difficulty);

    switch (difficulty) {
      case 'easy':
        this.num_platforms = 20;
        break;

      case 'insane':
        this.num_platforms = 20;
        break;

      default:
        this.num_platforms = 15;
    }

    this.addPlatforms();
  }

  _createClass(Game, [{
    key: "addPlatforms",
    value: function addPlatforms() {
      for (var i = 0; i < this.num_platforms; i++) {
        this.platforms.push(new _platform__WEBPACK_IMPORTED_MODULE_0__["default"](this));
      }
    }
  }, {
    key: "step",
    value: function step() {
      this.moveObjects();
      this.checkLanding();
    }
  }, {
    key: "moveObjects",
    value: function moveObjects() {
      this.platforms.forEach(function (platform) {
        return platform.move();
      });
      this.poodle.move();

      if (this.poodle.outOfBounds()) {
        this.gameOver = true;
      }
    }
  }, {
    key: "checkLanding",
    value: function checkLanding() {
      for (var i = 0; i < this.num_platforms; i++) {
        var platform = this.platforms[i];

        if (this.poodle.landedOn(platform)) {
          return true;
        }
      }
    }
  }, {
    key: "keydown",
    value: function keydown(e) {
      if (e.keyCode === 37) {
        this.poodle.left = true;
      } else if (e.keyCode === 39) {
        this.poodle.right = true;
      }
    }
  }, {
    key: "keyup",
    value: function keyup(e) {
      if (e.keyCode === 37) {
        this.poodle.left = false;
      } else if (e.keyCode === 39) {
        this.poodle.right = false;
      }
    }
  }, {
    key: "restart",
    value: function restart() {
      this.gameOver = false;
      this.score = 0;
      this.poodle = new _poodle__WEBPACK_IMPORTED_MODULE_1__["default"](this.dimensions);
      this.platforms = [];
      this.addPlatforms();
      this.play();
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this = this;

      this.ctx.clearRect(0, 0, innerWidth, innerHeight);
      this.ctx.fillStyle = '#333';
      this.ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
      this.platforms.forEach(function (p) {
        return p.draw(_this.ctx);
      });
      this.poodle.draw(this.ctx);
      this.updateScore();
    }
  }, {
    key: "lose",
    value: function lose(requestId) {
      cancelAnimationFrame(requestId);
      var replay = document.getElementById('replay');
      var gameOver = document.getElementById('game-over');
      replay.classList.remove('hidden');
      gameOver.classList.remove('hidden');
    }
  }, {
    key: "updateScore",
    value: function updateScore() {
      if (this.poodle.heightJumped > this.score) {
        this.score = Math.round(this.poodle.heightJumped);
      }

      this.ctx.font = '600 42px Courier';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText(this.score, 22, 50);
    }
  }, {
    key: "play",
    value: function play() {
      this.step();
      this.draw();
      var requestId;

      if (!this.gameOver) {
        requestId = requestAnimationFrame(this.play.bind(this));
      } else {
        this.lose(requestId);
      }
    }
  }]);

  return Game;
}();


;

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./lib/game.js");

window.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('canvas');
  var replay = document.getElementById('replay');
  var gameOver = document.getElementById('game-over');
  replay.classList.add('hidden');
  gameOver.classList.add('hidden');
  var instructions = document.getElementById('instructions');
  var selectMode = document.getElementById('select-mode');
  var easy = document.getElementById('easy');
  easy.addEventListener('click', function () {
    instructions.classList.add('hidden');
    selectMode.classList.add('hidden');
    var game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](canvas, 'easy');

    document.onkeydown = function (e) {
      return game.keydown(e);
    };

    document.onkeyup = function (e) {
      return game.keyup(e);
    };

    game.play();
  });
  var normal = document.getElementById('normal');
  normal.addEventListener('click', function () {
    instructions.classList.add('hidden');
    selectMode.classList.add('hidden');
    var game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](canvas, 'normal');

    document.onkeydown = function (e) {
      return game.keydown(e);
    };

    document.onkeyup = function (e) {
      return game.keyup(e);
    };

    game.play();
  });
  var insane = document.getElementById('insane');
  insane.addEventListener('click', function () {
    instructions.classList.add('hidden');
    selectMode.classList.add('hidden');
    var game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](canvas, 'insane');

    document.onkeydown = function (e) {
      return game.keydown(e);
    };

    document.onkeyup = function (e) {
      return game.keyup(e);
    };

    game.play();
  });
  replay.addEventListener('click', function () {
    window.location.reload(); // replay.classList.add('hidden');
    // gameOver.classList.add('hidden');
    // game.restart();
  });
  var gameTitle = document.getElementById('game-title');
  gameTitle.addEventListener('click', function () {
    window.location.reload();
  });
  window.addEventListener('keydown', function (e) {
    if (e.keyCode === 37 || e.keyCode === 39) {
      e.preventDefault();
    }
  });
});

/***/ }),

/***/ "./lib/platform.js":
/*!*************************!*\
  !*** ./lib/platform.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Platform; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HEX_DIGITS = "0123456789ABCDEF";

var Platform = /*#__PURE__*/function () {
  function Platform(game) {
    _classCallCheck(this, Platform);

    this.game = game;
    this.w = 65;
    this.h = 12;
    this.x = Math.random() * (this.game.dimensions.width - this.w);
    this.y = Math.random() * (this.game.dimensions.height - this.h);
    this.randColor();

    switch (game.difficulty) {
      case 'easy':
        this.yVel = 2;
        break;

      case 'insane':
        this.yVel = 8;
        break;

      default:
        this.yVel = 3.5;
    }

    ;
  }

  _createClass(Platform, [{
    key: "randColor",
    value: function randColor() {
      this.color = "#";

      for (var i = 0; i < 6; i++) {
        this.color += HEX_DIGITS[Math.floor(Math.random() * 16)];
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }, {
    key: "move",
    value: function move() {
      this.y = this.y + this.yVel;

      if (this.y >= this.game.dimensions.height) {
        this.y = 0;
        this.x = Math.random() * 635;
        this.randColor();
      }
    }
  }]);

  return Platform;
}();


;

/***/ }),

/***/ "./lib/poodle.js":
/*!***********************!*\
  !*** ./lib/poodle.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Poodle; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Poodle = /*#__PURE__*/function () {
  function Poodle(dimensions, difficulty) {
    _classCallCheck(this, Poodle);

    this.boardDimensions = dimensions;
    this.difficulty = difficulty;
    this.heightJumped = 0;
    this.left = false;
    this.right = false;
    this.jumping = true;
    this.x = dimensions.width / 2;
    this.y = 450;
    this.r = 25;
    this.w = 50;
    this.h = 50;

    switch (this.difficulty) {
      case 'easy':
        this.xVel = 5;
        this.yVel = 11;
        this.gravity = 0.35;
        break;

      case 'insane':
        this.xVel = 7;
        this.yVel = 20;
        this.gravity = 0.95;
        break;

      default:
        this.xVel = 5;
        this.yVel = 13;
        this.gravity = 0.5;
    }

    ;
  }

  _createClass(Poodle, [{
    key: "move",
    value: function move() {
      if (this.jumping) {
        this.jumping = false;
        this.gravitySpeed = 0;

        switch (this.difficulty) {
          case 'easy':
            this.yVel = -11;
            break;

          case 'insane':
            this.yVel = -20;
            break;

          default:
            this.yVel = -13;
        }
      } //Consistently add gravity to y velocity. This updates and increases yVel
      //each animation frame.


      this.yVel += this.gravity;
      this.y += this.yVel;

      if (this.left) {
        this.moveLeft();
      } else if (this.right) {
        this.moveRight();
      }
    }
  }, {
    key: "landedOn",
    value: function landedOn(platform) {
      var poBottom = this.y + this.r; //Locate the bottom y of poodle and check if it is within the y values of 
      //the platform. Check if poodle x edges are at least 10px within platform x values.

      if (poBottom <= platform.y + platform.h + 3 && poBottom >= platform.y - 3 && this.x >= platform.x - this.r + 10 && this.x <= platform.x + platform.w - 10) {
        //If poodle is already jumping or on it's way up, do not repeatedly jump.
        //Only jumps if yVel is positive, or the poodle is falling once again.
        if (this.yVel > 0) {
          this.jumping = true;
          this.heightJumped += this.yVel * 4;
          return true;
        }
      } else {
        return false;
      }
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      this.x -= this.xVel;
      if (this.x <= -this.w) this.x = this.boardDimensions.width;
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      this.x += this.xVel;
      if (this.x >= this.boardDimensions.width) this.x = -this.w;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.clearRect(0, 0, ctx.width, ctx.height);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.w / 2, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(255, 255, 255)';
      ctx.fill(); // ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }, {
    key: "outOfBounds",
    value: function outOfBounds() {
      return this.y > this.boardDimensions.height;
    }
  }]);

  return Poodle;
}();



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map