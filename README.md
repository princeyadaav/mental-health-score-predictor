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
    "predicted_mental_health_score": 6.42,
    "prediction": "Warning Zone",
    "risk_score": 49,
    "confidence": 0.7,
    "reasons": [
        "Sleep duration is between 6 and 7 hours",
        "Screen time is above the dataset's upper quartile"
    ],
    "recommendation": "Some risk factors are elevated. Focus on steadier sleep, manageable screen time, and regular recovery."
}
```

The original `predicted_mental_health_score` field remains available for frontend compatibility. The risk layer combines that model score with dataset-calibrated sleep, stress, screen-time, unlock, study, activity, and lifestyle interaction rules. The existing model is a continuous `RandomForestRegressor`, so classification probabilities are not available; `confidence` is estimated from prediction spread across the forest trees.

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
**Chandan Patel**
**Rehan Ahmed**

GitHub: https://github.com/Prince8879
GitHub: https://github.com/princeyadaav
GitHub: https://github.com/ChandanPatel04
GitHub: https://github.com/rehancccml-lab


---

## 📄 License

This project is licensed under the MIT License. -->

# 🧠 Mental Health Score Predictor

A Machine Learning-powered web application that predicts a student's **Mental Health Score** based on social media usage, academic lifestyle, physical activity, sleeping habits, and personal factors.

The project uses a trained **Scikit-learn Machine Learning model** served through a **FastAPI backend**. The application accepts user information through a REST API and returns a predicted mental health score.

The project can also be integrated with a simple **HTML, CSS, and JavaScript frontend** to provide an easy-to-use web interface.

> **Disclaimer:** This application is intended for educational and demonstration purposes only. The predicted score should not be considered a medical diagnosis, professional psychological assessment, or substitute for advice from a qualified mental-health professional.

---

## 📌 Table of Contents

* [Project Overview](#-project-overview)
* [Objectives](#-objectives)
* [Features](#-features)
* [Tech Stack](#️-tech-stack)
* [Project Architecture](#️-project-architecture)
* [Project Structure](#-project-structure)
* [Dataset](#-dataset)
* [Input Features](#-input-features)
* [Machine Learning Workflow](#-machine-learning-workflow)
* [Data Preprocessing](#-data-preprocessing)
* [Feature Engineering](#-feature-engineering)
* [Model Training](#-model-training)
* [Model Evaluation](#-model-evaluation)
* [Model Serialization](#-model-serialization)
* [FastAPI Backend](#-fastapi-backend)
* [Pydantic Validation](#-pydantic-validation)
* [API Endpoints](#-api-endpoints)
* [Home Endpoint](#-home-endpoint)
* [Prediction Endpoint](#-prediction-endpoint)
* [Sample Request](#-sample-request)
* [Sample Response](#-sample-response)
* [Input Feature Description](#-input-feature-description)
* [API Documentation](#-api-documentation)
* [Installation](#️-installation)
* [Clone the Repository](#-clone-the-repository)
* [Navigate to the Project](#-navigate-to-the-project)
* [Virtual Environment](#-virtual-environment)
* [Install Dependencies](#-install-dependencies)
* [Run the Application](#️-run-the-application)
* [Testing the API](#-testing-the-api)
* [Testing with Browser](#-testing-with-browser)
* [Testing with Swagger UI](#-testing-with-swagger-ui)
* [Testing with Postman](#-testing-with-postman)
* [Frontend Integration](#-frontend-integration)
* [How the Application Works](#-how-the-application-works)
* [Prediction Flow](#-prediction-flow)
* [Example Use Case](#-example-use-case)
* [Advantages](#-advantages)
* [Limitations](#-limitations)
* [Security Considerations](#-security-considerations)
* [Performance](#-performance)
* [Troubleshooting](#-troubleshooting)
* [Common Errors](#-common-errors)
* [Future Improvements](#-future-improvements)
* [Deployment](#-deployment)
* [Docker Support](#-docker-support)
* [Contribution](#-contribution)
* [Project Learning Outcomes](#-project-learning-outcomes)
* [Conclusion](#-conclusion)
* [Authors](#-authors)
* [License](#-license)

---

## 📖 Project Overview

Mental health is an important aspect of a student's overall well-being.

Students may experience changes in their mental health due to several factors such as:

* Academic pressure
* Social media usage
* Lack of sleep
* High stress levels
* Reduced physical activity
* Excessive phone usage
* Lifestyle patterns
* Study habits
* Social media preferences

This project attempts to analyze these factors using Machine Learning.

The application takes information about a student as input and uses a trained Machine Learning model to generate a predicted **Mental Health Score**.

The prediction is provided through a FastAPI REST API.

---

## 🎯 Objectives

The main objectives of this project are:

1. To understand the relationship between student lifestyle and mental health.
2. To preprocess real-world student data.
3. To perform feature engineering.
4. To train a Machine Learning regression model.
5. To evaluate the trained model.
6. To save the trained model using Joblib.
7. To create a REST API using FastAPI.
8. To validate API inputs using Pydantic.
9. To provide fast Machine Learning predictions.
10. To create a foundation for a user-friendly mental health prediction application.

---

## 📌 Features

* 🧠 Mental health score prediction
* 🤖 Machine Learning-powered prediction
* ⚡ FastAPI REST API
* 📊 Student lifestyle analysis
* 📱 Social media usage analysis
* 😴 Sleep pattern analysis
* 📚 Academic lifestyle analysis
* 🏃 Physical activity analysis
* 😰 Stress-level analysis
* 🌎 Supports multiple countries
* 📱 Supports multiple social media platforms
* ✅ Input validation using Pydantic
* 📦 Serialized Machine Learning model
* 🔌 Easy frontend integration
* 📖 Automatic API documentation
* 🚀 Lightweight backend
* 🔧 Easy local development
* 🧪 Easy API testing using Postman or Swagger UI

---

# 🛠️ Tech Stack

## Programming Language

* **Python 3**

## Backend

* **FastAPI**
* **Uvicorn**
* **Pydantic**

## Machine Learning

* **Scikit-learn**
* **Pandas**
* **NumPy**
* **Joblib**

## Frontend

* **HTML**
* **CSS**
* **JavaScript**

## Development Tools

* **Visual Studio Code**
* **Jupyter Notebook**
* **Git**
* **GitHub**
* **Postman**

---

# 🏗️ Project Architecture

The application follows a simple Machine Learning API architecture.

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ HTML/CSS/JavaScript │
                    │      Frontend       │
                    └──────────┬──────────┘
                               │
                               │ HTTP Request
                               ▼
                    ┌─────────────────────┐
                    │      FastAPI        │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Pydantic         │
                    │ Input Validation     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Preprocessing /     │
                    │ Feature Engineering │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Trained ML Model    │
                    │     .pkl/.joblib    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Mental Health Score │
                    │     Prediction      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     JSON Response   │
                    └─────────────────────┘
```

---

# 📂 Project Structure

A typical project structure is:

```text
mental-health-score-predictor/
│
├── main.py
│
├── Mental_Health_Model.pkl
│
├── Machine_learning_project.ipynb
│
├── Student Social Media And Mental Health Impact.csv
│
├── index.html
│
├── style.css
│
├── script.js
│
├── requirements.txt
│
├── README.md
│
└── .gitignore
```

---

## 📄 File Description

### `main.py`

Contains the FastAPI application and prediction API.

### `Mental_Health_Model.pkl`

Contains the trained Machine Learning model.

### `Machine_learning_project.ipynb`

Jupyter Notebook containing:

* Data analysis
* Data preprocessing
* Feature engineering
* Model training
* Model evaluation
* Model selection
* Model serialization

### Dataset CSV

Contains the student social media and mental health information used for Machine Learning.

### `index.html`

Frontend structure of the application.

### `style.css`

Contains frontend styling.

### `script.js`

Handles frontend interactions and API requests.

### `requirements.txt`

Contains all Python dependencies required to run the project.

### `README.md`

Project documentation.

### `.gitignore`

Specifies files that should not be uploaded to GitHub.

---

# 📊 Dataset

The project uses the dataset:

**Student Social Media And Mental Health Impact**

The dataset contains information related to student demographics, social media usage, academic lifestyle, physical activity, sleep, and stress.

The dataset is used to train a Machine Learning model that learns patterns between the input features and mental health scores.

---

# 📋 Input Features

The model can use the following features:

| Feature                   | Description                                |
| ------------------------- | ------------------------------------------ |
| Age                       | Student age                                |
| Gender                    | Student gender                             |
| Country                   | Student's country                          |
| Academic Level            | Current academic level                     |
| Most Used Platform        | Most frequently used social media platform |
| Purpose of Use            | Main reason for using social media         |
| Average Daily Usage Hours | Average social media usage per day         |
| Daily Unlocks             | Number of phone unlocks per day            |
| Study Hours               | Average daily study hours                  |
| Physical Activity Hours   | Daily physical activity                    |
| Sleep Hours Per Night     | Average sleep duration                     |
| Stress Level              | Student's stress level                     |

---

# 🔄 Machine Learning Workflow

The Machine Learning workflow consists of several steps.

```text
Dataset
   ↓
Data Loading
   ↓
Data Exploration
   ↓
Data Cleaning
   ↓
Feature Selection
   ↓
Feature Engineering
   ↓
Categorical Encoding
   ↓
Train-Test Split
   ↓
Model Training
   ↓
Model Evaluation
   ↓
Model Selection
   ↓
Model Serialization
   ↓
FastAPI Integration
   ↓
Prediction
```

---

# 🔍 Data Preprocessing

Before training the Machine Learning model, the dataset needs to be prepared.

Typical preprocessing steps include:

### 1. Loading the dataset

```python
import pandas as pd

df = pd.read_csv(
    "Student Social Media And Mental Health Impact.csv"
)
```

### 2. Checking the dataset

```python
print(df.head())
print(df.shape)
print(df.info())
```

### 3. Checking missing values

```python
print(df.isnull().sum())
```

### 4. Checking duplicate values

```python
print(df.duplicated().sum())
```

### 5. Checking numerical statistics

```python
print(df.describe())
```

These steps help understand the quality and structure of the dataset.

---

# 🧹 Data Cleaning

Data cleaning may include:

* Handling missing values
* Removing duplicates
* Correcting inconsistent values
* Handling incorrect data types
* Detecting outliers
* Standardizing column names
* Removing unnecessary columns

Clean data generally helps the Machine Learning model learn better patterns.

---

# ⚙️ Feature Engineering

Feature engineering involves preparing existing information so that it can be used effectively by the Machine Learning algorithm.

Examples include:

* Converting categorical values into numerical values
* Creating meaningful derived features
* Selecting useful columns
* Removing irrelevant features
* Scaling numerical features when required

---

# 🔤 Categorical Encoding

Machine Learning models generally require numerical inputs.

Categorical features such as:

```text
Gender
Country
Academic Level
Most Used Platform
Purpose of Use
Stress Level
```

may therefore need to be converted into numerical representations.

Possible encoding techniques include:

* Label Encoding
* One-Hot Encoding
* Ordinal Encoding

The encoding method should match the model and the meaning of the feature.

---

# ✂️ Train-Test Split

The dataset can be divided into training and testing data.

Example:

```python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)
```

The training dataset is used to train the model.

The testing dataset is used to evaluate how well the model performs on unseen data.

---

# 🤖 Model Training

The project uses a Scikit-learn Machine Learning model to predict the mental health score.

Depending on the experimentation performed in the notebook, regression algorithms can be evaluated and compared.

Possible algorithms include:

* Linear Regression
* Multiple Linear Regression
* Polynomial Regression
* Decision Tree Regression
* Random Forest Regression
* Gradient Boosting Regression

The final model should be selected based on appropriate evaluation metrics.

---

# 📈 Model Evaluation

For a regression problem, common evaluation metrics include:

### Mean Absolute Error

```text
MAE
```

Measures the average absolute difference between actual and predicted values.

### Mean Squared Error

```text
MSE
```

Measures the average squared difference between actual and predicted values.

### Root Mean Squared Error

```text
RMSE
```

Provides an error measure in the same units as the target variable.

### R² Score

```text
R²
```

Measures how much variation in the target variable is explained by the model.

Example:

```python
from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score
)

mae = mean_absolute_error(y_test, y_pred)

mse = mean_squared_error(y_test, y_pred)

rmse = mse ** 0.5

r2 = r2_score(y_test, y_pred)

print("MAE:", mae)
print("RMSE:", rmse)
print("R2 Score:", r2)
```

---

# 💾 Model Serialization

After training, the Machine Learning model can be saved using Joblib.

```python
import joblib

joblib.dump(model, "Mental_Health_Model.pkl")
```

The saved model can later be loaded by FastAPI.

```python
model = joblib.load("Mental_Health_Model.pkl")
```

This avoids retraining the model every time the API starts.

---

# 🚀 FastAPI Backend

FastAPI is used to create the REST API for the Machine Learning model.

A simple FastAPI application can look like:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {
        "Welcome": "Mental Health Score Predictor"
    }
```

The API receives HTTP requests and returns JSON responses.

---

# 🧾 Pydantic Validation

FastAPI can use Pydantic models to validate incoming data.

Example:

```python
from pydantic import BaseModel

class MentalHealthInput(BaseModel):

    age: int
    gender: str
    country: str
    academic_level: str
    most_used_platform: str
    purpose_of_use: str
    avg_daily_usage_hours: float
    daily_unlocks: int
    study_hours: float
    physical_activity_hours: float
    sleep_hours_per_night: float
    stress_level: str
```

Pydantic helps ensure that the API receives data in the expected format.

---

# 🔌 API Endpoints

The application can expose endpoints such as:

| Method | Endpoint   | Purpose                     |
| ------ | ---------- | --------------------------- |
| GET    | `/`        | Home endpoint               |
| POST   | `/predict` | Predict mental health score |
| GET    | `/docs`    | Swagger API documentation   |

---

# 🏠 Home Endpoint

### Request

```text
GET /
```

### Example Response

```json
{
    "Welcome": "Mental Health Score Predictor"
}
```

This endpoint can be used to verify that the FastAPI server is running.

---

# 🧠 Prediction Endpoint

The primary prediction endpoint is:

```text
POST /predict
```

It receives student information and returns a predicted mental health score.

---

# 📤 Sample Request

Example JSON request:

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

---

# 📥 Sample Response

A successful API response may look like:

```json
{
    "predicted_mental_health_score": 72.84
}
```

The exact value depends on the trained model and input data.

---

# 📊 Input Feature Description

## Age

Represents the age of the student.

Example:

```text
21
```

---

## Gender

Represents the student's gender.

Example:

```text
Male
```

---

## Country

Represents the country where the student is located.

Example:

```text
India
```

---

## Academic Level

Represents the student's education level.

Examples:

```text
High School
Undergraduate
Graduate
```

---

## Most Used Platform

Represents the social media platform used most frequently.

Examples:

```text
Instagram
YouTube
Facebook
TikTok
Twitter
```

---

## Purpose of Use

Represents the primary reason for using social media.

Examples:

```text
Entertainment
Education
News
Networking
```

---

## Average Daily Usage Hours

Represents the average amount of time spent using social media each day.

Example:

```text
4.5
```

---

## Daily Unlocks

Represents how many times a student unlocks their phone each day.

Example:

```text
35
```

---

## Study Hours

Represents the average number of hours spent studying each day.

Example:

```text
3.0
```

---

## Physical Activity Hours

Represents the amount of time spent on physical activity.

Example:

```text
0.5
```

---

## Sleep Hours Per Night

Represents average daily sleep duration.

Example:

```text
7.0
```

---

## Stress Level

Represents the student's reported stress level.

Possible values may include:

```text
Low
Medium
High
Very High
```

---

# 📖 API Documentation

FastAPI automatically generates interactive API documentation.

After starting the server, open:

```text
http://127.0.0.1:8000/docs
```

The Swagger UI allows you to:

* View API endpoints
* View request parameters
* Enter JSON data
* Send API requests
* View responses
* Test the prediction endpoint

---

# ⚙️ Installation

Follow the steps below to run the project locally.

---

# 1️⃣ Clone the Repository

```bash
git clone https://github.com/Prince8879/mental-health-score-predictor.git
```

---

# 2️⃣ Navigate Into the Project

```bash
cd mental-health-score-predictor
```

---

# 3️⃣ Create a Virtual Environment

Using a virtual environment is recommended.

## Windows

```bash
python -m venv venv
```

Activate it:

```bash
venv\Scripts\activate
```

---

## macOS / Linux

```bash
python3 -m venv venv
```

Activate it:

```bash
source venv/bin/activate
```

---

# 4️⃣ Install Dependencies

Run:

```bash
pip install -r requirements.txt
```

If your system uses `pip3`, use:

```bash
pip3 install -r requirements.txt
```

---

# 📦 Requirements

The `requirements.txt` file can contain:

```text
fastapi
uvicorn
pandas
numpy
scikit-learn
joblib
pydantic
```

Install them with:

```bash
pip install -r requirements.txt
```

---

# ▶️ Run the Application

Start the FastAPI server using Uvicorn:

```bash
uvicorn main:app --reload
```

If you are using Python module execution:

```bash
python -m uvicorn main:app --reload
```

On macOS/Linux:

```bash
python3 -m uvicorn main:app --reload
```

---

# 🌐 Server Address

After successfully starting the server, it will usually be available at:

```text
http://127.0.0.1:8000
```

You can open this address in your browser.

---

# 🧪 Testing the API

There are several ways to test the application.

You can use:

* Browser
* Swagger UI
* Postman
* JavaScript frontend
* Python requests

---

# 🌐 Testing with Browser

Open:

```text
http://127.0.0.1:8000
```

You should receive a JSON response similar to:

```json
{
    "Welcome": "Mental Health Score Predictor"
}
```

---

# 🧪 Testing with Swagger UI

Open:

```text
http://127.0.0.1:8000/docs
```

You will see the available API endpoints.

Find:

```text
POST /predict
```

Click:

```text
Try it out
```

Enter the JSON input.

Then click:

```text
Execute
```

The API will return the predicted mental health score.

---

# 📮 Testing with Postman

The API can also be tested using Postman.

### Step 1

Open Postman.

### Step 2

Create a new request.

### Step 3

Select:

```text
POST
```

### Step 4

Enter:

```text
http://127.0.0.1:8000/predict
```

### Step 5

Select:

```text
Body → raw → JSON
```

### Step 6

Enter:

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

### Step 7

Click:

```text
Send
```

The server should return the prediction.

---

# 🌐 Frontend Integration

The FastAPI backend can be connected to an HTML/CSS/JavaScript frontend.

The frontend collects user information and sends it to the API.

Example JavaScript:

```javascript
fetch("http://127.0.0.1:8000/predict", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(result => {
    console.log(result);
});
```

The returned prediction can then be displayed on the webpage.

---

# 🔄 How the Application Works

The complete application works in the following way:

```text
User enters information
        ↓
Frontend collects information
        ↓
JSON request is created
        ↓
Request sent to FastAPI
        ↓
Pydantic validates input
        ↓
Input is converted into model format
        ↓
Machine Learning model receives input
        ↓
Model generates prediction
        ↓
FastAPI returns JSON
        ↓
Frontend displays result
```

---

# 🔮 Prediction Flow

The prediction process can be summarized as:

```text
Student Information
        ↓
Data Validation
        ↓
Feature Preparation
        ↓
Encoding
        ↓
Machine Learning Model
        ↓
Prediction
        ↓
Mental Health Score
```

---

# 💡 Example Use Case

Suppose a student provides:

```text
Age: 21
Gender: Male
Country: India
Academic Level: Undergraduate
Platform: Instagram
Purpose: Entertainment
Social Media Usage: 4.5 hours
Daily Unlocks: 35
Study Hours: 3 hours
Physical Activity: 0.5 hours
Sleep: 7 hours
Stress: Medium
```

The application sends this information to the `/predict` endpoint.

The trained model processes the information and returns a predicted score.

Example:

```json
{
    "predicted_mental_health_score": 72.84
}
```

The frontend can display this score to the user.

---

# 📊 Understanding the Prediction

The predicted value represents the output generated by the trained Machine Learning model.

A higher or lower score should only be interpreted according to the target definition used during model training.

The application should not automatically classify a person as medically healthy or unhealthy unless the dataset and model were specifically designed and clinically validated for that purpose.

---

# ⚡ Advantages

## 1. Fast Prediction

FastAPI provides a lightweight API layer for serving predictions.

## 2. Easy Integration

The API can be connected to:

* Websites
* Mobile applications
* Dashboards
* Other Python applications
* JavaScript applications

## 3. Machine Learning Integration

The trained Scikit-learn model can be loaded directly into the backend.

## 4. Automatic Documentation

FastAPI provides automatic interactive documentation.

## 5. Input Validation

Pydantic helps validate API input.

## 6. Modular Architecture

The frontend, API, and Machine Learning model can be maintained separately.

## 7. Easy Testing

The API can be tested using Swagger UI or Postman.

---

# ⚠️ Limitations

This project has several limitations.

### 1. Dataset Dependency

The model's performance depends heavily on the quality and representativeness of the training dataset.

### 2. Prediction Is Not a Diagnosis

The predicted score is not a medical diagnosis.

### 3. Limited Features

Mental health is influenced by many factors that may not be represented in the dataset.

### 4. Dataset Bias

If the training dataset contains demographic or sampling bias, the model may reproduce those biases.

### 5. Model Accuracy

Machine Learning predictions are not guaranteed to be correct for every individual.

### 6. Self-Reported Data

Some features may depend on self-reported information, which can introduce measurement errors.

---

# 🔐 Security Considerations

If this application is deployed publicly, security should be considered carefully.

Important practices include:

* Do not store sensitive personal information unnecessarily.
* Do not expose private datasets.
* Validate all incoming requests.
* Use HTTPS in production.
* Avoid exposing development servers publicly.
* Add authentication if required.
* Protect API credentials.
* Apply rate limiting where appropriate.
* Avoid logging sensitive user information.

---

# ⚡ Performance

FastAPI is designed for high-performance API development.

For a lightweight Machine Learning prediction service, the general flow is:

```text
HTTP Request
     ↓
FastAPI
     ↓
Model
     ↓
Prediction
     ↓
HTTP Response
```

Since the model is loaded once when the application starts, the server does not need to train the model for every prediction request.

---

# 🐛 Troubleshooting

## Problem: `uvicorn` command not found

Try:

```bash
python -m uvicorn main:app --reload
```

or:

```bash
python3 -m uvicorn main:app --reload
```

---

## Problem: `ModuleNotFoundError`

For example:

```text
ModuleNotFoundError: No module named 'fastapi'
```

Install the package:

```bash
pip install fastapi
```

For Uvicorn:

```bash
pip install uvicorn
```

Or install everything:

```bash
pip install -r requirements.txt
```

---

# ❌ Common Errors

## Error: Model file not found

Example:

```text
FileNotFoundError:
Mental_Health_Model.pkl
```

Make sure the model file exists in the correct project directory.

You can check the directory using:

```bash
ls
```

On Windows:

```bash
dir
```

---

## Error: Wrong Model Input

If the API returns an error related to the number or order of features, verify that:

* The API uses the same features as training.
* Features are in the same order.
* Encoding is consistent.
* Preprocessing is consistent.
* The model expects the supplied data format.

---

## Error: API Not Opening

Make sure Uvicorn is running:

```bash
uvicorn main:app --reload
```

Then open:

```text
http://127.0.0.1:8000
```

---

# 🧪 Model Testing

Before deploying the model, it is recommended to test it with multiple input combinations.

Example test cases:

### Test Case 1

```text
Low social media usage
High study hours
High physical activity
Adequate sleep
Low stress
```

### Test Case 2

```text
High social media usage
Low study hours
Low physical activity
Low sleep
High stress
```

### Test Case 3

```text
Moderate social media usage
Moderate study hours
Moderate physical activity
Adequate sleep
Medium stress
```

These test cases can help evaluate how the model responds to different combinations of inputs.

---

# 📈 Model Improvement

The Machine Learning model can potentially be improved by:

* Collecting more training data
* Improving feature engineering
* Testing multiple algorithms
* Hyperparameter tuning
* Cross-validation
* Handling outliers
* Handling missing values carefully
* Evaluating feature importance
* Removing irrelevant features
* Using appropriate encoding techniques

---

# 🧠 Feature Importance

If a tree-based model is used, feature importance can help understand which features contribute most strongly to model predictions.

Example:

```python
importance = model.feature_importances_

for feature, value in zip(
    feature_names,
    importance
):
    print(feature, value)
```

Feature importance should be interpreted carefully and does not necessarily imply causation.

---

# 🔬 Model Validation

Cross-validation can be used to obtain a more reliable estimate of model performance.

Example:

```python
from sklearn.model_selection import cross_val_score

scores = cross_val_score(
    model,
    X,
    y,
    cv=5,
    scoring="r2"
)

print(scores)
print(scores.mean())
```

Cross-validation helps evaluate how consistently the model performs across different subsets of the dataset.

---

# 📦 Model Deployment

The FastAPI application can be deployed to a cloud platform.

Possible deployment options include:

* Render
* Railway
* AWS
* Google Cloud
* Microsoft Azure
* Hugging Face Spaces
* Other cloud hosting services

Before deployment, make sure the application has:

```text
requirements.txt
main.py
model file
```

and any required frontend files.

---

# 🐳 Docker Support

The application can also be containerized using Docker.

Example Dockerfile:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build the Docker image:

```bash
docker build -t mental-health-predictor .
```

Run the container:

```bash
docker run -p 8000:8000 mental-health-predictor
```

The API can then be accessed through:

```text
http://127.0.0.1:8000
```

---

# 🌍 Production Deployment

For production deployment, the development server should be configured appropriately.

Important considerations include:

* Production server configuration
* HTTPS
* Authentication
* CORS configuration
* Environment variables
* Logging
* Monitoring
* Rate limiting
* Error handling
* Resource management

---

# 🔗 GitHub

The project can be hosted on GitHub for:

* Version control
* Collaboration
* Project documentation
* Code sharing
* Portfolio development
* Issue tracking
* Project management

Example Git commands:

```bash
git add .
```

```bash
git commit -m "Added mental health predictor application"
```

```bash
git push
```

---

# 🌿 Git Workflow

A basic Git workflow is:

```text
Make changes
     ↓
git status
     ↓
git add .
     ↓
git commit -m "message"
     ↓
git push
```

Example:

```bash
git status
```

```bash
git add .
```

```bash
git commit -m "Updated prediction API"
```

```bash
git push
```

---

# 📄 `.gitignore`

Sensitive or unnecessary files should not be uploaded to GitHub.

Example:

```text
venv/
.venv/
__pycache__/
*.pyc
.env
.DS_Store
```

If the model file is large, Git LFS or another model-storage approach may be appropriate.

---

# 🤝 Contribution

Contributions are welcome.

To contribute:

### 1. Fork the repository

Create your own copy of the repository.

### 2. Clone your fork

```bash
git clone YOUR_REPOSITORY_URL
```

### 3. Create a branch

```bash
git checkout -b feature/new-feature
```

### 4. Make changes

Modify the project.

### 5. Commit changes

```bash
git add .
```

```bash
git commit -m "Added new feature"
```

### 6. Push the branch

```bash
git push origin feature/new-feature
```

### 7. Create a Pull Request

Open GitHub and create a Pull Request.

---

# 📚 Project Learning Outcomes

This project provides practical experience with:

## Python

Understanding Python programming and project organization.

## Pandas

Loading, cleaning, and analyzing datasets.

## NumPy

Performing numerical operations.

## Scikit-learn

Building and evaluating Machine Learning models.

## Joblib

Saving and loading trained models.

## FastAPI

Building REST APIs using Python.

## Pydantic

Validating API request data.

## HTML

Creating the structure of the frontend.

## CSS

Styling the application.

## JavaScript

Connecting the frontend to the backend.

## Git

Tracking project changes.

## GitHub

Hosting and collaborating on the project.

## Postman

Testing REST APIs.

---

# 🎓 Educational Value

This project combines multiple areas of software development:

```text
Data Science
     +
Machine Learning
     +
Backend Development
     +
REST API
     +
Frontend Development
     +
Git/GitHub
```

It therefore provides practical exposure to an end-to-end Machine Learning application.

---

# 🚀 Future Improvements

The project can be extended with several features.

## 👤 User Authentication

Add:

* Login
* Registration
* Password protection
* User profiles

---

## 📊 Interactive Dashboard

Add charts showing:

* Social media usage
* Sleep duration
* Study hours
* Physical activity
* Stress level
* Mental health score

---

## 💡 Personalized Recommendations

The application could provide general wellness suggestions based on user inputs.

Any such recommendations should be framed as educational/general information rather than medical treatment.

---

## 📈 Prediction History

Users could view previous predictions.

Example:

```text
Date        Score
------------------
01-09-2026  72.84
05-09-2026  75.21
10-09-2026  70.65
```

---

## ☁️ Cloud Deployment

Deploy the API to:

* Render
* Railway
* AWS
* Azure
* Google Cloud

---

## 🐳 Docker

Containerize the entire application.

---

## 🔐 Authentication

Add secure authentication for users and administrators.

---

## 📱 Mobile Application

The FastAPI backend could be connected to an Android or iOS application.

---

## 🤖 Advanced Machine Learning

Future versions could compare:

* Random Forest
* Gradient Boosting
* XGBoost
* Support Vector Regression
* Neural Networks

and select the best-performing model.

---

# 🧩 Possible System Extensions

The project could eventually be expanded into a larger student wellness platform.

Possible modules include:

```text
Mental Health Prediction
        ↓
Lifestyle Analysis
        ↓
Sleep Analysis
        ↓
Stress Analysis
        ↓
Study Pattern Analysis
        ↓
Wellness Dashboard
```

---

# 📊 Example Dashboard Ideas

A future dashboard could contain:

```text
┌────────────────────────────────────┐
│      Mental Health Score           │
│              72.84                 │
├────────────────────────────────────┤
│ Social Media Usage: 4.5 hrs        │
│ Study Hours: 3 hrs                 │
│ Sleep: 7 hrs                       │
│ Physical Activity: 0.5 hrs         │
│ Stress: Medium                     │
└────────────────────────────────────┘
```

Charts could show changes in lifestyle variables and prediction history.

---

# 🔮 Future API Endpoints

Future versions could include:

```text
GET     /
POST    /predict
GET     /history
POST    /users
POST    /login
GET     /dashboard
GET     /health
```

These endpoints could support a complete application ecosystem.

---

# ❤️ Responsible Use

Mental health is a complex subject.

A Machine Learning model cannot fully understand an individual's emotional state, personal circumstances, relationships, environment, or medical history.

Therefore:

* Predictions should be treated as estimates.
* Results should not be treated as diagnoses.
* The model should not replace professional evaluation.
* Sensitive information should be handled responsibly.
* Users should be informed about the limitations of the system.

If someone is experiencing significant emotional distress or is concerned about their mental health, they should consider speaking with a qualified mental-health professional or appropriate local support service.

---

# 🛡️ Privacy

If the application is expanded to collect real user information, privacy should become a major consideration.

The application should:

* Collect only necessary information.
* Avoid storing sensitive information unnecessarily.
* Secure stored information.
* Use HTTPS.
* Restrict database access.
* Implement authentication where necessary.
* Clearly explain how data is used.

---

# 🏆 Project Highlights

This project demonstrates an end-to-end Machine Learning deployment workflow:

```text
Dataset
   ↓
Data Analysis
   ↓
Data Preprocessing
   ↓
Feature Engineering
   ↓
Machine Learning
   ↓
Model Evaluation
   ↓
Joblib Model
   ↓
FastAPI
   ↓
REST API
   ↓
Frontend
   ↓
Prediction
```

---

# 📝 Example `requirements.txt`

```text
fastapi
uvicorn
pandas
numpy
scikit-learn
joblib
pydantic
```

---

# 💻 Example FastAPI Application

A simplified backend structure could look like:

```python
from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()

model = joblib.load(
    "Mental_Health_Model.pkl"
)


class MentalHealthInput(BaseModel):

    age: int
    gender: str
    country: str
    academic_level: str
    most_used_platform: str
    purpose_of_use: str
    avg_daily_usage_hours: float
    daily_unlocks: int
    study_hours: float
    physical_activity_hours: float
    sleep_hours_per_night: float
    stress_level: str


@app.get("/")
def home():

    return {
        "Welcome":
        "Mental Health Score Predictor"
    }


@app.post("/predict")
def predict(data: MentalHealthInput):

    # Prepare features according to
    # the model's training pipeline.

    prediction = model.predict([
        [
            data.age,
            data.avg_daily_usage_hours,
            data.daily_unlocks,
            data.study_hours,
            data.physical_activity_hours,
            data.sleep_hours_per_night
        ]
    ])

    return {
        "predicted_mental_health_score":
        float(prediction[0])
    }
```

> **Important:** The prediction input order and preprocessing must exactly match the features used when training the saved model. The example above is illustrative and should be adapted to the actual trained model.

---

# 🔍 API Request Lifecycle

When a user sends a prediction request:

### Step 1

Frontend collects information.

### Step 2

Frontend creates a JSON object.

### Step 3

JSON is sent to:

```text
POST /predict
```

### Step 4

FastAPI receives the request.

### Step 5

Pydantic validates the input.

### Step 6

The backend prepares the model features.

### Step 7

The trained model performs prediction.

### Step 8

FastAPI converts the prediction into JSON.

### Step 9

Frontend receives the response.

### Step 10

The prediction is displayed to the user.

---

# 📌 Quick Start

For users who want the shortest setup:

```bash
git clone YOUR_REPOSITORY_URL
```

```bash
cd mental-health-score-predictor
```

```bash
python3 -m venv venv
```

```bash
source venv/bin/activate
```

```bash
pip install -r requirements.txt
```

```bash
python3 -m uvicorn main:app --reload
```

Then open:

```text
http://127.0.0.1:8000/docs
```

---

# 🧪 Quick API Test

Use:

```text
POST /predict
```

Example:

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
    "study_hours": 3,
    "physical_activity_hours": 0.5,
    "sleep_hours_per_night": 7,
    "stress_level": "Medium"
}
```

Example response:

```json
{
    "predicted_mental_health_score": 72.84
}
```

---

# 📌 Project Status

**Project Type:** Machine Learning Application

**Domain:** Mental Health / Student Lifestyle Analysis

**Backend:** FastAPI

**Machine Learning:** Scikit-learn

**Model Serialization:** Joblib

**Frontend:** HTML, CSS, JavaScript

**API Format:** REST / JSON

**Documentation:** README + Swagger UI

---

# 🎯 Intended Audience

This project can be useful for:

* Python learners
* Machine Learning students
* Data Science students
* FastAPI beginners
* API development learners
* College project demonstrations
* GitHub portfolios
* Machine Learning deployment practice

---

# 🧑‍💻 Authors

### Prince Tiwari

GitHub:

https://github.com/Prince8879

---

### Prince Yadav

GitHub:

https://github.com/princeyadaav

---

### Chandan Patel

GitHub:

https://github.com/ChandanPatel04

---

### Rehan Ahmed

GitHub:

https://github.com/rehancccml-lab

---

# 🤝 Team

This project was developed collaboratively by:

* **Prince Tiwari**
* **Prince Yadav**
* **Chandan Patel**
* **Rehan Ahmed**

The project combines Machine Learning, Python backend development, API development, frontend integration, and GitHub collaboration.

---

# 📄 License

This project is licensed under the **MIT License**.

You are free to:

* Use the project
* Modify the project
* Distribute the project
* Use the project for educational purposes

subject to the terms of the MIT License.

---

# ⭐ Acknowledgements

We would like to acknowledge the open-source Python ecosystem and the libraries that make this project possible.

Special thanks to:

* Python
* FastAPI
* Scikit-learn
* Pandas
* NumPy
* Joblib
* Pydantic
* Uvicorn
* Git
* GitHub

---

# 📚 Technologies Summary

```text
Language
Python 3

Machine Learning
Scikit-learn

Data Processing
Pandas
NumPy

Model Storage
Joblib

Backend
FastAPI

Server
Uvicorn

Validation
Pydantic

Frontend
HTML
CSS
JavaScript

Version Control
Git
GitHub

API Testing
Postman
Swagger UI
```

---

# 🚀 Final Project Summary

The **Mental Health Score Predictor** is an end-to-end Machine Learning application designed to demonstrate how a trained Machine Learning model can be integrated into a real-world software application.

The project starts with a student lifestyle dataset and performs data preprocessing, feature engineering, model training, and evaluation.

The selected model is saved using Joblib and integrated into a FastAPI backend.

FastAPI exposes the model through a REST API, allowing applications such as websites, dashboards, and mobile applications to send student information and receive predictions.

The overall architecture demonstrates the complete workflow:

```text
                 DATASET
                    │
                    ▼
            DATA PREPROCESSING
                    │
                    ▼
          FEATURE ENGINEERING
                    │
                    ▼
           MODEL TRAINING
                    │
                    ▼
          MODEL EVALUATION
                    │
                    ▼
          MODEL SERIALIZATION
                    │
                    ▼
             FASTAPI BACKEND
                    │
                    ▼
             REST API / JSON
                    │
                    ▼
          HTML/CSS/JS FRONTEND
                    │
                    ▼
              USER RESULT
```

The project is primarily intended as an **educational Machine Learning and API deployment project**. It demonstrates how data science and software engineering can be combined to create a complete application.

---

# 🧠 Mental Health Score Predictor

**Machine Learning + FastAPI + Scikit-learn + HTML/CSS/JavaScript**

> Built for learning, experimentation, and demonstration of Machine Learning model deployment.

⭐ **If you find this project useful, consider giving the repository a star on GitHub!**

---

