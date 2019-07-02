module.exports = class Test {
  async test(req, res) {
    const task = await new Promise(resolve => {
      setTimeout(() => resolve('ok234'), 5000);
    });
    res.send(`hello express ${task} ${Date.now()}ms`);
  }
}