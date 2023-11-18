# Foodwise

[CodePath WEB103](https://www.codepath.org/courses/web-development?utm_term=website%20coding%20classes&utm_campaign=Search_Web_Development_Paid_Tuff&utm_source=google_ads&utm_medium=ppc&hsa_acc=1387130392&hsa_cam=20442411038&hsa_grp=151633997945&hsa_ad=669245130454&hsa_src=g&hsa_tgt=kwd-296989626949&hsa_kw=website%20coding%20classes&hsa_mt=p&hsa_net=adwords&hsa_ver=3&gclid=Cj0KCQiA3uGqBhDdARIsAFeJ5r37f_TGaHn0JY12JOoFkBXnCGEg2BFVHFywIQ6MhSmSaSJ4Ppt3bZgaApftEALw_wcB) Final Project

Designed and developed by: Miho Shimizu, Jiarui Liang

🔗 Link to codebase: https://github.com/simicity/foodwise

🔗 Link to deployed app: https://foodwise-client.up.railway.app/

## Final Demo GIF

<img src="https://imgur.com/vR66VWo.gif" alt="demo" width="600"/>

## About

### Description and Purpose

Foodwise helps people manage and monitor food items they have in thier refrigerator. This app allows users to keep track of what food items they have, their quantities, and expiration dates. Users can share the information among their housemates. This food tracking system facilitates to use their food resources efficiently, reduce food waste, and plan their meals based on the ingredients they have available. It's a handy tool for households, community organizations, and anyone interested in optimizing their food inventory.

### Inspiration

You're all set to cook that favorite recipe, only to find that a crucial ingredient you were sure you had, has magically disappeared - thanks to a helpful housemate! (Sometimes it's your yesterday self.) We've all been there, right? That relatable frustration sparked the idea for our app. We wanted to create a handy solution for managing your pantry and fridge to avoid those letdowns. Whether you're the master chef of the house or just someone tired of unwanted surprises, Foodwise is your answer to lessen "Who used the last egg?" moments and foster a more harmonious kitchen.

## Tech Stack

Frontend: React, Redux Toolkit, Material UI

Backend: Node.js, Express.js, PostgreSQL (Railway), Passport.js + Google OAuth

Deployed on: Railway

## Features

### Fridges

Fridge is the unit of food inventory. Users can create and delete fridges. Within each fridge, users can manage food items by adding, updating, and removing. Additionally, users can manage members to share the info with by adding and removing. 

- ✅Users can create fridges.
- ✅The user who creates the fridge becomes its manager and holds the authority to delete it.
- ✅Fridge should have a name and creator.

### Food items

Food items have attributes such as count, expiration date, and category. When the food expires, the item will be highlighted. Users can also mark missing food, so the members know that they need to buy them.

- ✅Food item should have a name, count, expiration date, and category.
- ✅Members can create, update, and delete food items.
- ✅Members can add food items to the shopping list.
- ✅Members can sort food items by expiration date.

### Members

Fridge members share the fridge info. Users can be a member of multiple fridges. 

- ✅Managers can invite and remove members.

### Shopping Lists

- ✅Users have access to a shopping list that aggregates all missing food items to be bought.

### Dash Board

- ✅Users can create or access fridges from this page.

## Installation Instructions

### 1. Clone the repository

Open your terminal and run the following commands:

```bash
git clone https://github.com/simicity/foodwise.git
cd your-repository
```

### 2. Install server dependencies

```bash
// Navigate to the server folder
cd server
// Install the dependencies
npm install
```

### 3. Configure server

Provision PostgreSQL on Railway and set up Google OAuth. Create the .env file that contains the following information: 
- PGDATABASE
- PGHOST
- PGPASSWORD
- PGPORT
- PGUSER
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET

### 4. Start the server

```bash
npm start
```

### 5. Install client dependencies

```bash
// Navigate to the client folder
cd ../client
// Install the dependencies
npm install
```

### 6. Start the client

```bash
npm run dev
```