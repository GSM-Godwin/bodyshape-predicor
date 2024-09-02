from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
from keras.models import load_model # type: ignore
import pickle

# Load the trained model and scaler
model = load_model("body_shape_model.h5")
with open("scaler.pkl", "rb") as scaler_file:
    scaler = pickle.load(scaler_file)

app = FastAPI()

class Measurements(BaseModel):
    shoulderWidth: float
    bustCircumference: float
    waistCircumference: float
    hipCircumference: float

def determine_characteristics(shoulderWidth, bustCircumference, waistCircumference, hipCircumference):
    shoulder_hip_ratio = shoulderWidth / hipCircumference
    waist_hip_ratio = waistCircumference / hipCircumference
    shoulder_bust_ratio = shoulderWidth / bustCircumference

    # Define characteristics
    wider_shoulders = shoulder_hip_ratio > 0.38
    slimmer_hips = waist_hip_ratio > 0.69
    fuller_bust = shoulder_bust_ratio < 0.44

    return wider_shoulders, slimmer_hips, fuller_bust

@app.post("/shape")
def determine_shape(measurements: Measurements):
    try:
        # Calculate derived characteristics
        wider_shoulders, slimmer_hips, fuller_bust = determine_characteristics(
            measurements.shoulderWidth, 
            measurements.bustCircumference, 
            measurements.waistCircumference, 
            measurements.hipCircumference
        )
        
        # Prepare the data for prediction
        input_data = np.array([[measurements.shoulderWidth, measurements.bustCircumference, 
                                measurements.waistCircumference, measurements.hipCircumference]])
        
        # Scale the input data
        input_data_scaled = scaler.transform(input_data)
        
        # Make predictions
        prediction = model.predict(input_data_scaled)[0]
        
        # Map predictions to shape percentages
        body_shapes = ["Hourglass", "Rectangle", "Pear", "Apple"]
        percentages = {shape: f"{round(pred * 100, 2)}%" for shape, pred in zip(body_shapes, prediction)}
        primary_shape = max(percentages, key=percentages.get)
        
        return {
            "shapePercentages": percentages,
            "primaryShape": primary_shape,
            "widerShoulders": wider_shoulders,
            "slimmerHips": slimmer_hips,
            "fullerBust": fuller_bust
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9000)

print("API is running!")
