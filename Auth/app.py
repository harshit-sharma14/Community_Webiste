import pandas as pd
import json

# Load the CSV file
df = pd.read_csv("C:/Users/Hp/Desktop/2019.csv")

# Select the relevant columns (modify these based on your dataset)
selected_columns = df[["Country or region", "Score", "GDP per capita", "Healthy life expectancy", "Freedom to make life choices"]]
selected_columns.columns = ["country", "happinessScore", "gdp", "health", "freedom"]

# Convert DataFrame to a list of dictionaries
data = selected_columns.to_dict(orient="records")

# Wrap the data in a dictionary to match JSON Server format
db_data = {"happinessData": data}

# Save the data to db.json
with open("db.json", "w") as json_file:
    json.dump(db_data, json_file, indent=4)

print("Data saved to db.json!")
