<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Results of load testing
Fastify:
| Label                  | # Samples | Average | Min | Max  | Std. Dev. | Error % | Throughput | Received KB/sec | Sent KB/sec | Avg. Bytes |
| ---------------------- | --------- | ------- | --- | ---- | --------- | ------- | ---------- | --------------- | ----------- | ---------- |
| HTTP POST create user  | 1000      | 3939    | 160 | 6601 | 1665.66   | 0.000%  | 15.65607   | 3.82            | 7.42        | 250.0      |
| HTTP GET users list    | 1000      | 212     | 17  | 5445 | 521.58    | 0.000%  | 17.43436   | 145.86          | 6.15        | 8566.8     |
| HTTP GET user by id    | 1000      | 358     | 15  | 2136 | 235.13    | 0.000%  | 17.44227   | 4.17            | 6.78        | 245.0      |
| HTTP DELETE user by id | 1000      | 1836    | 15  | 5656 | 1501.12   | 0.000%  | 17.47916   | 2.08            | 8.26        | 122.0      |
| TOTAL                  | 4000      | 1586    | 15  | 6601 | 1894.11   | 0.000%  | 62.44536   | 140.01          | 26.34       | 2295.9     |
|                        |

Express:
| Label                  | # Samples | Average | Min | Max  | Std. Dev. | Error % | Throughput | Received KB/sec | Sent KB/sec | Avg. Bytes |
| ---------------------- | --------- | ------- | --- | ---- | --------- | ------- | ---------- | --------------- | ----------- | ---------- |
| HTTP POST create user  | 1000      | 4228    | 258 | 7144 | 1907.40   | 0.000%  | 14.67674   | 4.51            | 6.95        | 315.0      |
| HTTP GET users list    | 1000      | 131     | 51  | 750  | 70.80     | 0.000%  | 16.23034   | 139.58          | 5.72        | 8806.7     |
| HTTP GET user by id    | 1000      | 265     | 49  | 6345 | 661.84    | 0.000%  | 16.24643   | 4.92            | 6.31        | 310.0      |
| HTTP DELETE user by id | 1000      | 2145    | 21  | 6345 | 1761.53   | 0.000%  | 16.30018   | 2.31            | 7.70        | 145.0      |
| TOTAL                  | 4000      | 1692    | 21  | 7144 | 2138.67   | 0.000%  | 58.57116   | 136.94          | 24.71       | 2394.2     |
|                        |
