{\rtf1\ansi\ansicpg1252\cocoartf1187\cocoasubrtf340
{\fonttbl\f0\fnil\fcharset0 Monaco;}
{\colortbl;\red255\green255\blue255;\red249\green217\blue36;\red52\green61\blue68;\red246\green246\blue246;
\red158\green184\blue234;\red208\green254\blue47;}
\paperw11900\paperh16840\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\deftab720
\pard\pardeftab720

\f0\fs22 \cf2 \cb3 var\cf4  express = require(\cf5 'express'\cf4 );\
\
\cf2 var\cf4  app = express.createServer(express.logger());\
\
app.get(\cf5 '/'\cf4 , \cf2 function\cf4 (request, response) \{\
  response.send(\cf5 'Hello World!'\cf4 );\
\});\
\
\cf2 var\cf4  port = process.env.PORT || \cf6 5000\cf4 ;\
app.listen(port, \cf2 function\cf4 () \{\
  console.log(\cf5 "Listening on "\cf4  + port);\
\});}