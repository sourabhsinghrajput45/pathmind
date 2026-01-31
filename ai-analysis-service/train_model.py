import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.multioutput import MultiOutputRegressor
from sklearn.model_selection import train_test_split
import joblib

# create synthetic dataset
def generate_synthetic(n_samples=2000, n_questions=12):
    X = np.random.randint(1, 11, size=(n_samples, n_questions)).astype(float)
    # create category scores from subsets of questions (simple linear combos + noise)
    logic = (X[:,0]*0.2 + X[:,1]*0.3 + X[:,2]*0.2 + X[:,3]*0.3) * 10 + np.random.randn(n_samples)*3
    math = (X[:,4]*0.25 + X[:,5]*0.25 + X[:,6]*0.25 + X[:,7]*0.25) * 10 + np.random.randn(n_samples)*3
    data_int = (X[:,8]*0.3 + X[:,9]*0.3 + X[:,10]*0.2) * 10 + np.random.randn(n_samples)*3
    memory = (X[:,11]*10) + np.random.randn(n_samples)*3
    # overall score roughly average of above scaled to 0-100
    overall = (0.3*logic + 0.3*math + 0.2*data_int + 0.2*memory) / 1.0
    # stack outputs: overall, logic, math, data_int, memory (all roughly 0-100)
    Y = np.column_stack([overall, logic, math, data_int, memory])
    # clip
    Y = np.clip(Y, 0, 100)
    return X, Y

def train_and_save(path="model.joblib"):
    X, Y = generate_synthetic()
    X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=42)
    rf = RandomForestRegressor(n_estimators=150, random_state=42, n_jobs=-1)
    mor = MultiOutputRegressor(rf)
    mor.fit(X_train, Y_train)
    print("Train score:", mor.score(X_train, Y_train))
    print("Test score:", mor.score(X_test, Y_test))
    joblib.dump(mor, path)
    print("Model saved to", path)

if __name__ == "__main__":
    train_and_save()
