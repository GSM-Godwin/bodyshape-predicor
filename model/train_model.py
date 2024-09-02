import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from keras.models import Sequential # type: ignore
from keras.layers import Dense # type: ignore
import pickle

# Load your dataset
df = pd.read_csv("project.csv")

# Convert 'Body Shape' to multi-label format
df = pd.get_dummies(df, columns=['body_shape'], prefix_sep='_')

# Split the data into features (X) and labels (y)
X = df[['shoulderWidth', 'bustCircumference', 'waistCircumference', 'hipCircumference']].values  # Measurements
y = df[['body_shape_Hourglass', 'body_shape_Rectangle', 'body_shape_Pear', 'body_shape_Apple']].values  # Labels

# Normalize the measurements
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Define the model
model = Sequential()
model.add(Dense(64, activation='relu', input_shape=(X_train.shape[1],)))  # Input layer with 64 neurons
model.add(Dense(32, activation='relu'))  # Hidden layer with 32 neurons
model.add(Dense(y_train.shape[1], activation='sigmoid'))  # Output layer with sigmoid activation

# Compile the model
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Train the model
model.fit(X_train, y_train, epochs=160, batch_size=32, validation_data=(X_test, y_test))

# Evaluate the model on the test data
loss, accuracy = model.evaluate(X_test, y_test)
print(f"Test Accuracy: {accuracy:.2f}")

# Save the trained model and scaler
model.save("body_shape_model.h5")
with open("scaler.pkl", "wb") as scaler_file:
    pickle.dump(scaler, scaler_file)

print("Model and scaler saved!")
