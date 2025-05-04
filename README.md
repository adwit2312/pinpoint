# PinPoint 🛒 

**PinPoint** is a smart grocery planning and health-focused web application built to help users—especially students—find the best grocery prices near them based on their location, diet preferences, and meal plans.

## 🌟 Features

1. **Cheap Grocery Finder:**  
  Enter the items you need, like chicken or eggs, along with any dietary preferences (e.g., organic).
  Scans stores within a 500 km range and shows you where to find the lowest prices, even checking at lesser-known shops that you might otherwise overlook.

2. **Price Matcher:**  
   List the items you want to price match.
   Fetches cheaper prices from other stores.
   Generates a QR code containing the proof.
   Show the code at checkout.
   No need to argue or scroll through multiple apps.

3. **GrocyBot – Your AI Grocery Assistant:**  
   Built-in chatbot answers all your food-related questions, from “Where can I buy high-protein snacks on a budget?” to “What meals can I make with just five ingredients?”
   Gives fast and tailored responses based on your location, goals, and budget.

5. **DAPR – Dynamic Price-Adaptive Recipes:**  
   Recipe system adapts to local price changes.
   Recommends meals based on the cheapest available ingredients near you, completed with a cost breakdown.
   If chicken, olive oil, and garlic are today’s bargains --> suggests a recipe that uses them cost-effectively.

## 🌟 Additional Features
1. **Cardio Compass:**
   AI-driven fitness assistant that recommends cardio routines based on your body type, health conditions, and fitness goals.
   Functions like a personal trainer that understands your stamina and schedule.

2. **MealSync AI:**
   Smart meal planner that aligns with your routine, eating habits, and dietary goals.
   Whether you’re intermittent fasting or following a keto plan, MealSync helps you stay on track effortlessly.

3. **CampusChef:**
   Enhanced version of DAPR recipe engine, tailored for students.
   Adjusts recipes based on your lifestyle, budget, cooking skills, and workout plan.
   Making healthy eating practical and personalized for college life.

## 🚀 How It Works

1. **Input Details:**  
   Users enters their location to move on to the page showing all the 4 features to choose from.

2. Feature 1 --> Cheap Grocery Finder:
   User can enter ingredients and a filter like organic as a type of ingredient.
   Outputs a list of stores nearby selling ingredients and compares prices with each other.

3. Feature 2 --> Price Matcher:
   User can enter ingredients and select their favourite store from drop down menu.
   Outputs an image, price at selected store, and QR code taking to external website of selected ingredients

4. Feature 3 --> GrocyBot - AI Grocery Assistant:
   User can ask anything grocery related to the bot.
   Bot will output any answer that it finds suitable after searching on the web.

5. Feature 4 --> DAPR – Dynamic Recipe System:
   User can choose their diet options from drop down menu and enter ingredients closely related to the diet.
   Outputs matching recipes based on diet and ingredients.
   Outputs resulting image of recipe, ingredients used, estimated price, nutrition facts, summarization of instructions, and YouTube link to full recipe.

## 🧰 Tech Stack

- **Frontend:** React (Vite + TailwindCSS), Typescript
- **Backend:** Python Flask API (Local)
- **Deployment:** Localhost (Temporary)
- **Data Sources:** Custom dataset or scraped data (Planned)
