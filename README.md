# 🧠 Mental Health Score Predictor

A Machine Learning-powered web application that predicts a student's **Mental Health Score** based on social media usage, academic lifestyle, and personal habits.

The project uses a trained Scikit-learn model served through a **FastAPI** backend and can be integrated with a simple HTML/CSS/JavaScript frontend.

---

## 📌 Features

- Predicts mental health score using Machine Learning
- REST API built with FastAPI
- Input validation using Pydantic
- Supports multiple countries and social media platforms
- Easy-to-use web interface
- Lightweight and fast prediction

---

## 🛠️ Tech Stack

- **Python 3**
- **FastAPI**
- **Scikit-learn**
- **Pandas**
- **NumPy**
- **Joblib**
- HTML
- CSS
- JavaScript

---

## 📂 Project Structure

```
mental-health-score-predictor/
│
├── main.py                              # FastAPI application
├── Mental_Health_Model.pkl              # Trained ML model
├── Machine_learning_project.ipynb       # Model training notebook
├── Student Social Media And Mental Health Impact.csv
├── index.html                           # Frontend
├── style.css
├── script.js
├── requirements.txt
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Prince8879/mental-health-score-predictor.git
```

### 2. Navigate into the project

```bash
cd mental-health-score-predictor
```

### 3. Create a virtual environment (Optional)

Windows

```bash
python -m venv venv
venv\Scripts\activate
```

Linux / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

---

## ▶️ Running the Application

Start the FastAPI server

```bash
uvicorn main:app --reload
```

Server will start at

```
http://127.0.0.1:8000
```

---

## 📖 API Endpoints

### Home

```
GET /
```

Response

```json
{
    "Welcome": "prince"
}
```

---

### Predict Mental Health Score

```
POST /predict
```

### Sample Request

```json
{
  "age": 21,
  "gender": "Male",
  "country": "India",
  "academic_level": "Undergraduate",
  "most_used_platform": "Instagram",
  "purpose_of_use": "Entertainment",
  "avg_daily_usage_hours": 4.5,
  "daily_unlocks": 35,
  "study_hours": 3.0,
  "physical_activity_hours": 0.5,
  "sleep_hours_per_night": 7.0,
  "stress_level": "Medium"
}
```

### Sample Response

```json
{
    "predicted_mental_health_score": 72.84
}
```

---

## 📊 Input Features

| Feature | Description |
|----------|-------------|
| Age | Student age |
| Gender | Male/Female |
| Country | Student's country |
| Academic Level | High School / Undergraduate / Graduate |
| Most Used Platform | Social media platform |
| Purpose of Use | Entertainment, Education, News, Networking |
| Average Daily Usage Hours | Daily social media usage |
| Daily Unlocks | Number of phone unlocks |
| Study Hours | Daily study time |
| Physical Activity Hours | Exercise time |
| Sleep Hours Per Night | Daily sleep duration |
| Stress Level | Low, Medium, High, Very High |

---

## 📚 Machine Learning

The model was trained using the dataset:

**Student Social Media And Mental Health Impact**

The notebook `Machine_learning_project.ipynb` contains:

- Data preprocessing
- Feature engineering
- Model training
- Evaluation
- Model serialization using Joblib

---

## 📦 Requirements

```
fastapi
uvicorn
pandas
numpy
scikit-learn
joblib
```

Install with

```bash
pip install -r requirements.txt
```

---

## 🚀 Future Improvements

- User authentication
- Interactive dashboard
- Mental health insights
- Personalized recommendations
- Deployment on Render or Railway
- Docker support

---

## 👨‍💻 Author

**Prince Tiwari**
**Prince Yadav**

GitHub: https://github.com/Prince8879
GitHub: https://github.com/princeyadaav


---

## 📄 License

This project is licensed under the MIT License.
