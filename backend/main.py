from src.train import train_model
from src.predict import predict

if __name__ == "__main__":
    train_model()
    df = predict()
    print(df.head())
