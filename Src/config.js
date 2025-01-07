module.exports = {
  DEFAULT_CONFIG: {
    threads: 100,
    rpc: 10,
    duration: 1000,
    timeout: 5000,
    maxPayloadSize: 1024,
  },

  PROXY_TYPES: {
    HTTP: "http",
    SOCKS4: "socks4",
    SOCKS5: "socks5",
  },

  ATTACK_METHODS: {
    LAYER7: [
      "HTTP_FLOOD",
      "SOCKET_FLOOD",
      "BYPASS",
      "TLS_FLOOD",
      "GET",
      "HEAD",
      "NULL",
      "COOKIE",
      "STRESS",
      "DYN",
      "PPS",
      "EVEN",
      "XMLRPC",
    ],
    LAYER4: ["TCP_FLOOD", "UDP_FLOOD", "SYN_FLOOD", "VSE", "MCBOT"],
  },

  USER_AGENTS: [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    "Mozilla/5.0 (Linux; Android 11; Pixel 5)",
  ],
};
