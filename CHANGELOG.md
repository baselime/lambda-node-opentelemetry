# Changelog

All notable changes to this project will be documented in this file.


The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [0.5.0] - 2024-03-27

- step function tracing

## [0.3.10] - 2024-03-05

* configure github auth
  
## [0.3.9] - 2024-03-05

* fix ci
  
## [0.3.8] - 2024-03-04

* Uses @baselime/node-opentelemetry as core

## [0.3.7] - 2024-01-30

- Add sa-east-1

## [0.3.6] - 2023-12-11

- fallback if request data cannot be parsed
  
## [0.3.5] - 2023-12-07

- upgrade ci node version

## [0.3.4] - 2023-12-06

- updating deps
  
## [0.3.3] - 2023-11-28 

- Hide esm loader error log

## [0.3.2] - 2023-11-09

- support lowercase headers
- remove json parsing error log in fallback
  
## [0.3.1] - 2023-11-06

- fix ci
- 
## [0.3.0] - 2023-11-06 

- fix json parsing
## [0.2.22] - 2023-10-29

- make http request body parsing safer
  
## [0.2.21] - 2023-10-23

- ensure .cjs files are imported
- parse request bodys if the content type is json
  
## [0.2.20] 2023-09-20

- add eu-north-1

## [0.2.19] 2023-09-04

- fix loading for default exports
- remove span logger

## [0.2.16] 2023-09-04

- fix loading for default exports
  
## [0.2.15] 2023-09-04

- add cjs to extension for otel extension so it loads in all node environments
- add esm build for wrapper
## [0.2.10] 2023-09-03

- fix manual setup build
  
## [0.2.8] 2023-09-03

- don't enrich span for outgoing trace http post
- 
## [0.2.7] 2023-09-03

- don't enrich span for outgoing trace http post
  
## [0.2.6] 2023-09-03

- fix build

## [0.2.4] 2023-09-02

- Parse and instrument request bodies
  
## [0.2.3] 2023-09-02

- remove gzip
  
## [0.2.2] 2023-09-01

- Coldstart improvements
- 
## [0.2.1] 2023-08-08

- Add better loading diagnostics
- 
 
 The latest layer is: `arn:aws:lambda:${your-region-here}:097948374213:layer:baselime-node:20`

## [0.2.0] 2023-08-07

- fix importing of cjs from esm loader
  

## [0.1.19] 2023-08-06

- Improve diagnostics on import error
 
 The latest layer is: `arn:aws:lambda:${your-region-here}:097948374213:layer:baselime-node:1`

## [0.1.18] 2023-07-24

- Improved robustness of callback support

 
 The latest layer is: `arn:aws:lambda:${your-region-here}:097948374213:layer:baselime-node:18`

## [0.1.17] 2023-07-24

- fix callback support

 
 The latest layer is: `arn:aws:lambda:${your-region-here}:097948374213:layer:baselime-node:13`

## [0.1.16] 2023-07-17

- fix
 
 The latest layer is: `arn:aws:lambda:${your-region-here}:097948374213:layer:baselime-node:12`

## [0.1.15] 2023-07-17

- Add support for callback based lambda functions


 
 The latest layer is: `arn:aws:lambda:${your-region-here}:097948374213:layer:baselime-node:11`

## [0.1.14] 2023-07-07

- Add lots of aws lambda resource spans
- GZIP

 
 The latest layer is: `arn:aws:lambda:${your-region-here}:097948374213:layer:baselime-node:8`

## [0.1.13] 2023-07-05

- Make sure flushing is not canceled

## [0.1.12] 2023-06-28

- publish via CI
- Fix: auto-loader paths

 The latest layer is: `arn:aws:lambda:${your-region-here}:097948374213:layer:baselime-node:6`

## [0.1.11] 2023-07-22

- publish via CI
- Fix: auto-loader paths

 
 The latest layer is: `arn:aws:lambda:${your-region-here}:097948374213:layer:baselime-node:4`

## [0.1.6] 2023-07-21

- Add esm auto loading
- Add logging extension

 
 The latest layer is: `arn:aws:lambda:${your-region-here}:374211872663:layer:baselime-node:8`

 
 The latest layer is: `arn:aws:lambda:${your-region-here}:374211872663:layer:baselime-node:9`

## [0.1.4] 2023-07-16

- Added support for the baselime-extension to forward open telemetry data
- Added support for esm and bundlers with `baselime.wrap`
  
## [0.1.2] 2023-07-15

## [0.1.1] 2023-07-15

## [0.0.13] 2023-05-17

### Added
- Improved environment variables BASELIME_OTEL_KEY -> BASELIME_KEY
- Service discovery

## [0.0.11] 2023-05-17

### Added
- Changelog
