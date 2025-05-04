import json
import os
from difflib import get_close_matches

# loading grocery price once
with open("grocery_prices.json", "r") as f:
    grocer_data = json.load(f)

