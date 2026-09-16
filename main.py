from fastapi import FastAPI
import joblib
import numpy as np
import pandas as pd
from pydantic import BaseModel, Field
from typing import Literal
from fastapi.middleware.cors import CORSMiddleware
model = joblib.load('Mental_Health_Model.pkl')


top_countries = ['Other', 'India', 'USA', 'Canada', 'Australia', 'UK', 'Germany', 'Mexico', 'Turkey', 'France']

# base model
class StudentData(BaseModel):
    Age                     : int = Field(..., alias='age', ge=10, le=100)
    Gender                  : Literal['Male','Female'] = Field(..., alias='gender')
    Country                 : str = Field(..., alias='country')
    Academic_Level          : Literal['Undergraduate', 'Graduate', 'High School'] = Field(..., alias='academic_level')
    Most_Used_Platform      : Literal['Facebook', 'LinkedIn', 'Instagram', 'Snapchat', 'Twitter','YouTube', 'TikTok', 'LINE', 'KakaoTalk', 'VKontakte', 'WhatsApp','WeChat'] = Field(..., alias='most_used_platform')
    Purpose_Of_Use          : Literal['Networking', 'Education', 'Entertainment', 'News'] = Field(..., alias='purpose_of_use')
    Avg_Daily_Usage_Hours   : float = Field(..., alias='avg_daily_usage_hours', ge=0, le=24)
    Daily_Unlocks           : int = Field(..., alias='daily_unlocks', ge=0)
    Study_Hours             : float = Field(..., alias='study_hours', ge=0, le=24)
    Physical_Activity_Hours : float = Field(..., alias='physical_activity_hours', ge=0, le=4.1)
    Sleep_Hours_Per_Night   : float = Field(..., alias='sleep_hours_per_night', ge=0, le=24)
    Stress_Level            : Literal['Medium', 'Low', 'Very High', 'High'] = Field(..., alias='stress_level')

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            'example': {
                'age': 21,
                'gender': 'Male',
                'country': 'India',
                'academic_level': 'Undergraduate',
                'most_used_platform': 'Instagram',
                'purpose_of_use': 'Entertainment',
                'avg_daily_usage_hours': 4.5,
                'daily_unlocks': 35,
                'study_hours': 3.0,
                'physical_activity_hours': 0.5,
                'sleep_hours_per_night': 7.0,
                'stress_level': 'Medium'
            }
        }

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=["*"],
    allow_headers=["*"]
)



#  Describe what we send back

class PredictionResponse(BaseModel):
    predicted_mental_health_score:float
    prediction: Literal['Balanced/Healthy', 'Warning Zone', 'Danger Zone']
    risk_score: int = Field(..., ge=0, le=100)
    confidence: float = Field(..., ge=0, le=1)
    reasons: list[str]
    recommendation: str


def score_risk(data: StudentData, model_score: float) -> tuple[int, str, list[str], str]:
    """Combine dataset-calibrated lifestyle rules with the model's health score."""
    risk = 0
    reasons = []
    severe_trigger = False

    if data.Sleep_Hours_Per_Night < 6:
        risk += 35
        severe_trigger = True
        reasons.append('Sleep duration is below 6 hours')
    elif data.Sleep_Hours_Per_Night < 7:
        risk += 18
        reasons.append('Sleep duration is between 6 and 7 hours')
    else:
        reasons.append('Sleep duration is 7 hours or more')

    if data.Stress_Level == 'Very High':
        risk += 35
        severe_trigger = True
        reasons.append('Stress level is very high')
    elif data.Stress_Level == 'High':
        risk += 22
        reasons.append('Stress level is high')
    elif data.Stress_Level == 'Medium':
        risk += 8
        reasons.append('Stress level is moderate')

    if data.Avg_Daily_Usage_Hours >= 7.3:
        risk += 18
        reasons.append('Screen time is in the dataset\'s highest range')
    elif data.Avg_Daily_Usage_Hours >= 6.3:
        risk += 10
        reasons.append('Screen time is above the dataset\'s upper quartile')

    if data.Daily_Unlocks >= 230:
        risk += 10
        reasons.append('Phone unlocks are in the dataset\'s highest range')
    elif data.Daily_Unlocks >= 204:
        risk += 5

    if data.Physical_Activity_Hours < 0.9:
        risk += 10
        reasons.append('Physical activity is in the dataset\'s lowest range')
    elif data.Physical_Activity_Hours < 1.3:
        risk += 5

    if data.Study_Hours < 1:
        risk += 8
        reasons.append('Study time is unusually low')
    elif data.Study_Hours < 1.5:
        risk += 4

    if data.Purpose_Of_Use == 'Entertainment' and data.Avg_Daily_Usage_Hours >= 6.3:
        risk += 5
        reasons.append('High screen time is primarily for entertainment')

    if data.Stress_Level in {'High', 'Very High'} and data.Sleep_Hours_Per_Night < 7:
        risk += 15
        severe_trigger = True
        reasons.append('High stress and short sleep occur together')

    if data.Avg_Daily_Usage_Hours >= 7.3 and data.Sleep_Hours_Per_Night < 7:
        risk += 12
        severe_trigger = True
        reasons.append('Very high screen time and short sleep occur together')

    negative_factors = sum([
        data.Sleep_Hours_Per_Night < 7,
        data.Stress_Level in {'High', 'Very High'},
        data.Avg_Daily_Usage_Hours >= 6.3,
        data.Daily_Unlocks >= 204,
        data.Physical_Activity_Hours < 1.3,
        data.Study_Hours < 1.5,
    ])
    if negative_factors >= 4:
        risk += 15
        severe_trigger = True
        reasons.append('Several negative lifestyle factors are present together')

    model_risk = np.clip((7.5 - model_score) / 3.9 * 100, 0, 100)
    combined_risk = int(round(np.clip(risk * 0.7 + model_risk * 0.3, 0, 100)))

    if severe_trigger or combined_risk >= 40:
        condition = 'Danger Zone'
        recommendation = 'Your inputs indicate a high-risk pattern. Consider improving sleep, reducing stress, and seeking support from someone you trust.'
    elif combined_risk >= 30:
        condition = 'Warning Zone'
        recommendation = 'Some risk factors are elevated. Focus on steadier sleep, manageable screen time, and regular recovery.'
    else:
        condition = 'Balanced/Healthy'
        recommendation = 'Your inputs show a relatively low-risk pattern. Keep supporting your sleep, activity, and stress routines.'

    if condition == 'Balanced/Healthy':
        reasons = [reason for reason in reasons if not reason.startswith(('Sleep duration is 7',))]
        reasons.append('Overall risk factors are currently low')

    return combined_risk, condition, reasons[:5], recommendation


def prediction_confidence(input_row: pd.DataFrame) -> float:
    """Estimate confidence from disagreement among the existing forest trees."""
    forest = model.named_steps.get('random forest')
    preprocessor = model.named_steps.get('preprocessor')
    if forest is None or preprocessor is None or not hasattr(forest, 'estimators_'):
        return 0.5
    transformed = preprocessor.transform(input_row)
    tree_scores = np.array([tree.predict(transformed)[0] for tree in forest.estimators_])
    spread = float(np.std(tree_scores))
    return round(float(np.clip(1 - spread / 2.5, 0.5, 0.99)), 2)
@app.get("/")
def greet():
    return {"kuchh nahi dikhega frontend kholo"}

    
@app.post("/predict")
def predict(data :StudentData):

    country_group = data.Country if data.Country in top_countries else 'Other'


    input_row = pd.DataFrame([{
    'Age' : data.Age,
    'Gender' : data.Gender,
    'Country' : data.Country,
    'Academic_Level' : data.Academic_Level,
    'Most_Used_Platform' : data.Most_Used_Platform,
    'Purpose_Of_Use' : data.Purpose_Of_Use,
    'Avg_Daily_Usage_Hours' : data.Avg_Daily_Usage_Hours,
    'Daily_Unlocks' : data.Daily_Unlocks,
    'Study_Hours' : data.Study_Hours,
    'Physical_Activity_Hours' : data.Physical_Activity_Hours,
    'Sleep_Hours_Per_Night' : data.Sleep_Hours_Per_Night,
    'Stress_Level' : data.Stress_Level,
    'Grouped_country' : country_group
    }])


    model_score = float(np.clip(model.predict(input_row)[0], 0, 10))
    risk_score, condition, reasons, recommendation = score_risk(data, model_score)
    return PredictionResponse(
        predicted_mental_health_score=round(model_score, 2),
        prediction=condition,
        risk_score=risk_score,
        confidence=prediction_confidence(input_row),
        reasons=reasons,
        recommendation=recommendation,
    )