"use strict";
cc._RF.push(module, 'ecdd3qttgFPjYWhadnScKgG', 'FindingPlayer');
// scripts/FindingPlayer.js

'use strict';

cc.Class({
  extends: cc.Component,

  properties: {
    firstPlayerInfoNode: {
      type: cc.Node,
      default: null
    },
    secondPlayerInfoNode: {
      type: cc.Node,
      default: null
    },
    findingAnimNode: {
      type: cc.Node,
      default: null
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad: function onLoad() {},
  init: function init() {
    this.firstPlayerInfoNode.active = false;
    this.secondPlayerInfoNode.active = false;
    this.playersInfoNode = {};
    Object.assign(this.playersInfoNode, { 1: this.firstPlayerInfoNode });
    Object.assign(this.playersInfoNode, { 2: this.secondPlayerInfoNode });
  },
  exitBtnOnClick: function exitBtnOnClick(evt) {
    window.closeWSConnection();
    window.clearBoundRoomIdInBothVolatileAndPersistentStorage();
    cc.sys.localStorage.removeItem('selfPlayer');
    cc.director.loadScene('login');
  },
  updatePlayersInfo: function updatePlayersInfo(players) {
    if (!players) return;
    for (var i in players) {
      var playerInfo = players[i];
      var playerInfoNode = this.playersInfoNode[playerInfo.joinIndex];
      var nameNode = playerInfoNode.getChildByName("name");
      nameNode.getComponent(cc.Label).string = "Player" + playerInfo.joinIndex;
      playerInfoNode.active = true;
      if (2 == playerInfo.joinIndex) {
        this.findingAnimNode.active = false;
      }
    }
  }
});

cc._RF.pop();