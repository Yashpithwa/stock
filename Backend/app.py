from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
from sklearn.preprocessing import MinMaxScaler
import tensorflow as tf

app = FastAPI()

class PredictRequest(BaseModel):
    symbol: str
    days: int
    closePrices: list[float]

@app.post("/predict")
def predict(data: PredictRequest):
    try:
        prices = np.array(data.closePrices).reshape(-1, 1)

        scaler = MinMaxScaler(feature_range=(0, 1))
        scaled_prices = scaler.fit_transform(prices)

        # Timesteps based on days
        if data.days >= 90:
            timesteps = 15
        elif data.days >= 60:
            timesteps = 10
        else:
            timesteps = 5

        timesteps = min(timesteps, len(scaled_prices))

        # Prepare sequences
        X = []
        for i in range(len(scaled_prices) - timesteps):
            X.append(scaled_prices[i:i+timesteps])
        X = np.array(X)
        y = scaled_prices[timesteps:]

        if len(X) == 0:
            last_seq = scaled_prices[-timesteps:].reshape(1, timesteps, 1)
            pred_price = last_seq[0, -1, 0]
        else:
            model = tf.keras.Sequential([
                tf.keras.layers.LSTM(50, return_sequences=True, input_shape=(X.shape[1], 1)),
                tf.keras.layers.LSTM(50),
                tf.keras.layers.Dense(1)
            ])
            model.compile(optimizer='adam', loss='mean_squared_error')
            model.fit(X, y, epochs=10, batch_size=1, verbose=0)

            last_seq = scaled_prices[-timesteps:].reshape(1, timesteps, 1)
            pred_scaled = model.predict(last_seq, verbose=0)
            pred_price = scaler.inverse_transform(pred_scaled)[0][0]

        print(f"[Python API] Prediction for {data.symbol}: {pred_price:.2f}")

        return {
            "symbol": data.symbol,
            "days_provided": data.days,
            "timesteps_used": timesteps,
            "predicted_next_close": float(pred_price)
        }
    except Exception as e:
        import traceback
        print("Prediction Error:", traceback.format_exc())
        return {"error": str(e)}
