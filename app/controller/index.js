const Controller = require('egg').Controller;

module.exports = class Index extends Controller {
  async test() {
    this.ctx.body = 'hello eggjs';
  }
}