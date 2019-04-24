const currentEventLoopEnd = () => new Promise(resolve => setImmediate(resolve));

module.exports = {
  currentEventLoopEnd,

  async nextLoop(wrapper) {
    await currentEventLoopEnd();
    wrapper.update();
  },
};
