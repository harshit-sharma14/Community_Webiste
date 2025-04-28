import pandas as pd

# Load the CSV file
df = pd.read_csv('C:/Users/Hp/Desktop/2019_new.csv')

# Check the column names and data types
print("Columns in DataFrame:", df.columns.tolist())
print("Data types in DataFrame:\n", df.dtypes)

# Select only numeric columns for correlation matrix
numeric_df = df.select_dtypes(include=['float64', 'int64'])

# Calculate the correlation matrix
correlation_matrix = numeric_df.corr()

# Save the correlation matrix to JSON
correlation_matrix.to_json('correlation_matrix.json', orient='split')
df[['Country or region', 'Cluster']].to_json('clusters.json', orient='records')

# Check if the 'Country or region' and 'Cluster' columns exist
if 'Country or region' in df.columns and 'Cluster' in df.columns:
    # Save clustering results to JSON
    df[['Country or region', 'Cluster']].to_json('clusters.json', orient='records')
else:
    print("One or both of the columns 'Country or region' and 'Cluster' do not exist in the DataFrame.")