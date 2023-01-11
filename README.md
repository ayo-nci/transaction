
## Description

[Video presentation](https://drive.google.com/file/d/1iyr4zEf7XHRiHa0yq1LbaJiT12-RSptU/view?usp=share_link) and [slides](https://docs.google.com/presentation/d/1_UtIQFcjA3ig8EKsnC6BtkatP0bYIUnz4bxsUCdR240/edit?usp=share_link) used can be found [in this folder](https://drive.google.com/drive/folders/1mzSZALQL-fZeKRemm4PcbHMX2s8B5_IF?usp=sharing)

[Exchange Converter Widget](https://github.com/ayo-nci/transaction) can be found here. Download the folder and extract the folder. 

## Running the app
From inside './transaction-master', run 'npm install' to load the dependencies and 'npm run start' to start the Nest server.

```bash
$ npm install
$ npm run start
# The Nest server will start on port 5000 
# and you will see past transactions via http://localhost:5000/transaction

# When done, Open another terminal and navigate 
# to the ratewidget folder within the 
# './transaction-master' folder. 
# Run 'npm install' to load the dependencies 
# and then start the app by running 'npm start'

$ cd ratewidget
$ npm install
$ npm start

```
The react server will load on port 3000. The backend will fetch new rates for BTC/USD and ETH/USD every 5 minutes from coinbase's API.

## Test

```bash
# unit tests
$ npm run test

```
## Stay in touch

- LinkedIn - [Ayoola Animashaun](https://www.linkedin.com/in/ayoidan/)

