class Test {
  async test(req, res) {
    const task = await new Promise(resolve => {
      setTimeout(() => resolve('ok234'), 2000);
    });
    res.send(`hello express ${task} ${Date.now()}ms`);
  }
}

module.exports = new Test();