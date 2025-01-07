# BanDDos - Advanced DDoS Attack Tool

A powerful and sophisticated Distributed Denial of Service (DDoS) attack tool built with Node.js, featuring multiple attack methods and proxy support.

# Features

1. Layer 7 Attack Methods :
   - HTTP-FLOOD: Floods target with HTTP requests
   - BYPASS: Advanced bypass for common protections
   - GET/POST: Standard GET/POST request floods
   - STRESS: Heavy payload requests
   - SOCKET: WebSocket connection floods
   - TLS: TLS/SSL connection floods
   - SLOW: Slowloris attack implementation
   - NULL: Null User-Agent attacks
   - COOKIE: Cookie-based attacks
   - BOT: Simulates bot traffic
   - XMLRPC: XML-RPC pingback floods

2. Layer 4 Attack Methods
   - TCP: TCP SYN flood attacks
   - UDP: UDP packet floods
   - SYN: SYN packet floods
   - VSE: Valve Source Engine query floods
   - MINECRAFT: Minecraft server attacks
   - MCBOT: Minecraft bot attacks
   - CONNECTION: Connection floods

# Key Features

- Multi-threaded attack engine
- Proxy support (HTTP, SOCKS4, SOCKS5)
- Auto proxy scraping and checking
- Customizable request parameters
- Built-in user agent rotation
- Cookie management
- Advanced header spoofing
- Rate limiting and timeout controls
- Real-time attack statistics

# Technical Details

- Built on Node.js for high performance
- Uses native TCP/UDP sockets
- Implements HTTP/1.1 and HTTP/2
- Supports SSL/TLS connections
- Proxy chain implementation
- Custom protocol implementations
- Efficient memory management
- Asynchronous I/O operations

# Installation

```
# Clone repository
git clone https://github.com/REXREUS/BanDDoS.git

# Install dependencies
npm install

# Configure settings
cp config.example.json config.json
```

# Usage

```
# Layer 7 Attack
npm start <url> <method> <threads> <duration>

# Layer 4 Attack  
npm start <ip:port> <method> <threads> <duration>

# With Proxy
npm start <target> <method> <threads> <duration> <proxy-file>
```

# Command

### Layer 7 Methods

- HTTP_FLOOD: `npm start <url> HTTP_FLOOD <threads> <duration>`
- CFB: `npm start <url> CFB <threads> <duration>`
- BYPASS: `npm start <url> BYPASS <threads> <duration>`
- GET: `npm start <url> GET <threads> <duration>`
- POST: `npm start <url> POST <threads> <duration>`
- OVH: `npm start <url> OVH <threads> <duration>`
- STRESS: `npm start <url> STRESS <threads> <duration>`
- DYN: `npm start <url> DYN <threads> <duration>`
- SLOW: `npm start <url> SLOW <threads> <duration>`
- HEAD: `npm start <url> HEAD <threads> <duration>`
- NULL: `npm start <url> NULL <threads> <duration>`
- COOKIE: `npm start <url> COOKIE <threads> <duration>`
- PPS: `npm start <url> PPS <threads> <duration>`
- EVEN: `npm start <url> EVEN <threads> <duration>`
- SOCKET_FLOOD: `npm start <url> SOCKET_FLOOD <threads> <duration>`
- TLS_FLOOD: `npm start <url> TLS_FLOOD <threads> <duration>`
- XMLRPC: `npm start <url> XMLRPC <threads> <duration>`

### Layer 4 Methods

- TCP_FLOOD: `npm start <ip:port> TCP_FLOOD <threads> <duration>`
- UDP_FLOOD: `npm start <ip:port> UDP_FLOOD <threads> <duration>`
- SYN_FLOOD: `npm start <ip:port> SYN_FLOOD <threads> <duration>`
- VSE: `npm start <ip:port> VSE <threads> <duration>`
- MINECRAFT: `npm start <ip:port> MINECRAFT <threads> <duration>`
- MCBOT: `npm start <ip:port> MCBOT <threads> <duration>`

### With Proxy

Add file proxy in end command:

```
npm start <target> <method> <threads> <duration> <proxy-file>
```

# Configuration

Edit config.json to configure:

- Default attack parameters
- Proxy sources and types
- User agent lists
- Request headers
- Connection timeouts
- Debug options

# Disclaimer

This tool is for educational and testing purposes only. Users take full responsibility for any misuse or damage caused. The developers assume no liability.

# License

This project is licensed under MIT License. [[See LICENSE file for details]](https://github.com/portafuku/BanDDoS/blob/main/LICENSE)

# Contributing

- Fork repository
- Create feature branch
- Commit changes
- Push to branch
- Create Pull Request

# Author

- Name: REXREUS
- Github: [[github.com/REXREUS]](https://github.com/REXREUS)

# Acknowledgments

- Original MHDDoS Project
- Node.js Community
- All Contributors
This tool demonstrates advanced networking concepts and should be used responsibly for authorized testing only.
