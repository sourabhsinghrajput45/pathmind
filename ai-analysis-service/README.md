# Flask AI Analysis Backend

1. Create venv: python -m venv venv
2. Activate and install: pip install -r requirements.txt
3. Train model: python train_model.py   (produces model.joblib)
4. Start server: python run.py
5. Endpoints:
   POST /api/quiz/submit   (payload: {user, answers})
   POST /api/analysis/run  (payload: {user, quiz_id} OR {user, answers})
